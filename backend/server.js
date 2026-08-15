require('dotenv').config();
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Student Task Manager API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const distIndex = path.join(__dirname, '../frontend/dist/index.html');

if (process.env.NODE_ENV === 'production' && fs.existsSync(distIndex)) {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(distIndex);
  });
}

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
