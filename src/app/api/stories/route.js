import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import { verifyToken } from "@/lib/auth/verifyToken";
import User from "@/lib/db/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const { title, content, status } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const story = await Story.create({
      title,
      slug,
      content,
      status,
      author: decoded.id,
    });

    return NextResponse.json(story, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 401 });
  }
}

export async function GET() {
  await connectDB();

  const stories = await Story.find({ status: "published" })
    .populate("author", "name email")
    .sort({ createdAt: -1 });

  return NextResponse.json(stories);
}
