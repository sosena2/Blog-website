"use client";
import DashboardSidebar from "@/app/components/dashboard/DashboardSidebar";

export default function Dashboard({ children }) {
  return (
    <div className="min-h-screen bg-[#F5F1EB] px-8 py-12 mt-6">

      <DashboardSidebar />

      <div className=" mx-auto">{children}</div>

    </div>
  );
}