import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

export const SumuhurthamPlayer: React.FC<Props> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="sumuhurtham" className="py-20 px-4 bg-gradient-to-br from-white to-pastel-pink/30">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-serif text-deep-rose mb-6">
          {language === 'en' ? 'Sumuhurtham' : 'సుముహుర్తం'}
        </h2>
        <p className="text-gray-600 mb-8">
          {language === 'en' 
            ? 'Listen to the auspicious time and details of our wedding ceremony' 
            : 'మా వివాహ వేడుక యొక్క శుభ సమయం మరియు వివరాలను వినండి'}
        </p>
        
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto"
          whileHover={{ scale: 1.02 }}
        >
          <audio 
            ref={audioRef} 
            src="/music/Sumuhurtham.mp3" 
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className="flex items-center justify-center gap-6">
            <motion.button
              onClick={togglePlayback}
              className="bg-deep-rose text-white p-5 rounded-full shadow-md hover:bg-opacity-90 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isPlaying ? <Pause size={28} /> : <Play size={28} />}
            </motion.button>
            
            <motion.button
              onClick={toggleMute}
              className="bg-gray-100 text-gray-700 p-4 rounded-full shadow-md hover:bg-gray-200 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </motion.button>
          </div>
          
          <p className="mt-6 text-gray-500">
            {language === 'en' ? 'Sumuhurtham Audio' : 'సుముహుర్తం ఆడియో'}
          </p>
        </motion.div>
      </div>
    </section>
  );
};