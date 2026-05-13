import React from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminLogin() {
  return (
    <main className={styles.pageWrapper}>
      <section className={styles.loginCard}>
        
        <Link href="/" className={styles.backButton} aria-label="Return to Landing Page">
          <Image 
            src="/back-96-white.png"
            alt="Back Arrow" 
            width={24} 
            height={24}
            className={styles.darkIcon}
          />
          <Image 
            src="/back-96-black.png"
            alt="Back Arrow" 
            width={24} 
            height={24}
            className={styles.lightIcon}
          />
        </Link>

        <div className={styles.header}>
          <h1 className={styles.title}>Journey Admin</h1>
          <p className={styles.subtitle}>Log in to continue</p>
        </div>

        <form className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="admin-email" className={styles.label}>
              Admin Email
            </label>
            <input 
              type="email" 
              id="admin-email" 
              className={styles.input} 
              placeholder="name@example.com"
              required 
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="admin-password" className={styles.label}>
              Password
            </label>
            <input 
              type="password" 
              id="admin-password" 
              className={styles.input} 
              placeholder="••••••••"
              required 
            />
          </div>

          <button type="submit" className={styles.loginButton}>
            Log In
          </button>
        </form>

      </section>
    </main>
  );
}