import { useState, useEffect } from 'react';
import { mainBackgroundsArray } from '../../../assets/mainBackgrounds/mainBackgroundsArray';
import { randomInteger } from '../../../utils/utils';

import styles from './MainTitleBlock.module.scss';

function MainTitleBlock() {
  const [backgroundNum, SetBackgroundNum] = useState(randomInteger(0, 6));

  function changeBackground(num: number) {
    if (num === mainBackgroundsArray.length - 1) num = 0;
    const img = new Image();
    img.src = mainBackgroundsArray[num];
    img.onload = () => {
      SetBackgroundNum(num);
      setTimeout(() => changeBackground(num + 1), 10000);
    };
  }

  useEffect(() => {
    setTimeout(() => changeBackground(backgroundNum + 1), 10000);
  }, []);

  return (
    <div>
      <div
        className={styles.main__wrapper}
        style={{ backgroundImage: `url(${mainBackgroundsArray[backgroundNum]})` }}
      >
        <div className={styles.main}>
          <h1 className={styles.main__title}>Homepage</h1>
        </div>
      </div>
    </div>
  );
}

export default MainTitleBlock;
