import React from 'react';
import styles from './Header.module.css';
import logo from './logo.png';
import { logout } from '../../actions/auth';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header(props) {
  const { isLoggedIn } = props;
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch(logout());
  };

  return (
    <div className={styles.container}>
      {isLoggedIn ? (
        <div className={styles.nav_bar}>
          <Link to="/login" className={styles.nav_link} onClick={logOut}>
            LogOut
          </Link>
        </div>
      ) : (
        <div className={styles.nav_bar}>
          <Link to={'/login'} className={styles.nav_link}>
            Login
          </Link>
          {window.location.pathname === '/register' ? null : (
            <Link to={'/register'} className={styles.nav_link}>
              Register
            </Link>
          )}
        </div>
      )}
      <Link to="/" className={styles.logo_box}>
        <img src={logo} alt="logo" className={styles.image} />
      </Link>
    </div>
  );
}
