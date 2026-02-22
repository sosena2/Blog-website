"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";

export default function Dashboard({ children }) {
  const router = useRouter();
  const hasWindow = typeof window !== "undefined";
  const token = hasWindow ? localStorage.getItem("token") : null;
  const isAuthed = !!token;

  useEffect(() => {
    if (hasWindow && !token) {
      router.replace("/login");
    }
  }, [hasWindow, token, router]);

  if (!isAuthed) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F1EB] px-8 py-12 mt-6">
      <DashboardSidebar />
      <div className="mx-auto">{children}</div>
    </div>
  );
}