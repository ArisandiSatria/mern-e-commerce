import React, { useState } from "react";

const ProductPanel = () => {
  const [newProduct, setNewProduct] = useState(true);

  return (
    <div className="p-2">
      <button
        onClick={() => setNewProduct(!newProduct)}
        className="border border-[#FF9376] rounded-lg p-3 text-[#FF9376] hover:bg-[#FF9376] hover:text-white duration-150"
      >
        {newProduct ? "New Product" : "Back to Products"}
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
        <div className="flex gap-4">
          <form className="flex flex-col sm:flex-row gap-4 mt-5 w-full">
            <div className="flex flex-col gap-4 flex-1">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  placeholder="Name"
                  className="border p-3 rounded-lg"
                  id="name"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="category">Category:</label>
                <select
                  name="category"
                  id="category"
                  className="p-3 rounded-lg border"
                >
                  <option value="diet">Food & Beverages</option>
                  <option value="sport">Sport</option>
                  <option value="electronic">Electronic</option>
                  <option value="clothe">Clothe</option>
                  <option value="medicine">Medicine</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Price:</label>
                <input
                  type="number"
                  placeholder="price"
                  className="border p-3 rounded-lg"
                  id="price"
                  min="0"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="regularPrice">Regular Price:</label>
                <input
                  type="number"
                  placeholder="regular price"
                  className="border p-3 rounded-lg"
                  id="regularPrice"
                  min="0"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="quantity">Quantity:</label>
                <input
                  type="number"
                  placeholder="quantity"
                  className="border p-3 rounded-lg"
                  id="quantity"
                  min="0"
                  max="1000"
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description:</label>
                <textarea
                  className="border p-3 rounded-lg"
                  placeholder="description"
                  name="description"
                  id="desc"
                ></textarea>
              </div>
            </div>

            <div className="flex flex-col flex-1 gap-4">
              <p className="font-semibold">
                Images:
                <span className="font-normal text-gray-600 ml-2">
                  The first image will be the cover (max 6)
                </span>
              </p>
              <div className="flex gap-4">
                <input
                  className="p-3 border boder-gray-300 rounded w-full"
                  type="file"
                  id="images"
                  accept="images/*"
                  multiple
                />
                <button
                  type="button"
                  className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80"
                >
                  Upload
                </button>
              </div>
              <button className="p-3 my-4 bg-[#FF9376] text-white rounded-lg uppercase hover:placeholder-opacity-95 disabled:opacity-80">
                Add new product
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProductPanel;
