import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  role: {
    type: String,
    enum: ['student', 'mentor', 'admin'],
    required: true,
  },

  // General Fields
  profilePic: {
    type: String,
    required: false,
    default: "",   // no need to upload at signup
  },
  college: {
    type: String,
    required: true,
  },

  // Student Specific Fields
  rollNo: {
    type: String,
    required: function () {
      return this.role === "student";
    },
  },
  graduationYear: {
    type: Number,
    required: function () {
      return this.role === "student";
    },
  },

  // Mentor Specific Fields
  passingYear: {
    type: Number,
    required: function () {
      return this.role === "mentor";
    },
  },
  currentCompany: {
    type: String,
    required: function () {
      return this.role === "mentor";
    },
  },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
