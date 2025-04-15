import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; 
        if(!token) {
            return res.status(401).json({message: "Unauthorised: No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({message: "Unauthorised: Invalid Token"});
        }
        
        const user = await User.findById(decoded.userId).select("-password"); //Selecting everything apart from the password

        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log("Error in protectRoute Middleware", error.message);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired. Please login again." });
        }

        res.status(500).json({message:"Internal Error"});
    }
}