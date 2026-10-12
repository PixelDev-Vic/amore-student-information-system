import {
  Bell,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Search,
  X,
} from "./icons"
import { useState, type ReactNode } from "react"
import type { LucideIcon } from "./icons"
import type { Role } from "../types"
import { IconButton, Logo } from "./ui"

export interface NavItem {
  id: string
  label: string
  icon: LucideIcon
}

export default function AppShell({
  role,
  name,
  nav,
  active,
  setActive,
  onSignOut,
  children,
}: {
  role: Role
  name: string
  nav: NavItem[]
  active: string
  setActive: (id: string) => void
  onSignOut: () => void
  children: ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notices, setNotices] = useState(false)
  const roleLabel =
    role === "admin"
      ? "Principal / Admin"
      : role === "teacher"
        ? "Teacher"
        : "Student"

  const sidebar = (
    <div className="flex h-full flex-col bg-brand-900 text-white">
      <div className="flex h-20 items-center justify-between border-b border-white/10 px-4">
        <span className={collapsed ? "hidden lg:block" : ""}>
          <Logo light />
        </span>
        <IconButton
          label="Close navigation"
          className="text-white hover:bg-white/10 hover:text-white lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X size={20} />
        </IconButton>
      </div>
      <div className="px-3 py-5">
        <div
          className={`mb-3 px-3 text-[11px] font-semibold uppercase tracking-widest text-brand-200 ${
            collapsed ? "lg:hidden" : ""
          }`}
        >
          {roleLabel}
        </div>
        <nav className="space-y-1">
          {nav.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              title={collapsed ? label : undefined}
              onClick={() => {
                setActive(id)
                setMobileOpen(false)
              }}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                active === id
                  ? "bg-white text-brand-900 shadow-sm"
                  : "text-brand-50 hover:bg-white/10"
              }`}
            >
              <Icon size={19} className="shrink-0" />
              <span className={collapsed ? "lg:hidden" : ""}>{label}</span>
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t border-white/10 p-3">
        <button
          onClick={onSignOut}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-50 transition hover:bg-white/10"
        >
          <LogOut size={19} />
          <span className={collapsed ? "lg:hidden" : ""}>Sign out</span>
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8faf9]">
      <aside
        className={`no-print fixed inset-y-0 left-0 z-40 hidden transition-all duration-200 lg:block ${
          collapsed ? "w-20" : "w-64"
        }`}
      >
        {sidebar}
      </aside>
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-72 lg:hidden">
            {sidebar}
          </aside>
        </>
      )}
      <div
        className={`transition-all duration-200 ${
          collapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <header className="no-print sticky top-0 z-30 flex h-20 items-center gap-3 border-b border-slate-200/80 bg-white/95 px-4 backdrop-blur sm:px-6">
          <IconButton
            label="Open navigation"
            className="lg:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu size={21} />
          </IconButton>
          <IconButton
            label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:inline-flex"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </IconButton>
          <div className="relative hidden max-w-md flex-1 sm:block">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              aria-label="Search portal"
              placeholder="Search the portal..."
              className="w-full rounded-xl bg-slate-100 py-2.5 pl-10 pr-4 text-sm outline-none ring-brand-500 focus:ring-2"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <IconButton
                label="Notifications"
                onClick={() => setNotices(!notices)}
              >
                <Bell size={20} />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-brand-500" />
              </IconButton>
              {notices && (
                <div className="absolute right-0 top-12 w-80 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <div className="font-semibold text-ink">Notifications</div>
                  <p className="mt-2 text-sm text-slate-500">
                    Quarter 1 records are ready for review.
                  </p>
                  <p className="mt-2 border-t border-slate-100 pt-2 text-sm text-slate-500">
                    Science Month registration is open.
                  </p>
                </div>
              )}
            </div>
            <div className="ml-1 flex items-center gap-3 border-l border-slate-200 pl-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-800">
                {name
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-ink">{name}</div>
                <div className="text-xs text-slate-500">{roleLabel}</div>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
