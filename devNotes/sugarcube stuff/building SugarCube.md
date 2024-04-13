# Obtaining and building SugarCube for FC

## Intro

This brief how-to guides through patching and building [SugarCube](https://github.com/tmedwards/sugarcube-2)
for the Free Cities. SugarCube sources can be obtained locally by cloning its Git repository.

Prerequisites (listed NOT in the installation order, please read the list to the end first):

1. [Node.js](https://nodejs.org) with npm.
2. To build some packages, Node.js requires python and a C/C++ compiler. On Windows you may want to
install Visual Studio (or just the build tools) and Python 2.7 first. As of now, SugarCube does not
depend on any of such packages.

Windows: please choose to make the tools accessible from anywhere by allowing installers to modify
the PATH environment variable.

## Retrieving SugarCube sources and preparing build environment for it

The SC2 sources are a git submodule.

1. Get the sources: If it's the first time: `git submodule update --init --recursive`, afterwards `git submodule update` is enough.

2. Download required JavaScript libraries that are used during the build.
    Run the node package manager (npm) in the repository: `npm install` or `npm update`.
    * You need to navigate into `submodules/sugarcube-2` first.

## Building

Run the build.js script. If you use Git bash, you can run the `build.js` file directly, otherwise run
it as `node build.js`. See `build.js -h` for options, but reasonable sets are the following.

* for release version: `node build.js -n -b 2`
* for debug version: `node build.js -n -b 2 -u -d`

Find result files in the `build` directory. After each build you have  to copy the release `format.js` to
`devTools/tweeGo/storyFormats/sugarcube-2`. Do not forget to `git add` the file.

Linux: If you have make installed, `make sugarcube` automatically builds and copies `format.js` to
`devTools/tweeGo/storyFormats/sugarcube-2` for easy testing.

## Contributing

1. Fork the [SC2 repo](https://gitgud.io/Arkerthan/sugarcube-2)
2. Navigate into submodules/sugarcube-2
    * Tip: Use two terminals, one in the main repo and one in the submodule.
    * You are now in the root of the submodule. Git works here (almost) the same as in the root of a standalone repo.
3. Add your fork as remote
4. `git submodule update` leaves you in a detached head state, so checkout fc and pull recent changes
5. Branch, modify, commit, push as usual.
6. Build and replace `devTools/tweeGo/storyFormats/sugarcube-2/format.js`
7. Create a new patch `git diff master <your branch> > sugarcube-fc-changes.patch` and move it to
    `devNotes/sugarcube stuff/`.
8. Commit and push in the main repo.
9. Open an MR in the SC2 repo **AND** in the main repo. Mark the MR in the main repo as **WIP**.
10. Once the MR in the SC2 repo is accepted do:
    *  In the submodule
    1. `git checkout fc`
    2. `git pull`
    *  In the main repo
    1. `git add submodules/sugarcube-2`
    2. `git commit --amend --no-edit`
    3. `git push -f`
11. Remove WIP flag from main repo.

Repeat steps 4 - 11.

## (OLD) Retrieving SugarCube sources and preparing build environment for it

Note: This is **NOT** recommended. Everything below is for documentation purposes only.

1. Open a terminal window where you want to clone the repository, and run the following command: `git clone https://github.com/tmedwards/sugarcube-2.git`. Change working directory into the cloned repository.

2. The last step we need is downloading required JavaScript libraries that are used during the build.
Run the node package manager (npm) in the repository: `npm install` or `npm update`

*CAUTION*: dependencies list (located in the package.json file in the repository root) may change from
commit to commit and it differs between branches! Make sure to install correct dependencies after switching working branch.

## Applying the FC patch

The FreeCities game relies on a few changes to the vanilla SugarCube code. The modified SC2 can be found [here](https://gitgud.io/Arkerthan/sugarcube-2).

If unavailable, it is possible to patch the official SC2 sources using the patch file. The SugarCube code changes from version to version that requires modification to the patch file, and therefore there are several of them, named after the highest SugarCube version they applies to. There are at least two different ways to manage the patches/changes, with the first one suitable for occasional users, while the second one works best if you maintain the SugarCube patch for the FC project or just want to keep building for more than a single SugarCube version.

### Single time patching

Find the correct patch in this repo and apply it to the sources:
`git apply <full path to sugarcube-fc-changes.patch>`

You are ready to build provided no errors were returned by `git apply`

### Maintaining the patch

#### Crating git branch with patched SugarCube sources

For this purpose we will create a git branch with the changes and then update it, [rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing) it on top of the SugarCube master branch when updating is needed.

To start over, create a branch for the patched version (here it will be named "fc") and checkout it: `git checkout -b fc`. Now apply FC changes as in the previous section using `git apply`, but afterwards commit the changes.

*Caveat*: to apply the patch you have to use the version of the SugarCube sources it applies to. If the latest patch does not apply to the current SugarCube master branch, check the `git log` to find the commit id of the SugarCube release you have the patch for. Then branch from that commit: `git branch fc <commit-id>` and checkout the "fc" branch: `git checkout fc`. To update the "fc" branch to the latest SugarCube see below.

#### Updating git branch

To update the branch we will use rebasing. First, fetch changes from the remote SugarCube repo: `git fetch origin`. Check that you are on the "fc" branch (`git checkout fc` if you are not). Now try to rebase your "fc" branch on top of the upstream master branch: `git rebase origin/master`. If that succeeds, the new patched SugarCube sources are ready in the "fc" branch. Proceed to building.

If the rebasing resulted in a conflict, you have to resolve it first. Issue `git rebase --continue` to get the list of files with conflicts, look for conflict markers ('<<<<') in those files, make required changes, do not forget to save the files, and follow advices from `git rebase --continue` until you finally resolve all the conflicts and obtain a new patched sources.

Now you need to update the patch files in the FC repo. First, rename the old patch file: `git mv sugarcube-fc-changes.patch sugarcube-fc-changes-<the last version it applies to>.patch`. Now create an new patch and add it to the repository: `git diff master fc > sugarcube-fc-changes.patch`, copy it to this dir and `git add sugarcube-fc-changes.patch`.

## APPENDIX Lists required steps very briefly

1. Clone SugarCube repo: `git clone https://github.com/tmedwards/sugarcube-2.git`
2. Change active directory into the directory of the sugarcube clone.
3. Set active branch to "master": git checkout master
4. Run npm install in the repo dir.

*CAUTION*: Requited dependencies change during the project lifetime and vary from branch to branch;
you may need to run npm install again after some time, or after branch/tag change. Try to run it in
case of strange build errors.

The next is done in the directory where SC repo was cloned. Loop over required SugarCube versions:

### Setup:

1. `git reset --hard` to clean any local changes.
2. `git branch fc v2.30.1` (the tag for the version you have the latest patch for).
3. `git checkout fc`

### Update loop

1. `git fetch origin`
2. `git checkout fc`
3. `git rebase origin/master`
4. Conflict resolving, `git rebase --continue` and `git add` are needed.
5. `git diff master fc > sugarcube-fc-changes.patch`; `git add sugarcube-fc-changes.patch`.

### Build

1. `node build.js -6 -b 2` to build release version
2. `cp build/twine2/sugarcube-2/format.js <whenever you want>`
3. `node build.js -6 -b 2 -u -d` to build debug version
4. `cp dist/twine2/sugarcube-2/format.js <whenever you want to place the debug header>`
