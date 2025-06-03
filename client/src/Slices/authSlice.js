import { createSlice } from '@reduxjs/toolkit'

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

const initialState = {
  token: getCookie('token')
    ? getCookie('token')
    : localStorage.getItem('token') || null,

  user: getCookie('user')
    ? JSON.parse(getCookie('user'))
    : localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,

  signupData: null,

  userType: getCookie('userType')
    ? JSON.parse(getCookie('userType'))
    : localStorage.getItem('userType')
    ? JSON.parse(localStorage.getItem('userType'))
    : null,

  // socket:null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload
      console.log('token', state.token)

      localStorage.setItem('token', action.payload) // store token as raw string
    },

    setSignupData(state, action) {
      state.signupData = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    setUserType(state, action) {
      state.userType = action.payload
      localStorage.setItem('userType', JSON.stringify(action.payload))
    },
    // setSocket(state, action){
    //   state.socket = action.payload
    // }
  },
})

export const { setToken, setSignupData, setUser, setUserType} =
  authSlice.actions

export default authSlice.reducer