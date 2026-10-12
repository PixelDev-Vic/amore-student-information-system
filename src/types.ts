export type Role = "admin" | "teacher" | "student"
export type PublicView = "landing" | "login"
export type AttendanceStatus = "Present" | "Late" | "Absent" | "Excused"
export type AnnouncementStatus = "Pending" | "Approved" | "Rejected"

export interface Student {
  id: string
  lrn: string
  name: string
  grade: number
  section: string
  guardian: string
  contact: string
  status: "Enrolled" | "Pending" | "Inactive"
}

export interface Teacher {
  id: string
  name: string
  email: string
  advisory: string
  subjects: string[]
  contact: string
  status: "Active" | "On leave"
}

export interface SchoolClass {
  id: string
  grade: number
  section: string
  adviser: string
  room: string
  learners: number
  subjects: string[]
}

export interface Announcement {
  id: number
  title: string
  author: string
  audience: string
  priority: "Normal" | "Important" | "Urgent"
  message: string
  date: string
  status: AnnouncementStatus
  reason?: string
}

export interface ToastMessage {
  id: number
  message: string
  tone?: "success" | "info" | "danger"
}
