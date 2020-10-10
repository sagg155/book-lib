import { combineReducers } from 'redux';
import bookReducer from './bookReducer';
import filterReducer from './filterReducer';
import errorReducer from './errorReducer'

export default combineReducers({
  library: bookReducer,
  filter: filterReducer,
  errors: errorReducer
});
