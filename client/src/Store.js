import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './Reducer'
export const Store = configureStore({
  reducer: rootReducer,
})
