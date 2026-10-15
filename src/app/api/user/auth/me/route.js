import { getUserProfile } from "@/controllers/auth.controller";

export async function GET(request) {
    return await getUserProfile(request);
}