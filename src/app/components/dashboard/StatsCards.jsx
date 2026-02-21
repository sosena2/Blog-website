"use client";

export default function StatsCards() {
  const stats = [
    { label: "Total Posts", value: 4 },
    { label: "Total Views", value: "19,010" },
    { label: "Total Likes", value: 1181 },
  ];

  return (
    <div className="bg-white  p-4 rounded-2xl mb-4">
      <div className="grid md:grid-cols-3 gap-6 mb-8 ">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-gray-100 rounded-2xl p-6"
        >
          <p className="text-gray-500 text-lg">{stat.label}</p>
          <h2 className="text-3xl font-bold mt-2">{stat.value}</h2>
        </div>
      ))}
    </div>
    </div>
  );
}