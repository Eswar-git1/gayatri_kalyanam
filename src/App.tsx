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
import { NavBar } from './components/NavBar';
import { SumuhurthamPlayer } from './components/SumuhurthamPlayer';

// Remove VenueDirections import
// Remove 'venue' from Section type
type Section = 'home' | 'messages' | 'gallery' | 'rsvp' | 'our-gallery' | 'couple' | 'story' | 'events' | 'support' | 'sumuhurtham';

export const App: React.FC = () => {
  // All hooks must be at the top level
  const { language, setLanguage } = useLanguageStore();
  const [currentSection, setCurrentSection] = useState<Section>('home');
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isLoading, setIsLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // All useEffects together
  useEffect(() => {
    setLanguage(null as Language);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Add a new state to track which modal is open
  const [activeModal, setActiveModal] = useState<Section | null>(null);

  // Functions after hooks
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSectionChange = (section: Section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setActiveSection(section);
    setCurrentSection(section);
    
    // Close any open modal when navigating to a main section
    setActiveModal(null);
  };

  // Add a function to handle modal sections
  const handleModalOpen = (section: Section) => {
    setActiveModal(section);
  };

  const handleModalClose = () => {
    setActiveModal(null);
  };

  // Early return after hooks
  if (!language) {
    return <LanguageSelector />;
  }

  // Render method
  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen />}
      </AnimatePresence>
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink via-pastel-peach to-pastel-gold">
        <CursorEffect />
        <ParticlesBackground />
        <NavBar language={language} setCurrentSection={handleSectionChange} activeSection={activeSection} />
        
        <main className="pt-16"> {/* Added padding-top to account for fixed navbar */}
          <section id="home">
            <HeroSection language={language} />
          </section>
          
          <section id="couple">
            <CoupleProfile language={language} />
          </section>
          
          <section id="story">
            <StoryTimeline language={language} />
          </section>
          
          <section id="sumuhurtham">
            <SumuhurthamPlayer language={language} />
          </section>
          
          <section id="events">
            <EventDetails language={language} />
          </section>
          
          {/* Remove the standalone SumuhurthamPlayer from here */}
          {/* <SumuhurthamPlayer language={language} /> */}
          
          <section id="our-gallery">
            <OurGallery language={language} />
          </section>
          
          <section id="support">
            <ContactSupport language={language} />
          </section>

          {/* These sections will be accessed via floating buttons only, not through scrolling */}
          <div className="hidden">
            <section id="messages">
              <GuestMessageBoard language={language} />
            </section>

            <section id="gallery">
              <PhotoGallery language={language} />
            </section>

            <section id="rsvp">
              <RsvpForm language={language} />
            </section>
          </div>
        </main>

        {/* Floating action buttons - always visible */}
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
              handleModalOpen('messages');
              triggerConfetti();
            }}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl 
              transition-all duration-300 hover:scale-110 hover:bg-deep-rose hover:text-white"
          >
            {language === 'en' ? 'Messages' : 'సందేశాలు'}
          </button>
          <button
            onClick={() => handleModalOpen('gallery')}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {language === 'en' ? 'Share Photos' : 'ఫోటోలు షేర్ చేయండి'}
          </button>
          <button
            onClick={() => handleModalOpen('rsvp')}
            className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            RSVP
          </button>
        </motion.div>

        {/* Modal sections */}
        <AnimatePresence>
          {activeModal === 'messages' && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 bg-deep-rose text-white rounded-full p-2 hover:bg-deep-rose/80 transition-colors"
                >
                  ✕
                </button>
                <div className="p-6">
                  <GuestMessageBoard language={language} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeModal === 'gallery' && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 bg-deep-rose text-white rounded-full p-2 hover:bg-deep-rose/80 transition-colors"
                >
                  ✕
                </button>
                <div className="p-6">
                  <PhotoGallery language={language} />
                </div>
              </motion.div>
            </motion.div>
          )}

          {activeModal === 'rsvp' && (
            <motion.div 
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleModalClose}
            >
              <motion.div 
                className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={handleModalClose}
                  className="absolute top-4 right-4 bg-deep-rose text-white rounded-full p-2 hover:bg-deep-rose/80 transition-colors"
                >
                  ✕
                </button>
                <div className="p-6">
                  <RsvpForm language={language} />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
        
        <AudioPlayer />
      </div>
    </>
  );
};