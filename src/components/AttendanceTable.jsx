import React from "react";
import { format, formatISO, parseISO } from "date-fns";
import { Button, QRCode, Table } from "antd";
import Axios from "../api/auth";
import HCC from "../assets/hcc.png";
import { toast } from "react-toast";
import { exportToExcel } from "../utils/helpers";

// import QRCode from "qrcode.react";

const AttendanceTable = ({ users, pagination, onChange }) => {
  const handleClick = async (id) => {
    const url = `${import.meta.env.VITE_FRONT}?id=${id}`;
    const req = Axios.put(`/user/update?url=${url}`);
    if (!req.ok) {
      return toast.error("Something went wrong");
    }

    toast.success("QR generated Succesfully");
  };

  const getTimeFromDateStr = (dateStr) => {
    const dateObj = new Date(dateStr);
    const time = format(dateObj, 'h:mm:ss a');
    return time;
  }

  const timeToWord = (isoDate) => {
    const parsedDate = parseISO(isoDate);
    const dateWithoutTime = formatISO(parsedDate, { representation: "date" });
    const dateToWord = format(new Date(dateWithoutTime), "do MMM',' yyyy");
    return dateToWord;
  };

  function getUniqueDates(userData) {
    const allDates = userData.reduce((dates, record) => {
      return [...dates, ...record.attendance];
    }, []);
    const newD = allDates.map((user) => {
      return {
        ...user,
        createdAt: timeToWord(user.createdAt),
      };
    });

    return [...new Set(newD.map((d) => d.createdAt))];
  }

  function getAttendanceColumns(userData) {
    console.log(userData)
    const dates = getUniqueDates(userData);
    console.log(dates)
    return dates.map((date) => ({
      title: date,
      dataIndex: "date",
      key: "date",
      render: (_, obj) => (
        <>
          {obj?.attendance.some((dat) => timeToWord(dat.createdAt) === date)
            ? obj?.attendance.map(dat => getTimeFromDateStr(dat.createdAt))
            : "_"}
        </>
      ),
    }));
  }

  function getUserData(userData) {
    return userData.map((record) => {
      const attendanceByDate = getAttendanceByDate(record.attendance);
      return {
        user: record.user,
        ...attendanceByDate,
      };
    });
  }

  function getAttendanceByDate(attendance) {
    const attendanceByDate = {};
    attendance.forEach((date) => {
      attendanceByDate[date] = [date];
    });
    return attendanceByDate;
  }

  // Extract unique dates from data and create a column for each one
  // const uniqueDates = Array.from(new Set(users?.attendance.map((d) => d.date)));
  // const dateColumns = uniqueDates.map((date) => ({
  //   title: date,
  //   dataIndex: date,
  //   key: date,
  //   render: (text, record) => (record.date === date ? "present" : ""),
  // }));

  const columns = [
    {
      title: "#",
      dataIndex: "index",
      key: "index",
      render: (text, record, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "px-4 py-2",
      render: (text, record, index) => <span>{record.firstName} {record.lastName}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-4 py-2",
    },
    ...getAttendanceColumns(users),
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col mt-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <Button
              className="text-white bg-green-300 -mt-10 mb-5 w-full"
              onClick={() => exportToExcel(columns, users)}
            >
              Download
            </Button>
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                columns={columns}
                dataSource={[...users]}
                pagination={pagination}
                onChange={onChange}
                rowKey="qr"
                size="sm"
                // scroll={{
                //   y: 240,
                // }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
