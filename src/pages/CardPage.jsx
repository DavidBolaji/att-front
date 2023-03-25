import React, { Suspense, useEffect, useState } from "react";
import Card, { Mastercard } from "../components/Card";
import HCC from "../assets/hcc.png";
import Axios from "../api/auth";
import { Await, defer, useLoaderData, useParams } from "react-router-dom";
import Layout from "../components/Layout";

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
      setUser(res);
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
      <Mastercard
        value={user?.qr}
        cardNumber={`**** **** **** ${id.slice(-4)}`}
        name={user}
        expiryDate="12/22"
      />
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
