App.Events.rePregInventorInvite = class rePregInventorInvite extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.pregInventor === 0,
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.bellyPreg >= 600000,
				s => s.counter.birthsTotal > 30,
				s => s.ovaries === 1,
				canDoVaginal,
				canSee,
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				s => (s.devotion > 90 && s.trust > 50) || s.sexualFlaw === "breeder",
				s => s.intelligence + s.intelligenceImplant > 50
			],
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			He, His,
			he, his, him, himself, girl,
		} = getPronouns(slave);
		const {himA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {title: Master, say: say} = getEnunciation(slave);
		App.Events.drawEventArt(node, slave);
		V.pregInventorID = slave.ID;
		let r = [];

		r.push(
			`Your broodmother,`,
			App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(slave), `,`),
			`asks to see you, so you have ${him} brought to your office. It takes your menial servants several minutes to safely produce ${him} as ${his} massive, bloated${(V.seeRace === 1) ? `, ${slave.race}` : ``} womb is stretched so thin by its load that the sudden shock to ${his} body if ${he} were dropped might cause ${him} to explode. Both you and your babymaker are used to these circumstances at this point, however, and, as your servants work to lower ${him} to the soft carpeted floor at the center of your office without undue strain to ${his} belly, ${he} shoots you a provocative`);
		if (!hasAnyArms(slave)) {
			r.push(`grin.`);
		} else {
			if (slave.boobs >= 20000) {
				r.push(`grin and rubs the sides of ${his} debilitatingly large breasts with anticipation.`);
			} else if ((slave.boobsImplant / slave.boobs) >= .60) {
				r.push(`grin and pushes ${his} augmented tits together to give you a view of ${his} impressive cleavage.`);
			} else if (slave.boobs >= 3000) {
				r.push(`grin and hefts one of ${his} massive breasts${(hasBothArms(slave)) ? ` with both hands` : ``}, sucking on ${his} nipple to give you a show while you wait.`);
			} else {
				r.push(`grin and tweaks the nipples on ${his} pert breasts.`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Once ${he} is safely resting on the ground, your slave`);
		if (hasAnyArms(slave)) {
			r.push(`pushes up against it, stretching so that ${he} can look you in the eyes.`);
		} else {
			r.push(`blushes and wiggles ${his} stumps, looking down.`);
		}
		if (canTalk(slave)) {
			r.push(`"${Master}," ${he} ${say}s, "I love being your hyperpregnant brood slave. My poor ${(slave.mpreg === 1) ? `ass` : ``}pussy weeps every time a baby passes through it, and so many have passed through — and, ${Master}, it hurts, sometimes, but I love the feeling of my body stretching fuller and fuller with life every day. There's nothing I want more than to be your`);
			if (SlaveStatsChecker.checkForLisp(slave)) {
				r.push(lispReplace(SlaveTitle(slave)));
			} else {
				r.push(SlaveTitle(slave));
			}
			r.push(`until my body gives out. So, ${Master}, I really want to give something back to you for making my dreams come true."`);
		} else {
			if (hasAnyArms(slave)) {
				r.push(`${He} signs to you that ${he} wants to give back to you for blessing ${him} with ${his} `);
				if (slave.broodmother > 0) {
					r.push(`permanently hyperpregnant`);
				} else {
					r.push(`life-swollen`);
				}
				r.push(`body.`);
			} else {
				r.push(`Your personal assistant speaks, probably in response to a nonverbal cue from your slave. ${He} explains that your slave wishes to give back to you for blessing ${him} with ${his} `);
				if (slave.broodmother > 0) {
					r.push(`permanently hyperpregnant`);
				} else {
					r.push(`life-swollen`);
				}
				r.push(`body.`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The explanation has been going on for a while now, so you motion for your slave to get to the point.`);
		if (canTalk(slave)) {
			r.push(`"${Master}," ${he} ${say}s, "I want the whole world to love hyperpregnant baby machines as much as I do. I know it's selfish, but I've been looking into ways to make sex with broodmothers even better than it already is. It feels great to get fucked while I'm so packed full and helpless, but, if you'll let me try, I've got some ideas for making it even better for broodmothers. And, more importantly, ${Master}, for you and any other potential partners, too."`);
		} else {
			if (hasAnyArms(slave)) {
				r.push(`${He} explains through gestures that ${he}'s been thinking of ways to make sex with overly pregnant slaves more convenient and enjoyable, and would like your permission to develop them.`);
			} else {
				r.push(`Your assistant explains that the ${girl} has been thinking of ways to make sex with overly pregnant slaves more convenient and enjoyable, and would like your permission to develop them.`);
			}
		}

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You consider ${his} offer. Will you support ${him}?`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`No, and remind ${him} of ${his} place.`, no),
			new App.Events.Result(`Yes, and offer to help ${him} in a... personal capacity`, yes),
			new App.Events.Result(`Yes, and offer to fund ${his} endeavors with ${cashFormat(10000)}`, fund),
		]);

		function no() {
			let frag = document.createDocumentFragment();
			let r = [];
			r.push(`You calmly explain to your baby-filled broodmother that ${he} is property and expected to fulfill ${his} duties, not to think. ${He} is not to pursue this matter further.`);
			if (slave.trust < -95) {
				r.push(`You then rape ${him}, hard, to get your point across, ignoring ${his} moans of pain and the loud complaints from ${his} overfilled womb as it barely holds together under your assault. The bitch is delusional, idolizing ${himself} and ${his} position like this. ${slave.slaveName} has been holding onto sanity by a thread with this idea about loving what ${he} is, but your rejection breaks something fundamental inside of ${him}. ${He}'s a baby machine. ${His} body belongs to you. ${His} brain is just a vestigial accessory to ${his} womb and pussy. <span class="mindbreak">${slave.slaveName} is broken.</span> ${He} will never question ${his} place again.`);
				applyMindbroken(slave);
				r.push(VCheck.Vaginal(slave, 1));
			} else if (slave.trust < -20) {
				r.push(`You then fuck ${him}, hard, to get your point across, ignoring ${his} moans of pain and the loud complaints from ${his} overfilled womb as it barely holds together under your assault. When you finally get bored and`);
				if (V.PC.dick !== 0) {
					r.push(`shoot your load into ${his}`);
					if (slave.vagina >= 10) {
						r.push(`gaping pussy,`);
					} else if (slave.vagina > 3) {
						r.push(`loose pussy,`);
					} else if (slave.vagina >= 1) {
						r.push(`vagina,`);
					} else {
						r.push(`surprisingly resilient, tight little pussy,`);
					}
					r.push(VCheck.Vaginal(slave, 1));
				} else {
					r.push(`clench your legs around ${his} slutty head as ${he} drives your pussy over the edge with ${his} tongue,`);
					seX(slave, "oral", V.PC, "penetrative");
				}
				r.push(`${he} cries out in a reciprocating orgasm and then cries out a second time when, massive stomach shuddering,`);
				if (slave.broodmother > 1) {
					r.push(`${he} begins to give birth to yet another child. You call your menials back to your office and decide to take a walk. By the time you're at the door, the head of ${slave.slaveName}'s next child is already cresting.`);
				} else if (slave.broodmother === 0 && slave.preg > slave.pregData.minLiveBirth + 1) {
					r.push(`${his} water breaks. You call your menials back to your office and decide to take a walk. As you pass by ${him}, it's clear that ${he}'ll have more important things to think about it the coming day.`);
					startLabor(slave);
				} else {
					r.push(`${his} brood shifts precariously. You call your menials back to your office and decide to take a walk. As you pass by ${him}, it's clear that ${he}'ll be more concerned with staying whole than whatever foolish endeavors ${he} was planning.`);
				}
				r.push(`${slave.slaveName} is now more <span class="gold">fearful.</span>`);
				slave.trust -= 4;
			} else {
				if (canTalk(slave)) {
					r.push(`"I'm sorry, ${Master}," ${he} ${say}s, "I just thought, well... nevermind."`);
				} else {
					if (hasAnyArms(slave)) {
						r.push(`${He} motions in apology, trying to hide ${his} extreme disappointment.`);
					} else {
						r.push(`${He} is mute and limbless, so it is nearly impossible for ${him} to communicate ${his} feelings without a great deal of forward planning and help from your AI assistant. Despite this, you can tell ${he}'s disappointed.`);
					}
				}
				App.Events.addParagraph(frag, r);
				r = [];
				if (hasAnyCyberneticEyes(slave)) {
					r.push(`${His} pretty ${App.Desc.eyesColor(slave, "bionic")} flash a shade cooler than normal and you can tell ${he}'s struggling to accept your decision.`);
				} else {
					r.push(`You can see tears brimming in ${his} ${App.Desc.eyesColor(slave)}.`);
				}
				r.push(`You kiss ${him} on the head, make sweet love to ${him} to improve ${his} mood, then have ${him} escorted out of your office.`);
				r.push(VCheck.Vaginal(slave, 1));
				r.push(`You are certain you made the right choice. If possible, ${slave.slaveName} is now more <span class="devotion inc">devoted.</span>`);
				slave.devotion += 5;
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function yes() {
			let frag = document.createDocumentFragment();
			let r = [];
			r.push(`Being so close to the near-bursting womb of your slave for so long has got your loins stirring, and you hop up onto your desk, bringing your`);
			if (V.PC.dick !== 0) {
				r.push(`dick`);
			} else {
				r.push(`vagina`);
			}
			r.push(`level with the broodmother's mouth. You tell ${him} that you could be convinced to let ${him} explore ${his} interests. ${He} squeals in delight and`);
			if (V.PC.dick !== 0) {
				r.push(`wraps ${his}`);
				if (slave.lips > 95) {
					r.push(`plush mouth pussy`);
				} else if (slave.lips > 70) {
					r.push(`thick, dick-sucking lips`);
				} else if (slave.lips > 20) {
					r.push(`lips`);
				} else {
					r.push(`thin, almost childlike lips`);
				}
				r.push(`around your penis.`);
				if (canTalk(slave)) {
					r.push(`Between ${his} slurping and sucking, ${he} manages to get out enough intelligible words to give you a good idea about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
				} else {
					if (hasAnyArms(slave)) {
						r.push(`While slurping and sucking, ${he} signs to you, communicating ${his} ideas about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
					} else {
						r.push(`${He} focuses on slurping and sucking on your knob while your personal assistant explains ${his} ideas about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
					}
				}
			} else {
				if (canTalk(slave)) {
					r.push(`buries ${his} eager tongue in your quim. Between sucking on your clit and moaning, ${he} manages to get out enough intelligible words to give you a good idea about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
				} else {
					if (hasAnyArms(slave)) {
						r.push(`While burying ${his} tongue in your quim, ${he} signs to you, communicating ${his} ideas about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
					} else {
						r.push(`${He} focuses burying ${his} tongue in your quim while your personal assistant explains ${his} ideas about the sorts of things ${he} thinks could make sex with an enormously pregnant slave more fun.`);
					}
				}
			}
			seX(slave, "oral", V.PC, "penetrative");
			r.push(`While you're not interested in giving ${him} the funds necessary to make some of ${his} more outlandish ideas a reality, you're certainly excited by ${his} ideas regarding positions and hyperpregnant vaginal play. You tell ${him} to go for those and ${he} trills in delight, vibrating ${his} tongue`);
			if (V.PC.dick !== 0) {
				r.push(`along your dick and sending you over the edge. ${He} swallows your load, licking ${his} lips.`);
				if (canTalk(slave)) {
					r.push(
						Spoken(slave, `"Make sure to keep feeding me your cum,"`),
						`${he} ${say}s flirtatiously.`,
						Spoken(slave, `"I'm eating for a`),
						App.UI.DOM.makeElement("span", Spoken(slave, `lot`), "note"),
						Spoken(slave, `more than two, after all."`)
					);
				} else {
					if (hasAnyArms(slave)) {
						r.push(`${He} signs to you, begging you to keep feeding ${him} your cum, as ${he}'s eating for a lot more than two.`);
					} else {
						r.push(`${He} then nuzzles your crotch possessively, looking up at your face with devoted eyes.`);
					}
				}
			} else {
				r.push(`in your intimate spaces and sending you over the edge. ${He} removes ${himself} from your pussy and licks ${his} lips.`);
				if (canTalk(slave)) {
					r.push(
						Spoken(slave, `"Make sure to keep feeding me your pussy juice,"`,),
						`${he} ${say}s flirtatiously.`,
						Spoken(slave, `"I'm eating for a`),
						App.UI.DOM.makeElement("span", Spoken(slave, `lot`), "note"),
						Spoken(slave, `more than two, after all."`)
					);
				} else {
					if (hasAnyArms(slave)) {
						r.push(`${He} signs to you, begging you to keep feeding ${him} your pussy juice, as ${he}'s eating for a lot more than two.`);
					} else {
						r.push(`${He} then nuzzles your crotch possessively, looking up at your face with devoted eyes.`);
					}
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You congratulate yourself on having made the right decision as ${slave.slaveName} <span class="devotion inc">grows ever closer to you,</span> and ever larger in ${his} middle, over the course of the next week.`);
			slave.devotion += 5;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function fund() {
			let frag = document.createDocumentFragment();
			let r = [];
			r.push(`You are intrigued by ${his} offer.`);
			if (hasAnyArms(slave)) {
				r.push(`You take ${his}`);
				if (V.seeRace === 1) {
					r.push(`${slave.race}`);
				}
				r.push((hasBothArms(slave)) ? `hands` : `hand`);
				r.push(`in yours, noting their pleasant softness, and direct ${him} to explain.`);
			} else {
				r.push(`You place a hand on ${his} exaggerated gut and direct ${him} to explain.`);
			}
			r.push(`${He} blushes, sexually stimulated by even this minor touch, and`);
			if (canTalk(slave)) {
				r.push(`describes various ideas ${he}'s had for tools and techniques that could improve an enormously pregnant girl's sexual potential.`);
			} else {
				if (hasAnyArms(slave)) {
					r.push(`signs, describing various ideas ${he}'s had for tools and techniques that could improve an enormously pregnant girl's sexual potential.`);
				} else {
					r.push(`wiggles a stump, prompting your personal assistant to describe various ideas ${he}'s had for tools and techniques that could improve an enormously pregnant girl's sexual potential.`);
				}
			}
			r.push(`Picturing the actions as ${he} describes them gets`);
			if (V.PC.dick !== 0) {
				r.push(`you rock hard in short order`);
			} else {
				r.push(`your pussy dripping with need in short order`);
			}
			r.push(`and, as the description continues, you move around behind your broodmother, pushing ${him} up onto ${his} tremendous womb so that you can fuck ${him} against it. ${His} belly squashes down slightly under your weight, but less than you'd expect — ${he}'s so packed full of children that ${his} stomach resists changing shape. ${He} wiggles ${his} hips as you`);
			if (slave.butt > 11) {
				r.push(`sink face first into ${his} warm, room-filling ass cleavage`);
			} else if (slave.butt > 5) {
				r.push(`grab generous handfuls of ${his} humongous ass`);
			} else if ((slave.buttImplant / slave.butt) > .60) {
				r.push(`rest the weight of your upper body on ${his} implant-inflated ass cheeks`);
			} else if (slave.butt > 2) {
				r.push(`slap ${his} generous ass`);
			} else {
				r.push(`press down on ${his} petite little ass with your hips`);
			}
			r.push(`and begin teasing ${his} pussy with`);
			if (V.PC.dick !== 0) {
				r.push(`the tip of your dick.`);
			} else {
				r.push(`your fingers.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			if (canTalk(slave)) {
				r.push(`"Ooh, ${Master}," your slave ${say}s, "if you keep this up you'll wake the babies."`);
			} else {
				if (hasAnyArms(slave)) {
					r.push(`Your slave signs, teasingly implying that you'll wake the babies.`);
				} else {
					r.push(`The skin of your slave's monumental belly flushes red and ${he} wiggles ${his} stumps in combined embarrassment and arousal.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Despite ${his} complaints, ${he} doesn't seem to mind once you start really fucking ${him} senseless.`);
			r.push(VCheck.Vaginal(slave, 1));
			r.push(`Once you've finished melting your swollen "little" sex slave into a puddle of sexually satisfied goo,`);
			if (V.PC.dick !== 0) {
				r.push(`shooting your load into ${his} wanting pussy,`);
			} else {
				r.push(`collapsing into orgasm on ${his} bloated body,`);
			}
			r.push(`you call up your personal assistant, giving ${himA} orders to have your menials collect your exhausted breeder and to ensure ${he} has all the funds necessary to make ${his} perverted dreams a reality. ${slave.slaveName} can only <span class="devotion inc">idolize you.</span>`);
			cashX(-10000, "event", slave);
			slave.devotion += 15;
			V.pregInventor = 1;

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
