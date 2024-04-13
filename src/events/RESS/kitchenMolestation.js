// cSpell:ignore rapey, tighter-assed

App.Events.RESSKitchenMolestation = class RESSKitchenMolestation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cockFeeder > 0,
			() => V.universalRulesConsent === 0
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.slaves !== 0,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.devotion > 50,
				s => s.fetish === "sadist" || s.fetish === "dom" || s.energy > 95,
				s => canPenetrate(s) || s.dick === 0
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {
			HeU, heU, hisU, himU, himselfU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
		const belly = bellyAdjective(eventSlave);
		const targetJobs = ["be a servant", "be a subordinate slave", "get milked", "learn in the schoolroom", "please you", "rest in the spa", "rest", "serve in the club", "serve the public", "take classes", "whore", "work a glory hole", "work as a servant", "work in the brothel"];
		const targetSlaves = V.slaves.filter(s => targetJobs.includes(s.assignment) && s.ID !== eventSlave.ID);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is a horny bitch, and ${he} isn't particularly picky about how ${he} gets off. Since other slaves are not allowed to resist ${his} little molestations, ${he}'s taken to haunting the kitchen around mealtimes. Since everyone has to suck their meals out of the phallic food dispensers, every slave has to spend some minutes of every day in the kitchen with their face to the wall and their rear defenseless. ${eventSlave.slaveName} does ${his} best to arrive as early as possible and eat as rapidly as possible so ${he} can then play with anyone who's slower to finish.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`You decide to stop by to see ${his} method at work. By the time you arrive, ${he}'s already eaten and orgasmed at least once. As you spectate, ${he}`);
		if (canPenetrate(eventSlave) && eventSlave.prostate > 0) {
			t.push(`pushes a couple of fingers up ${his} own ass to use prostate stimulation to force ${himself} hard again, and once this is accomplished, happily turns to select a slow eater to fuck.`);
		} else {
			t.push(`languidly plays with ${himself}, running ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} over the various vulnerable butts before picking a victim to roughly finger fuck.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Improve on ${his} abusive little game`, improve),
			canDoAnal(eventSlave)
				? new App.Events.Result("The rule about consent works both ways", turnTables, analVirginWarning())
				: new App.Events.Result()
		]);

		function improve() {
			t = [];
			let virgins;
			let chaste;
			let anusOnly;
			let doubleAnal;
			let pussyOnly;
			let doubleVaginal;
			let subLove;

			t.push(`You leave for the moment, but appear at the next mealtime before even ${he} does. You shut off all the phallic feeders but one, and make an announcement. You decree that just for this one meal, ${eventSlave.slaveName} is to lie in front of the one functional feeder, ${canPenetrate(eventSlave) ? `${his} cock in the air` : `with a dildo jutting up from ${his} crotch`} in order to eat, each slave must ride ${eventSlave.slaveName} for as long as it takes to suck down their ${eventSlave.belly >= 5000 ? `meal (given the ${belly} mass jutting from ${his} middle, it should be quite the sight)` : "meal"}.`);
			t.push(`${eventSlave.slaveName} gapes at you openmouthed for a long moment, looking like ${he} wants to <span class="hotpink">declaim a speech of thanks,</span> but you cut ${him} off by pointing peremptorily at ${his} place; ${he} almost runs over, ${his} <span class="mediumaquamarine">trust in your whim</span> nearly absolute. But the true shape of your plan isn't apparent yet. When the first slave seats ${himselfU} on ${eventSlave.slaveName} and starts sucking off the dispenser dildo, you crouch behind ${himU} and insert yourself as well; the bitch is now airtight. ${HeU} gags and splutters with the discomfort but keeps working away until ${heU} gets ${hisU} meal down and struggles off the three phalluses ${heU} has in ${himU}. The next in line gets to it with some trepidation: and so it goes, slave by slave.`);

			for (const s of targetSlaves) {
				if (hasAnyLegs(s) && s.relationship !== -3) {
					if (canDoAnal(s) && canDoVaginal(s)) {
						if (s.anus === 0 && s.vagina === 0) {
							virgins = true;
						} else if (s.vagina === 0) {
							virgins = true;
							anusOnly = true;
							seX(s, "anal", eventSlave, "penetrative");
							seX(s, "anal", PC, "penetrative");
							if (canImpreg(s, PC)) {
								knockMeUp(s, 5, 1, -1);
							}
							if (canImpreg(s, eventSlave)) {
								knockMeUp(s, 5, 1, eventSlave.ID);
							}
							if (s.anus === 1) {
								s.trust -= 2;
								doubleAnal = true;
							}
						} else if (s.anus === 0) {
							virgins = true;
							pussyOnly = true;
							seX(s, "vaginal", eventSlave, "penetrative");
							seX(s, "vaginal", PC, "penetrative");
							if (canImpreg(s, PC)) {
								knockMeUp(s, 5, 0, -1);
							}
							if (canImpreg(s, eventSlave)) {
								knockMeUp(s, 5, 0, eventSlave.ID);
							}
							if (s.vagina === 1) {
								s.trust -= 2;
								doubleVaginal = true;
							}
						} else {
							seX(s, "anal", eventSlave, "penetrative");
							seX(s, "vaginal", eventSlave, "penetrative");
							if (canImpreg(s, PC)) {
								knockMeUp(s, 5, 2, -1);
							}
							if (canImpreg(s, eventSlave)) {
								knockMeUp(s, 5, 1, eventSlave.ID);
							}
						}
					} else if (canDoVaginal(s)) {
						pussyOnly = true;
						seX(s, "vaginal", eventSlave, "penetrative");
						seX(s, "vaginal", PC, "penetrative");
						if (canImpreg(s, PC)) {
							knockMeUp(s, 5, 0, -1);
						}
						if (canImpreg(s, eventSlave)) {
							knockMeUp(s, 5, 0, eventSlave.ID);
						}
						if (s.vagina === 1) {
							s.trust -= 2;
							doubleVaginal = true;
						}
					} else if (canDoAnal(s)) {
						anusOnly = true;
						seX(s, "anal", eventSlave, "penetrative");
						seX(s, "anal", PC, "penetrative");
						if (canImpreg(s, PC)) {
							knockMeUp(s, 5, 1, -1);
						}
						if (canImpreg(s, eventSlave)) {
							knockMeUp(s, 5, 1, eventSlave.ID);
						}
						if (s.anus === 1) {
							s.trust -= 2;
							doubleAnal = true;
						}
					} else {
						chaste = true;
					}
					if (s.fetishKnown === 1 && s.fetish === Fetish.SUBMISSIVE) {
						s.devotion++;
						subLove = true;
					}
				}
			}

			if (virgins) {
				t.push(`You let your virgins ${chaste ? "and chaste slaves" : ""} hold their thighs tight together for a little frottage rather than deflowering their holes like this.`);
			} else if (chaste) {
				t.push(`Your chaste slaves hold their thighs tight together for a little frottage should they lack the ability to accommodate.`);
			}
			if (anusOnly) {
				t.push(`Those slaves without pussies are forced to take both you and ${eventSlave.slaveName} up the butt at once.`);
				if (doubleAnal) {
					t.push(`Experienced assholes can take the strain just fine, but your tighter-assed slaves are <span class="gold">frightened</span> by the anal pain they suffer.`);
				}
			}
			if (pussyOnly) {
				t.push(`Slaves with off-limit assholes quickly find both you and ${eventSlave.slaveName} delving the depths of their cunts.`);
				if (doubleVaginal) {
					t.push(`Experienced sluts can take the double penetration just fine, but your tighter slaves are <span class="gold">frightened</span> by the amount of stretching they are forced to undergo.`);
				}
			}
			if (subLove) {
				t.push(`Your subs on the other hand think this is <span class="hotpink">a meal worth remembering.</span>`);
			}

			eventSlave.devotion += 4;
			eventSlave.trust += 4;
			return t;
		}

		function turnTables() {
			t = [];

			t.push(`You tell ${eventSlave.slaveName} to get up on the kitchen counter and spread ${his} legs. ${He} catches something in the tone of your voice and looks frightened, but obeys. You then make several conversational observations, as though for no particular reason, to the rest of the slaves. First, you point out, the consent rule works for everyone: they, hypothetically, would not need to ask ${eventSlave.slaveName} ${his} permission to fuck ${his} ass, just like ${he} doesn't have to ask their permission to molest them during meals. (At this ${eventSlave.slaveName}'s fear deepens into obvious <span class="gold">terror.</span>) Second, you have decided ${eventSlave.slaveName} will not be getting down off the counter until everyone's done with their meals — and anything else they wish to do in the kitchen. And third, you conclude, any number of large strap-ons and dildos can be found in the kitchen cabinets. There is a general rush for these; you tell ${eventSlave.slaveName}, whose`);
			if (eventSlave.lips > 40) {
				t.push(`bimbo`);
			} else if (eventSlave.lips > 20) {
				t.push(`big`);
			} else if (eventSlave.lips > 10) {
				t.push(`soft`);
			}
			t.push(`lips are quivering, to come see you after ${he}'s done here. About an hour later, ${he} hobbles into your office, and you tell ${him} to show you ${his} anus. ${His} longtime targets for mealtime molestation were not merciful; they weren't stupid enough to damage ${him}, but that's one well-gaped butthole. You fuck it anyway, and ${he}'s too tired and desensitized to care. Your less trusting slaves carefully consider the rules, and realize that there's a <span class="mediumaquamarine">built-in mechanism for correction:</span> if anyone gets too rapey, they can rape them right back.`);
			t.push(VCheck.Anal(eventSlave, 20));

			if (canGetPregnant(eventSlave) && eventSlave.mpreg === 1) {
				const pregSources = targetSlaves.filter(s => canImpreg(eventSlave, s));
				if (pregSources.length > 0) {
					knockMeUp(eventSlave, 50, 1, pregSources.random().ID);
				}
			}
			for (const slave of targetSlaves) {
				if (slave.trust < 50) {
					slave.trust += 4;
				}
			}
			if (eventSlave.anus === 1) {
				t.push(`Poor ${eventSlave.slaveName}'s butthole <span class="lime">isn't quite the same</span> afterward.`);
				eventSlave.anus += 1;
			}
			eventSlave.trust -= 5;
			return t;
		}

		function analVirginWarning() {
			if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
