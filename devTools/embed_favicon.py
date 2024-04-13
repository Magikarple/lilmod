#!/usr/bin/env python3

'''
Script for embedding favicons into a HTML Header.

Script file is expected to reside in devTools directory.

Note: This does not actually check the image file's contents for size detection.

Usage:
python3 embed_favicon.py [FC_pregmod.html]
'''

import sys
import os
import re
import base64

# file extensions eligible for use as favicons and their mimetype
ext2mimetype = {
	'.png': 'image/png',
	'.ico': 'image/x-icon'
}


# reads a file, turns it into a data uri
def data_uri_from_file(filename, mimetype):
	data = open(filename, 'rb').read()
	base64data = base64.b64encode(data).decode('ascii')
	out = 'data:%s;base64,%s' % (mimetype, base64data)
	return out


if __name__ == "__main__":
	# find project root directory path
	# (script file is expected to reside in devTools)
	project_root_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
	html_path = ''
	if (len(sys.argv) > 1):
		html_path = sys.argv[1]
	else:
		# path to bin/FC_pregmod.html
		html_path = os.path.join(
			project_root_path,
			'bin/FC_pregmod.html'
		)
	# path to directory containing all favicons to embed
	favicons_source_path = os.path.join(
		project_root_path,
		'resources/raster/favicon/'
	)
	# walk directory for all files
	favicons_paths = [
		os.path.join(dirpath, filename)
		for dirpath, dirnames, filenames in os.walk(favicons_source_path)
		for filename in filenames
	]
	# ignore files with unknown extensions
	favicons_paths = [f for f in favicons_paths
					  if f[-4:] in ext2mimetype.keys()]

	# prepare embedded data
	size_from_filename = re.compile(r'([0-9]+)\....$')
	favicons_html = []
	for fp in favicons_paths:
		print('Found favicon source file "%s".' % (fp))
		# get mimetype by file extension
		mimetype = ext2mimetype[fp[-4:]]
		if (mimetype == 'image/x-icon'):
			# assume sizes in ico
			sizes = '16x16 32x32 64x64'
		else:
			# guess icon size from file name
			size = size_from_filename.search(fp).group(1)
			sizes = '%sx%s' % (size, size)
		data = data_uri_from_file(fp, mimetype)
		favicons_html.append(
			# prepare html with favicon data embedded
			'<link rel="icon" type="%s" sizes="%s" href="%s">\n' % (
				mimetype, sizes, data
			)
		)

	# modify header file
	with open(html_path, 'r+', encoding='utf-8') as hf:
		print('Rewriting "%s"...' % (html_path))
		lines_in = hf.readlines()  # read whole file
		lines_out = []
		for line in lines_in:
			# embed favicons into head
			if (line.startswith('</head>')):
				lines_out.extend(favicons_html)
			# remove all currently embedded favicons
			if (not (line.startswith('<link') and 'icon' in line)):
				lines_out.append(line)
		hf.seek(0)  # move to beginning of file
		hf.write(''.join(lines_out))  # overwrite with new data
		hf.truncate()  # remove trailing old data

	print('Finished.')
