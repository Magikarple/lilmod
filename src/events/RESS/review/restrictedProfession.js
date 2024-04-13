App.Events.RESSRestrictedProfession = class RESSRestrictedProfession extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.rules.speech === "restrictive",
				s => s.devotion > 60,
				s => s.trust >= -20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`is`
		);
		if (!hasAnyLegs(eventSlave)) {
			r.push(`sitting`);
			if (hasAnyArms(eventSlave)) {
				r.push(`helplessly`);
			} else {
				r.push(`limblessly`);
			}
		} else if (!canWalk(eventSlave)) {
			r.push(`kneeling`);
		} else {
			r.push(`standing`);
		}
		r.push(`before your desk for ${his} regular inspection. ${He} is studiously observing the letter of the rule against speaking, and is doing ${his} best to make your inspection as efficient as possible. ${His} desire to please radiates off ${him} in almost palpable waves. ${He} obviously wants to communicate something to you, but can't do it without breaking the rules.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} speak briefly if ${he}'s very quiet`, briefly),
			new App.Events.Result(`Make ${him} say it in public`, make),
			new App.Events.Result(`Keep ${him} quiet but spend some time with ${him}`, quiet),
		]);

		function briefly() {
			r = [];
			r.push(`You stand up from your desk and approach ${him} very closely without touching ${him}. Looking straight`);
			if (hasAnyEyes(eventSlave)) {
				r.push(`into ${his} ${hasBothEyes(eventSlave) ? "eyes" : "eye"},`);
				r.push(`which are`);
				if (canSee(eventSlave)) {
					r.push(`fixed helplessly on you,`);
				} else {
					r.push(`gazing in your general direction,`);
				}
			} else {
				r.push(`at ${him},`);
			}
			r.push(`you tell ${him} that you'll let ${him} say whatever it is ${he} needs to say to you, but only if ${he}'s very quiet. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`looks at you with huge eyes but`);
			}
			r.push(`nods vigorously. ${He} waits until you lean into ${him}, making ${him} shiver at your proximity, before putting ${his}`);
			if (eventSlave.lips > 70) {
				r.push(`ridiculous`);
			} else if (eventSlave.lips > 40) {
				r.push(`enormous`);
			} else if (eventSlave.lips > 20) {
				r.push(`pillowlike`);
			} else {
				r.push(`girlish`);
			}
			r.push(`lips next to your ear and whispering nervously, "I love you, ${Master}." ${He} recoils a little as if burned by the audacity of ${his} words, but only manages to back off a little before you gather ${his}`);
			if (isAmputee(eventSlave)) {
				r.push(`limbless`);
			} else if (eventSlave.bellyPreg >= 1500) {
				r.push(`gravid`);
			} else if (eventSlave.belly >= 1500) {
				r.push(belly);
			} else {
				r.push(`rocking`);
			}
			r.push(`torso into your arms, holding the back of ${his} head with one hand and rubbing ${his} quivering back with the other. Eventually, ${he} relaxes into`);
			if (PC.boobs >= 300) {
				if (PC.boobsImplant !== 0) {
					r.push(`your fake breasts,`);
				} else {
					r.push(`your soft chest,`);
				}
			} else {
				r.push(`you,`);
			}
			r.push(`knowing that ${his} ${getWrittenTitle(eventSlave)} can never and will never reciprocate, but <span class="devotion inc">accepting</span> that the loving physical contact is a tremendously kind gesture for a master to make.`);
			eventSlave.devotion += 4;
			return r;
		}

		function make() {
			r = [];
			r.push(`Since you suspect you know what it is ${he} wants to say, you`);
			if (!hasAnyLegs(eventSlave)) {
				r.push(`carry ${him} out`);
			} else if (hasAnyArms(eventSlave)) {
				r.push(`lead ${him} by the hand`);
			} else {
				r.push(`have ${him} follow you`);
			}
			r.push(`onto the club, busy with citizens. You tell ${him} quietly that ${he}'s to shout whatever it is ${he} wanted to say, if it's something everyone should hear; otherwise ${he}'s to keep it to ${himself}. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`looks around`);
			} else if (canHear(eventSlave)) {
				r.push(`listens`);
			} else {
				r.push(`opens ${his} mouth`);
			}
			r.push(`nervously, ${his} ${eventSlave.skin} skin betraying a growing blush, before clearing ${his} throat twice, licking ${his} lips, and howling "I LOVE MY ${Master.toUpperCase()}" at the tops of ${his} lungs. When this is out of ${him} ${he} collapses a little, as though the pressure of holding it inside were propping ${him} up. This attracted a considerable amount of attention, almost all of it <span class="reputation inc">positive,</span> with many passersby laughing at the fun, and your fellow slaveowners giving you discreet winks and quiet congratulations.`);
			repX(750, "event", eventSlave);
			return r;
		}

		function quiet() {
			r = [];
			r.push(`You announce that you're finished with business for the day, and feel like some quiet time. ${He} cannot keep`);
			if (canSee(eventSlave)) {
				r.push(`a gleam of humor out of ${his} eye`);
			} else {
				r.push(`the corners of ${his} lips from rising slightly`);
			}
			r.push(`at`);
			if (canHear(eventSlave)) {
				r.push(`hearing`);
			} else {
				r.push(`the phrase`);
			}
			r.push(`'quiet time,' and ${he}`);
			if (!hasAnyLegs(eventSlave)) {
				r.push(`presents ${himself} to be carried`);
			} else {
				r.push(`follows you`);
			}
			r.push(`happily enough. When ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`realizes`);
			}
			r.push(`you're headed to your bedroom ${he} begins to anticipate ${his} ${getWrittenTitle(eventSlave)}'s`);
			if (PC.dick === 0) {
				r.push(`strap-on,`);
			} else {
				r.push(`cock,`);
			}
			r.push(`but is surprised to find that instead of using ${him} you simply`);
			if (isAmputee(eventSlave)) {
				r.push(`place ${him} in bed and curl up around ${his} limbless torso.`);
			} else if (eventSlave.bellyPreg >= 5000) {
				r.push(`help ${him} into bed and curl up with ${him}, your arms encircling ${his} prominent baby bump.`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`help ${him} into bed and curl up with ${him}, your arms encircling ${his} ${belly} dome of a middle.`);
			} else {
				r.push(`climb into bed and pull ${him} under the sheets with you.`);
			}
			r.push(`${He}'s almost disappointed, but after looking into your resting face for a while, nestles ${his} head onto your broad chest and goes to sleep with a <span class="devotion inc">look of contentment</span> on ${his} face. When the two of you wake from your brief nap, you ask ${him} if ${he} has anything else to communicate to you. ${He} smiles sleepily and shakes ${his} head no.`);
			eventSlave.devotion += 4;
			return r;
		}
	}
};
