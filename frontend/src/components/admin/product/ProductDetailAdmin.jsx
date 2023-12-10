import React, { useEffect, useState } from "react";

const ProductDetailAdmin = ({ id, dataProduct }) => {
  const [data, setData] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [deleteProductError, setDeleteProductError] = useState(false)

  const product = data[0];

  useEffect(() => {
    if (id) {
      setData(dataProduct.filter((productId) => productId._id == id));
    }
  }, [id]);

  const handleDeleteProduct = async (idProduct) => {
    try {
      setDeleteProductError(false)
      const res = await fetch(`/api/product/delete-product/${idProduct}`, {
        method: "DELETE"
      })
      const data = await res.json()
      if (data.success == false) {
        setDeleteProductError(data.message)
        return
      }
      window.location.reload();
    } catch (error) {
      setDeleteProductError(error.message)
    }
  }

  return (
    <div className="my-10 border-t-4 border-[#FF9376]">
      <div className="flex gap-2 justify-end my-6">
        <button className="bg-yellow-400 rounded-lg p-3 text-white hover:bg-yellow-500 hover:text-white duration-150">
          Edit Product
        </button>
        <button onClick={() => handleDeleteProduct(product?._id)} className="border border-red-700 rounded-lg p-3 text-red-700 hover:bg-red-700 hover:text-white duration-150">
          Delete
        </button>
        {deleteProductError && (<p className="text-red-700 text-sm">{deleteProductError}</p>)}
      </div>
      <div className="flex flex-col justify-between gap-2 h-[300px]">
        <img
          className="h-full w-2/3 mx-auto object-contain rounded-lg overflow-hidden"
          src={!selectedImage ? product?.imageUrls[0] : selectedImage}
          alt="product image"
        />
        <div className="flex gap-1 justify-center">
          {product?.imageUrls.map((image) => (
            <img
              onClick={() => setSelectedImage(image)}
              src={image}
              alt="product image"
              className="w-1/12 cursor-pointer object-cover rounded-lg overflow-hidden"
            />
          ))}
        </div>
      </div>

      <div className="mt-8">
        <p className="font-semibold text-xl uppercase mt-5 mb-3">Info:</p>
        <ul className="flex flex-col gap-1">
          <li>
            Name: <span className="font-semibold">{product?.name}</span>
          </li>
          <li>
            Category: <span className="font-semibold">{product?.category}</span>
          </li>
          <li>
            Quantity: <span className="font-semibold">{product?.quantity}</span>{" "}
            items
          </li>
          <li>
            Regular Price: Rp{" "}
            <span className="font-semibold">{product?.regularPrice}</span>
          </li>
          <li>
            Discount Price: Rp{" "}
            <span className="font-semibold">{product?.discountPrice}</span>
          </li>
          <li>
            Description:{" "}
            <span className="font-semibold">{product?.description}</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetailAdmin;
