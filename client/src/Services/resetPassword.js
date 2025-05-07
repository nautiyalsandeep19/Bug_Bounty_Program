import { toast } from 'react-hot-toast'
import { endPoints, apiConnector } from './ApiConnector/api'

export const resetPasswordToken =
  (email, userType, navigate) => async (dispatch) => {
    try {
      const response = await apiConnector(
        'POST',
        endPoints.RESET_PASSWORD_TOKEN,
        { email, userType }
      )

      console.log('RESET_PASSWORD_TOKEN API RESPONSE:', response)

      if (!response.success) {
        toast.error(response.message || 'Something went wrong')
        throw new Error(response.message)
      }

      // Store email and userType temporarily to use in the actual reset step
      localStorage.setItem('authData', JSON.stringify({ email, userType }))

      toast.success('Reset Password Link Sent Successfully')

      navigate('/checkemail')
    } catch (error) {
      console.log('RESET_PASSWORD_TOKEN ERROR:', error)
      toast.error('Failed to send reset link')
    }
  }

export const resetPassword = (
  newPassword,
  confirmNewPassword,
  token,
  navigate
) => {
  return async () => {
    console.log('Sending token:', token)
    try {
      const response = await apiConnector('POST', endPoints.RESET_PASSWORD, {
        newPassword,
        confirmPassword: confirmNewPassword,
        token,
      })

      console.log('RESET_PASSWORD API RESPONSE............', response)

      if (!response.success) {
        toast.error(response.message)
        throw new Error(response.message)
      }

      toast.success('Password Reset Successfully')
      navigate('/login')
    } catch (error) {
      console.log('RESETPASSWORD API ERROR............', error)
    }
  }
}
