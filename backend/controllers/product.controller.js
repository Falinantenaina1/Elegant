import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const { name, description, price, category } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(404).json({ message: "All field is required" });
    }

    // Upload image to Cloudinary

    const result = await new Promise((resolve, reject) => {
      const uploadSteam = cloudinary.uploader.upload_stream(
        { folder: "products" },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );

      uploadSteam.end(req.file.buffer);
    });

    const product = await Product.create({
      name,
      description,
      price,
      imageUrl: result.secure_url,
      publicId: result.public_id,
      category,
    });

    return res.status(201).json(product);
  } catch (error) {
    console.log("Error in createProduct controller", error.message);
    res.status(500).json({ message: error || error.message || "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getAllProducts controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getLatestProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.log("Error in getLatestProduct controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "The IS is not valid" });
  }

  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in getProduct controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getFeaturedProduct = async (req, res) => {
  try {
    const featuredProduct = await Product.find({ isFeatured: true });

    if (!featuredProduct) {
      return res.status(404).json({ message: "There is not featured product" });
    }

    res.status(200).json({ featuredProduct });
  } catch (error) {
    console.log("Error in getFeaturedProduct controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const toogleFeatured = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "The IS is not valid" });
  }
  try {
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    product.isFeatured = !product.isFeatured;
    await product.save();
    return res.status(200).json({ Featured: product.isFeatured });
  } catch (error) {
    console.log("Error in toggleFeatured controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "The IS is not valid" });
  }

  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.log("Error in updateProduct controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "The IS is not valid" });
    }
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //delete image from cloudinary

    if (product.publicId) {
      try {
        await cloudinary.uploader.destroy(product.publicId);
      } catch (error) {
        console.log("Error deletin image from Cloudinary:", error.message);
      }
    }

    // Delete the product from database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
