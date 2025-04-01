import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Language } from '../types';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  language: Language;
}

const story = {
  en: {
    title: 'Our Story',
    events: [
      {
        date: '12th October 2024',
        title: 'The First Sight',
        description: 'At a friend\'s wedding filled with laughter and celebration, Eswar attended his best friend\'s big day. Little did he know, this wasn\'t just another wedding—it was the beginning of his own love story.'
      },
      {
        date: '8th November 2024',
        title: 'Pelli Choopulu',
        description: 'In a beautiful twist of fate, Gayathri\'s parents noticed Eswar at that wedding. Impressed, they arranged a traditional matchmaking ceremony. From the moment their eyes met, something just clicked—two hearts that felt right, two minds that understood.'
      },
      {
        date: '12th March 2025',
        title: 'Engagement Ceremony',
        description: 'A beautiful ceremony where we officially promised ourselves to each other, exchanging rings and blessings from our families. It was a day filled with joy, marking the beginning of our journey towards marriage.'
      },
      {
        date: '15th May 2025',
        title: 'The Wedding Day',
        description: 'A simple story, rooted in tradition and blooming into love. Join us as we begin our journey together.'
      }
    ]
  },
  te: {
    title: 'మా ప్రేమ కథ',
    events: [
      {
        date: 'అక్టోబర్ 12, 2024',
        title: 'మొదటి చూపు',
        description: 'స్నేహితుని వివాహంలో సంతోషంగా జరుగుతున్న వేడుకలో, ఈశ్వర్ తన స్నేహితుని పెళ్లికి హాజరయ్యాడు. ఇది మరొక పెళ్లి కాదని, ఇది అతని స్వంత ప్రేమ కథ ప్రారంభమని అతనికి తెలియదు.'
      },
      {
        date: 'నవంబర్ 8, 2024',
        title: 'పెళ్లి చూపులు',
        description: 'అదృష్టవశాత్తు, గాయత్రి తల్లిదండ్రులు ఆ పెళ్లిలో ఈశ్వర్‌ని గమనించారు. ఆకట్టుకున్న వారు సాంప్రదాయ పెళ్లి చూపులు ఏర్పాటు చేశారు. వారి కళ్ళు కలిసిన క్షణం నుండి, ఏదో కుదిరినట్లు అనిపించింది—రెండు హృదయాలు సరిపోయాయి, రెండు మనసులు అర్థం చేసుకున్నాయి.'
      },
      {
        date: 'మే 15, 2025',
        title: 'వివాహ రోజు',
        description: 'సాంప్రదాయంలో వేరూనుకుని, ప్రేమగా వికసించిన సరళమైన కథ. మా ప్రయాణం ప్రారంభమవుతున్న ఈ క్షణాన్ని మాతో పంచుకోండి.'
      }
    ]
  }
};

const marriageEvents = {
  en: {
    title: 'Marriage Events',
    events: [
      {
        date: '11th May 2025',
        title: 'Setting up the Wedding Canopy',
        description: 'The auspicious beginning of our wedding celebrations, where the mandap is decorated with flowers and traditional elements, creating a sacred space for the ceremonies to follow.'
      },
      {
        date: '14th May 2025, 09:30',
        title: 'Groom and Bride Preparations',
        description: 'A joyous morning filled with traditional rituals, where both families help the bride and groom prepare for their special day with haldi ceremonies and blessings from elders.'
      },
      {
        date: '14th May 2025, 17:00',
        title: 'Sacred Bath',
        description: 'An important purification ritual where the bride and groom separately undergo a ceremonial bath, symbolizing the cleansing of mind and body before entering the sacred bond of marriage.'
      },
      {
        date: '15th May 2025, 15:00',
        title: 'Pulagam and Kala Gorlu',
        description: 'A significant pre-wedding ritual where families come together to offer Pulagam (sacred rice) to deities and perform the Kalla Gorlu ceremony. Breaking of jaggery and coconuts symbolizes sweetness in marriage and prosperity for the couple\'s future.'
      },
      {
        date: '15th May 2025, 18:00',
        title: 'Baraat',
        description: 'A grand procession where the groom and bride arrives with family and friends, accompanied by music and dance, symbolizing the joy of welcoming new relationships and celebrating the union of two families.'
      },
      {
        date: '15th May 2025, 19:00',
        title: 'Reception',
        description: 'An evening of celebration where friends and family gather to bless the couple, share meals, and create beautiful memories together in a festive atmosphere.'
      },
      {
        date: '16th May 2025, 04:58',
        title: 'Marriage Ceremony',
        description: 'The main ceremony at the auspicious muhurtham time, where sacred vows are exchanged and traditional rituals are performed to bind two souls in the presence of Agni as witness.'
      }
    ]
  },
  te: {
    title: 'వివాహ వేడుకలు',
    events: [
      {
        date: 'మే 11, 2025',
        title: 'మంటపం ఏర్పాటుచేయడం',
        description: 'మా వివాహ వేడుకలు శుభారంభం, ఇక్కడ మంటపాన్ని పూలతో మరియు సాంప్రదాయ అలంకరణలతో అలంకరించి, కార్యక్రమాలకు పవిత్ర స్థలాన్ని సృష్టిస్తారు.'
      },
      {
        date: 'మే 14, 2025, ఉదయం 09:30',
        title: 'పెళ్లి కొడుకు మరియు పెళ్లి కూతురిని తయారుచేయడం',
        description: 'పసుపు కార్యక్రమాలు మరియు పెద్దల ఆశీర్వాదాలతో వధూవరులను సిద్ధం చేసే ఆనందకరమైన ఉదయం.'
      },
      {
        date: 'మే 14, 2025, సాయంత్రం 05:00',
        title: 'మంగళ స్నానం',
        description: 'వివాహ బంధంలోకి ప్రవేశించే ముందు మనసు మరియు శరీరాన్ని శుద్ధి చేసుకునే ముఖ్యమైన శుద్ధి కార్యక్రమం.'
      },
      {
        date: 'మే 15, 2025, మధ్యాహ్నం 03:00',
        title: 'పులగం మరియు కాల గోర్లు',
        description: 'కుటుంబాలు కలిసి దేవతలకు పులగం (పవిత్ర అన్నం) సమర్పించి, కల్ల గోర్లు కార్యక్రమం నిర్వహించే ముఖ్యమైన పూర్వ వివాహ కార్యక్రమం. బెల్లం మరియు కొబ్బరికాయలు పగలగొట్టడం వివాహంలో మాధుర్యాన్ని మరియు దంపతుల భవిష్యత్తులో సమృద్ధిని సూచిస్తుంది.'
      },
      {
        date: 'మే 15, 2025, సాయంత్రం 06:00',
        title: 'బరాత్',
        description: 'సంగీతం మరియు నృత్యంతో కుటుంబం మరియు స్నేహితులతో కలిసి పెళ్లి కొడుకు రాక, కొత్త బంధాలను స్వాగతించే ఆనందాన్ని మరియు రెండు కుటుంబాల కలయికను జరుపుకోవడం.'
      },
      {
        date: 'మే 15, 2025, సాయంత్రం 07:00',
        title: 'స్వాగత కార్యక్రమం',
        description: 'స్నేహితులు మరియు కుటుంబ సభ్యులు దంపతులను ఆశీర్వదించి, భోజనం చేసి, పండుగ వాతావరణంలో అందమైన జ్ఞాపకాలను సృష్టించే సాయంత్రం.'
      },
      {
        date: 'మే 16, 2025, ఉదయం 04:50',
        title: 'వివాహం',
        description: 'శుభ ముహూర్తంలో జరిగే ప్రధాన కార్యక్రమం, ఇక్కడ పవిత్ర ప్రమాణాలు చేసుని అగ్ని సాక్షిగా సాంప్రదాయ కార్యక్రమాలు నిర్వహించబడతాయి.'
      }
    ]
  }
};

export const StoryTimeline: React.FC<Props> = ({ language }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { title, events } = story[language];
  const marriageEventsData = marriageEvents[language];

  useEffect(() => {
    if (timelineRef.current) {
      gsap.utils.toArray('.timeline-section').forEach((section: any) => {
        const events = section.querySelectorAll('.timeline-event');
        
        gsap.set(events, { opacity: 0, y: 30 });
        
        ScrollTrigger.create({
          trigger: section,
          start: 'top 70%',
          onEnter: () => {
            gsap.to(events, {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.2,
              ease: 'power2.out',
              overwrite: true
            });
          },
          once: true // Animation plays only once
        });
      });
    }
  }, []);

  const renderTimeline = (title: string, events: any[]) => (
    <div className="timeline-section mb-20">
      <h2 className="text-4xl font-serif text-deep-rose text-center mb-16">
        {title}
      </h2>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-pastel-rose" />

        {/* Timeline events */}
        {events.map((event, index) => (
          <div
            key={event.date}
            className={`timeline-event relative flex items-center mb-16 ${
              index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
            }`}
          >
            {/* Event content */}
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
              <h3 className={`text-xl font-serif text-deep-rose mb-2 ${language === 'te' ? 'text-2xl' : ''}`}>
                {event.title}
              </h3>
              <p className={`text-gray-500 mb-2 ${language === 'te' ? 'text-lg' : ''}`}>{event.date}</p>
              <p className={`text-gray-600 ${language === 'te' ? 'text-lg leading-relaxed' : ''}`}>
                {event.description}
              </p>
            </div>

            {/* Timeline dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-deep-rose rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto" ref={timelineRef}>
        {renderTimeline(title, events)}
        {renderTimeline(marriageEventsData.title, marriageEventsData.events)}
      </div>
    </section>
  );
};