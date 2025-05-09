import toast from 'react-hot-toast'
import { apiConnector, endPoints } from './ApiConnector/api'
import { setUser } from '../Slices/authSlice'

export const getHackerDetails = async () => {
  try {
    const response = await apiConnector('GET', endPoints.GET_HACKER_DETAILS)
    console.log('Hacker Details Response:', response)

    if (!response.success) {
      toast.error(response.message)
      throw new Error(response.message)
    }

    return response.hackerDetails
  } catch (error) {
    console.error('Error fetching hacker details:', error)
    toast.error('Failed to load hacker details')
    return null
  }
}

export const updateHackerProfile = (
  bio,
  website,
  companywebsite,
  linkedin,
  instagram,
  github,
  twitter
) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'PUT',
        endPoints.UPDATE_HACKER_DETAILS,
        {
          bio,
          website,
          companywebsite,
          linkedin,
          instagram,
          github,
          twitter,
        }
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to update hacker profile')
        throw new Error(response.message)
      }

      console.log('UPDATE HACKER PROFILE RESPONSE:', response)

      toast.success('Hacker profile updated successfully')

      // Optional: update Redux store
      if (response.Hacker) {
        dispatch(setUser(response.Hacker))
        localStorage.setItem('user', JSON.stringify(response.Hacker))
      }
    } catch (error) {
      console.error('UPDATE HACKER PROFILE ERROR:', error)
      toast.error('Something went wrong while updating profile')
    }
  }
}
