App.Events.RESSHugeTits = class RESSHugeTits extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.boobAccessibility !== 1,
			() => V.ballsAccessibility !== 1,
			() => V.pregAccessibility !== 1,
			() => V.slaves.length > 2,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.boobs > 10000,
				s => s.devotion >= -20,
				s => (canDoAnal(s) || canDoVaginal(s))
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(
			`There is a horrible crash from the shower. You rush in to see`,
			contextualIntro(V.PC, eventSlave, true),
			`face-down and covered in soap. ${He}'s uninjured, but ${his} tits are so huge that, soapy as ${he} is, ${he} can't seem to stand again. ${His} udders have ${him} pinned to the ground with ${his} legs sticking out of the shower. ${He} pleads`
		);
		if (eventSlave.lips > 70) {
			r.push(`through ${his} huge lips,`);
		} else if ((eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2)) {
			r.push(`through ${his} piercings,`);
		} else {
			r.push(`piteously,`);
		}
		r.push(Spoken(eventSlave, `"Help me, ${Master}!"`));

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Join ${him} in the shower`, join, virginityWarning()),
			new App.Events.Result(`Fuck ${his} immobilized body`, immobilized, ((eventSlave.anus === 0) || (eventSlave.vagina === 0)) ? `This option will take ${his} virginity` : null),
			new App.Events.Result(`Let ${him} figure it out`, figure),
		]);

		function virginityWarning() {
			if ((eventSlave.vagina === 0) && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if ((eventSlave.vagina === -1) && (eventSlave.anus === 0) && canDoAnal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function join() {
			r = [];
			r.push(`You step into the running water and help ${him} to ${his} feet with exaggerated gallantry. ${He} seems surprised`);
			if (canSee(eventSlave)) {
				r.push(`and stares at`);
			} else {
				r.push(`faces`);
			}
			r.push(`you through the steam for a moment before looking away with a blush. Before long you have ${his} back against the shower wall, ${his} titanic udders`);
			if (eventSlave.belly >= 5000) {
				r.push(`and ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			}
			r.push(`offering an amusing challenge as they slide soapily between you as you fuck. ${He} comes in no time at all, and a brief massage of ${his} huge soapy nipples produces a whimpering aftershock orgasm.`);
			if (canSee(eventSlave)) {
				r.push(`${His} ${App.Desc.eyesColor(eventSlave)} stare straight into yours`);
			} else {
				r.push(`You stare into ${his} ${App.Desc.eyesColor(eventSlave)}`);
			}
			r.push(`as ${he} writhes with overstimulation, <span class="devotion inc">${his} trust in your stewardship of ${his} pleasure total.</span>`);
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.devotion += 4;
			return r;
		}

		function immobilized() {
			let didAnal = false;
			let didVaginal = false;
			r = [];
			r.push(`You make no answer, groping ${his} soapy`);
			if (V.seeRace === 1) {
				r.push(eventSlave.race);
			}
			r.push(`buttocks.`);
			if ((eventSlave.anus > 2) && canDoAnal(eventSlave)) {
				r.push(`${His} rectum is so fucked out and loose that your groping hand almost slides up it.`);
			} else if ((eventSlave.vagina > 2) && canDoVaginal(eventSlave)) {
				r.push(`${His} pussy is so fucked out and loose that your groping hand almost slides up it.`);
			} else {
				r.push(`You fingerfuck ${him} for a while, the sting of the soap on ${his} sensitive insides making ${him} gasp.`);
			}
			r.push(`It's not like you can't tie ${him} up and fuck ${him} whenever you like, but sliding back and forth on ${his} soapy body is kind of nice.`);
			if (V.PC.dick === 0) {
				r.push(`You ride yourself against ${him} until you orgasm`);
			} else {
				r.push(`You leave a load of cum in`);
				if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
					r.push(`each of ${his} holes`);
					didVaginal = true;
					didAnal = true;
				} else if (canDoAnal(eventSlave)) {
					r.push(`${his} loosened butthole`);
					didAnal = true;
				} else {
					r.push(`${his} loosened vagina`);
					didVaginal = true;
				}
				if (V.PC.vagina !== -1) {
					r.push(`and make ${him} eat your pussy for a quick aftershock,`);
				}
			}
			r.push(`and only then do you help ${him} back to ${his} feet. ${He} drips soap, water, and`);
			if (V.PC.dick === 0) {
				r.push(`your juices.`);
			} else {
				r.push(`ejaculate.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive.</span>`);
			if (didVaginal && didAnal) {
				r.push(VCheck.Both(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.devotion += 4;
			return r;
		}

		function figure() {
			eventSlave.devotion -= 5;
			return `${He} flounders around for a while until you get bored and leave ${him} to it. Eventually ${his} whining brings another slave in, who helps ${him}. This interdependence between slaves <span class="devotion dec">reduces ${his} devotion.</span>`;
		}
	}
};
