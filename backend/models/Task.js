/**
 * Task model.
 *
 * Every task belongs to exactly one user (enforced via the `user`
 * reference). Priority and status are constrained to fixed enums shared
 * with the frontend UI.
 */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    /** Owner of the task — required for data isolation between users. */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);