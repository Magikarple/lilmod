// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include "fchost_app.h"

#include "./utility.h"

#include "include/cef_browser.h"
#include "include/cef_command_line.h"
#include "include/views/cef_browser_view.h"
#include "include/views/cef_window.h"
#include "include/wrapper/cef_helpers.h"
#include "fchost_handler.h"
#include "fchost_storage_js.h"

#include <filesystem>
#include <string>

#if defined(OS_LINUX)
  #include <unistd.h>
#endif

namespace {

// When using the Views framework this object provides the delegate
// implementation for the CefWindow that hosts the Views-based browser.
class SimpleWindowDelegate : public CefWindowDelegate {
 public:
  explicit SimpleWindowDelegate(CefRefPtr<CefBrowserView> browser_view)
      : browser_view_(browser_view) {}

  void OnWindowCreated(CefRefPtr<CefWindow> window) override {
    // Add the browser view and show the window.
    window->AddChildView(browser_view_);
    window->Show();

    // Give keyboard focus to the browser view.
    browser_view_->RequestFocus();
  }

  void OnWindowDestroyed(CefRefPtr<CefWindow> window) override {
    browser_view_ = nullptr;
  }

  bool CanClose(CefRefPtr<CefWindow> window) override {
    // Allow the window to close if the browser says it's OK.
    CefRefPtr<CefBrowser> browser = browser_view_->GetBrowser();
    if (browser)
      return browser->GetHost()->TryCloseBrowser();
    return true;
  }

  CefSize GetPreferredSize(CefRefPtr<CefView> view) override {
    return CefSize(800, 600);
  }

 private:
  CefRefPtr<CefBrowserView> browser_view_;

  IMPLEMENT_REFCOUNTING(SimpleWindowDelegate);
  DISALLOW_COPY_AND_ASSIGN(SimpleWindowDelegate);
};

std::filesystem::path executablePath() {
#if defined(OS_WIN)
  wchar_t target_path[_MAX_PATH];
  GetModuleFileNameW(NULL, target_path, _MAX_PATH);
  return std::filesystem::path(target_path);
#elif defined(OS_LINUX)
  std::string buf;
	buf.resize(32); // initial size estimate

	for (;; ) {
		ssize_t ret = readlink("/proc/self/exe", buf.data(), buf.size());

		if (ret == -1) {
			perror("getexename() failed");
			break;
		}

		if (static_cast<std::size_t>(ret) >= buf.size()) { // >= because we need the terminating NUL too
			buf.resize(buf.size() * 2);
			continue;
		}

		return buf;
	}

	return {};
#else
  #error "Platform-specific code required"
#endif
}
}  // namespace

FCHostApp::FCHostApp() {}

void FCHostApp::OnContextInitialized() {
  CEF_REQUIRE_UI_THREAD();

  CefRefPtr<CefCommandLine> command_line =
      CefCommandLine::GetGlobalCommandLine();

#if defined(OS_WIN) || defined(OS_LINUX)
  // Create the browser using the Views framework if "--use-views" is specified
  // via the command-line. Otherwise, create the browser using the native
  // platform framework. The Views framework is currently only supported on
  // Windows and Linux.
  const bool use_views = command_line->HasSwitch("use-views");
#else
  const bool use_views = false;
#endif

  // FCHostHandler implements browser-level callbacks.
  CefRefPtr<FCHostHandler> handler(new FCHostHandler(use_views));

  // Specify CEF browser settings here.
  CefBrowserSettings browser_settings;

  // Persist local storage
  browser_settings.local_storage = STATE_ENABLED;

  // For now, read from external file.  Probably want to make this a resource
  // at least on Windows.
  std::filesystem::path gameHTML = executablePath().parent_path() / "FC_pregmod.html";
#if defined(OS_WIN)
  std::wstring url = gameHTML.native();
#else
  std::string url = "file://" + gameHTML.string();
#endif

  if (use_views) {
    // Create the BrowserView.
    CefRefPtr<CefBrowserView> browser_view = CefBrowserView::CreateBrowserView(
        handler, url, browser_settings, nullptr, nullptr, nullptr);

    // Create the Window. It will show itself after creation.
    CefWindow::CreateTopLevelWindow(new SimpleWindowDelegate(browser_view));
  } else {
    // Information used when creating the native window.
    CefWindowInfo window_info;

#if defined(OS_WIN)
    // On Windows we need to specify certain flags that will be passed to
    // CreateWindowEx().
    window_info.SetAsPopup(NULL, "FCHost");
#endif

    // Create the first browser window.
    CefBrowserHost::CreateBrowser(window_info, handler, url, browser_settings,
                                  nullptr, nullptr);
  }
}

void FCHostApp::OnContextCreated(CefRefPtr<CefBrowser> browser, CefRefPtr<CefFrame> frame, CefRefPtr<CefV8Context> context) {
	FCHostStorageRegister(GetLocalStorePath() / "FCHostPersistentStorage", context->GetGlobal());
}

int FCHostApp::main(const CefMainArgs& args, CefCommandLine* commandLine)
{
  // Specify CEF global settings here.
  CefSettings settings;

  if (commandLine->HasSwitch("enable-chrome-runtime")) {
    // Enable experimental Chrome runtime. See issue #2969 for details.
    settings.chrome_runtime = true;
  }

  // Cache location is required for local storage
  cef_string_from_path(this->GetLocalStorePath(), &settings.cache_path);

  // When generating projects with CMake the CEF_USE_SANDBOX value will be defined
  // automatically. Pass -DUSE_SANDBOX=OFF to the CMake command-line to disable
  // use of the sandbox.
#if !defined(CEF_USE_SANDBOX)
    settings.no_sandbox = true;
#endif

  // Initialize CEF for the browser process.
  CefInitialize(args, settings, this, nullptr);

  // Run the CEF message loop. This will block until CefQuitMessageLoop() is
  // called.
  CefRunMessageLoop();

  // Shut down CEF.
  CefShutdown();

  return 0;
}
