import { login } from "@/controllers/auth.controller.js";

export async function POST(request) {
  return login(request);
}