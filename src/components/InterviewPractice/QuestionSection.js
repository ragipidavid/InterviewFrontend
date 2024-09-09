import React, { useState, useEffect, useRef } from 'react';
import TextToSpeech from '../TextToSpeech/TextToSpeech';

const QuestionSection = ({ questionText }) => {
  const [expanded, setExpanded] = useState(false);
  const contentRef = useRef(null);
  const [showExpandButton, setShowExpandButton] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      const isOverflowing = contentRef.current.scrollHeight > contentRef.current.clientHeight;
      setShowExpandButton(isOverflowing);
    }
  }, [questionText]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Question</h2>
        <TextToSpeech text={questionText} />
      </div>
      <div 
        ref={contentRef}
        className={`text-gray-700 mb-4 overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-full' : 'max-h-24'
        }`}
      >
        <p>{questionText}</p>
      </div>
      {showExpandButton && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="self-start text-blue-500 hover:text-blue-700 transition-colors duration-200"
        >
          {expanded ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

export default QuestionSection;
