"use client";

import { useState } from "react";

export default function Password() {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

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

			const res = await fetch("/api/user/password", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					currentPassword,
					newPassword,
					confirmPassword,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Failed to update password");
				return;
			}

			setSuccess("Password updated successfully");
			setCurrentPassword("");
			setNewPassword("");
			setConfirmPassword("");
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	return (
		<section className="rounded-3xl border border-[#D8E8ED] bg-white p-10 mt-10">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Change Password
			</h2>

			<form className="mt-10 space-y-8" onSubmit={handleSubmit}>
				{error && <p className="text-red-600">{error}</p>}
				{success && <p className="text-green-600">{success}</p>}
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
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
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
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
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
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
					/>
				</div>

				<button
					type="submit"
					disabled={saving}
					className="rounded-3xl bg-[#0F4C5C] px-4 py-2 font-semibold text-white transition hover:bg-[#0C3D4A]"
				>
					{saving ? "Updating..." : "Update Password"}
				</button>
			</form>
		</section>
	);
}
