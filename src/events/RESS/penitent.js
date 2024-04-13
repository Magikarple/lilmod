App.Events.RESSPenitent = class RESSPenitent extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.clothes === "a penitent nuns habit",
				s => s.devotion >= -20 && s.devotion <= 50
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave);
		node.appendChild(artDiv);

		let r = [];
		r.push(`As`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`comes before you for routine inspection, it is obvious that ${his} penitent habit is having an effect. ${He} moves with exquisite care, desperate to minimize the`);
		if (eventSlave.pregKnown === 1 && eventSlave.belly >= 1500) {
			r.push(`chafing, especially on ${his} growing pregnancy.`);
		} else {
			r.push(`chafing.`);
		}
		r.push(`${He} seems totally concentrated on obedience: the constant discomfort often has the effect of forcing a slave to marshal all ${his} mental faculties in the service of pain avoidance.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${His} responses to your routine questions are so mechanical and honest that you make an impromptu confession of it. You require ${him} to tell the full tale of all ${his} minor infractions against the rules, and even order ${him} to confess ${his} resistant thoughts to you as well. Past the ability to resist, ${he} pours out a stream of ${his} inner fears, hopes, and feelings about ${his} life as a sex slave.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Require ${him} to self-flagellate`, flagellate),
			(canImpreg(eventSlave, V.PC) && (eventSlave.mpreg === 1 && canDoAnal(eventSlave)) || (eventSlave.ovaries === 1 && canDoVaginal(eventSlave)))
				? new App.Events.Result(`Put a baby in ${him} while ${he} prays`, babyPray, virginityWarning())
				: new App.Events.Result(),
			(canDoVaginal(eventSlave))
				? new App.Events.Result(`Fuck ${him} while ${he} prays`, fuckPray, (eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null))
				: new App.Events.Result(),
			(canDoAnal(eventSlave))
				? new App.Events.Result(`Sodomize ${him} while ${he} prays`, analPray, (eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null))
				: new App.Events.Result(),
		]);

		function flagellate() {
			r = [];
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "no clothing");

			r.push(`You tell ${him} that you will offer ${him} a method of expiating ${his} deep and troubling sin. ${He} looks almost hopeful at this, until you lead ${him} out onto a balcony and order ${him} to strip before handing ${him} a simple length of hempen rope. ${He} already knows what's coming next, but ${he} breaks down as ${he} obeys your orders to kneel. ${He} sobs abjectly, but you don't even have to give the next order: ${he}'s already flogging the rope against ${his} own back in the hope of earning a reprieve by obedience. You count the strokes aloud, stopping at one in disapproval of how light ${he}'s hitting ${himself}. ${He} flogs ${himself} harder and harder, screaming a little and crying in pain and fear as you obstinately refuse to say "two." When ${he} strikes so hard that ${he} draws a little blood, you finally say the terrible word. When you're finally satisfied with ${his} self-torture, ${he}'s so exhausted that you carry ${his} limp,`);
			if (V.seePee === 1) {
				r.push(`bloody, vaguely urine-scented`);
			} else {
				r.push(`bloody`);
			}
			if (eventSlave.bellyPreg >= 1500) {
				r.push(r.pop() + `, gravid`);
			}
			r.push(`form into the shower, wash ${him}, and apply curatives, <span class="health dec">though ${he}'s still quite injured.</span> ${He} wakes to find ${himself} curled up in your lap, and ${he} stiffens for a brief moment before <span class="devotion inc">relaxing against your chest,</span> weeping softly.`);
			if (eventSlave.fetish !== "submissive" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">submission</span> with sexual fulfillment.`);
			}
			if ((eventSlave.behavioralFlaw !== "odd") && (random(1, 100) > 50)) {
				eventSlave.behavioralFlaw = "odd";
				r.push(`The terrible experience has left ${him} with <span class="flaw gain">unpleasant nervous tics.</span>`);
			}
			eventSlave.devotion += 10;
			healthDamage(eventSlave, 10);
			return r;
		}

		function virginityWarning() {
			if (eventSlave.anus === 0 && eventSlave.mpreg === 1) {
				return `This option will take ${his} anal virginity`;
			} else if (eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			}
		}

		function babyPray() {
			r = [];
			r.push(`${eventSlave.slaveName} finds ${himself} standing in front of you, feeling you roughly using two fingers to finger ${his}`);
			if (eventSlave.mpreg === 1) {
				r.push(`asspussy.`);
			} else {
				r.push(`pussy.`);
			}
			r.push(`${He} gasps out:`);
			r.push(Spoken(eventSlave, `"Oh ${Master}, owner, protector, and father of my children, forgive my sins, just as you forgave my sisters in slavery before me. Count not my transgressions against your rules, but, rather, the tears of my womb. Remember not my iniquities but my willingness to be bred by you. I long to serve your`));
			if (V.PC.vagina !== -1) {
				r.push(`futa`);
			}
			r.push(Spoken(eventSlave, `dick, and beg that you will use me and bless my body with your offspring. I promise to submit to you as your breeding slut all the days of my servitude, and to grow heavy with child, again and again."`));
			r.push(`${He} moans with relief when ${he} feels you withdraw your penetrating digits partway through ${his} recitation, but by the time ${he}'s finished, you've shoved your dick up ${his} waiting`);
			if (eventSlave.mpreg === 1) {
				r.push(`asshole`);
			} else {
				r.push(`pussy`);
			}
			r.push(`and are close to blessing ${him} with a load of cum. ${He} <span class="devotion inc">does ${his} best</span> to relax and resumes,`, Spoken(eventSlave, `"Oh, ${Master}..."`));
			if (eventSlave.mpreg === 1) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			knockMeUp(eventSlave, 100, 2, -1);
			if (eventSlave.fetish !== "humiliation" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">humiliation</span> with sexual fulfillment.`);
			} else if (eventSlave.fetish !== "submissive" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">submission</span> with sexual fulfillment.`);
			} else if (eventSlave.fetish !== "pregnancy" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "pregnancy";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">carrying your children</span> with sexual fulfillment.`);
			}
			eventSlave.devotion += 4;
			return r;
		}

		function fuckPray() {
			r = [];
			r.push(`${eventSlave.slaveName} finds ${himself} standing in front of you, feeling you roughly using two fingers to finger ${his} pussy. ${He} gasps out:`);
			r.push(Spoken(eventSlave, `"Oh ${Master}, owner and protector, forgive my sins, just as you forgave my sisters in slavery before me. Count not my transgressions against your rules, but, rather, my tears of service. Remember not my iniquities but my willingness to be raped by you. I long to serve your`));
			if (V.PC.dick === 0) {
				r.push(Spoken(eventSlave, `pussy,`));
			} else {
				if (V.PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(Spoken(eventSlave, `dick,`));
			}
			r.push(Spoken(eventSlave, `and beg that you will use me and make your dwelling place within my`));
			if (eventSlave.vagina === 0) {
				r.push(Spoken(eventSlave, `virgin folds.`));
			} else {
				r.push(Spoken(eventSlave, `feminine slit.`));
			}
			r.push(Spoken(eventSlave, `I promise to submit to you as your vaginal slut all the days of my servitude."`));
			r.push(`${He} moans with relief when ${he} feels you withdraw your penetrating digits partway through ${his} recitation, but by the time ${he}'s finished, you've shoved`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on`);
			} else {
				r.push(`your dick`);
			}
			r.push(`up ${his} waiting pussy. ${He} <span class="devotion inc">does ${his} best</span> to relax and resumes,`, Spoken(eventSlave, `"Oh ${Master}..."`));
			r.push(VCheck.Vaginal(eventSlave, 1));
			if (eventSlave.fetish !== "humiliation" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">humiliation</span> with sexual fulfillment.`);
			} else if (eventSlave.fetish !== "submissive" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">submission</span> with sexual fulfillment.`);
			}
			eventSlave.devotion += 4;
			return r;
		}

		function analPray() {
			r = [];
			r.push(`${eventSlave.slaveName} finds ${himself} standing in front of you, feeling you roughly probe ${his} ass with two fingers. ${He} gasps out:`);
			r.push(Spoken(eventSlave, `"Oh ${Master}, owner and protector, forgive my sins, just as you forgave my sisters in slavery before me. Count not my transgressions against your rules, but, rather, my tears of anal service. Remember not my iniquities but my willingness to be assraped by you. I long to serve your`));
			if (V.PC.dick === 0) {
				r.push(Spoken(eventSlave, `pussy,`));
			} else {
				if (V.PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(Spoken(eventSlave, `dick,`));
			}
			r.push(Spoken(eventSlave, `and beg that you will use me and make your dwelling place within my butthole. I promise to submit to you as your anal slut all the days of my servitude."`));
			r.push(`${He} moans with relief when ${he} feels you withdraw your penetrating digits partway through ${his} recitation, but by the time ${he}'s finished, you've shoved`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on`);
			} else {
				r.push(`your dick`);
			}
			r.push(`up ${his} loosened ass. ${He} <span class="devotion inc">does ${his} best</span> to relax and resumes,`, Spoken(eventSlave, `"Oh ${Master}..."`));
			r.push(VCheck.Anal(eventSlave, 1));
			if (eventSlave.fetish !== "humiliation" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">humiliation</span> with sexual fulfillment.`);
			} else if (eventSlave.fetish !== "submissive" && fetishChangeChance(eventSlave) > random(1, 100)) {
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				r.push(`${He} has come to associate <span class="fetish gain">submission</span> with sexual fulfillment.`);
			}
			eventSlave.devotion += 4;
			return r;
		}
	}
};
