import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req){
    try{
        const {email, password} = await req.json();
        await connectDB();

        const user = await User.findOne({email});

        if(!user){
            return NextResponse.json(
                {error: "Invalid credentials"},
                {status: 401}
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return NextResponse.json(
                {error: "Invalid credentials"},
                {status: 401}
            );
        }

        const token = signToken({
            id: user._id,
            email: user.email,
        });

        const response = NextResponse.json({
            message: "Login successful",
            token: token
        });

        return response;
    }catch(error){
        return NextResponse.json(
            {error: "Something went wrong"},
            {status: 500}
        );
    }
}