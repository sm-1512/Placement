import express from "express";
import {signup, login, logout, checkAuth, studentDashboard, mentorDashboard, updateProfile} from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { authoriseRoles } from "../middlewares/authRole.middleware.js";
import {upload} from "../middlewares/uploadImage.middleware.js"


const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.put("/update-Profile", protectRoute, upload.single("profilePic"), updateProfile);

router.get("/check", protectRoute, checkAuth);

router.get("/mentor/dashboard", protectRoute, authoriseRoles("mentor"), mentorDashboard);
router.get("/student/dashboard", protectRoute, authoriseRoles("student"),  studentDashboard);


export default router;
