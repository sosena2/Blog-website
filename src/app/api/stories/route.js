import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import { verifyToken } from "@/lib/auth/verifyToken";
import User from "@/lib/db/models/User";

export async function POST(req) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const {
      title,
      subtitle,
      content,
      coverImage,
      tags = [],
      status = "published",
    } = await req.json();

    if (status !== "draft" && (!title || !content)) {
      return NextResponse.json(
        { message: "Title and content required" },
        { status: 400 }
      );
    }

    if (status !== "draft" && !coverImage) {
      return NextResponse.json(
        { message: "Cover image is required" },
        { status: 400 }
      );
    }

    const baseSlug = (title || "draft")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const slug = `${baseSlug || "draft"}-${Date.now()}`;

    const story = await Story.create({
      title,
      subtitle,
      slug,
      content,
      coverImage,
      tags,
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
    .populate("author", "name email profileImage")
    .sort({ createdAt: -1 });

  return NextResponse.json(stories);
}
