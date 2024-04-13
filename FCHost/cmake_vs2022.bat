@ECHO OFF
REM Quickly rebuild 64-bit VS2022 solution/project files from the CMake files.

cmake -G "Visual Studio 17" -A x64
pause