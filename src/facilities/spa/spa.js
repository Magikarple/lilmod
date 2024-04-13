App.Facilities.Spa.spa = class Spa extends App.Facilities.Facility {
	constructor() {
		const spa = App.Entity.facilities.spa;
		const decommissionHandler = () => {
			V.spa = 0;
			V.spaDecoration = "standard";
			V.spaUpgrade = 0;
			V.spaFix = 0;
		};

		super(
			spa,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Spa";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		const spaUtilization = V.spaSpots / (V.spa * 20);

		text.push(this.facility.nameCaps, this.decorations);

		if (spaUtilization >= 1) {
			text.push(`It's crowded in here. Slaves are relaxing in the warm water, splashing around or just floating. Here and there some of the more sex-starved are in the early stages of intercourse, but most prefer to take time off from it all. Unfortunately there is not enough space for all of your slaves to enjoy the spa.`);
		} else if (spaUtilization >= 0.5 || (this.facility.hostedSlaves() / V.spa > 0.5)) {
			text.push(`It's busy in here. Slaves are relaxing in the warm water, splashing around or just floating. Here and there some of the more sex-starved are in the early stages of intercourse, but most prefer to take time off from it all.`);
		} else if (spaUtilization > 0 || this.facility.hostedSlaves() > 0) {
			text.push(`It's sparsely populated; though the few slaves here have little company they like having the water to themselves.`);
		} else if (S.Attendant) {
			const {his} = getPronouns(S.Attendant);
			text.push(`${S.Attendant.slaveName} is alone here, and has nothing to do but keep the place (and ${his} own soft, wet body) spotlessly clean.`);
		} else {
			text.push(`It's empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is built as a Roman bath. The flooring is pleasantly warm due to a modernized version of hypocaust heating, and is covered in mosaic depicting slaves enjoying sex.`,
			"Neo-Imperialist": `is built as a modern Imperial garden. Bright green plants mix with the pulsating lights of high technology, and clear, sleek windows fog up with the steam of a central bath heated by the latest hydraulic technology.`,
			"Aztec Revivalist": `is built as an Aztec bathhouse. Water steams from the middle of the room and the air is heavy with the scent of herbs and essences. The idols by the door glisten with moisture.`,
			"Egyptian Revivalist": `is decorated like an Egyptian water garden. All but the hottest pools include aquatic plants around their edges, and the atmosphere is heavy with perfume.`,
			"Edo Revivalist": `is decorated like a traditional onsen. The stone-lined pools are surrounded by meticulously kept gardens, and there are proper provisions for bathing in the old Japanese style.`,
			"Arabian Revivalist": `looks like a dream of an Arabian palace garden. Every surface is richly tiled in vibrant colors, and the beguiling scents of perfumes from the Levant hang in the air.`,
			"Chinese Revivalist": `is gloomy and hot, filled with an oppressive steam that immediately dulls the senses. Though relaxation is possible and indeed easy here, it is a stultifying relaxation whose humid warmth seems to suppress independence.`,
			"Antebellum Revivalist": `is humid and dim, like the jungle floor. From suspended pots, exotic flowers dangle beautiful blooms over a steaming pool tiled in beautiful mosaic. The green glass panes which make up the ceiling and walls are lined with glistening scrollwork and opaque with steam.`,
			"Chattel Religionist": `is dedicated to the purification of the body and the spirit. The pools are arranged for the completion of self-purification procedures which include ritual masturbation.`,
			"Degradationist": `is utilitarian. There are waterproof cameras positioned throughout the spa so that anyone who wants to can watch the nude slaves. One wall has a screen showing the current viewer count to keep the slaves aware of this.`,
			"Asset Expansionist": `is utilitarian. It is equipped with all sorts of devices to help slaves care for huge assets, including lifts to help them in and out of the water, and all around showers to help clean and moisturize difficult to reach spots.`,
			"Transformation Fetishist": `is utilitarian. It is equipped with special devices to help speed surgical recovery, including a series of baths designed to prevent scarring.`,
			"Repopulationist": `is comfortable, with waterproof cushions lining the pools. It is equipped with all sorts of devices to aid pregnant slaves, including lifts to help them in and out of the water, baths just for their feet, and all around showers to help clean and moisturize difficult to reach spots.`,
			"Eugenics": `is comfortable, albeit split in half. One side for the lower classes' slaves, and the other for the Elite and their pets.`,
			"Gender Radicalist": `is comfortable, with waterproof cushions lining the pools. There are screens on the walls showing slave girls with all different varieties of genitalia orgasming from penetration, to keep the idea at the forefront of the slaves' minds.`,
			"Gender Fundamentalist": `is comfortable, with waterproof cushions lining the pools. There are screens on the walls showing light entertainment featuring a lot of beautiful women and handsome men for the slaves' edification.`,
			"Physical Idealist": `is not the gym, but it does have some workout equipment, mostly low-impact machines designed to speed recovery. There are special hot baths to ease sore muscles.`,
			"Supremacist": `is comfortable, with waterproof cushions lining the pools. There are screens on the walls showing light entertainment featuring ${V.arcologies[0].FSSupremacistRace} main characters.`,
			"Subjugationist": `is comfortable, with waterproof cushions lining the pools. There are screens on the walls showing light entertainment featuring ${V.arcologies[0].FSSubjugationistRace} characters in comic relief roles.`,
			"Paternalist": `is comfortable, with waterproof cushions lining the pools. There are screens on the walls showing light entertainment written by and intended for smart, loyal slaves.`,
			"Pastoralist": `is utilitarian. It is equipped with all sorts of devices to help slaves care for huge assets, including lifts to help them in and out of the water, and all around showers to help clean and moisturize difficult to reach spots.`,
			"Maturity Preferentialist": `is comfortable, but surprisingly businesslike. It's all about beautification here; there's a bewildering array of mud baths, resting pools, and massage setups, all designed to keep mature slaves looking their very best.`,
			"Youth Preferentialist": `is comfortable and fun. There are hot tubs and massage tables for slaves who feel like relaxing, but there's also a colder pool with pool toys for slaves who want to play. It even has a small waterslide.`,
			"Body Purist": `is comfortable, with waterproof cushions lining the pools. Everything is designed for the slaves' comfort; there are even special mud baths to perfect skin clarity.`,
			"Slimness Enthusiast": `is comfortable, with waterproof cushions lining the pools. Everything is designed for the slaves' comfort; there are even special mud baths to perfect skin clarity.`,
			"Hedonistic": `is comfortable, with waterproof cushions lining the pools. It is equipped with all sorts of devices to aid hefty slaves, including lifts to help them in and out of the water, specialized moisturizers to keep their skin healthy and smooth, and all around showers to help clean difficult to reach spots and between folds. ${V.arcologies[0].FSHedonisticDecadenceResearch === 1 ? `Platters of food and treats are readily available around the tubs so that relaxing slaves never have to strain to grab a bite to eat` : `Feeders connected to the slave food reserves line the pools so that so that relaxing slaves never have to strain to suck down their fill of food`}.`,
			"Intellectual Dependency": `is comfortable, fun and, most importantly, safe; even the dumbest slave can enjoy the pools without worrying their ${properTitle()}. There are screens on the walls showing simple entertainment designed to arouse more than titillate.`,
			"Slave Professionalism": `is comfortable, with waterproof cushions lining the pools. It is a place where a weary slave can rest their mind after a hards day's work. There are screens on the walls showing documentaries intended for smart, skilled slaves.`,
			"Petite Admiration": `is comfortable, but designed with short slaves in mind. The pools are shallow and easy to slip in and out of; taller slaves are likely to find them more frustrating than enjoyable.`,
			"Statuesque Glorification": `is comfortable, but designed with tall slaves in mind. The pools are deep; too deep for a short slave to find relaxing.`,
			"standard": `is well-appointed, with massage tables, hot tubs, and a cold pool.`,
		};

		const res = FS[V.spaDecoration];

		if (!res) {
			throw new Error(`Unknown V.spaDecoration value of '${V.spaDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${this.facility.nameCaps} can house ${numberWithPluralOne(V.spa, "slave")} while they recuperate here. There ${this.facility.hostedSlaves() === 1 ? `is currently ${num(this.facility.hostedSlaves())} slave` : `are currently ${num(this.facility.hostedSlaves())} slaves`} recuperating in ${V.spaName}.`,
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "spaUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is a standard spa.`,
						link: `Upgrade ${V.spaName} with saunas, steam rooms, and mineral water baths`,
						cost: 1000 * V.upgradeMultiplierArcology,
						notes: [`increases the effectiveness of ${V.spaName}`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} has been upgraded with state of the art temperature treatment options, from hot and cold mineral water pools to baking saunas and dense steam rooms.`,
					}
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "spaFix",
				prereqs: [
					!!S.Attendant,
				],
				options: [
					{
						get text() {
							const {he} = getPronouns(S.Attendant);

							return `${S.Attendant.slaveName} is not following any special orders and is tending to your slaves as ${he} sees fit.`;
						},
						link: `Free rein`,
						value: 0,
					},
					{
						get text() {
							const {his} = getPronouns(S.Attendant);

							return `${S.Attendant.slaveName} is focusing on the health and wellness of the slaves under ${his} care, as well as trying to bring mindbroken slaves back, while ignoring any mental hang-ups a slave may have.`;
						},
						link: `Only mindbroken slaves`,
						value: 1,
					},
					{
						get text() {
							const {his} = getPronouns(S.Attendant);

							return `${S.Attendant.slaveName} is focusing only on the health and wellness of the slaves under ${his} care, obeying your orders to avoid attempting to right mental flaws.`;
						},
						link: `Don't fix any flaws`,
						value: 2,
					},
				],
			},
			{
				property: "spaAggroSpermBan",
				prereqs: [
					!!S.Attendant,
					V.optimizedSpermFormula > 0,
				],
				options: [
					{
						get text() {
							return `${S.Attendant.slaveName} is to allow all slaves into the main pool, regardless of genetic modifications.`;
						},
						link: `Free rein`,
						value: 0,
					},
					{
						get text() {
							return `${S.Attendant.slaveName} has banned any slaves with the enhanced sperm treatment from entering the main pool ${V.seePreg ? "and causing random pregnancies" : "and clogging up the filters"}.`;
						},
						link: `No optimized sperm`,
						value: 1,
					},
					{
						get text() {
							return `${S.Attendant.slaveName} will make sure that no enhanced sperm will ever reach your breeding harem.`;
						},
						link: `Protect your harem`,
						value: 2,
						prereqs: [
							V.propOutcome === 1,
						],
					},
				],
			},
		];
	}
};
