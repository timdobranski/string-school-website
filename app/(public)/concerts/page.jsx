'use client'

import styles from './page.module.css';
import Hero from '../../../components/Public/PublicHero/Hero';
import { Carousel } from 'react-responsive-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function ConcertsPage() {
const concertPhotos = [
  { image: '/images/concerts/5.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/6.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/7.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/8.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/9.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/10.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/11.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/12.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/13.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/14.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/15.webp', caption: 'String School Concert, 2025' },
  { image: '/images/concerts/16.webp', caption: 'String School Concert, 2025' },
];


  const nextSlideArrow = (handleClick, hasNext) => (
    <button disabled={!hasNext} className={hasNext ? styles.slideButtonRight : styles.slideButtonRightDisabled} onClick={handleClick}>
      <FontAwesomeIcon icon={faChevronRight}  className={styles.slideButtonIcon}/>
    </button>
  );

  const prevSlideArrow = (handleClick, hasPrev) => (
    <button disabled={!hasPrev} className={hasPrev ? styles.slideButtonLeft : styles.slideButtonLeftDisabled} onClick={handleClick}>
      <FontAwesomeIcon icon={faChevronLeft} className={styles.slideButtonIcon}/>
    </button>
  );

  return (
    <div className={styles.wrapper}>
      <Hero
        type={'photo'}
        title={['CONCERTS']}
        button={false}
        titleStyles={{
          marginBottom: '10vw'
        }}
        // image={'/images/concerts/12-2.jpg'}
        webp={'/images/concerts/14.webp'}
        // imageStyles={{ filter: 'brightness(80%)' }}
        // textDirection={'right'}
        text={[]}
      />
      <div className={styles.contentWrapper}>
        <h1 className={'smallerSectionTitle'}>THE REAL THING</h1>
        <p className={styles.text}>{`String School Concerts are one of the most fun ways to build motivation and experience as a musician. These are designed to be real concerts, featuring professional, custom lighting and sound, food, games, and a welcoming atmosphere. They’re also a great opportunity for students to meet, connect, and build friendships through music.`}</p>
      </div>
<Carousel
  className={styles.carousel}
  showArrows={true}
  swipeable={true}
  dynamicHeight={false}
  emulateTouch={true}
  useKeyboardArrows={true}
  centerMode={true}
  centerSlidePercentage={100}
  transitionTime={500}
  swipeScrollTolerance={5}
  renderArrowPrev={prevSlideArrow}
  renderArrowNext={nextSlideArrow}
  showStatus={false}
  showThumbs={false}
  showIndicators={false}
>
  {concertPhotos.map((photo, index) => (
    <div className={styles.slide} key={index}>
      <div className={styles.slideInner}>
        <img
          src={photo.image}
          alt={`Photo ${index + 1}`}
          className={styles.carouselImage}
          loading="lazy"
        />
        <p className={styles.caption}>{photo.caption}</p>
      </div>
    </div>
  ))}
</Carousel>

    </div>
  );
}