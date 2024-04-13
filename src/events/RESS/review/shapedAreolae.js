App.Events.RESSShapedAreolae = class RESSShapedAreolae extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.boobs > 1200,
				s => s.areolaeShape !== "circle",
				s => s.devotion > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, woman
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		r.addToLast(`'s breasts are real works of art. ${His}`);
		if ((eventSlave.boobsImplant/eventSlave.boobs) >= .60) {
			r.push(`massive fake`);
		} else if (eventSlave.boobsImplant > 0) {
			r.push(`massive, partially unnatural`);
		} else {
			r.push(`massive, sagging natural`);
		}
		r.push(`tits dominate ${his} figure, but the real attention getter are ${his} unique, ${eventSlave.areolaeShape}-shaped areolae. The darker flesh around ${his} nipples would be — should be — circular in any other ${woman}, and the cute ${eventSlave.areolaeShape} shapes around ${eventSlave.slaveName}'s nipples are proof of just how much you've modified ${him}. ${He}'s devoted to you, so much so that ${he} loves showing off ${his} special assets.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Show ${him} off around the arcology`, show),
			new App.Events.Result(`Use that pride as an advertisement`, use),

		]);

		function show() {
			const r = new SpacedTextAccumulator();
			r.push(`You give ${eventSlave.slaveName} a variation on a usual slave gown. It's just as gorgeous, but this one actually covers ${his}`);
			if (eventSlave.belly >= 1500) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnancy,`);
				} else {
					r.push(`belly,`);
				}
			}
			r.push(`ass and crotch as well. In fact, it covers ${his}`);
			if (isAmputee(eventSlave)) {
				r.push(`limbless torso and head completely: everything except the lower part of ${his} face, and ${his} boobs.`);
			} else {
				if (hasAllLimbs(eventSlave)) {
					r.push(`arms, legs,`);
				} else {
					r.push(`limbs`);
				}
				r.push(`and ${his} face from the nose up. The only flesh visible at all is ${his} mouth, ${his} chin, and ${his} huge breasts, supported and presented by gentle corseting.`);
			}
			if (!hasAnyLegs(eventSlave)) {
				r.push(`You carry ${him} around`);
			} else {
				r.push(`You place a gentle hand on the small of ${his} back to guide ${him}, and stroll around`);
			}
			if (V.club !== 0) {
				r.push(`${V.clubName}.`);
			} else {
				r.push(`${V.arcologies[0].name}'s clubs.`);
			}
			r.push(`${eventSlave.slaveName}`);
			if (canSee(eventSlave)) {
				r.push(`is blinded by the silk over ${his} face,`);
			} else {
				r.push(`may not be able to see,`);
			}
			r.push(`but ${he} can still`);
			if (canHear(eventSlave)) {
				r.push(`hear the appreciative murmurs`);
			} else {
				r.push(`feel the appreciative presence`);
			}
			r.push(`of onlookers as they eye ${his} magnificent breasts with their ${eventSlave.areolaeShape}-shaped areolae. ${He} shivers a little with suppressed pride. <span class="devotion inc">${His} devotion to you has increased,</span> and <span class="green">your reputation as a person with unique property grows.</span>`);
			eventSlave.devotion += 4;
			repX(500, "event", eventSlave);
			r.toParagraph();
			return r.container();
		}

		function use() {
			eventSlave.devotion += 4;
			cashX(500, "event", eventSlave);
			return `There's all sorts of business going on in ${V.arcologies[0].name}, from flesh rented or bought down to more pedestrian affairs. Advertisement never goes amiss. You place ${eventSlave.slaveName} naked on a slowly rotating pedestal surrounded by a clear plastiglass tube on a busy thoroughfare in the lower parts of ${V.arcologies[0].name}. These devices are often used to display slaves for sale or slave whores for rent; ${eventSlave.slaveName} is simply identified by your name as arcology owner, which is thus <span class="yellowgreen">identified with business prosperity.</span> ${He} spends the day serving as eye candy for passersby, rotating gently on the pedestal as ${he} shows off ${his} body, giving pride of place to ${his} ${eventSlave.areolaeShape}-shaped areolae. ${He} loves all the attention, and <span class="devotion inc">${his} devotion to you has increased.</span>`;
		}
	}
};
