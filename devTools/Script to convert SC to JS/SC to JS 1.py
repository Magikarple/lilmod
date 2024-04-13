# Script to convert SC passages to JS.
# lowercasedonkey, here.  This script was written for the "PythonScript" plugin for notepad++.  https://github.com/bruderstein/PythonScript.  Not a python guy, but if works somewhere else, great!
# At the moment, you can't "rerun it" on JS.  Only run the code on SC, not the output.  It won't update the JS.

# Update slave references
editor.rereplace(r"\$activeSlave", r"slave")
editor.rereplace(r"\$slaves\[\$i\]", r"slave")

# Update all references
editor.rereplace(r"\$", r"V\.")

# Line breaks for embedded code, beautify later
editor.rereplace(r"([a-zA-Z@].*?)<<", r"$1\n<<")
editor.rereplace(r">>([a-zA-Z,\.@ ].*?)", r">>\n\t$1")

# Clean up print
editor.rereplace(r"<<print (.*)>>", r"V.\1")
editor.rereplace(r"<<= (.*?)>>", r"V\.\1")

# Raw text
editor.rereplace(r"	([a-zA-Z@\.,`'; ].*)", r"	r.push\(`\1`\);")

# If / else
editor.rereplace(r"<<if (.*?)>>", r"if \1 {")
editor.rereplace(r"<<elseif (.*?)>>", r"} else if \(\1\) {")
editor.rereplace(r"<<else>>", r"} else {")
editor.rereplace(r"<</if>>", r"}")

#fix paren
editor.rereplace(r"([	\n])if ([^\(].*) {", r"\1if \(\2\) {")
editor.rereplace(r"([	\n])else if ([^\(].*) {", r"\1 else if \(\2\) {")

# run can happen directly
editor.rereplace(r"<<run (.*?)>>", r"\1;")

# Clean up unset
editor.rereplace(r"<<unset (.*)>>", r"delete \1;")

# Set
editor.rereplace(r"<<set (.*?)>>", r"$1;")

editor.rereplace(r"<<(Master)>>", r"${$1}")
editor.rereplace(r"<<(say)>>", r"${$1}")

#Switch
editor.rereplace(r"<<switch (.*?)>>", r"switch \(\1\) {")
editor.rereplace(r"<</switch>>", r"}")
editor.rereplace(r"<<case (.*?)>>", r"case \1:")
editor.rereplace(r"<<default>>", r"default:")

# SC markup
editor.rereplace(r"@@\.(.*?);(.*?)@@", r"<span class=\"\1\">\2</span>")
editor.rereplace(r"@@\.(.*?);", r"<span class=\"\1\">")
editor.rereplace(r"@@", r"</span>")
#remove incompatible comment style
editor.rereplace(r"/%", r"/*")
editor.rereplace(r"%/", r"*/")

# JS
editor.rereplace(r" == ", r" === ")
editor.rereplace(r" != ", r" !== ")

#fix pronouns
editor.rereplace(r"V\.Hers", r"\${Hers}")
editor.rereplace(r"V\.hers", r"\${hers}")
editor.rereplace(r"V\.He", r"\${He}")
editor.rereplace(r"V\.he", r"\${he}")
editor.rereplace(r"V\.Himself", r"\${Himself}")
editor.rereplace(r"V\.himself", r"\${himself}")
editor.rereplace(r"V\.Him", r"\${Him}")
editor.rereplace(r"V\.him", r"\${him}")
editor.rereplace(r"V\.His", r"\${His}")
editor.rereplace(r"V\.his", r"\${his}")
editor.rereplace(r"V\.Girl", r"\${Girl}")
editor.rereplace(r"V\.girl", r"\${girl}")
editor.rereplace(r"V\.Loli", r"\${Loli}")
editor.rereplace(r"V\.loli", r"\${loli}")
editor.rereplace(r"V\.Woman", r"\${Woman}")
editor.rereplace(r"V\.woman", r"\${woman}")

#fix pronouns
editor.rereplace(r"_He2", r"\${_He2}")
editor.rereplace(r"_he2", r"\${_he2}")
editor.rereplace(r"_Him2", r"\${_Him2}")
editor.rereplace(r"_him2", r"\${_him2}")
editor.rereplace(r"_His2", r"\${_His2}")
editor.rereplace(r"_his2", r"\${_his2}")
editor.rereplace(r"_Hers2", r"\${_Hers2}")
editor.rereplace(r"_hers2", r"\${_hers2}")
editor.rereplace(r"_Himself2", r"\${_Himself2}")
editor.rereplace(r"_himself2", r"\${_himself2}")
editor.rereplace(r"_Girl2", r"\${_Girl2}")
editor.rereplace(r"_girl2", r"\${_girl2}")
editor.rereplace(r"_Loli2", r"\${_Loli2}")
editor.rereplace(r"_loli2", r"\${_loli2}")
editor.rereplace(r"_Woman2", r"\${_Woman2}")
editor.rereplace(r"_woman2", r"\${_woman2}")
editor.rereplace(r"_Hers2", r"\${_Hers2}")
editor.rereplace(r"_hers2", r"\${_hers2}")

#look for variables embedded in literals
editor.rereplace(r"(	r.push[^;]*?)(V\.[^ ,<'`]*)", r"\1${\2}")
editor.rereplace(r"(	r.push[^;]*?)(slave\.[^ ,<'`]*)", r"\1${\2}")
editor.rereplace(r"(	r.push[^;]*?)(_S\.[^ ,<'`]*)", r"\1${\2}")
editor.rereplace(r"(	r.push[^;]*?)( _[^ ,<'`]*)", r"\1${ \2}")

#Delay fixing _S to simplify detection if it's embedded.
editor.rereplace(r"_S\.", r"S.")

#drop spaces
editor.rereplace(r"r.push\(` ", r"r.push\(`")
editor.rereplace(r" `\);", r"`\);")

#Cleanup
editor.rereplace(r"\${He}adGirl", r"V.HeadGirl")
editor.rereplace(r"\.}", r"}.")
editor.rereplace(r"\${slave}", r"slave")
editor.rereplace(r"V.getSlave", r"getSlave")
editor.rereplace(r"V.App", r"App")

# Compress speech macros, like <<s>>
editor.rereplace(r"`\);\n[	]*<<([^\}]*)>>\n[	]*r\.push\(`", r"$1")