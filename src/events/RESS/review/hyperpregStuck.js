App.Events.RESSHyperpregStuck = class RESSHyperpregStuck extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.dick !== 0
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.bellyPreg >= 300000,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl, woman, hers
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);
		r.push(`You are alerted to an issue regarding your`);
		if (eventSlave.broodmother === 2 && eventSlave.preg >= 30) {
			r.push(`hyperbroodmother,`);
		} else if (eventSlave.broodmother === 1 && eventSlave.preg >= 30) {
			r.push(`broodmother,`);
		} else {
			r.push(`debilitatingly pregnant slave,`);
		}
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.addToLast(`. It seems`);
		if (V.pregAccessibility === 1 || V.ballsAccessibility === 1 || V.buttAccessibility === 1 || V.boobAccessibility === 1) {
			r.push(`that, despite updating your penthouse to accommodate extra wide slaves,`);
		} else {
			r.push(`since you have not yet updated your penthouse to accommodate slaves of ${his} girth,`);
		}
		r.push(`the poor ${girl} has gotten lodged in the doorway exiting`);
		if (eventSlave.rules.living === "luxurious") {
			r.push(`${his} room.`);
		} else if (eventSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
			r.push(`${his} suite.`);
		} else {
			r.push(`the dormitory where ${he} sleeps.`);
		}
		r.push(`The menials assigned to care for ${him} have been struggling for several weeks to fit ${his} through this particular doorway, but refrained from informing you, as their ward`);
		if (eventSlave.devotion > 95) {
			r.push(`did not wish to worry you.`);
		} else if (eventSlave.devotion > 50) {
			r.push(`was concerned you would worry.`);
		} else if (eventSlave.devotion > 20) {
			r.push(`was concerned how you would react.`);
		} else if (eventSlave.trust < -20 && eventSlave.devotion > -10) {
			r.push(`feared how you would react.`);
		} else if (eventSlave.trust < -50) {
			r.push(`was terrified of how you might respond.`);
		} else {
			r.push(`argued you couldn't be trusted.`);
		}
		r.push(`You make a mental note to punish ${his} caretakers and then set out to see ${his} predicament for yourself.`);
		r.toParagraph();
		r.push(`The sight that greets you when you arrive is equal parts incredible and amusing. En route to the baths, the slave attempted to exit`);
		if (eventSlave.rules.living === "luxurious") {
			r.push(`${his} room`);
		} else if (eventSlave.ID === V.HeadGirlID && V.HGSuite === 1) {
			r.push(`${his} suite`);
		} else {
			r.push(`the dorm`);
		}
		r.push(`backwards and, as a result, you have a glorious view of ${his}`);
		if (eventSlave.broodmother === 2 && eventSlave.preg >= 30) {
			r.push(`mind-boggling, obscenely swollen belly`);
		} else if (eventSlave.broodmother === 1 && eventSlave.preg >= 30) {
			r.push(`massive, brood-swollen belly`);
		} else {
			r.push(`inhumanly gravid belly`);
		}
		r.push(`squeezed painfully by the inadequate doorway and framing the attractive rear view of the rest of ${his} body, including ${his}`);
		if (eventSlave.butt > 5) {
			r.push(`debilitatingly huge ass cheeks.`);
		} else if (eventSlave.butt > 2) {
			r.push(`plush ass.`);
		} else {
			r.push(`cute little ass.`);
		}
		r.toParagraph();
		r.push(`${He} cranes ${his} neck, glancing over ${his} shoulder to give you a pleading look.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Abuse ${him}`, abuse, virginityWarning()),
			new App.Events.Result(`Fuck ${him}`, fuck, virginityWarning()),
			new App.Events.Result(`Try the 'Butter Strategy'`, butter),
			new App.Events.Result(`Leave ${him} to figure it out`, leave),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function abuse() {
			const r = new SpacedTextAccumulator();
			r.push(`You lean against a wall and take a moment to enjoy your slave's discomfort. Realizing that ${his} ${getWrittenTitle(eventSlave)} is intending to do nothing, ${he} blushes and begins pulling on ${his} belly, attempting to free ${himself}.`);
			if (eventSlave.broodmother === 2 && eventSlave.preg >= 30) {
				r.push(`${His} innumerable brood are awakened by ${his} exertions and begin to move, testing the thin walls of the womb constraining them and causing ${his} belly to throb ominously. You count the number of infants distinctly outlined against your poor hyperbroodmother's straining body.`);
			} else if (eventSlave.broodmother === 1 && eventSlave.preg >= 30) {
				r.push(`With a groan of effort, the broodmother manages to pull ${his} belly slightly further out through the doorway, but, in the effort, only really manages to wedge it more firmly. It bulges ominously from the added pressure.`);
			} else {
				r.push(`The massively pregnant slave's belly clutches in a false contraction and ${he} pulls several`);
				if (V.showInches === 2) {
					r.push(`inches`);
				} else {
					r.push(`centimeters`);
				}
				r.push(`further out through the door frame before it expands again, leaving ${his} even more hopelessly stuck`);
			}
			r.toParagraph();
			if (!canTalk(eventSlave)) {
				r.push(`${He} moans and rubs up and down what little ${he} can reach of ${his} belly while looking back at you with more urgency. It's clear ${he} is in severe distress.`);
			} else {
				r.push(`"${Master}," ${he} says through clenched teeth.`,
					Spoken(eventSlave, `"Please."`)
				);
			}
			r.toParagraph();
			r.push(`You judge that you've seen enough and move forward.`);
			if (eventSlave.butt > 10) {
				r.push(`Wading in between ${his} huge ass cheeks`);
			} else if (eventSlave.butt > 4) {
				r.push(`Grabbing a handful of one generous ass cheek,`);
			} else {
				r.push(`Slapping a pert ass cheek,`);
			}
			if (canDoVaginal(eventSlave)) {
				r.push(`you hilt yourself in ${his} pregnant pussy and begin pounding.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(`you hilt yourself in ${his} butthole and begin pounding.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`you push them together around your cock and begin pounding.`);
			}
			r.push(`${His} stomach distorts back and forth under your vigorous ministrations before, with a "pop," belly, slave, and owner come tumbling through the threshold. ${He} yelps in <span class="trust dec">shock</span> and <span class="health dec">pain</span> as ${his} belly impacts the ground as the sound of ${his} voice, coupled with the feeling of jolting up and down on top of your slave's abused gut, sends you over the edge. You ejaculate`);
			if (canDoVaginal(eventSlave)) {
				r.push(`into ${his} fertile, wanting hole`);
			} else if (canDoAnal(eventSlave)) {
				r.push(`into ${his} needy hole`);
			} else {
				r.push(`across ${his} back`);
			}
			r.push(`and then slide off of ${him} to instruct your servants to fix the door frame before they carry ${him} to ${his} duties for the day.`);
			eventSlave.trust -= 20;
			healthDamage(eventSlave, 20);
			r.toParagraph();
			return r.container();
		}

		function fuck() {
			const r = new SpacedTextAccumulator();
			r.push(`You can't help but be aroused by the sight of your swollen, helpless slave, and you take off your pants, revealing your erection. The slave's`);
			if (canSee(eventSlave)) {
				r.push(`backward glance falls on your dick`);
			} else if (canHear(eventSlave)) {
				r.push(`ears perk up`);
			} else {
				r.push(`head tilts to face you`);
			}
			r.push(`and ${he}`);
			if (eventSlave.devotion > 95) {
				r.push(`licks ${his} lips,`);
				if (hasAnyLegs(eventSlave)) {
					if (hasBothLegs(eventSlave)) {
						r.push(`spreading ${his} legs`);
					} else {
						r.push(`moving ${his} leg`);
					}
					r.push(`and revealing more of ${his} massive underbelly while angling ${his} wanting`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy`);
					} else {
						r.push(`ass`);
					}
					r.push(`at the perfect angle for fucking.`);
				} else {
					r.push(`wiggling the stumps of ${his} legs and swiveling ${his} hips to give you a clear angle at ${his} hungry`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`ass.`);
					}
				}
			} else if (eventSlave.devotion > 50) {
				r.push(`blushes, swiveling ${his} hips to give you easy access to ${his}`);
				if (canDoVaginal(eventSlave)) {
					r.push(`pussy.`);
				} else {
					r.push(`ass.`);
				}
			} else if (eventSlave.devotion > 20) {
				r.push(`blushes and leans into ${his} belly, knowing what to expect.`);
			} else if (eventSlave.trust < -20 && eventSlave.devotion > -10) {
				r.push(`moans nervously.`);
			} else if (eventSlave.trust < -50) {
				r.push(`yelps, turning away from you and`);
				if (canSee(eventSlave)) {
					r.push(`reflexively`);
				}
				r.push(`clenching ${his} eyes shut as ${his}`);
				if (hasBothLegs(eventSlave)) {
					r.push(`legs instinctively clench together to hide ${his}`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`ass.`);
					}
				} else if (hasAnyLegs(eventSlave)) {
					r.push(`leg bends and flexes in a futile attempt to hide ${his}`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`ass.`);
					}
				} else {
					r.push(`stumps push toward each other, clearly trying (and failing) to conceal ${his}`);
					if (canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`ass.`);
					}
				}
			} else {
				r.push(`snorts derisively despite ${his} vulnerability.`);
			}
			r.toParagraph();
			r.push(`You step forward and run an appreciative hand over the surface of ${his} belly. ${His} womb is packed so full that the outline of ${his} squirming children is obvious under ${his} stretched-thin flesh. ${He} groans at your touch, clearly in some distress, and you promise ${him} that you'll free ${him} once you've finished up.`);
			if (eventSlave.devotion > 95) {
				r.push(`The slave is clearly too aroused by your fondling to`);
				if (canHear(eventSlave)) {
					r.push(`hear what you're saying`);
				} else {
					r.push(`interpret your body language`);
				}
				r.push(`and leans back into you, stretching against ${his} tortured belly to nibble at your ear.`);
			} else if (eventSlave.devotion > 50) {
				r.push(`The slave says nothing, but wiggles ${his} ass against your hips, making it clear ${he}'s ready.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`You can see tears streaming down the slave's face from the discomfort ${he}'s experiencing, but ${he} nods that ${he}'s ready.`);
			} else if (eventSlave.trust < -20 && eventSlave.devotion > -10) {
				r.push(`The slave cries and begs you to finish quickly and help ${him} before ${he} bursts.`);
			} else if (eventSlave.trust < -50) {
				r.push(`The shock of contact with your body causes the terrified slave's skin to contract, as if ${he}'s trying to pull away despite ${his} current reality, and ${his} only response to your promise is sobbing.`);
			} else {
				r.push(`The slave`);
				if (!canTalk(eventSlave)) {
					r.push(`motions for you to`);
				} else {
					r.push(`responds by telling you to`);
				}
				r.push(`just fuck ${him} already and let ${him} move on with ${his} day.`);
			}
			r.push(`You let your hand wander downward`);
			if (canDoVaginal(eventSlave)) {
				r.push(`and then push down on the base of ${his} clit with finger and thumb, making ${him} whimper, before removing your hand and burying your cock inside ${him}.`);
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(`and circle ${his} anus with a finger, making ${him} whimper, before removing your hand and burying your cock inside ${him}.`);
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				r.push(`and trace the edge of ${his} chastity with a finger, making ${him} whimper, before removing your hand and squeezing ${his} rear around your cock.`);
			}
			r.push(`As you fuck ${him}, ${his} poor, tortured belly wobbles against the constraining door frame and the frame itself groans in protest. ${He} grinds in rhythm to your pistoning until the back and forth movement of ${his} sloshing tummy overpowers ${his} efforts and sends ${him} careening back and forth between its oceanic movements and your less than tender ministrations. The sensation of fucking a ${woman} who is literally a slave to the motion of ${his} own womb drives you over the edge and you pull out, ejaculating all over ${his}`);
			if (eventSlave.butt > 10) {
				r.push(`enveloping ass cleavage.`);
			} else if (eventSlave.butt > 4) {
				r.push(`fat, waiting ass cheeks.`);
			} else {
				r.push(`pert ass.`);
			}
			r.toParagraph();
			r.push(`You step back, taking one last appreciative look at your trapped slave, then call a team of menials to remove the door from its foundation to free ${him}. Though your slave is extricated uninjured, your decision to use ${him} before saving ${him} leaves the ${girl} <span class="trust dec">trusting you less.</span> You could pay to have the door widened, but then you wouldn't get this opportunity again, would you?`);
			eventSlave.trust -= 10;
			healthDamage(eventSlave, 10);
			r.toParagraph();
			return r.container();
		}

		function butter() {
			const r = new SpacedTextAccumulator();
			r.push(`You ponder ${his} predicament for a moment before settling on a solution. You procure an industrial-sized jar of curative-laced moisturizing butter — specially formulated to ease the strain of hypermassive pregnancy — and explain to your slave that, to free ${him}, you're going to need to completely cover ${him} in it so that ${he} can squeeze through.`);
			if (eventSlave.devotion > 95) {
				r.push(`${He} grins at you and then huffs, pretending to be put off by the idea.`);
			} else if (eventSlave.devotion > 50) {
				r.push(`${He} quirks an eyebrow, then smiles, clearly intrigued.`);
			} else if (eventSlave.devotion > 20) {
				r.push(`${He} nods, happy to`);
				if (canHear(eventSlave)) {
					r.push(`hear`);
				} else {
					r.push(`know`);
				}
				r.push(`you've considered a way to free ${him} without causing ${him} undue harm.`);
			} else if (eventSlave.trust < -20 && eventSlave.devotion > -10) {
				r.push(`${He} had seemed uneasy when you first described your idea, but seems to resign ${himself} to it once you finish your description.`);
			} else if (eventSlave.trust < -50) {
				r.push(`The wide-eyed slave nods as you describe your idea, clearly hoping you'll free ${him} as quickly as possible so that ${he} can get away from you.`);
			} else {
				r.push(`${He} laughs derisively at you after you describe your idea, then motions for you to get on with it.`);
			}
			r.push(`You move toward ${him} and slather a generous helping of the stuff over ${his} back and`);
			if (eventSlave.butt > 10) {
				r.push(`couch-smothering ass,`);
			} else if (eventSlave.butt > 4) {
				r.push(`fat ass cheeks,`);
			} else {
				r.push(`petite ass,`);
			}
			r.push(`for the sake of "being thorough." You then move forward, covering the parts of ${his} belly you can reach from behind and taking special care to`);
			if (eventSlave.boobs >= 20000) {
				r.push(`massage the soft butter into every`);
				if (V.showInches === 2) {
					r.push(`inch`);
				} else {
					r.push(`centimeter`);
				}
				r.push(`of ${his} colossal tits, noting with satisfaction ${his} distant nipples, stuck on the other side of the doorway with the bulk of ${his} room-filling breasts, harden with arousal.`);
			} else if (eventSlave.boobs >= 12000) {
				r.push(`massage the soft butter into ${his} massive tits as they push up between the arch of the doorway and ${his} bulging belly. You note with satisfaction ${his} nipples harden with arousal.`);
			} else if (eventSlave.boobs >= 7000) {
				r.push(`massage the soft butter into ${his} monstrous tits, enjoying the struggle it takes to heft each butter-slick, glistening melon with both hands. You note with satisfaction ${his} nipples harden with arousal.`);
			} else if (eventSlave.boobs >= 3000) {
				r.push(`massage the soft butter into each of ${his} huge tits. Your slave cranes ${his} head back a bit to avoid being smothered by ${his} own breasts as you work the butter into them, but you can tell ${he}'s aroused by what you're doing — ${his} nipples have turned hard as rocks.`);
			} else if (eventSlave.boobsImplant/eventSlave.boobs >= .60) {
				r.push(`massage the soft butter into ${his} fat, fake titties, noting with satisfaction ${his} nipples harden with arousal.`);
			} else if (eventSlave.boobs >= 650) {
				r.push(`massage the soft butter into ${his} big tits, noting with satisfaction ${his} nipples harden with arousal.`);
			} else if (eventSlave.boobs >= 300) {
				r.push(`massage the soft butter into ${his} small, girlish chest, noting with satisfaction ${his} nipples harden with arousal.`);
			} else {
				r.push(`massage the soft butter into ${his} flat chest, noting with satisfaction ${his} nipples harden with arousal.`);
			}
			r.toParagraph();
			r.push(`Satisfied with your covering of your slave's back half, you then resolve to work on ${his} front. Getting down on your hands and knees, you crawl through the narrow triangle of space between the base of your slave's massive belly, the floor, and the doorway. It's a tight squeeze, and you take longer than you need to in order to enjoy the sound of your slave groaning as you rub up against ${his} sweaty, buttered up belly, but you eventually make it through. Taking generous handfuls of butter, you slick up the front half of your slave's stomach, starting at the flattened nub of ${his} pressure-obliterated belly button and slowly working your way up to the round oval of baby-packed flesh being constricted by the doorway.`);
			r.toParagraph();
			r.push(`With your slave's body dripping with the thick moisturizer, you call out to ${him} to start pulling ${his} belly through the doorway, pushing your body up against ${his} stomach to help push. You didn't bother to strip your clothes while buttering ${his} gravid figure and, as you crush up against ${him} and heave, again and again, against the sheer mass of ${his} abdomen, you can't help but get aroused by the way your greasy clothes rub between your body and ${hers} with each motion. At first, ${his} belly is so firmly lodged that it doesn't move, but momentum eventually builds up and, with an audible "pop," the poor baby-laden breeder finally breaks free from ${his} containment, falling onto ${his} back and pulling you with ${him} into an absurd, buttery mass of flailing limbs and giggles. You take some time to flip ${him} into a position where ${he} won't be crushed by the weight of ${his} own womb, and then take some more time to enjoy the fruits of your labors.`);
			r.toParagraph();
			r.push(`Once finished, you allow your servants to carry your <span class="devotion inc">thoroughly satisfied slave</span> to the baths for a needed cleaning. You could pay to have the door widened, but then you wouldn't have such a perfect excuse to lather ${him} in cream, would you?`);
			eventSlave.devotion += 5;
			r.toParagraph();
			return r.container();
		}

		function leave() {
			eventSlave.devotion -= 2;
			eventSlave.trust -= 2;
			return `You leave ${him} to get ${himself} out of this situation and return to your daily affairs, though not without focusing a camera on the distraught breeder first. For several hours, you enjoy the sight of ${his} backside struggling to squeeze through the doorway before ${he} finally manages to figure it out. ${He} <span class="devotion dec">blames you</span> for this indignity and <span class="trust dec">worries</span> about what else you have waiting to torment ${him}.`;
		}
	}
};
