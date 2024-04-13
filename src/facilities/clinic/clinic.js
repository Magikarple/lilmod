App.Facilities.Clinic.clinic = class Clinic extends App.Facilities.Facility {
	constructor() {
		const clinic = App.Entity.facilities.clinic;
		const decommissionHandler = () => {
			V.clinic = 0;
			V.clinicDecoration = "standard";
			V.clinicUpgradeScanner = 0;
			V.clinicUpgradeFilters = 0;
			V.clinicUpgradePathogenSequencer = 0;
			V.clinicUpgradePurge = 0;
			V.clinicInflateBelly = 0;
			V.clinicSpeedGestation = 0;
		};

		super(
			clinic,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Clinic";
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		text.push(this.facility.nameCaps, this.decorations);

		if (this.facility.hostedSlaves() > 2) {
			text.push(`${this.facility.nameCaps} is busy. Patients occupy many of the beds; most are alert, but a few are dozing under medication designed to promote healing through deep rest.`);
		} else if (this.facility.hostedSlaves() > 0) {
			text.push(`${this.facility.nameCaps} is sparsely populated. Patients occupy a few of the beds; most are alert, but a few are dozing under medication designed to promote healing through deep rest.`);
		} else if (S.Nurse) {
			text.push(`${S.Nurse.slaveName} is alone in the clinic, and has nothing to do but keep the place spotlessly clean and ready for its next patients.`);
		} else {
			text.push(`${this.facility.nameCaps} is empty and quiet.`);
		}

		return text.join(' ');
	}

	/** @returns {string} */
	get decorations() {
		/** @type {FC.Facilities.Decoration} */
		const FS = {
			"Roman Revivalist": `is open and airy; a breeze wafts through the space, and Roman theories on natural cleanliness are very much on display.`,
			"Neo-Imperialist": `is white and sterile, filled with so many high-tech machines that you cannot discern the purpose of them all. The space reminds you of a laboratory, kept painstakingly clean at all time by small robotic drones.`,
			"Aztec Revivalist": `is open and airy; a light hint of herbs and natural oil permeates the air. Everything is incredibly sterile, especially the blood management equipment.`,
			"Egyptian Revivalist": `is open and airy; clean rushes are strewn across the floor, making a gentle susurration when anyone crosses the space.`,
			"Edo Revivalist": `is clean and spartan to the point of featurelessness. Spotless tatami mats cover the floor, and partitions divide the space into cubicles.`,
			"Arabian Revivalist": `is open and airy; a thin trail of smoke wafts through the space on a gentle breeze, coming from a brazier burning incense.`,
			"Chinese Revivalist": `is open and airy; a thin trail of smoke wafts through the space on a gentle breeze, coming from a brazier burning medicinal herbs.`,
			"Antebellum Revivalist": `is designed after a sanatorium; enormous windows here ensure there's a constant flow of air and bright sunshine, and the ceiling is particularly high here. Everything is simple and clean.`,
			"Chattel Religionist": `is open and airy; shaded beams of sunlight shine through skylights to bathe each bed in a pool of healing warmth.`,
			"Degradationist": `is clean and cold, all scrubbed tile and cool steel. The beds have prominent restraint attachment points to force patients into any position desired.`,
			"Repopulationist": `is warm and inviting, with wide corridors and ample seating for its pregnant clientèle. All the equipment is designed to accommodate heavily pregnant women.`,
			"Eugenics": `is warm and inviting on one side, cold and utilitarian on the other. Only the toys of the elite are allowed the best of care.`,
			"Asset Expansionist": `is utilitarian, without any concession to style. Every available ${V.showInches === 2 ? `inch` : `centimeter`} of space is used for equipment specialized to support growth.`,
			"Transformation Fetishist": `is utilitarian, without any concession to style. Every available ${V.showInches === 2 ? `inch` : `centimeter`} of space is used for equipment specialized to support radical surgery.`,
			"Gender Radicalist": `is comfortable and feminine. Its curving walls and soft colors are designed to present slaves coming out of anesthesia with an impression of girlishness.`,
			"Gender Fundamentalist": `is comfortable and feminine. Its curving walls and soft colors are designed to keep slaves here for their female health nice and comfortable.`,
			"Physical Idealist": `is utilitarian, without any concession to style. Every available ${V.showInches === 2 ? `inch` : `centimeter`} of space is used for some piece of equipment useful in making the human body faster or stronger.`,
			"Supremacist": `is clean and cold, all scrubbed tile and cool steel. The only hint of its radical uses are the pseudoscientific racialist charts on the walls.`,
			"Subjugationist": `is clean and cold, all scrubbed tile and cool steel. The only hint of its radical uses are the pseudoscientific racialist charts on the walls.`,
			"Paternalist": `is warm and inviting, with curved walls and warm colors designed to put patients at their ease. Each bed is well provided with entertainment options.`,
			"Pastoralist": `is utilitarian, without any concession to style. Every available ${V.showInches === 2 ? `inch` : `centimeter`} of space is used for equipment specialized for human veterinary medicine.`,
			"Maturity Preferentialist": `is comfortable and soothing, with curved walls and cool colors designed to keep patients relaxed. Each bed is provided with refined yet invariably pornographic entertainment options.`,
			"Youth Preferentialist": `is bright and cheerful, with curved walls and pastel colors designed to keep patients in good spirits. Each bed is provided with light entertainment options.`,
			"Body Purist": `is utilitarian, without any concession to style. Every available ${V.showInches === 2 ? `inch` : `centimeter`} of space is filled with equipment designed to make medicine as low-impact as possible.`,
			"Slimness Enthusiast": `is warm and inviting, with curved walls and warm colors designed to put patients at their ease. Each bed is well provided with entertainment options.`,
			"Hedonistic": `is warm and comfortable, with extra wide, soft, heated beds and ample morphine. Pleasant smells are pumped into the recovery wards, plenty of entertainment is available and chubby nurse in a too small dress with a big bowl of slave food is only a button press away. It can be quite difficult to convince patients to leave.`,
			"Intellectual Dependency": `is bright and cheerful, with plenty of simple amusements to keep bimbos distracted and in bed. A complex locking mechanism promises no chance of a slave wandering off to slake their lust.`,
			"Slave Professionalism": `is clean and cold, all scrubbed tile and cool steel. Any delays in recovery are nothing more than time spent not honing one's talents.`,
			"Petite Admiration": `is open and airy due to all the extra space freed up by shortening the beds. A footrest is the only accommodation made for tall slaves.`,
			"Statuesque Glorification": `is warm and comfortable, if a little cramped; tall slaves require long beds, after all. A meager footstool is the only accommodation made for short slaves.`,
			"standard": `is a well-equipped modern medical facility. Each patient has their own area, with heavy automation to provide them treatment without any human intervention at all.`,
		};

		const res = FS[V.clinicDecoration];

		if (!res) {
			throw new Error(`Unknown V.clinicDecoration value of '${V.clinicDecoration}' found in decorations().`);
		}

		return res;
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			desc: `${this.facility.nameCaps} has room to support ${num(V.clinic)} slaves while they receive treatment. There ${this.facility.hostedSlaves() === 1 ? `is currently ${num(this.facility.hostedSlaves())} slave` : `are currently ${num(this.facility.hostedSlaves())} slaves`} receiving treatment in ${V.clinicName}.`,
		};
	}

	/** @returns {FC.IUpgrade[]} */
	get upgrades() {
		return [
			{
				property: "clinicUpgradeScanner",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `It mounts powerful medical scanning technology.`,
						link: `Upgrade the scanners to help detect genomic damage`,
						cost: 10000 * V.upgradeMultiplierArcology * Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier),
						handler: () => V.PC.skill.hacking += 0.1,
						notes: [`increases the effectiveness of ${V.clinicName}`],
					},
					{
						value: 1,
						text: `${this.facility.nameCaps}'s scanners have been upgraded with a sampling system that can estimate carcinogenic damage to a slave's body.`,
					},
				],
			},
			{
				property: "clinicUpgradeFilters",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `It includes standard dialysis equipment.`,
						link: `Install advanced blood treatment equipment to help address drug side effects`,
						cost: 50000 * V.upgradeMultiplierArcology * Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier),
						handler: () => {
							V.PC.skill.hacking += 0.1;

							App.UI.reload();
						},
						notes: [`increases the effectiveness of ${V.clinicName}`],
					},
					{
						value: 1,
						text: `The entire floor beneath ${V.clinicName} is occupied by a huge filtration plant that constantly cycles out the patients' blood to remove impurities.`,
					},
				],
			},
			{
				property: "clinicUpgradePathogenSequencer",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `It includes standard diagnostics equipment for common pathogens.`,
						link: `Install an automated sequencer connected to the Gene Lab to help identify disease-causing pathogens`,
						cost: 30000 * V.upgradeMultiplierArcology * Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier),
						notes: [`helps prevent and fight illness in large slave populations`],
						prereqs: [
							V.geneticMappingUpgrade > 0
						]
					},
					{
						value: 1,
						text: `A rack of advanced rapid genetic sequencing equipment is connected to the Gene Lab and an extensive database of pathogen genes to help diagnose and fight disease outbreaks.`,
						nodes: !S.Nurse
							? [`However, without a nurse in attendance, the <span class="yellow">pathogen sequencer remains idle.</span>`]
							: null,
					}
				],
			},
			{
				property: "clinicUpgradePurge",
				tiers: [
					{
						value: 0,
						upgraded: 1,
						text: `Microscopic magnets have been added to better facilitate the leeching of impurities from cells.`,
						link: `Increase the effectiveness of the impurity purging`,
						cost: 150000 * V.upgradeMultiplierArcology * Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier),
						handler: () => V.PC.skill.hacking += 0.1,
						notes: [`may cause health problems in slaves`],
						prereqs: [
							V.clinicUpgradeFilters > 0,
						],
					},
					{
						value: 1,
						upgraded: 2,
						text: `Microscopic magnets have been added to better facilitate the leeching of impurities from cells.`,
						link: `Further increase the effectiveness of the impurity purging by utilizing nano magnets`,
						cost: 300000 * V.upgradeMultiplierArcology * Math.min(V.upgradeMultiplierMedicine, V.HackingSkillMultiplier),
						handler: () => V.PC.skill.hacking += 0.1,
						notes: [`increases the effectiveness of ${V.clinicName}`],
					},
					{
						value: 2,
						text: `Microscopic magnets have been added to better facilitate the leeching of impurities from cells. The blood is intensely cleaned to greatly decrease the presence of impurities at the cost of compatibility. Patients will likely be ill for the duration of the treatment.`,
						nodes: !S.Nurse
							? [`However, without a nurse in attendance, the <span class="yellow">blood treatment equipment remains idle.</span>`]
							: null,
					},
				],
			},
		];
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		return [
			{
				property: "clinicInflateBelly",
				prereqs: [
					!!S.Nurse,
				],
				options: [
					{
						get text() { return `${capFirstChar(V.clinicName)} is useful for keeping slaves healthy during long term procedures. ${S.Nurse.slaveName} can supervise weekly filling regimens for clinic slaves with fillable belly implants during their stay to maximize growth with minimal health complications.`; },
						link: `Do not fill belly implants`,
						value: 0,
					},
					{
						get text() { return `${capFirstChar(V.clinicName)} is useful for keeping slaves healthy during long term procedures. Slaves in ${V.clinicName} with inflatable belly implants will be filled during their time under ${S.Nurse.slaveName}'s supervision to maximize growth with minimized health complications.`; },
						link: `Fill belly implants`,
						value: 1,
					},
				],
			},
			{
				property: "clinicObservePregnancy",
				prereqs: [],
				options: [
					{
						text: `Pregnant patients will not be kept under observation.`,
						link: `Stop observing pregnancies`,
						value: 0,
					},
					{
						text: `Patients undergoing a high-risk pregnancy or are close to giving birth will be kept under observation.`,
						link: `Keep high-risk pregnancies and slaves near due under observation`,
						value: 1,
					},
					{
						text: `Only patients undergoing a high-risk pregnancy will be kept under observation.`,
						link: `Keep high-risk pregnancies under observation`,
						value: 2,
					},
				],
			},
			{
				property: "clinicRegularCheckups",
				prereqs: [
					!!S.Nurse,
				],
				options: [
					{
						get text() { return `${S.Nurse.slaveName} will prioritize helping the patients in ${V.clinicName} over performing checkups on the rest of your slaves. Slaves in ${V.clinicName} will recover faster, but illnesses may start and spread rapidly in other facilities.`; },
						link: `Stop regular checkups`,
						value: 0,
					},
					{
						get text() { return `${S.Nurse.slaveName} will perform regular checkups on all your slaves in addition to treating the patients in ${V.clinicName}. This helps prevent new illnesses from gaining a foothold and spreading, but patients in ${V.clinicName} will recover more slowly.`; },
						link: `Perform regular checkups`,
						value: 1,
					},
				],
			},
			{
				property: "clinicSpeedGestation",
				prereqs: [
					!!S.Nurse,
				],
				options: [
					{
						get text() { return `${capFirstChar(V.clinicName)} is currently not applying rapid gestation agents to pregnant patients. Only individually selected slaves will undergo this procedure.`; },
						link: `Limit rapid gestation agents to selected slaves only`,
						value: 0,
					},
					{
						get text() { return `It's exceedingly dangerous to speed up gestation without constant supervision. In ${V.clinicName}, ${S.Nurse.slaveName} will monitor slaves on rapid gestation agents; making sure the growing patients' food demands are met, monitoring their skin and womb and, if need be, perform an emergency c-section should the need arise.`; },
						link: `Speed up gestation for all pregnant patients`,
						value: 1,
					}
				],
			},
		];
	}
};
