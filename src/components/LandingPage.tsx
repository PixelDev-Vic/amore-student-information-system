import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Menu,
  X,
} from "./icons"
import { useState } from "react"
import { heroPhoto } from "../data/mockData"
import type { Announcement } from "../types"
import { Button, Card, Logo } from "./ui"
import SchoolFeed from "./SchoolFeed"

export default function LandingPage({
  onLogin,
  announcements,
}: {
  onLogin: () => void
  announcements: Announcement[]
}) {
  const [menu, setMenu] = useState(false)
  const links = [
    ["About", "#about"],
    ["News & events", "#school-blog"],
    ["Contact", "#contact"],
  ]
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center px-5 lg:px-8">
          <Logo />
          <nav className="ml-auto hidden items-center gap-7 md:flex">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="text-sm font-medium text-slate-600 hover:text-brand-800"
              >
                {label}
              </a>
            ))}
            <Button onClick={onLogin}>
              Sign in <ArrowRight size={17} />
            </Button>
          </nav>
          <button
            className="ml-auto rounded-xl p-2 md:hidden"
            aria-label="Toggle navigation"
            onClick={() => setMenu(!menu)}
          >
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && (
          <nav className="border-t border-slate-100 p-4 md:hidden">
            {links.map(([label, href]) => (
              <a
                key={label}
                href={href}
                onClick={() => setMenu(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-brand-50"
              >
                {label}
              </a>
            ))}
            <Button className="mt-2 w-full" onClick={onLogin}>
              Sign in
            </Button>
          </nav>
        )}
      </header>

      <section className="relative isolate min-h-[650px] overflow-hidden bg-brand-900 text-white">
        <img
          src={heroPhoto}
          alt="Students learning together at school"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-900 via-brand-900/90 to-brand-800/40" />
        <div className="mx-auto grid min-h-[650px] max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest backdrop-blur">
              <CalendarDays size={16} /> School Year 2026–2027
            </div>
            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Welcome to Amore Integrated School.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-brand-50 sm:text-lg">
              We’re glad you’re here. Find school news and important dates, learn
              about life at Amore, or sign in to the student and family portal.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#about"
                className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-semibold text-brand-900 hover:bg-brand-50"
              >
                About our school <ArrowRight size={18} />
              </a>
              <a
                href="#school-blog"
                className="inline-flex min-h-10 items-center rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
              >
                News &amp; events
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-brand-100">
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} /> For our learners
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} /> For our families
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={17} /> For our community
              </span>
            </div>
          </div>
          <Card className="hidden border-white/15 bg-white/10 p-6 text-white shadow-2xl backdrop-blur lg:block">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-brand-100">
                  Coming up at Amore
                </p>
                <h2 className="mt-1 text-xl font-bold">School calendar</h2>
              </div>
              <div className="rounded-xl bg-white/15 p-3">
                <CalendarDays />
              </div>
            </div>
            <div className="divide-y divide-white/15">
              {[
                ["Aug 28", "Quarter 1 Parent–Teacher Conference"],
                ["Sep 7–11", "Quarter 1 Examinations"],
                ["Sep 18", "Science Month Celebration"],
              ].map(([date, event]) => (
                <div key={event} className="flex gap-4 py-4 first:pt-0 last:pb-0">
                  <span className="w-16 shrink-0 text-sm font-bold text-brand-100">{date}</span>
                  <span className="text-sm font-medium text-white">{event}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 border-b border-slate-100 bg-brand-50/60 py-16 sm:py-20">
        <div className="mx-auto grid min-h-[320px] max-w-7xl items-center gap-10 px-5 lg:grid-cols-[1.2fr_.8fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              About Amore Integrated School
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Amore Integrated School is part of the Brgy. San Isidro community
              in Quezon City. We work alongside learners and families through
              each school year, in the classroom and beyond.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-2xl bg-white p-5">
              <h3 className="font-semibold text-ink">Visit the school</h3>
              <p className="mt-2 text-sm text-slate-600">
                Brgy. San Isidro, Quezon City
              </p>
            </div>
            <div className="rounded-2xl bg-white p-5">
              <h3 className="font-semibold text-ink">School office</h3>
              <p className="mt-2 text-sm text-slate-600">
                Monday–Friday, 7:00 AM–6:00 PM
              </p>
            </div>
          </div>
        </div>
      </section>

      <SchoolFeed announcements={announcements} />

      <footer id="contact" className="bg-brand-900 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-3 lg:px-8">
          <div>
            <Logo light />
            <p className="mt-5 max-w-sm text-sm leading-6 text-brand-100">
              A place for our learners to learn, grow, and take part in school life.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <div className="mt-4 space-y-2 text-sm text-brand-100">
              <p>Brgy. San Isidro, Quezon City</p>
              <p>(02) 8123 4567</p>
              <p>support@amore.edu.ph</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">School hours</h3>
            <div className="mt-4 space-y-2 text-sm text-brand-100">
              <p>School Year 2026–2027</p>
              <p>Monday–Friday, 7:00 AM–6:00 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 py-5 text-center text-xs text-brand-200">
          © 2026 Amore Integrated School. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
