import React, { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import AuthContext from "../store/AuthContext";

const LogoutPage = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    ctx.onLogout();
    navigate("/");
  }, []);
  return <div>LogoutPage</div>;
};

export default LogoutPage;
