// Copyright (c) 2014 The Chromium Embedded Framework Authors. All rights
// reserved. Use of this source code is governed by a BSD-style license that
// can be found in the LICENSE file.

#include "fchost_handler.h"

#if defined(CEF_X11)
#include <X11/Xatom.h>
#include <X11/Xlib.h>
#endif

#include "include/base/cef_logging.h"
#include "include/cef_browser.h"

#include <cstdlib>
#include <cstdio>
#include <filesystem>
#include <iomanip>
#include <memory>
#include <sstream>
#include <string>

// #define TRACE

#ifdef TRACE
	#include <iostream>
#endif

namespace {

	std::string executeProcessAndReadStdOut(const std::string& command)
	{
#ifdef TRACE
		std::cerr << "Command: " << command << std::endl;
#endif
		std::unique_ptr<FILE, decltype(&::pclose)> f(::popen(command.c_str(), "r"), &::pclose);
		std::ostringstream output;
		const int BUF_SIZE = 1024;
		char buf[BUF_SIZE];
		while(!std::feof(f.get())){
			std::size_t read = std::fread(buf, 1, BUF_SIZE, f.get());
			output.write(buf, static_cast<std::streamsize>(read));
		}
		std::string res = output.str();
		return res.substr(0, res.size() - 1); // to clear out CR
	}

	std::string runKDialog(CefDialogHandler::FileDialogMode mode, const CefString& title, const CefString& default_file_path,
		const std::vector<CefString>& accept_filters)
	{
		std::ostringstream cmdLine;
		cmdLine << "kdialog";
		if (!title.empty()) {
			cmdLine << " --title " <<  std::quoted(title.ToString());
		}

#ifdef TRACE
		std::cerr << "mode: " << std::hex << mode << std::dec << std::endl
			<< "default_file_path: " << default_file_path << std::endl
			<< "accept_filters: " << std::endl;

		for (const auto& f: accept_filters) {
			std::cerr << f.ToString() << std::endl;
		}
#endif

		switch (mode) {
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN_MULTIPLE:
				cmdLine << " --multiple"; [[fallthrough]];
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN:
				cmdLine << " --getopenfilename";
				break;
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_SAVE:
				cmdLine << " --getsavefilename";
				break;
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN_FOLDER:
				cmdLine << " --getexistingdirectory";
				break;
			default:
				break; // TODO
		}

		const std::string dsp = default_file_path.ToString();
		if (dsp.find('/') != std::string::npos) {
			cmdLine << ' ' << std::quoted(dsp);
		} else {
			// TODO save last used directory and put it here instead of $HOME
			cmdLine << ' ' << std::quoted(std::string(getenv("HOME")) + '/' + dsp);
		}

		if (accept_filters.size()) {
			cmdLine << " \'";
			for (const auto& f: accept_filters) {
				const auto s = f.ToString();
				cmdLine << " |" << s << " file(*" << s << ')';
			}
			cmdLine << '\'';
		}

		return executeProcessAndReadStdOut(cmdLine.str());
	}

	std::string runZenity(CefDialogHandler::FileDialogMode mode, const CefString& title, const CefString& default_file_path,
		const std::vector<CefString>& accept_filters)
	{
		std::ostringstream cmdLine;
		cmdLine << "zenity --file-selection --confirm-overwrite";

		switch (mode) {
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN_MULTIPLE:
				cmdLine << " --multiple";
				break;
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN:
				// this is the implicit default mode for zenity
				break;
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_SAVE:
				cmdLine << " --save";
				break;
			case CefDialogHandler::FileDialogMode::FILE_DIALOG_OPEN_FOLDER:
				cmdLine << " --directory";
				break;
			default:
				break; // TODO ?
		}

		const std::string dsp = default_file_path.ToString();
		if (dsp.find('/') != std::string::npos) {
			cmdLine << " --filename=" << std::quoted(dsp);
		} else {
			// TODO save last used directory and put it here instead of $HOME
			cmdLine << " --filename=" << std::quoted(std::string(getenv("HOME")) + '/' + dsp);
		}

		for (const auto& f: accept_filters) {
			const auto s = f.ToString();
			cmdLine << " --file-filter=\"" << s << " file | *" << s << '"';
		}

		return executeProcessAndReadStdOut(cmdLine.str());
	}

	using DialogRunFunc = std::string (*)(CefDialogHandler::FileDialogMode mode, const CefString& title, const CefString& default_file_path,
		const std::vector<CefString>& accept_filters);

	class DialogHelper {
		public:
			DialogHelper();
			std::string operator()(CefDialogHandler::FileDialogMode mode, const CefString& title, const CefString& default_file_path,
		const std::vector<CefString>& accept_filters) const
		{
			return func_ ? func_(mode, title, default_file_path, accept_filters) : "";
		}
		private:
			DialogRunFunc func_;
	};

	DialogHelper::DialogHelper()
	{
		// we will try to launch kdialog or zenity
		std::string dialogExecutable;
		// try to determine which environment we run inside
		const char* desktop_env = getenv("XDG_CURRENT_DESKTOP");
		std::string desktop = desktop_env == nullptr ? "" : desktop_env;

		const auto checkExeExists = [](const char* name) {
			int ec = ::system((std::string(name) + " --help > /dev/null").c_str());
			return ec >= 0 && ec < 127;
		};

		if (desktop == "KDE") {
			dialogExecutable = "kdialog";
		} else if (desktop == "GNOME") {
			dialogExecutable = "zenity";
		} else {
			// well, let's check executables
			if (checkExeExists("zenity")) {
				dialogExecutable = "zenity";
			} else if (checkExeExists("kdialog")){
				dialogExecutable = "kdialog";
			}
		}

#ifdef TRACE
		std::cerr << "dialogExecutable: " << dialogExecutable << std::endl
			<< "checkExeExists: " <<  checkExeExists(dialogExecutable.c_str()) << std::endl;
#endif

		if (!dialogExecutable.empty() && checkExeExists(dialogExecutable.c_str())) {
			if (dialogExecutable == "kdialog") {
				func_ = &runKDialog;
			} else if (dialogExecutable == "zenity") {
				func_ = &runZenity;
			} else {
				func_ = nullptr;
			}
		}
	}


}

void FCHostHandler::PlatformTitleChange(CefRefPtr<CefBrowser> browser, const CefString& title) {
	std::string titleStr(title);

#if defined(CEF_X11)
	// Retrieve the X11 display shared with Chromium.
	::Display* display = cef_get_xdisplay();
	DCHECK(display);

	// Retrieve the X11 window handle for the browser.
	::Window window = browser->GetHost()->GetWindowHandle();
	if (window == kNullWindowHandle)
		return;

	// Retrieve the atoms required by the below XChangeProperty call.
	const char* kAtoms[] = {"_NET_WM_NAME", "UTF8_STRING"};
	Atom atoms[2];
	int result =
			XInternAtoms(display, const_cast<char**>(kAtoms), 2, false, atoms);
	if (!result)
		NOTREACHED();

	// Set the window title.
	XChangeProperty(display, window, atoms[0], atoms[1], 8, PropModeReplace,
									reinterpret_cast<const unsigned char*>(titleStr.c_str()),
									titleStr.size());

	// TODO(erg): This is technically wrong. So XStoreName and friends expect
	// this in Host Portable Character Encoding instead of UTF-8, which I believe
	// is Compound Text. This shouldn't matter 90% of the time since this is the
	// fallback to the UTF8 property above.
	XStoreName(display, browser->GetHost()->GetWindowHandle(), titleStr.c_str());
#endif	// defined(CEF_X11)
}

bool FCHostHandler::OnFileDialog(CefRefPtr<CefBrowser> /* browser */, CefDialogHandler::FileDialogMode mode,
		const CefString& title, const CefString& default_file_path, const std::vector<CefString>& accept_filters,
		CefRefPtr<CefFileDialogCallback> callback)
{
	static DialogHelper helper;

	std::string fn = helper(mode, title, default_file_path, accept_filters);
#ifdef TRACE
	std::cerr << "fn: " << fn << std::endl;
#endif
	if (fn.empty()) {
		callback->Cancel();
		return false;
	}

	std::vector<CefString> selected;
	selected.push_back(fn);
	callback->Continue(selected);
	return  true;
}
