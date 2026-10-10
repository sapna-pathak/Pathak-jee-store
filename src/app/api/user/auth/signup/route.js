import { signup } from "@/controllers/authController.js";

export async function POST(request) {
  return signup(request);
}