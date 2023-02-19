import React from "react";
import { format } from "date-fns";
import { Button, QRCode, Table } from "antd";

const AttendanceTable = ({ users }) => {
  const handleClick = (id) => {
    const url = `https://checkuser.com?id=${id}`;
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      className: "px-4 py-2",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-4 py-2",
    },
    {
      title: "QR",
      dataIndex: "qr",
      key: "qr",
      render: (_, obj) =>
        obj.qr === "https://hcc.com" ? (
          <Button
            className="bg-green-600 text-white"
            onClick={() => handleClick(obj._id)}
          >
            Generate QR
          </Button>
        ) : (
          <QRCode value={qr} />
        ),
    },
    {
      title: "Attendance",
      dataIndex: "attendance",
      key: "attendance",
      className: "px-4 py-2",
      render: (attendance) => (
        <ul className="list-disc pl-4">
          {attendance.map((date) => (
            <li key={date.createdAt} className="text-green-500">
              {format(new Date(date.createdAt), "yyyy-MM-dd")}
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col mt-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <Table
                columns={columns}
                dataSource={users}
                pagination={true}
                rowKey="email"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTable;
