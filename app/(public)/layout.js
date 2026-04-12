'use client';

import { useEffect } from 'react';
import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicheaderMobile from '../../components/Public/PublicHeaderMobile/PublicHeaderMobile';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

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
        href="https://www.stringschool.app/"
        className={styles.floatingStudentCta}
        aria-label="Go to Student Login"
      >
        <span className={styles.floatingStudentCtaIcon}>
          <FontAwesomeIcon icon={faRightToBracket} />
        </span>
        <span className={styles.floatingStudentCtaLabel}>Student Login</span>
      </a>

      <main className={styles.publicLayoutMain}>{children}</main>
      <PublicFooter />
    </div>
  );
}
