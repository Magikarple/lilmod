@echo off
:: Free Cities Basic Compiler - Windows

:: Set working directory
pushd %~dp0
SET BASEDIR=%~dp0
SETLOCAL EnableDelayedExpansion

:: process arguments from command line
:processargs
SET ARG=%1
IF DEFINED ARG (
	:: legacy arguments
    IF "%ARG%"=="EXTRAMEMORY" SET SORT_MEM=65535
	IF "%ARG%"=="EMEMORY" SET SORT_MEM=65535
	IF "%ARG%"=="EXTRAMEM" SET SORT_MEM=65535
	IF "%ARG%"=="--extramem" SET SORT_MEM=65535
	:: create theme
	if "%ARG%"=="--themes" SET "THEMES=True"
	if "%ARG%"=="--help" GOTO :help
	:: exit without user input
	if "%ARG%"=="--no-wait" SET "NOWAIT=True"
    SHIFT
    GOTO processargs
)

:legacybuild

:: if the bin directory doesn't exist, then create it
if NOT EXIST .\bin\ (
	MKDIR .\bin\
)

if DEFINED THEMES (
	CALL :compile_themes
)

ECHO Compiling FC...
ECHO Press Ctrl+C at any time to cancel the build.

:: See if we can find a git installation
set GITFOUND=no
for %%k in (HKCU HKLM) do (
	for %%w in (\ \Wow6432Node\) do (
		for /f "skip=2 delims=: tokens=1*" %%a in ('reg query "%%k\SOFTWARE%%wMicrosoft\Windows\CurrentVersion\Uninstall\Git_is1" /v InstallLocation 2^> nul') do (
			for /f "tokens=3" %%z in ("%%a") do (
				set GIT=%%z:%%b
				set GITFOUND=yes
				goto FOUND
			)
		)
	)
)
:FOUND
if %GITFOUND% == yes (
	set "PATH=%GIT%bin;%PATH%"
	echo|set /p out="App.Version.commitHash = " > "%~dp0src\002-config\fc-version.js.commitHash.js"
	git rev-parse --sq --short HEAD >> "%~dp0src\002-config\fc-version.js.commitHash.js" 2>NUL
	if errorlevel 1 echo|set /p out="null" >> "%~dp0src\002-config\fc-version.js.commitHash.js"
	echo|set /p out=";" >> "%~dp0src\002-config\fc-version.js.commitHash.js"
)

if not exist "bin\resources" mkdir bin\resources
CALL devTools/concatFiles.bat js\ "*.js" bin\fc.js
CALL devTools/concatFiles.bat css\ "*.css" bin\fc.css
SET TWEEGO_PATH=%~dp0devTools\tweeGo\storyFormats
:: Run the appropriate compiler for the user's CPU architecture.
if %PROCESSOR_ARCHITECTURE% == AMD64 (
	CALL "%~dp0devTools\tweeGo\tweego_win64.exe" -o "%~dp0bin/FC_pregmod.html" --module=bin/fc.js --module=bin/fc.css --head resources/raster/favicon/arcologyVector.html "%~dp0src"
) else (
	CALL "%~dp0devTools\tweeGo\tweego_win86.exe" -o "%~dp0bin/FC_pregmod.html" --module=bin/fc.js --module=bin/fc.css --head resources/raster/favicon/arcologyVector.html "%~dp0src"
)
DEL bin\fc.js
DEL bin\fc.css
IF EXIST "%~dp0src\002-config\fc-version.js.commitHash.js" DEL "%~dp0src\002-config\fc-version.js.commitHash.js"

ECHO Done

:: keep window open instead of closing it
if NOT DEFINED NOWAIT (
	<nul set /p "=Press any key to exit"
	pause >nul
)

ENDLOCAL
popd
GOTO :eof

:compile_themes
ECHO Compiling Themes...

set back=%cd%
for /d %%i in (%~dp0\themes\*) do (
	CALL :compileDirectory %%i
)
cd %back%

EXIT /B %ERRORLEVEL%

:compileDirectory
REM ~1 is an absolute path, get name of directory here
REM https://stackoverflow.com/a/5480568
set var1=%~1%
set var2=%var1%
set i=0

:loopprocess
for /F "tokens=1* delims=\" %%A in ( "%var1%" ) do (
	set /A i+=1
	set var1=%%B
	goto loopprocess
)

for /F "tokens=%i% delims=\" %%G in ( "%var2%" ) do set last=%%G

REM compile
CALL devTools/concatFiles.bat "%%~1" "*.css" bin\"%last%".css
:: end loopprocess and compileDirectory
GOTO :eof

:help
ECHO compile.bat [flags]
ECHO.
ECHO --themes: create themes
ECHO --extramem: passed to sort (as SORT_MEM) in devTools/concatFiles.bat
ECHO --no-wait: exit without user input
:: exit
ENDLOCAL
popd
exit /b 0
