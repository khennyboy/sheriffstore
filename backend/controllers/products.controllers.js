import mongoose from "mongoose";
import Product from "../models/products.model.js";

const limit = 11;
// get products
export const getProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const skip = (page - 1) * limit;

    const [totalProducts, products] = await Promise.all([
      Product.countDocuments(),
      Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    ]);

    return res.status(200).json({
      success: true,
      data: products,
      totalProducts,
      pageSize: limit,
    });
  } catch (error) {
    console.error("Error getting products:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// create product
export const createProduct = async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }
  const newProduct = new Product(product);
  try {
    await newProduct.save();
    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.log("Error saving product:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// update product
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }

  try {
    await Product.findByIdAndUpdate(id, product);
    return res
      .status(200)
      .json({ success: true, message: "updated successfully" });
  } catch (error) {
    console.log("Error Updating Product:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid Product Id" });
  }
  try {
    await Product.findByIdAndDelete(id);
    return res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    console.error("Error Deleting products:", error.message);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
