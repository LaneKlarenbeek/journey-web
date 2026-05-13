"use client"

import React, { useActionState } from 'react';
import styles from './Login.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { loginAction } from '../actions/authenticate';

export default function AdminLogin() {

  const [errorMessage, formAction, isPending] = useActionState(loginAction, undefined);

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

        <form action={formAction} className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.label}>Admin Email</label>
            {/* Note: changed 'id' and 'name' to simply 'email' to match Auth.js expectations */}
            <input type="email" id="email" name="email" className={styles.input} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password" className={styles.label}>Password</label>
            <input type="password" id="password" name="password" className={styles.input} required />
          </div>

          {errorMessage && (
            <p style={{ color: 'var(--md-sys-color-error)', fontSize: '0.875rem' }}>
              {errorMessage}
            </p>
          )}

          <button type="submit" className={styles.loginButton} disabled={isPending}>
            {isPending ? "Logging in..." : "Log In"}
          </button>
        </form>

      </section>
    </main>
  );
}