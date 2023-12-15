import React from "react";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const [cart, setCart] = useCart();

  const handleRemove = (pname) => {
    try {
      let cartList = [...cart];
      const indexProduct = cartList.findIndex((item) => item.name == pname);
      cartList.splice(indexProduct, 1);
      setCart(cartList);
    } catch (error) {
      console.log(error);
    }
  };

  const totalPrice = () => {
    let total = 0;
    cart?.map((item) => {
      total += +item.price * +item.orderQuantity;
    });

    return total.toLocaleString("en-US");
  };

  return (
    <div className="flex flex-col p-10 px-2 max-w-6xl mx-auto gap-5">
      {cart.length == 0 ? (
        <p className="font-semibold text-xl text-center mt-10">
          Cart is empty...
        </p>
      ) : (
        <>
          <h3 className="text-3xl font-semibold">Order: </h3>
          <div className="flex gap-10">
            <div className="w-[600px] flex flex-col gap-2">
              {cart && cart?.map((product, index) => (
                <div
                  key={index}
                  className="flex border-2 gap-10 p-6 rounded-lg items-center"
                >
                  <img
                    className="w-[250px] h-[150px] cursor-pointer object-contain rounded-lg overflow-hidden"
                    src={product?.imageUrls[0]}
                    alt="product image"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold">{product?.name}</p>
                    <p className="">Quantity: {product?.orderQuantity}</p>
                    <p>Rp {(product?.price).toLocaleString("en-US")}</p>
                    <button
                      onClick={() => handleRemove(product.name)}
                      type="button"
                      className="bg-red-700 w-fit rounded-lg p-3 text-white mb-3 hover:bg-red-800 duration-150"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="max-w-3xl">
              <h2 className="uppercase">Checkout</h2>
              <p>{totalPrice()}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
