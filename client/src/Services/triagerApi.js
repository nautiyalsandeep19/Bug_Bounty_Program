import toast from 'react-hot-toast'
import { apiConnector, endPoints } from './ApiConnector/api'

import { setUser } from '../Slices/authSlice'

export const updateTriagerProfile = (bio, github, phone, image) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'PUT',
        endPoints.UPDATE_TRIAGER_DETAILS,
        {
          bio,
          github,
          phone,
          image,
        }
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to update Triager profile')
        throw new Error(response.message)
      }

      console.log('UPDATE TRIAGER PROFILE RESPONSE:', response)
      toast.success('Triager profile updated successfully')

      // Optional: update Redux store
      if (response.triager) {
        dispatch(setUser(response.triager))
        localStorage.setItem('user', JSON.stringify(response.triager))
      }
    } catch (error) {
      console.error('UPDATE HACKER PROFILE ERROR:', error)
      toast.error('Something went wrong while updating profile')
    }
  }
}
