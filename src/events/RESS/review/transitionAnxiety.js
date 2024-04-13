App.Events.RESSTransitionAnxiety = class RESSTransitionAnxiety extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment !== Job.QUARTER,
				s => s.devotion <= 20,
				s => s.trust <= -20,
				s => s.genes === "XY",
				s => s.dick > 0,
				s => s.chastityPenis !== 1,
				s => s.vagina === -1,
				s => s.attrXY < 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {hisP} = getPronouns(V.PC).appendSuffix("P");
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`stumbles into your office naked for ${his} weekly inspection, so apprehensive that ${he} can hardly walk. ${He}'s been like this ever since ${he} became one of your sex slaves,`,
		);
		if (V.week-eventSlave.weekAcquired === 0) {
			r.push(`just this week.`);
		} else if (V.week-eventSlave.weekAcquired === 1) {
			r.push(`just last week.`);
		} else {
			r.push(`${num(V.week-eventSlave.weekAcquired)} weeks ago.`);
		}
		r.push(`It's not surprising; slaves like ${him} usually require some time and training to accept that they're slavegirls. ${He} lacks the natural attraction to men that might have made the idea more comfortable for ${him}, and the resulting sexual anxiety combined with understandable fear of sexual use makes ${him} extremely unhappy to be naked in front of someone ${he} knows can fuck ${him} at will.`);
		r.toParagraph();
		r.push(`${He} has ${his} hands balled into fists at ${his} sides, and clearly wants nothing more than to use them to cover ${his}`);
		if (eventSlave.chastityPenis === 1) {
			r.push(`pitiful caged dick.`);
		} else if (eventSlave.balls === 0) {
			r.push(`pathetic, ballsless bitchclit.`);
		} else if (eventSlave.aphrodisiacs > 0 || eventSlave.inflationType === "aphrodisiac") {
			r.push(`aphrodisiac-induced erection.`);
		} else if (eventSlave.dick > 3) {
			r.push(`impressively sized but pathetically soft dick.`);
		} else {
			r.push(`soft, pathetic little dick.`);
		}
		r.push(`${He} knows that that's not allowed, and keeps ${his} hands where they are, though it's a struggle. ${He}`);
		if (canSee(eventSlave)) {
			r.push(`sees you looking at`);
		} else {
			r.push(`knows you are eyeing`);
		}
		r.push(`${his} body like a slaveowner looks at one of ${hisP} sex slaves, and ${he} shivers.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			canDoAnal(eventSlave)
				? new App.Events.Result(`Fuck ${him}`, fuck, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
			new App.Events.Result(`Humiliate ${him} in public`, humiliate)
		]);

		function fuck() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You announce that you're going to fuck ${his}`);
			if (eventSlave.anus === 0) {
				r.push(`virgin`);
			}
			r.push(`asspussy. To your complete lack of surprise, ${he} can't hide ${his} horror at the prospect of`);
			if (V.PC.dick !== 0) {
				r.push(`having a cock inside ${him},`);
			} else {
				r.push(`being fucked with a strap-on,`);
			}
			r.push(`and ${his}`);
			if (canSee(eventSlave)) {
				r.push(`wide, ${App.Desc.eyesColor(eventSlave)} track`);
			} else {
				r.push(`terrified face follows`);
			}
			r.push(`your movements closely as you stand up and`);
			if (V.PC.dick !== 0) {
				r.push(`reveal the formidable member`);
			} else {
				r.push(`don the strap-on`);
			}
			r.push(`you're about to breed ${him} with. You order ${him} to`);
			if (hasAnyLegs(eventSlave)) {
				r.push(`kneel`);
			} else {
				r.push(`get`);
			}
			r.push(`on the couch, which ${he} does, <span class="trust dec">cringing in fear of being buttfucked, but knowing disobedience will be worse;</span> and then you order ${him} to reach down and spread ${his} butt for you, as wide as it'll go. ${He} complies,`);
			if (eventSlave.butt > 12) {
				r.push(`grabbing as much flesh as ${he} can of each monstrous buttock and heaving them as far apart as ${he} can manage in an attempt`);
			} else if (eventSlave.butt > 6) {
				r.push(`taking a handful of each massive buttock and heaving them apart to reveal ${his}`);
			} else if (eventSlave.butt > 3) {
				r.push(`pulling ${his} plush buttocks apart`);
			} else {
				r.push(`even though ${his} cute ass doesn't have to be spread`);
			}
			r.push(`to reveal ${his}`);
			if (eventSlave.anus > 2) {
				r.push(`whorish anal slit.`);
			} else if (eventSlave.butt > 1) {
				r.push(`relaxed rear hole.`);
			} else {
				r.push(`tight little rosebud.`);
			}
			r.push(`You let ${him} soak in ${his} discomfort,`);
			if (V.PC.dick !== 0) {
				r.push(`stroking your cock gently`);
			} else {
				r.push(`rubbing a little lube on the tip of your phallus`);
			}
			r.push(`and letting ${him} see how big it is. ${His} cringing even extends to ${his} asshole,`);
			if (eventSlave.analArea > 3) {
				r.push(`the huge area of crinkled skin`);
			} else if (eventSlave.analArea > 1) {
				r.push(`the crinkled skin around ${his} anus`);
			} else {
				r.push(`${his} little pucker`);
			}
			r.push(`tensing as ${he} anticipates anal sex.`);
			eventSlave.trust -= 3;

			r.toParagraph();
			App.Events.addResponses(frag, [
				new App.Events.Result(`Make sure ${he} gets off on it`, off),
				new App.Events.Result(`Rape ${him}`, rape),
			]);
			return r.container();

			function off() {
				const r = new SpacedTextAccumulator();
				r.push(`You press`);
				if (V.PC.dick !== 0) {
					r.push(`yourself`);
				} else {
					r.push(`your weapon`);
				}
				r.push(`past ${his} sphincter with care, and ${his} posture softens a little as ${he} realizes you aren't going to hurt ${him}. Once you've hilted`);
				if (V.PC.dick !== 0) {
					r.push(`your cock`);
				} else {
					r.push(`the strap-on`);
				}
				r.push(`inside ${him}, you caress ${his}`);
				if (eventSlave.belly >= 150000) {
					r.push(`${belly} distended`);
				} else if (eventSlave.weight > 95) {
					r.push(`fat`);
				} else if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy-swollen`);
					} else if (eventSlave.bellyImplant >= 3000) {
						r.push(`implant-swollen`);
					} else {
						r.push(`${eventSlave.inflationType}-bloated`);
					}
				} else if (eventSlave.weight > 30) {
					r.push(`chubby`);
				} else if (eventSlave.waist < -95) {
					r.push(`narrow`);
				} else if (eventSlave.muscles > 30) {
					r.push(`muscular`);
				} else if (eventSlave.waist < -10) {
					r.push(`wasp`);
				} else if (eventSlave.weight > 10) {
					r.push(`soft`);
				} else if (eventSlave.muscles > 5) {
					r.push(`toned`);
				} else {
					r.push(`thin`);
				}
				r.push(`waist, running your hands across ${his} skin. Then you`);
				if (eventSlave.piercing.genitals.smart) {
					r.push(`activate ${his} smart frenulum piercing.`);
				} else {
					r.push(`secure a couple of little egg vibes to ${his} dick.`);
				}
				r.push(`${He} gasps as the vibration starts, and then gasps again as ${his} anus tightens involuntarily with the stimulation, squeezing the`);
				if (V.PC.dick !== 0) {
					r.push(`warm penis`);
				} else {
					r.push(`phallus`);
				}
				r.push(`that fills it. ${He}`);
				if (eventSlave.voice > 0) {
					r.push(`moans openly`);
				} else {
					r.push(`rasps mutely`);
				}
				r.push(`as you pull out and then thrust into ${him}. Much against ${his} will, ${he}`);
				if (canAchieveErection(eventSlave)) {
					r.push(`quickly becomes erect.`);
				} else {
					r.push(`starts to drip precum, which is ${his} ballsless body's way of showing arousal.`);
				}
				if (eventSlave.fetish === "buttslut") {
					if (eventSlave.fetishKnown === 1) {
						if (eventSlave.fetishStrength > 95) {
							r.push(`Every time ${he} takes it up the butt, ${he}'s reminded that ${he}'s a natural buttslut, and the reminder <span class="fetish inc">helps ${him} relax and accept sodomy.</span>`);
							eventSlave.fetishStrength += 10;
						} else {
							r.push(`${He} knows ${he} gets off easily on anal stimulation, but taking it like this still isn't ${his} favorite activity. Still, the`);
							if (eventSlave.prostate > 0) {
								r.push(`prostate`);
							} else {
								r.push(`rectal`);
							}
							r.push(`stimulation does its work, and ${he} <span class="devotion inc">submits to having ${his} favorite hole pleasured.</span>`);
							eventSlave.devotion += 3;
						}
					} else {
						r.push(`You notice that ${he} stiffens again, looking down at ${his} traitorous member in shock at how much ${he} enjoys the sensation of`);
						if (eventSlave.prostate > 0) {
							r.push(`prostate`);
						} else {
							r.push(`rectal`);
						}
						r.push(`stimulation. <span class="fetish gain">${He}'s a buttslut!</span>`);
						eventSlave.fetishKnown = 1;
					}
				}
				r.push(VCheck.Anal(eventSlave, 1));
				r.push(`Not long after you penetrate ${him}, ${he}`);
				if (eventSlave.balls > 0) {
					r.push(`squirts a weak ejaculation onto the couch.`);
				} else {
					r.push(`shivers and releases some watery fluid.`);
				}
				r.push(`${He} had almost forgotten that ${he} was being fucked like a girl, and stiffens uncomfortably when ${he} feels you`);
				if (V.PC.dick !== 0) {
					r.push(`fill ${his} rectum with your hot seed.`);
				} else {
					r.push(`grip ${his} hips harder and shake with your own climax.`);
				}
				r.push(`As ${he} gets up from the couch, ${he} seems <span class="devotion inc">subdued and submissive.</span> After all, if ${he}'s submitting to you, that absolves ${him} of responsibility for what ${he}'s becoming.`);
				eventSlave.devotion += 5;
				r.toParagraph();
				return r.container();
			}

			function rape() {
				const r = new SpacedTextAccumulator();
				r.push(`You grab ${his} hips, getting a good grip, and spear the poor ${SlaveTitle(eventSlave)} without any hint of mercy. ${He}`);
				if (eventSlave.voice > 0) {
					r.push(`screams in pain and fear,`);
				} else {
					r.push(`sucks in a great sobbing gasp,`);
				}
				r.push(`and tries to wriggle away despite ${his} intention of submitting to your use, but you hold ${him} in place and rape ${his} ass.`);
				r.push(VCheck.Anal(eventSlave, 1));
				r.push(`${He} tries to maintain ${his} position, crying openly, but eventually slides off ${his} perch on the couch, pulling ${his} hole off your`);
				if (V.PC.dick !== 0) {
					r.push(`dick.`);
				} else {
					r.push(`strap-on.`);
				}
				r.push(`You grab ${him} by`);
				if (eventSlave.hLength > 20) {
					r.push(`hair`);
				} else {
					r.push(`neck`);
				}
				r.push(`and smash ${his} face into the angle of the couch, leaving ${his} poor butt completely vulnerable. ${He} can't see you line up to ream ${him} again, but ${he} knows it's coming and cries, quivering. After a while, you haul ${him} up to ${his} feet and keep fucking ${him}, the uncomfortable angle of standing anal forcing new`);
				if (eventSlave.voice > 0) {
					r.push(`squeals`);
				} else {
					r.push(`rasps`);
				}
				r.push(`out of ${him}. You pour degradation into ${his} ear as you take your pleasure from ${his} unhappy body, telling ${him} that ${he}'s your fuckmeat. ${He} believes you, and when you finally orgasm and let ${him} slide off your hateful`);
				if (V.PC.dick !== 0) {
					r.push(`penis,`);
				} else {
					r.push(`strap-on,`);
				}
				r.push(`${he}'s <span class="trust dec">already terrified</span> of the next time you feel like fucking ${him}.`);
				eventSlave.trust -= 5;
				r.toParagraph();
				return r.container();
			}
		}

		function humiliate() {
			const frag = document.createDocumentFragment();
			const r = new SpacedTextAccumulator(frag);
			r.push(`You get up from behind your desk, drawing an apprehensive`);
			if (canSee(eventSlave)) {
				r.push(`stare.`);
			} else {
				r.push(`look.`);
			}
			r.push(`To ${his} bemusement, you order ${him} to follow you and leave your office. ${He} hurries to obey, ${his} footsteps pattering along behind you, but they become much more hesitant as you make your way out of the penthouse and ${he} realizes that ${he}'s about to be in public, naked. You don't bother looking back, knowing that ${he}'s sufficiently afraid of you to obey. On the border between your private domain and the public hustle and bustle of the arcology's public life, ${he} stops for a long moment before scurrying to catch up with you, barely even noticing that <span class="devotion inc">${he} just swallowed ${his} sense of shame</span> to obey you and avoid punishment. You stroll along, greeting leading citizens and taking in the hum of your people. ${eventSlave.slaveName} grows increasingly embarrassed under the hot stares of passersby, cringing closer and closer to your protective side as ${he} notices how`);
			if (canSee(eventSlave)) {
				r.push(`many gazes rest with open hunger on`);
			} else {
				r.push(`many lewd comments focus on`);
			}
			r.push(`${his} mouth, ${his} crotch, and ${his} ass.`);
			eventSlave.devotion += 3;

			r.toParagraph();
			App.Events.addResponses(frag, [
				new App.Events.Result(`Make ${him} perform oral on you, right here`, perform),
				new App.Events.Result(`Make ${him} cum in public`, cum)
			]);

			return r.container();

			function perform() {
				const r = new SpacedTextAccumulator();
				r.push(`You reach around, place a dominating hand on ${his} shoulder, pull ${him} around in front of you, and push ${him} down to ${his} knees. ${He} quickly realizes what's coming, and ${his} ${eventSlave.skin} cheeks blush furiously as you reveal your`);
				if (V.PC.dick !== 0) {
					r.push(`meaty dick`);
				} else {
					r.push(`flushed pussy`);
				}
				r.push(`and offer it to ${him}. ${He} gets busy, burying ${his} head against you with a speed that seems surprising until it occurs to you that this allows ${him} to hide ${his} face. Deciding to accept this tiny compromise, you run a possessive hand`);
				if (eventSlave.hLength < 5) {
					r.push(`across ${his} smooth scalp`);
				} else if (eventSlave.hLength < 20) {
					r.push(`through ${his} short hair`);
				} else {
					r.push(`through ${his} tresses`);
				}
				r.push(`and murmur praise for ${his} enthusiasm. ${He} stiffens at the implication that ${he} wants to be`);
				if (V.PC.dick !== 0) {
					r.push(`polishing your penis`);
				} else {
					r.push(`eating you out`);
				}
				r.push(`in broad daylight, but after a slight pause ${he} decides that this isn't bad. As`);
				if (V.PC.dick !== 0) {
					r.push(`${his} head continues to bob back and forth as ${he} sucks your dick,`);
				} else {
					r.push(`${he} continues nuzzling ${his} nose and mouth against your wet cunt,`);
				}
				r.push(`${he} fails to notice ${his} <span class="devotion inc">second major submission today.</span>`);
				if (eventSlave.fetish === "humiliation") {
					if (eventSlave.fetishKnown === 1) {
						r.push(`Since ${he} has a humiliation fetish, the embarrassment has been arousing ${him} even as it's been torturing ${him}. Unsatisfied with just this, ${his} need to be shamed obliges ${him} to cock ${his} hips and make sure onlookers can see ${his} asspussy as ${he} services you with ${his} mouth.`);
						if (eventSlave.fetishStrength > 95) {
							r.push(`<span class="fetish inc">${His} need for humiliation has deepened.</span>`);
							eventSlave.fetishStrength += 10;
						} else {
							r.push(`Such abject sluttery <span class="devotion inc">helps convince ${him} of ${his} status as a slave ${girl}.</span>`);
							eventSlave.devotion += 3;
						}
					} else {
						r.push(`To your surprise, ${he} even starts to glance around, checking to verify that ${he}'s still being watched. <span class="fetish gain">${He}'s a humiliation slut!</span>`);
						eventSlave.fetishKnown = 1;
					}
				}
				eventSlave.devotion += 5;
				seX(eventSlave, "oral", V.PC, "penetrative");
				r.toParagraph();
				return r.container();
			}
			function cum() {
				const r = new SpacedTextAccumulator();
				r.push(`You produce three little egg vibrators, which instantly steal ${his} anxious attention away from the passersby who`);
				if (canSee(eventSlave)) {
					r.push(`stare`);
				} else {
					r.push(`whistle catcalls`);
				}
				r.push(`at ${him}. You require ${him} to hold ${his} dick out while you use an elastic band to attach one of the vibrators to the underside of its head. ${He} doesn't get to touch ${himself} much anymore, and the half-forgotten sensations of doing so almost make ${him} forget that ${he}'s naked in public, and almost certainly about to do something very embarrassing. Then you order ${him} to hold ${his} dick up and place another vibrator`);
				if (eventSlave.scrotum > 0) {
					r.push(`against ${his} sensitive scrotum.`);
				} else {
					r.push(`against the sensitive skin where ${his} scrotum used to be.`);
				}
				r.push(`Finally, you order ${him} to bend over and offer you ${his} asshole. ${He} obeys, with apprehension, and is actually relieved when you just place the final vibrator against, but not inside, ${his}`);
				if (eventSlave.anus > 1) {
					r.push(`asspussy.`);
				} else {
					r.push(`pucker.`);
				}
				r.push(`${He} finds ${himself} ordered to kneel and put ${his} hands on ${his} head; and ordering ${him} to hold this position, you use remote control of the vibrators to force ${him} to cum twice. ${He} can't`);
				if (canSee(eventSlave)) {
					r.push(`tear ${his} eyes away from`);
				} else {
					r.push(`tune out`);
				}
				r.push(`the citizens who stare and laugh as ${he}`);
				if (eventSlave.balls > 0) {
					r.push(`spurts ${his} seed`);
				} else {
					r.push(`dribbles weakly`);
				}
				r.push(`onto the floor.`);
				if (eventSlave.fetish === "humiliation") {
					if (eventSlave.fetishKnown === 1) {
						if (eventSlave.fetishStrength > 95) {
							r.push(`Though ${he}'s still unhappy about being a slave ${girl}, <span class="fetish inc">appetite for humiliation has deepened.</span>`);
							eventSlave.fetishStrength += 10;
						} else {
							r.push(`The abject humiliation slut climaxes harder each time, and can't stop ${himself} <span class="trust inc">glancing at you with something like trust.</span>`);
							eventSlave.trust += 3;
						}
					} else {
						r.push(`With a mix of horror and dawning arousal, ${he} discovers that ${he} enjoys the stares. <span class="fetish gain">${He}'s a humiliation slut!</span>`);
						eventSlave.fetishKnown = 1;
					}
				}
				r.push(`As ${he} follows you back to your penthouse, ${he} seems almost cheerful, and will definitely be <span class="trust inc">more trusting of strange orders</span> in the future.`);
				eventSlave.trust += 5;
				r.toParagraph();
				return r.container();
			}
		}
	}
};
