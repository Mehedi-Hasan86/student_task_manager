#!/bin/bash

echo "Starting Backend and Frontend servers..."

# Run backend in the background
cd backend && npm run dev &
BACKEND_PID=$!

# Run frontend in the background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Handle shutdown safely
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT TERM EXIT

echo "Backend running with PID $BACKEND_PID"
echo "Frontend running with PID $FRONTEND_PID"
echo "Press Ctrl+C to stop both servers."

wait
