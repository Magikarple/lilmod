#include "./utility.h"

CefString cef_string_from_path(const std::filesystem::path& p)
{
	return CefString(p.native());
}

void cef_string_from_path(const std::filesystem::path& p, cef_string_t* str)
{
	const auto& pstr = p.native();
#if defined(OS_WIN)
	cef_string_from_wide(pstr.c_str(), pstr.size(), str);
#else
	cef_string_from_utf8(pstr.c_str(), pstr.size(), str);
#endif
}
