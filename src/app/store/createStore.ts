import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import countsReducer from './countsSlice';
// import translationsReducer from './translationsSlice';
// import categoriesReducer from './categoriesSlice';
import operationsReducer from './operationsSlice';

const rootReducer = combineReducers({
  user: userReducer,
  counts: countsReducer,
  // translations: translationsReducer,
  // categories: categoriesReducer,
  operations: operationsReducer,
});

function createStore() {
  return configureStore({ reducer: rootReducer });
}

const store = createStore()

export default store
