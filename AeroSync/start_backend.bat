@echo off
echo =======================================================
echo   Starting AeroSync Java REST API Backend (Port 8080)
echo =======================================================
cd /d "%~dp0\AeroSync"
javac -d bin src/*.java
java -cp bin AeroSyncServer
pause
