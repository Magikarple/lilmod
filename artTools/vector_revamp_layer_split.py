#!/usr/bin/env python3

"""
Application for splitting groups from one SVG file into separate files

Usage:
python3 vector_layer_split.py infile format outdir

Usage Example:
python3 vector_layer_split.py vector_source.svg tw ../src/art/vector/layers/
"""

import argparse
import copy
import os
import re

import lxml.etree as etree
import normalize_svg
from lxml.etree import XMLParser, parse
import svg_split_utils

parser = argparse.ArgumentParser(
    description='Application for splitting groups from one SVG file into separate files.')
parser.add_argument('-o', '--output', dest='output_dir', required=True,
                    help='output directory')
parser.add_argument('-f', '--format', dest='output_format',
                    choices=['svg', 'tw'], default='svg', help='output format.')
parser.add_argument('-p', '--prefix', dest='prefix', default='',
                    help='Prepend this string to result file names')
parser.add_argument('input_file', metavar='FILENAME', nargs=1,
                    help='Input SVG file with layers')

args = parser.parse_args()

output_format = args.output_format
output_directory = args.output_dir
input_file = args.input_file[0]

if not os.path.exists(output_directory):
    os.makedirs(output_directory)

ns = {
    'svg': 'http://www.w3.org/2000/svg',
    'inkscape': 'http://www.inkscape.org/namespaces/inkscape',
    'sodipodi': "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd",
}

p = XMLParser(huge_tree=True)
tree = parse(input_file, parser=p)
normalize_svg.fix(tree)

# strip undesired editor attributes from the tree
etree.strip_attributes(tree, f"{{{ns['inkscape']}}}*", f"{{{ns['sodipodi']}}}*")

# prepare output template
template = copy.deepcopy(tree)
root = template.getroot()

# remove all svg root attributes except document size
for a in root.attrib:
    if a != "viewBox":
        del root.attrib[a]

# remove all content, including metadata
# for twine output, style definitions are removed, too
defs = None
for e in root:
    if e.tag == etree.QName(ns['svg'], 'defs'):
        defs = e
    if (e.tag == etree.QName(ns['svg'], 'g') or
            e.tag == etree.QName(ns['svg'], 'metadata') or
            e.tag == etree.QName(ns['svg'], 'defs') or
            e.tag == etree.QName(ns['sodipodi'], 'namedview') or
            (output_format == 'tw' and e.tag == etree.QName(ns['svg'], 'style'))
    ):
        root.remove(e)
# template preparation finished

# prepare regex for later use
regex_xmlns = re.compile(' xmlns[^ ]+')
regex_space = re.compile(r'[>]\s+[<]')

# create dict with all needed definitions   
gra_dict = {}
for gra in defs:
    if (gra.tag == etree.QName(ns['svg'], 'linearGradient') or
            gra.tag == etree.QName(ns['svg'], 'radialGradient') or
            gra.tag == etree.QName(ns['svg'], 'clipPath') or
            gra.tag == etree.QName(ns['svg'], 'mask') or
            gra.tag == etree.QName(ns['svg'], 'filter')):
        gra_id = gra.get('id')
        gra = etree.tostring(gra, pretty_print=False)
        gra = gra.decode('utf-8')
        gra_dict[gra_id] = gra
    # find all groups
layers = tree.xpath('//svg:g', namespaces=ns)
for layer in layers:
    i = layer.get('id')
    if (  # disregard non-content groups
            i.endswith("_") or  # manually suppressed with underscore
            i.startswith("XMLID") or  # Illustrator generated group
            i.startswith("g")  # Inkscape generated group
    ):
        continue
    # create new canvas
    output = copy.deepcopy(template)
    # copy all shapes into template
    canvas = output.getroot()
    for e in layer:
        canvas.append(e)
    # represent template as SVG (binary string)
    svg = etree.tostring(output, pretty_print=False)

    # replace <use> with the referenced object
    # this is a very poor way to do it. A more elegant way would be to insert
    # referenced object in the <def> part of the file, but then the colors of
    # objects with a class definition will not be changed.
    # As a substitute the <use> is overwritten with the object.
    # THIS WILL REMOVE ANY MODIFICATIONS (movement, clip-paths, etc.)
    # To prevent this the cloned object should be put into a group, and changes
    # made to the group.
    # TODO: If colors can be changed based on class in defs - put reference in defs instead
    if "<svg:use" in svg.decode('utf-8'):
        # get a reference map
        output_map = {c: p for p in canvas.iter() for c in p}
        # find use elements
        for elem in list(canvas.xpath('//svg:use', namespaces=ns)):
            # get referenced id
            def_id = elem.get('{http://www.w3.org/1999/xlink}href')
            def_id = def_id[1:]
            # loop through all layers to find the referenced element
            def_orig = None
            for def_l in layers:
                for e in (e for e in def_l if e.get('id') == def_id):
                    def_orig = copy.deepcopy(e)
                if def_orig is not None:
                    break
            parent_index = list(output_map).index(elem)
            output_map[elem].remove(elem)
            output_map[elem].insert(parent_index, def_orig)
        # Update svg
        svg = etree.tostring(output, pretty_print=False)

    # Conditional defs insertion - only inserts the needed defs
    svg_dec = svg.decode('utf-8')
    if any(x in svg_dec for x in ["filter", "Gradient", "mask=", "clip-path="]):
        moreDefsNeeded = True
        gra_str = '<defs>'
        while moreDefsNeeded:
            moreDefsNeeded = False
            s = svg.decode('utf-8')
            for key in gra_dict.keys():
                if ('#' + key in s or '#' + key in gra_str) and 'id="' + key not in gra_str:
                    moreDefsNeeded = True
                    gra_str += gra_dict[key]
        gra_str += '</defs>'
        canvas.insert(0, etree.fromstring(gra_str))
        # re-generate output
        svg = etree.tostring(output, pretty_print=False)

    if output_format == 'tw':
        # remove unnecessary attributes
        # TODO: never generate unnecessary attributes in the first place
        svg = svg.decode('utf-8')
        svg = regex_xmlns.sub('', svg)
        svg = svg.replace('\n', '').replace('\r', '')  # print cannot be multi-line
        svg = regex_space.sub('><', svg)  # remove indentation
        svg = svg.replace('svg:', '')  # svg namespace was removed

        if not svg.endswith(os.linesep):
            svg += os.linesep
        svg = svg.encode('utf-8')

    # save SVG string to file
    svg_split_utils.save(layer, args.prefix, output_directory, output_format, svg)
