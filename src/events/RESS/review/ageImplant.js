App.Events.RESSAgeImplant = class RESSAgeImplant extends App.Events.BaseEvent {
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
				s => s.assignment !== Job.QUARTER,
				s => s.physicalAge > 30,
				s => s.ageImplant > 0,
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");


		App.Events.addParagraph(node, [
			`In the morning the penthouse is a busy bustle of female energy. Slaves get up promptly, eat, shower, dress themselves, and head out to work. They chatter if able and allowed, and draw a good deal of strength from each other. As you pass by the kitchen, you are narrowly avoided by a rush of slaves heading to the showers. They're almost bouncing, feeding off each other's youthful energy. At the back of the pack is`,
			App.UI.DOM.combineNodes(contextualIntro(PC, eventSlave, true), `. ${He} looks as young as any of them, but after they're out, ${he} leans against the door frame for a moment and exhales slowly.`)
		]);
		let r = [];
		r.push(`${His} ${App.Desc.eyeColor(eventSlave)}-eyed gaze catches yours for a moment, and you are reminded that ${he} isn't as young as they are, not at all. ${His} face might look youthful, but ${his} eyes don't.`);
		if (canSee(eventSlave)) {
			r.push(`${He} sees your consideration, and murmurs,`);
		} else {
			r.push(`You make yourself known, and ${he} murmurs,`);
		}
		r.push(
			Spoken(eventSlave, `"Sorry, ${Master}. Just a little slow this morning."`),
			`${He} hurries after ${his} sisters, ${his}`
		);
		if (eventSlave.butt > 12) {
			r.push(`massive`);
		} else if (eventSlave.butt > 8) {
			r.push(`giant`);
		} else if (eventSlave.butt > 5) {
			r.push(`huge`);
		} else if (eventSlave.butt > 2) {
			r.push(`big`);
		} else {
			r.push(`pretty little`);
		}
		r.push(`naked ass catching your eye as ${he} goes.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Go out clubbing to make ${him} feel young again`, clubbing),
			new App.Events.Result(`Attend a sporting event with ${him}`, sporting),
			new App.Events.Result(`Put the old whore in ${his} place`, old, (eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) ? `This option will take ${his} virginity` : null),
		]);

		function clubbing() {
			r = [];
			r.push(`You call out to stop ${him}, and ${he} turns obediently to listen; you tell ${him} to take the day off and meet you that evening for a trip to ${V.arcologies[0].name}'s most fashionable nightclub. You emphasize slightly that it's a place you prefer to enjoy with a young slave, and ${his} eyes widen a little at the implied compliment and challenge. Right at the proper time, ${he} arrives in your office wearing neon ${eventSlave.hColor} makeup to match ${his} hair, and a tiny iridescent club${girl} outfit of the same color. The hem of the skirt is barely low enough to conceal ${him}`);
			if (eventSlave.dick > 0) {
				r.push(`dick,`);
			} else if (eventSlave.vagina === -1) {
				r.push(`total lack of private parts,`);
			} else {
				r.push(`pussy,`);
			}
			r.push(`and it's backless. The front is held up by a halter around ${his} pretty neck, and is`);
			if (eventSlave.boobs > 2000) {
				r.push(`specially tailored to cover ${his} massive tits`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`strained by ${his} big tits`);
			} else if (eventSlave.boobs > 300) {
				r.push(`tightly filled by ${his} healthy tits`);
			} else {
				r.push(`tight against ${his} flat chest`);
			}
			if (eventSlave.belly >= 1500) {
				r.push(`and ${belly}`);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			}
			r.push(r.pop() + `. ${He} makes a gaudy and very fashionable spectacle, and in response to your`);
			if (canSee(eventSlave)) {
				r.push(`look`);
			} else if (canHear(eventSlave)) {
				r.push(`whistle`);
			} else {
				r.push(`gentle poke`);
			}
			r.push(`${he} raises`);
			if (!hasAnyArms(eventSlave)) {
				r.push(`the stumps of ${his} arms ever so slightly`);
				if (hasBothArms(eventSlave)) {
					r.push(`both arms`);
				} else {
					r.push(`${his} arm`);
				}
				r.push(`over ${his} head`);
			}
			r.push(
				`and twirls, shimmying ${his} body deliciously.`,
				Spoken(eventSlave, `"I hope they let me into the club without checking my I.D., ${Master},"`),
				`${he} jokes, for which ${he} receives a swat on ${his} rear as you head out. With the full day of rest, ${he} is full of vigor and ready to dance. ${He} eagerly heads out onto the floor with you,`);
			if (eventSlave.skill.entertainment >= 100) {
				r.push(`masterfully moving ${his}`);
				if (eventSlave.belly >= 1500) {
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`rounded`);
					}
				}
				r.push(`body to the heavy beat, grabbing the attention of all the men and most of the women in ${V.clubName}.`);
			} else if (eventSlave.skill.entertainment > 60) {
				r.push(`expertly moving ${his}`);
				if (eventSlave.belly >= 1500) {
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`rounded`);
					}
				}
				r.push(`body to the heavy beat, mesmerizing ${his} neighbors on the floor.`);
			} else if (eventSlave.skill.entertainment > 30) {
				r.push(`skillfully moving ${his}`);
				if (eventSlave.belly >= 1500) {
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`rounded`);
					}
				}
				r.push(`body to the heavy beat, drawing a lustful gaze or two.`);
			} else {
				r.push(`clumsily moving`);
				if (eventSlave.belly >= 1500) {
					if (eventSlave.bellyPreg >= 1500) {
						r.push(`gravid`);
					} else {
						r.push(`rounded`);
					}
				}
				r.push(`${his} body to the heavy beat, attracting little notice among the press of novices.`);
			}
			r.push(`It doesn't take long for ${him} to back ${himself} into you so ${he} can grind; ${he} cranes ${his} neck back to plant an <span class="devotion inc">earnest kiss</span> on your chin.`);
			eventSlave.devotion += 4;
			return r;
		}

		function sporting() {
			const frag = document.createDocumentFragment();
			r = [];
			r.push(`You call out to stop ${him}, and ${he} turns obediently to listen; you tell ${him} ${he}'ll be spending the day with you at a game outside the arcology, and ${he}'s to meet you at your VTOL pad in two hours. ${He} ponders for a moment but clearly understands this is related to ${his} age, somehow. Right at the proper time, ${he} arrives on the pad. ${He}'s clearly spent the whole time getting the right clothing; somehow ${he} used the clothing inventory system to find a cheerleader uniform from the home team. It's one size too small, though you're unsure whether this is intentional or not. The hem of the pleated cheerleader skirt is barely low enough to conceal ${his}`);
			if (eventSlave.dick > 0) {
				r.push(`dick,`);
			} else if (eventSlave.vagina === -1) {
				r.push(`lack of private parts,`);
			} else {
				r.push(`pussy,`);
			}
			r.push(`and ${he} bounces a little on ${his} heels for you to show off how ${he}'s going commando underneath it. ${His}`);
			if (eventSlave.belly >= 100000) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
			} else if (eventSlave.weight > 130) {
				r.push(`hugely soft`);
			} else if (eventSlave.belly >= 1500) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
			} else if (eventSlave.muscles > 30) {
				r.push(`ripped`);
			} else if (eventSlave.weight > 30) {
				r.push(`fat`);
			} else if (eventSlave.weight > 10) {
				r.push(`plush`);
			} else {
				r.push(`taut`);
			}
			r.push(`midriff is bare. The top`);
			if (eventSlave.boobs > 2000) {
				r.push(`somehow contains ${his} tits, with the team's logo at least`);
				if (V.showInches === 2) {
					r.push(`three feet`);
				} else {
					r.push(`a meter`);
				}
				r.push(`wide across ${his} chest.`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`is a great location for the team's logo, since ${his} tits allow it to be quite large.`);
			} else if (eventSlave.boobs > 300) {
				r.push(`is a good location for the team's logo, since ${his} tits allow it to be pretty big.`);
			} else {
				r.push(`flatters ${his} flat chest, especially with the team logo over it.`);
			}
			r.push(`${He} even found a pair of appropriately colored pom-poms somewhere. The implicit message about age was understood; ${he}'s made up to look even younger.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You have a front-row seat, of course, and ${he} excitedly takes ${his} place beside you,`);
			if (eventSlave.butt > 12) {
				r.push(`thankful that you reserved a seat for both of ${his} massive cheeks.`);
			} else if (eventSlave.belly >= 300000) {
				r.push(`thankful that the front row has plenty of room for ${his} ${belly} belly to occupy.`);
			} else if (eventSlave.butt > 6) {
				r.push(`carefully fitting ${his} big bottom into the seat.`);
			} else if (eventSlave.boobs > 4000) {
				r.push(`${his} absurd boobs rubbing against your arm.`);
			}
			r.push(`${He} cheers lustily at all the right moments, earning repeated crowd focus shots on the big screen; many fans wonder who their ridiculously hot fellow fan is before <span class="reputation inc">recognizing you,</span> putting two and two together, and realizing enviously that ${he}'s your sex slave. Since this is the Free Cities, the big screen gives ${him} more attention rather than cutting away when ${he} intentionally cheers hard enough that ${his} skirt rides up.`);
			if (eventSlave.broodmother === 2 && eventSlave.preg >= 36) {
				r.push(`The only slightly embarrassing incident is when ${he}'s standing up to rally the crowd behind ${him}, facing away from the game and goes into labor on another of ${his} brood; the contractions forcing ${him} to lean forward onto ${his} ${belly} stomach and give the players below a clear view of ${his} crowning child.`);
			} else if (eventSlave.belly < 300000) {
				r.push(`The only slightly embarrassing incident is when ${he}'s standing up to rally the crowd behind ${him}, facing away from the game and bending down to show cleavage to the stands in such a way that ${his}`);
				if (eventSlave.butt > 5) {
					r.push(`massive ass`);
				} else if (eventSlave.butt > 2) {
					r.push(`big butt`);
				} else {
					r.push(`nice ass`);
				}
				r.push(`lifts ${his} skirt up enough that the players below can clearly see ${his}`);
				if (eventSlave.anus > 2) {
					r.push(`big slit of an asspussy`);
				} else if (eventSlave.anus > 1) {
					r.push(`nice asspussy`);
				} else if (eventSlave.anus > 0) {
					r.push(`tight asshole`);
				} else {
					r.push(`virgin asshole`);
				}
				if (eventSlave.vagina > 3) {
					r.push(`and gaping pussy`);
				} else if (eventSlave.vagina > 2) {
					r.push(`and used pussy`);
				} else if (eventSlave.vagina > 1) {
					r.push(`and lovely pussy`);
				} else if (eventSlave.vagina > 0) {
					r.push(`and tight pussy`);
				} else if (eventSlave.vagina === 0) {
					r.push(`and virgin pussy`);
				}
				r.push(r.pop() + `.`);
			} else {
				r.push(`The only slightly embarrassing incident is when ${he}'s standing up to rally the crowd behind ${him}, cheering while swinging ${his} absurd belly back and forth and accidentally smashes into a concession vendor, sending them to the floor. ${His} efforts to help him up forces ${him} to stand in such a way that ${his}`);
				if (eventSlave.butt > 5) {
					r.push(`massive ass`);
				} else if (eventSlave.butt > 2) {
					r.push(`big butt`);
				} else {
					r.push(`nice ass`);
				}
				r.push(`lifts ${his} skirt up enough that the players below can clearly see ${his}`);
				if (eventSlave.anus > 2) {
					r.push(`big slit of an asspussy`);
				} else if (eventSlave.anus > 1) {
					r.push(`nice asspussy`);
				} else if (eventSlave.anus > 0) {
					r.push(`tight asshole`);
				} else {
					r.push(`virgin asshole`);
				}
				if (eventSlave.vagina > 3) {
					r.push(`and gaping pussy`);
				} else if (eventSlave.vagina > 2) {
					r.push(`and used pussy`);
				} else if (eventSlave.vagina > 1) {
					r.push(`and lovely pussy`);
				} else if (eventSlave.vagina > 0) {
					r.push(`and tight pussy`);
				} else if (eventSlave.vagina === 0) {
					r.push(`and virgin pussy`);
				}
				r.push(r.pop() + `.`);
			}
			r.push(`A player from the visiting team is distracted enough to blow a play. Any fans who might have been inclined to disapprove forget their objections when the home team capitalizes on the mistake to score.`);
			repX(500, "event", eventSlave);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function old() {
			let didVaginal = false;
			let didAnal = false;
			r = [];
			r.push(`You call out to stop ${him}, and ${he} turns obediently to listen. You tell ${him} you're interested to see if ${his} old body can still perform. Something about the way you say 'old' makes ${him} flinch, and ${he}'s right to worry. You tell ${him} to go out and make you ${cashFormat(200)}, and to hurry back if ${he} wants to avoid punishment. ${He} hesitates for an instant before hurrying outside. A few hours later you check on ${him} remotely. The feed shows ${him}`);
			if (eventSlave.belly >= 10000) {
				r.push(`waddle`);
			} else {
				r.push(`walk`);
			}
			r.push(`quickly up to a couple out on the street; you can't hear what's said, but ${he}`);
			if (canDoAnal(eventSlave) || canDoVaginal(eventSlave)) {
				r.push(`turns around to rub ${his} bare butt against the crotch of the man's pants. He pulls them down and fucks ${him} right there`);
				if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
					r.push(`<span class="virginity loss">taking ${his} virginity,</span>`);
					didVaginal = true;
				} else if (canDoAnal(eventSlave) && eventSlave.anus === 0) {
					r.push(`<span class="virginity loss">taking ${his} anal virginity,</span>`);
					didAnal = true;
				}
				r.push(`as the woman`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`pulls and abuses`);
				} else {
					r.push(`roughly fingers`);
				}
				r.push(`${his} poor nipples. Boring of this, he switches to torturing the poor slave's`);
				if (eventSlave.dick > 0) {
					r.push(`dick,`);
				} else if (eventSlave.vagina === -1) {
					r.push(`butthole,`);
				} else {
					r.push(`pussy,`);
				}
				r.push(`slapping ${him} until ${he} cries and then making out with the weeping whore. Much later, ${eventSlave.slaveName} limps tiredly into your office and gives you your <span class="cash inc"> ${cashFormat(200)}.</span> You ask ${him} how ${he}'s feeling, and ${he} mumbles,`,
					Spoken(eventSlave, `"I'm OK, ${Master}. Holes are pretty sore though. Kinda loose."`)
				);
			} else {
				r.push(`drops to ${his} ${hasBothLegs(eventSlave) ? "knees" : "knee"} to nuzzle against the man's pants. He pulls them down and facefucks ${him} right there, as the woman`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`pulls and abuses`);
				} else {
					r.push(`roughly fingers`);
				}
				r.push(`${his} poor nipples. Boring of this, ${he} switches to torturing the poor slave's`);
				if (eventSlave.dick > 0) {
					r.push(`dick,`);
				} else if (eventSlave.vagina === -1) {
					r.push(`butthole,`);
				} else {
					r.push(`pussy,`);
				}
				r.push(`slapping ${him} until ${he} cries and then making out with the weeping whore. Much later, ${eventSlave.slaveName} limps tiredly into your office and gives you your <span class="cash inc">${cashFormat(200)}.</span> You ask ${him} how ${he}'s feeling, and ${he} mumbles,`,
					Spoken(eventSlave, `"I'm OK, ${Master}. My jaw kinda hurts and my legs are really sore."`)
				);
			}
			r.push(`You tell ${him} that's of little concern, since ${he} has relatively few years of use left: you may as well extract what value you can from ${him}. ${He}'s too exhausted to hide ${his} response, and collapses, <span class="trust dec">sobbing.</span>`);
			cashX(200, "event", eventSlave);
			eventSlave.trust -= 5;
			if (didAnal) {
				eventSlave.anus++;
				seX(eventSlave, "anal", "public", "penetrative");
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 1, -2));
				}
			} else if (didVaginal) {
				eventSlave.vagina++;
				seX(eventSlave, "vaginal", "public", "penetrative");
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 0, -2));
				}
			} else if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative");
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 0, -2));
				}
			} else if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", "public", "penetrative");
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					r.push(knockMeUp(eventSlave, 10, 1, -2));
				}
			} else {
				seX(eventSlave, "oral", "public", "penetrative");
			}
			return r;
		}
	}
};
