App.Events.RESSObedientGirlish = class RESSObedientGirlish extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== "work as a servant",
				s => canDoAnal(s) || canDoVaginal(s),
				s => s.butt < 3,
				s => s.boobs < 500,
				s => s.weight <= 10,
				s => s.muscles <= 30,
				s => s.trust >= -20,
				s => s.devotion > 20,
				s => s.devotion <= 50
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		if (eventSlave.bellyPreg >= 1500) {
			t.push(`is nice and slim as ${he} can be given ${his} pregnancy,`);
		} else if (eventSlave.bellyImplant >= 1500) {
			t.push(`is nice and slim as ${he} can be given the implant rounding out ${his} middle,`);
		} else if (eventSlave.bellyFluid >= 1500) {
			t.push(`is nice and slim as ${he} can be given the amount of ${eventSlave.inflationType} distending ${his} middle,`);
		} else {
			t.push("is nice and slim,");
		}
		t.push(`with a trim chest, narrow hips and not much of an ass to speak of. Despite the myriad ways a Free Cities slaveowner can give his property tits and asses, you've held off for now, keeping ${him} lithe.`);
		if (canMove(eventSlave)) {
			if (hasAnyArms(eventSlave)) {
				t.push(`${He} comes before you for a routine nude inspection, obediently ${canStand(eventSlave) ? "standing" : "kneeling"} before your desk with ${his} ${hasBothArms(eventSlave) ? "hands crossed" : "hand placed"}`);
				if (eventSlave.belly >= 30000) {
					t.push(`atop ${his} ${belly} stomach.`);
				} else if (eventSlave.belly >= 1500) {
					t.push(`over ${his} rounded stomach.`);
				} else {
					t.push(`over ${his} flat stomach.`);
				}
			} else {
				t.push(`${He} comes before you for a routine nude inspection, obediently ${canStand(eventSlave) ? "standing" : "kneeling"} before your desk.`);
			}
		} else if (!hasAnyLegs(eventSlave)) {
			t.push(`Another slave strips ${him} and leaves ${his} naked torso on your desk for a routine inspection.`);
		} else {
			t.push(`Another slave helps ${him} in, aids in undressing ${him}, and leaves ${him} for your routine inspection.`);
		}
		t.push(`A perfectly devoted slave might display ${himself}, and a rebellious one might try to cover ${himself}: ${he}'s neither. `);
		if (eventSlave.dick > 0) {
			t.push(`Though ${he}'s not sexually aroused, ${his} cock is visible and contributes greatly to ${his} androgyny.`);
		} else if (eventSlave.vagina === -1) {
			t.push(`The smooth featureless skin between ${his} legs makes ${him} look like a doll, not a girl.`);
		} else {
			t.push(`${His} bare pussy completes the picture of simultaneous innocence and availability.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} get dressed and spend some quality time with ${him}`, dress, virginityWarning(1)),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Dominate ${his} narrow ass`, dominate, virginityWarning(0))
				: new App.Events.Result()
		]);

		function dress() {
			t = [];

			t.push(`You let ${eventSlave.slaveName} don a nice dress and take ${him} out${!canWalk(eventSlave) ? ` in a wheelchair` : ``}. ${He}'s a little suspicious at first but when you reach the first balcony on your lazy route around the huge building the sun on ${his} face and the gentle breeze around ${his} ears convince ${him} there's no trick. ${He} watches you shyly as you lead ${him} around, soaking in the sights and relaxing. Though you still speak as ${his} ${getWrittenTitle(eventSlave)}, you chat about goings on around the arcology, and you buy ${him} a fresh fruit from a vendor. The unexpected show of care and compassion has ${him} quite agog. By the time you take ${him} out onto another park-like balcony and fuck ${him} on a bench,`);
			if (eventSlave.dick > 0 && eventSlave.chastityPenis === 1 && eventSlave.chastityAnus === 1) {
				t.push(`${his} combined chastity cage and anal chastity belt makes ${him} move awkwardly.`);
			} else if (eventSlave.dick > 0 && eventSlave.chastityPenis === 1) {
				t.push(`${his} chastity cage is dribbling precum, a sign ${he} wouldn't mind having to take it up the ass.`);
			} else if (eventSlave.dick > 0 && eventSlave.chastityAnus === 1) {
				t.push(`${his} dick is tenting the front of ${his} dress, through ${his} anal chastity belt.`);
			} else if (eventSlave.dick > 0 && canAchieveErection(eventSlave)) {
				t.push(`${his} dick is tenting the front of ${his} dress and ${he}'s happy to take it up the ass.`);
			} else if (eventSlave.dick > 6) {
				t.push(`${he}'s happy to take it up the ass; there's even a steady stream of pre dripping from ${his} monstrous cock.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${he}'s happy to take it up the ass, though there's no sign of an erection from ${his} useless sissy dick.`);
			} else if (!canDoVaginal(eventSlave)) {
				t.push(`${he}'s obviously ready and willing to get buttfucked, even if ${his} body has no physically obvious way to show it off.`);
			} else {
				t.push(`${he}'s wet and ready and moans happily as you enter ${him}.`);
			}
			if (canDoVaginal(eventSlave)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(VCheck.Anal(eventSlave, 1));
			}
			t.push(`There's no hesitation or fear at all on ${his} face when ${he} ${canSee(eventSlave) ? "sees" : "notices"} you're returning ${him} to your penthouse; <span class="mediumaquamarine">${his} trust in you has increased.</span>`);

			eventSlave.trust += 4;
			return t;
		}

		function dominate() {
			t = [];

			t.push(`You make a show of examining ${him} with a critical air that makes ${him} aware of ${his} modest endowments. Finished, you announce in a serious tone that you're concerned that you can't tell if ${he}'s a girl, since girls have breasts and butts. ${eventSlave.belly >= 1500 ? `${He} should do something about that bulbous gut too, you mock.` : ""}`);
			if (!canTalk(eventSlave)) {
				t.push(`${He} protests wordlessly, gesturing desperately at ${himself}.`);
			} else {
				if (eventSlave.lips > 70) {
					t.push(`${He} protests through ${his} huge lips,`);
				} else if (eventSlave.piercing.lips.weight + eventSlave.piercing.tongue.weight > 2) {
					t.push(`${He} protests through ${his} piercings,`);
				} else {
					t.push(`${He} protests,`);
				}
				t.push(Spoken(eventSlave, `"${Master}, I'm a slave girl! Please, just look at me, ${Master}!"`));
			}
			t.push(`${canSee(eventSlave) ? "Shaking your head" : "Tutting"} with pretended doubt, you say that since you're not sure you'll have to make do. Your order ${him} to`);
			if (eventSlave.belly >= 300000) {
				t.push(`lean over ${his} ${belly} belly${PC.dick === 0 ? " while you don a strap-on" : ""}.`);
			} else if (eventSlave.belly >= 5000) {
				t.push(`lean face-down into the couch cushions${PC.dick === 0 ? " while you don a strap-on" : ""}.`);
			} else {
				t.push(`lie face-down on the couch${PC.dick === 0 ? " while you don a strap-on" : ""}.`);
			}
			t.push(`${He} does doubtfully, only realizing what you intend when ${he} feels ${PC.dick === 0 ? "the strap-on" : "your dickhead"} forcing its way between ${his} narrow buttcheeks. ${He} whimpers and moans ${eventSlave.belly < 300000 ? "into the couch" : ""} as you roughly sodomize ${him}. It's true, ${he}'s pretty androgynous from this angle, especially while ${he} takes it up the butthole. <span class="hotpink">${He} has become more submissive to you,</span> but there's <span class="gold">some fear there, too.</span>`);
			t.push(VCheck.Anal(eventSlave, 1));

			eventSlave.trust -= 2;
			eventSlave.devotion += 4;
			return t;
		}

		function virginityWarning(type) {
			if (type === 1 && canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					return `This option will take ${his} vaginal virginity`;
				}
			} else if (eventSlave.anus === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
