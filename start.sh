#!/bin/bash

# Governance Dashboard - Start both frontend and backend

echo "🚀 Starting Governance Dashboard..."

# Check if .env exists in backend
if [ ! -f "backend/.env" ]; then
    echo "❌ Please create backend/.env file with your OpenAI API key"
    echo "   Copy backend/.env and set OPENAI_API_KEY=your_key_here"
    exit 1
fi

# Start backend in background
echo "📡 Starting FastAPI backend..."
cd backend
python main.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "🌐 Starting Angular frontend..."
cd ..
npm start &
FRONTEND_PID=$!

echo "✅ Both services started!"
echo "📱 Frontend: http://localhost:4200"
echo "🔧 Backend: http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop both services"

# Wait for Ctrl+C
trap "echo '🛑 Stopping services...'; kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait