"use client";

import { useState } from "react";
import Image from "next/image";

export default function Profile() {
	const [fullName, setFullName] = useState("Sarah Martinez");
	const [email, setEmail] = useState("sarah.martinez@example.com");
	const [bio, setBio] = useState(
		"Travel blogger and ocean lover. Sharing tropical adventures from around the world."
	);

	return (
		<section className="rounded-3xl border border-gray-200 bg-white p-10 w-full  mx-auto">
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
						src="/images/profile.jpg"
						alt="Profile picture"
						width={10}
						height={10}
						className="h-16 w-16 rounded-full object-cover"
					/>

					<div>
						<button
							type="button"
							className="inline-flex items-center gap-3 rounded-[18px] bg-[#7A5AF8] px-4 py-2  font-semibold text-white transition hover:bg-[#6B4EF0]"
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
						</button>

						<p className="mt-3  text-slate-500">
							JPG, PNG or GIF. Max size 2MB.
						</p>
					</div>
				</div>
			</div>

			<form className="mt-8 space-y-8">
				<div>
					<label htmlFor="fullName" className="block font-medium text-gray-900">
						Full Name
					</label>
					<input
						id="fullName"
						type="text"
						value={fullName}
						onChange={(event) => setFullName(event.target.value)}
						className="mt-3 w-full px-4 py-2 rounded-3xl border border-gray-300 bg-transparent  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
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
						className="mt-3 w-full rounded-3xl border border-gray-300 bg-transparent px-4 py-2  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
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
						className="mt-3 w-full resize-none rounded-3xl border border-gray-300 bg-transparent px-4 py-2  text-gray-900 outline-none placeholder:text-gray-400 focus:border-[#7A5AF8]"
					/>
					<p className="mt-3  text-slate-500">
						Brief description for your profile. Max 160 characters.
					</p>
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
