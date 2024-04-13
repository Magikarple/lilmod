<!-- cSpell:ignore faraen, eart, lxml, XMLID -->

# How to vector art

Please read the whole document before starting to work.
Some aspects are not obvious right away.

Note: This does not actually describe how to be an artist.

## TL;DR

	killall inkscape
	artTools/vector_layer_split.py artTools/vector_source.svg tw src/art/vector/layers/
	compile
	python3 artTools/normalize_svg.py artTools/vector_source.svg
	git commit -a

## 1. Be an artist

Make changes to the vector_source.svg.
Inkscape was thoroughly tested.
Adobe Illustrator might work decently, too.

## 2. Respect the structure

While editing, keep the Layers in mind.

* In Inkscape, Layers are special "Inkscape groups".
* In Illustrator, Layers are groups with user-defined IDs.
* All Layers should have an ID that is globally unique
  (not just within their subtree).

* Please use anonymous groups only for the ease of editing. Remove all "helper" groups before finally saving the file.
* Anonymous groups can be used for continuous scaling (of e.g. boobs).

* Every asset that should go into a separate file needs to be in a labelled group
  (even if that is a group with only one shape).
* There are some globally available styles defined as CSS classes (e.g. skin, hair).
  Use them if your asset should be changed upon display.
  Do not set the style directly in the object.
* You can use Inkscape to define and add classes to paths. 
  To add a class to a path, open the XML editor with the path selected (Edit → XML Editor...)
  Delete all fields except for those with the names 'id', and 'd'.
  Add a new field to the path and name it 'class'.
  Make its value one of the values defined in the below section.
  
**MAINTAIN THESE CLASS DEFINITIONS BY MANUALLY EDITING YOUR WORKING SVG FILE**

	<style
	type="text/css"
	id="style">
	/* please maintain these definitions manually */
	.white{fill:#FFFFFF;}
	.skin{fill:#F6E0E8;}
	.head{}
	.eart{}
	.torso{}
	.tail{}
	.boob{}
	.penis{}
	.scrotum{}
	.areola{fill:#D76B93;}
	.bellybutton{fill:#D76B93;}
	.labia{fill:#D76B93;}
	.hair{fill:#3F403F;}
	.eyebrow_hair{fill:#3F403F;}
	.shoe{fill:#3E65B0;}
	.shoe_shadow{fill:#15406D;}
	.smart_piercing{fill:#4DB748;}
	.steel_piercing{fill:#787878;}
	.steel_chastity{fill:#BABABA;}
	.gag{fill:#BF2126;}
	.shadow{fill:#010101;}
	.glasses{}
	.eye{}
	.sclera{fill:#FFFFFF;}
	.lips{}
	</style>
	
You should be able to find this structure somewhere in the first 500 lines of your working svg file.
	
The formatting of these definitions matters for `normalize_svg.py`, which is invoked as part of `vector_layer_split.py` and explained below.

## 3. Normalize the document (before committing)

**THIS IS IMPORTANT**

The various editors out there (Inkscape, Illustrator) may use different variants of formatting the SVG XML.
Use

	python3 normalize_svg.py vector_source.svg

before committing to normalize the format so git will not freak out about the changed indentation.

If you use Inkscape, please use Edit → Settings → Input/Output → SVG-Output → Path Data → Optimized. This is the default.
In case your Editor uses another path data style which cannot be changed, please contact the other artists and developers via the issue tracker to find a new common ground.

What it does:
* Formats the SVG XML according to Pythons lxml module, regardless of editor.
* Adobe Illustrator uses group IDs as layer labels.
  Inkscape however uses layer labels and a separate, auto-generated group ID.
  normalize_svg.py overwrites the group ID with the Inkscape layer label
  so they are synchronized with Inkscape layer labels.
* Inkscape copies the global style definition into the object *every time*
  the object is edited. If an object references a CSS class AND at the same time
  has a local style, the local style is removed
  so global dynamic styling is possible later on.

Note: Behavior of Adobe Illustrator is untested.

## 4. Split the layers

For NoX original, deepmurk extensions, execute

	python3 vector_layer_split.py vector_deepmurk_primary.svg tw ../src/art/vector/layers/

For faraen revamped art (based on NoX original)

	python3 vector_revamp_layer_split.py vector_revamp_source.svg tw ../src/art/vector_revamp/layers/

. This application reads all groups in `vector_source.svg`.
Each group is stored in a separate file in the target directory `/src/art/vector/layers/`.
The group ID sets the file name. Therefore, the group ID **must not** contain spaces or any other weird characters.

Also consider:
* A group with ID ending in _ is ignored. Use Layers ending in _ to keep overview.
* A group with ID starting with "g" (Inkscape) or "XMLID" (Illustrator) is also ignored.
* Existing files are overwritten **without enquiry**.
* The target directory is not emptied. If a file is no longer needed, you should remove it manually.
* This procedure removes global definitions. This means, SVG filters are currently not supported.

Available output formats are `svg` and `tw`.
`svg` output exists for debug reasons.
`tw` embeds the SVG data into Twine files, but removes the global style definitions so they can be set during display.

## 5. Edit the code

`/src/art/` contains Twine code which shows the assets in the story.
There are many helpful comments in `/src/art/artWidgets.tw`.
The code also generates the previously removed global style definitions on the fly and per display.

## 6. Compile the story

Use the provided compile script (Windows batch or shell) for compiling.

## 7. Advanced usage

You can define multiple CSS classes to one element, e.g. "skin torso". When procedurally generating CSS, you can then set a global "skin" style, and a different one for "torso".

You can put variable text into the image using single quotes, e.g. "'+_tattooText+'". The single quotes *break* the quoting in Twine so the content of the Twine variable `_tattooText` is shown upon display. You can even align text on paths.

An anonymous group can be used for dynamic transformation. However, finding the correct parameters for the affine transformation matrix can be cumbersome. Use any method you see fit. See `src/art/vector/Boob.tw` for one example of the result.
