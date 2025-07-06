import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      throw error;
    }

    const user = await User.findById(decoded.userId).select("-password");

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute", error.message);
    res.status(500).json({ message: "Not authorized", error: error.message });
    next(error);
  }
};

export const adminRoute = async (req, res, next) => {
  try {
    const user = req.user;
    if (user.role !== "admin") {
      return res.status(401).json({ message: "Admin only" });
    }
    next();
  } catch (error) {
    console.log("Error in protectRoute", error.message);
    res.status(500).json({ message: "Not authorized", error: error.message });
    next(error);
  }
};
