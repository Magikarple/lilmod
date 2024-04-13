# JavaScript Exceptions

## Who captures exceptions?
If we don't catch the error manually, there are three different places where the error ends up being displayed to the
user. The exact place depends on the context of the executed code. These error messages show roughly the same information.

1. Captured and printed by us: `App.UI.DOM.formatException()`, hides path & shows version information.
    * Usually code which displays a passage.
2. Captured and printed by SugarCube: custom modification, hides path & shows version information.
    * Usually old twine passages
3. Captured and printed by Browser: Not hiding anything & does not show version information.
    * Usually callbacks

## Manual exception handling

With the movement away from passages as .tw files error handling is getting more important, especially proper cleanup.

A good example is [this issue](https://gitgud.io/pregmodfan/fc-pregmod/-/issues/2654), the end week animation did not stop because `App.EndWeek.slaveAssignmentReport()` failed, which
meant that the endweek animation stop call wasn't executed.

### Finally

Example of the proper way to handle code that cleans up something and should therefore always be executed:

```js
try {
    // setup code

    // other code, may fail
} finally {
    // cleanup code
}
```

Do note that this will still propagate the error up, it will just execute `cleanup code` first. If you want to handle
the error use `catch`

### Catch

If needed a catch clause can be used as well, but it is usually advisable to only catch specific errors and only if you
know they can be thrown and there is no easy way to prevent them.

Example with catch:

```js
try {
    // code that may throw a RangeError
}  catch (ex instanceof RangeError) {
    // error handling code
}
```

### Reference

See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
