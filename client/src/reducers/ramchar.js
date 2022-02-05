/* eslint-disable import/no-anonymous-default-export */
import {
  LOAD_ALL_CHARS,
  LOAD_ALL_CHARS_FAIL,
  LOAD_FAV_CHARS,
  LOAD_FAV_CHARS_FAIL,
  USER_FAV_CHAR,
  USER_FAV_CHAR_FAIL,
} from '../actions/types';

const initialState = {
  allChars: [],
  userFavChars: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  console.log('reducer action', action);

  switch (type) {
    case LOAD_ALL_CHARS:
      return {
        ...state,
        allChars: payload,
      };
    case LOAD_ALL_CHARS_FAIL:
      return {
        ...state,
        allChars: [],
      };
    case LOAD_FAV_CHARS:
      return {
        ...state,
        userFavChars: payload,
      };
    case LOAD_FAV_CHARS_FAIL:
      return {
        ...state,
        userFavChars: [],
      };
    case USER_FAV_CHAR:
      return {
        ...state,
      };
    case USER_FAV_CHAR_FAIL:
      return {
        ...state,
      };
    default:
      return state;
  }
}
