import {
  LOAD_ALL_CHARS,
  LOAD_ALL_CHARS_FAIL,
  LOAD_FAV_CHARS,
  LOAD_FAV_CHARS_FAIL,
  SET_MESSAGE,
  USER_FAV_CHAR,
  USER_FAV_CHAR_FAIL,
  INCREMENT_PAGE,
  DECREMENT_PAGE,
} from '../actions/types';
import ramService from '../services/ramchars';

export const incrementPage = (page) => (dispatch) => {
  dispatch({ type: INCREMENT_PAGE, payload: page + 1 });
  dispatch({
    type: SET_MESSAGE,
    payload: { message: 'Added 1 to page.', error: false },
  });
  return;
};
export const decrementPage = (page) => (dispatch) => {
  dispatch({ type: DECREMENT_PAGE, payload: page - 1 });

  dispatch({
    type: SET_MESSAGE,
    payload: { message: 'Substracted 1 to page.', error: false },
  });
};

export const getAllChars = (page) => (dispatch) => {
  return ramService.getAllChars(page).then(
    (response) => {
      dispatch({ type: LOAD_ALL_CHARS, payload: response.results });
      dispatch({
        type: SET_MESSAGE,
        payload: { message: 'Loaded all chars.', error: false },
      });

      return Promise.resolve();
    },
    (error) => {
      console.error('get all chars error: ', error);
      const message = error.error || error.message;
      dispatch({ type: LOAD_ALL_CHARS_FAIL });
      dispatch({ type: SET_MESSAGE, payload: { message, error: true } });

      return Promise.reject();
    }
  );
};

export const getUsersFavChars = () => (dispatch) => {
  return ramService.getUsersFavChars().then(
    (response) => {
      dispatch({ type: LOAD_FAV_CHARS, payload: response });
      dispatch({
        type: SET_MESSAGE,
        payload: { message: 'Loaded all favorite chars.', error: false },
      });

      return Promise.resolve();
    },
    (error) => {
      console.error('get fav chars error: ', error);
      const message = error.error || error.message;

      dispatch({ type: LOAD_FAV_CHARS_FAIL });
      dispatch({ type: SET_MESSAGE, payload: { message, error: true } });
      return Promise.reject();
    }
  );
};

export const favOrUnfavChar = (charId) => (dispatch) => {
  return ramService.favOrUnfavChar(charId).then(
    (response) => {
      dispatch({ type: USER_FAV_CHAR, payload: response });
      dispatch({
        type: SET_MESSAGE,
        payload: { message: response.message, error: false },
      });
      dispatch(getUsersFavChars());
      return Promise.resolve();
    },
    (error) => {
      console.error('get fav chars error: ', error);
      const message = error.error || error.message;

      dispatch({ type: USER_FAV_CHAR_FAIL });
      dispatch({ type: SET_MESSAGE, payload: { message, error: true } });
      return Promise.reject();
    }
  );
};
