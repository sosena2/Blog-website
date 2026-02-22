'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

const StoryDetailsPage = () => {
  const { slug } = useParams()
  const [story, setStory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!slug) return

    const fetchStory = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await fetch(`/api/stories/${slug}`)
        const data = await res.json()

        if (!res.ok) {
          setError(data.error || data.message || 'Failed to load story')
          return
        }

        setStory(data)
      } catch (err) {
        setError(err.message || 'Something went wrong while loading story')
      } finally {
        setLoading(false)
      }
    }

    fetchStory()
  }, [slug])

  if (loading) {
    return (
      <section className="min-h-screen bg-[#F5F1EB] px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm">
          <p className="text-gray-600">Loading story...</p>
        </div>
      </section>
    )
  }

  if (error || !story) {
    return (
      <section className="min-h-screen bg-[#F5F1EB] px-6 py-16">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-sm space-y-4">
          <p className="text-red-600">{error || 'Story not found'}</p>
          <Link href="/explore" className="inline-block text-[#0F4C5C] font-medium">
            ← Back to Explore
          </Link>
        </div>
      </section>
    )
  }

  const createdAt = story.createdAt ? new Date(story.createdAt).toDateString() : 'Recently published'

  return (
    <section className="min-h-screen bg-[#F5F1EB] px-6 py-12">
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-8 md:p-10 space-y-8">
        <Link href="/explore" className="inline-block text-sm text-[#0F4C5C] font-medium">
          ← Back to Explore
        </Link>

        <header className="space-y-4">
          <h1 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'var(--font-playfair-display)' }}>
            {story.title}
          </h1>

          {story.subtitle && <p className="text-lg text-gray-600">{story.subtitle}</p>}

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span>{story.author?.name || 'Unknown Author'}</span>
            <span>•</span>
            <span>{createdAt}</span>
          </div>

          {story.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {story.tags.map((tag) => (
                <span key={tag} className="bg-[#0F4C5C] text-white px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="relative w-full h-64 md:h-105 rounded-2xl overflow-hidden">
          <Image
            src={story.coverImage || '/images/awash.jpg'}
            alt={story.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="text-[17px] leading-8 text-gray-800 whitespace-pre-line">{story.content}</div>
      </article>
    </section>
  )
}

export default StoryDetailsPage
