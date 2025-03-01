export interface User {
    _id: string;
    username: string;
    role: 'user' | 'admin';
  }
  
  export interface Question {
    text: string;
    options: string[];
    correctAnswer: string;
    timeLimit: number;
  }
  
  export interface Quiz {
    _id: string;
    title: string;
    description?: string;
    questions: Question[];
    createdBy: User;
  }
  
  export interface Player {
    socketId: string;
    username: string;
    score: number;
  }