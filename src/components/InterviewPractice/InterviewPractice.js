import React, { useState } from "react";
import QuestionSection from "./QuestionSection";
import CodeEditor from "./CodeEditor";
import FeedbackSection from "./FeedbackSection";
import ConversationInput from "./ConversationInput";

export default function InterviewPractice() {
  const [code, setCode] = useState('');
  const [feedbacks, setFeedbacks] = useState([
    { author: "Feedback", message: "Your solution looks good! Consider optimizing the space complexity." },
    { author: "User", message: "Can you explain how I can improve the space complexity?" },
    { author: "AI Assistant", message: "To improve space complexity, you can merge the arrays in-place by using the fact that they are already sorted. Start from the end of the longer array and compare elements, moving the larger ones to the end. This way, you don't need an additional array for merging." }
  ]);

  const questionText = "Implement a function that takes two sorted arrays and merges them into a single sorted array without using any built-in sorting functions.";

  const handleSendMessage = (message) => {
    setFeedbacks([...feedbacks, { author: "User", message }]);
    // Here you would typically send the message to your backend/AI and get a response
    // For now, we'll just add a mock response
    setTimeout(() => {
      setFeedbacks(prev => [...prev, { author: "AI Assistant", message: "This is a mock response to your message." }]);
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-4 bg-white text-black h-[calc(100vh-4rem)]">
      {/* Left side */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        <QuestionSection questionText={questionText} />
        <CodeEditor code={code} setCode={setCode} />
      </div>
      
      {/* Right side */}
      <div className="lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Feedback & Conversation</h2>
        <FeedbackSection feedbacks={feedbacks} />
        <ConversationInput onSend={handleSendMessage} />
      </div>
    </div>
  );
}
