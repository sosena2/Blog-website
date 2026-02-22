import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import User from "@/lib/db/models/User";
import { verifyToken } from "@/lib/auth/verifyToken";

export async function GET(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);

    const user = await User.findById(decoded.id).populate({
      path: "savedStories",
      populate: {
        path: "author",
        select: "name",
      },
      options: { sort: { createdAt: -1 } },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const savedStories = (user.savedStories || []).filter(
      (story) => story?.status === "published"
    );

    return NextResponse.json(savedStories);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
