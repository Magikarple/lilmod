// cSpell:ignore LSCD

App.EndWeek.arcManagement = function() {
	const el = new DocumentFragment();
	const secExpImmigrationBonus = App.Mods.SecExp.propagandaEffects("immigration");
	let r;
	let enslaved;
	let rentMultiplier = 1;
	let AWeekGrowth = V.AGrowth;
	// formula to calculate localEcon effect
	let econMult = (1/(1 + 5 * Math.sqrt(Math.trunc(100000/50-1000)/8.5)/100));
	if (V.localEcon >= 100) {
		econMult = (1 + 1.15 * (Math.trunc(1000-100000/200)/8.5)/100);
	}

	if (V.useTabs === 0) {
		App.UI.DOM.appendNewElement("h2", el, "Arcology Management");
	}
	const schoolNumber = App.Utils.schoolCounter();

	App.UI.DOM.appendNewElement("p", el, ownershipReport(false));

	/* Sexual Satisfaction */
	if (FutureSocieties.isActive('FSDegradationist')) {
		if (V.arcadeDemandDegResult === 1) {
			appendDiv(`Your endeavors to see slaves as less than human are hampered as citizens find that there are too few slaves ready to be treated as sexual objects around. <span class="red">Development towards a degradationist society is damaged</span> as a result.`);
		} else if (V.arcadeDemandDegResult === 2) {
			appendDiv(`Your endeavors to see slaves as less than human are slightly hampered as citizens find that there are not quite enough slaves ready to be treated as sexual objects around. <span class="red">Development towards a degradationist society is lightly damaged</span> as a result.`);
		} else if (V.arcadeDemandDegResult === 3) {
			appendDiv(`Your citizens were expecting to see more slaves available as sexual objects, but there aren't enough complaints to damage your societal development at this time.`);
		} else if (V.arcadeDemandDegResult === 4) {
			appendDiv(`Your citizens find themselves surrounded by slaves ready to be degraded and used as sexual objects, this <span class="green">helps to establish your degradationist society.</span>`);
		} else if (V.arcadeDemandDegResult === 5) {
			appendDiv(`You are providing your citizens with an adequate amount of slaves to be used as sexual objects, as is expected in your degradationist society.`);
		}
	}

	for (const societyClass of ["lower", "middle", "upper", "top"]) {
		$(el).append(supplyPoliciesReport(societyClass));
	}
	/* New Population
	Populations depend on the 'demand' for them. People flock to the Free City when there are jobs. Jobs for lower class people depend on prosperity and the need for labor from other classes. They compete with slaves for work.
	More elite citizens require their own slaves and will cause the population of slaves to increase as they move in. FS and policies will impact how many slaves they desire and how productive they are. The PC's menials also compete for labor within the arcology. Slaves can now 'expire', speed depends on FS and policies. Default lifespan for menials is an average of ~4 years. */

	let FSScore = 0; /* FS progress for tourism */
	let	slaveDemandU = 1; /* Changes to upperClass slave demand */
	let	slaveDemandT = 1; /* Changes to topClass slave demand */
	let	expirationFS = 0.005; /* Changes to likelihood of slave death */
	let expirationLC = 0.003; /* Changes to likelihood of lowerClass death */
	let expirationMC = 0.002; /* Changes to likelihood of middleClass death */
	let expirationUC = 0.001; /* Changes to likelihood of upperClass death */
	let expirationTC = 0.001; /* Changes to likelihood of topClass death */
	let	slaveProductivity = 0.8; /* Changes to slave productivity*/
	let	lowerClass = 0; /* Fixed amount of changes to lowerClass interest to move in*/
	let	lowerClassP = 1; /* Scaling changes to lowerClass interest ("stacking bonus")*/
	let	welfareFS = 0.004; /* Changes to likelihood of lowerClass getting enslaved*/
	let	middleClass = 0; /* See lowerClass examples for the rest of these*/
	let	middleClassP = 1;
	let	upperClass = 0;
	let	upperClassP = 1;
	let	topClass = 0;
	let	topClassP = 1;

	el.append(fsImpact());
	el.append(policiesImpact());

	const schoolSubsidy = Array.from(App.Data.misc.schools.keys()).reduce((acc, current) => acc + V[current].subsidize, 0);
	middleClass += (schoolSubsidy) * 40;
	middleClassP *= 1 + (schoolSubsidy) * 0.005;

	r = [];
	r.push(slaveRetirement());
	r.push(expiration());
	App.Events.addParagraph(el, r);

	citizenToSlave();

	V.GDP = Math.trunc(((V.NPCSlaves + V.menials) * 0.35 * slaveProductivity) + (V.lowerClass * 0.35) + (V.middleClass * 0.75) + (V.upperClass * 2) + (V.topClass * 10)) / 10;
	const frozen = isFrozen();

	if (!frozen) {
		const apartments = denseApartments();
		if (apartments.length > 0) {
			App.Events.addParagraph(el, apartments);
		}
	}

	const menialWorkAvailable = processDemand(frozen);

	V.ASlaves = V.NPCSlaves + V.menials + V.fuckdolls + V.menialBioreactors;
	if (V.secExpEnabled > 0) {
		V.ASlaves += (V.SecExp.buildings.secHub ? V.SecExp.buildings.secHub.menials : 0) + App.Mods.SecExp.Manpower.employedSlave;
	}
	V.ACitizens = V.lowerClass + V.middleClass + V.upperClass + V.topClass;
	const percentageOfPop = (n) => Math.trunc((n / (V.ACitizens + V.ASlaves)) * 1000) / 10;
	appendDiv(`${V.arcologies[0].name} is home to the following:`);
	const table = App.UI.DOM.appendNewElement("table", el);
	App.UI.DOM.makeRow(table, `Citizens`, `${num(V.ACitizens)}`, `${percentageOfPop(V.ACitizens)}%`);
	App.UI.DOM.makeRow(table, `Lower Class Citizens`, `${num(V.lowerClass)}`, `${percentageOfPop(V.lowerClass)}%`);
	App.UI.DOM.makeRow(table, `Middle Class Citizens`, `${num(V.middleClass)}`, `${percentageOfPop(V.middleClass)}%`);
	App.UI.DOM.makeRow(table, `Upper Class Citizens`, `${num(V.upperClass)}`, `${percentageOfPop(V.upperClass)}%`);
	App.UI.DOM.makeRow(table, `Millionaires`, `${num(V.topClass)}`, `${percentageOfPop(V.topClass)}%`);
	App.UI.DOM.makeRow(table, `Slaves`, `${num(V.ASlaves)}`, `${percentageOfPop(V.ASlaves)}%`);

	r = [];
	if (V.arcologies[0].FSSupremacistLawME === 1) {
		r.push(`The citizenry is entirely ${V.arcologies[0].FSSupremacistRace}.`);
	}
	if (V.arcologies[0].FSRomanRevivalistLaw === 1) {
		r.push(`The citizens take pride in their martial duties, preferring to wear utilitarian clothing even when off duty.`);
	}
	if (V.arcologies[0].FSNeoImperialistLaw1 === 1) {
		r.push(`You can occasionally see an Imperial Knight in full, noble battle-dress coordinating groups of organized citizen's militias, dressed in uniform liveries. Your citizens take pride in their fighting abilities.`);
	}
	if (V.arcologies[0].FSAntebellumRevivalistLaw1 === 1) {
		r.push(`The law enshrining slave owners as vital members of your arcology has clearly gone to their heads; well-to-do citizens proudly strut by with a gaggle of slaves in tow. `);
	}
	if (V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
		r.push(`The citizenry organizes itself into numerous militias, each member proudly self-equipped and ready to defend their new home from any aggressor.`);
	}
	if (V.arcologies[0].FSGenderRadicalistDecoration === 100) {
		r.push(`Every single one of the slaves is female by virtue of her fuckable asshole.`);
	} else if (V.arcologies[0].FSGenderFundamentalistSMR === 1) {
		r.push(`Almost every prominent citizen is an upstanding man, while the slave population is almost completely female.`);
	}
	if (V.arcologies[0].FSEgyptianRevivalistLaw === 1) {
		r.push(`Close relationships between citizens and slaves, especially slave siblings, are common.`);
	} else if (V.arcologies[0].FSEgyptianRevivalistIncestPolicy === 1) {
		r.push(`Close relationships between citizens, slaves and siblings are common.`);
	}
	if (V.arcologies[0].FSSubjugationistLawME === 1) {
		r.push(`${capFirstChar(V.arcologies[0].FSSubjugationistRace)} subhumans form a majority of the slaves.`);
	}
	if (V.arcologies[0].FSChattelReligionistLaw === 1) {
		r.push(`The slave population as a whole is unusually accepting of its station.`);
	}
	if (V.arcologies[0].FSPaternalistLaw === 1) {
		r.push(`The slaves are well cared for, and it can sometimes be difficult to tell slaves from citizens.`);
	} else if (V.arcologies[0].FSDegradationistLaw === 1) {
		r.push(`Most of the slaves are recent captures, since the vicious society that's taken root here uses people up quickly.`);
	}
	if (V.arcologies[0].FSBodyPuristLaw === 1) {
		r.push(`The average slave is quite healthy.`);
	} else if (V.arcologies[0].FSTransformationFetishistSMR === 1) {
		if (V.arcologies[0].FSTransformationFetishistResearch === 1) {
			r.push(`Breast implants are almost universal;`);
			if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`an M-cup bust is below average among the slave population.`);
			} else {
				r.push(`even the most lithe slave sports a pair of overly round chest balloons.`);
			}
		} else {
			r.push(`Breast implants are almost universal;`);
			if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`a D-cup bust is below average among the slave population.`);
			} else {
				r.push(`even the most lithe slave sports a pair of overly round chest balloons.`);
			}
		}
	}
	if (V.arcologies[0].FSIntellectualDependencySMR === 1) {
		r.push(`The average slave is entirely dependent on its master.`);
	} else if (V.arcologies[0].FSSlaveProfessionalismSMR === 1) {
		r.push(`The average slave is entirely capable of acting on its master's behalf.`);
	}
	if (V.arcologies[0].FSSlimnessEnthusiastSMR === 1) {
		r.push(`Most of the slave population is quite slim and physically fit.`);
	} else if (V.arcologies[0].FSAssetExpansionistSMR === 1) {
		r.push(`The arcology's consumption of pharmaceuticals is impressive, since slave growth hormones are nearly ubiquitous.`);
	}
	if (V.arcologies[0].FSPetiteAdmirationSMR === 1) {
		r.push(`Slaves are both easy to identify, but hard to find in a crowd given their short stature.`);
	} else if (V.arcologies[0].FSStatuesqueGlorificationSMR === 1) {
		r.push(`${V.arcologies[0].name}'s`);
		if (V.arcologies[0].FSStatuesqueGlorificationLaw === 1) {
			r.push(`entire`);
		} else {
			r.push(`slave`);
		}
		r.push(`population stands taller than most visitors.`);
	}
	if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
		r.push(`Many of the women in the arcology are pregnant.`);
	} else if (V.arcologies[0].FSRepopulationFocusSMR === 1) {
		r.push(`Most of the slaves in the arcology are pregnant.`);
	} else if (V.arcologies[0].FSRestartLaw === 1) {
		r.push(`Many of your civilians have agreed to be sterilized.`);
	} else if (V.arcologies[0].FSRestartSMR === 1) {
		r.push(`Many of slave slaves in your arcology are infertile.`);
	}
	if (V.arcologies[0].FSPastoralistLaw === 1) {
		r.push(`Much of the menial slave labor force works to service the arcology's hundreds of human cattle.`);
	}
	if (V.arcologies[0].FSPhysicalIdealistSMR === 1) {
		r.push(`The arcology must import a very large quantity of nutritive protein to nourish its slaves.`);
	}
	if (V.arcologies[0].FSHedonisticDecadenceSMR === 1) {
		r.push(`The arcology must import a very large quantity of fattening food to plump up its slaves.`);
	}
	r.push(`Polling finds the most attractive age to be ${V.idealAge}.`);
	if (V.policies.idealAge) {
		if (V.targetIdealAge !== V.idealAge) {
			r.push(`You use your wealth and personal influence to try and shift it to ${V.targetIdealAge}`);
			V.idealAgeAdoption += V.rep / 100;
			if (V.idealAgeAdoption > 100) {
				const adoptionModifier = Math.floor(V.idealAgeAdoption / 100);
				if (V.targetIdealAge > V.idealAge) {
					V.idealAge = Math.clamp(Math.floor(V.idealAge + adoptionModifier), V.idealAge, V.targetIdealAge);
				} else {
					V.idealAge = Math.clamp(Math.floor(V.idealAge - adoptionModifier), V.idealAge, V.targetIdealAge);
				}
				if (adoptionModifier > 1) {
					r.push(`and, with your peerless reputation, ${V.idealAge === V.targetIdealAge ? `find it <span class="green">accepted wholeheartedly` : `<span class="green">quickly gain support`}.</span>`);
				} else if (V.idealAge === V.targetIdealAge) {
					// TODO:
				} else {
					r.push(r.pop() + `, but tastes don't change quickly, so it ends up at ${V.idealAge}.`);
				}
				V.idealAgeAdoption = V.idealAgeAdoption - (100 * adoptionModifier);
			} else {
				if (V.idealAgeAdoption <= 0) {
					r.push(r.pop() + `; unfortunately, your efforts <span class="red">have no effect</span> on what others find sexually appealing, and so it remains where it is.`);
				} else {
					r.push(`and make <span class="yellow">some progress</span> in doing so, but for now, society's tastes do not change.`);
				}
			}
		} else {
			V.policies.idealAge = 0;
		}
	}

	if (V.ACitizens > V.ASlaves * 2) { /* This will need to go away Eventually*/
		r.push(`Since most citizens do not own sex slaves, <span class="yellowgreen">demand for sexual services is intense.</span>`);
	} else if (V.ACitizens > V.ASlaves) {
		r.push(`Since many citizens do not own sex slaves, <span class="yellowgreen">demand for sexual services is healthy.</span>`);
	} else if (V.ACitizens > V.ASlaves * 0.5) {
		r.push(`Since many citizens keep a personal sex slave, <span class="yellow">demand for sexual services is only moderate.</span>`);
	} else if (V.ACitizens > V.ASlaves * 0.25) {
		r.push(`Since most citizens keep at least one sex slave, <span class="gold">local demand for sexual services is low,</span> though visitors to the arcology will always keep it above a certain minimum.`);
	} else {
		r.push(`Since most of your citizens now keep private harems of sex slaves, <span class="gold">local demand for sexual services is very low,</span> though visitors to the arcology will always keep it above a certain minimum.`);
	}
	App.Events.addParagraph(el, r);
	r = [];

	if (V.arcologies[0].FSPaternalistLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Tenants who can prove that they abstain from certain practices are given a reduction to their rent.`);
	}
	if (V.arcologies[0].FSYouthPreferentialistLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Younger citizens are offered subsidized rent to encourage young people to join the free population of your arcology.`);
	} else if (V.arcologies[0].FSMaturityPreferentialistLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Older citizens are offered subsidized rent to encourage mature people to join the free population of your arcology.`);
	}
	if (V.arcologies[0].FSPetiteAdmirationLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Citizens are offered subsidized rent to take drastically shorter partners and harem members.`);
	} else if (V.arcologies[0].FSStatuesqueGlorificationLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Tall citizens are offered rent subsidies, at the expense of short citizens, to encourage more statuesque individuals to join the free population of your arcology.`);
	}
	if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Pregnant citizens are offered subsidized rent to encourage free women to become pregnant and pregnant women to join the free population of your arcology.`);
	} else if (V.arcologies[0].FSRestartLaw === 1) {
		rentMultiplier *= 1.05;
		r.push(`Non-Elite citizens who refuse to be sterilized face a moderate tax and the looming possibility of expulsion or enslavement.`);
	}
	if (V.arcologies[0].FSHedonisticDecadenceLaw === 1) {
		rentMultiplier *= 0.95;
		r.push(`Food vendors are offered subsidized rent and operating expenses to set up shop in your arcology.`);
	}
	if (V.secExpEnabled > 0) {
		const movement = random(0, 3);
		if (V.SecExp.edicts.alternativeRents === 1 && movement > 0) {
			V.menials += movement;
			V.NPCSlaves -= movement;
			rentMultiplier *= 0.95;
			r.push(`Your citizens are allowed to pay their rents in slaves rather than cash and a few financially challenged individuals make use of this, providing you with ${movement} additional human cargo.`);
		}
		if (V.SecExp.edicts.defense.discountMercenaries === 1) {
			r.push(`Mercenaries willing to come to your arcology are given a discount on rent.`);
			rentMultiplier *= 0.98;
		}
		if (V.SecExp.edicts.defense.privilege.militiaSoldier === 1) {
			r.push(`Citizens in the militia are exempt from rent payment.`);
			rentMultiplier *= 0.98;
		}
	}
	if (V.arcologies[0].FSArabianRevivalistLaw === 1) {
		rentMultiplier *= 1.05;
		r.push(`Those of your citizens who have not yet subscribed to the society you are building are permitted to live and do business here, but must pay a moderate jizya tax for the privilege as part of their rent.`);
	}
	if (V.arcologies[0].FSNeoImperialistLaw2 === 1) {
		rentMultiplier *= 1.05;
		r.push(`Your Barons, equipped with golden bands as a symbol of office, flit about their assigned sections of the arcology to personally check up on businesses and punish petty criminals. They make any evasion of your rent extraordinarily difficult, and consistently earn you more than they take.`);
	}
	App.Events.addParagraph(el, r);
	r = [];
	rentMultiplier *= 1 + (5 - V.baseDifficulty) / 20;
	const rents = Math.trunc((V.lowerClass * V.rent.lowerClass + V.middleClass * V.rent.middleClass + V.upperClass * V.rent.upperClass + V.topClass * V.rent.topClass) * rentMultiplier / 25);
	if (!Number.isInteger(rents)) {
		appendDiv(`<span class="red">Error: rents is outside accepted range, please report this issue</span>`);
	} else {
		cashX(rents, "rents");
	}

	r.push(`This week, rents from ${V.arcologies[0].name} came to <span class="yellowgreen">${cashFormat(rents)}.</span>`);
	if (V.difficultySwitch === 0) {
		if (V.localEcon < 100) {
			let bribes = (V.week * 100) + random(-100, 100);
			if (V.cash > 1000) {
				bribes += Math.trunc(V.cash * 0.02);
			}
			r.push(`The <span class="red">degenerating world economy</span> makes supplying and maintaining ${V.arcologies[0].name} extremely difficult. This week, bribes and other costs to keep it running came to <span class="yellowgreen">${cashFormat(bribes)}.</span>`);
			cashX(forceNeg(bribes), "rents");
		}
	}

	if (V.menials + V.menialBioreactors + V.fuckdolls > 0) {
		let menialEarnings = 0;
		let bioreactorEarnings = 0;
		let fuckdollsEarnings = 0;
		r.push(`You own`);
		if (V.menials > 0) {
			const sweatshops = sweatshopCount();
			const menialsInSweatshops = Math.min(sweatshops * 500, V.menials);
			const menialsWorking = V.menials - menialsInSweatshops;
			const menialWorkDone = Math.min(menialsWorking, menialWorkAvailable);
			menialEarnings = menialsInSweatshops * 14 + menialWorkDone * 10;
			if (menialsWorking > menialWorkAvailable) {
				r.push(`<span class="red">more menial slaves than there was work;</span> consider selling some.`);
				if (menialWorkAvailable === 0) {
					r.push(`Actually, consider selling them all${sweatshops > 0 ? `, except for those working in the Sweatshops` : ``}...demand for labor is so low that <span class="red">none of them made any money</span> this week.`);
				}
				r.push(`<br>You own`);
			}
			if (V.illegalDeals.menialDrug === 1) {
				menialEarnings = Math.trunc(menialEarnings * 1.5);
			}
			if (V.menials > 1) {
				r.push(`${num(V.menials)} menial slaves${((V.menialBioreactors > 0) && (V.fuckdolls === 0)) ? ` and` : `,`}`);
			} else {
				r.push(`one menial slave${((V.menialBioreactors > 0) && (V.fuckdolls === 0)) ? ` and` : `,`}`);
			}
			cashX(menialEarnings, "menialTrades");
		}

		if (V.menialBioreactors > 0) {
			bioreactorEarnings = V.menialBioreactors * (10 + (10 * V.arcologies[0].FSPastoralistLaw));
			if (V.dairy && V.dairyUpgradeMenials) {
				bioreactorEarnings += V.menialBioreactors * 5;
			}
			if (V.menialBioreactors > 1) {
				r.push(`${num(V.menialBioreactors)} standard bioreactors,`);
			} else {
				r.push(`one standard bioreactor,`);
			}
			if (V.fuckdolls > 0) {
				r.push(`and`);
			}
			cashX(bioreactorEarnings, "menialBioreactors");
		}


		if (V.fuckdolls > 0) {
			const arcadeFreeSpace = V.arcade - App.Entity.facilities.arcade.employeesIDs().size;
			const fuckdollsArcade = arcadeFreeSpace > 0 ? Math.min(arcadeFreeSpace, V.fuckdolls) : 0;
			let arcadeUpgradeInjectors = 0;
			if (V.arcadeUpgradeInjectors === 1) {
				arcadeUpgradeInjectors = 1;
			} else if (V.arcadeUpgradeInjectors > 1) {
				arcadeUpgradeInjectors = 1.5;
			}
			fuckdollsEarnings = Math.trunc(((V.fuckdolls - fuckdollsArcade) * 140 + fuckdollsArcade * (175 + 35 * arcadeUpgradeInjectors)) * (V.arcadePrice - 0.5) / 10);
			/* The "/ 10" at the end is just there to keep the price in line with other current prices, hopefully prices will get to a spot where this can be dropped*/
			if (V.fuckdolls > 1) {
				r.push(`${num(V.fuckdolls)} standard Fuckdolls,`);
			} else if (V.fuckdolls === 1) {
				r.push(`one Fuckdoll,`);
			}
			if (fuckdollsArcade > 1) {
				r.push(`${num(fuckdollsArcade)} of which are stationed in the arcade,`);
			} else if (fuckdollsArcade === 1 && V.fuckdolls > 1) {
				r.push(`one of which is stationed in the arcade,`);
			} else if (fuckdollsArcade === 1) {
				r.push(`which is stationed in the arcade,`);
			}
			if (V.policies.publicFuckdolls === 1) {
				repX(fuckdollsEarnings / 5, "fuckdolls");
				fuckdollsEarnings = Math.trunc(V.fuckdolls * -0.5);
				/* The upkeep of a Fuckdoll*/
			}
			cashX(fuckdollsEarnings, "fuckdolls");
		}

		const totalEarnings = menialEarnings + bioreactorEarnings + fuckdollsEarnings;
		if (totalEarnings > 0) {
			r.push(`earning you <span class="yellowgreen">${cashFormat(totalEarnings)}.</span>`);
		} else if (totalEarnings === 0) {
			r.push(`which earned you <span class="red">no money</span> this week.</span>`);
		} else {
			r.push(`costing you <span class="cash dec">${cashFormat(totalEarnings)}</span> on account of your free Fuckdoll policy.`);
		}
		if (V.illegalDeals.menialDrug === 1) {
			r.push(`Your menial slave productivity has been boosted by performance enhancing drugs.`);
		}
	}

	if (AWeekGrowth + V.arcologies[0].prosperity > V.AProsperityCap) {
		r.push(`<span class="yellow">${V.arcologies[0].name} is at its maximum prosperity, so rents will not increase until it is improved.</span>`);
	} else if ((2 * AWeekGrowth) + V.arcologies[0].prosperity >= V.AProsperityCap) {
		r.push(`<span class="yellow">Your arcology is nearly at its maximum prosperity.</span>`);
		V.arcologies[0].prosperity += AWeekGrowth;
	} else {
		if (V.arcologies[0].ownership >= 100) {
			r.push(`Your controlling interest in ${V.arcologies[0].name} allows you to lead it economically, <span class="green">supercharging growth.</span>`);
			AWeekGrowth += 3;
		} else if (V.arcologies[0].ownership >= random(40, 100)) {
			r.push(`Your interest in ${V.arcologies[0].name} allows you to lead it economically, <span class="green">boosting growth.</span>`);
			AWeekGrowth++;
		}
		if (V.arcologies[0].prosperity < (V.rep / 100)) {
			r.push(`Your impressive reputation relative to ${V.arcologies[0].name}'s prosperity <span class="green">drives an increase in business.</span>`);
			AWeekGrowth++;
		} else if (V.rep > 18000) { // no growth penalty if PC is at high rep, no matter how high prosperity goes
		} else if (V.arcologies[0].prosperity > (V.rep / 60)) {
			r.push(`Your low reputation relative to ${V.arcologies[0].name}'s prosperity <span class="red">seriously impedes business growth.</span>`);
			AWeekGrowth -= 2;
		} else if (V.arcologies[0].prosperity > (V.rep / 80)) {
			r.push(`Your unimpressive reputation relative to ${V.arcologies[0].name}'s prosperity <span class="yellow">slows business growth.</span>`);
			AWeekGrowth--;
		}
		if (V.secExpEnabled > 0) {
			if (V.SecExp.core.trade <= 20) {
				AWeekGrowth++;
			} else if (V.SecExp.core.trade <= 40) {
				AWeekGrowth += 2;
			} else if (V.SecExp.core.trade <= 60) {
				AWeekGrowth += 3;
			} else if (V.SecExp.core.trade <= 80) {
				AWeekGrowth += 4;
			} else {
				AWeekGrowth += 5;
			}

			if (V.SecExp.smilingMan.progress === 10) {
				r.push(`The ex-criminal known to the world as The Smiling Man puts her impressive skills to work, improving the financial situation of the arcology with ease.`);
				AWeekGrowth++;
			}
		}
		if (V.personalAttention.task === PersonalAttention.BUSINESS && !onBedRest(V.PC, true)) {
			if ((V.PC.skill.trading >= 100) || (V.PC.career === "arcology owner")) {
				r.push(`Your <span class="skill player">business focus and your experience</span> allow you to greatly assist in advancing the arcology's prosperity.`);
				AWeekGrowth += 2;
			} else if (V.PC.visualAge >= 16 || random(1, 100) > 60) {
				r.push(`Your business focus allows you to help improve the arcology's prosperity.`);
				AWeekGrowth++;
			}
			if (V.PC.visualAge >= 16) {
				if (V.PC.actualAge >= 50) {
					if (V.arcologies[0].FSMaturityPreferentialistLaw === 1) {
						r.push(`You are able to leverage your long seniority in the business community using the arcology's favorable laws to further advance prosperity.`);
						AWeekGrowth++;
					}
				} else if (V.PC.actualAge < 35) {
					if (V.arcologies[0].FSYouthPreferentialistLaw === 1) {
						r.push(`You are able to leverage your freshness in the business community using the arcology's favorable laws to further advance prosperity.`);
						AWeekGrowth++;
					}
				}
			}
		}
		if (FutureSocieties.isActive('FSNull')) {
			r.push(`Your cultural openness is a powerful driver of economic activity.`);
			AWeekGrowth += Math.max(1, Math.trunc(V.arcologies[0].FSNull / 25));
		}
		if (FutureSocieties.isActive('FSRestart')) {
			r.push(`Your powerful connections open many avenues of economic expansion.`);
			AWeekGrowth += Math.max(1, Math.trunc(V.arcologies[0].FSRestart / 10));
		}
		if (V.arcologies[0].FSPaternalist >= random(1, 100)) {
			r.push(`This week, the careful attention to slave welfare your new society emphasizes has been a driver of prosperity.`);
			AWeekGrowth++;
		}
		if (V.arcologies[0].FSHedonisticDecadence >= random(1, 100)) {
			r.push(`This week, several new businesses opened local branches or broke ground, greatly increasing prosperity.`);
			AWeekGrowth += 2;
		}
		if (V.arcologies[0].FSChattelReligionistCreed === 1) {
			if (V.nicaea.focus === "owners") {
				r.push(`The focus on slaveowners' whims in the creed of ${V.nicaea.name} interests the rich and powerful, increasing prosperity.`);
				AWeekGrowth += V.nicaea.power;
			}
		}
		if (V.arcologies[0].FSSlaveProfessionalismLaw === 1) {
			r.push(`The concentrated intelligence of the free population finds innovative ways to spur prosperity.`);
			AWeekGrowth++;
		}
		if (V.arcologies[0].FSRomanRevivalist >= random(1, 100)) {
			r.push(`This week, intense interest in your project to revive Roman values has driven prosperity.`);
			AWeekGrowth++;
		} else if (V.arcologies[0].FSNeoImperialist >= random(1, 100)) {
			r.push(`This week, your tightly hierarchical Imperial society's efficient organization has attracted traders and increased prosperity.`);
			AWeekGrowth++;
		} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
			if ((V.HeadGirlID !== 0) && (V.RecruiterID !== 0) && (V.BodyguardID !== 0)) {
				r.push(`This week, your imperial administration, staffed with a Head Girl, a Recruiter, and a Bodyguard, has improved prosperity.`);
				AWeekGrowth += 2;
			}
		}
		if (V.PC.skill.trading >= 100) {
			r.push(`Your <span class="skill player">business skills</span> drive increased prosperity.`);
			AWeekGrowth++;
		} else if (V.PC.career === "arcology owner") {
			r.push(`Your <span class="skill player">experience in the Free Cities</span> helps increase prosperity.`);
			AWeekGrowth++;
		}
		if (schoolNumber === 1) {
			r.push(`The presence of a slave school in the arcology improves the local economy.`);
		} else if (schoolNumber > 0) {
			r.push(`The presence of slave schools in the arcology greatly improves the local economy.`);
		} else if (V.arcologies[0].prosperity > 80) {
			r.push(`The lack of a branch campus from a reputable slave school is slowing further development of the local economy.`);
			AWeekGrowth--;
		}
		AWeekGrowth += schoolNumber;
		if (V.arcologies[0].FSDegradationistLaw === 1) {
			r.push(`Requiring menials to be given time to fuck human sex toys in the arcade reduces labor efficiency, slowing growth and costs money for each menial slave you own.`);
			AWeekGrowth--;
			cashX(forceNeg(V.menials * 3 * V.arcadePrice), "fuckdolls");
		}
		if (V.arcologies[0].FSBodyPuristLaw === 1) {
			r.push(`The drug surcharge used to fund the purity regime reduces growth.`);
			AWeekGrowth--;
		}
		if (V.arcologies[0].FSPastoralistLaw === 1) {
			r.push(`Prosperity improvement is slowed by the regulations on animal products.`);
			AWeekGrowth--;
		}
		if (V.arcologies[0].FSPaternalistSMR === 1) {
			r.push(`Your slave market regulations slow the flow of chattel through the arcology.`);
			AWeekGrowth--;
		}

		// deactivated with sec Exp as they are modifiers for the trade mechanic
		if (V.secExpEnabled === 0) {
			if (V.terrain === "urban") {
				r.push(`Since your arcology is located in the heart of an urban area, its commerce is naturally vibrant.`);
				AWeekGrowth++;
			}
			if (V.terrain === "ravine") {
				r.push(`Since your arcology is located in the heart of a ravine, its commerce is hindered by a lack of accessibility.`);
				AWeekGrowth--;
			}
		}

		if (V.arcologies[0].embargoTarget && V.arcologies[0].embargoTarget !== -1) {
			r.push(`The local economy is hurt by the double edged sword of your economic warfare.`);
			AWeekGrowth -= V.arcologies[0].embargo * 2;
		}

		let desc = [];
		let descNeg = [];
		for (const arcology of V.arcologies) {
			const opinion = App.Neighbor.opinion(V.arcologies[0], arcology);
			if (opinion >= 100) {
				desc.push(arcology.name);
			} else if (opinion <= -100) {
				descNeg.push(arcology.name);
			}
		}
		if (desc.length > 0) {
			r.push(`Your arcology's economy benefits from close social alignment with`);
			if (descNeg.length > 0) {
				r.push(`${toSentence(desc)}, but`);
			} else {
				r.push(`${toSentence(desc)}.`);
			}
			AWeekGrowth += desc.length;
		}
		if (descNeg.length > 0) {
			if (desc.length === 0) {
				r.push(`Your arcology's economy is`);
			}
			r.push(`hindered by social conflicts with ${toSentence(descNeg)}.`);
			AWeekGrowth -= descNeg.length;
		}
		if (V.policies.alwaysSubsidizeGrowth === 1) {
			r.push(`Growth was subsidized as planned.`);
			AWeekGrowth++;
		}
		if (V.secExpEnabled > 0) {
			App.Events.addParagraph(el, r);
			r = [];
			if (V.SecExp.core.authority > 18000) {
				r.push(`Your authority is so high it discourages new business, slowing down the economic growth of the arcology.`);
				AWeekGrowth--;
			}
			if (V.SecExp.core.security > 80) {
				r.push(`Your arcology is extremely safe and stable. Many businesses are attracted to it because of this.`);
				AWeekGrowth++;
			} else if (V.SecExp.core.security < 20) {
				r.push(`Your arcology's low security is an instability factor simply too dangerous to be ignored. Many businesses avoid your arcology because of this.`);
				AWeekGrowth--;
			}

			if (V.SecExp.edicts.weaponsLaw === 3) {
				r.push(`The free flow of weapons in your arcology has a positive impact on its economy.`);
				AWeekGrowth++;
			} else if (V.SecExp.edicts.weaponsLaw === 2) {
				r.push(`The fairly liberal flow of weapons in your arcology has a positive impact on its economy.`);
				AWeekGrowth++;
			}
			if (V.SecExp.buildings.propHub && V.SecExp.buildings.propHub.upgrades.controlLeaks > 0) {
				r.push(`The authenticity department prepares extremely accurate, but false financial reports, misleading many of your competitors, allowing your arcology more space to grow undisturbed.`);
				AWeekGrowth++;
			}
			if (V.SecExp.smilingMan.progress >= 2) {
				if (V.SecExp.smilingMan.globalCrisisWeeks && V.SecExp.smilingMan.globalCrisisWeeks > 0) {
					r.push(`The great global crisis ignited by The Smiling Man plan is a great weight on the shoulders of everyone, causing great harm to the prosperity of the arcology.`);
					AWeekGrowth -= random(2, 4);
					V.SecExp.smilingMan.globalCrisisWeeks--;
				} else if (V.SecExp.smilingMan.progress >= 3) {
					r.push(`With the global economy recovering from the great crisis unleashed by the Smiling Man, there is plenty of room to grow. Your arcology's prosperity benefits from this greatly.`);
					AWeekGrowth++;
				}
				if ((V.SecExp.smilingMan.globalCrisisWeeks) && V.SecExp.smilingMan.globalCrisisWeeks === 0) {
					delete V.SecExp.smilingMan.globalCrisisWeeks;
				}
			}
			const reactorDamaged = App.Mods.SecExp.updateFacilityDamage("reactor");
			r.push(reactorDamaged.text);
			AWeekGrowth -= reactorDamaged.growth;

			const secExpTrade = App.Mods.SecExp.tradeReport();
			r.push(secExpTrade.text);
			AWeekGrowth += secExpTrade.bonus;
			App.Events.addParagraph(el, r);
			r = [];
		}
		AWeekGrowth = Math.trunc(0.5 * AWeekGrowth);
		if (AWeekGrowth > 0) {
			r.push(`Since ${V.arcologies[0].name} can support more citizens and more activity, <span class="green">its prosperity improved this week.</span>`);
		} else if (AWeekGrowth === 0) {
			r.push(`Though ${V.arcologies[0].name} can support more citizens and more activity, <span class="yellow">growth was moribund this week.</span>`);
		} else {
			r.push(`Though ${V.arcologies[0].name} can support more citizens and more activity, <span class="red">it lost prosperity this week.</span>`);
		}

		App.Events.addNode(el, r);
		r = [];

		if (isNaN(AWeekGrowth)) {
			App.UI.DOM.appendElement("div", el, `Error: AWeekGrowth is NaN`, "red");
		} else {
			V.arcologies[0].prosperity += AWeekGrowth;
		}
	}

	if (schoolNumber > 0) {
		el.append(schools());
	}

	if (V.assistant.market && V.assistant.market.limit > 0) {
		let popCap = menialPopCap();
		let menialSlaveValue = menialSlaveCost();
		const {HeM, heM} = getPronouns(assistant.pronouns().market).appendSuffix('M');
		r.push(`Your <span class="bold">business assistant</span> manages the menial slave market.`);
		if (menialSlaveValue <= 900 + V.assistant.market.aggressiveness) { /* BUY */
			let bulkMax = popCap.value - V.menials - V.fuckdolls - V.menialBioreactors;
			if (bulkMax <= 0) {
				r.push(`There is no room in the parts of your arcology you own for more menial slaves.`);
			} else {
				if (V.cash > V.assistant.market.limit + menialSlaveValue) {
					let menialBulkPremium = Math.trunc(1 + Math.clamp((V.cash - V.assistant.market.limit) / menialSlaveValue, 0, bulkMax) / 400);
					r.push(`${HeM} acquires more chattel, since it's a buyers' market.`);
					if (FutureSocieties.isActive('FSPastoralist') && !FutureSocieties.isActive('FSPaternalist')) {
						V.menialBioreactors += Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium - 100), 0, bulkMax));
						V.menialSupplyFactor -= Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium - 100), 0, bulkMax));
						cashX(forceNeg(Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium - 100), 0, bulkMax)) * (menialSlaveValue + menialBulkPremium - 100)), "menialBioreactorsTransferA");
					} else if (FutureSocieties.isActive('FSDegradationist')) {
						V.fuckdolls += Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / ((menialSlaveValue + menialBulkPremium) * 2), 0, bulkMax));
						V.menialSupplyFactor -= Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / ((menialSlaveValue + menialBulkPremium) * 2), 0, bulkMax));
						cashX(forceNeg(Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / ((menialSlaveValue + menialBulkPremium) * 2), 0, bulkMax)) * ((menialSlaveValue + menialBulkPremium) * 2)), "fuckdollsTransferA");
					} else {
						V.menials += Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium), 0, bulkMax));
						V.menialSupplyFactor -= Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium), 0, bulkMax));
						cashX(forceNeg(Math.trunc(Math.clamp((V.cash - V.assistant.market.limit) / (menialSlaveValue + menialBulkPremium), 0, bulkMax) * (menialSlaveValue + menialBulkPremium))), "menialTransferA");
					}
				}
			}
		} else if (menialSlaveValue >= 1100 - V.assistant.market.aggressiveness) { /* SELL */
			if (V.menials + V.fuckdolls + V.menialBioreactors > 0) {
				r.push(`${HeM} liquidates your chattel holdings, since it's a sellers' market.`);
			}
			let cost;
			if (V.menials > 0) {
				cost = V.menials * (menialSlaveCost(-V.menials));
				V.menialDemandFactor -= V.menials;
				V.menials = 0;
				cashX(cost, "menialTransferA");
			}
			if (V.fuckdolls > 0) {
				cost = V.fuckdolls * (menialSlaveCost(-V.fuckdolls) * 2);
				V.menialDemandFactor -= V.fuckdolls;
				V.fuckdolls = 0;
				cashX(cost, "fuckdollsTransferA");
			}
			if (V.menialBioreactors > 0) {
				cost = V.menialBioreactors * (menialSlaveCost(-V.menialBioreactors) - 100);
				V.menialDemandFactor -= V.menialBioreactors;
				V.menialBioreactors = 0;
				cashX(cost, "menialBioreactorsTransferA");
			}
		} else {
			r.push(`Prices are average, so ${heM} does not make any significant moves.`);
		}
		App.Events.addParagraph(el, r);
		r = [];
	}

	const food = document.createElement("span");
	food.id = "food";
	if (V.mods.food.enabled && V.mods.food.market) {
		food.append(App.UI.foodReport());
	}
	el.append(food);

	App.Events.addNode(el, r);
	return el;

	function fsImpact() {
		const el = new DocumentFragment();
		const r = [];

		if (FutureSocieties.isActive('FSSupremacist')) {
			FSScore += Math.min(V.arcologies[0].FSSupremacist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * -80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * -0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * -16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSupremacist, 100) / 20) * 0.004;
			r.push(`Your racial policies are concentrating power in the hands of ${V.arcologies[0].FSSupremacistRace} people.`); /* perhaps too obvious to bother with printing? */
		}
		if (FutureSocieties.isActive('FSSubjugationist')) {
			FSScore += Math.min(V.arcologies[0].FSSubjugationist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * -80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * -0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * -16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSubjugationist, 100) / 20) * 0.004;
			r.push(`Your racial policies are stripping all power from the ${V.arcologies[0].FSSubjugationistRace} people.`); /* perhaps too obvious to bother with printing? */
		}
		if (FutureSocieties.isActive('FSGenderRadicalist')) {
			FSScore += Math.min(V.arcologies[0].FSGenderRadicalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20) * 0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20) * -40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20) * -0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20);
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderRadicalist, 100) / 20) * 0.002;
			r.push(`Your radical views on gender are scaring away the more traditionally minded.`);
		}
		if (FutureSocieties.isActive('FSGenderFundamentalist')) {
			FSScore += Math.min(V.arcologies[0].FSGenderFundamentalist, 100);
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSGenderFundamentalist, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderFundamentalist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSGenderFundamentalist, 100) / 20) * -1;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSGenderFundamentalist, 100) / 20) * -0.002;
			r.push(`Your traditional views on gender are comforting to many, unimaginative to some.`);
		}
		if (FutureSocieties.isActive('FSPaternalist')) {
			FSScore += Math.min(V.arcologies[0].FSPaternalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.05;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.15;
			slaveProductivity += Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * 0.02;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * 80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * 0.004;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.1;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * 16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * 0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.002;
			r.push(`Poor citizens can rely on their better-off peers in ${V.arcologies[0].name}.`);
		}
		if (FutureSocieties.isActive('FSDegradationist')) {
			FSScore += Math.min(V.arcologies[0].FSDegradationist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.05;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.2;
			slaveProductivity += Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.01;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * -80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * -0.004;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.1;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * -16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSDegradationist, 100) / 20) * 0.004;
			r.push(`The arcology is a cutthroat place in which falling into slavery is very easy.`);
		}
		if (FutureSocieties.isActive('FSIntellectualDependency')) {
			FSScore += Math.min(V.arcologies[0].FSIntellectualDependency, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 0.03;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 0.04;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 20;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 0.002;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 10;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * 0.003;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * -3;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSIntellectualDependency, 100) / 20) * -0.020;
			r.push(`It's always a party in ${V.arcologies[0].name}, giving it a strong appeal to those unable to host such an event.`);
		}
		if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
			FSScore += Math.min(V.arcologies[0].FSSlaveProfessionalism, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * -0.1;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * -0.125;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * -20;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSSlaveProfessionalism, 100) / 20) * 0.001;
			r.push(`The intelligent atmosphere of ${V.arcologies[0].name} makes it an attractive place for those with the brains to define their place in the world.`);
		}
		if (FutureSocieties.isActive('FSBodyPurist')) {
			FSScore += Math.min(V.arcologies[0].FSBodyPurist, 100);
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * 0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * -2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * -0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * -0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * -0.001;
			r.push(`Body purist fashion standards comfort the poor as they stand out less from their more fortunate neighbors.`);
		}
		if (FutureSocieties.isActive('FSTransformationFetishist')) {
			FSScore += Math.min(V.arcologies[0].FSTransformationFetishist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * -40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSTransformationFetishist, 100) / 20) * 0.001;
			r.push(`The lower class fear the kind of transformations could be forced on them if they ever end up enslaved, whereas the rich enjoy wielding such power.`);
		}
		if (FutureSocieties.isActive('FSYouthPreferentialist')) {
			FSScore += Math.min(V.arcologies[0].FSYouthPreferentialist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * 0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * 0.002;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * -8;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSYouthPreferentialist, 100) / 20) * -0.002;
			r.push(`Preference for youth makes the young poor in your arcology feel appreciated despite their lack of wealth.`);
		}
		if (FutureSocieties.isActive('FSMaturityPreferentialist')) {
			FSScore += Math.min(V.arcologies[0].FSMaturityPreferentialist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * 0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * -40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * -0.002;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * 8;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSMaturityPreferentialist, 100) / 20) * 0.002;
			r.push(`Preference for maturity makes the middle class of your arcology feel like their experience is finally properly appreciated.`);
		}
		if (FutureSocieties.isActive('FSPetiteAdmiration')) {
			FSScore += Math.min(V.arcologies[0].FSPetiteAdmiration, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPetiteAdmiration, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPetiteAdmiration, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSStatuesqueGlorification')) {
			FSScore += Math.min(V.arcologies[0].FSStatuesqueGlorification, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSStatuesqueGlorification, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSStatuesqueGlorification, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
			FSScore += Math.min(V.arcologies[0].FSSlimnessEnthusiast, 100);
		}
		if (FutureSocieties.isActive('FSAssetExpansionist')) {
			FSScore += Math.min(V.arcologies[0].FSAssetExpansionist, 100);
			if (FutureSocieties.isActive('FSBodyPurist')) {
				expirationFS *= 1 + (Math.trunc(Math.min(V.arcologies[0].FSAssetExpansionist, 100) / 20) * 0.05) * (1 + (Math.trunc(Math.min(V.arcologies[0].FSBodyPurist, 100) / 20) * -0.1));
			} else {
				expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAssetExpansionist, 100) / 20) * 0.05;
			}
		}
		if (FutureSocieties.isActive('FSPastoralist')) {
			FSScore += Math.min(V.arcologies[0].FSPastoralist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.05;
			if (FutureSocieties.isActive('FSPaternalist')) {
				expirationFS *= 1 + (Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.05) * (1 + (Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.1));
			} else {
				expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.05;
			}
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * -80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * -0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPastoralist, 100) / 20) * 0.001;
			r.push(`The pastoralization of ${V.arcologies[0].name} spurs a whole industry around human produce.`);
		}
		if (FutureSocieties.isActive('FSPhysicalIdealist')) {
			FSScore += Math.min(V.arcologies[0].FSPhysicalIdealist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.025;
			slaveProductivity += Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.01;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * -40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSPhysicalIdealist, 100) / 20) * 0.001;
			r.push(`Fit slaves and citizens are more productive! However, your arcology's poor do not look forward to even more toil and sweat.`);
		}
		if (FutureSocieties.isActive('FSChattelReligionist')) {
			FSScore += Math.min(V.arcologies[0].FSChattelReligionist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * -40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChattelReligionist, 100) / 20) * 0.001;
			r.push(`Chattel Religionism helps some poor citizens see slavery as a spiritually pure fate.`);
		}
		if (FutureSocieties.isActive('FSRomanRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSRomanRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * 0.025;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * -0.1;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * -0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * 0.00;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20);
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRomanRevivalist, 100) / 20) * -0.002;
			r.push(`Your citizens take pride in looking after each other.`);
		}
		if (FutureSocieties.isActive('FSNeoImperialist')) {
			FSScore += Math.min(V.arcologies[0].FSNeoImperialist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.05;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.030;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * -0.06;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * -0.025;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * -20;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * -0.002;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.004;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.5;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNeoImperialist, 100) / 20) * 0.002;
			r.push(`Your new Imperium creates a staunchly hierarchical society, and while your elites and soldiers enjoy social prestige and luxury, the lower classes are often unhappy about being made to grovel.`);
		}
		if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSAntebellumRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.075;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.050;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * -15;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * -0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 20;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.005;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 2.7;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.001;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.025;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAntebellumRevivalist, 100) / 20) * 0.001;
			r.push(`Antebellum Revivalism prioritizes the wealthy while also encouraging a strong yeoman, or middle, class, but offers little assistance to the poor.`);
		}
		if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSEgyptianRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * 0.025;
			welfareFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * -0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20);
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEgyptianRevivalist, 100) / 20) * -0.002;
			r.push(`Egyptian Revivalism is benevolent in some ways, and charity is common here.`);
		}
		if (FutureSocieties.isActive('FSEdoRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSEdoRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEdoRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSEdoRevivalist, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSArabianRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSArabianRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSArabianRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSArabianRevivalist, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSChineseRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSChineseRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChineseRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSChineseRevivalist, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSAztecRevivalist')) {
			FSScore += Math.min(V.arcologies[0].FSAztecRevivalist, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAztecRevivalist, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSAztecRevivalist, 100) / 20) * 0.025;
		}
		if (FutureSocieties.isActive('FSNull')) {
			FSScore += Math.min(V.arcologies[0].FSNull, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -0.1;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -0.125;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * 400;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * 0.016;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * 64;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * 0.008;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -21.6;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -0.008;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -8;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSNull, 100) / 20) * -0.016;
			r.push(`Your arcology's vibrant, open culture helps everyone succeed, preventing many struggling citizens from falling into slavery.`);
		}
		if (FutureSocieties.isActive('FSRepopulationFocus')) {
			FSScore += Math.min(V.arcologies[0].FSRepopulationFocus, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.05;
			slaveProductivity += Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * -0.01;
			if (FutureSocieties.isActive('FSPaternalist')) {
				expirationFS *= 1 + (Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.05) * (1 + (Math.trunc(Math.min(V.arcologies[0].FSPaternalist, 100) / 20) * -0.1));
			} else {
				expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.05;
			}
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * 0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * -5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * -0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * -2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRepopulationFocus, 100) / 20) * -0.004;
			r.push(`You've made repopulation a priority and the less fortunate hope all these new children will make their lives easier in the future, but the wealthy are wary.`);
		}
		if (FutureSocieties.isActive('FSRestart')) {
			FSScore += Math.min(V.arcologies[0].FSRestart, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 0.04;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 0.05;
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * -80;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * -0.004;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * -16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 2;
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSRestart, 100) / 20) * 0.004;
			r.push(`Highly restricted breeding pleases the powerful, but the less fortunate may seek reproductive freedom elsewhere.`);
		}
		if (FutureSocieties.isActive('FSHedonisticDecadence')) {
			FSScore += Math.min(V.arcologies[0].FSHedonisticDecadence, 100);
			slaveDemandU *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 0.02;
			slaveDemandT *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 0.025;
			slaveProductivity += Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * -0.01;
			expirationFS *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 0.1; /* too high?*/
			lowerClass += Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 40;
			lowerClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 0.002;
			middleClass += Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * -16;
			middleClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * -0.002;
			upperClass += Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * -5.4;
			upperClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * -0.002;
			topClass += Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20);
			topClassP *= 1 + Math.trunc(Math.min(V.arcologies[0].FSHedonisticDecadence, 100) / 20) * 0.002;
			r.push(`Your citizens enjoy the pleasures of life to their fullest, but some prefer to earn these pleasures.`);
		}
		if (r.length > 0) {
			App.UI.DOM.appendNewElement("h3", el, "Future Societies");
		}
		App.Events.addNode(el, r);
		FSScore = FSScore / V.FSCreditCount;
		return el;
	}

	function policiesImpact() {
		const el = new DocumentFragment();
		const r = [];
		if (V.policies.retirement.menial2Citizen === 1) {
			slaveDemandU *= 0.8;
			slaveDemandT *= 0.75;
			slaveProductivity += 0.05;
			expirationFS *= 0.8;
			lowerClass += 200;
			lowerClassP *= 1.01;
			middleClass += 80;
			middleClassP *= 1.01;
			upperClass += -27;
			upperClassP *= 0.99;
			topClass += -5;
			topClassP *= 0.99;
		}
		if (V.policies.proRefugees === 1) {
			slaveDemandU *= 1.1;
			slaveDemandT *= 1.125;
			V.menialSupplyFactor += 1000; // actually a supply change, not a demand change...
			r.push(`Some refugees and desperate people filtered into the arcology during the week, increasing the supply of slaves.`);
		}
		if (V.policies.immigrationCash === 1) {
			lowerClass += 200;
			lowerClassP *= 1.01;
			middleClass += 40;
			middleClassP *= 1.005;
			upperClass += -13.5;
			upperClassP *= 0.995;
			topClass += -5;
			topClassP *= 0.99;
			r.push(`The rent promotion for new immigrants brings new citizens to the arcology.`);
		}
		if (V.policies.immigrationRep === 1) {
			lowerClass += 200;
			lowerClassP *= 1.01;
			middleClass += 40;
			middleClassP *= 1.005;
			upperClass += -13.5;
			upperClassP *= 0.995;
			topClass += -5;
			topClassP *= 0.99;
			r.push(`Your welcome program for new citizens helps encourage wealthy people from the old world to immigrate, but <span class="red">annoys some longstanding citizens.</span>`);
			repX(forceNeg(100), "policies");
		}
		if (V.policies.immigrationCash === -1) {
			lowerClass += -200;
			lowerClassP *= 0.99;
			middleClass += -40;
			middleClassP *= 0.995;
			upperClass += 13.5;
			upperClassP *= 1.005;
			topClass += 5;
			topClassP *= 1.01;
			const informationCash = random(500, 1500);
			cashX(informationCash, "policies");
			r.push(`You covertly <span class="yellowgreen">sell</span> the private information of potential arcology immigrants on the old world black market, making you ${cashFormat(informationCash)}.`);
		}
		if (V.policies.immigrationRep === -1) {
			lowerClass += -200;
			lowerClassP *= 0.99;
			middleClass += -40;
			middleClassP *= 0.995;
			upperClass += 13.5;
			upperClassP *= 1.005;
			topClass += 5;
			topClassP *= 1.01;
			r.push(`You allow citizens input on potential immigrants, a <span class="green">popular</span> program.`);
			repX(100, "policies");
		}
		if (V.policies.enslavementCash === 1) {
			slaveDemandU *= 1.1;
			slaveDemandT *= 1.125;
			lowerClass += -200;
			lowerClassP *= .99;
			topClass += 5;
			topClassP *= 1.01;
			const kickbackAmount = random(500, 1500);
			cashX(kickbackAmount, "policies");
			r.push(`You <span class="yellowgreen">take kickbacks</span> for ignoring enslavement of citizens, making you ${cashFormat(kickbackAmount)}.`);
		}
		if (V.policies.enslavementRep === 1) {
			slaveDemandU *= 1.1;
			slaveDemandT *= 1.125;
			lowerClass += -200;
			lowerClassP *= 0.99;
			topClass += 5;
			topClassP *= 1.01;
			r.push(`You <span class="green">make friends</span> by tacitly supporting enslavement of upstart citizens.`);
			repX(100, "policies");
		}
		if (V.policies.enslavementCash === -1) {
			slaveDemandU *= 0.9;
			slaveDemandT *= 0.875;
			lowerClass += 200;
			lowerClassP *= 1.02;
			topClass += -5;
			topClassP *= 0.98;
			r.push(`Your charity purse prevents a few citizens from falling into slavery.`);
		}
		if (V.policies.enslavementRep === -1) {
			slaveDemandU *= 0.9;
			slaveDemandT *= 0.875;
			lowerClass += 200;
			lowerClassP *= 1.01;
			topClass += -5;
			topClassP *= 0.99;
			r.push(`You use your personal influence to help struggling citizens.`);
			repX(forceNeg(100), "policies");
		}
		if (V.arcologies[0].FSSupremacistLawME === 1) {
			slaveDemandU *= 2.2;
			slaveDemandT *= 2.5;
			lowerClass += -400;
			lowerClassP *= 0.98;
			middleClass += -80;
			middleClassP *= 0.99;
			upperClass += 27;
			upperClassP *= 1.01;
			topClass += 10;
			topClassP *= 1.02;
			if (V.FSSupLawTrigger === 1) {
				const slavesSupLaw = Math.trunc((V.lowerClass + V.middleClass + V.upperClass) * 0.65);
				V.NPCSlaves += Math.trunc(slavesSupLaw * 0.7);
				V.menials += Math.trunc(slavesSupLaw * 0.2);
				V.lowerClass = Math.trunc(V.lowerClass * 0.35);
				V.middleClass = Math.trunc(V.middleClass * 0.35);
				V.upperClass = Math.trunc(V.upperClass * 0.35);
				V.FSSupLawTrigger = 2;
			}
		}
		if (V.arcologies[0].FSSubjugationistLawME === 1) {
			slaveDemandU *= 1.24;
			slaveDemandT *= 1.3;
			lowerClass += -200;
			lowerClassP *= 0.99;
			middleClass += -40;
			middleClassP *= 0.995;
			upperClass += 13.5;
			upperClassP *= 1.005;
			topClass += 5;
			topClassP *= 1.01;
			if (V.FSSubLawTrigger === 1) {
				const slavesSubLaw = Math.trunc((V.lowerClass + V.middleClass + V.upperClass) * 0.2);
				V.NPCSlaves += Math.trunc(slavesSubLaw * 0.7);
				V.menials += Math.trunc(slavesSubLaw * 0.2);
				V.lowerClass = Math.trunc(V.lowerClass * 0.8);
				V.middleClass = Math.trunc(V.middleClass * 0.8);
				V.upperClass = Math.trunc(V.upperClass * 0.8);
				V.FSSubLawTrigger = 2;
			}
		}
		if (V.arcologies[0].FSRepopulationFocusLaw === 1) {
			lowerClass += 100;
			lowerClassP *= 1.005;
			topClass += -2.5;
			topClassP *= 0.995;
			r.push(`The rent promotion for pregnant women attracts several gravid ladies and a few girls eager to become mothers to enroll as citizens in your arcology.`);
		}
		if (V.arcologies[0].FSRestartLaw === 1) {
			lowerClass += -100;
			lowerClassP *= 0.99;
			topClass += 2.5;
			topClassP *= 1.01;
			r.push(`Your sterilization program drives several disloyal citizens out of the arcology.`);
		}
		if (V.arcologies[0].FSHedonisticDecadenceLaw === 1) {
			middleClass += 80;
			middleClassP *= 1.01;
		}
		if (V.arcologies[0].FSDegradationistLaw === 1) {
			slaveProductivity += -0.05;
		}
		if (V.arcologies[0].FSPaternalistLaw === 1) {
			slaveDemandU *= 0.9;
			slaveDemandT *= 0.875;
			upperClass += -13.5;
			upperClassP *= 1.005;
			topClass += -2.5;
			topClassP *= 1.005;
		}
		if (V.arcologies[0].FSYouthPreferentialistLaw === 1) {
			lowerClass += 200;
			lowerClassP *= 1.01;
			middleClass += -80;
			middleClassP *= 0.99;
		}
		if (V.arcologies[0].FSMaturityPreferentialistLaw === 1) {
			lowerClass += -200;
			lowerClassP *= 0.99;
			middleClass += 80;
			middleClassP *= 1.01;
		}
		if (V.arcologies[0].FSPetiteAdmirationLaw === 1) {
			lowerClass += -200;
			lowerClassP *= 0.99;
			middleClass += 80;
			middleClassP *= 1.01;
		}
		if (V.arcologies[0].FSStatuesqueGlorificationLaw === 1) {
			lowerClass += -400;
			lowerClassP *= 0.95;
			middleClass += 40;
			middleClassP *= 1.01;
			upperClass += -10;
			upperClassP *= .99;
		}
		if (V.arcologies[0].FSIntellectualDependencyLaw === 1) {
			slaveDemandU *= 1.24;
			slaveDemandT *= 1.3;
			lowerClass += -50;
			lowerClassP *= 0.90;
			middleClass += -40;
			middleClassP *= 0.90;
			upperClass += -1;
			upperClassP *= .99;
		}
		if (V.arcologies[0].FSSlaveProfessionalismLaw === 1) {
			slaveDemandU *= 1.4;
			slaveDemandT *= 1.5;
			lowerClass += -300;
			lowerClassP *= 0.95;
			middleClass += -40;
			middleClassP *= 0.995;
			upperClass += -5;
			upperClassP *= .99;
			topClass += 7;
			topClassP *= 1.05;
			if (V.FSSlaveProfLawTrigger === 1) {
				V.lowerClass = Math.trunc(V.lowerClass * 0.8);
				V.middleClass = Math.trunc(V.middleClass * 0.8);
				V.upperClass = Math.trunc(V.upperClass * 0.8);
				V.FSSlaveProfLawTrigger = 2;
			}
		}
		if (V.arcologies[0].FSChattelReligionistCreed === 1) {
			if (V.nicaea.focus === "slaves") {
				slaveDemandU *= 1 + V.nicaea.power * -0.05;
				slaveDemandT *= 1 + V.nicaea.power * -0.0625;
				slaveProductivity += V.nicaea.power * 0.025;
				expirationFS *= 1 + V.nicaea.power * -0.125;
				lowerClass += V.nicaea.power * 100;
				lowerClassP *= 1 + V.nicaea.power * 0.005;
				topClass += V.nicaea.power * -2.5;
				topClassP *= 1 + V.nicaea.power * -0.005;
			} else if (V.nicaea.focus === "owners") {
				slaveDemandU *= 1 + V.nicaea.power * 0.05;
				slaveDemandT *= 1 + V.nicaea.power * 0.0625;
				lowerClass += V.nicaea.power * -100;
				lowerClassP *= 1 + V.nicaea.power * -0.005;
				middleClass += V.nicaea.power * -20;
				middleClassP *= 1 + V.nicaea.power * -0.0025;
				upperClass += V.nicaea.power * 6.75;
				upperClassP *= 1 + V.nicaea.power * 0.0025;
				topClass += V.nicaea.power * 2.5;
				topClassP *= 1 + V.nicaea.power * 0.005;
			}
			if (V.nicaea.assignment === Job.WHORE) {
				upperClass += V.nicaea.power * 6.75;
				upperClassP *= 1 + V.nicaea.power * 0.0025;
				topClass += V.nicaea.power * 1.25;
				topClassP *= 1 + V.nicaea.power * 0.0025;
			} else if (V.nicaea.assignment === Job.PUBLIC) {
				lowerClass += V.nicaea.power * 50;
				lowerClassP *= 1 + V.nicaea.power * 0.0025;
				middleClass += V.nicaea.power * 20;
				middleClassP *= 1 + V.nicaea.power * 0.0025;
			} else {
				slaveDemandU *= 1 + V.nicaea.power * 0.05;
				slaveDemandT *= 1 + V.nicaea.power * 0.0625;
				lowerClass += V.nicaea.power * -50;
				lowerClassP *= 1 + V.nicaea.power * -0.0025;
				middleClass += V.nicaea.power * -20;
				middleClassP *= 1 + V.nicaea.power * -0.0025;
				upperClass += V.nicaea.power * 13.5;
				upperClassP *= 1 + V.nicaea.power * 0.005;
				topClass += V.nicaea.power * 2.5;
				topClassP *= 1 + V.nicaea.power * 0.005;
			}
			if (V.nicaea.achievement === "slaves") {
				slaveDemandU *= 1 + V.nicaea.power * 0.2;
				slaveDemandT *= 1 + V.nicaea.power * 0.25;
				lowerClass += V.nicaea.power * -200;
				lowerClassP *= 1 + V.nicaea.power * -0.01;
			}
		}
		if (V.arcologies[0].FSAztecRevivalistLaw === 1) {
			lowerClass += 200;
			lowerClassP *= 1.01;
			middleClass += -40;
			middleClassP *= 0.995;
			upperClass += -13.5;
			upperClassP *= 0.995;
		}

		if (V.arcologies[0].FSAntebellumRevivalistLaw1 === 1) {
			middleClassP *= 1.50;
			upperClassP *= 1.25;
			topClassP *= 1.10;
		}

		if (r.length > 0) {
			App.UI.DOM.appendNewElement("h3", el, "Policies");
		}
		App.Events.addNode(el, r);
		return el;
	}

	function schools() {
		const el = document.createElement("p");
		for (const [SCH, schObj] of App.Data.misc.schools) {
			if (V[SCH].schoolPresent !== 1) {
				continue;
			}
			const r = [];
			r.push(`${capFirstChar(schObj.title)} has a`);
			if (V[SCH].schoolProsperity > 4) {
				r.push(`very prosperous`);
			} else if (V[SCH].schoolProsperity < -4) {
				r.push(`struggling`);
			} else {
				r.push(`thriving`);
			}
			r.push(`${schObj.branchName} in ${V.arcologies[0].name}.`);
			if (V[SCH].schoolProsperity >= 10) {
				switch (SCH) {
					case "GRI":
						r.push(`It is one of the finest research facilities in the world`);
						break;
					case "TFS":
						r.push(`They are one of the most renowned futa societies in the world`);
						break;
					case "HA":
						r.push(`It is one of the most famous schools in the world`);
						break;
					default:
						r.push(`It is one of the finest slave schools in the world`);
				}
				if (V.rep > 19000) {
					r.push(r.pop() + `.`);
				} else {
					r.push(r.pop() + `, <span class="green">improving your reputation.</span>`);
					repX(200, "policies");
				}
				V[SCH].subsidize = 0;
				V[SCH].schoolProsperity = 10;
			}
			if (V[SCH].subsidize === 1) {
				r.push(`You have a policy of subsidizing them.`);
				V[SCH].schoolProsperity++;
			} else if (V[SCH].subsidize === -1) {
				r.push(`You have a policy of covertly undermining them.`);
				V[SCH].schoolProsperity--;
			}
			App.Events.addNode(el, r, "div");
		}

		return el;
	}

	function isFrozen() {
		/* during bad weather and without appropriate upgrades, transport (including visitors and immigration/emigration) will be halted */
		let weatherFreeze = false;
		if (V.weatherToday.severity > 3) {
			if (V.secExpEnabled > 0 && V.SecExp.buildings.transportHub) {
				if (V.SecExp.buildings.transportHub.surfaceTransport < 4) {
					weatherFreeze = true;
				}
			} else if (V.antiWeatherFreeze < 2) {
				weatherFreeze = true;
			}
		} else if (V.weatherToday.severity > 2) {
			if (V.secExpEnabled > 0 && V.SecExp.buildings.transportHub) {
				if (V.SecExp.buildings.transportHub.surfaceTransport < 3) {
					weatherFreeze = true;
				}
			} else if (V.antiWeatherFreeze < 1) {
				weatherFreeze = true;
			}
		}
		if (weatherFreeze) {
			const warning = App.UI.DOM.combineNodes(`The terrible weather is `, App.UI.DOM.makeElement("span", `preventing people from entering or leaving`, ["red"]), ` your arcology. Improving your transport infrastructure will prevent this from happening.`);
			App.UI.DOM.appendNewElement("div", el, warning, ["note"]);
			V.weatherAwareness = 1;
		}
		return weatherFreeze;
	}

	function enslavement() {
		if (enslaved > 0) {
			const enslavedPC = Math.max(Math.trunc(enslaved / 4), 1);
			const enslavedNPC = enslaved - enslavedPC;
			V.menials += enslavedPC;
			V.NPCSlaves += enslavedNPC;
			if (enslaved > 1) {
				appendDiv(`In total <span class="green">${num(enslaved)} lower class citizens</span> were enslaved for failing to pay their debts.`);
				appendDiv(`<span class="green">You enslaved ${num(enslavedPC)}</span> of them while other debtholders in the arcology enslaved the remaining ${num(enslavedNPC)}.`);
			} else {
				appendDiv(`<span class="green">As arcology owner you claimed the slave.</span>`);
			}
		}
	}

	function processDemand(/** @type {boolean} */ isFrozen) {
		let transportHub = 1;
		let crime = 0.8;
		if (V.secExpEnabled > 0) {
			transportHub = 0.7;
			if (V.SecExp.buildings.transportHub) {
				transportHub += V.SecExp.buildings.transportHub.airport / 10 + V.SecExp.buildings.transportHub.surfaceTransport / 10;
			}
			crime = (100 - V.SecExp.core.crimeLow) / 100 + 0.2;
			const waterwayDamaged = App.Mods.SecExp.updateFacilityDamage("waterway");
			appendDiv(waterwayDamaged.text);
		}
		const terrainFactors = {
			urban: 1.2,
			rural: 1.0,
			marine: 1.0,
			ravine: 0.8,
			oceanic: 0.8
		};
		const terrain = terrainFactors[V.terrain] || 1.0;
		const honeymoon = 10 * V.arcologies[0].honeymoon;

		NaNCheck({FSScore, transportHub, crime, terrain, honeymoon, econMult}); // eslint-disable-line object-curly-newline

		if (isFrozen) {
			// no visitors when frozen, period
			V.visitors = 0;
		} else {
			V.visitors = Math.trunc(((V.arcologies[0].prosperity + FSScore * 5 + honeymoon) * transportHub * terrain * crime) * econMult);
			if (V.visitors < 50) {
				V.visitors = normalRandInt(50, 2);
			}
			appendDiv(`<span class="green">${num(V.visitors)} traders and tourists</span> visited your arcology this week.`);
			appendDiv(App.Mods.SecExp.propagandaEffects("enslavement").text);
			enslaved += App.Mods.SecExp.propagandaEffects("enslavement").effect;
		}

		/* Slaves getting retired - happens even when frozen */
		if (V.policies.retirement.menial2Citizen === 1) {
			let weeklyRetiredMenials = V.menials / ((V.customMenialRetirementAge - 15) * 52);
			let weeklyRetiredNPCMenials = V.NPCSlaves / ((V.customMenialRetirementAge - 15) * 52);
			/* This implies a minimum menial age of 15. Even if the player sets minimum ages lower, there's no point having a 3 year old menial slave. 15 seems alright while being nice and round. This also implies ages are distributed evenly, no easy way around that.*/
			if (weeklyRetiredMenials > 1) {
				weeklyRetiredMenials = Math.trunc(weeklyRetiredMenials);
				if (weeklyRetiredMenials > 1) {
					appendDiv(`<span class="red">${num(weeklyRetiredMenials)} of your menial slaves</span> retired as free citizens this week.`);
				} else {
					appendDiv(`<span class="red">One of your menial slaves</span> retired as a free citizen this week.`);
				}
			} else {
				weeklyRetiredMenials *= 100;
				if (weeklyRetiredMenials > random(1, 100)) {
					weeklyRetiredMenials = 1;
					appendDiv(`<span class="red">One of your menial slaves</span> retired as a free citizen this week.`);
				} else {
					weeklyRetiredMenials = 0;
				}
			}
			if (weeklyRetiredNPCMenials > 1) {
				weeklyRetiredNPCMenials = Math.trunc(weeklyRetiredNPCMenials);
				if (weeklyRetiredNPCMenials > 1) {
					appendDiv(`<span class="red">${num(weeklyRetiredNPCMenials)} menial slaves</span> were retired as free citizens by other slave owners in your arcology this week.`);
				} else {
					appendDiv(`<span class="red">One menial slave</span> was retired as a free citizen by another slave owner in your arcology this week.`);
				}
			} else {
				weeklyRetiredNPCMenials *= 100;
				if (weeklyRetiredNPCMenials > random(1, 100)) {
					weeklyRetiredNPCMenials = 1;
					appendDiv(`<span class="red">One menial slave</span> was retired as a free citizen by another slave owner in your arcology this week.`);
				} else {
					weeklyRetiredNPCMenials = 0;
				}
			}
			V.menials -= weeklyRetiredMenials;
			V.NPCSlaves -= weeklyRetiredNPCMenials;
			V.lowerClass += weeklyRetiredMenials + weeklyRetiredNPCMenials;
		}

		/* Demand for simple labor*/
		const LSCD = Math.trunc((V.LSCBase * econMult) + (V.arcologies[0].prosperity * 4) + ((V.middleClass + V.visitors * 0.6) * 1.5) + ((V.upperClass + V.visitors * 0.2) * 3.5) + (V.topClass * 18));
		/* Demand for owning slaves*/
		const SCD = Math.trunc((V.upperClass * (2 + slaveDemandU)) + (V.topClass * (12 + slaveDemandT)));
		NaNCheck({LSCD, SCD});
		const maxSlaveLabor = Math.trunc(LSCD / slaveProductivity);
		/* Slave import/export only if transport accessible */
		if (!isFrozen) {
			if (V.NPCSlaves > SCD * 1.6) {
				/* More slaves than they know what to do with*/
				const NPCSlavesSold = V.NPCSlaves - Math.trunc(SCD * 1.6);
				V.menialDemandFactor -= NPCSlavesSold;
				V.NPCSlaves = Math.trunc(SCD * 1.6);
				if (NPCSlavesSold > 1) {
					appendDiv(`<span class="red">${num(NPCSlavesSold)}</span> slaves were sold by your inhabitants. They've got more than enough of them already.`);
				} else if (NPCSlavesSold > 0) {
					appendDiv(`<span class="red">One slave</span> was sold by your inhabitants. They've got more than enough of them already.`);
				}
			} else if (V.NPCSlaves > maxSlaveLabor - V.menials + SCD) {
				/* More slaves than there is work*/
				const NPCSlavesSold = V.NPCSlaves - Math.trunc(maxSlaveLabor - V.menials + SCD);
				V.menialDemandFactor -= NPCSlavesSold;
				V.NPCSlaves = maxSlaveLabor - V.menials + SCD;
				if (NPCSlavesSold > 1) {
					appendDiv(`<span class="red">${num(NPCSlavesSold)}</span> slaves were sold by your inhabitants. There was so little work that they failed to earn their keep.`);
				} else if (NPCSlavesSold > 0) {
					appendDiv(`<span class="red">One slave</span> was sold by your inhabitants. There was so little work that it failed to earn its keep.`);
				}
			} else if (V.NPCSlaves > SCD * 1.4) {
				/* Cutting back on slaves*/
				if (V.slaveCostFactor > 0.95) {
					const NPCSlavesSold = Math.trunc((V.NPCSlaves - SCD) * 0.4);
					V.menialDemandFactor -= NPCSlavesSold;
					V.NPCSlaves -= NPCSlavesSold;
					if (NPCSlavesSold > 1) {
						appendDiv(`<span class="red">${num(NPCSlavesSold)}</span> slaves were sold by your inhabitants. They've got more than enough of them already.`);
					} else if (NPCSlavesSold > 0) {
						appendDiv(`<span class="red">One slave</span> was sold by your inhabitants. They've got more than enough of them already.`);
					}
				}
			} else if (V.NPCSlaves > SCD * 1.2) {
				/* Selling excess slaves for profit*/
				if (V.slaveCostFactor > 1.1) {
					const NPCSlavesSold = Math.trunc((V.NPCSlaves - SCD) * 0.4);
					V.menialDemandFactor -= NPCSlavesSold;
					V.NPCSlaves -= NPCSlavesSold;
					if (NPCSlavesSold > 1) {
						appendDiv(`<span class="red">${num(NPCSlavesSold)}</span> were sold by your inhabitants. They saw an opportunity for profit.`);
					} else if (NPCSlavesSold > 0) {
						appendDiv(`<span class="red">One slave</span> was sold by your inhabitants. They saw an opportunity for profit.`);
					}
				}
			}
			/* Buying slaves because they are really cheap*/
			if (V.slaveCostFactor < 0.8) {
				if (V.NPCSlaves < SCD * 1.5) {
					const NPCSlavesBought = Math.trunc(SCD * 0.05);
					V.menialSupplyFactor -= NPCSlavesBought;
					V.NPCSlaves += NPCSlavesBought;
					if (NPCSlavesBought > 1) {
						appendDiv(`<span class="green">${num(NPCSlavesBought)} slaves</span> were bought by your inhabitants. They were too cheap to pass up on.`);
					} /* there's no way this ever ends up needing a 1 slave version*/
				}
			}
		}

		/* Lower Class Citizens*/
		/* Work left for lower class citizens*/
		let LCD = Math.trunc(((V.LSCBase * econMult) + (V.arcologies[0].prosperity * 4) + lowerClass + ((V.middleClass + V.visitors * 0.6) * 1.5) + ((V.upperClass + V.visitors * 0.2) * 3.5) + (V.topClass * 18) - (V.NPCSlaves + V.menials) * slaveProductivity) * V.rentEffectL * lowerClassP);
		if (V.classSatisfied.lowerClass !== 0) {
			LCD *= 1 + V.classSatisfied.lowerClass * 0.06;
		}
		NaNCheck({LCD});
		LCD = Math.max(LCD, 0);
		/* Changing population depending on work available, if transport is accessible */
		if (!isFrozen) {
			if (V.classSatisfied.lowerClass < 0) {
				appendDiv(`Your lower class is <span class="red">sexually frustrated</span> and would rather live elsewhere.`);
			} else if (V.classSatisfied.lowerClass > 0) {
				appendDiv(`Your lower class is <span class="green">sexually satiated</span> and their happiness attracts others.`);
			}
			r = [];
			if (V.lowerClass < LCD) {
				let LCImmigration = Math.trunc((LCD - V.lowerClass) * (0.3 * terrain)) + 1 + secExpImmigrationBonus.effect;
				if (V.arcologies[0].FSIntellectualDependencyLaw === 1) { /* Enslaving the dumb lower class immigrants*/
					const intellectualDependencyEnslaved = Math.trunc(LCImmigration * 0.25);
					LCImmigration -= intellectualDependencyEnslaved;
					enslaved += intellectualDependencyEnslaved;
					r.push(`<span class="green">${capFirstChar(num(intellectualDependencyEnslaved))} dumb immigrants</span> were enslaved for their own good.`);
				}

				V.lowerClass += LCImmigration;
				if (LCImmigration > 1) {
					r.push(`<span class="green">${capFirstChar(num(LCImmigration))} lower class citizens</span> moved to your arcology.`);
				} else if (LCImmigration > 0) {
					r.push(`<span class="green">One lower class citizen</span> moved to your arcology.`);
				}
			} else if (V.lowerClass > LCD) {
				const LCEmigration = Math.trunc((V.lowerClass - LCD) * 0.4);
				const enslaveChance = 0.2;
				const enslavedEmigrants = Math.trunc(LCEmigration * enslaveChance * (1.0 - getBanishRatio()));
				V.lowerClass -= LCEmigration;
				enslaved += enslavedEmigrants;
				if (LCEmigration > 1) {
					r.push(`<span class="red">${capFirstChar(num(LCEmigration))} lower class citizens</span> had no work and tried to leave your arcology.`);
					if (enslavedEmigrants > 1) {
						r.push(`<span class="green">${capFirstChar(num(enslavedEmigrants))} of them were enslaved instead.</span>`);
					} else if (enslavedEmigrants > 0) {
						r.push(`<span class="green">One of them was enslaved instead.</span>`);
					}
				} else if (LCEmigration > 0) {
					r.push(`<span class="red">One lower class citizen</span> left your arcology due to a lack of work.`);
				}
			}
			App.Events.addNode(el, r, "div");
		}

		enslavement();
		if (!isFrozen) {
			/* Import more slaves if they're still needed after enslavement */
			if (V.NPCSlaves < SCD) {
				const NPCSlavesBought = Math.trunc((SCD - V.NPCSlaves) * 0.75) + 1;
				V.menialSupplyFactor -= NPCSlavesBought;
				V.NPCSlaves += NPCSlavesBought;
				if (NPCSlavesBought > 1) {
					appendDiv(`<span class="green">${capFirstChar(num(NPCSlavesBought))} slaves</span> were bought by your inhabitants. They did not have enough of them to satisfy their needs.`);
				} else if (NPCSlavesBought > 0) {
					appendDiv(`<span class="green">One slave</span> was bought by your inhabitants. They did not quite have enough of them to satisfy their needs.`);
				}
			}
		}

		/* Middle Class Citizens*/
		/* Demand for Middle Class*/
		let MCD = Math.trunc(((V.MCBase * econMult) + V.arcologies[0].prosperity + middleClass + (V.NPCSlaves * 0.15) + (V.lowerClass * 0.1) + ((V.upperClass + V.visitors * 0.2) * 0.5) + (V.topClass * 2.5)) * V.rentEffectM * middleClassP);
		if (V.classSatisfied.middleClass !== 0) {
			MCD *= 1 + V.classSatisfied.middleClass * 0.06;
		}
		NaNCheck({MCD});
		MCD = Math.max(MCD, 200);
		if (!isFrozen) {
			if (V.classSatisfied.middleClass < 0) {
				appendDiv(`Your middle class is <span class="red">sexually frustrated</span> and would rather live elsewhere.`);
			} else if (V.classSatisfied.middleClass > 0) {
				appendDiv(`Your middle class is <span class="green">sexually satiated</span> and their happiness attracts others.`);
			}
			if (V.middleClass < MCD) {
				/* Middle Class Citizens immigrating */
				const MCImmigration = Math.trunc((MCD - V.middleClass) * (0.3 * terrain)) + 1 + secExpImmigrationBonus.effect;
				V.middleClass += MCImmigration;
				if (MCImmigration > 1) {
					appendDiv(`<span class="green">${capFirstChar(num(MCImmigration))} middle class citizens</span> moved to your arcology.`);
				} else if (MCImmigration > 0) {
					appendDiv(`<span class="green">One middle class citizen</span> moved to your arcology.`);
				}
			} else if (V.middleClass > MCD) {
				/* Middle Class Citizens emigrating*/
				const MCEmigration = Math.trunc((V.middleClass - MCD) * 0.4);
				V.middleClass -= MCEmigration;
				if (MCEmigration > 1) {
					appendDiv(`<span class="red">${capFirstChar(num(MCEmigration))} middle class citizens</span> left your arcology.`);
				} else if (MCEmigration > 0) {
					appendDiv(`<span class="red">One middle class citizen</span> left your arcology.`);
				}
			}
		}

		/* Upper Class Citizens*/
		/* Demand for Upper Class*/
		let UCD = Math.trunc(((V.UCBase * econMult) + (V.arcologies[0].prosperity * 0.2) + upperClass + (V.NPCSlaves * 0.02) + (V.lowerClass * 0.025) + ((V.middleClass + V.visitors * 0.6) * 0.05) + (V.topClass * 0.3)) * V.rentEffectU * upperClassP);
		if (V.classSatisfied.upperClass !== 0) {
			UCD *= 1 + V.classSatisfied.upperClass * 0.06;
		}
		NaNCheck({UCD});
		UCD = Math.max(UCD, 50);
		if (!isFrozen) {
			if (V.classSatisfied.upperClass < 0) {
				appendDiv(`Your upper class is <span class="red">sexually frustrated</span> and would rather live elsewhere.`);
			} else if (V.classSatisfied.upperClass > 0) {
				appendDiv(`Your upper class is <span class="green">sexually satiated</span> and their happiness attracts others.`);
			}
			if (V.upperClass < UCD) {
				/* Upper Class Citizens immigrating*/
				const UCImmigration = Math.trunc((UCD - V.upperClass) * (0.3 * terrain)) + 1 + secExpImmigrationBonus.effect;
				V.upperClass += UCImmigration;
				if (UCImmigration > 1) {
					appendDiv(`<span class="green">${capFirstChar(num(UCImmigration))} upper class citizens</span> moved to your arcology.`);
				} else if (UCImmigration > 0) {
					appendDiv(`<span class="green">One upper class citizen</span> moved to your arcology.`);
				}
			} else if (V.upperClass > UCD) {
				/* Upper Class Citizens Emigrating*/
				const UCEmigration = Math.trunc((V.upperClass - UCD) * 0.4);
				V.upperClass -= UCEmigration;
				if (UCEmigration > 1) {
					appendDiv(`<span class="red">${capFirstChar(num(UCEmigration))} upper class citizens</span> left your arcology.`);
				} else if (UCEmigration > 0) {
					appendDiv(`<span class="red">One upper class citizen</span> left your arcology.`);
				}
			}
		}

		/* Top Class Citizens*/
		/* Top Class Interest in living in your arcology*/
		let TCD = Math.trunc((V.GDP / 15 + topClass) * V.rentEffectT * topClassP + V.TCBase);
		if (V.eliteFailTimer > 0) {
			/* when you fail the eugenics Elite and they leave this triggers*/
			TCD -= Math.trunc(V.eliteFail / 15 * V.eliteFailTimer);
			V.eliteFailTimer--;
		}
		if (V.classSatisfied.topClass !== 0) {
			TCD *= 1 + V.classSatisfied.topClass * 0.06;
		}
		NaNCheck({TCD});
		TCD = Math.max(TCD, 15);
		if (!isFrozen) {
			if (V.classSatisfied.topClass < 0) {
				appendDiv(`Your millionaires are <span class="red">sexually frustrated</span> and would rather live elsewhere.`);
			} else if (V.classSatisfied.topClass > 0) {
				appendDiv(`Your millionaires are <span class="green">sexually satiated</span> and their happiness attracts others.`);
			}
			if (V.topClass < TCD) {
				/* Top Class Citizens immigrating*/
				const TCImmigration = Math.trunc((TCD - V.topClass) * (0.3 * terrain)) + 1 + secExpImmigrationBonus.effect;
				V.topClass += TCImmigration;
				if (TCImmigration > 1) {
					appendDiv(`<span class="green">${capFirstChar(num(TCImmigration))} millionaires</span> moved to your arcology.`); /* Fat Cat? One-Percenter? */
				} else if (TCImmigration > 0) {
					appendDiv(`<span class="green">One millionaire</span> moved to your arcology.`);
				}
			} else if (V.topClass > TCD) {
				/* Top Class Citizens emigrating*/
				const TCEmigration = Math.trunc((V.topClass - TCD) * 0.4) + 1;
				V.topClass -= TCEmigration;
				if (TCEmigration > 1) {
					appendDiv(`<span class="red">${capFirstChar(num(TCEmigration))} millionaires</span> left your arcology.`);
				} else if (TCEmigration > 0) {
					appendDiv(`<span class="red">One millionaire</span> left your arcology.`);
				}
			}
		}

		/* report SecExp bonuses if transport is available */
		if (!isFrozen) {
			appendDiv(secExpImmigrationBonus.text);
		}

		/* show calculation breakdown for debug/cheat */
		if (V.cheatMode === 1 || V.debugMode === 1) {
			const table = App.UI.DOM.appendNewElement("table", el);
			App.UI.DOM.makeRow(table, `${V.arcologies[0].prosperity} Prosperity`, `${FSScore} FS Score`, `${honeymoon} Honeymoon`, `${transportHub} Transporthub`, `${terrain} Terrain`, `${crime} Crime`);
			App.UI.DOM.makeRow(table, `${LSCD.toFixed(1)} Lower + Slave Class Demand`, `${SCD.toFixed(1)} Slave Class Demand`, `${slaveProductivity.toFixed(1)} Slave Productivity`);
			App.UI.DOM.makeRow(table, `${LCD.toFixed(1)} Lower Class Demand`, `${lowerClassP.toFixed(1)} LC Multiplier`);
			App.UI.DOM.makeRow(table, `${MCD.toFixed(1)} Middle Class Demand`, `${middleClassP.toFixed(1)} MC Multiplier`);
			App.UI.DOM.makeRow(table, `${UCD.toFixed(1)} Upper Class Demand`, `${upperClassP.toFixed(1)} UC Multiplier`);
			App.UI.DOM.makeRow(table, `${TCD.toFixed(1)} Top Class Demand`, `${topClassP.toFixed(1)} TC Multiplier`);
		}

		return Math.trunc(maxSlaveLabor - SCD);
	}

	function slaveRetirement() {
		const el = new DocumentFragment();
		const r = [];
		/* Slave retirement trigger pulled (one time only)*/
		if (V.citizenRetirementTrigger === 1) {
			let citizenRetirementImpact;
			if (V.customMenialRetirementAge >= 65) {
				citizenRetirementImpact = 0.475 - Math.clamp(V.customMenialRetirementAge / 200, 0.325, 0.475);
			} else {
				citizenRetirementImpact = 0.9 - Math.clamp(V.customMenialRetirementAge / 100, 0.2, 0.65);
			}
			if (V.arcologies[0].FSSupremacistLawME + V.arcologies[0].FSSubjugationistLawME > 0) {
				citizenRetirementImpact *= 2 / 3;
			}
			V.lowerClass += Math.trunc((V.NPCSlaves + V.menials) * (0.05 + citizenRetirementImpact));
			const menialsRetirement = Math.trunc(V.menials * (0.05 + citizenRetirementImpact));
			V.menials = Math.trunc(V.menials * (0.95 - citizenRetirementImpact));
			const ASlavesRetirement = Math.trunc(V.NPCSlaves * (0.05 + citizenRetirementImpact));
			V.NPCSlaves = Math.trunc(V.NPCSlaves * (0.95 - citizenRetirementImpact));
			V.citizenRetirementTrigger = 2;
			r.push(`You have enacted citizen retirement, the slaves of eligible age are granted freedom.`);
			if (menialsRetirement > 1) {
				r.push(`<span class="red">${num(menialsRetirement)} of your menial slaves</span> were retired.`);
			} else if (menialsRetirement > 0) {
				r.push(`<span class="red">One of your menial slaves</span> was retired.`);
			}
			if (ASlavesRetirement > 1) {
				r.push(`<span class="red">${num(ASlavesRetirement)} slaves</span> in your arcology were given a citizen retirement.`);
			}
			/* I could bother with a single slave retirement message, but that's never going to get used*/
		}
		App.Events.addNode(el, r);
		return el;
	}

	function expiration() {
		const el = document.createElement("div");
		const r = [];
		/* Citizen expiration */
		let z = [];
		const deathsLC = Math.trunc(V.lowerClass * expirationLC);
		const deathsMC = Math.trunc(V.middleClass * expirationMC);
		const deathsUC = Math.trunc(V.upperClass * expirationUC);
		const deathsTC = Math.trunc(V.topClass * expirationTC);
		V.lowerClass -= deathsLC;
		V.middleClass -= deathsMC;
		V.upperClass -= deathsUC;
		V.topClass -= deathsTC;
		if (deathsLC > 0) {
			z.push(numberWithPluralOne(deathsLC, "lower class citizen"));
		}
		if (deathsMC > 0) {
			z.push(numberWithPluralOne(deathsMC, "middle class citizen"));
		}
		if (deathsUC > 0) {
			z.push(numberWithPluralOne(deathsUC, "upper class citizen"));
		}
		if (deathsTC > 0) {
			z.push(numberWithPluralOne(deathsTC, "millionaire"));
		}
		if (deathsLC > 0 || deathsMC > 0 || deathsUC > 0 || deathsTC > 0) {
			r.push(App.UI.DOM.makeElement("span", `${capFirstChar(toSentence(z))} passed away due to natural causes.`, ["red"]));
		}

		/* Slave expiration*/
		const expirationPC = Math.trunc(V.menials * expirationFS);
		const expirationFD = Math.trunc(V.fuckdolls * expirationFS);
		const expirationBR = Math.trunc(V.menialBioreactors * expirationFS);
		const expirationNPC = Math.trunc(V.NPCSlaves * expirationFS);
		const expiration = expirationPC + expirationNPC + expirationFD + expirationBR;
		V.NPCSlaves -= expirationNPC;
		V.menials -= expirationPC;
		V.fuckdolls -= expirationFD;
		V.menialBioreactors -= expirationBR;
		if (expiration > 0) {
			if (expirationFS <= 0.5) {
				r.push(`<span class="red">${capFirstChar(numberWithPluralOne(expiration, "slave"))} passed away</span> due to natural causes.`);
			} else {
				r.push(`<span class="red">${capFirstChar(numberWithPluralOne(expiration, "slave"))} died</span> due to the tough working conditions in your arcology.`);
			}
			if (expirationPC > 1) {
				r.push(`Of which <span class="red">${num(expirationPC)} were yours.</span>`);
			} else if (expirationPC > 0) {
				r.push(`<span class="red">One of them was yours.</span>`);
			}
		}

		App.Events.addNode(el, r);
		return el;
	}

	function denseApartments() {
		/* increases lowerclass attraction based on number of dense apartments */
		let r = [];
		let count = 0;
		V.building.findCells(cell => !(cell instanceof App.Arcology.Cell.Penthouse))
			.forEach(cell => {
				if (cell instanceof App.Arcology.Cell.Apartment) {
					if (cell.type === 3) {
						count++;
						lowerClass += 40;
					}
				}
			});
		if (count > 9) {
			r.push(App.UI.DOM.makeElement("span", `A great amount of lower class citizens`, ["green"]));
			r.push(`were attracted by the sectors filled with dense apartments.`);
		} else if (count > 5) {
			r.push(App.UI.DOM.makeElement("span", `A large amount of lower class citizens`, ["green"]));
			r.push(`were attracted by your sprawling blocks of dense apartments.`);
		} else if (count > 2) {
			r.push(App.UI.DOM.makeElement("span", `A moderate amount of lower class citizens`, ["green"]));
			r.push(`were attracted by your dense apartment complexes`);
		} else if (count > 0) {
			r.push(App.UI.DOM.makeElement("span", `A small amount of lower class citizens`, ["green"]));
			r.push(`were attracted by your dense apartments.`);
		}
		return r;
	}

	function getBanishRatio() {
		/* Some proportion of newly-enslaved citizens might instead be banished, if you don't keep old menials.
		 * This should probably use an actuarial age distribution instead of this piecewise function. */
		let banishedRatio = 0.0;
		if (V.policies.retirement.menial2Citizen === 1) {
			if (V.customMenialRetirementAge >= 65) {
				banishedRatio = 0.475 - Math.clamp(V.customMenialRetirementAge / 200, 0.325, 0.475);
			} else {
				banishedRatio = 0.9 - Math.clamp(V.customMenialRetirementAge / 100, 0.2, 0.65);
			}
			if (V.arcologies[0].FSSupremacistLawME + V.arcologies[0].FSSubjugationistLawME > 0) {
				banishedRatio *= 2 / 3;
			}
			banishedRatio += 0.05; // not sure what the extra 5% is for...
		}
		return banishedRatio;
	}

	function citizenToSlave() {
		/* Citizens turning into slaves, or being banished because they can't be */
		const banished = Math.trunc((V.lowerClass * welfareFS) * getBanishRatio());
		enslaved = Math.trunc(V.lowerClass * welfareFS) - banished;
		V.lowerClass -= (enslaved + banished);
		if (banished > 0) {
			appendDiv(`<span class="red">${banished} citizens were banished</span> from your arcology; they committed enslavable offenses, but were too old to be enslaved.`);
		}
	}

	function appendDiv(/** @type {string} */ text) {
		const div = document.createElement("div");
		$(div).append(text);
		el.append(div);
	}

	function NaNCheck(/** @type {object} */ obj) {
		for (const n of Object.values(obj)) {
			if (isNaN(n)) {
				throw new Error(`Economy encountered unexpected NaN: ${JSON.stringify(obj)}.`);
			}
		}
	}
};
