import React, { useState } from "react";
import { toast } from "react-toast";
import useAttendance from "../hooks/useAttendance";

const AttendanceContext = React.createContext({
  attendance: [],
  getAttendance: () => {},
});

export const ContextAttendance = (props) => {
  const [attendance, setAttendance] = useState([]);

  const { getUserAttendance } = useAttendance();
  //   const { $toast } = useToasts();

  const getAttendanceContext = async (email, password) => {
    const req = await getUserAttendance();
    console.log(req);
    //   setUser(req.u);
    //   setToken(req.token);
    //   localStorage.setItem("user", JSON.stringify(req.user));
    //   localStorage.setItem("token", JSON.stringify(req.token));
    //   setLoggedIn(true);
    return true;
  };

  return (
    <AttendanceContext.Provider
      value={{
        attendance,
        getAttendance: getAttendanceContext,
      }}
    >
      {props.children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContext;
