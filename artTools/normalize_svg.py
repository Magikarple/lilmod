#!/usr/bin/env python3

"""
Application for "normalizing" SVGs

These problems are addressed:

* Inkscape notoriously copies class styles into the object definitions.
https://bugs.launchpad.net/inkscape/+bug/167937

* Inkscape uses labels on layers. Layers are basically named groups.
  Inkscape does not sync the group id with the layer label.

Usage Example:
python3 inkscape_svg_fixup.py vector_source.svg
"""

import re
import sys

import lxml.etree as etree

color_classes = {
    'skin', 'head', 'torso', 'boob', 'penis', 'scrotum', 'belly', 'areola', 'bellybutton', 'labia', 'hair',
    'pubic_hair', 'armpit_hair', 'eyebrow_hair', 'shoe', 'shoe_shadow', 'smart_piercing', 'steel_piercing',
    'steel_chastity', 'outfit_base', 'gag', 'shadow', 'glasses', 'eye', 'sclera', 'eart', 'tail',
    'white', 'skin', 'skin_highlight', 'skin_shade', 'skin_strong_highlight', 'skin_strong_shade', 'arm',
    'arm_highlight', 'arm_shade', 'head', 'head_highlight', 'head_shade', 'torso', 'torso_highlight',
    'torso_shade', 'boob', 'boob_highlight', 'boob_shade', 'penis', 'penis_highlight', 'penis_shade',
    'scrotum', 'scrotum_highlight', 'scrotum_shade', 'belly', 'belly_highlight', 'belly_shade', 'neck',
    'neck_highlight', 'neck_shade', 'legs', 'legs_highlight', 'legs_shade', 'butt', 'butt_highlight',
    'butt_shade', 'feet', 'feet_highlight', 'feet_shade', 'areola', 'labia', 'hair', 'shoe_shadow',
    'smart_piercing', 'steel_piercing', 'steel_chastity', 'gag', 'shadow', 'glasses', 'lips', 'eyeball',
    'iris', 'highlight1', 'highlight2', 'highlight3', 'highlightStrong', 'armpit_hair', 'pubic_hair',
    'muscle_tone', 'belly_details', 'shoe_primary', 'shoe_primary_highlight', 'shoe_primary_shade',
    'shoe_accent', 'shoe_accent_highlight', 'shoe_accent_shade', 'top_primary', 'top_primary_highlight',
    'top_primary_shade', 'top_accent', 'top_accent_highlight', 'top_accent_shade', 'bottoms_primary',
    'bottoms_primary_highlight', 'bottoms_primary_shade', 'bottoms_accent', 'bottoms_accent_highlight',
    'bottoms_accent_shade', 'bra_primary', 'bra_primary_highlight', 'bra_primary_shade', 'bra_accent',
    'bra_accent_highlight', 'bra_accent_shade', 'bra_strap1', 'bra_strap2', 'bra_strap3', 'shirt_center1',
    'shirt_center2', 'shirt_center3', 'panties_primary', 'panties_primary_highlight', 'panties_primary_shade',
    'panties_accent', 'panties_accent_highlight', 'panties_accent_shade', 'stockings_primary',
    'stockings_accent', 'top_primary_strong_highlight', 'top_primary_strong_shade',
    'top_accent_strong_highlight', 'top_accent_strong_shade', 'bottoms_primary_strong_highlight',
    'bottoms_primary_strong_shade', 'bottoms_accent_strong_highlight', 'bottoms_accent_strong_shade',
    'bellymask_1', 'bellymask_2', 'bellymask_3', 'bellymask_4', 'bellymask_5', 'bellymask_6', 'bellymask_7',
    'bellymask_8', 'bellymask_9', 'bellymask_normal', 'bellymask_hourglass', 'bellymask_unnatural', "feet_nails"
}


def fix(tree):
    # know namespaces
    ns = {
        'svg': 'http://www.w3.org/2000/svg',
        'inkscape': 'http://www.inkscape.org/namespaces/inkscape'
    }

    # find document global style definition
    # mangle it and interpret as python dictionary
    style_element = tree.find('./svg:style', namespaces=ns)
    style_definitions = style_element.text
    pythonic_style_definitions = '{' + style_definitions. \
        replace('\t.', '"').replace('{', '":"').replace('}', '",'). \
        replace('/*', '#') + '}'
    styles = eval(pythonic_style_definitions)

    # go through all SVG elements
    for elem in tree.iter():
        if elem.tag == etree.QName(ns['svg'], 'g'):
            # compare inkscape label with group element ID
            lbl = elem.get(etree.QName(ns['inkscape'], 'label'))
            if lbl:
                i = elem.get('id')
                if i != lbl:
                    print("Overwriting ID %s with Label %s..." % (i, lbl))
                    elem.set('id', lbl)
        # clean styles (for easier manual merging)
        style_string = elem.get('style')
        if style_string:
            split_styles = style_string.strip('; ').split(';')
            styles_pairs = [s.strip('; ').split(':') for s in split_styles]
            filtered_pairs = [(k, v) for k, v in styles_pairs if not (
                    k.startswith('font-') or
                    k.startswith('text-') or
                    k.endswith('-spacing') or
                    k in ["line-height", " direction", " writing", " baseline-shift", " white-space", " writing-mode"]
            )]
            split_styles = [':'.join(p) for p in filtered_pairs]
            style_string = ';'.join(sorted(split_styles))
            elem.attrib["style"] = style_string

        # remove all style attributes offending class styles
        s = elem.get('style')
        c = elem.get('class')
        if c and s:
            if 'i' in locals():
                s = s.lower()
                c = c.split(' ')[0]  # regard main style only
                classes = c.split(' ')
                has_color_class = any(x in color_classes for x in classes)
                if has_color_class:
                    s_new = re.sub('fill:#[0-9a-f]+;?', '', s)
                    if s != s_new:
                        print("Explicit fill was removed from style string ({0}) for element with ID {1} "
                              "because its class ({2}) controls the fill color".format(s, i, c))
                        s = s_new
                if s == 'style=""':  # the style is empty now
                    del elem.attrib["style"]
                    continue
                cs = ''
                if c in styles:
                    cs = styles[c].strip('; ').lower()
                if c not in styles:
                    print("Object id %s references unknown style class %s." % (i, c))
                else:
                    if cs != s.strip('; '):
                        print("Style %s removed from object id %s differed from class %s style %s." % (s, i, c, cs))
                        del elem.attrib["style"]
            else:
                print('--------------------------- i not defined - propably a clip-path with a style ---------------------------')
                print("Element tag: ".format(elem.tag))
                print("Element style: ".format(s))
                print("Element class: ".format(c))
                print(etree.tostring(elem, pretty_print=True))
                print('--------------------------- i not defined - propably a clip-path with a style ---------------------------')
    # remove explicit fill color if element class is one of the color_classes


if __name__ == "__main__":
    input_file = sys.argv[1]
    tree = etree.parse(input_file)
    fix(tree)
    # store SVG into file (input file is overwritten)
    svg = etree.tostring(tree, pretty_print=True)
    with open(input_file, 'wb') as f:
        f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'.encode("utf-8"))
        f.write(svg)
