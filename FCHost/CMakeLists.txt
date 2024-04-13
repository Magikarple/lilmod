# Copyright (c) 2014 The Chromium Embedded Framework Authors. All rights
# reserved. Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE file.

# OVERVIEW
#
# CMake is a cross-platform open-source build system that can generate project
# files in many different formats. It can be downloaded from
# http://www.cmake.org or installed via a platform package manager.
#
# CMake-generated project formats that have been tested with this CEF binary
# distribution include:
#
# Linux:      Ninja, Unix Makefiles
# Mac OS X:   Ninja, Xcode 5+
# Windows:    Ninja, Visual Studio 2010+
#
# Ninja is a cross-platform open-source tool for running fast builds using
# pre-installed platform toolchains (GNU, clang, Xcode or MSVC). It can be
# downloaded from http://martine.github.io/ninja/ or installed via a platform
# package manager.
#
# BUILD REQUIREMENTS
#
# The below requirements must be met to build this project.
#
# - Chromium Embedded Framework (CEF) 89.0 or newer.
#
# - CMake version 2.8.12.1 or newer.
#
# - Linux/MacOS requirements:
#   I haven't tested these platforms. Shouldn't be too hard to add, check the CEF
#   distribution and treat FCHost like tests/cefsimple (from which it is derived).
#
# - Windows requirements:
#   Visual Studio 2019 or newer.
#
# BUILD EXAMPLES
#
# The below commands will generate project files and create a Debug build of all
# CEF targets using CMake and the platform toolchain.
#
# Start by creating and entering the CMake build output directory:
# > cd path/to/cef_binary_*
# > mkdir build && cd build
#
# To perform a Linux build using a 32-bit CEF binary distribution on a 32-bit
# Linux platform or a 64-bit CEF binary distribution on a 64-bit Linux platform:
#   Using Unix Makefiles:
#     > cmake -G "Unix Makefiles" -DCMAKE_BUILD_TYPE=Debug ..
#     > make -j4 cefclient cefsimple
#
#   Using Ninja:
#     > cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Debug ..
#     > ninja cefclient cefsimple
#
# To perform a Mac OS X build using a 64-bit CEF binary distribution:
#   Using the Xcode IDE:
#     > cmake -G "Xcode" -DPROJECT_ARCH="x86_64" ..
#     Open build\cef.xcodeproj in Xcode and select Product > Build.
#
#   Using Ninja:
#     > cmake -G "Ninja" -DPROJECT_ARCH="x86_64" -DCMAKE_BUILD_TYPE=Debug ..
#     > ninja cefclient cefsimple
#
# To perform a Windows build using a 32-bit CEF binary distribution:
#   Using the Visual Studio 2019 IDE:
#     > cmake -G "Visual Studio 16" ..
#     Open build\cef.sln in Visual Studio and select Build > Build Solution.
#
#   Using Ninja with Visual Studio 2019 command-line tools:
#     (this path may be different depending on your Visual Studio installation)
#     > "C:\Program Files (x86)\Microsoft Visual Studio 16.0\VC\bin\vcvars32.bat"
#     > cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Debug ..
#     > ninja cefclient cefsimple
#
# To perform a Windows build using a 64-bit CEF binary distribution:
#   Using the Visual Studio 2019 IDE:
#     > cmake -G "Visual Studio 16 Win64" ..
#     Open build\cef.sln in Visual Studio and select Build > Build Solution.
#
#   Using Ninja with Visual Studio 2019 command-line tools:
#     (this path may be different depending on your Visual Studio installation)
#     > "C:\Program Files (x86)\Microsoft Visual Studio 16.0\VC\bin\amd64\vcvars64.bat"
#     > cmake -G "Ninja" -DCMAKE_BUILD_TYPE=Debug ..
#     > ninja cefclient cefsimple

#
# Global setup.
#

cmake_minimum_required(VERSION 3.14 FATAL_ERROR)

# Only generate Debug and Release configuration types.
set(CMAKE_CONFIGURATION_TYPES Debug Release)

# Project name.
project(fchost)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Use folders in the resulting project files.
set_property(GLOBAL PROPERTY OS_FOLDERS ON)


#
# CEF_ROOT setup.
# This variable must be set to locate the binary distribution.
#

# The binary distribution is in a separate directory from your
# project. Locate the binary distribution using the CEF_ROOT
# environment variable.
#
# Set the CEF_ROOT environment variable before executing CMake. For example:
#    > set CEF_ROOT=c:\path\to\cef_binary_3.2704.xxxx.gyyyyyyy_windows32
#
# set(CMAKE_MODULE_PATH ${CMAKE_MODULE_PATH} "${CMAKE_CURRENT_SOURCE_DIR}/cmake")


#
# Load the CEF configuration.
#

# try to find system installation
find_package(CEF QUIET)

if(NOT DEFINED _CEF_ROOT_EXPLICIT) # if that fails, try the standard way
  include("${CMAKE_CURRENT_LIST_DIR}/cmake/FindCEF.cmake")
endif()

#
# Define CEF-based targets.
#

# Include the libcef_dll_wrapper target.
# Comes from the libcef_dll/CMakeLists.txt file in the binary distribution
# directory.
add_subdirectory(${CEF_LIBCEF_DLL_WRAPPER_PATH} libcef_dll_wrapper)

# Include application targets.
# Comes from the <target>/CMakeLists.txt file in the current directory.
if(EXISTS "${CMAKE_CURRENT_SOURCE_DIR}/fchost")
  add_subdirectory(fchost)
endif()

# Display configuration settings.
PRINT_CEF_CONFIG()
