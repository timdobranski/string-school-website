'use client'
import styles from './PromoBlock.module.css';
import parse from 'html-react-parser';
import { useEffect, useRef, useState } from 'react';

export default function PromoBlock({ title, text, photo, direction, background, titleClassName }) {
  const blockRef = useRef(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const node = blockRef.current;
    if (!node) return;

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setHasEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const backgroundInput = typeof background === 'string' ? background.trim() : '';
  const resolvedBackground =
    backgroundInput.startsWith('--')
      ? `var(${backgroundInput})`
      : /^(#|rgb|hsl|white|black)/i.test(backgroundInput)
        ? backgroundInput
        : backgroundInput.includes('gradient(')
          ? backgroundInput
          : backgroundInput
            ? `var(--${backgroundInput})`
            : 'white';

  const backgroundStyle = resolvedBackground.includes('gradient(')
    ? {
      backgroundColor: '#ffffff',
      backgroundImage: resolvedBackground,
    }
    : {
      backgroundColor: resolvedBackground || '#ffffff',
    };

  return (
    <div ref={blockRef} className={styles.background} style={backgroundStyle}>
      <div
        className={`${styles.wrapper} ${direction === 'left' ? styles.left : styles.right} ${styles.animateIn} ${hasEntered ? styles.animateInVisible : ''}`}
      >
        <h3 className={`${styles.mobileTitle} ${'smallerSectionTitle'} ${styles[titleClassName]}`}>{title}</h3>

        <div className={`${styles.textSide} ${styles.textAnimate} ${direction === 'left' ? styles.fromLeft : styles.fromRight} ${hasEntered ? styles.contentVisible : ''}`}>
          <h3 className={`${styles.desktopTitle} ${'smallerSectionTitle'} ${styles[titleClassName]}`}>{title}</h3>
          <p className={`${titleClassName === 'whiteTitle' ? styles.whiteText : styles.text}`}>
            {parse(text)}
          </p>
        </div>

        <div className={`${styles.photoSide} ${styles.photoAnimate} ${direction === 'left' ? styles.fromRight : styles.fromLeft} ${hasEntered ? styles.contentVisible : ''}`}>
        <picture className={styles.pictureElement}>
          <source srcSet={photo.webp} type="image/webp" />
          <img
            src={photo.image}
            alt="promo photo"
            className={styles.image}
            style={{ ...photo.styles }}
          />
        </picture>
        </div>
      </div>
    </div>
  );
}
