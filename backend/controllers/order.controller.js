export const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { carts, total, shippingType } = req.body;

    res.status(201).json(carts);
  } catch (error) {
    console.log("Error in createOrder controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
