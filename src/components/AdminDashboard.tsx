import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  Check,
  ClipboardList,
  Download,
  FileBarChart,
  GraduationCap,
  Megaphone,
  Pencil,
  Plus,
  Printer,
  School,
  Settings,
  Trash2,
  UserRound,
  Users,
  X,
} from "./icons"
import { useState, type FormEvent } from "react"
import type { Announcement, SchoolClass, Student, Teacher } from "../types"
import AppShell, { type NavItem } from "./AppShell"
import SchoolFeed from "./SchoolFeed"
import {
  Badge,
  Button,
  Card,
  DataTable,
  EmptyState,
  Field,
  Heading,
  Metric,
  Modal,
  Progress,
  SelectField,
  td,
  th,
} from "./ui"

const nav: NavItem[] = [
  { id: "overview", label: "Overview", icon: BarChart3 },
  { id: "community", label: "News & events", icon: BookOpen },
  { id: "teachers", label: "Manage Teachers", icon: Users },
  { id: "classes", label: "Classes & Subjects", icon: BookOpen },
  { id: "announcements", label: "Announcement", icon: Megaphone },
  { id: "attendance", label: "Attendance Overview", icon: CalendarCheck },
  { id: "reports", label: "Reports", icon: FileBarChart },
  { id: "settings", label: "Settings", icon: Settings },
]

const badgeTone = (value: string) =>
  value === "Enrolled" ||
  value === "Active" ||
  value === "Approved" ||
  value === "Present"
    ? "green"
    : value === "Pending" || value === "Late"
      ? "amber"
      : value === "Absent" || value === "Rejected" || value === "Inactive"
        ? "red"
        : "slate"

export default function AdminDashboard({
  students,
  teachers,
  setTeachers,
  classes,
  setClasses,
  announcements,
  setAnnouncements,
  notify,
  onSignOut,
}: {
  students: Student[]
  teachers: Teacher[]
  setTeachers: (value: Teacher[]) => void
  classes: SchoolClass[]
  setClasses: (value: SchoolClass[]) => void
  announcements: Announcement[]
  setAnnouncements: (value: Announcement[]) => void
  notify: (message: string, tone?: "success" | "info" | "danger") => void
  onSignOut: () => void
}) {
  const [tab, setTab] = useState("overview")
  const [search, setSearch] = useState("")
  const [teacherModal, setTeacherModal] = useState<{
    mode: "add" | "edit" | "view"
    item?: Teacher
  } | null>(null)
  const [remove, setRemove] = useState<{
    id: string
    name: string
  } | null>(null)
  const [reject, setReject] = useState<Announcement | null>(null)
  const [reportType, setReportType] = useState("Enrollment Summary")
  const [reportGrade, setReportGrade] = useState("All grades")
  const filteredTeachers = teachers.filter((t) =>
    `${t.name} ${t.id} ${t.subjects.join(" ")}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )
  const pending = announcements.filter((a) => a.status === "Pending")

  function removeRecord() {
    if (!remove) return
    setTeachers(teachers.filter((t) => t.id !== remove.id))
    notify(`${remove.name} was removed from the current session.`)
    setRemove(null)
  }
  function updateAnnouncement(
    item: Announcement,
    status: "Approved" | "Rejected",
    reason?: string,
  ) {
    setAnnouncements(
      announcements.map((a) =>
        a.id === item.id ? { ...a, status, reason } : a,
      ),
    )
    notify(`Announcement ${status.toLowerCase()}.`)
  }
  function exportCsv() {
    const rows = reportType.includes("Faculty")
      ? [
          ["Employee ID", "Name", "Advisory", "Subjects"],
          ...teachers.map((t) => [
            t.id,
            t.name,
            t.advisory,
            t.subjects.join("; "),
          ]),
        ]
      : [
          ["LRN", "Name", "Grade", "Section", "Status"],
          ...students.filter((s) => reportGrade === "All grades" || `Grade ${s.grade}` === reportGrade).map((s) => [s.lrn, s.name, s.grade, s.section, s.status]),
        ]
    const blob = new Blob(
      [
        rows
          .map((r) =>
            r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(","),
          )
          .join("\n"),
      ],
      { type: "text/csv" },
    )
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `${reportType.toLowerCase().replaceAll(" ", "-")}-sy-2026-2027.csv`
    link.click()
    URL.revokeObjectURL(url)
    notify("CSV report downloaded.")
  }

  return (
    <AppShell
      role="admin"
      name="Dr. Elena Reyes"
      nav={nav}
      active={tab}
      setActive={(id) => {
        setTab(id)
        setSearch("")
      }}
      onSignOut={onSignOut}
    >
      {tab === "overview" && (
        <Overview
          students={students}
          teachers={teachers}
          pending={pending.length}
          setTab={setTab}
        />
      )}
      {tab === "community" && <SchoolFeed announcements={announcements} />}
      {tab === "teachers" && (
        <>
          <Heading
            title="Manage Teachers"
            description={`${filteredTeachers.length} faculty records`}
            action={
              <Button onClick={() => setTeacherModal({ mode: "add" })}>
                <Plus size={17} /> Add teacher
              </Button>
            }
          />
          <div className="mb-5 max-w-md">
            <Field
              label="Search faculty"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Name, ID, or subject..."
            />
          </div>
          {filteredTeachers.length ? (
            <DataTable>
              <thead>
                <tr>
                  {[
                    "Employee",
                    "Advisory Class",
                    "Subject Assignments",
                    "Contact",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th className={th} key={h}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50">
                    <td className={td}>
                      <div className="font-semibold text-ink">{t.name}</div>
                      <div className="text-xs">{t.id}</div>
                    </td>
                    <td className={td}>{t.advisory}</td>
                    <td className={td}>{t.subjects.join(", ")}</td>
                    <td className={td}>
                      <div>{t.email}</div>
                      <div className="text-xs">{t.contact}</div>
                    </td>
                    <td className={td}>
                      <Badge tone={badgeTone(t.status)}>{t.status}</Badge>
                    </td>
                    <td className={td}>
                      <Actions
                        view={() => setTeacherModal({ mode: "view", item: t })}
                        edit={() => setTeacherModal({ mode: "edit", item: t })}
                        remove={() =>
                          setRemove({ id: t.id, name: t.name })
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </DataTable>
          ) : (
            <EmptyState
              title="No teachers found"
              detail="Try a broader search."
            />
          )}
        </>
      )}
      {tab === "classes" && <Classes classes={classes} setClasses={setClasses} notify={notify} />}
      {tab === "announcements" && (
        <Announcements
          items={announcements}
          approve={(a) => updateAnnouncement(a, "Approved")}
          reject={setReject}
        />
      )}
      {tab === "attendance" && <Attendance />}
      {tab === "reports" && (
        <>
          <Heading
            title="Reports"
            description="Generate school-ready records from the current session."
          />
          <Card className="mb-6 grid gap-4 p-5 sm:grid-cols-[1fr_200px_auto_auto] sm:items-end">
            <SelectField
              label="Report type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
            >
              {[
                "Enrollment Summary",
                "Attendance Report",
                "Grade Distribution",
                "Class Masterlist",
                "Faculty Load",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </SelectField>
            <SelectField label="Grade level" value={reportGrade} onChange={(e) => setReportGrade(e.target.value)}>
              <option>All grades</option>
              {[7, 8, 9, 10, 11, 12].map((v) => (
                <option key={v}>Grade {v}</option>
              ))}
            </SelectField>
            <Button variant="secondary" onClick={exportCsv}>
              <Download size={17} /> Export CSV
            </Button>
            <Button onClick={() => window.print()}>
              <Printer size={17} /> Print / Save PDF
            </Button>
          </Card>
          <ReportPreview
            type={reportType}
            students={students.filter((s) => reportGrade === "All grades" || `Grade ${s.grade}` === reportGrade)}
            teachers={teachers}
          />
        </>
      )}
      {tab === "settings" && <SettingsView notify={notify} />}
      {teacherModal && (
        <TeacherForm
          modal={teacherModal}
          close={() => setTeacherModal(null)}
          save={(record) => {
            setTeachers(
              teacherModal.mode === "add"
                ? [...teachers, record]
                : teachers.map((t) => (t.id === record.id ? record : t)),
            )
            setTeacherModal(null)
            notify(
              `Teacher record ${
                teacherModal.mode === "add" ? "added" : "updated"
              }.`,
            )
          }}
        />
      )}
      {remove && (
        <Modal
          title="Remove record?"
          onClose={() => setRemove(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setRemove(null)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={removeRecord}>
                Remove record
              </Button>
            </>
          }
        >
          <p className="text-sm leading-6 text-slate-600">
            This will remove <strong>{remove.name}</strong> from the current
            browser session. This action cannot be undone.
          </p>
        </Modal>
      )}
      {reject && (
        <RejectForm
          item={reject}
          close={() => setReject(null)}
          save={(reason) => {
            updateAnnouncement(reject, "Rejected", reason)
            setReject(null)
          }}
        />
      )}
    </AppShell>
  )
}

function Overview({
  students,
  teachers,
  pending,
  setTab,
}: {
  students: Student[]
  teachers: Teacher[]
  pending: number
  setTab: (tab: string) => void
}) {
  const grades = [7, 8, 9, 10, 11, 12].map((grade) => ({
    grade,
    count: grade === 10 ? 239 : 182 + (grade % 3) * 18,
  }))
  return (
    <>
      <Heading
        title="Good morning, Principal Reyes"
        description="Here’s what is happening across Amore Integrated School today."
        action={<Badge>SY 2026–2027 · Quarter 1</Badge>}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Total learners"
          value={(1240 + students.length).toLocaleString()}
          detail="+3.8% this year"
          icon={<GraduationCap size={22} />}
        />
        <Metric
          label="Faculty members"
          value={`${70 + teachers.length}`}
          detail="68 active today"
          icon={<Users size={22} />}
        />
        <Metric
          label="Class sections"
          value="36"
          detail="Grades 7–12"
          icon={<School size={22} />}
        />
        <Metric
          label="Today's attendance"
          value="96.4%"
          detail="+1.2% vs. last week"
          icon={<CalendarCheck size={22} />}
        />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-ink">Enrollment trend</h2>
              <p className="text-sm text-slate-500">
                Learners enrolled over six school years
              </p>
            </div>
            <Badge>Growing steadily</Badge>
          </div>
          <div className="mt-8 flex h-56 items-end gap-3 sm:gap-6">
            {[910, 980, 1040, 1105, 1182, 1248].map((value, i) => (
              <div
                key={value}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <span className="text-xs font-semibold text-brand-800">
                  {value}
                </span>
                <div
                  className="w-full max-w-14 rounded-t-xl bg-gradient-to-t from-brand-800 to-brand-400"
                  style={{ height: `${(value / 1248) * 170}px` }}
                />
                <span className="text-[10px] text-slate-400">{2021 + i}</span>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-ink">Attendance by grade</h2>
          <p className="text-sm text-slate-500">Today, as of 10:30 AM</p>
          <div className="mt-6 space-y-4">
            {grades.map(({ grade }, i) => (
              <div key={grade}>
                <div className="mb-1.5 flex justify-between text-xs">
                  <span>Grade {grade}</span>
                  <span className="font-semibold">
                    {[97, 96, 95, 98, 96, 94][i]}%
                  </span>
                </div>
                <Progress value={[97, 96, 95, 98, 96, 94][i]} />
              </div>
            ))}
          </div>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1.3fr_.7fr]">
        <Card className="p-6">
          <div className="flex justify-between">
            <h2 className="font-bold text-ink">Grade-level distribution</h2>
            <span className="text-xs text-slate-400">Total 1,248</span>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {grades.map(({ grade, count }) => (
              <div
                key={grade}
                className="rounded-xl bg-slate-50 p-3 text-center"
              >
                <div className="text-xl font-bold text-ink">{count}</div>
                <div className="text-xs text-slate-500">Grade {grade}</div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-6">
          <h2 className="font-bold text-ink">Needs attention</h2>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setTab("announcements")}
              className="flex w-full items-center justify-between rounded-xl bg-amber-50 p-3 text-left text-sm"
            >
              <span>{pending} announcements pending</span>
              <Megaphone size={17} />
            </button>
            <button
              onClick={() => setTab("attendance")}
              className="flex w-full items-center justify-between rounded-xl bg-red-50 p-3 text-left text-sm"
            >
              <span>11 learners absent today</span>
              <CalendarCheck size={17} />
            </button>
          </div>
        </Card>
      </div>
    </>
  )
}

function Actions({
  view,
  edit,
  remove,
}: {
  view: () => void
  edit: () => void
  remove: () => void
}) {
  return (
    <div className="flex gap-1">
      <button
        title="View"
        onClick={view}
        className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-800"
      >
        <UserRound size={16} />
      </button>
      <button
        title="Edit"
        onClick={edit}
        className="rounded-lg p-2 text-slate-500 hover:bg-brand-50 hover:text-brand-800"
      >
        <Pencil size={16} />
      </button>
      <button
        title="Remove"
        onClick={remove}
        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </div>
  )
}

function TeacherForm({
  modal,
  close,
  save,
}: {
  modal: {
    mode: "add" | "edit" | "view"
    item?: Teacher
  }
  close: () => void
  save: (s: Teacher) => void
}) {
  const item = modal.item
  const readonly = modal.mode === "view"
  const [error, setError] = useState("")
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const d = new FormData(e.currentTarget)
    const name = String(d.get("name") || "").trim()
    if (!name) return setError("Full name is required.")
    save({
      id: item?.id || `TCH-${10 + (Date.now() % 90)}`,
      name,
      email: String(d.get("email")),
      advisory: String(d.get("advisory")),
      subjects: String(d.get("subjects"))
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      contact: String(d.get("contact")),
      status: String(d.get("status")) as Teacher["status"],
    })
  }
  return (
    <Modal
      title={`${
        modal.mode === "add" ? "Add" : modal.mode === "edit" ? "Edit" : "View"
      } teacher record`}
      onClose={close}
      footer={
        !readonly ? (
          <>
            <Button variant="secondary" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" form="teacher-form">
              Save record
            </Button>
          </>
        ) : (
          <Button onClick={close}>Done</Button>
        )
      }
    >
      <form
        id="teacher-form"
        onSubmit={submit}
        className="grid gap-4 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <Field
            disabled={readonly}
            label="Full name"
            name="name"
            defaultValue={item?.name}
            error={error}
          />
        </div>
        <Field
          disabled={readonly}
          label="Email"
          name="email"
          defaultValue={item?.email || ""}
        />
        <Field
          disabled={readonly}
          label="Contact"
          name="contact"
          defaultValue={item?.contact || ""}
        />
        <Field
          disabled={readonly}
          label="Advisory class"
          name="advisory"
          defaultValue={item?.advisory || ""}
        />
        <SelectField
          disabled={readonly}
          label="Status"
          name="status"
          defaultValue={item?.status || "Active"}
        >
          <option>Active</option>
          <option>On leave</option>
        </SelectField>
        <div className="sm:col-span-2">
          <Field
            disabled={readonly}
            label="Subjects (comma separated)"
            name="subjects"
            defaultValue={item?.subjects.join(", ") || ""}
          />
        </div>
      </form>
    </Modal>
  )
}

function Classes({
  classes,
  setClasses,
  notify,
}: {
  classes: SchoolClass[]
  setClasses: (value: SchoolClass[]) => void
  notify: (s: string) => void
}) {
  const [selected, setSelected] = useState<SchoolClass | null>(null)
  const [draft, setDraft] = useState<SchoolClass | null>(null)
  const [viewing, setViewing] = useState(false)
  function openClass(item?: SchoolClass) {
    setViewing(false)
    setDraft(item ? { ...item, subjects: [...item.subjects] } : {
      id: `CLS-${Date.now()}`, grade: 7, section: "", adviser: "", room: "", learners: 0, subjects: [],
    })
  }
  function saveClass(event: FormEvent) {
    event.preventDefault()
    if (!draft?.section.trim() || !draft.adviser.trim() || !draft.room.trim()) return
    const exists = classes.some((item) => item.id === draft.id)
    setClasses(exists ? classes.map((item) => item.id === draft.id ? draft : item) : [...classes, draft])
    notify(exists ? "Class details updated." : "Class added to this session.")
    setDraft(null)
  }
  return (
    <>
      <Heading
        title="Classes & Subjects"
        description="Grade-level sections and subject assignments."
        action={
          <Button onClick={() => openClass()}>
            <Plus size={17} /> Add class
          </Button>
        }
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {classes.map((c) => (
          <Card key={c.id} className="p-5">
            <div className="flex justify-between">
              <div className="rounded-xl bg-brand-50 p-3 text-brand-800">
                <School size={21} />
              </div>
              <Badge>{c.learners} learners</Badge>
            </div>
            <h2 className="mt-4 text-lg font-bold text-ink">
              Grade {c.grade} · {c.section}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {c.adviser} · {c.room}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.subjects.slice(0, 4).map((s) => (
                <Badge key={s} tone="slate">
                  {s}
                </Badge>
              ))}
            </div>
            <Button
              variant="secondary"
              className="mt-5 w-full"
              onClick={() => { setSelected(c); setViewing(true) }}
            >
              View assignments
            </Button>
          </Card>
        ))}
      </div>
      {selected && viewing && (
        <Modal
          title={`Grade ${selected.grade} – ${selected.section}`}
          onClose={() => setSelected(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setSelected(null)}>
                Close
              </Button>
              <Button onClick={() => { setViewing(false); openClass(selected); setSelected(null) }}>
                Edit class
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            {selected.subjects.map((subject, i) => (
              <div
                key={subject}
                className="flex items-center justify-between rounded-xl bg-slate-50 p-3"
              >
                <span className="font-medium">{subject}</span>
                <span className="text-sm text-slate-500">
                  {
                    [
                      "Ms. Villanueva",
                      "Mr. Aquino",
                      "Ms. Domingo",
                      "Mr. de Leon",
                    ][i % 4]
                  }
                </span>
              </div>
            ))}
          </div>
        </Modal>
      )}
      {draft && (
        <Modal title={classes.some((item) => item.id === draft.id) ? "Edit class" : "Add class"} onClose={() => setDraft(null)} footer={<><Button variant="secondary" onClick={() => setDraft(null)}>Cancel</Button><Button type="submit" form="class-form">Save class</Button></>}>
          <form id="class-form" onSubmit={saveClass} className="space-y-4">
            <SelectField label="Grade" value={draft.grade} onChange={(e) => setDraft({ ...draft, grade: Number(e.target.value) })}>{[7,8,9,10,11,12].map((grade) => <option key={grade} value={grade}>Grade {grade}</option>)}</SelectField>
            <Field label="Section" required value={draft.section} onChange={(e) => setDraft({ ...draft, section: e.target.value })} />
            <Field label="Adviser" required value={draft.adviser} onChange={(e) => setDraft({ ...draft, adviser: e.target.value })} />
            <Field label="Room" required value={draft.room} onChange={(e) => setDraft({ ...draft, room: e.target.value })} />
            <Field label="Learners" type="number" min="0" required value={draft.learners} onChange={(e) => setDraft({ ...draft, learners: Number(e.target.value) })} />
            <Field label="Subjects (comma separated)" value={draft.subjects.join(", ")} onChange={(e) => setDraft({ ...draft, subjects: e.target.value.split(",").map((subject) => subject.trim()).filter(Boolean) })} />
          </form>
        </Modal>
      )}
    </>
  )
}

function Announcements({
  items,
  approve,
  reject,
}: {
  items: Announcement[]
  approve: (a: Announcement) => void
  reject: (a: Announcement) => void
}) {
  return (
    <div className="max-w-4xl">
      <Heading
        title="Announcement Approval"
        description="Review teacher-submitted communications before publication."
      />
      {items.filter((a) => a.status === "Pending").length ? (
        <div className="space-y-4">
          {items
            .filter((a) => a.status === "Pending")
            .map((a) => (
              <Card key={a.id} className="rounded-xl p-4 shadow-none">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={a.priority === "Urgent" ? "red" : "amber"}>
                        {a.priority}
                      </Badge>
                      <span className="text-xs text-slate-400">
                        Submitted {a.date}
                      </span>
                    </div>
                    <h2 className="mt-2 text-lg font-bold text-ink">
                      {a.title}
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      By {a.author} · Audience: {a.audience}
                    </p>
                    <p className="mt-2 max-w-3xl text-sm leading-5 text-slate-600">
                      {a.message}
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    <Button onClick={() => approve(a)}>
                      <Check size={17} /> Approve
                    </Button>
                    <Button variant="secondary" onClick={() => reject(a)}>
                      <X size={17} /> Reject
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
        </div>
      ) : (
        <EmptyState
          title="Approval queue is clear"
          detail="New teacher announcements will appear here."
        />
      )}
      <h2 className="mb-2 mt-6 font-bold text-ink">Publication history</h2>
      <Card className="divide-y divide-slate-100">
        {items
          .filter((a) => a.status !== "Pending")
          .map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <div>
                <div className="font-medium text-ink">{a.title}</div>
                <div className="text-xs text-slate-500">
                  {a.author} · {a.date}
                </div>
              </div>
              <Badge tone={badgeTone(a.status)}>{a.status}</Badge>
            </div>
          ))}
      </Card>
    </div>
  )
}

function RejectForm({
  item,
  close,
  save,
}: {
  item: Announcement
  close: () => void
  save: (reason: string) => void
}) {
  const [reason, setReason] = useState("")
  return (
    <Modal
      title="Reject announcement"
      onClose={close}
      footer={
        <>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={!reason.trim()}
            onClick={() => save(reason)}
          >
            Reject
          </Button>
        </>
      }
    >
      <p className="mb-4 text-sm text-slate-600">
        Give {item.author} a short reason so they can revise the announcement.
      </p>
      <label className="text-sm font-medium text-slate-700">
        Reason
        <textarea
          rows={4}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="mt-1.5 w-full rounded-xl border border-slate-200 p-3 text-sm focus:border-brand-600 focus:outline-none"
        />
      </label>
    </Modal>
  )
}

function Attendance() {
  const [grade, setGrade] = useState("All grades")
  const [date, setDate] = useState("2026-08-24")
  const records = [
    ["Sofia Reyes", "10 - Mabini", "Late", "8:04 AM"],
    ["Carlo Navarro", "10 - Mabini", "Absent", "—"],
    ["Princess Flores", "7 - Sampaguita", "Excused", "—"],
    ["Miguel Garcia", "8 - Rizal", "Late", "8:12 AM"],
    ["Andrei Bautista", "12 - HUMSS A", "Absent", "—"],
  ]
  const visibleRecords = records.filter((row) => grade === "All grades" || row[1].startsWith(grade.replace("Grade ", "")))
  const statusCount = (status: string) => visibleRecords.filter((row) => row[2] === status).length
  return (
    <>
      <Heading
        title="Attendance Overview"
        description={`Daily school attendance for ${new Date(`${date}T00:00:00`).toLocaleDateString("en-PH", { month: "long", day: "numeric", year: "numeric" })}.`}
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric
          label="Present"
          value={grade === "All grades" ? "1,203" : `${statusCount("Present")}`}
          detail={grade === "All grades" ? "96.4%" : `${statusCount("Present")} shown`}
          icon={<Check size={22} />}
        />
        <Metric
          label="Late"
          value={grade === "All grades" ? "19" : `${statusCount("Late")}`}
          detail={grade === "All grades" ? "1.5%" : `${statusCount("Late")} shown`}
          icon={<CalendarCheck size={22} />}
        />
        <Metric
          label="Absent"
          value={grade === "All grades" ? "11" : `${statusCount("Absent")}`}
          detail={grade === "All grades" ? "0.9%" : `${statusCount("Absent")} shown`}
          icon={<X size={22} />}
        />
        <Metric
          label="Excused"
          value={grade === "All grades" ? "15" : `${statusCount("Excused")}`}
          detail={grade === "All grades" ? "1.2%" : `${statusCount("Excused")} shown`}
          icon={<ClipboardList size={22} />}
        />
      </div>
      <div className="my-6 grid gap-4 sm:grid-cols-2">
        <SelectField label="Grade level" value={grade} onChange={(e) => setGrade(e.target.value)}>
          <option>All grades</option>
          {[7, 8, 9, 10, 11, 12].map((g) => (
            <option key={g}>Grade {g}</option>
          ))}
        </SelectField>
        <Field label="Attendance date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <DataTable>
        <thead>
          <tr>
            {["Learner", "Class", "Status", "Time in"].map((h) => (
              <th className={th} key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRecords.map((r) => (
            <tr key={r[0]}>
              <td className={td}>
                <span className="font-semibold text-ink">{r[0]}</span>
              </td>
              <td className={td}>{r[1]}</td>
              <td className={td}>
                <Badge tone={badgeTone(r[2])}>{r[2]}</Badge>
              </td>
              <td className={td}>{r[3]}</td>
            </tr>
          ))}
        </tbody>
      </DataTable>
    </>
  )
}

function ReportPreview({
  type,
  students,
  teachers,
}: {
  type: string
  students: Student[]
  teachers: Teacher[]
}) {
  return (
    <Card className="print-card p-6">
      <div className="flex items-start justify-between border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-brand-700">
            Amore Integrated School
          </div>
          <h2 className="mt-2 text-2xl font-bold text-ink">{type}</h2>
          <p className="mt-1 text-sm text-slate-500">
            School Year 2026–2027 · Generated August 24, 2026
          </p>
        </div>
        <div className="rounded-xl bg-brand-800 p-3 font-bold text-white">
          A
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4">
        {[
          ["1,248", "Total learners"],
          [
            `${students.filter((s) => s.status === "Enrolled").length + 1230}`,
            "Currently enrolled",
          ],
          [`${teachers.length + 70}`, "Faculty members"],
        ].map(([v, l]) => (
          <div key={l} className="rounded-xl bg-slate-50 p-4">
            <div className="text-2xl font-bold">{v}</div>
            <div className="text-xs text-slate-500">{l}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-slate-600">
        This report reflects the current prototype dataset and any in-session
        changes made by the user.
      </p>
    </Card>
  )
}

function SettingsView({ notify }: { notify: (s: string) => void }) {
  return (
    <>
      <Heading
        title="School Settings"
        description="Update school profile and active academic period."
      />
      <form
        onSubmit={(e) => {
          e.preventDefault()
          notify("School settings saved for this session.")
        }}
        className="grid gap-6 lg:grid-cols-2"
      >
        <Card className="space-y-4 p-6">
          <h2 className="font-bold text-ink">School profile</h2>
          <Field label="School name" defaultValue="Amore Integrated School" />
          <Field label="School ID" defaultValue="406512" />
          <Field label="Address" defaultValue="Brgy. San Isidro, Quezon City" />
          <Field label="Contact email" defaultValue="admin@amore.edu.ph" />
        </Card>
        <Card className="space-y-4 p-6">
          <h2 className="font-bold text-ink">Academic period</h2>
          <SelectField label="School year" defaultValue="2026–2027">
            <option>2026–2027</option>
            <option>2027–2028</option>
          </SelectField>
          <SelectField label="Current quarter">
            <option>Quarter 1</option>
            <option>Quarter 2</option>
            <option>Quarter 3</option>
            <option>Quarter 4</option>
          </SelectField>
          <Field
            label="School year start"
            type="date"
            defaultValue="2026-06-08"
          />
          <Field
            label="School year end"
            type="date"
            defaultValue="2027-03-26"
          />
          <Button type="submit">Save settings</Button>
        </Card>
      </form>
    </>
  )
}
