import toast from 'react-hot-toast'
import { apiConnector, endPoints } from './ApiConnector/api'
import { setUser } from '../Slices/authSlice'

export const getProgramsList = async () => {
  try {
    // call the api
    const response = await apiConnector('GET', endPoints.GET_COMPANY_PROGRAMS)
    console.log('SENDOTP API RESPONSE............', response)

    console.log(response.success)

    // if response.success is false then throw error
    if (!response.success) {
      toast.error(response.message)
      throw new Error(response.message)
    }
  } catch (error) {
    console.log('SENDOTP API ERROR............', error)
    return null
  }
}

// export const getCompanyDetails = async () => {
//   try {
//     const response = await apiConnector('GET', endPoints.GET_COMPANY_DETAILS)
//     console.log('Company Details Response:', response)

//     if (!response.success) {
//       toast.error(response.message)
//       throw new Error(response.message)
//     }

//     return response.companyDetails
//   } catch (error) {
//     console.error('Error fetching company details:', error)
//     toast.error('Failed to load company details')
//     return null
//   }
// }




export const getCompanyDetails = () => {
  return async (dispatch) => {
    try {
      const response = await apiConnector('GET', endPoints.GET_COMPANY_DETAILS)
      console.log('Company Details Response:', response)

      if (!response.success) {
        toast.error(response.message || 'Failed to fetch company details')
        throw new Error(response.message)
      }

      // Optional: store in Redux and/or localStorage
      if (response.companyDetails) {
        dispatch(setUser(response.companyDetails))
        localStorage.setItem('user', JSON.stringify(response.companyDetails))
      }

      return response.companyDetails
    } catch (error) {
      console.error('Error fetching company details:', error)
      toast.error('Failed to load company details')
      return null
    }
  }
}



export const updateCompanyProfile = (
  domain,
  representative,
  position,
  phone
) => {
  return async (dispatch) => {
    try {
      const response = await apiConnector(
        'PUT',
        endPoints.UPDATE_COMPANY_DETAILS,
        {
          representative,
          position,
          phone,
          domain,
        }
      )

      if (!response.success) {
        toast.error(response.message || 'Failed to update company profile')
        throw new Error(response.message)
      }

      console.log('UPDATE COMPANY PROFILE RESPONSE:', response)

      toast.success('Company profile updated successfully ')

      // Optional: update Redux store
      if (response.company) {
        dispatch(setUser(response.company))
        localStorage.setItem('user', JSON.stringify(response.company))
      }
    } catch (error) {
      console.error('UPDATE COMPANY PROFILE ERROR:', error)
      toast.error('Something went wrong while updating profile')
    }
  }
}
