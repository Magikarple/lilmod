@echo off
:: run a Node based web server

:: Set working directory
pushd %~dp0
SET BASEDIR=%~dp0

:: check for node
where /q node
IF ERRORLEVEL 1 (
	ECHO Node is required to run this http server.
	exit /b 0
)

:: if the node_modules directory doesn't exist
IF NOT EXIST .\node_modules\ (
	ECHO Node available, but the required Node modules are not installed.
	CHOICE /C YN /N /M "Would you like us to run 'npm install' to install Node modules, using ~120 MB of disk space [Y/N]?"
	IF !errorlevel!==1 (
		ECHO Installing Node modules...
		CALL npm install
	) ELSE (
		ECHO Requirements not met, exiting...
		exit /b 0
	)
)

CALL npx http-server --port 6969 -c-1
