# Student Task Manager System
A comprehensive, full-stack academic productivity web application built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) for **CSE-3532 (Tools and Technologies for Internet Programming)**.

---

## 🎓 Academic Course Metadata
* **Course Code:** CSE-3532
* **Course Title:** Tools and Technologies for Internet Programming
* **Credit Hours:** 2.0
* **Semester:** Spring 2026 (5th Semester)
* **Section:** 5CM
* **Institution:** International Islamic University Chittagong (IIUC)


### 👥 Submission Details
#### Submitted By (Team Members):
1. **Mehedi Hasan Howlader** — ID: `C241086`
2. **Mohammad Sadman Tahiat** — ID: `C241100`
3. **Minhaj Hasan Rohan** — ID: `C241101`



#### Submitted To:
* **Ahasanul Kalam Akib**, Adjunct Lecturer, Department of Computer Science & Engineering (CSE), IIUC.

---

## 📌 Project Overview & Problem Statement
### The Problem
University students face demanding academic workloads. Juggling multiple courses, assignments, lab reports, presentations, and personal responsibilities makes task organization critical. However, research indicates that **67% of university students struggle to organize academic tasks effectively**, leading to missed deadlines and lower academic performance. Traditional methods like scattered paper notes, generic reminder apps, or simple memory fail to provide structured priority, deadline tracking, or centralized progress visualization.

### The Solution
The **Student Task Manager System** is a purpose-built, responsive web application designed to solve these exact challenges. It provides students with a centralized, intuitive, and modern dashboard to create, manage, prioritize, and track academic tasks on any device.

---

## 🛠️ Technology Stack

| Layer | Technology | Usage in Project |
| :--- | :--- | :--- |
| **Frontend** | React (Vite) | Declarative UI component architecture. |
| **Styling** | Tailwind CSS | Utility-first styling for responsive layouts and light/dark theme adaptation. |
| **State & Auth** | Context API & Axios | Global user auth state, Axios interceptors for attaching JWT headers. |
| **Analytics** | Chart.js | Visual statistics (doughnut and bar charts) on task status and priorities. |
| **Backend** | Node.js & Express.js | RESTful API server handling business logic and routing. |
| **Database** | MongoDB & Mongoose | Document database for persistent storage, using Object Data Modeling (ODM). |
| **Auth Services** | JWT, bcryptjs, Firebase Auth | Multi-user email/password signup and direct Google OAuth login integration. |
| **Dev Tooling** | Git/GitHub, VS Code | Version control and collaborative workspace. |

---

## ✨ Key Features & Highlights

### 🔒 1. Secure Authentication & Protected Routing
* **Local Auth:** Account creation and login secured with `bcryptjs` password hashing (salt round of 12) and stateless JSON Web Tokens (JWT) stored in the browser's local storage.
* **Google OAuth / Firebase:** Direct login using Firebase Authentication (`GoogleAuthProvider`). Authenticated Firebase logins automatically sync with the backend database via a dedicated endpoint, provisioning a JWT token.
* **Protected Views:** React Route guards (`ProtectedRoute`) redirect unauthenticated requests to the Login page.

### 📝 2. Full Task Lifecycle Management (CRUD)
* **Creation:** Title, description, due date/deadline, priority level (`Low`, `Medium`, `High`), and initial status.
* **Tracking & Statuses:** Toggle task states smoothly between `Pending`, `In Progress`, and `Completed`.
* **Modifications & Cleanups:** In-place editing of fields and permanent deletion of tasks.

### 📊 3. Productivity Dashboard & Interactive Visual Analytics
* **Summary Cards:** Total tasks, completed tasks, pending tasks, and real-time calculated overdue tasks.
* **Search & Filters:** Real-time text search by title; filter by status and priority; sorting by deadline (ascending/descending) or creation date.
* **Chart.js Graphics:** Dynamic, responsive doughnut and bar charts visualizing task distribution by status and priority levels.

### 🌓 4. Design & Usability (UX)
* **Dark / Light Mode:** Dynamic theme switcher using CSS variables and React Context API to adapt to different environments.
* **Responsive Layout:** Mobile, tablet, and desktop friendly interfaces built with responsive Tailwind grids and flexboxes.

---

## 📂 Project Architecture

```text
student_task_manager/
├── backend/
│   ├── config/
│   │   └── db.js            # MongoDB connection utility
│   ├── middleware/
│   │   └── auth.js          # JWT protection middleware
│   ├── models/
│   │   ├── Task.js          # Task schema definitions (Mongoose)
│   │   └── User.js          # User schema & password hashing methods
│   ├── routes/
│   │   ├── auth.js          # Auth endpoints (Register, Login, Firebase sync)
│   │   └── tasks.js         # Task CRUD & stats calculation endpoints
│   ├── .env.example         # Environment variables template
│   ├── server.js            # Express server initialization
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # UI components (Navbar, SummaryCards, TaskCard, TaskChart, TaskForm)
│   │   ├── config/          # Firebase initialization & Google Auth setup
│   │   ├── context/         # AuthContext & ThemeContext
│   │   ├── pages/           # Pages (Landing, Dashboard, Login, Register)
│   │   ├── services/        # Axios API instances & service functions
│   │   ├── App.jsx          # Route structures & layout setup
│   │   ├── index.css        # Tailwind config & CSS variables (Dark/Light themes)
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js       # Vite configuration with local proxy (/api -> localhost:5000)
│   └── package.json
│
├── run.sh                   # Unix shell script to run backend and frontend concurrently
└── run.bat                  # Windows batch script to run backend and frontend concurrently
```

---

## 🗄️ Database Schemas

### User Schema (`backend/models/User.js`)
* `name` (String, required)
* `email` (String, required, unique, lowercase)
* `password` (String, required, minlength 6)
* `timestamps` (createdAt, updatedAt)

### Task Schema (`backend/models/Task.js`)
* `user` (ObjectId, ref: 'User', required)
* `title` (String, required, trimmed)
* `description` (String, optional)
* `deadline` (Date, required)
* `priority` (String, enum: `['Low', 'Medium', 'High']`, default: `Medium`)
* `status` (String, enum: `['Pending', 'In Progress', 'Completed']`, default: `Pending`)
* `timestamps` (createdAt, updatedAt)

---

## 🔌 API Endpoints Mapping

### Health Check
* `GET` `/api/health` — Returns backend health status.

### Authentication Endpoints
* `POST` `/api/auth/register` — Register a new account.
* `POST` `/api/auth/login` — Login with email/password and obtain a JWT.
* `POST` `/api/auth/firebase` — Sync/authenticate Google-authenticated users via Firebase.
* `GET` `/api/auth/me` — Retrieve the currently logged-in user profile (requires Bearer Token).

### Tasks Endpoints (All routes below require Bearer JWT Authentication)
* `GET` `/api/tasks` — Retrieve list of tasks (supports queries: `?search=`, `?status=`, `?priority=`, `?sort=`).
* `GET` `/api/tasks/stats` — Retrieve summary counts and groupings by status/priority.
* `POST` `/api/tasks` — Create a new task.
* `GET` `/api/tasks/:id` — Get single task details.
* `PUT` `/api/tasks/:id` — Update task fields (title, priority, status, due date, description).
* `DELETE` `/api/tasks/:id` — Remove a task from the system.

---

## ⚙️ Installation & Setup

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or higher recommended)
* [MongoDB](https://www.mongodb.com/try/download/community) running locally or a [MongoDB Atlas](https://www.mongodb.com/atlas) cluster connection string.

### Setup Instructions

#### 1. Backend Setup
```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
```
Open the newly created `.env` file and configure it:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_task_manager # Or your MongoDB Atlas connection string
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```
Start the backend server in development mode:
```bash
npm run dev
```
Backend API will be running at `http://localhost:5000`.

#### 2. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```
The client app will be running at `http://localhost:5173`.
Vite dev server is pre-configured with a reverse proxy, forwarding client `/api/*` traffic automatically to backend server port `5000`.

---

## 🚀 Running Both Servers Concurrently

For ease of development, automated startup scripts are provided in the project root directory:

### On Linux / macOS:
Ensure the script is executable:
```bash
chmod +x run.sh
./run.sh
```

### On Windows:
Double-click or run the batch file:
```cmd
run.bat
```
These scripts concurrently start the backend and frontend dev servers and output their respective outputs. Stopping the terminal will safely terminate both child processes.

---

## 🔮 Expected Outcomes & Future Roadmap
### Expected Outcomes
Upon successful integration, the system:
* Empowers students to manage, schedule, and review academic workloads with minimal effort.
* Increases deadline awareness through clear visual status cards, highlighting upcoming tasks.
* Visualizes progress to let students prioritize crucial tasks and make smarter academic choices.

### Future Scope & Enhancements
1. **Smart Deadline Alerts:** Integrations for sending automatic email updates and browser push notifications for tasks reaching their due date.
2. **Calendar View:** An interactive monthly/weekly calendar dashboard indicating task density and timelines.
3. **Collaboration Boards:** Multi-user shared boards for group assignments, letting students delegate subtasks.
4. **AI Priority Assistant:** Machine learning models that analyze user deadlines, task descriptions, and historic performance to suggest ideal task priority.
5. **Document Attachments:** Allowing users to upload lecture slides, notes, PDFs, or screenshots directly inside task cards.
6. **React Native Mobile App:** A mobile companion with offline-first synchronization capabilities.
7. **Localizations:** Multi-language interface, starting with Bengali translation.

---

## 📄 License & Academic Integrity
Academic Project Submission for course **CSE-3532** at **International Islamic University Chittagong (IIUC)**. All rights reserved by developers. Feel free to use as a study reference.
