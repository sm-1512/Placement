import express from "express";
import {signup} from "../controllers/auth.controller.js"
const router = express.Router();

router.post("/signup", signup);

//router.post("/login", login);

//router.post("/logout", logout);

//router.put("/update-Profile", updateProfile);



export default router;
