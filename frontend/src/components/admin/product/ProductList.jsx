import React, { useEffect, useState } from "react";

const ProductList = ({ id, onDetailClicked, data }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [detail, setDetail] = useState(false);
  const [idProduct, setIdProduct] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch("/api/product/all-products");
        const data = await res.json();
        if (data.success == false) {
          console.log(data.message);
          return;
        }
        setAllProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllProducts();
  }, []);

  onDetailClicked(detail);
  data(allProducts);
  id(idProduct);

  return (
    <div className="my-5 py-5 flex flex-wrap gap-4 overflow-y-auto h-fit">
      {allProducts &&
        allProducts.map((product) => (
          <div
            onClick={() => {
              setDetail(true);
              setIdProduct(product._id)
            }}
            key={product._id}
            className="bg-white cursor-pointer shadow-md hover:shadow-lg overflow-hidden transition-shadow rounded-lg w-[210px]"
          >
            <img
              src={product.imageUrls[0]}
              alt="product image"
              className="h-[320px] sm:h-[180px] w-full object-cover hover:scale-105 transition-scale duration-300"
            />
            <div className="p-3 flex flex-col gap-2 w-full">
              <p className="text-lg font-semibold text-slate-700 truncate">
                {product.name}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-600 truncate w-full">
                  Rp{" "}
                  {(
                    product.regularPrice - product.discountPrice
                  ).toLocaleString("en-US")}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ProductList;
