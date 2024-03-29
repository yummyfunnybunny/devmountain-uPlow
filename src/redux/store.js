import { configureStore } from '@reduxjs/toolkit';
import DashReducer from './dashNavReducer.js';
import loggedInReducer from './loggedInReducer.js';
import modalReducer from './modalReducer.js';
import propertyReducer from './propertyReducer.js';
import jobReducer from './jobReducer.js';
import findJobsReducer from './findJobsReducer.js';
import workerReducer from './workerReducer.js';
import alertReducer from './alertReducer.js';
import toastReducer from './toastReducer.js';
import forecastReducer from './forecastReducer.js';

export default configureStore({
  reducer: {
    dashReducer: DashReducer,
    loggedInReducer: loggedInReducer,
    modalReducer: modalReducer,
    propertyReducer: propertyReducer,
    jobReducer: jobReducer,
    findJobsReducer: findJobsReducer,
    workerReducer: workerReducer,
    alertReducer: alertReducer,
    toastReducer: toastReducer,
    forecastReducer: forecastReducer,
  },
});
