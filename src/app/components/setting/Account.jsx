"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const languages = ["English", "Spanish", "French", "Portuguese"];
const timezones = [
	"UTC-05:00 Eastern Time",
	"UTC-06:00 Central Time",
	"UTC-08:00 Pacific Time",
	"UTC+00:00 Greenwich Mean Time",
];

export default function Account() {
	const router = useRouter();
	const [username, setUsername] = useState("");
	const [language, setLanguage] = useState("English");
	const [timezone, setTimezone] = useState("UTC-05:00 Eastern Time");
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [loggingOut, setLoggingOut] = useState(false);
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
					setError(data.message || "Failed to load account settings");
					return;
				}

				setUsername(data.username || "");
				setLanguage(data.language || "English");
				setTimezone(data.timezone || "UTC-05:00 Eastern Time");
			} catch (err) {
				setError(err.message || "Something went wrong");
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, []);

	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			setSaving(true);
			setError("");
			setSuccess("");

			const token = localStorage.getItem("token");
			if (!token) {
				setError("Please login to manage settings");
				return;
			}

			const res = await fetch("/api/user/settings", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({ username, language, timezone }),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Failed to update account settings");
				return;
			}

			setSuccess("Account settings updated successfully");
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	const handleLogout = async () => {
		try {
			setLoggingOut(true);
			setError("");
			setSuccess("");

			const res = await fetch("/api/auth/logout", {
				method: "POST",
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Failed to logout");
				return;
			}

			localStorage.removeItem("token");
			router.push("/login");
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setLoggingOut(false);
		}
	};

	if (loading) {
		return (
			<section className="rounded-3xl border border-[#D8E8ED] bg-white p-10 mt-10">
				<p className="text-gray-600">Loading account settings...</p>
			</section>
		);
	}

	return (
		<section className="rounded-3xl border border-[#D8E8ED] bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Account Settings
			</h2>

			<form className="mt-10 space-y-8" onSubmit={handleSubmit}>
				{error && <p className="text-red-600">{error}</p>}
				{success && <p className="text-green-600">{success}</p>}
				<div>
					<label htmlFor="username" className="block font-medium text-gray-900">
						Username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
					/>
				</div>

				<div>
					<label htmlFor="language" className="block font-medium text-gray-900">
						Language
					</label>
					<select
						id="language"
						value={language}
						onChange={(event) => setLanguage(event.target.value)}
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none focus:border-[#0F4C5C]"
					>
						{languages.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div>
					<label htmlFor="timezone" className="block font-medium text-gray-900">
						Timezone
					</label>
					<select
						id="timezone"
						value={timezone}
						onChange={(event) => setTimezone(event.target.value)}
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none focus:border-[#0F4C5C]"
					>
						{timezones.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<div className="flex items-center gap-3">
					<button
						type="submit"
						disabled={saving || loggingOut}
						className="rounded-[18px] bg-[#0F4C5C] px-4 py-2 font-semibold text-white transition hover:bg-[#0C3D4A]"
					>
						{saving ? "Saving..." : "Save Changes"}
					</button>

					<button
						type="button"
						onClick={handleLogout}
						disabled={loggingOut || saving}
						className="rounded-[18px] border border-[#BFD8E0] bg-[#EAF5F8] px-4 py-2 font-semibold text-[#0F4C5C] transition hover:bg-[#DDEDF2]"
					>
						{loggingOut ? "Logging out..." : "Logout"}
					</button>
				</div>
			</form>
		</section>
	);
}
