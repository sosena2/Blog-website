import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import { verifyToken } from "@/lib/auth/verifyToken";

export async function GET(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);

    const drafts = await Story.find({
      author: decoded.id,
      status: "draft",
    })
      .populate("author", "name")
      .sort({ updatedAt: -1 });

    return NextResponse.json(drafts);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
