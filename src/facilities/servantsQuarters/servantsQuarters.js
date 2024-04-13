App.Facilities.ServantsQuarters.servantsQuarters = class ServantsQuarters extends App.Facilities.Facility {
	constructor() {
		const servantsQuarters = App.Entity.facilities.servantsQuarters;
		const decommissionHandler = () => {
			V.servantsQuarters = 0;
			V.servantsQuartersDecoration = "standard";
			V.servantsQuartersUpgradeMonitoring = 0;
		};

		super(
			servantsQuarters,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Servants' Quarters";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} are busy with hurrying slaves. One shift of servants is eating, cleaning the quarters, and bathing. The second is sleeping, and the third is out in the penthouse cleaning and serving.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`A few slaves are working out of the servants' quarters. They must split their scant time between looking after their own needs and the superior needs of everyone else.`);
		} else if (S.Stewardess) {
			text.push(`${S.Stewardess.slaveName} is alone, and seems rather bereft without anyone to order around.`);
		} else {
			text.push(`None of your slaves are working out of the servants' quarters.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `are spartan, yet functional. At one end of the long dormitory there is an alcove with a shrine to the Roman goddess of domesticity.`,
			"Neo-Imperialist": `are surprisingly luxurious for mere servant's quarters. They're a large, public dormitory, but the barracks-like beds are soft, clean, high-tech pods stacked two to a row, separated by banners emblazoned with your family crest. A few small tapestries decorate the walls, mostly showing happy-looking servants cleaning and cooking.`,
			"Aztec Revivalist": `are simple, yet grandiose. In every corner stands a monument to a god, and as the sun peeks through, all the obsidian ornaments glisten with light.`,
			"Egyptian Revivalist": `are utilitarian, yet warm and well-kept. At one end of the long dormitory there is an alcove with a shrine to the Egyptian goddess of servility.`,
			"Edo Revivalist": `are spartan and functional. Fresh mats are laid across the floor every day, and the simple beds of blankets and wooden blocks are neatly stowed against the walls before sunrise.`,
			"Arabian Revivalist": `are utilitarian, yet warm and well-kept. They are floored with beautifully patterned tile; there are channels for clean running water that make it easy to keep clean and fresh, so long as one is willing to bathe in the open.`,
			"Chinese Revivalist": `are spartan, yet functional. At one end of the long dormitory there is an alcove with a shrine hosting a bronze statue of a watchful dragon.`,
			"Antebellum Revivalist": `are spartan, yet functional. There is an unyielding, hostile quality to the environment. The design deliberately gives the impression that the ${this.facility.nameCaps} is separate from the rest of the penthouse.`,
			"Chattel Religionist": `are spartan, yet functional. Servants here are expected to be clean and hardworking, and there is a penitents cell ready for them if they are not.`,
			"Degradationist": `are severe and utilitarian. Servants sleep uncomfortably here, knowing that even on their meager bedrolls, they are fair game for abuse.`,
			"Repopulationist": `are comfortable and well-kept. Though there is little privacy here, the servants are provided for. There's even a small rest area for them to rest their pregnant bodies between shifts. A closet contains specialized cleaning tools to accommodate their distended bodies.`,
			"Eugenics": `are comfortable and well-kept. Though there is little privacy here, the servants are provided for. They are required to always be carrying prophylactics for other slaves and any low class citizens who require them.`,
			"Asset Expansionist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting slaves with gigantic breasts earnestly enjoying huge cocks.`,
			"Transformation Fetishist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting slaves with huge implants earnestly enjoying sex.`,
			"Gender Radicalist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting all sorts of slaves earnestly enjoying taking cocks up their anuses.`,
			"Gender Fundamentalist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting pretty female slaves being fucked by muscular men.`,
			"Physical Idealist": `are comfortable and well-kept. There are softcore pictures on the walls, depicting gorgeously muscled, oiled-up men and women, flexing and posing for the camera.`,
			"Supremacist": `are spartan, since that's all domestics from the inferior races need or deserve. There's a whipping post in the corner of the room so that whenever a slave is beaten, the rest must watch.`,
			"Subjugationist": `are spartan, since that's all ${V.arcologies[0].FSSubjugationistRace} domestics need or deserve. There's a whipping post in the corner of the room so that whenever a slave is beaten, the rest must watch.`,
			"Paternalist": `are comfortable and well-kept. Though there is little privacy here, the servants are provided for. There's even a small rest area for them to take their regular breaks in.`,
			"Pastoralist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting lactating slaves earnestly enjoying sex. The servants are provided with milk to drink.`,
			"Maturity Preferentialist": `are comfortable, but functional. There are motivational posters on the walls featuring cheerful MILF servants, exhorting mature slaves to smile, serve, and get fucked like good girls.`,
			"Youth Preferentialist": `are comfortable, but well equipped to corral wayward slaves. There are instructional screens in the common areas reviewing basic slave tasks like scrubbing a floor and giving head.`,
			"Body Purist": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting gorgeous slaves earnestly enjoying sex.`,
			"Slimness Enthusiast": `are comfortable and well-kept. There are pornographic pictures on the walls, depicting slender slaves earnestly enjoying sex.`,
			"Hedonistic": `are comfortable and well-kept. There are plenty of soft couches to recline on between shifts and a number of feeders to keep servants full and happy. There are pornographic pictures on the walls, depicting fat slaves earnestly enjoying sex while stuffing their and their partners faces.`,
			"Intellectual Dependency": `are comfortable, but well equipped to corral wayward slaves. There are instructional screens in the common areas reviewing basic slave tasks like scrubbing a floor and not wandering off. Plenty of toys are available in an effort to keep minds focused on work and not solely on sex.`,
			"Slave Professionalism": `are comfortable and well-kept, assuming a slave is able to understand how to make use of the amenities. There are abundant menial tasks available to keep a mind busy and sharp.`,
			"Petite Admiration": `are comfortable and well-kept, assuming a slave is short enough, of course. Those that stand too tall find the accommodations cramped and the tools annoyingly short.`,
			"Statuesque Glorification": `are comfortable and well-kept, assuming a slave is tall enough, of course. Those that are too short find the accommodations out of reach and the tools painfully long.`,
			"standard": `are comfortable. Servants sleep together in a dormitory, eat together in a little kitchen, bathe together in a communal shower, and then head out into the penthouse to serve.`,
		};

		const res = FS[V.servantsQuartersDecoration];

		if (!res) {
			throw new Error(`Unknown V.servantsQuartersDecoration value of '${V.servantsQuartersDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${this.facility.nameCaps} has room to keep ${numberWithPluralOne(V.servantsQuarters, "slave")} while they serve. There ${this.facility.hostedSlaves() === 1 ? `is currently ${num(this.facility.hostedSlaves())} slave` : `are currently ${num(this.facility.hostedSlaves())} slaves`} serving in ${V.servantsQuartersName}.`,
			removeSlave: "be a servant",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "servantsQuartersUpgradeMonitoring",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `The quarters are standard.`,
						link: `Upgrade the monitoring systems to force harder work`,
						cost: 10000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => V.PC.skill.hacking += 0.1,
						notes: [`will increase upkeep costs`],
					},
					{
						value: 1,
						text: `The quarters have been upgraded with enhanced monitoring systems to make the servants work harder, improving their obedience and efficiency.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "stewardessImpregnates",
				prereqs: [
					!!S.Stewardess,
					!!canAchieveErection(S.Stewardess) && S.Stewardess.pubertyXY === 1,
					!!V.seePreg,
				],
				options: [
					{
						get text() {
							const {He, himself} = getPronouns(S.Stewardess);
							return `${He} could be directed to keep the maids pregnant ${himself}.`;
						},
						link: `Do not impregnate maids`,
						value: 0,
					},
					{
						get text() {
							const {his} = getPronouns(S.Stewardess);
							return `Keeping the maids pregnant is part of ${his} job.`;
						},
						link: `Impregnate maids`,
						value: 1,
					},
				],
			},
		];
	}

	/** @returns {HTMLDivElement} */
	get staffing() {
		const div = document.createElement("div");

		div.append(`Your household servants are `);
		const capacity = totalServantCapacity();
		if (capacity > V.slaves.length * 1.5) {
			div.append(`frankly more numerous than you really need at this point, and some have to be occupied with unproductive "busy work." You should consider reassigning some to other tasks.`);
		} else if (capacity >= V.slaves.length * 0.95) {
			div.append(`capable of adequately cleaning your facilities and seeing to your slaves, without having too much idle time. You have neither too many nor too few.`);
		} else if (capacity >= V.slaves.length * 0.5) {
			div.append(`constantly busy, and could probably use a little more help.`);
		} else {
			div.append(`severely understaffed. Assigning additional slaves would yield financial benefits.`);
		}

		div.append(` They can currently help reduce the maintenance of up to ${num(capacity)} slaves, and you have ${num(V.slaves.length)}.`);

		return div;
	}

	/** @returns {HTMLDivElement} */
	get milking() {
		const div = document.createElement("div");

		if (V.servantMilkers) {
			div.append(`Since servants spend most of their time in the penthouse, any who are lactating will use the ubiquitous milkers.`);
		}

		return div;
	}

	/** @returns {HTMLDivElement[]} */
	get customNodes() {
		return [
			this.staffing,
			this.milking,
		];
	}
};
