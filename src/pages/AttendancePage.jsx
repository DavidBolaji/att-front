import React, { useContext, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Axios from "../api/auth";
import { Button, DatePicker, Pagination, Skeleton, Space } from "antd";
import AttendanceTable from "../components/AttendanceTable";
import { exportToExcel } from "../utils/helpers";
import { set } from "date-fns/esm";

const { RangePicker } = DatePicker;

const AttendancePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  // const usersAttendance = useLoaderData();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(50);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  const fetchData = async (page, pageSize, start, end) => {
    // This is where you would make an API call to fetch data for the current page and page size
    // You can update the `dataSource` and `pagination` state variables based on the response
    setLoading(prev => !prev)
    // Example API call using fetch:
    const req = await Axios.get(
      `/user/find/all?filter=${start}&end=${end}&page=${page}&limit=${pageSize}`
    );
    setTimeout(() => {
      if (req.status) {
        setUser([...req?.data?.data]);
        setTotal(req.data.totalCount);
        setLoading(prev => !prev)
        return true;
      } else {
        console.log("Something went wrong");
        setLoading(prev => !prev)
        return false;
      }
    },10)
    
  };

  async function handleTableChange(pagination) {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
    await fetchData(
      pagination.current,
      pagination.pageSize,
      date.start,
      date.end
    );
  }

  const onChange = async (value, dateString) => {
    const startDate = dateString[0].split(" ")[0];
    const endDate = dateString[1].split(" ")[0];
    setDate({ ...date, start: startDate, end: endDate });
    // http://localhost:5000/api/v1/attendance/find?page=1&limit=10&&filter=2023-02-20&end=2023-02-21
    const req = await fetchData(
      pagination.current,
      pagination.pageSize,
      startDate,
      endDate
    );
   
  };

  const pagination = {
    current: currentPage,
    pageSize: pageSize,
    total: total,
    showSizeChanger: true,
    pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200"],
  };

  return (
    <main
      className={`mt-5 p-[] max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <h2>Attendance Page</h2>
        <div className={"w-fullbg-white py-5"}>
          <div className="flex items-center justify-between">
            <Space direction="vertical" size={12} className="mb-5">
              <RangePicker onChange={onChange} showTime />
            </Space>
          </div>
        </div>
        <AttendanceTable
          loading={loading}
          users={[...user]}
          pagination={pagination}
          onChange={handleTableChange}
        />
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
