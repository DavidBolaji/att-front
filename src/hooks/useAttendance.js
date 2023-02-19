
import { redirect } from "react-router-dom";
import Axios from "../api/auth";

const useAttendance = () => {

  const getUsersAttendance = async () => {
    try {
      const response = await Axios.post("/attendance/find");
      return response.data;
    } catch (error) {
      return error;
    }
  };




  return { getUsersAttendance };
};

export default useAttendance;
