import React from "react";
import { format, formatISO, parseISO } from "date-fns";
import { Pagination, Skeleton, Table } from "antd";

const UserTable = ({ users, pagination, onChange }) => {
  // const [columns, setColumns] = useState([]);
  // loop through users
  const timeToWord = (isoDate) => {
    const parsedDate = parseISO(isoDate);
    const dateWithoutTime = formatISO(parsedDate, { representation: "date" });
    const dateToWord = format(new Date(dateWithoutTime), "do MMM',' yyyy");
    return dateToWord;
  };

  const newD = users.map((user) => {
    return {
      ...user,
      createdAt: timeToWord(user.createdAt),
    };
  });

  // Extract unique dates from data and create a column for each one
  const uniqueDates = Array.from(new Set(newD.map((d) => d.createdAt)));
  const dateColumns = uniqueDates.map((date) => ({
    title: date,
    dataIndex: date,
    key: date,
    render: (text, record) =>
      timeToWord(record.createdAt) === date ? "present" : "",
  }));

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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      className: "px-4 py-2",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      className: "px-4 py-2",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      className: "px-4 py-2",
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
      className: "px-4 py-2",
      render: (_, obj) => (
        <ul className="list-disc pl-4">
          <p className="text-green-500">
            {format(new Date(obj.DOB), "do MMM',' yyyy")}
          </p>
        </ul>
      ),
    },
    ...dateColumns,
    // {
    //   title: "Attendance",
    //   dataIndex: "attendance",
    //   key: "attendance",
    //   className: "px-4 py-2",
    //   render: (attendance) => (
    //     <ul className="list-disc pl-4">
    //       {attendance.map((date) => (
    //         <li key={date.createdAt} className="text-green-500">
    //           {format(new Date(date.createdAt), "yyyy-MM-dd")}
    //         </li>
    //       ))}
    //     </ul>
    //   ),
    // },
  ];

  return (
    <div className="max-w-screen-xl mx-auto">
      <div className="flex flex-col mt-2">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              {/* <Skeleton active={isLoading} className="px-10 py-5"> */}
              <Table
                columns={columns}
                dataSource={[...users]}
                pagination={pagination}
                onChange={onChange}
                //   loading={isLoading}
                rowKey="qr"
                size="sm"
              />

              {/* </Skeleton> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
