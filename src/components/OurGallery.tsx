import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  language: Language;
}

interface GalleryPhoto {
  id: string;
  photo_url: string;
  caption: {
    en: string;
    te: string;
  };
  approved: boolean;
}

export const OurGallery: React.FC<Props> = ({ language }) => {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  async function fetchPhotos() {
    try {
      const { data, error } = await supabase
        .from('gallery_photos')
        .select('*')
        .eq('approved', true)
        .order('created_at');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (data) {
        console.log('Raw data from database:', data);
        
        const photosWithUrls = data.map(photo => {
          // Parse the caption if it's a string
          const parsedCaption = typeof photo.caption === 'string' 
            ? JSON.parse(photo.caption) 
            : photo.caption;
          
          return {
            ...photo,
            photo_url: photo.photo_url,
            caption: parsedCaption
          };
        });
        
        console.log('Final photos array:', photosWithUrls);
        setPhotos(photosWithUrls);
      } else {
        console.log('No data returned from Supabase');
      }
    } catch (error) {
      console.error('Error in fetchPhotos:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-pastel-pink">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-12">
          {language === 'en' ? 'Our Gallery' : 'మా గ్యాలరీ'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ 
                opacity: 1, 
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{ 
                duration: 1,
                delay: index * 0.2,
                ease: [0.25, 0.1, 0.25, 1]
              }}
              className="flex flex-col group"
            >
              <motion.div 
                className="relative aspect-square rounded-xl overflow-hidden mb-3 shadow-lg"
                whileHover={{ 
                  scale: 1.03,
                  rotateZ: [0, -1, 1, 0],
                }}
                whileTap={{ 
                  scale: 1.03,
                  rotateZ: [0, -1, 1, 0],
                }}
                transition={{
                  scale: { duration: 0.3 },
                  rotateZ: {
                    repeat: 0,
                    duration: 0.5
                  }
                }}
              >
                <img
                  src={photo.photo_url}
                  alt={photo.caption[language]}
                  onError={(e) => {
                    console.error('Image failed to load:', photo.photo_url);
                    e.currentTarget.style.backgroundColor = '#eee';
                  }}
                  className="w-full h-full object-cover transform transition-all duration-700 group-hover:saturate-110 touch-manipulation"
                />
              </motion.div>
              <motion.p 
                className="text-gray-700 text-center font-serif text-lg px-2 relative"
                initial={{ opacity: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  color: 'rgb(190, 24, 93)' // deep-rose color
                }}
                whileTap={{ 
                  scale: 1.02,
                  color: 'rgb(190, 24, 93)' // deep-rose color
                }}
                transition={{ duration: 0.3 }}
              >
                {photo.caption[language]}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};