"use client";

import { useState } from "react";

export default function Password() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	return (
		<section className="rounded-3xl border border-gray-200 bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Change Password
			</h2>

			<form className="mt-10 space-y-8">
				<div>
					<label
						htmlFor="currentPassword"
						className="block font-medium text-gray-900"
					>
						Current Password
					</label>
					<input
						id="currentPassword"
						type="password"
						value={currentPassword}
						onChange={(event) => setCurrentPassword(event.target.value)}
						placeholder="Enter current password"
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
					/>
				</div>

				<div>
					<label htmlFor="newPassword" className="block font-medium text-gray-900">
						New Password
					</label>
					<input
						id="newPassword"
						type="password"
						value={newPassword}
						onChange={(event) => setNewPassword(event.target.value)}
						placeholder="Enter new password"
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
					/>
				</div>

				<div>
					<label
						htmlFor="confirmPassword"
						className="block font-medium text-gray-900"
					>
						Confirm New Password
					</label>
					<input
						id="confirmPassword"
						type="password"
						value={confirmPassword}
						onChange={(event) => setConfirmPassword(event.target.value)}
						placeholder="Confirm new password"
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
					/>
				</div>

				<button
					type="submit"
					className="rounded-3xl bg-[#7A5AF8] px-4 py-2 font-semibold text-white transition hover:bg-[#6B4EF0]"
				>
					Update Password
				</button>
			</form>
		</section>
	);
}
