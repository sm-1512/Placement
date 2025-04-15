import express from "express";
import {signup, login, logout, checkAuth} from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { authoriseRoles } from "../middlewares/authRole.middleware.js";


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//router.put("/update-Profile", updateProfile);

router.get("/check", protectRoute, checkAuth);

router.get("/mentor/dashboard", protectRoute, authoriseRoles("mentor"), (req,res) => {
    res.json({message:"Welcome mentor"})
});

router.get("/student/dashboard", protectRoute, authoriseRoles("student"), (req, res) => {
    res.json({message:"Welcome student"})
});
export default router;
