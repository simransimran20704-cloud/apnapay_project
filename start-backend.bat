@echo off
title Launch ApnaPay Backend Microservices
echo ===================================================
echo   Starting ApnaPay Backend Microservices
echo ===================================================

powershell -NoProfile -ExecutionPolicy Bypass -Command ^
  "$rootDir = '%~dp0'.TrimEnd('\'); ^
   Write-Host '1. Freeing ports 8080, 8081, 8082, 8083...' -ForegroundColor Yellow; ^
   @(8080, 8081, 8082, 8083) | ForEach-Object { ^
     $p = $_; ^
     Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique | ForEach-Object { ^
       if ($_ -gt 4) { cmd.exe /c \"taskkill /F /PID $_ /T\" 2>$null } ^
     } ^
   }; ^
   Start-Sleep -Seconds 2; ^
   Write-Host '2. Starting Auth Service (8081)...' -ForegroundColor Green; ^
   Start-Process cmd -ArgumentList '/k', \"cd /d `\"$rootDir\auth-service`\" && title Auth-Service [8081] && mvnw.cmd spring-boot:run\"; ^
   Start-Sleep -Seconds 3; ^
   Write-Host '3. Starting Customer Service (8082)...' -ForegroundColor Green; ^
   Start-Process cmd -ArgumentList '/k', \"cd /d `\"$rootDir\customer-service`\" && title Customer-Service [8082] && mvnw.cmd spring-boot:run\"; ^
   Start-Sleep -Seconds 3; ^
   Write-Host '4. Starting Transaction Service (8083)...' -ForegroundColor Green; ^
   Start-Process cmd -ArgumentList '/k', \"cd /d `\"$rootDir\transaction-service`\" && title Transaction-Service [8083] && mvnw.cmd spring-boot:run\"; ^
   Start-Sleep -Seconds 5; ^
   Write-Host '5. Starting API Gateway (8080)...' -ForegroundColor Green; ^
   Start-Process cmd -ArgumentList '/k', \"cd /d `\"$rootDir\api-gateway`\" && title API-Gateway [8080] && mvnw.cmd spring-boot:run\"; ^
   Write-Host '===================================================' -ForegroundColor Cyan; ^
   Write-Host 'All 4 backend services launched in separate windows!' -ForegroundColor Cyan; ^
   Write-Host 'Gateway Port: 8080' -ForegroundColor Cyan; ^
   Write-Host '===================================================' -ForegroundColor Cyan;"

pause
