import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../lib/util.js"

export const signup = async (req, res) => {
  // 1. Destructure everything 
  const { role, fullName, email, password, passingYear, currentCompany, college, graduationYear, rollNo } = req.body;

  try {
    // 2. Validate required fields
    if (role === "mentor") {
      if (!fullName || !email || !password || !passingYear || !currentCompany || !college) {
        return res.status(400).json({ message: "All fields are required" });
      }
    } else {
      if (!fullName || !email || !password || !graduationYear || !rollNo || !college) {
        return res.status(400).json({ message: "All fields are required" });
      }
    }

    // 3. Validate password length
    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

    // 4. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists. Please login." });
    }

    // 5. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 6. Create user
    const newUser = role === "mentor" ? new User({
      fullName,
      email,
      password: hashedPassword,
      passingYear,
      currentCompany,
      college,
      role: "mentor",
    }) : new User({
      fullName,
      email,
      password: hashedPassword,
      graduationYear,
      rollNo,
      college,
      role: "student",
    });

    // 7. Save user and generate token
    await newUser.save();
    const token = generateToken(newUser._id, res);

    // 8. Send response
    const userData = {
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      college: newUser.college,
      profilePic: newUser.profilePic,
      token,
    };

    if (role === "mentor") {
      userData.passingYear = newUser.passingYear;
      userData.currentCompany = newUser.currentCompany;
    } else {
      userData.graduationYear = newUser.graduationYear;
      userData.rollNo = newUser.rollNo;
    }

    return res.status(201).json(userData);

  } catch (error) {
    console.log("Error in signup controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


export const login = async(req, res) => {
  const {email, password, role} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: "Invalid Credentials"});

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect)
      return res.status(400).json({message: "Invalid Credentials"});

    generateToken(user._id, res);

    //I am using repetitive way for mentor and student. Another way is that I can use a commonUserData for the common fields and then for the uncommon fields for student and mentor I can use the if-else
    if(user.role === 'mentor'){
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: "mentor",
        passingYear: user.passingYear,
        currentCompany: user.currentCompany,
        college: user.college,
        profilePic: user.profilePic,
        
    })}
    else{
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: "student",
        graduationYear: user.graduationYear,
        rollNo: user.rollNo,
        college: user.college,
        profilePic: user.profilePic,
        
      })
    }
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    return res.status(500).json({message:"Internal Server Error"});
  }
};
