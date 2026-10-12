import { useMemo, useState } from "react"
import type { Announcement } from "../types"

const sampleStories = [
  {
    id: "science-month",
    category: "Event",
    title: "Young scientists get ready to share big ideas",
    summary:
      "Science Month is bringing student experiments, a quiz bee, and hands-on exhibits to the school quadrangle.",
    author: "Amore Science Club",
    date: "Aug 24, 2026",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=85",
    alt: "Students learning together in a classroom",
  },
  {
    id: "reading-corner",
    category: "Campus life",
    title: "A quieter corner for the next great read",
    summary:
      "The library’s reading corner is ready for learners looking for a calm place to study, browse, and recharge.",
    author: "Amore Library",
    date: "Aug 21, 2026",
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=85",
    alt: "Books arranged for a school reading corner",
  },
  {
    id: "school-community",
    category: "Community",
    title: "One school community, many ways to get involved",
    summary:
      "Meet the clubs and school groups creating ways for learners and families to take part this term.",
    author: "Amore Student Council",
    date: "Aug 19, 2026",
    image:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=85",
    alt: "School community gathered for an activity",
  },
]

const announcementImages = [
  "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=85",
]

export default function SchoolFeed({
  announcements,
}: {
  announcements: Announcement[]
}) {
  const [filter, setFilter] = useState("All stories")
  const stories = useMemo(
    () => [
      ...sampleStories.map((story) => ({ ...story, category: story.category })),
      ...announcements
        .filter((item) => item.status === "Approved")
        .map((item, index) => ({
          id: `announcement-${item.id}`,
          category: "Announcement",
          title: item.title,
          summary: item.message,
          author: item.author,
          date: item.date,
          image: announcementImages[index % announcementImages.length],
          alt: "A glimpse of school life at Amore",
        })),
    ],
    [announcements],
  ),
  visibleStories =
    filter === "All stories"
      ? stories
      : stories.filter((story) =>
          filter === "Events"
            ? story.category === "Event"
            : story.category !== "Event",
        )

  const [featured, ...moreStories] = visibleStories

  return (
    <section id="school-blog" className="scroll-mt-20 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-brand-700">
              From classrooms, clubs, and school offices
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              News from Amore
            </h2>
            <p className="mt-3 max-w-2xl text-slate-600">
              School stories, event photos, and notices for learners and families.
            </p>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label="Filter school stories">
          {["All stories", "Events", "Updates"].map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={filter === option}
              onClick={() => setFilter(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                filter === option
                  ? "bg-brand-800 text-white"
                  : "bg-white text-slate-600 hover:bg-brand-50 hover:text-brand-800"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        {featured ? (
          <>
            <article className="grid overflow-hidden rounded-2xl border border-slate-200 bg-white md:grid-cols-[1.1fr_.9fr]">
              <img
                src={featured.image}
                alt={featured.alt}
                className="h-64 w-full object-cover md:h-full md:min-h-[340px]"
              />
              <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
                <span className="w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand-800">
                  {featured.category}
                </span>
                <p className="mt-5 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {featured.date} <span aria-hidden="true">·</span> {featured.author}
                </p>
                <h3 className="mt-3 text-2xl font-bold leading-tight text-ink sm:text-3xl">
                  {featured.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {featured.summary}
                </p>
              </div>
            </article>

            {moreStories.length > 0 && (
              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {moreStories.map((story) => (
                  <article
                    key={story.id}
                    className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                  >
                    <img
                      src={story.image}
                      alt={story.alt}
                      loading="lazy"
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-5">
                      <span className="text-xs font-bold uppercase tracking-wide text-brand-700">
                        {story.category}
                      </span>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-ink">
                        {story.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {story.summary}
                      </p>
                      <p className="mt-4 text-xs font-medium text-slate-400">
                        {story.date} · {story.author}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
            <h3 className="font-semibold text-ink">No stories in this filter yet</h3>
            <p className="mt-1 text-sm text-slate-500">Choose another filter to browse school updates.</p>
          </div>
        )}
      </div>
    </section>
  )
}
