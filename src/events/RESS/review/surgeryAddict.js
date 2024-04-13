App.Events.RESSSurgeryAddict = class RESSSurgeryAddict extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => s.rules.speech !== "restrictive",
				s => s.boobsImplant > 400,
				s => s.lipsImplant >= 30,
				s => s.buttImplant > 3,
				s => s.boobs < 9000 || s.butt < 8
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`Going about your day, you see`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`sitting`);
		if (hasAnyLegs(eventSlave)) {
			if (hasBothLegs(eventSlave)) {
				r.push(`cross-legged`);
			}
			r.push(`in`);
		} else {
			r.push(`propped against the doorway of`);
		}
		r.push(`the remote surgery room,`);
		if (canSee(eventSlave)) {
			r.push(`staring intently at`);
		} else {
			r.push(`gazing longingly towards`);
		}
		r.push(`the equipment. ${He}'s not breaking any rules, but this behavior is so strange you investigate. ${He} asks`);
		if (eventSlave.lips > 70) {
			r.push(`hesitantly through ${his} huge lips,`);
		} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
			r.push(`hesitantly through ${his} piercings,`);
		} else {
			r.push(`hesitantly,`);
		}
		r.push(Spoken(eventSlave, `"${Master}, I... I have a lot of implants. A lot."`));
		if (hasAnyArms(eventSlave)) {
			r.push(`${He} touches ${his} body absentmindedly.`);
		} else {
			r.push(`${He} wriggles ${his} body, trying to indicate ${his} implants.`);
		}
		r.push(`"Can... can you give me some more?"`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`${He} asked for it; give ${him} the works`, give),
			eventSlave.bellyPreg >= 5000
				? new App.Events.Result(`Not while ${he} is so pregnant`, pregnant)
				: new App.Events.Result(),
			new App.Events.Result(`No`, no),
		]);

		function give() {
			r = [];
			r.push(`As the sterile doors of the surgical equipment hiss closed over ${him}, you whisper in ${his} ear that ${he}'s about to be cut up. ${He} looks at you with a mix of fear and wild excitement. After nearly a whole week of constant surgery and expensive drug-induced recovery,`);
			if (canSee(eventSlave)) {
				r.push(`${he} finally gets to see ${his} new body in the mirror.`);
			} else if (!hasAnyArms(eventSlave)) {
				r.push(`you finally describe all the new implants in ${his} body and how they make ${him} look.`);
			} else {
				r.push(`you finally let ${him} feel ${his} new body, even helping ${his} hands to the less obvious changes.`);
			}
			r.push(`${He} has cartoonishly huge lips, boobs, and buttocks; ${he} looks like a caricature of a bimbo. ${He} cries with gratitude`);
			if (canSee(eventSlave)) {
				r.push(`to see ${himself},`);
			} else if (!hasAnyArms(eventSlave)) {
				r.push(`to`);
				if (canHear(eventSlave)) {
					r.push(`hear`);
				} else {
					r.push(`discover`);
				}
				r.push(`how ${he} looks,`);
			} else {
				r.push(`as ${he} feels ${his} new body,`);
			}
			r.push(`and can scarcely wait to recover enough to get fucked. <span class="devotion inc">${He} has become extremely devoted to you.</span>`);
			cashX(forceNeg(Math.trunc(125*V.upgradeMultiplierMedicine)), "slaveSurgery", eventSlave);
			eventSlave.devotion += 10;
			const boobImplant = Math.clamp(20000-eventSlave.boobs, 0, 2000);
			eventSlave.boobsImplant += boobImplant;
			eventSlave.boobs += boobImplant;
			const buttImplant = Math.clamp(10-eventSlave.butt, 0, 4);
			eventSlave.buttImplant += buttImplant;
			eventSlave.butt += buttImplant;
			const lipImplant = Math.clamp(80-eventSlave.lips, 0, 20);
			eventSlave.lipsImplant += lipImplant;
			eventSlave.lips += lipImplant;
			return r;
		}

		function pregnant() {
			return [`${He}'s clearly disappointed, but ${he} accepts your will and goes about ${his} business. After the incident, you notice that ${he} definitely seems to have a kink for implants. ${He} loves it when ${his} implants are groped, but ${his} favorite is when ${he} gets to fuck another slave with fake tits. ${He} can't keep ${his}`, ...noEnding()];
		}

		function no() {
			return [`${He}'s clearly disappointed, but ${he} accepts that you are watching out for ${his} health and goes about ${his} business. After the incident, you notice that ${he} definitely seems to have a kink for implants. ${He} loves it when ${his} implants are groped, but ${his} favorite is when ${he} gets to fuck another slave with fake tits. ${He} can't keep ${his}`, ...noEnding()];
		}

		function noEnding() {
			r = [];
			if (hasBothArms(eventSlave)) {
				r.push(`hands`);
			} else if (hasAnyArms(eventSlave)) {
				r.push(`fingers`);
			} else {
				r.push(`lips`);
			}
			r.push(`off a pair of bolted-on boobs.`);
			return r;
		}
	}
};
