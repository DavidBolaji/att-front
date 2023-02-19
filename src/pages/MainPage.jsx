import React from "react";
import { useNavigation, useOutlet, useOutletContext } from "react-router-dom";
import { LoaderComponent } from "../components/LoaderComponent";
import QRCodeGenerator from "../components/QRcodeGenerator";

const MainPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();

  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 ">
        {/* Add content here */}
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">Dashboard</h1>
        <QRCodeGenerator />
      </div>
    </main>
  );
};

export default MainPage;
