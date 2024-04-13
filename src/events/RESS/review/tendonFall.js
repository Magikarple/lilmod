App.Events.RESSTendonFall = class RESSTendonFall extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.slaves.length > 2,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.devotion >= -20,
				s => s.heels === 1,
				s => shoeHeelCategory(s) > 0
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
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`There is a horrible crash from the bathroom. You rush in to see`,
			contextualIntro(PC, eventSlave, true),
			`curled up helplessly in the bottom of the shower with the water playing over ${his}`,
		);
		if (eventSlave.belly >= 5000) {
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`gravid`);
			} else {
				r.push(`rounded`);
			}
		} else {
			r.push(`altered`);
		}
		r.push(`body. ${He} takes off ${his} heels to shower, making ${him} unable to stand independently. Apparently, ${he} lost ${his} grip on the handrail while trying to soap ${himself}, and having fallen, can't seem to reach the rail to haul ${himself} up again.`);
		r.push(`${He} pleads`);
		if (canTalk(eventSlave)) {
			if (eventSlave.lips > 70) {
				r.push(`through ${his} huge lips`);
			} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
				r.push(`through ${his} piercings`);
			}
			r.addToLast(`, "Help me, ${Master}!"`);
		} else {
			r.push(`with you, desperately signing ${his} need for help.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Help ${him} clean ${himself}`, clean),
			(canDoVaginal(eventSlave) || canDoAnal(eventSlave))
				?	new App.Events.Result(`Fuck ${his} prostrate body`, prostate, (V.PC.dick !== 0 && ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)))) ? `This option will take ${his} virginity` : null)
				:	new App.Events.Result(),
			new App.Events.Result(`Let ${him} struggle`, struggle),
		]);

		function clean() {
			const r = new SpacedTextAccumulator();
			r.push(`You step into the running water and seat yourself in the shower, drawing ${him} into your lap. ${He} seems surprised and`);
			if (canSee(eventSlave)) {
				r.push(`stares at you through the steam`);
			} else {
				r.push(`gazes towards you`);
			}
			r.push(`for a moment before looking away with a blush. ${He} expects you to`);
			if (V.PC.dick === 0) {
				r.push(`ride ${his} wet face,`);
			} else {
				r.push(`insert your member into ${his} wet body,`);
			}
			r.push(`but finds you handing ${him} the soap instead. You gently support ${him} as ${he} washes, partaking of physical closeness and support. <span class="devotion inc">${He} has become more devoted to you.</span>`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function prostate() {
			let didVaginal = false;
			let didAnal = false;
			const r = new SpacedTextAccumulator();
			r.push(`You make no answer, entering the shower to stand over ${him} prostrate form. You reach down and grope ${him} soapy`);
			if (V.seeRace === 1) {
				r.push(`${eventSlave.race}`);
			}
			r.push(`buttocks, questing fingers moving towards ${his} asscrack.`);
			if (eventSlave.anus > 2 && canDoAnal(eventSlave)) {
				r.push(`${His} rectum is so fucked out and loose that your groping hand almost slides up it.`);
			} else if (eventSlave.vagina > 2 && canDoVaginal(eventSlave)) {
				r.push(`${His} pussy is so fucked out and loose that your groping hand almost slides up it.`);
			} else {
				r.push(`You finger fuck ${him} for a while, the sting of the soap on ${his} sensitive insides making ${him} gasp.`);
			}
			r.push(`As ${he} moans down on the shower floor, you lie down behind ${him}, spooning ${his} helpless body`);
			if (eventSlave.belly >= 5000) {
				r.addToLast(`, your hands encircling ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy`);
				} else {
					r.push(`middle`);
				}
			}
			r.addToLast(`.`);
			if (V.PC.dick !== 0) {
				r.push(`Your cock slides into ${him} with ease`);
			} else if (V.PC.boobs >= 300) {
				r.push(`${His} soft back is delicious against your hard nipples`);
			} else {
				r.push(`The contours of ${his} soft rear feel lovely against your feminine petals`);
			}
			r.push(`and the warm water playing over your warm bodies is a comforting accompaniment to the comforting sex.`);
			if (V.PC.dick === 0) {
				r.push(`You ride yourself against ${his} warm wet body until you climax from the rubbing alone`);
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
			} else if (didAnal ) {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function struggle() {
			eventSlave.devotion -= 5;
			return `${He} struggles for a while until you get bored and leave ${him} to it. Eventually ${his} thrashing brings another slave in, who helps ${him}. This interdependence between slaves <span class="devotion dec">reduces ${his} devotion.</span>`;
		}
	}
};
