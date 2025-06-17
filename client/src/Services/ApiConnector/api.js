import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_HOST_URL

export const endPoints = {
  // Auth
  SEND_OTP_API: BASE_URL + '/api/auth/sendOtp',
  LOGIN_API: BASE_URL + '/api/auth/login',
  SIGNUP_API: BASE_URL + '/api/auth/signUp',
  RESET_PASSWORD_TOKEN: BASE_URL + '/api/auth/resetPasswordToken',
  RESET_PASSWORD: BASE_URL + '/api/auth/resetpassword',
  LOGOUT_API: BASE_URL + '/api/auth/logout',

  // company
  GET_COMPANY_DETAILS: BASE_URL + '/api/company/companyDetails',
  UPDATE_COMPANY_DETAILS: BASE_URL + '/api/company/updateDetails',
  GET_COMPANY_PROGRAMS: BASE_URL + '/api/company/companyPrograms',
  GET_ALL_PROGRAMS: BASE_URL + '/api/programs/allPrograms',
  GET_PRIVATE_PROGRAMS: BASE_URL + '/api/programs/privatePrograms',

  //hackers
  GET_HACKER_DETAILS: BASE_URL + '/api/hacker/hackerDetails',
  UPDATE_HACKER_DETAILS: BASE_URL + '/api/hacker/updateHackerDetails',

  //leaderBoard
  GET_LEADERBOARD: BASE_URL + '/api/hacker/leaderBoard',
  //reports
  CREATE_REPORT: BASE_URL + '/api/reports/createReport',
  UPDATE_REPORT_STATUS: BASE_URL + '/api/reports/updateStatus',

  //upload
  UPLOAD: BASE_URL + '/api/upload',

  //Programs
  GET_PROGRAMBY_ID: BASE_URL + '/api/programs/programDetail',
  TOGGLE_LEADERBOARD_VISIBILITY: BASE_URL + '/api/programs/visibilityChange',

  // messages/Logs
  GET_LOGS: BASE_URL + '/api/messages/logs',
}

export const axiosInstance = axios.create({ withCredentials: true })

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
