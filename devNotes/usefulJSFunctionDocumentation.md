# Useful Functions

## Assay Functions

```js
isSlim(slave) // Returns if slave is considered slim or not by arcology standards.

isStacked(slave) // Returns if slave is considered stacked (big T&A) or not.

isModded(slave) // Tallies a slave's tats and piercings and returns if slave is considered heavily modded or not.

isUnmodded(slave) // Returns if slave is (relatively) unmodded. Some leeway.

isXY(slave) // Returns if a slave has a dick. (This needs review, it's far outdated for what it is used for.)

isPreg(slave) // Returns if a slave looks pregnant.

isNotPreg(slave) // Returns if slave has no sizable belly.

isPure(slave) // Returns if slave has not been surgically enhanced (to a noticeable degree).

isSurgicallyImproved(slave) // Returns if slave has been surgically enhanced with boob, butt and lip implants and also has a small waist.

PiercingScore(slave) // Returns int representing degree of piercings. Higher means more piercings.

TatScore(slave) // Returns int representing degree of tattooing. Higher means more tattoos.

canImproveIntelligence(slave) // Returns if slave intelligence can be improved with Psychostimulants

canImproveHeight(slave) // Returns if slave height can be improved with growth stimulants

sameAssignmentP(slave, slave) // Returns if slaves are on the same assignment.

haveRelationshipP(slave1, slave2) // Returns if slave1 is in a relationship with slave2.

isRivalP(slave1, slave2) // Returns if slave1 is in a rivalry with slave2.

supremeRaceP(slave) // Returns if slave is of the superior race. (Should only be used in conjunction with racial supremacy.)

inferiorRaceP(slave) // Returns if slave is of the inferior race. (Should only be used in conjunction with racial subjugation.)

isLeaderP(slave) // Returns if slave is in a leadership assignment.

isMotherP(slave1, slave2) // Returns if slave2 is slave1's mother.

isFatherP(slave1, slave2) // Returns if slave2 is slave1's father.

isParentP(slave1, slave2) // Returns if slave2 is either of slave1's parents.

sameDad(slave1, slave2) // Returns if slave1 and slave2 have the same father.

sameMom(slave1, slave2) // Returns if slave1 and slave2 have the same mother.

areTwins(slave1, slave2) // Returns if slave1 and slave2 are twins.

areSisters(slave1, slave2) // Returns sister status of slave1 and slave2 (1 // twins, 2 // sisters, 3 // half-sisters)

areRelated(slave1, slave2) // Returns if slave1 and slave2 are related.

totalRelatives(slave) // Returns the number of relatives slave has.

mutualChildren(slave1, slave2) // Returns if slave1 and slave2 have children together.

isSlaveAvailable(slave) // Returns if slave is available and not confined someplace.

assignmentVisible(slave) // Returns whether a slave's current assignment is shown in Main. Often used as a proxy for "penthouse slave".

randomRelatedSlave(slave) // Returns a random relative of slave if possible.

randomRelatedAvailableSlave(slave) // Returns a random available relative of slave if possible.

randomSister(slave) // Returns a random sister of slave if possible.

randomTwinSister(slave) // Returns a random available twin of slave if possible.

randomAvailableSister(slave) // Returns a random available sister of slave if possible.

randomDaughter(slave) // Returns a random child of slave if possible.

randomDaughter(slave) // Returns a random available child of slave if possible.

randomParent(slave) // Returns a random parent of slave if possible.

randomAvailableParent(slave) // Returns a random available parent of slave if possible.

totalPlayerRelatives(PC) // Returns the number of relatives the player has.

isSexuallyPure(slave) // Returns if the slave has (possibly) never had sex.

canGetPregnant(slave) // If the slave is fucked right now, could she get pregnant?

canBreed(slave1, slave2) // Returns if slave1 and slave2 are capable of breeding with each other.

canImpreg(slave1, slave2) // Returns if slave2 can impregnate slave1. PC works as an argument as well.

canFemImpreg(slave1, slave2) // Returns if slave2 can squirt cum and impregnate slave1. Assumes a slave does not have a dick. PC works as an argument as well.

isFertile(slave) // Returns if the actor is capable of having children.

canAchieveErection(slave) // Returns if the slave can get an erection. (Not blocked by chastity.)

canPenetrate(slave) // Returns if the slave can penetrate successfully.

canSee(slave) // Returns if the slave can see.

canHear(slave) // Returns if the slave can hear.

canSmell(slave) // Returns if the slave can smell.

canTaste(slave) // Returns if the slave can taste.

canHold(slave) // Returns if the slave can use both arms.

canWalk(slave) // Returns if the slave can walk unassisted.

canStand(slave) // Returns if the slave can stand unassisted.

canMove(slave) // Returns if the slave is capable of moving themselves.

isHindered(actor) // Returns if the actor's movement is impeded for any reason.

canTalk(slave) // Returns if the slave can talk.

canDoAnal(slave) // Returns if the slave can currently have anal sex.

canDoVaginal(slave) // Returns if the slave can currently have vaginal sex.

tooFatSlave(slave) // Returns if the slave is too fat to move.

tooBigBreasts(slave) // Returns if the slave's breasts are too big for her to move.

tooBigBelly(slave) // Returns if the slave's belly is too big for her to move.

tooBigBalls(slave) // Returns if the slave's balls are too big for her to move.

tooBigDick(slave) // Returns if the slave's dick is too big for her to move.

tooBigButt(slave) // Returns if the slave's butt is too big for her to move.

milkAmount(slave) // Returns the slave's expected milk output in liters.

App.Facilities.Farmyard.foodAmount(slave) // Returns the slave's expected food output in kilograms.

cumAmount(slave) // Returns the slave's expected cum output in deciliters.

isVegetable(slave) // Returns if the slave is mindbroken.

overpowerCheck(slave, PC) // Returns an integer that represents the chance of a slave overpowering the player.

canLift(actor1, actor2) // Returns if actor2 is capable of picking up and carrying actor1.

heelLength(slave) // Returns the length of a slave's heels should she be wearing any
```

## Player Functions

```js
onBedRest(actor) // Returns if the actor is on mandatory bedrest or just incapable of leaving their bed. (Mostly for player use.)
```

## Display Functions

```js
properTitle() // Returns the player's proper title. (customTitle, Sir, Ma'am)

properMaster() // Returns the slave's title for Master when WrittenMaster() is inappropriate. (customTitle, Master, Mistress)

WrittenMaster(slave) // Returns a slave's title for the player and sets lisping. Returns $activeSlave if not given an argument.

Spoken(slave, speech) // Returns speech with lisp if slave lisps. Replaces `<<say>>s` with Spoken(slave, "says").

SlaveFullName(slave) // Returns the slave's full name.

PlayerName() // Returns the player's full name.

PCTitle() // Returns the player's full title.

PoliteRudeTitle(slave) // Returns the slave's title for the player they hate.

SlaveTitle(slave) // Returns the slave's descriptive title.

relativeTerm(slave1, slave2) // Returns the term for slave2's relation to slave1. (daughter, mother, etc.)

vaginaDesc(slave) // Returns the description of the slave's vagina.

dickDesc(slave) // Returns the description of the slave's penis.

ballsDesc(slave) // Returns the description of the slave's testicles.

clitDesc(slave) // Returns the description of the slave's clitoris.

anusDesc(slave) // Returns the description of the slave's anus.

boobsDesc(slave) // Returns the size descriptor of the slave's breasts.

boobsDescLong(slave) // Returns the full description of the slave's breasts.

buttDesc(slave) // Returns the description of the slave's bottom.

lipsDesc(slave) // Returns the description of the slave's lips.

bellyDesc(slave, withNoun, pregReference) // Returns the description of the slave's belly.

penetrationTool(slave, includeClit) // Returns the description of the part of body that a slave/PC uses to penetrate, if he can, or a description for his dildo.


relationshipChecks [script] All work as expected with <<if X.rivalryTarget == $slaves[$i].ID>> preceding them.
 rivalryTerm(id) // Returns the rivalry term for the input. e.g. lines 99-100 of brothelReport.
  //<<if $Madam.rivalryTarget == $slaves[$i].ID>>
   //$He forces $his <<print rivalryTerm($Madam)>>, to service all the men in the brothel.
  //Would print 'She forces her growing rival, to service all the men in the brothel.'

 relationshipTerm(id) Returns the long form relationship term for the input. e.g. lines 147-148 of saRules.
  //<<if $slaves[$i].relationship > 0>>
   //$He often asks to save these breaks so $he can spend them with $his <<print relationshipTerm($slaves[$i])>>.
  //Would print '$He often asks to save these breaks so $he can spend them with $his friend.'

 relationshipTermShort(id) Prints the short form of the above. e.g. line 321 of slaveInteract.
  //`"Fuck $him with $his <<print relationshipTermShort($activeSlave)>> <<= SlaveFullName($slaves[_si])>>"`
  //Would print 'Fuck $him with $his BFF <<= SlaveFullName($slaves[_si])>>'

 PCrelationshipTerm(id) Prints the relationship term for the input (relative to the PC) if the relationship is < -1.
  //<<if $slaves[$i].relationship < -1>>
   //$He loves being your <<print PCrelationshipTerm($slaves[$i])>>.
  //Would print '$He loves being your wife.'

 contextualIntro(context, actor, insertComma=false) // Introduces an actor by using any meaningful relationship(s) with an already on-screen actor, and their name.
  //Returns strings like: "your husband John", "his growing rival and mother Alice", or "her best friend and twin sister Carla".
  //If there is no known relationship between them, returns the name alone. If insertComma is true, it will generate "her father, Dave" instead of "her father Dave".
  //Use this function instead of just printing the slave's name when you'd like to let the player to know if two actors are related, even though it's not going to have any mechanical impact on the scene.

bellyAdjective(slave) // Returns a string describing her belly size.

lispReplace(string) // Returns the string with a lisp.

nippleColor(slave) // Returns the slave's nipple color.

UtilJS [script]
 num() // Returns the value thousand separated with ',' if $formatNumbers > 0 else provides the raw value. Returns an integer if $showNumbers == 0, numbers up to a preset max as words if $showNumbers == 1, or only words if $showNumbers == 2.
  //line 138 of src/SpecialForce/Report.tw, '...focused their <<print num($SFUnit.Troops)>> troops'
  //if $formatNumbers > 0 'focused their 1,589 troops' else 'focused their 1589 troops'
  //if $showNumbers == 0 'focused their 1,589 troops', if $showNumbers == 1 'focused their 1,589 troops' (unless the max is set to more than 1,589), else 'focused their one thousand five hundred eighty-nine troops'

 cashFormat() // uses the above function to return the value thousand separated with ',' if $formatNumbers > 0 else provides the raw value. either way prepends ¤ (the fc domination) symbol.
  //line 157 of the previously listed file, '...totaling @@.yellowgreen;<<print cashFormat(_SFIncome)>>@@'
  //if $formatNumbers > 0 'totaling @@.yellowgreen;¤1,500,000@@' else 'totaling @@.yellowgreen;¤1500000@@'

 isFloat() // Checks if value is float.

 isInt() // Checks if value is an integer.

 numberWithCommas() // Currently unused.

 jsRandom() // JS equivalent of SugarCube's random().

 jsRandomMany() // JS equivalent of SugarCube's randomMany().

 jsEither() // This function wants an array // which explains why it works like array.random(). Give it one or you'll face a NaN. JS equivalent of SugarCube's either() and array.random().

 deepCopy() // This function is alternative to clone // usage needed if nested objects present. Slower but result is separate object tree, not with reference to source object.

 hashChoice() // hashes provided input.

 hashSum() // totals provided input and then hashes.

 arr2obj() // Converts an array to an object. e.g. line 250 of :: init Nationalities [silently]
  <<set $nationalities = arr2obj(setup.baseNationalities)>>

 hashPush() //Note really sure where input is being pushed to.

 weightedArray2HashMap()

 def() // Returns whether the input is defined, similar to SugarCube's def.
```

## Core Slave Functions

```js
newSlave(slave) // Adds slave object to main slave array. Do not use without care!

getSlave(ID) // Returns the slave object with the matching ID.

getPronouns(slave) // Returns an object containing a slave's pronouns.

generatePronouns(slave) // Sets slave's pronouns.

fetishChangeChance(slave) // Returns an int between 0,100 as the chance of a slave's fetish shifting to a new one.

SlaveSort(slaveArray) // Sorts the slaveArray array and sets indices.

slaveSortMinor(slaveArray) // Alphabetically sorts the slaveArray array and returns it.

faceIncrease(slave, amount) // Increases slave's .face by amount and returns a comment if it passes a threshold.

assignJob(slave, assignment) // Assigns slave to assignment. Mandatory for assigning to facilities.

removeJob(slave, assignment) // Removes slave from assignment to "rest". Mandatory for removing from facilities.

GenerateNewSlave(sex) // Generates a new slave of sex. Replaces <<include "Generate __ Slave">>

setPregType(actor) // Returns a random ovum count based off actor values and other factors to be set as .pregType.

removeActiveSlave() // Removes $activeSlave from $slaves. Do not use without care!

SetBellySize(slave) // Sets slave's belly size.(pregnancy+inflation+implant)

SoftenBehavioralFlaw(slave) // Replaces the slave's behavioral flaw with the corresponding quirk.

SoftenSexualFlaw(slave) // Replaces the slave's sexual flaw with the corresponding quirk.

//Increases the slave's skill by value or 1. Returns a string if the skill is boosted over a threshold.
SkillIncrease.Oral(slave, value)
SkillIncrease.Vaginal(slave, value)
SkillIncrease.Anal(slave, value)
SkillIncrease.Whore(slave, value)
SkillIncrease.Entertain(slave, value)

surgeryAmp(slave, part) // Clean up variables connected to a specific body part that was amputated. For limbs see below.

// limb can be: "left arm", "right arm", "left leg", "right leg", "all"
removeLimbs(slave, limb) // Remove limb(s) and clean up connected variables.
attachLimbs(slave, limb, id) // Attach limb(s). Expects amputated limbs, will overwrite existing.

//UtilJS [script]
 Height.mean(nationality, race, genes, age) // returns the mean height for the given combination and age in years (>=2).
 Height.mean(nationality, race, genes) // returns the mean adult height for the given combination.
 Height.mean(slave) // returns the mean (expected) height for the given slave.

 Height.random(nationality, race, genes, age) // returns a random height using the skew-normal distribution around the mean height for the given arguments.
 Height.random(nationality, race, genes) // returns a random height for the given combination of an adult, as above.
 Height.random(slave[, options]) // returns a random height for the given slave, as above.

 Height.forAge(height, age, genes) // returns the height adapted to the age and genes.
 Height.forAge(height, slave) // returns the height adapted to the slave's age and genes.

 heightToEitherUnit() // takes an int in centimeters e.g. $activeSlave.height, returns a string in the format of either `200cm (6'7")`, `6'7"`, or `200cm`

 Height.config(configuration) // configures the random height generator globally and returns the current configuration.

 Intelligence.random(options) // returns a random intelligence. If no options are passed, the generated number will be on a normal distribution with mean 0 and standard deviation 45.

 getSlaveDevotionClass(slave) // returns the trust of the target as text. e.g. if ('mindbroken' == slave.fetish) return 'mindbroken';

 getSlaveTrustClass(slave) // returns the trust of the target as text. e.g. if (slave.trust < -95) return 'extremely-terrified';
```

## Health Functions

```js
setHealth(slave, condition, shortDamage, longDamage, illness, tired) // Sets the health (primarily) of new slaves, it helps ensure the desired values do not immediately kill the slave and corrects them if needed

improveCondition(slave, value) // Basic way to improve the health of a slave, this updates the slave's 'condition' value and their overall 'health' value.

healthDamage(slave, value) // Basic way to reduce the health of a slave, this updates the slave's 'shortDamage' value and their overall 'health' value.

healthPenalty(slave) // Checks illness and tired state in order to provide the slave with a productivity penalty.

illness(slave) // A start of the 'end week loop' function to see if a slave has gotten ill this week, or perhaps recovered, got worse, etc.

endWeekHealthDamage // An end of the 'end week loop' function to move shortDamage to the appropriate longer term variables and such.
```

## Sex Functions

```js
knockMeUp(actor, chance, hole, fatherID, displayOverride) // Attempts to impregnate actor.

VCheck.Anal(count) // Increments $activeSlave's anal count by count and attempts to take virginity. Defaults to 1.

VCheck.Vaginal(count) // Increments $activeSlave's vaginal count by count and attempts to take virginity. Defaults to 1.

VCheck.Both(countAnal, countBoth) // Attempts to increment $activeSlave's anal count by countAnal and attempts to increment vaginal by countBoth. Defaults to 1. Attempts to take virginities.

VCheck.Simple(count) // Calls either VaginalVCheck or VCheck.Anal() count times.

VCheck.Partner(countAnal, countBoth) // Attempts to increment $partner's anal count by countAnal and attempts to increment vaginal by countBoth. Defaults to 1. Attempts to take virginities.

SimpleSexAct.Player(slave, count) // Runs a player on slave sex act count times. (randomly chooses hole based off availability.)

SimpleSexAct.Slave(slave, count) // Runs a slave on slave sex act count times. (randomly chooses hole based off availability.)

SimpleSexAct.Slaves(slave1, slave2, count) // Runs a slave2 on slave1 sex act count times. (randomly chooses hole based off availability.)

//UtilJS [script]

 dickToInchString() // takes a dick value e.g. $activeSlave.dick, returns a string in the format 6 inches

 dickToCM() // takes a dick value e.g. $activeSlave.dick, returns an int of the dick length in cm

 ballsToInchString() // takes a ball value e.g. $activeSlave.balls, returns a string in the format 3 inches

 ballsToCM() // takes a ball value e.g. $activeSlave.balls, returns an int of the ball size in cm

 dickToEitherUnit() // takes a dick value e.g. $activeSlave.dick, returns a string in the format of either `20cm (8 inches)`, `8 inches`, or `20cm`

 ballsToEitherUnit() // takes a ball value e.g. $activeSlave.balls, returns a string in the format of either `20cm (8 inches)`, `8 inches`, or `20cm`
```

## Pregnancy Functions

```js
WombInit($slave) // before first pregnancy, at slave creation, of as backward compatibility update.

WombImpregnate($slave, $fetus_count, $fatherID, $initial_age) // should be added after normal impregnation code, with already calculated fetus count. ID of father // can be used in future for processing children from different fathers in one pregnancy. Initial age normally 1 (as .preg normally set to 1), but can be raised if needed. Also should be called at time as broodmother implant add another fetus(es), or if new fetuses added from other sources in future (transplanting maybe?)

WombProgress($slave, $time_to_add_to_fetuses) // after code that update $slave.preg, time to add should be the same.

$isReady = WombBirthReady($slave, $birth_ready_age) // how many children ready to be birthed if their time to be ready is $birth_ready_age (40 is for normal length pregnancy). Return int // count of ready to birth children, or 0 if no ready exists.

$children = WombBirth($slave, $birth_ready_age) // for actual birth. Return array with fetuses objects that birthed (can be used in future) and remove them from womb array of $slave. Should be called at actual birth code in SugarCube. fetuses that not ready remained in womb (array).

WombFlush($slave) // clean womb (array). Can be used at broodmother birthstorm or abortion situations in game. But birthstorm logically should use WombBirth($slave, 35) or so before // some children in this event is live capable, others is not.

TerminatePregnancy($slave) // end a pregnancy early, clean the womb, update the belly size, and automatically set an appropriate postpartum length.

$slave.bellyPreg = WombGetVolume($slave) // return double, with current womb volume in CC // for updating $slave.bellyPreg, or if need to update individual fetuses sizes.

findFather(ID) // searches for the ID given and returns an object or undefined
```

## Release Functions

```js
sexAllowed // returns true if both slaves are allowed to have sex with each other. All non-assignment sex should check here first; use disobedience() to determine if the slave or slaves involved will ignore the rules.

hasPartnerSex // returns true if the slave has a romantic partner, the relationship is sexual, and they are allowed to sex. Unless you are specifically checking the theoretical rule, check this instead of rules.release.partner.

hasFamilySex // returns true if the slave has a close family member, they are allowed to have sex, and the player is OK with seeing the result. Unless you are specifically checking the theoretical rule, check this instead of rules.release.family.

hasNonassignmentSex // returns true if the slave is having some kind of sex while off-duty with a partner other than the PC. This function provides the answer to "can I mention this slave having an off-duty sexual encounter of some kind."

releaseRestricted // returns true if the slave has some kind of rule limiting the off-duty sex they have. If it returns false, the slave is completely free to fuck whomever they want.
```

## Other Functions

```js
//UtilJS [script]
 cmToInchString() // takes an integer e.g. $activeSlave.hLength, returns a string in the format 10 inches

 cmToFootInchString() // takes an integer e.g. $activeSlave.height, returns a string in the format 6'5"

 lengthToEitherUnit() // takes an int in centimeters e.g. $activeSlave.hLength, returns a string in the format of either `30cm (12 inches)`, `12 inches`, or `30cm`

 ValidateFacilityDecoration() // checks the value of the associated variable and it if it infinite i.e. NA the text description is reset back to standard.
  /* decoration should be passed as "facilityDecoration" in quotes. For example, ValidateFacilityDecoration("brothelDecoration"). The quotes are important, do not pass it as a story variable. */

 stretchedAnusSize() // Calculates the minimum anus size to accommodate a particular dick size

 FSChangePorn() // // Currently unused, widget version routes directly through FSChange()

 HackingSkillMultiplier() // outputs a value based off of the PC's hacking skill.

 upgradeMultiplierArcology() // outputs a value based off of the PC's engineering skill.

 upgradeMultiplierMedicine() // outputs a value based off of the PC's medicine skill.

 upgradeMultiplierTrade() // outputs a value based off of the PC's trading skill.

 passageLink() // Creates a HTML element with custom SugarCube attributes which works as a passage link

 SkillIncrease() // Depreciates the SugarCube functions.

 disobedience() // Returns a 0-100 value indicating likelihood of a slave ignoring the rules.

 penetrativeSocialUse() // Returns the percentage (0-100) of the social acceptance of the slaves penetrating citizens.
```
