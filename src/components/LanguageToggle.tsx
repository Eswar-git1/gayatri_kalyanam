import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../store/languageStore';
import { Language } from '../types';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return (
    <motion.button
      onClick={toggleLanguage}
      className="flex items-center justify-center bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-deep-rose font-medium text-sm">
        {language === 'en' ? 'తెలుగు' : 'English'}
      </span>
    </motion.button>
  );
};