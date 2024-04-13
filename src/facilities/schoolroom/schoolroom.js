App.Facilities.Schoolroom.schoolroom = class Schoolroom extends App.Facilities.Facility {
	constructor() {
		const schoolroom = App.Entity.facilities.schoolroom;
		const decommissionHandler = () => {
			V.schoolroom = 0;
			V.schoolroomDecoration = "standard";
			V.schoolroomUpgradeSkills = 0;
			V.schoolroomUpgradeLanguage = 0;
			V.schoolroomUpgradeRemedial = 0;
			V.schoolroomRemodelBimbo = 0;
		};

		super(
			schoolroom,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Schoolroom";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(`${this.facility.nameCaps} is well-equipped, with wallscreens to display lessons. These are currently`, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is busy with slaves, repeating their lessons out loud to drill the instruction home. A few students are maintaining uncomfortable positions in the corner as punishment for poor work.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${this.facility.nameCaps} is sparsely populated, the few students repeating their lessons out loud to drill the instruction home. One slave is maintaining an uncomfortable position in the corner as punishment for poor work.`);
		} else if (S.Schoolteacher) {
			text.push(`${S.Schoolteacher.slaveName} is alone in ${V.schoolroomName}, and has nothing to do but work on $his lesson plans.`);
		} else {
			text.push(`None of your slaves are learning in ${V.schoolroomName}.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `showing the story of a famous Roman slave who sacrificed her life for the life of her ${properMaster()}.`,
			"Neo-Imperialist": `showing the work of many serfs building a great monument to their Imperial ${properMaster()}, and emphasizing the beauty of the society they built together.`,
			"Aztec Revivalist": `showing the reenactment of a legendary story of a slave who ascended by offering her blood to the gods, and was granted eternal life.`,
			"Egyptian Revivalist": `showing an interpretation of Egyptian history that attributes many great monuments to the enlightened use slave labor.`,
			"Edo Revivalist": `showing an interpretation of Japanese cultural history that emphasizes a serf's duty to her social superiors.`,
			"Arabian Revivalist": `showing an interpretation of Arabian cultural history that focuses on thriving slave markets and vibrant harems.`,
			"Chinese Revivalist": `showing an interpretation of Chinese cultural history that focuses on concubinage, palace etiquette, and social order.`,
			"Antebellum Revivalist": `showing a film which demonstrates just how good the slaves at your arcology have it and how, on other plantations, slave owners horribly mistreat their property.`,
			"Chattel Religionist": `displaying a passage from the holy book that supports slavery.`,
			"Degradationist": `displaying a rote recitation of a slave's proper acceptance of her subhuman status.`,
			"Repopulationist": `reviewing a number of sexual positions to accommodate a heavily pregnant girl.`,
			"Eugenics": `reviewing ways to better your owner's standing intermixed with exaggerated pregnancy horror stories focused on slave pregnancy.`,
			"Asset Expansionist": `reviewing techniques that allow two slaves with huge breasts to inspect and moisturize each other's hard to reach areas.`,
			"Transformation Fetishist": `offering a brief primer on surgical recovery, with practical techniques to make it quicker.`,
			"Gender Radicalist": `going over how to keep one's asspussy ready for intercourse at any time, including how to schedule regular enemata and pre-lubrication.`,
			"Gender Fundamentalist": `going over the trifecta that is the standard approach of sex slaves: a blowjob, followed by vaginal, finished with anal.`,
			"Physical Idealist": `offering a brief primer on the arcology's nutritional system which will allow slaves to double check their own protein intake.`,
			"Supremacist": `reviewing the scientific evidence for ${V.arcologies[0].FSSupremacistRace} superiority.`,
			"Subjugationist": `reviewing the scientific evidence for ${V.arcologies[0].FSSubjugationistRace} inferiority.`,
			"Paternalist": `reviewing a lesson on time-management skills, and the students are taking notes on their own tablets.`,
			"Pastoralist": `reviewing how to help fellow slaves with huge, lactating breasts.`,
			"Maturity Preferentialist": `going over daily sets of exercises designed to keep mature slaves' holes as tight as possible.`,
			"Youth Preferentialist": `reviewing social cues that young slaves who have been enslaved through their entire adulthood might not understand.`,
			"Body Purist": `offering a brief primer on the arcology's nutritional system which will allow slaves to double check their own caloric intake.`,
			"Slimness Enthusiast": `offering a brief primer on the arcology's nutritional system which will allow slaves to double check their own caloric intake.`,
			"Hedonistic": `exposing slaves to new, fascinating forms of pleasure; both for others and for themselves.`,
			"Intellectual Dependency": `reviewing various sexual positions, and the students are practicing with each other.`,
			"Slave Professionalism": `reviewing a complex lesson on social cues and when to act on them to better shift things in ${properTitle()}'s favor.`,
			"Petite Admiration": `exploring methods to pleasure a partner far taller than oneself.`,
			"Statuesque Glorification": `reviewing the reasons why tall individuals are widely considered more attractive.`,
			"standard": `reviewing the often complex subject of how to address citizens other than one's owner.`,
		};

		const res = FS[V.schoolroomDecoration];

		if (!res) {
			throw new Error(`Unknown V.schoolroomDecoration value of '${V.schoolroomDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${this.facility.nameCaps} has room to house ${numberWithPluralOne(V.schoolroom, "slave")} while they learn. There ${this.facility.hostedSlaves() === 1 ? `is ${num(this.facility.hostedSlaves())} slave` : `are ${num(this.facility.hostedSlaves())} slaves`} learning in ${V.schoolroomName}.`,
			removeSlave: "take classes",
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "schoolroomUpgradeSkills",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} inculcates the basic skills necessary to a sex slave.`,
						link: `Upgrade the curriculum to cover some intermediate skills`,
						cost: 10000 * V.upgradeMultiplierArcology,
						notes: [`increases the effectiveness of ${V.schoolroomName}`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} provides slaves with some intermediate skills, including a solid foundation in sex, efficient and safe prostitution, and the rudiments of courtesanship.`,
					},
				],
			},
			{
				property: "schoolroomUpgradeLanguage",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} includes only basic language classes in its curriculum.`,
						link: `Install advanced linguistic interfaces to efficiently teach the arcology's lingua franca`,
						cost: 5000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						notes: [`increases the effectiveness of ${V.schoolroomName}`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} boasts state of the art linguistic interfaces that allow it to teach the basics of the arcology's lingua franca with increased success.`,
					},
				],
			},
			{
				property: "schoolroomRemodelBimbo",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} is designed with intelligent slaves in mind and seeks to smarten slaves by providing them with an education.`,
						link: `Redesign the curriculum to undo pesky educations and retard slaves while benefiting the most simple of minds`,
						cost: 7500 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => {
							V.schoolroomUpgradeRemedial = 0;

							App.UI.reload();
						},
						prereqs: [
							V.arcologies[0].FSIntellectualDependency > 80,
						],
					},
					{
						value: 1,
						upgraded: 0,
						text: `${this.facility.nameCaps} is designed with moronic slaves in mind and seeks to dumb down slaves by providing them a confusing, contradictory education that retards decision making skills and undoes existing schooling.`,
						link: `Restore the curriculum to the standard`,
						cost: 7500 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => {
							V.schoolroomUpgradeRemedial = 0;

							App.UI.reload();
						},
					},
				],
			},
			{
				property: "schoolroomUpgradeRemedial",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} teaches woefully smart slaves using its modified methods.`,
						link: `Purchase specialized materials to help smart slaves get on the right track`,
						cost: 5000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						notes: [`increases the effectiveness of ${V.schoolroomName}`],
						prereqs: [
							V.schoolroomRemodelBimbo > 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} has been upgraded with advanced teaching tools to help even the smartest slave learn at an acceptable pace. Dumb slaves won't learn much faster as a result, but smarties will benefit a great deal.`,
						prereqs: [
							V.schoolroomRemodelBimbo > 0,
						],
					},
					{
						value: 0,
						upgraded: 1,
						text: `${this.facility.nameCaps} teaches idiots using standard methods.`,
						link: `Purchase specialized materials to help stupid slaves learn good`,
						cost: 5000 * V.upgradeMultiplierArcology * V.HackingSkillMultiplier,
						handler: () => V.schoolroomRemodelBimbo = 0,
						notes: [`increases the effectiveness of ${V.schoolroomName}`],
						prereqs: [
							V.schoolroomRemodelBimbo === 0,
						],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps} has been upgraded with advanced teaching tools to help even the stupidest slave learn at an acceptable pace. Intelligent slaves won't learn much faster as a result, but idiots will benefit a great deal.`,
						prereqs: [
							V.schoolroomRemodelBimbo === 0,
						],
					},
				],
			},
		];
	}
};
