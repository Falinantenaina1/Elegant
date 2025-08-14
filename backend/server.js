import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path from "path";

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const __dirname = path.resolve();
app.use(express.static("images"));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:5500",
    ],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "./frontend/dist");
  app.use(express.static(frontendPath));

  app.get("/{*any}", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

app.listen(PORT, () => {
  connectDb();
  console.log(`The server is running on http://localhost:${PORT}`);
});
