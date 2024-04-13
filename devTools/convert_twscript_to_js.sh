#!/bin/sh

#converts files in the current dir

# collect files with [script] tag
FILES=`grep '\[script\]' -H -R * | cut -f 1 -d ':'`
for f in $FILES; do
	# create new name. Old name can have any of the following suffixes:
	# _JS.tw  JS.tw .tw
	nf="${f%_JS.tw}"
	nf="${nf%JS.tw}"
	nf="${nf%.tw}"
	# we might end up with an empty name, then set dir name as the file name
	[ -z "$(basename $nf)" -o "${nf: -1}" = "/" ] && nf="${nf}$(basename ${nf})"
	# append the new suffix
	nf="${nf}.js"
	echo "renaming ${f} -> ${nf}"
	# rename the file
	git mv "${f}" "${nf}" || echo "renaming ${f} failed"
	# strip Twee header from it
	sed -i 1d "${nf}" || echo "stripping Twee header failed for ${nf}"
	# strip leading empty line '/./,$!d'
	sed -i '/./,$!d' "${nf}" || echo "Stripping leading empty blank lines failed for ${nf}"
done
