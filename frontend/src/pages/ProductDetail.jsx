import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { orderState } from "../state/atom/orderState";
import { useRecoilState, useRecoilValue } from "recoil";
import { userIsLoggedIn } from "../state/selector/loggedInUser";

const ProductDetail = () => {
  const user = useRecoilValue(userIsLoggedIn)
  const [order, setOrder] = useRecoilState(orderState)
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false)
  const [formData, setFormData] = useState({
    userRef: "",
    name: "",
    category: "",
    price: 0,
    orderQuantity: 0,
    paymentStatus: "Pending",
    deliveryStatus: "Packaging"
  });

  const navigate = useNavigate()

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/product/product-detail/${id}`);
        const data = await res.json();
        if (data.success == false) {
          console.log(data.message);
          return;
        }
        setProduct(data);
        setFormData({
          ...formData,
          userRef: data._id,
          name: data.name,
          category: data.category,
          price: (+data.regularPrice - +data.discountPrice),
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, []);

  const handleChange = (e) => {
    if (e.target.type == "number") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!user) {
      navigate("/login")
      return
    }
    if (+formData.orderQuantity == 0) {
      setError("Add quantity order!")
      return;
    }
    setError(false)
    setOrder(formData)
    navigate("/cart")
  }

  return (
    <div className="flex p-10 px-2 max-w-6xl mx-auto gap-10">
      <div className="flex flex-col gap-2 w-[500px] h-[500px]">
        <img
          className="h-full object-cover rounded-lg "
          src={!selectedImage ? product?.imageUrls[0] : selectedImage}
          alt="product image"
        />
        <div className="flex gap-1 justify-center">
          {product?.imageUrls.map((image) => (
            <img
              onClick={() => setSelectedImage(image)}
              src={image}
              alt="product image"
              className="w-1/6 h-full cursor-pointer object-cover rounded-lg overflow-hidden"
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="">
          <p className="font-semibold text-xl uppercase mb-3">Info:</p>
          <ul className="flex flex-col gap-1">
            <li>
              Name: <span className="font-semibold">{product?.name}</span>
            </li>
            <li>
              Category:{" "}
              <span className="font-semibold">{product?.category}</span>
            </li>
            <li>
              Price: Rp{" "}
              <span className="font-semibold">
                {+product?.regularPrice - +product?.discountPrice}
              </span>
            </li>
            <li>
              Description:{" "}
              <span className="font-semibold">{product?.description}</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-2">
          <input
            onChange={handleChange}
            min={0}
            className="p-3 disabled:cursor-not-allowed border-2 w-1/6 border-slate-200 rounded-lg"
            type="number"
            id="orderQuantity"
            disabled={user && user.role == "admin"}
          />
          <button
            onClick={handleSubmit}
            disabled={user && user.role == "admin"}
            className="p-3 bg-[#FF9376] enabled:hover:bg-[#e67353] text-white rounded-lg uppercase disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:"
          >
            Add to Cart
          </button>
          {error && (<p className="text-sm text-red-500">{error}</p>)}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
