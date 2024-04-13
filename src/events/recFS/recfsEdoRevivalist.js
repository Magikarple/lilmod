App.Events.recFSEdoRevivalist = class recFSEdoRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSEdoRevivalist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 24, disableDisability: 1, race: "nonslave"});
		slave.origin = "$He offered $himself to you for enslavement because $he had a disgustingly naïve view of medieval Japanese culture.";
		slave.devotion = random(-15, -5);
		slave.trust = random(5, 15);
		slave.career = "a student";
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(-20, 0), undefined, undefined, 0, 0);
		slave.face = random(-60, 10);
		slave.weight = random(20, 100);
		slave.vagina = 0;
		slave.trueVirgin = 1;
		slave.skill.vaginal = 0;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 0;
		slave.intelligence = random(-50, 50);
		slave.intelligenceImplant = 15;
		if (slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}
		slave.behavioralFlaw = either("gluttonous", "liberated");
		slave.sexualFlaw = either("apathetic", "idealistic", "none", "none", "shamefast");

		const {
			He,
			his, he, him, himself, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The caller is a young ${woman} who struggles to stop ${himself} from peppering ${his} socially awkward babble with poorly pronounced Japanese colloquialisms. Insofar as you can parse ${his} nonsense, ${he} seems to have gotten a hilariously romanticized version of feudal Japan from somewhere, and is willing to submit to enslavement in order to join your revivalist arcology. Whoever's out there spreading this rubbish, you owe them one; this serf is in for an extremely rude awakening.`);

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
			r.push(`${He} arrives with doubt already clouding ${his} eyes. It seems ${he} passed one of the arcology's seedier bars on ${his} way up to your penthouse; the sight of roaring patrons swilling cheap sake and manhandling whores in loose kimonos does not seem to have been part of ${his} expectations. As the enslavement process winds on, ${he} reflexively begins to look around for a means of escape, and slowly collapses into ${himself} as ${he} realizes there is none.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives with doubt already clouding ${his} eyes. It seems ${he} passed one of the arcology's seedier bars on ${his} way up to your penthouse; the sight of roaring patrons swilling cheap sake and manhandling whores in loose kimonos does not seem to have been part of ${his} expectations. When a buyer's agent arrives to take charge of ${his} low-value body, ${he} manages to spit out a last bit of bad Japanese (a childish insult) before he bags ${him}. The body in the bag struggles spastically until he knuckles it hard in the kidney, slings it over his shoulder, and carries the package out, grinning at you in commiseration.`;
		}
	}
};
