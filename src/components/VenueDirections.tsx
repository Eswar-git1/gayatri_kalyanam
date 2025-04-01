import React from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const venueDetails = {
  en: {
    title: 'Wedding Venue & Directions',
    venueName: 'Venue Name',
    address: 'Venue Full Address',
    directions: 'Directions to reach the venue',
    landmarks: [
      'Landmark 1',
      'Landmark 2',
      'Landmark 3'
    ],
    mapLink: 'Google Maps Link'
  },
  te: {
    title: 'వివాహ వేదిక & దిశలు',
    venueName: 'వేదిక పేరు',
    address: 'వేదిక పూర్తి చిరునామా',
    directions: 'వేదికకు చేరుకోవడానికి దిశలు',
    landmarks: [
      'లాండ్‌మార్క్ 1',
      'లాండ్‌మార్క్ 2',
      'లాండ్‌మార్క్ 3'
    ],
    mapLink: 'Google Maps లింక్'
  }
};

export const VenueDirections: React.FC<Props> = ({ language }) => {
  const content = venueDetails[language];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-serif text-deep-rose text-center mb-12"
        >
          {content.title}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-pink-50 rounded-2xl p-8 shadow-lg"
        >
          <h3 className="text-2xl font-serif text-deep-rose mb-4">
            {content.venueName}
          </h3>
          <p className="text-gray-700 mb-6">{content.address}</p>
          
          <div className="mb-6">
            <h4 className="text-xl font-serif text-deep-rose mb-3">
              {language === 'en' ? 'How to Reach' : 'ఎలా చేరుకోవాలి'}
            </h4>
            <p className="text-gray-700">{content.directions}</p>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-serif text-deep-rose mb-3">
              {language === 'en' ? 'Nearby Landmarks' : 'సమీప ప్రదేశాలు'}
            </h4>
            <ul className="list-disc list-inside text-gray-700">
              {content.landmarks.map((landmark, index) => (
                <li key={index} className="mb-2">{landmark}</li>
              ))}
            </ul>
          </div>

          <a
            href={content.mapLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-deep-rose text-white px-6 py-3 rounded-full 
              hover:bg-deep-rose/90 transition-colors duration-300"
          >
            {language === 'en' ? 'Open in Google Maps' : 'Google Maps లో తెరవండి'}
          </a>
        </motion.div>
      </div>
    </section>
  );
};