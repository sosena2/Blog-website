"use client";
import SettingSidebar from "../../components/setting/SettingSidebar";

export default function Setting({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F1EB] px-8 py-12 mt-6">

      <SettingSidebar />

      <div className=" mx-auto">{children}</div>

    </div>
  );
}