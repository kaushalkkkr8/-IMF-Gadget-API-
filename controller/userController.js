import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { decodeJwt } from "../utils/decodeJwt.js";

dotenv.config();

export const signUp = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: "User Already exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashPassword });
    return res.status(201).json({
      status: true,
      message: "User created successfully",
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Incorrect Password", success: false });
    }
    const payload = {
      id: existingUser.id,
      email: existingUser.email,
      role: existingUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({
      message: "Login successful",
      token,
      user: payload,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const userProfile = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    if (!token) return res.status(401).json({ message: "access token required" });
    const userDetail = await decodeJwt(token);
    if (!userDetail) return res.status(401).json({ message: "invalid token" });
    const result = await User.findOne({ where: { id: userDetail.id } });
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ error: "" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Access token required" });
    }

    const token = authHeader.split(" ")[1];
    const userDetail = await decodeJwt(token);

    if (!userDetail) return res.status(401).json({ message: "invalid token" });

    if (userDetail.role !== "admin") return res.status(401).json({ message: "Unautherise User" });
    const { id, email } = req.query;
   
    
    if (!id && !email) {
      return res.status(400).json({ message: "Please provide user ID or email in query params" });
    }
    const user = await User.findOne({where: id ? { id } : { email }});
       if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.role = user.role === "admin" ? "user" : "admin";
    // user.role = "admin";
    await user.save();

    return res.status(200).json({
      message: `User role updated to ${user.role}`,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
