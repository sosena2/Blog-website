import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import User from "@/lib/db/models/User";
import { verifyToken } from "@/lib/auth/verifyToken";

export async function GET(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");

    const query = { author: decoded.id };

    if (status && ["draft", "published"].includes(status)) {
      query.status = status;
    }

    const stories = await Story.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 });

    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
