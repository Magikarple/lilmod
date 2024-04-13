/**
 * Displays the UI for special/hero slave market, slaves that are from the /d/ databases.
 * @returns {Node}
 */
App.Markets["Special Slave"] = function() {
	const el = document.createElement("p");
	let p;
	let heroSlaves = App.Utils.buildHeroArray();
	let slave;
	let selectedID;

	// Element to show the entire catalog when selected, or a blurb for a random slave
	p = document.createElement("p");
	p.id = "complete-catalog";
	p.append(getRandomSlave());
	p.append(
		App.UI.DOM.link(
			`Pay to access complete catalog of slaves`,
			() => {
				cashX(-1000, "personalBusiness");
				jQuery("#complete-catalog").empty().append(catalog());
			}
		)
	);
	App.UI.DOM.appendNewElement("span", p, ` Costs ${cashFormat(1000)}`, "note");
	el.append(p);

	// The slave chosen, randomly or otherwise
	p = document.createElement("p");
	p.id = "show-slave";
	if (heroSlaves.length !== 0) {
		p.append(showSlave());
	}
	el.append(p);

	// Credits at the end
	App.UI.DOM.appendNewElement("span", el, `Best regards to /d/, whose fine denizens came up with most of the slaves in the "previously owned" database.`, "note");
	return el;

	function getRandomSlave() {
		const el = new DocumentFragment();
		if (heroSlaves.length === 0) {
			App.UI.DOM.appendNewElement("p", el, `Unfortunately, the catalog is empty.`);
		} else {
			slave = heroSlaves.random();
			selectedID = slave.ID;
			slave = App.Utils.getHeroSlave(slave);
			const {his} = getPronouns(slave);
			App.UI.DOM.appendNewElement("p", el, `You review a piece of merchandise via video call, making a few lewd demands to gauge ${his} obedience. The background of the video feed is luxurious and plush; somewhere offscreen someone is moaning rapturously.`, `scene-intro`);
		}
		return el;
	}

	function catalog() {
		const el = new DocumentFragment();
		const linkArray = [];
		App.UI.DOM.appendNewElement("p", el, `This is the complete catalog of slaves that you can acquire from other slaveowners. Most of these slaves are not for sale, so persuading their owners to part with them will be extremely expensive.`, "scene-intro");

		for (const hero of heroSlaves) {
			if (hero.ID === selectedID) {
				linkArray.push(
					App.UI.DOM.disabledLink(hero.slaveName, ["You are currently examining this slave"])
				);
			} else {
				linkArray.push(
					App.UI.DOM.link(
						hero.slaveName,
						() => {
							slave = App.Utils.getHeroSlave(hero);
							selectedID = hero.ID;
							refresh();
						})
				);
			}
		}
		App.UI.DOM.appendNewElement("p", el, App.UI.DOM.generateLinksStrip(linkArray));

		if (V.cheatMode) {
			let oneSlaveCost = (s) => { let cost = slaveCost(s); return cost + (10 * Math.trunc((cost / 10) * 2)); };
			let allHeroSlaves = App.Utils.buildHeroArray().map(
				(hs) => {
					const slave = App.Utils.getHeroSlave(hs);
					return {slave: slave, cost: oneSlaveCost(slave), ID: hs.ID};
				}
			);
			let totalCost = allHeroSlaves.reduce((acc, s) => acc += s.cost, 0);

			if (V.cash > totalCost) {
				App.UI.DOM.appendNewElement(
					"div",
					el,
					App.UI.DOM.link(
						`Buy all of them for ${cashFormat(totalCost)}`,
						() => {
							for (const hero of allHeroSlaves) {
								cashX(forceNeg(hero.cost), "slaveTransfer", hero.slave);
								newSlave(hero.slave);
								V.heroSlavesPurchased.push(hero.ID);
							}
							refresh();
						}
					)
				);
			} else {
				App.UI.DOM.appendNewElement(
					"div",
					el,
					App.UI.DOM.disabledLink(
						`Buy all of them for ${cashFormat(totalCost)}`,
						[`Cannot afford`]
					)
				);
			}
		}

		return el;

		function refresh() {
			heroSlaves = App.Utils.buildHeroArray();
			if (heroSlaves.length === 0) {
				jQuery("#complete-catalog").empty().append(`There are no longer any special slaves available.`);
				jQuery("#show-slave").empty();
			} else {
				jQuery("#complete-catalog").empty().append(catalog());
				jQuery("#show-slave").empty().append(showSlave());
			}
		}
	}

	function showSlave() {
		const el = new DocumentFragment();
		const {his} = getPronouns(slave);
		const slaveCost = heroSlaveCost(slave, 20000);
		App.UI.DOM.appendNewElement("p", el, App.Desc.longSlave(slave, {market: "special"}));
		App.UI.DOM.appendNewElement("p", el, `The offered price is ${cashFormat(slaveCost)}.`);
		App.UI.DOM.appendNewElement("p", el,
			App.UI.DOM.link(
				`Buy ${his} slave contract`,
				() => {
					slave.weekAcquired = V.week;
					V.nextButton = "Continue";
					V.nextLink = "Main";
					V.heroSlavesPurchased.push(selectedID);
					cashX(forceNeg(slaveCost), "slaveTransfer", slave);
					jQuery("#show-slave").empty().append(App.UI.newSlaveIntro(slave));
				},
			)
		);
		return el;
	}
};
