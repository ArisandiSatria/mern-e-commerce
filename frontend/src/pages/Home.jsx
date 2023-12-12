import React, { useEffect, useState } from "react";
import banner from "../assets/banner.jpg";
import { FaShippingFast, FaOpencart } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { BsClockHistory } from "react-icons/bs";
import {Link} from 'react-router-dom'

const categories = [
  "All",
  "Food & Beverage",
  "Sport",
  "Electronic",
  "Clothing",
  "Medicine",
];

const Home = () => {
  const [product, setProduct] = useState([]);
  const [clicked, setClicked] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const res = await fetch("/api/product/all-products");
      const data = await res.json();
      if (data.success == false) {
        setError(data.message);
      }
      setProduct(data);
    };

    fetchAllProducts();
  }, []);

  const filtered =
    product &&
    product.filter((prd) => (clicked != "All" ? prd.category == clicked : prd));

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

      <div className="flex justify-center w-fit mx-auto bg-[#FF9376] rounded-lg overflow-hidden">
        {categories.map((cate) => (
          <span
            onClick={() => setClicked(cate)}
            className={`text-white text-lg p-2 px-6 cursor-pointer hover:bg-[#e67353] ${
              clicked == cate ? "bg-[#e67353]" : ""
            }`}
          >
            {cate}
          </span>
        ))}
      </div>

      <div className="flex px-[31px] flex-wrap gap-6">
        {filtered.length > 0 ? (
          filtered.map((flt) => (
            <Link to={`/product-detail/${flt._id}`}>
              <div
                key={flt._id}
                className="bg-white cursor-pointer shadow-md hover:shadow-lg overflow-hidden transition-shadow rounded-lg w-[250px]"
              >
                <img
                  src={flt.imageUrls[0]}
                  alt="product image"
                  className="h-[320px] sm:h-[180px] w-full object-cover hover:scale-105 transition-scale duration-300"
                />
                <div className="p-3 flex flex-col gap-2 w-full">
                  <p className="text-lg font-semibold text-slate-700 truncate">
                    {flt.name}
                  </p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm text-gray-600 truncate w-full">
                      Rp{" "}
                      {(+flt.regularPrice - +flt.discountPrice).toLocaleString(
                        "en-US"
                      )}
                    </p>
                  </div>
                </div>
              </div>{" "}
            </Link>
          ))
        ) : (
          <p className="text-3xl font-semibold mx-auto my-20">No Data</p>
        )}
      </div>
    </div>
  );
};

export default Home;
