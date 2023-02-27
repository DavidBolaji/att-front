import React from "react";
import Card, { Mastercard } from "../components/Card";
import HCC from "../assets/hcc.png";
import Axios from "../api/auth";
import { useLoaderData } from "react-router-dom";

const CardPage = () => {
  const user = useLoaderData();
  console.log(user);
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center bg-[#fafafa]">
      {/* <Card
        name="John Doe"
        dateOfBirth="01/01/1990"
        bloodType="A+"
        allergies="Pollen"
      /> */}
      <div>
        <img src={HCC} alt="hcc" />
      </div>
      <Mastercard
        value={user.qr}
        cardNumber="**** **** **** 1234"
        name={user.name}
        expiryDate="12/22"
      />
    </div>
  );
};

export default CardPage;

export async function loader({ request, params }) {
  const id = params.id;
  try {
    const response = await Axios.get("/user/find/" + id);
    return response.data;
  } catch (error) {
    return error;
  }
}
