import { setToken, setUser, setUserType } from '../Slices/authSlice'
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

      toast.success('Login Successful')
      dispatch(setUser(response.user))
      dispatch(setUserType(response.userType))
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

// Helper function to delete a cookie

function deleteCookie(name) {
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax`
}

export const logout = (navigate) => {
  return (dispatch) => {
    dispatch(setToken(null))
    dispatch(setUser(null))
    dispatch(setUserType(null))

    // Remove from localStorage
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('userType')

    // Remove from cookies
    deleteCookie('token')
    deleteCookie('user')
    deleteCookie('userType')

    toast.success('Logged Out')
    navigate('/signup')
  }
}
