import React, { useEffect, useState } from "react";

import ProductAdd from "./ProductAdd.jsx";
import ProductList from "./ProductList.jsx";
import ProductDetail from "./ProductDetail.jsx";

const ProductPanel = () => {
  const [newProduct, setNewProduct] = useState(true);
  const [detailClicked, setDetailClicked] = useState(false);

  return (
    <div className="p-2">
      <button
        onClick={() => {
          setNewProduct(detailClicked && newProduct ? newProduct : !newProduct);
          setDetailClicked(!detailClicked);
        }}
        className="border border-[#FF9376] rounded-lg p-3 text-[#FF9376] hover:bg-[#FF9376] hover:text-white duration-150"
      >
        {newProduct && !detailClicked ? "New Product" : "Back to Products"}
      </button>

      {!newProduct ? (
        <ProductAdd />
      ) : !detailClicked ? (
        <ProductList onDetailClicked={setDetailClicked} />
      ) : (
        <ProductDetail />
      )}
    </div>
  );
};

export default ProductPanel;
