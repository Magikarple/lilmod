App.Events.RESSObedientIdiot = class RESSObedientIdiot extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.cockFeeder === 0
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canMove,
				hasAnyArms,
				s => s.intelligence + s.intelligenceImplant < -50,
				s => s.devotion <= 50,
				s => s.devotion > -20 || s.trust < -20
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {HeA, heA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		const {say, title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`${capFirstChar(V.assistant.name)} breaks in on your work at your desk.`);
		t.push(App.UI.DOM.combineNodes(`"${V.assistant.personality <= 0 ? properTitle() : "Sweetheart"}," ${heA} says, "`, App.UI.DOM.slaveDescriptionDialog(eventSlave)));
		t.push("is having trouble figuring out the meal dispenser again.\"");
		if (V.assistant.personality <= 0) {
			t.push(`The report is deadpan, but ${heA} brings up a visual feed.`);
		} else {
			t.push(`${HeA} brings up a visual feed. "Poor baby!" ${heA} exclaims.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`Slaves are supposed to place a cup under a spigot, which detects the cup's presence and dispenses the appropriate nutrition for the ${girl}. Unfortunately this concept seems a little tough for ${eventSlave.slaveName}. With no one around to ask for help, ${he} has resorted to trying to suck food out of the spigot with ${his} mouth. With no cup to be detected, ${he}'s not getting very far, and is getting bitterly frustrated.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Give ${him} something more appropriate to suck on`, suck),
			new App.Events.Result(`Reassure ${him} and get ${him} to slow down`, reassure),
			new App.Events.Result(`Spank the stupid out of ${him}`, spank),
			V.arcade > 0
				? new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: new App.Events.Result()
		]);

		function suck() {
			t = [];

			t.push(`${capFirstChar(V.assistant.name)}, as usual, has to give the stupid slut considerable coaching to get ${him} to your office without getting lost. This is a near-miraculous imbecility, as the penthouse is expressly designed to make it nearly impossible to get anywhere from anywhere else without passing by the office door. ${He} understands orders to`);
			if (PC.dick === 0) {
				t.push(`perform cunnilingus, though, and gets down to it eagerly enough. When ${he} finishes the job, ${he} wipes ${his} mouth and then looks up at you doubtfully.`);
			} else {
				t.push(`suck a dick, though, and gets down to it eagerly enough. When ${he} finishes the job, ${he} busily swallows every drop of your ejaculate and then looks up at you doubtfully.`);
			}
			if (!canTalk(eventSlave)) {
				t.push(`${He} slowly spells out a question with ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"}, asking if ${he}'s a good slave.`);
			} else {
				t.push(`${He} mumbles a hesitant question:`);
				t.push(Spoken(eventSlave, `"${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}, am I a good slave?"`));
			}
			t.push(`You tell ${him} that ${he} is, running a hand ${eventSlave.hStyle.includes("bald") ? `across ${his} bald scalp` : `through ${his} hair`}. ${He} seems <span class="devotion inc">reassured,</span> and <span class="trust inc">thankful</span> when you give ${him} a cup of ${his} proper rations from your own hand.`);

			eventSlave.devotion += 2;
			eventSlave.trust += 2;
			seX(eventSlave, "oral", PC, "penetrative");
			return t;
		}

		function reassure() {
			t = [];

			t.push(`${He}'s so intent on trying to suck off the food dispenser that ${he} doesn't ${canHear(eventSlave) ? "hear" : "notice"} you enter the room. ${He} starts with surprise when you encircle ${his}`);
			if (eventSlave.belly >= 1500) {
				t.push(`${belly} ${eventSlave.bellyPreg >= 1500 ? "pregnant" : ""} belly`);
			} else {
				t.push("waist");
			}
			t.push(`with your arms and ${canHear(eventSlave) ? `murmur reassuringly in ${his} ear` : `give ${him} a reassuring squeeze`}.`);
			if (canTalk(eventSlave)) {
				t.push(`${He} ${say}s sadly,`);
				t.push(Spoken(eventSlave, `"Sorry ${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}. I'm trying to be a good slave but it's hard."`));
			} else {
				t.push(`${He} sadly gestures at the spigot and then flicks ${his} own head.`);
			}
			t.push(`You kindly tell ${him} that you know ${he}'s trying, and that that's what really matters.`);
			if (canTalk(eventSlave)) {
				t.push(Spoken(eventSlave, `"Really, ${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}?"`));
				t.push(`${he} asks hopefully.`);
			} else {
				if (hasBothArms(eventSlave)) {
					t.push(`${His} hands awkwardly ask, "Really?"`);
				} else {
					t.push(`${His} hand awkwardly asks, "Really?"`);
				}
			}
			t.push(`You whisper into ${his} ear that yes, ${he} will be all right as long as ${he} does ${his} best. ${He} wiggles ${his} butt against you a little and giggles`);
			if (PC.dick !== 0) {
				t.push(`at the responding stiffness ${he} feels between ${his} buttocks. ${He} shimmies down and takes you into ${his} mouth${PC.vagina > -1 ? ` and does ${his} best to reach the top of your pussy with the tip of ${his} tongue` : ""},`);
			} else {
				t.push(`as you shove ${him} to ${his} knees. ${He} shimmies down and eats you out,`);
			}
			t.push(`${canSee(eventSlave) ? "looking you in the eyes the whole time and" : ""} <span class="hotpink">smiling</span> as much as ${he} can manage with ${PC.dick !== 0 ? `a dick in ${his} mouth` : `${his} tongue working your clit`}.`);

			eventSlave.devotion += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return t;
		}

		function spank() {
			t = [];

			t.push(`${He}'s so intent on trying to suck off the food dispenser that ${he} doesn't ${canHear(eventSlave) ? "hear" : "notice"} you enter the room. ${He} starts with surprise when you seize ${him} and push ${him}`);
			if (eventSlave.belly >= 300000) {
				t.push(`over ${his} ${belly} belly, face-down into the counter.`);
			} else {
				t.push(`face-down across the counter.`);
			}
			t.push(`After making ${him} confirm that ${canHear(eventSlave) ? `${he} can hear you` : `${he}'s paying attention`}, you patiently repeat the very simple instructions for getting meals from the kitchen. Then, you tell ${him} to repeat them. ${He} manages the first step fine and has completely forgotten the second. The moment ${he} hesitates, ${he} has an instant to ${canHear(eventSlave) ? "hear" : "feel"} the rush of air trying to get out of the way of your speeding palm before it contacts the ${eventSlave.skin} skin of ${his} buttocks. ${He} writhes and cries and promises to try harder, but ${his} poor rear end is almost raw before ${he} gets it all right. ${He} leaves the kitchen snuffling sadly to ${himself}, but in the coming days ${he} really does seem to <span class="gold">do ${his} best</span> to avoid another beating.`);

			eventSlave.trust -= 5;
			return t;
		}

		function arcade() {
			t = [];

			t.push(`${eventSlave.slaveName} screams and begs when ${he} realizes what ${his} punishment for being stupid is to be, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				t.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				t.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				t.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${belly} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				t.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`${His} ${eventSlave.bellyPreg >= 3000 ? "pregnant" : `${belly}`} body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				t.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				t.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			t.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} ${eventSlave.skin} butt as ${he} wriggles desperately against ${his} restraints.`);

			assignJob(eventSlave, "be confined in the arcade");
			eventSlave.sentence = 4;
			return t;
		}
	}
};
