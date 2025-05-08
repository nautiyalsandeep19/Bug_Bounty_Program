import toast from "react-hot-toast";
import { apiConnector, endPoints } from "./ApiConnector/api";


export const getProgramsList = () => {
  return async () => {
    try {
      // call the api
      const response = await apiConnector("GET",endPoints.GET_COMPANY_PROGRAMS);
      console.log("SENDOTP API RESPONSE............", response);

      console.log(response.success);

       // if response.success is false then throw error
       if (!response.success) {
        toast.error(response.message)
        throw new Error(response.message)
      }

    } catch (error) {
        console.log('SENDOTP API ERROR............', error)
    }
  };
};
