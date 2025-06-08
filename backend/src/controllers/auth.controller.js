import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/util.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async (req, res) => {
  const {
    role,
    fullName,
    email,
    password,
    passingYear,
    currentCompany,
    college,
    graduationYear,
    rollNo,
  } = req.body;

  try {
    // 1. Validate role
    if (!role || !["mentor", "student"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 2. Validate common fields
    if (!fullName || !email || !password || !college) {
      return res
        .status(400)
        .json({ message: "All common fields are required" });
    }

    // 3. Validate role-specific fields
    if (role === "mentor" && (!passingYear || !currentCompany)) {
      return res
        .status(400)
        .json({ message: "Mentor specific fields are required" });
    }

    if (role === "student" && (!graduationYear || !rollNo)) {
      return res
        .status(400)
        .json({ message: "Student specific fields are required" });
    }

    // 4. Password length check
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    // 5. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User already exists. Proceed to login." });
    }

    //6. Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 7. Create user object dynamically
    const newUserData = {
      fullName,
      email,
      password: hashedPassword,
      role,
      college,
    };

    if (role === "mentor") {
      newUserData.passingYear = passingYear;
      newUserData.currentCompany = currentCompany;
    } else if (role === "student") {
      newUserData.graduationYear = graduationYear;
      newUserData.rollNo = rollNo;
    }

    const newUser = await User.create(newUserData);

    // 8. Generate token
    const token = generateToken(newUser._id, res);

    // 9. Send response
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      role: newUser.role,
      college: newUser.college,
      profilePic: newUser.profilePic,
      ...(role === "mentor" && {
        passingYear: newUser.passingYear,
        currentCompany: newUser.currentCompany,
      }),
      ...(role === "student" && {
        graduationYear: newUser.graduationYear,
        rollNo: newUser.rollNo,
      }),
      token,
    });
  } catch (error) {
    console.error("Error in signup controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Incorrect email or password." });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Incorrect email or password." });

    generateToken(user._id, res);

    //I am using repetitive way for mentor and student. Another way is that I can use a commonUserData for the common fields and then for the uncommon fields for student and mentor I can use the if-else
    if (user.role === "mentor") {
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: "mentor",
        passingYear: user.passingYear,
        currentCompany: user.currentCompany,
        college: user.college,
        profilePic: user.profilePic,
      });
    } else {
      return res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: "student",
        graduationYear: user.graduationYear,
        rollNo: user.rollNo,
        college: user.college,
        profilePic: user.profilePic,
      });
    }
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    return res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    console.log("Error in Logout Controller:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//This route is being created in case when user refreshes then whether to take him to login page or profile page.
export const checkAuth = (req, res) => {
  try {
    return res.status(200).json(req.user); //Send the user back to the client
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const studentDashboard = (req, res) => {
  res.json({ message: "Welcome student" });
};

export const mentorDashboard = (req, res) => {
  res.json({ message: "Welcome mentor" });
};

export const updateProfile = async (req, res) => {
  const userId = req.user._id;
  const role = req.user.role;

  const updateData = {};

  const { name, rollNo, graduationYear, currentCompany, passingYear } =
    req.body;
  try {
    //Basic field updates
    if (name) updateData.name = name;

    //"If" user uploads, he may not want to update his profile image
    if (req.file) {
      const uploadedImage = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "profile_pictures",
            resource_type: "image",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer); //this triggers upload
      });
      updateData.profilePic = uploadedImage.secure_url;
    }

    //Add role specific fileds
    if(role === "student"){
      if(graduationYear) updateData.graduationYear = graduationYear; //Allowing only graduation year to be changed. Suppose he gets a back or fails etc.
    }
    else if(role == "mentor"){
      if(currentCompany) updateData.currentCompany = currentCompany; //Not allowing passing year to be changed.
    }

    //Now update everything in DB
    const updatedUser = new User.findByIdAndUpdate(userId, updateData,{
      new:true,
      runValidators: true,
    });

    res.status(200).json({user: updatedUser});
  } catch (error) {
    console.error("Error in update profile route", error);
    return res.status(500).json({message:"Internal Server Error"});
  }
};
