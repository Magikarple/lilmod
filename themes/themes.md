# Themes

Every subdirectory is a distinct theme. The compiled theme is placed in `bin/` and can be loaded ingame via the options
page.

## Creating new themes

Files inside these directories are combined into one CSS file based on
alphabetical ordering. The light theme is recommended as a base for creating new themes.

For quick testing run `App.UI.Theme.loadTheme("yourTheme.css")` in the browser console. This will unload the current
theme and load the new theme. If you modify the same file it is effectively reloading. Supplying no argument (eg.
`App.UI.Theme.loadTheme()`) will unload any theme.
