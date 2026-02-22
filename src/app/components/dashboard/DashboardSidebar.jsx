"use client";

import React from 'react'
import { FileText, Pencil, Bookmark, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const getItemClass = (isActive) =>
    `flex items-center gap-4 px-4 py-3 rounded-2xl transition ${
      isActive
        ? "bg-[#E2F3F7] text-[#0F4C5C] font-semibold"
        : "text-[#365865] hover:bg-[#ECF7FA] hover:text-[#0F4C5C]"
    }`;

  const isMyPostsActive = pathname === '/dashboard' || pathname === '/dashboard/';
  const isDraftsActive = pathname === '/dashboard/drafts' || pathname.startsWith('/dashboard/drafts/');
  const isSavedActive = pathname === '/dashboard/saved' || pathname.startsWith('/dashboard/saved/');
  const isSettingsActive = pathname === '/dashboard/settings' || pathname.startsWith('/dashboard/settings/');

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
      </div>


      {/* ===== CARD ===== */}
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-sm border border-[#D8E8ED] p-6">

        {/* Top Section */}
        <Link href={'/dashboard'} className={`${getItemClass(isMyPostsActive)} mb-6`}>
          <FileText size={20} />
          <span>My Posts</span>
        </Link>

        {/* Menu Items */}
        <div className="space-y-4 text-lg">

          <Link href={'/dashboard/drafts'} className={getItemClass(isDraftsActive)}>
            <Pencil size={20} />
            <span>Drafts</span>
          </Link>

          <Link href={'/dashboard/saved'} className={getItemClass(isSavedActive)}>
            <Bookmark size={20} />
            <span>Saved</span>
          </Link>

          <Link href={'/dashboard/settings'} className={getItemClass(isSettingsActive)}>
            <Settings size={20} />
            <span>Setting</span>
          </Link>

        </div>
      </div>
    </div>
  )
}

export default DashboardSidebar