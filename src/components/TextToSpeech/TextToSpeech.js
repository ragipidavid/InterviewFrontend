import React, { useState } from 'react';
import OpenAI from 'openai';

const TextToSpeech = ({ text }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [audio, setAudio] = useState(null);

  const speakText = async () => {
    if (isSpeaking) return;

    setIsSpeaking(true);

    try {
      const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true // This allows using the API key in the browser. Be cautious with this.
      });

      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "alloy",
        input: text,
      });

      const blob = new Blob([await mp3.arrayBuffer()], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setAudio(new Audio(url));

    } catch (error) {
      console.error("Error generating speech:", error);
      alert("An error occurred while generating the speech.");
    } finally {
      setIsSpeaking(false);
    }
  };

  const playAudio = () => {
    if (audio) {
      audio.play();
    }
  };

  return (
    <button 
      className="border border-gray-300 rounded p-2 hover:bg-gray-100 disabled:opacity-50"
      onClick={audio ? playAudio : speakText}
      disabled={isSpeaking}
    >
      {isSpeaking ? 'Generating...' : (audio ? 'Play Audio' : 'Generate Speech')}
    </button>
  );
};

export default TextToSpeech;
