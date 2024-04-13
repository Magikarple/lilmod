#include "fchost_storage_js.h"

#include <memory>

// static storage objects (not threadsafe, probably doesn't matter, since they'll execute within a JS context)

static std::unique_ptr<FCHostPersistentStorage> persist;
static std::unique_ptr<FCHostSessionStorage> session;

// storage handler js hook implementations

#define REGJSFUNC(x) { \
CefRefPtr<CefV8Value> func = CefV8Value::CreateFunction(x, handler); \
object->SetValue(x, func, V8_PROPERTY_ATTRIBUTE_NONE); }

static void AttachStorageFunctions(CefRefPtr<CefV8Value> object, CefRefPtr<CefV8Handler> handler)
{
	REGJSFUNC("size");
	REGJSFUNC("keys");
	REGJSFUNC("has");
	REGJSFUNC("get");
	REGJSFUNC("set");
	REGJSFUNC("remove");
	REGJSFUNC("clear");
}

void FCHostStorageRegister(const std::filesystem::path& persistPath, CefRefPtr<CefV8Value> object) {
	// New context, reset everything (don't try to run more than one app at once!)
	if (persist) persist.reset(NULL);
	if (session) session.reset(NULL);

	persist = std::make_unique<FCHostPersistentStorage>(persistPath);
	session = std::make_unique<FCHostSessionStorage>();

	CefRefPtr<CefV8Handler> sess_handler = new FCHostStorageHandler(false);
	CefRefPtr<CefV8Value> obj_sess = CefV8Value::CreateObject(nullptr, nullptr);
	object->SetValue("FCHostSession", obj_sess, V8_PROPERTY_ATTRIBUTE_NONE);
	AttachStorageFunctions(obj_sess, sess_handler);

	CefRefPtr<CefV8Handler> pers_handler = new FCHostStorageHandler(true);
	CefRefPtr<CefV8Value> obj_pers = CefV8Value::CreateObject(nullptr, nullptr);
	object->SetValue("FCHostPersistent", obj_pers, V8_PROPERTY_ATTRIBUTE_NONE);
	AttachStorageFunctions(obj_pers, pers_handler);
}

// individual execution objects for session/persistent storage

bool FCHostStorageHandler::Execute(const CefString& name, CefRefPtr<CefV8Value> object, const CefV8ValueList& arguments, CefRefPtr<CefV8Value>& retval, CefString& exception)
{
	// alias pointer only, no ownership
	FCHostSessionStorage* storage = persistent ? persist.get() : session.get();

	if (name == "size") {
		// no arguments
		retval = CefV8Value::CreateInt(static_cast<int32_t>(storage->size()));
		return true;
	}
	else if (name == "keys") {
		// no arguments
		retval = storage->keys();
		return true;
	}
	else if (name == "has") {
		// one string argument
		if (arguments.size() < 1 || !arguments[0]->IsString()) return false;

		retval = CefV8Value::CreateBool(storage->has(arguments[0]->GetStringValue()));
		return true;
	}
	else if (name == "get") {
		// one string argument
		if (arguments.size() < 1 || !arguments[0]->IsString()) return false;

		retval = storage->get(arguments[0]->GetStringValue());
		return true;
	}
	else if (name == "set") {
		// two arguments - one string, one "whatever"
		if (arguments.size() < 2 || !arguments[0]->IsString()) return false;

		storage->set(arguments[0]->GetStringValue(), arguments[1]);
		retval = CefV8Value::CreateBool(true);
		return true;
	}
	else if (name == "remove") {
		// one string argument
		if (arguments.size() < 1 || !arguments[0]->IsString()) return false;

		retval = CefV8Value::CreateBool(storage->remove(arguments[0]->GetStringValue()));
		return true;
	}
	else if (name == "clear") {
		// no arguments
		storage->clear();
		return true;
	}

	return false;
}
