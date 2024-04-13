@ECHO off
:: Free Cities Compiler - Windows

:processargs
SET ARG=%1
IF DEFINED ARG (
	:: exit without user input
	if "%ARG%"=="--no-wait" SET "NOWAIT=True"
    SHIFT
    GOTO processargs
)

:: run dependencyCheck.bat
CALL .\devTools\scripts\dependencyCheck.bat
SET CODE=%ERRORLEVEL%

IF %CODE% EQU 69 (
	:: if exit code is 69, then we don't have all the dependencies we need
	:: fall back to the simple compiler
	ECHO.
	ECHO Dependencies not met, falling back to simple compiler.
    ECHO.
    :: run simple-compiler.bat, passing all arguments to it
	CALL ./simple-compiler.bat %*
	EXIT /b 0
) ELSE IF %CODE% EQU 0 (
	:: if exit code is 0, run new compiler passing all arguments to it
	CALL node devTools\scripts\advancedCompiler.js

	EXIT /b 0
) ELSE (
	:: if exit code is not 0, print error message and then attempt to fall back to the simple compiler
	ECHO.
	ECHO dependencyCheck.bat exited with code: %CODE%
	ECHO Dependency check failed unexpectedly, falling back to the simple compiler.
    ECHO.
	CALL ./simple-compiler.bat %*
    EXIT /b 0
)
