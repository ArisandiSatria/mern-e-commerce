import React from "react";
import { useCart } from "../context/cartContext";

const Cart = () => {
  const [cart] = useCart();
  console.log(cart[0]);
  return (
    <div>
      Info:
      {cart &&
        cart?.map((product) => (
          <div>
            <p>{product?.name}</p>
            <p>{product?.category}</p>
            <p>{product?.price}</p>
            <p>{product?.orderQuantity}</p>
          </div>
        ))}
    </div>
  );
};

export default Cart;
