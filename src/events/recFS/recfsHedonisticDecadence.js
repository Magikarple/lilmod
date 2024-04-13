App.Events.recFSHedonisticDecadence = class recFSHedonisticDecadence extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSHedonisticDecadence > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 24, disableDisability: 1, race: "nonslave"});
		slave.origin = "$He sold $himself to you to escape those who condemned $his lifestyle.";
		generateSalonModifications(slave);
		slave.career = "a shut-in";
		setHealth(slave, jsRandom(-40, 20), undefined, undefined, undefined, 35);
		slave.devotion = random(35, 45);
		slave.trust = random(20, 25);
		if (slave.vagina > -1) {
			slave.vagina = 4;
		}
		slave.anus = 4;
		if (slave.ovaries === 1) {
			slave.preg = -1;
		}
		slave.weight = -15;
		slave.underArmHStyle = "bushy";
		slave.pubicHStyle = "bushy";
		slave.behavioralFlaw = "gluttonous";
		slave.sexualQuirk = "size queen";
		slave.piercing.tongue.weight = 2;
		slave.piercing.nipple.weight = 2;
		slave.piercing.nose.weight = 2;
		slave.piercing.ear.weight = 2;
		slave.piercing.lips.weight = 2;
		slave.piercing.vagina.weight = 2;
		slave.piercing.anus.weight = 2;
		slave.piercing.eyebrow.weight = 2;
		slave.piercing.navel.weight = 2;
		slave.piercing.corset.weight = 1;
		slave.piercing.areola.weight = 1;
		slave.clothes = "a slutty outfit";
		slave.shoes = "heels";
		slave.inflation = 3;
		slave.inflationType = "food";
		slave.inflationMethod = 1;
		SetBellySize(slave);
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

		r.push(`This one is coming from inside your own arcology, from a tourist interested in permanent residence even if it means enslavement. You have them bought to your office to hear them out. A heavily pregnant ${girl} waddles into your office, ${his} distended belly a stark contrast to ${his} relative thinness. ${He} smiles, ${his} many piercings clicking against each other in the process, and pats ${his} middle.`);
		r.push(Spoken(slave, `"It's food, not a baby. I really enjoyed staying in your arcology, I mean, I live like this back home, but everyone always picks on me for eating so much and never getting off my ass to work. I can't find a lover either, no one can satisfy me anymore..."`));
		r.push(`${He} exposes ${his} gaping asshole to you.`);
		r.push(Spoken(slave, `"I overdid it with the toys. It felt so good, I couldn't stop going bigger. Once I realized that, I started getting piercings and eating, anything to make me feel better. But once I arrived here, I never felt so accepted before, everyone was enjoying themselves however they wanted. So please, let me stay, I'll do everything you can think of."`));

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
			r.push(`${He} becomes elated when ${he}`);
			if (canHear(slave)) {
				r.push(`hears`);
			} else {
				r.push(`discovers`);
			}
			r.push(`${he}'ll be allowed to stay. Even if ${he} doesn't get to fulfill all ${his} desires, ${his} new life is more welcome than ${his} rapidly ending prior one. ${He} revealed as ${he} is escorted to the slave quarters that ${he} blew the last of ${his} money on ${his} visit here.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You inform ${him} that ${he} will be staying in your arcology, but not under you. ${He} has been purchased by a feeding trainer interested in slim ${girl}s with massive stomach capacities for entry into the eating competitions that have become so popular lately. ${He} seems elated at the news,`);
			r.push(Spoken(slave, `"Stuffing is one of my favorite perversions..."`));
			r.push(`You cut ${him} off and inform ${him} that ${his} current belly pales in comparison to ${his} new owner's previous champion. ${He} should expect to be tied up and force-fed until ${his} entire body is filled to capacity with slave food. ${He} gulps nervously as ${he} escorted out by the portly purchasing agent to ${his} new home.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
