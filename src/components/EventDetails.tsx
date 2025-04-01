import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import type { Language } from '../types';

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
    <section className="py-20 px-4 bg-gradient-to-br from-pastel-pink to-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-serif text-deep-rose text-center mb-12">
          {event.title}
        </h2>
        
        <div className="grid md:grid-cols-2 gap-12">
          {/* Event Information */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-serif text-deep-rose mb-2">
                  {event.venue}
                </h3>
                <p className="text-gray-600">{event.address}</p>
              </div>
              
              <div>
                <p className="text-xl font-serif text-deep-rose mb-2">
                  {event.date}
                </p>
                <p className="text-gray-600">{event.time}</p>
              </div>
              
              <p className="text-gray-600 italic">
                {event.description}
              </p>
            </div>
          </div>

          {/* Map */}
          <div 
            ref={mapRef}
            className="h-[400px] rounded-3xl overflow-hidden shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};