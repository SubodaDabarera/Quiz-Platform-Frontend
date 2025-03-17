import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocket } from "../contexts/SocketContext";
import { Player } from "../types";

export default function QuizRoom() {
  const { quizId } = useParams();
  const socket = useSocket();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [players, setPlayers] = useState<Player[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const [quizStarted, setQuizStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    if (!socket || !quizId) return;

    const username = localStorage.getItem("username") || "Anonymous";
    socket.emit("joinQuiz", quizId, username);

    socket.on(
      "questionUpdate",
      (data: { text: string; options: string[]; timeLimit: number }) => {
        setQuizStarted(true);
        setCurrentQuestion(data.text);
        setOptions(data.options);
        setTimeLeft(data.timeLimit);

        //Clear any existing interval first
        if(intervalRef.current){
          clearInterval(intervalRef.current)
        }

        // Start new countdown timer
        intervalRef.current = setInterval(() => {
          console.log("executing");
          setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);
      }
    );

    socket.on("playersUpdate", (players: Player[]) => {
      setPlayers(players);
      setShowStartButton(!quizStarted && players.length > 0);
    });

    socket.on("scoreUpdate", (updatedPlayers: Player[]) => {
      setPlayers(updatedPlayers);
    });

    return () => {
      socket.off("questionUpdate");
      socket.off("scoreUpdate");
      socket.off("playersUpdate");

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [socket, quizId]);

  const handleAnswer = (answer: string) => {
    if (!selectedAnswer) {
      setSelectedAnswer(answer);
      socket?.emit("submitAnswer", quizId, answer);
      setTimeout(() => setSelectedAnswer(null), 3000);
    }
  };

  const handleStartQuiz = () => {
    socket?.emit("startQuiz", quizId);
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

        {quizStarted ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === option
                    ? "bg-blue-500 text-white scale-105"
                    : "bg-blue-100 hover:bg-blue-200"
                } ${
                  //@ts-ignore
                  selectedAnswer && option === currentQuestion?.correctAnswer
                    ? "ring-2 ring-green-500"
                    : ""
                }`}
                disabled={!!selectedAnswer}
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <button
            className="bg-green-600 p-2 text-white"
            onClick={handleStartQuiz}
          >
            Start Quiz
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
        <div className="space-y-3">
          {!players.length ? (
            <div className="p-2 d-flex border text-center">
              No result found!
            </div>
          ) : (
            <>
              {players.map((player) => (
                <div
                  key={player.username}
                  className="flex justify-between items-center bg-gray-50 p-3 rounded"
                >
                  <span>{player.username}</span>
                  <span className="font-bold text-blue-600">
                    {player.score}
                  </span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
