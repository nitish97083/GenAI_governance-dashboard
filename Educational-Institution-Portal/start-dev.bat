@echo off
REM Educational Institution Portal - Startup Script for Windows
echo Starting Educational Institution Portal...
echo.
echo This will open 2 new command windows - one for backend and one for frontend
echo.
echo Starting Backend Server (Port 3000)...
start cmd /k "cd backend && npm run dev"
echo.
timeout /t 2
echo Starting Frontend Server (Port 4200)...
start cmd /k "cd frontend && npm start"
echo.
echo Both servers should now be running:
echo Backend: http://localhost:3000
echo Frontend: http://localhost:4200
echo.
pause
