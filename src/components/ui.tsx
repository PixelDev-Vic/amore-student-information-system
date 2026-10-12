import { X } from "./icons"
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
} from "react"
import { useEffect } from "react"
import type { ToastMessage } from "../types"

export function Button({
  className = "",
  variant = "primary",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger"
}) {
  const styles = {
    primary: "bg-brand-800 text-white hover:bg-brand-900 shadow-sm",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:border-brand-500 hover:text-brand-800",
    ghost: "text-slate-600 hover:bg-brand-50 hover:text-brand-800",
    danger: "bg-red-600 text-white hover:bg-red-700",
  }
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function IconButton({
  label,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      aria-label={label}
      title={label}
      className={`inline-flex size-10 items-center justify-center rounded-xl text-slate-600 transition hover:bg-brand-50 hover:text-brand-800 ${className}`}
      {...props}
    />
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_32px_rgba(20,83,45,0.05)] ${className}`}
    >
      {children}
    </div>
  )
}

export function Heading({
  title,
  description,
  action,
}: {
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-slate-500">{description}</p>
        )}
      </div>
      {action}
    </div>
  )
}

export function Field({
  label,
  error,
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      <input
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 transition placeholder:text-slate-400 focus:border-brand-600 focus:outline-none ${
          error ? "border-red-400" : "border-slate-200"
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      )}
    </label>
  )
}

export function SelectField({
  label,
  children,
  className = "",
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  children: ReactNode
}) {
  return (
    <label className="block text-sm font-medium text-slate-700">
      <span className="mb-1.5 block">{label}</span>
      <select
        className={`w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 focus:border-brand-600 focus:outline-none ${className}`}
        {...props}
      >
        {children}
      </select>
    </label>
  )
}

export function Badge({
  children,
  tone = "green",
}: {
  children: ReactNode
  tone?: "green" | "amber" | "red" | "slate" | "blue"
}) {
  const styles = {
    green: "bg-brand-50 text-brand-800",
    amber: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    slate: "bg-slate-100 text-slate-600",
    blue: "bg-blue-50 text-blue-700",
  }
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  )
}

export function Metric({
  label,
  value,
  detail,
  icon,
}: {
  label: string
  value: string
  detail: string
  icon: ReactNode
}) {
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div className="rounded-xl bg-brand-50 p-2.5 text-brand-800">
          {icon}
        </div>
        <span className="text-xs font-medium text-brand-700">{detail}</span>
      </div>
      <div className="mt-4 text-3xl font-bold tracking-tight text-ink">
        {value}
      </div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </Card>
  )
}

export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-brand-500 transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  )
}

export function Modal({
  title,
  children,
  onClose,
  footer,
}: {
  title: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}) {
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    window.addEventListener("keydown", close)
    return () => window.removeEventListener("keydown", close)
  }, [onClose])
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/45 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 id="modal-title" className="text-lg font-bold text-ink">
            {title}
          </h2>
          <IconButton label="Close dialog" onClick={onClose}>
            <X size={20} />
          </IconButton>
        </div>
        <div className="p-6">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  )
}

export function DataTable({ children }: { children: ReactNode }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          {children}
        </table>
      </div>
    </Card>
  )
}

export const th =
  "whitespace-nowrap bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500"
export const td = "border-t border-slate-100 px-4 py-3.5 text-slate-600"

export function EmptyState({
  title,
  detail,
  action,
}: {
  title: string
  detail: string
  action?: ReactNode
}) {
  return (
    <Card className="p-10 text-center">
      <div className="mx-auto mb-3 size-12 rounded-full bg-brand-50" />
      <h3 className="font-semibold text-ink">{title}</h3>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-500">{detail}</p>
      {action && <div className="mt-4">{action}</div>}
    </Card>
  )
}

export function Toasts({ items }: { items: ToastMessage[] }) {
  return (
    <div className="fixed bottom-5 right-5 z-[60] flex w-[min(24rem,calc(100vw-2.5rem))] flex-col gap-2">
      {items.map((toast) => (
        <div
          key={toast.id}
          className={`toast-in rounded-xl border px-4 py-3 text-sm font-medium shadow-lg ${
            toast.tone === "danger"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-brand-200 bg-white text-brand-900"
          }`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`flex size-10 items-center justify-center rounded-xl font-extrabold ${
          light ? "bg-white text-brand-800" : "bg-brand-800 text-white"
        }`}
      >
        A
      </div>
      <div>
        <div
          className={`font-bold leading-none ${
            light ? "text-white" : "text-ink"
          }`}
        >
          AMORE
        </div>
        <div
          className={`mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
            light ? "text-brand-100" : "text-slate-500"
          }`}
        >
          Student Information System
        </div>
      </div>
    </div>
  )
}
