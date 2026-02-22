"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Profile() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [bio, setBio] = useState("");
	const [profileImage, setProfileImage] = useState("");
	const [imageFileName, setImageFileName] = useState("");
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
					setError(data.message || "Failed to load profile settings");
					return;
				}

				setFullName(data.name || "");
				setEmail(data.email || "");
				setBio(data.bio || "");
				setProfileImage(data.profileImage || "");
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
				body: JSON.stringify({
					name: fullName,
					email,
					bio,
					profileImage,
				}),
			});

			const data = await res.json();

			if (!res.ok) {
				setError(data.message || "Failed to update profile");
				return;
			}

			setSuccess("Profile updated successfully");
		} catch (err) {
			setError(err.message || "Something went wrong");
		} finally {
			setSaving(false);
		}
	};

	const handleImageUpload = (event) => {
		const file = event.target.files?.[0];
		if (!file) return;

		if (!file.type.startsWith("image/")) {
			setError("Please select a valid image file");
			return;
		}

		setError("");
		setImageFileName(file.name);

		const reader = new FileReader();
		reader.onload = () => {
			setProfileImage(String(reader.result || ""));
		};
		reader.onerror = () => {
			setError("Failed to read image file");
		};
		reader.readAsDataURL(file);
	};

	if (loading) {
		return (
			<section className="rounded-3xl border border-[#D8E8ED] bg-white p-10 w-full mx-auto">
				<p className="text-gray-600">Loading profile settings...</p>
			</section>
		);
	}

	return (
		<section className="rounded-3xl border border-[#D8E8ED] bg-white p-10 w-full  mx-auto">
			<h2
				className="text-2xl font-bold text-gray-900"
				style={{ fontFamily: "var(--font-playfair-display)" }}
			>
				Profile Settings
			</h2>

			<div className="mt-10">
				<p className="text-xl font-medium text-gray-900">Profile Picture</p>

				<div className="mt-5 flex flex-wrap items-center gap-6">
					<Image
						src={profileImage || "/images/profile.jpg"}
						alt="Profile picture"
						width={10}
						height={10}
						className="h-16 w-16 rounded-full object-cover"
					/>

					<div>
							<label
								className="inline-flex cursor-pointer items-center gap-3 rounded-[18px] bg-[#0F4C5C] px-4 py-2 font-semibold text-white transition hover:bg-[#0C3D4A]"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									className="h-5 w-5"
								>
									<path d="M12 16V4" />
									<path d="m7 9 5-5 5 5" />
									<path d="M20 16.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2.5" />
								</svg>
								Upload Photo
								<input
									type="file"
									accept="image/*"
									className="hidden"
									onChange={handleImageUpload}
								/>
							</label>

							<p className="mt-3 text-slate-500">
								JPG, PNG or GIF. Max size 2MB.
							</p>
							{imageFileName && (
								<p className="mt-1 text-sm text-gray-500">
									Selected: {imageFileName}
								</p>
							)}
					</div>
				</div>
			</div>

			<form className="mt-8 space-y-8" onSubmit={handleSubmit}>
				{error && <p className="text-red-600">{error}</p>}
				{success && <p className="text-green-600">{success}</p>}

				<div>
					<label className="block font-medium text-gray-900">
						Profile Image Preview
					</label>
					<p className="mt-2 text-sm text-gray-500">
						Upload a photo above to update your profile image.
					</p>
				</div>
				<div>
					<label htmlFor="fullName" className="block font-medium text-gray-900">
						Full Name
					</label>
					<input
						id="fullName"
						type="text"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
						className="mt-3 w-full px-4 py-2 rounded-3xl border border-[#CFE2E8] bg-transparent  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
					/>
				</div>

				<div>
					<label htmlFor="email" className="block font-medium text-gray-900">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(event) => setEmail(event.target.value)}
						className="mt-3 w-full rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
					/>
				</div>

				<div>
					<label htmlFor="bio" className="block font-medium text-gray-900">
						Bio
					</label>
					<textarea
						id="bio"
						rows={5}
						maxLength={160}
						value={bio}
						onChange={(event) => setBio(event.target.value)}
						className="mt-3 w-full resize-none rounded-3xl border border-[#CFE2E8] bg-transparent px-4 py-2  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#0F4C5C]"
					/>
					<p className="mt-3  text-slate-500">
						Brief description for your profile. Max 160 characters.
					</p>
				</div>

				<button
					type="submit"
					disabled={saving}
					className="rounded-[18px] bg-[#0F4C5C] px-4 py-2 font-semibold text-white transition hover:bg-[#0C3D4A]"
				>
					{saving ? "Saving..." : "Save Changes"}
				</button>
			</form>
		</section>
	);
}
