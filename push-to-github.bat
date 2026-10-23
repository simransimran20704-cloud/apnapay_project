@echo off
title Push ApnaPay to GitHub
echo ==========================================================
echo   Pushing ApnaPay Repository to GitHub
echo   Target: https://github.com/simransimran20704-cloud/ApnaPay.git
echo ==========================================================

echo.
echo Make sure you have created the empty repository "ApnaPay" at:
echo https://github.com/new
echo.

git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ==========================================================
    echo [SUCCESS] ApnaPay successfully pushed to GitHub!
    echo View it at: https://github.com/simransimran20704-cloud/ApnaPay
    echo ==========================================================
) else (
    echo.
    echo [NOTE] If repository was not found, create "ApnaPay" on GitHub first:
    echo 1. Open https://github.com/new
    echo 2. Repository name: ApnaPay
    echo 3. Click "Create repository"
    echo 4. Run this script again!
)

pause
