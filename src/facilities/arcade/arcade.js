// cSpell:ignore Fuckdollification

App.Facilities.Arcade.arcade = class Arcade extends App.Facilities.Facility {
	constructor() {
		const arcade = App.Entity.facilities.arcade;
		const decommissionHandler = () => {
			V.arcade = 0;
			V.arcadeDecoration = "standard";
			V.arcadePrice = 2;
			V.arcadeUpgradeCollectors = 0;
			V.arcadeUpgradeFuckdolls = 0;
			V.arcadeUpgradeHealth = -1;
			V.arcadeUpgradeInjectors = 0;

			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Market, "Arcade", "Markets");
		};

		super(
			arcade,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Arcade";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`It's busy. Customers are entering and exiting, leaving a few ¤ behind in the charge machines and loads of semen behind in the holes.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`It's understaffed; there are lines here and there for the few holes available.`);
		} else {
			text.push(`It's empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is built out as a Roman street restaurant, with the bar containing the inmates. Citizens can amuse themselves at either side of the bar while enjoying some wine and olives and talking over the day's events.`,
			"Neo-Imperialist": `is built out as a Neo-Imperial temple, the banners of your house and a few other prominent noble families fluttering over the writhing bodies of the inmates. There's a lively bar and tables built out to one side where citizens can drink and relax when not enjoying themselves with the captive slaves.`,
			"Aztec Revivalist": `is built out as an Aztec stone temple, with a short stone staircase to lead the people straight to the slaves waiting in front of the establishment. A small canal leads the shed blood to the back and out of the building.`,
			"Egyptian Revivalist": `is built to look like an ancient Egyptian temple, with a long altar of sacrifice serving as the wall in which the inmates are held. Incongruously, it's piled with fresh flowers.`,
			"Edo Revivalist": `is built to look like an Edo onsen, with discreet partitions allowing citizens a modicum of privacy as they use the services here. There are baths available so they can wash themselves afterward.`,
			"Arabian Revivalist": `is built to look like a fantastical Arabian dungeon, with the inmates kept in iron cages that hold their holes in place for use.`,
			"Chinese Revivalist": `is set up to look like a rough bar in an ancient Chinese city, with the inmates immured in the bar itself. Rowdy citizens can drink and fuck the holes here while shouting and boasting over the slaves' heads.`,
			"Antebellum Revivalist": `is built like a perverse saloon. Inmates are held in fine wood panelled walls, asses hanging out enough to be groped and abused, separated by small wooden dividers like those between urinals, so citizens can hold polite conversation while they're otherwise indisposed.`,
			"Chattel Religionist": `is well decorated with severe religious iconography, since this place is an acceptable if not respectable place for a citizen to find relief, so long as they keep the service of the slave they use here in mind.`,
			"Degradationist": `is nothing but a system of harnesses to hold slaves in the usual posture they would hold within a normal Free Cities sex arcade. This way, no iota of their degradation here is missed.`,
			"Asset Expansionist": `is constructed so that the slaves lie within the arcade facing up. The wall itself ends at waist height, so their breasts stick up to be groped while they are used from either end.`,
			"Transformation Fetishist": `reveals more of its inmates' bodies than the typical Free Cities sex arcade. There's no attempt to hide the feeding arrangements or injection lines, since transformation into a human sex toy is considered arousing here.`,
			"Repopulationist": `is constructed so that the slaves lie within the arcade facing up. A hole is situated above them, so that their belly has room to protrude upwards as they are fucked pregnant.`,
			"Eugenics": `is designed with built in dispensers for various prophylactics. Numerous reminders to not impregnate subhumans line the walls along with offers for patrons to join the ranks of the Elite.`,
			"Gender Radicalist": `is built to reveal most of its inmate's bellies, butts, groins, and thighs. Whatever a slave here has between her legs, it's available to be fucked, played with, or abused.`,
			"Gender Fundamentalist": `is built to block the lower part of its inmates' butts from view and use. The slaves within are thus limited to their anuses for service here, but any slave can be disposed of in ${V.arcadeName} without offending fundamentalist sensibilities.`,
			"Physical Idealist": `logs customers' performance for their own athletic information. It keeps track of personal bests and all-time high scores, and pays out cash prizes to customers who fuck the holes faster, harder, or for longer than the previous record holder.`,
			"Supremacist": `is constructed so that the inmates' entire heads stick out of the mouth wall, though they're still masked and their jaws are held apart by ring gags. After all, seeing the anguish of the subhumans here is one of the main attractions.`,
			"Subjugationist": `is constructed so that the inmates' entire heads stick out of the mouth wall, though they're still masked and their jaws are held apart by ring gags. After all, seeing the anguish of the ${V.arcologies[0].FSSubjugationistRace} slaves here is one of the main attractions.`,
			"Paternalist": `is constructed so that nothing at all of the slaves is visible. The arcade is just a row of holes. In this way, good, paternalistic citizens can partake of a Free Cities sex arcade without being confronted with what they're doing.`,
			"Pastoralist": `is constructed so that the slaves lie within the arcade facing up. If a slave is lactating, her breasts are kept bare and under the maximum sustainable dose of lactation drugs, so that any penetration of her holes produces amusing squirts of milk.`,
			"Maturity Preferentialist": `is constructed so that nothing but the slaves' holes can be seen. This makes it possible to maintain the appearance of offering MILFs while using ${V.arcadeName} to get value out of useless young bitches' holes.`,
			"Youth Preferentialist": `is constructed so that nothing but the slaves' holes can be seen. This makes it possible to maintain the appearance of offering nothing but young slaves while using ${V.arcadeName} to get value out of old bitches' holes.`,
			"Body Purist": `is built out in such a way that much more of the slaves' rears and faces are visible than in a standard Free Cities sex arcade. This makes it much easier to check them for purity before using their holes.`,
			"Slimness Enthusiast": `is barely distinguishable from a standard Free Cities sex arcade. The difference is a fun one, though: since the butts sticking out of the wall are much skinnier than usual, there's no padding to get in the way of hilting oneself in the holes.`,
			"Hedonistic": `is built in such a way so that most of a slave's ass, thighs, breasts and belly are exposed for patrons to grope and fondle. Plenty of cup holders and surfaces are available to hold one's food and drink as they enjoy their hole of choice.`,
			"Intellectual Dependency": `is barely distinguishable from a standard Free Cities sex arcade. The difference is a fun one, though: ${V.arcadeName} keeps track of the total number of orgasms each stall experiences each day and displays the current leader to encourage competition.`,
			"Slave Professionalism": `is constructed so that nothing but the slaves' holes can be seen. No details are given about the slave within, nor are their minds allowed to perceive what is happening around them.`,
			"Petite Admiration": `is barely distinguishable from a standard Free Cities sex arcade. The difference is remarkable, though: since it expects clientèle of all sizes, the stalls are easily ratcheted to the perfect height.`,
			"Statuesque Glorification": `is constructed so that the slaves' holes are lined up perfectly for the taller clientèle. This makes it possible to maintain the appearance of offering nothing but tall slaves while using ${V.arcadeName} to get value out of short bitches' holes.`,
			"standard": `is a standard Free Cities sex arcade: a pair of hallways extend away from the entrance, lined with doorless stalls like those in a public restroom. One hallway offers mouths, the other ${V.seeDicks !== 100 ? `vaginas and ` : ``}anuses.`,
		};

		const res = FS[V.arcadeDecoration];

		if (!res) {
			throw new Error(`Unknown V.arcadeDecoration value of '${V.arcadeDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `It can support ${num(V.arcade)} inmates. There ${this.facility.hostedSlaves() === 1 ? `is` : `are`} currently ${numberWithPluralOne(this.facility.hostedSlaves(), "slave")} incarcerated in ${V.arcadeName}.`,
			removeSlave: "work a glory hole",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "arcadeUpgradeInjectors",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `It is a standard arcade. It can be upgraded to either maximize the pleasure of those that visit it at the expense of the health of the inmates, or to keep them healthy (if not happy) and milk them of useful fluids.`,
						link: `Upgrade the arcade with invasive performance-enhancing systems`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += .1;

							App.UI.reload();
						},
						notes: [
							`increases upkeep costs`,
							`is mutually exclusive with the collectors`,
						],
						prereqs: [
							V.arcadeUpgradeCollectors < 1,
						],
					},
					{
						value: 1,
						upgraded: 2,
						text: `It has been upgraded with electroshock applicators. Whether they're enjoying themselves or not is irrelevant; they are shocked to tighten their holes regardless. You may also apply aphrodisiacs to further enhance performance.`,
						link: `Apply aphrodisiacs`,
						handler: () => V.PC.skill.engineering += .1,
						prereqs: [
							V.arcadeUpgradeCollectors < 1,
						],
					},
					{
						value: 2,
						text: `It has been upgraded with aphrodisiac injection systems and electroshock applicators. If the aphrodisiacs fail to force an orgasm from an inmate, they are shocked to tighten their holes regardless.`,
					},
				],
			},
			{
				property: "arcadeUpgradeCollectors",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The fluids produced by the inmates here can be collected and sold.`,
						link: `Retrofit the arcade to collect useful fluids`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += .1;

							App.UI.reload();
						},
						notes: [
							`increases upkeep costs`,
							`is mutually exclusive with the injectors`,
						],
						prereqs: [
							V.arcadeUpgradeInjectors < 1,
						],
					},
					{
						value: 1,
						text: `It has been retrofitted to milk lactating slaves${V.seeDicks !== 0 ? ` and cockmilk slaves capable of ejaculating` : ``}, though less efficiently than a dedicated facility.`,
					},
				],
			},
			{
				property: "arcadeUpgradeHealth",
				tiers: [
					{
						value: -1,
						upgraded: 0,
						text: `The arcade can be upgraded to include curative injectors in order to keep inmates from succumbing under the harsh treatment. You are assured the inmates won't like their time in the arcade any better; it is purely intended to keep them functional and ready for use around the clock. It comes equipped with two settings.`,
						link: `Install curative injectors`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += .1;

							App.UI.reload();
						},
						notes: [`will increase upkeep costs`],
					},
				],
			},
			{
				property: "arcadeUpgradeFuckdolls",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${capFirstChar(V.arcadeName)} is not equipped to convert inmates into standard Fuckdolls.`,
						link: `Upgrade the arcade to create Fuckdolls`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += .1;

							App.UI.reload();
						},
						notes: [`will increase upkeep costs`],
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "arcadeUpgradeFuckdolls",
				prereqs: [
					V.arcadeUpgradeFuckdolls > 0,
					App.Entity.facilities.arcade.hostedSlaves() > 0,
				],
				options: [
					{
						get text() {
							return `You have decided that the least popular inmate will be converted to a standard Fuckdoll this week.`;
						},
						link: `Activate`,
						value: 2,
					},
					{
						get text() {
							return `The arcade has automatic Fuckdollification functions, and you can decide to convert your least popular slave at the end of the week.`;
						},
						link: `Deactivate`,
						value: 1,
					},
				],
				nodes: [
					V.arcade > App.Entity.facilities.arcade.hostedSlaves() && V.fuckdolls > 0
						? `There is room in the arcade for ${V.arcade - App.Entity.facilities.arcade.hostedSlaves()} menial Fuckdolls. ${V.fuckdolls > 1
							? `They'll be more efficient in the arcade, so you restrain them here.`
							: `Your Fuckdoll will be more efficient serving in the arcade, so you send it here.`}`
						: ``,
				],
			},
			{
				property: "arcadeUpgradeHealth",
				prereqs: [
					V.arcadeUpgradeHealth > -1,
				],
				options: [
					{
						get text() {
							return `It has been upgraded with curative injectors, but they are currently turned off.`;
						},
						link: `Deactivate`,
						value: 0,
					},
					{
						get text() {
							return `It has been upgraded with curative injectors, which are working normally. Inmates will be kept alive and productive, so they may be held locked in place for as long as necessary and available for use.`;
						},
						link: `Normal power`,
						value: 1,
					},
					{
						get text() {
							return `It has been upgraded with curative injectors and set to maximum power. Inmates will be kept decently healthy so they can be held locked in place for as long as necessary while remaining productive throughout.`;
						},
						link: `Maximum power`,
						value: 2,
					},
				],
			},
			{
				property: "arcadeUpgradeFuckdolls",
				prereqs: [
					V.arcadeUpgradeFuckdolls > 0,
				],
				options: [
					{
						get text() {
							return `${capFirstChar(V.arcadeName)} is equipped to convert inmates into standard Fuckdolls. The converter can be put to work on your order.`;
						},
						link: `Deactivate`,
						value: 1,
					},
					{
						get text() {
							return `${capFirstChar(V.arcadeName)} is equipped to convert inmates into standard Fuckdolls. The converter is currently active and will convert the least popular girl at the end of the week.`;
						},
						link: `Single conversion`,
						value: 2,
					},
					{
						get text() {
							return `${capFirstChar(V.arcadeName)} is equipped to convert inmates into standard Fuckdolls. The converter is currently active and will convert underperforming girls at the end of the week.`;
						},
						link: `Bulk conversion`,
						value: 3,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get stats() {
		return App.UI.DOM.makeElement("div", App.Facilities.Arcade.Stats(true));
	}
};
