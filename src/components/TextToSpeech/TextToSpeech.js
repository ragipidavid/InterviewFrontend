import React, { useState, useEffect, useRef } from 'react';

const TextToSpeech = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const speechSynthesis = useRef(window.speechSynthesis);
  const utteranceRef = useRef(null);

  useEffect(() => {
    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.onend = () => setIsPlaying(false);

    return () => {
      speechSynthesis.current.cancel();
    };
  }, [text]);

  const togglePlayPause = () => {
    if (isPlaying) {
      speechSynthesis.current.cancel();
      setIsPlaying(false);
    } else {
      speechSynthesis.current.speak(utteranceRef.current);
      setIsPlaying(true);
    }
  };

  return (
    <button 
      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300"
      onClick={togglePlayPause}
      aria-label={isPlaying ? 'Pause' : 'Play'}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {isPlaying ? (
          <>
            <rect x="6" y="4" width="4" height="16" fill="currentColor">
              <animate attributeName="height" values="16;4;16" dur="1s" repeatCount="indefinite" />
              <animate attributeName="y" values="4;10;4" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="14" y="4" width="4" height="16" fill="currentColor">
              <animate attributeName="height" values="4;16;4" dur="1s" repeatCount="indefinite" />
              <animate attributeName="y" values="10;4;10" dur="1s" repeatCount="indefinite" />
            </rect>
          </>
        ) : (
          <path 
            d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z"
            fill="currentColor"
          />
        )}
      </svg>
    </button>
  );
};

export default TextToSpeech;
