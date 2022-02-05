import React from 'react';
import styles from './Header.module.css';
import logo from './logo.png';

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles.logo_box}>
        <img src={logo} alt="logo" className={styles.image} />
      </div>
      {/* <form className={styles.search_box}>
        <input
          type="search"
          placeholder="Search the web"
          className={styles.input_style}
        />
        <button className={styles.search_btn}>
          <svg
            className={styles.searchicon}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="m24 21.646-6.205-6.205a9.68 9.68 0 0 0 1.857-5.711C19.652 4.365 15.287 0 9.92 0 4.556 0 .19 4.365.19 9.73c0 5.366 4.365 9.73 9.73 9.73a9.678 9.678 0 0 0 5.487-1.698L21.646 24 24 21.646ZM3.045 9.73a6.885 6.885 0 0 1 6.877-6.877 6.885 6.885 0 0 1 6.877 6.877 6.885 6.885 0 0 1-6.877 6.877A6.884 6.884 0 0 1 3.045 9.73Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </form> */}
    </div>
  );
}
