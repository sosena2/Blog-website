import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { verifyToken } from "@/lib/auth/verifyToken";

export async function GET(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function PATCH(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const body = await req.json();

    const allowedFields = [
      "name",
      "email",
      "bio",
      "profileImage",
      "username",
      "language",
      "timezone",
      "notifications",
    ];

    const updates = {};

    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    if (updates.bio && updates.bio.length > 160) {
      return NextResponse.json(
        { message: "Bio must be 160 characters or less" },
        { status: 400 }
      );
    }

    if (updates.email) {
      const existingEmail = await User.findOne({
        email: updates.email,
        _id: { $ne: decoded.id },
      });

      if (existingEmail) {
        return NextResponse.json(
          { message: "Email is already in use" },
          { status: 400 }
        );
      }
    }

    if (updates.username) {
      const existingUsername = await User.findOne({
        username: updates.username,
        _id: { $ne: decoded.id },
      });

      if (existingUsername) {
        return NextResponse.json(
          { message: "Username is already in use" },
          { status: 400 }
        );
      }
    }

    const user = await User.findByIdAndUpdate(decoded.id, updates, {
      returnDocument: "after",
      runValidators: true,
    }).select("-password");

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Settings updated", user });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update settings" },
      { status: 400 }
    );
  }
}
