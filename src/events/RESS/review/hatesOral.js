App.Events.RESSHatesOral = class RESSHatesOral extends App.Events.BaseEvent { // Written by anon, coded by Boney M
	eventPrerequisites() {
		return [
			() => V.PC.dick !== 0,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion <= 50,
				s => s.sexualFlaw === "hates oral",
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
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`has been in your service long enough to know that oral sex is a daily fact of life for most slaves, and that most slaves are not only required to put up with cum, but to love it, too — or at least be able to fake enjoyment convincingly. ${He}'s`
		);
		if (canSee(eventSlave)) {
			r.push(`seen cum spattered on other slaves' faces, pooling in their mouths, and dripping from their asses only to be licked up by other slaves.`);
		} else if (canHear(eventSlave)) {
			r.push(`heard cum spattering across other slaves' faces, the sound of it in their mouths, dripping from their asses, and more.`);
		} else {
			r.push(`felt seminal fluid on ${his} skin and on ${his} lips, always coercively or accidentally.`);
		}
		r.push(`It's clear from ${eventSlave.slaveName}'s recent reactions to these acts that ${he}'s quite disgusted by oral sex in general and cum in particular. Depending on your point of view, this could be a flaw for ${him} to overcome or a weakness you can exploit.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Let ${him} earn a break for ${his} throat`, earn),
			new App.Events.Result(`Try to brute-force ${his} oral resistance with a public blowbang`, brute),
			new App.Events.Result(`Teach ${him} to see cum as a reward`, teach),
			(eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.belly < 1500 && eventSlave.weight < 130) /* won't work if too pregnant */
				? new App.Events.Result(`Make ${him} eat ${his} own cum`, own)
				: new App.Events.Result(),
		]);

		function earn() {
			r = [];
			r.push(`You tell ${him} ${he}'s a sex slave, and that ${he} needs to learn how to suck dick.`);
			if (!canTalk(eventSlave) && hasAnyArms(eventSlave)) {
				r.push(`${He} frantically begs with gestures, pleading`);
				if (hasBothLegs(eventSlave)) {
					r.push(`on ${his} knees.`);
				} else {
					r.push(`desperately.`);
				}
			} else if (!canTalk(eventSlave)) {
				r.push(`${He} frantically mouths pleas that you leave ${his} throat cock-free.`);
			} else {
				r.push(`${He} begs, "Please no, ${Master}, please don't rape my mouth, ${Master}!"`);
			}
			r.push(`You make a show of considering, and then tell ${him} that if ${he}'s extra obedient, you might let ${him} earn a break for ${his} throat — for now.`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				r.push(`You tell ${him} to lie back and spread ${his} legs, because you're going to give ${him} a good old fashioned missionary-position pounding. ${He} does so with unusual obedience,`);
				if (eventSlave.belly >= 5000) {
					r.push(`${his} legs hanging off the couch to give you a better angle with ${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`belly`);
					}
					r.push(`in the way,`);
				}
				r.push(`and as you're giving ${him} a thorough pounding, whether out of relief, gratitude, or a desire to put on a good performance, ${he} certainly seems to be enjoying it more than usual.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				r.push(`You tell ${him} to bend over and spread ${his} ass for you, because if ${he} doesn't want you going in one end you're going to go in the other. ${He} does so with unusual obedience, and as you`);
				if (eventSlave.anus === 1) {
					r.push(`gently but firmly pound ${his} still-tight ass`);
				} else if (eventSlave.anus === 2) {
					r.push(`pound away at ${his} well-used backdoor`);
				} else {
					r.push(`mercilessly jackhammer ${his} gaping hole`);
				}
				r.push(`${he} actively tries to match the rhythm of your thrusts.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`You tell ${him} that if ${he}'s going to hesitate to use ${his} mouth when`);
				if (!canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
					r.push(`${he} has no other hole to amuse you`);
				} else if (!canDoAnal(eventSlave) && eventSlave.vagina === 0) {
					r.push(`${his} only available hole is still virgin`);
				} else if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
					r.push(`all ${his} other holes are still virgin`);
				} else if (eventSlave.anus === 0) {
					r.push(`${his} girly little butthole is still virgin`);
				}
				r.push(`${he}'s going to have to find an amazingly thorough way to please a dick if ${he}'s going to earn ${his} throat a reprieve. ${He} looks`);
				if (eventSlave.intelligence+eventSlave.intelligenceImplant < -15) {
					r.push(`uncharacteristically`);
				}
				r.push(`thoughtful for a moment before bending over before you, spitting in ${his} hand`);
				if (eventSlave.vagina === 0) {
					r.push(`and thoroughly coating ${his} inner thighs with ${his} saliva.`);
				} else {
					r.push(`and thoroughly coating the`);
					if (eventSlave.butt <= 2) {
						r.push(`crack of ${his} slender`);
					} else if (eventSlave.butt <= 4) {
						r.push(`crack of ${his} curvy`);
					} else if (eventSlave.butt <= 8) {
						r.push(`crack of ${his} huge`);
					} else if (eventSlave.butt <= 12) {
						r.push(`crevice of ${his} expansive`);
					} else if (eventSlave.butt <= 20) {
						r.push(`ravine of ${his} endless`);
					}
					r.push(`ass.`);
				}
				r.push(`The invitation is obvious, but just to be sure ${he} pleads with you to satisfy yourself alongside ${his}`);
				if (!canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
					r.push(`chastity. You answer ${his} pleading with your dick, and though it's not quite as pleasurable as pilfering an off-limits hole,`);
					if (eventSlave.vagina > -1) {
						r.push(`before long ${his}`);
						if (eventSlave.vagina === 0) {
							r.push(`virgin`);
						}
						r.push(`cunt starts to supply extra lubrication and ${he} starts to gasp and moan along with your thrusts.`);
					} else {
						r.push(`${eventSlave.slaveName}'s trembling whenever your thrusts slam against ${his} anal chastity is thoroughly entertaining.`);
					}
					r.push(`Before long, you plaster ${his} belt with your cum.`);
				} else if (!canDoAnal(eventSlave) && eventSlave.vagina === 0) {
					r.push(`virgin hole. You answer ${his} pleading with your dick, and though it's not quite as pleasurable as a newly-deflowered hole, before long ${his} virgin cunt starts to supply extra lubrication and ${he} starts to gasp and moan along with your thrusts. Before long, you plaster ${his} still-virgin hole with your cum.`);
				} else if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
					r.push(`virgin holes. You answer ${his} pleading with your dick, and though it's not quite as pleasurable as a newly-deflowered hole,`);
					if (eventSlave.vagina === 0) {
						r.push(`before long ${his} virgin cunt starts to supply extra lubrication and ${he} starts to gasp and moan along with your thrusts.`);
					} else {
						r.push(`${eventSlave.slaveName}'s trembling whenever your thrusts come perilously close to penetrating ${his} virgin ass is thoroughly entertaining.`);
					}
					r.push(`Before long, you plaster ${his} still-virgin hole with your cum.`);
				} else if (eventSlave.anus === 0) {
					r.push(`virgin hole. You answer ${his} pleading with your dick, and though it's not quite as pleasurable as a newly-deflowered hole, ${eventSlave.slaveName}'s trembling whenever your thrusts come perilously close to penetrating ${his} virgin ass is thoroughly entertaining. Before long, you plaster ${his} still-virgin hole with your cum.`);
				}
			}
			r.push(`When you're done, you bend down and whisper in ${his} ear that if ${he} shows any sign of rebelliousness, you'll give every dick in ${V.arcologies[0].name} free access to ${his} throat. <span class="devotion inc">${He} has become more obedient,</span> in the hope this will persuade you to not follow through on your threat.`);
			eventSlave.devotion += 4;
			return r;
		}

		function brute() {
			r = [];
			r.push(`Simple problems require simple solutions — ${he}'ll get fucked in the mouth until ${he} either gets over ${his} hang-ups about oral or learns to hide them. You drag the protesting ${eventSlave.slaveName} out in public, chain ${him} low so that ${his} mouth is available, and tell ${him} that ${he}'ll suck dicks until ${he} gets through five in a row without grimacing, gagging, or resisting. You have a comfortable chair brought out to you and settle in to watch the show.`);
			r.push(`${eventSlave.slaveName} tries, ${he} really does. But when word gets out as to the conditions of ${his} enslavement, ${his} users take a perverse enjoyment in being rougher than usual to evoke the exact reactions ${he}'s trying to avoid. By the third failed streak, you've started to grow bored of the spectacle, but luckily you find entertainment in conversation with those who have already been entertained by poor ${eventSlave.slaveName}. Before long more chairs have been brought up and an impromptu salon has been set up alongside the blowbang line. By the sixth failed streak, an enterprising citizen has set up a small bar and is serving drinks. By the ninth, you've delegated watching ${eventSlave.slaveName} to your assistant. You personally break the eleventh streak after ${he} reached four, to general acclaim from your newfound friends and a toast to your virility.`);
			r.push(`When the fourteenth streak is finally successful, there are serious talks about making these blowbang salons a regular occurrence and some backslapping directed towards you for your innovation in genteel hedonism. While you seriously doubt ${eventSlave.slaveName} enjoys oral sex any more than ${he} did at the start of the day, ${he}'s certainly <span class="skill inc">learned to keep ${his} feelings on the matter to ${himself}.</span> ${He} did, however, <span class="health dec">have quite a rough time</span>`);
			if (eventSlave.skill.oral <= 30) {
				r.push(`of it, though ${he} did learn a thing or two about sucking dick.`);
				slaveSkillIncrease('oral', eventSlave, 10);
			} else {
				r.push(`of it.`);
			}
			r.push(`And last of all, you and ${eventSlave.slaveName} did make <span class="reputation inc">quite a good impression</span> today, though for widely differing reasons.`);
			eventSlave.sexualFlaw = "none";
			seX(eventSlave, "oral", "public", "penetrative", random(65, 80));
			repX(500, "event", eventSlave);
			healthDamage(eventSlave, 10);
			return r;
		}

		function teach() {
			r = [];
			r.push(`You bring ${eventSlave.slaveName} into your office and stand ${him} in front of your leather couch. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`eyes you`);
			} else if (canHear(eventSlave)) {
				r.push(`listens`);
			} else {
				r.push(`waits silently and`);
			}
			if (eventSlave.devotion < -20) {
				r.push(`suspiciously`);
			} else {
				r.push(`worriedly`);
			}
			r.push(`as you ready a bullet vibrator.`);
			if (eventSlave.dick > 0) {
				r.push(`You secure the bullet to ${eventSlave.slaveName}'s frenulum.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`You secure the bullet to ${his} perineum.`);
			} else {
				r.push(`You secure the bullet to ${eventSlave.slaveName}'s clit.`);
			}
			r.push(`You explain that the arcology continually monitors your vital signs, and will use them to estimate your arousal; the system controls the bullet vibrator, which will emit stimulating vibrations scaled to your pleasure. The more pleasure you feel, the more pleasant the vibrations will be, though they will not bring ${him} to orgasm until you climax. To demonstrate, you give the head of your cock a quick squeeze. ${eventSlave.slaveName} squeals in surprise at the sudden stimulation as the bullets spring to life. You tell ${him} to get to work. Though timid at first, as ${he} proceeds to blow you, ${he} becomes more and more enthusiastic as ${his} own pleasure builds. It isn't long until ${he}'s deepthroating you enthusiastically and begging you to cum in ${his} mouth. You make ${him} hold out a bit longer, and then you complete the training session,`);
			if (PC.balls >= 30) {
				r.push(`pumping cum into ${his} stomach until it visibly begins to swell.`);
			} else if (PC.balls >= 14) {
				r.push(`pumping cum into ${his} stomach until it threatens to come back up.`);
			} else if (PC.balls >= 9) {
				r.push(`cumming into ${his} mouth until it spurts from ${his} nose.`);
			} else {
				r.push(`filling ${his} mouth with your cum.`);
			}
			r.push(`${He} climaxes in turn, and virtually melts into a quivering mess on your floor.`);
			if (eventSlave.dick > 0) {
				r.push(`${eventSlave.slaveName}'s cock oozes cum from ${his} intense orgasm, and you command ${him} to clean it off the floor before ${he} gets back to ${his} duties.`);
			}
			if (random(1, 4) === 4) {
				r.push(`<span class="fetish gain">You've successfully linked cum and pleasure in ${his} mind,</span> guaranteeing ${him} a confusing few days as ${he} tries to reconcile this with ${his} hatred of oral sex.`);
				eventSlave.fetish = "cumslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 10;
			} else {
				r.push(`This has <span class="flaw break">broken ${him} of ${his} bad habits.</span>`);
				eventSlave.sexualFlaw = "none";
			}
			r.push(`This demonstration of your control over ${him} has <span class="devotion inc">worn down ${his} resistance to your commands.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return r;
		}

		function own() {
			r = [];
			r.push(`Your cum training tactics have two components: Cum should be linked with pleasure, and cum should not be disgusting to ${eventSlave.slaveName}, because even ${eventSlave.slaveName} produces it. To drive home these lessons, you lead ${eventSlave.slaveName} to your office's leather couch, arranging ${his}`);
			if (eventSlave.height < 150) {
				r.push(`petite`);
			} else if (eventSlave.height < 160) {
				r.push(`short`);
			} else if (eventSlave.height >= 170) {
				r.push(`tall`);
			} else if (eventSlave.height >= 185) {
				r.push(`very tall`);
			}
			r.push(`form upside down with ${his} head on the cushion, ${his} back on the backrest, and ${his}`);
			if (hasBothLegs(eventSlave)) {
				r.push(`legs`);
			} else {
				r.push(`ass`);
			}
			r.push(`in the air. In this position, ${his}`);
			if (eventSlave.dick > 10) {
				r.push(`obscene`);
			} else if (eventSlave.dick > 9) {
				r.push(`inhuman`);
			} else if (eventSlave.dick > 8) {
				r.push(`monstrous`);
			} else if (eventSlave.dick > 7) {
				r.push(`imposing`);
			} else if (eventSlave.dick > 6) {
				r.push(`massive`);
			} else if (eventSlave.dick > 5) {
				r.push(`gigantic`);
			} else if (eventSlave.dick > 4) {
				r.push(`huge`);
			} else if (eventSlave.dick > 3) {
				r.push(`large`);
			} else if (eventSlave.dick > 2) {
				r.push(`average`);
			} else if (eventSlave.dick > 1) {
				r.push(`small`);
			} else if (eventSlave.dick > 0) {
				r.push(`tiny`);
			}
			r.push(`cock`);
			if (eventSlave.belly >= 100 || eventSlave.weight > 30) {
				r.push(`rests over ${his}`);
				if (eventSlave.pregKnown === 1) {
					r.push(`early pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`and`);
			}
			r.push(`hangs directly over ${his} anxious face.`);
			if ((eventSlave.aphrodisiacs > 0) || eventSlave.inflationType === "aphrodisiac") {
				r.push(`The aphrodisiacs in ${his} system already have ${him} so aroused ${he}'s already dripping precum; as you approach ${his} vulnerable form on the couch, a drop lands on ${his} chin.`);
			} else if (eventSlave.prostate > 1) {
				r.push(`${His} overactive prostate has ${him} steadily dripping precum; as you approach ${his} vulnerable form on the couch, a drop lands on ${his} chin.`);
			} else {
				r.push(`You sit next to ${his} vulnerable form on the couch as ${he} looks at you in anticipation.`);
			}
			r.push(`You`);
			if (canDoAnal(eventSlave)) {
				if (eventSlave.anus > 2) {
					r.push(`insert a wide vibrating plug into ${his} gaping anus,`);
				} else if (eventSlave.anus > 1) {
					r.push(`insert a big vibrating plug into ${his} ass,`);
				} else if (eventSlave.anus > 0) {
					r.push(`insert a vibrating plug into ${his} tight ass,`);
				} else {
					r.push(`place a bullet vibrator over the pucker of ${his} virgin anus,`);
				}
			} else {
				r.push(`strap a strong vibrator to ${his} anal chastity,`);
			}
			r.push(`secure a bullet vibrator ${his} quivering perineum, and another to the base of ${his} dick, and set them all to gradually increase the strength of their vibrations. In no time at all ${he} releases a`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`squirt of ejaculate from ${his} cock cage,`);
			} else if (eventSlave.balls > 0) {
				r.push(`torrent of thick, white semen,`);
			} else if (eventSlave.prostate > 2) {
				r.push(`torrent of nearly clear, watery ejaculate,`);
			} else if (eventSlave.prostate === 0) {
				r.push(`pathetic dribble of semen,`);
			} else {
				r.push(`pathetic dribble of watery ejaculate,`);
			}
			r.push(`all of which lands right on ${his} outstretched tongue and pools in ${his} throat. You nudge ${his} chin to make ${him} close ${his} mouth and swallow. After a week of such treatment, ${he} <span class="fetish gain">acquires a taste for semen.</span>`);
			eventSlave.fetish = "cumslut";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 10;
			eventSlave.devotion += 4;
			return r;
		}
	}
};
