App.Facilities.Farmyard.farmyard = class Farmyard extends App.Facilities.Facility {
	constructor() {
		const farmyard = App.Entity.facilities.farmyard;
		const decommissionHandler = () => {
			if (V.farmMenials) {
				V.menials += V.farmMenials;
				V.farmMenials = 0;
			}

			V.farmyardName = "the Farmyard";
			V.farmyard = 0;
			V.farmyardDecoration = "standard";

			V.farmMenials = 0;
			V.farmMenialsSpace = 0;

			V.farmyardShows = 0;
			V.farmyardBreeding = 0;
			V.farmyardCrops = 0;

			V.farmyardKennels = 0;
			V.farmyardStables = 0;
			V.farmyardCages = 0;
			/*
			if (V.pit) {
				V.pit.animal = null;
			}
			*/
			V.farmyardUpgrades = {
				pump: 0,
				fertilizer: 0,
				hydroponics: 0,
				machinery: 0,
				seeds: 0
			};

			V.animals = {
				canine: [],
				hooved: [],
				feline: [],
			};

			V.active = {
				canine: null,
				hooved: null,
				feline: null,
			};

			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Manufacturing, "Farmyard", "Manufacturing");
		};

		super(
			farmyard,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Farmyard";
	}

	/** @returns {string} */
	get intro() {
		const text = [];
		const {canine, hooved, feline} = V.animals;
		const count = canine.length + hooved.length + feline.length;
		let collection = ``;

		if (count > 15) {
			collection = `enormous`;
		} else if (count > 10) {
			collection = `impressive`;
		} else if (count < 5) {
			collection = `pathetic`;
		}

		if (V.farmyardShows === 1) {
			text.push(`${this.facility.nameCaps} is an oasis of growth in the midst of the jungle of steel and concrete that is ${V.arcologies[0].name}. Animals are kept in pens, tended to by your slaves, while ${V.farmyardUpgrades.hydroponics
				? `rows of hydroponics equipment`
				: `basic dirt fields`} grow feed crops.`);
		} else if (V.farmyardShows === 2) {
			text.push(`${this.facility.nameCaps} is a large zoo, with a ticket booth at one end collecting patrons' ¤, a large open area where shows with animals are put on, and exhibits lining the exterior walls displaying your ${collection} collection of animals.`);
		} else {
			text.push(`${this.facility.nameCaps} is an oasis of growth in the midst of the jungle of steel and concrete that is ${V.arcologies[0].name}. Lush gardens are complemented by orchards and fields of various types of crops grow in ${V.farmyardUpgrades.hydroponics ? `large, complex, hydroponic setups` : `basic dirt fields`}.`);
		}

		text.push(this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is bustling with activity. Farmhands are hurrying about, on their way to feed animals and maintain farming equipment.`);
		} else if (this.facility.hostedSlaves()) {
			text.push(`${this.facility.nameCaps} is working steadily. Farmhands are moving about, looking after the animals and crops.`);
		} else if (S.Farmer) {
			text.push(`${S.Farmer.slaveName} is alone in ${V.farmyardName}, and has nothing to do but look after the animals and crops.`);
		} else {
			text.push(`${this.facility.nameCaps} is empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		const FS = App.Facilities.Farmyard.getDecoration();

		const res = FS[V.farmyardDecoration];

		if (!res) {
			throw new Error(`Unknown V.farmyardDecoration value of '${V.farmyardDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		const slaves = this.facility.hostedSlaves();
		const is = slaves === 1 ? `is` : `are`;

		return {
			desc: `It can support ${num(V.farmyard)} farmhands. There ${is} currently ${numberWithPluralOne(slaves, `farmhand`)} in ${V.farmyardName}.`,
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "pump",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is currently using the basic water pump that it came with.`,
						link: `Upgrade the water pump`,
						cost: 5000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;

							App.UI.reload();
						},
						notes: [
							`slightly decreases upkeep cost.`
						],
					},
					{
						value: 1,
						text: `The water pump in ${this.facility.name} is a more efficient model, slightly improving the amount of crops it produces.`,
					},
				],
				object: V.farmyardUpgrades,
			},
			{
				property: "fertilizer",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The fertilizer being used in ${this.facility.name} is the cheap, buy-in-bulk stuff you can purchase at the local supermarket.`,
						link: `Use a higher-quality fertilizer`,
						cost: 10000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;

							App.UI.reload();
						},
						notes: [
							`moderately increases crop yield`,
							`slightly increases upkeep costs`,
						],
						prereqs: [
							V.farmyardUpgrades.pump > 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} is using a specialized fertilizer created to result in a higher crop yield.`,
					},
				],
				object: V.farmyardUpgrades,
			},
			{
				property: "hydroponics",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `There is room enough in ${this.facility.name} to install a hydroponics system for irrigation.`,
						link: `Purchase an advanced hydroponics system`,
						cost: 25000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;

							App.UI.reload();
						},
						notes: [
							`moderately decreases upkeep costs`,
						],
						prereqs: [
							V.farmyardUpgrades.fertilizer > 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} is outfitted with an advanced hydroponics system, reducing the amount of water your crops consume and thus saving a bit on your water bill.`,
					},
				],
				object: V.farmyardUpgrades,
			},
			{
				property: "seeds",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The seeds ${this.facility.name} is using are the standard seeds one could pick up at the local farmers' market.`,
						link: `Purchase genetically modified seeds`,
						cost: 50000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;

							App.UI.reload();
						},
						notes: [
							`moderately increases crop yield`,
							`slightly increases upkeep costs`,
						],
						prereqs: [
							V.farmyardUpgrades.hydroponics > 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} is using genetically modified seeds, designed to produce a much greater yield while remaining more resistant to pests and disease.`,
					},
				],
				object: V.farmyardUpgrades,
			},
			{
				property: "machinery",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The machinery in ${this.facility.name} is equipment that was imported before the old world began to fall apart and is fairly old and outdated.`,
						link: `Upgrade the machinery`,
						cost: 100000 * V.upgradeMultiplierArcology,
						handler: () => {
							V.PC.skill.engineering += 0.1;

							App.UI.reload();
						},
						notes: [
							`moderately increases crop yield`,
							`slightly increases upkeep costs`,
						],
						prereqs: [
							V.farmyardUpgrades.seeds > 0
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} is using the latest in farming equipment and technology.`,
					},
				],
				object: V.farmyardUpgrades,
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "farmyardShows",
				prereqs: [
					this.facility.hostedSlaves() > 0,
					V.farmyardKennels > 0 || V.farmyardStables > 0 || V.farmyardCages > 0,
				],
				options: [
					{
						get text() { return `Slaves in ${V.farmyardName} are focusing their efforts on producing as much food as possible.`; },
						link: `Food only`,
						value: 0,
					},
					{
						get text() { return `Slaves in ${V.farmyardName} are both producing food and putting on shows with animals.`; },
						link: `Both food and shows`,
						value: 1,
					},
					{
						get text() { return `Slaves in ${V.farmyardName} are only putting on shows with animals.`; },
						link: `Shows only`,
						value: 2,
					},
				],
			},
			{
				property: "farmyardBreeding",
				prereqs: [
					!!V.seeBestiality,
					!!V.farmyardShows,
					!!V.animals.canine || !!V.animals.hooved || !!V.animals.feline,
				],
				options: [
					{
						get text() { return `Slaves in ${V.farmyardName} are not being bred with animals.`; },
						link: `End breeding`,
						value: 0,
					},
					{
						get text() { return `Slaves in ${V.farmyardName} are being bred with animals.`; },
						link: `Begin breeding`,
						value: 1,
					},
				],
			},
			{
				property: "farmyardRestraints",
				prereqs: [
					!!V.farmyardBreeding,
					V.farmyardShows !== 0,
				],
				options: [
					{
						get text() { return `Only disobedient slaves are being restrained.`; },
						link: `Restrain only disobedient slaves`,
						value: 0,
					},
					{
						get text() { return `All of the slaves are being restrained.`; },
						link: `Restrain all slaves`,
						value: 1,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get stats() {
		return App.UI.DOM.makeElement("div", App.Facilities.Farmyard.Stats(true));
	}

	/** @returns {HTMLDivElement} */
	get menials() {
		const div = document.createElement("div");

		const popCap = menialPopCap();
		const bulkMax = popCap.value - V.menials - V.fuckdolls - V.menialBioreactors;

		const menialPrice = Math.trunc(menialSlaveCost());
		const maxMenials = Math.trunc(Math.clamp(V.cash / menialPrice, 0, bulkMax));
		const unitCost = Math.trunc(1000 * V.upgradeMultiplierArcology);

		let links = [];

		// Transferring

		if (V.farmMenials) {
			div.append(`Assigned to ${V.farmyardName} ${V.farmMenials === 1 ? `is` : `are`} ${num(V.farmMenials)} menial ${V.farmMenials === 1 ? `slave` : `slaves`}, working to produce as much food for your arcology as they can. `);
		}

		if (V.farmMenialsSpace) {
			div.append(`You ${V.menials ? `own ${num(V.menials)}` : `don't own any`} free menial slaves. ${capFirstChar(V.farmyardName)} can house ${num(V.farmMenialsSpace)} menial slaves total, with ${num(V.farmMenialsSpace - V.farmMenials)} free spots. `);
		}

		if (V.farmMenialsSpace && V.farmMenials < V.farmMenialsSpace) {
			if (V.menials) {
				links.push(App.UI.DOM.link("Transfer in a menial slave", () => {
					V.menials--;
					V.farmMenials++;

					this.refresh();
				}));
			}

			if (V.menials >= 10 && V.farmMenials <= V.farmMenialsSpace - 10) {
				links.push(App.UI.DOM.link(`Transfer in ${num(10)} menial slaves`, () => {
					V.menials -= 10;
					V.farmMenials += 10;

					this.refresh();
				}));
			}

			if (V.menials >= 100 && V.farmMenials <= V.farmMenialsSpace - 100) {
				links.push(App.UI.DOM.link(`Transfer in ${num(100)} menial slaves`, () => {
					V.menials -= 100;
					V.farmMenials += 100;

					this.refresh();
				}));
			}

			if (V.menials) {
				links.push(App.UI.DOM.link(`Transfer in all free menial slaves`, () => {
					if (V.menials > V.farmMenialsSpace - V.farmMenials) {
						V.menials -= V.farmMenialsSpace - V.farmMenials;
						V.farmMenials = V.farmMenialsSpace;
					} else {
						V.farmMenials += V.menials;
						V.menials = 0;
					}

					this.refresh();
				}));
			}
		} else if (!V.farmMenialsSpace) {
			div.append(`${capFirstChar(V.farmyardName)} cannot currently house any menial slaves. `);
		} else {
			div.append(`${capFirstChar(V.farmyardName)} has all the menial slaves it can currently house assigned to it. `);
		}

		if (V.farmMenials) {
			links.push(App.UI.DOM.link(`Transfer out all menial slaves`, () => {
				V.menials += V.farmMenials;
				V.farmMenials = 0;

				this.refresh();
			}));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		// Trading

		links = [];

		if (V.farmMenialsSpace) {
			if (bulkMax > 0 || V.menials + V.fuckdolls + V.menialBioreactors === 0) {
				links.push(App.UI.DOM.link(`Buy ${num(1)}`, () => {
					V.menials++;
					V.menialSupplyFactor--;
					cashX(forceNeg(menialPrice), "farmyard");

					this.refresh();
				}));

				links.push(App.UI.DOM.link(`Buy ${num(10)}`, () => {
					V.menials += 10;
					V.menialSupplyFactor -= 10;
					cashX(forceNeg(menialPrice * 10), "farmyard");

					this.refresh();
				}));

				links.push(App.UI.DOM.link(`Buy ${num(100)}`, () => {
					V.menials += 100;
					V.menialSupplyFactor -= 100;
					cashX(forceNeg(menialPrice * 100), "farmyard");

					this.refresh();
				}));

				links.push(App.UI.DOM.link(`Buy maximum`, () => {
					V.menials += maxMenials;
					V.menialSupplyFactor -= maxMenials;
					cashX(forceNeg(maxMenials * menialPrice), "farmyard");

					this.refresh();
				}));
			}
		}

		if (V.farmMenials) {
			App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);
		}

		// Housing

		links = [];

		if (V.farmMenialsSpace < 2000) {
			App.UI.DOM.appendNewElement("div", div, `There is enough room in ${V.farmyardName} to build enough housing for an additional ${num(100)} menial slaves.`);

			App.UI.DOM.appendNewElement("div", div, makePurchase(`Build a new housing unit`, unitCost * 100, "capEx", {
				handler: () => {
					V.farmMenialsSpace += 100;
				},
				notes: [`increases housing by ${num(100)}`],
			}));
		}

		return div;
	}

	/** @returns {HTMLDivElement} */
	get kennels() {
		const div = document.createElement("div");

		const cost = Math.trunc(5000 * V.upgradeMultiplierArcology);

		const CL = V.animals.canine.length;
		let dogs = '';
		let canines = '';

		if (CL === 1) {
			const first = getAnimal(V.animals.canine[0]);
			dogs = `${first.name}s`;

			if (first.species === "dog") {
				canines = first.name;
			} else {
				canines = asPlural(first.species);
			}
		} else if (CL < 3) {
			dogs = `a couple different breeds of dogs`;

			if (V.animals.canine.every(c => getAnimal(c).species === "dog")) {
				canines = `a couple different breeds of dog`;
			} else {
				canines = `a couple different species of canine`;
			}
		} else {
			dogs = `all kinds of dogs`;
			canines = `all kinds of canines`;
		}

		if (V.farmyardKennels === 0) {
			div.append(
				`There is enough room in ${V.farmyardName} to build kennels to house canines.`,
				makePurchase(`Add kennels`, cost, "capEx", {
					notes: [
						`will incur upkeep costs`,
						`unlocks domestic canines`,
					],
					handler: () => {
						V.farmyardKennels = 1;
						V.PC.skill.engineering += .1;
					},
				}),
			);
		} else if (V.farmyardKennels === 1) {
			div.append(
				App.UI.DOM.passageLink(`Kennels`, "Farmyard Animals"), ` have been built in one corner of ${V.farmyardName}, and are currently ${CL < 1 ? `empty` : `occupied by ${dogs}`}.`,
				makePurchase(`Upgrade kennels`, cost * 2, "capEx", {
					notes: [
						`will incur additional upkeep costs`,
						`unlocks exotic canines`,
					],
					handler: () => {
						V.farmyardKennels = 2;
						V.PC.skill.engineering += .1;
					},
					prereqs: [
						[V.rep > 10000, `You must be more reputable to be able to house exotic canines.`],
					],
				})
			);
		} else if (V.farmyardKennels === 2) {
			div.append(App.UI.DOM.passageLink(`Large kennels`, "Farmyard Animals"), ` have been built in one corner of ${V.farmyardName}, and are currently ${CL < 1 ? `empty` : `occupied by ${canines}`}. `);
		}

		return div;
	}

	/** @returns {HTMLDivElement} */
	get stables() {
		const div = document.createElement("div");

		const cost = Math.trunc(5000 * V.upgradeMultiplierArcology);

		const HL = V.animals.hooved.length;

		const first = getAnimal(V.animals.hooved[0]);
		const hooved = HL === 1
			? `${first.name}s` : HL < 3
				? `several different types of hooved animals`
				: `all kinds of hooved animals`;

		if (V.farmyardStables === 0) {
			div.append(
				`There is enough room in ${V.farmyardName} to build a stables to house hooved animals.`,
				makePurchase(`Add stables`, cost, "capEx", {
					notes: [
						`will incur upkeep costs`,
						`unlocks domestic hooved animals`,
					],
					handler: () => {
						V.farmyardStables = 1;
						V.PC.skill.engineering += .1;
					},
				}),
			);
		} else if (V.farmyardStables === 1) {
			div.append(
				App.UI.DOM.passageLink(`Stables`, "Farmyard Animals"),
				` have been built in one corner of ${V.farmyardName}, and are currently ${HL < 1 ? `empty` : `occupied by ${hooved}`}.`,
				makePurchase(`Upgrade stables`, cost * 2, "capEx", {
					notes: [
						`will incur additional upkeep cost`,
						`unlocks exotic hooved animal`,
					],
					handler: () => {
						V.farmyardStables = 2;
						V.PC.skill.engineering += .1;
					},
					prereqs: [
						[V.rep > 10000, `You must be more reputable to be able to house exotic hooved animals.`],
					],
				})
			);
		} else if (V.farmyardStables === 2) {
			div.append(App.UI.DOM.passageLink(`Large stables`, "Farmyard Animals"), ` have been built in one corner of ${V.farmyardName}, and are currently ${HL < 1 ? `empty` : `occupied by ${hooved}`}. `);
		}

		return div;
	}

	/** @returns {HTMLDivElement} */
	get cages() {
		const div = document.createElement("div");

		const cost = Math.trunc(5000 * V.upgradeMultiplierArcology);

		const FL = V.animals.feline.length;
		let cats = '';
		let felines = '';

		if (FL === 1) {
			const first = getAnimal(V.animals.feline[0]);
			cats = `${first.name}s`;

			if (first.species === "cat") {
				felines = first.name;
			} else {
				felines = asPlural(first.species);
			}
		} else if (FL < 3) {
			cats = `a couple different breeds of cats`;

			if (V.animals.feline.every(c => getAnimal(c).species === "cat")) {
				felines = `a couple different breeds of cat`;
			} else {
				felines = `a couple different species of feline`;
			}
		} else {
			cats = `all kinds of cats`;
			felines = `all kinds of felines`;
		}

		if (V.farmyardCages === 0) {
			div.append(
				`There is enough room in ${V.farmyardName} to build cages to house felines.`,
				makePurchase(`Add cages`, cost, "capEx", {
					notes: [
						`will incur upkeep costs`,
						`unlocks domestic felines`,
					],
					handler: () => {
						V.farmyardCages = 1;
						V.PC.skill.engineering += .1;
					},
				})
			);
		} else if (V.farmyardCages === 1) {
			div.append(
				App.UI.DOM.passageLink(`Cages`, "Farmyard Animals"),
				` have been built in one corner of ${V.farmyardName}, and are currently ${FL < 1 ? `empty` : `occupied by ${cats}`}. `,
				makePurchase(`Upgrade cages`, cost * 2, "capEx", {
					notes: [
						`will increase upkeep cost`,
						`unlocks exotic feline`,
					],
					handler: () => {
						V.farmyardCages = 2;
						V.PC.skill.engineering += .1;
					},
					prereqs: [
						[V.rep > 10000, `You must be more reputable to be able to house exotic felines.`],
					],
				})
			);
		} else if (V.farmyardCages === 2) {
			div.append(App.UI.DOM.passageLink(`Large cages`, "Farmyard Animals"), ` have been built in one corner of ${V.farmyardName}, and are currently ${FL < 1 ? `empty` : `occupied by ${felines}`}.`);
		}

		return div;
	}

	/** @returns {DocumentFragment} */
	get animals() {
		const frag = new DocumentFragment();

		App.UI.DOM.appendNewElement("h2", frag, `Animals`);

		frag.append(
			this.kennels,
			this.stables,
			this.cages,
			removeAnimalHousing(),
		);

		return frag;

		function removeAnimalHousing() {
			const frag = new DocumentFragment();

			const cost = ((V.farmyardKennels + V.farmyardStables + V.farmyardCages) * 5000) * V.upgradeMultiplierArcology;

			if (V.farmyardKennels || V.farmyardStables || V.farmyardCages) {
				App.UI.DOM.appendNewElement("div", frag, makePurchase(`Remove the animal housing`, cost, "capEx", {
					handler: () => {
						V.farmyardKennels = 0;
						V.farmyardStables = 0;
						V.farmyardCages = 0;

						V.animals = {
							canine: [],
							hooved: [],
							feline: [],
						};

						V.active = {
							canine: null,
							hooved: null,
							feline: null,
						};
						/*
						if (V.pit) {
							V.pit.animal = null;
						}
						*/

						V.farmyardShows = 0;
						V.farmyardBreeding = 0;
						V.farmyardRestraints = 0;
					},
				}), ['margin-top']);
			}

			return frag;
		}
	}

	/** @returns {DocumentFragment[]} */
	get customNodes() {
		return [
			this.animals,
		];
	}
};
