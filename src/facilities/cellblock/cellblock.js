// cSpell:ignore misbehaviors

App.Facilities.Cellblock.cellblock = class Cellblock extends App.Facilities.Facility {
	constructor() {
		const cellblock = App.Entity.facilities.cellblock;
		const decommissionHandler = () => {
			V.cellblock = 0;
			V.cellblockDecoration = "standard";
			V.cellblockUpgrade = 0;
		};

		super(
			cellblock,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Cellblock";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is full of slaves, though it's difficult to tell at first. In many of the cells, a scene of loneliness and misery may be witnessed, but not one sound escapes them in fear of the punishment that would follow.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${this.facility.nameCaps} holds a few slaves, though it's difficult to tell at first. In several of the cells, a scene of loneliness and misery may be witnessed, but not one sound escapes them in fear of the punishment that would follow.`);
		} else if (S.Wardeness) {
			text.push(`${S.Wardeness.slaveName} is alone in ${this.facility.name}, and seems rather lonely without anyone to oppress.`);
		} else {
			text.push(`None of your slaves are confined in ${this.facility.name}.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is designed to resemble the holding pens beneath the old Coliseum. Whenever there's a fight in the arcology, screens in each cell helpfully keep inmates informed of what awaits (otherwise) useless slaves.`,
			"Neo-Imperialist": `is designed as an ultra high-tech cellblock. Holographic shackles keep slaves locked to rough black cells, kept totally isolated from one another through the complete silence of thick metal walls.`,
			"Aztec Revivalist": `is designed to frighten the prisoners to submission. All the cells look to the center of the facility, where a sacrificial altar stands, adorned with ceremonial ${FutureSocieties.isActive('FSPaternalist') ? `ropes and penetrators` : `knives, ropes and blunt instruments`}.`,
			"Egyptian Revivalist": `uses the climate of Egypt as an additional source of discomfort. The air here is hot and dry, and inmates can easily imagine themselves confined in mud brick cells in a baking desert.`,
			"Edo Revivalist": `is furnished in a severely medieval Japanese style. There is one refinement, but it's of exquisite cruelty. At the end of the hall, there's a fountain with a traditional bamboo boar scarer. As it fills with water, it tips against a stone with a thunk... thunk... thunk... thunk...`,
			"Arabian Revivalist": `is furnished as imagined Arabian slave pens, all set around a central pillar. This pillar is capped by shackles, so that slaves can be bound by their hands and whipped on the backs, buttocks, and thighs in clear view of all their fellow chattel.`,
			"Chinese Revivalist": `is furnished in a severely medieval Chinese style. There is one refinement, but it's of exquisite cruelty. Somewhere out of sight, water is dripping into an urn, drop by drop... drop... drop... drop...`,
			"Antebellum Revivalist": `is dark, built of cold, cyclopean stones. A large, iron-reinforced hatch secures the entrance. The slaves are kept in iron shackles, confined in their tiny cells in the pitch blackness. Far below lies the oubliette, where the worst slaves are thrown and forgotten about - or, at least, that's what they're told.`,
			"Chattel Religionist": `is built of cold stone. Most of the cells are unfurnished little cubes inside which the only bed is the bare floor. A few are smaller still, so that the inmates can neither stand nor lie flat.`,
			"Degradationist": `is a nightmare. Everything is made of metal, and almost everything menaces with spikes of steel. Inmates must carefully avoid the walls of their own cells if they wish to avoid being stabbed.`,
			"Asset Expansionist": `is a straightforward prison, with one exception. Each cell features a screen displaying plans for its inmate's expansion. Day and night, inmates are confronted with the sight of themselves transformed.`,
			"Transformation Fetishist": `is a straightforward prison, with one exception. Each cell features a screen displaying plans for its inmate's expansion. Day and night, inmates are confronted with the sight of themselves transformed.`,
			"Gender Radicalist": `is a straightforward prison, with one exception. Each cell features a screen displaying plans for its inmate's bimbofication. Day and night, inmates are confronted with the sight of themselves dyed, pierced, tattooed, gaped, filled with implants, or all of these.`,
			"Gender Fundamentalist": `is a block of barred cells whose sides, offering a clear view of the whole prison, provide much menace. Anyone who abuses an inmate does so in full view of every other slave here, keeping the jailbirds in a state of constant fear that they're next.`,
			"Physical Idealist": `is a block of barred cells whose sides, offering a clear view of the whole prison, provide much menace. Anyone who rapes an inmate does so in full view of every other slave here, keeping the bitches in a state of constant fear that their asses are next.`,
			"Supremacist": `is a straightforward prison whose menace is provided by context that, although subtle, adds up to a nightmare. Everyone outside the cells is ${V.arcologies[0].FSSupremacistRace}, and everyone inside them is not. The darkness of history is palpable here.`,
			"Subjugationist": `is a straightforward prison whose menace is provided by context that, although subtle, adds up to a nightmare. The inmates inside the cells are ${V.arcologies[0].FSSubjugationistRace}, and everyone outside them is not. The darkness of history is palpable here.`,
			"Repopulationist": `is a straightforward prison, with two exceptions. One cell style features a screen displaying plans for its inmate's impregnation, the other is covered with mirrors for its inmate to watch her pregnancy grow. Day and night, inmates are confronted with the sight of themselves transformed.`,
			"Eugenics": `is designed to make very clear to its inmates that they are subhuman. Many screens showcasing their inadequacy intermingled with propaganda play on nonstop loops.`,
			"Paternalist": `is a prison, but a modern and scientific one. The cells, the common areas, and even the color of the walls are all carefully designed to communicate the feeling that inmates can better themselves.`,
			"Pastoralist": `requires its inmates to drink as much breast milk as they can hold. This sounds like a small thing, but for an unbroken slave, conquering the revulsion of drinking another slave's milk is an important step.`,
			"Maturity Preferentialist": `is subtly designed to make very clear to its inmates that they are sex objects. Many screens showing pornography make it clear to the maturest slave here that they're still an object of lust, and will be used to slake others' pleasure.`,
			"Youth Preferentialist": `is subtly designed to make the breadth of sex acts performed in the arcology clear to its inmates. A cacophony of pornography makes clear to the most innocent inmate that ${V.seeDicks !== 100 ? `her pussy is a fuck hole, ` : ``}her mouth is a fuck hole, her anus is a fuck hole, and, in fact, ${V.seeDicks !== 100 ? `all three` : `both`} can be fuck holes at once.`,
			"Body Purist": `requires its inmates to drink as much filtered water as they can, all the time. This sounds like a petty thing, but most inmates are very aware that they're being flushed out. Cleaned. It is an oddly menacing thought.`,
			"Slimness Enthusiast": `is torture for chubby slaves. Fat bitches that pass through here soon learn that they're going to be slim and pretty one day, but that it isn't going to be much fun getting there.`,
			"Hedonistic": `is torture for thin slaves. The first thing they notice is the heavily reinforced cot they will reside upon. The second is the feeding tube that will be anchored in their stomach for the duration of their stay. Slaves imprisoned here will have their body stuffed to capacity with concentrated slave food, ensuring a plump, docile slave by the end of their sentence.`,
			"Intellectual Dependency": `is a straightforward prison, with one exception. Each cell comes equipped with sound dampening shutters so slaves may be cut off from all outside stimulation. They are forced to be alone with their thoughts for most of their stay.`,
			"Slave Professionalism": `is torture for dumb slaves. Everything in the cell is a puzzle, from the food dispenser to the cot cover. Slaves are frequently rotated so that they may never become accustomed to any solutions.`,
			"Petite Admiration": `is designed to make tall slaves know they are unwelcome. What amounts a basic prison for a short slave is positively torturous when one is far too large to even move in it.`,
			"Statuesque Glorification": `is designed to make short slaves know they are unwelcome. Where a tall slave will find nothing more than a standard cell, the vertically challenged while will find an insurmountable trial designed to teach them their place.`,
			"standard": `could be mistaken for a modern prison. A close inspection, however, reveals restraints in each cell that will hold inmates in sexually compromising positions, and compliance systems to force them to place their wrists and ankles in them.`,
		};

		const res = FS[V.cellblockDecoration];

		if (!res) {
			throw new Error(`Unknown V.cellblockDecoration value of '${V.cellblockDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${capFirstChar(V.cellblockName)} has room for ${num(V.cellblock)} slaves to be kept in close confinement. There ${this.facility.hostedSlaves() === 1
				? `is currently ${num(this.facility.hostedSlaves())} slave`
				: `are currently ${num(this.facility.hostedSlaves())} slaves`} kept in close confinement in ${V.cellblockName}.`,
			removeSlave: "stay confined",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "cellblockUpgrade",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `Its compliance systems are standard.`,
						link: `Upgrade them to soften slave flaws`,
						cost: 20000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => {
							V.PC.skill.engineering += 0.1;
							V.PC.skill.hacking += 0.1;
						},
					},
					{
						value: 1,
						text: `Its compliance systems have been upgraded to allow slaves no mental respite, painstakingly correcting the tiniest misbehaviors to soften flaws into quirks at the cost of considerable anguish to inmates denied any rest from correction.`,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "cellblockWardenCumsInside",
				prereqs: [
					!!S.Wardeness,
					!!S.Wardeness && canPenetrate(S.Wardeness),
				],
				options: [
					{
						get text() {
							const {his} = getPronouns(S.Wardeness);
							return `${S.Wardeness.slaveName} is not permitted to cum inside ${his} inmates.`;
						},
						link: `Forbid`,
						value: 0,
					},
					{
						get text() {
							const {his, he} = getPronouns(S.Wardeness);
							return `${S.Wardeness.slaveName} is permitted to cum inside ${his} inmates when ${he} disciplines them.`;
						},
						link: `Allow`,
						value: 1,
					},
				],
			},
		];
	}
};
