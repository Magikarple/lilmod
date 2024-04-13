// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#pragma once

#include "include/cef_app.h"

#include <filesystem>

class CefMainArgs;
class CefCommandLine;

// Implement application-level callbacks for the browser process.
class FCHostApp : public CefApp, public CefBrowserProcessHandler, public CefRenderProcessHandler {
 public:
  FCHostApp();

  // CefApp methods:
  virtual CefRefPtr<CefBrowserProcessHandler> GetBrowserProcessHandler()
      override {
    return this;
  }
  virtual CefRefPtr<CefRenderProcessHandler> GetRenderProcessHandler()
	  override {
	  return this;
  }

  // CefBrowserProcessHandler methods:
  virtual void OnContextInitialized() override;
  virtual void OnContextCreated(CefRefPtr<CefBrowser> browser, CefRefPtr<CefFrame> frame, CefRefPtr<CefV8Context> context) override;

  std::filesystem::path GetLocalStorePath();

  int main(const CefMainArgs& args, CefCommandLine* commandLine);

 private:
  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(FCHostApp);
};
