import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { role } = req.body;
  try {
    if (role === "mentor") {
      const {fullName, email, password, passingYear, currentCompany, college} = req.body;
      if (!fullName || !email || !password || !passingYear || !currentCompany || !college) {
        return res.status(400).json({ message: "All fields are required" });
      }
    } else {
      const { fullName, email, password, graduationYear, college, rollNo } = req.body;
      if (!fullName || !email || !password || !graduationYear || !rollNo || !college) {
        return res.status(400).json({ message: "All fields are required" });
      }
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Proceed to login." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser;
    if (role === "mentor") {
        newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        passingYear,
        currentCompany,
        college,
        role: "mentor",
      });
    } else {
      newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        graduationYear,
        rollNo,
        college,
        role: "student",
      });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({message: "Internal Server Error"})
  }
};
