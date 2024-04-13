App.Events.RESSWhoreRebellious = class RESSWhoreRebellious extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment === Job.WHORE,
				s => s.devotion < -20,
				s => s.trust >= -20,
				s => (canDoAnal(s) || canDoVaginal(s))
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "restrictive latex"); // TODO: Add mouth-plug?


		let r = [];

		r.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		r.push(`is kicked out of bed early in the morning. ${He}'s not yet obedient, but ${he} has to earn ${his} keep anyway. This means selling ${his} body, or in ${his} particular case, having ${his} unwilling body sold. ${He} knows the score and allows ${himself} to be stuffed into a special latex public whore suit. ${He}'s learned the hard way that resisting being suited up just means ${he}'ll be painfully punished before being suited up.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`The suit is quite special. It is made of thick, durable latex with temperature regulation and anchor points for restraint. It is specially crafted to be able to accommodate its wearer's ${eventSlave.boobs > 250 ? "tits" : "breast"}, belly,`);
		if (V.seeDicks !== 0) {
			r.push(`dick, balls,`);
		}
		r.push(`and rear, however large. It has a hole at ${his} mouth that holds ${his} jaws well open, with a plug to fill it completely when not in use. ${He} breathes through a port at ${his} nose that muffles all noise, in and out.`);
		if (eventSlave.dick > 0) {
			r.push(`${His} cock is neglected inside the latex, with no means of access.`);
		}
		if (eventSlave.vagina !== -1) {
			r.push(`There's a hole over ${his} pussy, of course.`);
		}
		r.push(`Finally, there's a hole over ${his} anus.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`${He} will spend the day restrained in public, with your other slaves periodically stopping by to hydrate ${him} and wash out ${his} holes.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Increase ${his} assignment to 24 hours a day`, H24, virginityWarning()),
			new App.Events.Result(`Take the first and last every day`, firstLast, virginityWarning()),
			(V.arcade > 0)
				? new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: new App.Events.Result(),
		]);

		function virginityWarning() {
			if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) {
				return `This option will take ${his} virginity`;
			}
			return null;
		}

		function popCherry() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave) && eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				eventSlave.anus++;
				eventSlave.vagina++;
				VCheck.Both(eventSlave, 1);
				return `You made sure to claim <span class="virginity loss">both ${his} virginity and anal cherry</span> before anyone else could.`;
			} else if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				eventSlave.vagina++;
				VCheck.Vaginal(eventSlave, 1);
				return `You made sure to claim <span class="virginity loss">${his} virginity</span> before anyone else could.`;
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				eventSlave.anus++;
				VCheck.Anal(eventSlave, 1);
				return `You made sure to claim <span class="virginity loss">${his} anal cherry</span> before anyone else could.`;
			}
		}

		function H24() {
			r = [];
			r.push(`You give ${contextualIntro(V.PC, eventSlave)} no indication that ${his} public use assignment is about to change. Late in the day, when ${his} shift would normally end, another of your slaves simply maintains ${him} as usual and then leaves ${him} be. ${eventSlave.slaveName} is so deprived of any way to tell time that ${he} doesn't realize ${he}'s been left for some time. The first indication ${he} gets that something's different is when liquid food is squirted down ${his} throat the next morning. When ${he}'s finally stripped out of the suit at the end of the week, ${he}'s pale and wan and ${his} holes are puffy and red. <span class="health dec">${His} health was damaged.</span> However, ${his} permanent presence became quite noted. <span class="reputation inc">Your reputation has increased.</span> And when ${he}'s out of the suit, ${he} instantly begs you to allow ${him} to do anything to save ${himself} from more of that. <span class="trust dec">${His} fear of you has increased.</span>`);
			r.push(popCherry());
			repX(500, "event", eventSlave);
			healthDamage(eventSlave, 10);
			eventSlave.trust -= 10;
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 10);
				if (!canDoAnal(eventSlave)) {
					seX(eventSlave, "vaginal", "public", "penetrative", 10);
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 2, -2));
				}
			}
			if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (!canDoVaginal(eventSlave)) {
					seX(eventSlave, "anal", "public", "penetrative", 10);
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 1, -2));
				}
			}
			seX(eventSlave, "oral", "public", "penetrative", 10);
			return r;
		}

		function firstLast() {
			r = [];
			r.push(`When ${contextualIntro(V.PC, eventSlave)} feels a cock entering ${his} mouth right after ${he}'s suited up, ${he} knows it's you and wriggles as best ${he} can in the suit. It doesn't help much, and ${his} struggles don't prevent you from moving from ${his} mouth to ${his} ass, either. At the end of the day, on the other hand, the`);
			// There is a function planned for this in the male slave overhaul. DO NOT FORGET IT!
			if (girl === "girl") {
				r.push(`female-shaped`);
			} else {
				r.push(`male-shaped`);
			}
			r.push(`latex form is completely still and quiescent as you`);
			if (V.PC.dick === 0) {
				r.push(`use a couple of fingers to brutally molest`);
			} else {
				r.push(`molest`);
			}
			r.push(`each of its holes. It takes`);
			if (canDoVaginal(eventSlave)) {
				r.push(`a serious vaginal reaming`);
			} else {
				r.push(`viciously hard anal penetration`);
			}
			r.push(`to elicit any response at all, and even then, it's just the slightest hint of a moan. <span class="trust dec">${His} fear of you has increased.</span>`);
			r.push(popCherry());
			eventSlave.trust -= 5;
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 6);
				if (!canDoAnal(eventSlave)) {
					seX(eventSlave, "vaginal", "public", "penetrative", 3);
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 2, -2));
				}
			}
			if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", "public", "penetrative", 6);
				if (!canDoVaginal(eventSlave)) {
					seX(eventSlave, "anal", "public", "penetrative", 3);
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 1, -2));
				}
			}
			seX(eventSlave, "oral", "public", "penetrative", 7);

			return r;
		}

		function arcade() {
			r = [];
			r.push(`When ${he} realizes what ${his} punishment is, ${contextualIntro(V.PC, eventSlave)} ${canTalk(eventSlave) ? "screams and " : ""}begs, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				r.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				r.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				r.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${bellyAdjective(eventSlave)} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				r.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				r.push(`${His}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(bellyAdjective(eventSlave));
				}
				r.push(`body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				r.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				r.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			r.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} butt as ${he} wriggles desperately against ${his} restraints.`);
			r.push(assignJob(eventSlave, Job.ARCADE));
			eventSlave.sentence = 4;
			return r;
		}
	}
};
