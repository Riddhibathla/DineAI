@echo off
cd /d "%~dp0frontend"
"C:\Program Files\nodejs\node.exe" ..\node_modules\next\dist\bin\next dev --webpack -p 3001 --hostname 127.0.0.1
