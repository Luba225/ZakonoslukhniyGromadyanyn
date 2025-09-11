import { getLocales } from 'expo-localization';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en.json';
import uk from '../locales/uk.json';
import pl from '../locales/pl.json';

const resources = {
  en: { translation: en },
  uk: { translation: uk },
  pl: { translation: pl },
};

const SUPPORTED_LANGUAGES = Object.keys(resources);
const DEFAULT_LANGUAGE = 'en';
const STORAGE_KEY = 'APP_LANGUAGE';

// визн.мови пристрою
const getDeviceLanguage = () => {
  const locales = getLocales();
  return locales?.[0]?.languageCode || DEFAULT_LANGUAGE;
};

i18next
  .use(initReactI18next)
  .init({
    resources,
    lng: getDeviceLanguage(),
    fallbackLng: DEFAULT_LANGUAGE,
    compatibilityJSON: 'v3',
    interpolation: {
      escapeValue: false,
    },
  });

// зміна мови вручну
export const changeLanguage = async (lang) => {
  try {
    if (!SUPPORTED_LANGUAGES.includes(lang)) {
      throw new Error(`Language ${lang} is not supported`);
    }
    await i18next.changeLanguage(lang);
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  } catch (error) {
    console.error('Failed to change language', error);
  }
};

// Завантаження мови з AsyncStorage (при старті додатку)
export const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem(STORAGE_KEY);
    if (savedLanguage && SUPPORTED_LANGUAGES.includes(savedLanguage)) {
      await i18next.changeLanguage(savedLanguage);
    }
  } catch (error) {
    console.error('Failed to load language', error);
  }
};

export default i18next;
