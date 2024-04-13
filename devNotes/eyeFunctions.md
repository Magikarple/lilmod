## Eye Functions

In all functions `side` can be `left`, `right` or `both` unless stated otherwise.

Eye types: `1`: normal; `2`: glass; `3`: cybernetic
`0` is used as return value if there is no eye, but is never stored in the slave object.

Vision: `0`: blind; `1`: nearsighted (or impaired/blurred); `2`: normal

### Read-only functions

* `hasAnyEyes(slave)`:
    True if slave has at least one eye.

* `hasAnyNaturalEyes(slave)`:
    True if slave has at least one eye that is natural.

* `hasAnyProstheticEyes(slave)`:
    True if slave has at least one eye that is prosthetic (cybernetic or glass).

* `hasAnyCyberneticEyes(slave)`:
    True if slave has at least one eye that is cybernetic.

* `hasBothEyes(slave)`:
    True if slave has both eyes.

* `hasBothNaturalEyes(slave)`:
    True if slave has both eyes and they are natural.

* `hasBothProstheticEyes(slave)`:
    True if slave has both eyes and they are prosthetic (cybernetic or glass).

* `hasBothCyberneticEyes(slave)`:
    True if slave has both eyes and they are cybernetic.

* `hasLeftEye(slave)`:
    True if slave has left eye.

* `hasRightEye(slave)`:
    True if slave has right eye.

* `getLeftEyeType(slave)`:
    Returns type of the left eye.

* `getRightEyeType(slave)`:
    Returns type of the right eye.

* `getLeftEyeVision(slave)`:
    Returns vision of the left eye.

* `getRightEyeVision(slave)`:
    Returns vision of the right eye.

* `getBestVision(slave)`:
    Returns highest vision of both eyes.

* `getWorstVision(slave)`:
    Returns lowest vision of both eyes.

* `anyVisionEquals(slave, vision)`:
    True if one eye has the specified vision.

* `getLeftEyeColor(slave)`:
    Returns color of the left eye. If there is no eye `empty` is returned.

* `getRightEyeColor(slave)`:
    Returns color of the right eye. If there is no eye `empty` is returned.

* `getLeftEyePupil(slave)`:
    Returns the shape of pupil of the left eye. If there is no eye `circular` is returned.

* `getRightEyePupil(slave)`:
    Returns the shape of pupil of the right eye. If there is no eye `circular` is returned.

* `hasVisibleHeterochromia(slave)`:
    True if left and right eye colors are different. Does NOT relate to the genetic quirk.

* `getGeneticEyeColor(slave, side)`:
    Gives the genetic color of the specified eye.
    `both` is not allowed as value of `side`.

* `getLenseCount(slave)`:
    Counts the number of eyes that are not the genetic color.


### Description

* `App.Desc.eyesType(slave)`:
    Fits in a sentence like this: She has {return}.

* `App.Desc.eyeTypeToString(type)`:
    Converts an eye type to a string.
    `1` -> `natural`
    `2` -> `glass`
    `3` -> `artificial`

* `App.Desc.eyesColor(slave, adj = "", eye = "eye", eyes = "eyes")`:
    Fits in a sentence like this: She has {return}.
    `adj` is added in between color and eye like this: `brown wet eyes`.

* `App.Desc.eyeColor(slave)`:
    Fits in a sentence like this: She has {return} eyes.
    Prefer App.Desc.eyesColor if possible as it works reliably with only one eye. Example where this is better: {return}-eyed gaze

* `App.Desc.eyesVision(slave)`:
    Fits in a sentence like this: She has {return}.

* `App.Desc.eyesToVision(slave)`:
    Converts an eye vision to a string.
    `0` -> `blind`
    `1` -> `nearsighted`
    `2` -> `normal`


### Modification

* `eyeSurgery(slave, side, action)`:
    Modifies a slaves eyes.
    Allowed values for `action`:
    No Existing eyes required: `normal`, `glass`, `cybernetic`
    Existing eyes required: `remove`, `blind`, `blur`, `fix`

* `setEyeColor(slave, color, side = "both")`:
    Changes the visible eye color.

* `setEyeColorFull(slave, iris, pupil, sclera, side)`:
    Changes all visible parts of the eye.

* `setGeneticEyeColor(slave, color, heterochromia = false)`:
    Changes the genetic eye color. WARNING: If `heterochromia` is `true`, the function will add the genetic quirk, even if the slave did not have it before.

* `resetEyeColor(slave, side)`:
    Sets the eye color to the genetic color. Takes heterochromia and albinism into account.
