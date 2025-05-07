import { configureStore } from '@reduxjs/toolkit';
import programReducer from './programSlice';

export const store = configureStore({
  reducer: { program: programReducer },
});