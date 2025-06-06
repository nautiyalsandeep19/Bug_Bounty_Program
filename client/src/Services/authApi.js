import { setToken, setUser, setUserType } from '../Slices/authSlice'
import { connectSocket, disconnectSocket } from '../socket'

import { apiConnector, endPoints } from './ApiConnector/api'
import toast from 'react-hot-toast'

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

      toast.success('Login Successful')
      dispatch(setToken(response.token))
      dispatch(setUser(response.user))
      dispatch(setUserType(response.userType))
      connectSocket(response.user._id)
      if (userType === 'admin') {
        navigate('/admin/home')
      } else if (userType === 'company') {
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
      await apiConnector('POST', endPoints.LOGOUT_API, null, {
        withCredentials: true,
      })

      // Clear Redux state
      dispatch(setToken(null))
      dispatch(setUser(null))
      dispatch(setUserType(null))

      // Disconnect socket if it's connected

      disconnectSocket()

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
