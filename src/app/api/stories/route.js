import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import { verifyToken } from "@/lib/auth/verifyToken";
import User from "@/lib/db/models/User";

const createExcerpt = (value = "") =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

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
      excerpt: createExcerpt(content || ""),
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

export async function GET(req) {
  await connectDB();

  const url = new URL(req.url);
  const pageParam = Number.parseInt(url.searchParams.get("page") || "1", 10);
  const limitParam = Number.parseInt(url.searchParams.get("limit") || "12", 10);

  const page = Number.isNaN(pageParam) || pageParam < 1 ? 1 : pageParam;
  const limit = Number.isNaN(limitParam)
    ? 12
    : Math.min(Math.max(limitParam, 1), 50);
  const skip = (page - 1) * limit;

  const stories = await Story.find({ status: "published" })
    .select("title subtitle slug excerpt coverImage tags createdAt author")
    .populate("author", "name profileImage")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  return NextResponse.json(stories);
}
