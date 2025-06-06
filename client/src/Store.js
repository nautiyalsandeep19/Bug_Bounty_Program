import { configureStore } from '@reduxjs/toolkit'
import authReducer from './Slices/authSlice'
import programReducer from './Slices/programSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    program:programReducer
  },
})

export default store
