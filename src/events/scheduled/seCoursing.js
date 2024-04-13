App.Events.SECoursing = class SECoursing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.LurcherID !== 0,
			() => V.policies.coursingAssociation === 1,
			() => (Math.trunc(V.week / 4) === (V.week / 4)),
			() => V.coursed === 0
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];
		V.coursed = 1;
		let caught = false;
		let phallus;

		const activeLurcher = getSlave(V.LurcherID);
		const {
			He, His,
			he, him, himself, his, wife, woman
		} = getPronouns(activeLurcher);

		/** @type {Array<"housewife" | "heavily pregnant" | "virgin" | "disobedient young" | "huge balled" | "feminized" | "disobedient young dickgirl">} */
		const possibleOrigins = [];
		if (V.seeDicks !== 100) {
			possibleOrigins.push("housewife");
			if (V.seePreg !== 0) {
				possibleOrigins.push("heavily pregnant");
			}
			possibleOrigins.push("virgin");
			possibleOrigins.push("disobedient young");
		}
		if (V.seeDicks !== 0) {
			possibleOrigins.push("huge balled");
			possibleOrigins.push("feminized");
			possibleOrigins.push("disobedient young dickgirl");
		}

		const hares = [
			genHare(1),
			genHare(2),
			genHare(3)
		];

		App.Events.drawEventArt(node, activeLurcher, "no clothing");

		r.push(`It's time to go coursing. You meet with fellow members of the Coursing Association while the automated maintenance drones clear the plaza and lay down the green, sharing a refined discussion of recent events`);
		if (V.PC.refreshmentType === 0) {
			r.push(`over a ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 1) {
			r.push(`over glasses of ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 2) {
			r.push(`over plates of ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 3) {
			r.push(`over hits of ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 4) {
			r.push(`over shots of ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 5) {
			r.push(`over handfuls of ${V.PC.refreshment}.`);
		} else if (V.PC.refreshmentType === 6) {
			r.push(`over tabs of ${V.PC.refreshment}.`);
		} else {
			r.push(`over.`);
		}
		r.push(`Once the field is ready, the day's hares are led out and chained in a row along one side of the plaza, naked. You and the other members watch this process intently, since you won't get any more information on them than what you can learn by looking.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The rules have been explained to the hares: they're to be freed if they can reach the other side of the plaza without being caught and raped by the lurchers who will be released to chase them.`);

		App.Events.addParagraph(node, r);
		r = [];
		r.push(`You lead your lurcher ${activeLurcher.slaveName} out on a leash, naked just like the hares.`);

		if (activeLurcher.dick > 0) {
			if (canPenetrate(activeLurcher) && activeLurcher.energy > 60 && activeLurcher.devotion > 20) {
				if (activeLurcher.dick > 4) {
					r.push(`${He}'s sporting an enormous half-erection, which has already been heavily lubricated to prevent permanent damage to the hares' holes. As you bring ${him} up to the mark, ${he} grabs its base and begins to slap it against ${his} thigh, hard. The hares look around to see what the wet smacking noise is, and are understandably frightened; one of them begins to beg openly. Your fellow competitors <span class="reputation inc">think this is hilarious.</span>`);
					repX(250, "event", activeLurcher);
					phallus = "huge dick";
				} else {
					r.push(`${He}'s ready to do ${his} best. Since ${he}'s concentrating on the immediate challenge of catching rather than the secondary challenge of raping, ${he} isn't hard yet, but ${he}'s not indifferent to the prospect of getting ${his} dick wet. There's a bead of precum forming at ${his} tip.`);
					phallus = "dick";
				}
			} else if (activeLurcher.tail === "sex") {
				r.push(`Although ${his} dick isn't really up to performing a sexual assault today, ${his} spade-tipped pleasure tail is sweeping back and forth and dripping lube. It's an unusual instrument for a lurcher, and one that <span class="reputation inc">fascinates</span> the watching crowd of spectators.`);
				repX(250, "event", activeLurcher);
				phallus = "tail";
			} else if (!canAchieveErection(activeLurcher)) {
				r.push(`There's no way ${he}'s going to be able to achieve an erection, so ${he}'s holding a lubricated dildo in one hand. This is technically permitted under the rules, but your fellow competitors and the crowd gathering to spectate <span class="reputation dec">consider it poor form.</span>`);
				repX(-50, "event", activeLurcher);
				phallus = "dildo";
			} else if (activeLurcher.energy <= 60 || activeLurcher.devotion <= 20) {
				r.push(`${He} looks nervous, and obviously doesn't find the situation arousing. ${He} knows ${he}'s to catch and then rape a slave, but may not be able to get hard enough to do the deed properly. Your fellow competitors and the crowd gathering to spectate <span class="reputation dec">are unimpressed</span> by ${his} lack of spirit.`);
				repX(-50, "event", activeLurcher);
				phallus = "fingers";
			} else {
				r.push(`${His} dick is not a fit instrument for sexual assault, so ${he}'s holding a lubricated dildo in one hand. This is technically permitted under the rules, but your fellow competitors and the crowd gathering to spectate <span class="reputation dec">consider it poor form.</span>`);
				repX(-50, "event", activeLurcher);
				phallus = "dildo";
			}
		} else if (activeLurcher.clit > 1 && activeLurcher.energy > 60 && activeLurcher.devotion > 20) {
			r.push(`${He}'s gently masturbating as you bring ${him} up to the mark, ${his} enormous clit becoming engorged and stiff. Your fellow competitors and the gathering crowd of spectators <span class="reputation inc">are fascinated,</span> realizing that ${he} intends to attempt rape with it.`);
			repX(250, "event", activeLurcher);
			phallus = "clit";
		} else if (activeLurcher.tail === "sex") {
			r.push(`${His} spade-tipped pleasure tail is sweeping back and forth and dripping lube, as if ${he}'s already seeking a target for it. It's an unusual instrument for a lurcher, and one that <span class="reputation inc">fascinates</span> the watching crowd of spectators.`);
			repX(250, "event", activeLurcher);
			phallus = "tail";
		} else if (V.seeDicks !== 0) {
			r.push(`${He}'s holding a lubricated dildo in one hand, since ${he}'s missing a natural phallus of ${his} own. This is technically permitted under the rules, but your fellow competitors and the crowd gathering to spectate <span class="reputation dec">consider it poor form.</span>`);
			repX(-50, "event", activeLurcher);
			phallus = "dildo";
		} else {
			r.push(`${He}'s holding a lubricated dildo in one hand. As you bring ${him} up to the mark, ${he} begins to slap it against ${his} thigh out of nervousness and eagerness to begin. The hares look around to see what the wet smacking noise is, and are understandably frightened; one of them begins to cry openly.`);
			phallus = "dildo";
		}

		if (canSee(activeLurcher)) {
			r.push(`${activeLurcher.slaveName} looks at you questioningly, wondering which of the hares ${he} should try to chase down and molest.`);
		} else {
			r.push(`${activeLurcher.slaveName} looks at you questioningly, wondering which of the dinging bells ${he} should try to chase down and molest.`);
		}
		App.Events.addParagraph(node, r);

		const table = App.UI.DOM.appendNewElement("table", node, null, "invisible");
		for (const hare of hares) {
			table.append(hare.row);
		}

		/** @returns {hareResults} */
		function genHare(num) {
			let r = [];
			const row = App.UI.DOM.makeElement("tr");
			let hareSpeed = 10;
			const origin = possibleOrigins.pluck(); /* select random origin and remove from list to avoid using same origin multiple times */
			let slave;
			if (origin === "virgin") {
				slave = GenerateNewSlave("XX", {maxAge: 20, disableDisability: 1});
				generateSalonModifications(slave);
				slave.anus = 1;
				slave.vagina = 0;
				actX(slave, "anal");
				if (slave.pubertyXX > 0) {
					slave.preg = -1;
				}
				slave.ovaries = 1;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.weight = random(-50, 50);
			} else if (origin === "heavily pregnant") {
				slave = GenerateNewSlave("XX", {
					minAge: V.fertilityAge, maxAge: 20, disableDisability: 1, ageOverridesPedoMode: 1
				});
				slave.anus = 1;
				slave.vagina = 1;
				actX(slave, "vaginal");
				slave.preg = random(30, 40);
				slave.pregKnown = 1;
				slave.pregType = 1;
				slave.pregWeek = slave.preg;
				SetBellySize(slave);
				slave.ovaries = 1;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.weight = random(-20, 100);
			} else if (origin === "housewife") {
				slave = GenerateNewSlave("XX", {minAge: 35, maxAge: 39, disableDisability: 1});
				slave.boobs += 800;
				slave.boobsImplant += 800;
				slave.boobsImplantType = "normal";
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.face = 55;
				slave.faceImplant += 20;
				slave.anus = 1;
				slave.vagina = 1;
				actX(slave, "anal");
				slave.preg = -1;
				slave.ovaries = 1;
				slave.skill.vaginal = 35;
				slave.skill.oral = 100;
				slave.skill.anal = 15;
				slave.skill.whoring = 35;
				slave.career = either("a housewife", "a trophy wife");
				slave.weight = random(-50, 100);
			} else if (origin === "disobedient young") {
				slave = GenerateNewSlave("XX", {maxAge: 25, disableDisability: 1});
				generateSalonModifications(slave);
				slave.anus = 1;
				slave.vagina = 1;
				actX(slave, "anal");
				if (slave.pubertyXX > 0) {
					slave.preg = -1;
				}
				slave.ovaries = 1;
				slave.skill.vaginal = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 15;
				slave.sexualFlaw = either("hates anal", "hates oral", "hates penetration", "idealistic");
				slave.behavioralFlaw = either("arrogant", "bitchy", "hates men");
				slave.energy = 10;
				slave.fetish = "none";
				slave.muscles = random(20, 50);
				slave.weight = random(-20, 20);
			} else if (origin === "disobedient young dickgirl") {
				slave = GenerateNewSlave("XY", {maxAge: 25, disableDisability: 1});
				generateSalonModifications(slave);
				slave.anus = 2;
				actX(slave, "anal");
				slave.dick = random(2, 4);
				slave.balls = random(2, 4);
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.penetrative = 15;
				slave.sexualFlaw = either("hates oral", "hates anal", "hates penetration");
				slave.behavioralFlaw = either("arrogant", "bitchy", "hates men");
				slave.attrXY = 0;
				slave.attrXX = 70;
				slave.fetish = "none";
				slave.muscles = random(20, 50);
				slave.weight = random(-20, 50);
			} else if (origin === "huge balled") {
				slave = GenerateNewSlave("XY", {maxAge: 25, disableDisability: 1});
				generateSalonModifications(slave);
				slave.anus = 1;
				actX(slave, "anal");
				slave.balls = 5;
				slave.scrotum = 5;
				slave.dick = random(3, 5);
				slave.skill.oral = 0;
				slave.skill.penetrative = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.weight = random(-50, 100);
			} else if (origin === "feminized") {
				slave = GenerateNewSlave("XY", {maxAge: 25, disableDisability: 1});
				generateSalonModifications(slave);
				slave.boobs += 800;
				slave.boobsImplant += 800;
				slave.boobsImplantType = "fillable";
				slave.butt += 1;
				slave.buttImplant += 1;
				slave.buttImplantType = "normal";
				slave.face = Math.clamp(slave.face + 20, -100, 100);
				slave.faceImplant += 20;
				slave.anus = 3;
				actX(slave, "anal");
				slave.balls = random(0, 1);
				slave.dick = random(1, 2);
				slave.skill.penetrative = 15;
				slave.skill.oral = 15;
				slave.skill.anal = 35;
				slave.skill.whoring = 15;
				slave.attrXY = 100;
				slave.attrXX = 0;
				slave.weight = random(-100, 200);
			}
			const {
				He2, His2,
				he2, his2, him2, girl2, woman2
			} = getPronouns(slave).appendSuffix("2");
			if (V.seeImages && V.seeReportImages) {
				App.UI.DOM.appendNewElement("div", row, App.Art.SlaveArtElement(slave, 0, 0), ["imageRef", "tinyImg"]);
			}
			r.push(`The ${ordinalSuffix(num)}`);

			if (origin === "virgin") {
				r.push(`is an appealingly young ${slave.race} ${girl2}, and has V symbols drawn over ${his2} cunt and on ${his2} lower back, in the interests of fairness. ${He2}'s a <span class="pink">double virgin. </span>`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} neck.`);
				}
			} else if (origin === "heavily pregnant") {
				r.push(`is ${addA(slave.race)} ${girl2}, young and healthy but <span class="pink">heavily pregnant.</span> ${He2}'s probably been selected to be a hare as a joke, or because someone hates ${him2}.`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is attached to ${his2} popped navel.`);
				}
			} else if (origin === "housewife") {
				r.push(`is ${addA(slave.race)} ${woman2}, no longer young, but attractive enough in a fake sort of way. ${He2} has obviously been crying, and has probably been recently enslaved from a comfortable life, like that of a <span class="pink">house${wife} or a trophy ${wife}. </span>`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} neck.`);
				}
			} else if (origin === "disobedient young") {
				r.push(`is a fit young ${slave.race} ${girl2}, and is far more watchful and alert than ${his2} fellow hares. ${He2} may be a <span class="pink">disobedient slave</span> here because ${he2} was difficult to train.`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} neck.`);
				}
			} else if (origin === "disobedient young dickgirl") {
				r.push(`is a strong young ${slave.race} slave who retains ${his2} cock and balls, and looks determined. Perhaps ${he2}'s a <span class="pink">resistant dickgirl</span> who's been difficult to turn into a good girl.`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} cock.`);
				}
			} else if (origin === "huge balled") {
				r.push(`is ${addA(slave.race)} slave whose distinguishing characteristic is a dangling scrotum and a pair of <span class="pink">huge balls.</span> This impediment bumps against ${his2} thighs as ${he2}'s made ready.`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} hefty testicles.`);
				}
			} else if (origin === "feminized") {
				r.push(`is ${addA(slave.race)} bitch with a tiny dick who has been <span class="pink">heavily feminized,</span> yet seems terrified and very new to slavery. ${His2} fake tits and girly behavior must be from ${his2} life before ${he2} was a slave.`);
				if (!canSee(activeLurcher)) {
					r.push(`To accommodate your blind lurcher, a bell is fastened around ${his2} neck.`);
				}
			}

			slave.origin = `Your lurcher ${activeLurcher.slaveName} caught $him coursing; $he was a ${origin} hare.`;
			setHealth(slave, jsRandom(30, 50));
			slave.devotion = random(-45, -25);
			slave.trust = random(-60, -75);
			slave.oldDevotion = slave.devotion;

			if (slave.physicalAge >= 100) {
				r.push(`${He2} is really, really old and won't stand a chance of shuffling off, though tackling ${him2} seems like it may be a bad idea.`);
				hareSpeed -= 5;
			} else if (slave.physicalAge >= 85) {
				r.push(`${He2} is very old and should be an easy catch.`);
				hareSpeed -= 4;
			} else if (slave.physicalAge >= 70) {
				r.push(`${He2} is old and slow.`);
				hareSpeed -= 3;
			}
			if (slave.weight > 190) {
				r.push(`${He2}'s practically all fat and no slave; ${he2}'s half-expected to roll ${his2} way to the finish like an overfed slutty bowling ball.`);
				hareSpeed -= 5;
			} else if (slave.weight > 160) {
				r.push(`${He2}'s a catastrophically fat slut of a slave, and may stand a better chance of getting away rolling than running.`);
				hareSpeed -= 3;
			} else if (slave.weight > 95) {
				r.push(`${He2}'s a ridiculously fat slut of a slave with plenty of flesh to grab on to; ${his2} constant jiggling will be a sight to behold, however.`);
				hareSpeed -= 2;
			} else if (slave.weight > 30) {
				r.push(`${He2}'s chubby enough that ${his2} weight will reduce ${his2} speed.`);
				hareSpeed -= 1;
			} else if (slave.weight < -95) {
				r.push(`${He2}'s so skinny that it's not likely ${he2}'s physically fit enough to be quick.`);
				hareSpeed -= 1;
			}
			if (slave.muscles > 50) {
				r.push(`${He2}'s so heavily muscled that ${he2}'s probably slower than ${he2} would be if ${he2} were merely fit.`);
				hareSpeed -= 1;
			} else if (slave.muscles > 30) {
				r.push(`${He2}'s quite toned, which will give ${him2} an edge once ${he2}'s up to speed.`);
				hareSpeed += 1;
			} else if (slave.muscles <= 5) {
				r.push(`${He2}'s soft, and ${his2} legs show no sign of tone at all.`);
				hareSpeed -= 1;
			}
			if (slave.height >= 185) {
				r.push(`${He2}'s tall enough that ${his2} height will probably slow ${him2} down.`);
				hareSpeed -= 1;
			} else if (slave.height < 150) {
				r.push(`${He2}'s short enough that ${his2} short legs will probably slow ${him2} down.`);
				hareSpeed -= 2;
			}
			if (slave.boobs >= 2000) {
				r.push(`${He2} has absurd tits that will destroy any chance ${he2} has of getting away.`);
				hareSpeed -= 2;
			} else if (slave.boobs >= 800) {
				r.push(`${He2} has huge boobs that will make it painful for ${him2} to run hard.`);
				hareSpeed -= 1;
			}
			if (slave.butt >= 6) {
				r.push(`${He2} has a monstrous bottom that won't help ${his2} gait.`);
				hareSpeed -= 1;
			}
			if (slave.dick >= 5) {
				r.push(`${His2} big cock is going to bounce around cruelly.`);
				hareSpeed -= 1;
			}
			if (slave.balls >= 5 && slave.scrotum > 0) {
				r.push(`${His2} balls are likely to hurt badly enough, running naked, to slow ${him2} down.`);
				hareSpeed -= 1;
			}
			if (slave.belly >= 60000) {
				r.push(`${He2}'s so massively pregnant it'll be lucky if ${he2} even makes it anywhere.`);
				hareSpeed -= 10;
			} else if (slave.belly >= 10000) {
				r.push(`${His2} pregnant belly will probably stop ${him2} from running at all.`);
				hareSpeed -= 5;
			} else if (slave.belly >= 5000) {
				r.push(`${He2}'s visibly pregnant and likely to be cautious and unsure about running.`);
				hareSpeed -= 3;
			} else if (slave.belly >= 1500) {
				r.push(`There is a slight roundness to ${his2} middle, likely an early pregnancy that will distract ${him2}.`);
				hareSpeed -= 1;
			}
			if (slave.health.tired > 90) {
				r.push(`${He2} is obviously tired and will likely be a quick catch.`);
				hareSpeed -= 5;
			} else if (slave.health.tired > 60) {
				r.push(`${He2} seems to be rather tired, which will slow ${him2} out of the gate.`);
				hareSpeed -= 2;
			} else if (slave.health.tired > 30) {
				r.push(`${He2} seems a little tired, which will slow ${his2} acceleration.`);
				hareSpeed -= 1;
			}
			if (V.debugMode) {
				r.push(`(Harespeed: ${hareSpeed})`);
			}
			/**
			 * @typedef hareResults
			 * @property {App.Entity.SlaveState} slave
			 * @property {number} number
			 * @property {string} origin
			 * @property {number} speed
			 * @property {HTMLTableRowElement} row
			 */

			/** @type {hareResults} */
			const result = {
				slave: slave, number: num, origin: origin, speed: hareSpeed, row: row
			};
			r.push(App.UI.DOM.makeElement("div", App.UI.DOM.link(
				`The ${ordinalSuffixWords(num)} hare`,
				() => {
					jQuery(node).empty().append(coursingRace(result));
				}
			), ['indent']));
			App.Events.addNode(row, r);
			return result;
		}

		function coursingRace(hare) {
			const result = new DocumentFragment();
			let r = [];
			let His2;
			let his2;
			let him2;
			let himself2;
			let He2;
			let he2;
			let woman2;
			let girl2;

			({
				He2, His2,
				he2, his2, him2, himself2, woman2, girl2
			} = getPronouns(hare.slave).appendSuffix("2")); // If you add to this, please add to the slower hare too.

			App.Events.drawEventArt(result, [activeLurcher, hare.slave], "no clothing");
			r.push(`You place your hand on the leash's quick release and`);
			if (canHear(activeLurcher)) {
				r.push(`whisper your direction into ${his} ear without letting the other competitors or their lurchers hear.`);
			} else {
				r.push(`gently point ${him} towards the target hare without letting the other competitors or their lurchers see.`);
			}
			r.push(`Then, you gently push ${him} down into ${his} starting crouch. The umpire trips the hares' releases, a few`);
			if (V.showInches === 2) {
				r.push(`yards`);
			} else {
				r.push(`meters`);
			}
			r.push(`in front of you and ${activeLurcher.slaveName}, and you instantly let your lurcher off ${his} leash.`);

			let lurcherSpeed = 10;
			if (activeLurcher.devotion > 50) {
				r.push(`${He}'s eager to do well for you, and immediately takes off.`);
				lurcherSpeed += 2;
			} else if (activeLurcher.trust < -20) {
				r.push(`${He}'s frightened of failing you, and immediately takes off.`);
				lurcherSpeed += 1;
			} else if (activeLurcher.devotion < -20) {
				r.push(`${He}'s disgusted by this, and is slow to start.`);
				lurcherSpeed -= 1;
			} else {
				r.push(`${He}'s a bit hesitant about this, but gets off reasonably well.`);
			}
			if (V.AgePenalty !== 0) {
				if (activeLurcher.physicalAge >= 100) {
					r.push(`The crowd bursts into raucous laughter as ${he} shuffles full speed ahead.`);
					lurcherSpeed -= 5;
				} else if (activeLurcher.physicalAge >= 85) {
					r.push(`The crowd bursts into laughter at the old ${woman} completely out of ${his} element.`);
					lurcherSpeed -= 3;
				} else if (activeLurcher.physicalAge >= 70) {
					r.push(`${He} isn't as young as ${he} used to be.`);
					lurcherSpeed -= 1;
				}
			}
			if (activeLurcher.health.condition > 60) {
				r.push(`${His} shining health allows ${him} to pour it on.`);
				lurcherSpeed += 1;
			} else if (activeLurcher.health.condition < 0) {
				r.push(`${His} poor health slows ${him} down.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.health.tired > 90) {
				r.push(`${He} is exhausted and can barely stay awake; side bets are starting up on how far ${he}'ll make it around the track.`);
				lurcherSpeed -= 5;
			} else if (activeLurcher.health.tired > 60) {
				r.push(`${He} is fatigued, sapping the strength ${he}'ll need to reach ${his} top speed.`);
				lurcherSpeed -= 2;
			} else if (activeLurcher.health.tired > 30) {
				r.push(`${He} is tired and liable to be a slow start.`);
				lurcherSpeed -= 1;
			}
			if (!canSee(activeLurcher)) {
				r.push(`${His} inability to see causes ${him} to be cautious of ${his} footing, making ${his} first several strides slow and uncertain.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.weight > 190) {
				r.push(`${He}'s so fat that ${his} run is nothing more than an out of breath waddle.`);
				lurcherSpeed -= 5;
			} else if (activeLurcher.weight > 160) {
				r.push(`It takes ${him} a while to get ${his} fat ass up to ${his} (rather pathetic) top speed, such as it is.`);
				lurcherSpeed -= 3;
			} else if (activeLurcher.weight > 95) {
				r.push(`It takes ${him} a while to get ${his} fat ass up to ${his} top speed, such as it is.`);
				lurcherSpeed -= 2;
			} else if (activeLurcher.weight > 30) {
				r.push(`It takes ${him} a while to get ${his} chubby body up to speed.`);
				lurcherSpeed -= 1;
			} else if (activeLurcher.weight < -95) {
				r.push(`${He}'s so thin that ${he} lacks the vigor to run really well.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.muscles > 50) {
				r.push(`${He}'s muscle-bound, without the range of motion to move freely.`);
				lurcherSpeed -= 1;
			} else if (activeLurcher.muscles > 30) {
				r.push(`${He}'s fit, and is able to maintain ${his} speed quite well once ${he} reaches it.`);
				lurcherSpeed += 1;
			} else if (activeLurcher.muscles <= 5) {
				r.push(`${He}'s soft, and is panting desperately within a few short strides.`);
				lurcherSpeed -= 1;
			} else if (activeLurcher.muscles <= -30) {
				r.push(`${He}'s very weak, and is panting desperately from just walking to the starting line.`);
				lurcherSpeed -= 4;
			} else if (activeLurcher.muscles <= -95) {
				r.push(`${He}'s physically frail, barely capable of walking let alone running.`);
				lurcherSpeed -= 20;
			}
			if (activeLurcher.height >= 185) {
				r.push(`${His} steps are long — too long, in fact: ${his} long legs slow ${his} gait.`);
				lurcherSpeed -= 1;
			} else if (activeLurcher.height < 150) {
				r.push(`${His} stride is too short, but it's the best ${his} little legs can manage.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.boobs >= 2000) {
				r.push(`${His} naked breasts slosh around wildly, ruining ${his} attempt at running.`);
				lurcherSpeed -= 2;
			} else if (activeLurcher.boobs >= 800) {
				r.push(`${His} big tits bounce energetically, looking quite nice but hurting ${his} speed.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.butt >= 6) {
				r.push(`${He} does ${his} best to stay light on ${his} feet despite ${his} inconveniently huge buttocks.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.dick >= 5) {
				r.push(`${His} cock bounces up and down wildly; ${he} does ${his} best to ignore it, but it does get in the way.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.balls >= 5) {
				r.push(`As you watch ${him} go, ${his} testicles smack into ${his} thigh, and ${he} gasps with pain.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.preg >= activeLurcher.pregData.normalBirth) {
				r.push(`${He} seems terrified that ${his} water might break if ${he} tried to move too fast.`);
				lurcherSpeed -= 10;
			} else if (activeLurcher.belly >= 120000) {
				r.push(`${He} can barely move ${himself}, let alone consider chasing something with ${his} titanic`);
				if (activeLurcher.bellyImplant > 100) {
					r.push(`belly implant`);
				} else {
					r.push(`pregnant belly`);
				}
				r.push(`in the way.`);
				lurcherSpeed -= 20;
			} else if (activeLurcher.belly >= 60000) {
				r.push(`${He} can barely waddle with ${his}`);
				if (activeLurcher.bellyImplant > 100) {
					r.push(`enormous belly implant.`);
				} else {
					r.push(`enormously pregnant belly.`);
				}
				lurcherSpeed -= 10;
			} else if (activeLurcher.belly >= 10000 && activeLurcher.bellyFluid < 2000) {
				r.push(`${He} can barely waddle along with ${his} huge`);
				if (activeLurcher.bellyImplant > 100) {
					r.push(`belly implant.`);
				} else {
					r.push(`pregnant belly.`);
				}
				lurcherSpeed -= 5;
			} else if (activeLurcher.bellyPreg >= 5000) {
				r.push(`${He} seems unwilling to really run while pregnant.`);
				lurcherSpeed -= 3;
			} else if (activeLurcher.bellyImplant >= 5000) {
				r.push(`${His} big belly implant hinders ${his} ability to run`);
				lurcherSpeed -= 2;
			} else if (activeLurcher.belly >= 1500) {
				r.push(`${He} keeps one hand on ${his} slightly swollen middle as ${he} runs.`);
				lurcherSpeed -= 1;
			}
			if (activeLurcher.bellyFluid >= 10000) {
				r.push(`${His} hugely bloated, ${activeLurcher.inflationType}-filled belly is taut and painful, forcing ${him} to a slow waddle.`);
				lurcherSpeed -= 5;
			} else if (activeLurcher.bellyFluid >= 5000) {
				r.push(`${His} bloated, ${activeLurcher.inflationType}-stuffed belly is constantly jiggling and moving, making it extremely difficult to run.`);
				lurcherSpeed -= 4;
			} else if (activeLurcher.bellyFluid >= 2000) {
				r.push(`${His} distended, ${activeLurcher.inflationType}-belly is uncomfortable and heavy, slowing ${him} down.`);
				lurcherSpeed -= 2;
			}

			if (lurcherSpeed > 10) {
				r.push(`${His} turn of speed is impressive.`);
			} else if (lurcherSpeed > 8) {
				r.push(`${He} runs reasonably fast.`);
			} else if (lurcherSpeed > 6) {
				r.push(`In all, ${he} runs slowly.`);
			} else if (lurcherSpeed > 4) {
				r.push(`In all, ${he} barely manages a quick jog.`);
			} else {
				r.push(`In all, ${he} can barely do more than stumble after the hares.`);
			}

			if (hare.speed >= lurcherSpeed) {
				if (hare.origin === "virgin") {
					r.push(`The virgin, however,`);
				} else if (hare.origin === "heavily pregnant") {
					r.push(`Despite ${his2} pregnancy, the hare`);
				} else if (hare.origin === "housewife") {
					r.push(`Despite ${his2} fake boobs, the hare`);
				} else if (hare.origin === "disobedient young") {
					r.push(`The fit young slave, however,`);
				} else if (hare.origin === "disobedient young dickgirl") {
					r.push(`The strong young slave, however,`);
				} else if (hare.origin === "huge balled") {
					r.push(`Despite ${his2} ridiculous ballsack, the hare`);
				} else {
					r.push(`Despite ${his2} fake boobs and exaggeratedly feminine gait, the hare`);
				}
				if (hare.speed > lurcherSpeed) {
					r.push(`immediately pulls away.`);
				} else {
					r.push(`manages to maintain ${his2} narrow head start.`);
				}
				r.push(`Realizing that ${he} stands no chance of catching ${his} assigned target, ${activeLurcher.slaveName}`);
				if (canSee(activeLurcher)) {
					r.push(`looks around for a slower hare.`);
				} else {
					r.push(`listens for a nearby bell.`);
				}

				// Secondary target
				const slowHare = hares.find(h => h.speed < hare.speed);
				if (slowHare) {
					hare = slowHare;
					({
						He2, His2,
						he2, his2, him2, himself2, woman2, girl2
					} = getPronouns(hare.slave).appendSuffix("2"));
					if (canSee(activeLurcher)) {
						r.push(`Seeing that the ${hare.origin} hare is slower,`);
					} else {
						r.push(`hearing the ${hare.origin} hare's bell nearby,`);
					}
					r.push(`${he} angles after ${him2} instead.`);
					if (hare.speed >= lurcherSpeed) {
						r.push(`${He} does no better with ${his} new target; ${his} course is over.`);
					} else if (random(1, 2) === 1) {
						r.push(`One of ${his} rival lurchers has the same idea, however, and tries to trip ${him} up.`);
						if (!canSee(activeLurcher)) {
							r.push(`Unable to see it coming, ${he} goes down with a crash; ${his} course is over.`);
						} else if (activeLurcher.skill.combat > 60) {
							r.push(`${He} parries the attempt with contemptuous ease and catches up to ${his} new target.`);
							caught = true;
						} else if (activeLurcher.tail === "combat") {
							r.push(`${He} lashes out at ${his} competitor with ${his} combat tail; ${his} rival stumbles in surprise, and ${he} easily catches up to ${his} new target.`);
							caught = true;
						} else if (activeLurcher.muscles > 30) {
							r.push(`${He} muscles through the attempt and catches up to ${his} new target.`);
							caught = true;
						} else {
							r.push(`${He} goes down with a crash; ${his} course is over.`);
						}
					} else {
						r.push(`${He} manages to overtake ${his} new target.`);
						caught = true;
					}
				} else {
					r.push(`${He} is stymied as every hare is faster than his ${hare.origin} hare.`);
				}
			} else {
				r.push(`${He} rapidly overtakes the ${hare.origin} hare.`);
				caught = true;
			}

			if (V.debugMode) {
				r.push(`(Lurcher's speed: ${lurcherSpeed}, Hare's speed: ${hare.speed})`);
			}

			App.Events.addParagraph(result, r);
			r = [];

			if (caught === true) {
				if (hare.origin === "heavily pregnant") {
					r.push(`${His} quarry is unwilling to be tackled, probably out of fear for ${his2} baby, and flings ${himself2} down as soon as ${activeLurcher.slaveName} gets near.`);
					if (!canSee(activeLurcher)) {
						r.push(`${He2} screams as ${he2} sees ${activeLurcher.slaveName} preparing to dive on ${him2}, alerting the blind lurcher that ${his} prey has already surrendered.`);
					}
				} else if (!canSee(activeLurcher) && random(1, 3) === 1) {
					r.push(`${His} prey takes advantage of ${his} lack of eyesight, baiting ${activeLurcher.slaveName} to dive in the wrong direction. As ${he} rises to ${his} feet, the slave is too far gone to make another lunge. ${activeLurcher.slaveName}'s course is over.`);
					caught = false;
				} else if (activeLurcher.skill.combat > 60) {
					r.push(`${His} tackle is expert: ${he} wraps ${his} quarry up and pulls ${him2} down, falling on top of the struggling body.`);
				} else if (activeLurcher.muscles > 30) {
					r.push(`${He}'s burly enough that ${he} tackles ${his} quarry by simple force, an approach no less effective for its inelegance.`);
				} else if (hare.origin === "virgin") {
					if (random(1, 3) === 1) {
						r.push(`The young slave manages to evade ${his} inexpert tackle, however, and there is no space for another before ${he} crosses the plaza. ${activeLurcher.slaveName}'s course is over.`);
						caught = false;
					} else {
						r.push(`${His} tackle is inexpert, but the young slave stumbles and falls anyway.`);
					}
				} else if (hare.origin === "housewife") {
					if (random(1, 4) === 1) {
						r.push(`The spoiled slave shows surprising agility, however, and evades ${activeLurcher.slaveName}'s inexpert attempts to tackle all the way across the plaza. ${His} course is over.`);
						caught = false;
					} else {
						r.push(`${His} tackle is inexpert, but the top-heavy bimbo goes down anyway.`);
					}
				} else if (hare.origin === "feminized") {
					if (random(1, 4) === 1) {
						r.push(`The sissy bitch shows surprising agility, however, and evades ${activeLurcher.slaveName}'s inexpert attempts to tackle all the way across the plaza. ${His} course is over.`);
						caught = false;
					} else {
						r.push(`${His} tackle is inexpert, but the sissy bitch goes down with a wail.`);
					}
				} else if (hare.origin === "huge balled") {
					if (random(1, 4) === 1) {
						r.push(`The slave shows surprising agility despite ${his2} flopping ballsack, and evades ${activeLurcher.slaveName}'s inexpert attempts to tackle all the way across the plaza. ${His} course is over.`);
						caught = false;
					} else {
						r.push(`${His} tackle is inexpert, but the slave goes down, screaming with pain when ${his2} balls get trapped under their combined weight.`);
					}
				} else {
					if (random(1, 2) === 1) {
						r.push(`The determined young slave evades ${his} inexpert attempts to tackle all the way across the plaza, however. ${activeLurcher.slaveName}'s course is over.`);
						caught = false;
					} else {
						r.push(`${His} tackle is inexpert, but the determined slave is unlucky, stumbling and going down anyway.`);
					}
				}
			}

			if (caught === true) { // Caught may have changed, check again.
				r.push(`The hare knows that once ${his2} knees touched the field, ${his2} chance at freedom was gone. ${He2} begins to cry`);
				if (phallus === "huge dick") {
					r.push(`and then scream as ${activeLurcher.slaveName}`);
					if (hare.origin === "virgin") {
						r.push(`rapes ${his2} virgin ass. The lurcher has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud. ${He} has to be very careful, since ${his} cock is big enough to seriously hurt an anal virgin, but despite ${his} care the racket is appallingly loud.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`fucks ${his2} cunt. As ${his2} belly attests, ${he2}'s no virgin, but the lurcher's dick is big enough to reach ${his2} cervix. ${His2} screams crescendo into shrieks as ${he2} experiences this internal torment.`);
					} else if (hare.origin === "housewife") {
						r.push(`fucks ${him2} in the ass. A kept ${woman2} like ${him2} is probably no stranger to giving up ${his2} butthole to please a cock, but ${he2} apparently isn't used to dick quite this formidable. The lurcher leaves ${him2} sobbing disconsolately with a fresh load of cum leaking out of ${his2} backdoor.`);
					} else if (hare.origin === "feminized") {
						r.push(`fucks ${him2} in the ass. The high-pitched shrieking produces some discussion in the crowd. If the slave didn't want huge cock up ${his2} girly anus, why did ${he2} feminize ${himself2} so thoroughly? A mystery.`);
					} else if (hare.origin === "huge balled") {
						r.push(`fucks ${him2} in the ass. The lurcher pounds ${him2} doggy style, taking nice long strokes that slide ${his} formidable shaft almost all the way out of ${his} victim's poor butthole before shoving it back in again. The slave's balls brush the field with each thrust.`);
					} else {
						r.push(`fucks ${him2} in the ass. ${He2} never stops struggling, though this isn't much proof of undiminished resistance. After all, the lurcher's dick is so big that ${he2}'d probably fight to get it out of ${his2} butthole even if ${he2} weren't in need of breaking.`);
					}
				} else if (phallus === "dick") {
					r.push(`as ${activeLurcher.slaveName}`);
					if (hare.origin === "virgin") {
						r.push(`penetrates ${his2} virgin ass. The lurcher has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud. You see ${his} back stiffen with overstimulation as ${he} experiences the rare delight of raping an anal virgin.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`uses ${his2} cunt. The lurcher pulls the slave upright so ${he} can cradle ${his2} pregnant belly while ${he} fucks ${him2}. When ${he2} climaxes, ${he} thrusts as deeply as ${he} can manage, though more cum won't make the slave any more pregnant.`);
					} else if (hare.origin === "housewife") {
						r.push(`fucks ${him2} in the ass. ${His2} tears seem to come more from disappointment than anal pain; a kept ${woman2} like ${him2} has probably put up with more than one buttfuck ${he2} didn't want.`);
					} else if (hare.origin === "feminized") {
						r.push(`fucks ${him2} in the ass. The whining produces some discussion in the crowd. If the slave didn't want cock up ${his2} girly anus, why did ${he2} feminize ${himself2} so thoroughly? A mystery.`);
					} else if (hare.origin === "huge balled") {
						r.push(`uses ${his2} anus. With them facing away from you, the coupling takes the usual stacked symmetry of a dickgirl fucking a dickgirl, though the bottom's generous balls sway eye-catchingly back and forth with the rhythm of the assrape.`);
					} else {
						r.push(`fucks ${him2} in the ass. ${He2} never stops struggling, which is eloquent proof of the slave's undiminished resolve to resist ${his2} lot in life. ${He2}'s probably been assraped more than once before today, but ${he2} fights this like it's the first time.`);
					}
				} else if (phallus === "clit") {
					r.push(`as ${activeLurcher.slaveName}`);
					if (hare.origin === "virgin") {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit into ${his} victim's virgin ass. The lurcher has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud. You see ${his} back stiffen with overstimulation as ${his} enormous bitch button slips up the slave's asshole.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit inside ${his} victim's cunt. The lurcher has to force the hare down, legs spread, in order to work ${his} enormous clit inside the slave, but ${he} manages it and you see ${his} back stiffen as ${his} pseudophallus, small by the standards of penises but much more sensitive, slides inside.`);
					} else if (hare.origin === "housewife") {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit inside ${his} victim's cunt. The slave doesn't seem to know what to make of this. Being raped by a huge clit is very probably a novel experience for ${him2}, but it isn't really painful. ${He2} closes ${his2} eyes and visibly tries to pretend it's a small penis.`);
					} else if (hare.origin === "feminized") {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit inside ${his} victim's experienced anus. The slave stiffens with shock. ${He2}'s obviously had quite a variety of things pushed up ${his2} girly butthole, but apparently this is ${his2} first time being fucked by a clit.`);
					} else if (hare.origin === "huge balled") {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit inside ${his} victim's asshole. The slave stiffens with shock. Though it's huge by the standards of clitorises, the pseudophallus isn't big enough to make assrape painful, but the extreme inversion of gender roles makes up for it, to go by the slave's horror.`);
					} else {
						r.push(`grinds ${himself} against the hare to get ${his} pseudophallic clit inside ${his} victim's asshole. The slave never stops struggling, which is eloquent proof of the slave's undiminished resolve to resist ${his2} lot in life. ${He2}'s probably been assraped by much larger phalli, but ${he2} fights it anyway.`);
					}
				} else if (phallus === "dildo") {
					r.push(`as ${activeLurcher.slaveName}`);
					if (hare.origin === "virgin") {
						r.push(`inserts ${his} dildo into the slave's virgin ass. The lurcher has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud. The dildo is reasonably sized and well lubricated, but the poor slave shrieks with anal pain anyway.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`pushes ${his} dildo inside the slave's fertile cunt. Desperate to preserve ${his2} baby, the slave complies as best ${he2} can. Taking the cue, your lurcher caresses ${him2}, producing a grotesque parody of loving pregnant sex that holds the crowd's attention.`);
					} else if (hare.origin === "housewife") {
						r.push(`pushes ${his} dildo up the slave's ass. A kept ${woman2} like ${him2} is not likely to be any stranger to sex toys, but to go by ${his2} reaction, ${he2} probably prefers to put them in ${his2} cunt.`);
					} else if (hare.origin === "feminized") {
						r.push(`pushes ${his} dildo up the slave's sissy ass. The whining produces some discussion in the crowd. Why would a ${girl2} who feminized ${himself2} so thoroughly have any problem with something being shoved inside ${his2} rear pussy? A mystery.`);
					} else if (hare.origin === "huge balled") {
						r.push(`pushes ${his} dildo up the slave's ass. Knowing that ${he} should do ${his} best to create a spectacle, ${he} takes the slave's dangling balls in one hand, squeezing them to force ${his} bottom to be a good little butthole bitch, and then stimulating them until the slave achieves a shameful anal orgasm.`);
					} else {
						r.push(`pushes ${his} dildo up the slave's ass. The slave never stops struggling, which is eloquent proof of the slave's undiminished resolve to resist ${his2} lot in life. ${He2}'s probably had several dildos pushed up ${his2} disobedient asshole, but it seems ${he2}'s determined to learn nothing.`);
					}
				} else if (phallus === "tail") {
					r.push(`as ${activeLurcher.slaveName}`);
					if (hare.origin === "virgin") {
						r.push(`pushes the well-lubricated tip of ${his} pleasure tail into the slave's virgin ass. The lurcher has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud. ${His} tail is not too thick and ${he} uses the lubrication function generously, but the poor slave shrieks with anal pain anyway.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`pushes the tip of ${his} pleasure tail inside the slave's fertile cunt. Desperate to preserve ${his2} baby, the slave complies as best ${he2} can. Taking the cue, your lurcher caresses ${him2} gently as ${his} flexible tail seeks ${his2} g-spot to make ${him2} cum.`);
					} else if (hare.origin === "housewife") {
						r.push(`pushes the tip of ${his} pleasure tail up the slave's ass. A kept ${woman2} like ${him2} is not likely to be any stranger to sex toys, but being assfucked by a tail is likely a completely novel experience for ${him2}.`);
					} else if (hare.origin === "feminized") {
						r.push(`pushes the tip of ${his} pleasure tail up the slave's sissy ass. The slave stiffens with shock. ${He2}'s obviously had quite a variety of things pushed up ${his2} girly butthole, but apparently this is ${his2} first time being fucked by a tail.`);
					} else if (hare.origin === "huge balled") {
						r.push(`pushes the tip of ${his} pleasure tail up the slave's ass. The slave stiffens with shock. Regardless of how much experience ${he2}'s had with anal toys, a tail squirming through ${his2} bowels and pushing on ${his2} prostate must be a novel experience. Playing up the spectacle, ${activeLurcher.slaveName} massages ${his2} balls with both hands, stimulating them until the hare achieves a shameful anal orgasm.`);
					} else {
						r.push(`pushes the tip of ${his} pleasure tail up the slave's ass. The slave never stops struggling, which is eloquent proof of the slave's undiminished resolve to resist ${his2} lot in life. ${He2}'s probably had things pushed up ${his2} ass before, but a tail worming its way uninvited into ${his2} bowels is not going to be easily forgotten.`);
					}
				} else {
					r.push(`as ${activeLurcher.slaveName} hesitates over ${him2}. The lurcher realizes that ${he} won't be able to get hard. Desperate to avoid failure, ${he}`);
					if (hare.origin === "virgin") {
						r.push(`shoves a couple of fingers into the slave's virgin ass. ${He} has to fuck the slave to claim ${him2} for you, and ${he} knows that a virgin pussy is more valuable than a virgin rosebud.`);
					} else if (hare.origin === "heavily pregnant") {
						r.push(`gives up and fingerfucks the pregnant ${girl2}. Desperate to preserve ${his2} baby, the slave complies as best ${he2} can, producing a contest between ${his2} attempts to go along and the lurcher's attempts to make it unpleasant. This degenerates into a sobbing cunt fisting session.`);
					} else if (hare.origin === "housewife") {
						r.push(`shoves a couple of fingers up the slave's ass. A kept ${woman2} like ${him2} is not likely to be any stranger to a little anal play, but ${he2} doesn't seem to be much of a fan. ${He2} does ${his2} best to relax, but it's obvious that ${he2} doesn't appreciate having ${his2} asshole fingered.`);
					} else if (hare.origin === "feminized") {
						r.push(`shoves ${his} fingers up the slave's sissy ass. It's so loose that this fails to have the desired effect. Afraid that ${he} has to produce some sort of reaction, the lurcher shoves ${his} entire fist up there, producing a wail of anal anguish.`);
					} else if (hare.origin === "huge balled") {
						r.push(`shoves a couple of fingers up the slave's ass. Casting about for something to do to distract from ${his} inadequacy, the lurcher seizes the slave's dangling balls and shoves one of them up ${his2} loosened butt. This produces a shriek of pain and surprise, followed by a long fight to get the other one up there.`);
					} else {
						r.push(`shoves a couple of fingers up the slave's ass. The slave never stops struggling, producing nothing more interesting than an extended wrestling match in which one of the parties has some fingers inside the other's butthole.`);
					}
					r.push(`The crowd is unimpressed by this disappointing display.`);
				}
				if (activeLurcher.fetishKnown === 1 && activeLurcher.fetishStrength > 60) {
					if (activeLurcher.fetish === "sadist") {
						r.push(`<span class="hotpink">What is finest in life,</span> in the mind of your sadistic lurcher?`);
						if (hare.origin === "virgin") {
							r.push(`To sodomize a virgin asshole, and to`);
							if (canHear(activeLurcher)) {
								r.push(`hear`);
							} else {
								r.push(`feel`);
							}
							r.push(`screams of anal pain.`);
						} else if (hare.origin === "heavily pregnant") {
							r.push(`To molest a pregnant slut, and`);
							if (canHear(activeLurcher)) {
								r.push(`hear`);
							} else {
								r.push(`see`);
							}
							r.push(`${him2} sob with fear.`);
						} else if (hare.origin === "housewife") {
							r.push(`To rape a stuck-up bitch, and`);
							if (canHear(activeLurcher)) {
								r.push(`hear`);
							} else {
								r.push(`see`);
							}
							r.push(`${him2} cry with anal pain.`);
						} else if (hare.origin === "feminized") {
							r.push(`To rape a sissy's asspussy, and`);
							if (canHear(activeLurcher)) {
								r.push(`hear`);
							} else {
								r.push(`see`);
							}
							r.push(`${him2} squeal.`);
						} else if (hare.origin === "huge balled") {
							r.push(`To abuse defenseless testicles, and make their owner scream.`);
						} else {
							r.push(`To rape a struggling victim, and`);
							if (canTaste(activeLurcher)) {
								r.push(`taste`);
							} else {
								r.push(`drink`);
							}
							r.push(`${his2} tears of defeat.`);
						}
						activeLurcher.devotion += 5;
					} else if (activeLurcher.fetish === "pregnancy" && hare.origin === "heavily pregnant") {
						r.push(`You lurcher is <span class="hotpink">thrilled</span> to have had the privilege of chasing down and raping a pregnant ${woman2}.`);
						activeLurcher.devotion += 5;
					}
				}
				seX(activeLurcher, "penetrative", "slaves", "vaginal");
				newSlave(hare.slave);/* skip New Slave Intro */
			} else {
				if (activeLurcher.devotion > 50) {
					r.push(`${He} makes ${his} way back to you dejectedly, hanging ${his} head.`);
				} else {
					r.push(`${He} makes ${his} way back to you slowly, doing ${his} best to look contrite.`);
				}
				const {hisU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
				r.push(`On the other side of the plaza, there is a scream of triumph followed by tears of joy as one of the hares successfully wins ${hisU} freedom. This cheerful noise mixes strangely with screams of a very different sort and the slap of flesh on flesh as a more successful lurcher rapes ${hisU} capture.`);
			}
			App.Events.addParagraph(result, r);
			return result;
		}
	}
};
