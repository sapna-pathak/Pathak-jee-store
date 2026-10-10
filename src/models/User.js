import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      lowercase: true,
      trim: true,
    },

    mobile: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    password: {
      type: String,
      // required: true,
      minlength: [8, "Password must be at least 8 characters long"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "storeManager", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },

    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetOtp: {
      type: String,
      select: false,
    },
    resetOtpExpiry: {
      type: Date,
      select: false,
    },

    walletBalance: { type: Number, default: 0 },
    rewardPoints: { type: Number, default: 0 },
    rewardHistory: [
        {
            points: { type: Number, required: true },
            type: { type: String, enum: ["credit", "debit"], required: true },
            remark: { type: String },
            expiryDate: { type: Date },
            createdAt: { type: Date, default: Date.now },
        },
    ],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);