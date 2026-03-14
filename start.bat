@echo off
REM Governance Dashboard - Start both frontend and backend

echo 🚀 Starting Governance Dashboard...

REM Check if .env exists in backend
if not exist "backend\.env" (
    echo ❌ Please create backend/.env file with your OpenAI API key
    echo    Copy backend/.env and set OPENAI_API_KEY=your_key_here
    pause
    exit /b 1
)

REM Start backend in background
echo 📡 Starting FastAPI backend...
start /B cmd /C "cd backend && python main.py"

REM Wait a moment for backend to start
timeout /t 3 /nobreak > nul

REM Start frontend
echo 🌐 Starting Angular frontend...
start /B cmd /C "npm start"

echo ✅ Both services started!
echo 📱 Frontend: http://localhost:4200
echo 🔧 Backend: http://localhost:8000
echo.
echo Press any key to exit...
pause > nul