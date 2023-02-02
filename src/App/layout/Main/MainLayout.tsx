import { Outlet } from 'react-router-dom';

import styles from './MainLayout.module.scss';
import Header from '../../components/ui/Header/Header';
import Footer from '../../components/ui/Footer/Footer';

function MainLayout() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
