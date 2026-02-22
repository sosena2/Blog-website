import { Suspense } from "react";
import WriteClient from "./WriteClient";

export default function WritePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F5F1EB] flex items-center justify-center px-4">
          <div className="text-sm text-gray-500">Loading editor...</div>
        </div>
      }
    >
      <WriteClient />
    </Suspense>
  );
}
        