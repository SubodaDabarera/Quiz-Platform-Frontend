import { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateQuizForm from '../components/Quiz/CreateQuizForm';
import QuizList from '../components/Quiz/QuizList';

export default function Admin() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          {showForm ? 'View Quizzes' : 'Create New Quiz'}
        </button>
      </div>

      {showForm ? (
        <CreateQuizForm onSuccess={() => setShowForm(false)} />
      ) : (
        <QuizList />
      )}
    </div>
  );
}