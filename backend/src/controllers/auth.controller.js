import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  //1. Check for role.
  const { role } = req.body;
  try {
    //2. Check for the required fields
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
    //3. Check if password is less than 8 characters.
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be atleast 8 characters" });
    }
    //4. Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User already exists. Proceed to login." });
    }
    //5. Hash the password
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
    if(newUser){
      //6. Generate JWT token here
      await newUser.save();
      generateToken(newUser._id, res);


      //7.Send the user data
      if(role === 'mentor'){
        return res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: "mentor",
          passingYear: newUser.passingYear,
          currentCompany: newUser.currentCompany,
          college: newUser.college,
          profilePic: newUser.profilePic,
          token,
      })}
      else{
        return res.status(201).json({
          _id: newUser._id,
          fullName: newUser.fullName,
          email: newUser.email,
          role: "student",
          graduationYear: newUser.graduationYear,
          rollNo: newUser.rollNo,
          college: newUser.college,
          profilePic: newUser.profilePic,
          token,
        })
      }
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({message: "Internal Server Error"})
  }
};
