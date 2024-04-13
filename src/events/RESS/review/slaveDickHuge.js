App.Events.RESSSlaveDickHuge = class RESSSlaveDickHuge extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.masturbation === 1,
				s => s.dick > 4,
				hasAnyArms,
				canAchieveErection,
				s => s.belly < 10000,
				s => s.chastityPenis !== 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`The showers your slaves use are well vented and transparent walled so that you can see their occupants clearly, even from your desk. Working late at night, you see`,
			contextualIntro(PC, eventSlave, true),
			`sitting hunched under the water in one of the showers, with ${his} back to you. You tell your desk to focus on ${him}, and you are rewarded with three different angles of ${eventSlave.slaveName} giving ${himself} a blowjob. ${He} has to bend over very hard`,
		);
		if (eventSlave.belly >= 5000) {
			r.push(`and at a very awkward angle`);
		}
		r.push(`to get the tip of ${his} huge`);
		if (V.seeRace === 1) {
			r.push(eventSlave.race);
		}
		r.push(`dick`);
		if (eventSlave.belly >= 5000) {
			r.push(`around ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly and`);
		}
		r.push(`into ${his} mouth, but ${he}'s obviously enjoying it all the same. It's not against the rules for ${him} to masturbate; ${he}'s just found an impressive way of doing it.`);
		if (eventSlave.scrotum > 0) {
			if (eventSlave.balls >= 10) {
				r.push(`As ${he} works ${himself}, ${he} plays with ${his} inhuman balls, massaging and caressing as much of them ${he} as ${he} can with`);
				if (hasBothArms(eventSlave)) {
					r.push(`both hands.`);
				} else {
					r.push(`${his} hand.`);
				}
			} else if (eventSlave.balls > 8) {
				r.push(`As ${he} works ${himself}, ${he} plays with ${his} monster balls, massaging and caressing them with`);
				if (hasBothArms(eventSlave)) {
					r.push(`both hands.`);
				} else {
					r.push(`${his} hand.`);
				}
			} else if (eventSlave.balls > 5) {
				r.push(`As ${he} works ${himself}, ${he} plays with ${his} massive balls, cupping them and squeezing gently.`);
			} else if (eventSlave.balls > 3) {
				r.push(`As ${he} works ${himself}, ${he} plays with ${his} big balls, rolling them around and squeezing them gently.`);
			} else if (eventSlave.balls > 1) {
				r.push(`As ${he} works ${himself}, ${he} plays with ${his} balls, massaging them with`);
				if (hasBothArms(eventSlave)) {
					r.push(`one`);
				} else {
					r.push(his);
				}
				r.push(`hand.`);
			}
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Enter the shower and take ${him}`, shower, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			(PC.dick !== 0)
				? new App.Events.Result(`The only dick ${he} should suck is ${his} ${getWrittenTitle(eventSlave)}'s`, suck)
				: new App.Events.Result(),
			(eventSlave.belly < 5000) && (canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`See if ${he} can do that while you take ${him}`, take, virginityWarning())
				: new App.Events.Result(),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function shower() {
			const r = new SpacedTextAccumulator();
			r.push(`${He}'s so occupied that ${he} doesn't`);
			if (canHear(eventSlave)) {
				r.push(`hear`);
			} else {
				r.push(`notice`);
			}
			r.push(`you until you seize ${him} under the armpits and drag ${him} to ${his} feet. ${His} massive dickhead pops free of ${his} mouth and ${he} squeaks in surprise as you push ${his}`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`gravid`);
				} else {
					r.push(`rounded`);
				}
				r.push(`body`);
			}
			r.push(`against the wall of the shower and stuff your`);
			if (PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`dick`);
			}
			r.push(`up ${his}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`cunt.`);
			} else {
				r.push(`ass.`);
			}
			r.push(`${He} was already very close to orgasm, and the stimulation of ${his} dick rubbing against the warm, wet wall`);
			if (eventSlave.belly >= 1500) {
				r.push(`of the shower and ${his} belly,`);
			} else {
				r.push(`of the shower,`);
			}
			r.push(`not to mention the feeling of being`);
			if (canDoVaginal(eventSlave)) {
				r.push(`fucked,`);
			} else {
				r.push(`buttfucked,`);
			}
			r.push(`is enough that ${he} climaxes quickly.`);
			if (eventSlave.balls === 3) {
				r.push(`${His} huge load coats the shower wall with cum.`);
			}
			r.push(`You pull out and let ${him} finish by`);
			if (PC.dick === 0) {
				r.push(`giving you oral`);
			} else {
				r.push(`sucking your dick`);
				if (PC.vagina !== -1) {
					r.push(`and eating your pussy`);
				}
			}
			r.addToLast(`, since ${he} started by sucking ${himself}. <span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					r.push(`<span class="virginity loss">This breaks in ${eventSlave.slaveName}'s virgin pussy.</span>`);
					eventSlave.vagina = 1;
					r.push(`<span class="devotion inc">${He} enjoys losing ${his} cherry to you.</span>`);
					eventSlave.devotion += 4;
				}
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				if (eventSlave.anus === 0) {
					r.push(`<span class="virginity loss">This breaks in ${eventSlave.slaveName}'s virgin ass.</span>`);
					eventSlave.anus = 1;
					r.push(`<span class="devotion inc">${He} enjoys losing ${his} butt cherry to you.</span>`);
					eventSlave.devotion += 4;
				}
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.toParagraph();
			return r.container();
		}

		function suck() {
			const r = new SpacedTextAccumulator();
			r.push(`${He}'s so occupied that ${he} doesn't`);
			if (canHear(eventSlave)) {
				r.push(`hear`);
			} else {
				r.push(`notice`);
			}
			r.push(`you until you seize ${his} hair and pull ${his} head back. ${His} massive dickhead pops free of ${his} mouth and ${he} squeaks in surprise. The noise is cut off by a gag as you ram yourself down ${his} throat. ${He} plays with your`);
			if (PC.vagina !== -1) {
				r.push(`cunt`);
			} else {
				r.push(`balls`);
			}
			r.push(`as you facefuck ${him} and jacks off with ${his} other hand. ${He} was so close when you intruded that ${he} cums long before you do. There's a lot of cum in the shower when you're through.`);
			if (eventSlave.balls === 3) {
				r.push(`${His} huge balls made an especially major contribution.`);
			}
			r.push(`<span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			r.toParagraph();
			return r.container();
		}

		function take() {
			const r = new SpacedTextAccumulator();
			r.push(`You interrupt ${eventSlave.slaveName} and make ${him} lie on a nearby bed. After some preparatory stretching, during which ${his} frustrated erection flops forlornly around, you manage to get both ${his} ankles behind ${his} head. In this position ${he} manages to resume sucking on the head of ${his} penis as you slip into ${him}.`);
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			r.push(`So contorted, ${his}`);
			if (canDoVaginal(eventSlave)) {
				r.push(`pussy`);
			} else {
				r.push(`anus`);
			}
			r.push(`is not well angled for comfortable`);
			if (canDoVaginal(eventSlave)) {
				r.push(`penetration,`);
			} else {
				r.push(`sodomy,`);
			}
			r.push(`so ${he} is soon moaning and grunting into ${his} cock as you fuck ${him}.`);
			r.push(`${He} finishes`);
			if (eventSlave.balls >= 3) {
				r.push(`${his} enormous ejaculation`);
			}
			r.push(`into ${his} own mouth and then`);
			if (PC.dick === 0) {
				r.push(`finds ${himself} giving you oral directly, since you pulled your strap-on off.`);
			} else {
				r.push(`receives your load into ${his} now-brimming throat.`);
				if (PC.vagina !== -1) {
					r.push(`${He} barely has time to swallow before you press your pussy against ${his} mouth.`);
				}
			}
			r.push(`<span class="devotion inc">${His} devotion to you has increased.</span>`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}
	}
};
