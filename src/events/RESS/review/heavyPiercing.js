App.Events.RESSHeavyPiercing = class RESSHeavyPiercing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.piercing.vagina.weight > 1,
				s => s.piercing.nipple.weight > 1,
				s => s.piercing.genitals.weight > 1,
				s => s.devotion > 20 || s.trust < -20,
				s => s.devotion <= 50,
				s => canDoAnal(s) || canDoVaginal(s)
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`The intimate areas of`,
			contextualIntro(V.PC, eventSlave, true),
			`are heavily pierced. This is great; it draws attention to ${his} holes and makes ${him} look like the sex slave ${he} is. However, it does necessitate some extra maintenance. It's the end of the day, and ${eventSlave.slaveName} is in a bathroom`
		);
		if (canSee(eventSlave)) {
			r.push(`carefully checking each of ${his} piercings.`);
		} else {
			r.push(`meticulously cleaning each of ${his} piercings.`);
		}
		r.push(`Many of them come in contact with fluids on a regular basis, so ${he} cleans them conscientiously.`);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`As you watch ${him}, it occurs to you that since ${eventSlave.slaveName} isn't fully devoted to you yet, there's all manner of inventive ways you could have a little fun and increase ${his} submission to you at the same time.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Weight ${his} piercings and fuck ${him} so they swing`, weigh, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null),
			new App.Events.Result(`Secure ${him} by ${his} piercings for public use`, secure, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null),
		]);

		function weigh() {
			r = [];
			r.push(`You order ${him} to make sure all of ${his} piercings have rings in them, and then come join you when ${he}'s done. ${He} enters your office with a mixture of fear and curiosity on ${his} face. You put ${him} down on`);
			if (hasAllLimbs(eventSlave)) {
				r.push(`all fours`);
			} else {
				r.push(`the ground`);
			}
			if (hasBothLegs(eventSlave)) {
				r.push(`with ${his} legs spread,`);
			}
			if (eventSlave.belly >= 50000) {
				r.push(r.pop() + `, belly brushing the floor,`);
			}
			if (canSee(eventSlave)) {
				r.push(`blindfold ${him},`);
			}
			r.push(`and then start clipping little metal weights on short chains to each of ${his} piercings. Before long, ${his} nipples are painfully stretched under the tugging,`);
			if (eventSlave.dick > 0) {
				r.push(`and the weights up and down ${his} cock are causing ${his} considerable discomfort.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`and though ${he} lacks any external genitalia to weight, you make sure ${his} ass feels the burn.`);
			} else {
				r.push(`${his} pussylips are being pulled downward, and even ${his} clit is agonizingly tortured.`);
			}
			r.push(`You fuck ${him} thoroughly, pounding ${him} so the weights swing. ${He} sobs and begs. <span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			return r;
		}

		function secure() {
			r = [];
			r.push(`You order ${him} to make sure all of ${his} piercings have rings in them, and then come to you when ${he}'s done. ${He} enters your office with a mixture of fear and curiosity on ${his} face. You lead ${him} outside and secure ${him} in a side hall so that ${his} ass is presented to anyone who takes interest. ${He}'s forced to maintain this exact posture by a light chain between`);
			if (eventSlave.belly > 10000) {
				r.push(`${his} popped navel and a ring on the ground.`);
			} else if (eventSlave.dick > 0) {
				r.push(`${his} dickhead and a ring on the ground.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`${his} nipples and a ring on the ground.`);
			} else {
				r.push(`${his} pussy and a ring on the ground.`);
			}
			r.push(`You fuck ${his} ass to check the bondage; it's good. The chain is out of the way, and ${he} jerks and struggles amusingly to keep it from tugging ${him} painfully. You pull out to leave ${his} fucked butt with cum dribbling out of it, and leave ${him} to the tender mercies of the growing crowd. <span class="reputation inc">The sadists among the public are duly grateful.</span>`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
					r.push(`They take pleasure in claiming <span class="virginity loss">both ${his} virginity and anal cherry.</span>`);
				} else if (eventSlave.vagina === 0) {
					r.push(`They take pleasure in claiming <span class="virginity loss">${his} virginity.</span>`);
				} else if (eventSlave.anus === 0) {
					r.push(`They take pleasure in claiming <span class="virginity loss">${his} anal cherry.</span>`);
				}
				eventSlave.vagina++;
				eventSlave.anus++;
				seX(eventSlave, "anal", "public", "penetrative", 5);
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 10, 2, -2));
				}
			} else if (canDoAnal(eventSlave)) {
				if (eventSlave.anus === 0) {
					r.push(`They take pleasure in claiming <span class="virginity loss">${his} anal cherry.</span>`);
				}
				eventSlave.anus++;
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 25, 1, -2));
				}
			} else {
				if (eventSlave.vagina === 0) {
					r.push(`They take pleasure in claiming <span class="virginity loss">${his} virginity.</span>`);
				}
				eventSlave.vagina++;
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (eventSlave.eggType === "human" && canGetPregnant(eventSlave)) {
					r.push(knockMeUp(eventSlave, 25, 0, -2));
				}
			}
			repX(2500, "event", eventSlave);
			return r;
		}
	}
};
