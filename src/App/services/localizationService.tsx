import translations from '../assets/data/translations';

export function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

export function changeCurrentLanguage(e: MouseEvent) {
  if (e.target) {
    localStorage.setItem('language', (e.target as HTMLDivElement).textContent || 'en');
  }
  window.location.reload();
}

const language = getCurrentLanguage();

export function getLocalizedText(key: string) {
  if (language === 'ru' || language === 'en') {
    return translations[key as keyof typeof translations][language];
  }
  return 'Error';
}
