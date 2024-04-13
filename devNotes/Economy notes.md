This document gives an overview of some of the economic mechanics, especially the ones spread across multiple files and functions.

Determining the prices for whoring;

The general principle behind the pricing is one of supply and demand.
Getting our hands on the appropriate information takes some doing due to how the game operates.
Supply and demand needs to be determined before the slave reports are generated, as such it takes place at the top of `slaveAssignmentsReport.tw`.
Finding the demand is relatively straightforward, as it depends on the current arcology population of the various classes as well as visitors.
Finding the supply requires more work as all slaves tasked with sexually serving the populace need to be considered.
The function `slaveJobValues()` takes care of pretty much all of that and can be found in `economyJS.js`.

`slaveJobValues()` takes into account gloryholes/arcade, public sluts/club sluts and street whores/brothel whores separately.
Gloryhole prices aren't too involved, since the 'product' is very homogenous and sluts don't get paid for their services.
Whores on the other hand have variable skills and appearance and may appeal to different classes of citizens.

`SJVBrothel()` takes care of general bonuses/penalties that all jobs have to some degree.
Near the end it determines the `value` of the whore by taking the above bonus, their `beauty()` and their `FResult()` score.
Previously `beauty()` determined the number of sexual acts and `FResult()` the price for them.
With the distinction between classes and the kind of sexual services they demand it became glaring that the best quality whores were used most heavily.
Shouldn't these talented slaves should be MORE exclusive, not less?

The function whoreScore() will be taking care of this oddity and it uses `beauty() * FResult()` as well as applicable modifiers to give us an `income` variable.
This `income` is the basis for the money the slave will be making, but will still be going through some modifications before the actual figure is produced later.
This is the amount of money they used to make and are still expected to make under standard circumstances but now it will be divided between sexual acts and their value in a different fashion.
whoreScore() also takes care of some slave sorting according to supply and demand.
Whenever the demand of the class a slave is trying to service is already met the function will determine if the slave should perhaps service a lower class instead.
It uses effectiveWhoreClass() to find out the maximum possible class a slave can service (or is allowed to service by the player), and demotes a slave for the week as needed.
After the class of citizens the slave will service is set the function takes care of the specific `sexAmount` and `sexQuality` the slave is providing.
The higher the class the more time and attention they demand from their whores. Generally a better slave servicing a higher class will fuck less than a lesser slave servicing a lower class.
The price per service is adjusted to compensate; `income` is the basis, `sexAmount` is partially set by the class serviced and `sexQuality` is `income / sexAmount`.
There is a maximum for the `sexAmount` and `sexQuality` for each class; On the one hand the slave only has so much time in the day and on the other citizens will only pay a particular amount of money.
There is also a minimum for `sexAmount`; a slave assigned to whore is expected to be working hard for the entire assignment, if needed the price will be adjusted to ensure a full work week for every slave.
The maximum amount of money a citizen is willing to pay depends on the rent they need to pay. Less rent means they have more spending money for other things, including whores.
Additionally servicing a higher class also comes with a little bonus in and of itself.

`slaveJobValues()` aggregates all sexual services done by a player's slaves, thus at the end of this function we know the supply provided by the player.
We must also consider the supply by other providers operating within the arcology, but this is relatively straightforward.
Combine the two and we now have the total supply for that week and we can finally compare supply and demand to provide a final price modifier.
Each class of citizens has their own demand and supply statistics and thus their own price modifier as well.
All of this once again takes place within the top part of `slaveAssignmentsReport.tw`.
When demand outstrips supply, a whore will receive a premium for their services, but not proportionally.
Supplying only half of what is demanded does not mean prices are doubled, they'll be increased by less than that.
Likewise when supply outstrips the demand a whore will receive less for their services, but not proportionally.
Doubling the demand reduces the price by significantly more than 50%.
There is however an absolute minimum of 30% of the standard price.

Finally, as each slave has their report generated they will actually be earning `sexAmount * sexQuality * supply/demand modifier`.