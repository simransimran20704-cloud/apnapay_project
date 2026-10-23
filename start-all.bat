@echo off
title ApnaPay Complete System Launcher
echo ========================================
echo   Launching ApnaPay Microservices & UI
echo ========================================

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0start-all.ps1"
pause
