@echo off
TITLE Reminder Frontend Dev Server
cd /d "%~dp0reminder_front"
echo ==========================================
echo Starting Reminder Frontend Dev Server...
echo Directory: %CD%
echo ==========================================
echo.

:: Detect package manager
set PKG_MANAGER=npm
where pnpm >nul 2>nul
if %ERRORLEVEL% equ 0 (
    set PKG_MANAGER=pnpm
)

:: Check if node_modules exists
if not exist node_modules (
    echo [INFO] node_modules not found. Installing dependencies using %PKG_MANAGER%...
    if "%PKG_MANAGER%"=="pnpm" (
        call pnpm install
    ) else (
        call npm install
    )
    if errorlevel 1 (
        echo [ERROR] Dependency installation failed!
        pause
        exit /b 1
    )
    echo.
)

:: Run development server
echo [INFO] Running development server using %PKG_MANAGER%...
if "%PKG_MANAGER%"=="pnpm" (
    call pnpm run dev
) else (
    call npm run dev
)

pause
