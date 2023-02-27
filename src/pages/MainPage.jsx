import { Button, message } from "antd";
import React, { useCallback, useRef, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Axios from "../api/auth";
import * as XLSX from "xlsx";
let newData;
const postData = async (url, data) => {
  let count = 0;
  for (const item of data) {
    try {
      const response = await Axios.post(url, item);
      count++;
    } catch (error) {
      console.log(error);
    }
  }
  data.length === count ? message.success("Users Registered successfully") : "";
  count = 0;
};

const arrayToObjects = (data, keys) => {
  return data.map((row) => {
    return row.reduce((obj, value, index) => {
      obj[keys[index]] = value;
      return obj;
    }, {});
  });
};

const handleCsv = async (file) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const workbook = XLSX.read(e.target.result, { type: "binary" });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      blankrows: false,
    });
    newData = data.slice(1);
    if (newData.length < 1) {
      return createToast("Please load file again", { type: "info" });
    }
    const keys = ["name", "email", "phone", "address", "DOB"];
    const jsonData = arrayToObjects(newData, keys);
    const nData = jsonData.map((data) => {
      return {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
        DOB: data.DOB,
        password: "hccForLife2023",
      };
    });
    postData("user/register", nData);
  };
  reader.readAsBinaryString(file);
  // console.log(newData);
};

const extractCSV = (e) => {
  e.preventDefault();
  handleCsv(e.target.files[0]);
};

const MainPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  const [show, setShow] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = useCallback(() => {
    fileRef.current.click();
  }, [fileRef]);

  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative">
        {/* Add content here */}
        <h1 className="text-2xl font-semibold text-gray-900 mt-10">
          Welcome HCC admin
        </h1>

        <div className="flex items-center justify-end gap-5 mt-4 mb-10">
          <Button
            onClick={handleUpload}
            className="text-white bg-green-300 -mt-10 mb-5"
          >
            Upload CSV
          </Button>
        </div>

        <>
          <input type={"file"} ref={fileRef} hidden onChange={extractCSV} />
          <h2 className="text-xl font-semibold text-gray-900 mb-5">
            Add User Form
          </h2>
        </>
      </div>
    </main>
  );
};

export default MainPage;
