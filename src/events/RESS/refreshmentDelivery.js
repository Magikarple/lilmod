App.Events.RESSRefreshmentDelivery = class RESSRefreshmentDelivery extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				s => s.devotion > 20,
				s => s.trust > -10,
				s => s.ID !== V.HeadGirlID,
				s => s.ID !== V.ConcubineID,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const children = eventSlave.pregType > 1 ? "children" : "child";

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`When it's time for refreshments, ${V.assistant.name} directs the closest unoccupied slave capable of bringing them in to do so. This has the added advantage of bringing an enjoyably unpredictable variety of slaves under your eyes. This time,`,
			contextualIntro(V.PC, eventSlave, true),
			`comes through the door of your office, carrying`
		);
		if (V.PC.refreshmentType === 0) {
			r.push(`a selection of ${V.PC.refreshment} brands and the necessary implements`);
		} else if (V.PC.refreshmentType === 1) {
			r.push(`a bottle of ${V.PC.refreshment} with a glass in your favorite style`);
		} else if (V.PC.refreshmentType === 2) {
			r.push(`a selection of ${V.PC.refreshment} on a plate of your favored style`);
		} else if (V.PC.refreshmentType === 3) {
			r.push(`a line of ${V.PC.refreshment} and the necessary implements`);
		} else if (V.PC.refreshmentType === 4) {
			r.push(`a syringe of ${V.PC.refreshment} and the necessary implements`);
		} else if (V.PC.refreshmentType === 5) {
			r.push(`a bottle of ${V.PC.refreshment}`);
		} else if (V.PC.refreshmentType === 6) {
			r.push(`several sheets of ${V.PC.refreshment}`);
		}
		if (eventSlave.preg > eventSlave.pregData.normalBirth / 1.33) {
			r.push(`on a tray carefully held against ${his} pregnant belly, doing ${his} best to will ${his} ${children} to not kick the tray off balance.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`on a tray carefully held against ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly.`);
		} else {
			r.push(`on a tray.`);
		}
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} comes to a stop right beside your elbow, waiting for further direction, just as ${he}'s been trained to do in these cases.`);
		if (getLimbCount(eventSlave, 102) > 2) {
			r.push(`As ${he} maintains ${his} posture obediently, ${his} P-Limbs produce minute machine noises. They allow ${him} good coordination, but their gyros and servomotors are constantly working to maintain it, which means that when ${he} stands still, they're not perfectly quiet.`);
		} else if (eventSlave.boobs > 4000) {
			r.push(`${His} breasts are so massive that ${he}'s got the tray more or less balanced on top of them. As ${he} breathes, ${his} tits rise and fall slightly,`);
			if (V.PC.refreshmentType === 0) {
				r.push(`causing the ${V.PC.refreshment} collection to roll from side to side.`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`causing ripples in the bottle of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`threatening to knock the ${V.PC.refreshment} from it's plate.`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`disturbing the lines of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`causing the syringes of ${V.PC.refreshment} to roll from side to side.`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`rattling the ${V.PC.refreshment} in its bottle.`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`threatening to knock the sheets of ${V.PC.refreshment} off the tray.`);
			}
		} else if (eventSlave.preg > eventSlave.pregData.normalBirth / 1.33) {
			r.push(`${He} keeps the tray balanced atop ${his} ${belly} pregnancy, though the weight encourages ${his} ${children} to begin kicking. As you glance over at ${him}, ${he} lets out a minute, tired sigh, as kicks from ${his} ${children}`);
			if (V.PC.refreshmentType === 0) {
				r.push(`cause the ${V.PC.refreshment} collection to roll from side to side.`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`cause ripples in the bottle of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`threaten to knock the ${V.PC.refreshment} from it's plate.`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`disturb the lines of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`cause the syringes of ${V.PC.refreshment} to roll from side to side.`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`rattle the ${V.PC.refreshment} in its bottle.`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`threaten to knock the sheets of ${V.PC.refreshment} off the tray.`);
			}
		} else if (eventSlave.belly >= 10000) {
			r.push(`${His}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly is big enough that ${he}'s got the tray more or less balanced on top of it. As you glance over at ${him}, ${he} lets out a minute, tired sigh,`);
			if (V.PC.refreshmentType === 0) {
				r.push(`causing the ${V.PC.refreshment} collection to roll from side to side.`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`causing ripples in the bottle of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`nearly rocking the ${V.PC.refreshment} from it's plate.`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`disturbing the lines of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`causing the syringes of ${V.PC.refreshment} to roll from side to side.`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`nearly tipping the bottle of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`threatening to blow the sheets of ${V.PC.refreshment} off the tray.`);
			}
		} else if (eventSlave.muscles > 30) {
			r.push(`With ${his} incredible musculature, ${he}'s able to maintain utter stillness in the perfect posture of an obedient slave. A naturally standing human makes some small movements, but ${his} strength allows ${him} to suppress them by setting muscle groups against each other. This has the ancillary benefit of making them stand out nicely.`);
		} else if (eventSlave.muscles < -30) {
			r.push(`${He} is so physically frail that ${he} can barely manage to hold the tray steady. As ${he} rapidly tires, ${his} ${hasBothArms(eventSlave) ? "arms begin slightly shaking" : "arm begins to slightly shake"},`);
			if (V.PC.refreshmentType === 0) {
				r.push(`causing the ${V.PC.refreshment} collection to roll from side to side.`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`causing ripples in the bottle of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`threatening to knock the ${V.PC.refreshment} from it's plate.`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`disturbing the lines of ${V.PC.refreshment}.`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`causing the syringes of ${V.PC.refreshment} to roll from side to side.`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`rattling the ${V.PC.refreshment} in its bottle.`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`threatening to knock the sheets of ${V.PC.refreshment} off the tray.`);
			}
		} else if (eventSlave.energy > 95) {
			r.push(`${He}'s controlling ${his} absurd sex drive for the moment, but ${he} clearly wouldn't mind some sex as part of the delivery.`);
			if (eventSlave.dick > 0) {
				if (canAchieveErection(eventSlave)) {
					r.push(`${His} cock is painfully erect,`);
				} else {
					r.push(`${His} soft dick is dribbling precum,`);
				}
			} else if (eventSlave.vagina === -1) {
				r.push(`${He}'s unconsciously presenting ${his} bottom,`);
			} else {
				r.push(`${His} pussy is visibly soaked,`);
			}
			r.push(`showing unmistakably how badly ${he} needs release.`);
		} else {
			r.push(`${He} keeps ${his}`);
			if (canSee(eventSlave)) {
				r.push(App.Desc.eyesColor(eventSlave));
			} else {
				r.push(`face`);
			}
			r.push(`slightly downcast, ${his} back arched, ${his} chest pressed outward, and ${his} bottom stuck out a bit. ${He}'s the perfect picture of an obedient little sex slave`);
			if (eventSlave.height > 185) {
				r.push(`(though, of course, ${he}'s anything but physically small)`);
			}
			r.push(r.pop() + `.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Enjoy some oral with your refreshments`, oral),
			canDoAnal(eventSlave)
				? new App.Events.Result(`Show ${him} a special way to enjoy refreshments`, special)
				: new App.Events.Result(),
			V.PC.refreshmentType === 0
				? new App.Events.Result(`Put your ${V.PC.refreshment} out on ${him}`, put)
				: new App.Events.Result(),
		]);

		function oral() {
			r = [];
			r.push(`There were many things about being an arcology owner you didn't properly understand before you became one. One of the smallest and yet most enjoyable is the unlimited availability of`);
			if (V.PC.refreshmentType === 0) {
				r.push(`a good ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`a glass of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`a plate of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`a syringe of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`bottles of ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`tabs of ${V.PC.refreshment}`);
			}
			r.push(`and`);
			if (V.PC.dick !== 0) {
				r.push(`a blowjob`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				r.push(`some cunnilingus`);
			}
			r.push(r.pop() + ".");
			r.push(`Turning to ${eventSlave.slaveName}, you`);
			if (V.PC.refreshmentType === 0) {
				r.push(`select a ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`pour yourself some ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`serve yourself a plate of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`prepare a line of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`select a syringe of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`carefully tap out enough pills of ${V.PC.refreshment} to satisfy you,`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`carefully pick up a tab of ${V.PC.refreshment},`);
			}
			r.push(`relieve the slave of the tray, and`);
			if (!canSee(eventSlave) && canHear(eventSlave)) {
				r.push(`audibly`);
			}
			r.push(`widen your legs slightly`);
			if (V.PC.belly >= 5000) {
				r.push(`as you slide forward`);
			}
			r.push(`in your chair. ${He}`);
			if (!canSee(eventSlave) && !canHear(eventSlave)) {
				r.push(`needs a little tug to catch your order, but ${he}`);
			}
			if (eventSlave.belly >= 300000) {
				r.push(`gently leans onto ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			} else if (eventSlave.belly >= 5000) {
				r.push(`gently lowers ${his}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(`swollen`);
				}
				r.push(`body to its knees`);
			} else {
				r.push(`immediately drops to ${his} knees`);
			}
			r.push(`and gets to work,`);
			if (eventSlave.skill.oral >= 100) {
				r.push(`using all of ${his} mastery in giving oral pleasure.`);
			} else if (eventSlave.skill.oral > 60) {
				r.push(`using all of ${his} skills in giving oral pleasure.`);
			} else {
				r.push(`doing ${his} best despite ${his} mediocre oral skills.`);
			}
			if (eventSlave.teeth === "pointy") {
				r.push(`You can feel the extreme care ${he} has to take to keep ${his} shark-like teeth clear of you.`);
			} else if (eventSlave.lips > 40) {
				r.push(`${His} huge lips are soft and pillowy against you.`);
			} else if (eventSlave.teeth === "fangs") {
				r.push(`You can feel the slight hesitations as ${he} takes care to not poke you with ${his} fangs.`);
			} else if (eventSlave.teeth === "fang") {
				r.push(`${His} fang adds some thrill as it rubs against you.`);
			} else if (eventSlave.teeth === "gapped") {
				r.push(`You can feel the slight hesitations as ${he} takes care to not pinch you between ${his} front teeth.`);
			} else if (eventSlave.teeth === "straightening braces" || eventSlave.teeth === "cosmetic braces") {
				r.push(`You can feel the slight hesitations as ${he} takes care to keep ${his} braces off you.`);
			}
			r.push(`You take your time,`);
			if (V.PC.refreshmentType === 0) {
				r.push(`smoking meditatively`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`taking meditative sips`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`taking meditative bites`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`enjoying your ${V.PC.refreshment} high`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`injecting a fix into your arm`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`popping a few ${V.PC.refreshment}`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`holding the tab under your tongue`);
			}
			r.push(`and running a thoughtful hand`);
			if (eventSlave.hLength > 1) {
				r.push(`through ${eventSlave.slaveName}'s ${eventSlave.hColor} hair`);
			} else {
				r.push(`across ${eventSlave.slaveName}'s scalp`);
			}
			r.push(`while you look at the view out your office windows. This isn't the first time you've done this, nor will it be the last, and ${eventSlave.slaveName} is <span class="devotion inc">used to being used as a serving ${girl}.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function special() {
			r = [];
			if (V.PC.refreshmentType !== 2) {
				r.push(`You tell ${him} to hop up on the desk. ${He} obeys promptly,`);
				if (eventSlave.energy > 95) {
					r.push(`already starting to pant.`);
				} else {
					if (canSee(eventSlave)) {
						r.push(`watching you closely`);
					} else if (canHear(eventSlave)) {
						r.push(`listening closely`);
					} else {
						r.push(`waiting`);
					}
					r.push(`for further instructions.`);
				}
				r.push(`To ${his} complete lack of surprise, you tell ${him} to pull ${his} legs back and spread ${his} ${canDoVaginal(eventSlave) ? `holes` : "hole"}. As ${he} opens ${himself} for you, ${he}`);
				if (canSee(eventSlave)) {
					r.push(`sees`);
				} else if (canHear(eventSlave)) {
					r.push(`hears`);
				} else {
					r.push(`senses`);
				}
				r.push(`that you're doing something with`);
				if (V.PC.refreshmentType === 0) {
					r.push(`the ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 1) {
					r.push(`the bottle of ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 2) {
					r.push(`the plate of ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 3) {
					r.push(`the bag of ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 4) {
					r.push(`the syringe of ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 5) {
					r.push(`the bottle of ${V.PC.refreshment},`);
				} else if (V.PC.refreshmentType === 6) {
					r.push(`the tabs of ${V.PC.refreshment},`);
				}
				r.push(`and`);
				if (eventSlave.trust > 50) {
					r.push(`relaxes, trusting you completely.`);
				} else {
					r.push(`does ${his} best to relax.`);
				}
				r.push(`${He} gasps when ${he} feels`);
				if (V.PC.refreshmentType === 0) {
					r.push(`the head of the lit ${V.PC.refreshment}, warm from your mouth, being gently inserted into ${his}`);
					if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`asshole.`);
					}
					r.push(`You give ${him} precise muscular instructions, which ${he} does ${his} best to obey, and before long, ${he}'s slowly smoking it using ${his} fuckhole. ${His} body is very permeable there, and the effects of the it hit ${him} very quickly.`);
				} else if (V.PC.refreshmentType === 1) {
					r.push(`the cool tip of a small enema bulb being gently inserted into ${his} ass. You press the ${V.PC.refreshment} into ${him} slowly. You didn't give ${him} much, but ${his} body is very permeable there, and the effects hit ${him} very quickly.`);
				} else if (V.PC.refreshmentType === 3) {
					r.push(`${V.PC.refreshment} being gently inserted into ${his} ass. You didn't give ${him} much, but ${his} body is very permeable there, and the effects hit ${him} very quickly.`);
				} else if (V.PC.refreshmentType === 4) {
					r.push(`the tip of the syringe penetrate ${his}`);
					if (eventSlave.dick > 0) {
						r.push(`cock head`);
					} else if (eventSlave.vagina === -1) {
						r.push(`tiny front hole`);
					} else {
						r.push(`clit`);
					}
					r.push(`and the sting of the contents being forced into ${his} sex organ. You didn't give ${him} much, but ${his} body is very sensitive there, and the effects hit ${him} very quickly.`);
				} else if (V.PC.refreshmentType === 5) {
					r.push(`your finger pushing a pill deep into ${his}`);
					if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`asshole.`);
					}
					r.push(`You didn't give ${him} much, but ${his} body is very sensitive there, and the effects hit ${him} very quickly.`);
				} else if (V.PC.refreshmentType === 6) {
					r.push(`finger pushing a tab into ${his}`);
					if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
						r.push(`pussy.`);
					} else {
						r.push(`asshole.`);
					}
					r.push(`You didn't give ${him} much, but it quickly dissolves and ${his} body is very sensitive there, so the effects hit ${him} very quickly.`);
				}
				r.push(`You go back to work, letting the slave loll around on your desk, enjoying the effects. You reflect that it's probably some kind of milestone in wealth that you're willing to throw the good stuff around like this. When ${he}'s had time to reflect on the strange incident, ${he} <span class="trust inc">resolves to trust you more in the future,</span> since it can be fun.`);
			} else {
				r.push(`You tell ${him} to hop up on the desk and face you. ${He} obeys promptly,`);
				if (eventSlave.energy > 95) {
					r.push(`already starting to pant.`);
				} else {
					if (canSee(eventSlave)) {
						r.push(`watching you closely`);
					} else if (canHear(eventSlave)) {
						r.push(`listening closely`);
					} else {
						r.push(`waiting`);
					}
					r.push(`for further instructions.`);
				}
				r.push(`To ${his} surprise, you`);
				if (V.PC.boobs >= 300) {
					r.push(`unfasten your top, freeing your breasts, and`);
				}
				r.push(`uncover your`);
				if (V.PC.dick !== 0) {
					r.push(`stiffening cock`);
					if (V.PC.vagina !== -1) {
						r.push(`and moistening pussy`);
					}
				} else {
					r.push(`moistening pussy`);
				}
				r.push(r.pop() + ".");
				r.push(`Taking some ${V.PC.refreshment} in your fingers, you massage it onto your erect`);
				if (V.PC.dick !== 0 && V.PC.boobs >= 300) {
					r.push(`nipples and dick`);
				} else if (V.PC.vagina !== -1 && V.PC.boobs >= 300) {
					r.push(`nipples and clit`);
				} else if (V.PC.dick !== 0) {
					r.push(`dick`);
				} else {
					r.push(`clit`);
				}
				r.push(`making sure to cover yourself completely. You recline in your seat, beckoning to ${eventSlave.slaveName} to lick you clean. ${He} eagerly complies, eager to get a`);
				if (canTaste(eventSlave)) {
					r.push(`taste`);
				} else {
					r.push(`bit`);
				}
				r.push(`of ${V.PC.refreshment} after nothing but slave food for so long.`);
				if (eventSlave.skill.oral > 60) {
					r.push(`${He} is extremely skilled with ${his} tongue; before long, not only are you completely cleaned, but you can barely feel your crotch from ${his} masterful sucking.`);
				} else if (eventSlave.skill.oral > 30) {
					r.push(`${He} is quite skilled with ${his} tongue; before long, you are both cleaned off and enjoying some ${V.PC.refreshment} after the powerful orgasm ${he} coaxed out of you.`);
				} else if (eventSlave.skill.oral > 10) {
					r.push(`${He} has basic skill with ${his} tongue; before long, you are nearly cleaned of all the ${V.PC.refreshment}. With one final lick, ${he} takes the last`);
					if (canTaste(eventSlave)) {
						r.push(`taste`);
					} else {
						r.push(`drop`);
					}
					r.push(`of it and brings you to climax at the same time.`);
				} else {
					r.push(`${He} has no idea how to make this pleasurable; ${he} is merely greedily lapping up the ${V.PC.refreshment} off your body. As ${he} nears finishing your crotch, you grab ${his} head and hold ${him} to yourself until you are satisfied with ${his} licking.`);
				}
				r.push(`You go back to work, letting the slave sit back on your desk, licking ${his} lips of the combined`);
				if (canTaste(eventSlave)) {
					r.push(`taste`);
				} else {
					r.push(`feeling`);
				}
				r.push(`of you and ${V.PC.refreshment}. You reflect that it's probably some kind of milestone in wealth that you're willing to throw the good stuff around like this. When ${he}'s had time to reflect on the strange incident, ${he} <span class="trust inc">resolves to trust you more in the future,</span> since it can be fun`);
				if (canTaste(eventSlave)) {
					r.push(`and tasty`);
				}
				r.push(r.pop() + `.`);
				if (V.PC.dick !== 0) {
					seX(eventSlave, "oral", V.PC, "penetrative");
				}
				if (V.PC.vagina >= 0) {
					seX(eventSlave, "oral", V.PC, "vaginal");
				}
			}
			eventSlave.trust += 4;
			return r;
		}

		function put() {
			r = [];
			r.push(`You select a ${V.PC.refreshment} and start smoking, ordering ${him} to stick around and get ${his} tits out. ${He} sees nothing too unusual about this, and obeys complaisantly, standing beside you with ${his} breasts bare. You reach over and play with ${him} as you smoke, teasing ${his}`);
			if (eventSlave.nipples === "huge") {
				r.push(`massive, erect nipples.`);
			} else if (eventSlave.nipples === "inverted") {
				r.push(`painfully tender inverted nipples.`);
			} else if (eventSlave.nipples === "partially inverted") {
				r.push(`tender, partially inverted nipples.`);
			} else if (eventSlave.nipples === "fuckable") {
				r.push(`nipplecunts with your fingers.`);
			} else if (eventSlave.lactation > 0) {
				r.push(`motherly nipples.`);
			} else {
				r.push(`nipples and playing with ${his} boobs.`);
			}
			r.push(`Deciding that you're done with the ${V.PC.refreshment}, you pull a long draw of smoke into your mouth, bringing the coal at its foot to a fine glow. Then you pull it out of your mouth and press it against the slave's defenseless ${eventSlave.skin}`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				r.push(`pregnant belly.`);
			} else {
				r.push(`breast.`);
			}
			if (eventSlave.voice === 0) {
				r.push(`${He} makes the horrible rasping noise that ${his} mute throat substitutes for screams of agony,`);
			} else {
				r.push(`${He} shrieks with agony,`);
			}
			r.push(`flinching away instinctively, and collapses to the`);
			if (eventSlave.fetish === "masochist") {
				r.push(`ground, orgasming from the sudden rush of stimulation`);
			} else {
				r.push(`ground.`);
			}
			const target = eventSlave.preg > eventSlave.pregData.normalBirth / 2 ? "stomach": "breast";
			r.push(`Writhing in pain, ${he} cherishes the burn on ${his} ${target} with ${hasBothArms(eventSlave) ? "both hands" : `${his} hand`},`);
			r.push(`${his} sobbing only interrupted by ragged gasps for breath. You order ${him} to go get ${his} burn looked at, and go back to your work. ${He} scrabbles toward the door, weeping,`);
			if (eventSlave.fetish === "masochist") {
				r.push(`horrified at ${himself} for getting off to that, <span class="devotion inc">more convinced than ever that ${he}'s a pain slut,</span> and yet`);
				eventSlave.devotion += 4;
				eventSlave.fetishKnown = 1;
			}
			r.push(`<span class="trust dec">eager to get away.</span>`);
			eventSlave.trust -= 5;
			if (random(0, 100) > 25) {
				App.Medicine.Modification.addScar(eventSlave, target, "burn");
			}
			return r;
		}
	}
};
