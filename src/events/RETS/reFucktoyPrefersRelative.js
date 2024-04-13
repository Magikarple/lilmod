App.Events.RETSFucktoyPrefersRelative = class RETSFucktoyPrefersRelative extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeIncest > 0,
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 20,
				s => s.relationship > -2, // emotionally bonded and lower always prefer PC
				s => s.devotion < 95, // perfectly devoted prefer PC
				s => [Job.CONCUBINE, Job.MASTERSUITE, Job.FUCKTOY].includes(s.assignment), // is assigned to fuck you
				s => !["either", V.PC.genes].includes(RETSFucktoyPrefersRelative.preferredSex(s)), // but swings the other way
				s => s.energy > 40, // scene assumes horniness...professionals might feel the same way, but you'd never know
				canSee,
				canHear
			],
			[ // and a relative that they prefer over you
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.genes === RETSFucktoyPrefersRelative.preferredSex(getSlave(this.actors[0])),
				s => areRelated(s, getSlave(this.actors[0])),
				s => s.rivalTarget !== this.actors[0],
				s => (canWalk(s) || (canMove(s) && s.rules.mobility === "permissive")),
				isSlaveAvailable
			]
		];
	}

	/** Return the preferred sex for this slave's partners
	 * @param {App.Entity.SlaveState} slave
	 * @returns {string}
	 */
	static preferredSex(slave) {
		if (slave.attrXX > (slave.attrXY + 5)) {
			return "XX";
		} else if (slave.attrXY > (slave.attrXX + 5)) {
			return "XY";
		}
		return "either";
	}

	execute(node) {
		const [fucktoy, relative] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him
		} = getPronouns(fucktoy);
		const {
			He2, he2, His2, his2, him2, girl2, women2
		} = getPronouns(relative).appendSuffix("2");

		App.Events.drawEventArt(node, [fucktoy, relative], "no clothing");

		let fuckhole = fucktoy.toyHole;
		if (fuckhole === "all her holes") {
			if (canDoVaginal(fucktoy)) {
				fuckhole = "pussy";
			} else if (canDoAnal(fucktoy)) {
				fuckhole = "ass";
			} else {
				fuckhole = "mouth";
			}
		}
		if (fuckhole === "dick" && V.PC.vagina <= 0 && V.PC.anus === 0) {
			// prevent loss of player virginity from this scene
			fuckhole = "mouth";
		}

		let t = [];
		t.push(`You're enjoying`, contextualIntro(V.PC, fucktoy, true), `one evening in your office when`, contextualIntro(fucktoy, relative, true), `passes by stark naked (probably on ${his2} way to or from the shower). The glass walls of your office are designed to let you, and by extension everyone else inside, clearly see everything that happens in the rest of the Penthouse, as well as the comings and goings of all your slaves.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`In this case, that means ${fucktoy.slaveName} gets an eyeful of ${relative.slaveName} as ${he2} passes by. ${He} is a well-disciplined slave and ${his} reaction might have passed unnoticed if you weren't`);
		switch (fuckhole) {
			case "pussy":
				if (V.PC.dick > 0) {
					t.push(`deep inside ${his} pussy${fucktoy.vagina === 0 ? `, <span class="virginity loss">taking ${his} cherry` : ""}. You feel ${his} walls pulse and contract around you as ${he} cums hard.`);
				} else {
					t.push(`thrusting a strap-on deep into ${his} pussy${fucktoy.vagina === 0 ? `, <span class="virginity loss">taking ${his} cherry` : ""}. You pause your thrusts as ${he} gasps and twitches, cumming hard.`);
				}
				seX(V.PC, "penetrative", fucktoy, "vaginal");
				break;
			case "ass":
				if (V.PC.dick > 0) {
					t.push(`deep inside ${his} ass${fucktoy.anus === 0 ? `, <span class="virginity loss">taking ${his} anal cherry` : ""}. You feel ${his} sphincter contract around you as ${he} cums hard.`);
				} else {
					t.push(`thrusting a strap-on deep into ${his} ass${fucktoy.anus === 0 ? `, <span class="virginity loss">taking ${his} cherry` : ""}. You pause your thrusts as ${he} gasps and twitches, cumming hard.`);
				}
				seX(V.PC, "penetrative", fucktoy, "anal");
				break;
			case "mouth":
				if (V.PC.dick > 0) {
					t.push(`buried deep in ${his} throat. ${His} motions waver and you feel ${his} throat contract around you as ${he} cums hard.`);
				} else {
					t.push(`thrusting a strap-on deep into ${his} throat. ${His} motions waver as ${he} twitches, cumming hard.`);
				}
				seX(V.PC, "penetrative", fucktoy, "oral");
				break;
			case "boobs":
				if (V.PC.dick > 0) {
					t.push(`receiving a ${fucktoy.boobs > 300 ? "boobjob" : "naizuri"} from ${him}. ${His} motions waver and ${he} gasps aloud as ${he} cums hard.`);
				} else if (fucktoy.boobs > 300) {
					t.push(`groping ${his} boobs. ${He} gasps and twitches, cumming hard.`);
				} else {
					t.push(`teasing ${his} flat chest. ${He} gasps and twitches, cumming hard.`);
				}
				seX(V.PC, "penetrative", fucktoy, "mammary");
				break;
			case "dick":
				t.push(`riding ${him}. ${He} groans as ${he} unexpectedly cums hard, filling you up.`);
				if (V.PC.vagina > 0) {
					if (canImpreg(V.PC, fucktoy) && V.PC.mpreg === 0) {
						t.push(`You wonder briefly if ${he} might have just gotten you pregnant.`);
						knockMeUp(V.PC, 5, 0, fucktoy.ID);
					}
					seX(V.PC, "vaginal", fucktoy, "penetrative");
				} else {
					if (canImpreg(V.PC, fucktoy) && V.PC.mpreg === 1) {
						t.push(`You wonder briefly if ${he} might have just gotten you pregnant.`);
						knockMeUp(V.PC, 5, 1, fucktoy.ID);
					}
					seX(V.PC, "anal", fucktoy, "penetrative");
				}
				break;
			default:
				throw Error(`Unexpected toyhole ${fuckhole}`);
		}
		t.push(`You have a lot of experience with slaves getting off, and you're pretty sure that reaction wasn't just from your use of ${him}, but from ogling the nude form of ${relative.slaveName} at the same time.`);
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You decide to test your fucktoy, and ask ${him} directly whether ${he} was turned on by ${his} ${relativeTerm(fucktoy, relative)} ${relative.slaveName}.`);
		if (fucktoy.trust <= 20) { // illusion of choice...he'll always tell you, just for a different reason
			t.push(`${He} knows better than to lie to you, and replies, terrified, that ${he} was.`);
		} else if (fucktoy.devotion < -20) {
			t.push(`${He} defiantly replies that ${he} was.`);
		} else {
			t.push(`${He} trusts you enough to tell you the truth without reservation, and replies that ${he} was.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`Pushing further, you ask ${him} what turns ${him} on so much about ${relative.slaveName} that ${he}'d cum from looking at ${him2} but not from looking at you.`);
		if (fucktoy.devotion < -20 && fucktoy.trust > 20) {
			t.push(`${He} starts with some drivel about how much ${he} loves ${his} ${relativeTerm(fucktoy, relative)}, but ends with a snide remark about how`);
		} else {
			t.push(`Knowing that it's a potentially dangerous answer, but unwilling to lie to you, ${he} responds`);
			if (!canTalk(fucktoy)) {
				t.push(`with nervous gestures, indicating that`);
			} else {
				t.push(`nervously that`);
			}
			t.push(`${he} loves ${his} ${relativeTerm(fucktoy, relative)}, and besides,`);
		}
		if (RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XX") { // likes women
			if (relative.vagina > -1 && V.PC.vagina === -1) {
				t.push(`${he2} has a pretty pussy, and you don't.`);
			} else if (relative.boobs > 300 && V.PC.boobs < 300) {
				t.push(`${he2} has great tits, and you don't.`);
			} else if (relative.boobs > V.PC.boobs * 1.2) {
				t.push(`${he2} has way bigger tits than you do.`);
			} else if (V.PC.title === 0) { // gender overhaul
				t.push(`${he2}'s a woman, while you just look like one.`);
			} else {
				t.push(`${he2}'s a woman, and you aren't.`); // meh
			}
		} else { // likes men
			if (relative.dick > V.PC.dick) {
				if (V.PC.dick === 0) {
					t.push(`${he2} has a cock, and ${he} loves cocks.`);
				} else {
					t.push(`${he2} has a bigger cock than you do.`);
				}
			} else if (relative.balls > 0 && V.PC.balls === 0) {
				t.push(`${he2} has balls, and you don't.`);
			} else if (relative.boobs === 0 && (V.PC.boobs >= 300 || V.PC.title === 0)) {
				t.push(`${he2} has a manly, muscular chest.`);
			} else if (V.PC.title === 1) { // gender overhaul
				t.push(`${he2}'s a man, while you just look like one.`);
			} else {
				t.push(`${he2}'s a man, and you aren't.`); // meh
			}
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You consider this for a moment... it's objectively a true difference between you and ${relative.slaveName}, and that reason lines up with what you ${fucktoy.attrKnown ? "know" : "have guessed"} about ${his} sexuality already.`);
		if (App.Utils.sexAllowed(fucktoy, relative)) {
			t.push(`In fact, you're pretty sure you've seen the two of them specifically going at it fairly vigorously before.`);
		}
		t.push(`${His} higher attraction to ${women2} isn't necessarily a problem... ${he}'s been plenty attentive to your sexual needs even if ${he}'s not necessarily turned on by your body... but at the same time, you could probably do something about it if you wanted.`);
		fucktoy.attrKnown = 1; // now you know
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Punish ${him}`, punish),
			new App.Events.Result(`Condition ${him} to appreciate ${RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XX" ? "men" : "women"}`, condition),
			new App.Events.Result(`Call ${relative.slaveName} back and have a threesome`, threesome),
		]);

		function punish() {
			const frag = document.createDocumentFragment();
			t = [];
			t.push(`You push ${fucktoy.slaveName} face-down over your desk and sternly inform that ${he} has only one objective when serving as your fucktoy: bringing you pleasure. To punctuate each phrase, you strike ${his} buttocks with your hand, leaving a red mark. ${He} is not to be distracted when a ${girl2} ${he} likes walks by, or when you get a call, or for any other reason unless you specifically tell ${him} to stop. And ${he} is certainly not allowed to cum before you without permission.`);
			App.Events.addParagraph(frag, t);

			t = [];
			t.push(`${He} meekly acknowledges your instructions and <span class="devotion inc">vows to do better</span> for you, and you can tell that ${he} <span class="trust dec">fears</span> a repeat of this lesson.`);
			fucktoy.devotion += 4;
			fucktoy.trust -= 4;
			if (fucktoy.fetish === Fetish.SUBMISSIVE && fucktoy.fetishKnown === 1) {
				t.push(`Still, when you glance down, you catch the faintest hint of a smile; it seems your punishment appealed to ${him}, <span class="fetish inc">reinforcing ${his} submission</span> to your will.`);
				fucktoy.fetishStrength += 10;
			} else {
				t.push(`${His} suppression of ${his} attraction naturally leads to a <span class="libido dec">decrease in ${his} libido</span> and <span class="stat drop">attraction to ${women2}.</span>`);
				fucktoy.energy -= 3;
				if (RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XX") {
					fucktoy.attrXX -= 5;
				} else {
					fucktoy.attrXY -= 5;
				}
			}
			App.Events.addParagraph(frag, t);

			if (FutureSocieties.isActive('FSSlaveProfessionalism')) {
				t = [];
				t.push(`Whispers spread through your arcology about how seriously you take your slaves' <span class="reputation inc">duty to professional detachment.</span>`);
				FutureSocieties.Change("Slave Professionalism", 3);
				App.Events.addParagraph(frag, t);
			}

			return [frag];
		}

		function condition() {
			const {himA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
			t = [];
			t.push(`While ${fucktoy.slaveName} kneels before you, ready to resume ${his} service to you, you inform ${him} that ${he}'ll get some help to see things the right way. You summon ${V.assistant.name} and instruct ${himA} to begin a conditioning regimen to encourage ${fucktoy.slaveName} to engage sexually with`);
			if (RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XX") {
				t.push(`<span class="improvement">men rather than women.</span>`);
				fucktoy.attrXX -= 10;
				fucktoy.attrXY += 15;
			} else {
				t.push(`<span class="improvement">women rather than men.</span>`);
				fucktoy.attrXX += 15;
				fucktoy.attrXY -= 10;
			}
			t.push(`${fucktoy.slaveName} is <span class="trust dec">apprehensive</span> of conditioning`);
			if (fucktoy.devotion < -20) {
				t.push(`and <span class="devotion dec">none too thrilled</span> that you're willing to twist ${his} tastes this way.`);
				fucktoy.devotion -= 1;
			} else {
				t.push(`but <span class="devotion inc">thankful</span> that you're willing to help ${him} this way.`);
				fucktoy.devotion += 1;
			}
			fucktoy.trust -= 1;
			return t;
		}

		function threesome() {
			const frag = document.createDocumentFragment();
			const enjoysIncest = s => s.sexualQuirk === "perverted" || s.sexualQuirk === "sinful";

			t = [];
			t.push(`You're not done with ${fucktoy.slaveName} yet, but what good is maintaining a stable of sex slaves if you don't have a threesome every now and then? You have your assistant call ${relative.slaveName} back to your office. ${He2} arrives in just a couple of seconds, finding ${fucktoy.slaveName} blushing with embarrassment. You inform ${him2} that you'll be using ${him2} with ${fucktoy.slaveName}.`);
			if (enjoysIncest(relative) || relative.relationshipTarget === fucktoy.ID) {
				t.push(`${He2} grins, clearly aroused at the thought, and comes around the desk towards the two of you.`);
			} else if (relative.devotion > 50) {
				t.push(`${His2} eyes widen slightly, but ${he2} is devoted enough to commit fully to whatever you ask of ${him2}.`);
			} else {
				t.push(`${He2} stops in ${his2} tracks, clearly disturbed by what's about to happen, until you repeat your order.`);
			}
			App.Events.addParagraph(frag, t);

			/* Double pen the fucktoy if she prefers dudes and can take it */
			const doublePenFucktoy = RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XY" && (canDoAnal(fucktoy) || canDoVaginal(fucktoy)) && canPenetrate(relative);
			/* Double pen the relative if the fucktoy prefers chicks and the relative can take it */
			const doublePenRelative = RETSFucktoyPrefersRelative.preferredSex(fucktoy) === "XX" && (canDoAnal(relative) || canDoVaginal(relative)) && canPenetrate(fucktoy);
			/* If double pen is not possible or desirable, and EITHER slave can ride you, double cowgirl on the player, so the slaves face each other */
			const doubleCowgirl = canDoAnal(fucktoy) || canDoVaginal(fucktoy) || canDoAnal(relative) || canDoVaginal(relative);
			if (doublePenFucktoy || doublePenRelative) {
				const recipient = doublePenFucktoy ? fucktoy : relative;
				const coPenetrator = doublePenFucktoy ? relative : fucktoy;
				const {heR, himR, hisR} = getPronouns(recipient).appendSuffix('R');
				t = [];
				t.push(`You lay back on your couch while ${recipient.slaveName} mounts you, with ${coPenetrator.slaveName} getting ready behind ${himR}.`);
				if (canDoAnal(recipient) && canDoVaginal(recipient)) {
					t.push(`While ${heR} slides your ${V.PC.dick > 0 ? "dick" : "strap-on"} into ${hisR} waiting pussy, ${coPenetrator.slaveName} pushes into ${hisR} ass. You continue like this for a bit, before swapping positions with ${coPenetrator.slaveName}.`);
					t.push(VCheck.Both(recipient, 2, 2));
				} else {
					const anal = canDoAnal(recipient);
					t.push(`It's a bit tight in ${recipient.slaveName}'s ${anal ? 'ass' : 'pussy'}, with both ${coPenetrator.slaveName} and your ${V.PC.dick > 0 ? "dick" : "strap-on"} sharing the space, but you make it work.`);
					if (anal && recipient.anus < 3) {
						t.push(VCheck.Anal(recipient, 2));
						t.push(`Having both of you in ${hisR} tight ass <span class="lime">stretches it out</span> a bit.`);
						recipient.anus++;
					} else if (!anal && recipient.vagina < 3) {
						t.push(VCheck.Vaginal(recipient, 2));
						t.push(`Having both of you in ${hisR} tight pussy <span class="lime">stretches it out</span> a bit.`);
						recipient.vagina++;
					}
				}
				t.push(`It takes a few moments to find a rhythm, but ${fucktoy.slaveName} is excited that ${he} gets to do this with ${his} ${getWrittenTitle(fucktoy)} and ${his} ${relativeTerm(fucktoy, relative)}. It's easy to enjoy the change of pace, especially with ${recipient.slaveName} writhing on your ${V.PC.dick > 0 ? `dick` : `strap-on`}.`);
				App.Events.addParagraph(frag, t);
			} else if (doubleCowgirl) {
				const onDick = canDoVaginal(fucktoy) ? fucktoy : canDoVaginal(relative) ? relative : canDoAnal(fucktoy) ? fucktoy : relative; // whee
				const onMouth = onDick === fucktoy ? relative : fucktoy;
				const {heD} = getPronouns(onDick).appendSuffix('D');
				const {himM, heM, hisM} = getPronouns(onMouth).appendSuffix('M');
				t = [];
				t.push(`You lay back on your couch ${V.PC.dick < 1 ? `with your strap-on attached ` : ``}and have ${onDick.slaveName} climb onto you, facing you while ${heD} rides.`);
				t.push(VCheck.Simple(onDick, 1));
				t.push(`Meanwhile, you signal to ${onMouth.slaveName} that you want to taste ${himM}, and ${heM} straddles your face, facing ${hisM} ${relativeTerm(onMouth, onDick)}.`);
				t.push(`Naturally, ${fucktoy.slaveName} starts a makeout session while ${he} and ${relative.slaveName} ride you. It doesn't take long for moans to turn to screams.`);
				App.Events.addParagraph(frag, t);
			} else {
				/* FFS, really? You have two sex slaves here, one of whom is your *personal fucktoy*, and neither can do anything but oral? Fine, have an oral triangle. */
				t = [];
				t.push(`The three of you lie down together, as you order ${fucktoy.slaveName} to continue servicing you orally. You tell ${relative.slaveName} to`);
				if (fucktoy.dick > 0) {
					t.push(`give ${fucktoy.slaveName} a blowjob`);
				} else if (fucktoy.vagina > 0) {
					t.push(`eat ${fucktoy.slaveName} out`);
				} else {
					t.push(`give ${fucktoy.slaveName} a rimjob`); // I guess?
				}
				t.push(`while you get a taste of ${him2}. It takes a few moments to find a rhythm, but ${fucktoy.slaveName} is excited that ${he} gets to do this with ${his} ${getWrittenTitle(fucktoy)} and ${his} ${relativeTerm(fucktoy, relative)}, and it's not long before all of you have reached orgasm.`);
				seX(fucktoy, "oral", relative, "oral", 1);
				App.Events.addParagraph(frag, t);
			}

			t = [];
			t.push(`The three of you collapse into a warm, satisfied pile of bodies. ${fucktoy.slaveName} is <span class="devotion inc">grateful</span> that you indulged ${his} fantasy, and <span class="trust inc">trusts</span> that you'll continue to keep ${his} satisfaction in mind.`);
			fucktoy.devotion += 2;
			fucktoy.trust += 2;

			/* did one or both of them *really* have fun? */
			if (enjoysIncest(fucktoy) && enjoysIncest(relative)) {
				t.push(`On top of it all, it turns out that ${fucktoy.slaveName} and ${relative.slaveName} both really enjoy breaking the taboo of incest, and they've <span class="devotion inc">grown closer to you</span> from this encounter.`);
				fucktoy.devotion += 4;
				relative.devotion += 4;
			} else if (enjoysIncest(fucktoy)) {
				t.push(`On top of it all, it turns out that ${he} really enjoys breaking the taboo of incest, and ${he}'s <span class="devotion inc">grown closer to you</span> from this encounter.`);
				fucktoy.devotion += 3;
			} else if (enjoysIncest(relative)) {
				t.push(`On top of it all, it turns out that ${relative.slaveName} really enjoys breaking the taboo of incest, and ${he2}'s <span class="devotion inc">grown closer to you</span> from this encounter.`);
				relative.devotion += 3;
			}
			App.Events.addParagraph(frag, t);

			return [frag];
		}
	}
};
