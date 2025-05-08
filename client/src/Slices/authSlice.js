import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  signupData: null, // ✅ ADD THIS to avoid undefined errors
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      localStorage.setItem('token', JSON.stringify(action.payload))
    },
    setSignupData(state, action) {
      state.signupData = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
  },
})

export const { setToken, setSignupData, setUser } = authSlice.actions
export default authSlice.reducer
