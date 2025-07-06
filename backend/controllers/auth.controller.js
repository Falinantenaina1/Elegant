import { generateTokenAndSetCookie } from "../lib/generateTokenAndSetCookie.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "All field is required" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User alredy exist" });
    }

    const user = await User.create({ firstname, lastname, email, password });

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({ user });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message || "server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All field is required" });
    }

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      generateTokenAndSetCookie(user._id, res);

      return res.status(200).json({ user });
    }

    res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message || "server error" });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
};

export const getProfil = async (req, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    console.log("Error in getProfil controller", error.message);
    res.status(500).json({ message: "server error", error: error.message });
  }
};
