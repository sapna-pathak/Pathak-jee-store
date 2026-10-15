import { verifyOtp } from "@/controllers/auth.controller.js";

export async function POST(request) {
  return verifyOtp(request);
}