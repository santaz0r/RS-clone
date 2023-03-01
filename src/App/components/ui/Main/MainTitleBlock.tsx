import { useState, useEffect } from 'react';
import { mainBackgroundsArray } from '../../../assets/mainBackgrounds/mainBackgroundsArray';
import { randomInteger } from '../../../utils/utils';

import styles from './MainTitleBlock.module.scss';
import { useAppSelector } from '../../../../hooks';
import { getLang } from '../../../store/language';
import { locText } from '../../../services/locText';

function MainTitleBlock() {
  const [backgroundNum, SetBackgroundNum] = useState(randomInteger(0, 6));
  const currentLang = useAppSelector(getLang());
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
      <div className={styles.main__wrapper} style={{ backgroundImage: `url(${mainBackgroundsArray[backgroundNum]})` }}>
        <div className={styles.main}>
          <h1 className={styles.title}>{locText('mainPageTitle', currentLang)}</h1>
          <h2 className={styles.subtitle}>{locText('mainPageSubtitle', currentLang)}</h2>
          <p className={styles.text}>{locText('mainPageText', currentLang)}</p>
          <p className={styles.text}>{locText('mainPageText2', currentLang)}</p>
          <p className={styles.phone}>{locText('contactsPhone', currentLang)}</p>
          <p className={styles.smalltext}>{locText('contactsPhoneComment2', currentLang)}</p>
        </div>
      </div>
    </div>
  );
}

export default MainTitleBlock;
