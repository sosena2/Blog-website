"use client";

import { useState } from "react";

const initialPreferences = [
	{
		id: "comments",
		title: "Comments",
		description: "Notify me when someone comments on my posts",
		enabled: true,
	},
	{
		id: "likes",
		title: "Likes",
		description: "Notify me when someone likes my posts",
		enabled: true,
	},
	{
		id: "followers",
		title: "New Followers",
		description: "Notify me when someone follows me",
		enabled: true,
	},
];

export default function Notification() {
	const [preferences, setPreferences] = useState(initialPreferences);

	const togglePreference = (id) => {
		setPreferences((current) =>
			current.map((item) =>
				item.id === id ? { ...item, enabled: !item.enabled } : item
			)
		);
	};

	return (
		<section className="rounded-3xl border border-gray-200 bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Notification Preferences
			</h2>

			<div className="mt-8 space-y-6">
				{preferences.map((item) => (
					<div
						key={item.id}
						className="flex items-start justify-between rounded-3xl border border-gray-300 bg-transparent px-4 py-2"
					>
						<div>
							<h3 className="font-medium text-gray-900">{item.title}</h3>
							<p className="mt-2 text-slate-500">{item.description}</p>
						</div>

						<button
							type="button"
							aria-label={`Toggle ${item.title} notifications`}
							aria-pressed={item.enabled}
							onClick={() => togglePreference(item.id)}
							className={`relative inline-flex h-7 w-14 shrink-0 items-center rounded-full p-1 transition ${
								item.enabled ? "bg-[#7A5AF8]" : "bg-gray-300"
							}`}
						>
							<span
								className={`h-5 w-5 rounded-full bg-white transition ${
									item.enabled ? "translate-x-8" : "translate-x-0"
								}`}
							/>
						</button>
					</div>
				))}
			</div>
		</section>
	);
}
