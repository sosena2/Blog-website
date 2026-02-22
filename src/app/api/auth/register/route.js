import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req){
    try{
        const{ name, email, password} = await req.json();
        await connectDB();

        const existingUser = await User.findOne({email});
        if(existingUser){
            return NextResponse.json(
                {error: "User already exists"},
                {status: 400}
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name, email, password: hashedPassword,
        });

        const token = signToken({
            id: user._id,
            email: user.email
        });

        const response = NextResponse.json({
            message: "User created successfully"
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            path: "/",
        });

        return response;
    }catch(error){
        console.log(error);
        return NextResponse.json(
            {error: "something went wrong"},
            {status: 500}
        );
    }
}