import React, { Suspense, useEffect, useState } from "react";
import Card, { Mastercard } from "../components/Card";
import HCC from "../assets/hcc.png";
import Axios from "../api/auth";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { QRCode, Skeleton } from "antd";

const CardPage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const loadData = async (params) => {
      const id = params;
      try {
        const response = await Axios.get("/user/find/" + id);
        return response.data;
      } catch (error) {
        return error;
      }
    };

    loadData(id).then((res) => {
      setUser({ ...res });
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Layout />;
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-[#fafafa]">
      <img src={HCC} alt="hcc" />
      <div className="w-96 mx-auto bg-green-300">
        <div className="relative rounded-lg shadow-lg bg-white px-5 py-8">
          {/* Card Logo */}
          {/* <img src={HCC} alt="hcc" /> */}
          <div className="flex gap-5">
            {Object.keys(user).length > 0 ? (
              <>
                <div>
                  <QRCode
                    value={user.qr}
                    status={"active"}
                    className="w-full"
                    //   color={"blue"}
                  />
                </div>
                <div className="flex flex-col  w-full justify-end ">
                  <p className="text-gray-600 font-medium text-right italic">
                    Name
                  </p>
                  <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-gray-600 font-medium text-right italic">
                    Card Number
                  </p>
                  <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
                    {`**** **** **** ${id.slice(-4)}`}
                  </p>
                  <p className="text-gray-600 font-medium text-right italic">
                    Expiry Date
                  </p>
                  <p className="text-gray-900 font-bold text-lg text-right text-[12px]">
                    **/**
                  </p>
                </div>
              </>
            ) : (
              <Skeleton active={true} />
            )}
          </div>
        </div>
      </div>
      {/* <Mastercard
        value={user?.qr}
        cardNumber={`**** **** **** ${id.slice(-4)}`}
        namer={user}
        expiryDate="12/22"
      /> */}
    </div>
  );
};

export default CardPage;

// const loadData = async (params) => {
//   const id = params.id;
//   try {
//     const response = await Axios.get("/user/find/" + id);
//     return response.data;
//   } catch (error) {
//     return error;
//   }
// };

// export async function loader({ request, params }) {
//   return defer({
//     user: loadData(params),
//   });
// }
