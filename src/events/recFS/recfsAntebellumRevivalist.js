App.Events.recFSAntebellumRevivalist = class recFSAntebellumRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSAntebellumRevivalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];

		let slaveRace = "";
		if (V.arcologies[0].FSSubjugationistRace !== 0) {
			slaveRace = V.arcologies[0].FSSubjugationistRace;
		} else if (V.arcologies[0].FSSupremacist !== 0) {
			slaveRace = App.Utils.getRaceArrayWithoutParamRace(V.arcologies[0].FSSupremacistRace).random();
		} else {
			slaveRace = "black";
		}

		const slave = GenerateNewSlave("XX", {
			minAge: 18, maxAge: 26, ageOverridesPedoMode: 1, mature: 0, nationality: 'American', race: slaveRace, disableDisability: 1
		});
		slave.origin = "$He offered $himself to you for enslavement as an outlet for $his raceplay fetish.";
		slave.devotion = random(10, 25);
		slave.trust = random(55, 65);
		slave.career = "unemployed";
		setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
		slave.face = random(20, 100);
		slave.skill.oral = random(5, 35);
		slave.skill.anal = random(5, 35);
		slave.skill.whoring = random(0, 10);
		slave.skill.entertainment = random(35, 55);
		slave.intelligence = random(-30, 10);
		slave.teeth = "normal";
		slave.behavioralFlaw = "odd";
		slave.accent = 2;
		slave.fetish = either("masochist", "submissive", "humiliation");
		slave.energy = 100;

		const {
			He,
			his, he, him, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;

		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`The call comes in directly from the petitioner's home in an impoverished urban area. The caller is a ${woman} who, after an initial episode of shyness, starts to excitedly ramble about your Antebellum revivalist project. It's clear ${he} doesn't know very much about it, but ${he} makes it obvious that ${he} strongly fetishizes racial sex play and thinks that's what your project is all about. It's not clear that ${he} even understands that ${he} is petitioning for ${his} own enslavement. ${He} is unemployed with few prospects, and it slowly becomes apparent that ${he} spends all of ${his} free time masturbating and writing pornographic historical fiction, which ${he} is strangely proud of. ${He} sends you a few choice videos and pieces with an awkward giggle, calling it ${his} application.`);

		App.Events.addParagraph(node, r);
		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`${He} arrives and is amazed by the historical architecture, the kind but dignified demeanor of the people, and the luxuries your penthouse offers. However, ${he} quickly realizes they aren't meant for ${him}. ${He} is still quite compliant, and strips quickly once commanded. ${He} may not be very smart, but ${he} catches on quickly.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives is immediately pushed onto a stage before a small crowd of well-dressed citizens ready for a slave auction. These prospective owners flick their auction paddles up towards the stage, to which an auctioneer responds with vigor. After a few minutes, with the price rising expeditiously, a victor emerges and the auctioneer declares, "Sold!" Before the newly-made slave has a chance to react, ${he} is taken away by a satisfied looking gentleman.`;
		}
	}
};
