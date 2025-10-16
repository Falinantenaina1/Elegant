import express from "express";
import { createOrder } from "../controllers/order.controller.js";
import { adminRoute, protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, createOrder);
router.get("/my-orders", protectRoute, getOrdersByUser);
router.get("/", protectRoute, adminRoute, getAllOrders);

export default router;
