#!/usr/bin/env python3

"""
Application for procedural content adaption
*THIS IS VERY EXPERIMENTAL*
Contains a very poor man's implementation of spline mesh warping.

This application parses SVG path data of an outfit sample aligned to a body part.
The outfit is then replicated for other shapes of the same body part.

Example data is geared towards generating a strap outfit for boobs and torso
for all sizes of boobs and all shapes of torsos based on a single outfit for
boobs of size 2 and a hourglass torso respectively.

Limitations:
* handles paths only
* only svg.path Line and CubicBezier are tested
* only the aforementioned examples are tested

Usage:
python3 vector_clothing_replicator.py infile clothing bodypart destinationfile

Usage Example:
python3 vector_clothing_replicator.py vector_source.svg Straps Boob vector_destination.svg
python3 vector_clothing_replicator.py vector_source.svg Straps Torso vector_destination.svg
"""

import copy
import sys

import lxml.etree as etree
from svg.path import parse_path

REFERENCE_PATH_SAMPLES = 200
EMBED_REPLICATIONS = True  # whether to embed all replications into the input file or output separate files

input_file = sys.argv[1]
clothing = sys.argv[2]
bodypart = sys.argv[3]
output_file_embed = sys.argv[4]

# TODO: make these configurable
output_file_pattern = '%s_%s_%s.svg'  # bodypart, target_id, clothing

if 'Torso' == bodypart:
    xpath_shape = './svg:g[@id="Torso_"]/svg:g[@id="Torso_%s"]/svg:path[@class="skin torso"]/@d'  # TODO: formulate more general, independent of style
    xpath_outfit_container = '//svg:g[@id="Torso_Outfit_%s_"]' % (clothing)
    xpath_outfit = '//svg:g[@id="Torso_Outfit_%s_%s"]' % (clothing, '%s')
    target_ids = "Unnatural,Hourglass,Normal".split(",")
    reference_id = "Hourglass"
else:
    raise RuntimeError("Please specify a bodypart for clothing to replicate.")

tree = etree.parse(input_file)
ns = {'svg': 'http://www.w3.org/2000/svg'}

canvas = copy.deepcopy(tree)
for e in canvas.xpath('./svg:g', namespaces=ns) + canvas.xpath('./svg:path', namespaces=ns):
    # TODO: this should be "remove all objects, preserve document properties"
    e.getparent().remove(e)


def get_points(xpath_shape):
    """
    This function extracts reference paths by the given xpath selector.
    Each path is used to sample a fixed number of points.
    """
    paths_data = tree.xpath(xpath_shape, namespaces=ns)
    points = []
    path_length = None
    for path_data in paths_data:
        p = parse_path(path_data)
        points += [
            p.point(1.0 / float(REFERENCE_PATH_SAMPLES) * i)
            for i in range(REFERENCE_PATH_SAMPLES)
        ]
    if not points:
        raise RuntimeError(
            'No paths for reference points found by selector "%s".' % xpath_shape
        )
    return points


def point_movement(point, reference_points, target_points):
    """
    For a given point, finds the nearest point in the reference path.
    Gives distance vector from the nearest reference point to the
    respective target reference point.
    """
    distances = [abs(point - reference_point) for reference_point in reference_points]
    min_ref_dist_idx = min(enumerate(distances), key=lambda x: x[1])[0]
    movement = target_points[min_ref_dist_idx] - reference_points[min_ref_dist_idx]
    return movement


reference_points = get_points(xpath_shape % reference_id)
container = tree.xpath(xpath_outfit_container, namespaces=ns)
if len(container) != 1:
    raise RuntimeError('Outfit container selector "%s" does not yield exactly one layer.' % xpath_outfit_container)
container = container[0]
outfit_source = container.xpath(xpath_outfit % reference_id, namespaces=ns)
if len(outfit_source) != 1:
    raise RuntimeError(
        'Outfit source selector "%s" does not yield exactly one outfit layer in container selected by "%s".' % (
            xpath_outfit % reference_id, xpath_outfit_container))
outfit_source = outfit_source[0]

for target_id in target_ids:
    print(
        'Generating variant "%s" of clothing "%s" for bodypart "%s"...' %
        (target_id, clothing, bodypart)
    )
    outfit = copy.deepcopy(outfit_source)
    paths = outfit.xpath('./svg:path', namespaces=ns)
    if target_id == reference_id:
        print("This is the source variant. Skipping...")
    else:
        layerid = outfit.get('id').replace('_%s' % reference_id, '_%s' % target_id)
        outfit.set('id', layerid)
        outfit.set(etree.QName('http://www.inkscape.org/namespaces/inkscape', 'label'),
                   layerid)  # for the Inkscape-users
        target_points = get_points(xpath_shape % target_id)
        if len(reference_points) != len(target_points):
            raise RuntimeError(
                ('Different amounts of sampled points in reference "%s" and target "%s" paths. ' +
                 'Selector "%s" probably matches different number of paths in the two layers.') %
                (reference_id, target_id, xpath_shape)
            )
        for path in paths:
            path_data = path.get("d")
            p = parse_path(path_data)
            for segment in p:
                original_distance = abs(segment.end - segment.start)
                start_movement = point_movement(segment.start, reference_points, target_points)
                segment.start += start_movement
                end_movement = point_movement(segment.end, reference_points, target_points)
                segment.end += end_movement
                distance = abs(segment.end - segment.start)
                try:
                    # enhance position of CubicBezier control points
                    # amplification is relative to the distance gained by movement
                    segment.control1 += start_movement
                    segment.control1 += (segment.control1 - segment.start) * (distance / original_distance - 1.0)
                    segment.control2 += end_movement
                    segment.control2 += (segment.control2 - segment.end) * (distance / original_distance - 1.0)
                except AttributeError as ae:
                    # segment is not a CubicBezier
                    pass
            path.set("d", p.d())
        if EMBED_REPLICATIONS:
            container.append(outfit)
    if not EMBED_REPLICATIONS:
        container = copy.deepcopy(canvas).xpath('.', namespaces=ns)[0]
        container.append(outfit)

    if not EMBED_REPLICATIONS:
        svg = etree.tostring(container, pretty_print=True)
        with open((output_file_pattern % (bodypart, target_id, clothing)).lower(), 'wb') as f:
            f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'.encode("utf-8"))
            f.write(svg)

if EMBED_REPLICATIONS:
    svg = etree.tostring(tree, pretty_print=True)
    with open(output_file_embed, 'wb') as f:
        f.write('<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n'.encode("utf-8"))
        f.write(svg)
