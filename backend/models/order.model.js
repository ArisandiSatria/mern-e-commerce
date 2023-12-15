import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userRef: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    orderQuantity: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true
    },
    deliveryStatus: {
      type: String,
      required: true
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema)

export default Order
