App.Events.RESSDevotedVirgin = class RESSDevotedVirgin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				s => s.vagina === 0,
				s => s.trust > 20,
				s => s.devotion > 50,
				s => s.rules.speech !== "restrictive"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`comes into your office and politely waits until you indicate ${he} can have your attention.`);
		if (canTalk(eventSlave)) {
			t.push(`${He} ${say}s, "${capFirstChar(Master)}, ${Spoken(eventSlave, "I want to know what it's like to have a cock in my virgin pussy.")}`);
			if (canSee(eventSlave)) {
				t.push(Spoken(eventSlave, `Seeing so many of the other slaves getting fucked makes it look like so much fun.`));
			} else if (canHear(eventSlave)) {
				t.push(Spoken(eventSlave, `Hearing so many of the other slaves getting fucked makes it sound like so much fun.`));
			} else {
				t.push(Spoken(eventSlave, `Learning about so many of the other slaves getting fucked makes it seem like so much fun.`));
			}
			t.push(Spoken(eventSlave, `I'm so turned on by it. I can't be a proper sex slave without using my pussy. Please take my virginity, ${Master}."`));
		} else {
			t.push(`${He} points to ${his} pussy and comically pantomimes having sex, and then uses gestures to ask if ${he} can serve you with ${his} pussy.`);
		}
		t.push(`${He} spreads ${his} legs ${eventSlave.belly >= 10000 ? `carefully and cocks ${his} hips` : `and cocks ${his} hips suggestively`} at you.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`No, reassure ${him} that ${he} doesn't need to be a slut`, reassure),
			new App.Events.Result(`Make sure ${his} first time is enjoyable`, enjoy),
			new App.Events.Result(`Make sure ${his} first fuck puts ${him} in ${his} place`, rape)
		]);

		function reassure() {
			t = [];

			t.push(`You kindly explain that you've decided to save ${his} virginity — for now. ${He} looks slightly down-hearted and tries to smile nonetheless, but finds ${himself} swept off ${his}`);
			if (!hasAnyLegs(eventSlave)) {
				t.push("stumps");
			} else if (!hasBothLegs(eventSlave)) {
				t.push("foot");
			} else {
				t.push("feet");
			}
			t.push(`and ${eventSlave.bellyPreg >= 5000 ? "gently" : ""} deposited on the couch. ${He} gasps with surprise when ${he} finds ${himself} being teased, fondled, and massaged rather than outright used. In no time at all ${he}'s pressing ${his} whole`);
			if (eventSlave.belly >= 5000) {
				t.push(`${eventSlave.bellyPreg >= 3000 ? "gravid" : "rounded"}`);
			}
			t.push(`body against you and shivering with delight. ${He} shudders, almost uncontrollably, when you grind your ${PC.dick === 0 ? "clitoris" : "dick"} against ${his} moistened, wet pussy between ${his} thighs, taking extra care not to penetrate the willing slave. ${He} leaves your office feeling <span class="hotpink">very close to ${his} ${getWrittenTitle(eventSlave)} indeed,</span> and seems to have forgotten ${his} unfucked vagina, for now.`);

			eventSlave.devotion += 4;
			return t;
		}

		function enjoy() {
			t = [];

			t.push(`You bring ${him} over to the couch, ${!canDoVaginal(eventSlave) ? `unfasten ${his} chastity,` : ""} set ${him} on your lap, and teasingly play with ${his}`);
			if (eventSlave.belly >= 5000) {
				t.push(`${eventSlave.bellyPreg >= 3000 ? "gravid" : "rounded"}`);
			}
			t.push(`body for a long time. Every so often you move your hands over ${his} pussylips, making ${him} shiver and press ${himself} against you, but you only make it the center of attention once the poor over-aroused slave`);
			if (canTalk(eventSlave)) {
				t.push(
					`begs,`,
					Spoken(eventSlave, `"I can't take it any more, ${Master}! Fuck me, please. Please!"`)
				);
			} else {
				t.push(`begins to reach for your ${PC.dick === 0 ? "strap-on" : "cock"} to pull it towards ${himself}.`);
			}
			t.push(`Finally, you lubricate your hand. Then you slowly and gently push a finger into ${his} invitingly tight virgin pussy. ${He}'s already on the edge of orgasm, and you patiently inch your ${PC.dick === 0 ? "strap-on" : "cock"} into ${his} pussy without making ${him} climax. You then start pumping and ${he} starts to moan and breathe more and more heavily. You continue pumping until ${he} finally starts to orgasm; ${PC.dick === 0 ? `${his} climactic shudders` : `the walls of ${his} tightening vagina`} send you over as well. ${He}'s left in a haze of <span class="hotpink">sexual satisfaction</span> that radiates outward from ${his} <span class="lime">newly initiated pussy,</span> and ${he} <span class="mediumaquamarine">trusts you</span> a lot more, now.`);
			if ((eventSlave.fetishKnown !== 1 || eventSlave.fetish !== "pregnancy") && fetishChangeChance(eventSlave) > jsRandom(1, 100)) {
				t.push(`${He}'s back again before the week is over, eager for <span class="lightcoral">another dick in ${his} fuckhole.</span>`);

				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "pregnancy";
			}

			eventSlave.devotion += 3;
			eventSlave.trust += 3;
			eventSlave.vagina = 1;
			seX(eventSlave, "vaginal", PC, "penetrative");
			if (canImpreg(eventSlave, PC)) {
				knockMeUp(eventSlave, 15, 0, -1);
			}
			return t;
		}

		function rape() {
			t = [];

			t.push(`You throw ${him} onto the couch beside your desk; ${he} fails to stop ${himself} from losing balance with ${his} flailing ${isAmputee(eventSlave) ? "stumps" : "limbs"}. ${He} looks around doubtfully; ${he}'s already started to wonder whether this was a mistake. In a few moments ${he} knows it for sure as ${he} feels ${!canDoVaginal(eventSlave) ? `${his} vaginal chastity ripped off and` : ""} the burning sensation of a lubricated ${PC.dick === 0 ? "strap-on" : "dickhead"} forcing ${his} virgin pussy wide. You have ${his} face shoved deep between the leather cushions and you ignore the muffled sounds coming from ${him}. ${He} limply tries to relax for ${his} beloved master, but the painful sensation coming from ${his} crotch causes ${him} to start to writhe uncontrollably. ${He} pushes against the couch, trying to endure the pounding. When you finish, the poor slave is left lying on the couch with a ${PC.dick !== 0 ? `thin dribble of ejaculate escaping from ${his}` : ""} <span class="lime">newly fucked vagina,</span> a stream of drying tears running down each side of ${his} face, ${eventSlave.dick > 0 ? `a single drop of precum at the tip of ${his} totally flaccid dick,` : ""} and a new understanding of <span class="gold">${his} place in life.</span>`);
			if ((eventSlave.fetishKnown !== 1 || eventSlave.fetish !== "submissive") && fetishChangeChance(eventSlave) > jsRandom(1, 100)) {
				t.push(`Before the end of the week it's clear that ${he}'s taken the rape to heart, and now sees ${his} body as something <span class="lightcoral">for others to use and abuse.</span>`);

				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "submissive";
			}

			eventSlave.trust -= 5;
			eventSlave.vagina = 1;
			seX(eventSlave, "vaginal", PC, "penetrative");
			if (canImpreg(eventSlave, PC)) {
				knockMeUp(eventSlave, 15, 0, -1);
			}
			return t;
		}
	}
};
