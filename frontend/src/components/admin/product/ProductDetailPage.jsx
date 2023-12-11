import React, { useState } from "react";

const ProductDetailPage = ({product}) => {
  const [selectedImage, setSelectedImage] = useState("");
  return (
    <>
      <div className="flex flex-col justify-between gap-2 h-[400px]">
        <img
          className="h-full w-full mx-auto object-contain rounded-lg overflow-hidden"
          src={!selectedImage ? product?.imageUrls[0] : selectedImage}
          alt="product image"
        />
        <div className="flex gap-1 justify-center">
          {product?.imageUrls.map((image) => (
            <img
              onClick={() => setSelectedImage(image)}
              src={image}
              alt="product image"
              className="w-1/12 h-full cursor-pointer object-contain rounded-lg overflow-hidden"
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
    </>
  );
};

export default ProductDetailPage;
