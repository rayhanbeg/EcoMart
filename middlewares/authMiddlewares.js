import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protect routes
export const requireSignIn = async (req, res, next) => {
    try {
        // Retrieve the token from the cookies
        const token = req.cookies.token;
        
        // If there's no token, send an unauthorized response
        if (!token) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        // Verify the token
        const decode = JWT.verify(token, process.env.JWT_SECRET);
        req.user = decode; // Attach decoded user information to req.user
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "Unauthorized access" });
    }
};

// Admin check middleware
export const isAdmin = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.user._id);
        if (user.role !== "admin") {
            return res.status(401).send({
                success: false,
                message: "Unauthorized",
            });
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middleware",
        });
    }
};
