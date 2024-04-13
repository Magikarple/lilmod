/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.SlaveAssignment.workTheFarm = function(slave) {
	const frag = document.createDocumentFragment();

	const {he, him, his, He} = getPronouns(slave);
	const incomeStats = getSlaveStatisticData(slave, V.facility.farmyard);

	/** @type {FC.SexualQuirk[]} */
	const sexualQuirks = [SexualQuirk.PERVERT, SexualQuirk.UNFLINCHING];
	/** @type {FC.BehavioralQuirk[]} */
	const behavioralQuirks = [BehavioralQuirk.SINFUL];
	/** @type {FC.Fetish[]} */
	const fetishes = [Fetish.HUMILIATION, Fetish.MASOCHIST, Fetish.BESTIALITY];

	const slaveApproves = sexualQuirks.includes(slave.sexualQuirk) ||
		behavioralQuirks.includes(slave.behavioralQuirk) ||
		fetishes.includes(slave.fetish);

	const foodAmount = Math.trunc(App.Facilities.Farmyard.foodAmount(slave));

	const intro = `${He} works in ${V.farmyardName} this week.`;

	fullReport();

	return frag;

	function fullReport() {
		const text = new SpacedTextAccumulator(frag);

		text.push(
			intro,

			food(),
			shows(),
			longTermEffects(),
			results(),
			slaveVignettes(),
		);

		return text.toChildren();
	}

	function food() {
		if (V.mods.food.market && V.farmyardShows < 2) {
			const fsGain = 0.0001 * foodAmount;

			FutureSocieties.DecorationBonus(V.farmyardDecoration, fsGain);
			V.mods.food.amount += foodAmount;
			V.mods.food.produced += foodAmount;
			V.mods.food.total += foodAmount;
			incomeStats.food += foodAmount;

			if (V.farmyardShows !== 2) {
				return App.Facilities.Farmyard.produceFood(slave);
			}
		}
	}

	function shows() {
		if (V.farmyardShows > 0) {
			cashX(App.Facilities.Farmyard.farmShowsIncome(slave), "slaveAssignmentFarmyard", slave);

			return App.Facilities.Farmyard.putOnShows(slave);
		}
	}

	function longTermEffects() {
		const {canine, hooved, feline} = V.animals;
		const largeAnimals = [
			...canine
				.map(c => getAnimal(c))
				.filter(c => c.dick.size > 3),
			...hooved
				.map(h => getAnimal(h))
				.filter(h => h.dick.size > 3),
			...feline
				.map(f => getAnimal(f))
				.filter(f => f.dick.size > 3),
		];

		if (V.farmyardShows > 0) {
			if (V.seeBestiality) {
				if (slave.sexualQuirk !== SexualQuirk.SIZEQUEEN && random(100) > 95 && largeAnimals.length > 0) {
					slave.sexualQuirk = SexualQuirk.SIZEQUEEN;

					return `After taking rough pounding after rough pounding from dicks that would put all but the most well-endowed pornstars to shame, normal-sized cocks just don't feel quite the same to ${slave.slaveName}. <span class="flaw break">${He}'s become a bit of a size queen.</span>`;
				}
				if (slave.fetishKnown && slaveApproves) {
					slave.devotion += 1;

					return `Getting fucked by animals is the perfect job for ${him}, as far as ${he} can tell. <span class="devotion inc">${He} is happy</span> to spend ${his} days being utterly degraded.`;
				} else if (slave.fetish === Fetish.NONE ||
					(slave.fetish !== Fetish.BESTIALITY && slave.fetishStrength < 75) &&
					slaveApproves) {
					if (random(100) < 10) {
						slave.need = 0;
						slave.devotion += 5;
						fetishChange(slave, Fetish.BESTIALITY);

						return `${He} seems to have <span class="devotion inc">really taken to</span> getting fucked by animals <span class="fetish gain">– ${he} has a bestiality fetish!</span>`;
					}
				} else if (slave.energy > 95) {
					slave.need = 0;
					slave.devotion += 5;

					return `${He}'s so perpetually horny that any sex, even coming from an animal, <span class="devotion inc">satisfies ${him}.</span>`;
				}
			} else {
				if (slave.fetishKnown && slaveApproves) {
					slave.devotion += 2;

					return `${He} loves putting on shows with animals, and as far as ${he} can tell, it's the perfect job for ${him}. It isn't as degrading as ${he} would like, but <span class="devotion inc">${he} is happy nonetheless.</span>`;
				}
			}
		}
	}

	function results() {
		const text = [];

		text.push(`All said and done,`);

		if (foodAmount) {
			text.push(`${he} produces <span class="chocolate">${massFormat(foodAmount)}</span> of food`);
		}

		if (V.farmyardShows > 0) {
			if (foodAmount) {
				text.push(`and`);
			} else {
				text.push(`${he}`);
			}

			text.push(`earns <span class="cash inc">${cashFormat(Math.trunc(App.Facilities.Farmyard.farmShowsIncome(slave)))}</span> during the week`);
		}

		text.push(text.pop() + `.`);

		return text.join(' ');
	}

	// Vignettes

	function slaveVignettes() {
		if (V.showVignettes) {
			const vignette = GetVignette(slave);

			const text = [];

			text.push(`<span class="story-label">This week</span> ${vignette.text}`);

			if (vignette.type === "cash") {
				text.push(vignetteCash(vignette));
			}

			if (vignette.type === "devotion") {
				text.push(vignetteDevotion(vignette));
			}

			if (vignette.type === "trust") {
				text.push(vignetteTrust(vignette));
			}

			if (vignette.type === "health") {
				text.push(vignetteHealth(vignette));
			}

			if (vignette.type === "rep") {
				text.push(vignetteReputation(vignette));
			}

			return text.join(' ');
		}
	}

	// TODO: move these into central vignette function
	function vignetteCash(vignette) {
		const FResultNumber = FResult(slave);
		const cash = Math.trunc(FResultNumber * vignette.effect);

		incomeStats.income += cash;

		if (vignette.effect > 0) {
			cashX(cash, "slaveAssignmentFarmyardVign", slave);

			return `<span class="yellowgreen">making you an extra ${cashFormat(cash)}.</span>`;
		} else if (vignette.effect < 0) {
			cashX(forceNeg(cash), "slaveAssignmentFarmyardVign", slave);

			return `<span class="reputation dec">losing you ${cashFormat(Math.abs(cash))}.</span>`;
		} else {
			return `an incident without lasting effect.`;
		}
	}

	function vignetteDevotion(vignette) {
		slave.devotion += 1 * vignette.effect;

		if (vignette.effect > 0) {
			if (slave.devotion > 50) {
				return `<span class="devotion inc">increasing ${his} devotion to you.</span>`;
			} else if (slave.devotion >= 20) {
				return `<span class="devotion inc">increasing ${his} acceptance of you.</span>`;
			} else if (slave.devotion >= -20) {
				return `<span class="devotion inc">reducing ${his} dislike of you.</span>`;
			} else {
				return `<span class="devotion inc">reducing ${his} hatred of you.</span>`;
			}
		} else if (vignette.effect < 0) {
			if (slave.devotion > 50) {
				return `<span class="devotion dec">reducing ${his} devotion to you.</span>`;
			} else if (slave.devotion >= 20) {
				return `<span class="devotion dec">reducing ${his} acceptance of you.</span>`;
			} else if (slave.devotion >= -20) {
				return `<span class="devotion dec">increasing ${his} dislike of you.</span>`;
			} else {
				return `<span class="devotion dec">increasing ${his} hatred of you.</span>`;
			}
		} else {
			return `an incident without lasting effect.`;
		}
	}

	function vignetteTrust(vignette) {
		slave.trust += 1 * vignette.effect;

		if (vignette.effect > 0) {
			if (slave.trust > 20) {
				return `<span class="trust inc">increasing ${his} trust in you.</span>`;
			} else if (slave.trust >= -20) {
				return `<span class="trust inc">reducing ${his} fear of you.</span>`;
			} else {
				return `<span class="trust inc">reducing ${his} terror of you.</span>`;
			}
		} else if (vignette.effect < 0) {
			if (slave.trust > 20) {
				return `<span class="trust dec">reducing ${his} trust in you.</span>`;
			} else if (slave.trust >= -20) {
				return `<span class="trust dec">increasing ${his} fear of you.</span>`;
			} else {
				return `<span class="trust dec">increasing ${his} terror of you.</span>`;
			}
		} else {
			return `an incident without lasting effect.`;
		}
	}

	function vignetteHealth(vignette) {
		if (vignette.effect > 0) {
			improveCondition(slave, 2 * vignette.effect);

			return `<span class="reputation inc">improving ${his} health.</span>`;
		} else if (vignette.effect < 0) {
			healthDamage(slave, 2 * vignette.effect);

			return `<span class="reputation dec">affecting ${his} health.</span>`;
		} else {
			return `an incident without lasting effect.`;
		}
	}

	function vignetteReputation(vignette) {
		const FResultNumber = FResult(slave);

		repX(Math.trunc(FResultNumber * vignette.effect * 0.1), "vignette", slave);
		incomeStats.rep += Math.trunc(FResultNumber * vignette.effect * 0.1);

		if (vignette.effect > 0) {
			return `<span class="reputation inc">gaining you a bit of reputation.</span>`;
		} else if (vignette.effect < 0) {
			return `<span class="reputation dec">losing you a bit of reputation.</span>`;
		} else {
			return `an incident without lasting effect.`;
		}
	}
};
