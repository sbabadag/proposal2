import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, Language, TranslationKey } from './lang';

interface Translations {
    companyName: string;
    clientName: string;
    proposalNumber: string;
    issueDate: string;
    clientDetails: string;
    selectClient: string;
    itemDetails: string;
    description: string;
    quantity: string;
    unit: string;
    price: string;
    total: string;
    saveChanges: string;
    language: string;
    switchToEnglish: string;
    switchToTurkish: string;
    clientLogoSize: string;
    [key: string]: string;
  }

  

export interface TranslationKeys {

    proposalNumber: string;
    issueDate: string;
    clientDetails: string;
    selectClient: string;
    companyLogo: string;
  }
  

interface LanguageContextType {
  language: string;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  toggleLanguage: () => void; // Add this line

}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: TranslationKey) => '',
    toggleLanguage: () => {}, // Add this line
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem('language');
        if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'tr')) {
          setLanguageState(savedLanguage as Language);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };
    loadLanguage();
  }, []);

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
      return true;
    } catch (error) {
      console.error('Error saving language preference:', error);
      throw error;
    }
  };

  const t = (key: TranslationKey): string => {
      if (!translations[language]) {
        console.warn(`Language ${language} not found, falling back to English`);
        return translations.en[key] || key;
      }
      return (translations[language] as Record<string, string>)[key] || translations.en[key] || key;
    };
  
  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'tr' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
