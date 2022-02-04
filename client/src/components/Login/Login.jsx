import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import './Login.css';
import { login } from '../../actions/auth';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { isLoggedIn } = useSelector((state) => state.auth);
  // const { message } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submitting form ${email} with pass ${password}`);
    //CHECK FOR FORM ERRORS THEN
    dispatch(login(email, password))
      .then(() => {
        console.log('SE INICIO SESION');
        props.history.push('/');
        window.location.reload();
      })
      .catch((error) => {
        console.error('error login: ', error);
        console.log('HUBO UN ERROR en el login');
      });
  };

  if (isLoggedIn) {
    console.log('EL USUARIO ESTA LOGEADO');
    return <Navigate to="/" />;
  }

  const onChangeEmail = (e) => {
    let email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    let password = e.target.value;
    setPassword(password);
  };

  return (
    <div className="login-box">
      <h3>
        Get into the psycho
        <span>
          <em> Rick And Morty </em>
        </span>
        world
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            required
            onChange={onChangeEmail}
          ></input>
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            required
            onChange={onChangePassword}
          ></input>
        </div>
        <div>
          <button className="input-button">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
