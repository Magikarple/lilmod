import os
import subprocess
import sys

if os.name == "nt":
    minifier = "../devTools/minify/minify_win_amd64.exe"
elif sys.platform == "darwin":
    minifier = "../devTools/minify/minify_darwin_amd64"
else:
    # probably linux, if not we don't have an alternative anyways.
    minifier = "../devTools/minify/minify_linux_amd64"


def save(layer, prefix, output_directory, output_format, svg_data):
    i = layer.get('id')
    output_path = os.path.join(output_directory, "{0}{1}.svg".format(prefix, i))
    if output_format == 'svg':
        with open(output_path, 'wb') as f:
            # Header for normal SVG (XML)
            f.write(f'<?xml version="1.0" encoding="UTF-8" standalone="no"?>{os.linesep}'.encode("utf-8"))
            f.write(svg_data)
    elif output_format == 'tw':
        # send to minifier through stdin, which then saves to file
        subprocess.run([minifier, "--mime=image/svg+xml", "-o", output_path],
                       input=svg_data)
