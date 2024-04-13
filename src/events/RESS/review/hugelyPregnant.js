App.Events.RESSHugelyPregnant = class RESSHugelyPregnant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seePreg !== 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.bellyPreg >= 10000,
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

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(eventSlave), "'s"),
			`daily routine includes frequent application of special skin care to ${his} ${eventSlave.skin}, hugely swollen belly to prevent ${his} pregnancy from ruining ${his} appearance with unsightly stretch marks. Several times a day, ${he} visits the bathroom to`
		);
		if (!hasAnyArms(eventSlave)) {
			r.push(`have another slave`);
		} else {
			r.push(`carefully`);
		}
		r.push(`coat ${his} entire ${belly} stomach in the stuff. ${He}'s so pregnant that it's hard to reach`);
		if (eventSlave.belly >= 150000) {
			r.push(`most of its mass.`);
		} else {
			r.push(`the underside.`);
		}
		r.push(`The chore keeps ${him} occupied and stationary for quite a while; there's no need to leave ${him} sexually idle while ${he} completes it.`);

		App.Events.addParagraph(node, r);

		let choices = [new App.Events.Result(`Help ${him} with those hard to reach places`, reach)];
		if ((canDoAnal(eventSlave) && eventSlave.mpreg === 1) || canDoVaginal(eventSlave)) {
			choices.push(new App.Events.Result(`Gently fuck ${him} while helping ${him} apply lotion`, lotion, virginityWarning()));
		}
		if (canDoAnal(eventSlave)) {
			choices.push(new App.Events.Result(`${His} backdoor can't get more pregnant`, backdoor, virginityWarning(true)));
		} else {
			choices.push(new App.Events.Result(`${His} backdoor isn't pregnant`, unPregnant, virginityWarning(true)));
		}
		if ((canDoAnal(eventSlave) && eventSlave.mpreg === 1) || canDoVaginal(eventSlave) && eventSlave.belly >= 300000) {
			choices.push(new App.Events.Result(`Tip ${him} over and fuck ${him}`, tip, virginityWarning()));
		}
		App.Events.addResponses(node, choices);

		function virginityWarning(anusOnly = false) {
			if (anusOnly) {
				if (eventSlave.anus === 0) {
					return `This option will take ${his} virginity`;
				}
			}
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0) && eventSlave.mpreg === 0) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function reach() {
			r = [];
			r.push(`${He}'s absorbed enough with ${his} application that ${he} starts with surprise when you gently encircle ${him} from behind with a hug`);
			if (V.PC.belly >= 5000) {
				r.push(r.pop() + `, pushing your own gravid belly into the small of ${his} back`);
			}
			r.push(r.pop() + `. When you take the lotion and begin to lovingly massage it into ${his} harder to reach areas, ${he} sighs with pleasure and leans against you.`);
			if (hasAnyArms(eventSlave) && V.PC.belly >= 1500) {
				r.push(`${He} takes the lotion and begins to return the favor. You spend the rest of ${his} break carefully massaging each other's baby bumps.`);
			}
			if (!canTalk(eventSlave)) {
				if (eventSlave.voice === 0) {
					r.push(`${He} looks like ${he} would love to thank you, were ${he} not mute.`);
				} else if (eventSlave.accent >= 3) {
					r.push(`${He} looks like ${he} would love to thank you, if ${he} knew how.`);
				}
			} else {
				if (eventSlave.lips > 70) {
					r.push(`${He} murmurs through ${his} huge lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`${He} murmurs through ${his} piercings,`);
				} else {
					r.push(`${He} murmurs,`);
				}
				r.push(Spoken(eventSlave, `"That felt really nice, ${Master}."`));
				if (V.PC.belly >= 1500) {
					r.push(`You have to agree, it did feel nice on your growing middle.`);
				}
			}
			r.push(`<span class="trust inc">${He} has become more trusting of you.</span>`);
			eventSlave.trust += 4;
			return r;
		}

		function lotion() {
			r = [];
			r.push(`${He}'s absorbed enough with ${his} application that ${he} starts with surprise when you gently encircle ${him} from behind with a hug`);
			if (V.PC.belly >= 5000) {
				r.push(r.pop() + `, pushing your own gravid belly into the small of ${his} back`);
			}
			r.push(r.pop() + `. When you take the lotion and begin to lovingly massage it into ${his} harder to reach areas, ${he} sighs with pleasure and leans back into you. ${He} feels`);
			if (V.PC.dick === 0) {
				r.push(`the warmth of your growing arousal`);
			} else {
				r.push(`your erection hard`);
			}
			r.push(`against ${him}, so ${he}`);
			if (isAmputee(eventSlave)) {
				r.push(`wriggles ${his} limbless form around on the floor so as to offer ${himself} to you.`);
			} else {
				r.push(`slowly kneels down with you into a comfortable lotus position on the bathroom floor.`);
			}
			if (eventSlave.mpreg === 1) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.push(`Coupling like this, you can't`);
			if (V.PC.dick === 0) {
				r.push(`scissor`);
			} else {
				r.push(`fuck`);
			}
			r.push(`${him} all that hard, but that's just fine given`);
			if (V.PC.preg >= 5000) {
				r.push(`your condition.`);
			} else {
				r.push(`${his} condition.`);
			}
			r.push(`${He} snuggles back into you as you have gentle sex while looking after ${his} drum-taut skin.`);
			if (!canTalk(eventSlave)) {
				if (eventSlave.voice === 0) {
					r.push(`${He} looks like ${he} would love to thank you, were ${he} not mute.`);
				} else if (eventSlave.accent >= 3) {
					r.push(`${He} looks like ${he} would love to thank you, if ${he} knew how.`);
				}
			} else {
				if (eventSlave.lips > 70) {
					r.push(`${He} murmurs through ${his} huge lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`${He} murmurs through ${his} piercings,`);
				} else {
					r.push(`${He} murmurs,`);
				}
				r.push(Spoken(eventSlave, `"That feels really nice, ${Master}."`));
			}
			r.push(`<span class="trust inc">${He} has become more trusting of you.</span>`);
			eventSlave.trust += 4;
			return r;
		}

		function backdoor() {
			r = [];
			r.push(`${He}'s absorbed enough with ${his} application that ${he} starts with surprise when you seize ${his} hips and bend ${him} over the sink for a quick assfuck.`);
			r.push(VCheck.Anal(eventSlave, 1));
			if (hasAnyArms(eventSlave)) {
				r.push(`${He} does ${his} best to brace ${himself} against the sink, but ${his}`);
				if (!hasBothArms(eventSlave)) {
					r.push(`hand is`);
				} else {
					r.push(`hands are`);
				}
				r.push(`slick from the lotion and ${he} slides around for a while before ${he} gives up and accepts that ${he}'s in for an uncomfortable time.`);
			}
			r.push(`Taking it up the ass while hugely pregnant isn't the most comfortable way to have sex, but such is the life of a sex slave.`);
			if (eventSlave.lactation === 1) {
				r.push(`As you pound ${him}, ${his} breasts, sore from lactation, give ${him} quite a bit of discomfort.`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`As you pound ${him}, ${his} huge breasts compound the discomfort.`);
			}
			r.push(`When you finally finish and withdraw your`);
			if (V.PC.dick === 0) {
				r.push(`vibrating strap-on,`);
			} else {
				r.push(`cock,`);
			}
			r.push(`${he} groans with relief. <span class="devotion inc">${He} has become more submissive.</span>`);
			eventSlave.devotion += 4;
			return r;
		}

		function unPregnant() {
			r = [];
			r.push(`${He}'s absorbed enough with ${his} application that ${he} starts with surprise when you seize ${his} hips and bend ${him} over the sink for a quick assfuck.`);
			r.push(VCheck.Anal(eventSlave, 1));
			if (hasAnyArms(eventSlave)) {
				r.push(`${He} does ${his} best to brace ${himself} against the sink, but ${his}`);
				if (!hasBothArms(eventSlave)) {
					r.push(`hand is`);
				} else {
					r.push(`hands are`);
				}
				r.push(`slick from the lotion and ${he} slides around for a while before ${he} gives up and accepts that ${he}'s in for an uncomfortable time.`);
			}
			r.push(`Taking it up the ass while hugely pregnant isn't the most comfortable way to have sex, but such is the life of a sex slave.`);
			if (eventSlave.lactation === 1) {
				r.push(`As you pound ${him}, ${his} breasts, sore from lactation, give ${him} quite a bit of discomfort.`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`As you pound ${him}, ${his} huge breasts compound the discomfort.`);
			}
			r.push(`When you finally finish and withdraw your`);
			if (V.PC.dick === 0) {
				r.push(`vibrating strap-on,`);
			} else {
				r.push(`cock,`);
			}
			r.push(`${he} groans with relief. <span class="devotion inc">${He} has become more submissive.</span>`);
			eventSlave.devotion += 4;
			return r;
		}

		function tip() {
			r = [];
			r.push(`${He}'s absorbed enough with ${his} application that ${he} starts with surprise when you seize ${his} hips and shove ${him} onto ${his} ${belly} stomach for a quick fuck.`);
			if (eventSlave.mpreg === 1) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			if (hasAnyArms(eventSlave)) {
				r.push(`${He} does ${his} best to steady ${himself} atop the squirming mass, but ${his}`);
				if (!hasBothArms(eventSlave)) {
					r.push(`hand is`);
				} else {
					r.push(`hands are`);
				}
				r.push(`slick from the lotion and ${he} slides around for a while before ${he} gives up and accepts that ${he}'s in for an uncomfortable time.`);
			}
			if (eventSlave.mpreg === 1) {
				r.push(`Taking it up the ass`);
			} else {
				r.push(`Getting roughly fucked`);
			}
			r.push(`while hugely pregnant isn't the most comfortable way to have sex, neither is being forced to put more pressure on an already overfilled organ, but such is the life of a sex slave.`);
			if (eventSlave.lactation === 1) {
				r.push(`As you pound ${him}, ${his} breasts, sore from lactation, give ${him} quite a bit of discomfort.`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`As you pound ${him}, ${his} huge breasts compound the discomfort.`);
			}
			r.push(`When you finally finish and withdraw your`);
			if (V.PC.dick === 0) {
				r.push(`vibrating strap-on,`);
			} else {
				r.push(`cock,`);
			}
			r.push(`${he} groans with relief and rolls onto ${his} side. <span class="devotion inc">${He} has become more submissive.</span>`);
			eventSlave.devotion += 4;
			return r;
		}
	}
};
