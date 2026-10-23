@echo off
setlocal
set TIMESTAMP=%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=%TIMESTAMP: =0%
set BACKUP_DIR=.\backups
if not exist "%BACKUP_DIR%" mkdir "%BACKUP_DIR%"

set MYSQLDUMP="C:\Program Files\MySQL\MySQL Server 8.0\bin\mysqldump.exe"

echo ==============================================================
echo [ApnaPay Production Backup] Dumping MySQL txn_db and auth_db...
echo ==============================================================

if exist %MYSQLDUMP% (
    %MYSQLDUMP% -u root -pvaishu0020 --databases txn_db auth_db > "%BACKUP_DIR%\apnapay_backup_%TIMESTAMP%.sql"
    echo [SUCCESS] Backup saved to %BACKUP_DIR%\apnapay_backup_%TIMESTAMP%.sql
) else (
    echo [ERROR] mysqldump.exe not found at standard path.
)

pause
