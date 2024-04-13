App.Events.refsBodyPurismEncounter = class refsBodyPurismEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSBodyPurist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 1000;
		const slave = GenerateNewSlave("XX", {
			minAge: 36, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1, race: "nonslave"
		});
		slave.devotion = 20;
		slave.trust = 20;
		setHealth(slave, -30, Math.max(normalRandInt(5, 3), 0), normalRandInt(10, 3));
		slave.boobs = random(7, 11) * 30;
		slave.hips = 0;
		slave.butt = 0;
		slave.weight = 0;
		slave.waist = random(-10, 10);
		slave.muscles = Math.min(slave.muscles, 30);
		slave.clothes = "conservative clothing";

		const {
			He,
			he, his, him, himself, woman
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`As a result of ${V.arcologies[0].name}'s adoption of body purism, a number of restorative spas, implant removal clinics and other cleansing businesses have begun to crop up around the arcology's various promenades and shopping districts. The citizens of ${V.arcologies[0].name} have taken to the idea of treating their bodies with sanctity — though not all are so quick to adopt the trend just because it's in vogue.`]);

		App.Events.addParagraph(node, [`On one particular outing, you come across a citizen outside a famous health spa staring pensively up at a poster advertising the variety of purification procedures on offer in the institution. The citizen's expression is wistful, if somewhat grave, and at odds with the display above ${him} lit up with pure unadulterated bodies, expensive health treatments and a plethora of natural cosmetic procedures. The citizen's clothes are ragged and sheer, revealing a number of implant scars around ${his} bust and rear, likely from a costly attempt to render ${himself} fashionable by having ${his} prior implants removed. With such visible scarring, it is unlikely that ${he} is one of the arcology's wealthier denizens, having paid the price to return ${his} body to its natural, unimplanted state.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Pay for a day of treatment for ${him}`, pay, `The treatment will cost ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to promote ${him}.`));
		}
		if (S.Attendant) {
			choices.push(new App.Events.Result(`Give ${him} a day of pampering with your attendant at your spa`, pamper));
		}
		App.Events.addResponses(node, choices);

		function ignore() {
			return `It's unfortunate that this citizen is unable to realize ${his} dreams, but that's the way of the Free Cities. There are winners, and there are losers.`;
		}

		function pay() {
			repX(5000, "event");
			cashX(-cost, "event");
			return `It takes a moment for you to convince the ${woman} that you aren't playing some cruel joke on ${him}, but once you do ${he} practically squeals with joy as you take ${him} through the doors of the spa and announce your intent to pay for a day of cleansing, pampering and luxury. When you next see ${him} it's on a wallscreen television at your penthouse praising you profusely. The rejuvenated young ${woman} has clearly spread word of your generosity <span class="reputation inc">across ${V.arcologies[0].name}.</span>`;
		}

		function pamper() {
			const frag = new DocumentFragment();
			repX(1500, "event");

			App.Events.addParagraph(frag, [`You make your presence known to the citizen, and once the usual shock and disbelief have worn off it takes a moment to convince ${him} that your offer of a cleansing experience in your spa is neither a cruel joke nor an underhanded attempt to enslave ${him}. ${He} follows you back to the penthouse where you inform your attendant that the citizen is to be sequestered in the spa for a day of pampering, cleansing and rejuvenation. As the citizen passes through the doors to the spa, ${he} turns and blows you a kiss of gratitude.`]);

			App.Events.addParagraph(frag, [`When you stop by the spa later in the day, you spot the citizen luxuriating in a hot bath with a number of colorful health products spread across every visible surface of ${his} nude skin. From where you stand it is clear ${his} eyes are closed in immense contentment, while ${his} body floats relaxed and carefree in the bubbling water. When the citizen finally departs at the end of the a long day of purification in the spa, ${he} thanks you profusely and promises to tell everyone ${he} can of your <span class="reputation inc">generosity.</span>`]);
			return frag;
		}
	}
};
