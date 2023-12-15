import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userIsLoggedIn } from "../state/selector/loggedInUser";
import { useCart } from "../context/cartContext.jsx";

const ProductDetail = () => {
  const user = useRecoilValue(userIsLoggedIn);
  const [cart, setCart] = useCart();
  const [selectedImage, setSelectedImage] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userRef: "",
    name: "",
    category: "",
    price: 0,
    imageUrls: [],
    orderQuantity: 0,
    paymentStatus: "Pending",
    deliveryStatus: "Packaging",
  });

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/product/product-detail/${id}`);
        const data = await res.json();
        if (data.success == false) {
          console.log(data.message);
          setLoading(false);
          return;
        }
        setProduct(data);
        setFormData({
          ...formData,
          userRef: user._id,
          name: data.name,
          category: data.category,
          price: +data.regularPrice - +data.discountPrice,
          imageUrls: data.imageUrls,
        });
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    if (e.target.type == "number") {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    if (+formData.orderQuantity == 0) {
      setError("Add quantity order!");
      return;
    }
    setError(false);
    setCart([...cart, formData]);
  };

  return (
    <div className="flex flex-col p-10 px-2 max-w-6xl mx-auto gap-10">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Link to="/">
            <button className="border w-fit text-lg bg-[#FF9376] rounded-lg p-3 px-5 text-white hover:bg-[#e67353] hover:text-white duration-150">
              Back
            </button>
          </Link>
          <div className="flex gap-10">
            <div className="flex flex-col gap-2 w-[500px] h-[500px]">
              <img
                className="h-full object-cover rounded-lg "
                src={!selectedImage ? product?.imageUrls[0] : selectedImage}
                alt="product image"
              />
              <div className="flex gap-1 justify-center">
                {product?.imageUrls.map((image) => (
                  <img
                    key={image}
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
                    <span className="font-semibold">
                      {product?.description}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex gap-2">
                <input
                  onChange={handleChange}
                  min={0}
                  className="p-3 disabled:cursor-not-allowed border-2 w-1/6 bg-slate-300 border-slate-500 rounded-lg"
                  type="number"
                  id="orderQuantity"
                  disabled={user && user.role == "admin"}
                />
                <button
                  onClick={handleSubmit}
                  disabled={user && user.role == "admin"}
                  className="p-3 bg-[#FF9376] enabled:hover:bg-[#e67353] text-white rounded-lg uppercase disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Add to Cart
                </button>
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
