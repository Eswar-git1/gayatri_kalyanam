import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LanguageToggle } from './LanguageToggle';
import { Menu, X } from 'lucide-react';
import type { Language, Section } from '../types';

interface Props {
  language: Language;
  setCurrentSection: (section: Section) => void;
  activeSection: Section;
}

export const NavBar: React.FC<Props> = ({ language, setCurrentSection, activeSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Updated navigation items with the requested section names
  const navItems = [
    { id: 'home', label: language === 'en' ? 'Home' : 'హోమ్' },
    { id: 'couple', label: language === 'en' ? 'Couple Profile' : 'జంట ప్రొఫైల్' },
    { id: 'story', label: language === 'en' ? 'Our Story' : 'మా కథ' },
    { id: 'sumuhurtham', label: language === 'en' ? 'Sumuhurtham' : 'సుముహుర్తం' },
    { id: 'events', label: language === 'en' ? 'Venue' : 'వేదిక' },
    { id: 'our-gallery', label: language === 'en' ? 'Our Gallery' : 'మా గ్యాలరీ' },
    { id: 'support', label: language === 'en' ? 'Guest Support' : 'అతిథి మద్దతు' }
  ];

  const handleNavClick = (section: Section) => {
    setCurrentSection(section);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between">
          <div className="w-1/6">
            {/* Empty div for spacing */}
          </div>
          <ul className="flex items-center justify-center space-x-6 py-3 w-4/6">
            {navItems.map((item) => (
              <li key={item.id}>
                <motion.button
                  onClick={() => handleNavClick(item.id as Section)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 whitespace-nowrap
                    ${activeSection === item.id ? 'bg-deep-rose text-white' : 'text-gray-700 hover:bg-deep-rose/10'}
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.label}
                </motion.button>
              </li>
            ))}
          </ul>
          <div className="w-1/6 flex justify-end">
            <LanguageToggle />
          </div>
        </div>

        {/* Mobile Navigation - Enhanced styling */}
        <div className="md:hidden flex items-center justify-between py-3">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-deep-rose p-2 rounded-full bg-pastel-pink/20 hover:bg-pastel-pink/40 transition-colors duration-300 focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="flex items-center">
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu - Enhanced styling with color palette */}
      {isMenuOpen && (
        <motion.div 
          className="md:hidden bg-gradient-to-b from-white to-pastel-pink/30 shadow-lg"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ul className="flex flex-col py-2">
            {navItems.map((item) => (
              <li key={item.id} className="border-b border-pastel-pink/20 last:border-b-0">
                <button
                  onClick={() => handleNavClick(item.id as Section)}
                  className={`w-full text-left px-4 py-4 text-sm font-medium transition-all duration-200
                    ${activeSection === item.id 
                      ? 'bg-deep-rose/10 text-deep-rose font-bold pl-6' 
                      : 'text-gray-700 hover:bg-pastel-pink/20 hover:pl-6'}
                  `}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </nav>
  );
};