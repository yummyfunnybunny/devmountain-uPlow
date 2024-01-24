import { configureStore } from '@reduxjs/toolkit';
import DashReducer from './dashNavReducer.js';
import loggedInReducer from './loggedInReducer.js';
import modalReducer from './modalReducer.js';
import propertyReducer from './propertyReducer.js';
import jobReducer from './jobReducer.js';

export default configureStore({
  reducer: {
    dashReducer: DashReducer,
    loggedInReducer: loggedInReducer,
    modalReducer: modalReducer,
    propertyReducer: propertyReducer,
    jobReducer: jobReducer,
  },
});
