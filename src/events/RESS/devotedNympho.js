App.Events.RESSDevotedNympho = class RESSDevotedNympho extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.devotion > 50,
				s => s.anus > 0,
				s => s.vagina !== 0,
				s => s.assignment !== Job.QUARTER,
				s => s.energy > 95,
				s => canDoAnal(s) || canDoVaginal(s)
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him, himself} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let r = [];
		r.push(`On first slot of the inspection schedule for the day is`);
		r.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."));
		r.push(`When ${he} walks clumsily through the door of your office, it's obvious the poor nympho slut hasn't found release since waking up. ${His} incredible sex drive has ${his} arousal at a fever pitch.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He}'s walking awkwardly because of how painfully horny ${he} is. ${His}`);
		switch (eventSlave.nipples) {
			case "tiny":
				r.push(`tiny little nipples are rock hard.`);
				break;
			case "flat":
				r.push(`stretched nipples, which normally rest flush with ${his} areolae, are hard and prominent.`);
				break;
			case "puffy":
				r.push(`puffy nipples are flushed and stiff.`);
				break;
			case "partially inverted":
				r.push(`nipples, which normally rest flush with ${his} areolae, are fully erect.`);
				break;
			case "inverted":
				r.push(`nipples, which are normally fully inverted, are all the way out; that must have been a painful process.`);
				break;
			case "huge":
				r.push(`massive nipples are so big and hard ${he} could probably penetrate someone with them.`);
				break;
			case "fuckable":
				r.push(`fuckable nipples are practically swollen shut.`);
				break;
			default:
				r.push(`nipples are standing out with uncomfortable hardness.`);
		}
		if (eventSlave.chastityPenis) {
			r.push(`${His} chastity cage looks fit to burst with engorged dick.`);
		} else if (eventSlave.dick > 4 && canAchieveErection(eventSlave)) {
			r.push(`${His} gigantic erection waves around in front of ${him} as ${he} moves, its head describing a long arc in the air with each step.`);
		} else if (eventSlave.dick > 2 && canAchieveErection(eventSlave)) {
			r.push(`${His} erection waves around in front of ${him} as ${he} moves, its head bobbing lewdly up and down with each step.`);
		} else if (canAchieveErection(eventSlave)) {
			r.push(`${His} erection is so pathetically small that it stands out straight and stiff as ${he} moves.`);
		} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
			r.push(`${His} oversized dick is as engorged as ${his} body can manage.`);
		} else if (eventSlave.dick > 0) {
			r.push(`${He}'s actually partway erect despite ${his} impotence, a remarkable testament to ${his} need.`);
		} else if (eventSlave.chastityVagina) {
			r.push(`${His} chastity belt positively tortures ${him} as ${he} moves.`);
		} else if (eventSlave.labia > 1) {
			r.push(`${His} normally-large pussylips are even more prominent than usual, swollen with need.`);
		} else if (eventSlave.clit > 3) {
			r.push(`${His} dick-like clit stands out straight and stiff as ${he} moves.`);
		} else if (eventSlave.clit > 1) {
			r.push(`${His} huge, sensitive clit positively tortures ${him} as ${he} moves.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`${He} has no genitals to get hard or wet, but ${his} posture leaves no doubt that there's nothing ${he} wants more than to get ${his} ass reamed.`);
		} else {
			r.push(`${His} pussy is soaking wet, and streaks of female arousal are shining on ${his} inner thighs.`);
		}
		r.push(`As ${he} staggers to a halt in front of your desk,`);
		if (eventSlave.chastityPenis) {
			r.push(`the pressure on ${his} penis finally`);
		} else if (eventSlave.dick > 4 && canAchieveErection(eventSlave)) {
			r.push(`the movement of ${his} huge penis through the air`);
		} else if (eventSlave.dick > 2 && canAchieveErection(eventSlave)) {
			r.push(`${his} cock slaps up against ${his} stomach, which`);
		} else if (canAchieveErection(eventSlave)) {
			r.push(`${his} tiny dick is momentarily trapped between ${his} thighs, which`);
		} else if (eventSlave.dick > 6) {
			r.push(`${his} motion of ${his} gigantic cock against ${his} body.`);
		} else if (eventSlave.dick > 0) {
			r.push(`${his} floppy cock hits ${his} thighs, which`);
		} else if (eventSlave.chastityVagina) {
			r.push(`the friction against ${his} genitals finally`);
		} else if (eventSlave.labia > 1) {
			r.push(`which brings ${his} thighs together enough that this`);
		} else if (eventSlave.clit > 3) {
			r.push(`the movement of ${his} huge clit through the air`);
		} else if (eventSlave.clit > 1) {
			r.push(`stimulating ${his} clit enough that it`);
		} else if (eventSlave.vagina === -1) {
			r.push(`${his} motion flexes ${his} buttocks together just enough to clench ${his} sensitive asspussy, and`);
		} else {
			r.push(`${his} motion`);
		}
		r.push(`provides just enough stimulation that ${he} climaxes. ${His}`);
		if (hasAnyArms(eventSlave)) {
			if (hasBothArms(eventSlave)) {
				r.push(`hands ball into fists at ${his} sides`);
			} else {
				r.push(`hand balls into a fist at ${his} side`);
			}
			r.push(`and ${his}`);
		}
		r.push(`torso pitches forward involuntarily,`);
		if (eventSlave.chastityPenis) {
			r.push(`a dribble of cum leaking from ${his} cage.`);
		} else if ((eventSlave.balls > 3 && eventSlave.hormoneBalance < -20) || eventSlave.balls >= 10) {
			r.push(`a ridiculous, pent-up torrent of cum shooting out`);
			if (eventSlave.dick > 0) {
				r.push(`and onto the floor.`);
			} else {
				r.push(`of the tiny hole on ${his} featureless crotch.`);
			}
		} else if (canAchieveErection(eventSlave)) {
			r.push(`a strong jet of cum shooting out and onto the floor.`);
		} else if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
			r.push(`dribbling a little fluid out of the tiny hole in ${his} otherwise featureless groin.`);
		} else if (eventSlave.balls > 0 && eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
			r.push(`${his} soft cock twitching upward and shooting out quite a lot of cum.`);
		} else if (eventSlave.dick > 0) {
			if (eventSlave.prostate > 1) {
				r.push(`a large spurt of`);
			} else {
				r.push(`a few drops`);
			}
			r.push(`watery ejaculate scattering from ${his} dickhead.`);
		} else if (eventSlave.vagina > 1) {
			r.push(`the strong muscles around ${his} big cunt visibly contracting with the force as ${he} squirts a jet of girlcum out onto ${his} legs and the floor.`);
		} else if (eventSlave.lactation > 1) {
			r.push(`a surprising`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`jet`);
			} else {
				r.push(`gush`);
			}
			r.push(`of ${milkFlavor(eventSlave)}milk issuing from both of ${his} nipples.`);
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
		} else if (eventSlave.lactation > 0) {
			r.push(`drops of ${milkFlavor(eventSlave)}milk`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`appearing at each of ${his} motherly nipples only to be flung onto the floor.`);
			} else {
				r.push(`running from each of ${his} nipples and down ${his} breasts.`);
			}
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
		} else if (eventSlave.belly >= 2000) {
			if (eventSlave.bellyFluid >= 2000) {
				r.push(`forcing a grunt out of ${him} as ${he} bends against ${his} ${belly} ${eventSlave.inflationType}-filled belly`);
				if (eventSlave.vagina > -1) {
					r.push(`squirting a`);
					if (eventSlave.prostate > 0) {
						r.push(`a large spurt of`);
					} else {
						r.push(`little jet`);
					}
					r.push(`of girlcum`);
					if (eventSlave.inflationMethod === 2) {
						r.push(`from ${his} pussy and a dribble of ${eventSlave.inflationType} from ${his} ass`);
					} else {
						r.push(`down ${his} legs and`);
					}
					r.push(`onto the floor.`);
				} else {
					if (eventSlave.inflationMethod === 2) {
						r.push(`as the muscles in ${his} lower body visibly contract with the force, squirting out a little jet of ${eventSlave.inflationType} from ${his} ass.`);
					} else {
						r.push(`as the muscles in ${his} lower body visibly contract with the force.`);
					}
				}
			} else {
				r.push(`forcing a grunt out of ${him} as ${he} bends against ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 2000) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
				if (eventSlave.vagina > -1) {
					r.push(`squirting a`);
					if (eventSlave.prostate > 0) {
						r.push(`a large spurt of`);
					} else {
						r.push(`little jet`);
					}
					r.push(`of girlcum out onto ${his} legs and the floor.`);
				} else {
					r.push(`as the muscles in ${his} lower body visibly contract with the force.`);
				}
			}
		} else if (eventSlave.vagina < 0) {
			r.push(`the muscles in ${his} lower body visibly contracting with the force.`);
		} else {
			r.push(`squirting a`);
			if (eventSlave.prostate > 0) {
				r.push(`a large spurt of`);
			} else {
				r.push(`little jet`);
			}
			r.push(`of girlcum out onto ${his} legs and the floor.`);
		}
		r.push(`${He} stands up straight, but this brings ${his}`);
		if (canSee(eventSlave)) {
			r.push(`${App.Desc.eyesColor(eventSlave)} up to gaze straight into yours,`);
		} else {
			r.push(`face to face with you,`);
		}
		r.push(`and the mixed release, humiliation, and naughtiness of having climaxed prematurely right in front of ${his} ${getWrittenTitle(eventSlave)} produces an aftershock, adding to the mess on the floor.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Make ${him} do that again`, again),
			new App.Events.Result(`Take pity on the poor nympho`, pity),
		]);

		function again() {
			const toss = canSee(eventSlave) ? "toss" : "hand";
			r = [];
			r.push(`You laugh at ${him} kindly, and ${he} <span class="trust inc">smiles with relief,</span> happy that you find ${his} wonderful and terrible sex drive amusing. After a cursory inspection, you`);
			if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1) {
				if (eventSlave.chastityAnus) {
					r.push(`leave ${his} anal chastity unlocked,`);
				}
				r.push(`${toss} ${him} a`);
				if (eventSlave.anus > 2) {
					r.push(`vibrating buttplug so big it will fill even ${his} gaping backdoor,`);
				} else if (eventSlave.anus > 1) {
					r.push(`sizable vibrating buttplug,`);
				} else {
					r.push(`vibrating buttplug,`);
				}
				r.push(`let ${him} suck it wet and get it nestled between ${his} buttcheeks, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves standing around with things shoved up ${his} asshole`);
			} else if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1) {
				r.push(`${toss} ${him} a`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 2) {
						r.push(`vibrating dildo so big it will fill even ${his} gaping cunt,`);
					} else if (eventSlave.vagina > 1) {
						r.push(`sizable vibrating dildo,`);
					} else {
						r.push(`vibrating dildo,`);
					}
					r.push(`let ${him} suck it wet and get it nestled inside ${himself}, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves standing around naked with humiliating things shoved in ${his} body`);
				} else {
					if (eventSlave.anus > 2) {
						r.push(`vibrating buttplug so big it will fill even ${his} gaping backdoor,`);
					} else if (eventSlave.anus > 1) {
						r.push(`sizable vibrating buttplug,`);
					} else {
						r.push(`vibrating buttplug,`);
					}
					r.push(`let ${him} suck it wet and get it nestled between ${his} buttcheeks, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves standing around naked with humiliating things shoved up ${his} asshole`);
				}
			} else if (eventSlave.fetish === "masochist" && eventSlave.fetishKnown === 1) {
				r.push(`${toss} ${him} a`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 2) {
						r.push(`vibrating dildo so big it will fill even ${his} gaping cunt,`);
					} else if (eventSlave.vagina > 1) {
						r.push(`sizable vibrating dildo,`);
					} else {
						r.push(`vibrating dildo,`);
					}
					r.push(`let ${him} suck it wet and get it nestled inside ${himself}, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves having painfully big things shoved up ${his} hole`);
				} else {
					if (eventSlave.anus > 2) {
						r.push(`vibrating buttplug so big it will fill even ${his} gaping backdoor,`);
					} else if (eventSlave.anus > 1) {
						r.push(`sizable vibrating buttplug,`);
					} else {
						r.push(`vibrating buttplug,`);
					}
					r.push(`let ${him} suck it wet and get it nestled between ${his} buttcheeks, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves having painfully big things shoved up ${his} asshole`);
				}
			} else if ((eventSlave.fetish === "boobs" && eventSlave.fetishKnown === 1) && eventSlave.boobs > 300) {
				r.push(`${toss} ${him} a`);
				if (eventSlave.nipples === "fuckable") {
					r.push(`pair of egg vibrators, let ${him} suck them wet and get them nestled inside ${his} nipples, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves having things shoved inside ${his} nipplecunts`);
				} else {
					r.push(`vibrating dildo, let ${him} suck it wet and get it nestled within ${his} cleavage, and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} loves having long, hard objects shoved between ${his} tits`);
				}
			} else {
				r.push(`${toss} ${him} a`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 2) {
						r.push(`vibrating dildo so big it will fill even ${his} gaping cunt,`);
					} else if (eventSlave.vagina > 1) {
						r.push(`sizable vibrating dildo,`);
					} else {
						r.push(`vibrating dildo,`);
					}
					r.push(`let ${him} suck it wet and get it nestled inside ${himself},`);
				} else {
					if (eventSlave.anus > 2) {
						r.push(`vibrating buttplug so big it will fill even ${his} gaping backdoor,`);
					} else if (eventSlave.anus > 1) {
						r.push(`sizable vibrating buttplug,`);
					} else {
						r.push(`vibrating buttplug,`);
					}
					r.push(`let ${him} suck it wet and get it nestled between ${his} buttcheeks,`);
				}
				r.push(`and then tell ${him} to stand next to your desk. ${He} obeys, a bit puzzled, but ${he} has a very short refractory period`);
			}
			r.push(`and ${he} comes again without much delay, without touching ${his}`);
			if (eventSlave.dick > 0 && eventSlave.vagina > -1) {
				r.push(`bits.`);
			} else if (eventSlave.dick > 0) {
				r.push(`cock.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`soft perineum, the only place ${he} has left.`);
			} else {
				r.push(`pussy.`);
			}
			r.push(`You keep ${him} there for quite a while, the quivering,`);
			if (eventSlave.chastityPenis) {
				r.push(`ejaculate-dripping`);
			} else if (canAchieveErection(eventSlave)) {
				r.push(`cum-jetting`);
			} else if (eventSlave.balls > 0) {
				r.push(`cum-squirting`);
			} else if (eventSlave.dick > 0) {
				r.push(`ejaculating`);
			} else if (eventSlave.lactation > 0) {
				r.push(`milk-squirting`);
			} else if (eventSlave.vagina === -1) {
				r.push(`weakly dribbling`);
			} else {
				r.push(`femcum-dripping`);
			}
			r.push(`statue of a slave providing visual diversion for visitors.`);
			eventSlave.trust += 5;
			return r;
		}

		function pity(){
			let didVaginal = false;
			let didAnal = false;

			r = [];
			r.push(`${He} shivers a little when ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else if (canHear(eventSlave)) {
				r.push(`hears`);
			} else {
				r.push(`senses`);
			}
			r.push(`you slide out from behind your desk and approach ${him}. ${His} overcharged sex drive allows ${him} no refractory period at all, and the hunger`);
			if (!canSee(eventSlave)) {
				r.push(`on ${his} face`);
			} else {
				r.push(`in ${his} eyes`);
			}
			r.push(`is undiminished. You pause to consider ${him} and ${his} face falls a little as ${he} wonders what you're planning. ${He}'s wrong to doubt you;`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown === 1) {
				r.push(`you pull ${him} in and embrace ${him} strongly, causing the submissive slut to melt into your`);
				if (V.PC.boobs >= 300) {
					if (V.PC.boobsImplant !== 0) {
						r.push(`firm chest.`);
					} else {
						r.push(`soft chest.`);
					}
				} else if (V.PC.title === 0) {
					r.push(`toned arms.`);
				} else {
					r.push(`muscular arms.`);
				}
				r.push(`You kiss ${him} aggressively, ${his} mouth opening to accept your dominant tongue as it slides into ${him}. Soon ${he}'s sighing with contentment as something else slides into ${him} on the couch; ${he} clings to you with near desperation.`);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "cumslut" && eventSlave.fetishKnown === 1) {
				r.push(`you push the orally fixated slut to ${his} knees and`);
				if (V.PC.dick === 0) {
					r.push(`ride ${his} face like it's a pussy you're tribbing.`);
				} else {
					r.push(`fuck ${his} face like you're trying to impregnate ${his} throat.`);
				}
				if (hasAnyArms(eventSlave)) {
					r.push(`${He}'s forced to hold onto your thighs for dear life, making it impossible for ${him} to touch ${himself}, but ${he} doesn't need to and climaxes again`);
					if (hasBothArms(eventSlave)) {
						r.push(`hands-free`);
					}
					r.push(r.pop() + ".");
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1) {
				r.push(`you set up a live feed on the screens throughout the arcology, pointing down from the ceiling above your desk, make ${him} lie down on the desk top, and fuck ${him}. ${He}`);
				if (canSee(eventSlave)) {
					r.push(`stares into`);
				} else {
					r.push(`gazes towards`);
				}
				r.push(`the camera's lens with mixed shame and relish as the full weight of the humiliation of being used in front of the whole arcology bears down on ${his} heaving chest.`);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1 && canDoAnal(eventSlave)) {
				r.push(`you`);
				if (canSee(eventSlave)) {
					r.push(`point at the couch`);
				} else {
					r.push(`state "couch"`);
				}
				r.push(`and ${he} hurries over to kneel and offer you ${his} asshole. Since the butthole slut clearly doesn't need any foreplay today, the first contact between you is`);
				if (V.PC.dick !== 0) {
					r.push(`the tip of your cock`);
				} else {
					r.push(`the head of your strap-on`);
				}
				r.push(`pressing forcefully against ${his} anus. ${He} gives a huge shuddering gasp of satisfaction as ${his} sphincter stretches around the invading phallus.`);
				didAnal = true;
			} else if (eventSlave.fetish === "boobs" && eventSlave.fetishKnown === 1) {
				r.push(`you play with ${his} nipples until`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`they're good and hard,`);
				} else {
					r.push(`they swallow your fingers,`);
				}
				r.push(`while ${he} stands there shamelessly presenting ${his} breasts for your play. Once you're satisfied they can't get any harder, you`);
				if (V.PC.dick !== 0) {
					r.push(`push ${him} to ${his} knees`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(r.pop() + ",");
						r.push(`tell ${him} to take over the nipple stimulation,`);
					}
					r.push(`and fuck ${his} boobs.`);
				} else {
					r.push(`throw ${him} down on the couch, straddle ${his} boobs, and`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`ride each of ${his} erect`);
					} else {
						r.push(`trib ${his}`);
					}
					r.push(`nipples in turn.`);
				}
				seX(eventSlave, "mammary", V.PC, "penetrative");
			} else if (eventSlave.fetish === "pregnancy" && eventSlave.fetishKnown === 1) {
				r.push(`you tell ${him} you're going to put a slave in ${his} belly, bringing ${him} instantaneously back to painfully full arousal. You take ${him} on the couch in the missionary position so ${he} can stare into your face.`);
				if (!canDoVaginal(eventSlave)) {
					r.push(`It's ${his} butt you're fucking, but ${he} doesn't let that disrupt ${his} fantasy.`);
				} else if (V.PC.dick === 0) {
					r.push(`The phallus in ${him} is a strap-on, but ${he} doesn't let that disrupt ${his} fantasy.`);
				} else if (eventSlave.pregKnown === 1) {
					r.push(`${He}'s already knocked up, but that just means that ${he} shamelessly begs you to fuck ${him} even more pregnant.`);
				} else if (!isFertile(eventSlave)) {
					r.push(`${He}'s not fertile, but ${he} doesn't let that get in ${his} way.`);
				}
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "dom" && eventSlave.fetishKnown === 1) {
				r.push(`you shove ${him} back towards the couch and leap onto ${him}, pulling your legs into a scissor position. You bang ${him} hard, and ${he} grinds ${his} hips back at you with enthusiasm. This mutually challenging fuck goes on for a long time, to sweaty, endorphin-fueled muscle exhaustion.`);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "sadist" && eventSlave.fetishKnown === 1) {
				r.push(`you call in a less favored slave and let ${eventSlave.slaveName} spank ${him} until ${he}'s fully aroused again. That done, you and ${eventSlave.slaveName} spitroast the poor girl, with ${eventSlave.slaveName} taking the rear end. Judging by how the victim screams into your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`cunt`);
				}
				r.push(r.pop() + ",");
				r.push(`${eventSlave.slaveName} is not being very nice to ${him} at all.`);
				seX(V.PC, "penetrative", "slaves", "oral");
				seX(eventSlave, "penetrative", "slaves", "oral");
			} else if (eventSlave.fetish === "masochist" && eventSlave.fetishKnown === 1) {
				r.push(`you prowl around ${him} to let ${his} masochistic anticipation build before nudging ${him} in the back of the knees. ${He} collapses helplessly and you drag ${him} over to the couch, slinging ${him} across its back and fucking ${him} without mercy. When the pleasurable pain loses its edge, you slide a finger into ${him} alongside your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on,`);
				} else {
					r.push(`cock,`);
				}
				r.push(`eliciting an appreciative shriek.`);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			}
			if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.push(`${He}'s extremely pleased`);
			if (canSee(eventSlave)) {
				r.push(`to see ${himself}`);
			} else if (canHear(eventSlave)) {
				r.push(`to hear ${he}'s`);
			} else {
				r.push(`to learn ${he}'s`);
			}
			r.push(`on the inspection schedule for the same time tomorrow, and is almost bouncing with eagerness the next morning.`);
			if (eventSlave.fetishStrength === 100 || eventSlave.fetishKnown === 0 || eventSlave.fetish === Fetish.NONE) {
				r.push(`Being a nympho is a never-ending struggle in some ways, and ${he} is <span class="hotpink">deeply grateful</span> to you for understanding ${him}.`);
				eventSlave.devotion += 5;
			} else {
				r.push(`Since ${he}'s developing ${his} kinks, this delightful reinforcement <span class="lightcoral">advances ${his} fetish.</span>`);
				eventSlave.fetishStrength += 4;
			}
			return r;
		}
	}
};
