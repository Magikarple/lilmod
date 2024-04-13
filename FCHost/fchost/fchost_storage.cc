#include "fchost_storage.h"

#include <algorithm>
#include <cstdio>
#include <memory>
#include <vector>

static_assert(CEF_STRING_TYPE_UTF16);

namespace fs = std::filesystem;

namespace {
	struct closeFile {
		void operator()(std::FILE* f) const noexcept
		{
			std::fclose(f);
		}
	};
}

CefRefPtr<CefV8Value> FCHostSessionStorage::keys() const
{
	// holy hell this is awful. I hope Sugarcube doesn't actually USE this...
	CefRefPtr<CefV8Value> ret = CefV8Value::CreateArray(static_cast<int>(storage.size()));
	auto itr = storage.cbegin();
	for (int i = 0; i < static_cast<int>(storage.size()); ++i, ++itr)
	{
		ret->SetValue(i, CefV8Value::CreateString(itr->first));
	}
	return ret;
}

/* This shouldn't happen, so don't waste time on it. Sugarcube really only writes simple alphanumeric keys.
static bool SanitizePath(std::wstring& inpath)
{
	std::transform(inpath.begin(), inpath.end(), inpath.begin(), [](wchar_t c)
	{
		if (PathGetCharTypeW(c) != GCT_LFNCHAR)
			return L'_';
		else
			return c;
	});
}
*/

FCHostPersistentStorage::FCHostPersistentStorage(const std::filesystem::path& _path)
	: path{_path}
{
	ensure_folder_exists();
	load();
}

void FCHostPersistentStorage::set(const CefString& key, CefRefPtr<CefV8Value> val)
{
	base::set(key, val);

	// only strings get persisted (should be OK, Sugarcube will serialize first)
	if (val->IsString())
	{
		// we should probably be doing this async but TBT Sugarcube is the slow part, not the file IO
		std::unique_ptr<std::FILE, closeFile> fh;
#if defined(OS_WIN)
		fh.reset(_wfopen(get_filename(key).c_str(), L"wb"));
#else
		fh.reset(std::fopen(get_filename(key).c_str(), "wb"));
#endif
		CefString valStr = val->GetStringValue();
		if (valStr.size() > 0) {
			std::fwrite(valStr.c_str(), static_cast<size_t>(valStr.size() * sizeof(valStr.c_str()[0])), 1, fh.get());
		}
	}
}

bool FCHostPersistentStorage::remove(const CefString& key)
{
	fs::remove(get_filename(key));
	return base::remove(key);
}

void FCHostPersistentStorage::clear()
{
	for (const auto& entry: fs::directory_iterator(path)) {
		if (fs::is_regular_file(entry.path())) {
			fs::remove_all(entry.path());
		}
	}
	base::clear();
}

void FCHostPersistentStorage::load()
{
	std::vector<char> readbuf;

	std::unique_ptr<std::FILE, closeFile> fh;
	for (const auto& entry: fs::directory_iterator(path)) {
		if (fs::is_regular_file(entry.path())) {
			const auto entrySize = fs::file_size(entry.path());
			readbuf.resize(static_cast<std::size_t>(entrySize + 2)); // +1 char16

#if defined(OS_WIN)
			fh.reset(_wfopen(entry.path().c_str(), L"rb"));
#else
			fh.reset(std::fopen(entry.path().c_str(), "rb"));
#endif
			if (std::fread(&readbuf[0], entrySize, 1, fh.get())) {
				readbuf[entrySize + 1] = readbuf[entrySize] = 0; // null terminate
				CefString val;
				val.FromString16(static_cast<const char16_t*>(static_cast<const void*>(readbuf.data())));
				storage.emplace(entry.path().filename().native(), CefV8Value::CreateString(val));
			}
		}
	}
}

fs::path FCHostPersistentStorage::get_filename(const CefString& key) const
{
#if defined (OS_WIN)
	return path / key.ToWString();
#else
	return path / key.ToString();
#endif
}

void FCHostPersistentStorage::ensure_folder_exists() const
{
	// ignore returned errors
	fs::create_directories(path);
}
