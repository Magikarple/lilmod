App.Events.recFSSlaveProfessionalism = class recFSSlaveProfessionalism extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSSlaveProfessionalism > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 30, disableDisability: 1});
		slave.career = "a porn star";
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself for voluntary enslavement after realizing $his career was over.";
		slave.boobsImplant += random(4, 6)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "fillable";
		slave.boobShape = "normal";
		slave.lips = 60;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.devotion = random(20, 45);
		slave.trust = random(25, 65);
		slave.intelligence = random(75, 100);
		slave.intelligenceImplant = 15;
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		slave.anus = 2;
		slave.vagina = 2;
		slave.weight = random(-40, 10);
		slave.piercing.genitals.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.nipple.weight = 1;
		slave.piercing.nose.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.skill.vaginal = 100;
		slave.skill.oral = 100;
		slave.skill.anal = 100;
		slave.skill.whoring = 100;
		slave.skill.entertainment = 100;
		slave.behavioralFlaw = "none";
		slave.sexualFlaw = "none";
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		const {
			He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {say} = getEnunciation(slave);
		const contractCost = 3000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This one is interesting, even by the standards of messages from people who want to become slaves. The individual is neither sick nor abused, and speaks with intelligence and directness.`);
		r.push(Spoken(slave, `"I've heard a lot about how ${V.arcologies[0].name} values experience,"`));
		r.push(`${he} ${say}s.`);
		r.push(Spoken(slave, `"And, well, people are getting tired of seeing my ass in videos and money is drying up fast. If I'm going to end up enslaved, it would be best if it were someone that could make use of the skills I've learned over my career that owned me. It would be such a waste of my talents otherwise. Of course, you may just lock me in a box and call it a day, but life's a gamble some times and my system says this is a winner."`));

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
			r.push(`When ${he} arrives, ${he} gracefully enters while stripping down to ${his} birthday suit in an erotic display of ${his} talents. It's clear ${he} feels some relief in your gaze, but ${he} knows enough about the Free Cities to know that ${he}'s likely going to be continuing ${his} career in sexual labor. Only this time, ${he}'ll be more appreciated for ${his} talents rather than ${his} body.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} gracefully enters and starts to strip before you can stop ${him}. A growing look of concern spreads across ${his} face when a purchaser's agent arrives to take ${him} away. ${He} looks at you desperately, begging to know who's purchased ${him}. You let ${him} know ${he} still has a fan here and they weren't about to let this chance slip by. ${He} seems elated by this.`;
		}
	}
};
