import { adminLogin } from "@/controllers/admin.controller";

export async function POST(request ) {
    return adminLogin(request);
}