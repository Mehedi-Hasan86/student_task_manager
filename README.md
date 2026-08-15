# Student Task Manager System 🎓

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
| **Frontend** | React 18 (Vite) | Declarative UI component architecture with fast HMR. |
| **Styling** | Tailwind CSS | Utility-first styling for responsive layouts and light/dark theme adaptation. |
| **State & Auth** | Context API & Axios | Global user auth state, Axios interceptors for attaching JWT headers. |
| **Analytics** | Chart.js & react-chartjs-2 | Visual statistics (doughnut and bar charts) on task status and priorities. |
| **Backend** | Node.js & Express.js | RESTful API server handling business logic, authentication, and routing. |
| **Database** | MongoDB & Mongoose | Document database for persistent storage, using Object Data Modeling (ODM). |
| **Auth Services** | JWT, bcryptjs, Firebase Auth | Multi-user email/password signup and direct Google OAuth login integration. |
| **Deployment** | Render / Node Server | Production static serving via Express middleware & Render automation. |
| **Dev Tooling** | Git/GitHub, VS Code | Version control, branch management, and collaborative workspace. |

---

## ✨ Key Features & Highlights

### 🔒 1. Secure Authentication & Protected Routing
* **Local Auth:** Account creation and login secured with `bcryptjs` password hashing (salt round of 12) and stateless JSON Web Tokens (JWT) stored in browser local storage.
* **Google OAuth / Firebase:** Direct login using Firebase Authentication (`GoogleAuthProvider`). Authenticated Firebase logins automatically sync with the backend database via a dedicated endpoint, provisioning a JWT token.
* **Protected Views:** React Route guards (`ProtectedRoute`) redirect unauthenticated requests to the Login page.

### 📝 2. Full Task Lifecycle Management (CRUD)
* **Creation:** Title, description, due date/deadline, priority level (`Low`, `Medium`, `High`), and initial status (`Pending`, `In Progress`, `Completed`).
* **Tracking & Statuses:** Toggle task states smoothly between `Pending`, `In Progress`, and `Completed`.
* **Modifications & Cleanups:** In-place editing of fields and permanent deletion of tasks.

### 📊 3. Productivity Dashboard & Interactive Visual Analytics
* **Summary Cards:** Real-time counts for Total Tasks, Completed Tasks, Pending Tasks, and calculated Overdue Tasks.
* **Search & Filters:** Real-time text search by title; filter by status and priority; sorting by deadline (ascending/descending) or creation date.
* **Chart.js Graphics:** Dynamic, responsive doughnut and bar charts visualizing task distribution by status and priority levels.

### 🌓 4. Design & Usability (UX)
* **Dark / Light Mode:** Dynamic theme switcher using CSS variables and React Context API to adapt seamlessly to user preference.
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
│   ├── server.js            # Express server initialization & production static serving
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
├── screenshots of project/   # Application preview screenshots
├── package.json             # Monorepo root build & deployment scripts
├── render.yaml              # Render blueprint deployment configuration
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
* `POST` `/api/auth/register` — Register a new account (`name`, `email`, `password`).
* `POST` `/api/auth/login` — Login with email/password and obtain a JWT.
* `POST` `/api/auth/firebase` — Sync/authenticate Google-authenticated users via Firebase ID token (`name`, `email`, `firebaseUid`).
* `GET` `/api/auth/me` — Retrieve the currently logged-in user profile (requires Bearer Token).

### Tasks Endpoints (All routes below require Bearer JWT Authentication)
* `GET` `/api/tasks` — Retrieve list of tasks (supports query params: `?search=`, `?status=`, `?priority=`, `?sort=`).
* `GET` `/api/tasks/stats` — Retrieve summary counts and groupings by status/priority.
* `POST` `/api/tasks` — Create a new task (`title`, `description`, `deadline`, `priority`, `status`).
* `GET` `/api/tasks/:id` — Get single task details.
* `PUT` `/api/tasks/:id` — Update task fields (`title`, `description`, `deadline`, `priority`, `status`).
* `DELETE` `/api/tasks/:id` — Remove a task from the system.

---

## 🔑 Environment Variables Reference

### Backend (`backend/.env`)
| Key | Description | Example / Default |
| :--- | :--- | :--- |
| `PORT` | Server listening port | `5000` |
| `MONGODB_URI` | MongoDB connection URI | `mongodb://127.0.0.1:27017/student_task_manager` |
| `JWT_SECRET` | Secret key for JWT signing | `your_super_secret_jwt_key` |
| `NODE_ENV` | Environment mode | `development` or `production` |

### Frontend (`frontend/.env`)
| Key | Description |
| :--- | :--- |
| `VITE_FIREBASE_API_KEY` | Firebase Web API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase App ID |

---

## ⚙️ Installation & Local Setup

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
Open `.env` and configure your credentials:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/student_task_manager
JWT_SECRET=your_super_secret_jwt_key_change_in_production
```
Start the backend dev server:
```bash
npm run dev
```
Backend API will run at `http://localhost:5000`.

#### 2. Frontend Setup
```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the frontend dev server
npm run dev
```
Client app will run at `http://localhost:5173`.
Vite dev server is pre-configured with a reverse proxy forwarding `/api/*` requests to port `5000`.

---

## 🚀 Running Concurrently & Production Build

### Concurrent Local Execution
Convenient scripts are provided in the root folder:

* **Linux / macOS:**
  ```bash
  chmod +x run.sh
  ./run.sh
  ```
* **Windows:**
  ```cmd
  run.bat
  ```

### Production Build & Deployment
To build both frontend assets and serve them via Express:

```bash
# Install all dependencies and build frontend bundle
npm run build

# Start production server
npm start
```

### Deploying to Render
The repository includes a `render.yaml` Blueprint specification. Simply connect the repository to Render to auto-deploy the MongoDB instance and Node.js web service.

---

## 🔮 Expected Outcomes & Future Roadmap

### Expected Outcomes
Upon deployment, the system:
* Empowers students to manage, schedule, and review academic workloads with minimal effort.
* Increases deadline awareness through clear visual status cards, highlighting upcoming tasks.
* Visualizes progress to let students prioritize crucial tasks and make smarter academic choices.

### Future Scope & Enhancements
1. **Smart Deadline Alerts:** Integrations for sending automatic email updates and browser push notifications for upcoming tasks.
2. **Calendar View:** Interactive monthly/weekly calendar dashboard indicating task density and timelines.
3. **Collaboration Boards:** Multi-user shared boards for group assignments, allowing task delegation.
4. **AI Priority Assistant:** Machine learning models that analyze user deadlines and task descriptions to suggest optimal priority.
5. **Document Attachments:** Allowing users to upload lecture slides, notes, PDFs, or screenshots directly inside task cards.
6. **Mobile Companion:** React Native cross-platform application with offline-first synchronization capabilities.
7. **Localization:** Multi-language interface, starting with Bengali translation support.

---

## 📄 License & Academic Integrity
Academic Project Submission for course **CSE-3532** at **International Islamic University Chittagong (IIUC)**. All rights reserved by the development team.
