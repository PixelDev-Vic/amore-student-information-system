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
- Search/filterable teacher table with employee ID, advisory class, subject assignments, contact, and status.
- Add, Edit, View, and Remove flows using the same reusable modal/confirmation patterns.

### Classes & Subjects
- Grade/section cards or table showing adviser, room, learner count, schedule summary, and assigned subjects.
- Class detail view with subject-to-teacher assignments.
- Add/Edit class or subject assignment modal; changes update the current session state.

### Announcement Approval
- Queue of teacher-submitted announcements with author, audience, submission date, priority, and message preview.
- Approve and Reject actions update queue status and dashboard pending count; rejection asks for a short reason.
- Approved items appear in the published list and relevant role announcement feeds.

### Attendance Overview
- Daily attendance KPIs, date and grade filters, attendance-by-grade visualization, and an absentees/late table.
- Status legend for Present, Late, Absent, and Excused.

### Reports
- Report cards for enrollment, attendance, grade distribution, class masterlists, and faculty load.
- Filters for report type, grade level, and period.
- “Export CSV” generates a real browser download from mock/current state.
- “Print / Save as PDF” opens a clean printable report view through the browser print dialog, making PDF export functional without a PDF library.

### Settings
- Editable school profile and current academic year/term settings.
- Local save action with confirmation toast; no server persistence claim.

## Teacher Workspace

### Overview
- Welcome header, today’s class count, total assigned learners, attendance completion, and pending grade tasks.
- Today’s schedule, recent class activity, and school/approved announcements.

### My Classes
- Assigned Grade 7–12 section cards with subject, schedule, room, and learner count.
- Class roster detail with learner status and quick links into attendance or gradebook.

### Attendance
- Select class and date, then mark learners Present/Late/Absent/Excused.
- “Mark all present” shortcut and Save action; changes persist in in-memory state and update completion indicators.

### Gradebook
- Select a class/subject and edit quarterly grades for Filipino, Mathematics, Science, English, MAPEH, TLE, and related subjects.
- Validate grades to the 60–100 range, derive remarks (Passed/Needs Improvement), and save with feedback.

### Announcements
- List submitted announcements and statuses (Pending, Approved, Rejected).
- Compose modal for title, audience, priority, and message; submission adds to the Principal approval queue.

### Schedule and Profile
- Weekly teaching schedule in a responsive card/table representation.
- Teacher profile, advisory assignment, subjects, and contact details.

## Student Workspace

### Overview
- Personalized learner profile for a realistic Filipino Grade 10 student, current section/adviser, overall average, attendance rate, and active school year.
- Today’s classes, upcoming activities, recent grades, and approved announcements.

### My Grades
- Quarterly grade table for K–12 subjects with overall average, remarks, and simple progress visualization.
- Quarter selector with realistic values and clear pending states where applicable.

### Schedule
- Mobile-friendly weekly class schedule showing subject, teacher, time, and room.

### Attendance
- Attendance summary by month and subject, plus recent attendance records using the shared status system.

### Enrollment / School Record
- Enrollment status, LRN, grade/section, guardian and emergency details, and downloadable/printable enrollment summary.

### Profile
- Readable personal, guardian, and academic information panels.
- “Request profile update” opens a working modal and submits a local request with success feedback.

## Data and State Design
- Move all demo records into a typed `src/data/mockData.ts` module, including users, students, teachers, classes, subjects, attendance, grades, announcements, events, and report rows.
- Define shared domain types in `src/types.ts` for roles, tabs, users, records, announcement statuses, and attendance statuses.
- Keep application-level state in `App.tsx` (active public/authenticated view, logged-in role, mutable student/teacher/announcement datasets, toast state). Pass focused state/actions into role panels; avoid adding a state-management library.
- Keep role-local UI state (selected tab, filters, open modal, draft form) inside each dashboard component.
- Ensure derived metrics and charts are calculated from current state where practical so CRUD and approval actions visibly affect the UI.

## Proposed File Structure
- `src/App.tsx` — app-level routing/session and shared mutable mock state.
- `src/index.css` — Tailwind import, Inter wiring, theme variables, base styles, scrollbar, print rules, and small reusable animation utilities.
- `src/types.ts` — shared domain and navigation types.
- `src/data/mockData.ts` — all realistic SY 2026–2027 demo content.
- `src/components/ui.tsx` — compact shared primitives (buttons, cards, badges, modal, fields, tables, toast, charts).
- `src/components/AppShell.tsx` — responsive authenticated shell and navigation.
- `src/components/LandingPage.tsx` — public marketing/overview page.
- `src/components/LoginPage.tsx` — split-screen login and role detection.
- `src/components/AdminDashboard.tsx` — all Principal/Admin modules.
- `src/components/TeacherDashboard.tsx` — all Teacher modules.
- `src/components/StudentDashboard.tsx` — all Student modules.

This split is intentionally role-oriented: it removes the current 1,300-line monolith without introducing a deep component hierarchy or unnecessary framework abstractions.

## Visual and Asset Implementation
- Before implementation, invoke the repository design-system procedure and use its guidance to establish the shared visual primitives.
- Invoke the Unsplash procedure to select one context-appropriate Filipino school/classroom image for the landing hero and login panel; use an approved remote image URL with a dark green overlay and meaningful alt text. If no suitable image is available, use a local CSS/illustrative fallback rather than an unrelated photo.
- Add `lucide-react` for consistent interface icons; remove Unicode-symbol navigation and action icons.
- Use Inter through a Google Fonts CSS2 import in `src/index.css` (no private-font workflow required).
- Keep motion restrained: subtle hover elevation, sidebar/drawer transitions, modal fade/scale, and toast entrance; honor reduced-motion preferences.
- Meet basic accessibility expectations: semantic headings/landmarks, keyboard-operable controls, visible focus rings, labelled forms, modal close controls, adequate contrast, and icon text/ARIA labels.

## Interaction and Edge-Case Requirements
- Tables become horizontally scrollable or switch to stacked cards on narrow screens; primary actions remain reachable.
- Empty searches and filters show a useful empty state with a clear reset action.
- Modals close through explicit cancel/close actions and Escape; destructive actions always require confirmation.
- Forms prevent blank required fields and display field-level errors.
- Login prevents invalid routing for unknown emails.
- Grade inputs reject nonnumeric/out-of-range values.
- Announcement rejection requires a reason; approval/rejection cannot be applied twice.
- Export handles current filters and uses sanitized filenames containing the report type and SY.
- Buttons that represent prototype-only external services (forgot password, online service links) open a clear informational toast instead of appearing broken.

## Implementation Sequence
1. Invoke the design-system and Unsplash procedures, choose the photo, and establish tokens/global styles.
2. Add shared types and realistic mock data, then create the reusable UI primitives and icon treatment.
3. Rebuild app-level navigation, single login role detection, sign-in/sign-out state, and the responsive shared shell.
4. Implement the public landing page and split-screen login.
5. Implement Principal/Admin modules, including linked mutable CRUD data, approval queue, attendance, and report exports.
6. Implement Teacher modules and connect announcement submissions to the same approval queue.
7. Implement Student modules and approved-announcement consumption.
8. Add responsive, accessibility, empty/error, toast, print, and reduced-motion behavior.
9. Format and verify the completed React app without touching the static print prototype.

## Verification Strategy
- Run the repository formatter entry point (`./.figma/make/format`) after broad edits.
- Run `pnpm build` because this is a broad multi-file TypeScript/UI rewrite; resolve all TypeScript and Vite build failures.
- Do not start another development server; rely on the existing Figma Make server and hot reload.
- Manually exercise in the preview at desktop and mobile widths:
  - landing navigation and CTA;
  - invalid login plus all three demo role routes;
  - sidebar collapse and mobile drawer;
  - Admin student/teacher add, edit, view, and remove;
  - class/subject editing;
  - teacher announcement submission followed by admin approval/rejection;
  - teacher attendance and grade validation/save;
  - student grades, schedule, attendance, enrollment, and profile request;
  - CSV download and browser print report;
  - modal keyboard/close behavior, empty searches, and sign-out.
- Confirm `git diff -- medium-fidelity/index.html` is empty and only intended React/dependency files changed.

## Acceptance Criteria
- The React app presents a consistent high-fidelity green-and-white visual system with responsive desktop/mobile layouts.
- Landing, login, Principal/Admin, Teacher, and Student experiences are complete and navigable.
- Login is one email-driven form and routes valid demo emails to the correct role.
- Principal/Admin includes school stats/charts, student and teacher management, classes/subjects, announcement approvals, attendance, reports/export, and user CRUD modals.
- Teacher includes classes, attendance, gradebook, announcement submission, schedule, and profile.
- Student includes overview, K–12 grades, schedule, attendance, enrollment record, and profile.
- Mock content consistently uses Filipino identities, Grades 7–12, K–12 subjects, and SY 2026–2027.
- Repeated visual and behavioral patterns use shared components, and iconography is consistent.
- Core demo actions provide visible state changes or feedback; no primary action appears inert.
- The app builds successfully, and `medium-fidelity/index.html` remains unchanged.
