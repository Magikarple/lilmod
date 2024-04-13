// cSpell:ignore hurn

App.Events.RETSSadisticDescription = class RETSSadisticDescription extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 0,
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.anus > 0,
				canTalk,
				canWalk,
				canHear,
				hasAnyArms,
				s => s.devotion > 50,
				s => s.fetish === "sadist" || s.fetish === "dom" || s.energy > 95,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canTalk,
				canSee,
				canHear,
				isSlaveAvailable,
				s => s.devotion <= 20,
				s => (s.fetish !== "buttslut" || s.fetishKnown === 0),
				s => s.anus === 0,
				canDoAnal,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";
		const {
			He2, he2, his2, him2, hers2, girl2, himself2
		} = getPronouns(subSlave).appendSuffix("2");
		const {
			HeP, heP, hisP
		} = getPronouns(V.PC).appendSuffix("P");

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);
		node.appendChild(artDiv);

		seX(subSlave, "anal", eventSlave, "penetrative");

		let t = [];

		t.push(`You look in on your slaves as a group of them heads for bed.`);
		t.push(App.UI.DOM.slaveDescriptionDialog(subSlave));
		t.push(`finds`);
		t.push(contextualIntro(subSlave, eventSlave, true));
		t.push(`blocking the way to ${hers2}. Poor ${subSlave.slaveName} cringes at ${eventSlave.slaveName}'s predatory expression, but the horny slave doesn't pounce at once. Instead, ${he} starts to walk around ${subSlave.slaveName}, whose ${subSlave.skin} body is nude for bed, groping and prodding ${him2} as ${subSlave.slaveName} shivers with fear. Finally ${eventSlave.slaveName} sidles up behind ${subSlave.slaveName},`);
		if (eventSlave.belly >= 5000) {
			t.push(`until ${his} bulging belly pushes into ${his2} back, before`);
		}
		t.push(`snaking ${his} ${arms} around ${subSlave.slaveName}'s`);
		if (subSlave.bellyPreg >= 10000) {
			t.push(`pregnant`);
		} else if (subSlave.weight > 95) {
			t.push(`fat`);
		} else if (subSlave.bellyPreg >= 1500) {
			t.push(`pregnant`);
		} else if (subSlave.weight > 10) {
			t.push(`chubby`);
		} else if (subSlave.muscles > 60) {
			t.push(`ripped`);
		} else if (subSlave.muscles > 5) {
			t.push(`toned`);
		} else if (subSlave.weight >= -10) {
			t.push(`trim`);
		} else {
			t.push(`skinny`);
		}
		t.push(`waist to cup ${his2}`);
		if (subSlave.dick > 0) {
			t.push(`cock`);
		} else if (subSlave.vagina === -1) {
			t.push(`asshole`);
		} else {
			t.push(`pussy`);
		}
		t.push(`possessively with ${hasBothArms(eventSlave) ? `one` : `${his}`} hand.`);
		if (hasAnyEyes(subSlave)) {
			t.push(`${subSlave.slaveName} closes ${his2} ${App.Desc.eyesColor(subSlave)}.`);
		}

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} chuckles into ${subSlave.slaveName}'s ear, crooning,`);
		if (subSlave.bellyPreg >= 120000) {
			t.push(Spoken(eventSlave, `"You little preggo slut. Look at how many babies you've gotten fucked into you; guess that's why you're a slave. You're good for nothing but being a breeding bitch."`));
		} else if (subSlave.dick > 0) {
			if (subSlave.dick < 3) {
				t.push(Spoken(eventSlave, `"You useless little bitch. Your pathetic cock is so small, no wonder you're a slave."`));
			} else if (subSlave.balls === 0) {
				t.push(Spoken(eventSlave, `"You sorry little bitch. Your cock isn't so hard now, is it? You're never going to fuck anyone ever again, bitch."`));
			} else {
				t.push(Spoken(eventSlave, `"You big sad bitch. You've got a nice cock, haven't you? Too bad you're only good for taking dick now."`));
			}
		} else if (subSlave.belly >= 5000) {
			if (subSlave.bellyPreg >= 3000) {
				t.push(Spoken(eventSlave, `"You pregnant slut. You think I'll show mercy since you're pregnant? Think again."`));
			} else if (subSlave.bellyImplant >= 3000) {
				t.push(Spoken(eventSlave, `"You blow-up whore. You think I'm dumb enough to be fooled by a fake pregnancy? Not a chance."`));
			} else {
				t.push(Spoken(eventSlave, `"You bloated slut. We're going to find out just how much raping it takes to make you leak."`));
			}
		} else if (subSlave.bellyPreg >= 1500) {
			t.push(Spoken(eventSlave, `"You fat slut. You think your growing pregnancy is going to keep you from getting raped?"`));
		} else if (subSlave.skill.vaginal > 30) {
			t.push(Spoken(eventSlave, `"You poor, sorry slut. You think you're pretty good in bed, don't you? You have no fucking idea."`));
		} else if (subSlave.vagina > 2) {
			t.push(Spoken(eventSlave, `"You poor, gaping slut. You think you know what it's like to take a pounding, don't you? You have no fucking idea."`));
		} else if (subSlave.weight > 130) {
			t.push(Spoken(eventSlave, `"You fat slut. You've got a huge belly, don't you? Being fat and ugly won't save you. You're gonna get raped."`));
		} else if (subSlave.muscles > 30) {
			t.push(Spoken(eventSlave, `"You poor, big bitch. You think all these muscles can save you? You're gonna get raped."`));
		} else if (subSlave.weight > 10) {
			t.push(Spoken(eventSlave, `"You fat slut. You've got a chubby belly, haven't you? Being fat and ugly won't save you. You're gonna get raped."`));
		} else if (subSlave.intelligenceImplant >= 15) {
			t.push(Spoken(eventSlave, `"You book-smart slut. You think any of the classes you passed is going to save you from getting raped?"`));
		} else {
			t.push(Spoken(eventSlave, `"You stupid slut. Too bad you never went to school, maybe you could have learned something and not ended up as a fuck slave."`));
		}

		t.push(`${He} grinds against the wilting ${subSlave.slaveName}, and then continues, "I felt your`);
		if (subSlave.butt > 4) {
			t.push(`fat`);
		} else if (subSlave.butt > 2) {
			t.push(`big`);
		} else {
			t.push(`tiny little`);
		}
		t.push(`butt clench just now." ${He} gives ${subSlave.slaveName}'s`);
		if (subSlave.balls > 0 && subSlave.scrotum > 0) {
			t.push(`balls a gentle squeeze.`);
		} else if (subSlave.dick > 0) {
			t.push(`dick a gentle tug.`);
		} else if (subSlave.vagina === -1) {
			t.push(`butthole a gentle massage.`);
		} else {
			t.push(`pussylips a gentle massage.`);
		}
		t.push(Spoken(eventSlave, `"${HeP} hasn't fucked you back there yet, has ${heP}? It's going to hurt, you little bitch. ${HeP}'s going to hold you down and shove ${hisP}"`));
		t.push(Spoken(eventSlave, (V.PC.dick !== 0) ? "huge cockhead" : "biggest strap-on"));
		t.push(Spoken(eventSlave, `right up against this tight little hole."`));
		t.push(`${He} gropes the quivering slave's virgin anus, careful not to penetrate it.`);
		t.push(Spoken(eventSlave, `"You're going to do your best to relax like a good little ${girl2}. But it's going to be so big. It's going to burn. And then you're going to panic, and struggle, and ${heP}'s going to hold you down and rape your butt while you scream and cry."`));

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${subSlave.slaveName} keeps ${his2}`);
		if (hasBothEyes(subSlave)) {
			t.push(`eyes clamped shut and ${his2}`);
		} else if (hasAnyEyes(subSlave)) {
			t.push(`eye clamped shut and ${his2}`);
		}
		if (hasBothArms(subSlave)) {
			t.push(`hands down at ${his2} sides, balled into fists,`);
		} else {
			t.push(`hand down at ${his2} side, balled into a fist,`);
		}
		t.push(`but ${his2} self-control finally cracks and ${he2} lets out a great gasping sob before bursting into tears.`);

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`${He}'s not wrong`, analFuck, virginityWarning()),
			new App.Events.Result("That sounds like the voice of experience", turntables),
		]);

		function virginityWarning() {
			if (subSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function analFuck() {
			t = [];

			t.push(`You ask ${eventSlave.slaveName} what ${he} said in a neutral tone. ${He} gives you a quick glance, not sure whether to be aroused or afraid, but takes a breath to steady ${himself} and begins. For ${his2} part, ${subSlave.slaveName} vainly tries to stop crying in front of you. When ${eventSlave.slaveName} reaches`);
			t.push(Spoken(eventSlave, `"${HeP}'s going to hold you down and shove ${hisP} ${V.PC.dick !== 0 ? "huge cockhead" : "biggest strap-on"} right up against this tight little hole,"`));
			t.push(`you hold up a hand to get ${him} to pause. ${He} does, and you suddenly shove ${subSlave.slaveName} towards the couch. ${He2} crashes face-down into the cushions, already sobbing in terror. You place a hand on ${his2} ${subSlave.skin} back to hold ${him2} down and then use the other to apply some lube to your ${V.PC.dick !== 0 ? "penis" : "strap-on"} before pressing it against the quivering slave's virgin anus. ${He2} shakes with anguish, causing`);
			if (V.PC.dick !== 0) {
				t.push(`your cock to rub deliciously`);
			} else {
				t.push(`the strap-on to slide amusingly`);
			}
			t.push(`up and down ${his2} asscrack. You make a come-on gesture to ${eventSlave.slaveName}, and ${he} continues,`);
			t.push(Spoken(eventSlave, `"You're going to do your best to relax like a good little ${girl2}."`));
			t.push(`${subSlave.slaveName} desperately takes in a huge breath. ${eventSlave.slaveName}, who has gotten the idea (and to go by ${his} furious masturbation, clearly likes it), gasps out,`);
			t.push(Spoken(eventSlave, `"But it's going to be so big! It's going to burn!"`));
			t.push(`Here you begin to apply inexorable pressure. ${subSlave.slaveName} manages one more deep breath, but it becomes a squeal of anguish and ${he2} tries frantically to burrow into the couch, away from the penetrating`);
			if (V.PC.dick !== 0) {
				t.push(`cock.`);
			} else {
				t.push(`strap-on.`);
			}
			t.push(Spoken(eventSlave, `"You're going to panic, and struggle, and ${heP}'s going to hold you down and rape your butt while you scream and cry..."`));
			t.push(`${eventSlave.slaveName} trails off as ${he} shakes with orgasm; ${he} doesn't say any more, but the <span class="hotpink">wild satisfaction</span>`);
			if (canSee(eventSlave)) {
				t.push(`in ${his} ${App.Desc.eyesColor(subSlave)}`);
			} else {
				t.push(`on ${his} face`);
			}
			t.push(`says it for ${him}. ${subSlave.slaveName}, meanwhile, is a mess, but hurries <span class="gold">fearfully</span> to obey your instructions to go clean ${himself2}, and hides ${his2} <span class="mediumorchid">hatred</span> as ${he2} gingerly applies an enema to ${his2} <span class="lime">loosened butt.</span>`);
			eventSlave.devotion += 5;
			subSlave.trust -= 10;
			subSlave.devotion -= 5;
			seX(subSlave, "anal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)) {
				knockMeUp(subSlave, 5, 1, -1);
			}

			return t;
		}

		function turntables() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, subSlave], ["no clothing", "no clothing"]);
			t = [];

			t.push(`You approach and observe to ${eventSlave.slaveName} that it sounds like ${he}'s speaking from experience. ${He} glances at you nervously, but agrees. You tell ${him} to go on, so ${he} turns to the mystified ${subSlave.slaveName} and mumbles,`);
			t.push(Spoken(eventSlave, `"It wasn't easy for me the first time either."`));
			t.push(`${He} gasps as you slide around behind ${him}, your hands snaking around ${his}`);
			if (eventSlave.boobs > 2000) {
				t.push(`massive tits`);
			} else if (eventSlave.boobs > 1000) {
				t.push(`big boobs`);
			} else if (eventSlave.boobs > 400) {
				t.push(`prominent breasts`);
			} else {
				t.push(`chest`);
			}
			t.push(`to pinch ${his} ${eventSlave.nipples} nipples. You whisper into ${his} ear, ordering ${him} to tell ${his} little story again, slowly.`);
			t.push(Spoken(eventSlave, `"${HeP}'s going to hold you down and shove ${hisP} ${(V.PC.dick !== 0) ? "huge cockhead" : "biggest strap-on"} right up against this tight little hole,"`));
			t.push(`${he} tells ${subSlave.slaveName}. The poor ${girl2} doesn't know what to do, so ${he2} just stands`);
			if (canHear(subSlave)) {
				t.push(`and listens,`);
			} else {
				t.push(`still,`);
			}
			if (canSee(subSlave)) {
				t.push(`watching`);
			} else {
				t.push(`staring`);
			}
			t.push(`dumbly as ${eventSlave.slaveName} talks. ${He}'s a lot less intimidating this time around, gasping out the words as you maneuver your`);
			if (V.PC.dick !== 0) {
				t.push(`cock`);
			} else {
				t.push(`strap-on`);
			}
			t.push(`against ${his}`);
			if (eventSlave.anus > 2) {
				t.push(`loose butthole`);
			} else if (eventSlave.anus > 1) {
				t.push(`experienced ass`);
			} else {
				t.push(`tight butthole`);
			}
			t.push(`for some standing anal.`);
			t.push(Spoken(eventSlave, `"You're going to do your best to relax like a good little ${girl2},"`));
			t.push(`${he} moans.`);
			if ((eventSlave.dick > 0) && !canAchieveErection(eventSlave)) {
				t.push(`${His} limp dick hangs lamely as you press against ${his} backdoor, but it's dripping precum.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${He} has a throbbing erection.`);
			} else if (eventSlave.clit > 0) {
				t.push(`As you shove ${him} into place, your hand brushes against ${his} enormously erect clit.`);
			} else {
				t.push(`As you shove ${him} into place, your hand brushes against moisture coating ${his} inner thighs.`);
			}
			t.push(`The bitch is getting off on this.`);
			t.push(Spoken(eventSlave, `"But it's going to be so big — it's going to bu-hu-hur-hurn... oh..."`));
			t.push(`You're up ${his} ass and pounding away,`);
			if (subSlave.belly >= 5000) {
				t.push(`with one hand on ${his} hips and the other around ${his} gravid belly`);
			} else {
				t.push(`holding ${his} hips with both hands and`);
			}
			t.push(`bouncing ${his} butt against your crotch as your`);
			if (V.PC.dick !== 0) {
				t.push(`cock`);
			} else {
				t.push(`strap-on`);
			}
			t.push(`slides in and out of ${him}. You administer a hard slap to ${his} ass and tell ${him} to keep going. ${He} shakes ${his} head and manages to get back on track, grunting out,`);
			t.push(Spoken(eventSlave, `"You're going to panic — and — and — oh — s-struggle, and ${heP}'s going t-to h-ho-oh-old you d-down, oh, ow, and r-ra-rape your b-butt while, oh p-please ${getWrittenTitle(eventSlave)}, you scream, ooh, and c-cry... o-oh... ah."`));
			t.push(`${He} feels your`);
			if (V.PC.dick !== 0) {
				t.push(`hot seed jet into ${his} asshole`);
			} else {
				t.push(`own orgasm`);
			}
			t.push(`and your hands release their grip, and slides wetly off you,`);
			if ((eventSlave.dick > 0) && !canAchieveErection(eventSlave)) {
				t.push(`${his} own messy little orgasm running down ${his} legs to join the cum dripping out of ${his} ass.`);
			} else if (eventSlave.dick > 0) {
				t.push(`stepping around the mess ${he} shot onto the floor and trying to keep your load inside ${his} ass.`);
			} else {
				t.push(`${his} feminine juices running down ${his} legs to join the cum dripping out of ${his} ass.`);
			}
			t.push(`${He} walks gingerly to the bathroom for a cleanup, looking a lot more <span class="hotpink">submissive</span> than when you walked in. ${subSlave.slaveName} is still staring`);
			if (canSee(subSlave)) {
				t.push(`at you.`);
			} else {
				t.push(`towards you.`);
			}
			t.push(`There's a little <span class="gold">fear</span> there, but some <span class="hotpink">awe,</span> too.`);
			eventSlave.devotion += 5;
			seX(eventSlave, "anal", V.PC, "penetrative");
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 5, 1, -1);
			}
			subSlave.trust -= 5;
			subSlave.devotion += 5;
			return t;
		}
	}
};
