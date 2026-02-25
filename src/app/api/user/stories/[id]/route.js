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

    const story = await Story.findOne({
      _id: id,
      author: decoded.id,
    }).populate("author", "name");

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
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

    if (updates.status === "published") {
      if (!updates.title || !updates.content || !updates.coverImage) {
        return NextResponse.json(
          { message: "Title, content, and cover image are required to publish" },
          { status: 400 }
        );
      }
    }

    const story = await Story.findOneAndUpdate(
      { _id: id, author: decoded.id },
      updates,
      { returnDocument: "after", runValidators: true }
    ).populate("author", "name");

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(story);
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to update story" },
      { status: 400 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const decoded = verifyToken(req);
    const { id } = await params;

    const story = await Story.findOneAndDelete({
      _id: id,
      author: decoded.id,
    });

    if (!story) {
      return NextResponse.json({ message: "Story not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Story deleted" });
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete story" },
      { status: 400 }
    );
  }
}
