import { Button, QRCode, Table } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useLoaderData, useOutletContext } from "react-router-dom";
import Axios from "../api/auth";

const ViewUsersCard = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  const users = useLoaderData();
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
          <QRCode value={obj.qr} size={60} />
        ),
    },
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
  console.log(users);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (users) {
      setUser([...users?.user]);
      setLoading((prev) => !prev);
      setTotal(users?.total);
    }
  }, []);

  // const [user, setUser] = useState([]);
  // console.log(isDrawerOpen);

//   const fetchData = async (page, pageSize) => {
//     // This is where you would make an API call to fetch data for the current page and page size
//     // You can update the `dataSource` and `pagination` state variables based on the response
//     !loading && setLoading((prev) => !prev);
//     // Example API call using fetch:
//     const req = await Axios.get(
//       `user/all`
//     );
//     console.log(req);
//     if (req.status) {
//       setUser([...req.data.docs]);
//       setLoading((prev) => !prev);
//       setTotal(req.data.totalDocs);
//     } else {
//       console.log("Something went wrong");
//     }
//   };

  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        userCard
        <div className="max-w-screen-xl mx-auto">
          <div className="flex flex-col mt-2">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  {/* <Skeleton active={isLoading} className="px-10 py-5"> */}
                  {users?.user?.map(user => <div key={user.id}>
                    <QRCode value={user.qr}  />
                    <p>{user.firstName} {user.lastName}</p>
                  </div>)}
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

export default ViewUsersCard;

export async function loader() {
  try {
    const response = await Axios.get("/user/all2");
    console.log(response);
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
