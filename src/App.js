import React from "react";
import InterviewPractice from "./components/InterviewPractice/InterviewPractice";

function App() {
  return (
    <div className="App bg-white text-black h-screen flex flex-col">
      <h1 className="text-3xl font-bold text-black p-4 text-center border-b border-gray-200">
        Interview Buddy
      </h1>
      <div className="flex-grow overflow-hidden">
        <InterviewPractice />
      </div>
    </div>
  );
}

export default App;
