// cSpell:ignore pened

App.Events.RESSCoolerLockin = class RESSCoolerLockin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canHear,
				canSee,
				s => s.devotion <= 95,
				s => [Job.QUARTER, Job.HOUSE].includes(s.assignment),
				s => s.intelligence + s.intelligenceImplant < -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`You're circulating in ${V.clubName}, looking over your holdings but mostly just letting yourself be seen, when your personal assistant quietly alerts you.`);
		if (V.assistant.personality <= 0) {
			r.push(`"${properTitle()},"`);
		} else {
			r.push(`"Baby,"`);
		}
		r.push(`${heA} says,"`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`can't get out of the refrigerator."`);
		if (V.assistant.personality <= 0) {
			r.push(`The personal assistant explains the absurd statement: "${He}'s been assigned to get some items out of the walk-in refrigerator. ${He} accidentally let the door shut behind ${him}, didn't notice, took too long in there, and is now too chilled to figure out the emergency release. I can unlock it remotely, or you can let ${him} out yourself."`);
		} else {
			r.push(`Chuckling, your personal assistant explains the absurd statement: "The silly ${girl}'s been assigned to get some things out of the walk-in refrigerator. ${He} accidentally let the door shut behind ${him}, didn't notice, took too long in there, and is now too chilled to figure out the emergency release. I can unlock it remotely, or you can head over and have some fun with ${him}."`);
		}
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`The walk-in cooling unit is designed for the refrigeration of food for you and guests only, since the slaves drink a nutritive fluid that doesn't require it. Only servants ever have any reason to be in there, but ${he} was indeed instructed to fetch out some beverages necessary for an entertainment you have planned. It's cool in there, but not freezing, so ${he}'s in no immediate danger.`]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Just direct ${V.assistant.name} to let ${him} out`, direct),
			new App.Events.Result(`Let ${him} out yourself`, yourself),
			new App.Events.Result(`Punish ${him} for ${his} forgetfulness`, punish, virginityWarning()),
		]);


		function direct() {
			r = [];
			r.push(`${capFirstChar(V.assistant.name)} unlatches the cooler door remotely, and admonishes ${eventSlave.slaveName}. The chilled slave scampers out of the cold air, rubbing ${his}`);
			if (eventSlave.bellyPreg >= 1500) {
				r.push(`${belly} pregnant belly's`);
			}
			r.push(`${eventSlave.skin} skin to get some warmth back into it. ${He}'s too cold to do much more than nod dumbly at ${V.assistant.name}'s review of how to operate the release, but ${he}'s much more careful the next time ${he}'s sent in there.`);
			return r;
		}

		function yourself() {
			r = [];
			r.push(`You're not close to the penthouse kitchen area, so it takes you some time to make your way there. By the time you get there, the poor ${girl} is pounding weakly against the refrigerator door to try to get someone's attention. ${capFirstChar(V.assistant.name)} was right, ${he} must be too cold to think straight; if ${he} weren't ${he} might notice the prominent release button right next to where ${he}'s striking the door. ${His} desperate ${eventSlave.skin} face is visible in the window. You hit the exterior release and the door swings open quickly, dumping ${him} into your arms.`);
			if (eventSlave.devotion < -50) {
				r.push(`Despite hating you, <span class="devotion inc">${he} clings to you like a long lost love,</span> ${his}`);
				eventSlave.devotion += 6;
			} else if (eventSlave.devotion <= 20) {
				r.push(`Despite not being devoted to you, <span class="devotion inc">${he} clings to you like a long lost love,</span> ${his}`);
				eventSlave.devotion += 4;
			} else {
				r.push(`${He} clings to ${his} savior, ${his}`);
			}
			if (eventSlave.height >= 185) {
				r.push(`big cold`);
			} else if (eventSlave.height >= 160) {
				r.push(`cold`);
			} else {
				r.push(`cold little`);
			}
			if (eventSlave.belly >= 1500) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 1500) {
					r.push(`pregnant`);
				}
			}
			r.push(`body shaking convulsively. ${He} tries to burrow even`);
			if (V.PC.boobs >= 650) {
				r.push(`deeper between your breasts,`);
			} else {
				r.push(`closer to you,`);
			}
			r.push(`soaking up your warmth.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} gestures ${his} thanks shakily.`);
			} else {
				r.push(
					Spoken(eventSlave, `"T-t-thank y-you, ${Master}. I d-don't know what would have hap-p-pened if you hadn't come by,"`),
					`${he} ${say}s, teeth chattering.`
				);
			}
			r.push(`${He} clearly has no idea whatsoever that ${V.assistant.name} could have let ${him} out at any time. You rub your hands up and down ${his}`);
			if (eventSlave.weight > 160) {
				r.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				r.push(`soft`);
			} else if (eventSlave.muscles > 95) {
				r.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				r.push(`muscular`);
			} else if (eventSlave.muscles > 5) {
				r.push(`toned`);
			} else {
				r.push(`soft`);
			}
			r.push(`back, helping ${him} get warm. You point out the release handle and ${he} apologizes hastily for forgetting. Once ${he}'s warm you gently tell ${him} to get back to it, and give ${him} a gentle shove on ${his}`);
			if (eventSlave.butt > 5) {
				r.push(`massive ass.`);
			} else if (eventSlave.butt > 2) {
				r.push(`big butt.`);
			} else {
				r.push(`nice little butt.`);
			}
			r.push(`${He} <span class="trust inc">smiles gratefully</span> at you before heading back to get those drinks.`);
			eventSlave.trust += 4;
			return r;
		}

		function punish() {
			r = [];
			r.push(`You're not close to the penthouse kitchen area, so it takes you some time to make your way there. By the time you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`get there, the poor`);
			if (eventSlave.pregKnown === 1) {
				r.push(`pregnant`);
			}
			r.push(`${girl} is pounding weakly against the refrigerator door to try to get someone's attention. ${He} looks relieved when you open the door, but ${his} relief turns to ashes when you shut the door behind you. ${He} shivers with cold and fear as you sternly point out the release, high up on the door, and then demand ${his}`);
			if (hasBothArms(eventSlave)) {
				r.push(`hands. You bind them together and loop them over the release before hoisting ${his} legs off the ground so that ${his} back is against the cold metal door and all ${his} weight is hanging off the release by ${his} arms.`);
			} else {
				r.push(`hand. You bind it tightly and loop it over the release before hoisting ${his} legs off the ground so that ${his} back is against the cold metal door and all ${his} weight is hanging off the release by ${his} arm.`);
			}
			r.push(`${He} doesn't struggle until you tell ${him} ${he} can leave — if ${he} can get the release open like this. ${He} tries, but ${he} can't get enough leverage;`);
			if (canDoVaginal(eventSlave) || canDoAnal(eventSlave)) {
				r.push(`${his} spastic efforts get weaker as you pull ${his}`);
				if (eventSlave.butt > 5) {
					r.push(`massive ass`);
				} else if (eventSlave.butt > 2) {
					r.push(`big butt`);
				} else {
					r.push(`nice little butt`);
				}
				r.push(`away from the door and line`);
				if (V.PC.dick === 0) {
					r.push(`the strap-on`);
				} else {
					r.push(`your cock`);
				}
				r.push(`up with ${his}`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 2) {
						r.push(`loose pussy.`);
					} else if (eventSlave.vagina > 1) {
						r.push(`pussy.`);
					} else {
						r.push(`tight pussy.`);
					}
					VCheck.Vaginal(eventSlave, 1);
				} else {
					if (eventSlave.anus > 2) {
						r.push(`loose asspussy.`);
					} else if (eventSlave.anus > 1) {
						r.push(`asshole.`);
					} else {
						r.push(`tight little asshole.`);
					}
					VCheck.Anal(eventSlave, 1);
				}
				r.push(`Teeth chattering, legs shaking with cold, ${he} takes a ${!canDoVaginal(eventSlave) ? "butt" : ""}fuck in the cold cooler, hanging from what ${he} should have used to let ${himself} out.`);
			} else if (V.PC.dick === 0) {
				r.push(`${his} spastic efforts get weaker as you poke and prod ${his} sensitive areas with your strap-on. Teeth chattering, legs shaking with cold, ${he} takes your molestation in the cold cooler, hanging from what ${he} should have used to let ${himself} out.`);
			} else {
				r.push(`${his} spastic efforts get weaker when you take your dick in hand and warm yourself to a throbbing erection. Teeth chattering, legs shaking with cold, ${he} takes your load in the cold cooler, hanging from what ${he} should have used to let ${himself} out.`);
			}
			r.push(`When you finish, you hit it yourself and drop ${his} legs, letting ${him} unhook ${himself} and flee to the warmth outside. ${He} <span class="trust dec">begs your pardon</span> abjectly as ${he} rubs ${his}`);
			if (eventSlave.belly >= 5000) {
				r.push(`${belly} ${eventSlave.skin} belly`);
			} else {
				r.push(`${eventSlave.skin} shoulders`);
			}
			r.push(`to warm ${himself}`);
			if (V.PC.dick > 0) {
				r.push(`up, ignoring the cum`);
				if (canDoVaginal(eventSlave)) {
					if (eventSlave.vagina > 2) {
						r.push(`leaking out of ${his} broken-in vagina.`);
					} else if (eventSlave.vagina > 1) {
						r.push(`leaking out of ${his} parted vagina.`);
					} else {
						r.push(`filling ${his} still-tight vagina.`);
					}
				} else if (canDoAnal(eventSlave)) {
					if (eventSlave.anus > 2) {
						r.push(`leaking out of ${his} fucked-out anus.`);
					} else if (eventSlave.anus > 1) {
						r.push(`leaking out of ${his} now-gaped backdoor.`);
					} else {
						r.push(`filling ${his} still-tight anus.`);
					}
				} else {
					r.push(`dripping down ${his} body.`);
				}
			} else {
				r.push(`up.`);
			}
			eventSlave.trust -= 5;
			return r;
		}

		function virginityWarning() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
