export type Language = 'en' | 'te';

export interface LanguageStore {
  language: Language | null;
  setLanguage: (lang: Language) => void;
}

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface Translation {
  title: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  joinUs: string;
  date: string;
}

export const translations: Record<Language, Translation> = {
  en: {
    title: 'Wedding Invitation',
    days: 'Days',
    hours: 'Hours',
    minutes: 'Minutes',
    seconds: 'Seconds',
    joinUs: 'Join us in celebrating our wedding',
    date: 'May 15, 2025'
  },
  te: {
    title: 'వివాహ ఆహ్వానం',
    days: 'రోజులు',
    hours: 'గంటలు',
    minutes: 'నిమిషాలు',
    seconds: 'సెకన్లు',
    joinUs: 'మా వివాహ వేడుకలో పాల్గొనండి',
    date: 'మే 15, 2025'
  }
};