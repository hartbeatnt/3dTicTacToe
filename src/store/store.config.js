import rootReducer from '../reducers';
import {createStore} from 'redux';

const configureStore = (initialState) => {
  return createStore(rootReducer, initialState);
};

const store = configureStore();

export default store