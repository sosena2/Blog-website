"use client"
import { useState } from "react"
import {X} from 'lucide-react'
import Button from "../components/ui/Button"
import Image from "next/image"

const Write = () => {
  const [form, setForm] = useState({
    titile: "",
    subtitle: "",
    content: "",
  });
  const [coverImage, setCoverImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagValue, setTagValue] = useState("");

  // handlers

  const handleChange = (e) => {
    const {name, value} = e.target;
    setForm((prev) => ({...prev, [name]: value}))
  };

  // handle image upload
  const handleImage = (e) =>{
    const file = e.target.files[0];

    if(!file) return;

    const previewUrl = URL.createObjectURL(file);
    setCoverImage(previewUrl);
  };

  const handleTagKeyDown = (e) =>{
    if (e.key !== 'Enter') return

    e.preventDefault();

    const cleaned = tagValue.trim();

    if(!cleaned) return;
    if(tags.includes(cleaned)) return;

    setTags((prev) => [...prev, cleaned]);
    setTagValue("");
  }
  // Remove tag

  const handleRemoveTag = (tagToRemove) =>{
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-6 py-12">
      {/* Header */}

      <div className=' flex flex-row justify-between m-20'> 
        <p className='font-extrabold text-4xl' style={{ fontFamily: 'var(--font-playfair-display)' }}>Write a story</p> 
        <div className='flex gap-4'> 
          <Button className="bg-gray-300 text-black rounded-2xl px-4 py-2">Save Draft</Button> 
          <Button >Publish</Button> 
        </div> 
      </div>

      {/* Editor card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 space-y-8">
        
        {/* cover image */}
        <div>
          <p className="font-semibold mb-3 ">
          Cover Image
        </p>
        {!coverImage ? (
          <label className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-2xl cursor-pointer hover: bg-gray-50 transition">
            <span className="text-gray-500">
              Click to upload an image
            </span>
            <input type="file" 
            accept="image/*"
            onChange={handleImage}
            className="hidden" />
          </label>
        ) : (
          <div className="relative group">
            <Image 
            src={coverImage} 
            alt="preview"
            className="w=full h-80 object-cover rounded-2xl" 
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-2xl flex items-center justify-center gap-4">
                <label className="bg-white px-4 py-2 rounded-xl cursor-pointer">
                  Change
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => setCoverImage(null)}
                  className="bg-red-600 text-white px-4 py-2 rounded-xl"
                >
                  Remove
                </button>
              </div>
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
                className="flex items-center gap-2 bg-green-950 text-white px-3 py-1 rounded-full text-sm"
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
            className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-green-950"
          />
        </div>
      </div>
    </div>
  )
}

export default Write