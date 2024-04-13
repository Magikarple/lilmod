<!-- cSpell:ignore fchost, Shokusku's -->

# FCHost

FCHost is an alternative HTML renderer for playing Pregmod based on Chromium. It has multiple advantages compared to normal browsers:

* No browser cache limits, allowing arbitrarily large save files.
* Saves are stored in an easily accessible way on disk, allowing for easy manual editing.
* No lost saves due to accidentally cleared cookies.
* Can be noticeable faster.

A Windows build built on 3.14.2024 is available [here](https://mega.nz/file/AFhTxLxR#fQgZFswJHVLpLlY5BzhTPmUKtmISeHdJ065b_MW0700)
A precompiled version for Windows is available [here](https://mega.nz/folder/vzxgwKwL#L4V4JEk1YfWcvC7EG76TMg) 

## Initial setup

### HTML files

Place FC_pregmod.html next to the FCHost executable. On Windows, this is `fchost.exe`

### Art resources

Art resources work the same way as with other browser. For embedded art no actions are necessary, while for the others
the art resources have to be placed in a `resources` directory next to the HTML file.

Elohiem's interactive WebGL:

- fchost.exe
- resources/ 
  - webgl 
    
Shokusku's rendered image pack

- fchost.exe
- resources/
  - dynamic
  - renders

If making changes while the game is open make sure to refresh or restart FCHost before trying the art styles.

## Keybinds

| Action    | Key Combination  |
| --------- |------------------|
| Zoom In   | Ctrl + Plus      |
| Zoom Out  | Ctrl + Minus     |
| Dev Tools | Ctrl + Shift + J |


## Save file locations

On Windows saves are stored in `%User%\Documents\FreeCities_Pregmod\FCHostPersistentStorage\`

## Building FCHost

If you want to build FCHost yourself please refer to [FCHost/Building_FCHost.txt](FCHost/Building_FCHost.txt).
