import { Button, Image, Space, Table, DatePicker, message } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Axios from "../api/auth";
const { RangePicker } = DatePicker;

function matchesFullName(text, firstName, lastName) {
  const regex = new RegExp(`\\b${firstName}\\s+${lastName}\\b`, "i");
  return regex.test(text);
}

const latest = (arrays) => {
  const empty = [];
  arrays.forEach((array) => {
    const attendanceObject = {};
    attendanceObject["_id"] = array._id;
    attendanceObject["firstName"] = array.firstName;
    attendanceObject["lastName"] = array.lastName;
    attendanceObject["qr"] = `=IMAGE("${array.image}", ${Number(4)},  ${Number(
      100
    )},  ${Number(100)})`;

    empty.push(attendanceObject);
  });
  return empty;
};

export const exportToExcel2 = (user) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileName = "data.xlsx";
  const newUser = latest(user);
  const ws = XLSX.utils.json_to_sheet(newUser);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const excelBlob = new Blob([excelBuffer], { type: fileType });
  saveAs(excelBlob, fileName);
};

const ViewPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  const users = useLoaderData();

  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState({
    start: "",
    end: "",
  });

  useEffect(() => {
    if (users) {
      setUser([...users?.user]);
      setLoading((prev) => !prev);
      setTotal(users?.total);
    }
  }, []);

  const handleClick = async (id) => {
    const res = await Axios.post(`user/generate/${id}`);

    if (res.status !== 201) {
      return message.error("QRCode not generated: " + res.statusCode);
    }

    message.success("QRCode generated successfully");
    await fetchData(
      pagination.current,
      pagination.pageSize,
      date.start,
      date.end
    );
  };

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
      filters: user?.map((d) => {
        return {
          ...d,
          text: `${d.firstName} ${d.lastName}`,
          value: `${d.firstName} ${d.lastName}`,
        };
      }),
      // sorter: (a, b) => a.firstName - b.firstName,
      // sortDirections: ["ascend"],
      // filterMode: "tree",
      filterSearch: true,
      width: "30%",
      onFilter: (value, record) =>
        matchesFullName(value, record.firstName, record.lastName),
      render: (text, record, index) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "QR",
      dataIndex: "image",
      key: "image",
      className: "px-4 py-2",
      render: (_, obj) =>
        !obj.image ? (
          <Button
            className="bg-green-600 text-white"
            onClick={() => handleClick(obj._id)}
          >
            Generate QR
          </Button>
        ) : (
          <Image
            width={100}
            height={100}
            src={obj.image}
            fallback="data:image/png;base64,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"
          />
        ),
    },
    // {
    //   title: "Phone",
    //   dataIndex: "phone",
    //   key: "phone",
    //   className: "px-4 py-2",
    // },
    // {
    //   title: "Address",
    //   dataIndex: "address",
    //   key: "address",
    //   className: "px-4 py-2",
    // },
    // {
    //   title: "Generator",
    //   dataIndex: "qr",
    //   key: "qr",
    //   render: (_, obj) =>
    //     obj.qr === "https://hcc.com" ? (
    //       <Button
    //         className="bg-green-600 text-white"
    //         onClick={() => handleClick(obj._id)}
    //       >
    //         Generate QR
    //       </Button>
    //     ) : (
    //       <QRCode value={obj.qr} />
    //     ),
    // },
    // {
    //   title: "DOB",
    //   dataIndex: "dob",
    //   key: "dob",
    //   className: "px-4 py-2",
    //   render: (_, obj) => (
    //     <ul className="list-disc pl-4">
    //       <p className="text-green-500">
    //         {format(new Date(obj.DOB), "do MMM',' yyyy")}
    //       </p>
    //     </ul>
    //   ),
    // },
    // ...dateColumns,
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

  // const [user, setUser] = useState([]);
  // console.log(isDrawerOpen);

  const fetchData = async (page, pageSize, start, end) => {
    console.log(start, end);
    // This is where you would make an API call to fetch data for the current page and page size
    // You can update the `dataSource` and `pagination` state variables based on the response
    setLoading((prev) => !prev);
    // Example API call using fetch:
    const req = await Axios.get(
      `user/all?filter=${start}&end=${end}&page=${page}&limit=${pageSize}&search=${search}`
    );

    setTimeout(() => {
      if (req.status) {
        setUser([...req.data.docs]);
        setLoading((prev) => !prev);
        setTotal(req.data.totalDocs);
        return true;
      } else {
        console.log("Something went wrong");
        setLoading((prev) => !prev);
        return false;
      }
    }, 10);
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
    pageSizeOptions: ["10", "20", "30", "40", "50", "200", "300"],
  };
  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        userPage
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col mt-2">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className={"w-fullbg-white py-5"}>
                  <div className="flex items-center justify-between">
                    <Space direction="vertical" size={12} className="mb-5">
                      <RangePicker onChange={onChange} showTime />
                    </Space>
                  </div>
                </div>

                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {/* <Skeleton active={isLoading} className="px-10 py-5"> */}
                  <Button
                    className="text-white bg-green-300 -mt-10 mb-5 w-full"
                    onClick={() => exportToExcel2(user)}
                    // onClick={() => exportToExcel2()}
                  >
                    Download
                  </Button>
                  <Table
                    columns={columns}
                    dataSource={[...user]}
                    pagination={pagination}
                    onChange={handleTableChange}
                    loading={loading}
                    //   loading={isLoading}
                    size="sm"
                    rowKey="qr"
                  />

                  {/* </Skeleton> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewPage;

export async function loader() {
  try {
    const response = await Axios.get("/user/all");
    if (response.status === 200) {
      return {
        user: response.data.docs,
        total: response.data.totalDocs,
      };
    } else {
      return {
        user: [],
        total: 0,
      };
    }
  } catch (error) {
    return error;
  }
}
