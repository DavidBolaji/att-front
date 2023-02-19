import React, { useState } from "react";
import { toast } from "react-toast";
import useAuth from "../hooks/useAuth";

const AuthContext = React.createContext({
  user: JSON.parse(localStorage.getItem("user")),
  token: JSON.parse(localStorage.getItem("token")),
  onLogin: (email, password) => {},
  onRegister: (email, password) => {},
  onLogout: () => {},
  loggedIn: false,
});

export const ContextAuth = (props) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const { login, logout, register } = useAuth();
  //   const { $toast } = useToasts();

  const loginContext = async (email, password) => {
    const req = await login(email, password);
    if (req.token) {
      toast.success("Login Successful");
      setUser(req.user);
      setToken(req.token);
      localStorage.setItem("user", JSON.stringify(req.user));
      localStorage.setItem("token", JSON.stringify(req.token));
      setLoggedIn(true);
      return true;
    } else if (req.e) {
      toast.error(req.e);
      return false;
    } else {
      toast.error("please check your network");
      return false;
    }
  };

  const registerContext = async (email, password) => {
    const req = await register(email, password);
    if (req.token) {
      toast.success("Login Successful");
      setUser(req.user);
      setToken(req.token);
      localStorage.setItem("user", JSON.stringify(req.user));
      localStorage.setItem("token", JSON.stringify(req.token));
      setLoggedIn(true);
      return true;
    } else if (req.e) {
      toast.error(req.e);
      return false;
    } else {
      toast.error("please check your network");
      return false;
    }
  };

  const logoutContext = (email, password) => {
    setUser({});
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setLoggedIn("false");
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loggedIn,
        onRegister: registerContext,
        onLogin: loginContext,
        onLogout: logoutContext,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
