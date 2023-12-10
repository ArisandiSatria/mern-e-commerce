import React, { useState } from "react";

import ProductAdd from "./ProductAdd.jsx";
import ProductList from "./ProductList.jsx";
import ProductDetailAdmin from "./ProductDetailAdmin.jsx";

const ProductPanel = () => {
  const [newProduct, setNewProduct] = useState(true);
  const [detailClicked, setDetailClicked] = useState(false);
  const [productData, setProductData] = useState([])
  const [selectedId, setSelectedId] = useState("")

  return (
    <div className="p-2">
      <button
        onClick={() => {
          setNewProduct(detailClicked && newProduct ? newProduct : !newProduct);
          setDetailClicked(!detailClicked);
        }}
        className="border bg-[#FF9376] rounded-lg p-3 text-white hover:bg-[#e67353] hover:text-white duration-150"
      >
        {newProduct && !detailClicked ? "New Product" : "Back to Products"}
      </button>

      {!newProduct ? (
        <ProductAdd />
      ) : !detailClicked ? (
        <ProductList onDetailClicked={setDetailClicked} id={setSelectedId} data={setProductData} />
      ) : (
        <ProductDetailAdmin dataProduct={productData} id={selectedId}/>
      )}
    </div>
  );
};

export default ProductPanel;
