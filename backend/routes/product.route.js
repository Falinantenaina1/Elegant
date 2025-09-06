import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getFeaturedProduct,
  getLatestProduct,
  getProduct,
  toogleFeatured,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  addReview,
  deleteReview,
  getProductReviews,
  updateReview,
} from "../controllers/review.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProduct);
router.get("/:id", getProduct);
router.get("/latest", getLatestProduct);
router.post(
  "/",
  protectRoute,
  adminRoute,
  upload.single("image"),
  createProduct
);

//Featured route
router.patch("/featured/:id", toogleFeatured);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

//Reveiw route
router.post("/:productId/reviews", protectRoute, addReview);
router.get("/:productId/reviews", getProductReviews);
router.delete("/:productId/reviews/:reviewId", protectRoute, deleteReview);
router.put("/:productId/reviews/:reviewId", protectRoute, updateReview);

export default router;
