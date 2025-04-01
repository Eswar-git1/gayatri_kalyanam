import React from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../store/languageStore';
import type { Language } from '../types';
import { Heart } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { setLanguage } = useLanguageStore();

  const handleLanguageSelect = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-gradient-to-br from-pastel-pink via-pastel-peach to-pastel-gold overflow-auto"
    >
      <div className="flex flex-col items-center relative min-h-screen py-8">
        {/* Decorative header with leaves, bells and Ganesha */}
        <div className="relative w-full flex justify-center items-center mb-8">
          {/* Left side leaves and bells */}
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            src="https://iljgehznrwbicyhigjdr.supabase.co/storage/v1/object/public/wedding-photos//leaves%20and%20bells.png"
            alt="Decorative Leaves and Bells"
            className="w-32 md:w-40 lg:w-48 h-auto object-contain"
          />

          {/* Centered Ganesha */}
          <motion.img
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            src="https://iljgehznrwbicyhigjdr.supabase.co/storage/v1/object/public/wedding-photos//Ganesha.png"
            alt="Lord Ganesha"
            className="w-28 md:w-32 h-auto object-contain mx-4 md:mx-8 lg:mx-12 drop-shadow-xl"
          />

          {/* Right side leaves and bells */}
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            src="https://iljgehznrwbicyhigjdr.supabase.co/storage/v1/object/public/wedding-photos//leaves%20and%20bells.png"
            alt="Decorative Leaves and Bells"
            className="w-32 md:w-40 lg:w-48 h-auto object-contain transform scale-x-[-1]"
          />
        </div>

        {/* Main content with white box */}
        <div className="flex flex-col items-center px-4">
          <motion.p
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-2xl font-telugu text-deep-rose mb-6"
          >
            ఓం శ్రీగణేశాయ నమః
          </motion.p>

          <div className="bg-white/95 backdrop-blur-sm p-12 rounded-3xl shadow-2xl text-center max-w-lg w-full mx-4 mb-8">
            <div className="flex justify-between mb-8 text-xl font-telugu">
              <span className="text-yellow-600">శ్రీరస్తు</span>
              <span className="text-deep-rose">శుభమస్తు</span>
              <span className="text-green-600">అవిఘ్నమస్తు</span>
            </div>

            <Heart className="w-12 h-12 text-rose-600 mx-auto mb-6 drop-shadow-lg animate-pulse" />
            
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-4xl font-serif mb-2 text-rose-600 font-bold drop-shadow-md">
                Subhalekha
              </h1>
              <h2 className="text-3xl font-serif mb-4 text-rose-600 font-bold drop-shadow-md">
                Gayathri Kalyanam
              </h2>
            </motion.div>

            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-3xl font-serif mb-2 text-rose-600">Welcome</h3>
              <p className="text-2xl font-telugu mb-6 text-rose-600">స్వాగతం</p>
            </motion.div>

            <motion.p 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-700 mb-8 font-medium"
            >
              Please select your preferred language
            </motion.p>

            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <button
                onClick={() => handleLanguageSelect('en')}
                className="px-8 py-4 bg-rose-100 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 text-xl font-serif shadow-md hover:shadow-lg transform hover:-translate-y-1 font-semibold"
              >
                English
              </button>
              <button
                onClick={() => handleLanguageSelect('te')}
                className="px-8 py-4 bg-rose-100 text-rose-600 rounded-2xl hover:bg-rose-600 hover:text-white transition-all duration-300 text-xl font-telugu shadow-md hover:shadow-lg transform hover:-translate-y-1 font-semibold"
              >
                తెలుగు
              </button>
            </motion.div>
          </div>
        </div>

        {/* Wedding procession image */}
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          src="https://iljgehznrwbicyhigjdr.supabase.co/storage/v1/object/public/wedding-photos//Wedding%20procession.png"
          alt="Wedding Procession"
          className="w-full max-w-2xl h-auto -mt-8 px-4 mb-6"
        />
      </div>
    </motion.div>
  );
};