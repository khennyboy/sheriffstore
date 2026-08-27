import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import { router as productRoutes } from "./routes/products.route.js";
import path from "path";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const __dirname = path.resolve();
app.use(express.json()); // allow us to accept JSON data in the body

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http:localhost:8000");
});
