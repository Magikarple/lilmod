App.Events.RESSServeThePublicDevoted = class RESSServeThePublicDevoted extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.assignment === Job.PUBLIC,
				s => canDoAnal(s) || canDoVaginal(s),
				s => s.devotion > 50,
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canTalk,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is a real public servant. This morning, ${he} rose early, did ${his} chores, and looked after ${himself}.`);
		if (canWalk(eventSlave) || (canMove(eventSlave) && eventSlave.rules.mobility === "permissive")) {
			t.push(`${He} heads out`);
		} else {
			t.push(`${He}'s being escorted`);
		}
		t.push(`past your desk toward the arcology's lower floors to offer ${himself} freely to everyone ${he} meets.`);

		App.Events.addParagraph(node, t);
		t = [];
		t.push(`As ${he} goes, you notice that`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`precum is starting to dribble out of ${his} chastity cage.`);
		} else if (eventSlave.dick > 0 && canAchieveErection(eventSlave)) {
			t.push(`${his} cock is so hard it's standing out, perfectly straight.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && !canAchieveErection(eventSlave)) {
			t.push(`${his} semi-hard cock is dribbling precum, a sure sign of a bitch who wants to be buttfucked.`);
		} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			t.push(`${his} pathetically soft cock is streaming precum, a sure sign of a bitch who wants to be buttfucked.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} big clit is obviously engorged.`);
		} else if (eventSlave.vaginaLube > 0) {
			t.push(`${his} pussy is already soaking wet.`);
		} else {
			t.push(`${his} cheeks are flushed and ${he}'s panting a little.`);
		}
		t.push(`Apparently, ${he} can't wait to`);
		if (eventSlave.fetish === Fetish.SUBMISSIVE) {
			t.push(`play the submissive.`);
		} else if (eventSlave.fetish === "humiliation") {
			t.push(`be publicly degraded.`);
		} else if (eventSlave.fetish === "masochist") {
			t.push(`be roughly handled.`);
		} else if (eventSlave.fetish === "dom") {
			t.push(`play the dom.`);
		} else if (eventSlave.fetish === "sadist") {
			t.push(`find a willing masochist.`);
		} else if (eventSlave.fetish === "pregnancy" && eventSlave.preg > eventSlave.pregData.normalBirth / 4) {
			t.push(`have ${his} pregnancy fondled.`);
		} else if (eventSlave.fetish === "pregnancy") {
			t.push(`pretend to get knocked up.`);
		} else if (eventSlave.fetish === "boobs") {
			t.push(`have ${his} tits fondled.`);
		} else if (eventSlave.fetish === "cumslut") {
			t.push(`gorge ${himself} on cum.`);
		} else if (eventSlave.fetish === "buttslut") {
			t.push(`spend all day getting pounded in the ass.`);
		} else if (eventSlave.attrXX > 65) {
			t.push(`enjoy all the women.`);
		} else if (eventSlave.attrXY > 65) {
			t.push(`enjoy all the men.`);
		} else {
			t.push(`be a complete slut.`);
		}
		t.push(`If you went with ${him}, you could certainly show off a little.`);

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			(canDoAnal(eventSlave))
				? new App.Events.Result(`Share ${his} body with the public`, share, virginityWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Give ${him} some aftercare`, aftercare, virginityWarning()),
			new App.Events.Result(`Chat about ${his} day`, chat),
		]);


		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			} else {
				return null;
			}
		}


		function share() {
			let frag = document.createDocumentFragment();
			t = [];
			if (canWalk(eventSlave) || (canMove(eventSlave) && eventSlave.rules.mobility === "permissive")) {
				t.push(`${eventSlave.slaveName} is surprised to find you walking beside ${him}, but obediently falls in behind you as a proper slave should.`);
			} else if (canMove(eventSlave)) {
				t.push(`${eventSlave.slaveName} is surprised to find you swapping places with ${his} assistant to support ${his} weight.`);
			} else { // strength/height check here!
				t.push(`You scoop ${eventSlave.slaveName}'s ${isAmputee(eventSlave) ? "limbless" : "immobile"} form up and carry ${him} out.`);
			}
			t.push(`You take ${him} to a lovely open balcony and seat yourself on a bench surrounded by the lush greenery and flowing water of ${V.arcologies[0].name}'s food systems. You pull ${his} ass down onto your`);
			if (V.PC.dick === 0) {
				t.push(`strap-on`);
			} else {
				t.push(`rigid cock`);
			}
			t.push(`so ${he} can offer everything else to the public.`);
			if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
				t.push(`They know not to presume to use the pussy located beneath your thrusting cock.`);
			}
			t.push(VCheck.Anal(eventSlave, 5));

			App.Events.addParagraph(frag, t);
			t = [];

			if (canDoVaginal(eventSlave)) {
				t.push(`For several hours, citizens come and go, most choosing to fuck ${his} wet and available pussy. You climax repeatedly from the`);
				if (V.PC.dick === 0) {
					t.push(`titillating nature of`);
				} else {
					t.push(`extra fullness of ${his} butt during`);
				}
				t.push(`double penetration, and by the time you're finished ${he}'s dripping ejaculate from both ${his} holes.`);
			} else if (eventSlave.belly >= 120000) {
				t.push(`Since`);
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`${he}'s so enormously pregnant that ${his} ${belly} stomach blocks ${his} crotch`);
				} else {
					t.push(`${his} ${belly} stomach is so massive that is blocks ${his} crotch`);
				}
				t.push(`and you're wearing ${his} backdoor around your`);
				t.push(V.PC.dick === 0 ? "strap-on," : "cock,");
				t.push(`${his} mouth is all that's left. ${He} gives so many blowjobs by the time you're finished that ${his} face, hair, chest and belly are liberally spattered with cum.`);
			} else if (eventSlave.chastityVagina) {
				t.push(`Since ${he}'s wearing a chastity belt and you're wearing ${his} backdoor around your`);
				t.push(V.PC.dick === 0 ? "strap-on," : "cock,");
				t.push(`${his} mouth is all that's left. ${He} gives so many blowjobs by the time you're finished that ${his} face, hair, chest and`);
				if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnant`);
					} else {
						t.push(belly);
					}
					t.push(`belly`);
				} else {
					t.push(`even stomach`);
				}
				t.push(`are liberally spattered with cum.`);
			} else {
				t.push(`With your cock pumping ${his} butt as much as you can manage with ${him} seated in your lap, ${his}`);
				if (eventSlave.dick !== 0 && eventSlave.belly >= 5000) {
					t.push(`dick flops up and down against the bottom of ${his} rounded stomach,`);
				} else if (eventSlave.dick !== 0) {
					t.push(`dick flops up and down,`);
				} else {
					t.push(`tiny front hole begins to glisten with the promise of a messy little orgasm,`);
				}
				t.push(`lewdly advertising ${his} sexual availability. ${He} gives so many blowjobs by the time you're finished that ${his} face, hair, chest and`);
				if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnant`);
					} else {
						t.push(belly);
					}
					t.push(`belly`);
				} else {
					t.push(`even stomach`);
				}
				t.push(`are liberally spattered with cum.`);
			}
			t.push(`The public is sure to remember this spectacle; <span class="green">your reputation has increased.</span>`);
			repX(500, "event", eventSlave);
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (eventSlave.vagina === 0) {
					t.push(`They have also <span class="lime">broken in ${eventSlave.slaveName}'s virgin pussy.</span>`);
					eventSlave.vagina = 1;
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					t.push(knockMeUp(eventSlave, 10, 0, -2));
				}
			} else {
				seX(eventSlave, "oral", "public", "penetrative", 5);
			}
			App.Events.addParagraph(frag, t);
			t = [];
			return [frag];
		}

		function aftercare() {
			t = [];
			t.push(`${eventSlave.slaveName} returns many hours later. ${He} carefully took breaks for ${his} own safety,`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 1.33) {
				t.push(`especially so given ${his} advanced pregnancy,`);
			}
			t.push(`and cleaned ${himself} periodically, so there isn't much evidence, but ${he}'s obviously bone tired. When you meet ${him} at the entrance to your penthouse ${he}'s surprised to`);
			t.push(canSee(eventSlave) ? "see" : "find");
			t.push(`you, but ${he} gives you a little smile anyway. You give ${him} a strong massage and put ${him} to bed. Afterward you turn to be about your business, but ${he} wordlessly offers ${himself} to you as you do.`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					t.push(`${His} virgin pussy is certainly tempting.`);
				} else if (eventSlave.vagina === 1) {
					t.push(`${His} tight pussy is certainly tempting.`);
				} else if (eventSlave.vagina === 2) {
					t.push(`${His} soft pussy is certainly tempting.`);
				} else if (eventSlave.labia > 0) {
					t.push(`${His} generous petals are certainly tempting.`);
				} else if (eventSlave.clit > 0) {
					t.push(`${His} prominent clit is certainly eye-catching.`);
				} else if (eventSlave.vagina === -1) {
					t.push(`${His} relaxed anus is certainly inviting.`);
				} else {
					t.push(`${His} capacious pussy is certainly inviting.`);
				}
			} else {
				if (eventSlave.anus === 0) {
					t.push(`${His} virgin asshole is certainly tempting.`);
				} else if (eventSlave.anus === 1) {
					t.push(`${His} tight asshole is certainly tempting.`);
				} else if (eventSlave.anus === 2) {
					t.push(`${His} experienced asshole is certainly tempting.`);
				} else {
					t.push(`${His} capacious asshole is certainly inviting.`);
				}
			}
			t.push(`${He}'s sore, so you spoon`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`${his} gravid`);
				} else {
					t.push(`${his} rounded`);
				}
				t.push(`body`);
			} else {
				t.push(him);
			}
			t.push(`gently in bed, fucking ${him} slowly to sleep.`);
			if (canDoVaginal(eventSlave)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(VCheck.Anal(eventSlave, 1));
			}
			t.push(`${He} falls asleep with a serene expression on ${his} face. <span class="mediumaquamarine">${His} trust in you has increased.</span>`);
			eventSlave.trust += 4;
			return t;
		}

		function chat() {
			t = [];
			t.push(`${eventSlave.slaveName} returns many hours later. ${He}'s obviously bone tired. When you meet ${him} at the entrance to your penthouse ${he}'s surprised to`);
			t.push(canSee(eventSlave) ? "see" : "find");
			t.push(`you, but ${he} gives you a little smile anyway. You bring ${him} back to your office, and ${he}'s clearly expecting to get fucked, so ${he}'s surprised when you hand ${him} a hot beverage and sit down on the couch with ${him}. ${He} relaxes quickly and chats with you about ${his} day, gossiping about all the private doings of all the prominent citizens who fucked ${his}`);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				t.push(`cunt`);
			} else if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
				t.push(`asshole`);
			} else {
				t.push(`mouth`);
			}
			t.push(`today.`);
			if (eventSlave.intelligence + eventSlave.intelligenceImplant > 50) {
				t.push(`${He}'s witty and holds up ${his} end of the conversation without straying from ${his} role as a slave.`);
			} else if (eventSlave.intelligence + eventSlave.intelligenceImplant >= -15) {
				t.push(`${He} has a few juicy items to share, and even while gossiping, ${he}'s mindful of ${his} role as a slave.`);
			} else {
				t.push(`${He} may be an idiot, but ${his} babble is amusing enough.`);
			}
			t.push(`Time flies, and when you finally stand up to continue with your evening, ${he} thanks you prettily for listening to ${him}`);
			if (eventSlave.belly >= 10000) {
				t.push(`as you help ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					t.push(`pregnant`);
				} else {
					t.push(`heavy`);
				}
				t.push(`body off the couch`);
			}
			t.push(t.pop() + ".");
			t.push(`<span class="hotpink">${His} devotion to you has increased.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
