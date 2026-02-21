"use client";

import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function PostsTable() {
  const posts = [
    {
      id: 1,
      title: "The Ultimate Guide to Tropical...",
      category: "Beach",
      date: "Feb 15, 2026",
      views: "5,420",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 2,
      title: "Mountain Hiking: Essential Tips...",
      category: "Adventure",
      date: "Feb 12, 2026",
      views: "3,890",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    },
    {
      id: 3,
      title: "Exploring Europe's Architectural...",
      category: "Culture",
      date: "Feb 10, 2026",
      views: "6,720",
      status: "Published",
      image:
        "https://images.unsplash.com/photo-1467269204594-9661b134dd2b",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">

      {/* Table Header */}
      <div className="grid grid-cols-5 px-6 py-4 bg-gray-100 text-gray-600 font-medium text-sm">
        <span className="col-span-2">Title</span>
        <span>Status</span>
        <span>Date</span>
        <span>Views</span>
      </div>

      {/* Rows */}
      {posts.map((post) => (
        <div
          key={post.id}
          className="grid grid-cols-5 items-center px-6 py-5 border-t"
        >
          {/* Title + Image */}
          <div className="col-span-2 flex items-center gap-4">
            <Image
              src={post.image}
              alt=""
              width={56}
              height={56}
              className="w-14 h-14 object-cover rounded-xl"
            />
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-gray-500 text-sm">
                {post.category}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              {post.status}
            </span>
          </div>

          {/* Date */}
          <div className="text-gray-600 text-sm">
            {post.date}
          </div>

          {/* Views + Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Eye size={16} />
              <span>{post.views}</span>
            </div>

            <div className="flex items-center gap-3">
              <Pencil
                size={18}
                className="cursor-pointer hover:text-purple-600"
              />
              <Trash2
                size={18}
                className="cursor-pointer text-red-500 hover:text-red-600"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}