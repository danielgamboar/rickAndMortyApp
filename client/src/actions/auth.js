import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  SET_MESSAGE,
} from './types';

import AuthService from '../services/auth';

export const register = (fullName, email, password) => (dispatch) => {
  return AuthService.register(fullName, email, password).then(
    (response) => {
      if (response !== 200) {
        dispatch({ type: REGISTER_FAIL });
        dispatch({
          type: SET_MESSAGE,
          payload: { message: response.message, error: true },
        });
      } else {
        dispatch({ type: REGISTER_SUCCESS });
        dispatch({
          type: SET_MESSAGE,
          payload: { message: response.message, error: false },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: REGISTER_FAIL });
      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: 'Something went wrong registering your data.',
          error: true,
        },
      });
      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (response) => {
      console.log('LOGIN RESPONSE: ', response);
      if (response.status !== 200) {
        console.log('LOGIN FAIL');
        dispatch({ type: LOGIN_FAIL });
        dispatch({
          type: SET_MESSAGE,
          payload: { message: response.message, error: true },
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: { token: response.auth_token },
        });
        dispatch({
          type: SET_MESSAGE,
          payload: { message: response.message, error: false },
        });
      }
      return Promise.resolve();
    },
    (error) => {
      dispatch({ type: LOGIN_FAIL });
      dispatch({
        type: SET_MESSAGE,
        payload: {
          message: 'Something is wrong with your login credentials.',
          error: true,
        },
      });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
  dispatch({
    type: SET_MESSAGE,
    payload: { message: 'See you soon!', error: false },
  });
};
