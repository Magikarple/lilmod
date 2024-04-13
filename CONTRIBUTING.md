# Contributing to FC: Pregmod

First off, thanks for taking the time to contribute!

If there is anything you don't understand feel free to ask. Many of the more advanced tools are also not required for
fixing small typos or simple bugs.

## Environment

### Requirements

To effectively work on the project the following tools are required:

* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/) or another npm client
* a code editor
  * [VSCode](https://code.visualstudio.com/) is a popular option
* [Java Runtime Environment](https://jdk.java.net/18/), minimum JRE8

### Setting everything up

1. Clone the project from GitGud.io ([Detailed Git setup and work cycle](devNotes/gitSetup.md))
2. Navigate to the `fc-pregmod` root directory.
   * Windows: Open a terminal and execute `cd C:\path\to\project\fc-pregmod`
   * GNU/Linux: Open a terminal and execute `cd /path/to/project/fc-pregmod/`
3. Run `npm install` in your terminal
4. Open the directory in your preferred editor

* Make sure you have an extension for ESLint installed to catch formatting errors

Recommended extensions for VSCode:

* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
* [GitLens — Git supercharged](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens).

### Compiling

While you can compile it like usual (`compile.bat`/`compile.sh`/`make`), there is also a `Gulp script` that creates
source maps for easier debugging. Other than that there are no differences between compiling for development or
compiling for playing the game.

If you are using an ARM-based device, you may need to use `arch -x86_64 bash compile.sh` to properly compile.

## Code style

Generally the code style is based on our `.eslintrc.json`. If your IDE has an auto format feature it can often read the
rules from `.eslintrc.json`. **Be sure to run `npm run lint` in the console before committing and pushing your changes.**

### Documentation

It's a good idea to provide meaningful documentation for new functions and classes where possible. We follow
Typescript's [JSDoc](https://jsdoc.app) type dialect for the most part (and we provide a Typescript configuration and
auxiliary type definition files if you'd like to use it yourself – it's pretty nifty). Don't worry too much about
specific type syntax if you can't make TS work or don't understand it, someone else will probably fix it for you as long
as you've made the intent clear in some form of JSDoc.

### Naming conventions

* JavaScript variable and function names should be `camelCase`.

```js
// good
let fooBar;

// bad
let foobar;
let Foobar;
let FooBar;
```

* JavaScript classes and namespaces should be `PascalCase`.

```js
// good
class Foo {}
App.Foo.bar();

// bad
class foo {}
class FOO {}
App.foo.bar();
```

* Enum members should be `ALLCAPS`.

```ts
// good
enum Foo {
  BAR = 'bar',
  BAZ = 'baz',
}

// bad
enum Foo {
  bar = 'bar',
  Baz = 'baz',
}
```

This also applies to JavaScript objects that are used as enums.

```js
// good
/** @enum {string} */
const Foo = {
  BAR: 'bar',
  BAZ: 'baz',
}

// bad
/** @enum {string} */
const foo = {
  BAR: 'bar',
  BAZ: 'baz',
}

// worse
/** @enum {string} */
const foo = {
  bar: 'bar',
  Baz: 'baz',
}
```

* CSS classes are `kebob-case`.

```css
/* good */
.foo-bar {}

/* bad */
.fooBar {}
.FOO-BAR {}
```

New code should generally get organized into the `App` namespace. See [fc-js-init.js](js/002-config/fc-js-init.js) for a rough outline.

### JavaScript Features

Use modern JavaScript features when possible. We are currently targeting ECMAScript 2021, and aren't trying to support Internet Explorer or anything stupid like that (it isn't 2010 anymore). For example, use `let`/`const` rather than `var`, prefer fat arrow functions to inline long-form functions, use nullish coalescing and optional chaining, etc.

### Code quality

There are three main tools used to ensure good code quality: `ESLint`, `TypeScript Compiler (tsc)` and a custom sanity
check.

`ESLint` and `tsc` can be setup in most IDEs aimed at web development to show errors while editing the file.

Contributions should generally not add any new sanity check errors, and it's especially important to check this if
you're making changes to `.tw` files.
Use `./compile.sh --dry --sanity` or the shorthand `./compile.sh -d -s` on Linux or macOS.
On Windows run `compile_debug+sanityCheck.bat`.
It searches for common spelling errors and syntax errors in the Twine files. Don't worry about preexisting
errors; it's not totally clean as is and there are a few false positives.

## Project Structure

### Source files

* `src/` is the main directory for source code. It also contains the embedded art files. Since it is inside an `eval()` statement debugging and minification is more complicated than for `js/`.
* `js/` is loaded before SugarCube and therefore outside SugarCube's eval which `src/` is contained in. This means accessing SugarCube features (like `SugarCube.Engine`) is more complicated however it other than `src/` it can be minified and is easier to debug. Currently, contains mainly static data, however new code not relying on SC2 should be sorted in here too.
* `css/` contains all CSS files. The internal structure is explained [here](css/css.md).
* `themes/` contains [custom themes](themes/themes.md) which are built separately.

### Developer Files

* `devNotes/` contains various wiki files and other potentially interesting files.
* `devTools/` contains various scripts and executables needed for working with the project or compiling. TypeScript typing files are stored here as well.
* `submodules/` contains Git submodules
  * currently only a custom version of SugarCube 2

### Art files

* `artTools/`contains files for creating and updating [vector art](artTools/README.md)
* `resources/` contains various [art related files](resources/ReadmeBeforeAddingArt.md)

### External Programs

* `docker/` contains Docker files from which the docker containers for GitLabs CI are created
* `FCHost/` contains the sources for [FCHost](FCHost/documentation_FCHost.md)
* `saveTools/` contains tools for [editing save files](saveTools/README.md)

## Further Reading

### Wiki Files

* Event Writing Guides
  * [Twine<sup>1</sup>](devNotes/sceneGuide.md)
  * [JavaScript](devNotes/jsEventCreationGuide.md)
* [Exception handling](devNotes/exceptions.md)
* [Sanity check](devNotes/sanityCheck.md)
* [Slave List](devNotes/slaveListing.md)
* [Pronouns](devNotes/Pronouns.md)
* External function documentation
  * [Eyes](devNotes/eyeFunctions.md)
  * [Limbs](devNotes/limbFunctions.md)
  * [Some potentially useful JS functions](devNotes/usefulJSFunctionDocumentation.md)
  * [Content embedding chart](devNotes/contentEmbeddingChart.png) (for more details refer to [this issue](https://gitgud.io/pregmodfan/fc-pregmod/-/merge_requests/7453#note_118616))

<sup>1. Twine is being phased out of the project and should not be used in new code, but the basic concepts found here still apply.</sup>

### Useful issues

* [Setting up VS Code](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/2448)
* [Classes in Game State](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/696)
* [Self executing functions](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/2325)
* [Sort a map](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/2642)
* [How to create a Merge Request (MR)](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/3903)
