import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ContextAuth } from "./store/AuthContext";
import { ToastContainer } from "react-toast";
// import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import { ContextAttendance } from "./store/AttendanceContext";
// require("dotenv").config();      token: {

ReactDOM.createRoot(document.getElementById("root")).render(
  // <ToastProvider>
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "#00b96b",
      },
    }}
  >
    <ContextAuth>
      <ContextAttendance>
        <ToastContainer position="top-right" delay={2000} />
        <App />
      </ContextAttendance>
    </ContextAuth>
  </ConfigProvider>
);
