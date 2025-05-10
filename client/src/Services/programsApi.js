import { apiConnector, endPoints } from "./ApiConnector/api"

export const getAllPrograms = async () => {
  try {
    const response = await apiConnector('GET', endPoints.GET_ALL_PROGRAMS)
    console.log('All Programs:', response)

    if (!response.success) {
      toast.error(response.message)
      throw new Error(response.message)
    }

    return response.programs
  } catch (error) {
    console.error('Error fetching program details:', error)
    toast.error('Failed to load program details')
    return null
  }
}


export const getPrivatePrograms = async () => {
  try {
    const response = await apiConnector('GET', endPoints.GET_PRIVATE_PROGRAMS)
    console.log('Private Programs:', response)

    if (!response.success) {
      toast.error(response.message)
      throw new Error(response.message)
    }

    return response.programs
  } catch (error) {
    console.error('Error fetching program details:', error)
    toast.error('Failed to load program details')
    return null
  }
}
