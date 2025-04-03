import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Calendar, Clock, MapPin } from 'lucide-react'; // Make sure to import Calendar
import type { Language } from '../types';
import { SumuhurthamPlayer } from './SumuhurthamPlayer';

interface Props {
  language: Language;
}

const events = {
  en: {
    title: 'Wedding Venue',
    date: '15th May 2025',
    time: '7:00 PM onwards',
    venue: 'Sri Kalyana Venkateswara Swamy Temple',
    address: 'Darlapudi, S. Rayavaram Mandal, Vizag District, Andhra Pradesh 531082',
    description: 'Join us for the traditional Telugu wedding ceremony followed by dinner.'
  },
  te: {
    title: 'వివాహ వేదిక',
    date: 'మే 15, 2025',
    time: 'సాయంత్రం 7:00 గంటల నుండి',
    venue: 'శ్రీ కల్యాణ వేంకటేశ్వర స్వామి దేవాలయం',
    address: 'దార్లపూడి, ఎస్. రాయవరం మండలం, విశాఖపట్నం జిల్లా, ఆంధ్ర ప్రదేశ్ 531082',
    description: 'సాంప్రదాయ తెలుగు వివాహ వేడుకకు మరియు విందుకు మిమ్మల్ని ఆహ్వానిస్తున్నాము.'
  }
};

export const EventDetails: React.FC<Props> = ({ language }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const event = events[language];

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly'
      });

      try {
        // Load required libraries
        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { InfoWindow } = await loader.importLibrary('maps');
        
        // Updated coordinates for the temple location
        const position = { lat: 17.49198922005825, lng: 82.73159611534203 };
        const locationUrl = 'https://maps.app.goo.gl/Ji18Ef2JS2VcNEGX7';
        
        if (mapRef.current) {
          const map = new Map(mapRef.current, {
            center: position,
            zoom: 17,
            mapTypeId: 'hybrid',
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
          });

          // Create single marker with all properties
          const marker = new Marker({
            position,
            map,
            title: event.venue,
          });

          const infoWindow = new InfoWindow({
            content: `
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="color: #D14D72; margin-bottom: 5px; font-weight: bold;">${event.venue}</h3>
                <p style="margin: 5px 0;">${event.address}</p>
                <p style="margin: 5px 0;">${event.date} | ${event.time}</p>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                  <a href="${locationUrl}" 
                     target="_blank" style="color: #D14D72; text-decoration: none; padding: 5px 10px; border: 1px solid #D14D72; border-radius: 4px;">
                    Get Directions
                  </a>
                  <button onclick="navigator.clipboard.writeText('${locationUrl}').then(() => alert('Location URL copied!'))" 
                          style="color: #D14D72; text-decoration: none; padding: 5px 10px; border: 1px solid #D14D72; border-radius: 4px; background: none; cursor: pointer;">
                    Copy Location
                  </button>
                </div>
              </div>
            `
          });

          infoWindow.open(map, marker);
          map.setCenter(position);
        }
      } catch (error) {
        console.error('Error loading map:', error);
      }
    };

    initMap();
  }, [language, event.venue, event.address, event.date, event.time]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-12">
          {language === 'en' ? 'Wedding Events' : 'వివాహ కార్యక్రమాలు'}
        </h2>
        
        {/* Wedding venue details */}
        <div className="mt-8">
          <h3 className="text-3xl font-serif text-deep-rose text-center mb-8">
            {event.title}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-pastel-pink/10 p-8 rounded-2xl">
              <div className="flex flex-col space-y-4">
                <div className="flex items-start">
                  <span className="bg-deep-rose/10 p-2 rounded-full mr-4">
                    <Calendar className="text-deep-rose w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{language === 'en' ? 'Date' : 'తేదీ'}</h4>
                    <p className="text-gray-600">{event.date}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-deep-rose/10 p-2 rounded-full mr-4">
                    <Clock className="text-deep-rose w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{language === 'en' ? 'Time' : 'సమయం'}</h4>
                    <p className="text-gray-600">{event.time}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <span className="bg-deep-rose/10 p-2 rounded-full mr-4">
                    <MapPin className="text-deep-rose w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="font-medium text-gray-900">{language === 'en' ? 'Venue' : 'వేదిక'}</h4>
                    <p className="text-gray-600">{event.venue}</p>
                    <p className="text-gray-600 mt-1">{event.address}</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mt-4">{event.description}</p>
              </div>
            </div>
            
            <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <div ref={mapRef} className="w-full h-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};