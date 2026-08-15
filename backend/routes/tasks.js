/**
 * Task routes — /api/tasks.
 *
 * All routes require JWT authentication (router-level protect) and scope
 * every query to the authenticated user, so users can never see or modify
 * each other's tasks. Supports search / filter / sort via query params
 * and computes summary statistics for the dashboard.
 */
const express = require('express');
const Task = require('../models/Task');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

/** GET /api/tasks/stats — summary counts for the dashboard cards/charts. */
router.get('/stats', async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
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

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * GET /api/tasks — list tasks with optional filtering and sorting.
 * Query params: ?search= (title regex), ?status=, ?priority=, ?sort=
 * (deadline | deadline-desc | created | created-asc).
 */
router.get('/', async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query;
    const filter = { user: req.user._id };

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
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** POST /api/tasks — create a new task for the current user. */
router.post('/', async (req, res) => {
  try {
    const { title, description, deadline, priority, status } = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ message: 'Title and deadline are required' });
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      deadline,
      priority,
      status,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** GET /api/tasks/:id — fetch a single task (scoped to the owner). */
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** PUT /api/tasks/:id — partially update a task (scoped to the owner). */
router.put('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Only assign fields that were actually provided.
    const { title, description, deadline, priority, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (deadline !== undefined) task.deadline = deadline;
    if (priority !== undefined) task.priority = priority;
    if (status !== undefined) task.status = status;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/** DELETE /api/tasks/:id — remove a task (scoped to the owner). */
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.deleteOne();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;