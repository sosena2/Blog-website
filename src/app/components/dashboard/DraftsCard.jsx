import Image from "next/image";
import Link from "next/link";

export default function DraftCard({
  title,
  description,
  lastEdited,
  imageUrl,
  onContinue,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between gap-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Left content */}
      <div className="flex-1">
        {/* Draft badge */}
        <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
          Draft
        </span>

        {/* Title */}
        <h2 className="mt-3 text-2xl font-semibold text-gray-900">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-2 text-gray-600">
          {description}
        </p>

        {/* Last edited */}
        <p className="mt-4 text-sm text-gray-500">
          Last edited: {lastEdited}
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={onContinue}
            className="rounded-full bg-[#0F4C5C] px-6 py-3 text-white font-medium hover:bg-[#0C3D4A] transition"
          >
            <Link href="/write">Continue Writing</Link>
          </button>

          <button
            onClick={onDelete}
            className="rounded-full border border-red-200 bg-red-50 px-6 py-3 text-red-700 font-medium hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Right image */}
      <div className="relative h-28 w-40 overflow-hidden rounded-xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}