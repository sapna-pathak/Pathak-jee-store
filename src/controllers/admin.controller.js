import jwt from "jsonwebtoken";
import adminModel from "@/models/admin.model.js";
import bcrypt from "bcrypt";
import userModel from "@/models/user.model.js";
import { NextResponse } from "next/server";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

export const adminRegister = async (req, res) => {
  try {
    console.log("adminRegister called",req);
    const { name, email, password } = await req.json();
    const admin = await userModel.findOne({ email, role: "admin" });
    if (admin) {
      return NextResponse.json({ message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
      fullName: name,
      email,
      password: hashedPassword,
      isVerified: true,
      role: "admin",
    });

    const newAdmin = await adminModel.create({
      userId: user._id,
      name,
    });

    const token = generateToken(newAdmin._id);
    return NextResponse.json({
      message: "Admin registered successfully",
      success: true,
      token,
      admin: newAdmin,
    });
  } catch (error) {
    console.error("adminRegister error:", error);
    return NextResponse.json({ message: "Server error" });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json({ message: "Please provide email and password" });
    }

    const user = await userModel.findOne({ email, role: "admin" }).select("+password");
    if (!user) {
      return NextResponse.json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Invalid credentials" });
    }

    const admin = await adminModel.findOne({ userId: user._id });
    if (!admin) {
      // user exists but admin profile missing
      return NextResponse.json({ message: "Admin profile not found" });
    }

    admin.lastLogin = Date.now();
    await admin.save();

    const token = generateToken(admin._id);
    return NextResponse.json({
      success: true,
      token,
      message: "Admin logged in successfully",
      admin,
    });
  } catch (error) {
    console.error("adminLogin error:", error);
    return NextResponse.json({ message: "Server error" });
  }
};
