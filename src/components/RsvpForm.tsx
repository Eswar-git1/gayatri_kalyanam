import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Check } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

// Update translations to include guest room text
const translations = {
  en: {
    title: 'RSVP',
    name: 'Your Name',
    side: 'Attending from',
    bride: 'Bride Side',
    groom: 'Groom Side',
    location: 'Coming from (City/Town)',
    attending: 'Will you be attending?',
    yes: 'Yes, I will attend',
    no: 'Sorry, I cannot attend',
    guests: 'Number of Additional Guests',
    dietary: 'Any Requirements',
    guestRoom: 'Do you need guest room accommodation?',
    submit: 'Submit RSVP',
    success: 'Thank you for your response!',
    error: 'Error submitting RSVP'
  },
  te: {
    title: 'హాజరు నిర్ధారణ',
    name: 'మీ పేరు',
    side: 'నుండి హాజరవుతున్నారు',
    bride: 'పెళ్లి కుమార్తె వైపు',
    groom: 'పెళ్లి కుమారుడి వైపు',
    location: 'వచ్చే ప్రదేశం (నగరం/పట్టణం)',
    attending: 'మీరు హాజరవుతారా?',
    yes: 'అవును, నేను హాజరవుతాను',
    no: 'క్షమించండి, నేను హాజరు కాలేను',
    guests: 'అదనపు అతిథుల సంఖ్య',
    dietary: 'ఆహార అవసరాలు',
    guestRoom: 'మీకు అతిథి గది వసతి అవసరమా?',
    submit: 'సమర్పించండి',
    success: 'మీ స్పందనకు ధన్యవాదాలు!',
    error: 'సమర్పించడంలో లోపం'
  }
};

export const RsvpForm: React.FC<Props> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    side: 'bride', // Default to bride side
    location: '',
    attending: true,
    numberOfGuests: 0,
    dietaryRequirements: '',
    guestRoomRequired: false,
    email: 'no-email@example.com' // Add default email to fix the constraint issue
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = translations[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const { error } = await supabase
        .from('rsvps')
        .insert([
          {
            name: formData.name,
            side: formData.side,
            location: formData.location,
            attending: formData.attending,
            number_of_guests: formData.numberOfGuests,
            dietary_requirements: formData.dietaryRequirements,
            guest_room_required: formData.guestRoomRequired,
            email: formData.email // Include email field to satisfy the constraint
          }
        ]);

      if (error) {
        console.error('RSVP submission error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          name: '',
          side: 'bride',
          location: '',
          attending: true,
          numberOfGuests: 0,
          dietaryRequirements: '',
          guestRoomRequired: false,
          email: 'no-email@example.com'
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  // In the form, add the guest room checkbox after the dietary requirements field
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-white to-pastel-pink">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-4">
          {t.title}
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          {language === 'en' ? 
            'Please let us know if you will be joining us on our special day.' : 
            'దయచేసి మా ప్రత్యేక రోజున మీరు మాతో చేరుతున్నారో లేదో మాకు తెలియజేయండి.'}
        </p>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto"
        >
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose transition-all duration-300"
              required
            />
          </div>

          <div className="p-4 bg-pastel-pink/10 rounded-xl">
            <p className="text-gray-700 mb-2 font-medium">{t.side}</p>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="side"
                  checked={formData.side === 'bride'}
                  onChange={() => setFormData({ ...formData, side: 'bride' })}
                  className="text-deep-rose"
                />
                <span className="ml-2">{t.bride}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="side"
                  checked={formData.side === 'groom'}
                  onChange={() => setFormData({ ...formData, side: 'groom' })}
                  className="text-deep-rose"
                />
                <span className="ml-2">{t.groom}</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="location">
              {t.location}
            </label>
            <input
              type="text"
              id="location"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose transition-all duration-300"
              required
            />
          </div>

          <div className="p-4 bg-pastel-pink/10 rounded-xl">
            <p className="text-gray-700 mb-2 font-medium">{t.attending}</p>
            <div className="space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={formData.attending}
                  onChange={() => setFormData({ ...formData, attending: true })}
                  className="text-deep-rose"
                />
                <span className="ml-2">{t.yes}</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  checked={!formData.attending}
                  onChange={() => setFormData({ ...formData, attending: false })}
                  className="text-deep-rose"
                />
                <span className="ml-2">{t.no}</span>
              </label>
            </div>
          </div>

          {formData.attending && (
            <>
              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="guests">
                  {t.guests}
                </label>
                <input
                  type="number"
                  id="guests"
                  min="0"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose transition-all duration-300"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium" htmlFor="dietary">
                  {t.dietary}
                </label>
                <textarea
                  id="dietary"
                  value={formData.dietaryRequirements}
                  onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose h-32 transition-all duration-300"
                />
              </div>
              
              {/* Add guest room checkbox */}
              <div className="p-4 bg-pastel-pink/10 rounded-xl">
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    checked={formData.guestRoomRequired}
                    onChange={(e) => setFormData({ ...formData, guestRoomRequired: e.target.checked })}
                    className="mt-1 text-deep-rose rounded"
                  />
                  <span className="ml-2 text-gray-700">{t.guestRoom}</span>
                </label>
              </div>
            </>
          )}

          <motion.button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-deep-rose text-white py-4 px-6 rounded-xl hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Check className="w-5 h-5" />
            {status === 'loading' ? (language === 'en' ? 'Submitting...' : 'సమర్పిస్తోంది...') : t.submit}
          </motion.button>

          {status === 'success' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-xl text-center"
            >
              {t.success}
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-center"
            >
              {t.error}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
};