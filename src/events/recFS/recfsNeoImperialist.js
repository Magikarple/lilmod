App.Events.recFSNeoImperialist = class recFSNeoImperialist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSNeoImperialist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 22, maxAge: 28, disableDisability: 1});
		slave.origin = "A former old world soldier dishonorably discharged for reasons $he refuses to discuss, $he offered $himself to you after romanticizing your martial, Imperial society.";
		slave.devotion = random(5, 20);
		slave.trust = random(0, 5);
		slave.career = "a soldier";
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(-10, 10), undefined, undefined, 0, 0);
		slave.muscles = 60;
		slave.face = random(15, 50);
		slave.skill.whoring = 0;
		slave.skill.entertainment = 0;
		slave.skill.combat = 70;
		slave.intelligence = random(-50, 50);
		slave.intelligenceImplant = 0;
		slave.teeth = "normal";

		const {
			He,
			his, he, him, woman
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The call comes in from a private old world apartment. The caller is a ${woman} who speaks in a gruff and serious tone, explaining that ${he} was a soldier in an Old World military who served with distinction for years before being dishonorably discharged due to some incident that ${he} refuses to talk about when you ask. ${He} says that there's no room left for tired dogs in the crumbling economy of the old world for those without money, and ${his} only real options are to submit to menial servitude or open slavery. ${He} says that ${he}'s heard that your Imperial society values warriors and honor, and that ${he}'d prefer living somewhere where ${his} skills are worth something — even as a slave. At your request, ${he} sends over a dossier containing ${his} personal data.`);

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
			r.push(`${He} arrives gruff and unfazed, or at least well-trained enough to pretend to be gruff and unfazed, at the`);
			if (canSee(slave)) {
				r.push(`bright lights`);
			} else if (canHear(slave)) {
				r.push(`blaring sounds`);
			} else {
				r.push(`strange sensations`);
			}
			r.push(`of your arcology, and the combinations of ultra-high technology and feudal social structure that maintains them. When you tell ${him} to strip, ${his} stoic visage flickers for a moment, but then returns, and ${he} drops ${his} pants to show ${his} muscular body without a further word of protest.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} arrives stoic and gruff, refusing to allow the strange new smells and sounds of the arcology to have any apparent effect on ${his} psyche. It seems as though ${he}'s already made up ${his} mind about the decision to become your slave, and doesn't allow even the slightest trace of doubt to enter — until you order ${him} to hang a price placard over ${his} chest. ${He} stares at you for a moment with cold eyes that communicate a deeply-felt betrayal, then silently leaves, accompanied by one of your slaves. Whether ${his} submission was to deny you the pleasure of a reaction or simple stoicism, you can't tell.`;
		}
	}
};
