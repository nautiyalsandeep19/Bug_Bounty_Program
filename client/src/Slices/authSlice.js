import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
}

//slice

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setToken(state, value) {
      state.token = value.payload
      localStorage.setItem('token', JSON.stringify(value.payload))
    },
    setSignupData(state, value) {
      state.signupData = value.payload
    },
    setUser(state, value) {
      state.user = value.payload
      localStorage.setItem('user', JSON.stringify(value.payload))
    },
  },
})

export const { setToken, setSignupData, setUser } = authSlice.actions
export default authSlice.reducer
