import { SET_MESSAGE, CLEAR_MESSAGE, CLEAR_MESSAGE_AND_ERROR } from './types';

export const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

export const clearMessage = (message) => ({
  type: CLEAR_MESSAGE,
});

export const clearMessageError = () => ({
  type: CLEAR_MESSAGE_AND_ERROR,
});
