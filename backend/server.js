/**
 * Express server entry point.
 *
 * Sets up middleware, mounts the auth/task routers and (in production,
 * when a frontend build exists) serves the static SPA. Deployment note:
 * on Vercel this server runs as a "Service" behind the /api rewrites
 * defined in vercel.json — the static-serving block below is only used
 * for standalone / Render-style hosting.
 */
require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

// Global middleware: CORS for cross-origin clients, JSON body parsing.
app.use(cors());
app.use(express.json());

/** Health check used by the deployment platform and monitoring. */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Student Task Manager API is running' });
});

// API routers.
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Production static serving (standalone hosting only — see file header).
const distIndex = path.join(__dirname, '../frontend/dist/index.html');

if (process.env.NODE_ENV === 'production' && fs.existsSync(distIndex)) {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(distIndex);
  });
}

// 404 fallback for unknown API routes.
app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

/** Connects to the database, then starts listening. */
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();