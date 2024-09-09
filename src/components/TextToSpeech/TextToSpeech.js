import React, { useState, useRef, useEffect } from 'react';

const TextToSpeech = ({ text }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio());
  const speechSynthesisRef = useRef(null);
  const [isGitHubPages, setIsGitHubPages] = useState(false);

  useEffect(() => {
    setIsGitHubPages(window.location.hostname.includes('github.io'));
    
    if ('speechSynthesis' in window) {
      speechSynthesisRef.current = window.speechSynthesis;
    }

    generateSpeech();

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, [text]);

  const generateSpeech = async () => {
    setIsLoading(true);

    if (isGitHubPages) {
      if (speechSynthesisRef.current) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => setIsPlaying(false);
        // Store the utterance for later playback
        audioRef.current = utterance;
        setIsLoading(false);
      } else {
        console.error("Text-to-speech is not supported in this browser.");
        setIsLoading(false);
      }
    } else {
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
        
        audioRef.current = new Audio(audioUrl);
        audioRef.current.onended = () => setIsPlaying(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error generating speech:", error);
        setIsLoading(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (isGitHubPages) {
      if (isPlaying) {
        speechSynthesisRef.current.cancel();
        setIsPlaying(false);
      } else {
        speechSynthesisRef.current.speak(audioRef.current);
        setIsPlaying(true);
      }
    } else {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
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
