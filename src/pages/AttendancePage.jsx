import { Button } from "antd";
import React, { useContext } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import Axios from "../api/auth";
import AttendanceTable from "../components/AttendanceTable";

const AttendancePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  const usersAttendance = useLoaderData();
  console.log(usersAttendance);
  return (
    <main
      className={`mt-5 p-[] max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2>Attendance Page</h2>
        <AttendanceTable users={usersAttendance} />
      </div>
    </main>
  );
};

export default AttendancePage;

export async function loader() {
  try {
    const response = await Axios.get("/user/find/all");
    return response.data;
  } catch (error) {
    return error;
  }
}
