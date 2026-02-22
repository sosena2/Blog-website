"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function SavedPostItem({ title, excerpt, author, date, imageUrl }) {
  return (
    <div className="flex items-start gap-6">
      {/* Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          {excerpt}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {author} &nbsp;·&nbsp; {date}
        </p>
      </div>
    </div>
  );
}

export default function SavedPostsList() {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view saved posts");
          return;
        }

        const res = await fetch("/api/user/saved", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load saved posts");
          return;
        }

        setSavedPosts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Saved Posts
      </h2>

      {loading && <p className="text-gray-600">Loading saved posts...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && !savedPosts.length && (
        <p className="text-gray-600">You have no saved posts yet.</p>
      )}

      {!loading && !error && savedPosts.length > 0 && (
        <div className="space-y-10">
          {savedPosts.map((post) => (
            <SavedPostItem
              key={post._id}
              title={post.title}
              excerpt={`${post.content?.slice(0, 120) || "No excerpt"}${
                post.content?.length > 120 ? "..." : ""
              }`}
              author={post.author?.name || "Unknown Author"}
              date={new Date(post.createdAt).toDateString()}
              imageUrl={post.coverImage || "/images/awash.jpg"}
            />
          ))}
        </div>
      )}
    </section>
  );
}