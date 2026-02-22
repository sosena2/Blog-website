import { NextResponse } from "next/server";
import connectDB from "@/lib/db/connect";
import Story from "@/lib/db/models/Story";
import User from "@/lib/db/models/User";

export async function GET(req, { params }) {
  await connectDB();

  const { slug } = await params;  

  const story = await Story.findOne({
    slug,
    status: "published",
  }).populate("author", "name");

  if (!story) {
    return NextResponse.json({ error: "Story not found" }, { status: 404 });
  }

  return NextResponse.json(story);
}