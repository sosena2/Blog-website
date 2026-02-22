"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DraftCard from "../../../components/dashboard/DraftsCard";

export default function Drafts() {
  const router = useRouter();
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login to view drafts");
          return;
        }

        const res = await fetch("/api/user/drafts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.message || "Failed to load drafts");
          return;
        }

        setDrafts(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 w-[96%] mx-auto mt-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-gray-600">
          Loading drafts...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 w-[96%] mx-auto mt-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-red-600">
          {error}
        </div>
      </div>
    );
  }

  if (!drafts.length) {
    return (
      <div className="space-y-6 w-[96%] mx-auto mt-10">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-gray-600">
          You have no drafts yet.
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 w-[96%] mx-auto mt-10">
      {drafts.map((draft) => (
        <DraftCard
          key={draft._id}
          title={draft.title}
          description={`${draft.content?.slice(0, 120) || "No content"}${
            draft.content?.length > 120 ? "..." : ""
          }`}
          lastEdited={new Date(draft.updatedAt).toDateString()}
          imageUrl={draft.coverImage || "/images/awash.jpg"}
          onContinue={() => router.push(`/write?draftId=${draft._id}`)}
          onDelete={() => console.log("Delete draft", draft.slug)}
        />
      ))}
    </div>
  );
}