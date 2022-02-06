import { IS_LOADING } from '../actions/types';

const initialState = false;

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case IS_LOADING:
      return payload;
    default:
      return state;
  }
}
