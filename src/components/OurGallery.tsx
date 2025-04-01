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
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={photo.photo_url}
                alt={photo.caption[language]}
                onError={(e) => {
                  console.error('Image failed to load:', photo.photo_url);
                  e.currentTarget.style.backgroundColor = '#eee';
                }}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-xl font-serif">
                  {photo.caption[language]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};