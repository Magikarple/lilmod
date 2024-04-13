App.Events.RESSSleepingAmbivalent = class RESSSleepingAmbivalent extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.devotion <= 20,
				s => s.devotion > -10,
				s => s.assignment !== Job.QUARTER,
				s => s.rules.living === "spare",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {womanP} = getPronouns(V.PC).appendSuffix("P");
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		App.Events.addParagraph(node, [
			`Passing through the slave dormitory at night, you run your eyes down the row of sleeping chattel. The light here is low, but it's not dark. Slaves need to be able to find the bathroom, slaves on late assignments need to find their beds, and those permitted to do so need to be able to select slaves for sex.`,
			contextualIntro(V.PC, eventSlave, true, false, true),
			`catches your eye. The dormitory is kept at a pleasant temperature so that the slaves, who of course sleep nude, are comfortable on their bedrolls covered by a single sheet, or nothing at all. ${He} probably went to sleep with ${his} sheet pulled up to ${his} chin, which is normal behavior for slaves who aren't yet accepting of their status as compulsory sex objects, but ${he}'s shrugged it down. Half ${his} torso is bare.`
		]);
		let r = [];
		r.push(`The dim blue light plays across ${his} ${eventSlave.skin} skin.`);
		if (eventSlave.boobs > 2000) {
			r.push(`${His} massive boob on that side is slightly shifted by each breath.`);
		} else if (eventSlave.boobs > 800) {
			r.push(`${His} breast on that side rises and falls with each breath.`);
		} else {
			r.push(`That side of ${his} chest rises and falls with each breath.`);
		}
		if (eventSlave.belly >= 5000) {
			r.push(`${His} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly is only partially covered by the sheet, leaving most of it visible.`);
		}
		r.push(`${He}'s sleeping soundly, ${his} breaths coming deep and slow. Most slaves where ${he} is mentally are troubled by bad dreams, but the poor ${girl} is evidently too tired for that.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Grope ${his} boob`, grope),
			(eventSlave.belly >= 5000 || eventSlave.weight > 30)
				? new App.Events.Result(`Rub ${his} belly`, rub)
				: new App.Events.Result(),
			(V.PC.dick !== 0)
				? new App.Events.Result(`Cum on ${his} face`, cum)
				: new App.Events.Result(`Squirt on ${his} face`, squirt),
			new App.Events.Result(`Just watch ${him} for a little while`, watch),
		]);

		function grope() {
			r = [];
			r.push(`${His} eyes fly open as ${he} feels someone groping ${him}.`);
			if ((eventSlave.boobsImplant/eventSlave.boobs) >= .60) {
				r.push(`You're mauling ${his} fake boob, squeezing it and making the skin of ${his} breast, which is already stretched rather taut by the implant, stretch a bit farther.`);
			} else if (eventSlave.boobs > 3000) {
				r.push(`You're hefting and massaging ${his} mass of breastflesh, playing with ${his}`);
				if ((eventSlave.boobsImplant/eventSlave.boobs) < .60) {
					r.push(`mostly`);
				}
				r.push(`natural boob, making ${his} huge soft udder bounce and jiggle.`);
			} else if (eventSlave.lactation > 0) {
				r.push(`You're kneading and massaging ${his} udder, and the milk begins to`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`bead at`);
				} else {
					r.push(`leak from`);
				}
				r.push(`the cow's nipple.`);
			} else if (eventSlave.boobs > 300) {
				r.push(`You've got ${his} whole tit in your hands, jiggling and squeezing the entire thing.`);
			} else {
				r.push(`You're massaging and squeezing ${his} flat chest.`);
			}
			r.push(`${His} face contorts with surprise and then outrage, but then ${he}`);
			if (!canSee(eventSlave)) {
				r.push(`recognizes your familiar`);
				if (canSmell(eventSlave)) {
					r.push(`smell`);
				} else {
					r.push(`touch`);
				}
				r.push(`and`);
			}
			r.push(`realizes whose hand it is that's taking liberties with ${him}.`);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
				r.push(`Though ${he}'s smart,`);
			} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
				r.push(`Though ${he}'s not dumb,`);
			} else {
				r.push(`${He}'s an idiot, and`);
			}
			r.push(`in ${his} drowsy state ${he} can't figure out what to do. ${He} settles for <span class="devotion inc">freezing submissively</span> and letting you do what you like. You test ${his} compliance by`);
			switch (eventSlave.nipples) {
				case "inverted":
					r.push(`painfully protruding ${his} fully inverted nipple. ${He} puts up with even that, though ${he} cries a little as it pops out.`);
					break;
				case "partially inverted":
					r.push(`painfully protruding ${his} partially inverted nipple. ${He} puts up with that, too, though ${he} winces as it pops out.`);
					break;
				case "huge":
					r.push(`rolling ${his} huge nipple between a thumb and forefinger, hard enough to hurt. ${He} accepts the mammary abuse.`);
					break;
				case "fuckable":
					r.push(`forcing your entire fist into ${his} nipple. ${He} accepts the stimulation as best ${he} can.`);
					break;
				default:
					r.push(`playing with ${his} nipple, pinching it hard enough to hurt. ${He} accepts the mammary abuse.`);
			}
			r.push(`Satisfied, you leave ${him} to get back to sleep as best ${he} can.`);
			eventSlave.devotion += 4;
			if (eventSlave.lactation > 0) {
				eventSlave.lactationDuration = 2;
				eventSlave.boobs -= eventSlave.boobsMilk;
				eventSlave.boobsMilk = 0;
			}
			return r;
		}

		function rub() {
			r = [];
			if (eventSlave.bellyPreg >= 5000) {
				r.push(`${His} eyes fly open as soon as ${he} feels someone touching ${his} ${belly}, life-rounded, stomach.`);
				if (eventSlave.weight > 10) {
					r.push(`You're massaging and teasing ${his} huge, soft belly.`);
				} else if (eventSlave.muscles > 5) {
					r.push(`You're massaging and teasing ${his} taut belly and ruined abs.`);
				} else {
					r.push(`You're massaging and teasing ${his} taut belly.`);
				}
				r.push(`${His} face contorts with surprise and then outrage, but then ${he}`);
				if (!canSee(eventSlave)) {
					r.push(`recognizes your familiar`);
					if (canSmell(eventSlave)) {
						r.push(`smell`);
					} else {
						r.push(`touch`);
					}
					r.push(`and`);
				}
				r.push(`realizes whose hand it is that's taking liberties with ${him}.`);
				if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
					r.push(`Though ${he}'s smart,`);
				} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
					r.push(`Though ${he}'s not dumb,`);
				} else {
					r.push(`${He}'s an idiot, and`);
				}
				r.push(`in ${his} drowsy state ${he} can't figure out what to do. ${He} settles for <span class="devotion inc">freezing submissively</span> and letting you do what you like. You test ${his} compliance by`);
				if (eventSlave.weight > 10) {
					r.push(`sinking your hands into ${his} fat to get a good feel of the life growing within.`);
				} else {
					r.push(`feeling for the life growing within ${him}.`);
				}
				if (eventSlave.weight > 30) {
					r.push(`Though it takes some groping before you are met with a kick from ${his} unborn child.`);
				} else if (eventSlave.pregType < 3) {
					r.push(`It doesn't take long before you are met with a kick from ${his} unborn child.`);
				} else {
					r.push(`${He} is so full of children that your ministrations are met with a hail of motion.`);
				}
				if (eventSlave.pregSource === -1) {
					r.push(`Smiling at how active your children are,`);
				} else {
					r.push(`Satisfied,`);
				}
			} else if (eventSlave.bellyImplant >= 5000) {
				r.push(`${His} eyes fly open as soon as ${he} feels someone touching ${his} ${belly} stomach.`);
				if (eventSlave.weight > 10) {
					r.push(`You're massaging and teasing ${his} huge, soft belly.`);
				} else if (eventSlave.muscles > 5) {
					r.push(`You're massaging and teasing ${his} taut belly and ruined abs.`);
				} else {
					r.push(`You're massaging and teasing ${his} taut belly.`);
				}
				r.push(`${His} face contorts with surprise and then outrage, but then ${he}`);
				if (!canSee(eventSlave)) {
					r.push(`recognizes your familiar`);
					if (canSmell(eventSlave)) {
						r.push(`smell`);
					} else {
						r.push(`touch`);
					}
					r.push(`and`);
				}
				r.push(`realizes whose hand it is that's taking liberties with ${him}.`);
				if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
					r.push(`Though ${he}'s smart,`);
				} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
					r.push(`Though ${he}'s not dumb,`);
				} else {
					r.push(`${He}'s an idiot, and`);
				}
				r.push(`in ${his} drowsy state ${he} can't figure out what to do. ${He} settles for <span class="devotion inc">freezing submissively</span> and letting you do what you like. You test ${his} compliance by`);
				if (eventSlave.weight > 10) {
					r.push(`sinking your hands into ${his} fat to get a good feel of the implant hidden within.`);
				} else {
					r.push(`feeling up the implant within ${him}.`);
				}
				if (eventSlave.weight > 30) {
					r.push(`Though it takes some groping before you locate the firm sphere.`);
				} else if (eventSlave.belly < 10000) {
					r.push(`It doesn't take long for you to have a solid grip on the firm sphere.`);
				} else {
					r.push(`It's so huge it's hard to miss, but that just gives you more room to poke and prod at.`);
				}
				r.push(`Satisfied,`);
			} else if (eventSlave.bellyFluid >= 5000) {
				r.push(`${His} eyes fly open as soon as ${he} feels someone touching ${his} ${belly}, ${eventSlave.inflationType}-filled stomach.`);
				if (eventSlave.weight > 10) {
					r.push(`You're massaging and jiggling ${his} huge, soft belly, enjoying the sounds it makes as you move it.`);
				} else if (eventSlave.muscles > 5) {
					r.push(`You're massaging and jiggling ${his} taut belly and stretched abs, enjoying the sounds it makes as you move it.`);
				} else {
					r.push(`You're massaging and jiggling ${his} taut belly, enjoying the sounds it makes as you move it.`);
				}
				r.push(`${His} face contorts with surprise and then outrage, but then ${he}`);
				if (!canSee(eventSlave)) {
					r.push(`recognizes your familiar`);
					if (canSmell(eventSlave)) {
						r.push(`smell`);
					} else {
						r.push(`touch`);
					}
					r.push(`and`);
				}
				r.push(`realizes whose hand it is that's taking liberties with ${him}.`);
				if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
					r.push(`Though ${he}'s smart,`);
				} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
					r.push(`Though ${he}'s not dumb,`);
				} else {
					r.push(`${He}'s an idiot, and`);
				}
				r.push(`in ${his} drowsy state ${he} can't figure out what to do. ${He} settles for <span class="devotion inc">freezing submissively</span> and letting you do what you like. You test ${his} compliance by`);
				if (eventSlave.weight > 10) {
					r.push(`sinking your hands into ${his} fat to get a good grip`);
				} else {
					r.push(`wrapping your hands around the sloshing globe`);
				}
				r.push(`and vigorously shaking. As ${his} gut's groaning from the sudden shift of its contents dies down, you gently apply pressure to the bloated organ, careful to only cause ${his} discomfort and not to disgorge ${his} contents. Satisfied,`);
			} else {
				r.push(`${His} eyes fly open as soon as ${he} feels someone touching ${his}`);
				if (eventSlave.weight > 190) {
					r.push(`expansive belly. You're massaging and jiggling ${his} obscene gut while teasing ${his} many folds and struggling to find ${his} belly button.`);
				} else if (eventSlave.weight > 160) {
					r.push(`massive, soft belly. You're massaging and jiggling ${his} obscene gut while teasing ${his} many folds and hidden belly button.`);
				} else if (eventSlave.weight > 130) {
					r.push(`huge, soft belly. You're massaging and jiggling ${his} thick gut while teasing ${his} folds and hidden belly button.`);
				} else if (eventSlave.weight > 95) {
					r.push(`big soft belly. You're massaging and jiggling ${his} gut while teasing ${his} folds and hidden belly button.`);
				} else {
					r.push(`chubby middle. You're massaging and jiggling ${his} tiny gut.`);
				}
				r.push(`${His} face contorts with surprise and then outrage, but then ${he}`);
				if (!canSee(eventSlave)) {
					r.push(`recognizes your familiar`);
					if (canSmell(eventSlave)) {
						r.push(`smell`);
					} else {
						r.push(`touch`);
					}
					r.push(`and`);
				}
				r.push(`realizes whose hand it is that's taking liberties with ${him}.`);
				if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
					r.push(`Though ${he}'s smart,`);
				} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
					r.push(`Though ${he}'s not dumb,`);
				} else {
					r.push(`${He}'s an idiot, and`);
				}
				r.push(`in ${his} drowsy state ${he} can't figure out what to do. ${He} settles for <span class="devotion inc">freezing submissively</span> and letting you do what you like. You test ${his} compliance by roughly kneading ${his} pliant flesh, testing how well it can be molded into pleasurable valleys and ravines. Satisfied,`);
			}
			r.push(`you leave ${him} to get back to sleep as best ${he} can.`);
			eventSlave.devotion += 4;
			return r;
		}

		function cum() {
			r = [];
			r.push(`You stand over ${him}, quietly masturbating while watching ${him} sleep. Several of ${his} fellow slaves come and go as you do so, but if they're surprised by the sight, they have the presence of mind not to show it. You fancy yourself a bit of a marks ${womanP}, and you don't feel the need to bend over ${him} to score good hits. Your load comes in three main jets: the first hits ${him} on the nipple, the second tracks up ${his} sternum and throat, and the third splashes full across ${his} face as ${his} eyes fly open`);
			if (V.PC.vagina !== -1) {
				r.push(r.pop() + `, each of these accompanied by some less directionally perfect girlcum`);
			}
			r.push(r.pop() + `. ${He} sputters with surprise and then outrage, but`);
			if (!canSee(eventSlave)) {
				r.push(`once ${he} recognizes your`);
				if (canTaste(eventSlave)) {
					r.push(`taste`);
				} else {
					r.push(`presence`);
				}
				r.push(`and`);
			} else {
				r.push(`then ${he}`);
			}
			r.push(`realizes who it is standing over ${him}`);
			if (canSee(eventSlave)) {
				r.push(`and`);
			} else {
				r.push(`does ${he}`);
			}
			r.push(`<span class="trust dec">freezes in terror.</span>`);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
				r.push(`${He}'s quick, and ${he} immediately realizes`);
			} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
				r.push(`${He}'s not dumb, and ${he} quickly realizes`);
			} else {
				r.push(`${He} gradually manages to calculate`);
			}
			r.push(`that doing anything other than thanking you would be phenomenally stupid. "Thank you, ${Master}," ${he}`);
			if (SlaveStatsChecker.checkForLisp(eventSlave)) {
				r.push(`lisps`);
			} else {
				r.push(`mumbles`);
			}
			r.push(`blearily. You leave ${him} to <span class="devotion inc">puzzle over ${his} own submissiveness,</span> covered in your cum.`);
			eventSlave.devotion += 4;
			eventSlave.trust -= 2;
			return r;
		}

		function squirt() {
			r = [];
			r.push(`You stand over ${him}, quietly masturbating while watching ${him} sleep. Several of ${his} fellow slaves come and go as you do so, but if they're surprised by the sight, they have the presence of mind not to show it. You're on excellent terms with your cunt, and you know just what it takes to make yourself squirt. When you feel the heat building just right, you quickly straddle ${his} face without touching ${him}, angling yourself carefully and increasing the pace of your schlicking. In no time at all, a jet of femcum splashes onto ${his} face and down across ${his} chest. ${He} sputters with surprise and then outrage, but then ${he}`);
			if (canSee(eventSlave)) {
				r.push(`realizes whose pussy ${he}'s staring straight into`);
			} else {
				r.push(`recognizes your`);
				if (canTaste(eventSlave)) {
					r.push(`flavor`);
				} else {
					r.push(`presence`);
				}
			}
			r.push(`and <span class="trust dec">freezes in terror.</span>`);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant > 50) {
				r.push(`${He}'s quick, and ${he} immediately realizes`);
			} else if (eventSlave.intelligence+eventSlave.intelligenceImplant >= -15) {
				r.push(`${He}'s not dumb, and ${he} quickly realizes`);
			} else {
				r.push(`${He} gradually manages to calculate`);
			}
			r.push(`that doing anything other than thanking you would be phenomenally stupid. "Thank you, ${Master}," ${he}`);
			if (SlaveStatsChecker.checkForLisp(eventSlave)) {
				r.push(`lisps`);
			} else {
				r.push(`mumbles`);
			}
			r.push(`blearily. You leave ${him} to <span class="devotion inc">puzzle over ${his} own submissiveness,</span> covered in your pussyjuice.`);
			eventSlave.devotion += 4;
			eventSlave.trust -= 2;
			return r;
		}

		function watch() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You stand there for a while, watching the exhausted slave sleep. It's an oddly restful sight, and the aesthetics of ${his} slumbering little movements hold your attention for a time.`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth/2) {
				r.push(`You watch the subtle movements going on within ${his} womb as well.`);
			}
			r.push(`After a while, you head to your own bed. Several of ${his} fellow slaves came and went as you watched ${him}, but if they're surprised by the sight, they have the presence of mind not to show it.`);
			App.Events.addParagraph(frag, r);
			App.Events.addParagraph(frag, [`One of them quietly lets ${him} know about the incident the next day, though, and the overall impact on ${his} mental state is surprisingly positive. In a more normal human setting, the news that someone watched ${him} sleep last night without ${his} consent or even knowledge at the time would disturb ${him} greatly. However, it's not uncommon for slaves in the dormitory to wake up to the sounds of the occupant of the bedroll next to theirs getting fucked, and without any consent, either. Perhaps you're odd, ${he}'s obviously thinking, but <span class="mediumaquamarine">perhaps you won't rape ${him} while ${he} sleeps.</span>`]);
			eventSlave.trust += 4;
			return frag;
		}
	}
};
