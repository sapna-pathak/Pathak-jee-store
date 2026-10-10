import { getUserProfile } from "@/controllers/authController";

export async function GET(request) {
    return await getUserProfile(request);
}