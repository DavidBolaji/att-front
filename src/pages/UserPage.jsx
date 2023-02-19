import React from "react";
import { useOutletContext } from "react-router-dom";

const UserPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useOutletContext();
  // console.log(isDrawerOpen);
  return (
    <main
      className={`mt-5 max-w-[70vw] text-gray-500 rounded-md left-0 transition duration-300 ease-in-out z-0 ${
        isDrawerOpen ? "translate-x-[240px]" : "focus:outline-none"
      } `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">userPage</div>
    </main>
  );
};

export default UserPage;
