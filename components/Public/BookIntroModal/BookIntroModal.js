'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './BookIntroModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

export default function BookIntroModal({ isOpen, onClose }) {
  const defaultOrigin = process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : 'https://stringschool.app';
  const bookingOrigin = (process.env.NEXT_PUBLIC_BOOKING_IFRAME_ORIGIN || defaultOrigin).replace(/\/$/, '');
  const bookingSrc = `${bookingOrigin}/book-intro?teacherProfileId=2ed29970-ff71-4a8e-9fb1-8731a739d350`;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={styles.modalOverlay} onClick={onClose} role="presentation">
      <div
        className={styles.modalBody}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Book Intro Lesson"
      >
        <button
          type="button"
          className={styles.closeIconButton}
          onClick={onClose}
          aria-label="Close booking modal"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <div className={styles.iframeShell}>
          <iframe
            src={bookingSrc}
            title="Book Intro Lesson"
            width="100%"
            height="960"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </div>,
    document.body
  );
}
