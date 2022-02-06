import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import styles from './Register.module.css';
import { register } from '../../actions/auth';
import { useForm, isSame, isRequired } from '../../helpers/formHook';
import { setLoading } from '../../actions/loading';

const Register = (props) => {
  const initialState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const dispatch = useDispatch();

  const validations = [
    ({ email }) => isRequired(email) || { email: 'E-mail is required' },
    ({ fullName }) =>
      isRequired(fullName) || { fullName: 'Full name is required' },
    ({ password }) =>
      isRequired(password) || { password: 'Password is required' },
    ({ password, confirmPassword }) =>
      isSame(password, confirmPassword) || {
        confirmPassword: 'Passwords do not match',
      },
  ];

  const { values, isValid, errors, changeHandler, touched } = useForm(
    initialState,
    validations
  );

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { loading } = useSelector((state) => state.loading);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));

    dispatch(register(values.fullName, values.email, values.password))
      .then(() => {
        return <Navigate to="/login" />;
      })
      .catch((error) => {
        console.error('error register: ', error);
        console.log('there was an error register');
      });
    dispatch(setLoading(false));
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (message === 'You were successfully registered.') {
    return <Navigate to="/login" />;
  }

  return (
    <div className={styles.register_box}>
      <div className={styles.card_header}>
        <h3 className={styles.title}>
          Wanna become a member of this awesome app?
        </h3>
        <h3 className={styles.title}>Register here!</h3>
      </div>
      <div className={styles.card_body}>
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label htmlFor="fullName" className={styles.label_style}>
              Fullname
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={values.fullName}
              required
              onChange={changeHandler}
              className={styles.input_style}
            ></input>
            {touched.fullName && errors.fullName && (
              <p className={styles.error_message}>{errors.fullName}</p>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email" className={styles.label_style}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              required
              className={styles.input_style}
              onChange={changeHandler}
            ></input>
            {touched.email && errors.email && (
              <p className={styles.error_message}>{errors.email}</p>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="password" className={styles.label_style}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              required
              onChange={changeHandler}
              className={styles.input_style}
            ></input>
            {touched.password && errors.password && (
              <p className={styles.error_message}>{errors.password}</p>
            )}
          </div>
          <div className={styles.input_group}>
            <label htmlFor="confirmPassword" className={styles.label_style}>
              Confirm password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={values.confirmPassword}
              required
              onChange={changeHandler}
              className={styles.input_style}
            ></input>
            {touched.confirmPassword && errors.confirmPassword && (
              <p className={styles.error_message}>{errors.confirmPassword}</p>
            )}
          </div>
          <div className={styles.button_box}>
            <button
              className={styles.input_button}
              disabled={loading || !isValid}
            >
              Register
            </button>
          </div>
          <div className={styles.link_box}>
            <Link to="/login" className={styles.link}>
              You are a member? Log in then.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
