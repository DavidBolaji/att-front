import { QRCode } from "antd";
import React from "react";
import HCC from "../assets/hcc.png";

function Card(props) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md w-96">
      <div className="px-6 py-4">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-blue-500 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.477 0 10s4.477 10 10 10 10-4.477 10-10S15.523 0 10 0zm5.9 9h-3.56l-1.09 3.44L8.66 5.5h2.828l.852 2.648.823 2.51h.04l.824-2.51L14.46 9zm-9.31 2.29h-2.7v-2.31h2.29c.42 0 .819.18 1.099.51.28.34.42.77.37 1.21-.03.24-.14.46-.33.63-.17.17-.39.28-.63.31v.02c-.24.03-.49-.03-.71-.17l-.85.93c.34.26.74.39 1.15.39.69 0 1.33-.26 1.81-.74.48-.49.74-1.12.74-1.81 0-.69-.26-1.33-.74-1.81-.48-.49-1.12-.74-1.81-.74-1.18 0-2.14.96-2.14 2.14s.96 2.14 2.14 2.14c.49 0 .97-.18 1.35-.51.35-.31.56-.74.56-1.23 0-.47-.19-.91-.52-1.24-.32-.33-.76-.53-1.23-.53z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="font-bold text-xl">Health Card</span>
        </div>
        <p className="text-gray-700 text-base py-2">
          This is a sample health card component built with React and Tailwind.
        </p>
        <div className="mt-8">
          <div className="flex">
            <div className="flex-1">
              <h3 className="text-gray-600 font-bold text-sm uppercase">
                Name
              </h3>
              <p className="text-gray-900 font-medium text-lg">{props.name}</p>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-600 font-bold text-sm uppercase">
                Date of Birth
              </h3>
              <p className="text-gray-900 font-medium text-lg">
                {props.dateOfBirth}
              </p>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex-1">
              <h3 className="text-gray-600 font-bold text-sm uppercase">
                Blood Type
              </h3>
              <p className="text-gray-900 font-medium text-lg">
                {props.bloodType}
              </p>
            </div>
            <div className="flex-1">
              <h3 className="text-gray-600 font-bold text-sm uppercase">
                Allergies
              </h3>
              <p className="text-gray-900 font-medium text-lg">
                {props.allergies}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

export function Mastercard({ cardNumber, namer, expiryDate, value }) {
  return (
    <div className="w-96 mx-auto bg-green-300">
      <div className="relative rounded-lg shadow-lg bg-white px-5 py-8">
        {/* Card Logo */}
        {/* <img src={HCC} alt="hcc" /> */}
        <div className="flex gap-5">
          <div>
            <QRCode
              value={typeof value === "undefined" ? "wait" : value}
              status={"active"}
              className="w-full"
              //   color={"blue"}
            />
          </div>

          <div className="flex flex-col  w-full justify-end ">
            <p className="text-gray-600 font-medium text-right italic">Name</p>
            <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
              {namer?.firstName} hasan
            </p>
            <p className="text-gray-600 font-medium text-right italic">
              Card Number
            </p>
            <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
              {cardNumber}
            </p>
            <p className="text-gray-600 font-medium text-right italic">
              Expiry Date
            </p>
            <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
              **/**
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
