export type Language = 'en' | 'te' | null;

export const translations = {
  en: {
    // English translations
    title: "Wedding Invitation",
    // ... other English translations
  },
  te: {
    // Telugu translations
    title: "వివాహ ఆహ్వానం",
    // ... other Telugu translations
  }
};

export type Translations = typeof translations;