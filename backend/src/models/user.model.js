import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true,
    },
    fullName:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
        minLength:8,
    },
    role:{
        type:String,
        enum:['student', 'mentor', 'admin']
    },

    //General Fields
    profilePic:{
        type:String,
        required: true,
    },
    college:{
        type:String,
        required: true,
    },

    //Student Specific field
    rollNo:{
        Type:Number,
        required:true,
    },
    graduationYear:{
        type:Number,
        required: true,
    },

    //Mentor Specific Field
    passingYear:{
        type:Number,
        required: true,
    },
    
    currentCompany:{
        type:String,
        required: true,
    }
}, {timestamps:true})

const User= new mongoose.model("User", userSchema);

export default User;