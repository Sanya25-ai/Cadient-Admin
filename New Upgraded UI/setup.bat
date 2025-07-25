@echo off
echo ========================================
echo Cadient Frontend Setup Script
echo ========================================
echo.

echo Installing dependencies...
call npm install

if %errorlevel% neq 0 (
    echo.
    echo ERROR: Failed to install dependencies!
    echo Please make sure Node.js is installed and try again.
    pause
    exit /b 1
)

echo.
echo ========================================
echo Setup completed successfully!
echo ========================================
echo.
echo To start the development server, run:
echo   npm run dev
echo.
echo Then open your browser and go to:
echo   http://localhost:3000/login
echo.
echo IMPORTANT: Make sure your backend server is running on port 8080
echo ========================================
pause
