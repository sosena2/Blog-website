import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'

const display = Playfair_Display({
	subsets: ['latin'],
	weight: ['400', '600', '700'],
	variable: '--font-display',
})

const body = Plus_Jakarta_Sans({
	subsets: ['latin'],
	weight: ['400', '500', '600', '700'],
	variable: '--font-body',
})

const AuthLayout = ({ children }) => {
	return (
		<section
			className={`${display.variable} ${body.variable} relative min-h-screen bg-[#f7f1e8] font-(--font-body)`}
		>
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-[#f0d9c8]/70 blur-3xl" />
				<div className="absolute -bottom-24 right-10 h-56 w-56 rounded-full bg-[#e7e0f5]/70 blur-3xl" />
				<div className="absolute inset-0 " />
			</div>

			<div className="relative mx-auto flex min-h-screen w-full max-w-lg flex-col px-6 py-10">
				<div className="text-center">
					<p className="text-sm uppercase tracking-[0.4em] text-neutral-500">Wanderlust</p>
					<h1 className="mt-3 text-4xl font-semibold text-neutral-900 sm:text-5xl">
						Travel stories, curated for you
					</h1>
					<p className="mt-3 text-base text-neutral-600">
						Sign in to save reads, build collections, and publish your own journeys.
					</p>
				</div>

				<div className="mt-10 flex-1">{children}</div>
			</div>
		</section>
	)
}

export default AuthLayout
