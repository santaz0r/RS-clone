import MainTitleBlock from '../../components/ui/Main/MainTitleBlock';
import DoctorsCarousel from '../../components/ui/Main/DoctorsCarousel';

import styles from './HomePage.module.scss';
import { useAppSelector } from '../../../hooks';
import { getDataError } from '../../store/doctors';
import { getLang } from '../../store/language';
import { locText } from '../../services/locText';

function HomePage() {
  const appError = useAppSelector(getDataError());
  const currentLang = useAppSelector(getLang());
  return (
    <div>
      <MainTitleBlock />
      <div className={styles.carousel__wrapper}>
        <h2 className={styles.carousel__header}>{locText('ourDoctors', currentLang)}</h2>
        {appError ? <p>{appError}</p> : <DoctorsCarousel />}
      </div>
    </div>
  );
}

export default HomePage;
