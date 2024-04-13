App.Events.RESiblingRevenge = class RESiblingRevenge extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeIncest === 1
		];
	}

	actorPrerequisites() {
		return [
			[
				(s) => s.sisters > 0,
				(s) => s.origin === "$He was sold into slavery by $his older sister.",
				canPenetrate,
			],
			[
				(s) => s.anus === 0,
				(s) => getSlave(this.actors[0]).devotion > (s.devotion + 20),
				(s) => areSisters(getSlave(this.actors[0]), s) > 0,
			]
		];
	}

	execute(node) {
		let r = [];
		const youngerSis = getSlave(this.actors[0]);
		const olderSis = getSlave(this.actors[1]);
		const {
			He, His,
			he, him, his, himself,
		} = getPronouns(youngerSis);
		const {
			title: Master
		} = getEnunciation(youngerSis);

		const {
			his2, him2, sister2, girl2
		} = getPronouns(olderSis).appendSuffix("2");

		App.Events.drawEventArt(node, [youngerSis, olderSis], "no clothing");

		r.push(
			`${youngerSis.slaveName}, whose older ${sister2} tried to sell ${him} to you, is up for inspection. As usual, you pepper your inspection with questions about ${his} duties, ${his} feelings about ${his} physical condition, and experiences. More information about one's property is never a bad thing. When the inspection reaches ${youngerSis.slaveName}'s asshole, you ask whether ${he} enjoyed having ${his} older ${sister2} sell ${his} butt.`,
			Spoken(youngerSis, `"No, ${Master},"`),
			`${he} says.`
		);
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Turnabout is fair play`, turn));
		choices.push(new App.Events.Result(`Let ${him} have ${his} revenge, but remind ${him} of ${his} place`, place));
		App.Events.addResponses(node, choices);

		function turn() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${olderSis.slaveName} is brought in. You gag ${him2}, throw the resisting bitch down on the couch, and hold ${him2} there. Then, you peremptorily order the wide-eyed ${youngerSis.slaveName} to`);
			if (canDoAnal(olderSis)) {
				r.push(`sodomize`);
			} else {
				r.push(`facefuck`);
			}
			r.push(`${his} ${sister2}. ${He} stares open mouthed for a moment, but comes over obediently. ${His} face is a strange mix of vengeful eagerness, revulsion, and even a little lust. ${He} shoves ${himself} into the frantically struggling ${girl2}'s`);
			if (canDoAnal(olderSis)) {
				r.push(`butt`);
			} else {
				r.push(`jaw`);
			}
			r.push(`without mercy. ${His} cock is`);
			if (youngerSis.dick < 3) {
				r.push(`pathetically small,`);
			} else if (youngerSis.dick < 5) {
				r.push(`nothing out of the ordinary,`);
			} else if (youngerSis.dick < 7) {
				r.push(`admittedly nothing to scoff at,`);
			} else {
				r.push(`a source of great envy amongst your slaves,`);
			}
			r.push(`but by how ${olderSis.slaveName} reacts it might as well be a baseball bat. ${youngerSis.slaveName} rarely gets to penetrate anything, mostly serving as an oral slut${canDoAnal(youngerSis) ? "and anal cocksleeve" : ""}, so ${he} comes in no time and takes a turn holding ${olderSis.slaveName} down${canDoAnal(olderSis) ? `so you can claim sloppy seconds on ${his2} spasming butthole` : ""}.`);
			r.push(`<span class="devotion inc">${youngerSis.slaveName} has become more devoted to you,</span> while ${olderSis.slaveName} <span class="trust inc">hates you</span> and has become <span class="trust dec">more afraid of you,</span>${canDoAnal(olderSis) ? `and <span class="virginity loss">${olderSis.slaveName} has lost ${his2} anal virginity.</span>` : `.`}`);
			youngerSis.devotion += 4;

			olderSis.trust -= 5;
			olderSis.devotion -= 4;
			if (canDoAnal(olderSis)) {
				olderSis.anus = 1;
				seX(youngerSis, "penetrative", olderSis, "anal");
			} else {
				seX(youngerSis, "penetrative", olderSis, "oral");
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function place() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`${olderSis.slaveName} is brought in. You gag ${him2}, throw the resisting bitch down on the couch, and hold ${him2} there. Then, you peremptorily order the wide-eyed ${youngerSis.slaveName} to put ${his} cock`);
			if (canDoAnal(olderSis)) {
				r.push(`up ${his} ${sister2}'s ass,`);
			} else {
				r.push(`in ${his} ${sister2}'s mouth,`);
			}
			r.push(`and then hold it there. ${He} stares open mouthed for a moment, but comes over obediently. ${His} face is a strange mix of vengeful eagerness, revulsion, and even a little lust. ${He} shoves ${himself} into the frantically struggling ${girl2}'s`);
			if (canDoAnal(olderSis)) {
				r.push(`butt`);
			} else {
				r.push(`jaw`);
			}
			r.push(`without mercy. ${His} cock is`);
			if (youngerSis.dick < 3) {
				r.push(`pathetically small,`);
			} else if (youngerSis.dick < 5) {
				r.push(`nothing out of the ordinary,`);
			} else if (youngerSis.dick < 7) {
				r.push(`admittedly nothing to scoff at,`);
			} else {
				r.push(`a source of great envy amongst your slaves,`);
			}
			r.push(`but by how ${olderSis.slaveName} reacts it might as well be a baseball bat. ${youngerSis.slaveName} obeys your orders and holds still after inserting ${himself}. You`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on,`);
			}
			r.push(`move around`);
			if (canDoAnal(youngerSis)) {
				r.push(`behind ${him} and start ass`);
			} else {
				r.push(`in front of ${him} and start face-`);
			}
			r.push(`fucking ${him} in turn, slowly permitting ${him} to find a rhythm where ${he} can fuck and get fucked at the same time. ${He}'s getting it much harder than ${he}'s giving it but ${he}'s experienced enough that ${he} comes quickly.`);
			r.push(`<span class="devotion inc">${youngerSis.slaveName} has become more devoted to you,</span> while <span class="devotion dec">${olderSis.slaveName} has become more rebellious,</span>${(canDoAnal(olderSis)) ? ` and <span class="virginity loss">${olderSis.slaveName} has lost ${his2} anal virginity.</span>` : `.`}`);
			youngerSis.devotion += 4;
			if (canDoAnal(youngerSis)) {
				seX(youngerSis, "anal", V.PC, "penetrative");
			} else {
				seX(youngerSis, "oral", V.PC, "penetrative");
			}

			olderSis.devotion -= 5;
			if (canDoAnal(olderSis)) {
				olderSis.anus = 1;
				seX(youngerSis, "penetrative", olderSis, "anal");
			} else {
				seX(youngerSis, "penetrative", olderSis, "oral");
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
