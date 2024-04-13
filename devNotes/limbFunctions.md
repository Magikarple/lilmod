## Basic documentation for the limb access functions in the new limb system.

### ID system

The new system uses new IDs instead of the old ones.
```
limb       new  old
no limb:    0    1
natural:    1    0
basic:      2   -1
sex:        3   -2
beauty:     4   -3
combat:     5   -4
cybernetic: 6   -5
```


### Usage example:

```
<<if isAmputee($activeSlave)>>
    Slave is full amputee.
<</if>>
```

Most functions can be used like this, though some are more specialized.


### Functions:

#### Read-only functions:

* `isAmputee(slave)`:
    True if slave has no limbs, neither natural nor prosthetic.

* `hasAnyNaturalLimbs(slave)`:
    True if slave has at least one natural limb.

* `hasAnyProstheticLimbs(slave)`:
    True if slave has at least one prosthetic limb.

* `hasAnyLegs(slave)`:
    True if slave has at least one leg.

* `hasAnyArms(slave)`:
    True if slave has at least one arm.

* `hasAnyNaturalLegs(slave)`:
    True if slave has at least one leg that is natural

* `hasAnyNaturalArms(slave)`:
    True if slave has at least one arm that is natural

* `hasAnyProstheticArms(slave)`:
    True if slave has at least one arm that is prosthetic

* `hasBothLegs(slave)`:
    True if slave has both legs.

* `hasBothArms(slave)`:
    True if slave has both arms.

* `hasBothNaturalLegs(slave)`:
    True if slave has both legs and they are natural.

* `hasBothNaturalArms(slave)`:
    True if slave has both arms and they are natural.

* `hasAllLimbs(slave)`:
    True if slave has all limbs.

* `hasAllNaturalLimbs(slave)`:
    True if slave has all limbs and all are natural.

* `hasLeftArm(slave)`:
    True if slave has a left arm.

* `hasRightArm(slave)`:
    True if slave has a right arm.

* `hasLeftLeg(slave)`:
    True if slave has a left leg.

* `hasRightLeg(slave)`:
    True if slave has a right leg.

* `getLeftArmID(slave)`:
    Returns limb ID of the left arm.

* `getRightArmID(slave)`:
    Returns limb ID of the right arm.

* `getLeftLegID(slave)`:
    Returns limb ID of the left leg.

* `getRightLegID(slave)`:
    Returns limb ID of the right leg.

* `getLimbCount(slave, id)`:
    Returns count of specified limb ID.
    Can also be used to check for groups:
    101: any limbs that are not amputated
    102: prosthetic limbs off all kind
    103: sex-prosthetic
    104: beauty-prosthetic
    105: combat-prosthetic

    103-105 mean the sum of 3-5 and 6 respectfully.

* `getLegCount(slave, id)`:
    Returns count of legs with specified limb ID.

* `getArmCount(slave, id)`:
    Returns count of arms with specified limb ID.

#### String functions

* `idToDescription(id)`:
    Returns a very short description of the specified limb ID.
    0: "amputated";
    1: "healthy";
    2: "modern prosthetic";
    3: "advanced, sex-focused prosthetic";
    4: "advanced, beauty-focused prosthetic";
    5: "advanced, combat-focused prosthetic";
    6: "highly advanced cybernetic";

* `armsAndLegs(slave, arms, arm, legs, leg)`:
    Returns a string depending on the limbs a slave has. By default this is a
    variation of `arms and legs`, but this can be changed via parameters.

    Examples:
    `armsAndLegs(slave, "hands", "hand", "feet", foot)` returns `hands and feet` for a slave with all limbs,
    `hand and foot` for a slave with one limb each and `feet` for a slave with two legs, but no arms.

    Expects the slave to have at least one limb. Only the first parameter is mandatory, the rest defaults to the
    equivalent of `armsAndLegs(slave, "arms", "arm", "legs", "leg")`

#### Write-only functions

* `removeLimbs(slave, limb`:
    Removes a slave's limbs. Allowed values for limb: `"left arm"`, `"right arm"`, `"left leg"`, `"right leg"`, `"all"`.

* `attachLimbs(slave, limb, id)`:
    Attaches a limb of the specified id. Expects amputated limbs. Will overwrite existing limbs.
    Allowed values for limb: `"left arm"`, `"right arm"`, `"left leg"`, `"right leg"`, `"all"`.

* `configureLimbs(slave, limb, id)`:
    Sets the slave's limb to the specified id and sets all limb related variables to their correct values.
    Intended for use during slave generation and events.
    Allowed values for limb: `"left arm"`, `"right arm"`, `"left leg"`, `"right leg"`, `"all"`.
