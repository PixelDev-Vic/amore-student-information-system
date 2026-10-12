import {
  BookOpenCheck,
  BookOpen,
  CalendarCheck,
  Clock3,
  Download,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Printer,
  UserRound,
} from "./icons"
import { useState, type FormEvent } from "react"
import { learnerGrades, schedule } from "../data/mockData"
import type { Announcement } from "../types"
import AppShell, { type NavItem } from "./AppShell"
import SchoolFeed from "./SchoolFeed"
import {
  Badge,
  Button,
  Card,
  DataTable,
  Heading,
  Metric,
  Modal,
  Progress,
  SelectField,
  td,
  th,
} from "./ui"

const nav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "community", label: "News & events", icon: BookOpen },
  { id: "grades", label: "My Grades", icon: GraduationCap },
  { id: "schedule", label: "Class Schedule", icon: Clock3 },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "record", label: "School Record", icon: FileText },
  { id: "profile", label: "Profile", icon: UserRound },
]

export default function StudentDashboard({
  announcements,
  notify,
  onSignOut,
}: {
  announcements: Announcement[]
  notify: (s: string) => void
  onSignOut: () => void
}) {
  const [tab, setTab] = useState("overview")
  const [quarter, setQuarter] = useState("Quarter 3")
  const [request, setRequest] = useState(false)
  const approved = announcements.filter((a) => a.status === "Approved")
  return (
    <AppShell
      role="student"
      name="Sofia Reyes"
      nav={nav}
      active={tab}
      setActive={setTab}
      onSignOut={onSignOut}
    >
      {tab === "overview" && (
        <>
          <Heading
            title="Welcome back, Sofia"
            description="Monday, August 24, 2026 · Grade 10 – Mabini"
            action={<Badge>SY 2026–2027</Badge>}
          />
          <Card className="mb-6 overflow-hidden bg-gradient-to-r from-brand-900 to-brand-700 p-6 text-white">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">
                  SR
                </div>
                <div>
                  <h2 className="text-xl font-bold">Sofia Marie D. Reyes</h2>
                  <p className="text-sm text-brand-100">
                    LRN 136742090001 · Grade 10 – Mabini
                  </p>
                  <p className="mt-1 text-xs text-brand-200">
                    Adviser: Ma. Cristina A. Villanueva
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-white/10 px-5 py-3">
                  <div className="text-2xl font-bold">93</div>
                  <div className="text-xs text-brand-100">Overall average</div>
                </div>
                <div className="rounded-xl bg-white/10 px-5 py-3">
                  <div className="text-2xl font-bold">97.2%</div>
                  <div className="text-xs text-brand-100">Attendance</div>
                </div>
              </div>
            </div>
          </Card>
          <div className="grid gap-4 sm:grid-cols-3">
            <Metric
              label="Classes today"
              value="5"
              detail="Next: Science"
              icon={<BookOpenCheck size={22} />}
            />
            <Metric
              label="Upcoming activities"
              value="3"
              detail="This week"
              icon={<Clock3 size={22} />}
            />
            <Metric
              label="Recent grade"
              value="95"
              detail="Mathematics"
              icon={<GraduationCap size={22} />}
            />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <Card className="p-6">
              <div className="flex justify-between">
                <h2 className="font-bold text-ink">Today's classes</h2>
                <Button variant="ghost" onClick={() => setTab("schedule")}>
                  Full schedule
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {schedule.slice(0, 4).map((s) => (
                  <div
                    key={s.subject}
                    className="flex items-center gap-4 rounded-xl bg-slate-50 p-3"
                  >
                    <div className="w-24 text-xs font-semibold text-brand-800">
                      {s.time}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">
                        {s.subject}
                      </div>
                      <div className="text-xs text-slate-500">
                        {s.teacher} · {s.room}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-bold text-ink">Announcements</h2>
              <div className="mt-4 space-y-4">
                {approved.slice(0, 3).map((a) => (
                  <div key={a.id}>
                    <Badge tone="green">{a.priority}</Badge>
                    <div className="mt-1 text-sm font-semibold text-ink">
                      {a.title}
                    </div>
                    <div className="text-xs text-slate-400">{a.date}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}
      {tab === "community" && <SchoolFeed announcements={announcements} />}
      {tab === "grades" && (
        <>
          <Heading
            title="My Grades"
            description="View quarterly performance and final remarks."
            action={
              <div className="w-40">
                <SelectField
                  label="Quarter"
                  value={quarter}
                  onChange={(e) => setQuarter(e.target.value)}
                >
                  {["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"].map(
                    (q) => (
                      <option key={q}>{q}</option>
                    ),
                  )}
                </SelectField>
              </div>
            }
          />
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <Metric
              label="Overall average"
              value={quarter === "Quarter 4" ? "Pending" : "93"}
              detail="With honors"
              icon={<GraduationCap size={22} />}
            />
            <Metric
              label="Highest grade"
              value={quarter === "Quarter 4" ? "—" : "96"}
              detail="Values Education"
              icon={<BookOpenCheck size={22} />}
            />
            <Metric
              label="Subjects completed"
              value={quarter === "Quarter 4" ? "0 / 8" : "8 / 8"}
              detail={
                quarter === "Quarter 4" ? "Not yet encoded" : "All encoded"
              }
              icon={<FileText size={22} />}
            />
          </div>
          <DataTable>
            <thead>
              <tr>
                {["Subject", "Q1", "Q2", "Q3", "Q4", "Average", "Remarks"].map(
                  (h) => (
                    <th key={h} className={th}>
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {learnerGrades.map((g) => {
                const avg = Math.round((g.q1 + g.q2 + g.q3) / 3)
                return (
                  <tr key={g.subject}>
                    <td className={td}>
                      <span className="font-semibold text-ink">
                        {g.subject}
                      </span>
                    </td>
                    {[g.q1, g.q2, g.q3, g.q4].map((v, i) => (
                      <td key={i} className={td}>
                        {v ?? "Pending"}
                      </td>
                    ))}
                    <td className={td}>
                      <span className="font-bold text-brand-800">{avg}</span>
                    </td>
                    <td className={td}>
                      <Badge>
                        {avg >= 75 ? "Passed" : "Needs Improvement"}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </DataTable>
        </>
      )}
      {tab === "schedule" && (
        <>
          <Heading
            title="Class Schedule"
            description="Weekly schedule for Grade 10 – Mabini."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((s) => (
              <Card key={s.subject} className="p-5">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-brand-50 p-3 text-brand-800">
                    <Clock3 size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-ink">{s.subject}</h2>
                    <p className="mt-1 text-sm text-slate-500">{s.teacher}</p>
                    <p className="mt-3 text-sm font-medium text-brand-800">
                      {s.days}
                    </p>
                    <p className="text-sm text-slate-500">
                      {s.time} · {s.room}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
      {tab === "attendance" && (
        <>
          <Heading
            title="My Attendance"
            description="Attendance record as of August 24, 2026."
          />
          <div className="grid gap-4 sm:grid-cols-4">
            <Metric
              label="Present"
              value="44"
              detail="97.2%"
              icon={<CalendarCheck size={22} />}
            />
            <Metric
              label="Late"
              value="1"
              detail="2.2%"
              icon={<Clock3 size={22} />}
            />
            <Metric
              label="Absent"
              value="0"
              detail="0%"
              icon={<FileText size={22} />}
            />
            <Metric
              label="Excused"
              value="1"
              detail="2.2%"
              icon={<BookOpenCheck size={22} />}
            />
          </div>
          <Card className="mt-6 p-6">
            <h2 className="font-bold text-ink">Monthly attendance</h2>
            <div className="mt-5 space-y-5">
              {[
                ["June", 98],
                ["July", 96],
                ["August", 97],
              ].map(([month, value]) => (
                <div key={month}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>{month} 2026</span>
                    <span className="font-semibold">{value}%</span>
                  </div>
                  <Progress value={Number(value)} />
                </div>
              ))}
            </div>
          </Card>
          <h2 className="mb-3 mt-7 font-bold text-ink">Recent records</h2>
          <DataTable>
            <thead>
              <tr>
                {["Date", "Day", "Status", "Note"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Aug 24, 2026", "Monday", "Present", "On time"],
                ["Aug 21, 2026", "Friday", "Present", "On time"],
                ["Aug 20, 2026", "Thursday", "Late", "Arrived 7:38 AM"],
                ["Aug 19, 2026", "Wednesday", "Present", "On time"],
              ].map((r) => (
                <tr key={r[0]}>
                  {r.map((v, i) => (
                    <td key={v} className={td}>
                      {i === 2 ? (
                        <Badge tone={v === "Present" ? "green" : "amber"}>
                          {v}
                        </Badge>
                      ) : (
                        v
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </DataTable>
        </>
      )}
      {tab === "record" && (
        <>
          <Heading
            title="Enrollment & School Record"
            description="Your official information for the current school year."
            action={
              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    const rows = [
                      ["School", "Amore Integrated School"],
                      ["School year", "2026–2027"],
                      ["Learner name", "Sofia Marie D. Reyes"],
                      ["LRN", "136742090001"],
                      ["Grade and section", "Grade 10 – Mabini"],
                      ["Adviser", "Ma. Cristina A. Villanueva"],
                      ["Guardian", "Marites D. Reyes"],
                      ["Guardian contact", "0917 320 1845"],
                      ["Enrollment status", "Officially Enrolled"],
                    ]
                    const csv = rows.map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n")
                    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }))
                    const link = document.createElement("a")
                    link.href = url
                    link.download = "sofia-reyes-enrollment-sy-2026-2027.csv"
                    link.click()
                    URL.revokeObjectURL(url)
                    notify("Enrollment summary downloaded.")
                  }}
                >
                  <Download size={17} /> Download
                </Button>
                <Button onClick={() => window.print()}>
                  <Printer size={17} /> Print
                </Button>
              </div>
            }
          />
          <Card className="print-card max-w-4xl p-6">
            <div className="flex justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-brand-700">
                  Amore Integrated School
                </p>
                <h2 className="mt-2 text-2xl font-bold">Enrollment Summary</h2>
                <p className="text-sm text-slate-500">School Year 2026–2027</p>
              </div>
              <Badge>Officially enrolled</Badge>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                ["Learner name", "Sofia Marie D. Reyes"],
                ["Learner Reference Number", "136742090001"],
                ["Grade and section", "Grade 10 – Mabini"],
                ["Adviser", "Ma. Cristina A. Villanueva"],
                ["Guardian", "Marites D. Reyes"],
                ["Guardian contact", "0917 320 1845"],
                ["Enrollment date", "June 3, 2026"],
                ["Enrollment status", "Officially Enrolled"],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {l}
                  </div>
                  <div className="mt-1 font-medium text-ink">{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
      {tab === "profile" && (
        <>
          <Heading
            title="My Profile"
            description="Review your personal, guardian, and academic information."
            action={
              <Button onClick={() => setRequest(true)}>
                Request profile update
              </Button>
            }
          />
          <div className="grid gap-6 lg:grid-cols-2">
            <InfoCard
              title="Personal information"
              rows={[
                ["Full name", "Sofia Marie D. Reyes"],
                ["Date of birth", "March 14, 2011"],
                ["Sex", "Female"],
                ["Address", "Brgy. San Isidro, Quezon City"],
                ["School email", "student@amore.edu.ph"],
              ]}
            />
            <InfoCard
              title="Guardian information"
              rows={[
                ["Guardian", "Marites D. Reyes"],
                ["Relationship", "Mother"],
                ["Contact", "0917 320 1845"],
                ["Email", "marites.reyes@example.com"],
                ["Emergency contact", "Ramon D. Reyes · 0918 553 1022"],
              ]}
            />
            <InfoCard
              title="Academic information"
              rows={[
                ["LRN", "136742090001"],
                ["Grade and section", "Grade 10 – Mabini"],
                ["Adviser", "Ma. Cristina A. Villanueva"],
                ["Track", "Junior High School"],
                ["Status", "Officially Enrolled"],
              ]}
            />
          </div>
        </>
      )}
      {request && (
        <ProfileRequest
          close={() => setRequest(false)}
          save={() => {
            setRequest(false)
            notify("Profile update request submitted to the Registrar.")
          }}
        />
      )}
    </AppShell>
  )
}

interface InfoCardProps {
  title: string
  rows: string[][]
}

function InfoCard({ title, rows }: InfoCardProps) {
  return (
    <Card className="p-6">
      <h2 className="font-bold text-ink">{title}</h2>
      <div className="mt-5 divide-y divide-slate-100">
        {rows.map(([l, v]) => (
          <div
            key={l}
            className="grid grid-cols-[140px_1fr] gap-3 py-3 text-sm"
          >
            <span className="text-slate-400">{l}</span>
            <span className="font-medium text-ink">{v}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
function ProfileRequest({
  close,
  save,
}: {
  close: () => void
  save: () => void
}) {
  const [detail, setDetail] = useState("")
  function submit(e: FormEvent) {
    e.preventDefault()
    if (detail.trim()) save()
  }
  return (
    <Modal
      title="Request profile update"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            form="profile-request"
            disabled={!detail.trim()}
          >
            Submit request
          </Button>
        </>
      }
    >
      <form id="profile-request" onSubmit={submit}>
        <label className="text-sm font-medium text-slate-700">
          What information needs to be updated?
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={5}
            placeholder="Describe the requested correction and provide the correct information."
            className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-brand-600 focus:outline-none"
          />
        </label>
        <p className="mt-2 text-xs text-slate-400">
          The Registrar may contact your guardian to verify this request.
        </p>
      </form>
    </Modal>
  )
}
