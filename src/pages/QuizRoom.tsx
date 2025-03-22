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
  const [isLastQuestion, setIsLastQuestion] = useState(false);

  const [quizStarted, setQuizStarted] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    if (!socket || !quizId) return;

    const username = localStorage.getItem("username") || "Anonymous";
    socket.emit("joinQuiz", quizId, username);

    socket.on(
      "questionUpdate",
      (data: {
        text: string;
        options: string[];
        timeLimit: number;
        isLastQuestion: boolean;
      }) => {
        setIsLastQuestion(data.isLastQuestion);
        setQuizStarted(true);
        setCurrentQuestion(data.text);
        setOptions(data.options);
        setTimeLeft(data.timeLimit);

        //Clear any existing interval first
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }

        // Start new countdown timer
        intervalRef.current = setInterval(() => {
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
      setTimeout(() => setSelectedAnswer(null), timeLeft * 1000);
    }
  };

  const handleStartQuiz = () => {
    socket?.emit("startQuiz", quizId);
  };

  return (
    <div className="container mx-auto p-4">
      <div
        className="p-6 mb-6 bg-white rounded-lg shadow-lg"
        style={{
          minHeight: "30vh",
        }}
      >
        {isLastQuestion && timeLeft == 0 ? (
          <div className="flex flex-col justify-between">
            <div className="text-gray-500 border p-4 text-center">
              End of questions
            </div>

            <div className="flex justify-center m-4 py-4 border-2 border-yellow-400 text-center">
              Won by :
              {players.length && (
                <div className="font-bold ms-4">{players[0].username}</div>
              )}
            </div>
          </div>
        ) : (
          <>
            {quizStarted ? (
              <>
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
                      className={`p-4 rounded-lg text-left transition-all ${
                        selectedAnswer === option
                          ? "bg-blue-500 text-white scale-105"
                          : "bg-blue-100 hover:bg-blue-200"
                      }`}
                      disabled={!!selectedAnswer}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center h-full w-full">
                <button
                  className="bg-green-600 p-2 text-white"
                  onClick={handleStartQuiz}
                >
                  Start Quiz
                </button>
              </div>
            )}
          </>
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
