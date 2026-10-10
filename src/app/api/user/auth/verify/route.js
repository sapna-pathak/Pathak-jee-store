import { verifyOtp } from "@/controllers/authController.js";

export async function POST(request) {
  return verifyOtp(request);
}