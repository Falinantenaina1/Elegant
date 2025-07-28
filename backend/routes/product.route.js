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
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.get("/featured", getFeaturedProduct);
router.get("/:id", getProduct);
router.get("/latest", getLatestProduct);
router.post("/", upload.single("image"), createProduct);
router.patch("/featured/:id", toogleFeatured);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
