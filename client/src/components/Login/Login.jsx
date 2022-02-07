import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import styles from './Login.module.css';
import { login } from '../../actions/auth';
import { useForm, isRequired } from '../../helpers/formHook';
import { setLoading } from '../../actions/loading';
import Notification from '../Notification/Notification';

const ErrorMessage = (props) => {
  return (
    <div className={styles.center_content}>
      <p className={styles.error_message}>{props.errors}</p>
    </div>
  );
};

const Login = (props) => {
  const initialState = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const dispatch = useDispatch();

  const validations = [
    ({ email }) => isRequired(email) || { email: 'E-mail is required' },
    ({ password }) =>
      isRequired(password) || { password: 'Password is required' },
  ];

  const { values, isValid, errors, changeHandler, touched } = useForm(
    initialState,
    validations
  );
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.loading);
  const { message, error } = useSelector((state) => state.message);

  const [clear, setClear] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(login(values.email, values.password)).then(() => {
      return <Navigate to="/" />;
    });
    dispatch(setLoading(false));
  };

  if (error) {
    setTimeout(() => {
      setClear(true);
    }, 3500);
  }

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className={styles.login_box}>
      <div className={styles.card_header}>
        <h3 className={styles.title}>
          Get into the psycho
          <span className={styles.app_name}>
            <em> Rick And Morty </em>
          </span>
          world
        </h3>
      </div>
      <div className={styles.card_body}>
        {error && !clear ? (
          <Notification message={message} error={error} />
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className={styles.input_group}>
            <label className={styles.input_label} htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              required
              onChange={changeHandler}
              className={styles.input_field}
            ></input>
            {touched.email && errors.email && (
              <ErrorMessage errors={errors.email} />
            )}
          </div>
          <div className={styles.input_group}>
            <label className={styles.input_label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={values.password}
              required
              onChange={changeHandler}
              className={styles.input_field}
            ></input>
            {touched.password && errors.password && (
              <ErrorMessage errors={errors.password} />
            )}
          </div>
          <div className={styles.button_box}>
            <button
              className={styles.input_button}
              disabled={loading || !isValid}
            >
              Login
            </button>
          </div>
          <div className={styles.link_box}>
            <Link to="/register" className={styles.link}>
              Go and register if you don't have an account.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
