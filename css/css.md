# CSS module

This directory contains ALL style files for this project.

## Structure

Most of the structure should be self-explanatory, this is a list of the main rules when adding new styles

* `general/`: Only Styles that can be used in many different places and are not part of a specific system may be added
  here.

* When adding styles that are only used in one place put them in a directory that matches the top directory of the
  corresponding JS file in `src/` or `js/`.

* There is no catch-all file, if there is no place where your style goes create one instead of mixing them together with
  unrelated styles. This does mean there are many small files, but properly sorted and named this is preferable to one
  large catch-all file.

## Compiling

During compiling all CSS files in this directory get combined and then added as a module, which means the styles are put
directly into the `<head>` element of the final HTML file.
