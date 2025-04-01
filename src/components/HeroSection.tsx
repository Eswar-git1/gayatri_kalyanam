import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { translations } from '../types';
import { CountdownTimer } from './CountdownTimer';
import { Heart } from 'lucide-react';

interface HeroSectionProps {
  language: Language;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language }) => {
  const t = translations[language];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative text-center"
      style={{
        backgroundImage: "url('https://iljgehznrwbicyhigjdr.supabase.co/storage/v1/object/public/wedding-photos//Compressed_Imagebackground.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Semi-transparent overlay with stronger opacity */}
      <div className="absolute inset-0 bg-white/85" />
      
      {/* Content container */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center"
        >
          <Heart className="w-16 h-16 text-rose-600 drop-shadow-lg" />
        </motion.div>
      
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl text-rose-600 font-serif mb-4 font-bold drop-shadow-md"
        >
          {language === 'en' ? 'Gayathri weds Eswar' : 'గాయత్రి వెడ్స్ ఈశ్వర్'}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="text-2xl md:text-3xl text-deep-rose mb-2 font-serif italic"
        >
          {language === 'en' ? 'Together in Love, Forever in Joy' : 'ప్రేమతో కలిసి, ఆనందంతో ఎప్పటికీ'}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl md:text-3xl text-gray-800 mb-2 font-medium"
        >
          {language === 'en' ? 'Join us in celebrating our wedding' : 'మా వివాహ వేడుకలో పాల్గొనండి'}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl md:text-2xl text-rose-600 font-serif mb-8 font-bold drop-shadow-md"
        >
          {language === 'en' ? 'May 15, 2025' : 'మే 15, 2025'}
        </motion.p>

        <CountdownTimer language={language} />
      </div>
    </motion.div>
  );
};