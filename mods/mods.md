# Player Mods

Player mods are scripts that are loaded after loading the game itself.

There is currently very limited support for these mods with few systems exposing an API for modding.

To use the mods in this directory copy the `mods` directory directly next to the game HTML file like this:

* `FC_pregmod.html`
* `mods/`
    * `example/`
        * `index.js`
        * ...
    * ...

The example mod explains the modding API itself and has examples for all moddable systems.
