'use client';

import { useEffect } from 'react';
import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicheaderMobile from '../../components/Public/PublicHeaderMobile/PublicHeaderMobile';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faRightToBracket } from '@fortawesome/free-solid-svg-icons';

export default function PublicLayout({ children }) {
   useEffect(() => {
    if (!document.getElementById('mms-script')) {
      const s = document.createElement('script');
      s.id = 'mms-script';
      s.src =
        'https://app.mymusicstaff.com/Widget/v4/Widget.ashx?settings=eyJTY2hvb2xJRCI6InNjaF9qbnlKdCIsIldlYnNpdGVJRCI6Indic19WMldKZyIsIldlYnNpdGVCbG9ja0lEIjoid2JiXzc5V2NKTiJ9';
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div className={styles.publicLayoutRoot}>
      <PublicheaderMobile />
      <PublicHeader />
      <div id="mms-widget"></div>

      <a
        href="/contact"
        className={`${styles.floatingCta} ${styles.floatingStartCta}`}
        aria-label="Start Lessons"
      >
        <span className={styles.floatingCtaIcon}>
          <FontAwesomeIcon icon={faCalendarDays} />
        </span>
        <span className={styles.floatingCtaLabel}>Start Lessons</span>
      </a>

      <a
        href="https://www.stringschool.app/"
        className={`${styles.floatingCta} ${styles.floatingStudentCta}`}
        aria-label="Go to Student Login"
      >
        <span className={styles.floatingCtaIcon}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </span>
        <span className={styles.floatingCtaLabel}>Student Login</span>
      </a>

      <main className={styles.publicLayoutMain}>{children}</main>
      <PublicFooter />
    </div>
  );
}
