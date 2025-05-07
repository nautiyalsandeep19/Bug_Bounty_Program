import { setToken, setUser } from '../Slices/authSlice'
import { apiConnector, endPoints } from './ApiConnector/api'
import toast from 'react-hot-toast'

export const sendOtp = (
  name,
  email,
  password,
  confirmPassword,
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
        userType,
        domain,
      })

      console.log('SENDOTP API RESPONSE............', response)

      console.log(response.success)

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
        domain,
        otp,
        userType,
      })
      console.log(name, email, password, otp, domain, userType)

      // console.log('SIGNUP API RESPONSE............', response)

      if (!response.success) {
        toast.error(response.message, 'hii')
        throw new Error(response.message)
      }

      toast.success('Signup Successful')
      navigate('/login')
    } catch (error) {
      // console.log('SIGNUP API ERROR............', error)
      toast.error(error.message)
    }
  }
}

export const login = (email, password, userType, navigate) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector('POST', endPoints.LOGIN_API, {
        email,
        password,
        userType,
      })

      console.log(response)
      if (!response.success) {
        toast.error(response.message)
        throw new Error(response.message)
      }

      console.log('Response', response)
      toast.success('Login Successful')
      dispatch(setToken(response.token))
      if (userType === 'hacker') {
        dispatch(setUser(response.hacker))
        localStorage.setItem('hacker', JSON.stringify(response.hacker))
      } else if (userType === 'company') {
        dispatch(setUser(response.company))
        localStorage.setItem('company', JSON.stringify(response.company))
      }

      // save the same data in local storage
      localStorage.setItem('token', JSON.stringify(response.token))

      navigate('/')
    } catch (error) {
      console.log('LOGIN API ERROR............', error)
      // toast.error(error.message)
    }
  }
}

export const logout = (navigate) => {
  return (dispatch) => {
    googleLogout()
    dispatch(setToken(null))
    dispatch(setUser(null))
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    toast.success('Logged Out')
    navigate('/')
  }
}
//

export const handleGoogleSuccess = async (
  credentialResponse,
  navigate,
  dispatch
) => {
  const { credential } = credentialResponse

  try {
    const decoded = jwtDecode(credential)
    console.log('Decoded Google JWT:', decoded)

    const response = await apiConnector('POST', endpoints.GOOGLE_LOGIN, {
      token: credential,
    })

    console.log('Google Auth Backend Response:', response)

    if (!response.success) {
      toast.error(response.message)
      throw new Error(response.message)
    }

    // ✅ Save user data to localStorage
    localStorage.setItem('user', JSON.stringify(response.user))

    // Dispatch action to update Redux state
    dispatch(setUser(response.user))
    dispatch(setToken(response.token))

    // Navigate to the home page or dashboard
    toast.success('Login successful!')
    localStorage.setItem('token', JSON.stringify(response.token))
    navigate('/') // Or any other page you want to navigate to
  } catch (error) {
    console.error('Google Login Failed:', error)
    toast.error('Google login failed')
  }
}
