import { adminRegister } from "@/controllers/admin.controller";    

export async function POST(request){
    return adminRegister(request);
}