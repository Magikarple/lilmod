# Copyright (c) 2014 The Chromium Embedded Framework Authors. All rights
# reserved. Use of this source code is governed by a BSD-style license that
# can be found in the LICENSE file.

#
# Source files.
#

# fchost sources.
set(FCHOST_SRCS
  fchost_app.cc
  fchost_app.h
  fchost_handler.cc
  fchost_handler.h
  fchost_storage.cc
  fchost_storage.h
  fchost_storage_js.cc
  fchost_storage_js.h
  utility.cc
  utility.h
  )
set(FCHOST_SRCS_LINUX
  fchost_linux.cc
  fchost_handler_linux.cc
  )
set(FCHOST_SRCS_MACOSX
  fchost_mac.mm
  fchost_handler_mac.mm
  )
set(FCHOST_SRCS_WINDOWS
  fchost.exe.manifest
  fchost.rc
  fchost_win.cc
  resource.h
  fchost_handler_win.cc
  )
APPEND_PLATFORM_SOURCES(FCHOST_SRCS)
source_group(fchost FILES ${FCHOST_SRCS})

set(FCHOST_RES_SRCS_WINDOWS
  res/fchost.ico
  )
APPEND_PLATFORM_SOURCES(FCHOST_RES_SRCS)
source_group(fchost\\\\res FILES ${FCHOST_RES_SRCS})

set(FCHOST_SRCS
  ${FCHOST_SRCS}
  ${FCHOST_RES_SRCS}
  )

# fchost helper sources.
set(FCHOST_HELPER_SRCS_MACOSX
  process_helper_mac.cc
  )
APPEND_PLATFORM_SOURCES(FCHOST_HELPER_SRCS)
source_group(fchost FILES ${FCHOST_HELPER_SRCS})

# fchost resources.
set(FCHOST_RESOURCES_MAC_SRCS_MACOSX
  mac/Info.plist
  mac/fchost.icns
  )
APPEND_PLATFORM_SOURCES(FCHOST_RESOURCES_MAC_SRCS)
source_group(fchost\\\\mac FILES ${FCHOST_RESOURCES_MAC_SRCS})

set(FCHOST_RESOURCES_MAC_ENGLISH_LPROJ_SRCS_MACOSX
  mac/English.lproj/InfoPlist.strings
  mac/English.lproj/MainMenu.xib
  )
APPEND_PLATFORM_SOURCES(FCHOST_RESOURCES_MAC_ENGLISH_LPROJ_SRCS)
source_group(fchost\\\\mac\\\\English.lproj FILES ${FCHOST_RESOURCES_MAC_ENGLISH_LPROJ_SRCS})

set(FCHOST_RESOURCES_SRCS
  ${FCHOST_RESOURCES_MAC_SRCS}
  ${FCHOST_RESOURCES_MAC_ENGLISH_LPROJ_SRCS}
  )

function (symlink_or_copy_to_binary_dir _target _srcFile)
  get_filename_component(_fileName "${_srcFile}" NAME)
  if (WIN32)
    set(action copy_if_different)
  else()
    set(action create_symlink)
  endif()
  add_custom_command(POST_BUILD
    TARGET ${_target}
    COMMAND ${CMAKE_COMMAND} -E ${action} "${_srcFile}" "$<TARGET_FILE_DIR:${_target}>/${_fileName}"
    )
endfunction()

#
# Shared configuration.
#

# Target executable names.
set(CEF_TARGET "fchost")
if(OS_MACOSX)
  set(CEF_HELPER_TARGET "fchost_Helper")
  set(CEF_HELPER_OUTPUT_NAME "fchost Helper")
else()
  # Logical target used to link the libcef library.
  ADD_LOGICAL_TARGET("libcef_lib" "${CEF_LIB_DEBUG}" "${CEF_LIB_RELEASE}")
endif()

# Determine the target output directory.
SET_CEF_TARGET_OUT_DIR()

# Executable target.
add_executable(${CEF_TARGET} MACOSX_BUNDLE WIN32 ${FCHOST_SRCS})

set(gameHTMLFile "FC_pregmod.html")
# Link the HTML where the executable expects to find it
symlink_or_copy_to_binary_dir(${CEF_TARGET} "${CMAKE_SOURCE_DIR}/../bin/${gameHTMLFile}")


#
# Linux configuration.
#

if(OS_LINUX)
  SET_EXECUTABLE_TARGET_PROPERTIES(${CEF_TARGET})
  add_dependencies(${CEF_TARGET} libcef_dll_wrapper)
  target_link_libraries(${CEF_TARGET} libcef_lib libcef_dll_wrapper ${CEF_STANDARD_LIBS})

  # Set rpath so that libraries can be placed next to the executable.
  set_target_properties(${CEF_TARGET} PROPERTIES INSTALL_RPATH "$ORIGIN")
  set_target_properties(${CEF_TARGET} PROPERTIES BUILD_WITH_INSTALL_RPATH TRUE)
  set_target_properties(${CEF_TARGET} PROPERTIES RUNTIME_OUTPUT_DIRECTORY ${CEF_TARGET_OUT_DIR})

  # Copy binary files to the target output directory.
  #COPY_FILES("${CEF_TARGET}" "${CEF_BINARY_FILES}" "${CEF_BINARY_DIR}" "${CEF_TARGET_OUT_DIR}")
  foreach(cefBinaryFile IN LISTS CEF_BINARY_FILES)
  symlink_or_copy_to_binary_dir(${CEF_TARGET} "${CEF_BINARY_DIR}/${cefBinaryFile}")
  endforeach()
  COPY_FILES("${CEF_TARGET}" "${CEF_RESOURCE_FILES}" "${CEF_RESOURCE_DIR}" "${CEF_TARGET_OUT_DIR}")
  if (EXISTS "${CEF_BINARY_DIR}/libminigbm.so")
  symlink_or_copy_to_binary_dir(${CEF_TARGET} "${CEF_BINARY_DIR}/libminigbm.so")
  endif()
endif()


#
# Mac OS X configuration.
#

if(OS_MACOSX)
  option(OPTION_USE_ARC "Build with ARC (automatic Reference Counting) on macOS." ON)
  if(OPTION_USE_ARC)
    list(APPEND CEF_COMPILER_FLAGS
      -fobjc-arc
      )
    set_target_properties(${target} PROPERTIES
      CLANG_ENABLE_OBJC_ARC "YES"
      )
  endif()

  # Output paths for the app bundles.
  set(CEF_APP "${CEF_TARGET_OUT_DIR}/${CEF_TARGET}.app")
  set(CEF_HELPER_APP "${CEF_TARGET_OUT_DIR}/${CEF_HELPER_OUTPUT_NAME}.app")

  # Variable referenced from Info.plist files.
  set(PRODUCT_NAME "${CEF_TARGET}")

  # Helper executable target.
  add_executable(${CEF_HELPER_TARGET} MACOSX_BUNDLE ${FCHOST_HELPER_SRCS})
  SET_EXECUTABLE_TARGET_PROPERTIES(${CEF_HELPER_TARGET})
  add_dependencies(${CEF_HELPER_TARGET} libcef_dll_wrapper)
  target_link_libraries(${CEF_HELPER_TARGET} libcef_dll_wrapper ${CEF_STANDARD_LIBS})
  set_target_properties(${CEF_HELPER_TARGET} PROPERTIES
    MACOSX_BUNDLE_INFO_PLIST ${CMAKE_CURRENT_SOURCE_DIR}/mac/helper-Info.plist
    OUTPUT_NAME ${CEF_HELPER_OUTPUT_NAME}
    )

  # Main executable target.
  target_sources(${CEF_TARGET} ${FCHOST_RESOURCES_SRCS})
  SET_EXECUTABLE_TARGET_PROPERTIES(${CEF_TARGET})
  add_dependencies(${CEF_TARGET} libcef_dll_wrapper "${CEF_HELPER_TARGET}")
  target_link_libraries(${CEF_TARGET} libcef_dll_wrapper ${CEF_STANDARD_LIBS})
  set_target_properties(${CEF_TARGET} PROPERTIES
    MACOSX_BUNDLE_INFO_PLIST ${CMAKE_CURRENT_SOURCE_DIR}/mac/Info.plist
    )

  # Copy files into the main app bundle.
  add_custom_command(
    TARGET ${CEF_TARGET}
    POST_BUILD
    # Copy the helper app bundle into the Frameworks directory.
    COMMAND ${CMAKE_COMMAND} -E copy_directory
            "${CEF_HELPER_APP}"
            "${CEF_APP}/Contents/Frameworks/${CEF_HELPER_OUTPUT_NAME}.app"
    # Copy the CEF framework into the Frameworks directory.
    COMMAND ${CMAKE_COMMAND} -E copy_directory
            "${CEF_BINARY_DIR}/Chromium Embedded Framework.framework"
            "${CEF_APP}/Contents/Frameworks/Chromium Embedded Framework.framework"
    VERBATIM
    )

  # Manually process and copy over resource files.
  # The Xcode generator can support this via the set_target_properties RESOURCE
  # directive but that doesn't properly handle nested resource directories.
  # Remove these prefixes from input file paths.
  set(PREFIXES "mac/")
  COPY_MACOSX_RESOURCES("${FCHOST_RESOURCES_SRCS}" "${PREFIXES}" "${CEF_TARGET}" "${CMAKE_CURRENT_SOURCE_DIR}" "${CEF_APP}")
endif()


#
# Windows configuration.
#

if(OS_WINDOWS)
  # Executable target.
  add_dependencies(${CEF_TARGET} libcef_dll_wrapper)
  SET_EXECUTABLE_TARGET_PROPERTIES(${CEF_TARGET})
  target_link_libraries(${CEF_TARGET} libcef_lib libcef_dll_wrapper ${CEF_STANDARD_LIBS})

  # Add the custom manifest files to the executable.
  ADD_WINDOWS_MANIFEST("${CMAKE_CURRENT_SOURCE_DIR}" "${CEF_TARGET}" "exe")

  # Copy binary and resource files to the target output directory.
  COPY_FILES("${CEF_TARGET}" "${CEF_BINARY_FILES}" "${CEF_BINARY_DIR}" "${CEF_TARGET_OUT_DIR}")
  COPY_FILES("${CEF_TARGET}" "${CEF_RESOURCE_FILES}" "${CEF_RESOURCE_DIR}" "${CEF_TARGET_OUT_DIR}")
endif()
