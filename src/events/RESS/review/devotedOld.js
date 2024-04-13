App.Events.RESSDevotedOld = class RESSDevotedOld extends App.Events.BaseEvent {
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
				s => s.devotion > 60,
				s => s.trust > 20,
				s => s.physicalAge > 37,
				s => s.anus > 0,
				s => s.vagina > 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		App.Events.addParagraph(node, [
			`At the end of a long week,`,
			contextualIntro(V.PC, eventSlave, true),
			`moves past your office toward bed. This is completely normal part of the arcology routine, but you notice as ${he} passes that ${he}'s wearing a preoccupied, almost sad expression. You call ${him} over, and ${he} makes a visible effort to brighten up as ${he} comes before you and asks your pleasure. You ask ${him} what's the matter, and ${his} face falls.`
		]);
		r.push(Spoken(eventSlave, `"${Master}, I'm so sorry you noticed,"`));
		if (eventSlave.lips > 70) {
			r.push(`${he} lisps through ${his} dick-sucking lips.`);
		} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
			r.push(`${he} lisps through ${his} ridiculous piercings.`);
		} else {
			r.push(`${he} ${say}s penitently.`);
		}
		r.push(Spoken(eventSlave, `"I'm feeling a little stiff and tired, ${Master}. I wish I was a little younger so I could serve you better, that's all."`));

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Cheer ${him} up`, cheer)
				: new App.Events.Result(),
			new App.Events.Result(`Perform a health exam personally`, exam),
			(S.HeadGirl && V.HeadGirlID !== eventSlave.ID)
				? new App.Events.Result(`Give ${him} an afternoon off for some quality time with your Head Girl`, quality, 	`This option will cost ${cashFormat(500)}`)
				: new App.Events.Result()
		]);

		function cheer() {
			let didVaginal = false;
			let didAnal = false;
			r = [];
			r.push(`You close in on ${him}, and ${he} starts to present ${himself} with the force of long habit. However, you take ${him} by the hand and draw ${him} in close, running your fingertips along ${his} cheekbone, looking into ${his} ${App.Desc.eyesColor(eventSlave)}.`);
			if (canSee(eventSlave)) {
				r.push(`${He} only holds your gaze for a brief moment before blushing and looking down again,`);
			} else {
				r.push(`Once ${he} feels your hand stop, ${he} quickly glances down while`);
			}
			r.push(`muttering another apology. You raise ${his} chin again with a gentle hand and give ${him} a deep kiss. After a moment ${he} hugs you with almost painful`);
			if (eventSlave.belly >= 100000) {
				r.push(`fierceness, a feat given the size of ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				}
				r.push(`belly, where`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`fierceness, pushing ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				}
				r.push(`belly into yours, where`);
			} else {
				r.push(`fierceness, and`);
			}
			r.push(`you can feel a heat radiating from ${him}. ${He} makes to get down on ${his} knees to serve you again, but instead, you`);
			if (eventSlave.belly >= 300000) {
				r.push(`help ${him} up and guide`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`gently scoop ${him} up and carry`);
			} else {
				r.push(`scoop ${him} up and carry`);
			}
			r.push(`${him} to bed, laying the bemused ${girl} down before cuddling up behind ${him}. The two of you make languid love, with you`);
			if (canHear(eventSlave)) {
				r.push(`murmuring reassuringly into ${his} ear,`);
			}
			r.push(`nibbling ${his} neck, cupping ${his} breasts,`);
			if (eventSlave.belly >= 1500) {
				r.push(`rubbing ${his} distended midriff,`);
			}
			r.push(`and massaging ${his} shoulders by turns. After a lovely climax together in ${his}`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`pussy ${he} coquettishly shifts ${himself} to line your recovering cock up with ${his} ass,`);
				didVaginal = true;
				didAnal = true;
			} else if (canDoVaginal(eventSlave)) {
				r.push(`pussy ${he} coquettishly shifts ${himself} to face you,`);
				didVaginal = true;
			} else {
				r.push(`ass ${he} coquettishly shifts ${himself} to face you,`);
				didAnal = true;
			}
			if (canSee(eventSlave)) {
				r.push(`looking with <span class="devotion inc">adoration</span> and new <span class="trust inc">confidence</span> into your eyes.`);
			} else {
				r.push(`gazing with <span class="devotion inc">adoration</span> and new <span class="trust inc">confidence</span> at your face.`);
			}
			eventSlave.devotion += 4;
			eventSlave.trust += 4;
			if (didVaginal && didAnal) {
				r.push(VCheck.Both(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			return r;
		}

		function exam() {
			r = [];
			r.push(`${He} gets a weekly health exam from the automated systems, which also do their best to monitor ${his} well-being, but ${he} does not protest as you take ${him} to the surgery and give ${him} a`);
			if (V.PC.skill.medicine >= 100) {
				r.push(`professional examination. It feels good to put the old skills to use on an attractive patient.`);
			} else {
				r.push(`thorough examination.`);
			}
			r.push(
				`There's nothing the matter other than that ${he} hasn't been 18 for a long time. ${He} looks a little sad at some of the results, but whenever ${he} does, you place a hand on ${his} cheek and give ${him} a kiss. ${He} gets the idea.`,
				Spoken(eventSlave, `"I understand, ${Master}. I can still serve you,"`),
				`${he} ${say}s.`
			);
			r.push(`You adjust ${his} diet and exercise a little, which should <span class="health inc">slightly improve</span> ${his} health`);
			if (V.PC.skill.medicine >= 100) {
				r.push(r.pop() + `, and prescribe some new supplements that might help ${him} <span class="health inc">feel ${his} best</span> all the time`);
				improveCondition(eventSlave, 10);
			}
			r.push(r.pop() + `. As ${he} gets up from the chair and makes to resume ${his} duties, you give ${him} a light swat across the buttocks. ${He} squeaks and turns to <span class="trust inc">giggle at you,</span> giving you a broad wink and shaking ${his} tits a little for you.`);
			eventSlave.trust += 4;
			improveCondition(eventSlave, 10);
			return r;
		}

		function quality() {
			const {
				He2, his2, himself2
			} = getPronouns(S.HeadGirl).appendSuffix('2');
			cashX(-500, "event", eventSlave);
			improveCondition(eventSlave, 10);
			S.HeadGirl.devotion += 4;
			eventSlave.devotion += 4;
			return `${S.HeadGirl.slaveName} understands the situation immediately. ${He2} gets ${himself2} and ${eventSlave.slaveName} dressed for a nice, non-sexual 'date' in ${V.clubName}, and leads ${him} out by the hand with a wink over ${his2} shoulder to you. Your Head Girl understands just what kind of break from sexual servitude ${eventSlave.slaveName} really needs. They enjoy a nice meal, take a stroll and talk as friends, and get some inconsequential but relaxing beauty treatments together. They both <span class="devotion inc">enjoy the relaxation,</span> and ${eventSlave.slaveName} <span class="health inc">feels much better</span> after the rest, too.`;
		}
	}
};
