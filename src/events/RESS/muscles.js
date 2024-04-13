App.Events.RESSMuscles = class RESSMuscles extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				hasAnyArms,
				s => s.muscles > 30,
				s => s.weight <= 10
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, hers, him, himself, girl
		} = getPronouns(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(`Early one morning,`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		if (!canWalk(eventSlave)) {
			t.push(`crawls`);
		} else if (shoeHeelCategory(eventSlave) > 1) {
			t.push(`totters`);
		} else if (eventSlave.belly >= 10000) {
			t.push(`waddles`);
		} else {
			t.push(`walks`);
		}
		t.push(`past your door stark naked, with a towel thrown over ${his} shoulder. ${He}'s clearly moving from the gym to the showers after a hard workout; ${he}'s quite the iron pumper and gets up before anyone to protect ${his} gains. ${He} notices your gaze, so ${he} subtly flexes for your benefit. Cords of muscle ripple along ${his} massive thighs,`);
		if (eventSlave.bellyPreg >= 15000) {
			// no abs
		} else if (eventSlave.bellyPreg >= 10000) {
			t.push(`pregnancy ruined abs,`);
		} else if (eventSlave.belly >= 10000) {
			t.push(`hints of what were once abs across ${his} ${bellyAdjective(eventSlave)} taut middle,`);
		} else if (eventSlave.belly >= 1500) {
			t.push(`broadening abs,`);
		} else {
			t.push(`washboard abs,`);
		}
		t.push(`ripped biceps, and strapping lats.`);
		if (eventSlave.dick > 3) {
			t.push(`${His} massive cock completes the picture.`);
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Reward ${him} for ${his} gains`, reward, fuckNote()),
			new App.Events.Result(`Take advantage of ${his} gains with a powerfuck`, powerfuck, fuckNote()),
			(isPlayerReceptive(eventSlave) && canPenetrate(eventSlave) && eventSlave.belly < 100000)
				? new App.Events.Result(`See if ${he} can put those gains to good use`, penetration, PCPenetrationWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Compliment ${his} gains and send ${him} on ${his} way`, compliment),
		]);

		function fuckNote() {
			if (V.PC.dick > 0) {
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					return `This option will take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
					return `This option will take ${his} anal virginity`;
				}
			}
			return null;
		}

		function reward() {
			let t = [];
			t.push(`You tell ${him} to spread ${his} towel on the floor and lie`);
			if (eventSlave.belly >= 5000) {
				t.push(`on ${his} side on it. You lie next to ${him} and`);
			} else {
				t.push(`face-down on it. You`);
			}
			t.push(`run your hands across ${his} sweaty ${V.seeRace === 1 ? eventSlave.race : ""} muscles before giving ${him} a thorough, skillful and very intense massage. ${He} moans and grunts as you work the lactic acid out of ${his} muscles, slowly reducing ${him} to a puddle of ripped sex slave. As you're rubbing ${him} down to finish the massage, ${he} meekly begs you to fuck ${him}.`);
			if (!canDoVaginal(eventSlave) && !canDoAnal(eventSlave)) {
				t.push(`You tell ${him} that's not an option and pull ${him} into a kiss instead. It's a strange sensation, this mass of muscle lying quietly still in your arms you, whimpering with delight as you gently make out with ${him}. Your wandering hands eventually tip ${him} over the edge; ${he} hugs you tight as ${he} shakes with orgasm. Once ${he} stops crushing you, you return to enjoying ${his} sweaty body.`);
			} else {
				t.push(`As ${he} lies still,`);
				if (V.PC.dick === 0) {
					t.push(`you lift one of ${his} legs and straddle yourself in to bring your groin against ${hers}. It's a strange sensation, this mass of muscle lying quietly still beneath you, whimpering with delight as you gently scissor yourself against ${him}. ${He} comes in no time at all. When ${he} does ${he} squeezes you between vice-like thighs, ${V.PC.vagina !== -1 ? "pressing your pussy deliciously and" : ""} bringing you to climax, too.`);
				} else {
					t.push(`you slowly push your cock into ${his}`);
					if (canDoVaginal(eventSlave)) {
						t.push(`pussy; ${he}'s so relaxed from the massage that it slides in easily.`);
						t.push(VCheck.Vaginal(eventSlave, 1));
						t.push(`It's a strange sensation, this mass of muscle lying quietly still beneath you, whimpering with delight as you gently penetrate ${him}. ${He} comes in no time at all. When ${he} does you happen to be halfway inside ${him}; ${he} wraps ${his} legs around you and pulls you into ${his} depths. You explode into ${him} as ${he} holds you in place with ${his} vice-like thighs.`);
					} else {
						t.push(`ass; ${he}'s so relaxed from the massage that it slides in easily.`);
						t.push(VCheck.Anal(eventSlave, 1));
						t.push(`It's a strange sensation, this mass of muscle lying quietly still beneath you, whimpering with delight as you gently take ${his} ass. ${He} comes in no time at all. When ${he} does you happen to be halfway inside ${him}; ${his} sphincter mercilessly squeezes your head while ${his} muscular buttocks clench your shaft between them. You explode into ${him}.`);
					}
				}
				if (eventSlave.dick > 0) {
					t.push(`As ${he} stands, ${his} now-softening penis drips cum.`);
				}
			}
			t.push(`<span class="devotion inc">${His} love for you has increased.</span>`);
			eventSlave.devotion += 4;
			return t;
		}

		function powerfuck() {
			let t = [];
			t.push(`It's time to see if ${he}'s got anything left in those sore ${V.seeRace === 1 ? eventSlave.race : ""} muscles. You push the towel off ${his} shoulder, take a lick of the delicious salty sweat along ${his} collarbone, and get to work. For the next hour, you put ${him} through a series of sexual positions that require ${him} to balance and support ${himself} in difficult positions. ${He} hangs from the ceiling, goes up on one tiptoe, and fucks in a handstand. ${He}'s as muscular inside as ${he} is outside.`);
			if (V.PC.dick === 0) {
				t.push(`You climax repeatedly, mixing your pussy juice with ${his} sweat all across ${his} body.`);
			} else {
				if (canDoVaginal(eventSlave)) {
					t.push(VCheck.Vaginal(eventSlave, 1));
					t.push(`You come repeatedly, and before long cum is dripping out of ${his} pussy as you continue.`);
				} else if (canDoAnal(eventSlave)) {
					t.push(VCheck.Anal(eventSlave, 1));
					t.push(`You come repeatedly, and before long cum is dripping out of ${his} ass as you continue.`);
				} else {
					t.push(`You come repeatedly, leaving ropes of your cum all across ${his} sweaty body.`);
				}
			}
			if (eventSlave.dick > 0) {
				t.push(`From position to position, ${his} erection adds its own fluids to the mess on the floor.`);
			}
			t.push(`By the end, ${he}'s shaking from muscle fatigue and panting ${his} gratitude. <span class="trust inc">${His} confidence in ${his} place has increased.</span>`);
			eventSlave.trust += 4;
			return t;
		}

		function penetration() {
			let t = [];
			t.push(`It's time to see if ${he}'s got anything left in those sore ${V.seeRace === 1 ? eventSlave.race : ""} muscles. You order ${him} to take you in a standing fuck${V.PC.belly >= 10000 ? ", a tall order given how pregnant you are" : ""}. Despite how exhausted ${he} is, ${he} manages to lift you and hilt ${himself} in your`);
			if (V.PC.vagina !== -1) {
				if (V.PC.vagina === 0){
					t.push(`virgin pussy, <span class="virginity loss">tearing through your hymen</span> in the way.`);
					V.PC.vagina++;
				} else {
					t.push("pussy.");
				}
			} else {
				if (V.PC.anus === 0){
					t.push(`untouched anus, <span class="virginity loss">taking your anal virginity</span> in the way.`);
					V.PC.anus++;
				} else {
					t.push("ass.");
				}
			}
			t.push(`You feel ${his} quivering trying to hold you up, so you permit ${him} to take you against the wall; a welcome respite for the`);
			if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg >= 3000) {
					if (eventSlave.belly >= 100000) {
						t.push("massively");
					} else if (eventSlave.belly >= 10000) {
						t.push("hugely");
					}
					t.push("pregnant");
				} else if (eventSlave.bellyFluid >= 5000) {
					t.push(`${eventSlave.inflationType}-filled`);
				} else {
					t.push(`${bellyAdjective(eventSlave)} bellied`);
				}
			}
			t.push("sweaty");
			if (eventSlave.physicalAge > 30) {
				t.push(`MILF.`);
			} else if (eventSlave.physicalAge > 17) {
				t.push(`slave${girl}.`);
			} else if (eventSlave.physicalAge > 12) {
				t.push(`teenager.`);
			} else {
				t.push(`kid.`);
			}
			t.push(`${He} dominantly fucks you, ${his} muscles flexing powerfully with every thrust. You're no slouch when it comes to muscles yourself, so when you feel ${him} tense with orgasm you wrap your legs around ${him} and hilt ${him} deep inside you. This only encourages ${him} to fuck you harder, quickly bring you to climax as well. ${He} gently carries you to your couch, where ${he} slides in behind you for a little post-coitus spooning. You definitely appreciate ${his} gains after such a good fuck. <span class="trust inc">${His} confidence in ${his} place has increased,</span> as has ${his} <span class="devotion inc">love for you.</span>`);
			eventSlave.trust += 4;
			eventSlave.devotion += 4;
			if (V.PC.vagina === -1) {
				seX(eventSlave, "penetrative", V.PC, "anal");
			} else {
				seX(eventSlave, "penetrative", V.PC, "vaginal");
			}
			if (canImpreg(V.PC, eventSlave)) {
				knockMeUp(V.PC, 50, 2, eventSlave.ID);
			}
			return t;
		}

		function compliment() {
			return `${He} finishes posing with an impressive display of ${his} obliques. ${He} walks powerfully to the shower, ${his} ripped buttocks delineating each step. The shower is glass-walled. As ${he} washes, several of your other slaves are waking up and starting their days. They can't help but stare as ${eventSlave.slaveName} soaps ${himself}. ${eventSlave.slaveName} enjoys the attention.`;
		}
	}
};
