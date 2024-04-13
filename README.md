<!-- cSpell:ignore nwjs -->

# Free Cities - pregmod

Pregmod is a modification of the original [Free Cities](https://freecitiesblog.blogspot.com/) created by FCdev.

## Play the game

1. Download the game
   * [Current release](https://gitgud.io/pregmodfan/fc-pregmod/-/releases)
   * [Latest build](https://gitgud.io/pregmodfan/fc-pregmod/-/jobs/artifacts/pregmod-master/download?job=build)
2. Open the game in your preferred browser
   * On PC, we recommend either Firefox or [FCHost](FCHost/documentation_FCHost.md).
   * Recommendation: Drag it into incognito mode
3. Have fun!

### Compile the game yourself

If you want to tweak the game a bit, you can easily download the files and compile it yourself.

1. Clone the git repository:
   1. [Install Git for terminal](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) or a Git GUI of your
      choice.
   2. Clone the repo
       * Via terminal: `git clone --single-branch https://gitgud.io/pregmodfan/fc-pregmod.git`
   3. Get updates
       * Via terminal: `git pull`

2. Compile the game:
   * Windows
     * Run compile.bat
     * Second run of compile.bat will overwrite without prompt

   * Linux/Mac
     1. Ensure executable permission on file `devTools/tweeGo/tweego` (not tweego.exe!)
     2. Ensure executable permission on file `compile.sh`
     3. In the root dir of sources (where you see src, devTools, bin...) run command `./compile.sh` from console.
        Alternatively, if you have make installed, run `make all` in the root directory.

3. To play open FC_pregmod.html in bin/

## Common problems

* If compiling takes a while or causes a noticeable increase in system resource utilisation.
  - It might be worth checking your main Antivirus (AV) settings.
  - If it is Windows Defender (currently tested with Windows 10):
    * `Start menu` -> `Windows Security` -> `Virus & threat protection` -> `Virus & threat protection settings` ->
      `Manage settings` -> `Exclusions (near the bottom)` -> `Add or remove exclusions` -> `Add an exclusion` ->
      `path to bin/.`

* `sessionStorage quota exceeded` / `localStorage quota exceeded` or something similar
  - Your saves stored inside the browser are getting too large. There are multiple ways to solve this:
    1. Delete saves stored in the browser. If you want to keep them, save them to disk first.
    2. Disable autosave and delete the current one. Due to technical reasons autosaves are larger than normal saves,
       so this may help more than expected.
    3. If on Firefox, raise the storage limit: Type `about:config` in the address bar and search for
       `dom.storage.default_quota`. Increase this value as needed. Default value is 5120 kilobytes / 5 MB.
    4. Switch to a different browser. Recommended is either Firefox or [FCHost](FCHost/documentation_FCHost.md), a
       custom HTML renderer specifically for Pregmod.
    5. If you absolutely need to use Google Chrome:
       1. download and unzip [NW.js SDK](https://nwjs.io/downloads/) for your operative system.
       2. copy the game file (FC_pregmod.html) into the `nwjs-sdk-v0.XX.Y-YOUR_OS` folder
       3. in the same folder, create a text file with the following content:
          ```
          {
              "name": "Free Cities pregmod edition",
              "main": "FC_pregmod.html",
              "dom_storage_quota":30
          }
          ```
          and save it as package.json. In this example, 30 is the limit (in MB) that is set for the storage quota,
          but you can replace it with any number. Google Chrome has the same default value as Firefox.
       4. Double click nw.exe to launch the game.

* Everything is broken!
  - **Do not copy over your existing download** as it may leave old files behind, replace it entirely

* I can't save more than once or twice.
  - Known issue caused by SugarCube level changes. Save to file doesn't have this problem and will likely avoid the
    first problem as well.
  - It is possible to increase the memory utilized by your browser to delay this

* I wish to report a sanityCheck issue.
  - Open an issue or, if you are interested, it could be a great first contribution. Be warned though, a large number
    are false positives.

## Contribute

New Contributors are always welcome. Basic information before you start can be found [here](CONTRIBUTING.md).

## Submodules

FC uses a modified version of SugarCube 2. More information can be found [here](devNotes/sugarcube stuff/building SugarCube.md).
