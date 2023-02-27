import React from "react";

const Header = ({ isOpen, handleToggle }) => {
  return (
    <div className="flex-shrink-0 bg-white shadow pr-8">
      <div className="flex justify-between h-16">
        <div className="flex">
          {/* Hamburger menu icon */}
          <button
            className={`translate-y-0 text-gray-500 rounded-md hover:text-gray-900 focus:ring-gray-500  left-0 w-64 transition duration-300 ease-in-out z-30 ${
              isOpen
                ? "translate-x-full ml-3 focus:outline-none"
                : "focus:outline-none ml-8"
            }`}
            onClick={handleToggle}
          >
            <span className="sr-only">Open side drawer</span>
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        {/* Add header content here */}
        <div className="flex items-center justify-end pr-2"></div>
      </div>
    </div>
  );
};

export default Header;
