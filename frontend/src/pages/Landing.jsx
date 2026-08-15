/**
 * Landing page — public marketing / hero view shown at "/".
 *
 * Introduces the application and links to the Register and Login pages.
 * The feature list is static content defined inline for simplicity.
 */
import { Link } from 'react-router-dom';

/** Feature highlights rendered as cards on the landing page. */
const FEATURES = [
  { title: 'Task Management', desc: 'Create, edit, delete tasks with deadlines and priority levels.' },
  { title: 'Smart Dashboard', desc: 'Visual summary of total, completed, pending, and overdue tasks.' },
  { title: 'Search & Filter', desc: 'Live search by title, filter by status, sort by deadline.' },
  { title: 'Progress Tracking', desc: 'Toggle tasks between Pending, In Progress, and Completed.' },
  { title: 'Analytics Charts', desc: 'Chart.js visualizations for status and priority distribution.' },
  { title: 'Dark / Light Mode', desc: 'Comfortable theme for studying day or night.' },
];

export default function Landing() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      {/* Hero section */}
      <div className="text-center">
        <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700 dark:bg-primary-900/40 dark:text-primary-300">
          IIUC CSE-3532 Project
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
          Student Task Manager
          <span className="block text-primary-600">System</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
          A centralized platform for university students to create, manage, prioritize, and track
          academic tasks — from a single dashboard accessible on any device.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/register" className="btn-primary px-8 py-3 text-base">
            Get Started Free
          </Link>
          <Link to="/login" className="btn-secondary px-8 py-3 text-base">
            Sign In
          </Link>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 text-center text-sm text-gray-500 dark:text-gray-500">
        Mehedi Hasan Howlader · Mohammad Sadman Tahiat · Minhaj Hasan Rohan
      </p>
    </div>
  );
}