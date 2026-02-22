"use client";

import { useEffect, useMemo, useState } from "react";

export default function StatsCards() {
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
          setError("Please login to view stats");
          return;
        }

        const res = await fetch("/api/user/stories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load stats");
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

  const stats = useMemo(() => {
    const totalPosts = posts.length;
    const totalViews = posts.reduce((acc, post) => acc + (post.views || 0), 0);
    const totalLikes = posts.reduce(
      (acc, post) => acc + (post.likes?.length || 0),
      0
    );

    return [
      { label: "Total Posts", value: totalPosts.toLocaleString() },
      { label: "Total Views", value: totalViews.toLocaleString() },
      { label: "Total Likes", value: totalLikes.toLocaleString() },
    ];
  }, [posts]);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-2xl mb-4">
        <p className="text-gray-600">Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-4 rounded-2xl mb-4">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white  p-4 rounded-2xl mb-4">
      <div className="grid md:grid-cols-3 gap-6 mb-8 ">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-100 rounded-2xl p-6"
        >
          <p className="text-gray-500 text-lg">{stat.label}</p>
          <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
        </div>
      ))}
    </div>
    </div>
  );
}