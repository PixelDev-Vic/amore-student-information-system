import { useCallback, useState } from "react"
import AdminDashboard from "./components/AdminDashboard"
import LandingPage from "./components/LandingPage"
import LoginPage from "./components/LoginPage"
import StudentDashboard from "./components/StudentDashboard"
import TeacherDashboard from "./components/TeacherDashboard"
import { Toasts } from "./components/ui"
import {
  classes as initialClasses,
  initialAnnouncements,
  students as initialStudents,
  teachers as initialTeachers,
} from "./data/mockData"
import type { Role, ToastMessage } from "./types"

export default function App() {
  const [publicView, setPublicView] = useState<"landing" | "login">("landing")
  const [role, setRole] = useState<Role | null>(null)
  const [students] = useState(initialStudents)
  const [teachers, setTeachers] = useState(initialTeachers)
  const [classRecords, setClassRecords] = useState(initialClasses)
  const [announcements, setAnnouncements] = useState(initialAnnouncements)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const notify = useCallback(
    (message: string, tone: ToastMessage["tone"] = "success") => {
      const id = Date.now() + Math.random()
      setToasts((items) => [...items, { id, message, tone }])
      window.setTimeout(
        () => setToasts((items) => items.filter((item) => item.id !== id)),
        3200,
      )
    },
    [],
  )

  function signOut() {
    setRole(null)
    setPublicView("landing")
    notify("You have signed out securely.", "info")
  }

  return (
    <>
      {!role && publicView === "landing" && (
        <LandingPage
          onLogin={() => setPublicView("login")}
          announcements={announcements}
        />
      )}
      {!role && publicView === "login" && (
        <LoginPage
          onBack={() => setPublicView("landing")}
          onLogin={setRole}
          notify={notify}
        />
      )}
      {role === "admin" && (
        <AdminDashboard
          students={students}
          teachers={teachers}
          setTeachers={setTeachers}
          classes={classRecords}
          setClasses={setClassRecords}
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          notify={notify}
          onSignOut={signOut}
        />
      )}
      {role === "teacher" && (
        <TeacherDashboard
          students={students}
          announcements={announcements}
          setAnnouncements={setAnnouncements}
          notify={notify}
          onSignOut={signOut}
        />
      )}
      {role === "student" && (
        <StudentDashboard
          announcements={announcements}
          notify={notify}
          onSignOut={signOut}
        />
      )}
      <Toasts items={toasts} />
    </>
  )
}
