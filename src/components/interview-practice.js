import React, { useState } from "react"

export default function InterviewPractice() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [code, setCode] = useState('')

  const questionText = "Implement a function that takes two sorted arrays and merges them into a single sorted array without using any built-in sorting functions."

  const speakQuestion = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(questionText)
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      speechSynthesis.speak(utterance)
    } else {
      alert("Sorry, your browser doesn't support text to speech!")
    }
  }

  return (
    <div className="container mx-auto p-4 h-screen flex flex-col lg:flex-row gap-4 bg-white text-black">
      {/* Left side */}
      <div className="lg:w-1/2 flex flex-col gap-4">
        {/* Question section */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex-grow flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Question</h2>
            <button 
              className="border border-gray-300 rounded p-2 hover:bg-gray-100"
              onClick={speakQuestion}
              disabled={isSpeaking}
            >
              {isSpeaking ? 'Speaking...' : 'Read Aloud'}
            </button>
          </div>
          <p className="text-gray-700 mb-4">
            {questionText}
          </p>
          <div className="flex-grow flex flex-col">
            <div className="bg-gray-800 text-white p-2 rounded-t-lg flex justify-between items-center">
              <span>Code Editor</span>
              <button className="bg-blue-500 text-white px-2 py-1 rounded text-sm hover:bg-blue-600">
                Run Code
              </button>
            </div>
            <textarea 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-grow resize-none p-4 font-mono text-sm bg-gray-900 text-green-400 rounded-b-lg focus:outline-none"
              placeholder="// Type your code here..."
            />
          </div>
        </div>
      </div>
      
      {/* Right side */}
      <div className="lg:w-1/2 bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col">
        <h2 className="text-2xl font-bold mb-4">Feedback & Conversation</h2>
        <div className="flex-grow mb-4 overflow-auto">
          <div className="space-y-4">
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="font-semibold">Feedback:</h3>
              <p className="text-gray-700">Your solution looks good! Consider optimizing the space complexity.</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="font-semibold">User:</h3>
              <p className="text-gray-700">Can you explain how I can improve the space complexity?</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <h3 className="font-semibold">AI Assistant:</h3>
              <p className="text-gray-700">To improve space complexity, you can merge the arrays in-place by using the fact that they are already sorted. Start from the end of the longer array and compare elements, moving the larger ones to the end. This way, you don't need an additional array for merging.</p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <textarea 
            placeholder="Type your message..." 
            className="flex-grow resize-none p-2 border border-gray-300 rounded"
          />
          <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">Send</button>
        </div>
      </div>
    </div>
  )
}
