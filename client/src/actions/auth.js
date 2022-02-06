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
      dispatch({ type: REGISTER_SUCCESS });
      dispatch({ type: SET_MESSAGE, payload: response.message });
      return Promise.resolve();
    },
    (error) => {
      console.error('aciton register error: ', error);
      const message = error.error || error.message;

      dispatch({ type: REGISTER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const login = (email, password) => (dispatch) => {
  return AuthService.login(email, password).then(
    (response) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { token: response.auth_token },
      });
      dispatch({ type: SET_MESSAGE, payload: response.message });
      return Promise.resolve();
    },
    (error) => {
      console.log('action login error: ', error);
      const message = error.error || error.message;

      dispatch({ type: LOGIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();
  dispatch({ type: LOGOUT });
};
