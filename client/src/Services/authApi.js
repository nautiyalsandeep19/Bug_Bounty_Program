import { setToken, setUser, setUserType } from '../Slices/authSlice'
// import { socket } from '../socket.js'
import { apiConnector, endPoints } from './ApiConnector/api'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

// Define socket at the module level
let socket = null

export const sendOtp = (
  name,
  email,
  password,
  confirmPassword,
  country,
  userType,
  domain,
  navigate
) => {
  return async () => {
    try {
      // call the send otp API
      const response = await apiConnector('POST', endPoints.SEND_OTP_API, {
        name,
        email,
        password,
        confirmPassword,
        country,
        userType,
        domain,
      })

      console.log('SENDOTP API RESPONSE............', response)

      console.log(response)

      // if response.success is false then throw error
      if (!response.success) {
        toast.error(response.errors[0].msg)
        throw new Error(response.message)
      }

      // toast otp sent successfull
      toast.success('OTP Sent Successfully')

      // navigate to verify email
      navigate('/verifyOtp')
    } catch (error) {
      console.log('SENDOTP API ERROR............', error)
    }
  }
}

export const signup = (
  name,
  email,
  password,
  country,
  domain,
  otp,
  userType,
  navigate
) => {
  return async () => {
    try {
      // call the signup API

      const response = await apiConnector('POST', endPoints.SIGNUP_API, {
        name,
        email,
        password,
        country,
        domain,
        otp,
        userType,
      })
      console.log(
        ' data is :',
        name,
        email,
        password,
        otp,
        domain,
        userType,
        country
      )

      // console.log('SIGNUP API RESPONSE............', response)

      if (!response.success) {
        toast.error(response.message, 'hii')
        throw new Error(response.message)
      }

      toast.success('Signup Successful')
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  }
}

export const login = (email, password, userType, navigate) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'POST',
        endPoints.LOGIN_API,
        {
          email,
          password,
          userType,
        },
        {
          withCredentials: true,
        }
      )

      console.log(response)

      if (!response.success) {
        toast.error(response.message || response.errors[0].msg)

        throw new Error(response.message)
      }
      console.log('token', response.token)

      toast.success('Login Successful')
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      dispatch(setUserType(response.userType))

      socket = io('http://localhost:8000', {
        query: {
          userId: response.user._id,
        },
      })
      socket.connect()

      if (userType === 'company') {
        navigate('/company/dashboard')
      } else if (userType === 'hacker') {
        navigate('/hacker/dashboard')
      } else {
        navigate('/login')
      }
    } catch (error) {
      console.log('LOGIN API ERROR............', error)
    }
  }
}

//logout
export const logout = (navigate) => {
  return async (dispatch) => {
    try {
      // Call the backend logout API to clear the cookie
      await apiConnector('POST', endPoints.LOGOUT_API, null, {
        withCredentials: true,
      })

      // Clear Redux state
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setUserType(null))

      // Disconnect socket if it's connected
      if (socket) {
        socket.disconnect()
        socket = null
      }

      //socket
      // Clear localStorage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('userType')

      toast.success('Logged out successfully')
      navigate('/signup')
    } catch (error) {
      console.error('Logout error:', error)
      toast.error(error?.response?.data?.message || 'Logout failed. Try again.')
    }
  }
}
