import Link from 'next/link';
import styles from './Landing.module.css';

export default function LandingPage() {
  return (
    <main className={styles.pageWrapper}>
      <section className={styles.heroContainer}>
        
        <h1 className={styles.title}>Journey</h1>
        <p className={styles.description}>
          The centralized platform for streamlining being an RA. <br></br> (And other cool ResLife positions)
        </p>

        <div className={styles.buttonGroup}>
          <Link href="/login" className={styles.primaryButton}>
            Log In
          </Link>
          <Link href="/request-access" className={styles.secondaryButton}>
            Request Access
          </Link>
        </div>
      </section>
    </main>
  );
}