# Extended family mode (mod) #

In short, extended family mode replaces the old .relation + .relationTarget system with a completely new system capable of handling a limitless number of relatives. Or at least until your game crashes from trying to handle it all. Fully incompatible with the old system and fully functional with ng+.


## The backbone of the system: .father and .mother ##

Everything about a slave's family can be gathered by looking into her mother and father. Beyond the obvious mother-daughter relation, you can check two separate slaves' parents to see if they are related to each other, allowing for sisters, half-sisters, and with a .birthWeek check, twins with little effort.
The following values are used with .mother and .father:
Valid slave IDs (in other words, a value > 0) - Serves as both a target for checks and as a check itself to see if effort should be expended to search for the parent.
0 - Slave has no known parent. A slave with a parent value of 0 is capable of having a parent added via reRelativeRecruiter
MissingParentIDs (in other words, a value < -2) - Serves as a placeholder to preserve sibling relations in the case of a parent being sold or lost. Outside of extreme cases, this value will never be restored to its previous value. $missingParentID starts at -10000 and decrements after application. On NG+, positive values are incremented the same as a normal slave and checked for validity. Should it be invalid, it will be replaced with $missingParentID. Negative values, on the other hand, are decremented by 1200000. Values of -1 and -2 are ignored by the JS, so don't use them. Also -9999 through -9994 are used by hero slaves to preserve their sibling status no matter when they are purchased or obtained during the same game.


## The limiters: .sisters and .daughters ##
Extended family mode is VERY for loop intensive, and as such, has limiters to prevent it from needlessly looping. A value greater than 0 for either of these slave variables signals that slave has a sibling/daughter for various checks. Furthermore, the value of .sisters and .daughters accurately tracks the number of sisters and daughters, particularly for checks that require all of them to be found. You'll learn to hate these, but on the plus side, they can safely be recalculated with no side effects. Nearly entirely handled by <<AddSlave>> and removeActiveSlave, you do not understand how huge of a plus this is.


## The recruiting check: .canRecruit ##

Checked by reRelativeRecruiter to see if a slave is eligible to have relatives added. Hero slaves, special slaves, and often event slaves are ineligible for recruiting. Gets disabled if the slave is called into the recruiting event but fails to qualify for additional relatives due to unaddable slots or too many existing relatives.


## A quick list of the JS that gets things done and various useful JS calls: ##
```js
sameDad(slave1, slave2) // checks if the slaves share the same father and returns true/false.
sameMom(slave1, slave2) // checks if the slaves share the same mother and returns true/false.
sameTParent(slave1, slave2) // an exception catcher that handles such things as "slave1 knocked up slave2 and got impregnated by slave2, their children will be sisters" and returns the sister variable (0 - not related, 1 - twins, 2 - sisters, 3 - half-sisters). (subJS, never call on its own)
areTwins(slave1, slave2) // checks if the slaves are twins and returns true/false.
areSisters(slave1, slave2) // combines all of the above and returns the sister variable (0 - not related, 1 - twins, 2 - sisters, 3 - half-sisters). A widely used check to identify sister relatives. Generally gated by a .sisters check. Recommended to use in a <<switch>> macro instead of calling it for each outcome.

totalRelatives(slave) // returns how many relatives a slave has as an integer. Useful both as a check and for its value. Recommended to use as a check in instances where you want a relative, but don't care what it is.

mutualChildren(slave1, slave2, slaves) // checks the slave array for children shared by the two slave arguments and returns the number of mutual children as an integer. Currently used solely to encourage two slaves into a relationship if they have kids together.
```
The utility JS, courtesy of FCGudder. This JS should only be called if you know it will find something, use your limiters! These will always return the only relative if only one outcome is possible, so technically they can be used creatively. randomAvailable JS should be followed with random JS as a fallback for circumstances where you must find something, but would prefer it to be sensible if possible.
```js
randomRelatedSlave(slave, filterFunction) // returns a random related slave to the slave passed into it. filterFunction is called in the following JS but not needed if you just want a random relative.
randomRelatedAvailableSlave(slave) // returns a random available related slave.
randomSister(slave) // returns a random sister.
randomAvailableSister(slave) // returns a random available sister.
randomTwinSister(slave) // returns a random twin.
randomAvailableTwinSister(slave) // returns a random available twin.
randomDaughter(slave) // returns a random daughter.
randomAvailableDaughter(slave) // returns a random available daughter.
randomParent(slave) // returns a random parent.
randomAvailableParent(slave) // returns a random available parent.
```