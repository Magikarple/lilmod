App.Facilities.Nursery.nursery = class Nursery extends App.Facilities.Facility {
	constructor() {
		const nursery = App.Entity.facilities.nursery;
		const decommissionHandler = () => {
			V.nursery = 0;
			V.nurseryCribs = 0;
			V.nurseryDecoration = "standard";
			V.nannyInfluence = 0;
			V.cribs = [];
		};

		super(
			nursery,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Nursery";
	}

	/** @returns {string} */
	get intro() {
		// TODO: add in effects based on number of children hosted
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is bustling with activity. Nannies are busily moving about, feeding babies and changing diapers.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${this.facility.nameCaps} is working steadily. Nannies are moving about, cleaning up and feeding hungry children.`);
		} else if (S.Matron) {
			text.push(`${S.Matron.slaveName} is alone in ${this.facility.name}, and keeps the place clean and looks after the children ${getPronouns(S.Matron).himself}.`);
		} else {
			text.push(`${this.facility.nameCaps} is empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is run with the Roman dream in mind, with wide open windows exposing the babies to the elements. The sleek marble halls bring a sense of serenity and duty as wet nurses wander the halls.`,
			"Neo-Imperialist": `is modeled as an ultra high-tech nursing area, with omnipresent advanced machinery monitoring every heartbeat of the babies within, the soft glow of machines pulsating against the banners of your family crest lining the walls.`,
			"Aztec Revivalist": `is lined head to toe in illustrious Aztec gold. Tiny but notable subscripts lay in plaques to honor the mothers who died giving birth, the children of said mothers, alive or dead, are tirelessly watched over to tend to their every need.`,
			"Egyptian Revivalist": `is decorated by sleek, sandstone tablets, golden statues, and even grander Egyptian wall sculptures, many of them depicting the conception, birth, and raising of a child. Each babe is reverently wrapped in linen covers as they drift to sleep to the stories of mighty pharaohs and prosperous palaces.`,
			"Edo Revivalist": `is minimalist in nature, but the errant paintings of cherry blossoms and vibrant Japanese maples give a certain peaceful air as the caretakers do their duties.`,
			"Arabian Revivalist": `is decorated wall to wall with splendorous carvings and religious Hamsas meant to protect the fostering children.`,
			"Chinese Revivalist": `is ripe with Chinese spirit. Depictions of colorful dragons and oriental designs grace the halls, rooms, and cribs of the babies who reside inside.`,
			"Antebellum Revivalist": `is warm and inviting. Carved wooden panels line the lower half of the walls while gentle pastel colored wall paper decorates the upper half; a soft pink for where the girls stay, and a baby blue for the boys. Big windows of frosted glass shine onto a rich walnut floor. Hand-crafted cribs line the walls.`,
			"Chattel Religionist": `is decorated with childish religious cartoons and artistic tapestries of slaves bowing in submission, their themes always subsiding varying degrees of sexual worship. The caretakers that wander the halls obediently wear their habits, and never waste a moment to tenderly lull the children to sleep with stories of their prophet.`,
			"Degradationist": `is bare and sullen. The cries of the neglected children destined for slavery trying to find comfort in their burlap coverings echo the halls, while those that await freedom are raised among luxury and are taught to look down on their less fortunate peers.`,
			"Repopulationist": `is designed to be very open and public; a showing testament to your arcology's repopulation efforts. For those old enough to support them, they are strapped with big, but body warming, empathy bellies as to remind them of their destiny.`,
			"Eugenics": `is of utmost quality without a single pleasantry missing — if the parents are of the elite blood of course. While there are rare stragglers of unworthy genes, the child populace overall is pampered with warm rooms and plentiful small toys.`,
			"Asset Expansionist": `is not so much decorated as it is intelligently staffed. Every passerby, slave or not, burns the image of their jiggling asses and huge, wobbling tits into the minds of the children.`,
			"Transformation Fetishist": `is kept simple and clean. From their toys down to the nursemaids, the babies are exposed to the wonders of body transformation whenever possible.`,
			"Gender Radicalist": `is decorated by cheery cartoon depictions of slaves of many shapes, sizes, and genitals, all of them undeniably feminine. The elated smiles and yips of the nurses getting reamed constantly instill the appreciation of nice, pliable buttholes.`,
			"Gender Fundamentalist": `is simply designed and painted with soft feminine colors. The staff heavily encourage the children to play dress up and house, subtly sculpting their minds to proper gender norms and properly put them in line if they try to do otherwise.`,
			"Physical Idealist": `is furnished with kiddy health books and posters; their caretakers making painstakingly sure that the importance is drilled into their heads at a young age. Their food is often littered with vitamins and supplements to keep the children growing strong.`,
			"Supremacist": `is designed and structured to give those of ${V.arcologies[0].FSSupremacistRace} ethnicity the limelight of the nursery, while the others stay sectioned off and neglected to the world.`,
			"Subjugationist": `is made to foster and raise the young children of ${V.arcologies[0].FSSubjugationistRace} ethnicity. They are reminded of their place with every failure and are encouraged to submissively follow their stereotypes at a ripe young age.`,
			"Paternalist": `is well-stocked and by Paternalistic customs, constantly swaddle the children with love and attention. With the warm colors and sound of child laughter, to the untrained eye, the children actually seem free.`,
			"Pastoralist": `is decorated to make the children grow up thinking that a life focused on breast milk, cum, and other human secretions are part of the norm. The milky tits swaying above their cow-patterned cribs certainly help with that.`,
			"Maturity Preferentialist": `decorations remind the kids to respect those curvy and mature. The older nurserymaids are always flattered whenever the children try to act like adults and take care of the younger toddlers for them.`,
			"Youth Preferentialist": `is making young children the center of attention, their rooms supplied with plenty of toys, blankets, and surrogate mothers at their beck and call.`,
			"Body Purist": `is decorated to be very clean cut and sterilized with perfect corners and curves; symbolic of the human figure. Nursery maids are encouraged to show off their natural assets to show the children what the appropriate body should be.`,
			"Slimness Enthusiast": `constantly encourages the kids to try and keep their slim and cute physiques. They are given perfectly metered meals to make this possible.`,	// TODO: tie this in to food system
			"Hedonistic": `would make any toddler drool in amazement. Meals and naps every other hour, cribs stalked with toys and blankets, and plush slaves carry them to and fro without preamble. A delicious layer of baby fat is the ideal figure of a baby, and they couldn't be happier.`,
			"Intellectual Dependency": `is decorated in some way relating to Intellectual Dependency.`,	// TODO:
			"Slave Professionalism": `is decorated in some way relating to Slave Professionalism.`,	// TODO:
			"Petite Admiration": `has large photos and paintings on the walls depicting small, petite children enjoying ${this.facility.name}'s amenities and having fun together.`,
			"Statuesque Glorification": `has large photos and paintings on the walls depicting tall children enjoying ${this.facility.name}'s amenities and having fun together.`,
			"standard": `is as comfortable and child-friendly as it needs to be. They have everything they need to grow into a proper slave.`,
		};

		const res = FS[V.nurseryDecoration];

		if (!res) {
			throw new Error(`Unknown V.nurseryDecoration value of '${V.nurseryDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		const slaves = this.facility.hostedSlaves();
		const nannies = numberWithPluralOne(V.nursery, 'nanny', 'nannies');

		return {
			amount: 1,
			desc: `${this.facility.nameCaps} has room to support ${nannies}. There ${slaves === 1 ? `is currently ${num(slaves)} nanny` : `are currently ${num(slaves)} nannies`} taking care of ${numberWithPlural(V.nurseryChildren, 'child', 'children')}.`,
			maximum: 5,
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "nurseryWeight",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} has only the most basic monitoring systems available.`,
						link: `Upgrade the monitoring system`,
						cost: 1000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `The monitoring systems have been upgraded and allow for monitoring children's food intakes.`,
					},
				],
			},
			{
				property: "nurseryMuscles",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `There is space in one part of ${this.facility.name} where a playground and different toys and equipment could be installed to keep children fit and healthy.`,
						link: `Install a playground`,
						cost: 1000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `A playground and various toys and equipment have been installed in one part of ${this.facility.name}.`,
					},
				],
			},
			{
				property: "nurseryHormones",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} doesn't have any sort of artificial hormones designed for children.`,
						link: `Invest in purpose-built hormones`,
						cost: 1000 * V.upgradeMultiplierArcology,
						handler: () => V.PC.skill.engineering += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `Hormones designed specifically for children have been developed for ${this.facility.name}.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]}*/
	get rules() {
		return [
			{
				property: "MatronIgnoresFlaws",
				prereqs: [
					!!S.Matron,
				],
				options: [
					{
						get text() { return `${S.Matron.slaveName} has been instructed to ignore flaws in the nannies serving under ${getPronouns(S.Matron).him}.`; },
						link: `Ignore flaws`,
						value: 1,
					},
					{
						get text() { return `${S.Matron.slaveName} will attempt to fix flaws in nannies serving under ${getPronouns(S.Matron).him}.`; },
						link: `Fix flaws`,
						value: 0,
					},
				],
			},
			{
				property: "nurserySex",
				prereqs: [
					!!V.extremeUnderage,
				],
				options: [
					{
						get text() { return `${capFirstChar(V.nurseryName)} staff are not allowed to molest the children.`; },
						link: `Forbid`,
						value: 0,
					},
					{
						get text() { return `${capFirstChar(V.nurseryName)} staff are allowed to molest the children.`; },
						link: `Allow`,
						value: 1,
					},
				],
			},
			// TODO: really not happy with most of these – rework these
			{
				property: "nurseryWeightSetting",
				prereqs: [
					!!V.nurseryWeight,
				],
				options: [
					{
						get text() { return `Food intake is not being managed; children may end up malnourished.`; },
						link: `Don't manage`,
						value: 0,
					},
					{
						get text() { return `Food intake is being managed; children will be raised at a healthy weight.`; },
						link: `Manage`,
						value: 1,
					},
				],
			},
			{
				property: "nurseryMusclesSetting",
				prereqs: [
					!!V.nurseryMuscles,
				],
				options: [
					{
						get text() { return `Children are not getting any exercise; they may end up quite weak and frail.`; },
						link: `Don't manage`,
						value: 0,
					},
					{
						get text() { return `Exercise is being managed; children will be raised with average fitness.`; },
						link: `Manage`,
						value: 1,
					},
				],
			},
			{
				property: "nurseryHormonesSetting",
				prereqs: [
					!!V.nurseryHormones,
				],
				options: [
					{
						get text() { return `Artificial hormones are not being given; children will undergo normal puberty.`; },
						link: `Don't manage`,
						value: 0,
					},
					{
						get text() { return `Artificial hormone levels are being managed; children may experience precocious puberty.`; },
						link: `Manage`,
						value: 1,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get mothers() {
		const div = document.createElement("div");

		const text = [];

		let childrenReserved = 0;

		App.Events.addNode(div, text);

		const refreshDiv = document.createElement("div");
		refreshDiv.append(content());
		div.append(refreshDiv);

		return div;

		function content() {
			const div = document.createElement("div");

			div.append(
				// sort(),
				mothers(),
			);

			return div;
		}

		/* function sort() {
			const div = document.createElement("div");

			const sorts = [];
			let sort = 'Unsorted';

			sorts.push(App.UI.DOM.link(`Sort by Name`, () => {
				sort = 'Name';
				sortNurseryPossiblesByName();
			}));
			sorts.push(App.UI.DOM.link(`Sort by Reserved Nursery Spots`, () => {
				sort = 'Reserved Nursery Spots';
				sortNurseryPossiblesByReservedSpots();
			}));
			sorts.push(App.UI.DOM.link(`Sort by Pregnancy Week`, () => {
				sort = 'Pregnancy Week';
				sortNurseryPossiblesByPregnancyWeek();
			}));
			sorts.push(App.UI.DOM.link(`Sort by Number of Children`, () => {
				sort = 'Number of Children';
				sortNurseryPossiblesByPregnancyCount();
			}));

			div.append(
				`Sorting: ${sort}`,
				App.UI.DOM.generateLinksStrip(sorts),
			);

			return div;
		}*/ // Was not working

		function mothers() {
			const el = new DocumentFragment();
			let r = [];
			let eligibility = 0;
			let linkArray;
			const reservedChildrenN = FetusGlobalReserveCount('nursery');
			const freeRooms = V.nurseryCribs - V.nurseryChildren;
			const reservedChildrenI = FetusGlobalReserveCount('incubator');
			const incubatorSlaves = V.incubator.tanks.length;
			const freeTanks = V.incubator.capacity - incubatorSlaves;
			r.push(`Reserve an eligible mother-to-be's child to be placed in a room upon birth. Of ${V.nurseryCribs} rooms, ${numberWithPlural(freeRooms, 'is', 'are')} unoccupied. Of those, ${numberWithPlural(FetusGlobalReserveCount("nursery"), 'room is', 'rooms are')} reserved.`);
			if (V.incubator.capacity > 0) {
				r.push(`Of ${V.incubator.capacity} incubation tanks, ${numberWithPlural(freeTanks, 'is', 'are')} unoccupied. Of those, ${numberWithPlural(FetusGlobalReserveCount("incubator"), 'tank is', 'tanks are')} reserved.`);
			}

			App.Events.addNode(el, r, "div");

			const sortingOptions = new Map([
				["Name", "data-name"],
				["Reserved Nursery Spots", "data-reserved-spots-nursery"],
				["Reserved Incubator Spots", "data-reserved-spots-incubator"],
				["Pregnancy Week", "data-preg-week"],
				["Number of Children", "data-preg-count"],
			]);

			if (V.slaves.length > 0) {
			/**
			 * @param {Map<string, string>} sortingOptions
			 */
				const sortingBarFunc = function(sortingOptions) {
					const el = new DocumentFragment();
					App.UI.DOM.appendNewElement("span", el, "Sorting: ", "note");
					const linkArray = [];
					for (const [title, attr] of sortingOptions) {
						if (V.sortIncubatorList === title) {
							linkArray.push(App.UI.DOM.makeElement("span", title, "bold"));
						} else {
							linkArray.push(
								App.UI.DOM.link(
									title,
									() => {
										V.sortIncubatorList = title;
										sortBy(attr);
										jQuery(sortingBar).empty().append(sortingBarFunc(sortingOptions));
									}
								)
							);
						}
					}
					el.append(App.UI.DOM.generateLinksStrip(linkArray));
					return el;
				};

				const sortingBar = document.createElement("div");
				sortingBar.classList.add("border-bottom");

				V.sortIncubatorList = V.sortIncubatorList || 'Unsorted';
				sortingBar.append(sortingBarFunc(sortingOptions));
				el.append(sortingBar);
			}

			const qlNursery = document.createElement("div");
			for (const slave of V.slaves) {
				if (slave.preg > 0 && slave.pregKnown === 1 && slave.eggType === "human") {
					const r = [];
					const reserveDisallowed = (slave.assignment === Job.DAIRY && V.dairyPregSetting > 0) || slave.assignment === Job.AGENT || slave.assignment === Job.AGENTPARTNER;
					if (!reserveDisallowed) {
						const {
							His, his
						} = getPronouns(slave);
						const freeRooms = V.nurseryCribs - V.nurseryChildren;
						const WL = slave.womb.length;
						const reservedIncubator = WombReserveCount(slave, "incubator");
						const reservedNursery = WombReserveCount(slave, "nursery");
						const momEl = document.createElement("p");
						momEl.id = "slave-" + slave.ID;
						momEl.classList.add("possible");

						momEl.setAttribute("data-preg-count", slave.womb.length.toString());
						momEl.setAttribute("data-reserved-spots-nursery", reservedNursery.toString());
						momEl.setAttribute("data-reserved-spots-incubator", reservedIncubator.toString());
						momEl.setAttribute("data-preg-week", slave.pregWeek.toString());
						momEl.setAttribute("data-name", SlaveFullName(slave));

						linkArray = [];
						const choices = document.createElement("div");
						choices.classList.add("choices");
						r.push(App.UI.DOM.slaveDescriptionDialog(slave));
						r.push(`is ${slave.pregWeek} ${(slave.pregWeek === 1) ? `week` : `weeks`} pregnant with`);
						if (slave.pregSource === 0 || slave.preg <= 5) {
							r.push(`someone's${(slave.preg <= 5) ? `, though it is too early to tell whose,` : ``}`);
						} else if (slave.pregSource === -1) {
							r.push(`your`);
						} else if (slave.pregSource === -2) {
							r.push(`a citizen's`);
						} else if (slave.pregSource === -3) {
							r.push(`your Master's`);
						} else if (slave.pregSource === -4) {
							r.push(`another arcology owner's`);
						} else if (slave.pregSource === -5) {
							r.push(`your client's`);
						} else if (slave.pregSource === -6) {
							r.push(`the Societal Elite's`);
						} else if (slave.pregSource === -7) {
							r.push(`the lab's`);
						} else if (slave.pregSource === -9) {
							r.push(`the Futanari Sisters'`);
						} else {
							const father = getSlave(slave.pregSource);
							if (father) {
								r.push(`${father.slaveName}'s`);
							} else if (WL === 1) {
								r.push("a");
							}
						}
						if (WL > 1) {
							r.push(`${WL} babies.`);
						} else {
							r.push(`baby.`);
						}
						if (reservedNursery > 0) {
							childrenReserved = 1;
							if (WL === 1) {
								r.push(`${His} child`);
							} else if (reservedNursery < WL) {
								r.push(`${reservedNursery} of ${his} children`);
							} else if (WL === 2) {
								r.push(`Both of ${his} children`);
							} else {
								r.push(`All ${reservedNursery} of ${his} children`);
							}
							r.push(`will be placed in ${V.nurseryName}.`);
							if ((reservedIncubator + reservedNursery < WL) && (reservedChildrenN < freeRooms)) {
								if (V.pregnancyMonitoringUpgrade === 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Inspect pregnancy`,
											() => {
												V.AS = slave.ID;
											},
											[],
											`Analyze Pregnancy`
										)
									);
								}
								linkArray.push(
									App.UI.DOM.link(
										`Keep another child here`,
										() => {
											WombAddToGenericReserve(slave, 'nursery', 1);
											refresh();
										}
									)
								);
								if (reservedNursery > 0) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep one less child here`,
											() => {
												WombCleanGenericReserve(slave, 'nursery', 1);
												refresh();
											}
										)
									);
								}
								if (reservedNursery > 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep none of ${his} children here`,
											() => {
												WombCleanGenericReserve(slave, 'nursery', 9999);
												refresh();
											}
										)
									);
								}
								if ((reservedChildrenN + WL - reservedNursery) <= freeRooms) { // GammaNote Maths Order
									linkArray.push(
										App.UI.DOM.link(
											`Keep the rest of ${his} children here`,
											() => {
												WombAddToGenericReserve(slave, 'nursery', 9999);
												refresh();
											}
										)
									);
								}
							} else if ((reservedNursery === WL) || (reservedChildrenN === freeRooms) || (reservedIncubator + reservedNursery === WL)) {
								if (V.pregnancyMonitoringUpgrade === 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Inspect pregnancy`,
											() => {
												V.AS = slave.ID;
											},
											[],
											`Analyze Pregnancy`
										)
									);
								}
								if (reservedNursery > 0) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep one less child here`,
											() => {
												WombCleanGenericReserve(slave, 'nursery', 1);
												refresh();
											}
										)
									);
								}
								if (reservedNursery > 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep none of ${his} children here`,
											() => {
												WombCleanGenericReserve(slave, 'nursery', 9999);
												refresh();
											}
										)
									);
								}
							}
						} else if (reservedIncubator + reservedNursery < WL ) {
							r.push(`You have `);
							if (freeRooms === 1) {
								r.push(`an <span class="lime">available aging room.</span>`);
							} else {
								r.push(`<span class="lime">available aging rooms.</span>`);
							}
							if (V.pregnancyMonitoringUpgrade === 1) {
								linkArray.push(
									App.UI.DOM.link(
										`Inspect pregnancy`,
										() => {
											V.AS = slave.ID;
										},
										[],
										`Analyze Pregnancy`
									)
								);
							}
							linkArray.push(
								App.UI.DOM.link(
									`Keep ${(WL > 1) ? "a" : "the"} child here`,
									() => {
										WombAddToGenericReserve(slave, 'nursery', 1);
										refresh();
									}
								)
							);
							if ((WL > 1) && (reservedChildrenN + WL - reservedNursery) <= freeRooms) {
								linkArray.push(
									App.UI.DOM.link(
										`Keep all of ${his} children here`,
										() => {
											WombAddToGenericReserve(slave, 'nursery', 9999);
											refresh();
										}
									)
								);
							}
						}
						if (V.incubator.capacity > 0) {
							if (reservedIncubator > 0) { // GammaNote
								childrenReserved = 1;
								if (WL === 1) {
									r.push(`${His} child`);
								} else if (reservedIncubator < WL) {
									r.push(`${reservedIncubator} of ${his} children`);
								} else if (WL === 2) {
									r.push(`Both of ${his} children`);
								} else {
									r.push(`All ${reservedIncubator} of ${his} children`);
								}
								r.push(`will be placed in ${V.incubator.name}.`);
								if ((reservedIncubator + reservedNursery < WL) && (reservedChildrenI < freeTanks)) {
									if (V.pregnancyMonitoringUpgrade === 1) {
										linkArray.push(
											App.UI.DOM.link(
												`Inspect pregnancy`,
												() => {
													V.AS = slave.ID;
												},
												[],
												`Analyze Pregnancy`
											)
										);
									}
									linkArray.push(
										App.UI.DOM.link(
											`Keep another child in ${V.incubator.name}`,
											() => {
												WombAddToGenericReserve(slave, 'incubator', 1);
												refresh();
											}
										)
									);
									if (reservedIncubator > 0) {
										linkArray.push(
											App.UI.DOM.link(
												`Keep one less child in ${V.incubator.name}`,
												() => {
													WombCleanGenericReserve(slave, 'incubator', 1);
													refresh();
												}
											)
										);
									}
									if (reservedIncubator > 1) {
										linkArray.push(
											App.UI.DOM.link(
												`Keep none of ${his} children in ${V.incubator.name}`,
												() => {
													WombCleanGenericReserve(slave, 'incubator', 9999);
													refresh();
												}
											)
										);
									}
									if ((reservedChildrenI + WL - reservedIncubator) <= freeTanks) { // GammaNote maths order?
										linkArray.push(
											App.UI.DOM.link(
												`Keep the rest of ${his} children in ${V.incubator.name}`,
												() => {
													WombAddToGenericReserve(slave, 'incubator', 9999);
													refresh();
												}
											)
										);
									}
								}
							} else if ((reservedIncubator === WL) || (reservedChildrenI === freeTanks) || (reservedIncubator + reservedNursery === WL)) {
								if (V.pregnancyMonitoringUpgrade === 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Inspect pregnancy`,
											() => {
												V.AS = slave.ID;
											},
											[],
											`Analyze Pregnancy`
										)
									);
								}
								if (reservedIncubator > 0) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep one less child in ${V.incubator.name}`,
											() => {
												WombCleanGenericReserve(slave, 'incubator', 1);
												refresh();
											}
										)
									);
								}
								if (reservedIncubator > 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep none of ${his} children in ${V.incubator.name}`,
											() => {
												WombCleanGenericReserve(slave, 'incubator', 9999);
												refresh();
											}
										)
									);
								}
							} else if (reservedIncubator + reservedNursery < WL ) {
								r.push(`You have `);
								if (freeTanks === 1) {
									r.push(`an <span class="lime">available aging tank.</span>`);
								} else {
									r.push(`<span class="lime">available aging tanks.</span>`);
								}
								if (V.pregnancyMonitoringUpgrade === 1) {
									linkArray.push(
										App.UI.DOM.link(
											`Inspect pregnancy`,
											() => {
												V.AS = slave.ID;
											},
											[],
											`Analyze Pregnancy`
										)
									);
								}
								linkArray.push(
									App.UI.DOM.link(
										`Keep ${(WL > 1) ? "a" : "the"} child in ${V.incubator.name}`,
										() => {
											WombAddToGenericReserve(slave, 'incubator', 1);
											refresh();
										}
									)
								);
								if ((WL > 1) && (reservedChildrenN + WL - reservedNursery) <= freeRooms) {
									linkArray.push(
										App.UI.DOM.link(
											`Keep all of ${his} children in ${V.incubator.name}`,
											() => {
												WombAddToGenericReserve(slave, 'incubator', 9999);
												refresh();
											}
										)
									);
								}
							}
						}
						eligibility = 1;

						App.Events.addNode(momEl, r, "div");
						choices.append(App.UI.DOM.generateLinksStrip(linkArray));
						momEl.append(choices);
						qlNursery.append(momEl);
					}
				}
			}
			sortByPreviousSort();
			el.append(qlNursery);
			if (eligibility === 0) {
				App.UI.DOM.appendNewElement("div", el, `You have no pregnant slaves bearing eligible children.`, "note");
			}

			if (reservedChildrenN !== 0 || reservedChildrenI !== 0 || childrenReserved === 1) { // the oops I made it go negative somehow button
				App.UI.DOM.appendNewElement(
					"div",
					el,
					App.UI.DOM.link(
						"Clear all reserved children",
						() => {
							for (const slave of V.slaves) {
								if (WombReserveCount(slave, "incubator") !== 0) {
									WombCleanGenericReserve(slave, 'incubator', 9999);
								}
								if (WombReserveCount(slave, "nursery") !== 0) {
									WombCleanGenericReserve(slave, 'nursery', 9999);
								}
							}
							WombCleanGenericReserve(V.PC, 'incubator', 9999);
							WombCleanGenericReserve(V.PC, 'nursery', 9999);
							refresh();
						}
					)
				);
			}
			return el;

			function refresh() {
				App.UI.reload();
			}

			function sortBy(attrName) {
				let sortedNurseryPossibles = $(qlNursery).children('p.possible').detach();
				sortedNurseryPossibles = sortDomObjects(sortedNurseryPossibles, attrName);
				$(sortedNurseryPossibles).appendTo(qlNursery);
			}

			function sortByPreviousSort() {
				const sortAttr = sortingOptions.get(V.sortIncubatorList);
				if (sortAttr) {
					sortBy(sortAttr);
				}
			}
		}
	}

	/** @returns {HTMLDivElement} */
	get children() {
		const div = document.createElement("div");

		div.append(App.Facilities.Nursery.childList());

		return div;
	}

	/** @returns {HTMLDivElement} */
	get targetAge() {
		const div = document.createElement("div");

		const links = [
			App.UI.DOM.link(`Minimum Legal Age`, () => {
				V.targetAgeNursery = V.minimumSlaveAge;

				App.UI.reload();
			}, [], '', `Will not be applied to rooms in use.`),
			App.UI.DOM.link(`Average Age of Fertility`, () => {
				V.targetAgeNursery = V.fertilityAge;

				App.UI.reload();
			}, [], '', `Will not be applied to rooms in use.`),
			App.UI.DOM.link(`Average Age of Potency`, () => {
				V.targetAgeNursery = V.potencyAge;

				App.UI.reload();
			}, [], '', `Will not be applied to rooms in use.`),
			App.UI.DOM.link(`Legal Adulthood`, () => {
				V.targetAgeNursery = 18;

				App.UI.reload();
			}, [], '', `Will not be applied to rooms in use.`),
		];

		div.append(
			`Target age for release: `,
			App.UI.DOM.makeTextBox(V.targetAgeNursery, target => {
				V.targetAgeNursery = target;

				App.UI.reload();
			})
		);

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	/** @returns {HTMLDivElement} */
	get rooms() {
		const div = document.createElement("div");

		const cost = Math.trunc(5000 * V.upgradeMultiplierArcology);
		const links = [];

		div.append(`It can support ${numberWithPlural(V.nurseryCribs, 'child', 'children')}. There ${V.nurseryChildren === 1 ? `is currently` : `are currently`} ${numberWithPlural(V.nurseryChildren, 'room')} in use in ${this.facility.name}.`);

		links.push(App.UI.DOM.link(`Add room for another 5 children`, () => {
			cashX(forceNeg(cost), "nursery");
			V.nurseryCribs += 5;

			App.UI.reload();
		}, [], '', `Costs ${cashFormat(cost)} and will increase upkeep costs.`));

		if (V.nurseryCribs > 1 && FetusGlobalReserveCount("nursery") < V.nurseryCribs - V.nurseryChildren) {
			links.push(App.UI.DOM.link(`Remove a room`, () => {
				cashX(forceNeg(cost / 5), "nursery");
				V.nurseryCribs -= 1;

				App.UI.reload();
			}, [], '', `Costs ${cashFormat(cost / 5)} and will decrease upkeep costs.`));
		}

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.generateLinksStrip(links), ['indent']);

		return div;
	}

	/** @returns {HTMLDivElement[]} */
	get customNodes() {
		return [
			this.rooms,
			this.mothers,
			this.children,
			this.targetAge,
		];
	}
};
