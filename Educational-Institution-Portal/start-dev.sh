#!/bin/bash
# Educational Institution Portal - Startup Script for Mac/Linux

echo "Starting Educational Institution Portal..."
echo ""
echo "Starting Backend Server (Port 3000)..."
cd "$(dirname "$0")/backend"
npm run dev &
BACKEND_PID=$!

sleep 2

echo ""
echo "Starting Frontend Server (Port 4200)..."
cd "$(dirname "$0")/frontend"
npm start &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Services available at:"
echo "  Frontend: http://localhost:4200"
echo "  Backend API: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all services"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
