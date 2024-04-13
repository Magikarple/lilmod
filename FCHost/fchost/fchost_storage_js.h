#pragma once

#include "fchost_storage.h"

// storage handlers that can be registered directly to Javascript to enable fchost_storage backing

class FCHostStorageHandler : public CefV8Handler
{
public:
	FCHostStorageHandler(bool _persistent) : persistent(_persistent) {};

	virtual bool Execute(const CefString& name,
		CefRefPtr<CefV8Value> object,
		const CefV8ValueList& arguments,
		CefRefPtr<CefV8Value>& retval,
		CefString& exception) override;

private:
	bool persistent;
	IMPLEMENT_REFCOUNTING(FCHostStorageHandler);
};

void FCHostStorageRegister(const std::filesystem::path& persistPath, CefRefPtr<CefV8Value> object);
