import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../store/languageStore';
import { Globe } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'te' : 'en');
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 bg-rose-100 px-4 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-rose-200 flex items-center gap-2"
    >
      <Globe className="w-5 h-5 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
      <span className="text-rose-600 font-medium">
        {language === 'en' ? 'తెలుగు' : 'English'}
      </span>
    </motion.button>
  );
};