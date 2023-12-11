import React, { useEffect, useState } from "react";
import ProductEdit from "./ProductEdit";
import ProductDetailPage from "./ProductDetailPage";

const ProductDetailAdmin = ({ id, dataProduct }) => {
  const [data, setData] = useState([]);
  const [deleteProductError, setDeleteProductError] = useState(false);
  const [editProduct, setEditProduct] = useState(false);

  const product = data[0];

  useEffect(() => {
    if (id) {
      setData(dataProduct.filter((productId) => productId._id == id));
    }
  }, [id]);

  const handleDeleteProduct = async (idProduct) => {
    try {
      setDeleteProductError(false);
      const res = await fetch(`/api/product/delete-product/${idProduct}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success == false) {
        setDeleteProductError(data.message);
        return;
      }
      window.location.reload();
    } catch (error) {
      setDeleteProductError(error.message);
    }
  };

  return (
    <div className="my-6">
      {editProduct ? (
        <div>
          <div className="flex gap-2 justify-between my-6 border-b-4 border-b-[#FF9376]">
            <p className="text-3xl font-semibold ">Edit Product</p>
            <button
              onClick={() => setEditProduct(false)}
              className="bg-red-700 rounded-lg p-3 text-white mb-3 hover:bg-red-800 duration-150"
            >
              Abort Edit
            </button>
          </div>

          <ProductEdit id={id} product={product}/>
        </div>
      ) : (
        <div>
          <div className="flex gap-2 justify-between my-6 border-b-4 border-b-[#FF9376]">
            <p className="text-3xl font-semibold ">Detail Product</p>
            <div className="flex gap-2">
              <button
                onClick={() => setEditProduct(true)}
                className="bg-yellow-400 rounded-lg p-3 text-white mb-3 hover:bg-yellow-500 hover:text-white duration-150"
              >
                Edit Product
              </button>
              <button
                onClick={() => handleDeleteProduct(product?._id)}
                className="outline outline-red-700 rounded-lg p-3 mb-3 text-red-700 hover:bg-red-700 hover:text-white duration-150"
              >
                Delete
              </button>
            </div>
            {deleteProductError && (
              <p className="text-red-700 text-sm">{deleteProductError}</p>
            )}
          </div>

          <ProductDetailPage product={product} />
        </div>
      )}
    </div>
  );
};

export default ProductDetailAdmin;
