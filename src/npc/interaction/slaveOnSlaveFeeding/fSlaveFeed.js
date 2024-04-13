globalThis.FSlaveFeed = function(slave, milkTap) {
	const el = new DocumentFragment();
	let pregDiscovery = 0;
	const {
		His, He,
		his, he, him, himself, wife, girl, hers
	} = getPronouns(slave);
	const {
		His2, He2,
		his2, he2, him2, himself2, wife2
	} = getPronouns(milkTap).appendSuffix("2");
	let incestGive;
	let incestTake;
	let r = [];
	const relative = relativeTerm(slave, milkTap);
	const relative2 = relativeTerm(milkTap, slave);
	if (slave.bellyAccessory !== "a support band") {
		slave.bellyAccessory = "none";
	}

	let artDiv = document.createElement("div"); // named container so we can replace it later
	el.appendChild(artDiv);

	if (slave.inflationType === "milk") {
		slave.milkSource = milkTap.ID;
		if (milkTap.behavioralQuirk === "sinful" || milkTap.sexualQuirk === "perverted" || milkTap.fetish === "incest") { // incest is a planned fetish, don't touch it!
			incestGive = 1;
		}
		if (slave.behavioralQuirk === "sinful" || slave.sexualQuirk === "perverted" || slave.fetish === "incest") {
			incestTake = 1;
		}

		r.push(`The first necessary step is to prepare the milk cow and ${his2} udders.`);

		if (milkTap.fuckdoll > 0) {
			r.push(`This is hilariously easy, as you have complete control over how ${milkTap.slaveName} is posed.`);
		} else if (milkTap.fetish === Fetish.MINDBROKEN) {
			r.push(`This is very easy, as ${milkTap.slaveName} blankly follows your every will. Combined with ${his2} instinct to relieve the pressure in ${his2} breasts, ${he2} is simple to position.`);
		} else if (milkTap.rivalryTarget === slave.ID) {
			r.push(`This is rather easy, as ${milkTap.slaveName} wants to`);
			if (canSee(milkTap)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`${slave.slaveName}'s belly swell painfully as ${he} is force-fed ${his2} milk.`);
			if (milkTap.lactation > 1) {
				r.push(`${He} is practically gushing milk with excitement.`);
			} else {
				r.push(`It takes minimal effort to get ${his2} milk flowing.`);
			}
		} else if (milkTap.relationshipTarget === slave.ID) {
			r.push(`This is rather easy, as ${milkTap.slaveName}`);
			if (milkTap.relationship === 1) {
				r.push(`wants ${his2} friend to try ${his2} milk, fresh from the source.`);
			} else if (milkTap.relationship === 2) {
				r.push(`wants ${his2} best friend to try ${his2} milk, fresh from the source.`);
			} else if (milkTap.relationship === 3) {
				r.push(`can't wait to have some fun with ${his2} friend with benefits.`);
			} else if (milkTap.relationship === 4) {
				r.push(`enjoys spending intimate time with ${his2} lover, and having ${his2} breasts suckled is one of ${his2} favorites.`);
			} else if (milkTap.relationship === 5) {
				r.push(`enjoys spending intimate time with ${his2} ${wife}, and having ${his2} breasts suckled is one of ${his2} favorites.`);
			}
			if (milkTap.lactation > 1) {
				r.push(`${He2} is practically gushing milk with excitement.`);
			} else {
				r.push(`It takes minimal effort to get ${his2} milk flowing.`);
			}
		} else if ((milkTap.fetish === "boobs") && (milkTap.fetishKnown === 1) && (milkTap.fetishStrength > 60) && (milkTap.devotion >= -20)) {
			r.push(`This is very easy, since ${milkTap.slaveName} loves having ${his2} tits played with and can't wait to get suckled.`);
			if (milkTap.lactation > 1) {
				r.push(`${He2} is practically gushing milk with excitement.`);
			} else {
				r.push(`It takes next to no effort to get ${his2} milk flowing.`);
			}
		} else if (slave.mother === milkTap.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} fondly remembers nursing ${his2} ${relativeTerm(milkTap, slave)}.`);
			} else {
				r.push(`This is fairly easy, as ${milkTap.slaveName}'s body remembers nursing ${his2} ${relativeTerm(milkTap, slave)}, even if ${he} is resistant to the idea.`);
			}
			if (milkTap.lactation > 1) {
				r.push(`${He2} is practically gushing milk with nostalgia.`);
			} else {
				r.push(`It takes minimal effort to get ${his2} milk flowing.`);
			}
		} else if (slave.father === milkTap.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} is aroused at the thought of breast feeding the ${girl} ${he2} sired.`);
				if (milkTap.lactation > 1) {
					r.push(`${He2} is practically gushing milk with excitement.`);
				} else {
					r.push(`It takes minimal effort to get ${his2} milk flowing.`);
				}
			} else {
				r.push(`This is extremely tough, as ${milkTap.slaveName} is very uncomfortable breast feeding the ${girl} ${he2} sired.`);
				if (milkTap.lactation > 1) {
					r.push(`${His2} excessive milk production quickly leaves ${him2} eager for release, however.`);
				} else {
					r.push(`It takes some coaxing and kneading to get ${his2} milk flowing and ${him2} eager for relief.`);
				}
			}
		} else if (milkTap.mother === slave.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} is aroused at the lewdness of breast feeding ${his2} own mother.`);
				if (milkTap.lactation > 1) {
					r.push(`${He2} is practically gushing milk with excitement.`);
				} else {
					r.push(`It takes minimal effort to get ${his2} milk flowing.`);
				}
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} finds it awkward to nurse ${his2} own mother.`);
				if (milkTap.lactation > 1) {
					r.push(`${His2} excessive milk production quickly leaves ${him2} eager for release.`);
				} else {
					r.push(`It takes some coaxing and kneading to get ${his2} milk flowing and ${him2} eager for relief.`);
				}
			}
		} else if (milkTap.father === slave.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as having ${his2} father drink ${his2} milk is a taboo ${milkTap.slaveName} can't wait to break.`);
				if (milkTap.lactation > 1) {
					r.push(`${He2} is practically gushing milk with excitement.`);
				} else {
					r.push(`It takes minimal effort to get ${his2} milk flowing.`);
				}
			} else {
				r.push(`This is very tough, as ${milkTap.slaveName} finds it weird to let ${his2} father suckle from ${him2}.`);
				if (milkTap.lactation > 1) {
					r.push(`${His2} excessive milk production quickly leaves ${him2} eager for release, however.`);
				} else {
					r.push(`It takes some coaxing and kneading to get ${his2} milk flowing and ${him2} eager for relief.`);
				}
			}
		} else if (areSisters(slave, milkTap) === 1) {
			if (incestGive) {
				r.push(`This is easy enough, as having ${milkTap.slaveName} enjoys sexually experimenting with ${his2} ${relative2}.`);
			} else {
				r.push(`This is easy enough, as ${milkTap.slaveName} wants ${his2} ${relative2} to try ${his2} milk, but only if ${he} can taste ${hers} too.`);
			}
			if (milkTap.lactation > 1) {
				r.push(`${He2} is practically gushing milk with excitement.`);
			} else {
				r.push(`It takes minimal effort to get ${his2} milk flowing.`);
			}
		} else if (areSisters(slave, milkTap) === 2) {
			if (incestGive) {
				r.push(`This is easy enough, as having ${milkTap.slaveName} enjoys sexually experimenting with ${his2} ${relative2}.`);
				if (milkTap.lactation > 1) {
					r.push(`${He2} is practically gushing milk with excitement.`);
				} else {
					r.push(`It takes minimal effort to get ${his2} milk flowing.`);
				}
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} is uncomfortable getting so intimate with ${his2} ${relativeTerm(milkTap, slave)}.`);
				if (milkTap.lactation > 1) {
					r.push(`${His2} excessive milk production quickly leaves ${him2} eager for release.`);
				} else {
					r.push(`It takes some coaxing and kneading to get ${his2} milk flowing and ${him2} eager for relief.`);
				}
			}
		} else if (areSisters(slave, milkTap) === 3) {
			if (incestGive) {
				r.push(`This is easy enough, as having ${milkTap.slaveName} enjoys sexually experimenting with ${his2} ${relative2}.`);
				if (milkTap.lactation > 1) {
					r.push(`${He2} is practically gushing milk with excitement.`);
				} else {
					r.push(`It takes minimal effort to get ${his2} milk flowing.`);
				}
			} else {
				r.push(`This is slightly difficult, as ${milkTap.slaveName} is uncomfortable getting so intimate with ${his2} ${relativeTerm(milkTap, slave)}.`);
				if (milkTap.lactation > 1) {
					r.push(`${His2} excessive milk production quickly leaves ${him2} eager for release.`);
				} else {
					r.push(`It takes some coaxing and kneading to get ${his2} milk flowing and ${him2} eager for relief.`);
				}
			}
		} else if ((milkTap.lactation > 1) && (milkTap.devotion >= -20)) {
			r.push(`Since ${milkTap.slaveName} produces so much milk, ${he2} eagerly accepts any source of relief ${he2} can manage.`);
		} else if (milkTap.devotion > 50) {
			r.push(`Since ${milkTap.slaveName} is devoted to you, ${he2}'ll allow anyone you want to drink deeply from ${him2}.`);
		} else if (milkTap.devotion > 20) {
			r.push(`Since ${milkTap.slaveName} is obedient, ${he2} appreciates any relief from ${his2} swollen breasts.`);
		} else if (milkTap.devotion >= -20) {
			r.push(`Since ${milkTap.slaveName} does not resist your will, ${he2} should comply reasonably well. If anything, ${he}'ll at least be thankful to be relieved of some pressure.`);
		} else {
			r.push(`Since ${milkTap.slaveName} is unlikely to comply willingly, you simply restrain ${him2} with ${his2} tits exposed and ready to be drunk from.`);
			if (milkTap.lactation > 1) {
				r.push(`You affix nipple clamps to ${his2} ${milkTap.nipples} nipples and step back to watch ${his2} breasts back up with milk. When ${he2} is unclamped, the flow should certainly be strong enough for your desires.`);
			} else {
				r.push(`You make sure to roughly coax ${his2} milk into flowing, all the while reminding ${him2} that ${he2} is nothing more than a cow now.`);
			}
		}

		App.Events.addNode(el, r, "p");
		r = [];

		r.push(`Next, you see to ${slave.slaveName}.`);

		if (isAmputee(slave)) {
			r.push(`You move the limbless ${girl} to ${milkTap.slaveName}'s nipple and strap ${him} to it to prevent it from falling out of ${his} mouth.`);
		} else if (tooBigBreasts(slave)) {
			r.push(`You set ${him} up so that ${his} massive breasts pin ${him} on ${milkTap.slaveName}'s milky nipple.`);
		} else if (milkTap.fuckdoll > 0) {
			r.push(`${He} hesitantly brings ${his} mouth to its milky nipple, uncertain about suckling from a living doll.`);
		} else if (slave.rivalryTarget === milkTap.ID) {
			r.push(`Knowing ${his} relationship with ${milkTap.slaveName}, you feel it best to restrain ${him} and anchor ${him} to ${milkTap.slaveName}'s milky nipple so ${he} has no choice but to drink until you release ${him}.`);
		} else if (slave.relationshipTarget === milkTap.ID) {
			r.push(`This is rather easy, as ${slave.slaveName}`);
			if (slave.relationship === 1) {
				r.push(`licks ${his} lips as ${he} approaches ${his} friend's breasts.`);
			} else if (slave.relationship === 2) {
				r.push(`eagerly licks ${his} lips as ${he} approaches ${his} best friend's breasts.`);
			} else if (slave.relationship === 3) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} friend with benefits' breasts, knowing well how ${his2}`);
				if (canTaste(slave)) {
					r.push(`milk tastes.`);
				} else {
					r.push(`body feels.`);
				}
			} else if (slave.relationship === 4) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} lover's breasts. This won't be the first time ${he}'s suckled from ${him2} like this.`);
			} else if (slave.relationship === 5) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} ${wife2}'s breasts. This won't be the first time ${he}'s suckled from ${him2} like this.`);
			}
		} else if (slave.mother === milkTap.ID) {
			r.push(`${He} draws close to ${his} mother's nipples, trying to remember if ${he} once had a favorite.`);
		} else if (slave.father === milkTap.ID) {
			if (incestTake) {
				r.push(`${He} eagerly wraps ${his} lips around ${his} father's nipple.`);
				if (canAchieveErection(milkTap)) {
					r.push(`${He} shudders with budding lust when ${he} feels the dick that sired ${him} poking at ${his} belly.`);
				}
			} else {
				r.push(`${He} hesitatingly lowers ${himself} to ${his} father's nipple.`);
				if (canAchieveErection(milkTap)) {
					r.push(`${He} nearly backs away when ${he} feels the dick that sired ${him} poking at ${his} belly.`);
				}
			}
		} else if (milkTap.mother === slave.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`happily`);
			} else {
				r.push(`awkwardly`);
			}
			r.push(`brings ${his} lips to ${his} relative's nipple.`);
		} else if (milkTap.father === slave.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly`);
			} else {
				r.push(`awkwardly`);
			}
			r.push(`brings ${his} lips to ${his} relative's nipple${(canAchieveErection(slave)) ? `, ${his} cock steadily hardening at the perversion of suckling from ${his} child` : ``}.`);
		} else if (areSisters(slave, milkTap) === 1) {
			r.push(`${He} readily gets in position to`);
			if (canTaste(slave)) {
				r.push(`taste`);
			} else {
				r.push(`suckle from`);
			}
			r.push(`${his} ${relative}${(slave.lactation > 0) ? `while coaxing ${his} own milk to flow` : ``}.`);
		} else if (areSisters(slave, milkTap) === 2) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`hesitatingly lowers ${himself} to`);
			}
			r.push(`${his} relative's nipple.`);
		} else if (areSisters(slave, milkTap) === 3) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`hesitatingly lowers ${himself} to`);
			}
			r.push(`${his} relative's nipple.`);
		} else if ((slave.fetish === "boobs") && (slave.fetishKnown === 1) && (slave.fetishStrength > 60) && (slave.devotion >= -20)) {
			r.push(`${He} can't wait to`);
			if (hasBothArms(slave)) {
				r.push(`wrap ${his} hands around`);
			} else {
				r.push(`get between`);
			}
			r.push(`${milkTap.slaveName}'s massive milky breasts and eagerly approaches ${his} nipples to suckle.`);
		} else if ((slave.fetish === Fetish.SUBMISSIVE) && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
			r.push(`${He} is accustomed to submitting to you, but as a natural submissive ${he} doesn't have much trouble submitting to ${milkTap.slaveName}'s mothering instead.`);
		} else if (slave.devotion < -20) {
			r.push(`${He} tries to refuse, so you strap ${him} to ${milkTap.slaveName}'s breast, milky ${milkTap.nipples} nipple wedged in ${his} mouth.`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} obeys your orders reluctantly, drawing near ${milkTap.slaveName}'s breasts despite ${his} obvious hesitation to be filled with milk.`);
		} else if (slave.devotion <= 50) {
			r.push(`${He} obeys your orders, drawing near ${milkTap.slaveName}'s breasts despite ${his} slight hesitation at the idea of being filled with milk.`);
		} else {
			r.push(`${He} happily obeys your orders, eagerly wrapping ${his} lips around ${milkTap.slaveName}'s milky ${milkTap.nipples} nipple and suckling enthusiastically.`);
		}

		App.Events.addNode(el, r, "p");
		r = [];

		if (slave.preg > slave.pregData.normalBirth / 13.33 && slave.pregKnown === 0 && slave.inflation > 1) {
			r.push(`It becomes abundantly clear that something is wrong with ${slave.slaveName} as ${he} struggles to down ${his} milky meal. Before ${his} health can be affected further, you pull ${him} into a medical exam. While most of the tests come back normal, one in particular catches your eye; <span class="lime">${he} is pregnant${(slave.preg > slave.pregData.normalBirth / 4) ? `, and surprisingly far along` : ``}.</span> ${He} should be able to still handle at least two liters of milk, however.`);
			deflate(slave);
			slave.pregKnown = 1;
			pregDiscovery = 1;
		} else if (milkTap.fuckdoll > 0) {
			r.push(`Slight moaning emanates from the Fuckdoll as ${slave.slaveName} drinks from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his2} nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his2} nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his2} nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.rivalryTarget === slave.ID) {
			r.push(`${milkTap.slaveName} grins as ${his2} rival is forced to drink until ${his} belly is`);
			if (slave.inflation === 3) {
				r.push(`nearly bursting with milk. ${slave.slaveName} struggles against ${his} bindings until the pressure building in ${him} overwhelms ${him}, causing ${him} to pass out directly into ${milkTap.slaveName}'s cushiony breasts. You quickly remove ${him} from the nipple before ${he} drowns`);
			} else if (slave.inflation === 2) {
				r.push(`is rounded, jiggling and sloshing with milk. You release ${his} bindings, allowing ${him} to flop to the floor.`);
				if (hasAnyArms(slave)) {
					r.push(`${He} gingerly crawls away from ${milkTap.slaveName},`);
					if (hasBothArms(slave)) {
						r.push(`one`);
					} else {
						r.push(`${his}`);
					}
					r.push(`hand cradling ${his} overfull stomach`);
				} else {
					r.push(`${He} rolls onto ${his} side, groaning with discomfort`);
				}
			} else if (slave.inflation === 1) {
				r.push(`bloated with milk. You release ${his} bindings, allowing ${him} to flop to the floor.`);
				if (hasAnyArms(slave)) {
					r.push(`${He} gingerly sits up and begins massaging ${his} full stomach`);
				} else {
					r.push(`${He} rolls onto ${his} back, hiccupping pathetically`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.relationshipTarget === slave.ID) {
			if (milkTap.relationship === 1) {
				r.push(`${milkTap.slaveName} sighs contently as ${his2} friend drinks deeply from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 2) {
				r.push(`${milkTap.slaveName} sighs contently as ${his2} best friend drinks deeply from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} best friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} best friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} best friend's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 3) {
				r.push(`${milkTap.slaveName} moans lewdly as ${his2} friend with benefits drinks deeply from ${his2} breasts, savoring it despite commonly nursing ${slave.slaveName} during their lovemaking. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} friend with benefits' nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} friend with benefits' nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} friend with benefits' nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 4) {
				r.push(`${milkTap.slaveName} moans lewdly as ${his2} lover drinks deeply from ${his2} breasts, savoring it despite commonly nursing ${slave.slaveName} during their lovemaking. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} lover's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} lover's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} lover's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 5) {
				r.push(`${milkTap.slaveName} moans lewdly as ${his2} wife drinks deeply from ${his2} breasts, savoring it despite commonly nursing ${slave.slaveName} during their lovemaking. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${wife2}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${wife2}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${wife2}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			}
		} else if (slave.mother === milkTap.ID) {
			r.push(`${milkTap.slaveName} sighs contently as ${his2} little ${girl} once again suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} mother's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} mother's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} mother's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (slave.father === milkTap.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relativeTerm(milkTap, slave)} suckles from ${his2} breasts${(canAchieveErection(milkTap)) ? `, ${his2} dick throbbing with lust` : ``}. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} father's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} father's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} father's nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			if (canAchieveErection(milkTap)) {
				r.push(r.pop() + `.`);
				if (incestTake) {
					r.push(`The way ${he} is wiggling ${his} hips suggests ${he} isn't finished with ${his} daddy just yet, and ${his} father's moaning confirms ${he} is teasing ${him2} with ${his} rear. ${He} giggles as the horny cow unloads on ${his} backside`);
				} else {
					r.push(`${He} doesn't stay put for long, as a strong moan and a blast of cum across ${his} rear from the horny cow startles ${him} from ${his} rest`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.mother === slave.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${he2} enjoys some role reversal as ${his2} mother suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.father === slave.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} father suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 1) {
			r.push(`${milkTap.slaveName} sighs contently as ${his2} ${relativeTerm(milkTap, slave)} suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 2) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2}`);
			if (milkTap.actualAge >= slave.actualAge) {
				r.push(`little`);
			} else {
				r.push(`big`);
			}
			r.push(`${relativeTerm(milkTap, slave)} suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 3) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relative2} suckles from ${his2} breasts. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);
			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with milk. ${He} pops off ${his} ${relative}'s nipple and settles into ${his2} breasts for a short rest while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if ((slave.devotion < -20) && (milkTap.devotion < -20)) {
			r.push(`Since you have two restrained and unwilling slaves, the work of milking ${milkTap.slaveName}'s breasts falls to you. That doesn't mean you can't have fun doing it though.`);
			if (canDoVaginal(milkTap)) {
				r.push(`Moving behind the restrained cow while`);
				if (V.PC.dick === 0) {
					r.push(`donning a strap-on,`);
				} else {
					r.push(`teasing your erect cock,`);
				}
				r.push(`you push ${him2} forward to allow you to insert yourself into ${his2}`);
				if (milkTap.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy. Getting comfortable, you reach around to ${his2} immense mammaries and begin kneading them in time to your thrusts. After some time, and several orgasms in both yourself and the sobbing cow, is ${slave.slaveName} bloated with enough milk.`);
				actX(milkTap, "vaginal");
				if (canImpreg(milkTap, V.PC)) {
					r.push(knockMeUp(milkTap, 40, 0, -1));
				}
			} else if (canDoAnal(milkTap)) {
				r.push(`Moving behind the restrained cow while`);
				if (V.PC.dick === 0) {
					r.push(`donning a strap-on,`);
				} else {
					r.push(`teasing your erect cock,`);
				}
				r.push(`you push ${him2} forward to allow you to insert yourself into ${his2}`);
				if (milkTap.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`rear. Getting comfortable, you reach around to ${his2} immense mammaries and begin kneading them in time to your thrusts. After some time, and several orgasms in both yourself and the sobbing cow, is ${slave.slaveName} bloated with enough milk.`);
				actX(milkTap, "anal");
				if (canImpreg(milkTap, V.PC)) {
					r.push(knockMeUp(milkTap, 40, 1, -1));
				}
			} else if (V.PC.dick !== 0 && milkTap.butt > 4) {
				r.push(`Moving behind the restrained cow while teasing your erect cock, you push ${him2} forward to allow you to press your dick between ${his2} huge butt cheeks. Getting comfortable, you reach around to ${his2} immense mammaries and begin kneading them in time to your thrusts. After some time, and several orgasms across the back of the sobbing cow, is ${slave.slaveName} bloated with enough milk.`);
			} else if (V.PC.dick !== 0 && !hasAnyLegs(milkTap)) {
				r.push(`Moving behind the restrained cow while teasing your erect cock, you find a severe lack of places to stick your dick. Sighing, you hoist ${his2} belted ass into the air so you may thrust between ${his2}`);
				if (milkTap.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs. Getting comfortable, you reach around to ${his2} immense mammaries and begin kneading them in time to your thrusts. After some time, and several loads blown ${(milkTap.belly >= 1500) ? `onto the rounded belly of the sobbing cow` : ``}, is ${slave.slaveName} bloated with enough milk.`);
			} else {
				r.push(`With a lack of holes to penetrate, you simply wrap your arms around ${milkTap.slaveName} and begin fondling and milking ${his2} luscious breasts. After some time, ${slave.slaveName} is finally bloated to your desired size.`);
			}
			r.push(`Standing and releasing ${him} from ${milkTap.slaveName}, gives you the opportunity to finally see ${slave.slaveName}'s`);

			if (slave.inflation === 3) {
				r.push(`taut, round belly.`);
			} else if (slave.inflation === 2) {
				r.push(`rounded, jiggling belly.`);
			} else {
				r.push(`distended, sloshing belly.`);
			}
			r.push(`You just wish you could have enjoyed it a bit more, though forcing milk into the squirming slave was quite enjoyable. Both slaves <span class="mediumorchid">resent</span> what you made them do and <span class="gold">fear you</span> as a result.`);
			slave.devotion -= 5;
			slave.trust -= 5;
			milkTap.devotion -= 5;
			milkTap.trust -= 5;
			if (canDoVaginal(milkTap) && (milkTap.vagina === 0)) {
				r.push(`${milkTap.slaveName} <span class="mediumorchid">especially,</span> having just <span class="lime">lost ${his} virginity</span> to your inconvenience.`);
				milkTap.devotion -= 5;
				milkTap.vagina = 1;
			} else if (canDoAnal(milkTap) && (milkTap.anus === 0)) {
				r.push(`${milkTap.slaveName} <span class="mediumorchid">especially,</span> having just <span class="lime">lost ${his} anal virginity</span> to your inconvenience.`);
				milkTap.devotion -= 5;
				milkTap.anus = 1;
			}
		} else if (milkTap.devotion < -20) {
			r.push(`Since your cow is restrained, you order the more obedient ${slave.slaveName} to enjoy ${himself} with ${milkTap.slaveName}'s breasts. As ${he} suckles, you can't help but notice the tantalizing way ${he} wiggles ${his} rear.`);
			if (canDoVaginal(slave)) {
				if (V.PC.dick === 0) {
					r.push(`Donning a strap-on,`);
				} else {
					r.push(`Teasing your stiffening cock,`);
				}
				r.push(`you push ${him} deeper into the protesting ${milkTap.slaveName} and mount ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy, doggy style. You wrap your arms around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk.`);
				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
				}
				r.push(`Only once your weight is removed from the squirming milk balloon is ${he} allowed to pull ${himself} off of the <span class="mediumorchid">resentful ${milkTap.slaveName}</span> and catch ${his} breath.`);
				if (slave.vagina === 0) {
					r.push(`${His} senses were so overwhelmed, ${he} didn't even notice you <span class="lime">broke in ${his} vagina.</span>`);
				}
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				if (V.PC.dick === 0) {
					r.push(`Donning a strap-on,`);
				} else {
					r.push(`Teasing your stiffening cock,`);
				}
				r.push(`you push ${him} deeper into the protesting ${milkTap.slaveName} and mount ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`asshole, doggy style. You wrap your arms around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
				}
				r.push(`Only once your weight is removed from the squirming milk balloon is ${he} allowed to pull ${himself} off of the <span class="mediumorchid">resentful ${milkTap.slaveName}</span> and catch ${his} breath.`);
				if (slave.anus === 0) {
					r.push(`${His} senses were so overwhelmed, ${he} didn't even notice you <span class="lime">broke in ${his} anus.</span>`);
				}
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`Teasing your stiffening cock, you push ${him} deeper into the protesting ${milkTap.slaveName} and squeeze your dick between ${his} huge butt cheeks. You wrap your arms around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk as you fuck ${his} butt.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
				}
				r.push(`Only once your weight is removed from the squirming milk balloon is ${he} allowed to pull ${himself} off of the <span class="mediumorchid">resentful ${milkTap.slaveName}</span> and catch ${his} breath.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`Teasing your stiffening cock, you find a severe lack of places to stick your dick. Sighing, you hoist ${his} belted ass into the air, push ${him} deeper into the protesting ${milkTap.slaveName} and squeeze your dick between ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs. You wrap your arms around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk as you fuck ${his} butt.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
				}
				r.push(`Only once your weight is removed from the squirming milk balloon is ${he} allowed to pull ${himself} off of the <span class="mediumorchid">resentful ${milkTap.slaveName}</span> and catch ${his} breath.`);
			} else {
				r.push(`With a lack of holes to penetrate, you simply wrap your arms around ${him} and push ${him} deeper into the protesting ${milkTap.slaveName}. You bring a hand to ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and lead the other to your`);

				if (V.PC.dick === 0) {
					r.push(`soaked pussy.`);
				} else {
					r.push(`stiff prick.`);
				}
				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
				}
				r.push(`Only once your weight is removed from the squirming milk balloon is ${he} allowed to pull ${himself} off of the <span class="mediumorchid">resentful ${milkTap.slaveName}</span> and catch ${his} breath.`);
			}
			r.push(`${He} gives the shaking ${milkTap.slaveName} an apologetic look before taking a seat. The poor cow isn't used to this yet and <span class="gold">is terrified of your willingness</span> to take what you want from your slaves.`);
			milkTap.devotion -= 5;
			milkTap.trust -= 5;
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				slave.anus = 1;
			}
		} else if ((milkTap.fetish === "boobs") && (milkTap.fetishStrength > 60) && (milkTap.devotion > 20) && (slave.devotion < -20)) {
			if (canDoVaginal(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} is forced to drink from ${milkTap.slaveName}'s breasts. With every thrust into the squirming slave, you push ${him} into the moaning ${milkTap.slaveName}, forcing even more milk down ${his} throat. You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he} loves having it groped.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers`);
				}
				r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} well milked breasts, you know ${he2}'ll come out of it and be eagerly begging you for another milking soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen stomach <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
				if (slave.anus === 0) {
					r.push(`${He} <span class="mediumorchid">hates you so much more</span> that you <span class="lime">broke in ${his} virgin vagina.</span>`);
				}
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} is forced to drink from ${milkTap.slaveName}'s breasts. With every thrust into the squirming slave, you push ${him} into the moaning ${milkTap.slaveName}, forcing even more milk down ${his} throat. You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he} loves having it groped.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers`);
				}
				r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} well milked breasts, you know ${he2}'ll come out of it and be eagerly begging you for another milking soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen stomach <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
				if (slave.anus === 0) {
					r.push(`${He} <span class="mediumorchid">hates you so much more</span> that you <span class="lime">broke in ${his} virgin anus.</span>`);
				}
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You position the restrained ${slave.slaveName} so that you can rub your dick between ${his} huge butt cheeks while ${he} is forced to drink from ${milkTap.slaveName}'s breasts. With every thrust against the squirming slave, you push ${him} into the moaning ${milkTap.slaveName}, forcing even more milk down ${his} throat. You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he} loves having it groped.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers`);
				}
				r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} well milked breasts, you know ${he}'ll come out of it and be eagerly begging you for another milking soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen stomach, and cum soaked back, <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs, for a lack of anything better, while ${he} is forced to drink from ${milkTap.slaveName}'s breasts. With every thrust against the squirming slave, you push ${him} into the moaning ${milkTap.slaveName}, forcing even more milk down ${his} throat. You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he} loves having it groped.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers`);
				}
				r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} well milked breasts, you know ${he2}'ll come out of it and be eagerly begging you for another milking soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen, cum-covered stomach <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
			} else {
				r.push(`You position the restrained ${slave.slaveName} so that you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} is forced to drink from ${milkTap.slaveName}'s breasts, since ${he} lacks any better way to please you while you lavish attention on your eager cow. With every thrust against the squirming slave, you push ${him} into the moaning ${milkTap.slaveName}, forcing even more milk down ${his} throat. You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he} loves having it groped.`);

				if (slave.inflation === 3) {
					r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
				} else if (slave.inflation === 2) {
					r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers`);
				} else {
					r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers`);
				}
				r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} well milked breasts, you know ${he2}'ll come out of it and be eagerly begging you for another milking soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen stomach <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
			}
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				slave.vagina = 1;
				slave.devotion -= 5;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				slave.anus = 1;
				slave.devotion -= 5;
			}
			slave.devotion -= 5;
			slave.trust -= 5;
			milkTap.devotion += 4;
		} else if ((slave.devotion <= 20) || (milkTap.devotion <= 20)) {
			if (canDoVaginal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} drinks from ${milkTap.slaveName}'s breasts. With every thrust into the squirming slave, you push ${him} into the docile ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} drinks from ${milkTap.slaveName}'s breasts. With every thrust into the squirming slave, you push ${him} into the docile ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can rub your dick between ${his} huge butt cheeks while ${he} drinks from ${milkTap.slaveName}'s breasts. With every thrust against the squirming slave, you push ${him} into the docile ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs, for a lack of anything better, while ${he} drinks from ${milkTap.slaveName}'s breasts. With every thrust against the squirming slave, you push ${him} into the docile ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else {
				r.push(`You order ${slave.slaveName} to position ${himself} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} drinks from ${milkTap.slaveName}'s breasts, since ${he} lacks any better way to please you while you lavish praise on your obedient cow. With every thrust against the squirming slave, you push ${him} into the docile ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he2} loves having it groped.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting. Neither slave seems to have enjoyed it, instead opting to just get it over with, though ${milkTap.slaveName} makes sure to thank ${slave.slaveName} for lightening ${his2} milky breasts.`);
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				slave.anus = 1;
			}
		} else if ((slave.devotion <= 50) || (milkTap.devotion <= 50)) {
			if (canDoVaginal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} drinks from ${milkTap.slaveName}'s breasts. ${He} submissively obeys. With every thrust into the moaning slave, you push ${him} into the smiling ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} drinks from ${milkTap.slaveName}'s breasts. ${He} submissively obeys. With every thrust into the moaning slave, you push ${him} into the smiling ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can rub your dick between ${his} huge butt cheeks while ${he} drinks from ${milkTap.slaveName}'s breasts. ${He} submissively obeys. With every thrust against the chaste slave, you push ${him} into the smiling ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs, for a lack of anything better, while ${he} drinks from ${milkTap.slaveName}'s breasts. ${He} submissively obeys. With every thrust against the chaste slave, you push ${him} into the smiling ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else {
				r.push(`You order ${slave.slaveName} to position ${himself} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} drinks from ${milkTap.slaveName}'s breasts, since ${he} lacks any better way to please you while you lavish attention on your happy cow. With every thrust against the squirming slave, you push ${him} into the smiling ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple, knowing just how much ${he2} gets backed up.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting. Both slaves enjoyed their union, though ${milkTap.slaveName} even more so thanks to ${his2} lighter breasts.`);
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`feels <span class="hotpink">closer to you</span> after losing ${his} virginity to you.`);
				slave.vagina = 1;
				slave.devotion += 2;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`feels <span class="hotpink">closer to you</span> after losing ${his} anal virginity to you.`);
				slave.anus = 1;
				slave.devotion += 2;
			}
		} else {
			r.push(`${slave.slaveName}`);
			r.push(`eagerly lifts ${his} ass and jiggles it seductively as ${he} suckles from the moaning cow.`);
			if (canDoVaginal(slave)) {
				r.push(`You know that signal, so you hilt yourself in`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`and begin fucking ${him} against ${milkTap.slaveName}'s tits. With every thrust into the moaning slave, you push ${him} into the grinning ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You know that signal, so you hilt yourself in`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`and begin fucking ${him} against ${milkTap.slaveName}'s tits. With every thrust into the moaning slave, you push ${him} into the grinning ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You know that signal, but ${he} isn't allowed to get penetrated, so you settle for sticking your dick between ${his} huge butt cheeks and fucking ${him} against ${milkTap.slaveName}'s tits. With every thrust against the moaning slave, you push ${him} into the grinning ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You know that signal, but ${he} isn't allowed to get penetrated, so you settle for sticking your dick between ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs, for a lack of anything better, and fuck ${him} against ${milkTap.slaveName}'s tits. With every thrust against the moaning slave, you push ${him} into the grinning ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			} else {
				r.push(`You know that signal, but ${he} isn't allowed to get fucked, so you reposition ${him} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} drinks from ${milkTap.slaveName}'s tits. With every thrust against the moaning slave, you push ${him} into the grinning ${milkTap.slaveName}, forcing even more milk down ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with milk and place your other hand to ${milkTap.slaveName}'s free nipple to prevent ${him2} from feeling left out.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with milk, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with milk, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with milk under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting from ${his} meal`);
			if (canDoVaginal(slave) || canDoAnal(slave)) {
				r.push(`and from the pleasure you drove into ${him}`);
			}
			r.push(r.pop() + `.`);
			r.push(`Both slaves <span class="hotpink">loved the attention,</span> though ${milkTap.slaveName} even more so thanks to ${his2} lighter breasts.`);
			slave.devotion += 4;
			milkTap.devotion += 4;
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`got off quite strongly from the growing pressure within ${him}, <span class="hotpink">cementing</span> ${his} <span class="lime">first fucking</span> as something special.`);
				slave.devotion += 4;
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`got off quite strongly from the growing pressure within ${him}, <span class="hotpink">cementing</span> ${his} <span class="lime">first anal</span> as something special.`);
				slave.devotion += 4;
				slave.anus = 1;
			}
		}

		if (milkTap.lactation > 0) {
			milkTap.lactationDuration = 2;
			milkTap.boobs -= milkTap.boobsMilk;
			milkTap.boobsMilk = 0;
		}
	} else { /* cum variant */
		slave.cumSource = milkTap.ID;
		if (milkTap.behavioralQuirk === "sinful" || milkTap.sexualQuirk === "perverted" || milkTap.fetish === "incest") { /* incest is a planned fetish, don't touch it! */
			incestGive = 1;
		}
		if (slave.behavioralQuirk === "sinful" || slave.sexualQuirk === "perverted" || slave.fetish === "incest") {
			incestTake = 1;
		}

		r.push(`The first necessary step is to prepare the cum slave and ${his} cock and balls.`);

		if (milkTap.fuckdoll > 0) {
			r.push(`This is hilariously easy, as you have complete control over how ${milkTap.slaveName} is posed.`);
		} else if (milkTap.fetish === Fetish.MINDBROKEN) {
			r.push(`This is very easy, as ${milkTap.slaveName} blankly follows your every will. Combined with ${his2} instinct to relieve the building pressure in ${his2} loins, ${he2} is simple to position.`);
		} else if (milkTap.rivalryTarget === slave.ID) {
			r.push(`This is rather easy, as ${milkTap.slaveName} wants to`);
			if (canSee(milkTap)) {
				r.push(`see`);
			} else {
				r.push(`feel`);
			}
			r.push(`${slave.slaveName}'s belly swell painfully as ${he} is forced to suck down ${his2} huge loads.`);
		} else if (milkTap.relationshipTarget === slave.ID) {
			r.push(`This is rather easy, as ${milkTap.slaveName}`);
			if (milkTap.relationship === 1) {
				r.push(`always wanted to get ${his2} dick sucked by ${his2} friend.`);
			} else if (milkTap.relationship === 2) {
				r.push(`always wanted to get ${his2} dick sucked by ${his2} best friend.`);
			} else if (milkTap.relationship === 3) {
				r.push(`enjoys getting ${his2} dick sucked by ${his2} friend with benefits.`);
			} else if (milkTap.relationship === 4) {
				r.push(`loves getting ${his2} dick sucked by ${his2} lover, something that commonly happens due to ${his2} overproduction.`);
			} else if (milkTap.relationship === 5) {
				r.push(`loves getting ${his2} dick sucked by ${his2} ${wife}, something that commonly happens due to ${his2} overproduction.`);
			}
		} else if (slave.mother === milkTap.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} savors the thought of having ${his2} dick sucked by ${his2} ${relative2}.`);
			} else {
				r.push(`This is tough, as ${milkTap.slaveName} is very uncomfortable having ${his2} dick sucked by ${his2} ${relative2}, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if (slave.father === milkTap.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} cherishes the sheer lewdness of having ${his2} dick sucked by ${his2} ${relative2}.`);
			} else {
				r.push(`This is tough, as ${milkTap.slaveName} is rather uncomfortable having ${his2} dick sucked by ${his2} ${relative2}, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if (milkTap.mother === slave.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} savors the thought of having ${his2} dick sucked by ${his2} own mother.`);
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} is very uncomfortable having ${his2} dick sucked by ${his2} own mother, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if (milkTap.father === slave.ID) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} cherishes the sheer lewdness of having ${his2} dick sucked by ${his2} own father.`);
			} else {
				r.push(`This is tough, as ${milkTap.slaveName} is very uncomfortable having ${his2} dick sucked by ${his2} own father, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if (areSisters(slave, milkTap) === 1) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} enjoys the notion of twincest quite a lot.`);
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} is uncomfortable getting so intimate with ${his2}`);
				if (milkTap.energy >= 95) {
					r.push(`${relative2}, though as a nymphomaniac, the thought of someone who looks so much like ${him2} is a major turn on.`);
				} else {
					r.push(`${relative2}, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
				}
			}
		} else if (areSisters(slave, milkTap) === 2) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} is quite eager to get intimate with ${his2} ${relative2}.`);
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} is uncomfortable getting so intimate with ${his2} ${relative2}, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if (areSisters(slave, milkTap) === 3) {
			if (incestGive) {
				r.push(`This is easy enough, as ${milkTap.slaveName} is quite eager to get intimate with ${his2} ${relative2}.`);
			} else {
				r.push(`This is moderately tough, as ${milkTap.slaveName} is uncomfortable getting so intimate with ${his2} ${relative2}, but ${he2} can't really complain about getting ${his2} overfilled nuts drained.`);
			}
		} else if ((milkTap.fetish === "cumslut") && (milkTap.fetishKnown === 1) && (milkTap.fetishStrength > 60) && (milkTap.devotion >= -20)) {
			r.push(`This is very easy, since ${milkTap.slaveName} loves blasting loads whenever ${he2} can, and it is just a bonus to ${him2} that ${he2} gets a blowjob in the process.`);
		} else if (milkTap.energy > 95) {
			r.push(`This is very easy, since ${milkTap.slaveName} is so sexually charged ${he2} is practically overflowing at the thought of getting ${his2} dick sucked.`);
		} else if (milkTap.devotion > 50) {
			r.push(`Since ${milkTap.slaveName} is devoted to you, ${he2}'d allow anyone you want to suck ${his2} dick.`);
		} else if (milkTap.devotion > 20) {
			r.push(`Since ${milkTap.slaveName} is obedient, ${he2} appreciates being allowed to have ${his2} dick sucked.`);
		} else if (milkTap.devotion >= -20) {
			r.push(`Since ${milkTap.slaveName} does not resist your will, ${he2} should comply reasonably well. If anything, ${he2}'ll at least be thankful for the pleasure and relief.`);
		} else {
			r.push(`Since ${milkTap.slaveName} is unlikely to comply willingly, you simply restrain ${him2} with ${his2} dick exposed and ready to be sucked. To get ${him2} going,`);
			if (canDoAnal(milkTap) && milkTap.prostate > 0) {
				r.push(`you circle around behind ${him2},`);
				if (V.PC.dick === 0) {
					r.push(`while donning a strap-on,`);
				} else {
					r.push(`teasing your erect cock,`);
				}
				r.push(`and force ${him2} forward to allow you to insert yourself into ${his}`);
				if (milkTap.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`rear. After a quick and brutal bit of prostrate stimulation, you finish and remove yourself from ${him2}. Before ${he2} has a chance to reclench ${his2} anus, you ram an electroshock stimulator in your stead.`);
			} else {
				r.push(`you attach a number of vibrators to ${his2} oversized balls and turn them to full power, stirring up ${his2} overzealous cum factories.`);
			}
			r.push(`${He2} cries in <span class="mediumorchid">disgust</span> and <span class="gold">fear</span> as ${his2} penis twitches from the sensation, begging for unwelcome release.`);
			milkTap.devotion -= 5;
			milkTap.trust -= 5;
			if (canDoAnal(milkTap)) {
				if (canImpreg(milkTap, V.PC)) {
					r.push(knockMeUp(milkTap, 40, 1, -1));
				}
				if (milkTap.anus === 0) {
					r.push(`${milkTap.slaveName} feels <span class="mediumorchid">especially violated</span> having just <span class="lime">lost ${his} anal virginity</span> in such a manner.`);
					milkTap.devotion -= 5;
					milkTap.anus = 1;
				}
				actX(milkTap, "anal");
			}
		}

		App.Events.addNode(el, r, "p");
		r = [];

		r.push(`Next, you see to ${slave.slaveName}.`);

		if (isAmputee(slave)) {
			r.push(`You tip the limbless ${girl} face-first into ${milkTap.slaveName}'s dick.`);
		} else if (tooBigBreasts(slave)) {
			r.push(`You set ${him} up so that ${his} massive breasts pin ${him}, face-first, to ${milkTap.slaveName}'s dick.`);
		} else if (milkTap.fuckdoll > 0) {
			r.push(`${He} hesitantly brings ${his} mouth to its precum tipped dick, uncertain about sucking off a doll.`);
		} else if (slave.rivalryTarget === milkTap.ID) {
			r.push(`Knowing ${his} relationship with ${milkTap.slaveName}, you feel it best to restrain ${him} and anchor ${him} to ${milkTap.slaveName}'s eager cock so ${he} has no choice but to suck ${his} way to release.`);
		} else if (slave.relationshipTarget === milkTap.ID) {
			r.push(`This is rather easy, as ${slave.slaveName}`);
			if (slave.relationship === 1) {
				r.push(`licks ${his} lips as ${he} approaches ${his} friend's cock.`);
			} else if (slave.relationship === 2) {
				r.push(`eagerly licks ${his} lips as ${he} approaches ${his} best friend's cock.`);
			} else if (slave.relationship === 3) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} friend with benefits' cock, knowing well how ${his2}`);
				if (canTaste(slave)) {
					r.push(`cum tastes.`);
				} else {
					r.push(`body feels.`);
				}
			} else if (slave.relationship === 4) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} lover's cock. This won't be the first time ${he}'s sucked ${his2} dick and swallowed ${his2} huge loads.`);
			} else if (slave.relationship === 5) {
				r.push(`licks ${his} lips and smiles as ${he} approaches ${his} ${wife2}'s cock. This won't be the first time ${he}'s sucked ${his2} dick and swallowed ${his2} huge loads.`);
			}
		} else if (slave.mother === milkTap.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`awkwardly brings ${his} lips to`);
			}
			r.push(`${his} mother's cock.`);
		} else if (slave.father === milkTap.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`awkwardly brings ${his} lips to`);
			}
			r.push(`daddy's cock.`);
		} else if (milkTap.mother === slave.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`awkwardly brings ${his} lips to`);
			}
			r.push(`${his} ${relative}'s cock.`);
		} else if (milkTap.father === slave.ID) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`awkwardly brings ${his} lips to`);
			}
			r.push(`${his} ${relative}'s cock.`);
		} else if (areSisters(slave, milkTap) === 1) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`readily`);
			}
			r.push(`gets in position to suck ${his} ${relative}'s dick.`);
		} else if (areSisters(slave, milkTap) === 2) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`hesitatingly lowers ${himself} to`);
			}
			r.push(`${his} ${relative}'s cock.`);
		} else if (areSisters(slave, milkTap) === 3) {
			r.push(`${He}`);
			if (incestTake) {
				r.push(`eagerly wraps ${his} lips around`);
			} else {
				r.push(`hesitatingly lowers ${himself} to`);
			}
			r.push(`${his} ${relative}'s cock.`);
		} else if ((slave.fetish === "cumslut") && (slave.fetishKnown === 1) && (slave.fetishStrength > 60) && (slave.devotion >= -20)) {
			r.push(`${He} can't wait to wrap ${his} lips around ${milkTap.slaveName}'s cock and balloon with cum, so ${he} eagerly approaches the waiting shaft.`);
		} else if ((slave.fetish === Fetish.SUBMISSIVE) && (slave.fetishStrength > 60) && (slave.fetishKnown === 1)) {
			r.push(`${He} is accustomed to submitting to you, but as a natural submissive ${he} doesn't have much trouble submitting to ${milkTap.slaveName} instead.`);
		} else if (slave.devotion < -20) {
			r.push(`${He} tries to refuse, so you tie ${him} up, force a mouth spreader into ${him}, and position ${him} for ${milkTap.slaveName} to thrust into.`);
		} else if (slave.devotion <= 20) {
			r.push(`${He} obeys your orders reluctantly, drawing near ${milkTap.slaveName}'s cock despite ${his} obvious hesitation to amount of cum that will be gushing into ${him}.`);
		} else if (slave.devotion <= 50) {
			r.push(`${He} obeys your orders, drawing near ${milkTap.slaveName}'s cock despite ${his} slight hesitation at the idea of being filled with cum.`);
		} else {
			r.push(`${He} happily obeys your orders, eagerly`);
			if (canTaste(slave)) {
				r.push(`tasting`);
			} else {
				r.push(`licking up`);
			}
			r.push(`${milkTap.slaveName}'s beading precum before wrapping ${his} lips around ${milkTap.slaveName}'s cock and sucking enthusiastically.`);
		}

		App.Events.addNode(el, r, "p");
		r = [];

		if (slave.preg > 3 && slave.pregKnown === 0 && slave.inflation > 1) {
			r.push(`It becomes abundantly clear that something is wrong with ${slave.slaveName} as ${he} struggles to down ${his} thick meal. Before ${his} health can be affected further, you pull ${him} into a medical exam. While most of the tests come back normal, one in particular catches your eye; <span class="lime">${he} is pregnant${(slave.preg > 10) ? ` and surprisingly far along` : ``}.</span> ${He} should be able to still handle at least two liters of cum, however.`);
			deflate(slave);
			slave.pregKnown = 1;
			pregDiscovery = 1;
		} else if (milkTap.fuckdoll > 0) {
			r.push(`Slight moaning emanates from the Fuckdoll as ${slave.slaveName} sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his2} cock and settles into ${his2} balls for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his2} cock and settles into ${his2} balls for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his2} cock and settles into ${his2} balls for a short rest while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.rivalryTarget === slave.ID) {
			r.push(`${milkTap.slaveName} grins as ${his2} rival is forced to suck down loads until ${his} belly is`);
			if (slave.inflation === 3) {
				r.push(`nearly bursting with cum. ${slave.slaveName} struggles against ${his} bindings until the pressure building in ${him} overwhelms ${him}, causing ${him} to pass out with ${milkTap.slaveName}'s ejaculating cock still stuck in ${him}. You quickly remove ${him} from it, making sure ${he} gets roused from ${his} stupor by one last blast of cum directly to the face.`);
			} else if (slave.inflation === 2) {
				r.push(`is rounded, jiggling and sloshing with cum. You release ${his} bindings, allowing ${him} to flop to the floor.`);
				if (hasAnyArms(slave)) {
					r.push(`${He} gingerly crawls away from ${milkTap.slaveName}, ${his} hand cradling ${his} overfull stomach.`);
				} else {
					r.push(`${He} rolls onto ${his} side, groaning with discomfort.`);
				}
			} else if (slave.inflation === 1) {
				r.push(`bloated with cum. You release ${his} bindings, allowing ${him} to flop to the floor.`);
				if (hasAnyArms(slave)) {
					r.push(`${He} gingerly sits up and begins massaging ${his} full stomach.`);
				} else {
					r.push(`${He} rolls onto ${his} back, hiccupping pathetically.`);
				}
			}
		} else if (milkTap.relationshipTarget === slave.ID) {
			if (milkTap.relationship === 1) {
				r.push(`${milkTap.slaveName} moans as ${his2} friend energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 2) {
				r.push(`${milkTap.slaveName} moans as ${his2} best friend energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} best friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} best friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} best friend's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 3) {
				r.push(`${milkTap.slaveName} moans lewdly as ${his2} friend with benefits energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} friend with benefits' cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} friend with benefits' cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} friend with benefits' cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 4) {
				r.push(`${milkTap.slaveName} moans lustfully as ${his2} lover teases ${his2} dick perfectly with ${his} tongue, savoring it despite commonly being sucked off by ${slave.slaveName} during their lovemaking. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} lover's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} lover's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} lover's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			} else if (milkTap.relationship === 5) {
				r.push(`${milkTap.slaveName} moans lustfully as ${his2} wife teases ${his2} dick perfectly with ${his} tongue, savoring it despite commonly being sucked off by ${slave.slaveName} during their lovemaking. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger until`);

				if (slave.inflation === 3) {
					r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${wife2}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and rubbing ${his} gurgling stomach`);
					}
				} else if (slave.inflation === 2) {
					r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${wife2}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} wobbling, gurgling stomach`);
					}
				} else if (slave.inflation === 1) {
					r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${wife2}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
					if (hasAnyArms(slave)) {
						r.push(`and teasing ${his} gurgling stomach`);
					}
				}
				r.push(r.pop() + `.`);
			}
		} else if (slave.mother === milkTap.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relative2} energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} mother's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} mother's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} mother's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (slave.father === milkTap.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relative2} energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} father's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} father's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} father's cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.mother === slave.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} mother energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (milkTap.father === slave.ID) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} father energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			if (slave.dick > 0 && canAchieveErection(slave)) {
				r.push(r.pop() + `,`);
				r.push(`${his} own stiff prick throbbing against the underside of ${his} new belly`);
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 1) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relative2} sucks ${him2} off. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 2) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2}`);
			if (milkTap.actualAge >= slave.actualAge) {
				r.push(`little`);
			} else {
				r.push(`big`);
			}
			r.push(`${relative2} energetically sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);
				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if (areSisters(slave, milkTap) === 3) {
			r.push(`${milkTap.slaveName} moans lewdly as ${his2} ${relative2} sucks ${his2} dick. You enjoy the show, specifically the sight of ${slave.slaveName}'s belly steadily growing larger with each orgasm until`);

			if (slave.inflation === 3) {
				r.push(`${his} belly is round and taut, making ${him} look pregnant. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and rubbing ${his} gurgling stomach`);
				}
			} else if (slave.inflation === 2) {
				r.push(`${his} belly is round, jiggling and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} wobbling, gurgling stomach`);
				}
			} else if (slave.inflation === 1) {
				r.push(`${his} belly is distended and sloshing with cum. ${He} pops off ${his} ${relative}'s cock and takes a seat facing the smiling ${milkTap.slaveName} while hiccupping`);

				if (hasAnyArms(slave)) {
					r.push(`and teasing ${his} gurgling stomach`);
				}
			}
			r.push(r.pop() + `.`);
		} else if ((slave.devotion < -20) && (milkTap.devotion < -20)) {
			r.push(`Since you have two restrained and unwilling slaves, though ${milkTap.slaveName}'s twitching penis betrays ${him2}, you are going to have to take an active role in forcing ${slave.slaveName} to suck.`);
			if (canDoVaginal(slave)) {
				r.push(`Moving behind the struggling cocksleeve while`);
				if (V.PC.dick === 0) {
					r.push(`donning a strap-on,`);
				} else {
					r.push(`teasing your erect cock,`);
				}
				r.push(`you pull ${him} into a comfortable position to penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy. Once you are firmly mounted, you reach around, bringing one hand to ${his} empty stomach and the other to ${his} exposed throat. As you thrust into ${him}, you force ${him} to choke down ${milkTap.slaveName}'s dick, applying pressure to ${his} throat any time ${he} attempts to pull away.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`Moving behind the struggling cocksleeve while`);
				if (V.PC.dick === 0) {
					r.push(`donning a strap-on,`);
				} else {
					r.push(`teasing your erect cock,`);
				}
				r.push(`you pull ${him} into a comfortable position to penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`rear. Once you are firmly mounted, you reach around, bringing one hand to ${his} empty stomach and the other to ${his} exposed throat. As you thrust into ${him}, you force ${him} to choke down ${milkTap.slaveName}'s dick, applying pressure to ${his} throat any time ${he} attempts to pull away.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`Moving behind the struggling cocksleeve while teasing your erect cock, you pull ${him} into a comfortable position to rub your dick between ${his} huge butt cheeks. Once you are firmly slotted, you reach around, bringing one hand to ${his} empty stomach and the other to ${his} exposed throat. As you thrust against ${him}, you force ${him} to choke down ${milkTap.slaveName}'s dick, applying pressure to ${his} throat any time ${he} attempts to pull away.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`Moving behind the struggling cocksleeve while teasing your erect cock, you pull ${him} into a comfortable position to fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs, for a lack of anything better. Once you are firmly seated, you reach around, bringing one hand to ${his} empty stomach and the other to ${his} exposed throat. As you thrust against ${him}, you force ${him} to choke down ${milkTap.slaveName}'s dick, applying pressure to ${his} throat any time ${he} attempts to pull away.`);
			} else {
				r.push(`Moving behind the struggling cocksleeve while teasing your erect cock, you find a distinct lack of ways to use ${him} to get off.`);
				if (V.PC.dick !== 0) {
					r.push(`You settle for rubbing your erection against ${his} back,`);
				} else {
					r.push(`You settle for a vibrating dildo stuck deep into your pussy,`);
				}
				r.push(`you'll need both hands to fondle your toy. Once you are positioned, you reach around, bringing one hand to ${his} empty stomach and the other to ${his} exposed throat. As you masturbate, you force ${him} to choke down ${milkTap.slaveName}'s dick, applying pressure to ${his} throat any time ${he} attempts to pull away.`);
			}
			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers and the seemingly endless supply of ejaculate from ${milkTap.slaveName}.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers and the seemingly endless supply of ejaculate from ${milkTap.slaveName}.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers and the seemingly endless supply of ejaculate from ${milkTap.slaveName}.`);
			}
			r.push(`Standing and releasing ${him} from ${milkTap.slaveName}, gives you a lovely sight of ${slave.slaveName}'s`);

			if (slave.inflation === 3) {
				r.push(`taut, round belly`);
			} else if (slave.inflation === 2) {
				r.push(`rounded, jiggling belly`);
			} else {
				r.push(`distended, sloshing belly`);
			}
			r.push(`quivering as ${he} comes down from ${his} own forced climax${(V.PC.dick !== 0 && (canDoAnal(slave) || canDoVaginal(slave))) ? `, cum leaking from both ends` : ``}. Both slaves <span class="mediumorchid">resent</span> what you made them do and <span class="gold">fear you</span> as a result.`);
			slave.devotion -= 5;
			slave.trust -= 5;
			milkTap.devotion -= 5;
			milkTap.trust -= 5;
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`<span class="mediumorchid">especially,</span> having just <span class="lime">lost ${his} virginity</span> in such a demeaning manner.`);
				slave.devotion -= 5;
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`<span class="mediumorchid">especially,</span> having just <span class="lime">lost ${his} anal virginity</span> in such a demeaning manner.`);
				slave.devotion -= 5;
				slave.anus = 1;
			}
		} else if (milkTap.devotion < -20) {
			r.push(`Since your sperm tank is restrained, you order the more obedient ${slave.slaveName} to enjoy ${himself} with ${milkTap.slaveName}'s dick. As ${he} teases and licks, you can't help but notice the tantalizing way ${he} wiggles ${his} rear.`);
			if (canDoVaginal(slave)) {
				if (V.PC.dick === 0) {
					r.push(`Donning a strap-on,`);
				} else {
					r.push(`Stroking your stiffening cock,`);
				}
				r.push(`you wait for the perfect moment and mount ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy, doggy style.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				if (V.PC.dick === 0) {
					r.push(`Donning a strap-on,`);
				} else {
					r.push(`Stroking your stiffening cock,`);
				}
				r.push(`you wait for the perfect moment and mount ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`asshole, doggy style.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`Stroking your stiffening cock, you wait for the perfect moment and slip your dick between ${his} huge butt cheeks.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`Stroking your stiffening cock, you wait for the perfect moment, hoist up ${his} rear and slip your dick between ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs.`);
			} else {
				r.push(`As you watch ${his} butt, it becomes clear just how few ways there are to use ${him} to get off.`);
				if (V.PC.dick !== 0) {
					r.push(`You settle for rubbing your erection against ${his} back,`);
				} else {
					r.push(`You settle for a vibrating dildo stuck deep into your pussy,`);
				}
				r.push(`you'll need both hands to fondle your toy.`);
			}
			r.push(`You wrap your arms around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with ejaculate.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers.`);
			}
			r.push(`Only once your weight is removed from the squirming cum balloon is ${he} allowed to pull off of the <span class="mediumorchid">exhausted ${milkTap.slaveName}'s</span> cock and catch ${his} breath.`);
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${His} senses were so overwhelmed, ${he} didn't even notice you <span class="lime">broke in ${his} pussy.</span>`);
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${His} senses were so overwhelmed, ${he} didn't even notice you <span class="lime">broke in ${his} anus.</span>`);
				slave.anus = 1;
			}
			r.push(`${He} gives the shaking ${milkTap.slaveName} an apologetic look before taking a seat. The poor slave isn't used to this yet and <span class="gold">is terrified of your willingness</span> to take what you want from your slaves.`);
			milkTap.devotion -= 5;
			milkTap.trust -= 5;
		} else if ((milkTap.fetish === "cumslut") && (milkTap.fetishStrength > 60) && (milkTap.devotion > 20) && (slave.devotion < -20)) {
			if (canDoVaginal(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} is forced to suck ${milkTap.slaveName}'s dick. With every thrust into the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} is forced to suck ${milkTap.slaveName}'s dick. With every thrust into the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You position the restrained ${slave.slaveName} so that you can rub your dick between ${his} huge butt cheeks while ${he} is forced to suck ${milkTap.slaveName}'s dick. With every thrust against the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You position the restrained ${slave.slaveName} so that you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs while ${he} is forced to suck ${milkTap.slaveName}'s dick. With every thrust against the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
			} else {
				r.push(`You position ${slave.slaveName} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} is forced to suck ${milkTap.slaveName}'s dick, since ${he} lacks any better way to please you. With every thrust against the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with ejaculate and place your other hand to ${milkTap.slaveName}'s swollen testicles, knowing just how much ${he2} loves to jettison cum.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers`);
			}
			r.push(`and ${milkTap.slaveName} even more. ${He2} is semi-conscious, drooling in <span class="hotpink">pleasure and satisfaction,</span> by the time you release the bloated ${slave.slaveName} from ${his} harness. Patting ${his2} spasming, dribbling cock, you know ${he2}'ll come out of it and be eagerly begging you for another slave to fuck soon. ${slave.slaveName}, on the other hand, is regarding ${his} swollen stomach <span class="mediumorchid">with disgust</span> and <span class="gold">fear</span> of your power over ${him}.`);
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${He} <span class="mediumorchid">hates you so much more</span> that you <span class="lime">broke in ${his} virgin pussy.</span>`);
				slave.vagina = 1;
				slave.devotion -= 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${He} <span class="mediumorchid">hates you so much more</span> that you <span class="lime">broke in ${his} virgin anus.</span>`);
				slave.anus = 1;
				slave.devotion -= 1;
			}
			slave.devotion -= 5;
			slave.trust -= 5;
			milkTap.devotion += 4;
		} else if ((slave.devotion <= 20) || (milkTap.devotion <= 20)) {
			if (canDoVaginal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} sucks ${milkTap.slaveName}'s cock. With every thrust into the squirming slave, you push ${milkTap.slaveName}'s cock deeper down ${his} throat, giving ${milkTap.slaveName}'s orgasms a straight shot into the moaning slave's gullet.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} sucks ${milkTap.slaveName}'s cock. With every thrust into the squirming slave, you push ${milkTap.slaveName}'s cock deeper down ${his} throat, giving ${milkTap.slaveName}'s orgasms a straight shot into the moaning slave's gullet.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You order ${slave.slaveName} to position ${his} ass so you can rub your dick between ${his} huge butt cheeks while ${he} sucks ${milkTap.slaveName}'s cock. With every thrust against the squirming slave, you push ${milkTap.slaveName}'s cock deeper down ${his} throat, giving ${milkTap.slaveName}'s orgasms a straight shot into the moaning slave's gullet.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You order ${slave.slaveName} to position ${his} ass so you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs while ${he} sucks ${milkTap.slaveName}'s cock. With every thrust against the squirming slave, you push ${milkTap.slaveName}'s cock deeper down ${his} throat, giving ${milkTap.slaveName}'s orgasms a straight shot into the moaning slave's gullet.`);
			} else {
				r.push(`You order ${slave.slaveName} to position ${himself} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} is forced to suck ${milkTap.slaveName}'s dick, since ${he} lacks any better way to please you. With every thrust against the squirming slave, you force the moaning ${milkTap.slaveName}'s cock deep into ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with ejaculate and place your other hand to ${milkTap.slaveName}'s balls, planning to coax even stronger orgasms out of ${him2}.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting. Neither slave seems to have truly enjoyed it, instead opting to just get it over with, though ${milkTap.slaveName} makes sure to thank ${slave.slaveName} for dealing with ${his2} pent up loads.`);
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				slave.anus = 1;
			}
		} else if ((slave.devotion <= 50) || (milkTap.devotion <= 50)) {
			if (canDoVaginal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} sucks ${milkTap.slaveName}'s cock. ${He} submissively obeys. With every thrust into the moaning slave, you push ${milkTap.slaveName}'s dick deeper down ${his} throat.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can penetrate ${his}`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`while ${he} sucks ${milkTap.slaveName}'s cock. ${He} submissively obeys. With every thrust into the moaning slave, you push ${milkTap.slaveName}'s dick deeper down ${his} throat.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can rub your dick between ${his} huge butt cheeks while ${he} sucks ${milkTap.slaveName}'s cock. ${He} submissively obeys. With every thrust against the moaning slave, you push ${milkTap.slaveName}'s dick deeper down ${his} throat.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You order ${slave.slaveName} to lift ${his} ass so you can fuck ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs while ${he} sucks ${milkTap.slaveName}'s cock. ${He} submissively obeys. With every thrust against the moaning slave, you push ${milkTap.slaveName}'s dick deeper down ${his} throat.`);
			} else {
				r.push(`You order ${slave.slaveName} to position ${himself} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} sucks ${milkTap.slaveName}'s cock, since ${he} lacks any better way to please you. ${He} submissively obeys. With every thrust against the moaning slave, you push ${milkTap.slaveName}'s dick deeper down ${his} throat.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with ejaculate and place your other hand to ${milkTap.slaveName}'s balls, knowing just how much ${he2} gets backed up.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting. Both slaves enjoyed their union, though ${milkTap.slaveName} even more so after that many orgasms.`);
			if (canDoVaginal(slave)) {
				if (slave.vagina === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`feels <span class="hotpink">closer to you</span> after losing ${his} virginity to you.`);
					slave.vagina = 1;
					slave.devotion += 5;
				}
			} else if (canDoAnal(slave)) {
				if (slave.anus === 0) {
					r.push(`${slave.slaveName}`);
					r.push(`feels <span class="hotpink">closer to you</span> after losing ${his} anal virginity to you.`);
					slave.anus = 1;
					slave.devotion += 5;
				}
			}
		} else {
			r.push(`${slave.slaveName}`);
			r.push(`eagerly lifts ${his} ass and jiggles it seductively as ${he} sucks the moaning slut.`);
			if (canDoVaginal(slave)) {
				r.push(`You know that signal, so you hilt yourself in`);
				if (slave.vagina === 0) {
					r.push(`virgin`);
				}
				r.push(`pussy`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`and begin spitroasting ${him} with ${milkTap.slaveName}. With every thrust into the moaning slave, every participant comes closer to their own climax.`);
				actX(slave, "vaginal");
			} else if (canDoAnal(slave)) {
				r.push(`You know that signal, so you hilt yourself in`);
				if (slave.anus === 0) {
					r.push(`virgin`);
				}
				r.push(`ass`);
				if (V.PC.dick === 0) {
					r.push(`with a strap-on`);
				}
				r.push(`and begin spitroasting ${him} with ${milkTap.slaveName}. With every thrust into the moaning slave, every participant comes closer to their own climax.`);
				actX(slave, "anal");
			} else if (V.PC.dick !== 0 && slave.butt > 4) {
				r.push(`You know that signal, but ${he} isn't allowed to get penetrated, so you settle for sticking your dick between ${his} huge butt cheeks and fucking ${him} along with ${milkTap.slaveName}. With every thrust against the moaning slave, both you and ${milkTap.slaveName} come closer to climax.`);
			} else if (V.PC.dick !== 0 && hasBothLegs(slave)) {
				r.push(`You know that signal, but ${he} isn't allowed to get penetrated, so you settle for sticking your dick between ${his}`);
				if (slave.weight > 95) {
					r.push(`soft`);
				}
				r.push(`thighs and fucking ${him} along with ${milkTap.slaveName}. With every thrust against the moaning slave, both you and ${milkTap.slaveName} come closer to climax.`);
			} else {
				r.push(`You know that signal, but ${he} isn't allowed to get fucked, so you reposition ${him} so you can rub your`);
				if (V.PC.dick === 0) {
					r.push(`clit`);
				} else {
					r.push(`dick`);
				}
				r.push(`against ${him} while ${he} deepthroats ${milkTap.slaveName}. With every thrust against the moaning slave, both you and ${milkTap.slaveName} come closer to climax.`);
			}
			r.push(`You wrap an arm around ${slave.slaveName}'s middle so you may feel ${his} stomach swell with ejaculate and place your other hand to one of ${milkTap.slaveName}'s nipples to prevent ${him2} from feeling left out from your attention.`);

			if (slave.inflation === 3) {
				r.push(`You cum multiple times as you feel ${his} belly slowly round with cum, transform into a jiggling mass, and finally grow taut under your molesting fingers.`);
			} else if (slave.inflation === 2) {
				r.push(`You cum several times as you feel ${his} belly slowly round with cum, finally transforming into a jiggling mass, under your molesting fingers.`);
			} else {
				r.push(`You cum as you feel ${his} belly slowly round with cum under your molesting fingers.`);
			}
			r.push(`When you release ${him} from under your weight, ${he} drops to the ground panting from ${his} meal and from the pleasure you drove into ${him}. Both slaves <span class="hotpink">loved the attention,</span> though ${milkTap.slaveName} even more so after so much relief.`);
			slave.devotion += 4;
			milkTap.devotion += 4;
			if (canDoVaginal(slave) && (slave.vagina === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`got off quite strongly from the growing pressure within ${him}, <span class="hotpink">cementing</span> ${his} <span class="lime">first fucking</span> as something special.`);
				slave.devotion += 4;
				slave.vagina = 1;
			} else if (canDoAnal(slave) && (slave.anus === 0)) {
				r.push(`${slave.slaveName}`);
				r.push(`got off quite strongly from the growing pressure within ${him}, <span class="hotpink">cementing</span> ${his} <span class="lime">first anal</span> as something special.`);
				slave.devotion += 4;
				slave.anus = 1;
			}
		}
	}

	App.Events.addNode(el, r, "p");
	r = [];

	if (pregDiscovery === 0) {
		seX(slave, "oral", milkTap, "oral");
		r.push(`You help the bloated ${slave.slaveName} to the couch to recover and, more importantly, keep ${his} meal down. Only once ${he} has had several minutes to unwind`);
		if (slave.devotion > 10) {
			r.push(`and plenty of time to tease you with ${his} swollen body, do you tell`);
		} else {
			r.push(`do you order`);
		}
		r.push(`${him} to keep drinking from ${milkTap.slaveName} so that ${he} is always filled with`);
		if (slave.inflation === 3) {
			r.push(`two gallons`);
		} else if (slave.inflation === 2) {
			r.push(`four liters`);
		} else {
			r.push(`two liters`);
		}
		r.push(`of ${slave.inflationType}. You give ${his}`);
		if (slave.inflation === 3) {
			r.push(`taut, firm globe of a belly a pat`);
		} else if (slave.inflation === 2) {
			r.push(`wobbly, sloshing belly a pat`);
		} else {
			r.push(`distended, sloshing belly a pat`);
		}
		r.push(`and send ${him} on ${his} way.`);

		if (slave.inflation === 3) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} over-stuffed belly as ${he} goes.`);
			} else {
				r.push(`${His} belly is so taut it barely wobbles at all as ${he} is helped from your office.`);
			}
			r.push(`Being filled so full <span class="health dec">surely had negative effects</span> on ${his} health.`);
			healthDamage(slave, 1);
		} else if (slave.inflation === 2) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} stuffed belly as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles heavily as ${he} is helped from your office.`);
			}
		} else if (slave.inflation === 1) {
			if (canWalk(slave) || (canMove(slave) && slave.rules.mobility === "permissive")) {
				r.push(`${He} gingerly leaves your office, massaging ${his} distended belly as ${he} goes.`);
			} else {
				r.push(`${His} belly wobbles as ${he} is helped from your office.`);
			}
		}
		App.Events.addNode(el, r, "p");
		r = [];
		if (milkTap.fuckdoll === 0) {
			r.push(`Once ${he} is gone, you see to it that the contented ${milkTap.slaveName} is helped back to ${his2} assignment, but only after ${his2} dribbling`);
			if (slave.inflationType === "milk") {
				r.push(`teats are dealt with,`);
			} else {
				r.push(`cock is dealt with,`);
			}
			r.push(`causing the waiting servant to gulp nervously at what that may entail.`);
		} else {
			r.push(`Once ${he} is gone, you see to it that the dribbling Fuckdoll is cleaned up and returned to ${his2} proper place, but only after ${his2} leaking`);
			if (slave.inflationType === "milk") {
				r.push(`teats are dealt with,`);
			} else {
				r.push(`cock is dealt with,`);
			}
			r.push(`causing the waiting servant to gulp nervously at what that may entail.`);
		}
	} else {
		if (milkTap.fuckdoll === 0) {
			r.push(`With ${slave.slaveName} unable to continue, you are left with the backed up ${milkTap.slaveName} to deal with. ${He2}'ll have to figure out some other way to relieve ${himself2} as ${he2} is helped back to ${his2} assignment.`);
		} else {
			r.push(`With ${slave.slaveName} unable to continue, you are left with the backed up ${milkTap.slaveName} to deal with. Hopefully ${he2} doesn't leak too much as ${he2} waits for further use.`);
		}
	}
	App.Events.addNode(el, r, "p");
	SetBellySize(slave);
	App.Events.drawEventArt(artDiv, [slave, milkTap]);
	return el;
};
