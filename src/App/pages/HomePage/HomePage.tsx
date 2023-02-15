import MainTitleBlock from '../../components/ui/Main/MainTitleBlock';
import DoctorsCarousel from '../../components/ui/Main/DoctorsCarousel';

import styles from './HomePage.module.scss';
import { getLocalizedText } from '../../services/localizationService';
import { useAppSelector } from '../../../hooks';
import { getDataError } from '../../store/doctors';

function HomePage() {
  const appError = useAppSelector(getDataError());
  return (
    <div>
      <MainTitleBlock />
      <div className={styles.carousel__wrapper}>
        <h2 className={styles.carousel__header}>{getLocalizedText('ourDoctors')}</h2>
        {appError ? <p>{appError}</p> : <DoctorsCarousel />}
      </div>
    </div>
  );
}

export default HomePage;
