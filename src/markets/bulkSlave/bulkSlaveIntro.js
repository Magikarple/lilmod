App.Markets.bulkSlaveIntro = function() {
	const el = new DocumentFragment();
	const r = [];
	const discount = getDiscount();
	let seed;
	let p;

	if (V.market.newSlaves.length === 0) {
		bulkSlaveGenerate();
	}

	if (!V.market.introType || V.market.newSlaves.length === 0) {
		V.market.introType = "";
	}
	if (isNaN(V.market.newSlaveIndex)) {
		V.market.newSlaveIndex = 0;
	}

	switch (V.market.introType) {
		case "":
			/* No message to give */
			break;
		case "multi":
			if (V.market.newSlaves.length > 1) {
				r.push(`Your selection of ${V.market.newSlaves.length} slaves arrives from ${App.Markets.marketName(V.market.slaveMarket, V.market.numArcology)}.`);
			} else {
				r.push(`Your new slave from ${App.Markets.marketName(V.market.slaveMarket, V.market.numArcology)} has arrived.`);
			}
			break;
		case "bulk":
			r.push(`Your delivery of ${V.market.newSlaves.length} slaves arrives from ${App.Markets.marketName(V.market.slaveMarket, V.market.numArcology)}.`);
			if (V.market.newSlaves.length !== V.market.numSlaves) {
				r.push(`You were going to order ${V.market.numSlaves}, but ${V.assistant.name} lowered it on financial grounds.`);
			}
			seed = Math.ceil(V.slavesSeen - V.slaveMarketLimit);
			if (seed > V.market.newSlaves.length) {
				r.push(`You have cast such a wide net for slaves this week that all are more expensive than normal.`);
			} else if (seed > 0) {
				r.push(`You have cast such a wide net for slaves this week that some (${seed}) are more expensive than normal.`);
			}
			if (V.market.slaveMarket === "TFS") {
				/* Put line about The Futanari Sisters discount & pricing */
			} else if (discount === 475) {
				r.push(`Your bulk delivery came with a <span class="yellowgreen">5%</span> discount.`);
			} else {
				r.push(`With all your discounts factored in you got a <span class="yellowgreen">${(500 - discount) / 5}%</span> discount;`);
			}
			r.push(`You spent`, App.UI.DOM.cashFormat(V.market.totalCost), `on your new slaves.`);
			break;
		case "inStock":
			r.push(`You clear out ${App.Markets.marketName(V.market.slaveMarket, V.market.numArcology)} of its stock of ${V.market.newSlaves.length} slaves.`);
			if (V.market.slaveMarket === "TFS") {
				/* Put line about The Futanari Sisters discount & pricing */
			} else if (discount === 475) {
				r.push(`Your bulk delivery came with a <span class="yellowgreen">5%</span> discount.`);
			} else {
				r.push(`With all your discounts factored in you got a <span class="yellowgreen">${(500 - discount) / 5}%</span> discount`);
			}
			r.push(`You spent`, App.UI.DOM.cashFormat(V.market.totalCost), `on your new slaves.`);
			break;
		case "liquidator":
			r.push(`Your new pair of slaves look frightened and uncertain, but seem encouraged by each other's presence.`);
			break;
		case "egyptian":
			r.push(`They arrive hand-in-hand and don't let go of each other until the end of the enslavement process, and even after they break their grip and undress at your instruction, their eyes never stray far from each other. With a closer look at them, their blood relation is as obvious as their infatuation with one another. No wonder they couldn't keep it a secret.`);
			break;
		case "event":
			r.push(`This is placeholder event info.`);
			break;
	}
	App.Events.addParagraph(el, r);
	/* remove the below line to make the intro blurb show up for every slave, not just the first */
	V.market.introType = "";

	if ((V.market.newSlaveIndex >= V.market.newSlaves.length) || (V.market.newSlavesDone === 1)) {
		/* Variable Clean-up */
		V.market.newSlaves = [];
		V.market.newSlavesDone = 0;
		V.market.introType = "";
	} else {
		if (V.market.newSlaves.length > 1) {
			App.UI.DOM.appendNewElement("div", el, `Showing new slave ${V.market.newSlaveIndex + 1} of ${V.market.newSlaves.length}:`);
		}

		/* Set slave to the desired newSlave so that existing code can be used */
		const slave = V.market.newSlaves[V.market.newSlaveIndex];

		el.append(App.Desc.longSlave(slave, {market: V.market.slaveMarket}));

		/* Use existing New Slave Intro */
		el.append(App.UI.newSlaveIntro(slave));

		/* Override nextButton setting from New Slave Intro */
		V.nextButton = "Continue";
		V.nextLink = "Bulk Slave Intro";
		App.Utils.updateUserButton();

		/* Add an option = goto the next slave below the New Slave Intro section */

		p = document.createElement("p");
		if (V.market.newSlaveIndex < (V.market.newSlaves.length - 1)) {
			p.append(
				App.UI.DOM.passageLink(
					`Next Slave`,
					`Bulk Slave Intro`
				)
			);
		} else {
			p.append(
				App.UI.DOM.passageLink(
					`Finish introducing slaves`,
					V.returnTo
				)
			);
			V.nextButton = "Back";
			V.nextLink = V.returnTo;
			App.Utils.updateUserButton();
			V.market.newSlavesDone = 1;
		}
		el.append(p);
	} /* Closes no new Slaves check */

	V.market.newSlaveIndex++;
	return el;

	function bulkSlaveGenerate() {
		V.market.newSlaves = [];
		V.market.newSlavesDone = 0;
		V.market.newSlaveIndex = 0;
		V.market.introType = "bulk";
		let cost;
		if (!V.market.numSlaves) {
			V.market.numSlaves = 5;
		}

		for (let i = 0; i < V.market.numSlaves; i++) {
			let slave = (generateMarketSlave(V.market.slaveMarket, V.market.numArcology)).slave;
			V.slavesSeen++;
			if (!App.Data.misc.lawlessMarkets.includes(V.market.slaveMarket)) {
				App.Desc.lawCompliance(slave, V.market.slaveMarket); /* slave stats may change, affecting price */
			}
			cost = slaveCost(slave);

			/* Adjust cost according to V.slavesSeen */
			if (V.slavesSeen > V.slaveMarketLimit) {
				cost += cost * ((V.slavesSeen - V.slaveMarketLimit) * 0.1);
				if (V.market.introType === "inStock") {
					break;
				}
			}

			/* Apply discount modifier */
			cost = discount * Math.trunc(cost / 500);

			/* Charge the Player for the slave, or break out if cannot afford */
			if (V.cash < cost) {
				i = V.market.numSlaves;
				break;
			} else {
				cashX(forceNeg(cost), "slaveTransfer", slave);
				V.market.newSlaves.push(slave);
				V.market.totalCost += cost;
			}
		}

		/* Max Buy clean-up */
		if (V.market.numSlaves === 9999) {
			V.market.numSlaves = V.market.newSlaves.length;
		}

		/* increment Slave school purchase counts if needed */
		if (App.Data.misc.schools.has(V.market.slaveMarket)) {
			V[V.market.slaveMarket].studentsBought += V.market.newSlaves.length;
		}
	}

	function getDiscount() {
		/* Discount calculation. Gives 5% on top of slave school discount */
		let discount = 475;
		let opinion;

		if (V.market.slaveMarket === "TFS") {
			if (V.TFS.schoolUpgrade !== 0) {
				discount = 300;
			} else {
				discount = 380;
			}
		} else if (V.market.slaveMarket === "corporate") {
			if (V.corp.Market === 1) {
				discount = 350;
			}
		} else if (V.market.slaveMarket === "neighbor") {
			if (V.market.numArcology >= V.arcologies.length) {
				V.market.numArcology = 1;
			}
			opinion = App.Neighbor.opinion(V.arcologies[0], V.arcologies[V.market.numArcology]);
			opinion = Math.clamp(Math.trunc(opinion / 20), -10, 10);
			discount -= (opinion * 25);
		} else if (App.Data.misc.schools.has(V.market.slaveMarket)) {
			if (V[V.market.slaveMarket].schoolUpgrade !== 0) {
				discount = 375;
			}
		}
		return discount;
	}
};
