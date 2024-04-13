@echo off
:: Concatenates files from dir %1 specified with wildcard %2 and outputs result to %3

:: temporary codepage change to avoid mojibake
FOR /f "tokens=2 delims=:." %%x IN ('CHCP') DO SET _CP=%%x
CHCP 65001 > NUL

:: TODO Proper temp file instead of bin\list.txt
IF EXIST %3 DEL %3
SET _LISTFILE=bin\list.txt
SET _SORT_CMD=sort

:: If SORT_MEM is defined, use memory option for SORT
IF DEFINED SORT_MEM SET _SORT_CMD=%_SORT_CMD% /m %SORT_MEM%

:: Collect sorted list of files
ECHO "Ignore the first line to skip the BOM" >%_LISTFILE%
(FOR /R "%~1" %%F IN (%2) DO echo "%%F") | %_SORT_CMD% >>%_LISTFILE%

:: If we have powershell available, strip the absolute path information
:: If not, fail silently (which is fine, but will leak path information into the built file)
powershell -command "" 2> NUL
IF %ERRORLEVEL% EQU 0 powershell -command "(get-content -literalPath \"%CD%\%_LISTFILE%\" -encoding utf8) -replace [regex]::escape(\"%CD%\"),'' -replace '\"','' ^| set-content -encoding utf8 -literalPath \"%CD%\%_LISTFILE%\""

:: Append the files
(FOR /F "skip=1 usebackq delims=" %%F IN (`type "%_LISTFILE%"`) DO (
	echo /* %%F */ >> %3
	copy /b %3+"%CD%%%F" %3 1>NUL
	)
)

DEL %_LISTFILE%
CHCP %_CP% > NUL