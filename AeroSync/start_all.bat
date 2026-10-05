@echo off
echo =======================================================
echo   Launching AeroSync Full Stack Application
echo =======================================================
start "AeroSync Java Backend" cmd /k "%~dp0start_backend.bat"
timeout /t 2 /nobreak >nul
start "AeroSync React Frontend" cmd /k "%~dp0start_frontend.bat"
echo AeroSync is launching!
echo Backend URL:  http://localhost:8080
echo Frontend URL: http://localhost:5173
pause
