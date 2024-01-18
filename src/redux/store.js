import { configureStore } from '@reduxjs/toolkit';
import DashReducer from './dashNavReducer.js';

export default configureStore({
  reducer: {
    dashReducer: DashReducer,
  },
});
