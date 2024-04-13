App.Events.RESSCowMilking = class RESSCowMilking extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.lactation > 0,
				s => s.boobs > 800,
				s => s.nipples !== "fuckable",
				s => s.devotion > 20,
				s => s.trust > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);
		r.push(
			`Heading back towards your office after seeing to a minor matter, you encounter`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`, heading for the penthouse milkers.`);
		if (eventSlave.assignment === Job.MILKED) {
			r.push(`Though it's ${his} job to be a human cow, ${he}'s allowed to roam as ${he} pleases when ${he}'s not getting milked, being fed, or otherwise occupied, and ${he} must have been elsewhere.`);
		} else {
			r.push(`${He}'s not assigned to be a human cow full time, since it's ${his} main focus to ${eventSlave.assignment}, but ${he}'s still obliged to visit the milkers regularly.`);
		}
		r.push(`In any case, ${he}'s obviously in desperate need of a milking. ${He}'s hurrying along with ${his}`);
		if (eventSlave.boobs > 4000) {
			r.push(`absurd`);
		} else {
			r.push(`heavy`);
		}
		r.push(`udders cradled in both arms, trying desperately to shield them from the uncomfortable motion of walking.`);
		r.toParagraph();

		if (canSee(eventSlave)) {
			r.push(`Seeing`);
		} else {
			r.push(`Noticing`);
		}
		r.push(`you, ${he} stops short and then winces as ${his} milk-filled breasts slosh to a stop, too.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} gestures a submissive greeting and then hesitates, catching ${his} lower lip cutely behind ${his} upper teeth. Then ${he} politely asks if you would milk ${him}.`);
		} else {
			r.push(
				Spoken(eventSlave, `"Hi ${Master},"`),
				`${he} ${say}s in greeting, and then hesitates, catching ${his} lower lip cutely behind ${his} upper teeth.`,
				Spoken(eventSlave, `"Um, would you please milk me?"`)
			);
		}
		if (eventSlave.fetish === "boobs") {
			r.push(`The shamelessly breast obsessed cow rarely misses an opportunity to ask for mammary intercourse, or anything remotely like it. Something as intimate as having you tug the ${milkFlavor(eventSlave)}milk from ${his} nipples would definitely qualify.`);
		} else {
			r.push(`${He}'s not exactly a breast fetishist, but milking is nonetheless a deeply important activity for ${him}, emotionally; the neurochemical effects of continual lactation are strong. ${He}'s so devoted to you that ${he} probably considers this a reassuringly intimate act.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Treat ${him} right`, right),
			new App.Events.Result(`Treat ${him} like a cow`, cow, virginityWarning())
		]);

		function right() {
			const r = new SpacedTextAccumulator();
			r.push(`You give ${him} a reassuring swat across the rump and tell ${him} you'd be happy to. You head toward the utility area with the milkers, and ${he} follows eagerly behind you,`);
			if (eventSlave.fetish === "boobs") {
				r.push(`very ready to have you touch ${his} favorite part of ${his} body.`);
			} else {
				r.push(`pleased you'd do this for ${him} and very ready to relieve the pressure in ${his} tits.`);
			}
			r.push(`To ${his} surprise, you seat yourself on a stool and draw ${him} onto your lap rather than sitting ${him} at a milking machine. Reaching behind yourself, you give the ${SlaveTitle(eventSlave)} on your lap a broad bucket, and tell ${him} to hold it`);
			if (eventSlave.belly >= 5000) {
				r.push(`under ${his} breasts as best ${he} can, given ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(belly);
				}
				r.push(`belly.`);
			} else {
				r.push(`on ${his} lap.`);
			}
			r.push(`Then you reach around ${him} and take ${his}`);
			if (eventSlave.boobs > 6000) {
				r.push(`gargantuan`);
			} else if (eventSlave.boobs > 2000) {
				r.push(`huge`);
			} else {
				r.push(`heavy`);
			}
			r.push(`udders in your hands. ${He} gasps as ${he} realizes exactly how you plan to do this, and adjusts the bucket so it's below both of ${his} nipples at once.`);
			r.toParagraph();

			r.push(`${He} instinctually expects the rhythmic tugging that the milkers usually produce, but what ${he} gets is a methodical massage of ${his} breasts, both at once. They're large enough to be more than a single handful, so you go bit by bit, ensuring that no part of ${his} udders goes untouched. ${His} nipples start to gush ${milkFlavor(eventSlave)}milk without help after a few moments of this, and ${he} groans with relief and satisfaction as ${he} feels ${his} breasts begin to empty and enjoys the sensation of the massage.`);
			if (eventSlave.fetish === "boobs") {
				r.push(`${He} orgasms strongly soon after the first jet of ${milkFlavor(eventSlave)}milk, producing an especially thick squirt.`);
			}
			r.push(`After you're satisfied, you move your hands to ${his} nipples and milk ${him} like a cow, getting the last drops of ${milkFlavor(eventSlave)}milk out of ${him}`);
			if (eventSlave.fetish === "boobs") {
				r.push(`and producing a shuddering series of aftershocks.`);
			} else {
				r.push(`and bringing ${him} to a surprise orgasm.`);
			}
			r.push(`When ${he}'s done, ${he} leans back into you for a moment before setting the milk bucket down, a wordless gesture of <span class="trust inc">considerable trust.</span> It means a lot to ${him} that you would milk ${him} yourself.`);
			eventSlave.trust += 4;
			seX(eventSlave, "mammary", V.PC, "penetrative");
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
			r.toParagraph();
			return r.container();
		}

		function cow() {
			const hands = hasBothArms(eventSlave) ? "hands" : "hand";
			const r = new SpacedTextAccumulator();
			r.push(`You ask ${him} if ${he} really wants to be treated like a cow. ${He} nods, a bit hesitantly, sensing a certain danger but not really knowing what else to do. You lead ${him} to the utility area of the penthouse, where the milkers are, but stop ${him} when ${he} starts for one. Instead, you`);
			if (eventSlave.belly >= 300000) {
				r.push(`pull ${him} over ${his} ${belly} belly with ${his} udders hanging beneath ${his}`);
				if (eventSlave.boobs > 5000) {
					r.addToLast(`, the twin masses of female flesh almost reaching the floor`);
				}
				r.addToLast(`.`);
			} else {
				r.push(`fetch a pair of low stools, make ${him} kneel on one, and put ${his} ${hands} on the other, so ${he}'s`);
				if (hasAllLimbs(eventSlave)) {
					r.push(`on all fours`);
				} else {
					r.push(`bent over`);
				}
				r.push(`with ${his} udders hanging beneath ${him}`);
				if (eventSlave.boobs > 5000) {
					r.addToLast(`, the twin masses of female flesh almost reaching the floor`);
				}
				r.addToLast(`.`);
			}
			r.toParagraph();

			r.push(`You swing a bucket under ${his} nipples and milk ${him} by hand, as though ${he} were a cow. This isn't exactly what ${he} had in mind, but the feeling of your hands on ${his} nipples, tugging the streams of ${milkFlavor(eventSlave)}milk out of ${him} and into the bucket beneath`);
			if (eventSlave.fetish === "boobs") {
				r.push(`brings ${him} very close to orgasm.`);
			} else {
				r.push(`eventually relaxes ${him}.`);
			}
			r.push(`Seeing this, you muse aloud, as though to yourself, that a little farmyard bestiality wouldn't hurt, since there's no one here but you and a dairy cow. Pawing the cow's behind possessively, you finger ${him} aggressively before deciding on`);
			if (canDoVaginal(eventSlave) && V.PC.dick !== 0) {
				r.push(`a little cow pussy. You walk around behind ${him} and fuck ${him} hard enough to shake the drops of ${milkFlavor(eventSlave)}milk still clinging to ${his} sore nipples down and into the bucket below.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
				r.push(`When you're finished, you step away, leaving your cum to run out of ${his} cunt and down ${his} thighs,`);
			} else if (canDoAnal(eventSlave) && V.PC.dick !== 0) {
				r.push(`some cow ass. You walk around behind ${him} and buttfuck ${his} hard enough to shake the drops of ${milkFlavor(eventSlave)}milk still clinging to ${his} sore nipples down and into the bucket below.`);
				r.push(VCheck.Anal(eventSlave, 1));
				r.push(`When you're finished, you step away, leaving your cum to drip out of ${his} gaped asshole,`);
			} else {
				r.push(`a little cow tongue action.`);
				if (V.PC.vagina !== -1) {
					r.push(`You stand up and grind your pussy against the cow's upturned mouth, humping ${his} face hard enough to shake the drops of ${milkFlavor(eventSlave)}milk still clinging to ${his} sore nipples down and into the bucket below.`);
					if (V.PC.dick !== 0) {
						r.push(`You pull away when you're about halfway there, only to shove your cock down ${his} throat instead.`);
					}
					r.push(`When you're finished, you step away, leaving ${his} face thoroughly coated in girlcum`);
					if (V.PC.dick !== 0) {
						r.push(`and ${his} mouth full of your load`);
					}
					r.addToLast(`,`);
				} else { // do nothing
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`and ask ${him} what cows say. "Um, moo?" ${he} responds in a small,`);
			r.push(`<span class="devotion inc">submissive</span> voice.`);
			eventSlave.devotion += 4;
			seX(eventSlave, "mammary", V.PC, "penetrative");
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
			r.toParagraph();
			return r.container();
		}

		function virginityWarning() {
			if (V.PC.dick !== 0) {
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					return `This option will take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
					return `This option will take ${his} anal virginity`;
				}
			}
		}
	}
};
