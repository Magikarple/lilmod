App.Facilities.HGSuite.headGirlSuite = class HeadGirlSuite extends App.Facilities.Facility {
	constructor() {
		const headGirlSuite = App.Entity.facilities.headGirlSuite;
		const decommissionHandler = () => {
			V.HGSuite = 0;
		};

		super(
			headGirlSuite,
			decommissionHandler,
		);

		V.nextButton = "Back to Main";
		V.nextLink = "Main";
		App.UI.StoryCaption.encyclopedia = "Head Girl Suite";

		this.subSlave = this.facility.employees()[0];
	}

	/** @returns {string} */
	get intro() {
		const text = [];

		if (!S.HeadGirl) {
			text.push(`You have no Head Girl appointed to live in ${V.HGSuiteName}.`);
		} else {
			const {him, his} = getPronouns(S.HeadGirl);

			if (this.facility.hasEmployees) {
				text.push(`Your Head Girl ${S.HeadGirl.slaveName} has ${this.subSlave.slaveName} living in ${V.HGSuiteName} with ${him}, as ${his} servant, assistant, and sexual appliance.`);
			} else {
				text.push(`Your Head Girl ${S.HeadGirl.slaveName} lives alone in ${his} handsome suite.`);
			}

			text.push(`Any slave assigned to live with your Head Girl will become, for all intents and purposes, ${his} slave.`);
		}

		return text.join(' ');
	}

	/** @returns {FC.Facilities.Expand} */
	get expand() {
		return {
			maximum: 1,
			unexpandable: true,
		};
	}

	/** @returns {FC.Facilities.Rule[]} */
	get rules() {
		if (S.HeadGirl) {	// only display rules if a Headgirl is assigned
			const {He, his} = getPronouns(S.HeadGirl);

			return [
				{
					property: "HGSuiteEquality",
					prereqs: [],
					options: [
						{
							get text() { return `The current Head Girl will remain Head Girl.`; },
							link: `Don't alternate`,
							value: 0,
						},
						{
							get text() { return `The two slaves living in ${V.HGSuiteName} are equals, and will alternate weeks as Head Girl and Head Girl's bitch.`; },
							link: `Have them alternate`,
							value: 1,
							handler: () => {
								V.HGSuiteSurgery = 0;
								V.HGSuiteDrugs = 0;
								V.HGSuiteAbortion = 0;
								V.HGSuiteHormones = 0;
							},
							note: `This will only take effect if the other slave is an appropriate candidate.`,
						},
					],
				},
				{
					property: "HGSuiteSurgery",
					prereqs: [
						!V.HGSuiteEquality,
					],
					options: [
						{
							get text() { return `${He} is not allowed to use surgical modification on ${his} slave.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `${He} is allowed to use surgical modification on ${his} slave.`; },
							link: `Allow`,
							value: 1,
						},
					],
				},
				{
					property: "HGSuiteAbortion",
					prereqs: [
						!V.HGSuiteEquality,
					],
					options: [
						{
							get text() { return `${He} is not allowed to terminate unwanted pregnancies in ${his} slave.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `${He} is allowed to terminate unwanted pregnancies in ${his} slave.`; },
							link: `Allow`,
							value: 1,
						},
					],
				},
				{
					property: "HGSuiteDrugs",
					prereqs: [
						!V.HGSuiteEquality,
					],
					options: [
						{
							get text() { return `${He} is not allowed to use growth hormones on ${his} slave.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `${He} is allowed to use growth hormones on ${his} slave.`; },
							link: `Allow`,
							value: 1,
						},
					],
				},
				{
					property: "HGSuiteHormones",
					prereqs: [
						!V.HGSuiteEquality,
					],
					options: [
						{
							get text() { return `${He} is not allowed to customize ${his} slave with hormone treatments.`; },
							link: `Forbid`,
							value: 0,
						},
						{
							get text() { return `${He} is allowed to customize ${his} slave with hormone treatments.`; },
							link: `Allow`,
							value: 1,
						},
					],
				},
			];
		}

		return [];
	}
};
