App.Events.RESSAmpResting = class RESSAmpResting extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (s.assignment === Job.REST || s.rules.rest === "mandatory"),
				isAmputee,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`You're working at your desk late at night when the arcology's systems discreetly highlight significant movement in the slave quarters.`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "'s"));
		r.push(`limbless torso is in bed, asleep but struggling in discomfort. Without arms or legs, it seems the sheet has become wrapped around ${him}. ${He}'s dreaming of something sexual;`);
		if (eventSlave.chastityPenis === 1) {
			r.push(`${his} cock is caged, but precum is`);
			if (eventSlave.prostate > 1) {
				r.push(`flowing`);
			} else if (eventSlave.prostate > 0 ) {
				r.push(`leaking`);
			} else {
				r.push(`barely dripping`);
			}
			r.push(`out of the chastity.`);
		} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`${he} can't maintain an erection but ${his} limp dick`);
			if (eventSlave.prostate > 1) {
				r.push(`is soaking ${his} sheets with precum.`);
			} else if (eventSlave.prostate > 0 ) {
				r.push(`sports a drop of precum.`);
			} else {
				r.push(`sports a meager droplet of precum.`);
			}
		} else if (eventSlave.dick > 0) {
			const erection = eventSlave.dick > 4 ? "massive erection" : eventSlave.dick > 2 ? "erection" : "pathetic little erection";
			r.push(`${his} ${erection} is tenting the`);
			if (eventSlave.prostate > 1) {
				r.push(`sheet, leaving a large spot from ${his} excessive precum`);
			} else {
				r.push(`sheet.`);
			}
		} else if (eventSlave.vagina === -1) {
			r.push(`${he}'s humping the sheet as though ${he} still had genitals`);
			if (eventSlave.prostate > 1) {
				r.push(`genitals, leaving a large splotch from ${his} excessive precum.`);
			} else {
				r.push(`genitals.`);
			}
		} else {
			r.push(`${his} pussy has left a moist spot on the sheet.`);
		}
		r.push(`As you watch, ${his} sleeping body struggles against the sheet`);
		if (eventSlave.boobs >= 800) {
			r.push(r.pop() + ",");
			r.push(`${his} smothering tits`);
		}
		if (eventSlave.belly >= 10000) {
			r.push(r.pop() + ",");
			r.push(`${his} ${belly}`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`pregnant`);
			}
			r.push(`belly`);
		}
		if (eventSlave.butt > 5) {
			r.push(r.pop() + ",");
			r.push(`${his} gigantic ass`);
		}
		r.push(`and ${his} limblessness finally leave ${him} lying naked on ${his} ${eventSlave.rules.living === "spare" ? "pad" : "bed"}. After a few moments, ${he} begins to shiver convulsively.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Check on ${him}`, check),
			new App.Events.Result(`Keep ${him} warm`, warm),
			new App.Events.Result(`Leave ${him} be`, leave),
		]);

		function check() {
			r = [];
			r.push(`Since ${he}'s limbless`);
			if (eventSlave.health.illness > 0) {
				if (eventSlave.pregKnown === 1) {
					r.push(r.pop() + ",");
				} else {
					r.push(`and`);
				}
				r.push(`ill`);
			}
			if (eventSlave.pregKnown === 1) {
				r.push(`and pregnant`);
			}
			r.push(r.pop() + ",");
			r.push(`${his} health is more fragile than most slaves'. You look in on ${him}, and when ${he} continues to shiver, you pull the sheets back around ${him}, tucking ${him} in in such a way that ${he} can lie comfortably. In the morning ${he} doesn't understand why ${he}'s so snug and well-rested, but <span class="health inc">${his} health improves with decent sleep.</span>`);
			improveCondition(eventSlave, 10);
			return r;
		}

		function warm() {
			r = [];
			r.push(`You spoon ${him} gently from behind, spending the night sleeping with ${his}`);
			if (eventSlave.bellyPreg >= 5000) {
				r.push(`pregnant`);
			} else {
				r.push(`limbless`);
			}
			r.push(`torso cradled in your arms. ${He} snuggles against you in ${his} sleep, enjoying the animal warmth. When ${he} wakes in the morning, ${he} is surprised to`);
			if (canSee(eventSlave)) {
				r.push(`see`);
			} else {
				r.push(`find`);
			}
			r.push(`that it's you keeping ${him} company, but after a few moments' confusion ${he} accepts the unlooked-for comfort and goes back to sleep. <span class="trust inc">${He} has become more trusting of you.</span>`);
			eventSlave.trust += 4;
			return r;
		}

		function leave() {
			healthDamage(eventSlave, 10);
			return `In the morning, ${his} lips are blue and ${he}'s nearly unresponsive. Your other slaves get ${him} working again, but <span class="health dec">${his} health has been damaged.</span>`;
		}
	}
};


