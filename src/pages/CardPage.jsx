import React, { Suspense } from "react";
import Card, { Mastercard } from "../components/Card";
import HCC from "../assets/hcc.png";
import Axios from "../api/auth";
import { Await, defer, useLoaderData } from "react-router-dom";
import Layout from "../components/Layout";


const CardPage = () => {
  const {user} = useLoaderData();

  return (
      <Suspense 
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <Layout />
          </div>
        }
      > 
        <Await resolve={user}>
          {(loadedUser) => {
            return <div className="flex flex-col w-full h-screen items-center justify-center bg-[#fafafa]">
              <img src={HCC} alt="hcc" />
              <Mastercard
                value={loadedUser.qr}
                cardNumber="**** **** **** 1234"
                name={`${loadedUser.firstName} ${loadedUser.lastName}`}
                expiryDate="12/22"
              />
          </div>
          } }
        </Await>
      </Suspense>  
  );
};

export default CardPage;

const loadData = async(params) => {
  const id = params.id;
  try {
    const response = await Axios.get("/user/find/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
}

export async function loader({ request, params }) {
 return defer({
  user: loadData(params)
 })
}
