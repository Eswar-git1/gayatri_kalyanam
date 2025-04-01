import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import { Send } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const translations = {
  en: {
    title: 'Leave Your Blessings',
    placeholder: 'Write your message...',
    submit: 'Send Message',
    loading: 'Loading messages...',
    error: 'Error sending message',
    success: 'Message sent successfully!'
  },
  te: {
    title: 'మీ ఆశీర్వాదాలను పంచుకోండి',
    placeholder: 'మీ సందేశాన్ని రాయండి...',
    submit: 'సందేశం పంపండి',
    loading: 'సందేశాలు లోడ్ అవుతున్నాయి...',
    error: 'సందేశం పంపడంలో లోపం',
    success: 'సందేశం విజయవంతంగా పంపబడింది!'
  }
};

// Add interface for message type
interface Message {
  id: string;
  name: string;
  message: string;
  created_at: string;
  approved: boolean;
}

export const GuestMessageBoard: React.FC<Props> = ({ language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const t = translations[language];

  useEffect(() => {
    fetchMessages();
    const subscription = supabase
      .channel('guest_messages')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'guest_messages' }, fetchMessages)
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Add a loading state
  const [isLoading, setIsLoading] = useState(true);

  // Update the fetchMessages function to handle loading
  async function fetchMessages() {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('guest_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      console.log('Raw messages data:', data); // Debug log
      if (data) {
        setMessages(data);
      }
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('loading');

    try {
      // Add created_at field to the insert
      const { error } = await supabase
        .from('guest_messages')
        .insert([
          {
            name,
            message: newMessage,
            approved: false,
            created_at: new Date().toISOString()
          }
        ]);

      if (error) {
        console.error('Error submitting message:', error);
        setStatus('error');
      } else {
        setStatus('success');
        setNewMessage('');
        setName('');
        fetchMessages(); // Fetch messages after successful submission
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-12">
          {t.title}
        </h2>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={language === 'en' ? 'Your Name' : 'మీ పేరు'}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose"
              required
            />
          </div>
          <div className="mb-4">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={t.placeholder}
              className="w-full p-4 rounded-xl border border-gray-200 focus:border-deep-rose focus:ring-1 focus:ring-deep-rose h-32"
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="flex items-center justify-center gap-2 w-full bg-deep-rose text-white py-4 px-6 rounded-xl hover:bg-opacity-90 transition-colors duration-300"
          >
            <Send className="w-5 h-5" />
            {t.submit}
          </button>
          {status === 'success' && (
            <p className="text-green-600 mt-2 text-center">{t.success}</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-2 text-center">{t.error}</p>
          )}
        </form>

        <div className="space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-pastel-pink/10 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <p className="font-serif text-deep-rose text-lg">{message.name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(message.created_at).toLocaleDateString()}
                </p>
              </div>
              <p className="text-gray-600 leading-relaxed">{message.message}</p>
            </motion.div>
          ))}
          {messages.length === 0 && (
            <p className="text-center text-gray-500">
              {language === 'en' ? 'Be the first to leave your blessings!' : 'మొదటి ఆశీర్వాదాన్ని ఇవ్వండి!'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};