import styles from './page.module.css';

export default function StudentStuffTemp() {


  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.introSection}>
          <h1 className={'sectionTitle'}>STUDENT STUFF</h1>
          <p className={styles.text}>
            The new student portal is now live at{' '}
            <a className={styles.portalLink} href='https://www.stringschool.app/' target='_blank' rel='noreferrer'>
              stringschool.app
            </a>{' '}
            with scheduling, invoicing, song access, resources, and more.
          </p>
          <p className={styles.text}>
            This legacy page will be retired soon. Existing students who want to move over now can request a beta invite on the{' '}
            <a className={styles.portalLink} href='/contact'>contact page</a>.
          </p>
        </div>

        <div className={styles.formsWrapper}>
          <p className={styles.sectionTitles}>SCHEDULING</p>
          <div className={styles.navLink}>
            <a href='https://docs.google.com/document/d/18_k8ToYmk2PYpF2TiPqBhdFUpaXBPx7VqTcrwoZfQxk/edit?tab=t.0' target='_blank' rel='noreferrer'>VIEW SCHEDULE</a>
          </div>
          <p className={styles.label}>Check the current availability for open spots here</p>

          <div className={styles.navLink}>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLScJRl1umSF599X6XEpCAi5UpB3_Z1OVmCP62I0lsVEs3PktuA/viewform' target='_blank' rel='noreferrer'>CANCELLATION FORM</a>
            <p className={styles.label}>Use this form to cancel an upcoming lesson. You can schedule a make-up as well, or do that later</p>
          </div>
          <div className={styles.navLink}>
            <a href='https://docs.google.com/forms/d/e/1FAIpQLSdeyz3mSRt7ryZH95OK1QxmHd4Z2ZFJ1U0vEzv1IhwhcSBFnw/viewform' target='_blank' rel='noreferrer'>MAKEUP FORM</a>
          </div>
          <p className={styles.label}>Use this form to schedule a make-up lesson for a past cancellation</p>

        </div>
        <div className={styles.resourcesWrapper}>
          <p className={styles.sectionTitles}>RESOURCES</p>

          <div className={styles.navLink}>
            <a href='https://drive.google.com/file/d/1FGTRea0Hl99xproEFarB6yReLMpr62E0/view?usp=sharing' target='_blank' rel='noreferrer'>TEXTBOOK</a>
          </div>
          <p className={styles.label}>View or print the PDF copy of my textbook here</p>

          <div className={styles.navLink}>
            <a href='https://drive.google.com/drive/folders/12oHQsJIl9NN0FDcoyUaIw3-OG23IAjOI?usp=sharing' target='_blank' rel='noreferrer'>SONG LIBRARY</a>
          </div>
          <p className={styles.label}>Browse sheet music here</p>
        </div>

        <div className={styles.paymentsSectionWrapper}>
          <p className={styles.sectionTitles}>PAYMENTS</p>
          <div className={styles.navLink}>
            <a href='https://account.venmo.com/u/TimDobranski' target='_blank' rel='noreferrer'>VENMO</a>
          </div>
          <div className={styles.navLink}>
            <a href='https://www.paypal.com/paypalme/timdobranski' target='_blank' rel='noreferrer'>PAYPAL</a>
          </div>
        </div>

        {/* <div className={styles.navLink}>
          <Link href='/student-stuff-temp'>GETTING STARTED</Link>
        </div> */}
      </div>

    </div>
  )

}