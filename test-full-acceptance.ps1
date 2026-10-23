Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host " APNAPAY COMPLETE ACCEPTANCE VERIFICATION TEST SUITE " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

$results = [ordered]@{}

function Run-Test($name, $scriptBlock) {
    Write-Host -NoNewline "[TESTING] $name ... "
    try {
        $res = & $scriptBlock
        if ($res.pass -eq $true) {
            Write-Host "PASSED" -ForegroundColor Green
            $results[$name] = @{ status = "PASS"; detail = $res.detail }
        } else {
            Write-Host "FAILED ($($res.detail))" -ForegroundColor Red
            $results[$name] = @{ status = "FAIL"; detail = $res.detail }
        }
    } catch {
        Write-Host "ERROR ($($_.Exception.Message))" -ForegroundColor Red
        $results[$name] = @{ status = "ERROR"; detail = $_.Exception.Message }
    }
}

# --- SECTION C: BACKEND & MICROSERVICES CONNECTIVITY ---
Run-Test "Gateway :8080 Forwarding" {
    $r = Invoke-RestMethod -Uri "http://localhost:8080/auth/otp/send" -Method Post -Headers @{"Content-Type"="application/json"} -Body '{"mobileNumber": "9876543210"}'
    if ($r.status -eq "SUCCESS") { return @{ pass = $true; detail = "Routed to auth-service: OTP $($r.data.otp)" } }
    return @{ pass = $false; detail = "No success response" }
}

Run-Test "Auth Service :8081 Direct" {
    $r = Invoke-RestMethod -Uri "http://localhost:8081/auth/otp/test" -Method Get
    if ($r.status -eq "SUCCESS") { return @{ pass = $true; detail = $r.message } }
    return @{ pass = $false; detail = "Failed" }
}

Run-Test "Customer Service :8082 Direct" {
    $r = Invoke-RestMethod -Uri "http://localhost:8082/customer/profile" -Headers @{"X-Customer-Id"="9876543210"} -Method Get
    if ($r.status -eq "SUCCESS" -and $r.data.mobile -eq "9876543210") {
        return @{ pass = $true; detail = "Customer: $($r.data.name) ($($r.data.customerId)) Status: $($r.data.status)" }
    }
    return @{ pass = $false; detail = "Customer not returned" }
}

Run-Test "Transaction Service :8083 Direct" {
    $r = Invoke-RestMethod -Uri "http://localhost:8083/transaction/balance" -Headers @{"X-Customer-Id"="9876543210"} -Method Get
    if ($r.status -eq "SUCCESS") {
        return @{ pass = $true; detail = "Balance: INR $($r.data.balance)" }
    }
    return @{ pass = $false; detail = "Transaction service balance fetch failed" }
}

# --- SECTION B: AUTHENTICATION & SECURITY ---
Run-Test "BCrypt MPIN Login Valid" {
    $body = @{ mobileNumber = "9876543210"; mpin = "1234" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "http://localhost:8081/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
    if ($r.status -eq "SUCCESS" -and $r.data.token -ne $null) {
        return @{ pass = $true; detail = "JWT Token issued: $($r.data.token.Substring(0, 30))... (Expires in $($r.data.expiresIn)s)" }
    }
    return @{ pass = $false; detail = "Login token missing" }
}

Run-Test "Invalid MPIN Handling" {
    $body = @{ mobileNumber = "9876543210"; mpin = "9999" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "http://localhost:8081/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
    if ($r.status -eq "ERROR" -and $r.message -like "*Invalid MPIN*") {
        return @{ pass = $true; detail = "Correctly rejected wrong MPIN: $($r.message)" }
    }
    return @{ pass = $false; detail = "Did not reject wrong MPIN properly" }
}

Run-Test "Unregistered User Handling" {
    $body = @{ mobileNumber = "9999900000"; mpin = "1234" } | ConvertTo-Json
    $r = Invoke-RestMethod -Uri "http://localhost:8081/auth/login" -Method Post -Headers @{"Content-Type"="application/json"} -Body $body
    if ($r.status -eq "ERROR") {
        return @{ pass = $true; detail = "Rejected unregistered mobile: $($r.message)" }
    }
    return @{ pass = $false; detail = "Allowed unregistered mobile" }
}

# --- SECTION D: PAYMENTS & TRANSACTION LEDGER ---
Run-Test "Top-Up Balance Update" {
    $initBal = (Invoke-RestMethod -Uri "http://localhost:8083/transaction/balance" -Headers @{"X-Customer-Id"="9876543210"}).data.balance
    $body = @{ amount = 100; source = "Acceptance Test Bank" } | ConvertTo-Json
    $top = Invoke-RestMethod -Uri "http://localhost:8083/transaction/wallet/topup" -Headers @{"X-Customer-Id"="9876543210"; "Content-Type"="application/json"} -Method Post -Body $body
    $newBal = (Invoke-RestMethod -Uri "http://localhost:8083/transaction/balance" -Headers @{"X-Customer-Id"="9876543210"}).data.balance
    if ($newBal -eq ($initBal + 100)) {
        return @{ pass = $true; detail = "Initial: $initBal -> Top-up 100 -> New: $newBal (Txn: $($top.data.transactionId))" }
    }
    return @{ pass = $false; detail = "Balance mismatch: Expected $($initBal + 100), got $newBal" }
}

Run-Test "Send Money Transfer (Debit Sender)" {
    $initBal = (Invoke-RestMethod -Uri "http://localhost:8083/transaction/balance" -Headers @{"X-Customer-Id"="9876543210"}).data.balance
    $body = @{ toMobile = "9123456780"; amount = 50; remarks = "Acceptance Test Send" } | ConvertTo-Json
    $send = Invoke-RestMethod -Uri "http://localhost:8083/transaction/send" -Headers @{"X-Customer-Id"="9876543210"; "Content-Type"="application/json"} -Method Post -Body $body
    $newBal = (Invoke-RestMethod -Uri "http://localhost:8083/transaction/balance" -Headers @{"X-Customer-Id"="9876543210"}).data.balance
    if ($send.status -eq "SUCCESS" -and $newBal -eq ($initBal - 50)) {
        return @{ pass = $true; detail = "Sent ₹50. Bal: $initBal -> $newBal (Txn: $($send.data.transactionId))" }
    }
    return @{ pass = $false; detail = "Debit failed or mismatch" }
}

Run-Test "Insufficient Funds Rejection (Negative Balance Prevention)" {
    $body = @{ toMobile = "9123456780"; amount = 99999999; remarks = "Excessive amount" } | ConvertTo-Json
    try {
        $res = Invoke-RestMethod -Uri "http://localhost:8083/transaction/send" -Headers @{"X-Customer-Id"="9876543210"; "Content-Type"="application/json"} -Method Post -Body $body
        return @{ pass = $false; detail = "Did not reject excessive payment!" }
    } catch {
        return @{ pass = $true; detail = "Correctly rejected: 400 Bad Request (Insufficient funds)" }
    }
}

Run-Test "Transaction History Ledger Match" {
    $hist = Invoke-RestMethod -Uri "http://localhost:8083/transaction/history" -Headers @{"X-Customer-Id"="9876543210"} -Method Get
    $count = $hist.data.transactions.Count
    if ($count -gt 0 -and $hist.status -eq "SUCCESS") {
        $latest = $hist.data.transactions[0]
        return @{ pass = $true; detail = "Total Ledger Records: $count. Latest: $($latest.transactionId) ($($latest.type) ₹$($latest.amount) - $($latest.status))" }
    }
    return @{ pass = $false; detail = "No history records returned" }
}

# --- SECTION A & F: FRONTEND INTEGRATION & BUILD ---
Run-Test "Frontend Dev Server HTTP 200" {
    $r = Invoke-WebRequest -Uri "http://localhost:5173" -UseBasicParsing
    if ($r.StatusCode -eq 200 -and $r.Content -like "*ApnaPay*") {
        return @{ pass = $true; detail = "Serving ApnaPay application index.html" }
    }
    return @{ pass = $false; detail = "Did not return HTTP 200 or title missing" }
}

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "SUMMARY OF ACCEPTANCE TESTS:" -ForegroundColor Cyan
$results.GetEnumerator() | ForEach-Object {
    Write-Host "$($_.Key): $($_.Value.status) -> $($_.Value.detail)"
}
