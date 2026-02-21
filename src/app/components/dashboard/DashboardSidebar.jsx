import React from 'react'
import { FileText, Pencil, Bookmark, Settings, Edit3 } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

const DashboardSidebar = () => {
  return (
    <div>
        {/* ===== HEADER ===== */}
      <div className="max-w-6xl mx-auto flex justify-between items-start mb-12">
        <div>
          <h1
            className="text-4xl font-bold"
            style={{ fontFamily: "var(--font-playfair-display)" }}
          >
            Dashboard
          </h1>
          <p className="text-gray-500 text-xl mt-2">
            Manage your stories and account
          </p>
        </div>

        <Button className="flex gap-2 bg-gray-300 rounded-2xl px-4 py-2">
          <Edit3 size={20} />
          <Link href={'/write'}>Write New Post</Link>
        </Button>
      </div>


      {/* ===== CARD ===== */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-200 p-6">

        {/* Top Section (My Posts header inside card) */}
        <div className="bg-purple-100 text-purple-600 rounded-2xl px-6 py-4 flex items-center gap-3 mb-6">
          <FileText size={20} />
          <Link href={'/dashboard'}>My Posts</Link>  
        </div>

        {/* Menu Items */}
        <div className="space-y-8 text-lg">

          <div className="flex items-center gap-4 text-gray-800 hover:text-purple-600 cursor-pointer transition">
            <Pencil size={20} />
            <Link href={'/dashboard/drafts'}>Drafts</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-800 hover:text-purple-600 cursor-pointer transition">
            <Bookmark size={20} />
            <Link href={'/dashboard/saved'}>Saved</Link>
          </div>

          <div className="flex items-center gap-4 text-gray-800 hover:text-purple-600 cursor-pointer transition">
            <Settings size={20} />
            <Link href={'/dashboard/settings'}>Setting</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar