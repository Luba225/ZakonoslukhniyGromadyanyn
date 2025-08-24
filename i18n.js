import { languages } from '../locales';
import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Конфігурація локалізації
const config = {
  SUPPORTED_LANGUAGES: Object.keys(languages),
  DEFAULT_LANGUAGE: 'en',
  APP_LANGUAGE: 'APP_LANGUAGE',
};

const getDeviceLanguage = () => {
  const locales = getLocales();
  return locales?.[0]?.languageCode || config.DEFAULT_LANGUAGE;
};

const initialLang = config.SUPPORTED_LANGUAGES.includes(getDeviceLanguage())
  ? getDeviceLanguage()
  : config.DEFAULT_LANGUAGE;

i18next.use(initReactI18next).init({
  resources: languages,
  lng: initialLang,
  fallbackLng: config.DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
});

// Зміна мови вручну
export const changeLanguage = async (lang) => {
  try {
    if (!config.SUPPORTED_LANGUAGES.includes(lang)) {
      throw new Error(`Language ${lang} is not supported`);
    }
    await i18next.changeLanguage(lang);
    await AsyncStorage.setItem(config.APP_LANGUAGE, lang);
  } catch (error) {
    console.error('Failed to change language', error);//перевірка
  }
};

export const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(config.APP_LANGUAGE);
    if (savedLanguage && config.SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      await i18next.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Failed to load language', error);//перевірка
  }
};
