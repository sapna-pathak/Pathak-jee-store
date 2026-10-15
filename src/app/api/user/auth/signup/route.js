import { signup } from "@/controllers/auth.controller.js";

export async function POST(request) {
  return signup(request);
}