'use client';

import { useEffect } from 'react';
import PublicHeader from '../../components/Public/PublicHeader/PublicHeader';
import PublicheaderMobile from '../../components/Public/PublicHeaderMobile/PublicHeaderMobile';
import PublicFooter from '../../components/Public/PublicFooter/PublicFooter';
import styles from './layout.module.css';

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
    <>
      <PublicheaderMobile />
      <PublicHeader />
      <div id="mms-widget"></div>

      {children}
      <PublicFooter />
    </>
  );
}
