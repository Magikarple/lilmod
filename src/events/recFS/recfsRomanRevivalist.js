App.Events.recFSRomanRevivalist = class recFSRomanRevivalist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSRomanRevivalist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {minAge: 22, maxAge: 28, disableDisability: 1});
		slave.origin = "$He offered $himself to you for enslavement because $he was swept up in the romanticism of a revival of Rome.";
		slave.devotion = random(-15, -5);
		slave.trust = random(5, 15);
		slave.career = "a student";
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(-10, 10), undefined, undefined, 0, 0);
		slave.face = random(-20, 0);
		slave.anus = 0;
		if (slave.vagina !== -1) {
			slave.vagina = 0;
		}
		slave.skill.vaginal = 0;
		slave.skill.anal = 0;
		slave.skill.oral = 0;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 0;
		slave.intelligence = random(16, 95);
		slave.intelligenceImplant = 15;
		slave.teeth = "normal";

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
		r.push(`The call comes in from an old world university. The caller is a young ${woman} who explains that ${he}'s struggling with extreme student debt, and has recently graduated with a history degree that ${he} can't seem to turn into gainful employment. ${He} gushes at length about how much ${he} enjoyed ancient history, and how ${he}'s heard all about your ideas about reviving ancient culture in the Free Cities. ${He} sees joining your household as a romantic way out of ${his} difficult situation. Apparently ${he} read all the idyllic parts of history and somehow missed out on learning about the salt mines and slave galleys. ${He}'s not terribly pretty and seems socially awkward, but that's likely to have its side benefits. ${He} nervously sends you a complete dossier on ${himself}.`);

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
			r.push(`${He} arrives wide-eyed and enthusiastic about the historical style ${he}`);
			if (canSee(slave)) {
				r.push(`saw`);
			} else if (canHear(slave)) {
				r.push(`heard`);
			} else {
				r.push(`felt`);
			}
			r.push(`on the way in. ${He} swallows nervously throughout the enslavement process and even cries a little at the end. ${He}'s slow to undress, and when ${he}'s finished, ${he} covers ${his} modest breasts with one arm and ${his} mons with the other. It seems that ${he}'s about to have a rude awakening about the realities of being a house slave.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives with doubt already clouding ${his} eyes. It seems ${he} got an introduction to the reality of Roman Revivalism on ${his} way up the arcology to your villa. The violence it did to ${his} vision of Rome is deeply ironic; ${V.arcologies[0].name} is a fair reproduction of the decadence and vigor of imperial Rome. If ${he}'s shocked by the screams of a slave dying in gladiatorial combat or the spectacle of prisoners from the provinces being sold at auction, that's ${his} ignorance. When you cause a price placard to be affixed to ${his} chest so ${he} can be sold at auction, the reality of ${his} future finally comes home to ${him}.`;
		}
	}
};
