import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    // Validation
    if (!name) return res.send({ error: "Name is required" });
    if (!email) return res.send({ error: "Email is required" });
    if (!password) return res.send({ error: "Password is required" });
    if (!phone) return res.send({ error: "Phone no is required" });
    if (!address) return res.send({ error: "Address is required" });

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, please login",
      });
    }

    // Register new user
    const hashedPassword = await hashPassword(password);
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email not registered",
      });
    }

    // Compare passwords
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set the token in an HTTP-only cookie
    res.cookie("token", token, {
      httpOnly: true, // Cannot be accessed via JavaScript
      secure: process.env.NODE_ENV === "production", // Set secure flag in production
      sameSite: "strict", // Prevent CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response with user info
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// Test protected route
export const testController = async (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
