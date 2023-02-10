import translations from '../assets/data/translations';

function getCurrentLanguage() {
  return localStorage.getItem('language') || 'en';
}

export function changeCurrentLanguage(e) {
  if (e.target) {
    localStorage.setItem('language', e.target.textContent || 'en');
    // localStorage.setItem('language', (e.target as HTMLElement).textContent || 'en');
  }
  window.location.reload();
}

const language = getCurrentLanguage();

export function getLocalizedText(key) {
  return translations[key][language];
}
