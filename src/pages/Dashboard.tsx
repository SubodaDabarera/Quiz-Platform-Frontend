import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Quiz {
  _id: string;
  title: string;
  description: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    axios.get('/api/quiz').then(res => setQuizzes(res.data));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Available Quizzes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quizzes.map(quiz => (
          <Link
            key={quiz._id}
            to={`/quiz/${quiz._id}`}
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-xl font-semibold mb-2">{quiz.title}</h2>
            <p className="text-gray-600">{quiz.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}