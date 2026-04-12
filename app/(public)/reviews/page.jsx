'use client'

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './page.module.css';
import reviewsData from './reviewsData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default function ReviewsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselHeight, setCarouselHeight] = useState(0);
  const touchStartX = useRef(null);
  const slideRefs = useRef([]);

  const sortedReviews = useMemo(() => {
    const monthOrder = {
      Jan: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      May: 4,
      Jun: 5,
      Jul: 6,
      Aug: 7,
      Sep: 8,
      Oct: 9,
      Nov: 10,
      Dec: 11,
    };

    const parseReviewDate = (review) => {
      const [monthToken, dayToken] = (review.day || '').split(' ');
      const month = monthOrder[monthToken] ?? 0;
      const day = Number(dayToken) || 1;
      const year = Number(review.year) || 0;
      return new Date(year, month, day).getTime();
    };

    return [...reviewsData].sort((a, b) => parseReviewDate(b) - parseReviewDate(a));
  }, []);

  const previousReview = () => {
    setActiveIndex((prev) => (prev - 1 + sortedReviews.length) % sortedReviews.length);
  };

  const nextReview = () => {
    setActiveIndex((prev) => (prev + 1) % sortedReviews.length);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    const threshold = 45;

    if (deltaX > threshold) {
      previousReview();
    } else if (deltaX < -threshold) {
      nextReview();
    }

    touchStartX.current = null;
  };

  useEffect(() => {
    let animationFrameId;

    const updateHeight = () => {
      const currentSlide = slideRefs.current[activeIndex];
      if (currentSlide) {
        setCarouselHeight(currentSlide.scrollHeight);
      }
    };

    // Wait one frame so layout (including wrapped text) is finalized before measuring.
    animationFrameId = window.requestAnimationFrame(updateHeight);

    const observedSlide = slideRefs.current[activeIndex];
    const resizeObserver = new ResizeObserver(() => updateHeight());
    if (observedSlide) {
      resizeObserver.observe(observedSlide);
    }

    window.addEventListener('resize', updateHeight);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [activeIndex]);


  return (
    <div>
      <div className={styles.reviewsWrapper}>
        <div className={styles.contentWrapper}>
          <h1 className={'sectionTitle'}>REVIEWS</h1>
          <p className={styles.text}>{`I'm very proud of the feedback I've received from my students over the years. My students have become
        friends and even neighbors. See what everyone is saying about their experience learning with me below:`}</p>

          <div className={styles.carouselShell} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
            <div className={styles.navRow}>
              <button type="button" className={styles.navButton} onClick={previousReview} aria-label="Previous review">
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>

              <button type="button" className={styles.navButton} onClick={nextReview} aria-label="Next review">
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>

            <div className={styles.carouselViewport} style={carouselHeight ? { height: `${carouselHeight}px` } : undefined}>
              <div className={styles.carouselTrack} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
                {sortedReviews.map((review, index) => (
                  <div key={`${review.name}-${index}`} className={styles.carouselSlide}>
                    <article className={styles.reviewCard} ref={(el) => { slideRefs.current[index] = el; }}>
                      <div className={styles.reviewTopRow}>
                        <div className={styles.reviewerBlock}>
                          {review.photo ? (
                            <img src={review.photo} alt={`${review.name} profile`} className={styles.reviewerPhoto} />
                          ) : (
                            <div className={styles.reviewerFallback}>
                              <FontAwesomeIcon icon={faUser} />
                            </div>
                          )}
                          <div>
                            <h3 className={styles.reviewerName}>{review.name}</h3>
                            <p className={styles.reviewDate}>{review.day} {review.year}</p>
                          </div>
                        </div>

                        <div className={styles.ratingRow} aria-label="5 star review">
                          {Array.from({ length: 5 }).map((_, starIndex) => (
                            <FontAwesomeIcon key={starIndex} icon={faStar} className={styles.starIcon} />
                          ))}
                        </div>
                      </div>

                      <div className={styles.quoteRow}>
                        <FontAwesomeIcon icon={faQuoteLeft} className={styles.quoteIcon} />
                        <p className={styles.reviewText}>{review.text}</p>
                      </div>
                    </article>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.paginationRow}>
              <div className={styles.dots}>
                {sortedReviews.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.dot} ${index === activeIndex ? styles.dotActive : ''}`}
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}