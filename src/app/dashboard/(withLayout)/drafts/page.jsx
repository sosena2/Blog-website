"use client";
import DraftCard from "../../../components/dashboard/DraftsCard";

export default function Drafts() {
  return (
    <div className="space-y-6 w-[96%] mx-auto mt-10">
      <DraftCard
        title="Sacred Spaces: A Journey Through Asian Temples"
        description="Discovering the spiritual and architectural beauty of temples across Asia."
        lastEdited="Feb 5, 2026"
        imageUrl="/temple.jpg" 
        onContinue={() => console.log("Continue writing")}
        onDelete={() => console.log("Delete draft")}
      />
      <DraftCard
        title="Sacred Spaces: A Journey Through Asian Temples"
        description="Discovering the spiritual and architectural beauty of temples across Asia."
        lastEdited="Feb 5, 2026"
        imageUrl="/temple.jpg"
        onContinue={() => console.log("Continue writing")}
        onDelete={() => console.log("Delete draft")}
      />
    </div>
  );
}