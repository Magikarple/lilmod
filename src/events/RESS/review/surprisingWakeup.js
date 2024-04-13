App.Events.RESSSurprisingWakeup = class RESSSurprisingWakeup extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish === Fetish.MINDBROKEN,
				s => s.kindness !== undefined && s.kindness >= 100,
				s => (isSlaveAvailable(s) && canWalk(s)) || ([Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment)),
				s => s.relationship === -3,
				s => random(1, 200) < s.kindness || V.cheatMode === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl, wife
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);
		r.push(`You are awakened from a sound sleep by someone eagerly`);
		if (PC.dick !== 0) {
			r.push(`sucking your dick.`);
		} else {
			r.push(`eating you out.`);
		}
		r.push(
			`Your slaves know better than to disturb you, let alone take the initiative, but you are shocked when you pull back the sheets and reveal the smile of`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} promptly stops, flashes you an appreciative smile and goes right back to pleasing you.`);
		} else {
			r.push(
				`${He} pulls off you with a frown.`,
				Spoken(eventSlave, `"I'm sorry, ${Master},"`),
				`${he} ${say}s apologetically.`,
				Spoken(eventSlave, `"It's just, you've been so nice to me. This felt like the right thing to do."`),
				`${He} lowers ${his} head back to your crotch.`
			);
		}
		r.toParagraph();
		r.push(`${He} was mindbroken, but seems to have snapped out of it due to a deep love of you.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Permit ${him} to continue`, permit),
			new App.Events.Result(`Embrace ${him}`, embrace),
			new App.Events.Result(`Rape ${him}`, rape, virginityWarning()),
			new App.Events.Result(`Punish ${him} for waking you`, punish),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (canDoAnal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function permit() {
			const r = new SpacedTextAccumulator();
			r.push(`You can't complain, it feels really good. You don't know where this skill was lurking in ${his} broken mind, but you're glad to see it put to good use.`);
			if (PC.dick !== 0) {
				r.push(`Just as you are about to cum, ${he} takes the full length of your dick down ${his} throat, diligently taking in every drop of cum.`);
			} else {
				r.push(`Even as you buck with pleasure, ${he} diligently keeps ${his} tongue to your clit and pussy, making sure you don't go a moment without pleasure.`);
			}
			r.push(`You don't have an orgasm like that every day, and as ${he} looks at you lovingly, you prod ${him} with your still hard`);
			if (PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`clit`);
			}
			r.push(`for round two.`);
			r.push(`${He} is <span class="green">no longer mindbroken</span> and for whatever twisted reasons deeply and sincerely <span class="devotion inc">loves</span> and <span class="trust inc">trusts</span> you.`);
			eventSlave.devotion = 90;
			eventSlave.oldDevotion = 90;
			eventSlave.trust = 90;
			eventSlave.oldTrust = 90;
			eventSlave.sexualQuirk = "caring";
			eventSlave.fetish = "none";
			eventSlave.fetishKnown = 1;
			const geneIndex = V.genePool.findIndex(s => s.ID === eventSlave.ID);
			eventSlave.intelligence = V.genePool[geneIndex].intelligence;
			if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`Society <span class="reputation inc">strongly approves</span> of ${eventSlave.slaveName} being restored to sanity, which advances ideals about enlightened slaveownership.`);
				V.arcologies[0].FSPaternalist += 0.01*V.FSSingleSlaveRep;
				repX(10*V.FSSingleSlaveRep*(V.arcologies[0].FSPaternalist/V.FSLockinLevel), "futureSocieties");
			}
			seX(eventSlave, "oral", PC, "penetrative", 2);
			eventSlave.kindness = 0;
			r.toParagraph();
			return r.container();
		}

		function embrace() {
			const r = new SpacedTextAccumulator();
			r.push(`You gently grab ${his} face and stare deeply into ${his} ${App.Desc.eyesColor(eventSlave)}.`);
			if (canSee(eventSlave)) {
				r.push(`They are full of life as opposed to their usual dullness.`);
			} else {
				r.push(`They are as dull as always, but that isn't ${his} fault. ${His} facial expressions at the act tell you all you need to know.`);
			}
			r.push(`You pull your ${wife} into a tight embrace — ${him} coming back to you is more than enough of a gift; ${he} needn't do anything more for now. You pull the covers over the both of you and begin to doze off, smiling at the warmth cuddling ever closer to you.`);
			r.push(`${He} is <span class="green">no longer mindbroken</span> and thanks to your care deeply and sincerely <span class="devotion inc">loves</span> and <span class="trust inc">trusts</span> you.`);
			eventSlave.devotion = 100;
			eventSlave.oldDevotion = 100;
			eventSlave.trust = 100;
			eventSlave.oldTrust = 100;
			eventSlave.sexualQuirk = "romantic";
			eventSlave.fetish = "none";
			eventSlave.fetishKnown = 1;
			const geneIndex = V.genePool.findIndex(s => s.ID === eventSlave.ID);
			eventSlave.intelligence = V.genePool[geneIndex].intelligence;
			if (FutureSocieties.isActive('FSPaternalist')) {
				r.push(`Society <span class="reputation inc">strongly approves</span> of ${eventSlave.slaveName} being restored to sanity by the power of love, which advances ideals about enlightened slaveownership.`);
				V.arcologies[0].FSPaternalist += 0.01*V.FSSingleSlaveRep;
				repX(10*V.FSSingleSlaveRep*(V.arcologies[0].FSPaternalist/V.FSLockinLevel), "futureSocieties");
			}
			eventSlave.kindness = 0;
			r.toParagraph();
			return r.container();
		}

		function rape() {
			const fuckSlaves = fuckSlavesLength();
			const r = new SpacedTextAccumulator();
			r.push(`Getting head isn't going to cut it. You easily overpower the startled ${SlaveTitle(eventSlave)} and`);
			if (canDoVaginal(eventSlave)) {
				r.push(`flip ${him} onto ${his} back.`);
				if (PC.dick !== 0) {
					r.push(`You viciously rape ${him}, forcing yourself deep into ${him} before painting ${his} insides with your seed. You leave the quivering ${girl} to leak fluids while you get comfortable again.`);
					if (eventSlave.vagina === 0) {
						r.push(`${His} once virgin pussy now <span class="lime">gapes slightly</span> after your enjoyment of it.`);
						eventSlave.vagina++;
					}
				} else {
					r.push(`You don the biggest strap-on in reach and viciously rape ${him}, roughly groping ${his} breasts while you do. Once you are satisfied with the stimulation, you thrust hard and deep one last time for good measure, only to have the dildo stay firmly lodged in ${his} cunt. You shrug, not your problem.`);
					if (eventSlave.vagina === 0) {
						r.push(`${His} once virgin pussy now is now <span class="lime">thoroughly stretched</span> after your enjoyment of it. You watch ${his} body struggle to force the dildo out of ${him} until it manages to do so with a wet thud.`);
						eventSlave.vagina++;
					}
				}
				r.push(`${He} doesn't move from this position and barely reacts to your prodding; it seems ${his} mind was still fragile, ${he}'ll likely be back to ${his} usual blank self when you awake.`);
				seX(eventSlave, "vaginal", PC, "penetrative");
				if (canImpreg(eventSlave, PC)) {
					knockMeUp(eventSlave, 5, 0, -1);
				}
			} else if (canDoAnal(eventSlave)) {
				r.push(`force ${his} ass into the air.`);
				if (PC.dick !== 0) {
					r.push(`You viciously assrape ${him}, cumming strongly into ${his} spasming anus while making sure to save one last spurt to paint ${his} back with.`);
					if (eventSlave.anus === 0) {
						r.push(`${His} once virgin hole now <span class="lime">gapes slightly</span> after your enjoyment of it.`);
						eventSlave.anus++;
					}
				} else {
					r.push(`You don the biggest strap-on in reach and viciously assrape ${him}, forcing ${his} face into the sheets with one hand while roughly groping ${his} breasts with the other. Once you are satisfied with the stimulation, you thrust hard and deep one last time for good measure, only to have the dildo stay firmly lodged in ${his} ass. You shrug, not your problem.`);
					if (eventSlave.anus === 0) {
						r.push(`${His} once virgin hole now is now <span class="lime">thoroughly stretched</span> after your enjoyment of it. You watch ${his} body struggle to force the dildo out of rear until it manages to do so with a soft thud.`);
						eventSlave.anus++;
					}
				}
				r.push(`${He} doesn't move from this position and barely reacts to your prodding; it seems ${his} mind was still fragile, ${he}'ll likely be back to ${his} usual blank self when you awake.`);
				if (canImpreg(eventSlave, PC)) {
					knockMeUp(eventSlave, 5, 1, -1);
				}
				seX(eventSlave, "anal", PC, "penetrative");
			} else {
				r.push(`slam ${his} head into your crotch.`);
				if (PC.dick !== 0) {
					r.push(`You viciously facefuck ${him}, cumming strongly down ${his} gagging throat while making sure to save one last spurt to paint ${his} face with.`);
				} else {
					r.push(`As ${he} recoils, you grab a strap-on and force it into ${his} mouth before fastening it to yourself. Once you are situated, you viciously facefuck ${him} until you are satisfied. As ${he} struggles to catch ${his} breath, you toggle the release and reveal that it is a squirt dildo, painting ${his} face with fake semen.`);
				}
				r.push(`${He} falls backwards, where ${he} lays, unmoving. It seems ${his} mind was still fragile, ${he}'ll likely be back to ${his} usual blank self when you awake.`);
				seX(eventSlave, "oral", PC, "penetrative");
			}
			r.push(`You pull the blanket back over yourself and nudge ${him} off your bed; you'll deal with ${him} in the morning`);
			if (fuckSlaves > 1) {
				if (V.masterSuiteUpgradeLuxury === 2) {
					r.addToLast(`, which will likely entail pulling ${his} used body out of the fuckpit orgy`);
				} else {
					r.addToLast(`, assuming one of your other toys doesn't get to ${him} first`);
				}
			}
			r.addToLast(`.`);
			if (fuckSlaves > 1 && V.masterSuiteUpgradeLuxury === 2) {
				if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					if (eventSlave.anus < 3) {
						eventSlave.anus++;
					}
					seX(eventSlave, "anal", PC, "penetrative", fuckSlaves*2);
				}
				if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					if (eventSlave.vagina < 3) {
						eventSlave.anus++;
					}
					seX(eventSlave, "vaginal", PC, "penetrative", fuckSlaves*2);
				}
				seX(eventSlave, "oral", PC, "penetrative", fuckSlaves*2);
			} else if (fuckSlaves > 1) {
				if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					seX(eventSlave, "anal", PC, "penetrative", fuckSlaves*2);
				} else if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					seX(eventSlave, "vaginal", PC, "penetrative", fuckSlaves*2);
				} else {
					seX(eventSlave, "oral", PC, "penetrative", fuckSlaves*2);
				}
			}
			eventSlave.kindness = -100;
			r.toParagraph();
			return r.container();
		}

		function punish() {
			const fuckSlaves = fuckSlavesLength();
			const r = new SpacedTextAccumulator();
			r.push(`In one swift motion you throw aside the cover and backhand the ${SlaveTitle(eventSlave)} for waking you. ${He} falls to your side, where ${he} lays, unmoving. It seems ${his} mind was still fragile, ${he}'ll likely be back to ${his} usual blank self when you awake. You pull the blanket back over yourself; you'll deal with ${him} in the morning`);
			if (fuckSlaves > 1) {
				if (V.masterSuiteUpgradeLuxury === 2) {
					r.addToLast(`, which will likely entail pulling ${his} used body out of the fuckpit orgy`);
				} else {
					r.addToLast(`, assuming one of your other toys doesn't get to ${him} first`);
				}
			}
			r.addToLast(`.`);
			if (fuckSlaves > 1 && V.masterSuiteUpgradeLuxury === 2) {
				if (canDoAnal(eventSlave) &&eventSlave.anus >0) {
					if (eventSlave.anus < 3) {
						eventSlave.anus++;
					}
					seX(eventSlave, "anal", PC, "penetrative", fuckSlaves*2);
				}
				if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					if (eventSlave.vagina < 3) {
						eventSlave.vagina++;
					}
					seX(eventSlave, "vaginal", PC, "penetrative", fuckSlaves*2);
				}
				seX(eventSlave, "oral", PC, "penetrative", fuckSlaves*2);
			} else if (fuckSlaves > 1) {
				if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
					seX(eventSlave, "anal", PC, "penetrative", fuckSlaves);
				} else if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
					seX(eventSlave, "vaginal", PC, "penetrative", fuckSlaves);
				} else {
					seX(eventSlave, "oral", PC, "penetrative", fuckSlaves);
				}
			}
			eventSlave.kindness = -100;
			r.toParagraph();
			return r.container();
		}
	}
};
