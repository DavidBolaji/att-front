import React from "react";
import { format, formatISO, parse, parseISO } from "date-fns";
import { Button, QRCode, Table } from "antd";
import Axios from "../api/auth";
import HCC from "../assets/hcc.png";
import { toast } from "react-toast";
import { exportToExcel } from "../utils/helpers";

// import QRCode from "qrcode.react";

const AttendanceTable = ({ users, pagination, onChange, loading }) => {
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
    const time = format(dateObj, "h:mm a");
    return time;
  };

  const timeToWord = (isoDate) => {
    if (typeof isoDate === "undefined") {
      return "5";
    }
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

    const d = [...new Set(newD.map((d) => d.createdAt))];
    return d?.sort((a, b) => {
      const dateA = parse(
        a.replace(/(st|nd|rd|th)/, ""),
        "d MMM, yyyy",
        new Date()
      );
      // Format the date as a string for display (optional)
      const formattedDateA = format(dateA, "yyyy-MM-dd");

      const dateB = parse(
        b.replace(/(st|nd|rd|th)/, ""),
        "d MMM, yyyy",
        new Date()
      );

      // Format the date as a string for display (optional)
      const formattedDateB = format(dateB, "yyyy-MM-dd");
      return new Date(formattedDateA) - new Date(formattedDateB);
    });
  }

  function getAttendanceColumns(userData) {
    const dates = getUniqueDates(userData);

    return [...dates].map((date, index) => ({
      title: date,
      dataIndex: "date",
      key: "date",
      render: (_, obj, i) => (
        <>
          {/* {JSON.stringify(obj?.attendance)} */}
          {obj?.attendance.some((e) => timeToWord(e?.createdAt) === date)
            ? getTimeFromDateStr(
                obj?.attendance[
                  obj?.attendance.findIndex(
                    (e) => timeToWord(e?.createdAt) === date
                  )
                ]?.createdAt
              )
            : "_"}
          {/* {timeToWord(obj?.attendance[index]?.createdAt) === date
        ? getTimeFromDateStr(obj.attendance[index]?.createdAt)
        : "_"
        }      */}
        </>
      ),
    }));
  }

  // {obj?.attendance.some((dat) => timeToWord(dat.createdAt) === date)
  //   ? obj?.attendance.map((dat, i) => getTimeFromDateStr(dat.createdAt))[0]
  //   : "_"}

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
      render: (text, record, index) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-4 py-2",
    },
    // {
    //   title: "Role",
    //   dataIndex: "role",
    //   key: "role",
    //   className: "px-4 py-2",
    //   render: (text, record, index) => (
    //     <span>{record.role[0] === "Admin" ? "Worker" : record.role[0]}</span>
    //   ),
    // },
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
                loading={loading}
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
