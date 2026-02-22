"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Hero from "./components/home/Hero";
import FeaturedStories from "./components/home/FeaturedStories";
import LatestStories from "./components/home/LatestStories";
import Button from "./components/ui/Button";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthed(!!token);

    const fetchStories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("/api/stories");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load stories");
          return;
        }

        setStories(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const featuredStory = stories[0] || null;
  const latestStories = stories.slice(1);

  return (
    <div className="bg-[#F5F1EB] space-y-8 pb-10">
      <Hero />
      <FeaturedStories story={featuredStory} loading={loading} error={error} />
      <LatestStories stories={latestStories} loading={loading} error={error} />
      {!isAuthed && (
        <section className='w-[90%] mx-auto'>
          <div className='bg-white rounded-3xl p-6 md:p-10 shadow-xl border border-gray-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-6'>
            <div className='space-y-2'>
              <p className='text-sm uppercase tracking-[0.2em] text-gray-500'>Join the journey</p>
              <h3 className='text-2xl md:text-3xl font-bold text-[#0F4C5C]'>Create your account</h3>
              <p className='text-gray-600 max-w-xl'>Save favorites, publish your own stories, and keep your drafts safe in one place.</p>
            </div>
            <Link href='/register'>
              <Button className='rounded-2xl px-6 py-3'>Create account</Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
