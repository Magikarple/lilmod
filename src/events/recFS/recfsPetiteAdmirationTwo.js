App.Events.recFSPetiteAdmirationTwo = class recFSPetiteAdmirationTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSPetiteAdmiration > random(1, 100) ? 1 : 0;
	}
	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {
			minAge: 30, maxAge: 36, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.career = "a porn star";
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you for enslavement because $he felt your arcology would be a nice place to retire to.";
		slave.natural.height = random(90, 100);
		slave.height = slave.natural.height;
		slave.geneticQuirks.dwarfism = 2;
		slave.boobsImplant += random(4, 6)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "string";
		if (slave.boobsImplant / slave.boobs >= 0.90) {
			slave.boobShape = "spherical";
			slave.nipples = "flat";
		} else {
			slave.boobShape = "normal";
		}
		slave.buttImplant += 2;
		slave.butt += slave.buttImplant;
		slave.buttImplantType = "normal";
		slave.hips = 2;
		slave.lips = 60;
		slave.lipsImplant = 10;
		slave.face = Math.clamp(slave.face+40, -100, 100);
		slave.faceShape = "sensual";
		slave.devotion = random(40, 65);
		slave.trust = random(45, 65);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.anus = 2;
		slave.vagina = 2;
		slave.weight = random(-20, 20);
		slave.piercing.genitals.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.skill.vaginal = 100;
		slave.skill.oral = 100;
		slave.skill.anal = 100;
		slave.skill.whoring = 100;
		slave.skill.entertainment = 100;
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.behavioralFlaw = "arrogant";
		slave.sexualFlaw = "none";

		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 3000;
		const cost = slaveCost(slave) - contractCost;
		const {say} = getEnunciation(slave);
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The person placing the call is physically quite unusual, to the point of looking distinctly unnatural, given that they are a dwarf sporting proportionally massive implants. ${He} crosses ${his} arms under ${his} bust and begins a rather haughty spiel, given ${his} size.`);
		r.push(Spoken(slave, `"Now don't go thinking of calling me a midget, this here is one-hundred percent short <i>and</i> stacked, wouldn't you agree?"`));
		r.push(`${He} flexes back and grabs ${his} fat rear, ${his} blouse practically exploding in the process.`);
		r.push(Spoken(slave, `"What you see here is all yours if you ask nicely. See, I've hard a pretty hard life,"`));
		r.push(`${he} ${say}s while pantomiming sucking dick,`);
		r.push(Spoken(slave, `"and I'm looking to retire into luxury. From what I've heard, a star like me may as well have a pedestal erected in my honor in ${V.arcologies[0].name} so that all can bask in my curvy glory."`));
		r.push(`${He} does a split, giving you a look straight into ${his} shaved pussy.`);
		r.push(Spoken(slave, `"So how about you invite me in so that I can welcome <i>you</i> in?"`));

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
			r.push(`${He} arrives unapologetically in ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm not sorry,"`));
			r.push(`${he} says coyly,`);
			r.push(Spoken(slave, `"but this outfit highlights my goods."`));
			r.push(`Eventually ${he} sighs and sets to work popping ${his} assets out of the straining dress.`);
			r.push(Spoken(slave, `"So, what shall we do first? I'm sure I know some things that could make even you blush, hottie."`));

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} arrives unapologetically in ${his} fine clothing.`);
			r.push(Spoken(slave, `"I'm not sorry," ${he} says coyly,`));
			r.push(Spoken(slave, `"but this outfit highlights my goods."`));
			r.push(`Eventually ${he} sighs and sets to work popping ${his} assets out of the straining dress.`);
			r.push(Spoken(slave, `"So, what shall we do first? I'm sure I know some things that could make even you blush, hottie."`));
			r.push(`As the purchaser's agent appears to take ${him} away, ${he} scoffs and demands to know who's bought ${him}. A breeder, you tell ${him}, who plans to breed to perfect race of servile dwarves.`);
			r.push(Spoken(slave, `"Oh hell no! Do you have any idea how much I spent perfecting my body!? You think I'm just going to let some fuck ruin it with kids?! You can go fuck-"`));
			r.push(`Into a bag and over the agent's shoulder ${he} goes, never to be seen again.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};

