import React from 'react';
import styles from './Footer.module.css';
import Logo from '../Logo/Logo';

function Footer() {
  return (
    <footer className={styles.footer}>
      <section className={styles.logo}>
        <Logo smaller />
      </section>
      <section>
        <p>130 291 movies inside</p>
      </section>
    </footer>
  );
}

export default Footer;
