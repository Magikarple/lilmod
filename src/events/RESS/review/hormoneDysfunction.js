App.Events.RESSHormoneDysfunction = class RESSHormoneDysfunction extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.hormoneBalance >= 50,
				s => s.vagina === -1,
				s => s.balls >= 0,
				s => s.devotion > 20 || s.trust < -20,
				s => s.devotion <= 50,
				s => s.fetish !== "buttslut",
				s => s.rules.speech === "permissive"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`comes to see you. You're busy with other things, so ${he} waits patiently even though ${he}'s clearly very unhappy. Told to explain ${himself}, ${he} gestures at ${his} totally flaccid`
		);
		if (!canTalk(eventSlave)) {
			r.push(`penis.`);
		} else {
			if (eventSlave.lips > 70) {
				r.push(`penis and ${say}s through ${his} huge lips,`);
			} else if (eventSlave.piercing.lips.weight + eventSlave.piercing.tongue.weight > 2) {
				r.push(`penis and ${say}s through ${his} piercings,`);
			} else {
				r.push(`penis and ${say}s,`);
			}
			r.push(Spoken(eventSlave, `"${Master}, I can't get it up."`));
		}
		r.push(`Ever since the rules have permitted it, ${contextualIntro(V.PC, eventSlave)} has been a constant masturbator. If ${he} can help it, ${he} never sucks or gives up ${his} ass without a hand between ${his} legs, pumping away.`);
		App.Events.addParagraph(node, r);

		r = [];
		if (!canTalk(eventSlave)) {
			r.push(`${He} mimics masturbation and then traces a finger down ${his} cheek, as though it were a tear.`);
		} else {
			r.push(Spoken(eventSlave, `"I can't come like this, ${Master}."`));
		}
		r.push(`It makes sense; ${he}'s probably never masturbated without a hard dick. ${He}'s clearly in desperate need of release, and more than a little sad the hormones ${he}'s taking have given ${him} erectile dysfunction.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} some vasodilators so ${he} can get relief`, vasodilators),
			new App.Events.Result(`Sissy slave ${girl}s don't need to climax to serve`, serve),
			(eventSlave.prostate !== 0 && canDoAnal(eventSlave))
				? new App.Events.Result(`Prostate stimulation ought to do the trick`, prostate, eventSlave.anus === 0 && canDoAnal(eventSlave) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);

		function vasodilators() {
			eventSlave.devotion -= 5;
			return `You give ${him} a shot and send ${him} on ${his} way. Within a few minutes it gives ${him} a raging hard-on that lasts for hours. ${He} spends every spare moment masturbating furiously. Of course, this is a temporary solution, and will just make the eventual return of ${his} problem more disappointing. <span class="devotion dec">${He} is bitterly frustrated.</span>`;
		}

		function serve() {
			r = [];
			r.push(`You explain patiently that ${he} needs to stop focusing on getting off. ${He}'s a sex slave, and what matters is that ${he} pleasures others. If ${he} doesn't climax ${himself}, that's unfortunate but not really significant. ${He} looks terribly forlorn, so to drive home the point you push ${him} down to the floor, give ${him} a rough facefuck, and send ${him} away with tousled hair,`);
			if (V.PC.dick === 0) {
				r.push(`a tired tongue,`);
			} else {
				r.push(`a mouthful of ejaculate,`);
			}
			r.push(`and the same limp dick as before. <span class="devotion dec">It's frustrating for ${him}.</span>`);
			eventSlave.devotion -= 2;
			if (!smartPiercingReinforcesFetish(eventSlave)) {
				r.push(`But, ${he} slowly <span class="fetish gain">accepts ${his} new role as a submissive little sex toy.</span>`);
				eventSlave.fetishStrength = 65;
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				eventSlave.fetish = "submissive";
			}
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function prostate() {
			r = [];
			r.push(`You explain that ${he} will have to find a new way to climax to be a happy little shemale slut. As you do, you push ${him} against a wall and force ${him} up on tiptoe so that ${his} butt is conveniently positioned, and then ram`);
			if (V.PC.dick === 0) {
				r.push(`a vibrating strap-on`);
			} else {
				r.push(`yourself`);
			}
			r.push(`up ${his} ass. ${He} squeals and dances against the wall on tiptoe, impaled on your`);
			if (V.PC.dick === 0) {
				r.push(`fake cock.`);
			} else {
				r.push(`member.`);
			}
			r.push(`${He} doesn't climax to anal then, or the next time you assfuck ${him}, or the time after that; but some time later a long buttsex session ends when ${he} gives a little shake and a whimper and dribbles a pathetic squirt of cum from ${his} still-limp dick. By the end of the week <span class="mediumaquamarine">${he}'s smiling trustingly</span> and offering you ${his} butt every chance ${he} gets.`);
			r.push(VCheck.Anal(eventSlave, 10));
			eventSlave.trust += 4;
			if (!smartPiercingReinforcesFetish(eventSlave)) {
				r.push(`<span class="fetish gain">${He}'s become a confirmed anal addict.</span>`);
				eventSlave.fetishStrength = 65;
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
				eventSlave.fetish = "buttslut";
			}
			return r;
		}
	}
};
