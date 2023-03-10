// Sidebar.js

import { Link, NavLink } from "react-router-dom";
import { Disclosure, Transition } from "@headlessui/react";
// import { XIcon } from "@heroicons/react/outline";
function Sidebar({ isOpen, handleToggle }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 w-64 transition duration-300 ease-in-out z-30 ${
        isOpen ? "" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col h-full bg-white border-r border-gray-200 pt-5 pb-4">
        <div className="flex items-center flex-shrink-0 px-4">
          {/* <img className="h-8 w-auto" src="/logo.svg" alt="Logo" /> */}
          <span className="ml-2 font-medium text-green-600 text-lg">
            Dashboard
          </span>
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          {/* Add links to navigate through the app */}
          <nav className="flex-1 px-2 bg-white space-y-1">
            <NavLink
              to=""
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-6 h-6 text-green-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
              Dashboard
            </NavLink>
            {/* <NavLink
              to="attendance"
              className={`group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50 ${({
                isActive,
              }) => (isActive ? "bg-gray-50" : undefined)}`}
            >
              <svg
                className="w-6 h-6 text-green-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Users
            </NavLink> */}
            <Disclosure as={"div"}>
              <div className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50">
                <Disclosure.Button className={"w-full flex items-center"}>
                  <svg
                    className="w-6 h-6 text-green-600 mr-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Users
                </Disclosure.Button>
              </div>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <div className="group pl-12 text-sm font-medium text-gray-900 rounded-md">
                  <Disclosure.Panel
                    className={
                      "flex items-center mb-3 p-1 cursor-pointer text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
                    }
                  >
                    <NavLink to={"view_users"}> view users</NavLink>
                  </Disclosure.Panel>
                  <Disclosure.Panel
                    className={
                      "flex items-center mb-3 p-1 cursor-pointer text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
                    }
                  >
                    <NavLink to={"attendance"}>users Attendance</NavLink>
                  </Disclosure.Panel>
                  {/* <Disclosure.Panel
                    className={
                      "flex items-center mb-3 p-1 cursor-pointer text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
                    }
                  >
                    <NavLink to={"card"}>users Card</NavLink>
                  </Disclosure.Panel> */}
                </div>
              </Transition>
            </Disclosure>
            {/* <NavLink
              to="user"
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-6 h-6 text-green-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 20v-2a2 2 0 012-2h14a2 2 0 012 2v2"
                />
              </svg>
              Attendance
            </NavLink> */}
            <NavLink
              to="logout"
              className="group flex items-center px-2 py-2 text-sm font-medium text-gray-900 rounded-md hover:bg-gray-50"
            >
              <svg
                className="w-6 h-6 text-green-600 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM3 20v-2a2 2 0 012-2h14a2 2 0 012 2v2"
                />
              </svg>
              Logout
            </NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
