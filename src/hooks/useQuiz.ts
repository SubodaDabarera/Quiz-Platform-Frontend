import { FieldValues } from "react-hook-form";
import { axiosRequest } from "../utils/api";
import React from "react";

function useQuiz() {
  const getAllQuizes = async () => {
    const quizzes: any = await axiosRequest
      .get("/api/quiz")
      .then((res) => res.data);

    if (quizzes.length) {
      return quizzes;
    }

    return [];
  };

  const createQuiz = async (data: FieldValues, questions: any[]) => {
    await axiosRequest.post("/api/quiz", {
      title: data.title,
      description: data.description,
      questions,
    });
  };

  const deleteQuiz = () => {};

  return { getAllQuizes, createQuiz, deleteQuiz };
}

export default useQuiz;
