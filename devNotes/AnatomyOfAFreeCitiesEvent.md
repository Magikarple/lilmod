<!-- cSpell:ignore intubators, Tmult -->

# Anatomy of a FreeCities event #

## Type ##
There are several types of events. They all happen during the end-of-week calculation, AFTER the normal changes to the slaves and all the economic effects (including you messing with your corporation) happened.

Scheduled events
Nonrandom events
Random nonindividual events
Random individual events

The differences between them are almost non-existent. If they happen, they happen in this order, so you could say it's a kind of event priority ordering. The last two events pre-select a slave (in $eventSlave), with the "nonindividual" events using all your slaves while the "individual" events use only non-Fuckdolls, typically from your penthouse. When writing your event, you're free to ignore this and choose your own slave or create a new one. By convention, scheduled events tend to go back to the "Scheduled Event" passage so that other such events can run; all the others tend to just skip to the next event category. Nothing in code forces you to do it this way for your events.

## Preconditions ##
Most events have some kind of precondition for when they happen. Scheduled events always happen when their preconditions are true. Nonrandom events happen when their preconditions are true and no other nonrandom events get picked first (so writing a too-often-true precondition is a good way to break the game by blocking any further such events). The two other types of events get put in a pool ($events) if they match the precondition, then at most one event gets pulled from the pool per type.

	NonRandomEvent (26-33)
	```
	<<elseif (_effectiveWeek == 14) && $badC != 1>>
	<<set _valid = $slaves.find(function(s) { return s.curatives > 1 || s.inflationType == "curative"; })>>
	<<if def _valid>>
		<<set $badC = 1, $Event = "bad curatives">>
		<<goto "Generic Plot Events">>
	<<else>>
		<<set $badC = 1>>
		<<goto "Nonrandom Event">>
	<</if>>
	```
If it is week fourteen and the player hasn't ready seen the event, a check is then made for slaves that either are on curatives or have their implants filled by curatives. If it was successful then load the "bad curatives" generic event, if unsuccessful set the flag anyway and read from the Nonrandom Event passage.

## Immediate effects ##

Every event can have immediate effects, which happen when the event gets chosen. For most events, those are what should happen if the player ignores the event (by hitting "Continue" or the space bar on the keyboard). Choice effects (see below) can override or roll back those.
```
	reRecruit (4-19)
	<<if Array.isArray($recruit)>>
		<<if $cheatMode == 1>>
			<<set $nextButton = "Back", $nextLink = "Nonrandom Event", $returnTo = "Nonrandom Event">> /* if user just clicks spacebar */
			''A random recruit event would have been selected from the following:''
			<br>
			<<for _i = 0; _i < $recruit.length; _i++>>
				<<print "[[$recruit[_i]|RE recruit][$recruit = $recruit[" + _i + "]]]">>
				<br>
			<</for>>
			<br><br>[[Go Back to Random Nonindividual Event|Random Nonindividual Event][$eventSlave = 0]]
		<<else>>
			<<set $recruit = $recruit.random()>>
			<<goto "RE recruit">>
		<</if>>
	<<else>>
```
If cheat mode is enabled and the user presses the space bar go back to the start.

## Main event text ##
The bulk of the writing will be in the main event text. There are quite a few rules to deal with here.
The PC is referred to in the second person singular ("you"), everyone else in third person.
The PC has no direct speech. All the things "you" say are described, not quoted.
A slave's description can be linked from an event by replacing their name with `<<= App.UI.slaveDescriptionDialog(_Slave)>>`. This allows the player to click on the slave name and view their description, then go back to the event.  This is not a passage transition so you don't need to worry about preserving temporary state.
If you want to introduce a new actor by their relationship to another actor, use `<<= contextualIntro(_firstSlave, _newSlave)>>`.  You can pass a third parameter of "true" if you want the new actor's name to be linked to their description dialog.

`<<SlaveTitle _Slave>>` sets `$desc` (which ends up being a string like "slavegirl", "MILF", "futanari" and so on, depending on slave).

`<<setLocalPronouns _Slave>>` allows you to use the variables $pronoun ("she"/"he"/"it"), $pronounCap ("She"/"He"/"It"), $possessive ("her"/"his"/"its"), $possessiveCap ("Her"/"His"/"Its") and $object ("her"/"him"/"it"). There is NO variable for self-possession ("hers"/"his"/"its") and for "herself", you need to use `<<= $object>>`self.
One more macro initializes several others and is required when you have a slave speak and want to use direct quotes: `<<Enunciate _Slave>>` allows you to use `<<Master>>`, `<<WrittenMaster>>`, `<<says>>` (which turns into "lisps" when that's the case) and the lisping replacers `<<s>>`, `<<ss>>`, `<<S>>`, `<<c>>` and `<<z>>`.

The text should be about large enough to fit on the screen assuming typical monitor sizes. In terms of visible text, about 1000 words are a fine limit to aim for. There's a lot to keep in mind in terms of different appearances and circumstances, so keep your document with slave variables as a reference nearby.

It's fine — and a part of the normal workflow — to first write an event without any variation, then go through it and vary the text here and there.

## Choices ##
You should keep the amount of choices small, but not too small. About three to five is generally a good number. Choices which can't be taken due to the current situation should be displayed as such ("You lack the funds ...") if they are an obvious choice, hidden when they aren't (for example, in event chains you might want to hide choices if the player didn't do something specific or didn't acquire some specific bit of knowledge). Every choice should be a simple sentence of the form "Do something." followed by a short explanation of the obvious effects.

Choices should also be hidden when they run against the game rules, like for example the setting if the player wants to see "extreme" content.
```
	diary (313-325)
	<<if $dairyFeedersUpgrade == 1>>
		The milking machines can hold feeders in slaves' mouths and inject drugs into their bodies, ensuring ideal nutrition and production.
		<br>&nbsp;&nbsp;&nbsp;&nbsp;The feeders are
		<<if $dairyFeedersSetting == 2>>
			''industrial.'' [[Moderate|Dairy][$dairyFeedersSetting = 1, $dairyFeedersSettingChanged = -1]]
		<<elseif $dairyFeedersSetting == 1>>
			''active.'' [[Inactive|Dairy][$dairyFeedersSetting = 0]]<<if ($seeExtreme != 0) && ($dairyRestraintsSetting == 2)>> | [[Industrial|Dairy][$dairyFeedersSetting = 2, $dairyFeedersSettingChanged = 1]]<</if>>
		<<else>>
			''inactive.'' [[Active|Dairy][$dairyFeedersSetting = 1]]
		<</if>>
	<<else>>
		$dairyNameCaps is equipped to feed and clean slaves normally. [[Upgrade the milking machines with intubators|Dairy][cashX(forceNeg(_Tmult1), "capEx"), $dairyFeedersUpgrade = 1]] //Costs ¤_Tmult1 and will increase upkeep costs. cashX is the proper way to handle cash payments. The forceNeg part just means "make sure what comes next is negative if it isn't already, because I want it to cost the player money." "capEx" is the budget category you want this transaction recorded under. You can search through the game files to find similar transactions. //
	<</if>>
```
	In order to enable the industrial feeder option both any of the see extreme content options has be enabled and the restraint's have to be already set to industrial.

Remember that "do nothing" is almost always a choice (it's called "Continue" and can be found on the left side of the screen) so your events don't need this as an extra choice.

## Choice text ##
This should be a short text describing the effects of your choice. Generally shorter than the main text, but all the other things mentioned there apply.
Try to keep surprise buttsex to a minimum.

For example this cut up version of "paternalist encounter" from REFS (lines 106-139).
```
	<span id="result">
		<<link "Alert your drones and keep walking">>
		<</link>>
		<<if $cash >= 2000>>
			<br><<link "Take the poor slave $girl into your custody">>
			<</link>>
		<</if>>
		<br><<link "Publicly confront the citizen">>
		<</link>>
	</span>
	So here you can either, A) "Alert your drones and keep walking", B) if $cash is above 2000 you can take acquire the slave or C) "Publicly confront the citizen".
```
## Choice effect ##
A choice doesn't need to have a specific effect. If your event has an immediate effect, remember to take that into account when you decide on the choice's effects.
```
	<span id="result">
		<<link "Alert your drones and keep walking">>
			<<replace "#result">>
				You inform $assistant.name that you have a slave beater in need of detainment by your security drones, then continue on your way confident in your knowledge that the citizen will soon be in custody.
			<</replace>>
		<</link>>
		<<if $cash >= 2000>>
			<br><<link "Take the poor slave $girl into your custody">>
				<<set $activeSlave.clothes = "no clothing">>
				<<replace "#art-frame">>
					/* 000-250-006 */
					<<if $seeImages == 1>>
						<<if $imageChoice == 1>>
							<div class="imageRef lrgVector"><div class="mask">&nbsp;</div><<= SlaveArt($activeSlave, 2, 0)>></div>
						<<else>>
							<div class="imageRef lrgRender"><div class="mask">&nbsp;</div><<= SlaveArt($activeSlave, 2, 0)>></div>
						<</if>>
					<</if>>
					/* 000-250-006 */
				<</replace>>
				<<replace "#result">>
					Confronting the citizen is simplicity in itself; he would not dare defy you under threat of arrest by your security drones and is unlikely to garner any sympathy from the public for his degradationist behaviors. As such, you are able to take civil ownership over the poor slave $girl and take $him into your care with only minimal compensation to the citizen. As you stride away from $his former owner with the $girl in your arms, $he leans over to plant a chaste kiss of thanks on your cheek.
					<<run cashX(-2000, "slaveTransfer", $activeSlave)>>
					<<include "New Slave Intro">>
				<</replace>>
			<</link>> // Taking custody of the $girl will cost <<print cashFormat(2000)>>. //
		<</if>>
		<br><<link "Publicly confront the citizen">>
			<<replace "#result">>
				Your walk up to the citizen is not accompanied by shaking ground or tumultuous fanfare, yet the citizen looks as if death itself has come before him. You don't hurt him physically, instead chastising him publicly in front of his fellow peers who begin to cheer their agreement. You end your tirade of verbal abuse with a reminder that although the man is a citizen of your arcology, that does not give him the impunity to shirk the law. To make it clear his next offense will be his last, a brace of your security drones hover behind you threateningly. The crowd that gathered @@.green;approve of your rebuke of the citizen.@@
				<<run repX(2500, "event")>>
			<</replace>>
		<</link>>
	</span>
```
So here the results of the choices are, A) nothing, B) reduce cash by 2000 but acquire the slave C) chastise the citizen for plus 500 rep.
