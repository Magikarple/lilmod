App.Events.RESSDevotedLotion = class RESSDevotedLotion extends App.Events.BaseEvent {
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
				s => s.devotion > 50,
				s => s.anus > 0,
				s => s.vagina !== 0,
				s => s.trust > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const inch = V.showInches === 2 ? "inch" : "centimeter";

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`Your slaves are required to take very good care of themselves, and your best ones spend several hours a day maintaining every ${inch} of their bodies. You notice`,
			contextualIntro(V.PC, eventSlave, true),
			`standing naked in front of a mirror outside the bathroom, carefully applying moisturizing lotion to every ${inch} of ${his} ${eventSlave.skin} skin. ${He}'s clearly feeling well, and ${his}`
		);
		if (eventSlave.face > 95) {
			r.push(`gorgeous`);
		} else if (eventSlave.face <= 40) {
			r.push(`attractive`);
		} else if (eventSlave.face <= 10) {
			r.push(`pretty`);
		} else if (eventSlave.face < -10) {
			r.push(`plain`);
		} else {
			r.push(`homely`);
		}
		r.push(`face bears a smile of simple enjoyment as ${he} basks in the warmth of the slave quarters, calibrated to make nudity comfortable. ${He} straightens ${his}`);
		if (eventSlave.height >= 185) {
			r.push(`wonderfully long`);
		} else if (eventSlave.height >= 170) {
			r.push(`long`);
		} else if (eventSlave.height >= 160) {
			r.push(`nice`);
		} else if (eventSlave.height >= 150) {
			r.push(`short`);
		} else {
			r.push(`short little`);
		}
		r.push(`legs and bends at the waist,`);
		if (eventSlave.belly >= 600000) {
			r.push(`${his} ${belly} belly coming to rest on the floor as ${he} spreads ${his} legs around it,`);
		} else if (eventSlave.belly >= 400000) {
			r.push(`${his} ${belly} belly forcing ${him} to really spread ${his} legs,`);
		} else if (eventSlave.belly >= 100000) {
			r.push(`${his} ${belly} belly forcing ${his} legs wide as ${he} goes,`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`hugely gravid`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`${belly} protruding`);
			} else {
				r.push(`heavy,`);
				r.push(`${eventSlave.inflationType}-filled`);
			}
			r.push(`belly parting ${his} legs as ${he} goes,`);
		} else if (eventSlave.belly >= 5000) {
			r.push(`${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`gravid`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`protruding`);
			} else {
				r.push(`sloshing`);
			}
			r.push(`belly parting ${his} legs as ${he} goes,`);
		}
		r.push(`moaning at the pleasurable feeling of a good stretch. ${He} sets the lotion bottle on the ground next to ${him}, dispenses a little, and carefully rubs it into the tops of ${his} feet. When ${he} reaches ${his} ankles, still bent almost double, ${he}`);
		if (canSee(eventSlave)) {
			r.push(`catches sight of you watching ${him} from between ${his} legs.`);
		} else if (canHear(eventSlave)) {
			r.push(`picks up the sound of your breathing.`);
		} else {
			r.push(`realizes that you're there watching ${him}.`);
		}
		r.push(`${He} smiles at you and keeps working.`);
		r.toParagraph();
		r.push(`${He} shifts ${his}`);
		if (eventSlave.hips > 2) {
			r.push(`broodmother`);
		} else if (eventSlave.hips > 1) {
			r.push(`broad`);
		} else if (eventSlave.hips >= 0) {
			r.push(`curvy`);
		} else {
			r.push(`trim`);
		}
		r.push(`hips innocently and moves up to ${his} lower legs. But then, as ${he} slowly massages the lotion into ${his}`);
		if (eventSlave.muscles > 30) {
			r.push(`muscled`);
		} else if (eventSlave.weight > 10) {
			r.push(`plush`);
		} else {
			r.push(`cute`);
		}
		r.push(`calves, ${he} arches ${his} back and cocks ${his} hips a little. This causes`);
		if (eventSlave.chastityPenis === 1) {
			r.push(`the bottom of ${his} chastity cage to become visible, a reminder that`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`only ${his} holes are to be used.`);
			} else if (canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
				r.push(`${he}'s a butthole slave.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`the focus is ${his} pussy, not dick.`);
			} else {
				r.push(`with ${his} ass in chastity, ${he}'s forbidden from release.`);
			}
		} else if (eventSlave.belly >= 100000) {
			r.push(`the underside of ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnancy`);
			} else {
				r.push(`belly`);
			}
			r.push(`and`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`${his} flushed, glistening pussy and`);
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				} else {
					r.push(`hungry`);
				}
				r.push(`anus to become visible.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`${his} flushed pussy to become visible, glistening with moisture.`);
			} else {
				r.push(`${his}`);
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				} else {
					r.push(`hungry`);
				}
				r.push(`anus to become visible.`);
			}
		} else if (eventSlave.belly >= 5000) {
			r.push(`the underside of ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnancy`);
			} else {
				r.push(`belly`);
			}
			r.push(`and`);
			if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
				r.push(`${his} flushed, glistening pussy and`);
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				} else {
					r.push(`hungry`);
				}
				r.push(`anus to become visible, before ${he} hugs ${his} thighs together, sighing as ${he} flexes them a little to put gentle pressure on ${his} womanhood.`);
			} else if (canDoVaginal(eventSlave)) {
				r.push(`${his} flushed pussy to appear for a moment, glistening with moisture, before ${he} hugs ${his} thighs together, sighing as ${he} flexes them a little to put gentle pressure on ${his} womanhood.`);
			} else {
				r.push(`${his}`);
				if (eventSlave.anus === 0) {
					r.push(`virgin`);
				} else {
					r.push(`hungry`);
				}
				r.push(`anus to become visible.`);
			}
		} else if (!canAchieveErection(eventSlave) && eventSlave.dick > 10) {
			r.push(`${his} giant, soft dick to swing back between ${his} legs; ${he} hugs ${his} thighs together again and traps it back behind ${him}, enjoying the sensation along its length.`);
		} else if (!canAchieveErection(eventSlave) && eventSlave.dick > 0) {
			r.push(`${his} thighs to come tightly together, hiding ${his} soft dick.`);
		} else if (eventSlave.dick > 0) {
			r.push(`${his} stiff dick to swing back between ${his} legs; ${he} hugs ${his} thighs together again and traps it back behind ${him}, showing off how hard ${he} is.`);
		} else if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
			r.push(`${his} flushed, glistening pussy and`);
			if (eventSlave.anus === 0) {
				r.push(`virgin`);
			} else {
				r.push(`hungry`);
			}
			r.push(`anus to become visible, before ${he} hugs ${his} thighs together, sighing as ${he} flexes them a little to put gentle pressure on ${his} womanhood.`);
		} else if (canDoVaginal(eventSlave)) {
			r.push(`${his} flushed pussy to appear for a moment, glistening with moisture, before ${he} hugs ${his} thighs together, sighing as ${he} flexes them a little to put gentle pressure on ${his} womanhood.`);
		} else {
			r.push(`it to become apparent that ${his} hungry asspussy serves as ${his} only genitalia.`);
		}
		r.push(`With ${his} back arched and ${his} thighs together ${his}`);
		if (eventSlave.butt > 5) {
			r.push(`massive buttocks part a little, showing a hint of`);
		} else if (eventSlave.butt > 2) {
			r.push(`big buttocks part, revealing`);
		} else {
			r.push(`cute buttocks are spread wide apart, displaying`);
		}
		r.push(`${his}`);
		if (eventSlave.anus > 2) {
			r.push(`lewd anal slit.`);
		} else if (eventSlave.anus === 2) {
			r.push(`big butthole.`);
		} else {
			r.push(`tight anus.`);
		}
		if (canSee(eventSlave)) {
			if (eventSlave.belly >= 50000) {
				r.push(`${His} ${belly} stomach is far too large to see around, but given ${his} held pose, ${he}'s waiting to see what you do.`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`${He} peeks around the edge of ${his} belly, checking your crotch to see if you are watching.`);
			} else {
				r.push(`${He} peeks between ${his} legs again, checking to see if you're watching.`);
			}
		} else if (canHear(eventSlave)) {
			r.push(`${His} ears perk up, listening to see if you are still there.`);
		} else {
			r.push(`${He} stays as still as ${he} can, clearly waiting for you to make a move.`);
		}

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Apply lotion liberally`, liberally),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Fist ${his} ass`, ass)
				: new App.Events.Result(),
			(eventSlave.vagina > 0 && canDoVaginal(eventSlave))
				? new App.Events.Result(`Fist ${his} pussy`, pussy)
				: new App.Events.Result(),
		]);

		function liberally() {
			const r = new SpacedTextAccumulator();
			r.push(`You reach down to take ${his} hands, and pull ${him} up to stand in front of you before crushing ${him} in a frankly sexual embrace. Taking charge of the lotion, you apply it to your hands and start with ${his} face. ${He} submits to your close attention, even closing ${his} eyes so you can get ${his} eyelids, only a slight quickening of breath betraying ${his} intensity of feeling at having you do this. You take your time, which turns into exquisite sexual torture when you finally reach ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`incredible breasts, which stand out so far in front of ${him} that you have to reach around their mass rather inelegantly.`);
			} else if (eventSlave.boobs > 800) {
				r.push(`heavy breasts.`);
			} else {
				r.push(`lovely chest.`);
			}
			r.push(`When your warm, moist hands`);
			if (eventSlave.nipples !== "fuckable") {
				r.push(`rub`);
			} else {
				r.push(`slip into`);
			}
			r.push(`${his}`);
			if (eventSlave.lactation > 0) {
				r.push(`milky`);
			}
			r.push(`nipples, ${he} cannot suppress a moan. You take pity, take ${his} hands, guide them to the lotion bottle, and coat them generously. Then, you place ${his} hands in yours and move them to between ${his} legs, manipulating them like a music teacher guiding a pupil's hands on an instrument, guiding ${him} in gentle masturbation. You go back to applying lotion to the rest of ${his} body, enjoying the slave's intense pleasure. When you've covered every ${inch} of ${him}, you hug ${him} close, returning your hands to ${his} nipples`);
			if (V.PC.dick !== 0) {
				r.push(`and pushing your rock-hard prick in between ${his} well-lubricated thighs`);
				if (V.PC.vagina !== -1) {
					r.addToLast(`,`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`after guiding one of ${hers} around behind ${him} to see to your pussy`);
			}
			r.addToLast(`. ${He} quickens ${his} pace`);
			if (canSee(eventSlave)) {
				r.push(`and raises ${his} gaze to the mirror, seeing ${his} magnificently nude, ${eventSlave.skin} skin flushed with arousal`);
			} else {
				r.addToLast(`, feeling ${his} magnificently nude, ${eventSlave.skin} skin flush with arousal`);
			}
			r.push(`as ${his}`);
			if (eventSlave.chastityPenis === 1) {
				if (canDoAnal(eventSlave)) {
					r.push(`eager fingering of ${his} anus turn frantic.`);
				} else {
					r.push(`frantic taint rubbing starts to pay off.`);
				}
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`frantic rubbing starts to produce lewd noises.`);
			} else if (eventSlave.dick > 0) {
				r.push(`jacking off starts to produce lewd noises.`);
			} else if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)) {
				r.push(`index and middle fingers slip inside ${himself}.`);
			} else {
				r.push(`frantic taint rubbing starts to pay off.`);
			}
			r.push(`${He} gasps your name with ${his} orgasm, and then turns and <span class="trust inc">thanks you</span> prettily.`);
			eventSlave.trust += 5;
			r.toParagraph();
			return r.container();
		}

		function ass() {
			const r = new SpacedTextAccumulator();
			r.push(`You tell ${him} to`);
			if (hasBothLegs(eventSlave)) {
				r.push(`grab ${his} ankles.`);
			} else {
				r.push(`bend over.`);
			}
			r.push(`${He} giggles and`);
			if (eventSlave.belly >= 5000) {
				r.push(`carefully`);
			}
			r.push(`complies`);
			if (eventSlave.belly >= 120000) {
				r.push(`to the best of ${his} ability`);
			}
			r.addToLast(`, relaxing ${his}`);
			if (eventSlave.anus > 2) {
				r.push(`asspussy`);
			} else if (eventSlave.anus === 2) {
				r.push(`asshole`);
			} else {
				r.push(`little ass`);
			}
			r.push(`in the expectation of`);
			if (V.PC.dick !== 0) {
				r.push(`your cock,`);
			} else {
				r.push(`a strap-on,`);
			}
			r.push(`but starts with surprise when ${he} feels two warm, lubricated fingers slide into ${his} rectum.`);
			if (eventSlave.anus > 2) {
				r.push(`${He} moans when you add a third, and grunts when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and relaxes completely. The wide part of your hand, at the knuckles, squeezes into ${him} without much trouble, and ${he} lets out a huge sigh. When you start to fuck ${him}, though, ${he} collapses to ${his} knees,`);
				if (eventSlave.fetish === "buttslut") {
					if (!canTalk(eventSlave)) {
						r.push(`whining and begging nonverbally`);
					} else {
						r.push(
							`panting,`,
							Spoken(eventSlave, `"Please, fist my hole without mercy, ${Master}!"`)
						);
					}
				} else {
					r.push(`whining and begging nonverbally.`);
				}
				r.push(`You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself}.`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`jill off.`);
				} else {
					r.push(`rub ${his} taint.`);
				}
				r.push(`${He} manages to climax promptly, ${his} overstimulated sphincter helping, no doubt. ${He} slumps to the ground when you withdraw your hand, gasping, but you haul ${him} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> drooling and groaning, all pretense of feminine grace gone. It doesn't take long, since that was quite a lot of fun, but by the time you finish ${he}'s already masturbating again.`);
			} else if (eventSlave.anus === 2) {
				r.push(`${He} grunts when you add a third, and begins to beg when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and does ${his} best to relax. The wide part of your hand, at the knuckles, squeezes into ${him} after some effort on your part and squealing on ${his} part. When you withdraw it and press it back in, slowly starting to fist fuck ${his} ass, though, ${he} collapses to ${his} knees,`);
				if (eventSlave.fetish === "buttslut") {
					if (!canTalk(eventSlave)) {
						r.push(`crying`);
					} else {
						r.push(
							`sobbing,`,
							Spoken(eventSlave, `"Please, fist my hole without mercy, ${Master}!"`)
						);
					}
				} else {
					r.push(`crying.`);
				}
				r.push(`You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself}.`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`jill off.`);
				} else {
					r.push(`rub ${his} taint.`);
				}
				r.push(`${He} manages to climax eventually. ${He} slumps to the ground when you withdraw your hand, gasping, but you haul ${his} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> drooling and weeping, all pretense of feminine grace gone. It doesn't take long, since that was quite a lot of fun, but by the time you finish ${he}'s tentatively masturbating again.`);
			} else {
				r.push(`${He} squeals when you add a third, and begins to shamelessly beg for mercy when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and collapses to ${his} knees,`);
				if (eventSlave.fetish === "buttslut") {
					if (!canTalk(eventSlave)) {
						r.push(`begging you to be gentle`);
					} else {
						r.push(
							`sobbing,`,
							Spoken(eventSlave, `"Please, don't ruin my favorite hole, ${Master}!"`)
						);
					}
				} else {
					r.push(`begging you to be gentle.`);
				}
				r.push(`You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself}.`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`jill off.`);
				} else {
					r.push(`rub ${his} taint.`);
				}
				r.push(`As ${he} works ${his} sphincter relaxes bit by bit, and you advance your fist up ${his} butt. ${He} screams in surprise and relief when your knuckles finally make it in, and achieves a crying orgasm shortly thereafter. ${He} slumps to the ground when you withdraw your hand, moaning incoherently, but you haul ${him} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> crying quietly in confusion and disarray, all pretense of feminine grace gone.`);
				if (V.seeStretching === 1) {
					r.addToLast(` It doesn't take long, since that was quite a lot of fun, and by the time you finish ${he} hasn't yet worked up the courage to touch ${his} <span class="lime">newly widened backdoor.</span>`);
					eventSlave.anus += 1;
				}
			}
			eventSlave.devotion += 5;
			r.toParagraph();
			return r.container();
		}

		function pussy() {
			const r = new SpacedTextAccumulator();
			r.push(`You slide up behind ${him} and run a possessive hand down`);
			if (eventSlave.belly >= 1500) {
				r.push(`${his} swollen midriff down`);
			}
			r.push(`to finger ${his} pussylips. ${He} compliantly cocks ${his} hips backward for you, and is surprised to find a couple of warm, lubricated fingers rather than`);
			if (V.PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a strap-on`);
			}
			r.push(`sliding into ${his} ready cunt.`);
			if (eventSlave.vagina > 2) {
				r.push(`${He} moans when you add a third, and grunts when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and relaxes completely. The wide part of your hand, at the knuckles, squeezes into ${him} without much trouble, and ${he} lets out a huge sigh. When you start to fuck ${his} huge cunt with your hand, though, ${he} collapses`);
				if (eventSlave.belly >= 300000) {
					r.push(`onto ${his} ${belly} belly,`);
				} else {
					r.push(`to ${his} knees,`);
				}
				r.push(`whining and begging nonverbally. You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself}.`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`rub ${his} clit.`);
				} else {
					r.push(`rub ${his} taint.`);
				}
				r.push(`${He} manages to climax promptly, ${his} big vagina squeezing your hand strongly. ${He} slumps to the ground when you withdraw your hand, gasping, the collapse giving you a good view into ${his} open, pink-walled channel. You haul ${his} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> drooling and groaning, all pretense of feminine grace gone. It doesn't take long, since that was quite a lot of fun, but by the time you finish ${he}'s replaced your hand with ${his} own.`);
				eventSlave.devotion += 5;
			} else if (eventSlave.vagina === 2) {
				r.push(`${He} grunts when you add a third, and begins to beg when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and hurriedly gets down`);
				if (eventSlave.belly >= 300000) {
					r.push(`onto ${his} ${belly} belly`);
				} else {
					r.push(`on ${his} knees`);
				}
				r.push(`to present a more comfortable angle. The wide part of your hand, at the knuckles, squeezes into ${him} after some effort on your part and squealing on ${his} part. You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself}`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`rub ${his} clit`);
				} else {
					r.push(`rub ${his} taint`);
				}
				r.push(`as you slowly fist fuck ${him}. ${He} manages to climax eventually. ${He} slumps to the ground when you withdraw your hand, gasping, the collapse giving you a good view into ${his} now-gaping, pink-walled channel. You haul ${him} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> drooling and gasping, all pretense of feminine grace gone. It doesn't take long, since that was quite a lot of fun, but by the time you finish ${he}'s masturbating again.`);
				eventSlave.devotion += 5;
			} else {
				r.push(`${He} squeals when you add a third, and begins to shamelessly beg for mercy when you insert a fourth. When ${he} feels you form your hand into a point, thumb included, ${he} understands what's coming and collapses`);
				if (eventSlave.belly >= 300000) {
					r.push(`onto ${his} ${belly} belly,`);
				} else {
					r.push(`to ${his} knees,`);
				}
				r.push(`begging you to be gentle. You kick the lotion towards ${his} hand; ${he} gets the message and starts to frantically`);
				if (eventSlave.chastityPenis === 1) {
					r.push(`rub ${his} taint,`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
					r.push(`rub ${himself},`);
				} else if (eventSlave.dick > 0) {
					r.push(`jerk off,`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`rub ${his} clit,`);
				} else {
					r.push(`rub ${his} taint,`);
				}
				r.push(`hoping to relax a little. As ${he} works ${his} pussy relaxes bit by bit, and you advance your fist into ${his} womanhood. ${He} screams in surprise and relief when your knuckles finally make it in, and achieves a crying orgasm shortly thereafter. ${He} slumps to the ground when you withdraw your hand, moaning incoherently, the collapse giving you a good view into ${his} now-gaping, pink-walled channel. You haul ${his} around so ${he} can`);
				if (V.PC.dick !== 0) {
					r.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eat you out`);
				}
				if (V.PC.dick === 0 && V.PC.vagina === 0) {
					r.push(`rim your ass`);
				}
				r.addToLast(`. ${He} complies <span class="devotion inc">submissively,</span> crying quietly with overstimulation, all pretense of feminine grace gone.`);
				eventSlave.devotion += 5;
				if (V.seeStretching === 1 ) {
					r.addToLast(`It doesn't take long, since that was quite a lot of fun, but by the time you finish ${he}'s gingerly massaging ${his} <span class="lime">newly loosened cunt.</span>`);
					eventSlave.vagina += 1;
				}
			}
			r.toParagraph();
			return r.container();
		}
	}
};
