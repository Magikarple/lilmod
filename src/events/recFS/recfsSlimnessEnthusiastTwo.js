App.Events.recFSSlimnessEnthusiastTwo = class recFSSlimnessEnthusiastTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSSlimnessEnthusiast > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 24, disableDisability: 1});
		generateSalonModifications(slave);
		slave.origin = "$He offered $himself to you for enslavement to escape having plastic surgery foisted on $him.";
		slave.boobs = random(4, 6)*50;
		slave.natural.boobs = slave.boobs;
		slave.weight = -20;
		slave.natural.height = random(160, 200);
		slave.height = slave.natural.height;
		slave.face = random(15, 100);
		slave.butt = random(1, 2);
		slave.lips = 0;
		slave.devotion = random(25, 45);
		slave.trust = random(25, 45);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 0);
		if (slave.physicalAge >= 12) {
			slave.teeth = "normal";
		}
		slave.pubicHStyle = "waxed";

		const {
			He,
			his, he, him, woman, women
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = 3000;
		const cost = slaveCost(slave) - contractCost;
		const sir = (V.PC.title !== 0) ? `sir` : `ma'am`;
		const {say} = getEnunciation(slave);
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`This call is coming from a public kiosk, which is usually an indication that the person on the other end is a transient individual who has decided to take slavery over homelessness. You are understandably surprised when this turns out to not be the case; the young ${woman} in the video call is reasonably well dressed, so ${his} newfound situation must be exceedingly recent. Without hesitation ${he} immediately asks to be enslaved.`);
		r.push(Spoken(slave, `"My boyfriend wants to turn me into some sort of bimbo,"`));
		r.push(`${he} ${say}s through ${his} tears.`);
		r.push(Spoken(slave, `"I found all the surgery brochures that he hid, ${sir}. But,"`));
		r.push(`and ${he} brings ${his} slender chest, though covered by ${his} top, into view,`);
		r.push(Spoken(slave, `"I don't want to be cut up and filled with plastic. One of my friends told me that you care about a ${woman} with a good figure, ${sir}. I should have never sold myself to that bastard."`));

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
			r.push(`When ${he} arrives, ${he} is the very picture of a young waif out of ${his} depth. It's clear ${he} feels relief and escaping going under the knife, but ${he} knows enough about the Free Cities to know that ${he}'s likely to buy ${his} presence here through long years of sexual labor.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `When ${he} arrives, ${he} is the very picture of a young waif out of ${his} depth. It's clear ${he} feels relief and escaping going under the knife, but ${he} knows enough about the Free Cities to know that ${he}'s likely to buy ${his} presence here through long years of sexual labor. A purchaser's agent appears to take ${him} away, and ${he} quietly asks who's bought ${him}. A citizen, you tell ${him}, who prefers his ${women} slender and unimplanted. ${He} seems relieved by this.`;
		}
	}
};
