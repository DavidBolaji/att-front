import React, { useCallback, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Button, DatePicker, Pagination, Skeleton, Space } from "antd";
import Axios from "../api/auth";
import UserTable from "../components/UserTable";
import { exportToExcel } from "../utils/helpers";

const { RangePicker } = DatePicker;

const downloadQRCode = () => {
  const canvas =
    document.getElementById("myqrcode")?.querySelector <
    HTMLCanvasElement >
    "canvas";
  if (canvas) {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.download = "QRCode.png";
    a.href = url;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
};

// const exportToExcel = () => {
//   const fileType =
//     "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
//   const fileName = "data.xlsx";
//   const dataToExport = item.map((item) => ({
//     name: item.name,
//     email: item.email,
//     dateRegistered: item.createdAt,
//   }));
//   console.log(item);
//   const ws = XLSX.utils.json_to_sheet(dataToExport);
//   const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
//   const excelBuffer = XLSX.write(wb, {
//     bookType: "xlsx",
//     type: "array",
//   });
//   const excelBlob = new Blob([excelBuffer], { type: fileType });
//   saveAs(excelBlob, fileName);
// };

const UserPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  // const [user, setUser] = useState([]);
  // console.log(isDrawerOpen);

  const fetchData = async (page, pageSize, start, end) => {
    // This is where you would make an API call to fetch data for the current page and page size
    // You can update the `dataSource` and `pagination` state variables based on the response
    !loading && setLoading((prev) => !prev);
    // Example API call using fetch:
    const req = await Axios.get(
      `attendance/find?filter=${start}&end=${end}&page=${page}&limit=${pageSize}`
    );
    if (req.status) {
      const newData = req.data?.data?.map((user) => {
        return {
          ...user.employeeId,
        };
      });
      setUser([...newData]);
      setLoading((prev) => !prev);
      setTotal(req.data.totalCount);
    } else {
      console.log("Something went wrong");
    }
  };

  async function handleTableChange(pagination) {
    console.log("changed");
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
    pageSizeOptions: ["10", "20", "30", "40", "50", "200"],
  };
  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        userPage
        <div className={"w-fullbg-white py-5"}>
          <div className="flex items-center justify-between">
            <Space direction="vertical" size={12} className="mb-10">
              <RangePicker onChange={onChange} showTime />
            </Space>
            <Button className="text-white bg-green-300" onClick={exportToExcel}>
              Download
            </Button>
          </div>
          {loading ? (
            <Skeleton active />
          ) : (
            <>
              <UserTable
                loading={loading}
                users={[...user]}
                pagination={pagination}
                onChange={handleTableChange}
              />

              {/* <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handleChange}
              /> */}
            </>
          )}
        </div>
      </div>
    </main>
  );
};

export default UserPage;
