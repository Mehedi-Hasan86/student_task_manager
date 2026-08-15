# Project Report
## Student Task Manager System

**Course:** CSE-3532 — Tools and Technologies for Internet Programming
**Semester:** Spring 2026 (5th Semester), Section 5CM
**Institution:** International Islamic University Chittagong (IIUC)
**Team Members:**
1. Mehedi Hasan Howlader — ID: C241086
2. Mohammad Sadman Tahiat — ID: C241100
3. Minhaj Hasan Rohan — ID: C241101
**Submitted To:** Ahasanul Kalam Akib, Adjunct Lecturer, Department of CSE, IIUC

---

## Cover Page

| Field | Detail |
| :--- | :--- |
| **Project Title** | Student Task Manager System |
| **Course Code** | CSE-3532 |
| **Course Title** | Tools and Technologies for Internet Programming |
| **Credit Hours** | 2.0 |
| **Semester** | Spring 2026 |
| **Section** | 5CM |
| **Institution** | International Islamic University Chittagong (IIUC) |
| **Team Members** | Mehedi Hasan Howlader, Mohammad Sadman Tahiat, Minhaj Hasan Rohan |
| **Submitted To** | Ahasanul Kalam Akib |

---

## Abstract

This project presents a **Student Task Manager System**, a full-stack web application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) to help university students manage their academic tasks efficiently. The system provides a centralized dashboard where students can create, edit, delete, and track tasks with deadlines, priority levels, and status indicators. It features secure authentication via email/password and Google OAuth (Firebase), interactive analytics with Chart.js visualizations, a responsive dark/light theme UI, and smart filtering, search, and sorting capabilities. The application is designed to address the real problem that **67% of university students struggle to organize academic tasks**, leading to missed deadlines and lower performance. The system was developed as a semester project for the course CSE-3532 at IIUC.

---

## Table of Contents

1. Introduction
2. Problem Definition
3. Objectives
4. System Analysis
   - Functional Requirements
   - Non-Functional Requirements
5. System Design
   - ER Diagram
   - Data Flow Diagram (DFD)
6. Technology Used
7. Database Design
8. Screenshots of Project Pages
9. Limitations
10. Future Scope
11. Conclusion

---

## 1. Introduction

University students face increasingly demanding academic workloads. Managing multiple courses, assignments, lab reports, presentations, and personal responsibilities simultaneously is a significant challenge. Traditional methods such as scattered paper notes, generic reminder apps, or relying on memory do not provide structured priority assignment, deadline tracking, or centralized progress visualization.

The **Student Task Manager System** is a purpose-built web application designed to solve these challenges. It provides a centralized, intuitive, and modern dashboard where students can manage all their academic tasks from a single interface accessible on any device. The application uses the MERN (MongoDB, Express.js, React.js, Node.js) stack along with Tailwind CSS for styling, Chart.js for analytics, and Firebase for Google authentication.

---

## 2. Problem Definition

### Problem Statement
University students struggle to organize their academic tasks effectively. Existing solutions are either too generic (like to-do apps not designed for academic contexts) or too fragmented (using different tools for different purposes). There is a lack of a centralized, student-specific task management tool that combines task creation, deadline tracking, priority management, progress visualization, and analytics in one place.

### Why This Project?
- **67% of university students** struggle with task organization, leading to missed deadlines.
- Traditional methods (paper notes, memory, generic apps) lack structured priority and deadline tracking.
- No single tool is designed specifically for the academic workflow of university students.
- Students need a responsive, accessible tool that works on any device.

---

## 3. Objectives

1. Develop a full-stack MERN web application for student task management.
2. Implement secure user authentication with email/password and Google OAuth via Firebase.
3. Provide full CRUD (Create, Read, Update, Delete) operations on academic tasks.
4. Enable task attributes: title, description, deadline, priority (Low/Medium/High), and status (Pending/In Progress/Completed).
5. Build a productivity dashboard with summary statistics and interactive charts (Chart.js).
6. Implement smart search, filtering, and sorting for efficient task retrieval.
7. Design a responsive, accessible UI with dark/light theme support using Tailwind CSS.
8. Ensure the application works seamlessly across mobile, tablet, and desktop devices.

---

## 4. System Analysis

### 4.1 Functional Requirements

| ID | Requirement | Description |
| :--- | :--- | :--- |
| FR-01 | User Registration | Users can create an account with name, email, and password. |
| FR-02 | User Login | Users can log in with email/password or Google OAuth (Firebase). |
| FR-03 | Task Creation | Authenticated users can create tasks with title, description, deadline, priority, and status. |
| FR-04 | Task Listing | Users can view all their tasks in a grid/list layout. |
| FR-05 | Task Editing | Users can edit any field of an existing task. |
| FR-06 | Task Deletion | Users can permanently delete a task with confirmation. |
| FR-07 | Status Management | Users can cycle task status through Pending → In Progress → Completed. |
| FR-08 | Search Tasks | Real-time text search by task title. |
| FR-09 | Filter Tasks | Filter tasks by status and priority level. |
| FR-10 | Sort Tasks | Sort tasks by deadline (asc/desc) or creation date (newest/oldest). |
| FR-11 | Analytics Dashboard | Display summary cards (total, completed, pending, overdue) and Chart.js visualizations. |
| FR-12 | Theme Switcher | Toggle between dark and light themes with persistence via localStorage. |
| FR-13 | Protected Routes | Unauthenticated users cannot access the dashboard; they are redirected to login. |
| FR-14 | User Profile | Display logged-in user name on the dashboard. |
| FR-15 | Logout | Users can log out, clearing stored tokens and user data. |

### 4.2 Non-Functional Requirements

| ID | Requirement | Description |
| :--- | :--- | :--- |
| NFR-01 | Performance | API responses should complete within 500ms under normal load. |
| NFR-02 | Security | Passwords are hashed with bcryptjs (12 salt rounds). JWT tokens used for stateless auth. |
| NFR-03 | Responsiveness | UI must adapt to mobile (320px+), tablet (768px+), and desktop (1024px+) screens. |
| NFR-04 | Usability | Intuitive UI requiring minimal onboarding; consistent design language via Tailwind CSS. |
| NFR-05 | Compatibility | Works on modern browsers (Chrome, Firefox, Safari, Edge). |
| NFR-06 | Scalability | MongoDB Atlas cloud database supports scaling; stateless backend allows horizontal scaling. |
| NFR-07 | Maintainability | Modular code structure with separation of concerns (routes, models, middleware, services). |
| NFR-08 | Availability | The system should be available 99% of the time during development lifecycle. |
| NFR-09 | Accessibility | Semantic HTML, ARIA labels, keyboard navigation support. |

---

## 5. System Design

### 5.1 ER Diagram (Entity Relationship Diagram)

```
┌───────────────────┐       ┌──────────────────────────────────┐
│       User         │       │              Task                 │
├───────────────────┤       ├──────────────────────────────────┤
│ _id      (PK)     │───1:N─│ _id              (PK)            │
│ name      String   │       │ user     (FK) → User._id       │
│ email     String   │       │ title    String, required       │
│ password  String   │       │ description   String            │
│ createdAt  Date    │       │ deadline     Date, required     │
│ updatedAt  Date    │       │ priority     enum: Low/Med/High │
└───────────────────┘       │ status     enum: Pndg/Prog/Done │
                            │ createdAt    Date                │
                            │ updatedAt    Date                │
                            └──────────────────────────────────┘

Relationship: One User has Many Tasks (1:N)
- Each Task belongs to exactly one User
- Tasks are queried and filtered by user._id
```

### 5.2 Data Flow Diagram (DFD)

#### Level 0 (Context Diagram)

```
                        ┌─────────────────────────────────┐
                        │   Student Task Manager System    │
                        │                                  │
                        │  Frontend (React) ◄────► Backend │
                        │  (Vite + Tailwind)   (Express)   │
                        └──────────┬──────────────────────┘
                                   │
                          ┌───────┴───────┐
                          │               │
                     ┌────▼────┐    ┌─────▼─────┐
                     │ MongoDB │    │ Firebase   │
                     │ (Atlas/ │    │ Auth (     │
                     │ Local)  │    │ Google OAuth)│
                     └─────────┘    └────────────┘
```

#### Level 1 (Level 1 DFD — Major Processes)

```
Actor: Student (Browser)

1.0 Authentication Process
   Student → Register/Login → Backend → MongoDB (User) / Firebase Auth
   Backend returns JWT → Student stores in localStorage

2.0 Task Management Process
   Student → CRUD Operations → Backend → MongoDB (Task, filtered by user)
   Backend returns JSON response → Student renders UI

3.0 Analytics Process
   Student → Requests Stats → Backend → Aggregates Task data by status/priority
   Backend returns stats JSON → Student renders charts (Chart.js)

4.0 Theme & UI Process
   Student toggles theme → Context API updates → CSS variables change → Persisted in localStorage
```

---

## 6. Technology Used

### Frontend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| React | ^18.3.1 | UI component library |
| Vite | ^8.0.16 | Build tool and dev server |
| Tailwind CSS | ^3.4.13 | Utility-first CSS framework |
| React Router DOM | ^6.26.2 | Client-side routing |
| Axios | ^1.7.7 | HTTP client for API calls |
| Chart.js | ^4.4.4 | Data visualization library |
| React ChartJS 2 | ^5.2.0 | React wrapper for Chart.js |
| Firebase | ^12.15.0 | Google Authentication |

### Backend
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| Node.js | Runtime | JavaScript server runtime |
| Express.js | ^4.21.0 | Web framework for REST API |
| MongoDB | (cloud/local) | NoSQL document database |
| Mongoose | ^8.6.0 | ODM for MongoDB |
| bcryptjs | ^2.4.3 | Password hashing |
| jsonwebtoken | ^9.0.2 | JWT token generation/verification |
| CORS | ^2.8.5 | Cross-origin resource sharing |
| dotenv | ^16.4.5 | Environment variable management |
| Nodemon | ^3.1.4 | Auto-restart dev server |

### Development Tools
| Tool | Purpose |
| :--- | :--- |
| Git / GitHub | Version control and collaboration |
| VS Code | Code editor |
| Postman / cURL | API testing |
| MongoDB Atlas | Cloud database hosting |
| Chrome DevTools | Debugging and responsive testing |

---

## 7. Database Design

### 7.1 User Collection

```json
{
  "_id": "ObjectId",
  "name": "string (required)",
  "email": "string (required, unique, lowercase)",
  "password": "string (required, minlength 6, bcrypt hashed)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 7.2 Task Collection

```json
{
  "_id": "ObjectId",
  "user": "ObjectId (ref: User, required)",
  "title": "string (required, trimmed)",
  "description": "string (optional, default empty)",
  "deadline": "Date (required)",
  "priority": "string (enum: Low/Medium/High, default Medium)",
  "status": "string (enum: Pending/In Progress/Completed, default Pending)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### 7.3 Database Connection

The backend connects to MongoDB using Mongoose. Two modes are supported:
- **Production:** MongoDB Atlas cloud cluster (connection string in `.env`)
- **Development:** Falls back to `mongodb-memory-server` if local MongoDB is unavailable

---

## 8. Screenshots of Project Pages

### 8.1 Landing Page
![Landing Page](screenshots%20of%20project/landing_page.png)

### 8.2 Home Page / Dashboard
![Dashboard](screenshots%20of%20project/home_page.png)

### 8.3 Dashboard (Light Theme)
![Light Theme Dashboard](screenshots%20of%20project/Home_page_light_theme.png)

### 8.4 Registration Page
![Registration](screenshots%20of%20project/Resisteration.png)

### 8.5 Login Page
![Login](screenshots%20of%20project/log_in.png)

### 8.6 Full Login/Register View
![Full Login/Register](screenshots%20of%20project/full_page_log_in_resister.png)

### 8.7 Firebase Authentication (Google Sign-In)
![Firebase Auth](screenshots%20of%20project/firebase_authentication.png)

### 8.8 Create Task
![Create Task](screenshots%20of%20project/Create_task.png)

### 8.9 Edit Task
![Edit Task](screenshots%20of%20project/Edit_task.png)

### 8.10 MongoDB Atlas Cluster
![MongoDB Cluster](screenshots%20of%20project/Mongodb_cluster_student_task.png)

### 8.11 MongoDB Users Collection
![MongoDB Users](screenshots%20of%20project/Mongodb_cluster_student_task_manager_users.png)

---

## 9. Limitations

1. **No Real-Time Notifications:** The system does not send email or browser push notifications for approaching deadlines or task updates.
2. **No Calendar View:** Tasks are listed in a grid; there is no calendar-based visualization of task timelines.
3. **No File Attachments:** Users cannot upload documents, images, or notes within task cards.
4. **Single User Scope:** The application is designed for individual use; there are no collaboration or shared task features for group projects.
5. **No Offline Support:** The application requires an active internet connection; it does not function offline.
6. **No Email Verification:** User registration does not require email verification, which could allow fake accounts.
7. **Limited Analytics:** The analytics dashboard shows basic counts and distribution charts; advanced insights (e.g., trends over time) are not available.
8. **MongoDB Memory Server in Dev:** When using the in-memory fallback, all data is lost when the server stops — not suitable for production use.
9. **No Rate Limiting:** The API does not implement rate limiting, which could be a security concern in production.
10. **No Input Sanitization Beyond mongoose:** Additional input sanitization against XSS and injection attacks is not explicitly implemented.

---

## 10. Future Scope

1. **Smart Deadline Alerts:** Integrate email (nodemailer) and browser push notifications (Service Workers) to alert users of upcoming deadlines.
2. **Calendar View:** Build an interactive monthly/weekly calendar component showing task density, deadlines, and timelines.
3. **Collaboration Boards:** Add shared task boards for group projects, enabling team members to delegate and track subtasks.
4. **AI Priority Assistant:** Integrate a machine learning model (or rule-based engine) that analyzes deadlines, task descriptions, and historical performance to suggest optimal task priority and scheduling.
5. **Document Attachments:** Allow users to upload lecture slides, notes, PDFs, or screenshots directly inside task cards using GridFS or cloud storage (e.g., Firebase Storage).
6. **React Native Mobile App:** Develop a mobile companion application with offline-first synchronization using AsyncStorage and background sync.
7. **Localization / i18n:** Implement multi-language support, starting with Bengali translation for IIUC's Bengali-medium students.
8. **Admin Panel:** Create an admin dashboard for course instructors to view overall class task completion statistics.
9. **API Rate Limiting & Security Hardening:** Implement express-rate-limit, Helmet.js, and input validation libraries (e.g., Joi) for production readiness.
10. **Email Verification & Password Reset:** Add email verification on registration and a password reset flow using nodemailer or SendGrid.

---

## 11. Conclusion

The **Student Task Manager System** is a fully functional, full-stack MERN web application that successfully addresses the real challenge of academic task management for university students. By integrating secure authentication (email/password and Google OAuth), complete CRUD task management, interactive analytics with Chart.js, a responsive dark/light theme UI, and smart search/filter/sort capabilities, the system provides a cohesive and modern task management experience.

The project demonstrates the practical application of modern web development technologies including React, Node.js, Express, MongoDB, Tailwind CSS, and Firebase. It follows best practices in code organization, modular architecture, and security (bcrypt hashing, JWT authentication, protected routes).

While there are limitations — such as the lack of real-time notifications, calendar view, and collaboration features — the current scope delivers a solid foundation that can be extended with the future enhancements outlined in this report. The project successfully fulfills the requirements for the CSE-3532 course and serves as a learning reference for full-stack web development using the MERN stack.