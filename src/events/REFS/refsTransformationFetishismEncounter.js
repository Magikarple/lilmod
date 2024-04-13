App.Events.refsTransformationFetishismEncounter = class refsTransformationFetishismEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSTransformationFetishist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 1000;
		const enslaveCost = 10000;
		const slave = GenerateNewSlave("XX", {maxAge: 22, disableDisability: 1, race: "nonslave"});
		slave.origin = "$He was enslaved by you when you overcharged $him for surgery.";
		slave.devotion = random(-70, -55);
		slave.trust = random(-45, -25);
		setHealth(slave, jsRandom(10, 20), jsRandom(10, 20));
		slave.boobs += 600;
		slave.boobsImplant = 600;
		slave.boobsImplantType = "normal";
		slave.butt++;
		slave.buttImplant = 1;
		slave.buttImplantType = "normal";
		slave.lips += 10;
		slave.lipsImplant = 10;
		slave.clothes = "conservative clothing";

		const {
			He,
			he, his, him, himself, woman
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`As a result of ${V.arcologies[0].name}'s adoption of transformation fetishism, a number of plastic surgery clinics, cosmetic surgeries and other transformative businesses have begun to crop up around the arcology's various promenades and shopping districts. The citizens of ${V.arcologies[0].name} have taken to the idea of altering their bodies with a gusto — though not all are so quick to adopt the trend just because it's in vogue.`]);

		App.Events.addParagraph(node, [`On one particular outing, you come across a citizen outside a surgery clinic staring pensively up at a poster advertising the variety of cosmetic procedures on offer in the institution. The citizen's expression is wistful, if somewhat grave, and at odds with the display above ${him} lit up with silicone breasts, plump bee-stung lips and fake asses. From ${his} unaltered appearance and simple garments, it is likely that ${he} is not one of the arcology's wealthier denizens and thus is unable to shape ${his} body to ${his} heart's desire.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Pay for ${his} treatment`, pay, `This will cost ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to promote ${him}.`));
		}
		choices.push(new App.Events.Result(`Offer to enhance ${him} in your remote surgery in exchange for a fuck`, fuck));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `It's unfortunate that this citizen is unable to realize ${his} dreams, but that's the way of the Free Cities. There are winners, and there are losers.`;
		}

		function pay() {
			repX(5000, "event");
			cashX(-cost, "event");
			return `It takes a moment for you to convince the ${woman} that you aren't playing some cruel joke on ${him}, but once you do ${he} practically squeals with joy as you take ${him} through the doors of the clinic and announce your intent to pay to give your loyal citizen the absolute transformative works. When you next see ${him} it's on a gurney as ${he}'s wheeled out of the surgery, ${his} patient's gown jutting out from ${his} chest due to the size of ${his} new rack. Through swollen lips ${he} gushes to you about how great ${he} feels to finally be a veritable bimbo, and how ${he}'s going to tell every citizen ${he} fucks in ${V.arcologies[0].name} <span class="reputation inc">that they have you to thank for ${his} new body.</span>`;
		}

		function fuck() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You make your presence known to citizen, and once the usual shock and disbelief have worn off the citizen rapidly agrees to your proposal. ${He} follows you back to the penthouse where you inform ${V.assistant.name} that the citizen is to be given the works in the remote surgery. As the citizen passes through the doors to the surgery, ${he} turns and blows you a kiss of gratitude.`]);

			App.Events.addParagraph(frag, [`When the citizen is later delivered to your private suite to uphold ${his} end of the bargain, ${he} does so as the veritable image of a perfect bimbo slut. In ${his} rush to come thank you for transforming ${him} from ${his} plain and plebian appearance ${he} has evidently neglected to clothe ${himself}, so you can admire ${his} new firm tits, plump ass and bee-stung lips from the moment ${he} enters the room. Despite being fresh from surgery, ${he}'s an exquisite fuck and an enthusiastic partner — citizens like ${him} often are, given that penetration from a slave would be a social suicide.`]);
			const choices = [];
			if (V.cash >= (enslaveCost)) {
				choices.push(new App.Events.Result(`Enslave ${him} afterwards`, enslave, `Purchasing ${his} outstanding debts will cost ${cashFormat(enslaveCost)}.`));
			} else {
				choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			}
			App.Events.addResponses(frag, choices);

			repX(1500, "event");
			return frag;

			function enslave() {
				newSlave(slave);
				cashX(-enslaveCost, "event", slave);
				return `As your new playmate lies slumbering in bed, you consult with ${V.assistant.name} as to the cost of the surgery conducted today. With some creative accounting, you settle the citizen's other outstanding debts and then arrange for ${him} to be charged a sum in excess of ${his} financial means for the surgery conducted on ${him} today. Of course, that was not what you agreed, but it was ${his} mistake for undergoing an expensive procedure without a formal contract. When ${he} awakens, though ${he} will retain ${his} new bimbo body, ${he} will be just another slave in your penthouse.`;
			}
		}
	}
};
