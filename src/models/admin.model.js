import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    lastLogin: {
        type: Date,
        default: null, 
    },
},{timeStamps:true});

export default mongoose.model("Admin",adminSchema);