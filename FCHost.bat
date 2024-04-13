@ECHO off
:: Free Cities FCHost Launcher - Windows

:: run dependencyCheck.bat
CALL .\devTools\scripts\dependencyCheck.bat
SET CODE=%ERRORLEVEL%

IF %CODE% EQU 69 (
	:: if exit code is 69, then we don't have all the dependencies we need
	ECHO.
	ECHO Dependencies not met.
    ECHO.
	EXIT /b 0
) ELSE IF %CODE% EQU 0 (
	:: if exit code is 0, run FCHostInstallAndRun.js
	CALL node devTools\scripts\FCHostInstallAndRun.js
	EXIT /b 0
) ELSE (
	:: if exit code is not 0, print error message
	ECHO.
	ECHO dependencyCheck.bat exited with code: %CODE%
	ECHO Dependency check failed unexpectedly.
    ECHO.
    EXIT /b 0
)
