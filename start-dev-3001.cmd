@echo off
cd /d "%~dp0"
npm --prefix frontend run dev -- -p 3001 --hostname 127.0.0.1
