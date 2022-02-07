/* eslint-disable import/no-anonymous-default-export */
import {
  SET_MESSAGE,
  CLEAR_MESSAGE,
  CLEAR_MESSAGE_AND_ERROR,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_MESSAGE:
      return { message: payload.message, error: payload.error };
    case CLEAR_MESSAGE:
      return { message: '', error: state.error };
    case CLEAR_MESSAGE_AND_ERROR:
      return { message: '', error: false };
    default:
      return state;
  }
}
