App.Events.RESSExtremeAphrodisiacs = class RESSExtremeAphrodisiacs extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.aphrodisiacs > 1 || s.inflationType === "aphrodisiac",
				s => s.rules.speech === "restrictive",
				s => s.rules.release.master === 1,
				s => App.Utils.releaseRestricted(s)
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`As you are retiring for the night,`,
			contextualIntro(PC, eventSlave, true)
		);
		if (!canWalk(eventSlave)) {
			r.push(`crawls`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`totters`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`waddles`);
		} else {
			r.push(`walks`);
		}
		r.push(`into your bedroom. Since ${he} is not allowed to ask questions, ${he} says nothing, but ${his} reason for being here is obvious enough. ${He}'s on a medically reckless dosage of aphrodisiacs, and ${he}'s panting as ${he}`);
		if (eventSlave.heels === 1 && shoeHeelCategory(eventSlave) === 0) {
			r.push(`kneels`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`teeters`);
		} else {
			r.push(`stands`);
		}
		r.push(`there. ${His} nipples are`);
		if (eventSlave.nipples !== "fuckable") {
			r.push(`hard,`);
		} else {
			r.push(`swollen shut,`);
		}
		r.push(`and there's visible moisture on ${his}`);
		if (V.seeRace === 1) {
			r.push(`${eventSlave.race}`);
		}
		if (eventSlave.vagina !== -1) {
			r.push(`pussylips.`);
		} else if (eventSlave.dick !== 0) {
			r.push(`dickhead.`);
		} else {
			r.push(`tiny little front hole.`);
		}
		r.push(`It's also against the rules for ${him} to masturbate, so ${he} clearly decided to come to you rather than break the rules. There's no way ${he}'ll be able to sleep like this.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Take pity and give ${him} relief`, relief),
			new App.Events.Result(`See how rough you can be and still get ${him} to cum`, rough),
			new App.Events.Result(`Send ${him} away`, away)
		]);

		function relief() {
			eventSlave.devotion += 4;
			return `You sit on the edge of the bed and draw ${him} down to sit on your lap. This way, you can enjoy gently fucking ${him} while you draw orgasm after orgasm out of ${him} with your hands. ${He}'ll only be relieved for a few hours, but ${he}'s <span class="devotion inc">tearfully grateful all the same.</span>`;
		}

		function rough() {
			const r = new SpacedTextAccumulator();
			r.push(`The aphrodisiac dosage ${he}'s on will let ${him} orgasm to almost anything. You spend a few minutes playing with ${his} nipples, skillfully edging ${him} away from climax, and ${he}'s almost vibrating with discomfort. ${He}'s so desperate that ${he} sobs with relief when you order ${him} to`);
			if (eventSlave.heels === 1 && shoeHeelCategory(eventSlave) === 0) {
				r.push(`kneel`);
			} else if (shoeHeelCategory(eventSlave) > 1) {
				r.push(`totter up`);
			} else {
				r.push(`stand`);
			}
			if (eventSlave.belly >= 5000) {
				r.push(`${belly} belly`);
			}
			r.push(`against a wall and spread ${his} buttocks. A little saliva and`);
			if (V.PC.vagina !== -1) {
				r.push(`a bit of your own pussyjuice, transferred by a couple of fingers, and`);
			}
			if (V.PC.dick === 0) {
				r.push(`your vibrating strap-on`);
			} else {
				r.push(`your dick`);
			}
			r.push(`is up ${his} willing ass. The position is uncomfortable for ${him}, and you are not gentle, but ${he} comes anyway. By the end of the night ${his} butthole is so sore that ${he}`);
			if (eventSlave.belly >= 5000) {
				r.push(`lies on ${his} side`);
			} else {
				r.push(`lies on ${his} stomach`);
			}
			r.push(`every chance ${he} gets. ${His} submissiveness <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function away() {
			eventSlave.devotion -= 5;
			return `${He} leaves with ill-concealed disappointment, and is faced with the choice between covert, rule-breaking masturbation or a sleepless night. ${His} regard for you <span class="devotion dec">has decreased.</span>`;
		}
	}
};
