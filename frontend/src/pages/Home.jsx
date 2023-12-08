import React from "react";
import banner from "../assets/banner.jpg";
import { FaShippingFast, FaOpencart } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";

const Home = () => {
  return (
    <div className="flex flex-col p-10 px-2 max-w-6xl mx-auto gap-10">
      <img
        className="center object-contain shadow-lg"
        src={banner}
        alt="banner"
      />

      <div className="flex gap-4">
        <div className="w-xl flex gap-2 rounded-lg shadow-md p-3">
          <FaShippingFast className="text-3xl text-blue-300" />
          <div>
            <p className="font-semibold">Free Shipping</p>
            <p>We offer free shipping on special products</p>
          </div>
        </div>
        <div className="w-xl flex gap-2 rounded-lg shadow-md p-3">
          <MdOutlinePayment className="text-3xl text-yellow-300" />
          <div>
            <p className="font-semibold">Secure Payment</p>
            <p>Make secure payment for your order</p>
          </div>
        </div>
        <div className="w-xl flex gap-2 rounded-lg shadow-md p-3">
          <FaOpencart className="text-3xl text-pink-300" />
          <div>
            <p className="font-semibold">Quality Products</p>
            <p>We only sell products from only tested and proven brands</p>
          </div>
        </div>
        <div className="w-xl flex gap-2 rounded-lg shadow-md p-3">
          <BsClockHistory className="text-3xl text-lime-300" />
          <div>
            <p className="font-semibold">24/7 Support</p>
            <p>Get access to support from our experts support team</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="uppercase text-[#FF9376]">Choose any products</p>
        <p className="font-semibold text-3xl">Buy Everything with Us</p>
      </div>

    </div>
  );
};

export default Home;
