import React from 'react';
import styles from './Footer.module.css';

function Footer() {
  return (
    <div className={styles.footer}>
      <p className={styles.footer_text}>
        Developed by Daniel Gamboa, 6 🍺, and around 14 ☕
      </p>
    </div>
  );
}

export default Footer;
