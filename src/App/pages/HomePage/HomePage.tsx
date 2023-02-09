import { useState, useEffect, memo } from 'react';
import { mainBackgroundsArray } from '../../assets/mainBackground/mainBackgroundsArray';
import { randomInteger } from '../../utils/utils';
import Doctors from '../../components/ui/Doctors/Doctors';

import styles from './HomePage.module.scss';

const MemoedDoctors = memo(Doctors);

function HomePage() {
  const [backgroundNum, SetBackgroundNum] = useState(randomInteger(0, 6));

  function changeBackground(num: number) {
    if (num === mainBackgroundsArray.length - 1) num = 0;
    const img = new Image();
    img.src = mainBackgroundsArray[num];
    img.onload = () => {
      SetBackgroundNum(num);
      setTimeout(() => changeBackground(num + 1), 6000);
    };
  }

  useEffect(() => {
    setTimeout(() => changeBackground(backgroundNum + 1), 6000);
  }, []);

  return (
    <div>
      <div
        className={styles.slider__wrapper}
        style={{ backgroundImage: `url(${mainBackgroundsArray[backgroundNum]})` }}
      >
        <div className={styles.slider}>
          <h1 className={styles.slider__title}>Homepage</h1>
        </div>
      </div>
      <div>
        <h3>Our Doctors</h3>
        <MemoedDoctors />
      </div>
    </div>
  );
}

export default HomePage;
