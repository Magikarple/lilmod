App.Events.RESSImScared = class RESSImScared extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canMove,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.trust < -50,
				s => s.devotion <= 50,
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

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`During ${his} weekly inspection,`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`has trouble following the routine orders that position ${him} so you can examine ${his} body. The cause is not difficult to determine: ${he}'s so cripplingly terrified that ${he}'s having difficulty functioning. ${He} seems to be trying to obey you, but ${he}'s so scared that ${his} mind is having trouble translating your simple verbal commands into physical obedience. You ask ${him} what ${he}'s so frightened of. The question stuns ${him}, and ${he} ${canSee(eventSlave) ? "stares at" : "faces"} you in mute horror, looking even more terrified than ${he} has up to this point and completely devoid of any idea how to respond. You order ${him} to respond, and this starts ${him} out of ${his} fugue. ${He} begins to cry, makes two false starts, sobs, and then begins forcing out words.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`"E-e-everything," ${he} cries. "${Spoken(eventSlave, "I'm s-so s-sorry b-but I c-can't help")}," ${he} chokes on a sob and hiccups, "${Spoken(eventSlave, "help it. This, this place, being a sex slave")},`);
		switch (eventSlave.rules.punishment) {
			case "confinement":
				t.push(Spoken(eventSlave, "b-being sh-shut up in the d-dark"));
				break;
			case "whipping":
				t.push(Spoken(eventSlave, "b-being wh-wh-whip-ped"));
				break;
			case "chastity":
				t.push(Spoken(eventSlave, "h-having my p-parts locked up in ch-chastity"));
				break;
			default:
				t.push(Spoken(eventSlave, "n-never knowing what th-the p-punishment will be"));
		}
		t.push(`${Spoken(eventSlave, `wh-when I'm bad, e-everything, ${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}. Oh, oh, I'm sorry, p-please, I'm sorry I, I'm like this, I'm crying, p-please ${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}, please don't...`)}" ${He} trails off, giving you a look of supplication.`);
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Punish ${him}`, punish),
			new App.Events.Result(`Comfort ${him}`, comfort),
			(V.dairyRestraintsSetting === 2
				? new App.Events.Result(`Threaten ${him} with the industrial Dairy`, industrial)
				: new App.Events.Result()),
			(V.seeExtreme === 1
				? new App.Events.Result(`Threaten to convert ${him} into a Fuckdoll`, fuckdoll)
				: new App.Events.Result())
		]);

		function punish() {
			t = [];

			t.push(`${He} obviously knows that breaking down like this would displease you, but you patiently explain that it's against the rules anyway. ${He} cries harder, nodding through ${his} tears. ${He} knows that interrupting you to beg would be profoundly stupid, so ${he} clasps ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} in wordless submission. You tell ${him} that ${he}'s to keep ${himself} under control; if ${he} fails, ${he} will be punished. Since ${he} failed, ${he} will now suffer ${his} standard punishment, and be`);

			switch (eventSlave.rules.punishment) {
				case "confinement":
					t.push(`shut up in a box. <span class="gold">${He} breaks down,</span> falling to ${his} knees, begging abjectly for mercy.`);
					if (eventSlave.belly >= 100000 || eventSlave.boobs > 25000 || eventSlave.weight > 190) {
						t.push(Spoken(eventSlave, `"It's too cramped in there,"`));
					} else {
						t.push(Spoken(eventSlave, `"It's dark in there,"`));
					}
					t.push(`${he} screams as you open the box for ${him}. ${He} knows that if ${he} doesn't climb in, it'll be longer before ${he}'s let out, so ${he} does, scrabbling inside and sobbing desperately as you close the lid.`);
					break;
				case "whipping":
					t.push(`whipped. <span class="gold">${He} breaks down,</span> falling to ${his} knees, begging abjectly for mercy. "It'll h-hu-hurt," ${he} blubbers weakly as you attach ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} to shackles high on the office wall. The first stroke across ${his} buttocks draws a long shriek out of ${him}.`);
					break;
				case "chastity":
					t.push(`locked up in chastity. <span class="gold">${He} breaks down,</span> falling to ${his} knees, begging abjectly for mercy. "I c-can't," ${he} moans. "I can't take it. I can't stand it." As you lock the chastity onto ${him}, ${he} sobs inconsolably, knowing that any arousal will be torturous until ${he}'s released.`);
					break;
				default:
					t.push(`gagged, since that's the appropriate castigation for failure to control ${his} mouth and deportment. ${He} tries to behave, but <span class="gold">breaks down</span> as you slide a dildo gag into ${his} throat, choking and struggling to breathe as ${he} tries to cry past it.`);
			}
			t.push(`The thing ${he}'s most frightened of is that ${he} won't be able to control ${his} fear in the future, and will continue to suffer.`);

			eventSlave.trust -= 5;
			return t;
		}

		function comfort() {
			t = [];

			t.push(`You rise from behind your desk, and ${eventSlave.slaveName} collapses to the floor, sure that ${he}'s about to be severely punished. ${He}'s shocked to feel your arms encircle ${him} as you kneel down beside ${him} and embrace ${his} huddled form. You pull ${his} head`);
			if (V.PC.boobs >= 1400) {
				t.push(`against your enormous, ${PC.boobsImplant !== 0 ? "hard" : "soft"} breasts,`);
			} else if (V.PC.boobs >= 1200) {
				t.push(`against your huge ${PC.boobsImplant !== 0 ? "firm" : "soft"} breasts,`);
			} else if (V.PC.boobs >= 1000) {
				t.push(`against your big ${PC.boobsImplant !== 0 ? "firm" : "soft"} breasts,`);
			} else if (V.PC.boobs >= 300) {
				t.push(`against your soft breasts,`);
			} else if (V.PC.title === 0) {
				t.push(`against your flat chest,`);
			} else {
				t.push(`into your shoulder,`);
			}
			t.push(`stroking it reassuringly and murmuring kindness. ${He} clings to you, mostly for lack of any other comfort in the whole world, and sobs convulsively, <span class="mediumaquamarine">${his} terror flowing out of ${him}</span> in a torrent as you gently rub ${his} back. When ${he}'s mostly cried ${himself} out, you tell ${him} that ${he}'ll be all right. You're sure ${he}'ll be a good slave one day. You understand that ${his} life is hard. ${He}'ll make mistakes, and you'll punish ${him} for them, but that's part of slave training, and that's all right. If ${he} does ${his} best, ${he}'ll be all right. ${He} sniffles, cuffing tears away. "${Spoken(eventSlave, `Th-thank you, ${eventSlave.rudeTitle === 1 ? PoliteRudeTitle(eventSlave) : Master}, I'll d-do my b-best`)}," ${he} manages to ${say}.`);

			eventSlave.trust += 5;
			return t;
		}

		function industrial() {
			t = [];
			const watchListenFreezes = canSee(eventSlave) ? "watches" : (canHear(eventSlave) ? "listens" : "freezes");

			t.push(`You grab ${him} by the scruff of ${his} neck and drag ${him} down to ${V.dairyName}. ${He} tries to control ${himself}, but breaks down in tears when you haul ${him} to a stop, forcing ${him} to get a good`);
			if (canSee(eventSlave)) {
				t.push(`look at the`);
			} else if (canHear(eventSlave)) {
				t.push(`listen of the sound of`);
			} else {
				t.push(`feel for the omnipresent aura of`);
			}
			t.push(`rows of bodies being mercilessly milked. You explain that if ${he} continues to fail to control ${himself}, your patience with ${his} will eventually expire, and you'll be forced to immure ${him} here. ${canSee(eventSlave) ? "Indicating" : `Facing ${him} towards`} a slave who's being`);
			if (eventSlave.balls > 0 && V.dairyStimulatorsSetting === 2) {
				t.push(`cockmilked by the machines, you tell ${eventSlave.slaveName} to pay close attention. ${He} ${watchListenFreezes} in horror as a dildo the size of ${his} forearm slides in and out of the slave's rectum, pounding it harder and harder until the slave stiffens and the transparent tubing coming off its cockhead whitens with cum. As the slave relaxes slightly in the restrains, the powerful milkers continue their relentless tugging at ${his} gigantic udders.`);
				if (!canSee(eventSlave)) {
					t.push(`As the dildo begins its efforts to loose a second cumming, you grab the horrified slave's hands and push them to the cow's throbbing dick just in time for ${him} to feel the ejaculate forced out by its unwilling orgasm.`);
				}
				t.push(`You run a hand down to ${eventSlave.slaveName}'s own balls and, squeezing them slightly, tell ${him} that unless ${he} wants ${his} ass ruined by constant machine rape, ${his} tits turned into immobilizing milk factories and ${his} balls drained of every last drop of seed,`);
			} else if ((eventSlave.ovaries === 1 || eventSlave.mpreg === 1) && V.dairyPregSetting === 2) {
				t.push(`used for reproduction by the machines, you tell ${eventSlave.slaveName} to pay close attention. ${He} ${watchListenFreezes} in horror as a dildo the size of ${his} forearm fucks the slave's enormous cunt, keeping it as gaped as possible to ease birth and constantly ejaculating preparatory drugs against ${his} cervix. The slave is gigantically pregnant. You tell ${eventSlave.slaveName} that this is the vaginal treatment ${he} can expect when pregnant; when impregnation is required, the dildos ejaculate more than a liter of cum a minute.`);
				if (!canSee(eventSlave)) {
					t.push(`As the dildo retracts from the cow's gaping cunt, you grab the horrified slave's hands and push them to its gravid middle just in time for ${him} to feel a massive contraction.`);
				}
				t.push(`You run a hand down to ${eventSlave.slaveName}'s own middle and, patting it gently, tell ${him} that unless ${he} wants ${his} womb converted into an industrial component,`);
			} else if ((eventSlave.ovaries === 1 || eventSlave.mpreg === 1) && V.dairyPregSetting === 3) {
				t.push(`used for mass reproduction by the machines, you tell ${eventSlave.slaveName} to pay close attention. ${He} ${watchListenFreezes} in horror as a dildo the size of ${his} forearm fucks the slave's cavernous cunt, keeping it as gaped as possible to ease birth and constantly ejaculating preparatory drugs against ${his} tortured cervix. The slave is absolutely enormous, more a taut sphere of a belly than a person; so pregnant that the children within ${his} are visibly forced to bulge the skin covering ${his} straining womb by their sisters. You tell ${eventSlave.slaveName} that this is the treatment ${he} can expect when pregnant here; when impregnation is required, the dildos ejaculate more than a liter of cum a minute.`);
				if (!canSee(eventSlave)) {
					t.push(`As the cow takes the huge dildo absentmindedly, you grab the horrified slave's ${hasBothArms(eventSlave) ? "hands" : "hand"} and push ${hasBothArms(eventSlave) ? "them" : "it"} to its gravid middle, forcing ${him} to feel the children squirming within its packed womb. ${He} squeals in terror at the feeling of so many babies moving under ${his} fingers.`);
				}
				t.push(`You run a hand down to ${eventSlave.slaveName}'s own middle and, patting it gently, tell ${him} that unless ${he} wants to become an industrial breeder,`);
			} else {
				t.push(`drained of ${his} milk, you tell ${eventSlave.slaveName} to pay close attention. ${He} ${watchListenFreezes} in horror as the slave's gigantic breasts are massaged and squeezed, while the milkers attached to ${his} absurd nipples tug and pull with industrial power. ${He} can't ${canSee(eventSlave) ? "look away; the orbs of jiggling flesh being manipulated are each as big as the slave's torso" : "shut out the sound of those enormous jiggling orbs of flesh being so roughly manipulated"}. It's good for milk production to drain slaves completely on occasion, and the machine doesn't stop until every drop is wrung from both udders.`);
				if (!canSee(eventSlave)) {
					t.push(`You force the horrified slave's ${hasBothArms(eventSlave) ? "hands" : "hand"} onto its breasts so that ${he} may get a good sense of just how big and swollen they are and how hard the milker is pulling at them.`);
				}
				t.push(`You run a hand over to ${eventSlave.slaveName}'s own breast and, teasing ${his} nipple, tell ${him} that unless ${he} wants to experience that twice a day,`);
			}
			t.push(`${he} had better behave ${himself}. ${He} nods furiously, <span class="gold">terrified beyond the ability to speak.</span>`);

			eventSlave.trust -= 8;
			return t;
		}

		function fuckdoll() {
			t = [];

			t.push(`You order a Fuckdoll brought to your office. ${eventSlave.slaveName} `);
			if (canSee(eventSlave)) {
				t.push(`watches it totter in,`);
			} else if (canHear(eventSlave)) {
				t.push(`listens to the clicks of its approaching heels and the ominous squeaking of its latex shell,`);
			} else {
				t.push(`feels the uncomfortable latex skin of its suit when it brushes up against ${him},`);
			}
			t.push(`automatically following the tugs on its leash and the tonal commands passed by its suit. ${He} already understands the implicit threat, and ${he} shivers uncontrollably, <span class="gold">almost falling to ${his} knees in fear.</span> Not content with that, you tell ${him} that ${he}'s trying your patience with ${his} behavior. If ${he} doesn't control ${himself} better in the future, you'll give up on ${him} and convert ${him} into a Fuckdoll. At the spoken threat ${eventSlave.slaveName} does collapse, but you order ${him} to get back to ${his} feet and ${canSee(eventSlave) ? "watch" : "pay attention"}. ${He} does, shakily, tears streaming down ${his} face as you put the Fuckdoll on all fours, as though it were about to take dick. Its`);
			if (eventSlave.vagina > -1) {
				t.push(`holes are pointed straight at ${eventSlave.slaveName}'s face,`);
				if (canSee(eventSlave)) {
					t.push(`and ${he} can't avoid seeing how loose and used they look.`);
				} else {
					t.push(`so you grab both ${his} hands and force one into each of its blown out holes. ${eventSlave.slaveName} shrieks in horror at the recognizable sensation.`);
				}
			} else {
				t.push(`rear hole is pointed straight at ${eventSlave.slaveName}'s face,`);
				if (canSee(eventSlave)) {
					t.push(`and ${he} can't avoid seeing how loose and used it looks.`);
				} else {
					t.push(`so you grab both ${his} hands and force them into its blown out ass. ${eventSlave.slaveName} shrieks in horror at the recognizable sensation.`);
				}
			}
			t.push(`Suddenly, you activate the Fuckdoll's suit's punishment systems. It does not and cannot scream, but `);
			if (canSee(eventSlave)) {
				t.push(`a slight stiffening of its posture communicates extreme anguish, and its sphincter spasms tightly closed with obviously involuntary force.`);
			} else {
				t.push(`the sudden, pitiful attempt to clamp down on ${his} arms makes it perfectly clear that you just forced it to undergo extreme anguish.`);
			}
			t.push(`${eventSlave.slaveName} is almost incapacitated by terror.`);

			eventSlave.trust -= 8;
			return t;
		}
	}
};
