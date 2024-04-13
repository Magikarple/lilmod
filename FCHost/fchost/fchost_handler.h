// Copyright (c) 2013 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#pragma once

#include "include/cef_client.h"

#include <list>

class FCHostHandler : public CefClient,
                      public CefDisplayHandler,
                      public CefLifeSpanHandler,
                      public CefLoadHandler,
					  public CefDownloadHandler,
					  public CefKeyboardHandler,
					  public CefContextMenuHandler,
            private CefDialogHandler {
 public:
  explicit FCHostHandler(bool use_views);
  ~FCHostHandler();

  // Provide access to the single global instance of this object.
  static FCHostHandler* GetInstance();

  // CefClient methods:
  virtual CefRefPtr<CefDisplayHandler> GetDisplayHandler() override {
    return this;
  }
  virtual CefRefPtr<CefLifeSpanHandler> GetLifeSpanHandler() override {
    return this;
  }
  virtual CefRefPtr<CefLoadHandler> GetLoadHandler() override { return this; }
  virtual CefRefPtr<CefDownloadHandler> GetDownloadHandler() override { return this; }
  virtual CefRefPtr<CefKeyboardHandler> GetKeyboardHandler() override { return this; }
  virtual CefRefPtr<CefContextMenuHandler> GetContextMenuHandler() override { return this; }

  CefRefPtr< CefDialogHandler > GetDialogHandler() override { return this; }
  bool OnFileDialog(CefRefPtr<CefBrowser> browser, CefDialogHandler::FileDialogMode mode,
    const CefString& title, const CefString& default_file_path, const std::vector<CefString>& accept_filters,
    CefRefPtr<CefFileDialogCallback> callback) override;

  // CefDisplayHandler methods:
  virtual void OnTitleChange(CefRefPtr<CefBrowser> browser,
                             const CefString& title) override;
  virtual bool OnConsoleMessage(CefRefPtr<CefBrowser> browser,
							    cef_log_severity_t level,
								const CefString& message,
								const CefString& source,
								int line) override;

  // CefLifeSpanHandler methods:
  virtual void OnAfterCreated(CefRefPtr<CefBrowser> browser) override;
  virtual bool DoClose(CefRefPtr<CefBrowser> browser) override;
  virtual void OnBeforeClose(CefRefPtr<CefBrowser> browser) override;

  // CefLoadHandler methods:
  virtual void OnLoadError(CefRefPtr<CefBrowser> browser,
                           CefRefPtr<CefFrame> frame,
                           ErrorCode errorCode,
                           const CefString& errorText,
                           const CefString& failedUrl) override;
  virtual void OnLoadEnd(CefRefPtr<CefBrowser> browser,
                         CefRefPtr<CefFrame> frame,
                         int httpStatusCode) override;

  // CefDownloadHandler methods:
  virtual void OnBeforeDownload(CefRefPtr<CefBrowser> browser,
								CefRefPtr<CefDownloadItem> download_item,
								const CefString& suggested_name,
								CefRefPtr< CefBeforeDownloadCallback > callback) override;

  // CefKeyboardHandler methods:
  virtual bool OnPreKeyEvent(CefRefPtr<CefBrowser> browser,
							const CefKeyEvent& event,
							CefEventHandle os_event,
							bool* is_keyboard_shortcut) override;

  // CefContextMenuHandler methods:
  virtual void OnBeforeContextMenu(CefRefPtr<CefBrowser> browser,
	  CefRefPtr<CefFrame> frame,
	  CefRefPtr<CefContextMenuParams> params,
	  CefRefPtr<CefMenuModel> model) override;
  virtual bool OnContextMenuCommand(CefRefPtr<CefBrowser> browser,
	  CefRefPtr<CefFrame> frame,
	  CefRefPtr<CefContextMenuParams> params,
	  int command_id,
	  EventFlags event_flags) override;

  // Request that all existing browser windows close.
  void CloseAllBrowsers(bool force_close);

  bool IsClosing() const { return is_closing_; }

 private:
  // Platform-specific implementation.
  void PlatformTitleChange(CefRefPtr<CefBrowser> browser,
                           const CefString& title);

  // True if the application is using the Views framework.
  const bool use_views_;

  // List of existing browser windows. Only accessed on the CEF UI thread.
  typedef std::list<CefRefPtr<CefBrowser>> BrowserList;
  BrowserList browser_list_;

  bool is_closing_;

  // Include the default reference counting implementation.
  IMPLEMENT_REFCOUNTING(FCHostHandler);
};
