App.Events.eliteTakeOver = class eliteTakeOver extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => FutureSocieties.isActive('FSRestart'),
			() => V.failedElite > 300,
			() => V.eugenicsFullControl !== 1
		];
	}

	execute(node) {
		const container = App.UI.DOM.appendNewElement("div", node);
		let r = [];
		/* Elites */
		let eliteTotal = 12;
		let eliteDead = 0;
		let eliteVegetable = 0;
		let mercenariesMessageSent = 0;
		let specialForcesMessageSent = 0;
		V.nextButton = " ";
		const {
			He,
			he, his
		} = getPronouns(S.Bodyguard ? S.Bodyguard : {pronoun: App.Data.Pronouns.Kind.neutral});

		let pregSurrender = 0; // preg/lobotomization check
		r.push(`You knew this day would come. Surrounding yourself with powerful people has its boons, but also poses a distinct threat. You've heard them murmuring when you enter the room, you've seen them excuse themselves from your presence, and lately they've been overtly hostile. The Societal Elite${(V.arcologies[0].FSNeoImperialistLaw2 === 1) ? ", likely with the support of your ever-plotting Barons," : ""} have turned on you.`);
		App.Events.addNode(container, r, "div");
		r = [];
		r.push(`You look up from your desk as the locked door to your office unseals, and a dozen individuals brazenly walk into your view.`);
		if (S.Bodyguard) {
			r.push(`${S.Bodyguard.slaveName} stands between you and them. A single glare from the leader of the bunch and ${he} backs off, eyes to the ground.`);
		}
		App.Events.addNode(container, r, "div");
		r = [];
		if (V.PC.pregSource === -1 || V.PC.pregSource === -6) {
			if (V.PC.refreshmentType === 0) {
				r.push(`Taking a drag from a fresh ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 1) {
				r.push(`Taking a drink of a fresh glass of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 2) {
				r.push(`Taking a bite of a fresh ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 3) {
				r.push(`Doing a line of ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 4) {
				r.push(`Injecting a hit of ${V.PC.refreshment} into your arm,`);
			} else if (V.PC.refreshmentType === 5) {
				r.push(`Swallowing a ${V.PC.refreshment},`);
			} else if (V.PC.refreshmentType === 6) {
				r.push(`Placing a tab of ${V.PC.refreshment} under your tongue,`);
			}
			r.push(`you greet your rather unwelcome guests.`);
			App.Events.addParagraph(container, r);
			r = [];
			r.push(`"You are no longer worthy of being a part of our society. But you carry within you one of our heirs. A conundrum for some, but we have already solved that problem."`);
			App.Events.addNode(container, r, "div");
			r = [];
			r.push(`What was that last thing he said? It's getting hard to think right. The ${V.PC.refreshment}... Drugged... You collapse onto your desk, unconscious.`);
			App.Events.addNode(container, r, "div");
			r = [];
			if (S.Bodyguard) {
				r.push(`A sharp pain and a rush of adrenaline drags you back to your senses. Sneaking a peek, you witness ${S.Bodyguard.slaveName} valiantly trying to protect you, despite`);
				if (hasAnyProstheticLimbs(S.Bodyguard)) {
					r.push(`${his} cybernetics being locked down.`);
				} else {
					r.push(`the overwhelming odds.`);
				}
				r.push(`As ${he} and their leader struggle closer to your desk, his revolver and a syringe are dislodged onto your desk. It seems drugging you wasn't their first thought. With ${S.Bodyguard.slaveName}'s risky gamble, your fate has fallen back into your hands.`);
			} else {
				r.push(`You'll spend the rest of your life a breeder to the Societal Elite; blinded and muted. More than a slave, but still less than your master. Life isn't so bad, your two most devoted slaves were taken along to keep you happy, and you are treated quite well, possibilities considered. Though once your eggs dry up, odds are your little remaining usefulness will be at an end. Best not to think too much into it.`);
				pregSurrender = 1;
				V.ui = "start";
				App.Events.addParagraph(container, r);
				r = [];
				App.UI.DOM.appendNewElement("p", container, "GAME OVER", "bold");
			}
		} else {
			r.push(`The leader reaches into his jacket and extracts a syringe, you recognize it as a powerful drug used in lobotomies, and places it to your left. From his hip he pulls a revolver, six-chambered, and loads five bullets, spins the chamber, and places it to your right.`);
			App.Events.addNode(container, r, "div");
			r = [];
			r.push(`"You are no longer worthy of being a part of our society. You know you can't be allowed to spread any information. But we are not merciless; one of our members has taken an interest in having you as her pet. You may choose to lose your mind, and service her until she tires of you, or gamble for your life and serve her anyway. Now decide."`);
		}
		App.Events.addParagraph(container, r);

		if (pregSurrender === 0) {
			App.UI.DOM.appendNewElement("div", container, "You decide to");

			const choices = [];
			if (S.Bodyguard) {
				if (V.PC.pregSource === -1 || V.PC.pregSource === -6) {
					choices.push(new App.Events.Result(null, null, `${S.Bodyguard.slaveName} is already doing everything in ${his} power to save you.`));
				} else {
					choices.push(new App.Events.Result(`Attempt to signal ${S.Bodyguard.slaveName}, your bodyguard`, BG));
				}
			}
			if (V.mercenaries >= 1) {
				choices.push(new App.Events.Result(`Send a message to the leader of the ${V.mercenariesTitle}`, mercenaries));
			}
			if (V.SF.Toggle && V.SF.Active >= 1) {
				choices.push(new App.Events.Result(`Send a message to ${App.Mods.SF.SFC()}`, SF));
			}
			if (V.PC.pregSource !== -1 && V.PC.pregSource !== -6) {
				choices.push(new App.Events.Result(`Try and enrage them.`, enrage));
			}
			choices.push(new App.Events.Result(`Make a final stand`, finalStand));
			choices.push(new App.Events.Result(`Give in`, giveIn));
			App.Events.addResponses(container, choices);
		}
		function BG() {
			$(container).empty().append(eliteTakeOverFight("bodyguard"));
			return [];
		}
		function mercenaries() {
			$(container).empty().append(eliteTakeOverFight("mercenaries"));
			return [];
		}
		function SF() {
			$(container).empty().append(eliteTakeOverFight("SF"));
			return [];
		}
		function enrage() {
			$(container).empty().append(eliteTakeOverFight("enrage"));
			return [];
		}
		function finalStand() {
			$(container).empty().append(eliteTakeOverFight("final stand"));
			return [];
		}
		function giveIn() {
			$(container).empty().append(eliteTakeOverFight("give in"));
			return [];
		}
		function eliteTakeOverFight(finalChoice) {
			const node = new DocumentFragment();
			let r = [];
			let bgSignaled;
			let eliteEnraged;

			switch (finalChoice) {
				case "bodyguard": {
					const roll = random(0, 100);
					if (V.PC.career === "mercenary") {
						r.push(`As a result of your prior experience as a mercenary you were able to successfully signal ${S.Bodyguard.slaveName} without the Elites noticing.`);
						bgSignaled = 1;
					} else if (V.PC.skill.warfare >= 100 && roll > 20) {
						r.push(`As a result of your mastery of warfare you were able to successfully signal ${S.Bodyguard.slaveName} without the Elites noticing.`);
						bgSignaled = 1;
					} else if (V.PC.skill.warfare >= 60 && roll > 30) {
						r.push(`As a result of your expertness of warfare you were able to successfully signal ${S.Bodyguard.slaveName} without the Elites noticing.`);
						bgSignaled = 1;
					} else if (V.PC.skill.warfare >= 30 && roll > 40) {
						r.push(`As a result of having some skill in warfare you were able to successfully signal ${S.Bodyguard.slaveName} without the elites noticing.`);
						bgSignaled = 1;
					} else if (V.PC.skill.warfare >= 10 && roll > 50) {
						r.push(`As a result of having a small amount of skill in warfare you were able to successfully signal ${S.Bodyguard.slaveName} without the Elites noticing.`);
						bgSignaled = 1;
					} else if (V.PC.skill.warfare < 10 && roll > 60) {
						r.push(`By blind luck and what little you remember of your lessons in warfare are were able to successfully signal ${S.Bodyguard.slaveName} without the Elites noticing.`);
						bgSignaled = 1;
					} else {
						r.push(`One of the Elites shouts "What the fuck are you trying to do?" Well, there goes that option.`);
						bgSignaled = 0;
					}
					App.Events.addNode(node, r, "div");
					r = [];
					r.push(`You then pick up the revolver and quickly take aim.`);
					break;
				}
				case "mercenaries":
					r.push(`You send a quick message to the leader of your ${V.mercenariesTitle}, about your situation, then you pick up the revolver and quickly take aim.`);
					mercenariesMessageSent = 1;
					break;
				case "SF":
					r.push(`You send a quick message to`);
					App.Mods.SF.SFC();
					r.push(`about your situation, then you pick up the revolver and quickly take aim.`);
					specialForcesMessageSent = 1;
					break;
				case "enrage":
					if (["arcology owner", "BlackHat", "capitalist", "celebrity", "child prostitute", "escort", "gang", "hacker", "hoodlum", "medical assistant", "medicine", "prostitute", "rich kid", "rising star", "trust fund", "wealth"].includes(V.PC.career)) {
						r.push(`You know exactly what to say in order to enrage them.`);
						eliteEnraged = 1;
					} else if (random(0, 100) > 50) {
						r.push(`You manage to select the right words to enrage them.`);
						eliteEnraged = 1;
					} else {
						r.push(`You try to enrage them, but your words have had no effect.`);
						eliteEnraged = 0;
					}
					App.Events.addNode(node, r, "div");
					r = [];
					r.push(`You then pick up the revolver and quickly take aim.`);
					break;
				case "final stand":
					r.push(`You pick up the revolver and quickly take aim.`);
					break;
				case "give in":
					r.push(`You pick up the revolver and hold the barrel to your temple.`);
					break;
			}

			if (finalChoice === "give in") {
				if (V.PC.pregSource === -1 || V.PC.pregSource === -6) {
					r.push(`Screw their plans, you're out of here.`);
				}
				r.push(`With a "Bang!" you drop dead.`);
				V.ui = "start";
				App.Events.addParagraph(node, r);
				App.UI.DOM.appendNewElement("p", node, "GAME OVER", "bold");
			} else {
				/* PC shooting */
				/* higher skill means a higher chance to hit due to lower requirements and if the elites are enraged they very slightly become easier targets. */
				/* 5/6 = 83% rounded down is the chance that it was loaded chamber (simplified version based off the Wikipedia article) */

				/* variables: */
				/* Revolver */
				let revolverChambers = 6;
				let revolverBullets = 5;

				/* To Hit chance */
				let toHit;
				if (V.PC.pregSource === -1 || V.PC.pregSource === -6) { /* still woozy */
					toHit = 56;
				} else if (V.PC.career === "mercenary" || V.PC.skill.warfare >= 100) {
					toHit = 83;
				} else if (V.PC.skill.warfare >= 60) {
					toHit = 76;
				} else if (V.PC.skill.warfare >= 30) {
					toHit = 67;
				} else if (V.PC.skill.warfare >= 10) {
					toHit = 60;
				} else {
					toHit = 56;
				}
				if (eliteEnraged === 1) {
					toHit += 5;
				}

				/* shooting */
				/* in the end I removed the messages from the cycle. I don't think having 6 lines of "you shot" is pretty looking. Feel free to re add them in however */
				for (let i = revolverChambers; i > 0; i--) {
					if (random(0, 100) <= toHit && revolverBullets > 0) {
						eliteDead += 1;
						revolverBullets -= 1;
					} else if (revolverBullets > 0) {
						revolverBullets -= 1;
					}
				}
				App.Events.addNode(node, r, "div");
				r = [];
				if (eliteDead >= 1) {
					r.push(`You managed to kill several Elites in rapid succession, leaving the rest in shock and fear.`);
				} else if (eliteDead === 1) {
					r.push(`You managed to kill one Elite, leaving the rest in shock and fear.`);
				} else {
					r.push(`Unfortunately you fail to kill a single Elite.`);
				}
				App.Events.addNode(node, r, "div");
				r = [];

				/* syringe shot */
				eliteVegetable = 0;
				let druggedThrow = 0;

				if (eliteDead > 0) {
					r.push(`With ${eliteDead} Elites dead, you pick up the syringe from the desk and aim for the forehead of another.`);
				} else {
					r.push(`Having failed to kill them with the revolver, in a desperate move you pick up the syringe from the desk and aim for the forehead of one of the elite.`);
				}
				if (V.PC.pregSource === -1 || V.PC.pregSource === -6) {
					r.push(`But there's two of them... Shaking your head, you realize it's the drugs messing with you. You just need to focus.`);
				}
				const hitRoll = (random(0, 100) - druggedThrow);
				let syringeHeadShot;
				if (V.PC.career === "mercenary" && hitRoll > 0) {
					r.push(`With your prior history as a mercenary, making the throw is child's play.`);
					syringeHeadShot = 1;
				} else if (V.PC.skill.warfare >= 100) {
					if (hitRoll > 50) {
						r.push(`As a result of your mastery of warfare you successfully made the throw.`);
						syringeHeadShot = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						syringeHeadShot = 0;
					}
				} else if (V.PC.skill.warfare >= 60) {
					if (hitRoll > 60) {
						r.push(`As a result of your combat expertise you successfully made the throw.`);
						syringeHeadShot = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						syringeHeadShot = 0;
					}
				} else if (V.PC.skill.warfare >= 30) {
					if (hitRoll > 70) {
						r.push(`As you have some skill, you successfully made the throw.`);
						syringeHeadShot = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						syringeHeadShot = 0;
					}
				} else if (V.PC.skill.warfare >= 10) {
					if (hitRoll > 80) {
						r.push(`Your small amount of skill assisted you in making the throw.`);
						syringeHeadShot = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						syringeHeadShot = 0;
					}
				} else if (V.PC.skill.warfare < 10) {
					if (hitRoll > 90) {
						r.push(`By blind luck you successfully made the throw.`);
						syringeHeadShot = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						syringeHeadShot = 0;
					}
				}
				App.Events.addNode(node, r, "div");
				r = [];
				let spentRevolverHitSyringePlunger;
				if (syringeHeadShot === 1) {
					r.push(`Picking up the spent revolver, you aim for the syringe's plunger.`);
					if (V.PC.career === "mercenary") {
						r.push(`With your prior history as a mercenary, making the throw is child's play.`);
						spentRevolverHitSyringePlunger = 1;
					} else if (V.PC.skill.warfare >= 100 && random(0, 100) > 50) {
						r.push(`As a result of your mastery of warfare you successfully made the throw.`);
						spentRevolverHitSyringePlunger = 1;
					} else if (V.PC.skill.warfare >= 60 && random(0, 100) > 60) {
						r.push(`As a result of your expertness of warfare you successfully made the throw.`);
						spentRevolverHitSyringePlunger = 1;
					} else if (V.PC.skill.warfare >= 30 && random(0, 100) > 70) {
						r.push(`As you have some skill you successfully made the throw.`);
						spentRevolverHitSyringePlunger = 1;
					} else if (V.PC.skill.warfare >= 10 && random(0, 100) > 80) {
						r.push(`Your small amount of skill assisted you in making the throw.`);
						spentRevolverHitSyringePlunger = 1;
					} else if (V.PC.skill.warfare < 10 && random(0, 100) > 90) {
						r.push(`By blind luck you successfully made the throw.`);
						spentRevolverHitSyringePlunger = 1;
					} else {
						r.push(`Unfortunately you miss the shot.`);
						spentRevolverHitSyringePlunger = 0;
					}
				}
				App.Events.addNode(node, r, "div");
				r = [];
				if (spentRevolverHitSyringePlunger === 1) {
					if (random(0, 100) > 50) {
						r.push(`The target dies of nervous system overload brought about by the drug.`);
						eliteDead += 1;
					} else {
						r.push(`The target is still alive but is nothing more than a vegetable.`);
						eliteVegetable = 1;
					}
				}
			}

			let eliteLeft = eliteTotal - eliteDead - eliteVegetable;

			/* if the player has managed to make enough damage to the Elite and the rep is high enough the citizens will come to save the PC */
			/* this is to give reason to exist for the "enrage" and "last stand" option */
			/* result							*/
			/* fate:							*/
			/*		killed = 0					*/
			/*		enslaved = 1				*/
			/*		had fun (and enslaved) = 2	*/

			if (bgSignaled === 1) {
				const {title: Master} = getEnunciation(S.Bodyguard);
				r.push(`${S.Bodyguard.slaveName} asks, "${Master}, what should I do with the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`'Elite' left?"`);
				App.Events.addNode(node, r, "div");
				node.append(resultLinks());
			} else if (mercenariesMessageSent === 1) {
				r.push(`It is now that a squad of ${V.mercenariesTitle} makes their entrance, pointing their guns at the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`Elite. The officer asks, "Your orders, ${properTitle()}?"`);

				App.Events.addNode(node, r, "div");
				node.append(resultLinks());
			} else if (specialForcesMessageSent) {
				r.push(`It is now that a squad of ${V.SF.Lower} makes their entrance, pointing their guns at the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`Elite. The officer asks, "Your orders, ${properTitle()}?"`);

				node.append(resultLinks());
			} else if (V.BodyguardID !== 0) {
				const {title: Master} = getEnunciation(S.Bodyguard);
				r.push(`It is now that ${S.Bodyguard.slaveName} makes ${his} entrance, pointing ${his} guns at the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`Elite. ${He} then asks "${Master}, what should I do with the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`'Elite' left?"`);
				node.append(resultLinks());
			} else if (eliteLeft <= 9 && V.rep >= 10000) {
				r.push(`Some of the citizens waiting outside your penthouse to see you hear the ruckus and rush inside, worried. Time seems to freeze for a few seconds, while the remaining Elite recover from their terror and the citizens digest the gory scene in front of them.`);
				r.push(`The newcomers are quick to take your side. In little time the Elites, outgunned and outnumbered, are neutralized.`);
				App.Events.addNode(node, r, "div");
				r = [];
				r.push(`One of the more courageous citizens approaches you and asks "${properTitle()}, what should we do with them?"`);
				App.Events.addNode(node, r, "div");
				node.append(resultLinks());
			} else if (finalChoice !== "give in") {
				r.push(`With nothing else left, you remain powerless to stop the`);
				if (eliteLeft < eliteTotal) {
					r.push(`remaining`);
				}
				r.push(`Elite, who quickly capture and enslave you. Your personal story may continue, but the part of it worthy of retelling has now ended.`);
				V.ui = "start";
				App.Events.addParagraph(node, r);
				App.UI.DOM.appendNewElement("p", node, "GAME OVER", "bold");
			}
			return node;

			function resultLinks() {
				const div = document.createElement("div");
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.link(
					"Open fire",
					() => {
						$(container).empty().append(eliteTakeOverResult(0));
					}
				));
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.link(
					"Enslave them",
					() => {
						$(container).empty().append(eliteTakeOverResult(1));
					}
				));
				App.UI.DOM.appendNewElement("div", div, App.UI.DOM.link(
					"Have fun with them",
					() => {
						$(container).empty().append(eliteTakeOverResult(2));
					}
				));
				return div;
			}

			/**
			 *
			 * @param {0|1|2} fate
			 * @returns {DocumentFragment}
			 */
			function eliteTakeOverResult(fate) {
				const node = new DocumentFragment();
				let r = [];

				V.nextButton = "Continue";
				App.Utils.updateUserButton(); /* unlock Continue button */

				const {
					himU, hisU
				} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
				let sfHappyEverAfter;

				switch (fate) {
					case 0:
						if (mercenariesMessageSent === 1) {
							r.push(`The mercenaries open fire as ordered. Shortly after, the conspiring Elite are dead.`);
						} else if (specialForcesMessageSent === 1) {
							r.push(`The soldiers open fire as ordered. Shortly after, the conspiring Elite are dead.`);
						} else if (eliteLeft <= 9 && V.rep >= 10000) {
							r.push(`Your citizens freeze for a second, then obey your orders. Shortly after, the conspiring Elite are dead.`);
						} else {
							r.push(`Your bodyguard opens fire as ordered. Shortly after, the conspiring Elite are dead.`);
						}
						break;
					case 1:
						if (random(0, 100) > 50) {
							r.push(`An Elite bites down on a cyanide pill hidden in a false tooth and`);
							if (random(0, 100) > 75) {
								r.push(`takes the coward's way out (how predictable), frothing at the mouth.`);
								eliteDead += 1;
							} else {
								r.push(`experiences great pain but unfortunately (for them at least) survives.`);
							}
						}
						App.Events.addNode(node, r, "div");
						r = [];
						if (mercenariesMessageSent === 1) {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured and enslaved by your mercenaries.`);
						} else if (specialForcesMessageSent === 1) {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured and enslaved by your soldiers.`);
						} else if (eliteLeft <= 9 && V.rep >= 10000) {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured and enslaved by your loyal citizens.`);
						} else {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured and enslaved by your bodyguard.`);
						}
						break;
					case 2:
						if (random(0, 100) > 50) {
							r.push(`An Elite bites down on a cyanide pill hidden in a false tooth and`);
							if (random(0, 100) > 75) {
								r.push(`takes the coward's way out (how predictable), frothing at the mouth.`);
								eliteDead += 1;
							} else {
								r.push(`experiences great pain but unfortunately (for them at least) survives.`);
							}
						}
						App.Events.addNode(node, r, "div");
						r = [];
						if (mercenariesMessageSent === 1) {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured, abused and enslaved. The officer is thankful for giving the troops a chance to let off some stream. Two soldiers decide to double team an Elite; one ass fucks while the other facefucks. Another soldier takes a particular interest in an Elite and politely asks you "${properTitle()}, can I keep ${himU}?"`);
							App.Events.addNode(node, r, "div");

							App.Events.addResponses(node, [
								new App.Events.Result(`No`, no),
								new App.Events.Result(`Yes`, yes)
							]);

							function no() {
								return `Your rejection upsets some of them, but their professionalism ensures it isn't visible.`;
							}
							function yes() {
								eliteLeft -= 1;
								repX(2500, "event");
								return `For a second your acceptance shocks them. Once they recover they are very grateful. "Thank you ${properTitle()}, I'll make sure to look after ${himU}." Soon the story spreads of the kind arcology owner, enhancing your reputation.`;
							}
						} else if (specialForcesMessageSent) {
							r.push(`The`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly captured, abused and enslaved.`);
							if (V.SF.Depravity <= 0.3) {
								r.push(`Two soldiers decide to double team an Elite; one gropes ${hisU} ass while the other gropes ${hisU} tits.`);
							} else if (V.SF.Depravity <= 1.2) {
								r.push(`Two soldiers decide to double team an Elite; one assfucks while the other facefucks.`);
							} else {
								r.push(`Two soldiers decide to double team an Elite; one breaks out their knife and begins to make little breaks in the Elite's skin while the other soldier facefucks them.`);
							}
							r.push(`Another soldier takes a particular interest in an Elite and politely asks you "${properTitle()}, can I keep ${himU}?"`);
							App.Events.addParagraph(node, r);
							r = [];

							App.Events.addResponses(node, [
								new App.Events.Result(`No`, no),
								new App.Events.Result(`Yes`, yes)
							]);

							function no() {
								sfHappyEverAfter = 0;
								return `Your rejection upsets some of them, but their professionalism ensures it isn't visible.`;
							}
							function yes() {
								eliteLeft -= 1;
								sfHappyEverAfter = 1;
								repX(2500, "event");
								return `For a second your acceptance shocks them. Once they recover they are very grateful. "Thank you ${properTitle()}, I'll make sure to look after ${himU}." Soon the story spreads of the kind arcology owner, enhancing your reputation.`;
							}
							if (V.SF.MercCon.CanAttend === -2) {
								switch (V.SF.Colonel.Core) {
									case "kind":
										r.push(`The Colonel is shocked that you would allow her troops to do this but understands that it comes with the territory.`);
										if (sfHappyEverAfter === 1) { // TODO: this never worked in tw since this is set by a link that doesn't refresh this content.
											r.push(`"Thanks for being kind to one of my soldiers."`);
										}
										break;
									case "brazen":
									case "cruel":
									case "jaded":
										r.push(`The Colonel is grateful that you let her troops let off some steam.`);
										if (sfHappyEverAfter === 1) {
											r.push(`"Thanks for being kind to one of my soldiers."`);
										}
								}
							}
							V.SF.Depravity += 0.05;
						} else if (eliteLeft <= 9 && V.rep >= 10000) {
							if (FutureSocieties.isActive('FSDegradationist')) {
								r.push(`An evil smile appears on the faces of your loyal citizens, while the surviving Elite freeze in terror. The impromptu festivity will go on for hours, getting more and more depraved.`);
							} else {
								r.push(`While some citizens respectfully step out, some join you in the fun. The impromptu festivities will go on for hours, getting more and more depraved.`);
							}
						} else {
							if (S.Bodyguard.fetish === "sadist") {
								r.push(`${S.Bodyguard.slaveName} gets out ${his} melee weapon and starts to give them many small cuts, the look of pleasure on ${his} face is evident.`);
							} else {
								r.push(`${S.Bodyguard.slaveName} ties them and then gets out ${his} melee weapon and starts to abuse them; ${his} face is blank.`);
							}
							App.Events.addNode(node, r, "div");
							r = [];
							r.push(`Shortly after, the terrified`);
							if (eliteLeft < eliteTotal) {
								r.push(`remaining`);
							}
							r.push(`Elite are quickly brought away to be officially enslaved.`);
						}
				}
				App.Events.addParagraph(node, r);

				if (fate >= 1) {
					if (eliteVegetable === 1) {
						eliteLeft--;
						let slave;
						const gender = (V.seeDicks === 100 || (random(1, 100) > 50)) ? "XY" : "XX"; /* 50% chance of getting girl or boy */

						slave = GenerateNewSlave(
							gender,
							{
								minAge: 25, maxAge: V.retirementAge - 2, disableDisability: 1, race: "nonslave"
							});
						slave.origin = "$He was a member of the Societal Elite, captured in their failed attempt at expressing their displeasure.";
						slave.career = "a well connected individual";
						slave.prestige = either(2, 2, 3); /* 33% chance of getting level 3 prestige */
						slave.prestigeDesc = "$He was once considered influential in society, but now $he's the one getting fucked.";
						slave.face = random(70, 100);
						if (slave.boobShape === "saggy" || slave.boobShape === "downward-facing") {
							slave.boobShape = either("perky", "torpedo-shaped", "wide-set");
						}
						applyMindbroken(slave, random(70, 100));
						slave.pubicHStyle = "waxed";
						slave.underArmHStyle = "waxed";
						slave.anus = 0;
						slave.weight = random(10, 75);
						setHealth(slave, jsRandom(60, 75), 0, 0, 0, jsRandom(0, 20));
						slave.canRecruit = 0;
						newSlave(slave); /* skip New Slave Intro */
					}
					for (let i = eliteLeft; i > 0; i--) {
						const gender = (V.seeDicks === 100 || (random(1, 100) > 50)) ? "XY" : "XX"; /* 50% chance of getting girl or boy */
						const slave = GenerateNewSlave(gender, {minAge: 25, maxAge: V.retirementAge - 2, race: "nonslave"});
						slave.origin = "$He was a member of the Societal Elite, captured in their failed attempt at expressing their displeasure.";
						slave.career = "a well connected individual";
						slave.prestige = either(2, 2, 3);
						slave.prestigeDesc = "$He was once considered influential in society, but now $he's the one getting fucked.";
						slave.face = random(70, 100);
						slave.devotion = random(-10, -20);
						slave.trust = random(-20, -30);
						if (slave.boobShape === "saggy" || slave.boobShape === "downward-facing") {
							slave.boobShape = either("perky", "torpedo-shaped", "wide-set");
						}
						slave.pubicHStyle = "waxed";
						slave.underArmHStyle = "waxed";
						slave.anus = 0;
						slave.weight = random(-30, 75);
						slave.intelligence = random(0, 60);
						slave.intelligenceImplant = 30;
						slave.skill.entertainment = 0;
						slave.skill.whoring = 0;
						setHealth(slave, jsRandom(60, 75), 0, 0, 0, jsRandom(0, 20));
						slave.canRecruit = 0;
						slave.behavioralFlaw = either("arrogant", "bitchy");
						if (fate === 2 && random(1, 100) >= 75) { /* 25% chance of getting mindbroken elites if they were abused */
							applyMindbroken(slave);
						}
						newSlave(slave); /* skip New Slave Intro */
					}
				}

				/* clean up */
				V.failedElite = 0;
				V.eugenicsFullControl = 1;
				return node;
			}
		}
	}
};
