import React from 'react';

const FeedbackSection = ({ feedbacks }) => (
  <div className="flex-grow mb-4 overflow-auto">
    <div className="space-y-4">
      {feedbacks.map((feedback, index) => (
        <div key={index} className="bg-gray-50 p-3 rounded-md border border-gray-200">
          <h3 className="font-semibold">{feedback.author}:</h3>
          <p className="text-gray-700">{feedback.message}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeedbackSection;
