import React from 'react';
import { Phone } from 'lucide-react';
import type { Language } from '../types';

interface Props {
  language: Language;
}

const translations = {
  en: {
    title: 'Guest Support',
    groomSide: 'Groom Side',
    brideSide: 'Bride Side',
    contact: 'Contact'
  },
  te: {
    title: 'అతిథి సహాయం',
    groomSide: 'వరుని వైపు',
    brideSide: 'వధువు వైపు',
    contact: 'సంప్రదించండి'
  }
};

const contacts = {
  groomSide: [
    { name: 'T Sridhar', number: '7013045623' },
    { name: 'T Sathish', number: '8790077888' },
    { name: 'P Purnesh', number: '9493944844' }
  ],
  brideSide: [
    { name: 'K Balaram', number: '9502558616' },
    { name: 'P Surya', number: '8699474565' }
  ]
};

export const ContactSupport: React.FC<Props> = ({ language }) => {
  const t = translations[language];

  return (
    <>
      <section className="py-16 px-4 bg-gradient-to-b from-white to-pastel-pink/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-serif text-deep-rose text-center mb-12">
            {t.title}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Groom Side */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-serif text-deep-rose mb-6">{t.groomSide}</h3>
              <div className="space-y-4">
                {contacts.groomSide.map((contact) => (
                  <div key={contact.name} className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-deep-rose" />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-gray-600 hover:text-deep-rose transition-colors"
                      >
                        {contact.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bride Side */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-xl font-serif text-deep-rose mb-6">{t.brideSide}</h3>
              <div className="space-y-4">
                {contacts.brideSide.map((contact) => (
                  <div key={contact.name} className="flex items-center gap-4">
                    <Phone className="w-5 h-5 text-deep-rose" />
                    <div>
                      <p className="font-medium">{contact.name}</p>
                      <a 
                        href={`tel:${contact.number}`}
                        className="text-gray-600 hover:text-deep-rose transition-colors"
                      >
                        {contact.number}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="py-8 px-4 bg-deep-rose/10 border-t-2 border-deep-rose/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-deep-rose font-serif text-base font-medium tracking-wide">
            Designed By Gayathri & Eswar ❤️
          </p>
        </div>
      </footer>
    </>
  );
};