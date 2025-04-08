import express from "express";

const router = express.Router();

router.get("/signup", async (req, res) => {
  res.send("Signup Page");
});

router.get("/login", async (req, res) => {
  res.send("Login Page");
});



export default router;
