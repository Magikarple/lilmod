globalThis.bodySwapReaction = function(body, soul) {
	const el = new DocumentFragment();
	let sight;
	let r = [];
	const {
		He, His,
		he, his, him, himself, girl, hers
	} = getPronouns(soul);
	if (getBestVision(body) === 0 && getBestVision(soul) > 0) {
		sight = -2;/* now blind */
	} else if (getBestVision(body) === 1 && getBestVision(soul) > 1) {
		sight = -1;/* now nearsighted */
	} else if (getBestVision(body) > 0 && getBestVision(soul) === 0) {
		sight = 2;	/* now not blind */
	} else if (getBestVision(body) > 1 && getBestVision(soul) === 1) {
		sight = 1;/* now not nearsighted */
	} else {
		sight = 0;/* no change */
	}
	let end = 0;

	if (body.health.health >= soul.health.health + 10) {
		r.push(`The monitors indicate that ${his} <span class="health inc">health has improved</span> from ${his} previous body. Whatever else happens, ${he} will likely appreciate this.`);
	} else if (body.health.health <= soul.health.health - 10) {
		r.push(`The monitors indicate that ${his} <span class="health dec">health has degraded</span> from ${his} previous body. Whatever else happens, this will likely upset ${him}.`);
	}
	r.push(`Now you only have to wait for ${him} to wake up.`);

	App.Events.addParagraph(el, r);
	r = [];

	if (hasAnyArms(body)) { /* (has arms) */
		if (body.fetish === Fetish.MINDBROKEN) {
			r.push(`After a while, ${he} begins to stir, ${his} eyes fluttering. ${He} lets out a low groan and reaches up to rub at ${his} eyes. ${He} stops and stares uncomprehendingly`);
			if (sight === -2) {
				r.push(`into <span class="red">the darkness that is ${his} new world.</span> ${He} goes into a panic and begins thrashing violently until ${he} is restrained and sedated. Hopefully when ${he} comes to again, ${he}'ll have forgotten ${he} could ever see in the first place.`);
				end = 1;
			} else if (sight === 2) {
				r.push(`at the hand <span class="green">${he} can now see.</span> The gift of sight is lost upon ${him}, as is that ${he} is no longer in ${his} own body.`);
			} else {
				r.push(`at the hand for moment before looking for ${his} own. Eventually, ${he} bumps into ${himself} and realizes it belongs to ${him}. From then, ${his} old body is nothing more than a blur, soon to be forgotten forever.`);
			}
		} else if (body.devotion > 50) {
			r.push(`After a while, ${he} begins to stir, ${his} eyes fluttering. ${He} lets out a low groan and reaches up to rub at ${his} eyes. ${He} stops and stares uncomprehendingly`);
			if (sight === -2) {
				r.push(`into <span class="red">the darkness that is ${his} new world.</span> ${He} barely manages to keep calm before accepting this is the fate you have chosen for ${him}.`);
			} else if (sight === -1) {
				r.push(`at the hand <span class="red">${he} can now hardly see.</span> As ${he} squints at it, ${he} realizes that it's not ${his} own and a smile begins to form on ${his} face.`);
			} else if (sight === 2) {
				r.push(`at the <span class="green">hand ${he} can now see.</span> ${He} is by no means ungrateful for such a gift, but is too shocked by it to truly respond. As ${his} eyes move to you, however, ${he} quickly blushes and looks away.`);
			} else if (sight === 1) {
				r.push(`at the hand for moment before ${he} realizes that it's not ${his} own. A smile begins to form on ${his} face, followed by a gasp once ${he} realizes ${he} can <span class="green">see the world clearly now.</span>`);
			} else {
				r.push(`at the hand for moment before ${he} realizes that it's not ${his} own. A smile begins to form on ${his} face.`);
			}
		} else if (body.devotion > 20) {
			r.push(`After a while, ${he} begins to stir, ${his} eyes fluttering. ${He} lets out a low groan and reaches up to rub at ${his} eyes. ${He} stops and stares uncomprehendingly`);
			if (sight === -2) {
				r.push(`into the <span class="red">darkness that is ${his} new world.</span> After a short expurgation of <span class="gold">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions before returning to ${his} inspection.`);
				body.trust -= 15;
			} else if (sight === -1) {
				r.push(`at the hand <span class="gold">${he} can now hardly see.</span> As ${he} <span class="red">squints at it,</span> ${he} realizes that ${his} vision is not the only thing that has changed.`);
				body.trust -= 5;
			} else if (sight === 2) {
				r.push(`at the hand <span class="green">${he} can now see.</span> ${He}'s <span class="hotpink">quite grateful</span> that <span class="mediumaquamarine">you would give ${him} such a gift.</span> ${He} quickly returns to ${his} senses and looks back to ${his} hand finally realizing just why ${he} can see now.`);
				body.devotion += 15;
				body.trust += 10;
			} else if (sight === 1) {
				r.push(`at the hand for moment before ${he} realizes that it's not ${his} own. ${He} lets out a gasp once ${he} realizes ${he} can <span class="green">see the world clearly now;</span> ${he} accepted ${his} fate already, but ${he}'s <span class="hotpink">quite grateful</span> that <span class="mediumaquamarine">you would give ${his} perfect vision.</span>`);
				body.devotion += 5;
				body.trust += 3;
			} else {
				r.push(`at the hand for moment before ${he} realizes that it's not ${his} own.`);
			}
		} else {
			r.push(`${He} reaches up to rub at ${his} eyes and pauses to stare in shock`);
			if (sight === -2) {
				r.push(`into the <span class="red">darkness that is ${his} new world.</span> After a short expurgation of <span class="gold">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions. ${He}`);
				body.trust -= 15;
			} else if (sight === -1) {
				r.push(`at ${his} hand; an unfamiliar hand that ${he} can <span class="red">just barely see.</span> ${He}`);
				body.trust -= 5;
			} else if (sight === 2) {
				r.push(`at the hand <span class="green">${he} can now see.</span> ${He}'s <span class="hotpink">quite grateful</span> that <span class="mediumaquamarine">you would give ${him} such a gift.</span> The gift of sight is short lived, however, as ${he}`);
				body.devotion += 15;
				body.trust += 10;
			} else if (sight === 1) {
				r.push(`at ${his} hand; a hand that ${he} <span class="green">can clearly see</span> is not ${his} own. ${He}`);
				body.devotion += 5;
				body.trust += 3;
			} else {
				r.push(`at ${his} hand. ${He}`);
			}
			r.push(`finally realizes that the new body ${he} found ${himself} in <span class="gold">was not a nightmare as ${he} had hoped, but reality.</span> ${He} is <span class="mediumorchid">utterly disturbed</span> by your removal of the last constant ${he} had in life.`);
			body.devotion -= 15;
			body.trust -= 30;
		}

		if (end !== 1) {
			if (body.skin !== soul.skin && canSee(body) && body.fetish !== Fetish.MINDBROKEN) {
				r.push(`${His} <span class="coral">newly ${body.skin} skin</span> is the first thing that leaps out at ${him}.`);
				if (body.devotion > 50) {
					r.push(`${He} is fascinated by the change and what this means for ${him}.`);
				} else if (body.devotion > 20) {
					r.push(`The fact that you would alter something so defining about ${him} no longer surprises ${him}.`);
				} else if (body.devotion >= -20) {
					r.push(`The fact that you would alter something so defining about ${him} is <span class="hotpink">humbling.</span>`);
					body.devotion += 2;
				} else {
					r.push(`The fact that you would alter something so defining about ${him} is <span class="gold">terrifying.</span>`);
					body.trust -= 2;
				}
			}

			r.push(`${He} holds the limb in front of ${him}, flexing each`);

			/* (arms)*/
			if (hasAnyProstheticArms(body) && !hasAnyProstheticArms(body)) {
				r.push(`finger, the servo motors whining softly with each movement.`);
				if (body.hears <= -2) {
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`${He} vaguely reacts to the sounds coming from ${his} arm, though not to any meaningful extent.`);
					} else if (body.devotion >= -20) {
						r.push(`A look of morbid curiosity crosses ${his} features.`);
					} else {
						r.push(`A look of <span class="mediumorchid">frustration</span> and <span class="gold">anguish</span> distorts ${his} face as ${he} moans pitiably.`);
						body.devotion -= 5;
						body.trust -= 1;
					}
				} else {
					r.push(`Naturally, ${he} hasn't noticed it yet.`);
				}
			} else if (hasAnyProstheticArms(body)) {
				r.push(`finger, the servo motors whining softly with each movement.`);
			} else if (body.fetish === Fetish.MINDBROKEN) {
				r.push(`finger as if nothing changed.`);
			} else if (body.muscles < soul.muscles - 5) { /* (less muscle)*/
				if (body.devotion > 20) {
					r.push(`finger, the arm <span class="orange">notably less muscular</span> than ${his} old one.`);
				} else {
					r.push(`finger and noticing ${his} arm feels <span class="orange">less muscular</span> than ${he} remembers. ${He} becomes irritated with ${his} newfound weakness and <span class="mediumorchid">frowns angrily.</span>`);
					body.devotion -= 1;
				}
			} else if (body.muscles > soul.muscles + 5) { /* (more muscle)*/
				if (body.devotion >= -20 || body.fetish !== Fetish.MINDBROKEN) {
					r.push(`finger, the arm <span class="lime">${(canSee(body)) ? `visibly more toned` : `noticeably stronger`}</span> than ${his} old one. With a clench of ${his} fist, the muscles of the limb bulge slightly. ${He} is <span class="hotpink">happy</span> that you would take into consideration such a small detail, and knows that life will be just that much easier now.`);
					body.devotion += 2;
				} else {
					r.push(`finger. Flexing, ${he} realizes ${he} is <span class="lime">noticeably stronger</span> than ${he} was before. <span class="mediumaquamarine">${He} takes a moment to relish ${his} newfound strength.</span>`);
					body.trust += 10;
				}
			} else { /* (same muscle (within five units)) */
				if (body.physicalAge < soul.physicalAge - 5) {
					if (!canSee(body)) {
						r.push(`finger. ${He} traces ${his}`);
						if (soul.physicalAge >= 40) {
							r.push(`arm and feels how <span class="green">less wrinkled</span> ${his} skin is and how firmer ${his} muscles are.`);
						} else {
							r.push(`arm, feeling just <span class="green">how much younger</span> ${he} is.`);
						}
					} else {
						r.push(`finger and noticing <span class="green">how much younger</span> ${he} is.`);
						if (soul.physicalAge >= 40) {
							r.push(`${He} is pleased to see ${his} hand is now <span class="green">less wrinkled</span> and the muscles that coat ${his} arm are now firmer than they were before.`);
						}
					}
				} else if (body.physicalAge > soul.physicalAge + 5) {
					if (!canSee(body)) {
						r.push(`finger. ${He} traces ${his}`);
						if (soul.physicalAge < 40) {
							r.push(`arm and feels the <span class="red">wrinkles in ${his} skin.</span> With a despondent note, ${he} lowers ${his} ${(hasBothArms(body)) ? `hands` : `hand`} back to ${his} ${(hasBothArms(body)) ? `sides` : `side`}.`);
						} else {
							r.push(`arm, feeling just <span class="red">how much older</span> ${he} is.`);
						}
					} else {
						r.push(`finger and noticing <span class="red">how much older</span> ${he} is.`);
						if (soul.physicalAge < 40) {
							r.push(`With a despondent note, ${he} lowers ${his} hand back to ${his} side, having seen the wrinkles that now coat ${his} new arm.`);
						}
					}
				} else {
					r.push(`finger and finding little difference.`);
				}
			}

			r.push(`${His} hand roams over ${his} face searching for changes.`);

			if (
				(body.piercing.ear.weight !== 0 && soul.piercing.ear.weight === 0) ||
				(body.piercing.eyebrow.weight !== 0 && soul.piercing.eyebrow.weight === 0) ||
				(body.piercing.nose.weight !== 0 && soul.piercing.nose.weight === 0)
			) {
				r.push(`${He} finds several new piercings adorning ${his} face.`);
			}

			/* ear changes - WIP for future ear shape options */
			r.push(`${He} runs ${his} ${(hasBothArms(body)) ? `hands` : `hand`} over ${his} ears, finding`);
			if (body.hears <= -2 && soul.hears > -2) {
				r.push(`that, <span class="gold">much to ${his} horror,</span> there is nothing closing up ${his} ear canals, and this <span class="red">world of silence</span> is ${his} new reality.`);
				body.trust -= 15;
			} else if (body.hears === -1 && soul.hears > -1) {
				r.push(`that, <span class="gold">much to ${his} distress,</span> there is nothing blocking ${his} ear canals, and ${his} <span class="red">diminished hearing</span> is all natural.`);
				body.trust -= 5;
			} else if (body.hears > -2 && soul.hears <= -2) {
				r.push(`that, <span class="hotpink">much to ${his} elation,</span> ${he} <span class="green">can now hear.</span> While ${he} may question your motives, this is a gift ${he} will treasure.`);
				body.devotion += 15;
				body.trust += 10;
			} else if (body.hears > -1 && soul.hears === -1) {
				r.push(`that, <span class="hotpink">much to ${his} joy,</span> ${he} can now <span class="green">hear much more clearly.</span> While ${he} may question your motives, this is a gift ${he} will appreciate.`);
				body.devotion += 5;
				body.trust += 3;
			} else {
				r.push(`nothing particularly noteworthy.`);
			}

			if (body.sexualFlaw === "cum addict" && body.lips > soul.lips + 10) { /* (bigger lip+oral fixation) */
				r.push(`${He} slowly runs ${his} fingertips over the <span class="lime">plush pillows.</span> A blush blossoms over ${his} face and the beeping of ${his} heart monitor speeds up slightly. You know that ${he}'ll put them to good use.`);
				if (body.devotion <= 20) {
					r.push(`${He} pauses, and begins to <span class="hotpink">hesitantly smile</span> as ${he} feels the softness of ${his} lovely new lips.`);
					body.devotion += 2;
				}
			} else if (body.lips > soul.lips + 10) {
				r.push(`${His} fingers brush ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`as if`);
				}
				r.push(`noticing that <span class="lime">they are larger now</span> than they once were.`);
			} else if (body.sexualFlaw === "cum addict" && body.lips < soul.lips - 10) { /* (smaller lip+oral fixation) */
				if (body.devotion > 20) {
					r.push(`${His} fingers pause and almost flinch away once they reach ${his} lips. A second later, they return to confirm ${his} fear. ${His} pride and joy are <span class="orange">gone.</span> ${He} lets out a sniffle and <span class="mediumorchid">tears begin to roll down ${his} cheeks.</span>`);
					body.devotion -= 10;
				} else {
					r.push(`${His} hand flinches, and ${he} pulls it away as`);
					if (body.voice === 0) {
						r.push(`attempted`);
					}
					r.push(`sobs well up from ${him}. For someone who values ${his} lips like ${him}, for them <span class="orange">to be gone</span> is a truly <span class="mediumorchid">terrible fate.</span>`);
					body.devotion -= 20;
				}
			} else if (body.lips < soul.lips - 10) {
				r.push(`${His} fingers brush ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`as if`);
				}
				r.push(`noticing that <span class="orange">they are smaller</span> now than they once were.`);
			} else {
				r.push(`${His} fingers brush ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`having found nothing different about them.`);
				} else {
					r.push(`finding them familiar enough.`);
				}
			}
			if (body.piercing.lips.weight !== 0 && soul.piercing.lips.weight === 0) {
				r.push(`${He} flexes ${his} lips and notices the telltale clicking of a piercing against ${his} teeth.`);
			}
			if (body.teeth === "removable" && soul.teeth !== "removable") { /* no teeth */
				r.push(`A look of confusion crosses ${his} face, ${his} brow furrowing slightly. You see ${him} work ${his} jaw for moment before ${he} turns ${his} head and spits out a set of dentures.`);
				if (body.devotion < -20 && body.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} <span class="mediumorchid">glowers</span> at them, knowing full well they'll be back in ${his} mouth shortly.`);
					body.devotion -= 2;
				}
			} else if (body.teeth !== "removable" && body.piercing.tongue.weight > 0 && soul.piercing.tongue.weight === 0) { /* (if tongue pierced+has teeth) */
				r.push(`You can vaguely hear ${him} rattling ${his} tongue piercing against ${his} teeth.`);
			}
			if (
				(body.tastes !== 0 && soul.tastes === 0) ||
				(body.tastes === 0 && soul.tastes !== 0)
			) {
				r.push(`${He} can't sense the changes to ${his} taste buds, so ${he}'s likely to be`);
				if (soul.tastes === 0) {
					r.push(`shocked by ${his} new disability`);
				} else if (body.tastes === 0) {
					r.push(`pleasantly surprised at ${his} expanded senses`);
				}
				r.push(`come ${his} next mealtime.`);
			}
			if (
				(body.smells !== 0 && soul.smells === 0) ||
				(body.smells === 0 && soul.smells !== 0)
			) {
				r.push(`${He} won't realize it until some time after ${he} leaves the excessively sanitized operating room, but ${he}'s likely to`);
				if (soul.smells === 0) {
					r.push(`find the loss of ${his} sense of smell very distressing`);
				} else if (body.smells === 0) {
					r.push(`appreciate the restoration of ${his} sense of smell`);
				}
				r.push(`when ${he} does.`);
			}
			if (body.physicalAge < 40 && soul.physicalAge > 50 && body.fetish !== Fetish.MINDBROKEN) {
				if (body.devotion > 20) {
					r.push(`${He} can feel the <span class="green">lack of wrinkles</span> on ${his} face and <span class="hotpink">smiles broadly.</span>`);
					body.devotion += 2;
				} else {
					r.push(`${He} can feel the <span class="green">lack of wrinkles</span> on ${his} face and cringes at what this means for ${his} future.`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			r.push(`Once ${he} finishes with ${his} face, ${he} sits up to try and take stock of ${his} new`);

			if (
				(body.weight >= soul.weight + 30) ||
				(body.muscles <= soul.muscles - 30 && body.muscles < 50) ||
				(body.belly >= soul.belly + 10000) ||
				(body.boobs >= soul.boobs + 1000)
			) { /* (If fat/more big breasted/heavily pregnant/physically weaker and/or same or more weight)*/
				r.push(`body, letting out a grunt of effort as ${he} lifts ${his} heavier form.`);
			} else if (
				(body.weight <= soul.weight - 30) ||
				(body.muscles >= soul.muscles + 30 && soul.muscles < 50) ||
				(body.belly <= soul.belly - 10000) ||
				(body.boobs <= soul.boobs - 500)
			) { /* (if fat/less big breasted/physically stronger and/or same or less weight/no longer heavily pregnant)*/
				r.push(`body, the effort much easier than before.`);
			} else {
				r.push(`body.`);
			}

			r.push(`As ${he} settles ${himself}, ${he}`);
			if (canSee(body)) {
				r.push(`takes a look down,`);
			}
			r.push(`brings ${his} ${(hasBothArms(body)) ? `hands` : `hand`} to ${his} chest`);

			/* (breast changes)*/
			if (body.boobsImplant > 0 && soul.boobsImplant > 0) { /* (breast implants)*/
				r.push(`and finds`);
				if (body.boobsImplant >= soul.boobsImplant + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive implants+breast fetish)*/
					r.push(`${he} <span class="lime">still has breast implants; implants easily bigger than any old world woman's.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} silicone titans greatly excites ${him} to the point that ${he} can't hold back. ${He} gropes ${his} new chest boulders until an intense orgasm <span class="hotpink">courses through ${his} body.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help but become aroused at the weight of ${his} massive fake mounds filling ${his} arms. ${He} finally stops fondling when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`${he} <span class="lime">still has breast implants resting on ${his} chest. Even if they aren't clearly implants, ${he} can barely move under the weight of ${his} new breasts.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} gropes ${his} new chest pillows until an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused at the weight of ${his} massive fake mounds. ${He} finally stops fondling when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobsImplant >= soul.boobsImplant + 20000) { /* (Extreme bigger implants)*/
					r.push(`<span class="lime">a pair of absolutely enormous fake tits ballooning out from ${him}.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, though what lies within eludes ${his} mind.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">a pair of massive tits hanging from ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} feels them, ${he} recognizes the familiar firmness of the implants at their cores.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} gropes ${his} mammaries eagerly, desperate to familiarize ${himself} with them. ${He} bites ${his} lower lip as ${he} teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} bounces them in ${his} ${(hasBothArms(body)) ? `palms` : `palm`}, marveling at their mass.`);
					} else {
						r.push(`<span class="lime">${his} chest is heavier than ever.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">${his} bust has shrunk.</span> ${He} is saddened by the loss of the beautiful weight ${he} once bore and struggles to keep ${himself} under control for your sake, and succeeds. <span class="mediumorchid">But only barely.</span>`);
					} else {
						r.push(`<span class="orange">that ${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and lets the tears finish running from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="orange">they are smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="orange">that ${his} chest is smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">that ${his} chest is not as large as it once was.</span> ${He} looks at you with <span class="mediumorchid">anger</span>${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society` : ``}.`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.devotion > 20 && body.fetish !== Fetish.MINDBROKEN) {
						r.push(`a familiar chest waiting for ${him}.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same.`);
						if ((body.physicalAge < soul.physicalAge - 5) && body.fetish !== Fetish.MINDBROKEN) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else if (body.boobsImplant > 0 && soul.boobsImplant === 0) {
				r.push(`and finds`);
				if (body.boobsImplant >= soul.boobsImplant + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive implants+breast fetish)*/
					r.push(`<span class="lime">a pair of massive implants bulging out from ${him}.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} silicone titans greatly excites ${him} to the point that ${he} can't hold back. ${He} roughly gropes ${his} new chest boulders until an intense orgasm <span class="hotpink">courses through ${his} body.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help but become aroused at the weight of ${his} massive fake mounds filling ${his} arms. ${He} finally stops groping when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`<span class="lime">${he} has breast implants hanging from ${his} chest, somewhere. Even if they aren't clearly implants, ${he} can barely move with the weight of ${his} new breasts.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as ${he} fondles ${himself} until an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused at the weight of ${his} massive fake mounds filling ${his} arms. ${He} finally stops groping when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobsImplant >= soul.boobsImplant + 20000) { /* (Extreme bigger implants)*/
					r.push(`<span class="lime">a pair of absolutely enormous fake tits protruding far from ${his} body.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, yet far more firm than they were before.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">a pair of massive tits hanging from ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} moves, ${he} recognizes a familiar firmness at their cores.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, yet far more soft than they were before.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} gropes ${his} mammaries eagerly, desperate to familiarize ${himself} with them. ${He} bites ${his} lower lip as ${he} teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} bounces them in ${his} ${(hasBothArms(body)) ? `palms` : `palm`}, marveling at their firmness.`);
					} else {
						r.push(`<span class="lime">${his} chest is heavy with implants.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">${his} bust has shrunk.</span> ${He} is saddened by the loss of the beautiful weight ${he} once bore and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`<span class="orange">${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="orange">they are smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="orange">${his} chest is smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">${his} chest is not as large as it once was.</span> ${He}`);
						if (canSee(body)) {
							r.push(`looks at`);
						} else {
							r.push(`faces`);
						}
						r.push(`you with <span class="mediumorchid">anger</span>${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society` : ``}.`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`the same chest ${he} had before, except maybe firmer than ${his} addled brain remembers.`);
					} else if (body.devotion > 20) {
						r.push(`a familiar chest waiting for ${him}. ${He} quickly realizes ${his} mistake once ${he} squeezes them.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same. ${He} quickly realizes ${his} mistake once ${he} squeezes them.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else if (body.boobsImplant === 0 && soul.boobsImplant > 0) {
				if (body.boobs <= 300 && body.fetish === "boobs" && body.fetishKnown) { /* flat+fetish*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="orange">not only ${his} implants gone, but ${his} breasts entirely.</span> ${He} is saddened by ${his} flat chest and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`and finds that <span class="orange">${his} implants are gone, along with the rest of ${his} breasts.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and wipe the tears that are running from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= 300) { /* flat*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds that <span class="orange">${his} implants and breasts are completely gone.</span> This draws no reaction from ${him}.`);
					} else if (body.devotion > 20) {
						r.push(`and finds nothing. <span class="orange">Not only have ${his} implants been removed, but ${he}'s been left completely flat.</span> It is what it is.`);
					} else {
						r.push(`and finds nothing. <span class="orange">Not only have ${his} implants been removed, but ${he}'s been left completely flat.</span>`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`${He} knows much of society will view ${him} as a lesser person and a part of ${him} feels the same.`);
						}
						r.push(`This feels like a cruel manipulation of ${his} body and ${he} <span class="mediumorchid">hates you</span> a little more for it.`);
						body.devotion -= 2;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`<span class="lime">and finds nothing but breast.</span> As ${he} thoroughly gropes them, ${he} can just make out that ${he} no longer has implants.`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused at the weight of ${his} massive mounds filling ${his} arms. ${He} finally stops squirming when ${he}`);
						if (canSee(body)) {
							r.push(`sees your wolfish grin.`);
						} else {
							r.push(`feels your gaze.`);
						}
						r.push(`Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} boobs proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">and finds a pair of massive tits hanging from ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} fondles them, ${he} can just make out that ${he} no longer has implants.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">and finds ${his} tits are bigger than ever, yet implant free.</span> ${He} gropes ${his} mammaries eagerly, desperate to familiarize ${himself} with them. ${He} bites ${his} lower lip as ${he} teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">and finds that ${his} breasts have expanded in size, yet lack implants.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">and finds ${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} bounces them in ${his} ${(hasBothArms(body)) ? `palms` : `palm`}, marveling at the motion of silicone free flesh.`);
					} else {
						r.push(`<span class="lime">and finds ${his} chest is heavier than ever, and not because of silicone.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">and finds ${his} bust has shrunk.</span> ${He} is saddened by the loss of ${his} implants and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`<span class="orange">and finds that ${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} natural breasts begin to quiver${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and wipes the tears from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">and finds that ${his} implants have been removed.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">and finds that ${his} chest is not as large as it once was.</span> ${He}`);
						if (canSee(body)) {
							r.push(`looks`);
						} else {
							r.push(`gazes`);
						}
						r.push(`at you with <span class="mediumorchid">anger${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.` : `.</span>`}`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds nothing off about ${his} chest.`);
					} else if (body.devotion > 20) {
						r.push(`and finds a familiar chest waiting for ${him}, albeit <span class="coral">implant free.</span>`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`and finds that ${his} breasts are roughly the same, save for their <span class="coral">missing implants.</span>`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else {
				if (body.boobs <= 300 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* flat+fetish*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="orange">no tits at all.</span> ${He} is saddened by ${his} flat chest and struggles to keep ${himself} under control for your sake, and succeeds. <span class="mediumorchid">Barely.</span>`);
					} else {
						r.push(`and finds <span class="orange">no tits at all.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= 300 && soul.boobs > 300) { /* flat*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and <span class="orange">finds nothing.</span> ${He} doesn't seem to care, though.`);
					} else if (body.devotion > 20) {
						r.push(`and finds nothing; <span class="orange">${his} breasts are completely gone.</span> At least it's a literal weight off ${his} chest.`);
					} else {
						r.push(`and finds nothing; <span class="orange">${his} breasts are completely gone.</span>`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`${He} knows much of society will view ${him} as a lesser person and a part of ${him} feels the same.`);
						}
						r.push(`This feels like a cruel manipulation of ${his} body and ${he} <span class="mediumorchid">hates you</span> a little more for it.`);
						body.devotion -= 2;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`and finds <span class="lime">nothing but breast.</span> As ${he} jiggles them back and forth between ${his} arms, ${he} can make out that they are all natural.`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused at the weight of ${his} massive mammaries between ${his} arms. ${He} finally stops fondling when ${he}`);
						if (canSee(body)) {
							r.push(`sees your wolfish grin.`);
						} else {
							r.push(`feels your gaze.`);
						}
						r.push(`Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly caressing ${his} chest pillows proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`and finds a <span class="lime">pair of massive tits hanging from ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} feels them, ${he} can clearly tell they are completely natural.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="lime">${his} tits are bigger than ever.</span> ${He} gropes ${his} mammaries eagerly, desperate to familiarize ${himself} with them. ${He} bites ${his} lower lip as ${he} teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`and finds <span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds breasts. As ${he} examines them, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`and finds <span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} bounces them in ${his} ${(hasBothArms(body)) ? `palms` : `palm`}, marveling at the motion of ${his} soft flesh.`);
					} else {
						r.push(`and finds that <span class="lime">${his} chest is heavier than ever.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`and finds that <span class="orange">${his} bust has shrunk.</span> ${He} is saddened by ${his} smaller chest and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`and finds that <span class="orange">${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and wipe the tears from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them, ${he} seems to understand <span class="orange">that they smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`that <span class="orange">${his} breasts are smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`that <span class="orange">${his} chest is not as large as it once was.</span> ${He} looks at you with <span class="mediumorchid">anger${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.` : `.</span>`}`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`nothing out of the ordinary.`);
					} else if (body.devotion > 20) {
						r.push(`a familiar chest waiting for ${him}.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			}
			if (body.piercing.areola.weight !== 0 && soul.piercing.areola.weight === 0) {
				r.push(`${He} bumps into the piercings in ${his} areolae, brushing ${his} fingers against them and toying with them for a moment.`);
			}

			/* (if lactation status has changed)*/
			if (body.lactation > 0 && soul.lactation === 0) { /* (lactating now, wasn't before)*/
				r.push(`As ${he} fondles ${his} breasts,`);
				if (body.lactation === 1) {
					r.push(`<span class="coral">solitary drops of milk begin to drop from ${his} nipples.</span>`);
				} else {
					r.push(`<span class="coral">steady streams of milk start to flow from ${his} nipples.</span>`);
				}
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} reels back at the wet feeling.`);
				} else if (body.devotion > 20) {
					r.push(`${He} is delighted by the fact that ${his} breasts now produce milk. This is a gift ${he} will happily use for your benefit.`);
				} else {
					r.push(`${He} is irritated that you have altered ${his} body to produce milk.`);
				}
			} else if (body.fetish === Fetish.MINDBROKEN) {
				// TODO: write me
			} else if (body.lactation > 1 && soul.lactation === 1) {
				r.push(`${He} realizes ${his} breasts are <span class="lime">rapidly producing milk.</span> ${He} groans at the unfamiliar pressure.`);
			} else if (body.lactation === 1 && soul.lactation === 2) {
				r.push(`${He} realizes that ${his} breasts are <span class="orange">producing less milk.</span> ${He} seems a little relieved.`);
			} else if (body.lactation === 0 && soul.lactation > 0) {
				r.push(`${He} realizes that ${his} breasts <span class="orange">no longer produce milk.</span> ${He} doesn't show much reaction to this change.`);
			} else if (body.lactation > 0 && soul.lactation > 0) {
				r.push(`The familiar feeling of fullness in ${his} breasts tells ${him} ${he}'s producing as much milk as ever.`);
			}
			if (body.boobsMilk > 0) {
				r.push(`${He} groans as ${he} discovers just how badly ${he} needs to be milked.`);
			}

			if (body.nipples !== soul.nipples && body.fetish !== Fetish.MINDBROKEN) { /* (if nipples have changed shape)*/
				r.push(`Once ${he} is satisfied with ${his} tits, ${he} shifts ${his} chest to get a better`);
				if (canSee(body)) {
					r.push(`view of`);
				} else {
					r.push(`feel of`);
				}
				r.push(`${his} nipples, having noticed that they don't`);
				if (canSee(body)) {
					r.push(`look`);
				} else {
					r.push(`seem`);
				}
				r.push(`quite the same as before.`);
				switch (body.nipples) {
					case "fuckable":
						r.push(`${He} doesn't seem interested in them until ${he} slips a <span class="lime">finger deep inside one of the folds.</span> ${He} reddens at the thought of what the intent of this is.`);
						break;
					case "tiny":
						r.push(`${He}'s a little depressed by <span class="orange">how tiny they've become.</span>`);
						break;
					case "flat":
						r.push(`${He}'s a little depressed to find <span class="orange">the implants have pulled them flat.</span>`);
						break;
					case "puffy":
						r.push(`${He} quivers a little as ${he} traces the edges of ${his} <span class="lime">puffy nipples.</span>`);
						break;
					case "huge":
						r.push(`${He} quivers a little as ${he} grabs hold of the <span class="lime">two towering protrusions</span> jutting out from ${his} breasts.`);
						break;
					case "partially inverted":
						r.push(`${He} quivers a little as ${he}`);
						if (body.piercing.nipple.weight !== 0) {
							r.push(`tugs on the piercings, pulling <span class="lime">partially inverted nipples</span> out.`);
						} else {
							r.push(`teases the <span class="lime">little exposed nipples</span> sticking out of ${his} breasts.`);
						}
						break;
					case "inverted":
						r.push(`${He} quivers a little as ${he}`);
						if (body.piercing.nipple.weight !== 0) {
							r.push(`tugs on the piercings, forcing ${his} <span class="lime">inverted nipples</span> completely out.`);
						} else {
							r.push(`accidentally pops one of ${his} <span class="lime">inverted nipples</span> out.`);
						}
						break;
					default:
						r.push(`They can only be called normal, though ${he} can still call them cute.`);
				}
				if (body.piercing.nipple.weight !== 0 && soul.piercing.nipple.weight === 0 && body.nipples !== "inverted" && body.nipples !== "partially inverted") {
					r.push(`${He} also finds they are pierced, and takes a moment to pull at one, shivering at the tingles the action sends through ${his} chest.`);
				}
			}

			/* (if breasts have changed shape)*/
			if (body.boobShape !== soul.boobShape && body.boobs > 300 && body.fetish !== Fetish.MINDBROKEN) {
				r.push(`As ${he} releases ${his} boobs, ${he} discovers they no longer rest the same either;`);
				if (body.boobShape === "saggy") { /* (drooping or older)*/
					r.push(`<span class="red">they now sag,</span> disappointing ${him}.`);
				} else if (body.boobShape === "downward-facing") {
					r.push(`<span class="red">they now face downwards,</span> disappointing ${him}.`);
				} else if (body.boobShape === "wide-set") {
					r.push(`<span class="green">they settle heavily to either side of ${his} body.</span>`);
				} else if (body.boobShape === "perky") {
					r.push(`<span class="green">they are much perkier.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} jostles them playfully.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else if (body.boobShape === "torpedo-shaped") {
					r.push(`<span class="green">they stick out far from ${his} body.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} bounces to make them sway about.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else if (body.boobShape === "spherical") {
					r.push(`<span class="green">they sit roundly on ${his} chest and don't really move much.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} bounces to make them roll about.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else {
					r.push(`<span class="green">they can only be called normal.</span>`);
				}
			}

			if (canSee(body) && body.fetish !== Fetish.MINDBROKEN) {
				App.Events.addParagraph(el, r);
				r = [];
				if (soul.voice === 0) {
					r.push(`When ${he} finishes, ${he} turns to you and gestures for a mirror.`);
					if (body.voice !== 0) {
						r.push(`You gesture as if you couldn't hear ${him}, to which ${he} <span class="green">squeaks in response.</span> It immediately <span class="hotpink">dawns on ${him}</span> what this means. ${He} <span class="mediumaquamarine">thanks you profusely</span> before asking for a mirror.`);
						body.devotion += 5;
						body.trust += 10;
					}
				} else {
					r.push(`When ${he} finishes, ${he} turns to you and opens ${his} mouth to`);
					if (body.voice === 0) {
						r.push(`speak, but finds <span class="coral">no words come.</span> ${He} tries again, frowning. ${He} rubs ${his} throat and tears well in ${his} eyes, but no sobs can be heard as ${his} shoulders begin to <span class="gold">shake.</span> After a bit, ${he} extends ${his} hand, and gestures <span class="mediumorchid">somberly</span> for a mirror.`);
						body.devotion -= 5;
						body.trust -= 5;
					} else {
						r.push(`speak. At first ${he}'s slightly startled by ${his} new`);
						if (body.voice < soul.voice) {
							r.push(`<span class="orange">`);
							if (body.voice < soul.voice - 1) {
								r.push(`much`);
							}
							r.push(`lower voice,</span>`);
						} else if (body.voice > soul.voice) {
							r.push(`<span class="lime">`);
							if (body.voice < soul.voice + 1) {
								r.push(`much`);
							}
							r.push(`higher voice,</span>`);
						} else {
							r.push(`voice,`);
						}
						r.push(`but manages a single word. "...mirror..."`);
					}
				}
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`You depress a button and a long, body length mirror slides up from the floor near the wall.`);
				App.Events.addParagraph(el, r);
				r = [];
			} else if (canSee(body)) {
				r.push(`When ${he} finishes with ${his} tits, ${he} begins to strain to look at the rest of ${his} body.`);

				App.Events.addParagraph(el, r);
				r = [];
				r.push(`You depress a button and a long, body length mirror slides up from the floor near the wall.`);
				App.Events.addParagraph(el, r);
				r = [];
			} else {
				App.Events.addParagraph(el, r);
				r = [];
			}

			if (hasAnyLegs(body)) {
				r.push(`Your slave gingerly hops to`);
				if (!hasBothLegs(body)) {
					r.push(`stand up`);
				} else {
					r.push(`${his} feet`);
				}
				if (body.heels === 1 || !canWalk(body)) {
					if (body.heels === 1) {
						r.push(`and immediately stumbles, catching ${himself} before ${his} cut heels let ${him} fall to the floor.`);
					} else if (!canWalk(body)) {
						r.push(`and immediately collapses under ${his} own weight.`);
					}
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`${He} looks at you`);
						if (body.devotion >= -20) {
							r.push(`<span class="hotpink">submissively</span>`);
							body.devotion += 5;
						} else {
							r.push(`<span class="mediumorchid">angrily</span>`);
							body.devotion -= 5;
						}
						r.push(`as ${he}`);
					} else {
						r.push(`${He}`);
					}
					r.push(`pulls ${his} weight back onto the bed and tries again, this time using the gurney to support ${himself}. ${He}`);
				} else {
					r.push(`and`);
				}
				/* (height changes) */
				if (body.height >= soul.height + 10) {
					r.push(`wobbles for a moment as ${he} adjusts to ${his} new height.`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`The benefits of <span class="lime">being taller</span> don't register to the broken ${girl}.`);
					} else if (body.devotion > 20) {
						r.push(`${He} is <span class="hotpink">truly pleased</span> that you have taken the effort to make ${him} <span class="lime">taller,</span> knowing that a lot of everyday things in life will be easier, and that ${he} will be viewed as having more stature now, both metaphorically and literally.`);
						body.devotion += 2;
					} else {
						r.push(`${He} frowns for a moment, before shrugging and accepting this small gift, even knowing that it is likely not for ${his} sake that you have done this. ${His} mouth curls into a <span class="mediumaquamarine">small grin</span> for just a moment as ${he} considers how <span class="lime">being taller</span> will benefit ${him}.`);
						body.trust += 1;
					}
				} else if (body.height <= soul.height - 10) {
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`doesn't quite realize that ${he} is <span class="lime">shorter than before.</span>`);
					} else {
						r.push(`starts at the falling sensation before realizing ${he} is just <span class="lime">shorter than ${he} was before.</span>`);
						if (body.devotion > 20) {
							r.push(`As frustrating as it will be, ${he} tries to look at the bright side of this and thinks of all the fun things ${he} will be able to do easier now, like being picked up and set on a counter or pinned against a wall. ${He} drools a little, before shaking ${his} head and continuing on.`);
						} else {
							r.push(`This is aggravating more than anything to ${him}. Everything will just be just that much more difficult now. ${He} <span class="mediumorchid">glowers at you.</span>`);
							body.devotion -= 2;
						}
					}
				} else {
					r.push(`quickly gets used to ${his} new body's similar stature.`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			r.push(`${He}`);
			if (canSee(body)) {
				r.push(`takes in`);
			} else {
				r.push(`runs ${his} ${(hasBothArms(body)) ? `hands` : `hand`} across`);
			}
			r.push(`${his} new figure.`);

			if (body.fetish !== Fetish.MINDBROKEN && canSee(body)) {
				if (body.race !== soul.race) { /* (race changes)*/
					r.push(`It immediately strikes ${him} that ${he} is <span class="coral">no longer ${soul.race}.</span> ${His} new ${body.race} body`);
					if (body.devotion > 50) {
						r.push(`intrigues and delights ${him}. ${He} is happy that you invested in ${his} appearance in such an interesting way.`);
					} else if (body.devotion > 20) {
						r.push(`<span class="mediumorchid">disturbs ${him}.</span> ${He} is <span class="gold">shaken</span> by such a drastic change.`);
						body.devotion -= 10;
						body.trust -= 10;
					} else {
						r.push(`<span class="mediumorchid">disgusts and angers ${him}.</span> One of the only parts of ${his} identity ${he} had left has now been stripped from ${him}.`);
						body.devotion -= 20;
					}
				} else if (body.devotion <= 50) {
					r.push(`It immediately strikes ${him} that ${he} is still ${body.race}. ${He}'s <span class="hotpink">relieved</span> that you didn't take such a deep part of ${his} identity from ${him}.`);
					body.devotion += 1;
				}
			}

			if (body.bald === 1 && soul.bald === 0) { /* (+baldness)*/
				if (canSee(body)) {
					r.push(`Something about ${his} head catches ${his} eye; <span class="red">${he} is now bald.</span>`);
				} else {
					r.push(`${He} begins to run ${his} fingers through ${his} hair, only to <span class="red">find it gone.</span>`);
				}
				r.push(`This`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`catches ${his} attention, and ${he} spends some time rubbing ${his} new smooth scalp.`);
				} else if (body.devotion > 20) {
					r.push(`feels fun and interesting, and ${he} gently rubs ${his} new smooth scalp.`);
				} else {
					r.push(`feels like a gross imposition and ${he} <span class="mediumorchid">scowls at you accusingly,</span> for this is one less thing that marks ${him} as a person that you have taken from ${him}.`);
					body.devotion -= 3;
				}
			} else if (body.bald === 0 && soul.bald === 1) { /* (-baldness)*/
				if (canSee(body)) {
					r.push(`Something about ${his} head catches ${his} eye; <span class="green">${he} now has hair.</span>`);
				} else {
					r.push(`${He} moves to rub ${his} bald head, only to find ${he} <span class="green">has a full head of hair.</span>`);
				}
				r.push(`This`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`catches ${his} attention, and ${he} spends some time pulling at ${his} new hair.`);
				} else if (body.devotion >= -20) {
					r.push(`makes ${him} <span class="hotpink">squeal with delight.</span> ${He} plays with ${his} new hair, enjoying how it feels between ${his} fingers.`);
					body.devotion += 3;
				} else {
					r.push(`surprises ${him}. ${He} is not happy with your doing something like this while ${he} had no control of it, but under the circumstances there are far worse things to have than hair.`);
				}
			} else if (body.bald === 1 && soul.bald === 1) {
				if (canSee(body)) {
					r.push(`Something about ${his} head catches ${his} eye, but it turned out to be nothing. ${He} is as bald as ever.`);
				} else {
					r.push(`${He} moves to rub ${his} bald head and is not disappointed.`);
				}
			} else {
				if (canSee(body)) {
					r.push(`Something about ${his} head catches ${his}`);
					if (body.hColor !== soul.hColor) {
						r.push(`eye; ${he} <span class="coral">now has ${body.hColor} hair.</span>`);
					} else {
						r.push(`eye, but it was a trick of the light; ${his} hair is more or less the same.`);
					}
				} else {
					r.push(`${He} runs ${his} fingers through ${his} hair and finds that things aren't very different.`);
				}
			}

			/* (age)*/
			if (body.physicalAge >= soul.physicalAge + 5 || (body.physicalAge > 18 && soul.physicalAge < 16)) { /* (older)*/
				if (body.physicalAge > 18 && soul.physicalAge < 16) {
					r.push(`${He} starts at just how much <span class="red">older ${his}`);
					if (canSee(body)) {
						r.push(`face and body are.</span>`);
					} else {
						r.push(`body is.</span>`);
					}
					if (body.physicalAge > 100) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s knocking on death's door.`);
					} else if (body.physicalAge > 80) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s ancient.`);
					} else if (body.physicalAge > 30) {
						r.push(`${He}'s shocked to find that ${he}'s practically a MILF.`);
					} else if (body.physicalAge >= 18) {
						r.push(`${He}'s shocked to find ${he}'s now a fresh adult.`);
					}
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`This is disturbing to ${him} on a fundamental level,`);
						if (body.devotion > 50) {
							r.push(`as that means ${he} will now will have less time with you before the end of ${his}`);
							if (V.policies.retirement.physicalAgePolicy === 1) {
								r.push(`service and`);
							}
							r.push(`life. ${He} does ${his} best to shrug this off and tries to think of all the fun things a lewd older body can do.`);
						} else {
							r.push(`as that means ${he} will be <span class="mediumorchid">unable to spend as much time on this earth.</span>`);
							body.devotion -= (body.physicalAge - soul.physicalAge) * 2;
							if (V.policies.retirement.physicalAgePolicy === 1) {
								r.push(`On the other hand, it means ${he} won't have as much time to spend with you before ${he} is retired.`);
							} else {
								r.push(`This is compounded with the fact that ${he} <span class="gold">may well die before ${he} becomes a freed slave.</span>`);
								body.trust -= (body.physicalAge - soul.physicalAge * 2);
							}
						}
						if (
							(body.ovaries === 1 || body.mpreg === 1) &&
							body.pubertyXX === 1 &&
							soul.pubertyXX === 0 &&
							isFertile(body)
						) {
							r.push(`${His} hand slips to ${his} middle for a second as the urge to breed crosses ${his} mind.`);
						}
						if (body.balls > 0 && body.pubertyXY === 1 && soul.pubertyXY === 0) {
							r.push(`${He} shudders with pleasure at the thought of cumming in a fertile pussy. ${He} realizes this body has gone through puberty.`);
						}
					}
				} else if (body.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} starts as ${he}`);
					if (canSee(body)) {
						r.push(`sees`);
					} else {
						r.push(`discovers`);
					}
					r.push(`that ${he} is <span class="red">now older than ${he} once was.</span> This is disturbing to ${him} on a fundamental level,`);
					if (body.devotion > 50) {
						r.push(`as that means ${he} will now will have less time with you before the end of ${his}`);
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`service and`);
						}
						r.push(`life. ${He} does ${his} best to shrug this off and tries to think of all the fun things a lewd older body can do.`);
					} else {
						r.push(`as that means ${he} will be <span class="mediumorchid">unable to spend as much time on this earth.</span>`);
						body.devotion -= (body.physicalAge - soul.physicalAge) * 2;
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`On the other hand, it means ${he} won't have as much time to spend with you before ${he} is retired.`);
						} else {
							r.push(`This is compounded with the fact that ${he} <span class="gold">may well die before ${he} becomes a freed slave.</span>`);
							body.trust -= (body.physicalAge - soul.physicalAge * 2);
						}
					}
				}
			} else if (body.physicalAge <= soul.physicalAge - 5 || (body.physicalAge < 18 && body.physicalAge < soul.physicalAge)) { /* (younger)*/
				r.push(`${He} starts at ${his} <span class="green">youthful new`);
				if (canSee(body)) {
					r.push(`face and`);
				}
				r.push(`body.</span>`);
				if (soul.physicalAge >= 18) {
					if (body.physicalAge < 4) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s a toddler again.`);
					} else if (body.physicalAge < 9) {
						r.push(`${He}'s surprised to find ${he}'s a little ${girl}.`);
					} else if (body.physicalAge < 13) {
						r.push(`${He}'s surprised to find that ${he}'s once more a preteen.`);
					} else if (body.physicalAge < 16) {
						r.push(`${He} never expected to be a teenager again.`);
					} else if (body.physicalAge < 18) {
						r.push(`${He} never expected to be a young adult again.`);
					}
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					let puberty = 0;
					if (
						(
							(body.physicalAge < body.pubertyAgeXX &&
								(body.ovaries === 1 || body.mpreg === 1)
							) ||
							(body.physicalAge < body.pubertyAgeXY && body.balls > 0)
						) &&
						(soul.pubertyXX === 1 || soul.pubertyXY === 1)
					) {
						r.push(`${He} realizes that ${he} will have to <span class="coral">go through puberty again,</span> now that ${he} is ${body.physicalAge} once more. This is unnerving to ${him}.`);
						puberty = 1;
					}
					if (body.devotion > 20) {
						if (puberty === 1) {
							r.push(`However, ${he} will do ${his} best to enjoy the highs that come with it, and`);
						} else {
							r.push(`This is a <span class="hotpink">wonderful gift to ${him},</span> as ${he} will now be able to`);
							body.devotion += Math.max(soul.physicalAge - body.physicalAge, 10);
						}
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`spend more time with you before the end of ${his} service.`);
						} else {
							r.push(`service you better, as well as have all the other benefits of youthful age.`);
						}
					} else {
						if (puberty === 1) {
							r.push(`It will be frustrating to go through the rigors of sexual development all over again, especially when combined with the fact that ${he} must also`);
						} else {
							r.push(`This is both a <span class="hotpink">blessing</span> and a <span class="gold">curse,</span> as while ${he} now has a younger and healthier body, ${he} must also`);
							body.devotion += Math.max(soul.physicalAge - body.physicalAge, 10);
							body.trust -= 5;
						}
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`spend more time with you before the end of ${his} service.`);
						} else {
							r.push(`use all of ${his} youth for the benefit of ${his} master instead of ${himself}.`);
						}
					}
				}
			}

			/* weight*/
			if (body.weight >= soul.weight + 5 || body.weight <= soul.weight - 5) {
				r.push(`The very next thing ${he} finds is how much`);
				if (body.weight >= soul.weight + 5) {
					r.push(`<span class="red">heavier ${he} is.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`With ${his} broken mind, ${he} shows no real reaction to this new weight.`);
					} else if (body.devotion > 50) {
						if (body.behavioralFlaw === "gluttonous") {
							r.push(`${He} is <span class="hotpink">perfectly fine</span> with this; a bigger body means more food for ${his} belly and more for you to love.`);
							body.devotion += 1;
						} else if (body.behavioralFlaw === "anorexic") {
							r.push(`${He} pinches ${himself} and groans a little. ${He} knows if you wanted ${him} heavier, you could have just force-fed ${him} to this size, so ${he} keeps further opinions to ${himself}.`);
						} else if (body.behavioralQuirk === "insecure") {
							r.push(`${He} is <span class="hotpink">perfectly fine</span> with this; if you want ${him} to be softer, then <span class="mediumaquamarine">that is what ${he} wants too.</span>`);
							body.devotion += 1;
							body.trust += 1;
						} else if (body.behavioralQuirk === "fitness" && body.weight > 30) {
							r.push(`${He} would prefer to be fitter, but this just means ${he} can work it off for your amusement.`);
						} else {
							r.push(`${He} is happy that you have given ${him} more weight for you to play`);
							if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
								r.push(`with, but is somewhat confused that you would do so against the society you created.`);
							} else {
								r.push(`with.`);
							}
						}
					} else {
						if (body.behavioralFlaw === "gluttonous") {
							r.push(`${He} is <span class="hotpink">surprisingly fine</span> with this; a bigger body means more food for ${his} belly, after all.`);
							if (body.weight > 30) {
								r.push(`Though ${he} would have preferred to not be this fat.`);
							}
							body.devotion += 1;
						} else if (body.behavioralFlaw === "anorexic") {
							r.push(`${He} pinches ${himself} and <span class="mediumorchid">groans with disgust.</span> ${He} shudders at the thought of <span class="gold">what you'll do next.</span>`);
							body.devotion -= 3;
							body.trust -= 3;
						} else if (body.behavioralQuirk === "insecure") {
							r.push(`${He} is surprisingly fine with this; you know best, after all.`);
						} else if (body.behavioralQuirk === "fitness" && body.weight > 30) {
							r.push(`${He} is <span class="mediumorchid">irritated and frustrated</span> at this new weight. ${He} should be fit, not fat!`);
							body.devotion -= 10;
						} else {
							r.push(`${He} is <span class="mediumorchid">irritated and frustrated</span> at this new`);
							body.devotion -= 5;
							if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
								r.push(`weight, <span class="mediumorchid">doubly so</span> because your society will view ${him} as less of a person now.`);
								body.devotion -= 5;
							} else if (FutureSocieties.isActive('FSHedonisticDecadence')) {
								r.push(`weight, however ${he} is at least <span class="hotpink">somewhat mollified</span> with the knowledge that society will treat ${him} with a bit more reverence now.`);
								body.devotion += 3;
							} else {
								r.push(`weight.`);
							}
						}
					}
				} else {
					r.push(`<span class="green">lighter ${he} is.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) { /* mindbroken*/
						r.push(`${He} doesn't show much reaction to ${his} lost weight.`);
					} else if (body.devotion > 50) { /* devoted*/
						r.push(`${He} is pleased that you have given ${him} a more slender and svelte`);
						if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`body and is even happier that ${his} body is more in line with your society.`);
						} else {
							r.push(`body.`);
						}
					} else { /* not devoted*/
						r.push(`${He} is a bit miffed that you would modify ${his} body in such a way, knowing it has nothing to do with making ${him}`);
						if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`happy, but feels a bit better knowing that society will now view ${him} in a better light.`);
						} else {
							r.push(`happy.`);
						}
					}
				}
			}

			/* muscle*/
			if (body.muscles >= soul.muscles + 5 || body.muscles <= soul.muscles - 5) {
				r.push(`The last major change to ${his} body structure worth ${his} attention is`);
				if (body.muscles >= soul.muscles + 5) {
					r.push(`that ${he} is <span class="lime">significantly more muscular</span> than ${he} once was.`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 50) {
							r.push(`${He} is happy with ${his} newfound strength and looks forward to putting this power to work for you.`);
						} else {
							r.push(`${He} is irritated that you would change something like this about ${him}`);
							if (body.genes === "XX" && !FutureSocieties.isActive('FSPhysicalIdealist')) {
								r.push(`and is <span class="mediumorchid">annoyed</span> that ${he} now looks less feminine.`);
								body.devotion -= 3;
							} else {
								r.push(`but <span class="mediumaquamarine">appreciates</span> the extra strength nonetheless, as it will most likely help ${him} in all sorts of ways.`);
								body.trust += 5;
							}
						}
					}
				} else {
					r.push(`that ${he} is <span class="orange">significantly less muscular</span> than before.`);
					if (body.devotion > 50) {
						r.push(`${He} appreciates that you would take the time to make ${him} more feminine.`);
					} else {
						r.push(`${He} is <span class="mediumorchid">annoyed</span> that you would alter something about ${him} like this, and more so because ${he} will have to <span class="gold">work harder</span> now to do the things ${he} could before.`);
						body.devotion -= 3;
						body.trust -= 3;
					}
				}
			}

			/* (pregnancy/belly changes)*/
			let weightChange = 0;/* used to segue to weight after pregnancy/belly implants*/
			if (body.pregKnown === 1 && soul.preg > 0) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} ${(hasBothArms(body)) ? `hands drift` : `hand drifts`} over ${his} stomach,`);
				if (body.bellyPreg < 100) {
					if (body.counter.birthsTotal === 0) {
						r.push(`but ${he}'s too inexperienced to recognize ${his} <span class="pink">early pregnancy.</span>`);
					} else if (body.counter.birthsTotal > 0) {
						r.push(`and since this is not ${his} first pregnancy, ${he} is able to recognize the <span class="pink">life within ${him}.</span>`);
					}
				} else if (body.bellyPreg >= 450000) {
					r.push(`and ${he} can immediately see that ${he} is <span class="pink">insanely pregnant,</span> ${his} body stretched full of babies.`);
				} else if (body.bellyPreg >= 150000) {
					r.push(`and ${he} can quite clearly see that ${he} is <span class="pink">enormously pregnant,</span> so much so that ${his} body could quite believably be carrying nine full sized babies.`);
				} else if (body.bellyPreg >= 60000) {
					r.push(`and ${he} can see that ${he} is almost <span class="pink">unnaturally pregnant,</span> with a belly swollen to a size that could easily carry four full grown babies.`);
				} else if (body.bellyPreg >= 15000) {
					r.push(`and ${he} can clearly see that ${he} is <span class="pink">quite pregnant,</span> as ${he} cradles a belly that could easily carry a full sized baby.`);
				} else if (body.bellyPreg >= 5000) {
					r.push(`and ${he} feels a <span class="pink">bump in ${his} stomach,</span> as well as a gentle kick.`);
				} else if (body.bellyPreg >= 100) {
					r.push(`and ${he} feels a <span class="pink">slight swell to ${his} stomach.</span>`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.bellyPreg >= 100 || body.counter.birthsTotal > 0) {
						if (body.devotion > 50) {
							r.push(`Even though ${he} didn't get to experience being made into one, ${he} is delighted to be a mother${(body.counter.birthsTotal > 0) ? ` again` : ``}.`);
						} else {
							r.push(`${He} is filled with conflicting emotions, <span class="mediumorchid">hatred</span> for you for forcing`);
							if (body.pregType > 1) {
								r.push(`these lives`);
							} else {
								r.push(`this life`);
							}
							r.push(`onto ${him}, as well as the instinct of a mother's love for ${his} unborn child.`);
							body.devotion -= 3;
						}
					}
				} else if (body.fetish === "pregnancy") {
					if (body.bellyPreg >= 100 || body.counter.birthsTotal > 0) {
						if (body.devotion > 50) {
							r.push(`Even though ${he} didn't get to experience being made into one, ${he} is overjoyed to have`);
							if (body.counter.birthsTotal > 0) {
								r.push(`another`);
							} else {
								r.push(`a`);
							}
							r.push(`life growing inside ${him}.`);
						} else {
							r.push(`${He} is filled with conflicting emotions, hate for being forced into this, but also joy from getting to be pregnant. While you didn't do this for ${his} amusement, ${he}'ll definitely take advantage of it.`);
						}
					}
				}
				weightChange = 1;
			} else if (body.bellyImplant > soul.bellyImplant && body.bellyImplant >= 100) { /* belly implant filled*/
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} ${(hasBothArms(body)) ? `hands drift` : `hand drifts`} over ${his} stomach, where ${he}`);
				if (body.bellyImplant >= 450000) {
					r.push(`finds there is no chance of ${him} reaching ${his} navel across ${his} <span class="pink">massive middle.</span>`);
				} else if (body.bellyImplant >= 150000) {
					r.push(`hugs what could be a <span class="pink">belly carrying a multitude of children.</span>`);
				} else if (body.bellyImplant >= 60000) {
					r.push(`embraces a <span class="pink">belly that could be laden with multiples at the brink of birth.</span>`);
				} else if (body.bellyImplant >= 15000) {
					r.push(`cradles a <span class="pink">belly swollen enough to be carrying at least one baby ready to drop.</span>`);
				} else if (body.bellyImplant >= 5000) {
					r.push(`feels a <span class="pink">clear bump in ${his} stomach from the belly implant.</span>`);
				} else if (body.bellyImplant >= 100) {
					r.push(`feels a <span class="pink">slight swell to ${his} stomach.</span>`);
				}
				if (body.devotion > 50) {
					r.push(`${He} likes how the bulge looks on ${him} and can't wait to get fucked with it in the way.`);
				} else {
					r.push(`It <span class="mediumorchid">bothers ${him}</span> that you would add such a`);
					if (body.bellyImplant >= 10000) {
						r.push(`major`);
					} else {
						r.push(`minor`);
					}
					r.push(`inconvenience to ${his} body.`);
					body.devotion -= 1;
				}
				if (soul.pregKnown === 1) {
					if (body.fetish === "pregnancy") {
						if (body.devotion > 50) {
							r.push(`${He} <span class="mediumorchid">scowls with momentary wrath</span> before regaining ${his} composure. ${He} resents being separated from ${his} pregnancy${(canGetPregnant(body)) ? `, though that is easily remedied` : ``}.`);
							body.devotion -= 5;
						} else if (body.devotion > 20) {
							r.push(`${He} <span class="mediumorchid">scowls angrily</span> at this turn of events${(canGetPregnant(body)) ? `, though that will be easily remedied by putting another child in ${him}` : ``}.`);
							body.devotion -= 10;
						} else {
							r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} pregnancy away from ${him}.`);
							body.devotion -= 15;
						}
					} else if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 50) {
							r.push(`While ${he} will miss the chance of meeting ${his} future child, ${he} will no longer be weighed down by it as ${he} gets used to ${his} new body.`);
						} else if (body.devotion > 20) {
							r.push(`${He} accepts this as how things are.`);
						} else {
							r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} child away from ${him}. It didn't matter if ${he} wanted it or not; <span class="gold">it was ${hers} and you took it.</span>`);
							body.devotion -= 10;
							body.trust -= 10;
						}
					}
				}
				weightChange = 1;
			} else if (body.pregKnown === 0 && soul.pregKnown === 1) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} ${(hasBothArms(body)) ? `hands drift` : `hand drifts`} over ${his} stomach, where ${he} discovers ${he} is <span class="pink">no longer pregnant.</span>`);
				if (body.fetish === "pregnancy") {
					if (body.devotion > 50) {
						r.push(`${He} <span class="mediumorchid">scowls with momentary wrath</span> before regaining ${his} composure. ${He} resents being separated from ${his} pregnancy${(canGetPregnant(body)) ? `, though that is easily remedied` : ``}.`);
						body.devotion -= 5;
					} else if (body.devotion > 20) {
						r.push(`${He} <span class="mediumorchid">scowls angrily</span> at this turn of events${(canGetPregnant(body)) ? `, though that will be easily remedied by putting another child in ${him}` : ``}.`);
						body.devotion -= 10;
					} else {
						r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} pregnancy away from ${him}.`);
						body.devotion -= 15;
					}
				} else if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 50) {
						r.push(`While ${he} will miss the chance of meeting ${his} future child, ${he} will no longer be weighed down by it as ${he} gets used to ${his} new body.`);
					} else if (body.devotion > 20) {
						r.push(`${He} accepts this as how things are.`);
					} else {
						r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} child away from ${him}. It didn't matter if ${he} wanted it or not; <span class="gold">it was ${hers} and you took it.</span>`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				}
				weightChange = 1;
			} else if (body.bellyImplant < soul.bellyImplant) { /* belly implant reduced*/
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} ${(hasBothArms(body)) ? `hands drift` : `hand drifts`} over ${his} stomach, where ${he}`);
				if (body.bellyImplant >= 450000) {
					r.push(`finds there is <span class="pink">still no chance of ${him} reaching ${his} navel across ${his} massive middle.</span>`);
				} else if (body.bellyImplant >= 150000) {
					r.push(`hugs what could be a <span class="pink">belly carrying a multitude of children.</span>`);
				} else if (body.bellyImplant >= 60000) {
					r.push(`embraces a <span class="pink">belly that could be laden with multiples at the brink of birth.</span>`);
				} else if (body.bellyImplant >= 15000) {
					r.push(`cradles a <span class="pink">belly swollen enough to be carrying at least one baby ready to drop.</span>`);
				} else if (body.bellyImplant >= 5000) {
					r.push(`feels a <span class="pink">clear bump in ${his} stomach from the belly implant.</span>`);
				} else if (body.bellyImplant >= 100) {
					r.push(`feels a <span class="pink">slight swell to ${his} stomach.</span>`);
				} else {
					r.push(`finds <span class="pink">no signs of an implant-swollen belly.</span>`);
				}
				if (body.devotion > 20) {
					r.push(`${He} appreciates how much easier it will be with a smaller middle.`);
				} else {
					r.push(`${He} can't help but appreciate losing the bulk, but ${he} still <span class="gold">worries</span> over your control of ${his} body.`);
					body.trust -= 1;
				}
				weightChange = 1;
			}

			/* stomach*/
			if (weightChange !== 1) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${His} ${(hasBothArms(body)) ? `hands drift` : `hand drifts`} over`);
			} else {
				r.push(`${He} continues to fondle`);
			}
			if (body.weight >= soul.weight + 30) { /* (fatter)*/
				r.push(`${his} stomach until ${he} feels just how <span class="red">much more weight</span> ${he} is carrying.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new curves intriguing.`);
					} else {
						r.push(`${His} face contorts with <span class="mediumorchid">disgust</span> at ${his} newfound bulk.`);
						body.devotion -= 5;
					}
				}
				if (body.bellySag > soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices <span class="red">how much it sags.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This isn't pleasant, but ${he} bears it for you.`);
						} else {
							r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
							body.devotion -= 2;
						}
					}
				} else if (body.bellySag < soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices it is <span class="green">tighter despite being softer.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new firm belly.`);
						} else {
							r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
							body.devotion += 1;
						}
					}
				}
			} else if (body.weight <= soul.weight - 30) { /* (thinner)*/
				r.push(`${his} stomach and ${he} finds ${his} body <span class="green">thinner.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new curves intriguing.`);
					} else {
						r.push(`While free weight loss is <span class="hotpink">appreciated,</span> ${he} wishes ${he} had some say in the matter.`);
						body.devotion += 1;
					}
				}
				if (body.bellySag > soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices how it <span class="red">has a sag to it.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This isn't pleasant, but ${he} bears it for you.`);
						} else {
							r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
							body.devotion -= 2;
						}
					}
				} else if (body.bellySag < soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices it is <span class="green">tighter despite being softer.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new perkier belly.`);
						} else {
							r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
							body.devotion += 1;
						}
					}
				}
			} else if (body.bellySag > soul.bellySag && body.belly < 100) { /* (belly sag)*/
				r.push(`${his} stomach and ${he} notices a <span class="red">sag in ${his} belly.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`This isn't pleasant, but ${he} bears it for you.`);
					} else {
						r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
						body.devotion -= 2;
					}
				}
			} else if (body.bellySag < soul.bellySag && body.belly < 100) { /* (subtracted)*/
				r.push(`${his} stomach and notices the <span class="green">sag in ${his} belly has lessened.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new tight belly.`);
					} else {
						r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
						body.devotion += 1;
					}
				}
			} else if (body.weight < 10 && body.muscles > 5 && body.belly < 100) {
				r.push(`${his} <span class="lime">muscled stomach.</span> ${He} stops to trace ${his} abs.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new strength intriguing.`);
					} else {
						r.push(`${He} finds ${his} new strength <span class="mediumaquamarine">empowering.</span>`);
						body.trust += 2;
					}
				}
			} else {
				r.push(`stomach, though ${he} finds little out of the ordinary${(weightChange === 1) ? `; other than the obvious, of course` : ``}.`);
			}
			if (body.piercing.navel.weight !== 0 && soul.piercing.navel.weight === 0) {
				r.push(`${He} now has a piercing in ${his} navel; ${he} rolls ${his} tummy${(body.belly >= 15000) ? `, a feat in and of itself` : ``}, fascinated by ${his} new hardware grazing ${his} stomach to the motion.`);
			}

			/* waist */
			if (body.waist > soul.waist + 40) {
				r.push(`As ${he} explores ${his} middle, ${he} also takes note of ${his} <span class="orange">wider waist.</span>`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`The effects of such a change on ${his} appearance go right over ${his} head.`);
				} else if (body.devotion > 20) {
					r.push(`This change disappoints ${him}. ${He} wishes ${he} could have been more feminine for you.`);
				} else {
					r.push(`This change <span class="mediumorchid">disgusts ${him};</span> it will only leave ${him} treated worse compared to the more feminine slaves.`);
					body.devotion -= 1;
				}
			} else if (body.waist < soul.waist - 40) {
				r.push(`As ${he} explores ${his} middle, ${he} also takes note of ${his} <span class="lime">narrower waist.</span>`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`The effects of such a change on ${his} appearance go right over ${his} head.`);
				} else if (body.devotion > 20) {
					r.push(`This change pleases ${him}; ${he} can't wait to feel your hands around ${him}.`);
				} else {
					r.push(`That you would make such a change to ${him} <span class="mediumorchid">disgusts ${him},</span> though ${he} <span class="mediumaquamarine">takes solace</span> in the fact that ${he} will likely be treated better for being more attractive.`);
					body.devotion -= 1;
					body.trust += 1;
				}
			}

			/* corset piercing */
			if (body.piercing.corset.weight !== 0 && soul.piercing.corset.weight === 0) {
				r.push(`An odd feeling on ${his} back draws ${his} attention. ${He} discovers a series of rings running down ${his} spine and, flexing ${his} back muscles, shudders at the sensation.`);
			}

			App.Events.addParagraph(el, r);
			r = [];
			r.push(`As ${his} ${(hasBothArms(body)) ? `hands wander` : `hand wanders`} lower,`);

			/* (changed genitals)*/
			if (soul.vagina > -1) { /* (had a vagina)*/
				if (body.dick > 0 && soul.dick > 0) { /* (had a penis)*/
					r.push(`${he} is relieved to find<span class="coral">`);
					if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
						r.push(`a cock, balls and pussy.`);
					} else if (body.balls === 0 && soul.balls > 0 && soul.scrotum > 0) {
						r.push(`both a cock and pussy, though ${he} is a little miffed that ${he} now lacks testicles.`);
					} else if (body.balls > 0 && body.scrotum > 0 && soul.balls === 0) {
						r.push(`both a cock, pussy and, more surprisingly, balls.`);
					} else {
						r.push(`both a cock and pussy.`);
					}
					r.push(`</span>`);
				} else if (body.dick > 0 && soul.dick === 0) { /* (+penis)*/
					r.push(`${he} is startled to find ${he} <span class="coral">has a penis</span> now.`);
					if (body.vagina > -1) { /* (kept vagina)*/
						r.push(`${He} is confused for a moment until ${he} lifts ${his} new penis to <span class="coral">`);
						if (canSee(body)) {
							r.push(`see`);
						} else {
							r.push(`discover`);
						}
						r.push(`a pussy under it.</span>`);
					} else { /* (did not keep vagina, +penis or not)*/
						r.push(`${He} understands that ${he} <span class="coral">no longer has a vagina.</span>`);
					}
				} else if (body.dick === 0 && soul.dick > 0) { /* (had a penis)*/
					r.push(`${he} is shocked to`);
					if (canSee(body)) {
						r.push(`see`);
					} else {
						r.push(`discover`);
					}
					r.push(`that ${he} <span class="coral">no longer has a penis,`);
					if (body.balls > 0 && body.scrotum > 0) {
						r.push(`mostly because ${he} still has balls.`);
					} else if (body.vagina > -1) {
						r.push(`though ${he} is glad to still have a pussy.`);
					} else {
						r.push(`or anything, for that matter, on ${his} crotch.`);
					}
					r.push(`</span>`);
				} else if (body.vagina > -1) {
					r.push(`${he} is happy to find a familiar hole.`);
				} else {
					r.push(`${he} is startled to find ${he} <span class="coral">no longer has genitals.</span>`);
				}
			} else if (soul.dick > 0) { /* (had a penis)*/
				if (body.dick > 0) {
					r.push(`${he} is relieved to find ${he} <span class="coral">still has ${his}`);
					if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
						r.push(`penis and testicles.`);
					} else if (body.balls === 0 && soul.balls > 0 && soul.scrotum > 0) {
						r.push(`penis, but is a little alarmed to find ${he} now lacks testicles.`);
					} else if (body.balls > 0 && body.scrotum > 0 && soul.balls === 0) {
						r.push(`penis, but is more interested in the dangling pair of objects beneath it.`);
					} else {
						r.push(`penis.`);
					}
					r.push(`</span>`);
					if (body.vagina > -1) {
						r.push(`A new sensation causes ${him} to roam lower. Much to ${his} surprise, ${he} <span class="coral">now also has a pussy.</span>`);
					}
				} else {
					r.push(`${he} is shocked to find that ${he} <span class="coral">no longer has a`);
					if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
						r.push(`penis, but still has balls.`);
					} else if (body.vagina > -1) {
						r.push(`penis, but a pussy.`);
					} else {
						r.push(`penis, or anything, for genitals.`);
					}
					r.push(`</span>`);
				}
			} else {
				r.push(`${he} is surprised to find`);
				if (body.dick > 0 && body.vagina > -1 && body.balls > 0 && body.scrotum > 0) {
					r.push(`${his} crotch is fully loaded.`);
				} else if (body.dick > 0 && body.vagina > -1) {
					r.push(`${he} has both a dick and pussy.`);
				} else if (body.dick > 0) {
					r.push(`${he} now has a cock`);
					if (body.balls > 0 && body.scrotum > 0) {
						r.push(`and balls`);
					}
					r.push(`to play with.`);
				} else if (body.vagina > -1) {
					r.push(`${he} now has a pussy to play with.`);
				} else {
					r.push(`${he} is still a null. ${He} expected something more.`);
				}
			}

			let cockChanged = 0;
			/* (penis changes)*/
			if (body.dick !== soul.dick && body.dick !== 0 && soul.dick !== 0) {
				r.push(`${His} penis is`);
				if (body.dick > soul.dick + 4) {
					r.push(`<span class="lime">way bigger</span>`);
				} else if (body.dick > soul.dick) {
					r.push(`<span class="lime">a good deal larger</span>`);
				} else {
					r.push(`<span class="orange">smaller</span>`);
				}
				r.push(`than it was, and ${he} is`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`not bothered one way or the other by this development; it isn't even clear if ${he} notices anything different about ${his} cock.`);
				} else if (body.devotion > 20) {
					if (body.dick > soul.dick + 4) {
						r.push(`<span class="hotpink">incredibly excited</span> about this change. ${He} laughs and groans at the weight of ${his} shaft, and as ${he} fiddles with it, it becomes increasingly obvious that ${he} is having difficulty not straight up jerking ${himself} off. ${He} regains control over ${himself}, though just barely.`);
						body.devotion += 3;
					} else if (body.dick > soul.dick) {
						r.push(`pleased with this development. ${He} takes the time to grope and tease ${his} newfound length.`);
					} else {
						r.push(`accepting of it. ${He} takes a moment to toy with ${his} now shorter dick.`);
					}
				} else {
					if (body.dick > soul.dick + 4) {
						r.push(`<span class="mediumaquamarine">incredibly aggravated</span> about this change. This is just one more thing ${he} has to deal with now. How dare you give ${him} such a massive, throbbing, sensitive piece of meat`);
						if (hasBothLegs(body)) {
							r.push(`between ${his} legs!`);
						} else {
							r.push(`on ${his} crotch!`);
						}
						r.push(`${His} glower loses its bite as you note ${him} pawing subconsciously at ${his} ridiculously enlarged organ. ${He} stops after ${he}`);
						if (canSee(body)) {
							r.push(`glances`);
						} else {
							r.push(`tilts ${his} head`);
						}
						r.push(`down at ${his} ${(hasBothArms(body)) ? `hands` : `hand`}, nervously removing`);
						if (hasBothArms(body)) {
							r.push(`them`);
						} else {
							r.push(`it`);
						}
						r.push(`from ${his} now massive prick.`);
						body.trust += 3;
					} else if (body.dick > soul.dick) {
						r.push(`annoyed at this development. ${He} frowns as ${he} tests ${his} newfound growth, only groping it for a moment before`);
						if (canSee(body)) {
							r.push(`noticing your amused grin`);
						} else {
							r.push(`sensing your gaze`);
						}
						r.push(`and stopping.`);
					} else {
						r.push(`<span class="mediumorchid">infuriated by it.</span> ${He}`);
						if (hasAnyArms(body)) {
							r.push(`pokes and prods at`);
						} else {
							r.push(`jostles`);
						}
						r.push(`${his} smaller dick, only stopping when ${he} starts to become flushed and`);
						if (canSee(body)) {
							r.push(`notices your questioning`);
						} else {
							r.push(`senses your`);
						}
						r.push(`gaze.`);
						body.devotion -= 5;
					}
				}
				cockChanged = 1;
			}
			if (body.piercing.dick.weight !== 0 && soul.piercing.dick.weight === 0) {
				r.push(`There was no missing the piercing in ${his} dick as well.`);
				cockChanged = 1;
			}

			/* (ball changes)*/
			if (body.balls !== soul.balls && body.scrotum !== 0 && soul.scrotum !== 0) {
				r.push(`Then ${he} takes a moment to cup ${his} balls, it seems they are`);
				if (body.balls > soul.balls + 4) {
					r.push(`<span class="lime">much larger</span> now. This`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`does not seem to register in ${his} mind.`);
					} else if (body.devotion > 20) {
						r.push(`amazing addition to ${his} body is <span class="hotpink">surely welcome.</span> ${He} moans as ${he} fondles ${his} new balls, groaning as ${he} rolls their weight around. ${His} face is flushed by the time ${he}'s done "examining" them.`);
						body.devotion += 5;
					} else {
						r.push(`addition to ${his} body is <span class="mediumaquamarine">annoying,</span> clearly. The frustrated irritation on ${his} face contrasts sharply with the actions of ${his} ${(hasBothArms(body)) ? `hands` : `hand`}, which`);
						if (hasBothArms(body)) {
							r.push(`are`);
						} else {
							r.push(`is`);
						}
						r.push(`busy causing`);
						if (body.dick) {
							r.push(`${his} dick to become engorged with blood.`);
						} else {
							r.push(`precum to start flowing freely.`);
						}
						r.push(`Catching ${himself}, ${he} takes a few soothing breaths to calm ${his} body down.`);
						body.trust += 5;
					}
				} else if (body.balls > soul.balls) {
					r.push(`<span class="lime">larger</span> now. This`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`change doesn't mean much of anything to ${him}.`);
					} else if (body.devotion > 20) {
						r.push(`change delights ${him} and ${he} spends ample time jostling and toying with ${his} bigger nuts.`);
					} else {
						r.push(`change is just one more <span class="hotpink">bother</span> for ${him}. ${His} brow furrows as ${he} takes a moment to feel them up and stops as`);
						if (body.dick) {
							r.push(`${his} cock starts to stiffen.`);
						} else {
							r.push(`as a bead of precum starts to form from ${his} urethra.`);
						}
						body.devotion += 3;
					}
				} else {
					r.push(`<span class="orange">smaller</span> now, and this`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`goes largely unnoticed.`);
					} else if (body.devotion > 20) {
						r.push(`change, while not necessarily fun, is appreciated by your devoted slave nonetheless.`);
					} else {
						r.push(`change causes ${him} consternation and humiliation.`);
					}
				}
				cockChanged = 1;
			}

			if (cockChanged === 1 && body.fetish !== Fetish.MINDBROKEN) {
				if (body.devotion > 20) {
					r.push(`${He} is thrilled at your modifications to ${his} genitals and is excited to explore those changes with you.`);
				} else {
					r.push(`${He} is <span class="mediumorchid">enraged</span> and <span class="gold">frightened</span> to see such changes to ${his} genitals, as they were fundamental parts of ${his} identity.`);
					body.devotion -= 10;
					body.trust -= 10;
				}
			}

			/* (vagina)*/
			if (body.vagina !== -1) {
				if (body.dick > 0) {
					r.push(`Then ${he} moves ${his} dick`);
					if (body.scrotum > 0) {
						r.push(`and balls`);
					}
					r.push(`aside to inspect ${his} vagina more closely.`);
				} else {
					r.push(`Next ${he} gives ${his} vagina a closer inspection.`);
				}
				if (body.vagina === 0) { /* (+virginity)*/
					r.push(`As ${he} prods at ${his} pussy, ${he} feels a slight tightness and a bit of difficulty as ${he} tries to press ${his} finger inside of ${himself}. ${He} realizes this body is a <span class="lime">virgin!</span>`);
					if (body.vagina > 0) {
						if (body.fetish === Fetish.MINDBROKEN) {
							r.push(`And this would likely mean something to ${him}, if ${his} mind was not lost.`);
						} else if (body.devotion > 20) {
							r.push(`${He} is happy to be a virgin again so that ${he} can lose it to you.`);
						} else {
							r.push(`${He} is <span class="hotpink">happy</span> to be a virgin again, but <span class="gold">worries</span> about how long it will last.`);
							body.devotion += 3;
							body.trust -= 3;
						}
					}
				} else if (soul.vagina !== -1 && body.vagina < soul.vagina) { /* (+tightness)*/
					r.push(`${He} notices ${he} is <span class="lime">tighter</span> now than ${he} was before.`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`And this might have been significant to ${him}, if ${his} brain worked correctly.`);
					} else if (body.devotion > 20) {
						r.push(`Sex will be more pleasurable than it was before and ${he} looks forward to breaking in ${his} new pussy with you.`);
					} else {
						r.push(`${He} groans in <span class="mediumorchid">frustration.</span> ${He} is well aware of the displeasure of having a pussy forcibly broken in and does not look forward to it again.`);
						body.devotion -= 2;
					}
				} else if (soul.vagina !== -1 && body.vagina > soul.vagina) { /* (-tightness)*/
					r.push(`${He} notices how ${he} is now <span class="orange">looser</span> than ${he} was before.`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`And this might be important to ${him}, if ${his} head was in working order.`);
					} else if (body.devotion > 20) {
						r.push(`${He} giggles a bit as ${he} tests out how many fingers ${he} can fit inside ${his} new loose hole, though ${he} wishes ${he} were still tight for you.`);
					} else {
						r.push(`${He} <span class="mediumorchid">frowns</span> as ${he} feels out how much looser ${he} is now. ${He} supposes it saves ${him} from getting fucked loose, but it is humiliating how many more fingers ${he} can fit inside ${himself} without even having to part ${his} lips.`); // TODO: This is not how vaginas work goddammit. - is that better?
						body.devotion -= 1;
					}
				} else if (body.vagina === soul.vagina) {
					r.push(`It's much like ${his} old vagina.`);
				} else {
					r.push(`After a bit of toying, ${he}'s satisfied with ${his} new organ.`);
				}
			}
			if (body.piercing.genitals.weight > 0 && soul.piercing.genitals.weight === 0 && body.dick === 0) {
				r.push(`${He} also briefly felt something metallic near ${his} clit. ${He} frowns for a moment, before reaching down to ${his} nether region to peel back ${his} folds to feel a new, hard spot that wasn't there before. As ${he} pulls at it, ${his} face and body contort in pleasure at the sensation.`);
			}
			if (body.piercing.vagina.weight !== 0 && soul.piercing.vagina.weight === 0) {
				r.push(`${He} also now has piercings in ${his} vagina, a ring around ${his} labia, creating`);
				if (canSee(body)) {
					r.push(`a halo of sparkles that ${he} couldn't help but marvel at.`);
				} else {
					r.push(`such a sensory overload during ${his} inspection that ${he} nearly lost control.`);
				}
			}

			/* (butt) + hips*/
			App.Events.addParagraph(el, r);
			r = [];
			if (body.hips > soul.hips) {
				r.push(`As ${he} moves to feel ${his} ass, ${he} smacks into an unfamiliar width; ${his} hips are <span class="lime">`);
				if (body.hips > soul.hips + 3) {
					r.push(`considerably`);
				} else if (body.hips < soul.hips - 1) {
					r.push(`much`);
				}
				r.push(`wider.</span>`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} pays them little mind and reaches around to learn how`);
				} else if (body.fetish === "pregnancy" && body.counter.birthsTotal > 0) {
					r.push(`${He} seems <span class="hotpink">overjoyed</span> at their new size; It means ${he}'ll be even better at popping out babies than ever. ${He} continues around back to learn how`);
				} else if (body.devotion > 20) {
					r.push(`${He} gives them a little wiggle for your amusement before continuing around back to learn how`);
				} else {
					r.push(`${He} takes the new addition well enough since it is likely to raise ${his} worth in society and thus not the worst thing ever. How you intend to make use of ${his} hips <span class="gold">worries ${him},</span> however. ${He} continues around back to learn how`);
					body.trust -= 1;
				}
			} else {
				r.push(`The last thing ${he} learns is how`);
			}
			if (body.butt > soul.butt) { /* (bigger)*/
				r.push(`much <span class="lime">bigger ${his} butt is now.</span> As ${he}`);
				if (canSee(body)) {
					r.push(`turns around, ${he} sees`);
				} else {
					r.push(`cups a cheek with each hand, ${he} finds`);
				}
				r.push(`it has grown`);
				if (body.butt >= soul.butt + 5) { /* (+to max size description or above)*/
					r.push(`an incredible amount.`);
				} else if (body.butt > soul.butt + 1) { /* (+more sizes)*/
					r.push(`a lot.`);
				} else { /* (+1 size)*/
					r.push(`a fair bit.`);
				}
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`As soon as ${his} ${(hasBothArms(body)) ? `hands leave` : `hand leaves`} its mass does ${he} forget it wasn't always this big.`);
				} else if (body.devotion > 20) {
					r.push(`This is a pleasing development as ${he} looks forward to putting this new rear to the test with you.`);
				} else {
					r.push(`While ${he}'s not terribly upset, this still feels like a violation of ${him}, somehow. Still, there are worse things that could happen than waking up with a bigger rear.`);
				}
				if ((body.butt >= (soul.butt + 5)) && (body.butt > 12)) {
					r.push(`${He} is overwhelmed by how large ${his} new bottom is. ${He} can barely stand under its weight.`);
				}
			} else if (body.butt < soul.butt) { /* (smaller)*/
				r.push(`much <span class="orange">smaller ${his} butt is now.</span> As ${he}`);
				if (canSee(body)) {
					r.push(`turns around ${he} sees`);
				} else {
					r.push(`cups a cheek with each hand ${he} finds`);
				}
				r.push(`it has shrunk`);
				if (body.butt <= soul.butt - 5) { /* (+to max size description or above)*/
					r.push(`an incredible amount.`);
				} else if (body.butt > soul.butt - 1) { /* (+more sizes)*/
					r.push(`a lot.`);
				} else { /* (-1 size)*/
					r.push(`a fair bit.`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} is saddened that there is now less of ${him} for you to play with, but remembers that you chose this body for ${him} and hopes that you will still make use of ${his} rear.`);
					} else {
						r.push(`This is just <span class="mediumorchid">depressing</span> to ${him}. A nice rear is one of the two parts of ${his} body that almost every woman (or "woman") is defined by, and now ${he} feels like just that much less of a person.`);
						body.devotion -= 1;
					}
				}
			} else {
				r.push(`little ${his} butt has changed in size.`);
			}
			if (body.buttImplant > 0 && soul.buttImplant === 0) { /* (+butt implants)*/
				r.push(`${He} also notes that <span class="coral">there are implants in ${him},</span> as ${his} prodding reveals a certain stiffness in ${his} ass's shape.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`It pleases ${him} that you would invest in such a minor way in ${his} body.`);
					} else {
						r.push(`It feels like you have modified ${him} in a such a minor way for your own benefit, and ${he} doesn't kid ${himself} in thinking otherwise.`);
					}
				}
			} else if (body.buttImplant === 0 && soul.buttImplant > 0) { /* (-butt implants)*/
				r.push(`${He} also notes that ${he} <span class="coral">no longer has ass implants,</span> as ${his} experimentation reveals a more natural bounce to ${his} buttocks.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} is happy that you think ${his} body doesn't need any artificial modification to be pleasing.`);
					} else {
						r.push(`${He} views this as one more thing ${he} <span class="mediumorchid">didn't have a choice in.</span>`);
						body.devotion -= 1;
					}
				}
			}
			if (body.hips < soul.hips) {
				r.push(`As ${he} finishes, it occurs to ${him} that ${his} hips are <span class="orange">`);
				if (body.hips < soul.hips - 3) {
					r.push(`considerably`);
				} else if (body.hips < soul.hips - 1) {
					r.push(`much`);
				}
				r.push(`narrower.</span>`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} pays it little mind.`);
				} else if (body.fetish === "pregnancy" && body.counter.birthsTotal > 0) {
					r.push(`${He} seems a little caught up on their new size, likely by concern over future pregnancies and childbirth.`);
				} else if (body.devotion > 50) {
					r.push(`${He} gives them a little wiggle for your amusement.`);
				} else if (body.devotion >= -20) {
					r.push(`${He} accepts your judgment that ${his} new hips suit ${him} better.`);
					if (body.pregKnown && body.counter.birthsTotal > 0) {
						r.push(`${He} <span class="gold">worries</span> about what this means for ${his} coming birth.`);
						body.trust -= 3;
					}
				} else {
					r.push(`${He} seems upset, <span class="mediumorchid">both from ${his} loss of femininity and the overreach of your power,</span> that you would alter ${his} body is such a way.`);
					if (body.pregKnown && body.counter.birthsTotal > 0) {
						r.push(`A <span class="gold">terrifying realization</span> dawns on ${him}; ${his} upcoming birth is going to be much harder than ${his} last.`);
						body.trust -= 5;
					}
					body.devotion -= 3;
				}
			}
			if (body.piercing.anus.weight !== 0 && soul.piercing.anus.weight === 0) {
				r.push(`As ${he} moves, ${he} feels something odd in ${his} butt. With a hesitant finger, ${he} traces ${his} anus and finds something that will take some getting used to; a new anal piercing.`);
			}

			/* tattoos */
			if (body.fetish !== Fetish.MINDBROKEN) {
				const tatLocations = [
					"boobsTat",
					"buttTat",
					"lipsTat",
					"vaginaTat",
					"anusTat",
					"dickTat",
					"shouldersTat",
					"armsTat",
					"legsTat",
					"backTat",
					"stampTat",
					"bellyTat"
				];
				if (tatLocations.some(t => body[t] !== soul[t]) || body.custom.tattoo !== soul.custom.tattoo) {
					App.Events.addParagraph(el, r);
					r = [];
					r.push(`The changes to ${his} tattoos were not lost on ${him}, but compared to everything else, they were truly insignificant.`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			if (body.fetish !== Fetish.MINDBROKEN) {
				let recognizesBody = false;
				if (body.origBodyOwnerID === body.ID) {
					r.push(`This is ${his} body alright.`);
					recognizesBody = true;
				} else if (body.ID === body.cloneID) {
					r.push(`This feels like ${his} body, in a sense.`);
					recognizesBody = true;
				}
				if (recognizesBody) {
					r.push(`Some things might have changed,`);
					if (body.devotion > 50) {
						r.push(`but ${he} enjoyed the time they spent apart.`);
					} else if (body.devotion >= -20) {
						r.push(`but <span class="mediumaquamarine">it's good to be home.</span>`);
						body.trust += 15;
					} else {
						r.push(`but <span class="mediumaquamarine">${he}'s where ${he} belongs.</span> Now to get it back the way <span class="mediumorchid">${he} likes it.</span>`);
						body.trust += 30;
						body.devotion -= 15;
					}
					if (body.ID === body.cloneID) {
						r.push(`Whether or not ${he}'ll figure out it is a clone of ${his} original body remains to be seen.`);
					}
				}
			}
		}
	} else if (canSee(body)) { /* (amputee) + sight */
		r.push(`After a while, ${he} begins to stir, ${his} eyes fluttering.`);
		if (body.fetish !== Fetish.MINDBROKEN) {
			if (sight === 2) {
				r.push(`${He} just stares at the ceiling for some time, completely overwhelmed <span class="green">that ${he} can now see.</span> ${He}'s <span class="hotpink">quite grateful</span> that <span class="mediumaquamarine">you would give ${him} such a gift.</span>`);
				body.devotion += 15;
				body.trust += 10;
			} else if (sight === -1) {
				r.push(`${He} just stares at the ceiling for some time, glaring at how <span class="red">${he} can just barely see it.</span> ${He} might be <span class="gold">annoyed</span> now, but it will soon hit ${him} that this was not what ${he} went under for.`);
				body.trust -= 5;
			} else if (sight === 1) {
				r.push(`${He} just stares at the ceiling for some time, <span class="green">just enjoying how clear it is.</span> ${He}'s <span class="hotpink">quite grateful</span> that <span class="mediumaquamarine">you would give ${his} perfect vision.</span>`);
				body.devotion += 5;
				body.trust += 3;
			}
		} else if (sight === 2) {
			r.push(`${He} just stares at the ceiling for some time, having difficulty processing that <span class="green">${he} can now see.</span> The gift of sight is lost upon ${him}, as is that ${he} is no longer in ${his} own body.`);
		}
		r.push(`${He} lets out a low groan and reaches up to rub at ${his} eyes. Or rather, ${he} attempts to. A visible look of confusion crosses ${his} face and ${he} strains to sit up, but all ${he} manages to do is wiggle, ${his} movements reminding you of a suffocating goldfish. As the cloud of anesthetics fades, ${he} realizes what's happened to ${him}`);
		if (body.fetish === Fetish.MINDBROKEN) {
			r.push(`and is supremely unaffected by it, as ${his} mind has already left ${him}.`);
			if (sight === 2) {
				r.push(`<span class="green">Since ${he} can now see,</span> ${he} spends a significant amount of time just taking in the world before turning upon ${himself}. Since ${he} has no reference of ${his} previous body left, ${he} might as well have always possessed this body.`);
				end = 1;
			}
		} else if (body.devotion > 20) {
			r.push(`and begins to panic, ${his} breaths quickening. With a visible look of concentration, ${his} breathing slows and ${he} tries to take stock of ${his} new body. ${He} quickly realizes`);
			if (isAmputee(soul)) { /* (was already an amputee) */
				r.push(`that at least nothing about ${his} limbs, or lack thereof, has changed.`);
			} else {
				r.push(`<span class="gold">you have taken ${his} arms and legs.</span>`);
				body.trust -= 15;
			}
		} else {
			if (isAmputee(soul)) { /* (was already an amputee) */
				r.push(`but ${he} realizes that at least nothing about ${his} limbs, or lack thereof, has changed.`);
			} else {
				r.push(`and ${his} eyes seem to bulge, the heart monitor begins to beep faster and more insistently. Eventually, your assistant is forced to inject ${him} with a sedative. ${His} eyes flutter closed and the heart monitors beeping slows to a steady pulse. Hopefully ${he}'ll be calmer when ${he} wakes up again, though the memory of waking without limbs will <span class="gold">stick with ${him}.</span>`);
				r.push(App.UI.DOM.makeElement("div", `...`));
				r.push(`When ${he} wakes up again, ${he} seems stable; the cold <span class="hotpink">acceptance</span> of ${his} fate clouds ${his} eyes.`);
				body.devotion += 5;
				body.trust -= 15;
			}
		}

		if (end !== 1) {
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`${He} cranes ${his} neck to look down on ${himself}`);

			if (body.skin !== soul.skin && body.fetish !== Fetish.MINDBROKEN) {
				r.push(`only to quickly recoil in shock when ${he} sees ${his} <span class="coral">newly ${body.skin} skin.</span>`);
				if (body.devotion > 50) {
					r.push(`${He} is fascinated by the change and what this means for ${him}.`);
				} else if (body.devotion > 20) {
					r.push(`The fact that you would alter something so defining about ${him} no longer surprises ${him}.`);
				} else if (body.devotion >= -20) {
					r.push(`The fact that you would alter something so defining about ${him} is <span class="hotpink">humbling.</span>`);
					body.devotion += 2;
				} else {
					r.push(`The fact that you would alter something so defining about ${him} is <span class="gold">terrifying.</span>`);
					body.trust -= 2;
				}
				r.push(`Once ${he} regains control, ${he} once again turns to ${his} ${body.skin} bust`);
			}

			/* (breast changes)*/
			if (body.boobsImplant > 0 && soul.boobsImplant > 0) { /* (breast implants)*/
				r.push(`and finds`);
				if (body.boobsImplant >= soul.boobsImplant + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive implants+breast fetish)*/
					r.push(`${he} <span class="lime">still has breast implants; implants easily bigger than ${his} entire body.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} silicone titans greatly excites ${him} to the point that ${he} can't hold back. ${He} wriggles under ${his} new chest boulders as an intense orgasm <span class="hotpink">courses through ${his} body.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help but become aroused under the weight of ${his} massive fake mounds. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eyeing ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`${he} <span class="lime">still has breast implants resting on ${his} chest. Even if they aren't clearly implants, ${he} can barely move under the weight of ${his} new breasts.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused under the weight of ${his} massive fake mounds. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eying ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobsImplant >= soul.boobsImplant + 20000) { /* (Extreme bigger implants)*/
					r.push(`<span class="lime">a pair of absolutely enormous fake tits looming over ${him}.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, though what lies within eludes ${his} mind.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">a pair of massive tits resting on ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} moves, ${he} recognizes the familiar weight of the implants at their cores.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} eyes ${his} mammaries eagerly, desperate to grope them. ${He} bites ${his} lip and gives you a pleading look that begs you to teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} shakes ${his} shoulders, marveling at their mass.`);
					} else {
						r.push(`<span class="lime">${his} chest is heavier than ever.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">${his} bust has shrunk.</span> ${He} is saddened by the loss of the beautiful weight ${he} once bore and struggles to keep ${himself} under control for your sake, and succeeds. <span class="mediumorchid">But only barely.</span>`);
					} else {
						r.push(`<span class="orange">that ${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and lets the tears finish running from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="orange">they are smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="orange">that ${his} chest is smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">that ${his} chest is not as large as it once was.</span> ${He} looks at you with <span class="mediumorchid">anger${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.` : `.</span>`}`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.devotion > 20 && body.fetish !== Fetish.MINDBROKEN) {
						r.push(`a familiar chest waiting for ${him}.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same.`);
						if ((body.physicalAge < soul.physicalAge - 5) && body.fetish !== Fetish.MINDBROKEN) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else if (body.boobsImplant > 0 && soul.boobsImplant === 0) {
				r.push(`and finds`);
				if (body.boobsImplant >= soul.boobsImplant + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive implants+breast fetish)*/
					r.push(`<span class="lime">a pair of massive implants towering over ${him}.</span>`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} silicone titans greatly excites ${him} to the point that ${he} can't hold back. ${He} wriggles under ${his} new chest boulders as an intense orgasm <span class="hotpink">courses through ${his} body.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused under the weight of ${his} massive fake mounds. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eying ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`<span class="lime">${he} has breast implants resting on ${his} chest, buried under the rest of ${his} bust.</span> Even if they aren't clearly implants, ${he} can barely move under the weight of ${his} new breasts.`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused under the weight of ${his} massive fake mounds. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eying ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobsImplant >= soul.boobsImplant + 20000) { /* (Extreme bigger implants)*/
					r.push(`<span class="lime">a pair of absolutely enormous fake tits looming over ${him}.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, yet not able to move as much.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">a pair of massive tits resting on ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} moves, ${he} recognizes a familiar firmness at their cores.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now, yet not able to move as much.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} eyes ${his} mammaries eagerly, desperate to grope them. ${He} bites ${his} lip and gives you a pleading look that begs you to teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} shakes ${his} shoulders, marveling at their firmness.`);
					} else {
						r.push(`<span class="lime">${his} chest is heavy with implants.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">${his} bust has shrunk.</span> ${He} is saddened by the loss of the beautiful weight ${he} once bore and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`<span class="orange">${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them closer, ${he} seems to understand that <span class="orange">they are smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="orange">${his} chest is smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">${his} chest is not as large as it once was.</span> ${He} looks at you with <span class="mediumorchid">anger${(!FutureSocieties.isActive('FSSlimnessEnthusiast')) ? `</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.` : `.</span>`}`);
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`the same chest ${he} had before, except maybe firmer than ${his} addled brain remembers.`);
					} else if (body.devotion > 20) {
						r.push(`a familiar chest waiting for ${him}. ${He} quickly realizes ${his} mistake once ${he} jiggles them.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same. ${He} quickly realizes ${his} mistake once ${he} jiggles them.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else if (body.boobsImplant === 0 && soul.boobsImplant > 0) {
				if (body.boobs <= 300 && body.fetish === "boobs" && body.fetishKnown) { /* flat+fetish*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="orange">not only ${his} implants gone, but ${his} breasts entirely.</span> ${He} is saddened by ${his} flat chest and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`and finds that <span class="orange">${his} implants are gone, along with the rest of ${his} breasts.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and stop the tears that are running from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= 300) { /* flat*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds that <span class="orange">${his} implants and breasts are completely gone.</span> This draws no reaction from ${him}.`);
					} else if (body.devotion > 20) {
						r.push(`and finds nothing. <span class="orange">Not only have ${his} implants been removed, but ${he}'s been left completely flat.</span> It is what it is.`);
					} else {
						r.push(`and finds nothing. <span class="orange">Not only have ${his} implants been removed, but ${he}'s been left completely flat.</span>`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`${He} knows much of society will view ${him} as a lesser person and a part of ${him} feels the same.`);
						}
						r.push(`This feels like a cruel manipulation of ${his} body and ${he} <span class="mediumorchid">hates you</span> a little more for it.`);
						body.devotion -= 2;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`<span class="lime">and finds nothing but breast.</span> As ${he} wiggles back and forth, ${he} can just make out that ${he} no longer has implants.`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused under the weight of ${his} massive fake mounds. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eying ${his} balloons proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`<span class="lime">and finds a pair of massive tits resting on ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} moves, ${he} can just make out that ${he} no longer has implants.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="lime">and finds ${his} tits are bigger than ever, yet implant free.</span> ${He} eyes ${his} mammaries eagerly, desperate to grope them. ${He} bites ${his} lip and gives you a pleading look that begs you to teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`<span class="lime">and finds that ${his} breasts have expanded in size, yet lack implants.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`<span class="lime">and finds ${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} shakes ${his} shoulders, marveling at the motion of silicone free flesh.`);
					} else {
						r.push(`<span class="lime">and finds ${his} chest is heavier than ever, and not because of silicone.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">and finds ${his} bust has shrunk.</span> ${He} is saddened by the loss of ${his} implants and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`<span class="orange">and finds that ${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} natural breasts begin to quiver${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.devotion > 20) {
						r.push(`<span class="orange">and finds that ${his} implants have been removed.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`<span class="orange">and finds that ${his} chest is not as large as it once was.</span> ${He} looks at you with`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`<span class="mediumorchid">anger</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.`);
						} else {
							r.push(`<span class="mediumorchid">anger.</span>`);
						}
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds nothing off about ${his} chest.`);
					} else if (body.devotion > 20) {
						r.push(`and finds a familiar chest waiting for ${him}, albeit <span class="coral">implant free.</span>`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`and finds that ${his} breasts are roughly the same, save for their <span class="coral">missing implants.</span>`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			} else {
				if (body.boobs <= 300 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* flat+fetish*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="orange">no tits at all.</span> ${He} is saddened by ${his} flat chest and struggles to keep ${himself} under control for your sake, and succeeds. <span class="mediumorchid">Barely.</span>`);
					} else {
						r.push(`and finds <span class="orange">no tits at all.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= 300 && soul.boobs > 300) { /* flat*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and <span class="orange">finds nothing.</span> ${He} doesn't seem to care, though.`);
					} else if (body.devotion > 20) {
						r.push(`and finds nothing; <span class="orange">${his} breasts are completely gone.</span> At least it's a literal weight off ${his} chest.`);
					} else {
						r.push(`and finds nothing; <span class="orange">${his} breasts are completely gone.</span>`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`${He} knows much of society will view ${him} as a lesser person and a part of ${him} feels the same.`);
						}
						r.push(`This feels like a cruel manipulation of ${his} body and ${he} <span class="mediumorchid">hates you</span> a little more for it.`);
						body.devotion -= 2;
					}
				} else if (body.boobs >= soul.boobs + 20000 && body.fetish === "boobs" && body.fetishKnown) { /* (Massive+breast fetish)*/
					r.push(`and finds <span class="lime">nothing but breast.</span> As ${he} wiggles back and forth beneath their mass, ${he} can make out that they are all natural.`);
					if (body.devotion >= -20) {
						r.push(`The sheer size of ${his} titanic tits greatly excites ${him} to the point that ${he} can't hold back. ${He} shudders against ${his} new chest pillows as an intense orgasm <span class="hotpink">rewards ${him} for enjoying your gift.</span>`);
						body.devotion += 5;
					} else {
						r.push(`${He} tries desperately to control ${his} mounting excitement, reminding ${himself} that these breasts were not given to ${him} for ${his} own enjoyment. However, ${he} can't help become aroused under the weight of ${his} massive mammaries. ${He} finally stops squirming when ${he} sees your wolfish grin. Deep down, <span class="hotpink">${he}'s thankful,</span> and the way ${he}'s lovingly eying ${his} chest pillows proves it.`);
						body.devotion += 5;
					}
				} else if (body.boobs >= soul.boobs + 20000) { /* (Extreme bigger breasts)*/
					r.push(`and finds a <span class="lime">pair of massive tits resting on ${his} chest.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`As ${he} moves, ${he} can clearly tell they are completely natural.`);
					}
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`As ${he} examines ${his} breasts, ${he} seems to understand that they are much bigger now.`);
					} else if (body.devotion > 20) {
						r.push(`This new size excites ${him} and ${he} looks forward to experimenting with them.`);
					} else {
						r.push(`This new size is a <span class="gold">massive inconvenience</span> for ${him} and it <span class="mediumorchid">infuriates ${him}</span> that you would do such a thing to ${him}.`);
						body.devotion -= 5;
						body.trust -= 5;
					}
				} else if (body.boobs > soul.boobs + 100 && body.fetish === "boobs" && body.fetishKnown) { /* (Bigger+breast fetish)*/
					if (body.devotion > 20) {
						r.push(`and finds <span class="lime">${his} tits are bigger than ever.</span> ${He} eyes ${his} mammaries eagerly, desperate to grope them. ${He} bites ${his} lip and gives you a pleading look that begs you to teases ${his} nipples. From the look on ${his} face, you know ${he}'ll want to put them to the test.`);
					} else {
						r.push(`and finds <span class="lime">${his} breasts have expanded in size.</span> ${He} wrestles with the fact that you have clearly not done this for ${his} benefit, <span class="hotpink">but decides this is definitely better than the alternative.</span>`);
						body.devotion += 5;
					}
				} else if (body.boobs > soul.boobs + 100) { /* (Bigger breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`and finds breasts. As ${he} examines them, ${he} seems to understand that <span class="lime">they are bigger now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`and finds <span class="lime">${his} bust has grown.</span> ${He} is caught off guard at the size of ${his} new chest. ${He} shakes ${his} shoulders, marveling at the motion of ${his} soft flesh.`);
					} else {
						r.push(`and finds that <span class="lime">${his} chest is heavier than ever.</span> However, ${he} is well aware however that these breasts are not for ${his} benefit or pleasure. ${He} views this as a <span class="mediumorchid">cruel manipulation of ${his} body</span> on top of what has already been done to ${him}.`);
						body.devotion -= 5;
					}
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300 && body.fetish === "boobs" && body.fetishKnown) { /* (Smaller breasts + breast fetish)*/
					if (body.devotion > 20) {
						r.push(`and finds that <span class="orange">${his} bust has shrunk.</span> ${He} is saddened by ${his} smaller chest and struggles to keep ${himself} under control for your sake, <span class="mediumorchid">barely.</span>`);
					} else {
						r.push(`and finds that <span class="orange">${his} chest is not as large as it once was.</span> <span class="mediumorchid">Tears leap into ${his} eyes</span> as ${his} shoulders begin to shake${(body.voice !== 0) ? ` and sobs echo about the room` : ``}. ${He} pauses to gather ${himself} together and let the tears run from ${his} eyes before continuing ${his} bodily inspection.`);
					}
					body.devotion -= 5;
				} else if (body.boobs <= soul.boobs - 100 && soul.boobs > 300) { /* (Smaller breasts)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`breasts. As ${he} examines them, ${he} seems to understand <span class="orange">that they smaller now.</span>`);
					} else if (body.devotion > 20) {
						r.push(`that <span class="orange">${his} breasts are smaller.</span> ${He} shrugs this off, as ${his} devotion to you overrides any anguish this might cause.`);
					} else {
						r.push(`that <span class="orange">${his} chest is not as large as it once was.</span> ${He} looks at you with`);
						if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`<span class="mediumorchid">anger</span> as this is not only a cruel manipulation of ${his} body, but ${he} is now less of a woman in the eyes of a vast majority of society.`);
						} else {
							r.push(`<span class="mediumorchid">anger.</span>`);
						}
						body.devotion -= 2;
					}
				} else { /* (No change (less than a 100 cc's of change)*/
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`nothing out of the ordinary.`);
					} else if (body.devotion > 20) {
						r.push(`a familiar chest waiting for ${him}.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`${He} is pleased to see ${his} breasts are now more pert and smooth than they were before.`);
						}
					} else {
						r.push(`that ${his} breasts are roughly the same.`);
						if (body.physicalAge < soul.physicalAge - 5) { /* (younger)*/
							r.push(`Except, of course, that they are younger and more pert, something that ${he} <span class="hotpink">can't help but appreciate.</span>`);
							body.devotion += 2;
						}
					}
				}
			}
			if (body.piercing.areola.weight !== 0 && soul.piercing.areola.weight === 0) {
				if (body.fetish !== Fetish.MINDBROKEN && body.boobs >= 10000) {
					r.push(`${He} can just barely catch the glimmer of the piercings adorning ${his} areolae.`);
				} else if (body.fetish === Fetish.MINDBROKEN && body.boobs >= 10000) {
					/* out of sight, out of mind */
				} else if (body.boobs >= 1000) {
					r.push(`${He} gawks at the piercings adorning ${his} areolae for a spell.`);
				} else {
					r.push(`${He} can't take ${his} eyes off the piercings now adorning ${his} areolae.`);
				}
			}

			/* (if lactation status has changed)*/
			if (body.lactation > 0 && soul.lactation === 0) { /* (lactating now, wasn't before)*/
				r.push(`As ${he} wiggles ${his} breasts,`);
				if (body.lactation === 1) {
					r.push(`<span class="coral">solitary drops of milk begin to drop from ${his} nipples.</span>`);
				} else {
					r.push(`<span class="coral">steady streams of milk start to flow from ${his} nipples.</span>`);
				}
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`${He} shudders at the wet feeling.`);
				} else if (body.devotion > 20) {
					r.push(`${He} is delighted by the fact that ${his} breasts now produce milk. This is a gift ${he} will happily use for your benefit.`);
				} else {
					r.push(`${He} is irritated that you have altered ${his} body to produce milk.`);
				}
			} else if (body.fetish === Fetish.MINDBROKEN) {
				// TODO: write me
			} else if (body.lactation > 1 && soul.lactation === 1) {
				r.push(`${He} realizes ${his} breasts are <span class="lime">rapidly producing milk.</span> ${He} groans at the unfamiliar pressure.`);
			} else if (body.lactation === 1 && soul.lactation === 2) {
				r.push(`${He} realizes that ${his} breasts are <span class="orange">producing less milk.</span> ${He} seems a little relieved.`);
			} else if (body.lactation === 0 && soul.lactation > 0) {
				r.push(`${He} realizes that ${his} breasts <span class="orange">no longer produce milk.</span> ${He} doesn't show much reaction to this change.`);
			} else if (body.lactation > 0 && soul.lactation > 0) {
				r.push(`The familiar feeling of fullness in ${his} breasts tells ${him} ${he}'s producing as much milk as ever.`);
			}
			if (body.boobsMilk > 0) {
				r.push(`${He} groans as ${he} discovers just how badly ${he} needs to be milked.`);
			}

			if (body.nipples !== soul.nipples && body.fetish !== Fetish.MINDBROKEN) { /* (if nipples have changed shape)*/
				r.push(`Once ${he} is satisfied with ${his} tits, ${he} shifts ${himself} to get a better view of ${his} nipples, having noticed that they don't look quite the same as before.`);
				switch (body.nipples) {
					case "fuckable":
						r.push(`${He} doesn't seem to understand where they have gone.`);
						break;
					case "tiny":
						r.push(`${He}'s a little depressed by <span class="orange">how tiny they've become.</span>`);
						break;
					case "flat":
						r.push(`${He}'s a little depressed to find <span class="orange">the implants have pulled them flat.</span>`);
						break;
					case "puffy":
						r.push(`${He} giggles a little at the sight of how <span class="lime">puffy they are.</span>`);
						break;
					case "huge":
						r.push(`${He} gasps at the sight of the <span class="lime">two towering protrusions</span> jutting out from ${his} breasts.`);
						break;
					case "partially inverted":
						r.push(`Due to the nature of ${his} <span class="lime">partially inverted nipples,</span> ${he} can't get a good look at them.`);
						break;
					case "inverted":
						r.push(`Due to the nature of ${his} <span class="lime">inverted nipples,</span> ${he} can't get a good look at them.`);
						break;
					default:
						r.push(`They can only be called normal, though ${he} can still call them cute.`);
				}
				if (body.piercing.nipple.weight !== 0 && soul.piercing.nipple.weight === 0) {
					r.push(`${He} also notices they are pierced, judging by how ${his} eyes follow the movement of the piercings.`);
				}
			}

			/* (if breasts have changed shape)*/
			if (body.boobShape !== soul.boobShape && body.boobs > 300 && body.fetish !== Fetish.MINDBROKEN) {
				r.push(`As ${he} settles back down, ${he} discovers they no longer rest the same either;`);
				if (body.boobShape === "saggy") { /* (drooping or older)*/
					r.push(`<span class="red">they now sag to ${his} sides,</span> disappointing ${him}.`);
				} else if (body.boobShape === "downward-facing") {
					r.push(`<span class="red">they now face downwards,</span> disappointing ${him}.`);
				} else if (body.boobShape === "wide-set") {
					r.push(`<span class="green">they settle heavily to either side of ${his} body.</span>`);
				} else if (body.boobShape === "perky") {
					r.push(`<span class="green">they stick out from ${his} chest.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} jostles them playfully.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else if (body.boobShape === "spherical") {
					r.push(`<span class="green">they are round and heavy.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} squirms, but they don't really move much at all.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else if (body.boobShape === "torpedo-shaped") {
					r.push(`<span class="green">they stick out far from ${his} chest.</span>`);
					if (body.devotion > 20) {
						r.push(`${He} squirms to make them sway about.`);
					} else {
						r.push(`${He} is intrigued by this development.`);
					}
				} else {
					r.push(`<span class="green">they can only be called normal.</span>`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			if (body.fetish === Fetish.MINDBROKEN) {
				// TODO: write me
			} else if (soul.voice === 0) {
				r.push(`After a moment, ${he} turns to you and gestures for a mirror.`);
				if (body.voice !== 0) {
					r.push(`You gesture as if you couldn't hear ${him}, to which ${he} squeaks in response. It immediately <span class="hotpink">dawns on ${him}</span> what this means. ${He} <span class="mediumaquamarine">thanks you profusely</span> before asking for a mirror.`);
					body.devotion += 5;
					body.trust += 10;
				}
			} else {
				r.push(`After a moment, ${he} turns to speak to you,`);
				if (body.voice === 0) {
					r.push(`but can't. ${He} tries again, frowning. ${He} struggles to make any sound at all as tears well in ${his} eyes, but no sobs can be heard as ${his} shoulder stubs begin to <span class="gold">shake.</span> After a bit, wiggles <span class="mediumorchid">somberly</span> for a mirror.`);
					body.devotion -= 5;
					body.trust -= 5;
				} else if (body.voice !== soul.voice) {
					r.push(`and starts at ${his} new`);
					if (body.voice > soul.voice) {
						r.push(`higher pitched`);
					} else if (body.voice < soul.voice) {
						r.push(`lower pitched`);
					} else {
						r.push(`voice,`);
					}
					r.push(`but then murmurs "...mirror..."`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			r.push(`You depress a button and a long, body length mirror slides up from the floor near the wall. Your slave, with the help of an assistant, sits up against the side of the gurney and sees ${his} entire body for the first time.`);
			App.Events.addParagraph(el, r);
			r = [];

			r.push(`${His} eyes lock onto ${his} face.`);

			if (body.fetish !== Fetish.MINDBROKEN) {
				if (body.race !== soul.race) { /* (race changes)*/
					r.push(`It immediately strikes ${him} that ${he} is <span class="coral">no longer ${soul.race}.</span> ${His} new ${body.race} body`);
					if (body.devotion > 50) {
						r.push(`intrigues and delights ${him}. ${He} is happy that you invested in ${his} appearance in such an interesting way.`);
					} else if (body.devotion > 20) {
						r.push(`<span class="mediumorchid">disturbs ${him}.</span> ${He} is <span class="gold">shaken</span> by such a drastic change.`);
						body.devotion -= 10;
						body.trust -= 10;
					} else {
						r.push(`<span class="mediumorchid">disgusts and angers ${him}.</span> One of the only parts of ${his} identity ${he} had left has now been stripped from ${him}.`);
						body.devotion -= 20;
					}
				} else if (body.devotion <= 50) {
					r.push(`It immediately strikes ${him} that ${he} is still ${body.race}. ${He}'s <span class="hotpink">relieved</span> that you didn't take such a deep part of ${his} identity from ${him}.`);
					body.devotion += 1;
				}
			}

			if (body.bald === 1 && soul.bald === 0) { /* (+baldness)*/
				r.push(`Something about ${his} head catches ${his} eye; <span class="red">${he} is now bald.</span> This`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`catches ${his} attention, and ${he} spends some time shaking ${his} head to feel the air on ${his} scalp.`);
				} else if (body.devotion > 20) {
					r.push(`feels fun and interesting.`);
				} else {
					r.push(`feels like a gross imposition and ${he} <span class="mediumorchid">scowls at you accusingly,</span> for this is one less thing that marks ${him} as a person that you have taken from ${him}.`);
					body.devotion -= 3;
				}
			} else if (body.bald === 0 && soul.bald === 1) { /* (-baldness)*/
				r.push(`Something about ${his} head catches ${his} eye; <span class="green">${he} now has hair.</span> This`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`catches ${his} attention, and ${he} spends some time shaking ${his} head to feel to make ${his} hair move.`);
				} else if (body.devotion >= -20) {
					r.push(`makes ${him} <span class="hotpink">squeal with delight.</span> ${He} plays with ${his} new hair, enjoying how it feels as ${he} moves ${his} head.`);
					body.devotion += 3;
				} else {
					r.push(`surprises ${him}. ${He} is not happy with your doing something like this while ${he} had no control of it, but under the circumstances there are far worse things to have than hair.`);
				}
			} else if (body.bald === 1 && soul.bald === 1) {
				r.push(`Something about ${his} head catches ${his} eye, but it turned out to be nothing. ${He} is as bald as ever.`);
			} else {
				r.push(`Something about ${his} head catches ${his}`);
				if (body.hColor !== soul.hColor) {
					r.push(`eye; ${he} <span class="coral">now has ${body.hColor} hair.</span>`);
				} else {
					r.push(`eye, but it was a trick of the light; ${his} hair is more or less the same.`);
				}
			}

			if (body.sexualFlaw === "cum addict" && body.lips > soul.lips + 10) { /* (bigger lip+oral fixation) */
				r.push(`${He} slowly puckers ${his} <span class="lime">plush pillows.</span> A blush blossoms over ${his} face and the beeping of ${his} heart monitor speeds up slightly. You know that ${he}'ll put them to good use.`);
				if (body.devotion <= 20) {
					r.push(`${He} pauses, and begins to <span class="hotpink">hesitantly smile</span> as ${he} runs ${his} tongue across ${his} lovely new lips.`);
				}
			} else if (body.lips > soul.lips + 10) {
				r.push(`${His} eyes lock on ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`as if`);
				}
				r.push(`noticing that <span class="lime">they are larger now</span> than they once were.`);
			} else if (body.sexualFlaw === "cum addict" && body.lips < soul.lips - 10) { /* (smaller lip+oral fixation) */
				if (body.devotion > 20) {
					r.push(`${His} eyes lock on ${his} lips and ${he} recoils. A second later, ${he} runs ${his} tongue across them to confirm ${his} fear. ${His} pride and joy are <span class="orange">gone.</span> ${He} lets out a sniffle and <span class="mediumorchid">tears begin to roll down ${his} cheeks.</span>`);
					body.devotion -= 10;
				} else {
					r.push(`${His} eyes lock on ${his} lips before ${he} turns ${his} head from the mirror and`);
					if (body.voice === 0) {
						r.push(`attempted`);
					}
					r.push(`sobs well up from ${him}. For someone who values ${his} lips like ${him}, for them <span class="orange">to be gone</span> is a truly <span class="mediumorchid">terrible fate.</span>`);
					body.devotion -= 20;
				}
			} else if (body.lips < soul.lips - 10) {
				r.push(`${His} eyes lock on ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`as if`);
				}
				r.push(`noticing that <span class="orange">they are smaller</span> now than they once were.`);
			} else {
				r.push(`${His} eyes lock on ${his} lips and ${he} pauses for a moment,`);
				if (body.fetish === Fetish.MINDBROKEN) {
					r.push(`having found nothing different about them.`);
				} else {
					r.push(`finding them familiar enough.`);
				}
			}
			if (body.piercing.lips.weight !== 0 && soul.piercing.lips.weight === 0) {
				r.push(`${He} touches the tip of ${his} tongue to ${his} new piercing.`);
			}
			if (body.teeth === "removable" && soul.teeth !== "removable") { /* no teeth */
				r.push(`A look of confusion crosses ${his} face, ${his} brow furrowing slightly. You see ${him} work ${his} jaw for moment before ${he} turns ${his} head and spits out a set of dentures.`);
				if (body.devotion < -20 && body.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} <span class="mediumorchid">glowers</span> at them, knowing full well they'll be back in ${his} mouth shortly.`);
					body.devotion -= 2;
				}
			} else if (body.teeth !== "removable" && body.piercing.tongue.weight > 0 && soul.piercing.tongue.weight === 0) { /* (if tongue pierced+has teeth) */
				r.push(`You can vaguely hear ${him} rattling ${his} tongue piercing against ${his} teeth as ${he} takes in ${his} appearance.`);
			}
			if (
				(body.tastes !== 0 && soul.tastes === 0) ||
				(body.tastes === 0 && soul.tastes !== 0)
			) {
				r.push(`${He} can't sense the changes to ${his} taste buds, so ${he}'s likely to be`);
				if (body.tastes === 0) {
					r.push(`shocked by ${his} new disability`);
				} else if (soul.tastes === 0) {
					r.push(`pleasantly surprised at ${his} expanded senses`);
				}
				r.push(`come ${his} next mealtime.`);
			}
			if (
				(body.smells !== 0 && soul.smells === 0) ||
				(body.smells === 0 && soul.smells !== 0)
			) {
				r.push(`${He} won't realize it until some time after ${he} leaves the excessively sanitized operating room, but ${he}'s likely to`);
				if (body.smells === 0) {
					r.push(`find the loss of ${his} sense of smell very distressing`);
				} else if (soul.smells === 0) {
					r.push(`appreciate the restoration of ${his} sense of smell`);
				}
				r.push(`when ${he} does.`);
			}
			if (body.physicalAge < 40 && soul.physicalAge > 50 && body.fetish !== Fetish.MINDBROKEN) {
				if (body.devotion > 20) {
					r.push(`${He} notices the <span class="green">lack of wrinkles</span> on ${his} face and <span class="hotpink">smiles broadly.</span>`);
					body.devotion += 2;
				} else {
					r.push(`${He} notices the <span class="green">lack of wrinkles</span> on ${his} face and cringes at what this means for ${his} future.`);
				}
			}
			if (
				(body.piercing.ear.weight !== 0 && soul.piercing.ear.weight === 0) ||
				(body.piercing.eyebrow.weight !== 0 && soul.piercing.eyebrow.weight === 0) ||
				(body.piercing.nose.weight !== 0 && soul.piercing.nose.weight === 0)
			) {
				r.push(`On top of that, several new piercings glint upon ${his} face.`);
			}

			App.Events.addParagraph(el, r);
			r = [];
			r.push(`${His} eyes slip down to focus on ${his} body.`);

			/* (age)*/
			if (body.physicalAge >= soul.physicalAge + 5 || (body.physicalAge > 18 && soul.physicalAge < 16)) { /* (older)*/
				if (body.physicalAge > 18 && soul.physicalAge < 16) {
					r.push(`${He} starts at just how much <span class="red">older ${his}`);
					if (canSee(body)) {
						r.push(`face and body are.</span>`);
					} else {
						r.push(`body is.</span>`);
					}
					if (body.physicalAge > 100) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s knocking on death's door.`);
					} else if (body.physicalAge > 80) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s ancient.`);
					} else if (body.physicalAge > 30) {
						r.push(`${He}'s shocked to find that ${he}'s practically a MILF.`);
					} else if (body.physicalAge >= 18) {
						r.push(`${He}'s shocked to find ${he}'s now a fresh adult.`);
					}
					if (body.fetish !== Fetish.MINDBROKEN) {
						r.push(`This is disturbing to ${him} on a fundamental level,`);
						if (body.devotion > 50) {
							r.push(`as that means ${he} will now will have less time with you before the end of ${his}`);
							if (V.policies.retirement.physicalAgePolicy === 1) {
								r.push(`service and`);
							}
							r.push(`life. ${He} does ${his} best to shrug this off and tries to think of all the fun things a lewd older body can do.`);
						} else {
							r.push(`as that means ${he} will be <span class="mediumorchid">unable to spend as much time on this earth.</span>`);
							body.devotion -= (body.physicalAge - soul.physicalAge) * 2;
							if (V.policies.retirement.physicalAgePolicy === 1) {
								r.push(`On the other hand, it means ${he} won't have as much time to spend with you before ${he} is retired.`);
							} else {
								r.push(`This is compounded with the fact that ${he} <span class="gold">may well die before ${he} becomes a freed slave.</span>`);
								body.trust -= (body.physicalAge - soul.physicalAge) * 2;
							}
						}
						if (
							(body.ovaries === 1 || body.mpreg === 1) &&
							body.pubertyXX === 1 &&
							soul.pubertyXX === 0 &&
							isFertile(body)
						) {
							r.push(`${He} fidgets uncomfortably as the urge to breed crosses ${his} mind.`);
						}
						if (body.balls > 0 && body.pubertyXY === 1 && soul.pubertyXY === 0) {
							r.push(`${He} shudders with pleasure at the thought of cumming in a fertile pussy. ${He} realizes this body has gone through puberty.`);
						}
					}
				} else if (body.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} starts as ${he}`);
					if (canSee(body)) {
						r.push(`sees`);
					} else {
						r.push(`discovers`);
					}
					r.push(`that ${he} is <span class="red">now older than ${he} once was.</span> This is disturbing to ${him} on a fundamental level,`);
					if (body.devotion > 50) {
						r.push(`as that means ${he} will now will have less time with you before the end of ${his}`);
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`service and`);
						}
						r.push(`life. ${He} does ${his} best to shrug this off and tries to think of all the fun things a lewd older body can do.`);
					} else {
						r.push(`as that means ${he} will be <span class="mediumorchid">unable to spend as much time on this earth.</span>`);
						body.devotion -= (body.physicalAge - soul.physicalAge) * 2;
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`On the other hand, it means ${he} won't have as much time to spend with you before ${he} is retired.`);
						} else {
							r.push(`This is compounded with the fact that ${he} <span class="gold">may well die before ${he} becomes a freed slave.</span>`);
							body.trust -= (body.physicalAge - soul.physicalAge) * 2;
						}
					}
				}
			} else if (body.physicalAge <= soul.physicalAge - 5 || (body.physicalAge < 18 && body.physicalAge < soul.physicalAge)) { /* (younger)*/
				r.push(`${He} starts at ${his} <span class="green">youthful new`);
				if (canSee(body)) {
					r.push(`face and`);
				}
				r.push(`body.</span>`);
				if (soul.physicalAge >= 18) {
					if (body.physicalAge < 4) {
						r.push(`${He}'s thoroughly shocked to find ${he}'s a toddler again.`);
					} else if (body.physicalAge < 9) {
						r.push(`${He}'s surprised to find ${he}'s a little ${girl}.`);
					} else if (body.physicalAge < 13) {
						r.push(`${He}'s surprised to find that ${he}'s once more a preteen.`);
					} else if (body.physicalAge < 16) {
						r.push(`${He} never expected to be a teenager again.`);
					} else if (body.physicalAge < 18) {
						r.push(`${He} never expected to be a young adult again.`);
					}
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					let puberty = 0;
					if (
						(
							(body.physicalAge < body.pubertyAgeXX &&
								(body.ovaries === 1 || body.mpreg === 1)
							) ||
							(body.physicalAge < body.pubertyAgeXY && body.balls > 0)
						) &&
						(soul.pubertyXX === 1 || soul.pubertyXY === 1)
					) {
						r.push(`${He} realizes that ${he} will have to <span class="coral">go through puberty again,</span> now that ${he} is ${body.physicalAge} once more. This is unnerving to ${him}.`);
						puberty = 1;
					}
					if (body.devotion > 20) {
						if (puberty === 1) {
							r.push(`However, ${he} will do ${his} best to enjoy the highs that come with it, and`);
						} else {
							r.push(`This is a <span class="hotpink">wonderful gift to ${him},</span> as ${he} will now be able to`);
							body.devotion += Math.max(soul.physicalAge - body.physicalAge, 10);
						}
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`spend more time with you before the end of ${his} service.`);
						} else {
							r.push(`service you better, as well as have all the other benefits of youthful age.`);
						}
					} else {
						if (puberty === 1) {
							r.push(`It will be frustrating to go through the rigors of sexual development all over again, especially when combined with the fact that ${he} must also`);
						} else {
							r.push(`This is both a <span class="hotpink">blessing</span> and a <span class="gold">curse,</span> as while ${he} now has a younger and healthier body, ${he} must also`);
							body.devotion += Math.min(soul.physicalAge - body.physicalAge, 10);
							body.trust -= 5;
						}
						if (V.policies.retirement.physicalAgePolicy === 1) {
							r.push(`spend more time with you before the end of ${his} service.`);
						} else {
							r.push(`use all of ${his} youth for the benefit of ${his} master instead of ${himself}.`);
						}
					}
				}
			}

			/* weight*/
			if (body.weight >= soul.weight + 5 || body.weight <= soul.weight - 5) {
				r.push(`The very next thing ${he} finds is how much`);
				if (body.weight >= soul.weight + 5) {
					r.push(`<span class="red">heavier ${he} is.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`With ${his} broken mind, ${he} shows no real reaction to this new weight.`);
					} else if (body.devotion > 50) {
						if (body.behavioralFlaw === "gluttonous") {
							r.push(`${He} is <span class="hotpink">perfectly fine</span> with this; a bigger body means more food for ${his} belly and more for you to love.`);
							body.devotion += 1;
						} else if (body.behavioralFlaw === "anorexic") {
							r.push(`${He} wiggles and groans a little as ${his} body keeps going. ${He} knows if you wanted ${him} heavier, you could have just force-fed ${him} to this size, so ${he} keeps further opinions to ${himself}.`);
						} else if (body.behavioralQuirk === "insecure") {
							r.push(`${He} is <span class="hotpink">perfectly fine</span> with this; if you want ${him} to be softer, then <span class="mediumaquamarine">that is what ${he} wants too.</span>`);
							body.devotion += 1;
							body.trust += 1;
						} else if (body.behavioralQuirk === "fitness") {
							r.push(`${He} would prefer to be fitter, but without arms and legs, ${he} gets little say in the matter.`);
						} else {
							r.push(`${He} is happy that you have given ${him} more weight for you to play`);
							if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
								r.push(`with, but is somewhat confused that you would do so against the society you created.`);
							} else {
								r.push(`with.`);
							}
						}
					} else {
						if (body.behavioralFlaw === "gluttonous") {
							r.push(`${He} is <span class="hotpink">surprisingly fine</span> with this; a bigger body means more food for ${his} belly, after all.`);
							if (body.weight > 30) {
								r.push(`Though ${he} would have preferred to not be this fat.`);
							}
							body.devotion += 1;
						} else if (body.behavioralFlaw === "anorexic") {
							r.push(`${He} wiggles and <span class="mediumorchid">groans with disgust</span> as ${his} body keeps going. ${He} shudders at the thought of <span class="gold">what you'll do next.</span>`);
							body.devotion -= 3;
							body.trust -= 3;
						} else if (body.behavioralQuirk === "insecure") {
							r.push(`${He} is surprisingly fine with this; you know best, after all.`);
						} else if (body.behavioralQuirk === "fitness" && body.weight > 30) {
							r.push(`${He} is <span class="mediumorchid">irritated and frustrated</span> at this new weight. ${He} should be fit not fat!`);
							body.devotion -= 10;
						} else {
							r.push(`${He} is <span class="mediumorchid">irritated and frustrated</span> at this new`);
							body.devotion -= 5;
							if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
								r.push(`weight, <span class="mediumorchid">doubly so</span> because your society will view ${him} as less of a person now.`);
								body.devotion -= 5;
							} else if (FutureSocieties.isActive('FSHedonisticDecadence')) {
								r.push(`weight, however ${he} is at least <span class="hotpink">somewhat mollified</span> with the knowledge that society will treat ${him} a with a bit more reverence now.`);
								body.devotion += 3;
							} else {
								r.push(`weight.`);
							}
						}
					}
				} else {
					r.push(`<span class="green">lighter ${he} is.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) { /* mindbroken*/
						r.push(`${He} doesn't show much reaction to ${his} lost weight.`);
					} else if (body.devotion > 50) { /* devoted*/
						r.push(`${He} is pleased that you have given ${him} a more slender and svelte`);
						if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`body and is even happier that ${his} body is more in line with your society.`);
						} else {
							r.push(`body.`);
						}
					} else { /* not devoted*/
						r.push(`${He} is a bit miffed that you would modify ${his} body in such a way, knowing it has nothing to do with making ${him} happy`);
						if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
							r.push(`happy, but feels a bit better knowing that society will now view ${him} in a better light.`);
						} else {
							r.push(`happy.`);
						}
					}
				}
			}

			/* muscle*/
			if (body.muscles >= soul.muscles + 5 || body.muscles <= soul.muscles - 5) {
				r.push(`The last major change to ${his} body structure worth ${his} attention is`);
				if (body.muscles >= soul.muscles + 5) {
					r.push(`that ${he} is <span class="lime">significantly more muscular</span> than ${he} once was.`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 50) {
							r.push(`${He} is happy with ${his} newfound strength and looks forward to putting this power to work for you, as limited as it may be.`);
						} else {
							r.push(`${He} is irritated that you would change something like this about ${him}`);
							if (body.genes === "XX" && !FutureSocieties.isActive('FSPhysicalIdealist')) {
								r.push(`and is <span class="mediumorchid">annoyed</span> that ${he} now looks less feminine.`);
								body.devotion -= 3;
							} else {
								r.push(`but <span class="mediumaquamarine">appreciates</span> the extra strength nonetheless, even if it is all in the torso.`);
								body.trust += 5;
							}
						}
					}
				} else {
					r.push(`that ${he} is <span class="orange">significantly less muscular</span> than before.`);
					if (body.devotion > 50) {
						r.push(`${He} appreciates that you would take the time to make ${him} more feminine.`);
					} else {
						r.push(`${He} is <span class="mediumorchid">annoyed</span> that you would alter something about ${him} like this, but it's not a big loss given ${his} state.`);
						body.devotion -= 3;
					}
				}
			}

			/* (pregnancy/belly changes)*/
			let weightChange = 0;/* used to segue to weight after pregnancy/belly implants*/
			if (body.pregKnown === 1 && soul.preg > 0) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${He} wiggles into a better position to see ${his} stomach,`);
				if (body.bellyPreg < 100) {
					if (body.counter.birthsTotal === 0) {
						r.push(`but ${he}'s too inexperienced to recognize ${his} <span class="pink">early pregnancy.</span>`);
					} else if (body.counter.birthsTotal > 0) {
						r.push(`and since this is not ${his} first pregnancy, ${he} is able to recognize the <span class="pink">life within ${him}.</span>`);
					}
				} else if (body.bellyPreg >= 450000) {
					r.push(`and ${he} can immediately see that ${he} is <span class="pink">insanely pregnant;</span> ${his} body stretched full of babies.`);
				} else if (body.bellyPreg >= 150000) {
					r.push(`and ${he} can quite clearly see that ${he} is <span class="pink">enormously pregnant,</span> so much so that ${his} body could quite believably be carrying nine full sized babies.`);
				} else if (body.bellyPreg >= 60000) {
					r.push(`and ${he} can see that ${he} is almost <span class="pink">unnaturally pregnant,</span> with a belly swollen to a size that could easily carry four full grown babies.`);
				} else if (body.bellyPreg >= 15000) {
					r.push(`and ${he} can clearly see that ${he} is <span class="pink">quite pregnant,</span> as ${he} sports a belly that could easily carry a full sized baby.`);
				} else if (body.bellyPreg >= 5000) {
					r.push(`and ${he} sees a <span class="pink">bump in ${his} stomach.</span> A gentle kick clues ${him} in to the reason.`);
				} else if (body.bellyPreg >= 100) {
					r.push(`and ${he} see a <span class="pink">slight swell to ${his} stomach.</span>`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.bellyPreg >= 100 || body.counter.birthsTotal > 0) {
						if (body.devotion > 50) {
							r.push(`Even though ${he} didn't get to experience being made into one, ${he} is delighted to be a mother${(body.counter.birthsTotal > 0) ? ` again` : ``}.`);
						} else {
							r.push(`${He} is filled with conflicting emotions, <span class="mediumorchid">hatred</span> for you for forcing`);
							if (body.pregType > 1) {
								r.push(`these lives`);
							} else {
								r.push(`this life`);
							}
							r.push(`onto ${him}, as well as the instinct of a mother's love for ${his} unborn child.`);
							body.devotion -= 3;
						}
					}
				} else if (body.fetish === "pregnancy") {
					if (body.bellyPreg >= 100 || body.counter.birthsTotal > 0) {
						if (body.devotion > 50) {
							r.push(`Even though ${he} didn't get to experience being made into one, ${he} is overjoyed to have`);
							if (body.counter.birthsTotal > 0) {
								r.push(`another`);
							} else {
								r.push(`a`);
							}
							r.push(`life growing inside ${him}.`);
						} else {
							r.push(`${He} is filled with conflicting emotions, hate for being forced into this, but also joy from getting to be pregnant. While you didn't do this for ${his} amusement, ${he}'ll definitely take advantage of it.`);
						}
					}
				}
				weightChange = 1;
			} else if (body.bellyImplant > soul.bellyImplant && body.bellyImplant >= 100) { /* belly implant filled*/
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${He} wiggles into a better position to view ${his} stomach, where ${he}`);
				if (body.bellyImplant >= 450000) {
					r.push(`sees nothing but a <span class="pink">massive middle.</span>`);
				} else if (body.bellyImplant >= 150000) {
					r.push(`sees <span class="pink">belly carrying a multitude of children.</span>`);
				} else if (body.bellyImplant >= 60000) {
					r.push(`sees a <span class="pink">belly that could be laden with multiples at the brink of birth.</span>`);
				} else if (body.bellyImplant >= 15000) {
					r.push(`sees a <span class="pink">belly swollen enough to be carrying at least one baby ready to drop.</span>`);
				} else if (body.bellyImplant >= 5000) {
					r.push(`sees a <span class="pink">clear bump in ${his} stomach from the belly implant.</span>`);
				} else if (body.bellyImplant >= 100) {
					r.push(`sees a <span class="pink">slight swell to ${his} stomach.</span>`);
				}
				if (body.devotion > 50) {
					r.push(`${He} likes how the bulge looks on ${him} and can't wait to get fucked with it in the way.`);
				} else {
					r.push(`It <span class="mediumorchid">bothers ${him}</span> that you would add such a`);
					if (body.bellyImplant >= 10000) {
						r.push(`major`);
					} else {
						r.push(`minor`);
					}
					r.push(`inconvenience to ${his} body.`);
					body.devotion -= 1;
				}
				if (soul.pregKnown === 1) {
					if (body.fetish === "pregnancy") {
						if (body.devotion > 50) {
							r.push(`${He} <span class="mediumorchid">scowls with momentary wrath</span> before regaining ${his} composure. ${He} resents being separated from ${his} pregnancy${(canGetPregnant(body)) ? `, though that is easily remedied` : ``}.`);
							body.devotion -= 5;
						} else if (body.devotion > 20) {
							r.push(`${He} <span class="mediumorchid">scowls angrily</span> at this turn of events${(canGetPregnant(body)) ? `, though that will be easily remedied by putting another child in ${him}` : ``}.`);
							body.devotion -= 10;
						} else {
							r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} pregnancy away from ${him}.`);
							body.devotion -= 15;
						}
					} else if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 50) {
							r.push(`While ${he} will miss the chance of meeting ${his} future child, ${he} will no longer be weighed down by it as ${he} gets used to ${his} new body.`);
						} else if (body.devotion > 20) {
							r.push(`${He} accepts this as how things are.`);
						} else {
							r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} child away from ${him}. It didn't matter if ${he} wanted it or not; <span class="gold">it was ${hers} and you took it.</span>`);
							body.devotion -= 10;
							body.trust -= 10;
						}
					}
				}
				weightChange = 1;
			} else if (body.pregKnown === 0 && soul.pregKnown === 1) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${He} wiggles into a better position to view ${his} stomach, where ${he} discovers ${he} is <span class="pink">no longer pregnant.</span>`);
				if (body.fetish === "pregnancy") {
					if (body.devotion > 50) {
						r.push(`${He} <span class="mediumorchid">scowls with momentary wrath</span> before regaining ${his} composure. ${He} resents being separated from ${his} pregnancy${(canGetPregnant(body)) ? `, though that is easily remedied` : ``}.`);
						body.devotion -= 5;
					} else if (body.devotion > 20) {
						r.push(`${He} <span class="mediumorchid">scowls angrily</span> at this turn of events${(canGetPregnant(body)) ? `, though that will be easily remedied by putting another child in ${him}` : ``}.`);
						body.devotion -= 10;
					} else {
						r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} pregnancy away from ${him}.`);
						body.devotion -= 15;
					}
				} else if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 50) {
						r.push(`While ${he} will miss the chance of meeting ${his} future child, ${he} will no longer be weighed down by it as ${he} gets used to ${his} new body.`);
					} else if (body.devotion > 20) {
						r.push(`${He} accepts this as how things are.`);
					} else {
						r.push(`${He} is filled with <span class="mediumorchid">hatred for you</span> for snatching ${his} child away from ${him}. It didn't matter if ${he} wanted it or not; <span class="gold">it was ${hers} and you took it.</span>`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				}
				weightChange = 1;
			} else if (body.bellyImplant < soul.bellyImplant) { /* belly implant reduced*/
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${He} wiggles into a better position to view ${his} stomach, where ${he}`);
				if (body.bellyImplant >= 450000) {
					r.push(`sees nothing but a <span class="pink">massive middle.</span>`);
				} else if (body.bellyImplant >= 150000) {
					r.push(`sees <span class="pink">belly carrying a multitude of children.</span>`);
				} else if (body.bellyImplant >= 60000) {
					r.push(`sees a <span class="pink">belly that could be laden with multiples at the brink of birth.</span>`);
				} else if (body.bellyImplant >= 15000) {
					r.push(`sees a <span class="pink">belly swollen enough to be carrying at least one baby ready to drop.</span>`);
				} else if (body.bellyImplant >= 5000) {
					r.push(`sees a <span class="pink">clear bump in ${his} stomach from the belly implant.</span>`);
				} else if (body.bellyImplant >= 100) {
					r.push(`sees a <span class="pink">slight swell to ${his} stomach.</span>`);
				} else {
					r.push(`discovers ${his} belly is <span class="pink">no longer bulging.</span>`);
				}
				if (body.devotion > 20) {
					r.push(`${He} appreciates how much easier it will be with a smaller middle.`);
				} else {
					r.push(`${He} can't help but appreciate losing the bulk, but ${he} still <span class="gold">worries</span> over your control of ${his} body.`);
					body.trust -= 1;
				}
				weightChange = 1;
			}

			/* stomach*/
			if (weightChange !== 1) {
				App.Events.addParagraph(el, r);
				r = [];
				r.push(`${He} wiggles into a better position to see ${his} middle, and begins to shift`);
			} else {
				r.push(`${He} continues to shift`);
			}
			if (body.weight >= soul.weight + 30) { /* (fatter)*/
				r.push(`${his} stomach until ${he} feels just how <span class="red">much more weight</span> ${he} is carrying.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new curves intriguing.`);
					} else {
						r.push(`${His} face contorts with <span class="mediumorchid">disgust</span> at ${his} newfound bulk.`);
						body.devotion -= 5;
					}
				}
				if (body.bellySag > soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices <span class="red">how much it sags.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This isn't pleasant, but ${he} bears it for you.`);
						} else {
							r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
							body.devotion -= 2;
						}
					}
				} else if (body.bellySag < soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices it is <span class="green">tighter despite being softer.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new firm belly.`);
						} else {
							r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
							body.devotion += 1;
						}
					}
				}
			} else if (body.weight <= soul.weight - 30) { /* (thinner)*/
				r.push(`${his} stomach and ${he} finds ${his} body <span class="green">thinner.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new curves intriguing.`);
					} else {
						r.push(`While free weight loss is <span class="hotpink">appreciated,</span> ${he} wishes ${he} had some say in the matter.`);
						body.devotion += 1;
					}
				}
				if (body.bellySag > soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices how it <span class="red">has a sag to it.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This isn't pleasant, but ${he} bears it for you.`);
						} else {
							r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
							body.devotion -= 2;
						}
					}
				} else if (body.bellySag < soul.bellySag && body.belly < 100) {
					r.push(`${He} also notices it is <span class="green">tighter despite being softer.</span>`);
					if (body.fetish !== Fetish.MINDBROKEN) {
						if (body.devotion > 20) {
							r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new perkier belly.`);
						} else {
							r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
							body.devotion += 1;
						}
					}
				}
			} else if (body.bellySag > soul.bellySag && body.belly < 100) { /* (belly sag)*/
				r.push(`${his} stomach and ${he} notices a <span class="red">sag in ${his} belly.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`This isn't pleasant, but ${he} bears it for you.`);
					} else {
						r.push(`This does nothing for ${his} self-image, only <span class="mediumorchid">disgusts and annoys</span> ${him}.`);
						body.devotion -= 2;
					}
				}
			} else if (body.bellySag < soul.bellySag && body.belly < 100) { /* (subtracted)*/
				r.push(`${his} stomach and notices the <span class="green">sag in ${his} belly has lessened.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`This is great for ${his} self-image and ${he} happily strokes ${his} new tight belly.`);
					} else {
						r.push(`Whatever else this transition brings, this is a gift ${he} will appreciate and ${he} <span class="hotpink">smiles, just a bit.</span>`);
						body.devotion += 1;
					}
				}
			} else if (body.weight < 10 && body.muscles > 5 && body.belly < 100) {
				r.push(`${his} <span class="lime">muscled stomach.</span>`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} finds ${his} new strength intriguing.`);
					} else {
						r.push(`${He} finds ${his} new strength <span class="mediumaquamarine">empowering.</span>`);
						body.trust += 2;
					}
				}
			} else {
				r.push(`stomach, though ${he} finds little out of the ordinary${(weightChange === 1) ? `; other than the obvious, of course` : ``}.`);
			}
			if (body.piercing.navel.weight !== 0 && soul.piercing.navel.weight === 0) {
				r.push(`${He} now has a piercing in ${his} navel; ${he} rolls ${his} tummy${(body.belly >= 15000) ? `, a feat in and of itself` : ``}, fascinated by ${his} new hardware grazing ${his} stomach to the motion.`);
			}

			/* waist */
			if (body.belly < 30000 || body.weight <= 95) {
				if (body.waist > soul.waist + 40) {
					r.push(`As ${he} explores ${his} middle, ${he} also takes note of ${his} <span class="orange">wider waist.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`The effects of such a change on ${his} appearance go right over ${his} head.`);
					} else if (body.devotion > 20) {
						r.push(`This change disappoints ${him}. ${He} wishes ${he} could have been more feminine for you.`);
					} else {
						r.push(`This change <span class="mediumorchid">disgusts ${him};</span> it will only leave ${him} treated worse compared to the more feminine slaves.`);
						body.devotion -= 1;
					}
				} else if (body.waist < soul.waist - 40) {
					r.push(`As ${he} explores ${his} middle, ${he} also takes note of ${his} <span class="lime">narrower waist.</span>`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`The effects of such a change on ${his} appearance go right over ${his} head.`);
					} else if (body.devotion > 20) {
						r.push(`This change pleases ${him}; ${he} can't wait to feel your hands around ${him}.`);
					} else {
						r.push(`That you would make such a change to ${him} <span class="mediumorchid">disgusts ${him},</span> though ${he} <span class="mediumaquamarine">takes solace</span> in the fact that ${he} will likely be treated better for being more attractive.`);
						body.devotion -= 1;
						body.trust += 1;
					}
				}
			}

			/* (butt)*/
			App.Events.addParagraph(el, r);
			r = [];
			r.push(`${He} cranes ${his} neck back to review ${his} rear, finding how`);
			if (body.butt > soul.butt) { /* (bigger)*/
				r.push(`much <span class="lime">bigger ${his} butt is now.</span> As ${he} bounces ${his} cheeks, it becomes clear that it has grown`);
				if (body.butt >= soul.butt + 5) { /* (+to max size description or above)*/
					r.push(`an incredible amount.`);
				} else if (body.butt > soul.butt + 1) { /* (+more sizes)*/
					r.push(`a lot.`);
				} else { /* (+1 size)*/
					r.push(`a fair bit.`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`This is a pleasing development as ${he} looks forward to putting this new rear to the test with you.`);
					} else {
						r.push(`While ${he}'s not terribly upset, this still feels like a violation of ${him}, somehow. Still, there are worse things that could happen than waking up with a bigger rear.`);
					}
				}
				if (body.butt >= soul.butt + 5 && body.butt > 12) {
					r.push(`${He} is overwhelmed by how large ${his} new bottom is. ${He} doubts ${he} can even lay flat on ${his} back any longer.`);
				}
			} else if (body.butt < soul.butt) { /* (smaller)*/
				r.push(`much <span class="orange">smaller ${his} butt is now.</span> As ${he} bounces ${his} cheeks, it becomes clear that it has shrunk`);
				if (body.butt <= soul.butt - 5) { /* (+to max size description or above)*/
					r.push(`an incredible amount.`);
				} else if (body.butt > soul.butt - 1) { /* (+more sizes)*/
					r.push(`a lot.`);
				} else { /* (-1 size)*/
					r.push(`a fair bit.`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} is saddened that there is now less of ${him} for you to play with, but remembers that you chose this body for ${him} and hopes that you will still make use of ${his} rear.`);
					} else {
						r.push(`This is just <span class="mediumorchid">depressing</span> to ${him}. A nice rear is one of the two parts of ${his} body that almost every woman (or "woman") is defined by, and now ${he} feels like just that much less of a person.`);
						body.devotion -= 1;
					}
				}
			} else {
				r.push(`little ${his} butt has changed in size.`);
			}
			if (body.buttImplant > 0 && soul.buttImplant === 0) { /* (+butt implants)*/
				r.push(`${He} also notes that <span class="coral">there are implants in ${him},</span> as ${his} ass's shape didn't really change as it moved.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`It pleases ${him} that you would invest in such a minor way in ${his} body.`);
					} else {
						r.push(`It feels like you have modified ${him} in a such a minor way for your own benefit, and ${he} doesn't kid ${himself} in thinking otherwise.`);
					}
				}
			} else if (body.buttImplant === 0 && soul.buttImplant > 0) { /* (-butt implants)*/
				r.push(`${He} also notes that ${he} <span class="coral">no longer has ass implants,</span> as ${his} experimentation reveals a more natural bounce to ${his} buttocks.`);
				if (body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} is happy that you think ${his} body doesn't need any artificial modification to be pleasing.`);
					} else {
						r.push(`${He} views this as one more thing ${he} <span class="mediumorchid">didn't have a choice in.</span>`);
						body.devotion -= 1;
					}
				}
			}
			if (body.fetish !== Fetish.MINDBROKEN) {
				if (body.hips !== soul.hips) {
					r.push(`As ${he} prepares to look at ${his} crotch, it occurs to ${him} that ${his} hips are`);
					if (body.hips > soul.hips) {
						r.push(`<span class="lime">`);
						if (body.hips > soul.hips + 3) {
							r.push(`considerably`);
						} else if (body.hips < soul.hips - 1) {
							r.push(`much`);
						}
						r.push(`wider.</span>`);
						if (body.fetish === "pregnancy" && body.counter.birthsTotal > 0) {
							r.push(`${He} seems <span class="hotpink">overjoyed</span> at their new size; It means ${he}'ll be even better at popping out babies than ever. ${He} continues around back to learn how`);
						} else if (body.devotion > 20) {
							r.push(`${He} gives them a little wiggle for your amusement before continuing around back to learn how`);
						} else {
							r.push(`${He} takes the new addition well enough since it is likely to raise ${his} worth in society and thus not the worst thing ever. How you intend to make use of ${his} hips <span class="gold">worries ${him},</span> however. ${He} continues around back to learn how`);
							body.trust -= 1;
						}
					} else {
						r.push(`<span class="orange">`);
						if (body.hips < soul.hips - 3) {
							r.push(`considerably`);
						} else if (body.hips < soul.hips - 1) {
							r.push(`much`);
						}
						r.push(`narrower.</span>`);
						if (body.fetish === "pregnancy" && body.counter.birthsTotal > 0) {
							r.push(`${He} seems a little caught up on their new size, likely by concern over future pregnancies and childbirth.`);
						} else if (body.devotion > 50) {
							r.push(`${He} gives them a little wiggle for your amusement.`);
						} else if (body.devotion >= -20) {
							r.push(`${He} accepts your judgment that ${his} new hips suit ${him} better.`);
							if (body.pregKnown && body.counter.birthsTotal > 0) {
								r.push(`${He} <span class="gold">worries</span> about what this means for ${his} coming birth.`);
								body.trust -= 3;
							}
						} else {
							r.push(`${He} seems upset, <span class="mediumorchid">both from ${his} loss of femininity and the overreach of your power,</span> that you would alter ${his} body is such a way.`);
							if (body.pregKnown && body.counter.birthsTotal > 0) {
								r.push(`A <span class="gold">terrifying realization</span> dawns on ${him}; ${his} upcoming birth is going to be much harder than ${his} last.`);
								body.trust -= 5;
							}
							body.devotion -= 3;
						}
					}
				}
				if (body.piercing.anus.weight !== 0 && soul.piercing.anus.weight === 0) {
					r.push(`As ${he} moved, ${he} felt something odd in ${his} butt. ${He} can only speculate that ${he} has a new addition down there.`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			let seeCrotch = 1;
			if (body.weight > 97 || body.belly >= 60000 || body.boobs >= 20000) { /* crotch blockers */
				r.push(`${He} tries to get a good view of ${his} crotch, but finds it impossible with ${his}`);
				if (body.belly >= 60000) {
					r.push(`${bellyAdjective(body)} belly in the way.`);
				} else if (body.weight > 97) {
					r.push(`hanging gut obstructing things.`);
				} else {
					r.push(`enormous boobs taking up so much space.`);
				}
				if (body.fetish !== Fetish.MINDBROKEN) {
					r.push(`${He} shifts ${his} weight so that ${he} falls onto ${his} back`);
					if (body.piercing.corset.weight !== 0 && soul.piercing.corset.weight === 0) {
						r.push(`and recoils as ${he} lands on something unfamiliar and hard. ${His} mind races as to what it could be, before the realization sets in that ${he} now has a corset piercing up ${his} back. Once ${he} gets used to the feeling, ${he} leans to ${his} side to finally get a view around ${his} body.`);
					} else {
						r.push(`and leans to ${his} side to finally see what's under ${his} body.`);
					}
					if (body.weight > 160 || (body.boobs >= 20000 && ["saggy", "wide-set"].includes(body.boobShape)) || body.boobs >= 40000 || body.hips === 3) { /* still can't see */
						r.push(`Unfortunately for ${him},`);
						if (body.boobs >= 40000) {
							r.push(`${his} tits are so massive they hang over ${his} sides and block any line of sight ${he} may have been able to use.`);
						} else if (body.boobs >= 20000 && ["saggy", "wide-set"].includes(body.boobShape)) {
							r.push(`${his} tits are resting heavily to ${his} sides and block any line of sight ${he} may have been able to use.`);
						} else if (body.weight > 160) {
							r.push(`${he} is so fat ${his} gut rests past ${his} sides and block any line of sight ${he} may have been able to use.`);
						} else {
							r.push(`${his} hips are so absurdly wide, there is no way for ${him} to see around them.`);
						}
						seeCrotch = 0;
					}
				} else {
					r.push(`${His} simple mind cannot fathom a good way to see ${his} junk like this, so what ${he} has will come as a surprise sooner or later to ${him}.`);
					seeCrotch = 0;
				}
			} else {
				r.push(`As ${his} eyes center on ${his} crotch,`);
			}

			if (seeCrotch === 1) {
				/* (changed genitals)*/
				if (soul.vagina > -1) { /* (had a vagina)*/
					if (body.dick > 0 && soul.dick > 0) { /* (had a penis)*/
						r.push(`${he} is relieved to find<span class="coral">`);
						if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
							r.push(`a cock, balls and pussy.`);
						} else if (body.balls === 0 && soul.balls > 0 && soul.scrotum > 0) {
							r.push(`both a cock and pussy, though ${he} is a little miffed that ${he} now lacks testicles.`);
						} else if (body.balls > 0 && body.scrotum > 0 && soul.balls === 0) {
							r.push(`both a cock, pussy and, more surprisingly, balls.`);
						} else {
							r.push(`both a cock and pussy.`);
						}
						r.push(`</span>`);
					} else if (body.dick > 0 && soul.dick === 0) { /* (+penis)*/
						r.push(`${he} is startled to find ${he} <span class="coral">has a penis</span> now.`);
						if (body.vagina > -1) { /* (kept vagina)*/
							r.push(`${He} is confused for a moment until ${he} lifts ${his} new penis to <span class="coral">`);
							if (canSee(body)) {
								r.push(`see`);
							} else {
								r.push(`discover`);
							}
							r.push(`a pussy under it.</span>`);
						} else { /* (did not keep vagina, +penis or not)*/
							r.push(`${He} understands that ${he} <span class="coral">no longer has a vagina.</span>`);
						}
					} else if (body.dick === 0 && soul.dick > 0) { /* (had a penis)*/
						r.push(`${he} is shocked to`);
						if (canSee(body)) {
							r.push(`see`);
						} else {
							r.push(`discover`);
						}
						r.push(`that ${he} <span class="coral">no longer has a`);
						if (body.balls > 0 && body.scrotum > 0) {
							r.push(`penis, mostly because ${he} still has balls.`);
						} else if (body.vagina > -1) {
							r.push(`penis, though ${he} is glad to still have a pussy.`);
						} else {
							r.push(`penis, or anything, for that matter, on ${his} crotch.`);
						}
						r.push(`</span>`);
					} else if (body.vagina > -1) {
						r.push(`${he} is happy to find a familiar hole.`);
					} else {
						r.push(`${he} is startled to find ${he} <span class="coral">no longer has genitals.</span>`);
					}
				} else if (soul.dick > 0) { /* (had a penis)*/
					if (body.dick > 0) {
						r.push(`${he} is relieved to find ${he} <span class="coral">still has ${his}`);
						if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
							r.push(`penis and testicles.`);
						} else if (body.balls === 0 && soul.balls > 0 && soul.scrotum > 0) {
							r.push(`penis, but is a little alarmed to find ${he} now lacks testicles.`);
						} else if (body.balls > 0 && body.scrotum > 0 && soul.balls === 0) {
							r.push(`penis, but is more interested in the dangling pair of objects beneath it.`);
						} else {
							r.push(`penis.`);
						}
						r.push(`</span>`);
						if (body.vagina > -1 && body.balls < 6 && body.dick < 10) {
							r.push(`A new sensation causes ${him} to gaze lower. Much to ${his} surprise, ${he} <span class="coral">now also has a pussy.</span>`);
						}
					} else {
						r.push(`${he} is shocked to find that ${he} <span class="coral">no longer has a`);
						if (body.balls > 0 && body.scrotum > 0 && soul.balls > 0 && soul.scrotum > 0) {
							r.push(`penis, but still has balls.`);
						} else if (body.vagina > -1) {
							r.push(`penis, but a pussy.`);
						} else {
							r.push(`penis, or anything, for genitals.`);
						}
						r.push(`</span>`);
					}
				} else {
					r.push(`${he} is surprised to find`);
					if (body.dick > 0 && body.vagina > -1 && body.balls > 0 && body.scrotum > 0) {
						r.push(`${his} crotch is fully loaded.`);
					} else if (body.dick > 0 && body.vagina > -1) {
						r.push(`${he} has both a dick and pussy.`);
					} else if (body.dick > 0) {
						r.push(`${he} now has a cock`);
						if (body.balls > 0 && body.scrotum > 0) {
							r.push(`and balls`);
						}
						r.push(`to entertain with.`);
					} else if (body.vagina > -1) {
						r.push(`${he} now has a pussy to get pounded in.`);
					} else {
						r.push(`${he} is still a null. ${He} expected something more.`);
					}
				}

				let cockChanged = 0;
				/* (penis changes)*/
				if (body.dick !== soul.dick && body.dick !== 0 && soul.dick !== 0) {
					r.push(`${His} penis is`);
					if (body.dick > soul.dick + 4) {
						r.push(`<span class="lime">way bigger</span>`);
					} else if (body.dick > soul.dick) {
						r.push(`<span class="lime">a good deal larger</span>`);
					} else {
						r.push(`<span class="orange">smaller</span>`);
					}
					r.push(`than it was, and ${he} is`);
					if (body.fetish === Fetish.MINDBROKEN) {
						r.push(`not bothered one way or the other by this development; it isn't even clear if ${he} notices anything different about ${his} cock.`);
					} else if (body.devotion > 20) {
						if (body.dick > soul.dick + 4) {
							r.push(`<span class="hotpink">incredibly excited</span> about this change. ${He} laughs and groans at the weight of ${his} shaft, and as ${he} waggles it, it becomes increasingly obvious that ${he} is having difficulty not straight up humping the air. ${He} regains control over ${himself}, though just barely.`);
							body.devotion += 3;
						} else if (body.dick > soul.dick) {
							r.push(`pleased with this development. ${He} takes the time to rub ${his} newfound length across the sheets.`);
						} else {
							r.push(`accepting of it. ${He} takes a moment to jostle ${his} now shorter dick.`);
						}
					} else {
						if (body.dick > soul.dick + 4) {
							r.push(`<span class="mediumaquamarine">incredibly aggravated</span> about this change. This is just one more thing ${he} has to deal with now. How dare you give ${him} such a massive, throbbing, sensitive piece of meat`);
							if (hasBothLegs(body)) {
								r.push(`between ${his} legs!`);
							} else {
								r.push(`on ${his} crotch!`);
							}
							r.push(`${His} glower loses its bite as you note ${him} subconsciously thrusting ${his} ridiculously enlarged organ against the sheets. ${He} stops after ${he} realizes what ${he} is doing, nervously staying completely still to not blast a load out of ${his} massive prick.`);
							body.trust += 3;
						} else if (body.dick > soul.dick) {
							r.push(`annoyed at this development. ${He} frowns as ${he} tests ${his} newfound growth, only thrusting once before`);
							if (canSee(body)) {
								r.push(`noticing your amused grin`);
							} else {
								r.push(`sensing your gaze`);
							}
							r.push(`and stopping.`);
						} else {
							r.push(`<span class="mediumorchid">infuriated by it.</span> ${He} jostles ${his} smaller dick, only stopping when ${he} starts to become flushed.`);
							body.devotion -= 5;
						}
					}
					cockChanged = 1;
				}
				if (body.piercing.dick.weight !== 0 && soul.piercing.dick.weight === 0) {
					r.push(`There was no missing the piercing in ${his} dick as well.`);
					cockChanged = 1;
				}

				/* (ball changes)*/
				if (body.balls !== soul.balls && body.scrotum !== 0 && soul.scrotum !== 0) {
					r.push(`Then ${he} takes a moment to jostle ${his} balls, it seems they are`);
					if (body.balls > soul.balls + 4) {
						r.push(`<span class="lime">much larger</span> now. This`);
						if (body.fetish === Fetish.MINDBROKEN) {
							r.push(`does not seem to register in ${his} mind.`);
						} else if (body.devotion > 20) {
							r.push(`amazing addition to ${his} body is <span class="hotpink">surely welcome.</span> ${He} moans as ${he} rubs against ${his} new balls, groaning as their weight shifts around. ${His} face is flushed by the time ${he}'s done "examining" them.`);
							body.devotion += 5;
						} else {
							r.push(`addition to ${his} body is <span class="mediumaquamarine">annoying,</span> clearly. The frustrated irritation on ${his} face contrasts sharply with the actions of ${his} hips, which are busy causing`);
							if (body.dick) {
								r.push(`${his} dick to become engorged with blood.`);
							} else {
								r.push(`precum to start flowing freely.`);
							}
							r.push(`Catching ${himself}, ${he} takes a few soothing breaths to calm ${his} body down.`);
							body.trust += 5;
						}
					} else if (body.balls > soul.balls) {
						r.push(`<span class="lime">larger</span> now. This`);
						if (body.fetish === Fetish.MINDBROKEN) {
							r.push(`change doesn't mean much of anything to ${him}.`);
						} else if (body.devotion > 20) {
							r.push(`change delights ${him} and ${he} spends ample time jostling ${his} bigger nuts.`);
						} else {
							r.push(`change is just one more <span class="hotpink">bother</span> for ${him}. ${His} brow furrows as ${he} takes a moment to feel them up and stops as`);
							if (body.dick) {
								r.push(`${his} cock starts to stiffen.`);
							} else {
								r.push(`as a bead of precum starts to form from ${his} urethra.`);
							}
							body.devotion += 3;
						}
					} else {
						r.push(`<span class="orange">smaller</span> now, and this`);
						if (body.fetish === Fetish.MINDBROKEN) {
							r.push(`goes largely unnoticed.`);
						} else if (body.devotion > 20) {
							r.push(`change, while not necessarily fun, is appreciated by your devoted slave nonetheless.`);
						} else {
							r.push(`change causes ${him} consternation and humiliation.`);
						}
					}
					cockChanged = 1;
				}

				if (cockChanged === 1 && body.fetish !== Fetish.MINDBROKEN) {
					if (body.devotion > 20) {
						r.push(`${He} is thrilled at your modifications to ${his} genitals and is excited to explore those changes with you.`);
					} else {
						r.push(`${He} is <span class="mediumorchid">enraged</span> and <span class="gold">frightened</span> to see such changes to ${his} genitals, as they were fundamental parts of ${his} identity.`);
						body.devotion -= 10;
						body.trust -= 10;
					}
				}

				/* (vagina)*/

				if (body.vagina !== -1) {
					let seeVagina = 1;
					if (body.dick > 0) {
						r.push(`Then ${he} leans to ${his} side to shift ${his} dick`);
						if (body.scrotum > 0) {
							r.push(`and balls`);
						}
						r.push(`out of the way to inspect ${his} vagina more closely.`);
						if (body.balls >= 6 || body.dick >= 10) {
							r.push(`There's only one problem: ${His} maleness is so huge it steadfastly remains in the way; there is no angle ${he} can manage to see ${his} vagina from.`);
							seeVagina = 0;
						}
					} else if (body.scrotum > 0) {
						r.push(`Then ${he} leans to ${his} side to shift ${his} balls out of the way to inspect ${his} vagina more closely.`);
						if (body.balls >= 6) {
							r.push(`There's only one problem: ${His} testicles are so huge they steadfastly remain in the way; there is no angle ${he} can manage to see ${his} vagina from.`);
							seeVagina = 0;
						}
					} else {
						r.push(`Next ${he} gives ${his} vagina a closer inspection.`);
					}
					if (seeVagina === 1) {
						if (body.vagina === 0) { /* (+virginity)*/
							r.push(`${He} can't really tell, but it looks like it may be <span class="lime">unbroken.</span>`);
							if (body.vagina > 0) {
								if (body.fetish === Fetish.MINDBROKEN) {
									r.push(`And this would likely mean something to ${him}, if ${his} mind was not lost.`);
								} else if (body.devotion > 20) {
									r.push(`${He} is happy to be a virgin again so that ${he} can lose it to you.`);
								} else {
									r.push(`${He} is <span class="hotpink">happy</span> to be a virgin again, but <span class="gold">worries</span> about how long it will last.`);
									body.devotion += 3;
									body.trust -= 3;
								}
							}
						} else if (soul.vagina !== -1 && body.vagina < soul.vagina) { /* (+tightness)*/
							r.push(`${He} can't really tell, but it looks like it may be <span class="lime">tighter</span> now.`);
							if (body.fetish === Fetish.MINDBROKEN) {
								r.push(`And this might have been significant to ${him}, if ${his} brain worked correctly.`);
							} else if (body.devotion > 20) {
								r.push(`Sex will be more pleasurable than it was before and ${he} looks forward to breaking in ${his} new pussy with you.`);
							} else {
								r.push(`${He} groans in <span class="mediumorchid">frustration.</span> ${He} is well aware of the displeasure of having a pussy forcibly broken in and does not look forward to it again.`);
								body.devotion -= 2;
							}
						} else if (soul.vagina !== -1 && body.vagina > soul.vagina) { /* (-tightness)*/
							r.push(`${He} can't really tell, but it looks like it may be <span class="orange">looser</span> now.`);
							if (body.fetish === Fetish.MINDBROKEN) {
								r.push(`And this might be important to ${him}, if ${his} head was in working order.`);
							} else if (body.devotion > 20) {
								r.push(`${He} giggles a bit as ${he} tests out how many fingers ${he} can fit inside ${his} new loose hole, though ${he} wishes ${he} were still tight for you.`);
							} else {
								r.push(`${He} <span class="mediumorchid">frowns</span> as ${he} feels out how much looser ${he} is now. ${He} supposes it saves ${him} from getting fucked loose, but it is humiliating how many more fingers ${he} can fit inside ${himself} without even having to part ${his} lips.`); /* This is not how vaginas work goddammit. - is that better? */
								body.devotion -= 1;
							}
						} else if (body.vagina === soul.vagina) {
							r.push(`It's looks like ${his} old vagina.`);
						} else {
							r.push(`After a bit of flexing, ${he}'s satisfied with ${his} new organ.`);
						}
						if (body.piercing.genitals.weight > 0 && soul.piercing.genitals.weight === 0 && body.dick === 0) {
							r.push(`${He} also noticed a glimmer ${his} clit.`);
						}
						if (body.piercing.vagina.weight !== 0 && soul.piercing.vagina.weight === 0) {
							r.push(`${He} also now has piercings in ${his} vagina, a ring around ${his} labia, creating a halo of sparkles that ${he} couldn't help but marvel at.`);
						}
					}
				}
			}

			/* tattoos */
			if (body.fetish !== Fetish.MINDBROKEN) {
				const tatLocations = [
					"boobsTat",
					"buttTat",
					"lipsTat",
					"vaginaTat",
					"anusTat",
					"dickTat",
					"shouldersTat",
					"armsTat",
					"legsTat",
					"backTat",
					"stampTat",
					"bellyTat"
				];
				if (tatLocations.some(t => body[t] !== soul[t]) || body.custom.tattoo !== soul.custom.tattoo) {
					App.Events.addParagraph(el, r);
					r = [];
					r.push(`The changes to ${his} tattoos were not lost on ${him}, but compared to everything else, they were truly insignificant.`);
				}
			}

			App.Events.addParagraph(el, r);
			r = [];
			if (body.fetish !== Fetish.MINDBROKEN) {
				if (body.origBodyOwnerID === body.ID) {
					r.push(`This is ${his} body alright. Some things might have changed,`);
					if (body.devotion > 50) {
						r.push(`but ${he} enjoyed the time they spent apart.`);
					} else if (body.devotion >= -20) {
						r.push(`but <span class="mediumaquamarine">it's good to be home.</span>`);
						body.trust += 15;
					} else {
						r.push(`but <span class="mediumaquamarine">${he}'s where ${he} belongs.</span> Now to get it back the way <span class="mediumorchid">${he} likes it.</span>`);
						body.trust += 30;
						body.devotion -= 15;
					}
				} else if (body.ID === body.cloneID) {
					r.push(`This is ${his} body, but not <strong>${his}</strong> body. That it was cloned from ${his} original one is not lost on ${him}.`);
				}
			}
		}
	} else { /* blind amp that needs you to detail the changes to ${his} body */
		r.push(`After a while, ${he} begins to stir, ${his} eyes fluttering.`);
		if (sight === -2) {
			if (body.fetish !== Fetish.MINDBROKEN) {
				if (body.devotion > 50) {
					r.push(`${He} nearly panics when ${he} finds <span class="red">${he} can no longer see.</span> ${He} barely manages to keep calm before accepting this is the fate you have chosen for ${him}.`);
				} else if (body.devotion > 20) {
					r.push(`${He} starts to panic as ${he} realizes <span class="red">${he} can no longer see.</span> After a short expurgation of <span class="gold">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions before returning to ${his} inspection.`);
					body.trust -= 15;
				} else {
					r.push(`A deep panic sets in as ${he} realizes <span class="red">${he} can no longer see.</span> After a short expurgation of <span class="gold">grief and terror,</span> ${he} takes a deep breath and visibly suppresses ${his} emotions.`);
					body.trust -= 30;
				}
			} else {
				r.push(`A deep panic sets in as ${he} realizes <span class="red">${he} can no longer see.</span> ${He} begins thrashing violently until ${he} is restrained and sedated. Hopefully when ${he} comes to again, ${he}'ll have forgotten ${he} could ever see in the first place.`);
				end = 1;
			}
		}
		if (end !== 1) {
			r.push(`${He} lets out a low groan and reaches up to rub at ${his} eyes. Or rather, ${he} attempts to. A visible look of confusion crosses ${his} face and ${he} strains to sit up, but all ${he} manages to do is wiggle, ${his} movements reminding you of a suffocating goldfish. As the cloud of anesthetics fades, ${he} realizes what's happened to ${him}`);
			if (body.fetish === Fetish.MINDBROKEN) {
				r.push(`and is supremely unaffected by it, as ${his} mind has already left ${him}.`);
			} else if (body.devotion > 20) {
				r.push(`and begins to panic, ${his} breaths quickening. With a visible look of concentration, ${his} breathing slows and ${he} tries to take stock of ${his} new body`);
				if (isAmputee(soul)) { /* (was already an amputee) */
					r.push(`but ${he} realizes that at least nothing about ${his} limbs, or lack thereof, has changed.`);
				} else {
					r.push(`and begins to panic, ${his} breaths quickening. ${He} quickly realizes <span class="gold">you have taken ${his} arms and legs.</span>`);
					body.trust -= 15;
				}
			} else {
				if (isAmputee(soul)) { /* (was already an amputee) */
					r.push(`but ${he} realizes that at least nothing about ${his} limbs, or lack thereof, has changed.`);
				} else {
					r.push(`and ${his} eyes seem to bulge; the heart monitor begins to beep faster and more insistently. Eventually, your assistant is forced to inject ${him} with a sedative. ${His} eyes flutter closed and the heart monitors beeping slows to a steady pulse. Hopefully ${he}'ll be calmer when ${he} wakes up again, though the memory of waking without limbs will <span class="gold">stick with ${him}.</span>`);
					r.push(App.UI.DOM.makeElement("div", `...`));
					r.push(`When ${he} wakes up again, ${he} seems stable; the cold <span class="hotpink">acceptance</span> of ${his} fate clouds ${his} eyes.`);
					body.devotion += 5;
					body.trust -= 15;
				}
			}

			r.push(`Since ${he} has no sight to see the changes to ${his} body, nor hands to feel them, ${he} lacks any real ability to visualize ${his} new body. You could explain the changes to ${him}, or even fondle ${his} new assets, but ultimately it will lack the same impact of forcing ${him} to discover ${himself}.`);
		}
	}

	/* (Flavor text for slave description after body transfer)*/
	App.Events.addParagraph(el, r);
	return el;
};
