App.Events.recFSYouthPreferentialistTwo = class recFSYouthPreferentialistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSYouthPreferentialist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {
			minAge: 18, maxAge: 18, ageOverridesPedoMode: 1, disableDisability: 1
		});
		generateSalonModifications(slave);
		slave.origin = "$He came to you for enslavement out of desperation, terrified that $he was about to be asked to do something with $his life by $his family.";
		setHealth(slave, jsRandom(-40, 30), 0, 0, 0, jsRandom(20, 40));
		slave.devotion = random(10, 15);
		slave.trust = random(-55, -75);
		slave.intelligence = random(-95, -51);
		slave.anus = random(2, 3);
		slave.weight = random(-80, -20);
		slave.boobs -= 50*random(1, 2);
		slave.butt -= random(0, 1);
		slave.behavioralFlaw = either("anorexic", "gluttonous", "odd");
		slave.sexualFlaw = either("apathetic", "repressed");
		const {
			He,
			his, he, him, girl
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one, unusually, is voice-only. The caller explains why in an unusually upbeat voice: ${he} turned 18 a few days ago, and ${he}'s fairly certain ${his} family is expecting ${him} to make something of ${his} life to help support them. The apathy to ${his} family's wishes is readily evident in ${his} tone of voice. ${He} begs you to make the necessary arrangements to enslave ${him}. ${He}'s heard about you and how you like younger ${girl}s, and that you take care of all the decision-making for your slaves. There's a lot of hope in ${his} tone, ${he} clearly wants an escape from responsibility — even if that means becoming a slave.`);

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
			r.push(`Your slaving network extracts ${him} from ${his} family's grasp easily, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who's never had to think for themselves: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. Though ${his} mind is not broken, there's clearly not a lot in there. Being a slave may actually be ${his} most fitting vocation.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `Your slaving network extracts ${him} from ${his} family's grasp easily, forwarding ${him} the necessary travel documents. When ${he} arrives, ${he} displays the clear signs of someone who's never had to think for themselves: ${he} takes no initiative and does nothing without instructions, just standing dumbly until ordered; when told what to do, ${he} does it quickly and carefully. Though ${his} mind is not broken, there's clearly not a lot in there. Being a slave may actually be ${his} most fitting vocation. When a buyer's agent arrives to take ${him} away, ${he} follows him without a backward glance, clearly unaware of who he is.`;
		}
	}
};
