import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

export const endPoints = {
  SEND_OTP_API: BASE_URL + '/api/auth/sendOtp',
  LOGIN_API: BASE_URL + '/api/auth/login',
  SIGNUP_API: BASE_URL + '/api/auth/signUp',
  RESET_PASSWORD_TOKEN: BASE_URL + '/api/auth/resetPasswordToken',
  RESET_PASSWORD: BASE_URL + '/api/auth/resetpassword',
}

export const axiosInstance = axios.create({})

export const apiConnector = async (
  method,
  url,
  bodyData = null,
  headers = {},
  params = null
) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData,
      headers,
      params,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      console.error('API Connector Error:', error)
      throw error
    }
  }
}
