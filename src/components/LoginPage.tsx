import { ArrowLeft, Eye, EyeOff, LockKeyhole, ShieldCheck } from "./icons"
import { useState, type FormEvent } from "react"
import { heroPhoto } from "../data/mockData"
import type { Role } from "../types"
import { Button, Field, Logo } from "./ui"

export default function LoginPage({
  onBack,
  onLogin,
  notify,
}: {
  onBack: () => void
  onLogin: (role: Role) => void
  notify: (message: string) => void
}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    setError("")
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) || !password)
      return setError("Enter a valid school email and password.")
    const normalized = email.toLowerCase()
    const role: Role =
      normalized.includes("principal") || normalized.includes("admin")
        ? "admin"
        : normalized.includes("teacher") || normalized.includes("faculty")
          ? "teacher"
          : "student"
    setLoading(true)
    window.setTimeout(() => onLogin(role), 450)
  }

  return (
    <div className="grid min-h-screen bg-white lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative hidden overflow-hidden bg-brand-900 lg:block">
        <img
          src={heroPhoto}
          alt="Amore students building friendships at school"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900 via-brand-900/75 to-brand-800/30" />
        <div className="relative flex h-full flex-col justify-between p-12 text-white">
          <Logo light />
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-widest">
              <ShieldCheck size={16} /> Secure school access
            </div>
            <h1 className="text-4xl font-bold leading-tight">
              Everything you need for a better school day.
            </h1>
            <p className="mt-4 leading-7 text-brand-100">
              One portal for Amore learners, teachers, and school leaders. Your
              role is recognized automatically from your school email.
            </p>
          </div>
          <p className="text-xs text-brand-200">
            Amore Integrated School · SY 2026–2027
          </p>
        </div>
      </div>
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between p-5 sm:p-8">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-800"
          >
            <ArrowLeft size={18} /> Back to home
          </button>
          <div className="lg:hidden">
            <Logo />
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center px-5 pb-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <div className="mb-4 inline-flex rounded-2xl bg-brand-50 p-3 text-brand-800">
                <LockKeyhole size={26} />
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-ink">
                Welcome back
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in with your Amore school account to continue.
              </p>
            </div>
            <form onSubmit={submit} className="space-y-5">
              <Field
                label="School email"
                type="email"
                autoComplete="email"
                placeholder="name@amore.edu.ph"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="relative">
                <Field
                  label="Password"
                  type={visible ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={visible ? "Hide password" : "Show password"}
                  onClick={() => setVisible(!visible)}
                  className="absolute bottom-2 right-2 rounded-lg p-2 text-slate-400 hover:text-brand-800"
                >
                  {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" className="size-4 accent-brand-800" />{" "}
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={() =>
                    notify(
                      "Please contact the ICT Office to reset your password.",
                    )
                  }
                  className="font-medium text-brand-800 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Signing in..." : "Sign in to portal"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
