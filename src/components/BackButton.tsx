import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useLanguageStore } from '../store/languageStore';
import { motion } from 'framer-motion';

interface Props {
  onBack: () => void;
}

export const BackButton: React.FC<Props> = ({ onBack }) => {
  const { language } = useLanguageStore();

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onBack}
      className="fixed top-6 left-6 z-50 bg-rose-100 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:bg-rose-200"
    >
      <ArrowLeft className="w-6 h-6 text-rose-600 group-hover:scale-110 transition-transform duration-300" />
      <span className="sr-only">{language === 'en' ? 'Back' : 'వెనుకకు'}</span>
    </motion.button>
  );
};