/* eslint-disable import/no-anonymous-default-export */
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  LOGOUT,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
} from '../actions/types';

const token = localStorage.getItem('auth-token');

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: payload.token,
      };
    default:
      return state;
  }
}
