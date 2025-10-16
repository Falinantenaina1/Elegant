import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    itmes: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productName: String,
        productImageUrl: String,
        quantity: { type: Number, required: true, min: 1 },
        priceAtPurchase: { type: Number, required: true, min: 0 },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
        "PICKED",
      ],
      default: "PENDING",
    },
    shippingType: {
      type: String,
      enum: ["BASIC", "EXPRESS", "PICKUP"],
      required,
    },
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    customer: {
      type: mongoose.Schema.Types.Obj,
      ectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("order", orderSchema);

export default Order;
