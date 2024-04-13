/** Nonlethal 1v1 between random slaves. */
App.Facilities.Pit.Fights.NlR1v1 = class extends App.Facilities.Pit.Fights.BaseFight {
	fightDescription() {
		const f = new DocumentFragment();
		f.append("1-vs-1 fight between ", App.UI.DOM.slaveDescriptionDialog(getSlave(this.actors[0])), ` and `,
			contextualIntro(getSlave(this.actors[0]), getSlave(this.actors[1]), true), ".");
		return f;
	}

	actorPrerequisites() {
		return [
			[],
			[]
		];
	}

	execute(node, fighterMap) {
		const that = this; // Thanks, JS!
		const [slave1, slave2] = this.actors.map(a => getSlave(a));

		const winner = getWinner() ? slave1 : slave2;
		const loser = winner === slave1 ? slave2 : slave1;

		let success = 0;

		intro(node);
		fighterDeadliness(node, slave1);
		fighterDeadliness(node, slave2);

		fight(node);
		postFight(node);

		return success;

		/**
		 * @param {DocumentFragment} parent
		 */
		function intro(parent) {
			const r = [];

			App.Events.drawEventArt(node, [slave1, slave2], "no clothing");

			r.push(...that.introCombatants(slave1, slave2));

			r.push(`You review the rules — the combatants are wearing light gloves, and the fight will be nonlethal, with you as the judge. The winner will have the right to do anything they wish to the loser,`);

			switch (V.pit.virginities) {
				case "all":
					r.push(`except take their virginity,`);
					break;
				case "anal":
					r.push(`except take their anal virginity,`);
					break;
				case "vaginal":
					r.push(`except take virginities,`);
					break;
				case "none":
					r.push(`even take virginities,`);
					break;
				default:
					throw new Error(`Unexpected V.pit.virginities value of '${that.params.virginities}' found`);
			}

			r.push(`and earn two complete days of rest. You take a moment to look over your fighters before giving the word.`);

			App.Events.addParagraph(parent, r);
		}

		/**
		 * @param {DocumentFragment} parent
		 * @param {App.Entity.SlaveState} fighter
		 */
		function fighterDeadliness(parent, fighter) {
			const {he, his, him, himself, He, His} = getPronouns(fighter);
			const fighterDeadliness = deadliness(fighter).value;

			const r = [];

			r.push(
				confidence(),
				skill(),
				age(),
				muscles(),
				height(),
				health(),
				weight(),
				tired(),
				pregnancy(),
				labor(),
				bellyFluid(),
				sight(),
				hearing(),
				prosthetics(),
				willingness(),
			);

			if (V.debugMode) {
				r.push(App.UI.DOM.combineNodes("(Deadliness: ", DeadlinessTooltip(fighter), ")"));
			}

			App.Events.addParagraph(parent, r);

			function confidence() {
				if (fighter.fetish === Fetish.MINDBROKEN) {
					return `${fighter.slaveName} is too broken to care what happens to ${him}.`;
				} else if (fighterDeadliness > 5) {
					return `${fighter.slaveName} seems very confident, even eager to win a break.`;
				} else if (fighterDeadliness > 3) {
					return `${fighter.slaveName} seems nervous, but steels ${himself} to fight for time off.`;
				} else if (fighterDeadliness > 1) {
					return `${fighter.slaveName} seems hesitant and unsure.`;
				} else {
					return `${fighter.slaveName} is obviously terrified, and might flee if there were a way out of the pit.`;
				}
			}

			function willingness() {
				if (fighter.devotion < 20 && fighter.trust < -20) {
					return `${He} is unwilling to fight, but ${he} knows the punishment for refusing to do so will be even worse.`;
				}
			}

			function skill() {
				if (fighter.skill.combat > 30) {
					return `${His} stance is obviously well-practiced.`;
				}
			}

			function age() {
				if (V.AgePenalty !== 0) {
					if (fighter.physicalAge >= 100) {
						return `${He} seems preoccupied, which is unsurprising given ${his} age and resulting fragility.`;
					} else if (fighter.physicalAge >= 85) {
						return `${He} tries not to waste ${his} strength before the fight, knowing that ${his} extreme age won't allow ${him} a second wind.`;
					} else if (fighter.physicalAge >= 70) {
						return `${He} steadies ${himself} as well as ${he} can in ${his} advanced age.`;
					}
				}
			}

			function muscles() {
				if (fighter.muscles > 95 && fighter.height > 185) {
					return `${His} huge muscles are an intimidating sight and, despite their massive size, ${he} is tall enough to not be hindered by them.`;
				} else if (fighter.muscles > 95) {
					return `${His} huge muscles are an intimidating sight, but may hinder ${his} flexibility.`;
				} else if (fighter.muscles > 30) {
					return `${His} muscles are a trim and powerful sight.`;
				} else if (fighter.muscles < -95) {
					return `${He} can barely stand, let alone defend ${himself}.`;
				} else if (fighter.muscles < -30) {
					return `${He} is very weak; a single punch will likely floor ${him}.`;
				} else if (fighter.muscles < -5) {
					return `${He} is rather unfit; ${he} will likely be outmatched by near any real opponent.`;
				} else {
					return `${He} is only somewhat fit and will likely not be able to win through pure strength.`;
				}
			}

			function height() {
				if (fighter.height > 170) {
					return `${His} height gives ${him} a reach advantage with ${his} fists and feet.`;
				}
			}

			function health() {
				if (fighter.health.condition > 50) {
					return `${His} shining health makes ${him} a better fighter.`;
				} else if (fighter.health.condition) {
					return `${His} poor health makes ${him} a weaker combatant.`;
				}
			}

			function weight() {
				if (fighter.weight > 190) {
					return `${His} extreme weight nearly immobilizes ${him}. ${He} is essentially a fleshy punching bag.`;
				} else if (fighter.weight > 160) {
					return `${His} extreme weight limits ${his} mobility and range of motion even if ${he} can take punches like nothing.`;
				} else if (fighter.weight > 130) {
					return `${His} extreme weight holds ${him} back as a pit fighter.`;
				} else if (fighter.weight > 30) {
					return `${His} heavy weight is an impediment as a pit fighter.`;
				} else if (fighter.weight < -10) {
					return `${His} light weight is an impediment as a pit fighter.`;
				}
			}

			function tired() {
				if (fighter.health.tired > 90) {
					return `${He} is exhausted and can barely stay awake; ${he} won't put up a fight.`;
				} else if (fighter.health.tired > 60) {
					return `${He} is fatigued, sapping the strength ${he}'ll need in ${his} strikes.`;
				} else if (fighter.health.tired > 30) {
					return `${He} is tired and more likely to take a hit than to give one.`;
				}
			}

			function pregnancy() {
				if (fighter.pregKnown || fighter.bellyPreg > 1500) {
					if (fighter.bellyPreg > 750000) {
						return `${His} monolithic pregnancy guarantees ${his} loss; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target that threatens to drag ${him} to the ground. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent. The fear of what would happen should ${his} adversary land a hit on ${his} belly also weighs upon ${his} mind.`;
					} else if (fighter.bellyPreg > 600000) {
						return `${His} titanic pregnancy is practically a guaranteed loss; ${he} can barely stand let alone fight. The worry of a solid hit striking ${his} life-swollen womb also weighs on ${his} mind.`;
					} else if (fighter.bellyPreg > 450000) {
						return `${His} gigantic pregnancy is nearly a guaranteed loss; it presents an unmissable, indefensible target for ${his} adversary.`;
					} else if (fighter.bellyPreg > 300000) {
						return `${His} massive pregnancy obstructs ${his} movement and greatly hinders ${him}. ${He} struggles to think of how ${he} could even begin to defend ${his} bulk.`;
					} else if (fighter.bellyPreg > 150000) {
						return `${His} giant pregnancy obstructs ${his} movement and greatly slows ${him} down.`;
					} else if (fighter.bellyPreg > 100000) {
						return `${His} giant belly gets in ${his} way and weighs ${him} down.`;
					} else if (fighter.bellyPreg > 10000) {
						return `${His} huge belly is unwieldy and hinders ${his} efforts.`;
					} else if (fighter.bellyPreg > 5000) {
						return `${His} advanced pregnancy makes ${him} much less effective.`;
					} else if (fighter.bellyPreg > 1500) {
						return `${His} growing pregnancy distracts ${him} from the fight.`;
					} else {
						return `The life just beginning to grow inside ${him} distracts ${him} from the fight.`;
					}
				} else if (fighter.bellyImplant > 1500) {
					if (fighter.bellyImplant > 750000) {
						return `${His} monolithic, ${fighter.bellyImplant}cc implant-filled belly guarantees ${his} defeat; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target that threatens to drag ${him} to the ground. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent.`;
					} else if (fighter.bellyImplant > 600000) {
						return `${His} titanic, ${fighter.bellyImplant}cc implant-filled belly is practically a guaranteed defeat; ${he} can barely stand let alone fight. Not only is it cripplingly heavy, unwieldy and an easy target, but ${he} can feel it straining to hold the sheer amount of filler forced into it.`;
					} else if (fighter.bellyImplant > 450000) {
						return `${His} gigantic, ${fighter.bellyImplant}cc implant-filled belly is nearly a guaranteed defeat; it presents an unmissable, indefensible target for ${his} adversary.`;
					} else if (fighter.bellyImplant > 300000) {
						return `${His} massive, ${fighter.bellyImplant}cc implant-filled belly is extremely heavy, unwieldy and an easy target, practically damning ${him} in combat.`;
					} else if (fighter.bellyImplant > 150000) {
						return `${His} giant, ${fighter.bellyImplant}cc implant-filled belly obstructs ${his} movement and greatly slows ${him} down.`;
					} else if (fighter.bellyImplant > 100000) {
						return `${His} giant, ${fighter.bellyImplant}cc implant-filled belly is very heavy and unwieldy, throwing off ${his} weight and making ${him} far less effective.`;
					} else if (fighter.bellyImplant > 10000) {
						return `${His} huge, ${fighter.bellyImplant}cc implant-filled belly is very heavy and unwieldy, throwing off ${his} weight and making ${him} far less effective.`;
					} else if (fighter.bellyImplant > 5000) {
						return `${His} large, ${fighter.bellyImplant}cc implant-filled belly is heavy and unwieldy, rendering ${him} less effective.`;
					} else if (fighter.bellyImplant > 1500) {
						return `${His} swollen, ${fighter.bellyImplant}cc implant-filled belly is heavy and makes ${him} less effective.`;
					}
				}
			}

			function labor() {
				if (isInLabor(fighter)) {
					return `${He}'s feeling labor pains. ${His} ${fighter.pregType > 1 ? `children are` : `child is`} ready to be born, oblivious to the fact that it will put ${fighter.pregType > 1 ? `their` : `its`} mother at the mercy of ${his} opponent.`;
				} else if (fighter.preg > fighter.pregData.normalBirth && fighter.pregControl !== "labor suppressors") {
					return `${He}'ll be going into labor any time now and ${he} knows it. ${He}'s terrified of the thought of ${his} water breaking during the fight.`;
				}
			}

			function bellyFluid() {
				if (fighter.bellyFluid > 10000) {
					return `${His} hugely bloated, ${fighter.inflationType}-filled belly is taut and painful, hindering ${his} ability to fight.`;
				} else if (fighter.bellyFluid > 5000) {
					return `${His} bloated, ${fighter.inflationType}-stuffed belly is constantly jiggling and moving, distracting ${him} and throwing off ${his} weight.`;
				} else if (fighter.bellyFluid > 2000) {
					return `${His} distended, ${fighter.inflationType}-belly is uncomfortable and heavy, distracting ${him}.`;
				}
			}

			function sight() {
				if (!canSee(fighter)) {
					return `${His} lack of eyesight means certain defeat.`;
				} else if (!canSeePerfectly(fighter)) {
					return `${His} poor eyesight makes ${him} a weaker fighter.`;
				}
			}

			function hearing() {
				if (!canHear(fighter)) {
					return `${His} lack of hearing is a major detriment.`;
				} else if ((fighter.hears === -1 && fighter.earwear !== "hearing aids") || (fighter.hears === 0 && fighter.earwear === "muffling ear plugs")) {		// TODO: replace with canHearPerfectly
					return `${His} poor hearing is a minor detriment.`;
				}
			}

			function prosthetics() {
				if (hasAnyProstheticLimbs(fighter) && !hasAnyQuadrupedLimbs(fighter)) {
					const r = [];

					r.push(`The pit lights gleam on ${his} P-Limbs.`);

					if (getLimbCount(fighter, 6) > 0) {
						r.push(`${His} advanced cybernetic limbs are faster than natural limbs, and their force is amplified, so that they can become potent weapons.`);
					} else if (getLimbCount(fighter, 5) > 0) {
						r.push(`Though their integral weapons are disabled, ${his} upgraded prosthetics are almost as fast as natural limbs, and they can hit much, much harder.`);
					}

					return r.join(' ');
				}
			}

			if (hasAnyProstheticLimbs(fighter) && hasAnyQuadrupedLimbs(fighter)) {
				const r = [];

				r.push(`The pit lights gleam on ${his} prosthetic limbs. They have the advantage of being quadrupedal, keeping ${him} low to the ground and providing better mobility.`);
				return r.join(' ');
			}
		}

		/**
		 * @param {DocumentFragment} parent
		 */
		function fight(parent) {
			const r = [];

			const winnerDeadliness = deadliness(winner).value;
			const loserDeadliness = deadliness(loser).value;

			const {he, his, him, himself, girl, He} = getPronouns(winner);
			const {
				he: he2,
				his: his2,
				him: him2,
				himself: himself2,
				girl: girl2,
				He: He2,
				His: His2,
			} = getPronouns(loser);

			if (!canSee(winner) && !canSee(loser)) {
				r.push(`${winner.slaveName} and ${loser.slaveName} are both blind, making the fight a stare-down. Neither slave wants to make the first move, especially with the drowning cacophony coming from the jeering crowd. Slowly, ${winner.slaveName} moves forward, waving feeling for ${his} opponent before ${he} ${himself} gets found. ${loser.slaveName}'s hand meets ${winner.slaveName}'s and the two move to grab each other in a headlock. The two slaves violently thrash against each other, suffering more and more strikes as the struggle goes on. Eventually, ${loser.slaveName} can take no more and releases ${his2} grip on ${winner.slaveName} neck. It takes a moment for ${winner.slaveName} to stop wrestling the submitting ${loser.slaveName} and accept ${his} victory.`);

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `surprised`, ["reputation", "inc"]),
						` by the impromptu wrestling match.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is surprised by the sudden wrestling match, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is modest.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 1) && getArmCount(winner, 6) > 1) {
				r.push(`Upon your word the two combatants approach each other. ${winner.slaveName} keeps ${his} advanced cybernetic limbs up in a protective position. ${loser.slaveName} probes ${him} with some light blows, puzzled by this ironclad defense. Gradually, ${he2} hits harder and harder, ${his2} opponent grunting under the impacts but holding steady. Finally, ${loser.slaveName} tires, gets off balance, and ${winner.slaveName} manages to grab ${his2} forearm. ${winner.slaveName}'s limbs emit an electric shock that temporarily incapacitates ${his} opponent. ${winner.slaveName} uses ${his} grip to pull ${his} stunned opponent in and grab ${his2} neck with the other hand, using it to exert just the right amount of pressure to choke ${him2} out harmlessly. Though the fight was short,`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`the audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ["reputation", "inc"]),
						` by the display.`);
				} else if (V.pit.audience === "paid") {
					r.push(`the audience is quite impressed by the display, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is quite good.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 1) && getArmCount(winner, 5) > 1) {
				r.push(`Upon your word the two combatants approach each other. ${winner.slaveName} keeps ${his} artificial limbs up in a protective position. ${loser.slaveName} probes ${him} with some light blows, puzzled by this ironclad defense. Gradually, ${he2} hits harder and harder, ${his2} opponent grunting under the impacts but holding steady. Finally, ${loser.slaveName} overcommits to a body blow, and ${winner.slaveName} grips ${his2} forearm. That is the end. The augmented grip is effectively unbreakable, and ${winner.slaveName} uses it to pull ${his} opponent in and grab ${his2} neck with the other hand, using it to exert just the right amount of pressure to choke ${him2} out harmlessly. Though the fight was short,`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`the audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ["reputation", "inc"]),
						` by the display.`);
				} else if (V.pit.audience === "paid") {
					r.push(`the audience is quite impressed by the display, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is quite good.`);
				}
			} else if (!canSee(winner)) {
				r.push(`${winner.slaveName} centers ${himself} and hones in on ${loser.slaveName}'s rapid breath. ${He} readies ${himself}, knowing ${he} has a single chance to win. With heavy steps, ${loser.slaveName} rushes ${him}, fully prepared to tackle the helpless combatant. ${winner.slaveName} gambles everything on a single high punch, a strike that slams ${loser.slaveName}'s undefended neck. ${loser.slaveName} falls to the ground before the panicking ${winner.slaveName}, who quickly pins the coughing loser.`);

				healthDamage(winner, 80);
				success = 1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `awestruck`, ["reputation", "inc"]),
						` by the blind ${girl}'s triumph.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is awestruck by the blind ${girl}'s triumph, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is enormous.`);
				}
			} else if (!canSee(loser)) {
				r.push(`${winner.slaveName} grins at ${loser.slaveName}'s random swings and poor form. ${He} centers in on ${his} favorite part of ${loser.slaveName}'s body before rushing between ${his2} strikes and tackling ${him2} to the ground. ${loser.slaveName} lays there, helpless to stop ${winner.slaveName} from molesting ${him2}.`);

				success = -0.1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `annoyed`, ["reputation", "dec"]),
						` by this lack of a fight.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience found the fight embarrassing, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "dec"]),
						` is pitiful.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 3)) {
				if (winner.skill.combat > 30) {
					r.push(`${winner.slaveName} wants to win, and ${he} opens the fight with a furious attack. ${loser.slaveName} manages to get ${his2} ${hasBothArms(loser) ? `forearms` : `forearm`} up, blocking a few blows, but by doing so leaves ${his2} abdomen open and obscures ${his2} vision enough that ${he2} is unprepared for the following kidney strike, which brings ${him2} gasping to one knee. ${winner.slaveName} lets ${him2} rise just a little before delivering a calculated hard right that sends ${loser.slaveName} to the mat.`);

					success = 0.125;

					if (V.pit.audience === "free") {
						r.push(`The audience is `,
							App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
							` by this execution.`);
					} else if (V.pit.audience === "paid") {
						r.push(`The audience is not very impressed by this execution, and your `,
							App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
							` is unimpressive.`);
					}
				} else {
					r.push(`${winner.slaveName} wants to win and is confident ${he} will, but ${he} isn't particularly sure about how to do so. ${He} fights cautiously, mostly hitting ${loser.slaveName} from afar. Slowly, the rain of blows begins to tell, opening ${loser.slaveName}'s lip, giving ${him2} a bloody nose, and bruising ${his2} face. Realizing ${he2} has to do something, ${loser.slaveName} makes a desperate counterattack, `, App.UI.DOM.makeElement("span", `dripping blood`, ["health",
						"dec"]), ` as ${he2} goes. As ${he2} does ${he2} manages to get ${his2} face in the way of another of ${winner.slaveName}'s inexpert strikes and goes down hard. ${He2} makes to rise, but ${winner.slaveName} decides the fight by the simple expedient of kicking ${him2} in the crotch.`);

					healthDamage(winner, 20);
					success = 0.25;

					if (V.pit.audience === "free") {
						r.push(`The audience is `,
							App.UI.DOM.makeElement("span", `reasonably impressed`, ["reputation", "inc"]),
							` by the beating.`);
					} else if (V.pit.audience === "paid") {
						r.push(`The audience is reasonably impressed by the beating, and your `,
							App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
							` is reasonable.`);
					}
				}
			} else if (winner.belly > 60000 && loser.belly > 60000) {
				r.push(`${winner.slaveName} and ${loser.slaveName} stare each other down and both come to a realization. Neither can reach the other around their massive bellies. Instead, they choose to ram their bulk into each other in hopes of toppling the weaker. After a drawn out struggle, both slaves' middles are `,
					App.UI.DOM.makeElement("span", `dark red and shuddering,`, ["health", "dec"]),
					` ready to burst open. Rather than continue, ${loser.slaveName} lets the next strike down ${him2} hoping that the outcome of this fight isn't fatal.`);

				success = 0.375;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ["reputation", "dec"]),
						` by the showdown.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is very impressed by the showdown, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is good.`);
				}
			} else if (winner.belly > 60000 && loser.belly < 30000) {
				r.push(`${loser.slaveName} spies an easy win against ${his2} massively bloated opponent and rushes in to topple ${winner.slaveName}. In an effort to defend ${himself}, ${winner.slaveName} hoists ${his} belly and turns suddenly, accidentally impacting ${loser.slaveName} with ${his} massive middle and knocking ${him2} to the ground. Seeing an opportunity, ${winner.slaveName} releases ${his} grip and slams ${his} weighty womb down on ${loser.slaveName}, bashing the wind out of ${him2}. ${loser.slaveName} struggles to slip out from under the mass, but the weight is too great and ${he2} passes out.`);

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `impressed`, ["reputation", "dec"]),
						` by this absurd win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is impressed by this absurd win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is reasonably.`);
				}
			} else if (winner.skill.combat > 30 && loser.skill.combat > 30) {
				const healthSpans = [App.UI.DOM.makeElement("span", `broken nose`, ["health", "dec"]),
					App.UI.DOM.makeElement("span", `to the point of damage`, ["health", "dec"])];

				r.push(`Upon your word the two combatants approach each other warily, both knowing the other is reasonably competent. Before long they are trading expert blows. ${winner.slaveName} is getting the worst of it, so ${he} decides to change the nature of the fight. After three tries ${he} manages to bring ${loser.slaveName} to the ground, suffering a `, healthSpans[0], ` as ${he} does. ${loser.slaveName} tries to break the imperfect hold but only earns ${himself2} an elbow to the face. ${He2}'s furious and ${winner.slaveName} is obliged to wrench ${his2} arm `, healthSpans[1], ` before ${he2} allows ${himself2} to go limp.`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ["reputation", "inc"]),
						` by the expert fight.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is quite impressed by the expert fight, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is quite good.`);
				}
			} else if (winner.height - loser.height < -10) {
				r.push(`${winner.slaveName} realizes that ${loser.slaveName}'s wingspan gives ${him2} a huge reach advantage. ${He} bores straight in, taking a hit or two but coming on regardless. ${loser.slaveName} understands ${his2} opponent's intention and backs off, but the pit is small and there isn't much room to retreat. When ${his2} back hits a padded wall, ${winner.slaveName} manages to land a light hit to ${his2} stomach that leaves ${loser.slaveName} winded enough that a hard kick to the side of ${his2} knee goes undefended. It causes `, App.UI.DOM.makeElement("span", `considerable damage,`, ["health",
					"dec"]), ` dropping ${him2} and ending the fight.`);

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `reasonably impressed`, ["reputation", "inc"]),
						` by the take-down.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is reasonably impressed by the take-down, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is reasonable.`);
				}
			} else if (loser.piercing.eyebrow.weight > 0) {
				r.push(`The fight starts slowly, with the two trading jabs. Just as the spectators are getting bored, ${loser.slaveName} takes a glancing blow to the eyebrow. ${His2} piercing catches on ${winner.slaveName}'s glove and tears out. ${loser.slaveName} goes after ${his2} tormentor in fury, streaming blood, the piercing forgotten on the mat. Any tendency ${winner.slaveName} might have had to feel badly about this is extinguished by the assault, and soon ${winner.slaveName} is even willing to follow up on the success by targeting pierced body parts. The fight ends with poor ${loser.slaveName} writhing in pain on the mat, `, App.UI.DOM.makeElement("span", `leaking blood`, ["health",
					"dec"]), ` from several terribly shredded areas.`);

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `reasonably impressed`, ["reputation", "inc"]),
						` by the gory spectacle.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is reasonably impressed by the gory spectacle, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is reasonable.`);
				}
			} else if (winner.muscles > 30) {
				r.push(`${winner.slaveName} is so massively muscular that ${he}'s actually impeded by ${his} size. ${loser.slaveName} is properly afraid of ${his} strength, though, so ${he2} tries to stay away as much as ${he2} can. The pit isn't large, however, and eventually ${winner.slaveName} manages to lay a hand on ${him2}. ${He} pulls ${him2} down, and then it's all over but the beating. ${loser.slaveName} rains blows on ${his2} huge oppressor, but all ${winner.slaveName} has to do is hold on with one arm and deliver damage with the other. By the time ${he2} gives up and goes limp, ${loser.slaveName} has collected `, App.UI.DOM.makeElement("span", `many minor injuries.`, ["health",
					"dec"]));

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `reasonably impressed`, ["reputation", "inc"]),
						` by the show of strength.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is reasonably impressed by the show of strength, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is reasonable.`);
				}
			} else if (loser.belly > 300000) {
				r.push(`${winner.slaveName} wants to win badly enough that ${he} takes an extremely brutal shortcut to victory. The instant the fight starts, ${he} quickly knees ${loser.slaveName} in the stomach. The massively swollen ${loser.slaveName} goes down with a loud thud and plenty of jiggling. ${winner.slaveName} gloats over the struggling ${loser.slaveName} watching as ${he2} is unable to pull ${his2} bloated form off the ground.`);

				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
						` by this easy win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is unimpressive.`);
				}
			} else if (loser.boobs > 1200) {
				r.push(`${winner.slaveName} wants to win badly enough that ${he} takes an extremely simple shortcut to victory. The instant the fight starts, ${he} hits ${loser.slaveName} right in ${his2} huge tits, as hard as ${he} can. This is a sucker punch of the worst kind; ${loser.slaveName}'s boobs are so big that ${he2} has no real chance of defending them. ${He2} gasps with pain${hasAnyArms(loser) ? ` and wraps ${his2} ${hasBothArms(loser) ? `arms` : `arm`} around ${his2} aching bosom` : ``}, giving ${winner.slaveName} a clear opening to deliver a free and easy blow to the jaw that sends the poor top-heavy slave to the mat. Any chance of ${loser.slaveName} rising is extinguished by ${his2} breasts; it takes ${him2} so long to muster an attempt to get up that ${winner.slaveName} can rain hits on ${him2} while ${he2} does.`);

				success = 0.125;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
						` by this easy win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is unimpressive.`);
				}
			} else if (loser.dick > 0) {
				r.push(`${winner.slaveName} wants to win badly enough that ${he} takes an extremely unpleasant shortcut to victory. The instant the fight starts, ${he} furiously goes for ${loser.slaveName}'s eyes${hasBothArms(winner) ? `, hands forming claws` : hasAnyArms(winner) ? `, ${his} hand forming a claw` : ``}. ${loser.slaveName} ${hasAnyArms(loser) ? `defends ${himself2} with ${his2} ${hasBothArms(loser) ? `arms` : `arm`}` : `tries to defend ${himself} as best ${he} can`}, at which point ${winner.slaveName} delivers a mighty cunt punt. ${loser.slaveName} goes straight down, ${his2} mouth soundlessly opening and closing and tears leaking from ${his2} closed eyes${hasAnyArms(loser)
					? ` while ${his} ${hasBothArms(loser)
						? `hands desperately shield`
						: `hand desperately shields`} ${his2} outraged pussy`
					: ``}. ${winner.slaveName} follows ${him2} down and puts the unresisting ${girl2}'s head in a simple lock.`);

				success = 0.125;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
						` by this easy win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is unimpressive.`);
				}
			} else if (loser.vagina > 0) {
				r.push(`${winner.slaveName} wants to win badly enough that ${he} takes an extremely unpleasant shortcut to victory. The instant the fight starts, ${he} furiously goes for ${loser.slaveName}'s eyes${hasBothArms(winner) ? `, hands forming claws` : hasAnyArms(winner) ? `, ${his} hand forming a claw` : ``}. ${loser.slaveName} ${hasAnyArms(loser) ? `defends ${himself2} with ${his2} ${hasBothArms(loser) ? `arms` : `arm`}` : `tries to defend ${himself} as best ${he} can`}, at which point ${winner.slaveName} delivers a mighty cunt punt. ${loser.slaveName} goes straight down, ${his2} mouth soundlessly opening and closing and tears leaking from ${his2} closed eyes${hasAnyArms(loser) ? ` while ${his} ${hasBothArms(loser) ? `hands` : `hand`} desperately shield${!hasBothArms(loser) ? `s` : ``} ${his2} outraged pussy` : ``}. ${winner.slaveName} follows ${him2} down and puts the unresisting ${girl2}'s head in a simple lock.`);

				success = 0.125;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
						` by this easy win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is unimpressive.`);
				}
			} else {
				r.push(`${winner.slaveName} wants to win badly enough that ${he} takes an extremely unpleasant shortcut to victory. The instant the fight starts, ${he} furiously goes for ${loser.slaveName}'s eyes, hands forming claws. ${loser.slaveName} defends ${himself2} with ${his2} arms, at which point ${winner.slaveName} delivers a clenched fist to ${loser.slaveName}'s throat. ${loser.slaveName} staggers back, wheezing for breath with tears leaking from ${his2} closed eyes. ${winner.slaveName} takes advantage of ${loser.slaveName}'s vulnerability to quickly trip and pin the coughing loser.`);

				success = 0.125;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ["reputation", "inc"]),
						` by this easy win.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy win, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ["cash", "inc"]),
						` is unimpressive.`);
				}
			}

			App.Events.addParagraph(parent, r);
		}

		/** @param {DocumentFragment} parent */
		function postFight(parent) {
			let r = [];

			const anus = "anus";
			const cunt = "cunt";
			const oral = "oral";
			const vaginal = "vaginal";
			const anal = "anal";


			const {he, his, him, He} = getPronouns(winner);
			const {his: his2, him: him2} = getPronouns(loser);

			const facefuck = `${He} considers ${his} options briefly, then hauls the loser to ${his2} knees for a facefuck.`;
			const winnerPenetrates = orifice => `${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`}, and penetrates the loser's ${orifice}.`;
			const loserProtest = `${canTalk(loser)
				? `${loser.slaveName} starts to scream a protest to stop ${winner.slaveName} raping ${him2} pregnant, but ${winner.slaveName} grinds ${his2} face into the mat to shut ${him2} up`
				: `${loser.slaveName} tries to gesture a protest before ${winner.slaveName} fills ${his2} fertile ${loser.mpreg && that.params.virginities !== anal ? `asspussy` : `pussy`} with cum, but ${winner.slaveName} grabs ${his2} ${hasBothArms(loser) ? `hands and pins them` : hasAnyArms(loser) ? `hand and pins it` : `neck firmly`} to keep ${him2} from complaining`}.`;

			const virginitySpan = App.UI.DOM.makeElement("span", ``, ["virginity", "loss"]);

			r.push(`You throw the victor's strap-on down to ${winner.slaveName}.`);

			if (canPenetrate(winner)) {
				r.push(`${He} has no need of it, only taking a moment to pump ${his} dick a few times to get it to rock hardness.`);
			} else if (winner.clit > 4) {
				r.push(`${He} has no need of it, since ${his} clit is big enough to use instead.`);
			} else if (winner.dick > 6 && !canAchieveErection(winner)) {
				r.push(`${He} needs it, since ${his} enormous dick can't get hard any longer (not like it would fit in ${loser.slaveName} anyway).`);
			} else if (winner.dick > 0) {
				r.push(`${He} needs it, since ${his} soft dick won't be raping anything.`);
			}

			if (V.pit.virginities === "all") {
				if (loser.vagina === 0 && canDoVaginal(loser) && loser.anus === 0 && canDoAnal(loser)) {
					r.push(`${He} respects ${loser.slaveName}'s virgin holes, and hauls the loser to ${his2} knees for a facefuck.`);

					actX(loser, oral);
				} else if (loser.vagina === 0 && canDoVaginal(loser) && canDoAnal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "pregnancy") {
						r.push(`and, after ${canSee(winner) ? `eyeing` : `feeling up`} ${his2} virgin vagina with desire, penetrates the loser's anus.`);
					} else {
						r.push(`and respects the rules by penetrating the loser's anus.`);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					actX(loser, anal);
				} else if (loser.anus === 0 && canDoVaginal(loser) && canDoAnal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "buttslut" || (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg && winner.fetish === "pregnancy")) {
						r.push(`and, after ${canSee(winner) ? `eyeing` : `feeling up`} ${his2} virgin anus with desire, penetrates the loser's cunt.`);
					} else {
						r.push(`and respects the rules by penetrating the loser's cunt.`);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, vaginal);
				} else if (canDoVaginal(loser)) {
					r.push(winnerPenetrates(cunt));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, vaginal);
				} else if (canDoAnal(loser)) {
					r.push(winnerPenetrates(anus));

					if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					actX(loser, anal);
				} else {
					r.push(facefuck);

					actX(loser, oral);
				}
			} else if (V.pit.virginities === "anal") {
				if (loser.vagina === 0 && canDoVaginal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "pregnancy") {
						virginitySpan.append(`take ${his2} virginity.`);
						r.push(`and gleefully takes advantage of your rules to `, virginitySpan);
					} else {
						virginitySpan.append(`breaks in ${his2} virgin vagina.`);
						r.push(`and `, virginitySpan);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					loser.vagina++;
					actX(loser, vaginal);
				} else if (loser.anus === 0 && canDoAnal(loser)) {
					r.push(`${canTalk(loser)
						? `${loser.slaveName} starts to scream a protest to stop ${winner.slaveName} raping ${him2} pregnant, but ${winner.slaveName} grinds ${his2} face into the mat to shut ${him2} up`
						: `${loser.slaveName} tries to gesture a protest before ${winner.slaveName} fills ${his2} fertile pussy with cum, but ${winner.slaveName} grabs ${his2} ${hasBothArms(loser) ? `hands and pins them` : hasAnyArms(loser) ? `hand and pins it` : `neck firmly`} to keep ${him2} from complaining`}.`);

					if (winner.fetish === "buttslut" || (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg && winner.fetish === "pregnancy")) {
						if (canDoVaginal(loser)) {
							r.push(`and penetrates the loser's cunt.`);

							if (canPenetrate(winner) && canImpreg(loser, winner)) {
								r.push(loserProtest);

								knockMeUp(loser, 50, 0, winner.ID);
							}

							loser.counter.vaginal++;
							V.vaginalTotal++;
						} else {
							r.push(`and finds only a pristine butthole waiting for ${him}. Respecting ${his2} anal virginity, ${he} hauls the loser onto ${his2} knees for a facefuck.`);

							actX(loser, oral);
						}
					}
				} else if (canDoVaginal(loser)) {
					r.push(winnerPenetrates(cunt));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, vaginal);
				} else if (canDoAnal(loser)) {
					r.push(winnerPenetrates(anus));

					if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					actX(loser, anal);
				} else {
					r.push(facefuck);

					actX(loser, oral);
				}
			} else if (V.pit.virginities === "vaginal") {
				if (loser.vagina === 0 && canDoVaginal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "pregnancy") {
						if (canDoAnal(loser)) {
							r.push(`and hungrily eyes ${his2} pristine vagina before penetrating the loser's ass.`);

							if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
								r.push(loserProtest);

								knockMeUp(loser, 50, 1, winner.ID);
							}

							actX(loser, anal);
						} else {
							r.push(`and hungrily eyes ${his2} pristine vagina before hauling the loser onto ${his2} knees for a facefuck.`);

							actX(loser, oral);
						}
					} else {
						if (canDoAnal(loser)) {
							r.push(`and penetrates the loser's ass.`);

							if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
								r.push(loserProtest);

								knockMeUp(loser, 50, 1, winner.ID);
							}

							actX(loser, anal);
						} else {
							r.push(`and finds only a pristine butthole waiting for ${him}. Respecting ${his2} anal virginity, ${he} hauls the loser onto ${his2} knees for a facefuck.`);

							actX(loser, oral);
						}
					}
				} else if (loser.anus === 0 && canDoAnal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "buttslut" || (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg && winner.fetish === "pregnancy")) {
						virginitySpan.append(`take ${his2} anal virginity.`);
						r.push(`and gleefully takes advantage of your rules to `, virginitySpan);
					} else {
						virginitySpan.append(`breaks in ${his2} virgin anus.`);
						r.push(`and `, virginitySpan);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					loser.anus++;
					actX(loser, anal);
				} else if (canDoVaginal(loser)) {
					r.push(winnerPenetrates(cunt));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, vaginal);
				} else if (canDoAnal(loser)) {
					r.push(winnerPenetrates(anus));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, anal);
				} else {
					r.push(facefuck);

					actX(loser, oral);
				}
			} else {
				if (loser.vagina === 0 && canDoVaginal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "pregnancy") {
						virginitySpan.append(`take ${his2} virginity.`);
						r.push(`and gleefully takes advantage of your rules to `, virginitySpan);
					} else {
						virginitySpan.append(`breaks in ${his2} virgin vagina.`);
						r.push(`and `, virginitySpan);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					loser.vagina++;
					actX(loser, vaginal);
				} else if (loser.anus === 0 && canDoAnal(loser)) {
					r.push(`${He} pushes ${loser.slaveName}'s back down onto the mat, forces ${his2} ${hasBothLegs(loser) ? `legs apart` : !hasAnyLegs(loser) ? `hips steady` : `leg aside`},`);

					if (winner.fetish === "buttslut" || (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg && winner.fetish === "pregnancy")) {
						virginitySpan.append(`take ${his2} anal virginity.`);
						r.push(`and gleefully takes advantage of your rules to `, virginitySpan);
					} else {
						virginitySpan.append(`breaks in ${his2} virgin anus.`);
						r.push(`and `, virginitySpan);
					}

					if (canPenetrate(winner) && canImpreg(loser, winner) && loser.mpreg) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					loser.anus++;
					actX(loser, anal);
				} else if (canDoVaginal(loser)) {
					r.push(winnerPenetrates(cunt));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 0, winner.ID);
					}

					actX(loser, vaginal);
				} else if (canDoAnal(loser)) {
					r.push(winnerPenetrates(anus));

					if (canPenetrate(winner) && canImpreg(loser, winner)) {
						r.push(loserProtest);

						knockMeUp(loser, 50, 1, winner.ID);
					}

					actX(loser, anal);
				} else {
					r.push(facefuck);

					actX(loser, oral);
				}
			}

			App.Events.addParagraph(parent, r);

			App.Events.addParagraph(parent, [...rape(), ...rapeEffects()]);

			r = [];
			if (winner.skill.combat < 60) {
				const experienceSpan = App.UI.DOM.makeElement("span", `improved ${his} combat skills.`, ["improvement"]);

				winner.skill.combat += 5 + Math.floor(0.5 * (winner.intelligence + winner.intelligenceImplant) / 32);
				r.push(`With experience in ${V.pit.name}, ${winner.slaveName} has `, experienceSpan);
			}

			loser.counter.pitLosses++;
			actX(winner, "penetrative");

			winner.counter.pitWins++;


			V.pitFightsTotal++;

			App.Events.addParagraph(parent, r);

			function rape() {
				const repSpan = App.UI.DOM.makeElement("span", ``, ["reputation", "inc"]);

				const r = [];

				const {he, his, He} = getPronouns(winner);
				const {he: he2, his: his2, him: him2, girl: girl2} = getPronouns(loser);

				if (winner.sexualFlaw === "malicious") {
					r.push(`${winner.slaveName} lives to torment and violate slaves. ${He} uses ${loser.slaveName} for ${his} `, App.UI.DOM.makeElement("span", `pleasure`, ["devotion",
						"inc"]), ` slapping ${him2} viciously, pinching ${him2} until ${he} draws blood, and showing off for the spectators.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`greatly enjoys`);
						r.push(`The audience `, repSpan, ` the depraved spectacle.`);

						repX(50, "pit", winner);
					}

					winner.devotion++;
				} else if (winner.sexualFlaw === "abusive") {
					r.push(`${winner.slaveName} lives to abuse and violate slaves. ${He} uses ${loser.slaveName} for ${his} `, App.UI.DOM.makeElement("span", `pleasure`, ["devotion",
						"inc"]), ` raping ${him2} mercilessly, striking ${him2} until ${he2} turns a deep reddish-purple, and showing off for the spectators.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`greatly enjoys`);
						r.push(`The audience `, repSpan, ` the depraved spectacle.`);

						repX(50, "pit", winner);
					}

					winner.devotion++;
				} else if (winner.energy > 95) {
					r.push(`${winner.slaveName} doesn't have to feign willingness to rape a slave ${girl2}. ${He} uses ${loser.slaveName} for ${his} `, App.UI.DOM.makeElement("span", `pleasure,`, ["devotion",
						"inc"]), ` groping ${him2}, kissing ${his2} unwilling mouth, and showing off for the spectators.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`greatly enjoys`);
						r.push(`The audience `, repSpan, ` the depraved spectacle.`);

						repX(50, "pit", winner);
					}

					winner.devotion++;
				} else if (winner.fetish === "sadist" && winner.fetishStrength > 60) {
					r.push(`${winner.slaveName} doesn't have to feign willingness abuse and violate a slave ${girl2}. ${He} uses ${loser.slaveName} for ${his} `, App.UI.DOM.makeElement("span", `pleasure`, ["devotion",
						"inc"]), ` slapping ${him2} cruelly, pinching ${him2} until ${he} draws blood, and showing off for the spectators.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`greatly enjoys`);
						r.push(`The audience `, repSpan, ` the depraved spectacle.`);

						repX(50, "pit", winner);
					}

					winner.devotion++;
				} else if (winner.devotion > 75) {
					r.push(`${winner.slaveName} is so broken to slavery that ${he} `, App.UI.DOM.makeElement("span", `enjoys`, ["devotion",
						"inc"]), ` winning the fight and raping ${loser.slaveName}.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`greatly enjoys`);
						r.push(`The audience `, repSpan, ` the depraved spectacle.`);

						repX(50, "pit", winner);
					}

					winner.devotion++;
				} else if (winner.devotion > 20) {
					r.push(`${winner.slaveName} understands ${his} role and thoroughly rapes ${loser.slaveName}.`);

					if (V.pit.audience !== "none") {
						repSpan.append(`enjoys`);
						r.push(`The audience `, repSpan, ` the spectacle.`);

						repX(25, "pit", winner);
					}
				} else {
					r.push(`${winner.slaveName} is unenthusiastic and just thrusts mechanically, to avoid being punished. ${He} `, App.UI.DOM.makeElement("span", `resents`, ["devotion",
						"dec"]), ` having to fight and fuck.`);

					if (V.pit.audience !== "none") {
						r.push(`The audience barely pays attention.`);
					}

					winner.devotion -= 2;
				}

				return r;
			}

			function rapeEffects() {
				const r = [];

				const {he, his, him, himself, He} = getPronouns(winner);
				const {he: he2, him: him2, He: He2} = getPronouns(loser);

				r.push(...winnerEffects(), ...loserEffects());

				if (loser.fetish !== "masochist" && loser.fetish !== "humiliation" && loser.sexualFlaw !== "self hating" && loser.relationship && loser.relationship < 5 && winner.ID === loser.relationshipTarget) {
					r.push(`Fighting and rape have `, App.UI.DOM.makeElement("span", `damaged`, ["relationship",
						"dec"]), ` the relationship between the slaves.`);
				}

				return r;

				function winnerEffects() {
					const r = [];

					if (winner.rivalry && loser.ID === winner.rivalryTarget) {
						r.push(`${He} `, App.UI.DOM.makeElement("span", `relishes`, ["devotion",
							"inc"]), ` the chance to abuse ${loser.slaveName}, whom ${he} dislikes.`);

						winner.devotion += 5;
					} else if (winner.relationship && loser.ID === winner.relationshipTarget) {
						if (winner.devotion > 20) {
							r.push(`${He} accepts having to abuse ${loser.slaveName}, and plans to make it up to ${him2} later.`);
						} else {
							r.push(`${He} `, App.UI.DOM.makeElement("span", `hates`, ["devotion",
								"dec"]), ` having to abuse ${loser.slaveName}.`);

							winner.devotion -= 10;
						}
					} else if (areRelated(winner, loser)) {
						if (winner.devotion > 20) {
							r.push(`${He} accepts having to abuse ${his} ${relativeTerm(winner, loser)}, ${loser.slaveName}, and plans to make it up to ${him2} later.`);
						} else {
							r.push(`${He} `, App.UI.DOM.makeElement("span", `hates`, ["devotion",
								"dec"]), ` having to abuse ${his} ${relativeTerm(winner, loser)}, ${loser.slaveName}.`);

							winner.devotion -= 10;
						}
					}

					if (winner.fetish === "sadist" && winner.fetishStrength > 90 && winner.sexualFlaw !== "malicious" && winner.devotion > 20) {
						r.push(`${He} noticed something while ${he} was raping ${loser.slaveName}; watching the way ${he2} writhed in pain was strangely satisfying, as ${he} was making ${him2} suffer. ${winner.slaveName} cums powerfully at the mere thought; ${he} has become `, App.UI.DOM.makeElement("span", `sexually addicted to inflicting pain and anguish.`, ["noteworthy"]));

						winner.sexualFlaw = "malicious";
					} else if (winner.fetish === "masochist" && winner.fetishStrength > 90 && winner.sexualFlaw !== "self hating" && winner.devotion < 20) {
						r.push(`${He} feels horrible after forcing ${himself} on ${loser.slaveName}; ${he} is the one that should suffer, not ${him2}. ${winner.slaveName} has `, App.UI.DOM.makeElement("span", `descended into true self hatred.`, ["noteworthy"]));

						winner.sexualFlaw = "self hating";
					} else if (winner.fetish === "dom" && winner.fetishStrength > 90 && winner.sexualFlaw !== "abusive" && winner.devotion > 20) {
						r.push(`${He} noticed something while ${he} was raping ${loser.slaveName}; watching the way ${he2} cowered before ${hasAnyArms(winner) ? `${his} raised palm` : `${him}`} was strangely satisfying, as were the painful moans that accompanied every forceful thrust. ${winner.slaveName} cums powerfully at the mere thought; ${he} has become `, App.UI.DOM.makeElement("span", `sexually abusive, getting off on the thrill of forcing ${himself} on other slaves.`, ["noteworthy"]));

						winner.sexualFlaw = "abusive";
					} else if (winner.behavioralFlaw === "none" && random(1, 100) < 5 && winner.devotion < 20) {
						r.push(`${He} begins to act `, App.UI.DOM.makeElement("span", `oddly`, ["flaw",
							"gain"]), ` after the fight; having to beat down and rape another slave may have affected ${him} mentally.`);

						winner.behavioralFlaw = "odd";
					}

					return r;
				}

				function loserEffects() {
					const trustSpan = App.UI.DOM.makeElement("span", `fears`, ["trust", "dec"]);

					const r = [];

					if (loser.sexualFlaw === "self hating") {
						r.push(`${loser.slaveName} feels ${he2} `, App.UI.DOM.makeElement("span", `deserved this.`, ["devotion",
							"inc"]));

						loser.devotion += 5;
					} else if (loser.fetish === "masochist" && loser.fetishStrength > 60 && loser.fetishKnown) {
						r.push(`${loser.slaveName} `, App.UI.DOM.makeElement("span", `gets off`, ["devotion",
							"inc"]), ` on being beaten and molested.`);

						loser.devotion += 5;
					} else if (loser.fetish === "humiliation" && loser.fetishStrength > 60 && loser.fetishKnown) {
						r.push(`${loser.slaveName} `, App.UI.DOM.makeElement("span", `enjoys`, ["devotion",
							"inc"]), ` the humiliation of being openly beaten and raped.`);

						loser.devotion += 5;
					} else if (loser.devotion < 50) {
						r.push(`${loser.slaveName} `, App.UI.DOM.makeElement("span", `resents`, ["devotion",
							"dec"]), ` being beaten and molested and `, trustSpan, ` that it will happen again.`);

						loser.devotion -= 10;
						loser.trust -= 10;
					}

					if (loser.rivalry && winner.ID === loser.rivalryTarget) {
						r.push(`${He2} is `, App.UI.DOM.makeElement("span", `embarrassed`, ["devotion",
							"dec"]), ` by losing to and being raped by ${winner.slaveName}, whom ${he2} dislikes, and `, trustSpan, ` that it will happen again.`);

						loser.devotion -= 10;
						loser.trust -= 10;
					} else if (loser.relationship && winner.ID === loser.relationshipTarget) {
						if (loser.devotion > 20) {
							r.push(`${He2} accepts ${winner.slaveName} having to rape ${him2}.`);
						} else {
							r.push(`${He2} `, App.UI.DOM.makeElement("span", `hates`, ["devotion",
								"dec"]), ` having to accept rape from ${winner.slaveName}, and `, trustSpan, ` that it will happen again.`);

							loser.devotion -= 10;
							loser.trust -= 10;
						}
					} else if (areRelated(loser, winner)) {
						if (loser.devotion > 20) {
							r.push(`${He2} accepts ${his} ${relativeTerm(loser, winner)}, ${winner.slaveName}, having to rape ${him2}, but ${he2} `, trustSpan, ` that it will happen again.`);

							loser.trust -= 10;
						} else {
							r.push(`${He2} `, App.UI.DOM.makeElement("span", `hates`, ["devotion",
								"dec"]), ` having to accept rape from ${his} ${relativeTerm(loser, winner)}, ${winner.slaveName}, and `, trustSpan, ` that it will happen again.`);

							loser.devotion -= 10;
							loser.trust -= 10;
						}
					}

					if (loser.fetish === "masochist" && loser.fetishStrength > 90 && loser.sexualFlaw !== "self hating") {
						r.push(`${He2} feels strangely content after being abused and violated; ${he2} is the one that should suffer, after all. ${loser.slaveName} has `, App.UI.DOM.makeElement("span", `descended into true self hatred.`, ["flaw",
							"gain"]));
						loser.sexualFlaw = "self hating";
					} else if (loser.behavioralFlaw === "none" && random(1, 100) < 5 && loser.devotion < 20) {
						r.push(`${He2} begins to act `, App.UI.DOM.makeElement("span", `oddly`, ["flaw",
							"gain"]), ` after the fight; losing and getting raped may have affected ${him2} mentally.`);

						loser.behavioralFlaw = "odd";
					}

					return r;
				}
			}
		}

		// Helper Functions

		/** @returns {boolean} Returns true if slave1 won */
		function getWinner() {
			// at equal deadliness, the fighters each have a 50% chance to win
			// deadliness difference of 0.5: 60% chance of the stronger fighter winning
			// deadliness difference of 1.0: 70% for the stronger fighter
			// deadliness difference of 2.0: 80% for the stronger fighter
			// deadliness difference of 4.0: 95% for the stronger fighter
			// deadliness difference of 7.0 or higher: 99% for the stronger fighter
			const limit = 99;
			const steepness = 0.8;

			// roll against the probability that the first fighter wins
			return random(1, 100) < fightProbability(deadliness(slave1).value, deadliness(slave2).value, limit, steepness);
		}
	}

	introCombatants(slave1, slave2) {
		return [`This fight is between`, App.UI.DOM.slaveDescriptionDialog(slave1), `and`,
			App.UI.DOM.combineNodes(contextualIntro(slave1, slave2, true), ".")];
	}
};
