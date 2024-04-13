/** Lethal 1v1 between random slaves. */
App.Facilities.Pit.Fights.LR1v1 = class extends App.Facilities.Pit.Fights.BaseFight {
	fightDescription() {
		const f = new DocumentFragment();
		f.append("1-vs-1 fight between ", App.UI.DOM.slaveDescriptionDialog(getSlave(this.actors[0])), ` and `,
			contextualIntro(getSlave(this.actors[0]), getSlave(this.actors[1]), true), ".");
		return f;
	}

	get lethal() {
		return true;
	}

	get impact() {
		return 5;
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

		/** @param {DocumentFragment} parent */
		function intro(parent) {
			const r = [];

			App.Events.drawEventArt(node, [slave1, slave2], "no clothing");

			r.push(...that.introCombatants(slave1, slave2));

			if (V.pit.audience === "none") {
				r.push(`You are alone above the pit, left to watch them kill and die in private.`);
			} else if (V.pit.audience === "free") {
				r.push(`Your guests line the rim of the pit, joking and betting, nervous and excited by the close prospect of watching a slave die.`);
			} else {
				r.push(`The attendees line the rim of the pit, betting and arguing, nervous and excited by the close prospect of watching a slave die.`);
			}

			if (FutureSocieties.isActive('FSRomanRevivalist')) {
				r.push(`They `, App.UI.DOM.makeElement("span", `passionately approve`, ['reputation',
					'inc']), ` of your hosting lethal combat between slaves; this advances ideas from antiquity about what public events should be.`);

				repX(20 * V.FSSingleSlaveRep * (V.arcologies[0].FSRomanRevivalist / V.FSLockinLevel), "pit");
				V.arcologies[0].FSRomanRevivalist += (0.4 * V.FSSingleSlaveRep);
			} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
				r.push(`They `, App.UI.DOM.makeElement("span", `approve`, ['reputation',
					'inc']), ` of your hosting lethal combat; this advances ideas that blood must flow as it did in ancient times.`);

				repX(10 * V.FSSingleSlaveRep * (V.arcologies[0].FSAztecRevivalist / V.FSLockinLevel), "pit");
				V.arcologies[0].FSAztecRevivalist += (0.2 * V.FSSingleSlaveRep);
			}

			r.push(`You review the rules — the combatants will use their choice of swords, and the fight will be to the death, with both fighters executed if no decision is reached. The winner will earn two complete days of rest, not to mention continued life. You take a moment to look over your fighters one more time before giving the word. After all, this is likely the last time you'll see one of them alive.`);


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
				willingness(),
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
			);

			if (V.debugMode) {
				r.push(App.UI.DOM.combineNodes("(Deadliness: ", DeadlinessTooltip(fighter), ")"));
			}

			App.Events.addParagraph(parent, r);

			function confidence() {
				if (fighter.fetish === Fetish.MINDBROKEN) {
					return `${fighter.slaveName} is too broken to care about whether ${he} lives or dies;`;
				} else if (fighterDeadliness > 5) {
					return `${fighter.slaveName} seems very confident;`;
				} else if (fighterDeadliness > 3) {
					return `${fighter.slaveName} seems nervous, but steels ${himself};`;
				} else if (fighterDeadliness > 1) {
					return `${fighter.slaveName} seems hesitant and unsure;`;
				} else {
					return `${fighter.slaveName} is obviously terrified, and might flee if there were a way out of the pit;`;
				}
			}

			function willingness() {
				if (fighter.fetish === Fetish.MINDBROKEN) {
					return `${he} is indifferent to the prospect of killing, as well.`;
				} else if (fighter.devotion > 95) {
					return `${he} is clearly willing to do ${his} best to kill for you.`;
				} else if (fighter.fetish === "sadist" && fighter.fetishKnown && fighter.fetishStrength > 60) {
					return `the prospect of killing does not seem to concern ${him}.`;
				} else if (fighter.devotion > 50) {
					return `${he} obviously does not want to kill, but will do as you order.`;
				} else if (fighter.devotion > -20) {
					return `${he} is clearly unhappy at the prospect of killing, but knows that the alternative is death.`;
				} else {
					return `${he} knows that it's kill or be killed, and puts aside ${his} hatred of you in an effort to live.`;
				}
			}

			function skill() {
				if (fighter.skill.combat > 30) {
					return `${His} grip on ${his} sword is sure and easy.`;
				}
			}

			function age() {
				if (V.AgePenalty !== 0) {
					if (fighter.physicalAge >= 100) {
						return `${He} seems prepared for death, in a way.`;
					} else if (fighter.physicalAge >= 85) {
						return `${He} tries not to waste ${his} strength before the fight, knowing that ${his} extreme age won't allow ${him} a second wind.`;
					} else if (fighter.physicalAge >= 70) {
						return `${He} steadies ${himself} as well as ${he} can in ${his} advanced age.`;
					}
				}
			}

			function muscles() {
				if (fighter.muscles > 95) {
					return `${He} is wielding a massive two-handed blade few others could even heft.`;
				} else if (fighter.muscles > 30) {
					return `${He} is strong enough to handle a bastard sword.`;
				} else if (fighter.muscles > 5) {
					return `${He} has selected a longsword suited to ${his} strength.`;
				} else if (fighter.muscles < -95) {
					return `${He} has selected a meager dagger; even then ${he} can barely wield it.`;
				} else if (fighter.muscles < -30) {
					return `${He} has selected a dagger, the heaviest weapon ${he} can manage.`;
				} else if (fighter.muscles < -5) {
					return `${He} has selected a short sword, despite being able to barely lift it.`;
				} else {
					return `${He} has selected a short sword, the heaviest weapon ${he} can manage.`;
				}
			}

			function height() {
				if (fighter.height > 170) {
					return `${His} height gives ${him} a reach advantage.`;
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
					return `${His} extreme weight nearly immobilizes ${him}. ${He} struggles to move let alone fight.`;
				} else if (fighter.weight > 160) {
					return `${His} extreme weight limits ${his} mobility and range of motion, making ${him} an easy target.`;
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
					return `${He} is fatigued, sapping the strength ${he}'ll need to strike true.`;
				} else if (fighter.health.tired > 30) {
					return `${He} is tired and more likely to take a hit than to give one.`;
				}
			}

			function pregnancy() {
				if (fighter.pregKnown || fighter.bellyPreg > 1500) {
					if (fighter.bellyPreg > 750000) {
						return `${His} monolithic pregnancy guarantees ${his} and ${his} many, many children's deaths; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent. ${He} is damned.`;
					} else if (fighter.bellyPreg > 600000) {
						return `${His} titanic pregnancy is practically a death sentence; not only does ${he} risk bursting, but it is an unmissable, indefensible target. ${He} can barely keep it together while thinking about the lives of ${his} brood.`;
					} else if (fighter.bellyPreg > 450000) {
						return `${His} gigantic pregnancy practically damns ${him}; it presents an unmissable, indefensible target for ${his} adversary. ${He} can barely keep it together while thinking about the lives of ${his} brood.`;
					} else if (fighter.bellyPreg > 300000) {
						return `${His} massive pregnancy obstructs ${his} movement and greatly hinders ${him}. ${He} struggles to think of how ${he} could even begin to defend it from harm.`;
					} else if (fighter.bellyPreg > 150000) {
						return `${His} giant pregnancy obstructs ${his} movement and greatly slows ${him} down. ${He} tries not to think of how many lives are depending on ${him}.`;
					} else if (fighter.bellyPreg > 100000) {
						return `${His} giant belly gets in ${his} way and weighs ${him} down. ${He} is terrified for the lives of ${his} many children.`;
					} else if (fighter.bellyPreg > 10000) {
						return `${His} huge belly gets in ${his} way and weighs ${him} down. ${He} is terrified for the ${fighter.pregType > 1 ? `lives of ${his} children` : `life of ${his} child`}.`;
					} else if (fighter.bellyPreg > 5000) {
						return `${His} advanced pregnancy makes ${him} much less effective, not to mention terrified for ${his} child${fighter.pregType > 1 ? `ren` : ``}.`;
					} else if (fighter.bellyPreg > 1500) {
						return `${His} growing pregnancy distracts ${him} with concern over the life growing within ${him}.`;
					} else {
						return `The life just beginning to grow inside ${him} distracts ${him} from the fight.`;
					}
				} else if (fighter.bellyImplant > 1500) {
					if (fighter.bellyImplant > 750000) {
						return `${His} monolithic, ${fighter.bellyImplant}cc implant-filled belly guarantees ${his} death; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target that threatens to drag ${him} to the ground. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent.`;
					} else if (fighter.bellyImplant > 600000) {
						return `${His} titanic, ${fighter.bellyImplant}cc implant-filled belly is practically a guaranteed death; ${he} can barely stand let alone fight. Not only is it cripplingly heavy, unwieldy and an easy target, but ${he} can feel it straining to hold the sheer amount of filler forced into it.`;
					} else if (fighter.bellyImplant > 450000) {
						return `${His} gigantic, ${fighter.bellyImplant}cc implant-filled belly is nearly a guaranteed death; it presents an unmissable, indefensible target for ${his} adversary.`;
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
					return `${He}'s feeling labor pains. ${His} ${fighter.pregType > 1 ? `children are` : `child is`} ready to be born, oblivious to the fact that it will mean the death of ${fighter.pregType > 1 ? `their` : `its`} mother.`;
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
					return `${His} lack of eyesight is certain death.`;
				} else if (!canSeePerfectly(fighter)) {
					return `${His} poor eyesight makes ${him} a weaker combatant.`;
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
						r.push(`The limits on ${his} cybernetic limbs have been lifted, turning them deadly.`);
					} else if (getLimbCount(fighter, 5) > 0) {
						r.push(`Their integral weapons are fully uncaged.`);
					}

					return r.join(' ');
				}
				if (hasAnyProstheticLimbs(fighter) && hasAnyQuadrupedLimbs(fighter)) {
					const r = [];

					r.push(`The pit lights gleam on ${his} quadrupedal limbs. The retractable claws of ${his} paws have been fully extended, ready to rip and tear.`);
					return r.join(' ');
				}
			}
		}

		/** @param {DocumentFragment} parent */
		function fight(parent) {
			const r = [];

			r.push(`In any case, both of the slaves been dosed with aggression enhancers and inhibition blockers; they'll fight to kill.`);

			const winnerDeadliness = deadliness(winner).value;
			const loserDeadliness = deadliness(loser).value;

			const {he, his, him, himself, girl, He} = getPronouns(winner);
			const {He: He2, he: he2, his: his2, him: him2, girl: girl2} = getPronouns(loser);

			if (!canSee(winner) && !canSee(loser)) {
				r.push(`${winner.slaveName} and ${loser.slaveName} are both blind, making the fight a staredown. Neither slave wants to make the first move, especially with the drowning cacophony coming from the jeering crowd. Slowly, ${winner.slaveName} moves forward, waving ${his} sword side to side in the hopes of finding ${his} opponent before ${he} ${himself} gets found. ${loser.slaveName}'s sword clips the tip of ${winner.slaveName}'s setting off a surprisingly brutal series of slashes. The two slaves violently lay into each other, suffering more and more strikes as the struggle goes on. Less than a minute from first contact, both slaves are lying in their combined blood. As you begin to call it a draw, you notice ${winner.slaveName} start to stir. ${He} staggers to ${his} feet, coated in ${his} and ${loser.slaveName}'s blood, before dropping back to ${his} knees. It seems ${he} lived through this fight; odds aren't likely ${he}'ll do it again.`);

				healthDamage(winner, 50);
				success = 0.25;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `surprised`, ['reputation', 'inc']),
						` by the sudden violence after so much standing around.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is surprised by the sudden violence after so much standing around, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is modest.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 1) && getArmCount(winner, 6) > 1) {
				r.push(`Upon your word the two combatants approach each other. ${winner.slaveName} does not carry a sword, raising only ${his} hands, but these are terrifying, modern weapons themselves. ${loser.slaveName} tries a probing sweep, but ${winner.slaveName} catches ${his2} blade in one hand, slides it down to the hilt with a shriek of metal on metal, and snaps the blade cleanly. ${loser.slaveName} ${canSee(loser) ? `watches this` : `freezes in place`}, dumbstruck, before regaining composure and taking a fighting stance again. ${winner.slaveName} manages to touch ${his} opponent's bare skin with ${his} own cybernetics, incapacitating ${loser.slaveName} with an electric shock. While ${loser.slaveName} is temporarily stunned, ${winner.slaveName} strikes ${loser.slaveName} on the head with deadly force, crushing ${his} opponent's skull. Though the fight was short,`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`the audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ['reputation', 'inc']),
						` by the display.`);
				} else if (V.pit.audience === "paid") {
					r.push(`the audience is quite impressed by the display, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is quite good.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 1) && getArmCount(winner, 5) > 1) {
				r.push(`Upon your word the two combatants approach each other. ${winner.slaveName} drops ${his} sword as ${he} comes, raising only ${his} hands, but these are terrifying, modern weapons themselves. ${loser.slaveName} tries a probing sweep, but ${winner.slaveName} catches ${his2} blade in one hand, slides it down to the hilt with a shriek of metal on metal, and snaps the blade cleanly. As ${loser.slaveName} watches this, dumbstruck, ${winner.slaveName} places a gentle hand under ${his2} chin and then extends that arm's integral blade up and through ${his} opponent's skull. Though the fight was short,`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`the audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ['reputation', 'inc']),
						` by the display.`);
				} else if (V.pit.audience === "paid") {
					r.push(`the audience is quite impressed by the display, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is quite good.`);
				}
			} else if (!canSee(winner)) {
				r.push(`${winner.slaveName} centers ${himself} and hones in on ${loser.slaveName}'s rapid breath. ${He} readies ${himself}, knowing ${he} has a single chance to live. With heavy steps, ${loser.slaveName} rushes ${him}, fully prepared to slaughter the helpless combatant. ${winner.slaveName} gambles everything on a single high slash, a slash that cut ${loser.slaveName}'s undefended neck wide open. ${winner.slaveName} collapses to the ground, fully aware of ${loser.slaveName}'s final gurgles, and the sword `,
					App.UI.DOM.makeElement("span", `firmly planted in ${his} side.`, ['health', 'dec']),
					` ${He} lived this time, barely, but ${he} doubts ${he} can do it again.`);

				healthDamage(winner, 80);
				success = 2;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `awestruck`, ['reputation', 'inc']),
						` by the blind ${girl}'s triumph.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is awestruck by the blind ${girl}'s triumph, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is enormous.`);
				}
			} else if (!canSee(loser)) {
				r.push(`${winner.slaveName} sighs at ${loser.slaveName}'s random slashing and calmly struts around the panicking slave. In one quick swoop, ${he} buries ${his} blade in ${loser.slaveName}'s back, ending the poor ${girl2}'s flailing.`);

				success = -0.1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `, App.UI.DOM.makeElement("span", `annoyed`, ["reputation",
						"dec"]), ` by this waste of a fight.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience found the fight embarrassing, and your `, App.UI.DOM.makeElement("span", `cut of the betting`, ['cash',
						'dec']), ` is pitiful.`);
				}
			} else if (winnerDeadliness > (loserDeadliness + 3)) {
				if (winner.skill.combat > 30) {
					r.push(`${winner.slaveName} wants to win, and ${he} opens the fight with a furious attack. ${loser.slaveName} manages to get ${his2} blade up, blocking a strike with a ringing clash and a few sparks, but by doing so leaves ${his2} abdomen open and obscures ${his2} vision enough that ${he2} is unprepared for the following horizontal slash, which opens ${his2} belly wide. The stricken ${girl2} collapses, feebly trying to push ${his2} viscera back into place. Whether out of mercy or a desire to get it over with, ${winner.slaveName} quickly removes the dying ${girl2}'s head.`);

					success = 0.2;

					if (V.pit.audience === "free") {
						r.push(`The audience is `,
							App.UI.DOM.makeElement("span", `reasonably impressed`, ['reputation', 'inc']),
							` by the gore.`);
					} else if (V.pit.audience === "paid") {
						r.push(`The audience is reasonably impressed by the gore, and your `,
							App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
							` is reasonable.`);
					}
				} else {
					r.push(`${winner.slaveName} wants to win and is confident ${he} will, but ${he} isn't particularly sure about how to do so. ${He} fights cautiously, swinging ${his} sword in powerful but inaccurate strokes. It is only a matter of time before one of these strikes gets through; it's telling that rather than hitting what ${he} aimed at, ${winner.slaveName} accidentally opens a massive gash down ${loser.slaveName}'s thigh. Realizing ${he2} has to do something, ${loser.slaveName} makes a desperate counterattack, pouring blood as ${he2} goes. ${winner.slaveName} panics and fails to parry one of the last counterstrikes before loss of blood ends the attack, suffering a `, App.UI.DOM.makeElement("span", `terrible cut`, ['health',
						'dec']), ` to ${his} shoulder. Down to one arm, ${winner.slaveName} is forced to make a long, loud butchery of ending the fight.`);

					healthDamage(winner, 20);
					success = 0.2;

					if (V.pit.audience === "free") {
						r.push(`The audience is `,
							App.UI.DOM.makeElement("span", `reasonably impressed`, ['reputation', 'inc']),
							` by the blood.`);
					} else if (V.pit.audience === "paid") {
						r.push(`The audience is reasonably impressed by the blood, and your `,
							App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
							` is reasonable.`);
					}
				}
			} else if (winner.skill.combat > 30 && loser.skill.combat > 30) {
				r.push(`Upon your word the two combatants approach each other warily, both knowing the other is reasonably competent. Before long they are trading thrust and parry, swing and block. ${winner.slaveName} is slowly pressed back, so ${he} decides to change the nature of the fight. After three tries ${he} manages to force ${loser.slaveName} to close, suffering a `, App.UI.DOM.makeElement("span", `nearly severed ear`, ['health',
					'dec']), ` as ${he} does. ${loser.slaveName} realizes ${he2} only retains an advantage at long range but cannot back up fast enough to avoid close combat. ${loser.slaveName} is forced back fast enough that ${he2} trips; ${he2}'s barely fallen on ${his2} back before ${he2} grunts with shock and pain, dying with a look of surprise as ${he2} stares at the sword growing out of ${his2} chest.`);

				success = 0.5;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `very impressed`, ['reputation', 'inc']),
						` by the expert fight.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is quite impressed by the expert fight, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is quite good.`);
				}
			} else if (winner.height - loser.height < -10) {
				r.push(`${winner.slaveName} realizes that ${loser.slaveName}'s wingspan gives ${him2} a huge reach advantage. ${He} bores straight in, taking `, App.UI.DOM.makeElement("span", `a glancing scalp wound`, ['health',
					'dec']), ` but coming on regardless. ${loser.slaveName} understands ${his2} opponent's intention and backs off, but the pit is small and there isn't much room to retreat. When ${his2} back hits a padded wall, ${winner.slaveName} aims a gutting cut that ${loser.slaveName} struggles to block. ${He2} manages it, but the wall catches ${his2} point, so the block is with ${his2} wrist, not ${his2} sword. The sharp blade cuts almost all the way through the joint, leaving ${him2} in agony and totally incapable of defense. ${winner.slaveName} pushes ${his2} head back against the wall and cuts ${his2} throat down to the spine.`);

				success = 0.2;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `reasonably impressed`, ['reputation', 'inc']),
						` by the blood.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is reasonably impressed by the blood, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is reasonable.`);
				}
			} else if (winner.muscles > 30) {
				r.push(`${winner.slaveName} is so massively muscular that ${he}'s actually impeded by ${his} lack of speed and flexibility. ${loser.slaveName} is properly afraid of ${his2} strength, though, so ${he2} tries to stay away as much as ${he2} can. The few times their blades clash reinforces this approach, since ${winner.slaveName} is able to beat ${his} opponent's blocks out of the way with contemptuous ease. The fight takes a long, long time, but it takes more out of ${loser.slaveName} to survive than it takes out of ${winner.slaveName} to keep swinging. Eventually the gasping, weeping ${loser.slaveName} trips and does not struggle to ${his2} feet in time. It takes ${his2} tired opponent several overhead butcher's cleaves to end it.`);

				success = 0.05;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `reasonably impressed`, ['reputation', 'inc']),
						` by the show of strength.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is reasonably impressed by the show of strength, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is reasonable.`);
				}
			} else if (loser.belly > 300000) {
				r.push(`${winner.slaveName} wants to live badly enough that ${he} takes an extremely brutal shortcut to victory. The instant the fight starts, ${he} quickly slices right across ${loser.slaveName}'s massive belly, which is far too large to possibly defend. ${loser.slaveName}'s belly ruptures like a popped water balloon, showering ${winner.slaveName} with`);

				if (loser.pregType > 0) {
					r.push(`blood. ${loser.slaveName} collapses into the pile of organs and babies released from ${his2} body.`);
				} else if (loser.bellyImplant > 0) {
					r.push(`blood and filler. ${loser.slaveName} collapses into the pool of organs and fluid released from ${his2} body.`);
				} else {
					r.push(`blood and ${loser.inflationType}. ${loser.slaveName} collapses into the pool of organs and fluid released from ${his2} body.`);
				}

				r.push(`${winner.slaveName} walks over to the bleeding out slave and quickly cuts ${his2} throat.`);

				success = 0.1;

				if (V.pit.audience === "free") {
					r.push(`the audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ['reputation', 'inc']),
						` by this easy kill.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy kill, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is unimpressive.`);
				}
			} else if (loser.boobs > 1200) {
				r.push(`${winner.slaveName} takes an extremely simple shortcut to victory. The instant the fight starts, ${he} slices ${loser.slaveName} right across ${his2} huge tits, which are so large they cannot properly be defended. ${loser.slaveName} reflexively drops ${his2} sword to clasp ${his2} ${hasBothArms(loser) ? `hands` : `hand`} over ${his2} ruined breasts, gushing blood${loser.boobsImplant > 400 ? ` and implant fluid` : ``}. ${winner.slaveName}'s follow-up is neither artful nor particularly well planned, but it is effective. ${He} hits the distracted ${girl2}'s neck from the side, almost but not quite separating ${his2} head from ${his2} body.`);

				success = 0.1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ['reputation', 'inc']),
						` by this easy kill.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy kill, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is unimpressive.`);
				}
			} else if (loser.dick > 0) {
				r.push(`${winner.slaveName} wants to live badly enough that ${he} takes an extremely brutal shortcut to victory. The instant the fight starts, ${he} furiously swings for ${loser.slaveName}'s face. ${loser.slaveName} reflexively raises ${his2} sword to block, at which point ${winner.slaveName} simply kicks ${him2} in the dick. ${loser.slaveName} goes down like a marionette with cut strings, ${his2} mouth soundlessly opening and closing and tears leaking from ${his2} closed eyes. ${winner.slaveName} walks over to the prostrate slave and cuts ${his2} throat without much trouble.`);

				success = 0.1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ['reputation', 'inc']),
						` by this easy kill.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy kill, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is unimpressive.`);
				}
			} else {
				r.push(`${winner.slaveName} wants to live badly enough that ${he} takes an extremely brutal shortcut to victory. The instant the fight starts, ${he} furiously swings for ${loser.slaveName}'s face. ${loser.slaveName} reflexively raises ${his2} sword to block, at which point ${winner.slaveName} simply kicks ${him2} in the cunt. ${loser.slaveName} goes down like a marionette with cut strings, ${his2} mouth soundlessly opening and closing and tears leaking from ${his2} closed eyes. ${winner.slaveName} walks over to the prostrate slave and cuts ${his2} throat without much trouble.`);

				success = 0.1;

				if (V.pit.audience === "free") {
					r.push(`The audience is `,
						App.UI.DOM.makeElement("span", `not very impressed`, ['reputation', 'inc']),
						` by this easy kill.`);
				} else if (V.pit.audience === "paid") {
					r.push(`The audience is not very impressed by this easy kill, and your `,
						App.UI.DOM.makeElement("span", `cut of the betting`, ['cash', 'inc']),
						` is unimpressive.`);
				}
			}

			App.Events.addParagraph(parent, r);
		}

		/** @param {DocumentFragment} parent */
		function postFight(parent) {
			const r = [];

			const {he, his, him, himself, He} = getPronouns(winner);
			const {sister: sister2} = getPronouns(loser);
			const mindbrokenSpan = App.UI.DOM.makeElement("span", `no longer capable`, ["red"]);

			r.push(`You let the winner ${winner.slaveName}, shaking as ${he} comes off the adrenaline, drugs, and fear, exit the pit.`);

			if (winner.fetish === Fetish.MINDBROKEN) {
				r.push(`${He} was already so broken before today that ${he} will not be seriously affected by having killed with ${his} own ${hasBothArms(winner) ? `hands` : `hand`}.`);
			} else if (winner.devotion > 95) {
				r.push(`${He} is so worshipful of you that ${he} does not see killing ${loser.slaveName} as special in ${his} own internal listing of things that ${he} has willingly done and would willingly do again on your behalf.`);
			} else if (winner.devotion > 80) {
				r.push(`${He} will never forget having killed ${loser.slaveName} with ${his} own ${hasBothArms(winner) ? `hands` : `hand`}. The only way ${he} will be able to live with ${himself} is to `, App.UI.DOM.makeElement("span", `subsume ${his} will to yours,`, ["devotion",
					"inc"]), ` telling ${himself} that the killing was to serve and obey you.`);

				winner.devotion += 10;
			} else if (winner.fetish === "sadist" && winner.fetishKnown && winner.fetishStrength > 60) {
				r.push(`${He} has sunk even deeper into cruelty, callousness, and a total disregard of the value of other slaves' lives. Going forward, ${he}'s even `, App.UI.DOM.makeElement("span", `less likely to question`, ["devotion",
					"inc"]), ` even the most abominable commands.`);

				winner.devotion += 10;
			} else if (winner.devotion > 50) {
				r.push(`${He} will never forget having killed ${loser.slaveName} with ${his} own ${hasBothArms(winner) ? `hands` : `hand`}. The only way ${he} will be able to live with ${himself} is to tell ${himself} that the killing was done on your orders.`);
			} else {
				r.push(`${He} will never forget having killed ${loser.slaveName} with ${his} own ${hasBothArms(winner) ? `hands` : `hand`}. The only way ${he} will be able to live with ${himself} is to `, App.UI.DOM.makeElement("span", `blame you,`, ["devotion",
					"dec"]), ` telling ${himself} that the killing was the only choice you gave ${him} if ${he} wanted to live.`);

				winner.devotion -= 10;
			}

			if (winner.fetish !== "sadist") {
				if (random(1, 100) > 50) {
					r.push(`Cruelty and callousness seeps its way into ${his} sexuality; ${he} has become a `, App.UI.DOM.makeElement("span", `bloody sadist.`, ["fetish",
						"gain"]));

					winner.fetish = "sadist";
					winner.fetishKnown = 1;
					winner.fetishStrength = 65;
				}
			}

			if (winner.rivalry && loser.ID === winner.rivalryTarget) {
				if (winner.devotion > 75) {
					r.push(`${He} is so accepting of the low value of slave life that ${he} `, App.UI.DOM.makeElement("span", `is pleased`, ["devotion",
						"inc"]), ` to have killed ${his} rival ${loser.slaveName}.`);

					winner.devotion += 4;
				}
			} else if (winner.relationship && loser.ID === winner.relationshipTarget) {
				if (winner.devotion > 95) {
					r.push(`${He} is so worshipful of you that ${he} sees the death of ${his} only friend at ${his} own hand as an `, App.UI.DOM.makeElement("span", `honorable`, ["devotion",
						"inc"]), ` end to their doomed slave relationship.`);

					winner.devotion += 4;
				} else {
					r.push(`${He} shows little reaction to the death of ${his} only friend at ${his} own hand. In the coming days, it becomes clear that this is because ${he} is `, mindbrokenSpan, ` of reacting to anything on an emotional level. Ever again.`);

					applyMindbroken(winner);
					winner.fetishKnown = 1;
				}
			} else if (isParentP(winner, loser) || isParentP(loser, winner)) {
				if (winner.devotion > 95) {
					r.push(`${He} is so worshipful of you that ${he} sees the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand as an `, App.UI.DOM.makeElement("span", `honorable`, ["devotion",
						"inc"]), ` end to their doomed family.`);

					winner.devotion += 4;
				} else {
					r.push(`${He} shows little reaction to the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand. In the coming days, it becomes clear that this is because ${he} is `, mindbrokenSpan, ` of reacting to anything on an emotional level. Ever again.`);

					applyMindbroken(winner);
					winner.fetishKnown = 1;
				}
			} else if (winner.sisters > 0) {
				switch (areSisters(winner, loser)) {
					case 1:
						if (winner.devotion > 95) {
							r.push(`${He} is so worshipful of you that ${he} sees the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand as an `, App.UI.DOM.makeElement("span", `honorable`, ["devotion",
								"inc"]), ` end to their doomed family.`);

							winner.devotion += 4;
						} else {
							r.push(`${He} shows little reaction to the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand. In the coming days, it becomes clear that this is because ${he} is `, mindbrokenSpan, ` of reacting to anything on an emotional level. Ever again.`);

							applyMindbroken(winner);
							winner.fetishKnown = 1;
						}
						break;
					case 2:
						if (winner.devotion > 90) {
							r.push(`${He} is so worshipful of you that ${he} sees the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand as an `, App.UI.DOM.makeElement("span", `honorable`, ["devotion",
								"inc"]), ` end to their doomed family.`);

							winner.devotion += 4;
						} else {
							r.push(`${He} shows little reaction to the death of ${his} ${relativeTerm(winner, loser)} at ${his} own hand. In the coming days, it becomes clear that this is because ${he} is `, mindbrokenSpan, ` of reacting to anything on an emotional level. Ever again.`);

							applyMindbroken(winner);
							winner.fetishKnown = 1;
						}
						break;
					case 3:
						if (winner.devotion > 85) {
							r.push(`${He} is so worshipful of you that ${he} sees the death of ${his} half-${sister2} at ${his} own hand as an `, App.UI.DOM.makeElement("span", `honorable`, ["devotion",
								"inc"]), ` end to their doomed family.`);

							winner.devotion += 4;
						} else {
							r.push(`${He} is `, App.UI.DOM.makeElement("span", `utterly devastated`, ["devotion",
								"dec"]), ` at being forced to take the life of ${his} half-${sister2}.`);

							winner.devotion -= 50;
						}
						break;
				}
			}

			if (winner.skill.combat < 60) {
				const experienceSpan = App.UI.DOM.makeElement("span", `improved ${his} combat skills.`, ["improvement"]);

				winner.skill.combat += 5 + Math.floor(0.5 * (winner.intelligence + winner.intelligenceImplant) / 32);
				r.push(`With lethal experience in ${V.pit.name}, ${winner.slaveName} has `, experienceSpan);
			}

			winner.counter.pitKills++;
			winner.counter.pitWins++;


			V.pitKillsTotal++;
			V.pitFightsTotal++;

			removeSlave(loser);

			App.Events.addParagraph(parent, r);
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
