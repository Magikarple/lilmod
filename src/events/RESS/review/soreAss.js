App.Events.RESSSoreAss = class RESSSoreAss extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion <= 50,
				s => s.minorInjury === "sore ass",
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
			`One night, you see`,
			contextualIntro(V.PC, eventSlave, true)
		);

		if (!hasAnyLegs(eventSlave)) {
			r.push(`scooting ${himself} from side to side uncomfortably,`);
		} else if (eventSlave.heels === 1 && shoeHeelCategory(eventSlave) === 0) {
			r.push(`crawling gingerly,`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			r.push(`tottering along painfully,`);
		} else {
			r.push(`walking a little funny,`);
		}
		r.push(`as though ${he} has a sore butt. You call ${him} over to inspect ${his} backdoor to see if ${he} needs care,`);
		if (!hasAnyLegs(eventSlave)) {
			r.push(`and set ${his} helpless body down, spreading ${his} buttocks to examine ${his} anus.`);
		} else {
			r.push(`and order ${him} to spread ${his} buttocks for you so you can examine ${his} anus.`);
		}
		r.push(`${His} asshole is fine, just a little sore from hard buttfucks. ${He} complies with you, but as you probe ${him} gently with a finger,`);
		if (!canTalk(eventSlave) && (!hasAnyArms(eventSlave))) {
			r.push(`${he} wriggles desperately and turns to mouth "it hurts ${getWrittenTitle(eventSlave)} please don't assrape me" at you.`);
		} else if (!canTalk(eventSlave)) {
			r.push(`${he} gestures desperately, telling you ${his} butt hurts and asking you not to assfuck ${him}.`);
		} else {
			r.push(
				`${he} bursts out,`,
				Spoken(eventSlave, `"${Master}, my butt is so sore! Please don't use my ass, ${Master}. Please."`)
			);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Punish ${his} ass for insolence`, punish),
			new App.Events.Result(`Give ${him} some care`, care),
		]);

		function punish() {
			r = [];
			r.push(`You inform ${him} sternly that you will ensure that ${he} is not permanently damaged, and that otherwise, ${he} is to take anal pain like a good buttslave. ${He} starts to beg and whine as you lean back in your chair and`);
			if (V.PC.dick === 0) {
				r.push(`hold ${him} upside down on your chest so ${he} can lick your pussy while you use a dildo on ${his} ass.`);
			} else {
				r.push(`set ${him} on your chest before reaching around to line your cock up with ${his} sore hole. ${He} shudders and writhes when you start pushing yourself inside.`);
			}
			r.push(`You use hard pinches to ${his} nipples to punish ${his} whining, forcing ${him} to take a long, painful buttfuck in silence. <span class="gold">${He} has become more afraid of you.</span>`);
			if (V.seeStretching === 1 && eventSlave.anus < 3) {
				r.push(`${His} week of tough anal experience has <span class="lime">permanently loosened ${his} anus.</span>`);
				eventSlave.anus += 1;
			}
			eventSlave.trust -= 5;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function care() {
			r = [];
			r.push(`${He}'s filled with anxiety as you`);
			if (eventSlave.belly < 1500) {
				r.push(`lay ${him} face-down on your desk,`);
			} else {
				r.push(`direct ${him} to lay on ${his} side on your desk`);
				if (eventSlave.belly >= 300000) {
					r.push(`with ${his} ${belly} belly hanging over the edge`);
				}
				r.push(r.pop() + `,`);
			}
			r.push(`but is surprised and reassured when ${he}'s penetrated not by a`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`turgid`);
				if (V.PC.vagina !== -1) {
					r.push(`futa`);
				}
				r.push(`cock`);
			}
			r.push(`but by a single gentle finger coated with something healing and cool. The mixed analgesic and anti-inflammatory takes the sharpness off the sore feeling, and will help get ${his} butt back into fucking shape. <span class="trust inc">${He} has become more accepting of anal slavery,</span> and <span class="health inc">${his} asshole feels better.</span>`);
			if (eventSlave.anus > 2) {
				r.push(`Your expert care has <span class="orange">allowed ${his} loose asspussy to recover a little of its natural shape and size.</span>`);
				eventSlave.anus -= 1;
			}
			eventSlave.trust += 4;
			eventSlave.minorInjury = 0;
			return r;
		}
	}
};
