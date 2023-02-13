import MainTitleBlock from '../../components/ui/Main/MainTitleBlock';
import DoctorsCarousel from '../../components/ui/Main/DoctorsCarousel';

import styles from './HomePage.module.scss';
import { getLocalizedText } from '../../services/localizationService';

function HomePage() {
  return (
    <div>
      <MainTitleBlock />
      <div className={styles.carousel__wrapper}>
        <h2 className={styles.carousel__header}>{getLocalizedText('ourDoctors')}</h2>
        <DoctorsCarousel />
      </div>
    </div>
  );
}

export default HomePage;
