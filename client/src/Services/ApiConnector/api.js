import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

export const endPoints = {
  SEND_OTP_API: BASE_URL + '/api/auth/sendOtp',
  LOGIN_API: BASE_URL + '/api/auth/login',
  SIGNUP_API: BASE_URL + '/api/auth/signUp',

  GET_COMPANY_PROGRAMS: BASE_URL + '/api/company/companyPrograms'
}

export const axiosInstance = axios.create({})

export const apiConnector = async (method, url, bodyData, headers, params) => {
  try {
    const response = await axiosInstance({
      method,
      url,
      data: bodyData || null,
      headers: headers || {},
      params: params || null,
    })
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data
    } else {
      throw error
    }
  }
}
