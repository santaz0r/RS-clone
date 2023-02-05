import sum from '../../utils/myFunc';
import styles from './HomePage.module.scss';

function HomePage() {
  const kek = (id: number) => id;
  return (
    <>
      <h1>Homepage</h1>
      <div className={styles.kek}>{kek(322)}</div>
      {sum(1, 5)}
    </>
  );
}

export default HomePage;
