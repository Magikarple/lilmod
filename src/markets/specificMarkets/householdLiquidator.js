App.Markets["Household Liquidator"] = function() {
	V.market.introType = "liquidator";
	V.market.newSlavesDone = 0;

	const el = new DocumentFragment();
	/** @type {ReturnType<prepSlaveSale>} */
	let newSlaves = null;
	if (jsRandom(1, 100) > 50) {
		// Old enough to have a younger sibling who can be a slave.
		const slave = GenerateNewSlave(null, {
			minAge: (V.minimumSlaveAge + 2), disableDisability: 1
		});
		finishSlave(slave);
		setMissingParents(slave);

		// Create opposite sex chance of relative
		const oppositeSex = (slave.genes !== GenerateChromosome());
		App.UI.DOM.appendNewElement("p", el, `The household liquidator is offering a set of siblings for sale. You are permitted to inspect both slaves.`);

		const relativeSlave = generateRelatedSlave(slave, "younger sibling", oppositeSex);

		newSlaves = prepSlaveSale(3.0, slave, relativeSlave);
	} else if (jsRandom(1, 100) > 20) {
		// Old enough to have a child who can be a slave.
		const slave = GenerateNewSlave(null, {
			minAge: (V.fertilityAge + V.minimumSlaveAge), maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.butt += 1;
		if (slave.vagina > -1) {
			slave.boobs += 100;
			slave.vagina += 1;
			slave.counter.birthsTotal = 1;
		}
		finishSlave(slave);

		// Create opposite sex chance of relative
		const oppositeSex = (slave.genes !== GenerateChromosome());
		const {his, mother} = getPronouns(slave);

		const relativeSlave = generateRelatedSlave(slave, "child", oppositeSex);
		const {daughter} = getPronouns(relativeSlave);

		App.UI.DOM.appendNewElement("p", el, `The household liquidator is offering a ${mother} and ${his} ${daughter} for sale. You are permitted to inspect both slaves.`);

		newSlaves = prepSlaveSale(3.0, slave, relativeSlave);
	} else {
		const slave = GenerateNewSlave(null, {disableDisability: 1});
		finishSlave(slave);
		setMissingParents(slave);
		App.UI.DOM.appendNewElement("p", el, `The household liquidator is offering something special: identical twins. The markup is huge, but the merchandise isn't something you see every day.`);

		const relativeSlave = generateRelatedSlave(slave, "twin");

		newSlaves = prepSlaveSale(4.0, slave, relativeSlave);
	}

	el.append(`The price is `);
	el.append(App.UI.DOM.cashFormat(newSlaves.cost));
	el.append(`.`);
	if (V.slavesSeen > V.slaveMarketLimit) {
		el.append(` You have cast such a wide net for slaves this week that it is becoming more expensive to find more for sale. Your reputation helps determine your reach within the slave market.`);
	}

	if (V.cash >= newSlaves.cost) {
		App.UI.DOM.appendNewElement(
			"div",
			el,
			App.UI.DOM.link(
				`Buy their slave contracts`,
				() => {
					V.market.newSlaves = newSlaves.slaves;
					V.market.newSlaves.forEach((s) => cashX(forceNeg(newSlaves.cost / V.market.newSlaves.length), "slaveTransfer", s));
					V.returnTo = "Buy Slaves";
				},
				[],
				"Bulk Slave Intro"
			)
		);
	} else {
		el.append(`You lack the necessary funds to buy these slaves.`);
	}
	App.UI.DOM.appendNewElement(
		"div",
		el,
		App.UI.DOM.link(
			`Decline to purchase them and check out another set of slaves`,
			() => {
				V.slavesSeen += 2;
			},
			[],
			"Market"
		)
	);
	App.UI.DOM.appendNewElement("p", el, App.UI.MultipleInspect(newSlaves.slaves, true, "Household Liquidator", newSlaves.text));

	return el;

	/**
	 * @param {number} costFactor
	 * @param {Array<FC.GingeredSlave>} slaves
	 */
	function prepSlaveSale(costFactor, ...slaves) {
		const bundle = {
			/** @type {Array<FC.GingeredSlave>} */
			slaves: [],
			/** @type {Map<number, string>} */
			text: new Map(),
			cost: 0
		};
		for (const slave of slaves) {
			const complianceText = App.Desc.lawCompliance(slave, "Household Liquidator");
			bundle.slaves.push(slave);
			bundle.text.set(slave.ID, complianceText);
		}
		let cost = slaveCost(slaves[0], false, true);
		if (V.slavesSeen > V.slaveMarketLimit) {
			cost += Math.trunc(cost * ((V.slavesSeen - V.slaveMarketLimit) * 0.1));
		}
		bundle.cost = cost * costFactor;
		return bundle;
	}

	/** @param {FC.GingeredSlave} slave */
	function finishSlave(slave) {
		Object.assign(slave, {
			origin: "You bought $him from the household liquidator.",
			devotion: jsRandom(-75, -25),
			trust: jsRandom(-45, -25),
			oldDevotion: slave.devotion,
			oldTrust: slave.trust,
			canRecruit: 0
		});
		setHealth(slave, jsRandom(-50, 20));
	}
};
