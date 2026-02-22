import { cookies } from "next/headers";
import { VerifyToken } from "@/lib/auth/jwt";

export function getUserFromToken(){
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if(!token) return null;

    return VerifyToken(token);
    
}