// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include "fchost_handler.h"

#include <windows.h>
#include <string>

#include "include/cef_browser.h"
#include "resource.h"

void FCHostHandler::PlatformTitleChange(CefRefPtr<CefBrowser> browser,
                                        const CefString& title) {
  CefWindowHandle hwnd = browser->GetHost()->GetWindowHandle();

  static bool haveSetIcon = false;
  if (!haveSetIcon)
  {
	  HICON hicon = LoadIcon(GetModuleHandle(NULL), MAKEINTRESOURCE(IDI_FCHOST));
	  SendMessage(hwnd, WM_SETICON, ICON_SMALL, reinterpret_cast<LPARAM>(hicon));
	  SendMessage(hwnd, WM_SETICON, ICON_BIG, reinterpret_cast<LPARAM>(hicon));
	  DestroyIcon(hicon);
	  haveSetIcon = true;
  }

  SetWindowText(hwnd, std::wstring(title).c_str());
}

bool FCHostHandler::OnFileDialog(CefRefPtr<CefBrowser> /* browser */, CefDialogHandler::FileDialogMode /* mode */,
    const CefString& /* title */, const CefString& /* default_file_path */, const std::vector<CefString>& /* accept_filters */,
    CefRefPtr<CefFileDialogCallback> /* callback */)
{
  return false; // to display the default dialog
}
