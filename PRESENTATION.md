# Student Task Manager System — Presentation

---

## Title Slide

# **Student Task Manager System**

**CSE-3532: Tools and Technologies for Internet Programming**

- **Team Members:**
  - Mehedi Hasan Howlader (C241086)
  - Mohammad Sadman Tahiat (C241100)
  - Minhaj Hasan Rohan (C241101)
- **Submitted To:** Ahasanul Kalam Akib, Adjunct Lecturer, CSE Department, IIUC
- **Institution:** International Islamic University Chittagong (IIUC)
- **Semester:** Spring 2026, 5th Semester — Section 5CM

---

## Problem Statement

### The Real-Life Problem
University students face demanding academic workloads. Juggling multiple courses, assignments, lab reports, presentations, and personal responsibilities makes task organization critical. Research indicates that **67% of university students struggle to organize academic tasks effectively**, leading to missed deadlines and lower academic performance.

Traditional methods like scattered paper notes, generic reminder apps, or simple memory fail to provide **structured priority, deadline tracking, or centralized progress visualization**.

### Why Webuilt This Project
We needed a purpose-built, responsive web application that gives students a **centralized, intuitive dashboard** to create, manage, prioritize, and track academic tasks on any device — replacing fragmented tools with a single, structured solution.

---

## Objective of the Project

1. **Build a full-stack MERN web application** for managing student academic tasks.
2. **Provide secure authentication** with email/password signup and Google OAuth login via Firebase.
3. **Enable full CRUD operations** on tasks — create, read, update, delete with title, description, deadline, priority, and status.
4. **Visualize productivity** through interactive charts (Chart.js) — doughnut for status distribution and bar charts for priority levels.
5. **Deliver a responsive, theme-aware UI** — dark/light mode with Tailwind CSS, accessible on mobile, tablet, and desktop.
6. **Implement smart filtering, search, and sorting** for efficient task management.

---

## Features

### 🔒 Authentication & Security
- Email/password registration and login with `bcryptjs` hashing (salt rounds: 12)
- JWT-based stateless authentication stored in `localStorage`
- Google OAuth via Firebase Authentication with backend sync
- Protected routes — unauthenticated users are redirected to Login

### 📝 Task Lifecycle Management (CRUD)
- **Create:** Title, description, deadline, priority (`Low`/`Medium`/`High`), status
- **Read:** All tasks for the logged-in user with search, filter, and sort
- **Update:** Edit any field; cycle status via `Pending → In Progress → Completed`
- **Delete:** Permanent removal with confirmation dialog

### 📊 Analytics & Dashboard
- **Summary Cards:** Total, Completed, Pending, and real-time Overdue counts
- **Search:** Real-time text search by task title
- **Filters:** By status (Pending/In Progress/Completed) and priority (Low/Medium/High)
- **Sort:** By deadline (asc/desc) or creation date (newest/oldest)
- **Charts:** Doughnut chart (status distribution) + Bar chart (priority distribution)

### 🌓 Design & Usability
- **Dark/Light Mode:** Dynamic theme switcher using CSS variables + React Context API
- **Responsive Layout:** Mobile-first design with Tailwind CSS grid and flexbox
- **Toast Feedback:** Inline error/success messages for user actions

---

## Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18 (Vite) | Declarative UI component architecture |
| **Styling** | Tailwind CSS | Utility-first responsive layouts + dark/light themes |
| **State Management** | React Context API | Global auth state and theme state |
| **HTTP Client** | Axios | API calls with JWT interceptor |
| **Charts** | Chart.js + react-chartjs-2 | Doughnut and bar chart visualizations |
| **Backend** | Node.js + Express.js | RESTful API server |
| **Database** | MongoDB + Mongoose | Document database with ODM |
| **Auth Services** | JWT, bcryptjs, Firebase Auth | Email/password auth + Google OAuth |
| **Dev Tools** | Git, GitHub, VS Code | Version control & collaboration |

---

## System Architecture

```
┌──────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                  │
│  ┌───────────┐  ┌────────────┐  ┌───────────────────┐  │
│  │ React SPA │  │ Tailwind   │  │ Chart.js          │  │
│  │ Vite      │  │ CSS        │  │ + react-chartjs-2 │  │
│  └─────┬─────┘  └────────────┘  └───────────────────┘  │
│        │  Axios HTTP Requests (JWT in headers)          │
│        ▼                                                │
│  ┌───────────────────────────────────────────────────┐   │
│  │           Backend (Node.js + Express.js)          │   │
│  │  ┌──────────┐  ┌──────────┐  ┌────────────────┐ │   │
│  │  │ Auth      │  │ Task CRUD│  │ Stats Endpoint │ │   │
│  │  │ /api/auth │  │ /api/tasks│ │ /api/tasks/stats││   │
│  │  └────┬─────┘  └────┬─────┘  └────────────────┘ │   │
│  │       │  JWT Middleware (protect)                   │   │
│  │       ▼                                              │   │
│  │  ┌────────────────────────────────────────────────┐│   │
│  │  │              MongoDB (Mongoose ODM)            ││   │
│  │  │  ┌──────────┐  ┌──────────┐                   ││   │
│  │  │  │ User      │  │ Task     │                   ││   │
│  │  │  └──────────┘  └──────────┘                   ││   │
│  │  └────────────────────────────────────────────────┘│   │
│  └────────────────────────────────────────────────────┘   │
│                                                           │
│  External: Firebase Auth (Google OAuth) + MongoDB Atlas   │
└───────────────────────────────────────────────────────────┘
```

---

## Database Design

### Table: `User`
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | String | ✅ | Full name of the user |
| `email` | String | ✅ | Unique email (lowercase) |
| `password` | String | ✅ | bcrypt-hashed password (min 6 chars) |
| `createdAt` | Date | auto | Account creation timestamp |
| `updatedAt` | Date | auto | Last update timestamp |

### Table: `Task`
| Field | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `user` | ObjectId (ref: User) | ✅ | — | Owner of the task |
| `title` | String | ✅ | — | Task title (trimmed) |
| `description` | String | ❌ | `''` | Optional task details |
| `deadline` | Date | ✅ | — | Task due date |
| `priority` | String (enum) | ❌ | `Medium` | Low / Medium / High |
| `status` | String (enum) | ❌ | `Pending` | Pending / In Progress / Completed |
| `createdAt` | Date | auto | — | Creation timestamp |
| `updatedAt` | Date | auto | — | Last update timestamp |

---

## Project Screenshots

| Screenshot | Description |
| :--- | :--- |
| ![Landing Page](screenshots%20of%20project/landing_page.png) | Landing page with hero section and feature cards |
| ![Home Page](screenshots%20of%20project/home_page.png) | Dashboard with summary cards and task list |
| ![Light Theme](screenshots%20of%20project/Home_page_light_theme.png) | Dashboard in light theme mode |
| ![Registration](screenshots%20of%20project/Resisteration.png) | User registration page |
| ![Login](screenshots%20project/log_in.png) | Login page with email/password form |
| ![Full Login/Register](screenshots%20of%20project/full_page_log_in_resister.png) | Full login and registration view |
| ![Firebase Auth](screenshots%20of%20project/firebase_authentication.png) | Google sign-in via Firebase Authentication |
| ![Create Task](screenshots%20of%20project/Create_task.png) | Creating a new task (modal form) |
| ![Edit Task](screenshots%20of%20project/Edit_task.png) | Editing an existing task |
| ![MongoDB Cluster](screenshots%20of%20project/Mongodb_cluster_student_task.png) | MongoDB Atlas cluster — database overview |
| ![MongoDB Users](screenshots%20of%20project/Mongodb_cluster_student_task_manager_users.png) | MongoDB Atlas — users collection |

---

## Challenges Faced

1. **Firebase to Backend Sync:** Google OAuth users authenticate via Firebase, but we needed them to exist in our MongoDB database too. We solved this with a `/api/auth/firebase` endpoint that creates or finds a user and returns a JWT.
2. **Real-Time Search with Debounce:** Implementing live search without excessive API calls required a 300ms debounce timer in the Dashboard component.
3. **JWT Token Management:** Keeping the token in `localStorage` and auto-redirecting on 401 responses required Axios interceptors on both request and response sides.
4. **Dark/Light Mode Persistence:** Theme state needed to persist across page reloads using `localStorage` and the `prefers-color-scheme` media query, with class-level toggling on the `<html>` element.
5. **MongoDB Memory Server Fallback:** When local MongoDB is unavailable, the system falls back to `mongodb-memory-server` for development — but data resets on server restart, which was a trade-off for development convenience.

---

## Future Improvement

1. **Smart Deadline Alerts:** Email notifications and browser push alerts for tasks approaching their deadline.
2. **Calendar View:** Interactive monthly/weekly calendar showing task density and timelines.
3. **Collaboration Boards:** Multi-user shared boards for group assignments with subtask delegation.
4. **AI Priority Assistant:** ML model analyzing deadlines, descriptions, and past performance to suggest optimal priority.
5. **Document Attachments:** Upload lecture slides, notes, PDFs, or screenshots inside task cards.
6. **React Native Mobile App:** Offline-first mobile companion app with sync capabilities.
7. **Localization:** Multi-language support starting with Bengali translation for IIUC students.

---

## Conclusion

The **Student Task Manager System** successfully delivers a modern, full-stack MERN web application that solves a real problem: helping university students organize, prioritize, and track their academic tasks in one centralized, intuitive platform. It combines secure authentication, full CRUD task management, interactive analytics, and a responsive dark/light UI into a cohesive experience. The project demonstrates practical application of React, Node.js, Express, MongoDB, and modern web development practices — making it a strong outcome for the CSE-3532 course.