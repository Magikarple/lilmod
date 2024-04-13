App.Events.RESSAmpDevoted = class RESSAmpDevoted extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.devotion > 20,
				s => s.assignment !== Job.QUARTER,
				isAmputee,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`Lying on the couch next to your desk as you work is`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		r.push(`looking like the neglected`);
		if (eventSlave.belly >= 600000) {
			if (eventSlave.bellyPreg > 0) {
				r.push(`baby-filled womb`);
			} else {
				r.push(`overinflated sex toy`);
			}
		} else if (eventSlave.belly >= 5000) {
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`blow-up`);
			} else {
				r.push(`${eventSlave.inflationType}-filled`);
			}
			r.push(`sex toy`);
		} else {
			r.push(`little sex toy`);
		}
		r.push(`that ${he} is. You've been busy and haven't used ${him} for a while, and since ${he}'s accepted ${his} place as a helpless living fucktoy, ${he}'s gotten quite aroused with nothing to do but lie there and watch ${his} ${getWrittenTitle(eventSlave)} work. It's not like ${he} can touch ${himself} any more.`);
		if (eventSlave.chastityPenis === 1) {
			r.push(`${His} caged cock reduces ${him} to a set of holes in a limbless torso.`);
		} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`${His} penis hangs limp and useless from ${his} limbless torso.`);
		} else if (eventSlave.dick >= 5) {
			r.push(`${His} huge erection pokes out from ${his} limbless torso, ${his} only remaining appendage.`);
		} else if (eventSlave.dick > 2) {
			r.push(`${His} still-proud erection pokes out from ${his} limbless torso.`);
		} else if (eventSlave.dick > 0) {
			r.push(`${His} pathetic little erection pokes out from ${his} limbless torso.`);
		} else if (eventSlave.clit > 0) {
			r.push(`${His} engorged clit juts out from ${his} legless hips.`);
		} else if (eventSlave.vagina === -1) {
			if (canDoAnal(eventSlave)) {
				r.push(`${His} asspussy is on total display, unobscured by thighs.`);
			} else {
				r.push(`${His} anal chastity is on total display, unobscured by thighs.`);
			}
		} else {
			if (canDoVaginal(eventSlave)) {
				r.push(`${His} moist pussy is on total display, unobscured by thighs.`);
			} else {
				r.push(`${His} vaginal chastity is on total display, unobscured by thighs.`);
			}
		}
		if (eventSlave.belly >= 10000) {
			r.push(`${His}`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`advanced pregnancy`);
			} else {
				r.push(`greatly distended belly`);
			}
			r.push(`gives ${him} a comically rounded appearance.`);
		}
		if (eventSlave.boobs > 4000) {
			r.push(`${He}'s almost smothered by ${his} gigantic breasts as ${he} lies there; ${his} remaining body is almost half breasts.`);
		}
		App.Events.addParagraph(node, r);

		let choices = [];
		if (eventSlave.belly < 1500 && (canDoAnal(eventSlave) || canDoVaginal(eventSlave))) {
			choices.push(new App.Events.Result(`Carry ${him} over to your work`, work, virginityCheck()));
		}
		if ((V.PC.dick !== 0) && (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) && V.PC.belly < 100) {
			choices.push(new App.Events.Result(`Carry ${him} outside`, outside, virginityCheck()));
		}
		choices.push(new App.Events.Result(`See how high ${his} arousal will go`, high));
		App.Events.addResponses(node, choices);

		function virginityCheck() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function work() {
			const {
				hisP, heP, himP
			} = getPronouns(V.PC).appendSuffix("P");
			r = [];
			r.push(`Since you're so busy, you find a way of working and seeing to your sex toy both. You scoop ${him} up, eliciting whimpers of joy at the impending relief,`);
			if (V.PC.dick === 0) {
				r.push(`and move over to the couch so you can work lying down. You sit ${him} on top of you, reversed so ${his} head is between your legs for a little oral service, and slide a dildo`);
				if (canDoVaginal(eventSlave)) {
					r.push(`into ${his} pussy so you can tease ${him} at leisure when you have a spare moment.`);
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(`up ${his} butt so you can sodomize ${him} at leisure when you have a spare moment.`);
					r.push(VCheck.Anal(eventSlave, 1));
				}
			} else {
				r.push(`and sit back down at your desk. You slide ${him} onto your erect member and carefully secure ${him} with a few straps so ${he} can serve as your living cocksleeve as you see to your business.`);
			}
			r.push(`There isn't much thrusting as you continue with your affairs, but ${he}'s so horny ${he} doesn't need it. <span class="devotion inc">${He} has become more submissive to you.</span> There's no telling what the day's faceless business interlocutors would think if they knew the person on the other side of their communications had`);
			if (V.PC.dick === 0) {
				r.push(`a limbless slave gently sucking ${hisP} clit while they spoke with ${himP}.`);
			} else {
				r.push(`${hisP} cock inside a limbless slave as ${heP} dealt with them.`);
			}
			eventSlave.devotion += 4;
			return r;
		}

		function outside(){
			r = [];
			if (eventSlave.belly >= 600000) {
				r.push(`You struggle to heft ${his} overfilled body up, eliciting whimpers of joy at the impending relief and the pressure removed from ${his} body, and carefully secure ${him} with a few straps so ${he} can serve as your living cocksleeve. ${He}'s attached to the front of your torso`);
				if (eventSlave.belly >= 5000) {
					r.push(r.pop() + ",");
					r.push(`${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`stomach`);
					}
					r.push(`forcing you to experience what it is like to carry ${eventSlave.pregType} children,`);
				}
				r.push(`with your cock up inside ${him}, and the gentle motion of your member as you waddle outside brings ${him} to climax within a few steps. You carefully stroll around the nicer levels of the arcology, admiring the views and`);
				if (canSee(eventSlave)) {
					r.push(`showing ${eventSlave.slaveName} the sights ${he} now requires assistance to see`);
				} else if (canHear(eventSlave)) {
					r.push(`explaining the sights as ${eventSlave.slaveName} soaks in the sounds`);
					if (canSmell(eventSlave)) {
						r.push(`and smells`);
					}
					r.push(`${he} now requires assistance to experience`);
				} else {
					r.push(`explaining everything around ${him} as ${he} basks in the feeling of the fresh air on ${his} ${eventSlave.skin} skin`);
				}
				r.push(`and leaving a large wake as people make room for your gravid mass. <span class="devotion inc">${He} has become more devoted to you.</span> The sight of you waddling around with a living fucktoy on your cock <span class="reputation inc">certainly cements your reputation as an arcology owner who has everything,</span> once they figure out that the belly attached to you is, in fact, owned by a barely visible slave${girl}.`);
			} else if (eventSlave.belly >= 300000) {
				r.push(`You heft ${his} heavy body up, eliciting whimpers of joy at the impending relief, and carefully secure ${him} with a few straps so ${he} can serve as your living cocksleeve. ${He}'s attached to the front of your torso`);
				if (eventSlave.belly >= 5000) {
					r.push(r.pop() + ",");
					r.push(`${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`stomach`);
					}
					r.push(`massively jutting out in front of you,`);
				}
				r.push(`with your cock up inside ${him}, and the gentle motion of your member as you waddle outside brings ${him} to climax within a few steps. You carefully stroll around the nicer levels of the arcology, admiring the views and`);
				if (canSee(eventSlave)) {
					r.push(`showing ${eventSlave.slaveName} the sights ${he} now requires assistance to see.`);
				} else if (canHear(eventSlave)) {
					r.push(`explaining the sights as ${eventSlave.slaveName} soaks in the sounds`);
					if (canSmell(eventSlave)) {
						r.push(`and smells`);
					}
					r.push(`${he} now requires assistance to experience.`);
				} else {
					r.push(`explaining everything around ${him} as ${he} basks in the feeling of the fresh air on ${his} ${eventSlave.skin} skin.`);
				}
				r.push(`<span class="devotion inc">${He} has become more devoted to you.</span> The sight of you waddling around with a living fucktoy on your cock <span class="reputation inc">certainly cements your reputation as an arcology owner who has everything.</span>`);
			} else {
				r.push(`You scoop ${him} up, eliciting whimpers of joy at the impending relief, and carefully secure ${him} with a few straps so ${he} can serve as your living cocksleeve. ${He}'s attached to the front of your torso`);
				if (eventSlave.belly >= 5000) {
					r.push(r.pop() + ",");
					r.push(`${his} ${belly}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`stomach`);
					}
					r.push(`jutting out in front of you,`);
				}
				r.push(`with your cock up inside ${him}, and the gentle motion of your member as you walk outside brings ${him} to climax within a few steps. You take your time and stroll around the nicer levels of the arcology, admiring the views and`);
				if (canSee(eventSlave)) {
					r.push(`showing ${eventSlave.slaveName} the sights ${he} now requires assistance to see.`);
				} else if (canHear(eventSlave)) {
					r.push(`explaining the sights as ${eventSlave.slaveName} soaks in the sounds`);
					if (canSmell(eventSlave)) {
						r.push(`and smells`);
					}
					r.push(`${he} now requires assistance to experience.`);
				} else {
					r.push(`explaining everything around ${him} as ${he} basks in the feeling of the fresh air on ${his} ${eventSlave.skin} skin.`);
				}
				r.push(`<span class="devotion inc">${He} has become more devoted to you.</span> The sight of you walking around with a living fucktoy on your cock <span class="reputation inc">certainly cements your reputation as an arcology owner who has everything.</span>`);
			}
			eventSlave.devotion += 4;
			repX(500, "event", eventSlave);
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			return r;
		}

		function high(){
			const inch = V.showInches === 2 ? "inch" : "centimeter";
			r = [];
			r.push(`You scoop ${him} up, eliciting whimpers of joy at the impending relief. ${He} moans with disappointment, however, to find ${himself} laid unceremoniously across your desk as you return to your work. You surreptitiously set your desk to monitor ${his} vital signs and gauge ${his} closeness to orgasm. Whenever you can do so without tipping ${his} over, you gently run your fingers across a helpless nipple, across ${his}`);
			if (eventSlave.vagina === -1) {
				r.push(`groin,`);
			} else {
				r.push(`moist lips,`);
			}
			if (eventSlave.belly >= 10000) {
				r.push(`around the edge of ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
			} else if (eventSlave.belly >= 1500) {
				r.push(`over the peak of ${his}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
			}
			r.push(`belly, or along ${his} surgical scars.`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				r.push(`After so much of this that ${he}'s clearly ready to orgasm at the slightest further touch, you gently massage ${his} nether lips with a single finger and ${he} comes spastically, abdominal muscles quivering. ${His} pussy relaxes and opens naturally; taking the cue, you pick ${him} up and lower ${him}, ${inch} by moaning ${inch}, onto`);
				if (V.PC.dick === 0) {
					r.push(`a strap-on you put on while playing with ${his}.`);
				} else {
					r.push(`your cock.`);
				}
				r.push(VCheck.Vaginal(eventSlave, 1));
				r.push(`After pumping ${his} helpless torso up and down with your arms, a parody of masturbation with ${his} helpless body,`);
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				r.push(`After so much of this that ${he}'s clearly ready to orgasm at the slightest further touch, you gently massage ${his} anus with a single finger and ${he} comes spastically, abdominal muscles quivering. ${His} sphincter relaxes and opens naturally; taking the cue, you pick ${him} up and lower ${his} rectum, ${inch} by sobbing ${inch}, onto`);
				if (V.PC.dick === 0) {
					r.push(`a strap-on you put on while playing with ${his}.`);
				} else {
					r.push(`your cock.`);
				}
				r.push(VCheck.Anal(eventSlave, 1));
				r.push(`After pumping ${his} helpless torso up and down with your arms, a parody of masturbation with ${his} helpless body,`);
			} else {
				r.push(`After so much of this that ${he}'s clearly ready to orgasm at the slightest further touch, you grab ${his}`);
				if (eventSlave.boobs > 8000) {
					r.push(`massive tits`);
				} else if ((eventSlave.boobsImplant/eventSlave.boobs) >= .60) {
					r.push(`fake tits`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`huge boobs`);
				} else if (eventSlave.boobs > 400) {
					r.push(`boobs`);
				} else {
					r.push(`petite chest`);
				}
				r.push(`and ${he} comes spastically, soaking ${himself} and your desk with fluids. Once you tire of vigorously groping ${him},`);
			}
			r.push(`you carry your toy to the shower to wash ${him}. <span class="trust inc">${He} has become more trusting of you.</span>`);
			eventSlave.trust += 4;
			return r;
		}
	}
};

