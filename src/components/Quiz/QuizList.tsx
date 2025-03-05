import { useEffect, useState } from 'react';
import axios from 'axios';
import {Quiz} from '@/types'
import LoadingSpinner from '@/components/LoadingSpinner'
import ErrorAlert from '@/components/ErrorAlert'

export default function QuizList() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get('/api/quiz');
        setQuizzes(res.data);
      } catch (err) {
        setError('Failed to load quizzes');
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (quizId: string) => {
    try {
      await axios.delete(`/api/quiz/${quizId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
    } catch (err) {
      setError('Failed to delete quiz');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorAlert message={error} />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map(quiz => (
        <div
          key={quiz._id}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold mb-2">{quiz.title}</h3>
          <p className="text-gray-600 mb-4">{quiz.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">
              Questions: {quiz.questions.length}
            </span>
            <button
              onClick={() => handleDelete(quiz._id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}