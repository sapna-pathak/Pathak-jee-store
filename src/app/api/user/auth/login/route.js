import { login } from "@/controllers/authController.js";

export async function POST(request) {
  return login(request);
}