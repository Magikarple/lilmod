App.Facilities.Brothel.brothel = class Brothel extends App.Facilities.Facility {
	constructor() {
		const brothel = App.Entity.facilities.brothel;
		const decommissionHandler = () => {
			V.brothel = 0;
			V.brothelUpgradeDrugs = 0;
			V.brothelDecoration = "standard";
			V.brothelAdsSpending = 0;

			App.Arcology.cellUpgrade(V.building, App.Arcology.Cell.Shop, "Brothel", "Shops");
		};

		super(
			brothel,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Brothel";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is decorated as a Roman whorehouse. Refreshments are served at a bar, and someone is playing pipes in the back.`,
			"Neo-Imperialist": `is decorated as a seamless intersection of technology and tradition. Slaves dressed in tight bodysuits and skimpy nanoweave flit underneath the glow of sleek walls and flowing feudal banners.`,
			"Aztec Revivalist": `is decorated as an Aztec ode to fertility and nature. Clients may sacrifice a bit of blood to honor the goddess of Filth or to partake in a fertility ritual before joining the girl of their choosing.`,
			"Egyptian Revivalist": `is decorated as an ancient Egyptian fertility temple. Customers are bade relax on couches next to running water so that slaves may dance to entice them.`,
			"Edo Revivalist": `is furnished as an Edo period pleasure house, seedy by the standards of the time. Still, girls usually keep their clothes on until they lead patrons back behind the sliding paper screens, though this does not stop silhouettes of the activities within from being visible on them.`,
			"Arabian Revivalist": `is furnished as an Arabian fleshmarket, with the merchandise standing on little platforms, prices visible. Customers are permitted to fondle before making a decision and dragging a girl back behind a curtain.`,
			"Chinese Revivalist": `is furnished as an old Chinese pleasure house, with each girl set up in her own low room. They stand outside the doors, luring customers back one by one.`,
			"Antebellum Revivalist": `is furnished as an old-fashioned Southern bordello, all dark wood and red velvet. Corseted courtesans fan themselves languidly in the foyer as they entice their customers.`, // quick fix, feel free to rewrite
			"Chattel Religionist": `is decorated as a place of carnal worship. The air is scented by censers, and the slaves here maintain an air of holiness even when being sodomized in public.`,
			"Degradationist": `is decorated to look like a dungeon. The décor involves a lot of black leather and burnished steel, and the slaves on offer are mostly chained to beds and walls.`,
			"Repopulationist": `is clean and full of soft couches and chairs for its pregnant whores to lounge upon while showing off their assets. Several of the rooms are prepped to allow a whore to give birth in front of an audience. A supply of freshly squeezed breast milk is available on tap.`,
			"Eugenics": `is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping and pole dancing on a stage. Safe sex is greatly encouraged. The real action happens in several reserved rooms dedicated to society's best, since the loud music drowns out private conversations.`,
			"Asset Expansionist": `is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping and pole dancing on a stage.`,
			"Transformation Fetishist": `is sterile and clean. Interactive screens on the walls list the whores and their modifications in clinical detail.`,
			"Gender Radicalist": `is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting every possible combination of human sexual congress.`,
			"Gender Fundamentalist": `is decorated to look like an old world whorehouse. Screens on the walls are showing pornography starring the whores, with prices flashing after each sex act.`,
			"Physical Idealist": `is decorated to look like a club. Loud music is playing, and the whores that aren't with customers are stripping on a stage. There is a distinct smell of sweat, and there is as much emphasis on the strippers' muscles as their breasts.`,
			"Supremacist": `is decorated like an old world gentleman's club. The pictures on the wall depict degradation of every race on earth, except ${V.arcologies[0].FSSupremacistRace} people.`,
			"Subjugationist": `is decorated to celebrate the degradation of ${V.arcologies[0].FSSubjugationistRace} whores. The whores greet customers in stereotypical ${V.arcologies[0].FSSubjugationistRace} accents.`,
			"Paternalist": `is decorated to look like a trendy bar. Whores are encouraged to meet customers for a drink and get to know them a little before heading back into a private room.`,
			"Pastoralist": `is decorated to look like a dairy. Though it isn't one, there is an intense sexual focus on boobs and lactation, and all the whores have their sizes and productivity proudly posted.`,
			"Maturity Preferentialist": `is decorated to look like a refined bar. It has a row of sturdy backless barstools, perfect for a delectable selection of succulent MILFs to perch on.`,
			"Youth Preferentialist": `is decorated to look like the sort of bar old world students visit on spring break. Vapid music is playing, and when whores aren't with customers, they dance and make out with each other to attract some.`,
			"Body Purist": `is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting idealized human forms in the act of love.`,
			"Slimness Enthusiast": `is decorated to look like an old world bordello. The rich décor includes erotic photography and pornographic statuary, depicting slim, girlish figures playing, dancing, and loving.`,
			"Hedonistic": `is comfortable and full of soft couches and chairs for its overweight whores to lounge upon between clients ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `and enjoy a plate of snacks` : `and enjoy a big cup of slave food`}. The smells of fresh baked goods are pumped into the facility to mask the smell of sweat. It's not unusual for a client to fuck a whore right on her chosen couch, since the effort of moving is often too much.`,
			"Intellectual Dependency": `is decorated to look like a club. The sexually charged atmosphere has the whores horny and making out with each other. Customers are expected to come in, grab a bimbo to their tastes, and pull them off to have a good time.`,
			"Slave Professionalism": `is decorated to look like a high-class bordello. Courtesans are expected to greet and entice customers to join them for a night they'll never forget.`,
			"Petite Admiration": `is decorated to look like an old world whorehouse. The whores have personal platforms to stand on for inspection from their taller customers.`,
			"Statuesque Glorification": `is decorated to look like an old world bordello. The rich décor specializes in pornographic statuary, depicting towering human forms in the act of love.`,
			"standard": `is utilitarian. There's a businesslike foyer with an area for the merchandise to stand. Customers make their selection (or selections) and then lead the whores back into little rooms.`,
		};

		const res = FS[V.brothelDecoration];

		if (!res) {
			throw new Error(`Unknown V.brothelDecoration value of '${V.brothelDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		const is = num => num === 1 ? `is` : `are`;
		const text = [];

		text.push(`It can support ${num(V.brothel)} whores. There ${is(this.facility.hostedSlaves())} currently ${numberWithPluralOne(this.facility.hostedSlaves(), 'whore')} working in ${V.brothelName}.`);

		if (V.brothelAdsSpending > 0) {
			text.push(`Screens outside the entrance are showing porn to advertise ${V.brothelName}.`);

			if (V.brothelAdsOld === 1) {
				text.push(`The featured slave actresses are all MILFs.`);
			} else if (V.brothelAdsOld === -1) {
				text.push(`The featured slave actresses are all nice and young.`);
			} else if (V.brothelAdsOld === -2) {
				text.push(`The featured slave actresses are all teenagers.`);
			} else if (V.brothelAdsOld === -3) {
				text.push(`The featured slave actresses are all lolis.`);
			} else {
				text.push(`The featured slave actresses vary in age.`);
			}

			if (V.brothelAdsStacked === 1) {
				text.push(`Lots of bouncing breasts and butts`);
			} else if (V.brothelAdsStacked === -1) {
				text.push(`Lots of trim breasts and shapely butts`);
			} else {
				text.push(`A variety of breast and butt sizes and shapes`);
			}

			text.push(`are on display, and`);

			if (V.brothelAdsImplanted === 1) {
				text.push(`most of these are augmented by implants.`);
			} else if (V.brothelAdsImplanted === -1) {
				text.push(`they're all natural.`);
			} else {
				text.push(`some are augmented by implants.`);
			}

			if (V.seePreg) {
				if (V.brothelAdsPreg === 1) {
					text.push(`Most of the slaves have firm, rounded bellies.`);
				} else if (V.brothelAdsPreg === -1) {
					text.push(`Most of the slaves have firm, flat bellies.`);
				} else {
					text.push(`Some of the slaves are pregnant.`);
				}
			}

			if (V.brothelAdsModded === 1) {
				text.push(`Everything is heavily pierced and tattooed.`);
			} else if (V.brothelAdsModded === -1) {
				text.push(`Everything is free of tattoos and piercings.`);
			} else {
				text.push(`Some of these assets are tattooed and pierced, and some aren't.`);
			}

			text.push(`The slaves in the ads are`);

			if (V.brothelAdsXX === 1) {
				text.push(`sucking dick and taking cock in their pussies and asses.`);
			} else if (V.brothelAdsXX === -1) {
				text.push(`sucking dick and taking cock in their pussies and asses.`);
			} else {
				if (V.brothelAdsXX) {
					text.push(`sucking cock and being assfucked while their dicks flop around.`);
				} else {
					text.push(`sucking dick and taking anal, and the ones that have pussies are being fucked there, too.`);
				}
			}

			text.push(`The ads are shown on media across ${V.arcologies[0].name}.`);

			if (V.brothelAdsXX === 1 && V.brothelAdsImplanted === 1 && V.brothelAdsStacked === 1) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to rent a${V.brothelAdsPreg ? ` pregnant` : ``} bimbo's pussy.`);
			} else if (V.brothelAdsXX === 1 && V.brothelAdsOld === 1) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to rent a${V.brothelAdsPreg ? ` pregnant` : ``} MILF's tits.`);
			} else if (V.brothelAdsXX === 1 && V.brothelAdsOld === -3) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to rent${V.brothelAdsPreg ? ` a pregnant` : ``}${V.brothelAdsStacked ? V.brothelAdsPreg !== 1 ? ` an` : `` : `oppai`} loli.`);
			} else if (V.brothelAdsXX === 1 && V.brothelAdsPreg === 1) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to pound some pregnant pussy.`);
			} else if (V.brothelAdsXX === -1 && V.brothelAdsStacked === 1) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to rent a shemale's asspussy.`);
			} else if (V.brothelAdsXX === -1 && V.brothelAdsStacked === -1) {
				text.push(`As a result, ${V.brothelName} is known as the place to go if you want to rent a trap's tight ass.`);
			}
		}

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${capFirstChar(V.brothelName)} is bustling with activity. Customers are coming and going and slave girls are displaying themselves. When a slave catches a customer's eye, he leads her back into a little cubicle.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${capFirstChar(V.brothelName)} is working steadily. Customers are present and slave girls are on offer. When a slave catches a customer's eye, he leads her back into a little cubicle.`);
		} else if (S.Madam) {
			text.push(`${S.Madam.slaveName} is alone in ${V.brothelName}, and has nothing to do but keep the place clean and plan future sales efforts.`);
		} else {
			text.push(`${capFirstChar(V.brothelName)} is empty and desolate.`);
		}

		const desc = text.join(' ');

		return {
			desc,
			removeSlave: "whore",
		};
	}

	/** @returns {FC.IUpgrade[]}*/
	get upgrades() {
		return [
			{
				property: "brothelUpgradeDrugs",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `It is a standard brothel.`,
						link: `Upgrade the brothel with aphrodisiac injection systems`,
						cost: 10000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => V.PC.skill.engineering += .1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 0.1,
						text: `It has been upgraded with an injection system that can keep whores horny and ready to fuck at the drop of a hat.`,
					},
					{
						value: 1,
						text: `It has been upgraded with an injection system that can keep whores horny and ready to fuck at the drop of a hat.`,
					},
					{
						value: 2,
						text: `It has been upgraded with an injection system that can keep whores horny and ready to fuck at the drop of a hat.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "brothelUpgradeDrugs",
				prereqs: [
					V.brothelUpgradeDrugs > 0,
				],
				options: [
					{
						get text() {
							return `It has been upgraded with aphrodisiac injection systems that monitor the whores and adjust dosage to keep them healthy but desperately horny and hopelessly addicted. The aphrodisiac systems are currently disabled.`;
						},
						link: `Deactivate`,
						value: 0.1,
					},
					{
						get text() {
							return `It has been upgraded with aphrodisiac injection systems that monitor the whores and adjust dosage to keep them healthy but desperately horny and hopelessly addicted. The aphrodisiac systems are currently applying a moderate dosage of aphrodisiac.`;
						},
						link: `Standard`,
						value: 1,
					},
					{
						get text() {
							return `It has been upgraded with aphrodisiac injection systems that monitor the whores and adjust dosage to keep them healthy but desperately horny and hopelessly addicted. The aphrodisiac systems are currently applying an extreme dosage of aphrodisiac.`;
						},
						link: `Extreme`,
						value: 2,
					},
				],
			},
			{
				property: "MadamIgnoresFlaws",
				prereqs: [
					!!S.Madam,
				],
				options: [
					{
						get text() {
							const {him} = getPronouns(S.Madam);
							return `${S.Madam.slaveName} will attempt to fix flaws in whores serving under ${him}.`;
						},
						link: `Fix flaws`,
						value: 0,
					},
					{
						get text() {
							const {him} = getPronouns(S.Madam);
							return `${S.Madam.slaveName} has been instructed to ignore flaws in the whores serving under ${him}.`;
						},
						link: `Ignore flaws`,
						value: 1,
					},
				],
			},
			{
				property: "MadamNoSex",
				prereqs: [
					!!S.Madam,
				],
				options: [
					{
						get text() {
							const {he, him, himself} = getPronouns(S.Madam);
							return `${S.Madam.slaveName} will whore ${himself} out when ${he} doesn't have enough whores serving under ${him}.`;
						},
						link: `Serve clients`,
						value: 0,
					},
					{
						get text() {
							const {he, himself} = getPronouns(S.Madam);
							return `${S.Madam.slaveName} will not whore ${himself} out even if ${he} has time.`;
						},
						link: `Don't serve clients`,
						value: 1,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get stats() {
		return App.UI.DOM.makeElement("div", App.Facilities.Brothel.Stats(true));
	}

	/** @returns {HTMLDivElement} */
	get ads() {
		const div = document.createElement("div");

		const profit = V.lastWeeksCashIncome.brothelAds + V.lastWeeksCashExpenses.brothelAds;

		App.Events.addNode(div, [`${capFirstChar(V.brothelName)} ${V.brothelAdsSpending > 0 ? `is the subject of an active ad campaign.` : `advertises by word of mouth.`} Last week this ${profit > 0
			? `made you an extra <span class="cash inc">${cashFormat(profit)},</span>${this.facility.hostedSlaves() > 0
				? ` as well as increasing business for your whores.` : ``}`
			: profit < 0
				? `cost you <span class="cash dec">${cashFormat(profit)},</span>${this.facility.hostedSlaves() > 0
					? ` but still increased business for your whores.` : ``}`
				: `didn't make you any extra money, but didn't lose you any, either.`}`]);

		App.UI.DOM.appendNewElement("div", div, App.UI.DOM.passageLink(`Manage brothel advertisements`, 'Brothel Advertisement', () => {
			V.nextLink = passage();
			V.nextButton = "Back";
		}), ['indent']);

		return div;
	}

	/** @returns {HTMLDivElement} */
	get attention() {
		const div = document.createElement("div");
		const options = new App.UI.OptionsGroup();

		App.UI.DOM.appendNewElement("h2", div, `Personal Attention`);
		div.append(`${capFirstChar(V.brothelName)} could be more profitable if you started spending time in the brothel you would otherwise spend in public. Your reputation will suffer, but paying customers may seek out your whores if they think it means you'll lend them your ear.`);

		options.addOption(null, "selected", V.brothelBoost)
			.addValue(`None`, 0)
			.addValue(`5%`, 1)
			.addValue(`10%`, 2)
			.addValue(`15%`, 3)
			.addValue(`20%`, 4)
			.addValue(`25%`, 5)
			.addValue(`30%`, 6)
			.addValue(`35%`, 7)
			.addValue(`40%`, 8)
			.addValue(`45%`, 9)
			.addValue(`50%`, 10);

		options.addComment(`Every 5% you attempt to boost income also increases the amount of customers by 2% and costs 50 reputation more. A minimum of 2500 reputation is required and every additional level increases this by another 500. You may choose whichever level you please; only the highest level you are eligible for will be used at any time.`);

		App.UI.DOM.appendNewElement("div", div, options.render(), ['indent']);

		return div;
	}

	/** @returns {HTMLDivElement[]}*/
	get customNodes() {
		return [
			this.attention,
		];
	}
};
