import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./config/db.js";
import { router as productRoutes } from "./routes/products.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();

app.use(express.json());

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("/*splat", (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
  });
});
