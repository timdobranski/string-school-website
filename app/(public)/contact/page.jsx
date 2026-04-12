'use client';

import { useState } from 'react';
import styles from './page.module.css';
import BookIntroModal from '../../../components/Public/BookIntroModal/BookIntroModal';

export default function ContactPage() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusText('');
    setStatusType('success');
    setIsSubmitting(true);
    const form = event.currentTarget;

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim() || '';
    const email = formData.get('email')?.toString().trim() || '';
    const message = formData.get('message')?.toString().trim() || '';

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send message right now.');
      }

      setStatusType('success');
      setStatusText('Message sent successfully. We will get back to you soon.');
      form.reset();
    } catch (error) {
      setStatusType('error');
      setStatusText(error.message || 'Unable to send message right now.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <h1 className={`sectionTitle ${styles.pageHeader}`}>CONTACT</h1>

        <div className={styles.infoPanel}>
          <h2 className={styles.panelHeading}>Schedule An Intro</h2>

          <p className={styles.bodyText}>
            To schedule a free introduction, open the scheduler below and choose a date
            and time that works for you.
          </p>

          <div className={styles.actionsRow}>
            <button type="button" className={styles.scheduleButton} onClick={() => setBookingModalOpen(true)}>
              View Openings
            </button>
          </div>
        </div>

        <form className={styles.formPanel} onSubmit={handleSubmit}>
          <h2 className={styles.panelHeading}>Send A Message</h2>

          <label className={styles.fieldLabel} htmlFor="name">Name</label>
          <input id="name" name="name" type="text" className={styles.input} required />

          <label className={styles.fieldLabel} htmlFor="email">Email</label>
          <input id="email" name="email" type="email" className={styles.input} required />

          <label className={styles.fieldLabel} htmlFor="message">Message</label>
          <textarea id="message" name="message" rows="6" className={styles.textarea} required />

          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </button>

          {statusText ? (
            <p className={`${styles.statusText} ${statusType === 'success' ? styles.statusSuccess : styles.statusError}`}>
              {statusText}
            </p>
          ) : null}
        </form>
      </div>

      <BookIntroModal isOpen={bookingModalOpen} onClose={() => setBookingModalOpen(false)} />
    </section>
  );
}