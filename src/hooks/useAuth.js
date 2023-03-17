
import { redirect } from "react-router-dom";
import Axios from "../api/auth";

const useAuth = () => {

  const login = async (email,password) => {
    try {
      const response = await Axios.post("/user/login", { email, password });
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const register = async (obj) => {
    try {
      const response = await Axios.post("/user/register", obj);
      console.log(response)
      return response.data;
    } catch (error) {
      console.log(error)
      return error;
    }
  };

  const logout = async () => {
    try {
      const response = await Axios.post("/user/logout");
      console.log(response)
      return response.data;
    } catch (error) {
      // console.log(error)
      return error;
    }
  };


  return { login, register, logout };
};

export default useAuth;

export function checkAuth() {
    const token = JSON.parse(localStorage.getItem('token'))
    if(!token) {
        return redirect('/')
    }
    return true
}