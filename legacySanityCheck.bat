@echo off

:: Set working directory
pushd %~dp0

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
	echo Running legacySanityCheck.sh using git bash...
	bash --login -c "./legacySanityCheck.sh"
) else (
	echo Could not find git installation
)

:: keep window open instead of closing it
<nul set /p "=Press any key to exit"
pause >nul
popd
