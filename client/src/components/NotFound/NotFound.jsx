import React from 'react';
import styles from './NotFound.module.css';
import { Navigate, Link } from 'react-router-dom';

function NotFound() {
  const routes = ['/', '/login', '/register', '/character/', '/404'];
  if (!routes.includes(window.location.pathname)) {
    return <Navigate to="/404" />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.fourofour}>404</div>
      <h1 className={styles.title}>
        We didn't found what you were looking for
      </h1>
      <Link to="/" className={styles.link}>
        Go back to home page!
      </Link>
    </div>
  );
}

export default NotFound;
