@echo off
title Stop All ApnaPay Services
echo ===================================================
echo   Stopping all running ApnaPay processes...
echo ===================================================

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$ports = @(8080, 8081, 8082, 8083, 5173); ^
   foreach ($p in $ports) { ^
     $pids = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique; ^
     foreach ($procId in $pids) { ^
       if ($procId -gt 4) { ^
         Write-Host 'Stopping PID ' $procId ' on port ' $p -ForegroundColor Yellow; ^
         cmd.exe /c \"taskkill /F /PID $procId /T\" 2>$null; ^
       } ^
     } ^
   }; ^
   Write-Host 'All ports (8080, 8081, 8082, 8083, 5173) are now clean and free!' -ForegroundColor Green"

echo.
echo Ports 8080, 8081, 8082, 8083, 5173 have been released.
pause
