import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Language } from '../types';
import { supabase } from '../lib/supabase';

interface Props {
  language: Language;
}

interface ProfileImages {
  bride: string;
  groom: string;
}

const profiles = {
  en: {
    bride: {
      name: "Gayathri",
      description: "A vibrant UI/UX developer, Gayathri brings elegance and structure to everything she designs—just like she does in life. Deeply devotional and grounded in tradition, she carries forward her values with grace and pride. Her cheerful voice, endless chatter, and ever-radiant smile can light up even the dullest moments. Behind that innocent laugh is a strong woman full of dreams, kindness, and love. She's the kind of soul who makes traditions feel young again.",
      parents: "D/O K Marneswara Rao & Smt Sujatha"
    },
    groom: {
      name: "Eswar",
      description: "An Army Officer by profession, Eswar is a storyteller at heart. Whether he's crafting a plot, flying a drone, building an app, or capturing a sunset through his lens—he pours his soul into it. An author, filmmaker, and AI enthusiast, he walks the rare path of discipline and imagination. With a deep sense of purpose and curiosity, he believes love is best expressed not just through grand gestures, but through shared dreams, conversations, and laughter. A warrior by duty, a creator by choice.",
      parents: "S/O T Nookaraju & Smt Krishnaveni"
    }
  },
  te: {
    bride: {
      name: "గాయత్రి",
      description: "ప్రతిభావంతమైన UI/UX డెవలపర్ అయిన గాయత్రి, జీవితంలో లాగే తాను డిజైన్ చేసే ప్రతిదానికీ సొగసు మరియు నిర్మాణాత్మకతను జోడిస్తుంది. సంప్రదాయంలో నాటుకుపోయిన ఆధ్యాత్మిక భావన కలిగి, తన విలువలను గర్వంగా ముందుకు తీసుకెళ్తుంది. ఆమె సంతోషకరమైన స్వరం, ఎడతెగని కబుర్లు, మరియు ఎప్పటికీ ప్రకాశవంతమైన చిరునవ్వు నిస్తేజమైన క్షణాలను కూడా వెలిగించగలవు. ఆ అమాయక నవ్వు వెనుక కలలు, దయ, మరియు ప్రేమతో నిండిన బలమైన మహిళ ఉంది. సంప్రదాయాలను మళ్ళీ యవ్వనంగా అనిపించే ఆత్మ ఆమెది.",
      parents: "తండ్రి శ్రీ కె మార్నేశ్వర రావు & తల్లి శ్రీమతి సుజాత కుమార్తె"
    },
    groom: {
      name: "ఈశ్వర్",
      description: "వృత్తిరీత్యా సైనిక అధికారి అయిన ఈశ్వర్, హృదయంలో కథకుడు. కథను అల్లుతూ, డ్రోన్ ఎగురుతూ, యాప్ నిర్మిస్తూ, లేదా తన కెమెరాతో సూర్యాస్తమయాన్ని బంధిస్తూ - ప్రతిదానిలో తన ఆత్మను పోస్తాడు. రచయిత, చలనచిత్ర నిర్మాత, మరియు AI అభిమాని అయిన అతను, క్రమశిక్షణ మరియు ఊహాశక్తి అనే అరుదైన మార్గంలో నడుస్తాడు. లక్ష్యం మరియు కుతూహలం పట్ల లోతైన అవగాహన కలిగించగలవు. ప్రేమ కేవలం గొప్ప సంకేతాల ద్వారా మాత్రమే కాకుండా, పంచుకున్న కలలు, సంభాషణలు మరియు నవ్వుల ద్వారా వ్యక్తమవుతుందని నమ్ముతాడు. విధి చేత యోధుడు, ఎంపిక చేత సృజనకర్త.",
      parents: "తండ్రి శ్రీ టి నూకరాజు & తల్లి శ్రీమతి కృష్ణవేణి కుమారుడు"
    }
  }
};

export const CoupleProfile: React.FC<Props> = ({ language }) => {
  const [profileImages, setProfileImages] = useState<ProfileImages>({ bride: '', groom: '' });
  const [loading, setLoading] = useState(true);
  const { bride, groom } = profiles[language];

  useEffect(() => {
    fetchProfileImages();
  }, []);

  async function fetchProfileImages() {
    try {
      const { data, error } = await supabase
        .from('profile_images')
        .select('person, image_url');

      if (error) throw error;

      if (data) {
        const images = data.reduce((acc: ProfileImages, curr) => {
          acc[curr.person as keyof ProfileImages] = curr.image_url;
          return acc;
        }, { bride: '', groom: '' });

        setProfileImages(images);
      }
    } catch (error) {
      console.error('Error fetching profile images:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12"
        >
          {/* Bride Profile */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-center"
          >
            <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src={profileImages.bride} 
                alt={bride.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-serif text-deep-rose mb-2">{bride.name}</h3>
            <p className="text-gray-500 italic mb-4">{bride.parents}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{bride.description}</p>
          </motion.div>

          {/* Groom Profile */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="text-center"
          >
            <div className="relative w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden">
              <img 
                src={profileImages.groom} 
                alt={groom.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-3xl font-serif text-deep-rose mb-2">{groom.name}</h3>
            <p className="text-gray-500 italic mb-4">{groom.parents}</p>
            <p className="text-gray-600 leading-relaxed mb-4">{groom.description}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};