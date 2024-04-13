/**
 * @returns {FC.EndWeek.FacilityReport}
 */
App.EndWeek.farmyardReport = function farmyardReport() {
	const beforeFrag = new DocumentFragment();
	const text = new SpacedTextAccumulator(beforeFrag);

	const slaves = App.Utils.sortedEmployees(App.Entity.facilities.farmyard);
	const devBonus = (V.farmyardDecoration !== "standard") ? 1 : 0;
	const Farmer = S.Farmer ? App.SlaveAssignment.reportSlave(S.Farmer) : undefined;
	const profits = getProfits();
	const food = App.Facilities.Farmyard.foodProduction();

	// Statistics gathering
	V.facility = V.facility || {};
	V.facility.farmyard = initFacilityStatistics(V.facility.farmyard);

	const statsSpan = document.createElement("span");
	beforeFrag.append(statsSpan);

	text.push(
		farmyardDecoration(),
		farmyardMultipliers(),
		farmyardProfit(),
	);

	text.toParagraph();

	V.mods.food.amount += food;

	if (slaves) {
		const intro = App.UI.DOM.appendNewElement("p", beforeFrag, null, ["indent"]);

		$(intro).append(farmhandCount(slaves.length));
	}

	/** @type {Array<FC.EndWeek.SlaveReport>} */
	const slaveReports = [];

	if (Farmer) {
		if ((V.favSeparateReport === 1 && V.favorites.includes(Farmer.ID)) || V.showEWD) {
			const farmerEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
			const artSpan = App.UI.DOM.appendNewElement("span", farmerEntry);
			App.Events.addNode(farmerEntry, [App.SlaveAssignment.saSlaveIntro(Farmer, `is serving as the Farmer.`), farmerText()]);
			farmerEntry.append(App.SlaveAssignment.standardSlaveReport(Farmer));
			App.SlaveAssignment.appendSlaveArt(artSpan, Farmer);
			slaveReports.push({
				id: Farmer.ID,
				report: farmerEntry,
			});
		} else {
			App.SlaveAssignment.standardSlaveReport(Farmer, true);
		}

		getSlaveStatisticData(S.Farmer, V.facility.farmyard);

		farmerChanges();
	}

	if (slaves) {
		for (const slave of App.SlaveAssignment.reportSlaves(slaves)) {
			slave.devotion += devBonus;

			if (V.showEWD || (V.favSeparateReport === 1 && V.favorites.includes(slave.ID))) {
				const slaveEntry = App.UI.DOM.makeElement("div", null, ["slave-report"]);
				const artSpan = App.UI.DOM.appendNewElement("span", slaveEntry);
				slaveEntry.append(App.SlaveAssignment.saSlaveIntro(slave, `is working out of ${V.farmyardName}.`));

				farmhandLivingRules(slave);
				farmhandHealth(slave);
				farmhandDevotion(slave);
				farmhandTrust(slave);
				farmhandEnergy(slave);
				farmhandFood(slave);

				App.Events.addNode(slaveEntry, [
					App.SlaveAssignment.workTheFarm(slave),
					App.SlaveAssignment.standardSlaveReport(slave, false)
				], "div", ["indent"]);
				App.SlaveAssignment.appendSlaveArt(artSpan, slave);
				slaveReports.push({
					id: slave.ID,
					report: slaveEntry,
				});
			} else {	// silently discard return values
				App.SlaveAssignment.workTheFarm(slave);
				App.SlaveAssignment.standardSlaveReport(slave, true);
			}
		}

		farmyardStatsRecords();
	}

	const afterFrag = new DocumentFragment();

	afterFrag.append(App.Facilities.Farmyard.Stats(false));
	statsSpan.append(App.Facilities.Farmyard.Stats(true));

	return {
		before: beforeFrag,
		slaves: slaveReports,
		after: afterFrag,
	};

	// Farmer

	function farmerChanges() {
		if (Farmer) {
			farmerHealth(Farmer);
			farmerDevotion(Farmer);
			farmerTrust(Farmer);
			farmerLivingRules(Farmer);
			farmerRestRules(Farmer);
			farmerCashBonus(Farmer);
		}
	}

	function farmerHealth(slave) {
		if (slave.health.condition < -80) {
			improveCondition(Farmer, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(Farmer, 15);
		} else if (slave.health.condition < 0) {
			improveCondition(Farmer, 10);
		} else if (slave.health.condition < 90) {
			improveCondition(Farmer, 7);
		}
	}

	function farmerDevotion(slave) {
		slave.devotion += devBonus;

		if (slave.devotion < 45) {
			slave.devotion += 5;
		}
	}

	function farmerTrust(slave) {
		if (slave.trust < 45) {
			slave.trust += 5;
		}
	}

	function farmerLivingRules(slave) {
		slave.rules.living = 'luxurious';
	}
	function farmerRestRules(slave) {
		slave.rules.rest = 'restrictive';
	}

	function farmerCashBonus(slave) {
		let FarmerCashBonus = Math.min(0.2, slave.skill.farmer * 0.002);

		FarmerCashBonus += slave.intelligence + slave.intelligenceImplant > 15 ? 0.05 : 0;
		FarmerCashBonus += slave.dick > 2 && canPenetrate(slave) ? 0.05 : 0;
		FarmerCashBonus += !canSmell(slave) ? 0.05 : 0;

		if (slave.actualAge > 35) {
			FarmerCashBonus += 0.05;
		} else if (!V.AgePenalty) {
			FarmerCashBonus += 0.05;
		}

		if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
			FarmerCashBonus += 0.05;
			if (slave.skill.farmer >= Constant.MASTERED_XP) {
				FarmerCashBonus += 0.05;
			}
		} else if (slave.skill.farmer >= Constant.MASTERED_XP) {
			FarmerCashBonus += 0.05;
		}

		// TODO: keep this?
		if (Farmer.relationshipTarget === slave.ID) {
			FarmerCashBonus -= 0.05;
		} else if (areRelated(Farmer, slave)) {
			FarmerCashBonus += 0.05;
		}

		FarmerCashBonus *= restEffects(Farmer);

		return FarmerCashBonus;
	}

	function farmerText() {
		const r = [];

		r.push(
			farmerRelationshipPC(Farmer),
			farmerFetishEffects(Farmer, farmerFetish(Farmer)),
			farmerSkill(Farmer),
			farmerExperience(Farmer),
			farmerTiredness(Farmer),
			farmerIntelligence(Farmer),
			farmerSmell(Farmer),
			farmerRelationshipSlaves(Farmer),
			farmerContracts(Farmer)
		);

		return r.join(' ');
	}

	function farmerFetish(slave) {
		if (slave.fetish !== 'dom') {
			if (fetishChangeChance(slave) > random(0, 100)) {
				slave.fetishKnown = 1;
				slave.fetish = 'dom';
				slave.fetishStrength = 10;
				return 1;
			}
		} else if (!slave.fetishKnown) {
			slave.fetishKnown = 1;
			return 1;
		} else {
			slave.fetishStrength += 4;
			return 2;
		}
	}

	function farmerFetishEffects(slave, fetish = 0) {
		const {he, his, himself, He} = getPronouns(slave);

		if (fetish === 1) {
			return `${He} isn't above sampling the merchandise ${himself}; before long it's obvious to ${his} workers that ${he} <span class="fetish gain">really likes fucking them.</span> `;
		} else if (fetish === 2) {
			return `${He}'s careful that all of the farmhands under ${his} supervision are all ready to work every morning, and ${he} <span class="fetish inc">becomes more dominant.</span> `;
		}
	}

	function farmerSkill(slave) {
		const {he, his, His} = getPronouns(slave);

		const r = [];

		if (slave.skill.farmer <= 10) {
			r.push(`Though ${slave.slaveName} does ${his} best to manage the farmyard, with ${his} lack of skill ${he} can do little.`);
		} else if (slave.skill.farmer <= 30) {
			r.push(`${slave.slaveName}'s basic skills marginally <span class="cash">improve</span> business at ${V.farmyardName}.`);
		} else if (slave.skill.farmer <= 60) {
			r.push(`${slave.slaveName}'s skills <span class="cash">improve</span> business at ${V.farmyardName}.`);
		} else if (slave.skill.farmer < 100) {
			r.push(`${slave.slaveName}'s skills greatly <span class="cash">improve</span> business at ${V.farmyardName}.`);
		} else {
			r.push(`${slave.slaveName}'s mastery immensely <span class="cash">improves</span> business at ${V.farmyardName}.`);
		}

		if (slave.actualAge > 35) {
			r.push(`${His} age and experience also contribute.`);
		}

		return r.join(' ');
	}

	function farmerExperience(slave) {
		const {he, his, him, He} = getPronouns(slave);

		if (App.Data.Careers.Leader.farmer.includes(slave.career)) {
			return `${He} has experience from ${his} life before ${he} was a slave that helps ${him} in the difficult life of managing animals and property.`;
		} else if (slave.skill.farmer >= Constant.MASTERED_XP) {
			return `${He} has experience from working for you that helps ${him} in the difficult life of managing animals and property.`;
		} else {
			const skillIncrease = random(1, Math.ceil((slave.intelligence + slave.intelligenceImplant) / 32));
			return slaveSkillIncrease('farmer', slave, skillIncrease);
		}
	}

	function farmerTiredness(slave) {
		const {he, his} = getPronouns(slave);

		if (slaveResting(slave)) {
			return `To avoid exhaustion, ${he} has to take breaks to maintain ${his} strength, limiting how much ${he} can work.`;
		}
	}

	function farmerRelationshipSlaves(Farmer) {
		const {he, his, He} = getPronouns(Farmer);

		const r = [];

		for (const slave of slaves) {
			if (Farmer.rivalryTarget === slave.ID) {
				r.push(`${He} leverages the fact that ${he} is ${slave.slaveName}'s superior to make ${his} ${rivalryTerm(Farmer)}'s life a living hell.`);
				slave.devotion -= 2; slave.trust -= 2;

				if (canDoVaginal(slave)) {
					seX(slave, 'vaginal', 'public', 'penetrative', 10);
				}

				if (canDoAnal(slave)) {
					seX(slave, 'anal', 'public', 'penetrative', 10);
				}

				seX(slave, 'oral', 'public', 'penetrative', 10);
				if (random(1, 100) > 65) {
					Farmer.rivalry++; slave.rivalry++;
				}
			} else if (Farmer.relationshipTarget === slave.ID) {
				r.push(`${He} dotes over ${his} ${relationshipTerm(Farmer)}, ${slave.slaveName}, making sure ${he} isn't worked too hard, but unfortunately manages to get in the way of ${his} work.`);
				slave.devotion++;
			} else if (areRelated(Farmer, slave)) {
				r.push(`${He} pays special attention to ${his} ${relativeTerm(Farmer, slave)}, ${slave.slaveName}, making sure ${he} is treated well and showing off ${his} skills.`);
				slave.trust++;
			}
		}

		return r;
	}

	function farmerContracts(slave) {
		const {he, his, himself} = getPronouns(slave);

		const r = [];
		const seed = Math.trunc(App.Facilities.Farmyard.farmShowsIncome(slave));

		if (!App.Entity.facilities.farmyard.employeesIDs()) {
			if (V.farmyardShows > 0) {
				r.push(`<p class="indent">Since ${he} doesn't have enough showgirls to entertain your arcology's citizens, ${he} puts on shows with your animals on ${his} own, earning <span class="cash">${cashFormat(seed)}.</span></p>`);
			} else {
				r.push(`<p class="indent">Since ${V.farmyardName} doesn't have anyone tending to the crops, ${he} looks after them ${himself}, earning <span class="cash">${cashFormat(seed)}.</span></p>`);
			}
		}
		return r;
	}

	function farmerRelationshipPC(slave) {
		const {he, his, wife} = getPronouns(slave);

		if (slave.relationship === -3 && slave.devotion > 50) {
			return `As your loving ${wife}, ${he} does ${his} best to ensure ${V.farmyardName} runs smoothly.`;
		}
	}

	function farmerIntelligence(slave) {
		const {He} = getPronouns(slave);

		if (slave.intelligence + slave.intelligenceImplant > 15) {
			return `${He} is a clever manager.`;
		}
	}

	function farmerSmell(slave) {
		const {him, His} = getPronouns(slave);

		if (!canSmell(slave)) {
			return `${His} lack of a sense of smell protects ${him} from that omnipresent barnyard stench.`;
		}
	}

	// Farmhands

	function farmhandCount(count) {
		return `<strong>There ${count > 1 ? `are ${count} farmhands` : `is one farmhand`} working out of ${V.farmyardName}.</strong>`;
	}

	function farmhandLivingRules(slave) {
		switch (V.farmyardDecoration) {
			case 'Degradationist':
			case 'standard':
				slave.rules.living = 'spare';
				break;
			case 'Roman Revivalist':
				slave.rules.living = 'luxurious';
				break;
			default:
				slave.rules.living = 'normal';
				break;
		}
	}

	function farmhandHealth(slave) {
		if (slave.health.condition < -80) {
			improveCondition(slave, 20);
		} else if (slave.health.condition < -40) {
			improveCondition(slave, 15);
		} else if (slave.health.condition < 0) {
			improveCondition(slave, 10);
		} else if (slave.health.condition < 90) {
			improveCondition(slave, 7);
		}
	}

	function farmhandDevotion(slave) {
		if (slave.devotion <= 20 && slave.trust >= -20) {
			slave.devotion -= 5; slave.trust -= 5;
		} else if (slave.devotion < 45) {
			slave.devotion += 4;
		} else if (slave.devotion > 50) {
			slave.devotion -= 4;
		}
	}

	function farmhandProfit(slave) {
		const incomeStats = getSlaveStatisticData(slave, slave.assignment === Job.FARMYARD ? V.facility.farmyard : undefined);
		return incomeStats.income || null;
	}

	function farmhandFood(slave) {
		const incomeStats = getSlaveStatisticData(slave, slave.assignment === Job.FARMYARD ? V.facility.farmyard : undefined);
		let foodWeek = incomeStats.food || 0;

		if (V.farmMenials > 0) {
			foodWeek += (V.farmMenials * 350);
		}

		return foodWeek;
	}

	function farmhandTrust(slave) {
		if (slave.trust < 30) {
			slave.trust += 5;
		}
	}

	function farmhandEnergy(slave) {
		if (slave.energy.isBetween(40, 95)) {
			slave.energy++;
		}
	}

	// Farmyard

	function farmyardStatsRecords() {
		const f = V.facility.farmyard;

		if (!f) {
			return;
		}

		f.whoreIncome = 0;
		f.customers = 0;
		f.whoreCosts = 0;
		f.rep = 0;
		f.food = 0;
		for (const si of f.income.values()) {
			f.whoreIncome += si.income + si.adsIncome;
			f.customers += si.customers;
			f.whoreCosts += si.cost;
			f.rep += si.rep;
			f.food += si.food;
		}
		f.maintenance = V.farmyard * V.facilityCost;
		f.totalIncome = f.whoreIncome + f.adsIncome;
		f.totalExpenses = f.whoreCosts + f.maintenance;
		f.profit = f.totalIncome - f.totalExpenses;
	}

	function farmyardDecoration() {
		const text = [];

		// TODO: add checks for the different FSs
		if (V.farmyardDecoration !== 'standard') {
			text.push(`${capFirstChar(V.farmyardName)}'s customer's enjoyed`);

			if (V.farmyardShows > 0) {
				if (V.seeBestiality && V.policies.bestialityOpenness && (V.animals.canine.length || V.animals.hooved.length || V.animals.feline.length)) {
					text.push(`<span class="reputation inc">watching farmhands fuck animals in ${V.farmyardDecoration} surroundings.</span>`);
				} else {
					text.push(`<span class="reputation inc">watching farmhands put on shows in ${V.farmyardDecoration} surroundings.</span>`);
				}
			} else {
				text.push(`<span class="reputation inc">partaking of ${V.farmyardName}'s fine produce in its ${V.farmyardDecoration} décor.</span>`);
			}
		}

		return text.join(' ');
	}

	function farmyardMultipliers() {
		const animals = [...V.animals.canine, ...V.animals.feline, ...V.animals.hooved].map(animal => getAnimal(animal));
		const total = animals.length;
		const exotic = animals.filter(animal => animal.rarity === "exotic");
		const text = [];
		const animalText = [];

		if (total > 1) {
			text.push(`Having a ${total > 6 ? `wide` : ``} variety of`);
			if (V.animals.canine.length > 0) {
				if (V.animals.canine.every(c => getAnimal(c).species === "dog")) {
					animalText.push(`dogs`);
				} else {
					animalText.push(`canines`);
				}
			}
			if (V.animals.hooved.length > 0) {
				animalText.push(`hooved animals`);
			}
			if (V.animals.feline.length > 0) {
				if (V.animals.feline.every(f => getAnimal(f).species === "cat")) {
					animalText.push(`cats`);
				} else {
					animalText.push(`felines`);
				}
			}
			text.push(`${toSentence(animalText)} keeps the guests of ${V.farmyardName} more entertained than they would have been otherwise, <span class="cash inc">earning you more.</span>`);
		}

		if (exotic.length > 0) {
			text.push(`The fact that some of the animals are normally only founds in zoos is <span class="reputation inc">not lost on your citizenry,</span> either, and <span class="cash inc">many are willing to pay more</span> to watch shows with them.`);
		}

		return text.join(' ');
	}

	function farmyardProfit() {
		const text = [];

		if (profits || food) {
			text.push(capFirstChar(V.farmyardName));

			if (profits) {
				text.push(`makes you <span class="cash">${cashFormat(Math.trunc(profits))}</span>`);
			}

			if (V.mods.food.market) {
				if (profits && food) {
					text.push(`and`);
				}
				if (food) {
					text.push(`produced <span class="chocolate"> ${massFormat(food)}</span> of food`);
				}
			}
			text.push(`this week.`);
		}

		return text.join(' ');
	}

	function getProfits() {
		let total = 0;

		for (const slave of slaves) {
			total += farmhandProfit(slave);
		}

		return total;
	}
};
