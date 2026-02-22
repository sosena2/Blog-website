"use client";

import { useEffect, useState } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";

export default function PostsTable() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view your posts");
          return;
        }

        const res = await fetch("/api/user/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load your posts");
          return;
        }

        setPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <p className="text-gray-600">Loading your posts...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden p-6">
        <p className="text-gray-600">You have not created any posts yet.</p>
      </div>
    );
  }

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
          key={post._id}
          className="grid grid-cols-5 items-center px-6 py-5 border-t"
        >
          {/* Title + Image */}
          <div className="col-span-2 flex items-center gap-4">
            <Image
              src={post.coverImage || "/images/awash.jpg"}
              alt=""
              width={56}
              height={56}
              className="w-14 h-14 object-cover rounded-xl"
            />
            <div>
              <p className="font-semibold">{post.title}</p>
              <p className="text-gray-500 text-sm">
                {post.tags?.[0] || "General"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <span className={`px-3 py-1 rounded-full text-sm ${post.status === "published" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
              {post.status === "published" ? "Published" : "Draft"}
            </span>
          </div>

          {/* Date */}
          <div className="text-gray-600 text-sm">
            {new Date(post.createdAt).toDateString()}
          </div>

          {/* Views + Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600">
              <Eye size={16} />
              <span>{post.likes?.length || 0}</span>
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