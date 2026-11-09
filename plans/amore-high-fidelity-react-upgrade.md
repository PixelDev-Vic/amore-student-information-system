

# Amore Centralized Web Student Information System — High-Fidelity React Upgrade Plan

## Objective
Rebuild the React application as a polished, responsive green-and-white Student Information System for School Year 2026–2027. Replace the current red, college-oriented wireframe UI with a cohesive K–12 experience for three roles: Principal/Admin, Teacher, and Student. Keep the app as a front-end demonstration with realistic Filipino mock data and working local interactions.

## Confirmed Scope and Constraints
- Modify the React app only; do not edit or overwrite `medium-fidelity/index.html`.
- Preserve the existing Vite + React 19 + Tailwind CSS v4 setup and the already-running development server.
- Use a single login form with email-based role detection; do not retain separate Student/Admin login buttons.
- Add a complete Teacher Dashboard rather than redirecting teachers to another role.
- Use School Year 2026–2027, Grades 7–12, Filipino names, Philippine school terminology, and subjects such as Filipino, Mathematics, Science, English, Araling Panlipunan, MAPEH, TLE, and Values Education.
- This phase remains front-end only: data mutations persist for the current browser session but do not call a backend or survive a reload.
- Use the provided deep green `#166534`, bright green `#22C55E`, light tint `#F0FDF4`, white, and dark green-gray text as the core palette.
- Use Inter from Google Fonts, an 8px spacing rhythm, 12–16px radii, subtle borders, and soft shadows.
- Use the project’s existing uploaded reference crops only as low-fidelity context, not as production imagery.

## Information Architecture

### Public landing page
- Sticky header with Amore mark, section links, and a primary “Open Portal” action.
- Hero with a Filipino classroom/campus photograph, deep-green gradient overlay, concise SIS value proposition, SY 2026–2027 label, and clear login CTA.
- Trust/overview metrics for students, teachers, sections, and attendance.
- Role-focused feature cards for students, teachers, and administrators.
- Announcement highlights and important school dates.
- Footer with school contact details, support links, and current system label.
- Responsive behavior: desktop two-column hero and multi-column sections; mobile stacked layout with a compact navigation treatment.

### Single login experience
- Split-screen desktop card: photographic/brand panel on the left and one login form on the right; stacked and simplified on small screens.
- Fields: school email and password, password visibility toggle, remember-me checkbox, forgot-password affordance, and submit button.
- Accessible labels, focus states, error messaging, and loading feedback.
- Role detection rules for the demo:
  - addresses containing `principal` or `admin` route to Principal/Admin;
  - addresses containing `teacher` or `faculty` route to Teacher;
  - addresses containing `student` or a numeric learner identifier route to Student;
  - unrecognized/invalid email formats show an inline guidance error rather than guessing.
- Provide three visible demo-account shortcuts that populate valid examples (`principal@amore.edu.ph`, `teacher@amore.edu.ph`, and `student@amore.edu.ph`) without reintroducing separate portal buttons.
- Any non-empty password is accepted for the prototype; empty credentials remain invalid.
- Successful sign-in sets the active role and opens that role’s overview. Sign-out returns to the landing page and clears role/session state.

### Shared authenticated shell
- Reusable responsive sidebar, top bar, page header, breadcrumb/context area, avatar/role menu, search affordance, notification panel, and sign-out action.
- Desktop sidebar can collapse; mobile sidebar opens as an overlay drawer and closes after selection.
- Shared visual components: button, icon button, status badge, metric card, panel/card, progress bar, modal, confirmation dialog, form field, select, table wrapper, empty state, toast, and simple chart primitives.
- Role-specific navigation and identity labels come from configuration rather than duplicated shells.

## Principal/Admin Workspace

### Overview
- School-wide metrics: total learners, teachers, sections, and today’s attendance rate.
- Green-toned enrollment trend chart and attendance-by-grade chart built with responsive SVG/CSS primitives (no large chart dependency).
- Grade-level distribution for Grades 7–12.
- Recent activity stream, quick actions, pending announcement count, and at-risk/absent learner summary.

### Manage Students
- Search and filters for grade, section, and status.
- Responsive learner table with LRN, full name, grade/section, guardian contact, and enrollment status.
- Add and Edit Student modal with validation; Save updates in-memory state and shows a success toast.
- Remove action requires a confirmation dialog and updates totals/table state.
- View action opens a concise learner detail modal/drawer.

### Manage Teachers
- Search/filterable teacher table with employee ID, advisor.




This is the full high-fidelity rebuild plan for Amore Centralized SIS - keeping it front-end only, green/white K-12, SY 2026-2027.

*Design System to lock first:*
- Palette: deep `#166534` for primary/nav/hero overlay, bright `#22C55E` for accents/charts/CTAs, tint `#F0FDF4` for backgrounds, white cards, text `#14532D / #1F2937`
- Fonts: Inter from Google Fonts, 8px rhythm, radii 12-16px, border `1px solid #DCFCE7`, soft shadow `0 4px 20px rgba(22,101,52,0.06)`
- Build tokens in Tailwind v4 `@theme` - don't hardcode hex everywhere

*Usability issues from mid-fi to fix in hi-fi:*
- Separate Student/Admin buttons -> single form with role detection
- Red college wireframe -> green K-12 language (LRN, Grades 7-12, Filipino, Araling Panlipunan, MAPEH, TLE)
- Teacher redirecting to Admin -> dedicated Teacher dashboard
- No mobile nav, no error/loading/empty states -> add drawer, inline validation, toasts, skeletons
- Tables not responsive -> card list on mobile, table wrapper on desktop
*Information Architecture & Build Order:*

*1. Public Landing:* Sticky header with Amore mark + Open Portal. Hero: PH classroom photo with `linear-gradient(to bottom right, #166534 80%, transparent)` overlay + SY 2026-2027 badge. Metrics (students/teachers/sections/attendance), 3 role feature cards, announcement highlights, school dates, footer. Responsive: 2-col hero desktop, stacked mobile.

*2. Single Login:* Split card. Left: brand panel with photo. Right: one form - email, password with eye toggle, remember-me, forgot link. Role detection: `principal|admin` -> Admin, `teacher|faculty` -> Teacher, `student|[0-9]` -> Student, else inline error. 3 demo chips that autofill `principal@amore.edu.ph` / `teacher@amore.edu.ph` / `student@amore.edu.ph`. Any non-empty password accepted. Sign-out clears state -> landing.

*3. Shared Shell:* Config-driven `rolesConfig = { admin: { nav, label }, teacher, student }`. Components: Sidebar collapsible desktop / overlay drawer mobile, Topbar with search, notifications, avatar menu. Shared primitives: Button, Badge, MetricCard, Panel, Progress, Modal, ConfirmDialog, Field, Select, TableWrapper, EmptyState, Toast, Chart primitives (div + SVG only).

*4. Workspaces:*
- *Admin:* Metrics, enrollment trend line (SVG), attendance by grade bar (div%), grade 7-12 distribution, activity stream, at-risk list
- *Manage Students/Teachers:* Search + filters (grade/section/status), table with LRN/full name/grade-section/guardian/status. Add/Edit modal with validation, View drawer, Delete with confirm. All mutations update in-memory React state only.
- *Teacher:* My sections, today's attendance quick-take, grading queue, student list for advisory
- *Student:* Grades per subject (Filipino, Math, Science, English, AP, MAPEH, TLE, Values Ed), attendance, announcements, profile with LRN

*Data:* Single `mockData.js` with 40 Filipino students Grades 7-12, 12 teachers, 6 sections SY 2026-2027. All state via `useState` + Context, no backend.
