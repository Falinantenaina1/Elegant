import express from "express";
import { updateUser } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.put("/:id", protectRoute, updateUser);

export default router;
