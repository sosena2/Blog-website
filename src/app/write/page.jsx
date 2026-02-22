"use client"
import { useState, useEffect } from "react"
import {X} from 'lucide-react'
import Button from "../components/ui/Button"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"

const Write = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const draftId = searchParams.get("draftId");
  const storyId = searchParams.get("storyId");
  const [isAuthed, setIsAuthed] = useState(false);
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
  });
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingDraft, setLoadingDraft] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
    setIsAuthed(true);
  }, [router]);

  useEffect(() => {
    const fetchDraft = async () => {
      if (!isAuthed) return;
      if (!draftId && !storyId) return;

      try {
        setLoadingDraft(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("You must be logged in to edit drafts");
          return;
        }

        const endpoint = draftId
          ? `/api/user/drafts/${draftId}`
          : `/api/user/stories/${storyId}`;

        const res = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load draft");
          return;
        }

        setForm({
          title: data.title || "",
          subtitle: data.subtitle || "",
          content: data.content || "",
        });
        setCoverImage(data.coverImage || "");
        setTags(data.tags || []);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoadingDraft(false);
      }
    };

    fetchDraft();
  }, [draftId, storyId, isAuthed]);

  // handlers
  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}))
  };

  const handleTagKeyDown = (e) =>{
    if (e.key !== 'Enter') return

    e.preventDefault();

    const cleaned = tagValue.trim();

    if(!cleaned || tags.includes(cleaned)) return;
    
    setTags((prev) => [...prev, cleaned]);
    setTagValue("");
  };
  // Remove tag

  const handleRemoveTag = (tagToRemove) =>{
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }

  const saveStory = async (status) => {
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if(!token){
      setError("You must be logged in to create story");
      return;
    }

    if (status === "published") {
      if(!form.title || !form.content){
        setError("Title and content are required");
        return;
      }

      if(!coverImage){
        setError("Cover image is required");
        return;
      }
    }

    try{
      const endpoint = draftId
        ? `/api/user/drafts/${draftId}`
        : storyId
        ? `/api/user/stories/${storyId}`
        : "/api/stories";
      const method = draftId || storyId ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          coverImage,
          tags,
          status,
        }),
      });

      const data = await res.json();

      if(!res.ok){
        setError(data.message || "Failed to create story");
        return;
      }

      if (status === "published") {
        setSuccess("Story published successfully");
        router.push(`/stories/${data.slug}`);
        return;
      }

      setSuccess("Draft saved successfully");
      router.push("/dashboard/drafts");
    } catch(err){
      setError(err.message || "something went wrong");
    }
  };

  const handleSubmit = async () => saveStory("published");

  const handleSaveDraft = async () => {
    if (!form.title && !form.content && !coverImage) {
      setError("Write something before saving draft");
      return;
    }

    return saveStory("draft");
  };

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-4 sm:px-6 py-10 sm:py-12">
      {/* Header */}

      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 max-w-5xl mx-auto mb-8'> 
        <p className='font-extrabold text-3xl sm:text-4xl' style={{ fontFamily: 'var(--font-playfair-display)' }}>Write a story</p> 
        <div className='flex flex-col sm:flex-row gap-3 sm:gap-4'> 
          <Button onClick={handleSaveDraft} className="bg-gray-300 text-black rounded-2xl px-4 py-2 w-full sm:w-auto">Save Draft</Button> 
          <Button onClick={handleSubmit} className="w-full sm:w-auto">Publish</Button> 
        </div> 
      </div>

      {/* Editor Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8 space-y-8">
        {/* Error/ success */}
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        {loadingDraft && <p className="text-gray-500">Loading draft...</p>}

        {/* Cover Image URL */}
        <div>
          <p className="font-semibold mb-3">Cover Image URL</p>

          <input
            type="text"
            placeholder="Paste image URL (Unsplash, etc...)"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-1 focus:ring-gray-400"
          />

          {/* Image Preview */}
          {coverImage && coverImage.startsWith("http") && (
            <div className="mt-4 relative">
              <Image
                src={coverImage}
                alt="preview"
                width={800}
                height={400}
                className="w-full h-80 object-cover rounded-2xl"
              />
              <button
                onClick={() => setCoverImage("")}
                className="absolute top-3 right-3 bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
              >
                Remove
              </button>
            </div>
          )}
        </div>
        
      {/* TITLE */}
        <input
          type="text"
          name="title"
          placeholder="Story Title..."
          value={form.title}
          onChange={handleChange}
          className="w-full text-3xl font-bold border-b pb-2 outline-none"
        />
        {/* SUBTITLE */}
        <input
          type="text"
          name="subtitle"
          placeholder="Write a subtitle..."
          value={form.subtitle}
          onChange={handleChange}
          className="w-full text-lg text-gray-600 border-b pb-2 outline-none"
        />
        {/* CONTENT */}
        <textarea
          name="content"
          placeholder="Start writing your story..."
          value={form.content}
          onChange={handleChange}
          rows={10}
          className="w-full resize-none outline-none leading-relaxed"
        />
         {/* TAGS */}
        <div>
          <p className="font-medium mb-2">Tags</p>

          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 bg-[#0F4C5C] text-white px-3 py-1 rounded-full text-sm"
              >
                #{tag}
                <button onClick={() => handleRemoveTag(tag)}>
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <input
            type="text"
            placeholder="Press Enter to add tag"
            value={tagValue}
            onChange={(e) => setTagValue(e.target.value)}
            onKeyDown={handleTagKeyDown}
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#0F4C5C]"
          />
        </div>
      </div>
    </div>
  )
}

export default Write