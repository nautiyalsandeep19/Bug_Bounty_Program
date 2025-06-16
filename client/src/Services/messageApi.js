import toast from "react-hot-toast";
import { apiConnector, endPoints } from "./ApiConnector/api"

export const fetchLogsForHacker = async(hackerId)=>{
try {
    const response = await apiConnector('GET',endPoints.GET_LOGS + `/${hackerId}`)
   
    if (!response.success) {
      toast.error(response.message);
      throw new Error(response.message);
    }

    return response.logs
    
} catch (error) {
    console.error('Error fetching Logs:', error);
    return null;
  }
}