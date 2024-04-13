@ECHO off

:: Checks dependencies and prompts the user to install them (using winget) if missing.
:: If winget is not installed falls back to printing info
:: Returns exit code 69 :) if dependencies still don't exist at end of execution
:: checks for git and node

:: If you make a change to the functionality of this script you should also make sure to add the same functionality to 'dependencyCheck.sh'

SETLOCAL EnableDelayedExpansion

:: Set working directory
SET BASEDIR=%~dp0

:: check for dependencies
where /q git
IF %ERRORLEVEL% EQU 0 SET git="true"

where /q node
IF %ERRORLEVEL% EQU 0 SET node="true"

IF DEFINED git (
	:: And this is why I hate batch, nested if statements just to do an and operation
	IF DEFINED node (
		CALL :modulesCheck
		EXIT /b !ERRORLEVEL!
	)
)

:: Otherwise prompt the user
ECHO This project has some optional dependencies that enable features that we believe will make the development process easier and more fruitful.
ECHO You are seeing this because some or all of these dependencies are missing.
ECHO If you wish to no longer see this, please use the simple compiler. 'simple-compiler.bat'
ECHO.
ECHO Here is a list of the packages that are missing:

IF NOT DEFINED git CALL :gitMessage

IF NOT DEFINED node CALL :nodeMessage

:: check for winget
where /q winget
IF ERRORLEVEL 1 (
	CALL :manualInstall
	EXIT /b !ERRORLEVEL!
)

ECHO.
ECHO Should the packages listed above be installed automatically using the Windows package manager?
ECHO Administrator access may be required to install these packages.
ECHO If you do not want us to install these dependencies automatically, decline and the required commands will be printed out to do so manually.

:: ask for confirmation
CHOICE /C YN /N /M "Continue with the automatic installation? [Y/N]?"
IF %ERRORLEVEL% EQU 1 (
	CALL :automaticInstall
	EXIT /b !ERRORLEVEL!
) ELSE (
	CALL :manualInstall
	EXIT /b !ERRORLEVEL!
)

:: we should never hit this exit code
ECHO Code should have never gotten here!!!
EXIT /B 2

:gitMessage
ECHO   git, https://git-scm.com/, needed to interact with the .git folder in this project.
ECHO     Allows for things like:
ECHO       Keeping multiple compiled versions of FC based of the commit they were compiled with.
ECHO       The sanity checks have this as a hard dependency.
GOTO :eof

:nodeMessage
ECHO   Node.js, https://nodejs.org/, enables all of the new sanity checks and the advanced compiler.
ECHO     Allows for things like:
ECHO       Source maps for easier debugging: https://dzone.com/articles/what-are-source-maps-and-how-to-properly-use-them
ECHO       JavaScript linting to catch bugs early using ESLint: https://eslint.org/
ECHO       JavaScript type checking to catch bugs early using the Typescript compiler: https://www.typescriptlang.org/
ECHO       Custom sanity checks to catch common errors.
ECHO       Spell checking using the cSpell project: https://cspell.org/
ECHO       Tweaking of compiler and sanity check settings using 'setup.bat'
ECHO       Manage and run FCHost using 'FCHost.bat'
ECHO       Copy FC to FCHost (if installed) after each successful compile
ECHO       Automatic rebuilding and hot reloading of FC when file changes occur using 'watcher.bat'
:: TODO: @franklygeorge: update as we add the rest of the features
GOTO :eof

:modulesCheck
:: if node_modules doesn't exist
IF NOT EXIST node_modules (
	ECHO.
	ECHO All optional dependencies for the advance compiler are installed, but the Node modules are not installed.
	ECHO.
	ECHO These packages should take up less than 500MB of disk space. ~150 MB at time of writing.
	ECHO They will be stored in the 'node_modules' directory inside of the project directory.
	ECHO.
	CHOICE /C YN /N /M "Would you like us to run 'npm install' to install them for you? [Y/N]?"
	IF !ERRORLEVEL! EQU 1 (
		CALL npm install
		:: Check for missing node dependencies
		CALL node .\devTools\scripts\dependencyCheck.js
		ECHO.
	) ELSE (
		ECHO.
		EXIT /B 69
	)
) ELSE (
	:: Check for missing node dependencies
	CALL node .\devTools\scripts\dependencyCheck.js
)
GOTO :eof

:ensureDependenciesAndExit
	:: wait for user input
	<nul set /p "=Press any key to continue..."
		pause >nul
	ECHO.

	:: check for dependencies
	where /q git
	IF %ERRORLEVEL% EQU 0 SET git="true"

	where /q node
	IF %ERRORLEVEL% EQU 0 SET node="true"

	:: if no missing dependencies, exit with code 0, else exit with code 69
	IF DEFINED git (
		:: And this is why I hate batch, nested if statements and redundant code just to do an and operation
		IF DEFINED node (
			CALL :modulesCheck
            EXIT /b !ERRORLEVEL!
        ) ELSE (
            ECHO.
            EXIT /b 69
		)
	) ELSE (
		ECHO.
		EXIT /b 69
	)
GOTO :eof

:manualInstall
	:: prints out the info for manual installation
    :: waits for user input
    :: checks for dependencies
    :: and then exits
	ECHO.
	ECHO To install these packages run the commands below.
	ECHO.
	ECHO "winget install Git.Git OpenJS.NodeJS -e --no-upgrade"
	ECHO.
	ECHO or download git from https://git-scm.com/download/win
	ECHO and download Node.js from https://nodejs.org
	ECHO.
	ECHO. After installing you will need to restart your command prompt and/or editor and run this again.
	ECHO.
	ECHO You should install these packages now if you wish to do so.
	CALL :ensureDependenciesAndExit
	EXIT /b %ERRORLEVEL%
GOTO :eof

:automaticInstall
	:: Install using winget
	ECHO.
	ECHO Executing "winget install Git.Git OpenJS.NodeJS -e --no-upgrade"
	CALL winget install Git.Git OpenJS.NodeJS -e --no-upgrade
	:: Windows has no official or reliable way to update the shell's system environments
	:: Technical there is a way but it's hacky and fails on several edge cases. One of the edge cases being PowerShell
	:: You would have thought that they would have build this into Winget so that they would have feature parity with the Linux package managers they were mimicking, but no they couldn't possible do that...
	:: As such we need the user to manually restart their console :(
	ECHO To continue please restart your command prompt and/or editor and run this again.
	:: Wait basically forever
	TIMEOUT /T 99999 /NOBREAK > NUL
GOTO :eof
