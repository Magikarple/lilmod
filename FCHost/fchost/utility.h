#pragma once

#include "include/capi/cef_base_capi.h"

#include <filesystem>

CefString cef_string_from_path(const std::filesystem::path& p);
void cef_string_from_path(const std::filesystem::path& p, cef_string_t* str);
