import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carts, total, shippingType, shippingdAddress } = req.body;

    const items = [];

    for (const item of carts) {
      const product = await Product.findById(item._id);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }

      const item = {
        product: product._id,
        quantity: item.quantity,
        priceAtPurchase: product.price,
      };

      items.push(item);
    }

    const order = new Order({
      user: userId,
      items,
      totaltotalAmount: total,
      shippingdAddress,
      shippingType,
    });

    await order.save();

    res.status(201).json(order);
  } catch (error) {
    console.log("Error in createOrder controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("items.product")
      .sort({ createdAt: -1 });

    return res.status(200).json(orders);
  } catch (error) {
    console.log("Error in getAllOrders controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getOrdersByUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = (
      await Order.find({ user: userId }).populate("items.product")
    ).toSorted({ createdAt: -1 });
    return res.status(200).json({ orders });
  } catch (error) {
    console.log("Error in getAllOrders controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
