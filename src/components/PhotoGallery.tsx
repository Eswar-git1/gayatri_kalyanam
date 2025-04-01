import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Upload, Image as ImageIcon } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

// Update translations
const translations = {
  en: {
    title: 'Share Your Moments',
    description: 'Share your captured moments from our wedding celebration. Your photos will help us cherish these memories forever.',
    upload: 'Upload Photo',
    caption: 'Add a caption',
    uploadedBy: 'Your Name',
    loading: 'Uploading...',
    success: 'Photo uploaded successfully!',
    error: 'Error uploading photo'
  },
  te: {
    title: 'మీ క్షణాలను పంచుకోండి',
    description: 'మా వివాహ వేడుకలో మీరు చిత్రీకరించిన క్షణాలను పంచుకోండి. మీ ఫోటోలు ఈ జ్ఞాపకాలను శాశ్వతంగా నిలుపుతాయి.',
    upload: 'ఫోటో అప్‌లోడ్ చేయండి',
    caption: 'క్యాప్షన్ జోడించండి',
    uploadedBy: 'మీ పేరు',
    loading: 'అప్‌లోడ్ అవుతోంది...',
    success: 'ఫోటో విజయవంతంగా అప్‌లోడ్ చేయబడింది!',
    error: 'ఫోటో అప్‌లోడ్‌లో లోపం'
  }
};

// Add interface for photo type
interface Photo {
  id: string;
  photo_url: string;
  caption?: string;
  uploaded_by?: string;
  approved: boolean;
}

export const PhotoGallery: React.FC<Props> = ({ language }): JSX.Element => {
  // Keep all state declarations at the top
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState('');
  const [uploadedBy, setUploadedBy] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = translations[language];

  useEffect(() => {
    fetchPhotos();
    const subscription = supabase
      .channel('guest_photos')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guest_photos' }, fetchPhotos)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function fetchPhotos() {
    const { data, error } = await supabase
      .from('guest_photos')
      .select('*');  // Remove all filters initially to see what data we get

    if (error) {
      console.error('Fetch error:', error);
      return;
    }

    console.log('Raw database response:', data);

    if (data && data.length > 0) {
      const validPhotos = data.map(photo => ({
        ...photo,
        photo_url: photo.photo_url.startsWith('/') ? photo.photo_url.slice(1) : photo.photo_url
      }));
      console.log('Processed photos:', validPhotos);
      setPhotos(validPhotos);
    }
  }

  // Remove handleUpload function (lines ~80-140)

  // Keep only these two functions
  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setSelectedFile(e.target.files[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedFile || !uploadedBy.trim()) return;

    setUploading(true);
    setStatus('loading');

    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError, data: storageData } = await supabase.storage
        .from('photos')
        .upload(filePath, selectedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: selectedFile.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      if (storageData) {
        const { error: dbError } = await supabase
          .from('guest_photos')
          .insert({
            photo_url: filePath,
            caption,
            uploaded_by: uploadedBy,
            approved: false
          });
      
        if (dbError) {
          console.error('Database error:', dbError);
          await supabase.storage.from('photos').remove([filePath]);
          throw dbError;
        }
      }

      setStatus('success');
      setCaption('');
      setUploadedBy('');
      setSelectedFile(null);
      fetchPhotos();
    } catch (error) {
      console.error('Error details:', error);
      setStatus('error');
    } finally {
      setUploading(false);
      setTimeout(() => setStatus('idle'), 3000);
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-pastel-pink">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {t.description}
        </p>

        <div className="mb-12">
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <label className="block mb-4">
              <input
                type="text"
                value={uploadedBy}
                onChange={(e) => setUploadedBy(e.target.value)}
                placeholder={t.uploadedBy}
                required
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
              />
            </label>
            <label className="block mb-4">
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder={t.caption}
                className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
              />
            </label>
            <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-xl hover:border-deep-rose transition-colors duration-300 cursor-pointer mb-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                required
                className="hidden"
              />
              <div className="text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <span className="text-gray-600">
                  {selectedFile ? selectedFile.name : t.upload}
                </span>
              </div>
            </label>
            <button
              type="submit"
              disabled={uploading || !selectedFile || !uploadedBy.trim()}
              className="w-full p-4 bg-deep-rose text-white rounded-xl hover:bg-opacity-90 disabled:bg-opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {uploading ? t.loading : t.upload}
            </button>
            {status === 'success' && (
              <p className="text-green-600 mt-2 text-center">{t.success}</p>
            )}
            {status === 'error' && (
              <p className="text-red-600 mt-2 text-center">{t.error}</p>
            )}
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.length > 0 ? (
            photos.map((photo) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative aspect-square rounded-xl overflow-hidden group"
              >
                <img
                  src={`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/photos/${photo.photo_url}`}
                  alt={photo.caption || 'Wedding photo'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Image load error for:', photo.photo_url);
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  {photo.uploaded_by && (
                    <p className="text-white font-medium mb-2">Uploaded by: {photo.uploaded_by}</p>
                  )}
                  {photo.caption && (
                    <p className="text-white">{photo.caption}</p>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">
              Be the first to share your photos!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};