# ApnaPay - Start All Microservices & Frontend in Separate Windows
# Cleanly terminates any old processes on the ports first to prevent "Port already in use" errors

$rootDir = $PSScriptRoot.TrimEnd('\')

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  ApnaPay Microservices Launcher (Clean)  " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Step 0: Free up ports 8080, 8081, 8082, 8083, 5173
Write-Host "Checking and freeing ports 8080, 8081, 8082, 8083, 5173..." -ForegroundColor Yellow
$ports = @(8080, 8081, 8082, 8083, 5173)
foreach ($p in $ports) {
    $pids = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
    foreach ($procId in $pids) {
        if ($procId -gt 4) {
            Write-Host "Closing process on port $p (PID: $procId)..." -ForegroundColor DarkYellow
            cmd.exe /c "taskkill /F /PID $procId /T" 2>$null
        }
    }
}
Start-Sleep -Seconds 2

# 1. Auth Service (Port 8081)
Write-Host "[1/5] Starting Auth Service on port 8081..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k", "cd /d `"$rootDir\auth-service`" && title Auth-Service [8081] && mvnw.cmd spring-boot:run"

Start-Sleep -Seconds 2

# 2. Customer Service (Port 8082)
Write-Host "[2/5] Starting Customer Service on port 8082..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k", "cd /d `"$rootDir\customer-service`" && title Customer-Service [8082] && mvnw.cmd spring-boot:run"

Start-Sleep -Seconds 2

# 3. Transaction Service (Port 8083)
Write-Host "[3/5] Starting Transaction Service on port 8083..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k", "cd /d `"$rootDir\transaction-service`" && title Transaction-Service [8083] && mvnw.cmd spring-boot:run"

# Wait a few seconds for microservices to initialize before starting gateway
Write-Host "Waiting 6 seconds for microservices to initialize..." -ForegroundColor DarkGray
Start-Sleep -Seconds 6

# 4. API Gateway (Port 8080)
Write-Host "[4/5] Starting API Gateway on port 8080..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k", "cd /d `"$rootDir\api-gateway`" && title API-Gateway [8080] && mvnw.cmd spring-boot:run"

# 5. Frontend UI (Port 5173)
Write-Host "[5/5] Starting Frontend on port 5173..." -ForegroundColor Green
Start-Process cmd -ArgumentList "/k", "cd /d `"$rootDir\frontend`" && title ApnaPay-Frontend [5173] && npm run dev"

Write-Host ""
Write-Host "==========================================" -ForegroundColor Green
Write-Host " All services launched successfully!      " -ForegroundColor Green
Write-Host " Open: http://localhost:5173             " -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Green
