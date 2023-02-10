import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useAppSelector } from '../../../../hooks';
import { getDoctorsList } from '../../../store/doctors';
import Specializations from '../Specializations/Specializations';
// import noPhoto from '../../../assets/nophoto.jpg';

import styles from './DoctorsCarousel.module.scss';
import { getLocalizedText } from '../../../services/localizationService';

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1, // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
  },
};

function DoctorsCarousel() {
  const doctors = useAppSelector(getDoctorsList());
  return (
    <Carousel
      swipeable
      draggable
      // showDots
      responsive={responsive}
      // ssr
      infinite
      // autoPlay={this.props.deviceType !== "mobile" ? true : false}
      autoPlay
      autoPlaySpeed={8000}
      // keyBoardControl
      // customTransition="all .5"
      customTransition="transform 1500ms ease-in-out"
      // transitionDuration={500}
      containerClass="carousel-container"
      // removeArrowOnDeviceType={['tablet', 'mobile']}
      // deviceType={this.props.deviceType}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {doctors.map((doc) => (
        <div key={doc._id} className={styles.card}>
          <div className={styles.card__img} style={{ backgroundImage: `url(${doc.image})` }} />
          <p>
            {getLocalizedText('name')}: {doc.name}
          </p>
          <p>
            {getLocalizedText('surname')}: {doc.surname}
          </p>
          <Specializations id={doc.specialization} />
        </div>
      ))}
    </Carousel>
  );
}

export default DoctorsCarousel;
