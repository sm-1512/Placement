import jwt from "jsonwebtoken"
import User from "../models/user.model";

export const protectRoute = async (req, res) => {
    try {
        const token = req.cookies.jwt; 
        if(!token) return res.status(400).json({message: "Unauthorised: No Token Provided"});

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        
    }
}