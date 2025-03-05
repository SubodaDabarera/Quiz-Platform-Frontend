import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { useSocket } from '@/contexts/SocketContext';
import {useSocket} from '../contexts/SocketContext'
import { Player } from '../types';

export default function QuizRoom() {
  const { quizId } = useParams();
  const socket = useSocket();
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!socket || !quizId) return;

    const username = localStorage.getItem('username') || 'Anonymous';
    socket.emit('joinQuiz', quizId, username);

    socket.on('questionUpdate', (question: string, options: string[], timeLimit: number) => {
      setCurrentQuestion(question);
      setOptions(options);
      setTimeLeft(timeLimit);
    });

    socket.on('scoreUpdate', (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers.sort((a, b) => b.score - a.score));
    });

    return () => {
      socket.off('questionUpdate');
      socket.off('scoreUpdate');
    };
  }, [socket, quizId]);

  const handleAnswer = (answer: string) => {
    socket?.emit('submitAnswer', quizId, answer);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{currentQuestion}</h2>
          <div className="text-xl font-semibold text-blue-500">
            Time Left: {timeLeft}s
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className="p-4 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors text-left"
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {players.map((player) => (
            <div
              key={player.socketId}
              className="flex justify-between items-center bg-gray-50 p-3 rounded"
            >
              <span>{player.username}</span>
              <span className="font-bold text-blue-600">{player.score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}