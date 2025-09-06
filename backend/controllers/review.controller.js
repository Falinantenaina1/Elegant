import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "The ID is not Valid" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "The rating must between 1 and 5" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Verify if user alredy review
    const existingReview = product.reviews.find(
      (review) => review.user.toString() === userId.toString()
    );

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }

    // Add new review
    product.reviews.push({
      user: userId,
      rating,
      comment,
    });

    //Save product with new review
    await product.save();

    res.status(201).json(product);
  } catch (error) {
    console.log("Error in add review controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "The ID is not Valid" });
    }

    const product = await Product.findById(productId).populate(
      "reviews.user",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ reviews: product.reviews });
  } catch (error) {
    console.log("Error in getProductReviews controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const userId = req.user._id; //

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(reviewId)
    ) {
      return res.status(400).json({ message: "The ID is not Valid" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const reviewIndex = product.reviews.findIndex(
      (review) => review._id.toString() === reviewId
    );

    if (reviewIndex === -1) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Verify if the user is the owner of review or admin
    if (
      product.reviews[reviewIndex].user.toString() !== userId.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Not authorised" });
    }

    // delete revieuw
    product.reviews.splice(reviewIndex, 1);
    await product.save();

    res.status(200).json({ message: "review deleted" });
  } catch (error) {
    console.log("Error in deleteReview controller", error.message);
    res.status(500).json({ message: error.message || "Error server" });
  }
};

export const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    if (
      !mongoose.Types.ObjectId.isValid(productId) ||
      !mongoose.Types.ObjectId.isValid(reviewId)
    ) {
      return res.status(400).json({ message: "The ID is not Valid" });
    }

    if (rating && (rating < 1 || rating > 5)) {
      return res
        .status(400)
        .json({ message: "The rating must between 1 and 5" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    //Find the review
    const review = product.reviews.find((r) => r._id.toString() === reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Verify if the user is the owner of review
    if (review.user.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update the review
    if (rating) review.rating = rating;
    if (comment) review.comment = comment;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log("Error in updateReview controller", error.message);
    res.status(500).json({ message: error.message || "Server error" });
  }
};
