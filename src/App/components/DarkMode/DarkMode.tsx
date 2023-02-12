import styles from './DarkMode.module.scss';

function DarkMode() {
  let theme: null | string = null;
  if (localStorage) {
    theme = localStorage.getItem('theme');
  }
  if (theme === 'light' || theme === 'dark') {
    document.body.classList.add(theme);
  } else {
    document.body.classList.add('light');
  }
  function switchTheme() {
    if (theme === 'dark') {
      document.body.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
      theme = 'light';
    } else {
      document.body.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
      theme = 'dark';
    }
    console.log(theme);
  }
  return (
    <button type="button" onClick={switchTheme} className={styles.button}>🌞 / 🌛</button>
  );
}

export default DarkMode;
