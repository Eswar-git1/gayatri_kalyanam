import React, { useState, useEffect } from 'react';
import { LanguageSelector } from './components/LanguageSelector';
import { HeroSection } from './components/HeroSection';
import { CoupleProfile } from './components/CoupleProfile';
import { EventDetails } from './components/EventDetails';
import { StoryTimeline } from './components/StoryTimeline';
import { AudioPlayer } from './components/AudioPlayer';
import { GuestMessageBoard } from './components/GuestMessageBoard';
import { PhotoGallery } from './components/PhotoGallery';
import { OurGallery } from './components/OurGallery';
import { RsvpForm } from './components/RsvpForm';
import { BackButton } from './components/BackButton';
import { useLanguageStore } from './store/languageStore';
import { LanguageToggle } from './components/LanguageToggle';
import { ContactSupport } from './components/ContactSupport';
import { AnimatePresence, motion } from 'framer-motion';
import { ParticlesBackground } from './components/ParticlesBackground';
import { CursorEffect } from './components/CursorEffect';
import { LoadingScreen } from './components/LoadingScreen';
import { triggerConfetti } from './utils/confetti';
import { ArrowUp } from 'lucide-react';
import { Language } from './types';

type Section = 'home' | 'messages' | 'gallery' | 'rsvp' | 'our-gallery';

export const App: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Reset language on page refresh
  useEffect(() => {
    return setLanguage(null as Language);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!language) {
    return <LanguageSelector />;
  }

  const renderSection = () => {
    switch (currentSection) {
      case 'messages':
        return <GuestMessageBoard language={language} />;
      case 'gallery':
        return <PhotoGallery language={language} />;
      case 'our-gallery':
        return <OurGallery language={language} />;
      case 'rsvp':
        return <RsvpForm language={language} />;
      default:
        return (
          <>
            <HeroSection language={language} />
            <CoupleProfile language={language} />
            <StoryTimeline language={language} />
            <EventDetails language={language} />
            <OurGallery language={language} />
          </>
        );
    }
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-peach to-pastel-gold">
        <CursorEffect />
        <ParticlesBackground />
        <LanguageToggle />
        
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="fixed bottom-4 left-4 z-50 bg-deep-rose/90 text-white p-3 rounded-full shadow-lg 
                hover:bg-deep-rose hover:scale-110 transition-all duration-300"
            >
              <ArrowUp size={24} />
            </motion.button>
          )}
        </AnimatePresence>

        {currentSection !== 'home' && (
          <BackButton onBack={() => setCurrentSection('home')} />
        )}
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
        
        {currentSection === 'home' && (
          <>
            <motion.div 
              className="fixed bottom-20 right-4 z-50 flex flex-col gap-4"
              animate={{ y: [0, -10, 0] }}
              transition={{ 
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
            >
              <button
                onClick={() => {
                  setCurrentSection('messages');
                  triggerConfetti();
                }}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl 
                  transition-all duration-300 hover:scale-110 hover:bg-deep-rose hover:text-white"
                >
                  {language === 'en' ? 'Messages' : 'సందేశాలు'}
                </button>
              <button
                onClick={() => setCurrentSection('gallery')}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {language === 'en' ? 'Share Photos' : 'ఫోటోలు షేర్ చేయండి'}
              </button>
              <button
                onClick={() => setCurrentSection('rsvp')}
                className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              >
                RSVP
              </button>
            </motion.div>
            <ContactSupport language={language} />
          </>
        )}
        
        <AudioPlayer />
      </div>
    </>
  );
};