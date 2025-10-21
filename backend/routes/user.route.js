import express from "express";
import { updateAddress, updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/", protectRoute, updateUser);

router.put("/address", protectRoute, updateAddress);

export default router;
