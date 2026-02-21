import Image from "next/image";

function SavedPostItem({ title, excerpt, author, date, imageUrl }) {
  return (
    <div className="flex items-start gap-6">
      {/* Thumbnail */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-2 text-gray-600">
          {excerpt}
        </p>

        <p className="mt-2 text-sm text-gray-500">
          {author} &nbsp;·&nbsp; {date}
        </p>
      </div>
    </div>
  );
}

export default function SavedPostsList() {
  return (
    <section className="rounded-2xl bg-white p-8 shadow-sm">
      <h2 className="mb-8 text-3xl font-bold text-gray-900">
        Saved Posts
      </h2>

      <div className="space-y-10">
        <SavedPostItem
          title="The Ultimate Guide to Tropical Paradise Islands"
          excerpt="Discover hidden gems in the Pacific and Caribbean that most travelers miss."
          author="Sarah Martinez"
          date="Feb 15, 2026"
          imageUrl="/island.jpg"
        />

        <SavedPostItem
          title="Mountain Hiking: Essential Tips for Beginners"
          excerpt="Everything you need to know before embarking on your first mountain adventure."
          author="James Wilson"
          date="Feb 12, 2026"
          imageUrl="/mountain.jpg"
        />
      </div>
    </section>
  );
}