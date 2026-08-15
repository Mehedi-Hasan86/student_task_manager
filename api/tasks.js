const { connectDB } = require('../lib/db');
const Task = require('../lib/models/Task');
const { protect } = require('../lib/middleware/auth');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
  await connectDB();

  const { method, url, body, headers, query } = req;
  const path = url.replace('/api/tasks', '') || '/';

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Auth middleware
  let user;
  if (headers.authorization && headers.authorization.startsWith('Bearer')) {
    try {
      const token = headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const User = require('../lib/models/User');
      user = await User.findById(decoded.id).select('-password');
      if (!user) {
        return res.status(401).json({ message: 'User not found' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  const userId = user._id;

  try {
    // Get stats
    if (method === 'GET' && path === '/stats') {
      const tasks = await Task.find({ user: userId });
      const now = new Date();

      const stats = {
        total: tasks.length,
        completed: tasks.filter((t) => t.status === 'Completed').length,
        pending: tasks.filter((t) => t.status === 'Pending').length,
        inProgress: tasks.filter((t) => t.status === 'In Progress').length,
        overdue: tasks.filter(
          (t) => t.status !== 'Completed' && new Date(t.deadline) < now
        ).length,
        byStatus: {
          Pending: tasks.filter((t) => t.status === 'Pending').length,
          'In Progress': tasks.filter((t) => t.status === 'In Progress').length,
          Completed: tasks.filter((t) => t.status === 'Completed').length,
        },
        byPriority: {
          Low: tasks.filter((t) => t.priority === 'Low').length,
          Medium: tasks.filter((t) => t.priority === 'Medium').length,
          High: tasks.filter((t) => t.priority === 'High').length,
        },
      };

      return res.json(stats);
    }

    // Get all tasks
    if (method === 'GET' && path === '/') {
      const { search, status, priority, sort } = query;
      const filter = { user: userId };

      if (search) {
        filter.title = { $regex: search, $options: 'i' };
      }
      if (status) {
        filter.status = status;
      }
      if (priority) {
        filter.priority = priority;
      }

      let sortOption = { createdAt: -1 };
      if (sort === 'deadline') sortOption = { deadline: 1 };
      if (sort === 'deadline-desc') sortOption = { deadline: -1 };
      if (sort === 'created') sortOption = { createdAt: -1 };
      if (sort === 'created-asc') sortOption = { createdAt: 1 };

      const tasks = await Task.find(filter).sort(sortOption);
      return res.json(tasks);
    }

    // Create task
    if (method === 'POST' && path === '/') {
      const { title, description, deadline, priority, status } = body;

      if (!title || !deadline) {
        return res.status(400).json({ message: 'Title and deadline are required' });
      }

      const task = await Task.create({
        user: userId,
        title,
        description,
        deadline,
        priority,
        status,
      });

      return res.status(201).json(task);
    }

    // Get single task
    if (method === 'GET' && path.startsWith('/') && path !== '/') {
      const id = path.slice(1);
      const task = await Task.findOne({ _id: id, user: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      return res.json(task);
    }

    // Update task
    if (method === 'PUT' && path.startsWith('/') && path !== '/') {
      const id = path.slice(1);
      const task = await Task.findOne({ _id: id, user: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }

      const { title, description, deadline, priority, status } = body;
      if (title !== undefined) task.title = title;
      if (description !== undefined) task.description = description;
      if (deadline !== undefined) task.deadline = deadline;
      if (priority !== undefined) task.priority = priority;
      if (status !== undefined) task.status = status;

      const updated = await task.save();
      return res.json(updated);
    }

    // Delete task
    if (method === 'DELETE' && path.startsWith('/') && path !== '/') {
      const id = path.slice(1);
      const task = await Task.findOne({ _id: id, user: userId });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      await task.deleteOne();
      return res.json({ message: 'Task removed' });
    }

    return res.status(404).json({ message: 'Route not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};