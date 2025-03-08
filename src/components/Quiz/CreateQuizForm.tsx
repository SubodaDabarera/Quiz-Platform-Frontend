import { useForm, FieldValues } from 'react-hook-form';
import axios from 'axios';
import { Question } from '@/types';
import { useState } from 'react';
import useQuiz from '../../hooks/useQuiz';

interface CreateQuizFormProps {
  onSuccess: () => void;
}

export default function CreateQuizForm({ onSuccess }: CreateQuizFormProps) {
  const { register, handleSubmit, control } = useForm();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [error, setError] = useState('');
  const {createQuiz} = useQuiz()

  const addQuestion = () => {
    setQuestions([...questions, {
      text: '',
      options: ['', '', ''],
      correctAnswer: '',
      timeLimit: 15
    }]);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      await createQuiz(data, questions)
      onSuccess();
    } catch (err) {
      setError('Failed to create quiz');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        <input
          {...register('title')}
          placeholder="Quiz Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          {...register('description')}
          placeholder="Quiz Description"
          className="w-full p-2 border rounded"
          rows={3}
        />
      </div>

      <div className="space-y-8">
        {questions.map((_, index) => (
          <div key={index} className="border p-4 rounded-lg">
            <div className="space-y-4">
              <input
                value={questions[index].text}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].text = e.target.value;
                  setQuestions(newQuestions);
                }}
                placeholder="Question Text"
                className="w-full p-2 border rounded"
                required
              />
              
              <div className="space-y-2">
                {[0, 1, 2].map((optionIndex) => (
                  <input
                    key={optionIndex}
                    value={questions[index].options[optionIndex]}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[index].options[optionIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    placeholder={`Option ${optionIndex + 1}`}
                    className="w-full p-2 border rounded"
                    required
                  />
                ))}
              </div>

              <select
                value={questions[index].correctAnswer}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[index].correctAnswer = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Correct Answer</option>
                {questions[index].options.map((option, i) => (
                  <option key={i} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Quiz
        </button>
      </div>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
}