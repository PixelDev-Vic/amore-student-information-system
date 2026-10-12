import {
  BookOpen,
  CalendarCheck,
  ClipboardCheck,
  Clock3,
  GraduationCap,
  LayoutDashboard,
  Megaphone,
  Plus,
  Save,
  UserRound,
  Users,
} from "./icons"
import { useState, type FormEvent } from "react"
import { schedule, subjects } from "../data/mockData"
import type { Announcement, AttendanceStatus, Student } from "../types"
import AppShell, { type NavItem } from "./AppShell"
import SchoolFeed from "./SchoolFeed"
import {
  Badge,
  Button,
  Card,
  DataTable,
  Field,
  Heading,
  Metric,
  Modal,
  SelectField,
  td,
  th,
} from "./ui"

const nav: NavItem[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "community", label: "News & events", icon: BookOpen },
  { id: "classes", label: "My Classes", icon: Users },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "gradebook", label: "Gradebook", icon: ClipboardCheck },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "schedule", label: "My Schedule", icon: Clock3 },
  { id: "profile", label: "Profile", icon: UserRound },
]

export default function TeacherDashboard({
  students,
  announcements,
  setAnnouncements,
  notify,
  onSignOut,
}: {
  students: Student[]
  announcements: Announcement[]
  setAnnouncements: (v: Announcement[]) => void
  notify: (s: string, tone?: "success" | "info" | "danger") => void
  onSignOut: () => void
}) {
  const [tab, setTab] = useState("overview")
  const [compose, setCompose] = useState(false)
  const [attendance, setAttendance] =
    useState<Record<string, AttendanceStatus>>(
      Object.fromEntries(students.slice(0, 6).map((s) => [s.id, "Present"])),
    )
  const [grades, setGrades] = useState<Record<string, number>>(
    Object.fromEntries(students.slice(0, 6).map((s, i) => [s.id, 88 + i])),
  )
  const roster = students.filter((s) => s.grade === 10)
  const myAnnouncements = announcements.filter(
    (a) => a.author === "Ma. Cristina A. Villanueva",
  )

  return (
    <AppShell
      role="teacher"
      name="Ma. Cristina Villanueva"
      nav={nav}
      active={tab}
      setActive={setTab}
      onSignOut={onSignOut}
    >
      {tab === "overview" && (
        <>
          <Heading
            title="Good morning, Ms. Villanueva"
            description="You have three classes scheduled for Monday, August 24."
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Classes today"
              value="3"
              detail="Next at 9:45 AM"
              icon={<BookOpen size={22} />}
            />
            <Metric
              label="Assigned learners"
              value="118"
              detail="Across 3 classes"
              icon={<Users size={22} />}
            />
            <Metric
              label="Attendance completion"
              value="67%"
              detail="2 of 3 classes"
              icon={<CalendarCheck size={22} />}
            />
            <Metric
              label="Pending grade tasks"
              value="2"
              detail="Due this week"
              icon={<ClipboardCheck size={22} />}
            />
          </div>
          <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_.6fr]">
            <Card className="p-6">
              <div className="flex justify-between">
                <h2 className="font-bold text-ink">Today's schedule</h2>
                <Button variant="ghost" onClick={() => setTab("schedule")}>
                  View full week
                </Button>
              </div>
              <div className="mt-4 space-y-3">
                {schedule.slice(0, 3).map((s, i) => (
                  <div
                    key={s.subject}
                    className="flex items-center gap-4 rounded-xl bg-slate-50 p-4"
                  >
                    <div
                      className={`h-12 w-1 rounded-full ${
                        i === 1 ? "bg-brand-500" : "bg-brand-800"
                      }`}
                    />
                    <div className="w-24 text-sm font-semibold text-brand-800">
                      {s.time.split("–")[0]}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-ink">{s.subject}</div>
                      <div className="text-xs text-slate-500">
                        Grade 10 – Mabini · {s.room}
                      </div>
                    </div>
                    <Badge tone={i === 0 ? "green" : "slate"}>
                      {i === 0 ? "Completed" : "Upcoming"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <h2 className="font-bold text-ink">School announcements</h2>
              <div className="mt-4 space-y-4">
                {announcements
                  .filter((a) => a.status === "Approved")
                  .slice(0, 3)
                  .map((a) => (
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
      {tab === "classes" && (
        <>
          <Heading
            title="My Classes"
            description="Your assigned classes for SY 2026–2027."
          />
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[
              [
                "Grade 10 – Mabini",
                "Mathematics",
                "MWF · 7:30 AM",
                "JHS 305",
                "39",
              ],
              [
                "Grade 10 – Mabini",
                "Science",
                "MWF · 9:45 AM",
                "Science Lab",
                "39",
              ],
              [
                "Grade 9 – Bonifacio",
                "Mathematics",
                "TTh · 1:00 PM",
                "JHS 301",
                "40",
              ],
            ].map((c) => (
              <Card key={`${c[0]}${c[1]}`} className="p-5">
                <div className="flex justify-between">
                  <div className="rounded-xl bg-brand-50 p-3 text-brand-800">
                    <GraduationCap size={22} />
                  </div>
                  <Badge>{c[4]} learners</Badge>
                </div>
                <h2 className="mt-4 text-lg font-bold text-ink">{c[0]}</h2>
                <p className="mt-1 font-medium text-brand-800">{c[1]}</p>
                <p className="mt-3 text-sm text-slate-500">
                  {c[2]} · {c[3]}
                </p>
                <Button
                  variant="secondary"
                  className="mt-5 w-full"
                  onClick={() => setTab("attendance")}
                >
                  Open class roster
                </Button>
              </Card>
            ))}
          </div>
          <h2 className="mb-3 mt-8 font-bold text-ink">
            Grade 10 – Mabini roster
          </h2>
          <DataTable>
            <thead>
              <tr>
                {["LRN", "Learner", "Enrollment status"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roster.map((s) => (
                <tr key={s.id}>
                  <td className={td}>{s.lrn}</td>
                  <td className={td}>
                    <span className="font-semibold text-ink">{s.name}</span>
                  </td>
                  <td className={td}>
                    <Badge>{s.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </>
      )}
      {tab === "attendance" && (
        <>
          <Heading
            title="Class Attendance"
            description="Record daily learner attendance."
            action={
              <Button
                onClick={() => {
                  setAttendance(
                    Object.fromEntries(roster.map((s) => [s.id, "Present"])),
                  )
                  notify("All learners marked present.")
                }}
              >
                <CalendarCheck size={17} /> Mark all present
              </Button>
            }
          />
          <Card className="mb-5 grid gap-4 p-5 sm:grid-cols-2">
            <SelectField label="Class">
              <option>Grade 10 – Mabini · Mathematics</option>
              <option>Grade 9 – Bonifacio · Mathematics</option>
            </SelectField>
            <Field label="Date" type="date" defaultValue="2026-08-24" />
          </Card>
          <DataTable>
            <thead>
              <tr>
                {["LRN", "Learner", "Attendance status"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roster.map((s) => (
                <tr key={s.id}>
                  <td className={td}>{s.lrn}</td>
                  <td className={td}>
                    <span className="font-semibold text-ink">{s.name}</span>
                  </td>
                  <td className={td}>
                    <select
                      className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                      value={attendance[s.id] || "Present"}
                      onChange={(e) =>
                        setAttendance({
                          ...attendance,
                          [s.id]: e.target.value as AttendanceStatus,
                        })
                      }
                    >
                      {["Present", "Late", "Absent", "Excused"].map((v) => (
                        <option key={v}>{v}</option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() => notify("Attendance saved for Grade 10 – Mabini.")}
            >
              <Save size={17} /> Save attendance
            </Button>
          </div>
        </>
      )}
      {tab === "gradebook" && (
        <>
          <Heading
            title="Gradebook"
            description="Quarter 1 grades must be between 60 and 100."
          />
          <Card className="mb-5 grid gap-4 p-5 sm:grid-cols-3">
            <SelectField label="Class">
              <option>Grade 10 – Mabini</option>
            </SelectField>
            <SelectField label="Subject">
              {subjects.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </SelectField>
            <SelectField label="Grading period">
              <option>Quarter 1</option>
              <option>Quarter 2</option>
            </SelectField>
          </Card>
          <DataTable>
            <thead>
              <tr>
                {["LRN", "Learner", "Grade", "Remarks"].map((h) => (
                  <th key={h} className={th}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {roster.map((s) => {
                const grade = grades[s.id] || 75
                return (
                  <tr key={s.id}>
                    <td className={td}>{s.lrn}</td>
                    <td className={td}>
                      <span className="font-semibold text-ink">{s.name}</span>
                    </td>
                    <td className={td}>
                      <input
                        aria-label={`Grade for ${s.name}`}
                        className="w-20 rounded-lg border border-slate-200 px-3 py-2"
                        type="number"
                        min="60"
                        max="100"
                        value={grade}
                        onChange={(e) =>
                          setGrades({
                            ...grades,
                            [s.id]: Number(e.target.value),
                          })
                        }
                      />
                    </td>
                    <td className={td}>
                      <Badge tone={grade >= 75 ? "green" : "red"}>
                        {grade >= 75 ? "Passed" : "Needs Improvement"}
                      </Badge>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </DataTable>
          <div className="mt-4 flex justify-end">
            <Button
              onClick={() =>
                Object.values(grades).some((v) => v < 60 || v > 100)
                  ? notify("Grades must be from 60 to 100.", "danger")
                  : notify("Quarter 1 grades saved.")
              }
            >
              <Save size={17} /> Save grades
            </Button>
          </div>
        </>
      )}
      {tab === "announcements" && (
        <>
          <Heading
            title="Announcements"
            description="Submit class or school notices for Principal approval."
            action={
              <Button onClick={() => setCompose(true)}>
                <Plus size={17} /> Compose
              </Button>
            }
          />
          <div className="space-y-4">
            {myAnnouncements.length ? (
              myAnnouncements.map((a) => (
                <Card key={a.id} className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="font-bold text-ink">{a.title}</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {a.audience} · Submitted {a.date}
                      </p>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {a.message}
                      </p>
                      {a.reason && (
                        <p className="mt-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">
                          Reason: {a.reason}
                        </p>
                      )}
                    </div>
                    <Badge
                      tone={
                        a.status === "Approved"
                          ? "green"
                          : a.status === "Rejected"
                            ? "red"
                            : "amber"
                      }
                    >
                      {a.status}
                    </Badge>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-8 text-center text-sm text-slate-500">
                No announcements submitted yet.
              </Card>
            )}
          </div>
        </>
      )}
      {tab === "schedule" && (
        <>
          <Heading
            title="My Teaching Schedule"
            description="Weekly schedule for SY 2026–2027."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {schedule.map((s) => (
              <Card key={s.subject} className="flex gap-4 p-5">
                <div className="rounded-xl bg-brand-50 p-3 text-brand-800">
                  <Clock3 size={20} />
                </div>
                <div>
                  <h2 className="font-bold text-ink">{s.subject}</h2>
                  <p className="mt-1 text-sm text-slate-500">{s.days}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {s.time} · {s.room}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </>
      )}
      {tab === "profile" && (
        <>
          <Heading
            title="My Profile"
            description="Faculty information on file."
          />
          <Card className="max-w-3xl p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex size-20 items-center justify-center rounded-2xl bg-brand-100 text-2xl font-bold text-brand-800">
                MC
              </div>
              <div>
                <h2 className="text-xl font-bold text-ink">
                  Ma. Cristina A. Villanueva
                </h2>
                <p className="text-sm text-slate-500">
                  TCH-021 · Junior High School Teacher III
                </p>
                <Badge>Active faculty</Badge>
              </div>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {[
                ["School email", "teacher@amore.edu.ph"],
                ["Contact number", "0917 501 8872"],
                ["Advisory class", "Grade 10 – Mabini"],
                ["Subjects", "Mathematics, Science"],
              ].map(([l, v]) => (
                <div key={l}>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {l}
                  </div>
                  <div className="mt-1 text-sm font-medium text-ink">{v}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
      {compose && (
        <Compose
          close={() => setCompose(false)}
          save={(a) => {
            setAnnouncements([...announcements, a])
            setCompose(false)
            notify("Announcement submitted for Principal approval.")
          }}
        />
      )}
    </AppShell>
  )
}

function Compose({
  close,
  save,
}: {
  close: () => void
  save: (a: Announcement) => void
}) {
  const [error, setError] = useState("")
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    if (!String(d.get("title")).trim() || !String(d.get("message")).trim())
      return setError("Title and message are required.")
    save({
      id: Date.now(),
      title: String(d.get("title")),
      author: "Ma. Cristina A. Villanueva",
      audience: String(d.get("audience")),
      priority: String(d.get("priority")) as Announcement["priority"],
      message: String(d.get("message")),
      date: "Aug 24, 2026",
      status: "Pending",
    })
  }
  return (
    <Modal
      title="Compose announcement"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button type="submit" form="compose-form">
            Submit for approval
          </Button>
        </>
      }
    >
      <form id="compose-form" onSubmit={submit} className="space-y-4">
        <Field label="Title" name="title" error={error} />
        <SelectField label="Audience" name="audience">
          <option>Grade 10 – Mabini</option>
          <option>All Grade 10 learners</option>
          <option>Grades 7–12</option>
        </SelectField>
        <SelectField label="Priority" name="priority">
          <option>Normal</option>
          <option>Important</option>
          <option>Urgent</option>
        </SelectField>
        <label className="block text-sm font-medium text-slate-700">
          Message
          <textarea
            name="message"
            rows={5}
            className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 focus:border-brand-600 focus:outline-none"
          />
        </label>
      </form>
    </Modal>
  )
}
