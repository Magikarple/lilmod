#pragma once

#include "include/cef_app.h" // probably excessive

#include <filesystem>
#include <map>
#include <string>

// simple memory-backed session storage
class FCHostSessionStorage
{
public:
	virtual size_t size() const { return storage.size(); };
	virtual CefRefPtr<CefV8Value> /* string array */ keys() const;
	virtual bool has(const CefString& key) const { return (storage.find(key) != storage.cend()); };
	virtual CefRefPtr<CefV8Value> get(const CefString& key) const
	{
		auto itr = storage.find(key);
		if (itr == storage.cend())
			return CefV8Value::CreateNull();
		else
			return itr->second;
	};
	virtual void set(const CefString& key, CefRefPtr<CefV8Value> val) { storage.insert_or_assign(key, val); };
	virtual bool remove(const CefString& key) { return (storage.erase(key) > 0); };
	virtual void clear() { storage.clear(); };

protected:
	std::map<CefString, CefRefPtr<CefV8Value>> storage;
};

// memory-backed, disk-persistent local storage
class FCHostPersistentStorage : public FCHostSessionStorage
{
	using base = FCHostSessionStorage;
public:
	FCHostPersistentStorage(const std::filesystem::path& _path);

	virtual void set(const CefString& key, CefRefPtr<CefV8Value> val) override;
	virtual bool remove(const CefString& key) override;
	virtual void clear() override;

private:
	void load();
	void ensure_folder_exists() const;
	std::filesystem::path get_filename(const CefString& key) const;

	std::filesystem::path path;
};
