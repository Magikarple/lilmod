// cSpell:ignore maître

App.Events.RESSDevotedWaist = class RESSDevotedWaist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				s => s.waist < -95,
				s => s.weight <= 95,
				s => s.trust >= -20,
				s => s.devotion > 20,
				s => s.belly < 30000
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, woman
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is a real work of surgical art. As ${he} showers, carefully soaping and then moisturizing every ${V.showInches === 2 ? "inch" : "centimeter"} of ${his} ${eventSlave.skin} skin, you notice the undeniable eroticism created by the unnatural narrowness of`);
		if (eventSlave.belly >= 5000) {
			t.push(`${his} middle, especially given how much ${his} ${belly} ${eventSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"} extends past ${his} sides.`);
		} else {
			t.push(`${his} middle.`);
		}
		t.push(`Though ${his} hands are by no means large, when ${he} washes ${his} sides, ${his} hands span almost the entire circumference of ${his} waist.`);
		if (eventSlave.dick > 0) {
			t.push(`Though ${he}'s not sexually aroused, ${his} cock is visible as ${he} bathes ${himself}; ${his} member and ${his} narrow waist work together to create a real mélange of gender traits.`);
		} else if (eventSlave.boobs > 800 && eventSlave.butt > 4) {
			t.push(`${His} massive bust and hips work together to create a spectacular hourglass effect; ${he}'s a fantasy ${woman} made flesh.`);
		} else {
			t.push(`The narrowness of ${his} waist accentuates ${his} feminine features.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Join ${him} and see if your hands can span ${his} waist`, grab, virginityWarning()),
			new App.Events.Result("Such a lovely work of art must be displayed", display, virginityWarning()),
		]);

		function grab() {
			t = [];

			t.push(`By the time you reach the shower, ${eventSlave.slaveName} is toweling ${himself}. ${He} notices your approach and folds the towel neatly before performing a little naked pirouette that shows off ${his} artificial`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				t.push(`curviness while displaying each of ${his} delectable holes.`);
			} else if (canDoVaginal(eventSlave)) {
				t.push(`curviness while displaying ${his}`);
				if (eventSlave.vagina > 3) {
					t.push("gaping cunt.");
				} else if (eventSlave.vagina > 2) {
					t.push("loose cunt.");
				} else if (eventSlave.vagina > 1) {
					t.push("slutty pussy.");
				} else if (eventSlave.vagina > 0) {
					t.push("tight pussy.");
				} else {
					t.push("virgin pussy.");
				}
			} else if (canDoAnal(eventSlave)) {
				t.push(`curviness while displaying ${his}`);
				if (eventSlave.anus > 2) {
					t.push("gaping asshole.");
				} else if (eventSlave.anus > 1) {
					t.push("slutty asshole.");
				} else if (eventSlave.anus > 0) {
					t.push("tight asshole.");
				} else {
					t.push("virgin asshole.");
				}
			} else {
				t.push("curviness.");
			}
			if (eventSlave.belly >= 500 || eventSlave.weight > 30) {
				t.push(`You take ${him} about the middle and, with a little imagination, find that, indeed, you could make your thumbs and fingertips meet around it if you were to press.`);
			} else {
				t.push(`You take ${him} about the waist and find that, indeed, you can make your thumbs and fingertips meet around it if you press, which elicits a squeak.`);
			}
			if (!canDoVaginal(eventSlave) && !canDoAnal(eventSlave)) {
				t.push(`There are many ways you could apply this during sex, but since ${he} is fully locked in chastity, you can only explain, in detail, the ways you would fuck ${him} if you could. By the end ${he}'s blushing vibrantly, but <span class="mediumaquamarine">more confident in ${his} sexual uniqueness.</span>`);
			} else {
				t.push(`This can be applied during sex many ways. First, ${he} sits on the bathroom counter and bends ${himself} almost double for`);
				if (canDoAnal(eventSlave)) {
					t.push(`anal. Your control over the pace is perfected by your grip around ${his} tiny middle.`);
					t.push(VCheck.Anal(eventSlave, 1));
				} else {
					t.push(`vaginal. Your control over the pace is perfected by your grip around ${his} tiny middle.`);
					t.push(VCheck.Vaginal(eventSlave, 1));
				}
				t.push(`Finally, ${he} goes down on ${hasAllLimbs(eventSlave) ? "all fours" : "the floor"} for a hard`);
				if (canDoVaginal(eventSlave)) {
					t.push(`pounding, doggy style, losing ${himself} in the intense penetration as you use your hold around ${him} to give it to ${him} even harder.`);
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					t.push(`buttfuck, doggy style, losing ${himself} in the intense anal as you use your hold around ${him} to give it to ${him} even harder.`);
					t.push(VCheck.Anal(eventSlave, 1));
				}
				t.push(`By the end ${he}'s tired but <span class="mediumaquamarine">confident in ${his} sexual uniqueness.</span>`);
			}

			eventSlave.trust += 4;
			return t;
		}

		function display() {
			t = [];

			t.push(`There is a polite soirée tonight at one of ${V.arcologies[0].name}'s more upscale eating establishments. Many couples are there to enjoy themselves and preen, but even so, you make a stir as you enter wearing`);
			if (PC.title === 1) {
				t.push(`the latest in men's eveningwear${PC.boobs >= 300 || PC.belly >= 1500 || PC.butt >= 3 || PC.balls >= 9 ? ", tastefully tailored to accommodate your unusual build" : ""}.`);
			} else {
				t.push(`the latest dress from one of your arcology's leading tailors${PC.boobs >= 300 || PC.belly >= 1500 || PC.butt >= 3 || PC.balls >= 9 ? ", carefully tailored to accentuate your splendid curves" : ""}.`);
			}
			t.push(`${eventSlave.slaveName} is a confection on your arm, displayed in a silk gown of strips and cuts that accentuates ${his} artificial figure while leaving ${his} breasts,`);
			if (eventSlave.dick > 0) {
				t.push(`${eventSlave.chastityPenis === 1 ? "caged" : ""} cock,`);
			} else if (eventSlave.vagina > -1) {
				t.push(`${eventSlave.chastityPenis === 1 ? "chaste" : ""} pussy,`);
			} else if (eventSlave.balls > 1 && eventSlave.scrotum > 0) {
				t.push("dangling balls,");
			} else {
				t.push("featureless groin,");
			}
			t.push(`and ${eventSlave.chastityAnus ? "off-limits rear" : "butt"} lusciously bare. Your appearance together with your living accessory <span class="green">increases your reputation.</span> After a refined meal and some sedate dancing, the maître d' announces that the establishment has become (the Free Cities definition of) a salon for the evening. After the more prudish couples file out, those who remain engage in public sexual congress;`);
			if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
				t.push(`${eventSlave.slaveName}'s gown allows you to take ${him} in a ${eventSlave.belly >= 5000 ? "tight" : "close"} lotus position on the cleared table, face to face.`);
				if (canDoVaginal(eventSlave)) {
					t.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					t.push(VCheck.Anal(eventSlave, 1));
				}
			} else {
				t.push(`you and ${eventSlave.slaveName} enjoy the ${canSee(eventSlave) ? "sights" : "atmosphere"} while fooling around. While you'd love to use ${him}, ${his} chastity keeps you at bay.`);
			}
			t.push(`<span class="hotpink">${He} has become more devoted to you.</span>`);

			eventSlave.devotion += 4;
			repX(500, "event", eventSlave);
			return t;
		}

		function virginityWarning() {
			if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
					return `This option will take ${his} anal and vaginal virginity`;
				} else {
					return `This option will take ${his} anal virginity`;
				}
			} else if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} vaginal virginity`;
			}
		}
	}
};
