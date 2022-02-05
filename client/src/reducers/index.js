import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import ram from './ramchar';

export default combineReducers({
  auth,
  message,
  ram,
});
