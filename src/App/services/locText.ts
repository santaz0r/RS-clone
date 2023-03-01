import translations from '../assets/data/translations';

export const locText = (key: string, lang: string) => {
  if (lang === 'ru' || lang === 'en') {
    return translations[key as keyof typeof translations][lang];
  }
  return 'Error';
};
