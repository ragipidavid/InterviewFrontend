import React, { useState, useRef } from 'react';

const TextToSpeech = ({ text }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());

  const generateAndPlaySpeech = async () => {
    if (isLoading || isPlaying) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3001/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });

      if (!response.ok) {
        throw new Error('Failed to generate speech');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      audioRef.current.src = audioUrl;
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onplay = () => setIsPlaying(true);
      audioRef.current.onpause = () => setIsPlaying(false);
      
      await audioRef.current.play();
    } catch (error) {
      console.error("Error generating or playing speech:", error);
      alert("An error occurred while generating or playing the speech.");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else if (audioRef.current.src) {
      audioRef.current.play();
    } else {
      generateAndPlaySpeech();
    }
  };

  return (
    <button 
      className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50"
      onClick={togglePlayPause}
      disabled={isLoading}
      aria-label={isLoading ? 'Generating speech' : (isPlaying ? 'Pause' : 'Play')}
    >
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {isLoading ? (
          <>
            <rect x="6" y="4" width="4" height="16" fill="currentColor" opacity="0.5">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="1s" repeatCount="indefinite" />
            </rect>
            <rect x="14" y="4" width="4" height="16" fill="currentColor" opacity="0.5">
              <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
            </rect>
          </>
        ) : isPlaying ? (
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
