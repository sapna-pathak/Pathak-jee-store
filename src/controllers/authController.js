import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import mongoose from "mongoose";
import User from "@/models/User.js";
import Wishlist from "@/models/wishlist.model.js";
import {
  generateOtp,
  sendOtpSms,
  saveOtp,
  verifyOtpService,
} from "@/services/otpService.js";

const createAuthToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }

  return jwt.sign({ id: userId }, secret, { expiresIn: "7d" });
};

const readJsonBody = async (request) => {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";

  try {
    if (contentType.includes("application/json")) {
      return { body: await request.json() };
    }

    if (
      contentType.includes("multipart/form-data") ||
      contentType.includes("application/x-www-form-urlencoded")
    ) {
      const formData = await request.formData();
      return { body: Object.fromEntries(formData.entries()) };
    }

    return {
      response: Response.json(
        { message: "Content-Type must be application/json or form data" },
        { status: 415 },
      ),
    };
  } catch {
    return {
      response: Response.json(
        { message: "Invalid request body" },
        { status: 400 },
      ),
    };
  }
};

const getAuthenticatedUserId = (request) => {
  const authorization = request.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not configured");
  }
  if (!token) {
    return null;
  }

  try {
    const payload = jwt.verify(token, secret);
    return typeof payload === "object" && payload !== null ? payload.id : null;
  } catch {
    return null;
  }
};

const normalizeMobile = (mobile) =>
  typeof mobile === "string" ? mobile.replace(/\D/g, "") : "";

const errorResponse = (error, context) => {
  console.error(`${context}:`, error);
  return Response.json(
    { message: error instanceof Error ? error.message : "Internal server error" },
    { status: 500 },
  );
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const signup = async (request) => {
  try {
    console.log("Signup request received", request);
    const parsed = await request.json();
    console.log("Parsed request body:", parsed);
    const { fullName, mobile } = parsed ?? {};
    const normalizedMobile = normalizeMobile(mobile);

    if (typeof fullName !== "string" || !fullName.trim() || !normalizedMobile) {
      return Response.json(
        { message: "Full name and mobile are required" },
        { status: 400 },
      );
    }

    const existingMobile = await User.findOne({ mobile: normalizedMobile });
    if (existingMobile) {
      return Response.json(
        { message: "Mobile number already registered. Please login." },
        { status: 400 },
      );
    }

    await User.create({ fullName: fullName.trim(), mobile: normalizedMobile });

    const otp = generateOtp();
    await saveOtp(normalizedMobile, otp);
    // await sendOtpSms(normalizedMobile, otp);

    return Response.json(
      { message: "OTP sent successfully" },
      { status: 201 },
    );
  } catch (error) {
    return errorResponse(error, "Signup error");
  }
};

export const verifyOtp = async (request) => {
  try {
    const parsed = await request.json();
    console.log("Parsed request body:", parsed);
    const phone = normalizeMobile(parsed?.phone);
    const otp = String(parsed?.otp ?? "");
    if (!phone || !otp) {
      return Response.json(
        { message: "Phone number and OTP are required" },
        { status: 400 },
      );
    }

    const isValid = await verifyOtpService(phone, otp);
    if (!isValid) {
      return Response.json({ error: "Invalid OTP" }, { status: 400 });
    }

    const user = await User.findOne({ mobile: phone });
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    user.isVerified = true;
    await user.save();

    return Response.json({
      success: true,
      token: createAuthToken(user._id.toString()),
      user,
    });
  } catch (error) {
    return errorResponse(error, "Verify OTP error");
  }
};

export const login = async (request) => {
  try {
    const parsed = await request.json();

    const mobile = normalizeMobile(parsed?.mobile);
    if (!mobile) {
      return Response.json(
        { message: "Mobile number required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ mobile });
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOtp();
    await saveOtp(mobile, otp);
    // await sendOtpSms(mobile, otp);

    return Response.json({
      success: true,
      message: "OTP sent successfully",
      user,
    });
  } catch (error) {
    return errorResponse(error, "Login error");
  }
};

export const forgotPassword = async (request) => {
  try {
    const parsed = await readJsonBody(request);
    if (parsed.response) return parsed.response;

    const mobile = normalizeMobile(parsed.body?.mobile);
    if (!mobile) {
      return Response.json(
        { message: "Mobile number is required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ mobile }).select(
      "+resetOtp +resetOtpExpiry",
    );
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    const otp = generateOtp();
    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 2 * 60 * 1000);
    await user.save();
    await sendOtpSms(mobile, otp);

    return Response.json({ message: "Reset OTP sent successfully" });
  } catch (error) {
    return errorResponse(error, "Forgot password error");
  }
};

export const verifyResetOtp = async (request) => {
  try {
    const parsed = await readJsonBody(request);
    if (parsed.response) return parsed.response;

    const mobile = normalizeMobile(parsed.body?.mobile);
    const otp = String(parsed.body?.otp ?? "");
    if (!mobile || !otp) {
      return Response.json(
        { message: "Mobile number and OTP are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ mobile }).select(
      "+resetOtp +resetOtpExpiry",
    );
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    if (user.resetOtp !== otp) {
      return Response.json({ message: "Invalid OTP" }, { status: 400 });
    }
    if (!user.resetOtpExpiry || user.resetOtpExpiry.getTime() < Date.now()) {
      return Response.json({ message: "OTP expired" }, { status: 400 });
    }

    return Response.json({ message: "OTP verified" });
  } catch (error) {
    return errorResponse(error, "Verify reset OTP error");
  }
};

export const resetPassword = async (request) => {
  try {
    const parsed = await readJsonBody(request);
    if (parsed.response) return parsed.response;

    const mobile = normalizeMobile(parsed.body?.mobile);
    const otp = String(parsed.body?.otp ?? "");
    const newPassword = parsed.body?.newPassword;

    if (!mobile || !otp || typeof newPassword !== "string") {
      return Response.json(
        { message: "Mobile number, OTP, and new password are required" },
        { status: 400 },
      );
    }
    if (newPassword.length < 8) {
      return Response.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ mobile }).select(
      "+resetOtp +resetOtpExpiry",
    );
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }
    if (user.resetOtp !== otp) {
      return Response.json({ message: "Invalid OTP" }, { status: 400 });
    }
    if (!user.resetOtpExpiry || user.resetOtpExpiry.getTime() < Date.now()) {
      return Response.json({ message: "OTP expired" }, { status: 400 });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();

    return Response.json({ message: "Password reset successful" });
  } catch (error) {
    return errorResponse(error, "Reset password error");
  }
};

export const googleLogin = async (request) => {
  try {
    const parsed = await readJsonBody(request);
    if (parsed.response) return parsed.response;

    const { idToken } = parsed.body ?? {};
    if (!idToken) {
      return Response.json({ message: "ID token required" }, { status: 400 });
    }
    if (!process.env.GOOGLE_CLIENT_ID) {
      throw new Error("GOOGLE_CLIENT_ID is not configured");
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    if (!payload?.email || !payload.sub) {
      return Response.json(
        { message: "Google account did not provide a valid email" },
        { status: 400 },
      );
    }

    let user = await User.findOne({ email: payload.email });
    if (!user) {
      user = await User.create({
        fullName: payload.name || payload.email,
        email: payload.email,
        googleId: payload.sub,
        isVerified: true,
      });
    }

    return Response.json({
      token: createAuthToken(user._id.toString()),
      user,
    });
  } catch (error) {
    return errorResponse(error, "Google login error");
  }
};

export const getUserProfile = async (request) => {
  try {
    const userId = req.user.id || getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json({ message: "Invalid user id" }, { status: 400 });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      status: 200,
      message: "User profile retrieved successfully",
      user,
    });
  } catch (error) {
    return errorResponse(error, "Get user profile error");
  }
};

export const updateUserProfile = async (request) => {
  try {
    const userId = req.user.id || getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json({ message: "Invalid user id" }, { status: 400 });
    }

    const parsed = await readJsonBody(request);
    if (parsed.response) return parsed.response;

    const { fullName, email, mobile } = parsed.body ?? {};
    const updates = {};
    if (fullName !== undefined) {
      if (typeof fullName !== "string" || !fullName.trim()) {
        return Response.json({ message: "Invalid full name" }, { status: 400 });
      }
      updates.fullName = fullName.trim();
    }
    if (email !== undefined) {
      if (typeof email !== "string" || !email.trim()) {
        return Response.json({ message: "Invalid email" }, { status: 400 });
      }
      updates.email = email.trim().toLowerCase();
    }
    if (mobile !== undefined) {
      const normalizedMobile = normalizeMobile(mobile);
      if (!normalizedMobile) {
        return Response.json({ message: "Invalid mobile number" }, { status: 400 });
      }
      updates.mobile = normalizedMobile;
    }
    if (Object.keys(updates).length === 0) {
      return Response.json({ message: "No valid profile fields provided" }, { status: 400 });
    }

    const user = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json({
      status: 200,
      message: "User profile updated successfully",
      user,
    });
  } catch (error) {
    return errorResponse(error, "Update user profile error");
  }
};

export const getMyWishlist = async (request) => {
  try {
    const userId = req.user.id || getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return Response.json({ message: "Invalid user id" }, { status: 400 });
    }

    const wishlist = await Wishlist.findOne({ user: userId }).populate(
      "items.product",
    );
    if (!wishlist) {
      return Response.json(
        { success: false, message: "Wishlist not found" },
        { status: 404 },
      );
    }

    return Response.json({ success: true, wishlist });
  } catch (error) {
    return errorResponse(error, "Get wishlist error");
  }
};
