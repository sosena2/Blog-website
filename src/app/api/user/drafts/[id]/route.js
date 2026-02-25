import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import { verifyToken } from "@/lib/auth/verifyToken";

const createExcerpt = (value = "") =>
  value
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 180);

export async function GET(req, { params }) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const { id } = await params;

    const draft = await Story.findOne({
      _id: id,
      author: decoded.id,
      status: "draft",
    }).populate("author", "name");

    if (!draft) {
      return NextResponse.json({ message: "Draft not found" }, { status: 404 });
    }

    return NextResponse.json(draft);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const { id } = await params;
    const body = await req.json();

    const allowedFields = [
      "title",
      "subtitle",
      "content",
      "coverImage",
      "tags",
      "status",
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (body[key] !== undefined) {
        updates[key] = body[key];
      }
    }

    if (typeof updates.content === "string") {
      updates.excerpt = createExcerpt(updates.content);
    }

    const wantsPublish = updates.status === "published";

    if (wantsPublish) {
      if (!updates.title || !updates.content || !updates.coverImage) {
        return NextResponse.json(
          { message: "Title, content, and cover image are required to publish" },
          { status: 400 }
        );
      }

      const baseSlug = updates.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

      updates.slug = `${baseSlug || "story"}-${Date.now()}`;
    }

    const draft = await Story.findOneAndUpdate(
      { _id: id, author: decoded.id },
      updates,
      { returnDocument: "after", runValidators: true }
    ).populate("author", "name");

    if (!draft) {
      return NextResponse.json({ message: "Draft not found" }, { status: 404 });
    }

    return NextResponse.json(draft);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update draft" },
      { status: 400 }
    );
  }
}
