// createAdmin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.model.js";

dotenv.config();

const createAdmin = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const hashedPassword = await bcrypt.hash("khenny2020@", 10);

  await Admin.create({
    username: "sheriff",
    password: hashedPassword,
  });

  console.log("Admin created");
  process.exit();
};

createAdmin();