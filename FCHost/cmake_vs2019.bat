@ECHO OFF
REM Quickly rebuild 64-bit VS2019 solution/project files from the CMake files.

cmake -G "Visual Studio 16" -A x64
pause