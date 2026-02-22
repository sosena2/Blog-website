"use client";

import { useEffect, useState } from "react";

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
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	useEffect(() => {
		const fetchSettings = async () => {
			try {
				setLoading(true);
				setError("");

				const token = localStorage.getItem("token");
				if (!token) {
					setError("Please login to manage settings");
					return;
				}

				const res = await fetch("/api/user/settings", {
					headers: { Authorization: `Bearer ${token}` },
				});

				const data = await res.json();

				if (!res.ok) {
					setError(data.message || "Failed to load notification settings");
					return;
				}

				if (data.notifications) {
					setPreferences((current) =>
						current.map((item) => ({
							...item,
							enabled: Boolean(data.notifications[item.id]),
						}))
					);
				}
			} catch (err) {
				setError(err.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, []);

	const togglePreference = (id) => {
		setPreferences((current) =>
			current.map((item) =>
				item.id === id ? { ...item, enabled: !item.enabled } : item
			)
		);
	};

	const handleSave = async () => {
		try {
			setSaving(true);
			setError("");
			setSuccess("");

			const token = localStorage.getItem("token");
			if (!token) {
				setError("Please login to manage settings");
				return;
			}

			const notifications = preferences.reduce((acc, item) => {
				acc[item.id] = item.enabled;
				return acc;
			}, {});

			const res = await fetch("/api/user/settings", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ notifications }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Failed to update notifications");
				return;
			}

			setSuccess("Notification settings updated successfully");
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	if (loading) {
		return (
			<section className="rounded-3xl border border-gray-200 bg-white p-10 mt-10">
				<p className="text-gray-600">Loading notification settings...</p>
			</section>
		);
	}

	return (
		<section className="rounded-3xl border border-gray-200 bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Notification Preferences
			</h2>

			{error && <p className="mt-4 text-red-600">{error}</p>}
			{success && <p className="mt-4 text-green-600">{success}</p>}

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

			<button
				type="button"
				onClick={handleSave}
				disabled={saving}
				className="mt-8 rounded-[18px] bg-[#7A5AF8] px-4 py-2 font-semibold text-white transition hover:bg-[#6B4EF0]"
			>
				{saving ? "Saving..." : "Save Preferences"}
			</button>
		</section>
	);
}
