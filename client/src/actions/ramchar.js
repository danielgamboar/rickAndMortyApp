import {
  LOAD_ALL_CHARS,
  LOAD_ALL_CHARS_FAIL,
  LOAD_FAV_CHARS,
  LOAD_FAV_CHARS_FAIL,
  SET_MESSAGE,
  USER_FAV_CHAR,
  USER_FAV_CHAR_FAIL,
} from '../actions/types';
import ramService from '../services/ramchars';

export const getAllChars = (page) => (dispatch) => {
  return ramService.getAllChars(page).then(
    (response) => {
      dispatch({ type: LOAD_ALL_CHARS, payload: response.results });
      dispatch({ type: SET_MESSAGE, payload: 'Loaded all chars.' });
    },
    (error) => {
      console.error('get all chars error: ', error);
      const message = error.error || error.message;

      dispatch({ type: LOAD_ALL_CHARS_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const getUsersFavChars = () => (dispatch) => {
  return ramService.getUsersFavChars().then(
    (response) => {
      dispatch({ type: LOAD_FAV_CHARS, payload: response });
      dispatch({ type: SET_MESSAGE, payload: 'Loaded all favorite chars.' });
    },
    (error) => {
      console.error('get fav chars error: ', error);
      const message = error.error || error.message;

      dispatch({ type: LOAD_FAV_CHARS_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export const favOrUnfavChar = (charId) => (dispatch) => {
  return ramService.favOrUnfavChar(charId).then(
    (response) => {
      console.log('user faved this char', response);
      dispatch({ type: USER_FAV_CHAR, payload: response });
      dispatch({ type: SET_MESSAGE, payload: response.message });
      dispatch(getUsersFavChars());
      return Promise.resolve();
    },
    (error) => {
      console.error('get fav chars error: ', error);
      const message = error.error || error.message;

      dispatch({ type: USER_FAV_CHAR_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};
