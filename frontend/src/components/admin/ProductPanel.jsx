import React, { useState } from "react";

const ProductPanel = () => {
  const [newProduct, setNewProduct] = useState(false);

  return (
    <div className="p-2">
      <button
        onClick={() => setNewProduct(!newProduct)}
        className="border border-[#FF9376] rounded-lg p-3 text-[#FF9376] hover:bg-[#FF9376] hover:text-white duration-150"
      >
        {newProduct ? "New Product" : "Back to All"}
      </button>

      {newProduct ? (
        <div className="mt-5">
          <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
            <img
              src=""
              alt="product image"
              className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
            />
            <div className="p-3 flex flex-col gap-2 w-full">
              <p className="text-lg font-semibold text-slate-700 truncate">
                name
              </p>
              <div className="flex items-center gap-1">
                <p className="text-sm text-gray-600 truncate w-full">price</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form className="flex flex-col sm:flex-row gap-4 mt-5 border w-4xl">
          <div className="flex flex-col gap-4 flex-1">
            <input
              type="text"
              placeholder="Name"
              className="border p-3 rounded-lg"
              id="name"
              required
            />
            <input
              type="number"
              placeholder="price"
              className="border p-3 rounded-lg"
              id="price"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              className="border p-3 rounded-lg"
              id="quantity"
              required
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductPanel;
