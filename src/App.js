import React from "react";
import InterviewPractice from "./components/interview-practice";

function App() {
  return (
    <div className="App bg-white text-black min-h-screen">
      <h1 className="text-3xl font-bold text-black p-4 text-center border-b border-gray-200">
        Interview Buddy
      </h1>
      <InterviewPractice />
    </div>
  );
}

export default App;
