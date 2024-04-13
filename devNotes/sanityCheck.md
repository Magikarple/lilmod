# The Sanity Check

## Structure

The sanity check consists of two parts: The first part is a script with a number
of `git grep` calls using regex to find typical errors. The second parts is a java program that checks for correct closure of all SugarCube macros and HTML tags and has some additional functionality.

## The Java Check

### Structure

The java check has 3 main parts:

1.  A checks for correct closure of all SugarCube macros and HTML tags in the
    .tw files.

2.  A check to find variable names that are only used once to find misspelled
    variables and leftovers from removed variables.

3.  A search through all files against a dictionary to find common misspellings
    and deprecated code.

### Maintenance

In order to keep the number of false positives to a minimum this check has to be
regularly maintained:

1.  When new macros or HTML tags are introduced in the project code they have to
    be added to `devTools/javaSanityCheck/twineTags` or
    `devTools/javaSanityCheck/htmlTags`.

2.  When removing variables they often have a reference left in some kind of BC
    related code. This is a common example when a false positive occurs and that
    variable has to be added to `devTools/javaSanityCheck/ignoredVariables`.

3.  When fully removing variables that were ignored, they have to be removed
    from `devTools/javaSanityCheck/ignoredVariables` too.

4.  When adding variables it can happen that only one usage is identified by the
    check, which means that it throws a false positive. To remove this add the
    variable to `devTools/javaSanityCheck/ignoredVariables`. When the variable
    is used in more places later and found more than once it has to be removed
    again to keep the check as efficient as possible.

5.  When you find common missspellings you can add them to
    `devTools/dictionary_phrases.txt` or `devTools/dictionary_wholeWord.txt`.

6.  When a file produces so many false positives that they are impossible to
    clean up it may be added to `devTools/javaSanityCheck/excluded`.

### Source code

The source code can be found at [gitgud.io](https://gitgud.io/Arkerthan/twine-sanitycheck).
