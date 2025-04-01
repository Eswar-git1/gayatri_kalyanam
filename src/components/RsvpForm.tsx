import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Check } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const translations = {
  en: {
    title: 'RSVP',
    name: 'Your Name',
    email: 'Email Address',
    attending: 'Will you be attending?',
    yes: 'Yes, I will attend',
    no: 'Sorry, I cannot attend',
    guests: 'Number of Additional Guests',
    dietary: 'Any Requirements',
    submit: 'Submit RSVP',
    success: 'Thank you for your response!',
    error: 'Error submitting RSVP'
  },
  te: {
    title: 'హాజరు నిర్ధారణ',
    name: 'మీ పేరు',
    email: 'ఇమెయిల్ చిరునామా',
    attending: 'మీరు హాజరవుతారా?',
    yes: 'అవును, నేను హాజరవుతాను',
    no: 'క్షమించండి, నేను హాజరు కాలేను',
    guests: 'అదనపు అతిథుల సంఖ్య',
    dietary: 'ఆహార అవసరాలు',
    submit: 'సమర్పించండి',
    success: 'మీ స్పందనకు ధన్యవాదాలు!',
    error: 'సమర్పించడంలో లోపం'
  }
};

export const RsvpForm: React.FC<Props> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: true,
    numberOfGuests: 0,
    dietaryRequirements: ''
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
            email: formData.email,
            attending: formData.attending,
            number_of_guests: formData.numberOfGuests,
            dietary_requirements: formData.dietaryRequirements
          }
        ]);

      if (error) {
        console.error('RSVP submission error:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          attending: true,
          numberOfGuests: 0,
          dietaryRequirements: ''
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-12">
          {t.title}
        </h2>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="name">
              {t.name}
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              {t.email}
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
              required
            />
          </div>

          <div>
            <p className="text-gray-700 mb-2">{t.attending}</p>
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
                <label className="block text-gray-700 mb-2" htmlFor="guests">
                  {t.guests}
                </label>
                <input
                  type="number"
                  id="guests"
                  min="0"
                  value={formData.numberOfGuests}
                  onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="dietary">
                  {t.dietary}
                </label>
                <textarea
                  id="dietary"
                  value={formData.dietaryRequirements}
                  onChange={(e) => setFormData({ ...formData, dietaryRequirements: e.target.value })}
                  className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose h-32"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full bg-deep-rose text-white py-4 px-6 rounded-xl hover:bg-opacity-90 transition-colors duration-300 flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            {t.submit}
          </button>

          {status === 'success' && (
            <p className="text-green-600 text-center">{t.success}</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 text-center">{t.error}</p>
          )}
        </motion.form>
      </div>
    </section>
  );
};