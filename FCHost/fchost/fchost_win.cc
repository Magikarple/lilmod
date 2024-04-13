// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include <windows.h>
#include <KnownFolders.h>
#include <ShlObj.h>

#include "fchost_app.h"

std::filesystem::path FCHostApp::GetLocalStorePath()
{
	PWSTR ppath;
	SHGetKnownFolderPath(FOLDERID_Documents, 0, NULL, &ppath);
	std::filesystem::path local_storage = ppath;
	CoTaskMemFree(ppath);
	return local_storage / L"FreeCities_Pregmod";
}

// Entry point function for all processes.
int APIENTRY wWinMain(HINSTANCE hInstance,
                      HINSTANCE hPrevInstance,
                      LPTSTR lpCmdLine,
                      int nCmdShow) {
  UNREFERENCED_PARAMETER(hPrevInstance);
  UNREFERENCED_PARAMETER(lpCmdLine);

  // Provide CEF with command-line arguments.
  CefMainArgs main_args(hInstance);

  // It will create the first browser instance in OnContextInitialized() after
  // CEF has initialized.
  CefRefPtr<FCHostApp> app(new FCHostApp);

  // CEF applications have multiple sub-processes (render, plugin, GPU, etc)
  // that share the same executable. This function checks the command-line and,
  // if this is a sub-process, executes the appropriate logic.
  int exit_code = CefExecuteProcess(main_args, app, nullptr);
  if (exit_code >= 0) {
    // The sub-process has completed so return here.
    return exit_code;
  }

  CefRefPtr<CefCommandLine> command_line = CefCommandLine::CreateCommandLine();
  command_line->InitFromString(lpCmdLine);

  return app->main(main_args, command_line.get());
}
