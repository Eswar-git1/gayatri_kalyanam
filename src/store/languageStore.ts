import { create } from 'zustand';
import { Language, LanguageStore } from '../types';

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: null,
  setLanguage: (lang: Language) => set({ language: lang }),
}));