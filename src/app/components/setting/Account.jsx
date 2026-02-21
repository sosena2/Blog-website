"use client";

import { useState } from "react";

const languages = ["English", "Spanish", "French", "Portuguese"];
const timezones = [
	"UTC-05:00 Eastern Time",
	"UTC-06:00 Central Time",
	"UTC-08:00 Pacific Time",
	"UTC+00:00 Greenwich Mean Time",
];

export default function Account() {
	const [username, setUsername] = useState("sarah-martinez");
	const [language, setLanguage] = useState("English");
	const [timezone, setTimezone] = useState("UTC-05:00 Eastern Time");

	return (
		<section className="rounded-3xl border border-gray-200 bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Account Settings
			</h2>

			<form className="mt-10 space-y-8">
				<div>
					<label htmlFor="username" className="block font-medium text-gray-900">
						Username
					</label>
					<input
						id="username"
						type="text"
						value={username}
						onChange={(event) => setUsername(event.target.value)}
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
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
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none focus:border-[#7A5AF8]"
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
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none focus:border-[#7A5AF8]"
					>
						{timezones.map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</select>
				</div>

				<button
					type="submit"
					className="rounded-[18px] bg-[#7A5AF8] px-4 py-2 font-semibold text-white transition hover:bg-[#6B4EF0]"
				>
					Save Changes
				</button>
			</form>
		</section>
	);
}
