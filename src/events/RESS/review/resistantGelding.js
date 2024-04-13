App.Events.RESSResistantGelding = class RESSResistantGelding extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.dick > 0,
				s => s.balls === 0,
				s => s.genes === "XY",
				s => s.devotion <= 50,
				s => s.trust < -50,
				s => s.anus > 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`You come across`,
			contextualIntro(V.PC, eventSlave, true),
			`standing in the bathroom in front of the sink, with one leg up on the counter so ${he} can inspect ${his} genitalia.`
		);
		if (canSee(eventSlave)) {
			r.push(`From the feeds, it's obvious ${he}'s grieved by what ${he} sees.`);
		} else {
			r.push(`From the feeds, it's obvious ${he}'s grieved by what ${he} feels.`);
		}
		r.push(`As you watch, ${he} sobs quietly, reaching towards where ${his} scrotum used to be with a trembling hand. Apparently, ${he}'s having trouble accepting ${his} status as a gelded slut.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Abuse ${his} ass`, abuse),
			new App.Events.Result(`Reassure ${him} of ${his} sexual worth`, reassure),
			new App.Events.Result(`Comfort ${him}`, comfort)
		]);

		function abuse() {
			r = [];
			r.push(`${He} turns around as`);
			if (canHear(eventSlave)) {
				r.push(`${he} hears`);
			}
			r.push(`you enter the bathroom, fear and loathing on ${his} face, but you seize ${his} shoulder and spin ${his} back around without a word. You drag ${him} across the counter until ${his} face is over the sink, and turn it on. ${He} struggles in sheer incomprehension as you hold ${his} head over the filling basin with one hand and roughly grope ${his} butt with the other. When the sink is full, you tell ${him} to spread ${his} buttocks for you like a good butthole bitch. ${He} hesitates, so you push ${his} face under the surface of the water and hold it there until ${he} complies. You shove`);
			if (V.PC.dick === 0) {
				r.push(`a dildo`);
			} else {
				r.push(`your member`);
			}
			r.push(`up ${his} anus so harshly that ${he} spasms and reflexively tries to get away, so you push ${him} under again until ${he} stops struggling. For the next ten minutes, ${he} gets shoved under water whenever ${he} offers the slightest resistance to anal rape. Soon, ${his} tears are pattering down into the sink. The next time you decide to buttfuck ${him}, ${he}'s <span class="trust dec">compliant from sheer terror.</span>`);
			eventSlave.trust -= 5;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function reassure() {
			r = [];
			r.push(`${He} turns around as`);
			if (canHear(eventSlave)) {
				r.push(`${he} hears`);
			}
			r.push(`you enter the bathroom, fear and loathing on ${his} face, but is surprised by`);
			if (canSee(eventSlave)) {
				r.push(`your gentle expression.`);
			} else {
				r.push(`by how calm your steps seem.`);
			}
			r.push(`${He}'s more shocked still when you give ${him} a reassuring hug and kiss ${his} unresisting mouth. ${He}'s so unable to figure out what's happening that ${he} eventually gives up and relaxes into you. You gently turn ${him} around to face the mirror again, and working from the top of ${his} head, describe ${his} body in minute detail, explaining how pretty and valuable a sex slave ${he} is. When you're about to reach ${his} butt,`);
			if (canTalk(eventSlave)) {
				r.push(`${he} uses gestures to beg you not to assrape ${him}.`);
			} else {
				if (eventSlave.lips > 70) {
					r.push(`${he} begs meekly through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`${he} begs meekly through ${his} mouthful of piercings,`);
				} else {
					r.push(`${he} begs meekly,`);
				}
				r.push(Spoken(eventSlave, `"${Master}, please, please don't assrape me. I don't think I can take it."`));
			}
			r.push(`You patiently explain that taking`);
			if (V.PC.dick === 0) {
				r.push(`anything you feel like inserting into ${his} backdoor`);
			} else {
				r.push(`your cock`);
			}
			r.push(`is ${his} duty, and begin to massage ${his} sphincter open with a single gentle finger. ${He} doesn't enjoy the ensuing assfuck, but ${he} doesn't truly hate it either and <span class="devotion inc">begins to hope</span> that being your butt slave won't be so painful after all.`);
			eventSlave.devotion += 4;
			r.push(slaveSkillIncrease('anal', eventSlave, 10));
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function comfort() {
			r = [];
			r.push(`${He} turns around as`);
			if (canHear(eventSlave)) {
				r.push(`${he} hears`);
			}
			r.push(`you enter the bathroom, fear and loathing on ${his} face, but is surprised by`);
			if (canSee(eventSlave)) {
				r.push(`your gentle expression.`);
			} else {
				r.push(`by how calm your steps seem.`);
			}
			r.push(`${He}'s more shocked still when you give ${him} a reassuring hug and kiss ${his} unresisting mouth. ${He}'s so unable to figure out what's happening that ${he} eventually gives up and relaxes into you. You run your hands along ${his} body and kiss ${his} deeply for a long while before reassuring ${him} of ${his} value to you. ${He} looks confused, but goes about ${his} business with dry eyes. ${He} hates you a little less, but wonders whether ${he} can get away with retaining some independence.`);
			return r;
		}
	}
};
