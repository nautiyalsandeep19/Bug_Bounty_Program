import { createSlice } from '@reduxjs/toolkit'

// const initialState = {
//   token: localStorage.getItem('token')
//     ? JSON.parse(localStorage.getItem('token'))
//     : null,
//   user: localStorage.getItem('user')
//     ? JSON.parse(localStorage.getItem('user'))
//     : null,
//   signupData: null, // ✅ ADD THIS to avoid undefined errors
// }

// Utility to get cookie value by name

// Utility to get cookie value by name
function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const initialState = {
  token: getCookie('token')
    ? getCookie('token')
    : localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token'))
    : null,

  user: getCookie('user')
    ? JSON.parse(getCookie('user'))
    : localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,

  signupData: null, // ✅ to avoid undefined errors
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
