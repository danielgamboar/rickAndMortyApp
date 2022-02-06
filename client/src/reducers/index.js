import { combineReducers } from 'redux';
import auth from './auth';
import message from './message';
import ram from './ramchar';
import loading from './loading';

export default combineReducers({
  auth,
  message,
  ram,
  loading,
});
