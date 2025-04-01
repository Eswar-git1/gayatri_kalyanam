import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause, Play } from 'lucide-react';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    // Create audio context on first user interaction
    const handleFirstInteraction = () => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3; // Set initial volume to 30%
      }
      document.removeEventListener('click', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    return () => document.removeEventListener('click', handleFirstInteraction);
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={togglePlay}
        className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 text-deep-rose group-hover:scale-110 transition-transform duration-300" />
        ) : (
          <Play className="w-6 h-6 text-deep-rose group-hover:scale-110 transition-transform duration-300" />
        )}
      </button>
      
      <audio
        ref={audioRef}
        src="/music/background-music.mp3"
        loop
        preload="auto"
      />
    </div>
  );
};