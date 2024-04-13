App.Events.PEPitFight = class PEPitFight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.BodyguardID !== 0,
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];
		V.nextButton = "Continue";
		const slave = S.Bodyguard;
		const {
			He, His,
			he, him, his, himself
		} = getPronouns(slave);

		const deadlinessValue = deadliness(slave).value;

		App.Events.drawEventArt(node, slave, "no clothing");

		r.push(
			`It's time for the private fight you entered your Bodyguard in. It will take place in a back room of a well respected club. There is a ring set into the floor, and space for a handful of spectators, but the setup is quite spartan. The sport is just getting off the ground.`,
			App.UI.DOM.slaveDescriptionDialog(slave),
			`is first to walk into the ring. ${He}'s stark naked and is carrying a simple single-edged straight sword, identical to the one ${his} opponent will be using. The fight will be fair.`
		);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`Across the ring, ${his} opponent's owner nods civilly to you and examines ${slave.slaveName}.`);

		if (slave.skill.combat > 30) {
			r.push(`${His} combat skills greatly increase ${his} deadliness.`);
		}

		if (V.AgePenalty !== 0) {
			if (slave.physicalAge >= 100) {
				r.push(`${He} seems prepared for death, in a way.`);
			} else if (slave.physicalAge >= 85) {
				r.push(`${He} tries not to waste ${his} strength before the fight, knowing that ${his} extreme age won't allow ${him} a second wind.`);
			} else if (slave.physicalAge >= 70) {
				r.push(`${He} steadies ${himself} as well as ${he} can in ${his} advanced age.`);
			}
		}

		if (slave.muscles > 95 && slave.height >= 185) {
			r.push(`${His} huge muscles are an intimidating sight and, despite their massive size, ${he} is tall enough to not be hindered by them.`);
		} else if (slave.muscles > 95) {
			r.push(`${His} huge muscles are an intimidating sight, but may hinder ${his} flexibility.`);
		} else if (slave.muscles > 30) {
			r.push(`${His} muscles are a trim and powerful sight.`);
		} else if (slave.muscles < -95) {
			r.push(`${He} can barely stand, let alone ready ${his} weapon. ${His} feeble attempts elicit a roar of laughter from the spectators.`);
		} else if (slave.muscles < -30) {
			r.push(`${He} struggles to raise ${his} weapon. ${His} feeble attempts elicit a roar of laughter from the spectators.`);
		} else if (slave.muscles < -5) {
			r.push(`${He} is rather unfit; ${he} will likely be outmatched by near any real opponent.`);
		}

		if (slave.height >= 170) {
			r.push(`${His} height gives ${him} a reach advantage with ${his} sword.`);
		}

		if (slave.health.condition > 50) {
			r.push(`${His} shining health makes ${him} a better combatant.`);
		}

		if (slave.weight > 190) {
			r.push(`${His} extreme weight nearly immobilizes ${him}. ${He} struggles to move let alone fight.`);
		} else if (slave.weight > 160) {
			r.push(`${His} extreme weight limits ${his} mobility and range of motion, making ${him} an easy target.`);
		} else if (slave.weight > 130) {
			r.push(`${His} extreme weight holds ${him} back as a pit fighter.`);
		} else if (slave.weight > 30) {
			r.push(`${His} heavy weight is an impediment as a pit fighter.`);
		} else if (slave.weight < -10) {
			r.push(`${His} light weight is an impediment as a pit fighter.`);
		}

		if (slave.health.condition < -50) {
			r.push(`${His} poor health makes ${him} a weaker combatant.`);
		}

		if (slave.health.tired > 90) {
			r.push(`${He} is exhausted and can barely stay awake; ${he} won't put up a fight.`);
		} else if (slave.health.tired > 60) {
			r.push(`${He} is fatigued and will most likely never see it coming.`);
		} else if (slave.health.tired > 30) {
			r.push(`${He} is tired and more likely to take a hit than to give one.`);
		}

		if (slave.pregKnown === 1 || slave.bellyPreg >= 1500) {
			if (slave.bellyPreg >= 750000) {
				r.push(`${His} monolithic pregnancy guarantees ${his} loss; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target that threatens to drag ${him} to the ground. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent.`);
			} else if (slave.bellyPreg >= 600000) {
				r.push(`${His} titanic pregnancy is practically a guaranteed loss; ${he} can barely stand let alone fight.`);
			} else if (slave.bellyPreg >= 450000) {
				r.push(`${His} gigantic pregnancy is nearly a guaranteed loss; it presents an unmissable, indefensible target for ${his} adversary.`);
			} else if (slave.bellyPreg >= 300000) {
				r.push(`${His} massive pregnancy obstructs ${his} movement and greatly hinders ${him}. ${He} struggles to think of how ${he} could even begin to defend ${his} bulk.`);
			} else if (slave.bellyPreg >= 150000) {
				r.push(`${His} giant pregnancy obstructs ${his} movement and greatly slows ${him} down.`);
			} else if (slave.bellyPreg >= 100000) {
				r.push(`${His} giant belly gets in ${his} way and weighs ${him} down.`);
			} else if (slave.bellyPreg >= 10000) {
				r.push(`${His} huge belly is unwieldy and hinders ${his} efforts.`);
			} else if (slave.bellyPreg >= 5000) {
				r.push(`${His} advanced pregnancy makes ${him} much less effective.`);
			} else if (slave.bellyPreg >= 1500) {
				r.push(`${His} growing pregnancy distracts ${him} from the fight.`);
			} else {
				r.push(`The life just beginning to grow inside ${him} distracts ${him} from the fight.`);
			}
		} else if (slave.bellyImplant >= 1500) {
			if (slave.bellyImplant >= 750000) {
				r.push(`${His} monolithic, ${slave.bellyImplant}cc implant-filled belly guarantees ${his} loss; not only is ${he} on the verge of splitting open, but it is an unmissable, indefensible target that threatens to drag ${him} to the ground. ${He} has no hope of attacking around the straining mass, let alone stopping ${his} opponent.`);
			} else if (slave.bellyImplant >= 600000) {
				r.push(`${His} titanic, ${slave.bellyImplant}cc implant-filled belly is practically a guaranteed loss; ${he} can barely stand let alone fight. Not only is it cripplingly heavy, unwieldy and an easy target, but ${he} can feel it straining to hold the sheer amount of filler forced into it.`);
			} else if (slave.bellyImplant >= 450000) {
				r.push(`${His} gigantic, ${slave.bellyImplant}cc implant-filled belly is nearly a guaranteed loss; it presents an unmissable, indefensible target for ${his} adversary.`);
			} else if (slave.bellyImplant >= 300000) {
				r.push(`${His} massive, ${slave.bellyImplant}cc implant-filled belly is extremely heavy, unwieldy and an easy target, practically damning ${him} in combat.`);
			} else if (slave.bellyImplant >= 150000) {
				r.push(`${His} giant, ${slave.bellyImplant}cc implant-filled belly obstructs ${his} movement and greatly slows ${him} down.`);
			} else if (slave.bellyImplant >= 100000) {
				r.push(`${His} giant, ${slave.bellyImplant}cc implant-filled belly is very heavy and unwieldy, throwing off ${his} weight and making ${him} far less effective.`);
			} else if (slave.bellyImplant >= 10000) {
				r.push(`${His} huge, ${slave.bellyImplant}cc implant-filled belly is very heavy and unwieldy, throwing off ${his} weight and making ${him} far less effective.`);
			} else if (slave.bellyImplant >= 5000) {
				r.push(`${His} large, ${slave.bellyImplant}cc implant-filled belly is heavy and unwieldy, rendering ${him} less effective.`);
			} else if (slave.bellyImplant >= 1500) {
				r.push(`${His} swollen, ${slave.bellyImplant}cc implant-filled belly is heavy and makes ${him} less effective.`);
			}
		}
		if (isInLabor(slave)) {
			r.push(`${He}'s feeling labor pains. ${His} ${slave.pregType > 1 ? "children" : "child"} ready to be born.`);
		} else if (slave.preg >= slave.pregData.normalBirth && slave.pregControl !== "labor suppressors") {
			r.push(`${He}'ll be going into labor any time now and ${he} knows it.`);
		}

		if (slave.bellyFluid >= 10000) {
			r.push(`${His} hugely bloated, ${slave.inflationType}-filled belly is taut and painful, hindering ${his} ability to fight.`);
		} else if (slave.bellyFluid >= 5000) {
			r.push(`${His} bloated, ${slave.inflationType}-stuffed belly is constantly jiggling and moving, distracting ${him} and throwing off ${his} weight.`);
		} else if (slave.bellyFluid >= 2000) {
			r.push(`${His} distended, ${slave.inflationType}-belly is uncomfortable and heavy, distracting ${him}.`);
		}

		if (slave.teeth === "pointy") {
			r.push(`${His} sharp teeth add nothing to ${his} actual effectiveness, but they're certainly intimidating.`);
		}

		if (!canSee(slave)) {
			r.push(`${His} lack of eyesight means certain death.`);
		} else if (!canSeePerfectly(slave)) {
			r.push(`${His} poor eyesight makes ${him} a weaker fighter.`);
		}

		if (!canHear(slave)) {
			r.push(`${His} lack of hearing is a major detriment.`);
		} else if (
			(slave.hears === -1 && slave.earwear !== "hearing aids") ||
			(slave.hears === 0 && slave.earwear === "muffling ear plugs")
		) {
			r.push(`${His} lack of hearing is a minor detriment.`);
		}

		if (deadlinessValue > 5) {
			r.push(`${slave.slaveName} seems supremely confident, even eager to please you.`);
		} else if (deadlinessValue > 3) {
			r.push(`${slave.slaveName} seems nervous, but steels ${himself} to fight for you.`);
		} else if (deadlinessValue > 1) {
			r.push(`${slave.slaveName} seems terrified, and barely controls ${himself}.`);
		} else {
			r.push(`${slave.slaveName} is obviously terrified, and might flee if there were a way out of the pit.`);
		}

		r.push(`Finally, ${his} opponent enters as well.`);

		const randomOpponent = random(1, 120);
		const {
			HeU,
			himU, hisU, heU, womanU, girlU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		let opponent;
		if (randomOpponent > 100) {
			r.push(`${HeU} is a hulking, musclebound ${girlU} with a wasp waist and immense rear. ${HeU} seems nothing short of excited.`);
			opponent = 6;
		} else if (randomOpponent > 80) {
			r.push(`${HeU} is a huge, muscular Amazon filled with confidence.`);
			opponent = 5;
		} else if (randomOpponent > 60) {
			r.push(`${HeU} is a short but muscular ${girlU}, trying ${hisU} best to look confident.`);
			opponent = 4;
		} else if (randomOpponent > 40) {
			r.push(`${HeU} is a tall, thin ${womanU} covered in ropy muscle, trying to hide ${hisU} terror.`);
			opponent = 3;
		} else if (randomOpponent > 20) {
			r.push(`${HeU} is a decent-looking slave, physically fit but obviously scared.`);
			opponent = 2;
		} else {
			r.push(`${HeU} is an average looking slave, so frightened`);
			if (V.seePee === 1) {
				r.push(`there's urine running down ${hisU} leg.`);
			} else {
				r.push(`${hisU} teeth are audibly chattering.`);
			}
			r.push(`${HeU} must have really annoyed ${hisU} master to earn this.`);
			opponent = 1;
		}

		r.push(`The umpire announces gravely that the fight is to the death and rings a bell.`);

		App.Events.addParagraph(node, r);
		r = [];

		let damage;
		if (deadlinessValue > (opponent + 1)) {
			r.push(`${slave.slaveName} senses that ${he} is greatly superior, and decides to make a quick end before ${his} opponent can try something foolish. ${He} feints high and stabs low; ${his} enemy just manages to parry the low stab, but is so much weaker that ${slave.slaveName} simply overpowers ${himU}, so that ${heU} falls onto ${hisU} back with the force of the clash. ${slave.slaveName} takes one step forward and runs ${his} sword through the prostrate slave's heart. This victory has <span class="reputation inc">won you some renown</span> and <span class="cash inc">a sum of money</span> from each of the spectators.`);
			repX(500, "pit", slave);
			cashX(5000, "pit", slave);
			damage = 0;
			slave.counter.pitWins += 1;
			slave.counter.pitKills += 1;
			V.pitKillsTotal += 1;
		} else if (deadlinessValue > (opponent)) {
			r.push(`The combat is long and exhausting. ${slave.slaveName} and ${his} opponent are closely matched in terms of skill, so neither takes foolish risks and a protracted, bloody fight results as both slaves take horrible but non-life-threatening cuts. Finally, ${slave.slaveName}'s superior physical condition wins out and ${his} opponent falls from exhaustion and blood loss. ${slave.slaveName} stumbles over to open ${hisU} throat. This victory has <span class="reputation inc">won you some renown</span> and <span class="cash inc">a sum of money</span> from each of the spectators, though`);
			repX(500, "pit", slave);
			cashX(5000, "pit", slave);
			damage = 50;
			slave.counter.pitWins += 1;
			slave.counter.pitKills += 1;
			V.pitKillsTotal += 1;
		} else if (deadlinessValue > (opponent-1)) {
			r.push(`The combat is long and exhausting. ${slave.slaveName} and ${his} opponent are closely matched in terms of skill, so neither takes foolish risks and a protracted, bloody fight results as both slaves take horrible but non-life-threatening cuts. Finally, ${slave.slaveName}'s inferior physical condition fails ${him} and ${he} falls from exhaustion and blood loss. As ${he} slumps ${he} catches your eye with a look of apology. ${His} opponent stumbles over to open ${his} throat.`);
			damage = 1000;
		} else {
			r.push(`${slave.slaveName} is outmatched from the start. In the first pass, ${his} opponent moves beyond ${him}, opening a long gash in ${his} thigh as ${heU} goes. Thus injured, ${slave.slaveName} fails to block a slash that severs ${his} Achilles tendon on the other side. On ${his} knees, ${he} barely manages to ward off one more blow before the second one opens ${his} belly.`);
			damage = 1000;
		}

		healthDamage(slave, damage);
		if (slave.health.health < -90) {
			r.push(`${slave.slaveName} <span class="health dec">has been killed.</span>`);
			removeSlave(slave);
		} else if (damage) {
			r.push(`${slave.slaveName} is <span class="health dec">badly hurt.</span>`);
		}

		V.pitFightsTotal++;
		App.Events.addParagraph(node, r);
	}
};

