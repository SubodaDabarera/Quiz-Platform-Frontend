import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
      <div className="min-h-screen flex justify-center align-middle bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col justify-center align-middle">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">Welcome to QuizHub</h1>
            <p className="text-xl mb-8">Create, play, and compete in real-time quizzes</p>
            <div className="space-x-4">
              <Link 
                to="/register" 
                className="bg-blue-500 px-8 py-3 rounded-lg text-lg hover:bg-blue-600"
              >
                Get Started
              </Link>
              <Link 
                to="/dashboard" 
                className="bg-gray-700 px-8 py-3 rounded-lg text-lg hover:bg-gray-600"
              >
                Browse Quizzes
              </Link>
            </div>
          </div>
  
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Real-Time Competition</h3>
              <p>Compete with others in live quizzes with instant leaderboards</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-4">Create & Share</h3>
              <p>Build your own quizzes and share them with the community</p>
            </div>
          </div>
        </div>
      </div>
    );
  }