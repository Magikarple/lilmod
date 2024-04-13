// cSpell:ignore throatfuckings

App.Events.RESSUnhappyVirgin = class RESSUnhappyVirgin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== Job.QUARTER,
				s => s.rules.speech !== "restrictive",
				canDoVaginal,
				s => s.fetish !== "buttslut",
				s => s.vagina === 0,
				s => s.anus !== 0,
				s => s.counter.oral + s.counter.vaginal /* this does not seem logical */ + s.counter.anal > 100,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const PC = V.PC;
		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`During a routine inspection,`,
			contextualIntro(PC, eventSlave, true),
			`respectfully asks a question.`,
		);
		if (!canTalk(eventSlave)) {
			r.push(`${He} uses amusingly lewd gestures to depict how frequently ${he} gets fucked, and then points to ${his} virgin pussy. ${He} communicates that ${he} wants another hole to help share the work.`);
		} else {
			r.push(
				`${He} ${say}s,`,
				Spoken(eventSlave, `"${Master}, I take a lot of dick. I try my best, but`)
			);
			if (canDoAnal(eventSlave)) {
				r.push(Spoken(eventSlave, `my butt really hurts sometimes and my throat's sore, too.`));
			} else {
				r.push(Spoken(eventSlave, `my throat's really sore and I can't feel my tongue too well.`));
			}
			r.push(Spoken(eventSlave, `Can I get fucked in the pussy, to spread it out a little?"`));
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			canDoAnal(eventSlave)
				? new App.Events.Result(`No, and ${his} role is to suck dick and take it in the ass`, ass)
				: new App.Events.Result(`No, and ${his} role is to suck dick and like it`, suck),
			new App.Events.Result(`No, and ${he} shouldn't have asked`, asked),
			new App.Events.Result(`Yes, the time has come`, yes, App.UI.DOM.combineNodes(
				App.UI.DOM.makeElement("span", `This option will destroy ${his} virginity.`, ["yellow"]),
				`${eventSlave.chastityVagina ? `This option will remove ${his} chastity belt` :``}`,
			)),
		]);

		function ass() {
			const r = new SpacedTextAccumulator();
			r.push(`You patiently explain that you've decided to use ${him} as an oral and anal slave, and leave ${his} pussy unfucked. ${He}'s unsurprised, but ${he} understands your decision. You usually fuck slaves during your inspection, and you don't exempt ${him} from this, but you do let ${him} take it easy. Rather than facefucking ${him} you let ${him} suckle you gently. Rather that a hard buttfuck, you take ${him} to the couch and gently spoon ${him} with your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`dick`);
			}
			r.push(`up ${his} ass while making out with ${him} and playing with ${his} nipples. ${He} understands your forbearance and <span class="devotion inc">appreciates how kind ${his} ${getWrittenTitle(eventSlave)} is.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			r.push(VCheck.Anal(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function suck() {
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return `You patiently explain that you've decided to use ${him} as an oral slave, since ${his} ass is off-limits, and leave ${his} pussy unfucked. ${He}'s unsurprised, but ${he} understands your decision. You usually fuck slaves during your inspection, and you don't exempt ${him} from this, but you do let ${him} take it easy. Rather than facefucking ${him} you let ${him} suckle you gently, calmly patting ${his} head as ${he} does. ${He} understands your forbearance and <span class="devotion inc">appreciates how kind ${his} ${getWrittenTitle(eventSlave)} is.</span>`;
		}

		function asked() {
			const r = new SpacedTextAccumulator();
			r.push(`Despite being allowed to ask questions ${he} should not question ${his} ${getWrittenTitle(eventSlave)}'s choices about ${his} sexual duties. To communicate the point, you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`order ${him} to lie on the desk, on ${his} back, with ${his} throat slack for penetration.`);
			if (canDoAnal(eventSlave)) {
				r.push(`After a good long throatfuck that leaves ${him} gasping and moaning, you flip ${him} over and fuck ${his} ass until ${he}'s squealing with each thrust.`);
			} else {
				r.push(`Only after an extended and forceful series of throatfuckings that leaves the bewildered ${SlaveTitle(eventSlave)} gasping for air and barely conscious, do you feel ${he} has learned what hole ${he} should be focused on. For good measure, you deepthroat ${him} one last time, to really drive the point home.`);
			}
			r.push(`As ${he} leaves, sore all over, ${he}'s <span class="devotion dec">badly confused</span> that ${he} was apparently punished for asking questions.`);
			eventSlave.devotion -= 5;
			if (canDoAnal(eventSlave)) {
				r.push(VCheck.Anal(eventSlave, 1));
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else {
				seX(eventSlave, "oral", V.PC, "penetrative", 4);
			}
			r.toParagraph();
			return r.container();
		}

		function yes() {
			const r = new SpacedTextAccumulator();
			r.push(`${He} framed ${his} desire to lose ${his} virginity in businesslike terms, but ${his} reaction to your assent suggests that ${he} also wouldn't mind having vanilla sex with ${his} ${getWrittenTitle(eventSlave)}. You're already quite`);
			if (V.PC.dick === 0) {
				r.push(`turned on by the idea, so you pull on a strap-on, pull ${him} over to the couch,`);
				if (eventSlave.chastityVagina) {
					r.push(`unfasten ${his} chastity belt,`);
				}
			} else {
				r.push(`hard, so you just lie down with ${him} on the couch,`);
				if (eventSlave.chastityVagina) {
					r.push(`unfasten ${his} chastity belt,`);
				}
			}
			r.push(`and have gentle vaginal sex in the missionary position`);
			if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
				r.addToLast(`, your own pussy moving back and forth gently at the base of your dick as you fuck ${him}`);
			}
			r.addToLast(`. ${He} gasps at the first penetration, but you take it slowly and lavish attention on ${his} lips, breasts, and nipples. Soon ${he}'s shamelessly enjoying ${himself}. ${His} first vaginal sex is crowned with an abdominal-clenching orgasm. ${He} <span class="devotion inc">adores ${his} kind ${getWrittenTitle(eventSlave)}.</span>`);
			eventSlave.devotion += 10;
			eventSlave.vagina = 1;
			seX(eventSlave, "vaginal", V.PC, "penetrative");
			eventSlave.chastityVagina = 0;
			if (canImpreg(eventSlave, V.PC)) {
				r.push(knockMeUp(eventSlave, 25, 0, -1));
			}
			r.toParagraph();
			return r.container();
		}
	}
};
