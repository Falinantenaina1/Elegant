import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const _dirname = path.resolve();
app.use(express.static("images"));

/* app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
); */

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(_dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`The server is running on http://localhost:${PORT}`);
});
