/**
 * @param {App.Entity.SlaveState} slave
 * @returns {DocumentFragment}
 */
App.PersonalAttention.slaveReport = function(slave) {
	const el = new DocumentFragment();
	if (V.personalAttention.task !== PersonalAttention.TRAINING) {
		return el; // not training any slaves this week
	}
	const pa = V.personalAttention.slaves.find((s) => s.ID === slave.ID);
	if (!pa) {
		return el; // not training this slave this week
	}

	// trying to train this slave this week
	const {
		He, His,
		he, his, him, himself, wife, girl, hers,
	} = getPronouns(slave);
	const {hisP, womenP, womanP, girlP} = getPronouns(V.PC).appendSuffix("P");
	const pcFrigid = isPlayerFrigid();
	let r = [];

	if (onBedRest(V.PC, true)) {
		r.push(`You`);
		if (pa.objective === "health") {
			r.push(`wanted to care for`);
		} else if (pa.objective === "ravish") {
			r.push(`really wanted to sate your lust in`);
		} else if (pa.objective === "ravished") {
			r.push(`really wanted to sate your urges using`);
		} else if (pa.objective === "torture") {
			r.push(`wanted to torment`);
		} else {
			r.push(`wanted to train`);
		}
		r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
		r.push(`this week, but you're not feeling up to it.`);
		App.Events.addNode(el, r, "div", "indent");
		return el;
	} else if (["combat training", "spar"].includes(pa.objective) && (!canWalk(V.PC) || !hasAnyArms(V.PC) || !hasAnyArms(slave) || !canWalk(slave) || slave.fetish === Fetish.MINDBROKEN || !canSee(slave))) {
		r.push(`As much as you'd like to train`);
		r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
		r.push(`this week,`);
		if (!canWalk(V.PC)) {
			r.push(`you won't be able to until you're back on your feet.`);
			if (!hasBothLegs(V.PC) || V.PC.physicalImpairment > 1) {
				r.push(`Since that will never happen,`);
				r.push(App.UI.DOM.makeElement("span", `you'll focus on building ${his} devotion for now.`, ["yellow"]));
				pa.objective = "build devotion";
			}
		} else if (!hasAnyArms(V.PC)) {
			r.push(`you wouldn't be able to without a helping hand, and then it wouldn't really be you training ${him}, would it?`);
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion.`, ["yellow"]));
			pa.objective = "build devotion";
		} else if (!canWalk(slave)) {
			r.push(`you won't be able to until you find a way to get ${him} back on ${his} feet;`);
			r.push(App.UI.DOM.makeElement("span", `${his} assignment has defaulted to fostering devotion.`, ["yellow"]));
			pa.objective = "build devotion";
		} else {
			r.push(`${he} lacks the ability to fight back;`);
			r.push(App.UI.DOM.makeElement("span", `${his} assignment has defaulted to fostering devotion.`, ["yellow"]));
			pa.objective = "build devotion";
		}
		App.Events.addNode(el, r, "div", "indent");
		return el;
	} else if (pa.objective === "ravish") {
		if (pcFrigid) {
			r.push(`You just aren't feeling up to fucking`);
			r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
			r.push(`at all lately.`);
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion.`, ["yellow"]));
			pa.objective = "build devotion";
			App.Events.addNode(el, r, "div", "indent");
			return el;
		} else if (!canAchieveErection(V.PC) && V.PC.vagina === -1 && V.PC.clit < 3) {
			r.push(`Plowing`);
			r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
			r.push(`senseless just isn't the same when you aren't getting any pleasure out of it.`);
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion`, ["yellow"]));
			r.push(`to better prepare ${him} for future fuckings.`);
			pa.objective = "build devotion";
			App.Events.addNode(el, r, "div", "indent");
			return el;
		} else if (!canDoVaginal(slave) && !canDoAnal(slave)) {
			r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
			r.push(`is completely secured in chastity, leaving no holes suitable for constant sex.`);
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion`, ["yellow"]));
			r.push(`until you decide what to do with ${him}.`);
			pa.objective = "build devotion";
			App.Events.addNode(el, r, "div", "indent");
			return el;
		}
	} else if (pa.objective === "ravished") {
		if (pcFrigid) {
			r.push(`You just don't feel like having sex with`);
			r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
			r.push(`right now.`);
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion.`, ["yellow"]));
			pa.objective = "build devotion";
			App.Events.addNode(el, r, "div", "indent");
		} else if (!canPenetrate(slave)) {
			r.push(`You find it rather difficult to get dicked when`);
			r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
			if (canAchieveErection(slave)) {
				r.push(`doesn't fit in your pussy.`);
			} else {
				r.push(`doesn't have a working one.`);
			}
			r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion`, ["yellow"]));
			r.push(`until you figure out what to do with ${him}.`);
			pa.objective = "build devotion";
			App.Events.addNode(el, r, "div", "indent");
			return el;
		}
	}

	// actually training this slave
	let currentSlaveValue = slave.training < 100 ? 0.2 : 0.5;
	let coloredText;
	let trainingEfficiency;
	let vaginalTrainingEfficiency;
	let dickTrainingEfficiency;
	let analTrainingEfficiency;
	let seed;
	let skillgainS = false;
	let skillgainP = false;
	let cumTotal = 0;
	let milkTotal = 0;
	let oldSkill;
	const hindranceMod = isHinderedDegree(V.PC);
	const pcHorny = isPlayerLusting();
	const nymphoMod = pcHorny ? .75 : 1;
	if (pa.objective === "health") {
		r.push(App.UI.DOM.makeElement("span", `You care for`, ["bold"]));
	} else if (pa.objective === "spar") {
		r.push(App.UI.DOM.makeElement("span", `You train with`, ["bold"]));
	} else if (pa.objective === "torture") {
		if (isAmputee(slave)) {
			r.push(`You strap down and`);
		} else if (hasBothArms(slave)) {
			r.push(`You chain up and`);
		} else {
			r.push(`You tightly bind and`);
		}
		r.push(App.UI.DOM.makeElement("span", `brutally torment`, ["bold"]));
	} else if (pa.objective === "ravish" || pa.objective === "ravished") {
		r.push(App.UI.DOM.makeElement("span", `Whenever your lust peaks, you take advantage of`, ["bold"]));
	} else {
		r.push(App.UI.DOM.makeElement("span", `You train`, ["bold"]));
	}
	r.push(App.UI.DOM.makeElement("span", slave.slaveName, ["slave-name"]));
	if (pa.objective === "ravish" || pa.objective === "ravished") {
		r.push(`to keep your arousal in check.`);
	} else {
		r.push(`when ${he} isn't otherwise occupied.`);
	}
	slave.training = Math.clamp(slave.training, 0, 100);
	slave.training += 50 + Math.trunc((V.PC.intelligence + V.PC.intelligenceImplant) / 4.33) - (slave.intelligence + slave.intelligenceImplant) / 5 + ((slave.devotion + slave.trust) / 10);
	if (hindranceMod <= .5 && slave.training >= 20) { // .training check to prevent worst case scenarios from going negative here.
		slave.training -= 10;
	}
	if ((V.PC.skill.slaving >= 100) && V.personalAttention.slaves.length === 1) {
		slave.training += 20; // negate bonus when splitting focus among slaves
	}
	switch (pa.objective) {
		case "build devotion": {
			let enjoyable = true;
			if (pcHorny && isHorny(slave)) {
				r.push(`It's quite simple, really. You and ${slave.slaveName} are both really horny, so you fuck, and keep fucking, and then fuck some more. Once you're both so exhausted that you can barely move, ${he}`);
				r.push(App.UI.DOM.makeElement("span", `leans in and gives you a kiss.`, ["devotion", "inc"]));
				SimpleSexAct.Player(slave, 15);
				V.PC.need = 0;
			} else if (V.PC.visualAge <= 12 && V.PC.visualAge < V.minimumSlaveAge && !acceptsUnderage(slave)) {
				if (pcHorny) {
					r.push(`You fuck ${slave.slaveName}, of course, but you try to do it slowly and lovingly, despite your lustful urges. ${He}'s accustomed to the slave life, so the experience should be novel for ${him}, but ${he} is so uncomfortable about your age that ${he} is unable to enjoy it much. Despite your efforts, ${he} is more`);
					r.push(App.UI.DOM.makeElement("span", `cowed by your advances`, ["devotion", "inc"]));
					r.push(`than touched by your affection.`);
					enjoyable = false;
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						seX(slave, "oral", V.PC, "penetrative", 4);
					} else if (V.PC.vagina >= 0) {
						seX(slave, "oral", V.PC, "vaginal", 4);
					}
					SimpleSexAct.Player(slave, 12);
				} else {
					r.push(`Since ${slave.slaveName} is uncomfortable with your age, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by inviting ${him} to join you in some childish escapades.`);
					if (slave.actualAge <= 12) {
						r.push(`The young ${girl} eagerly obliges and you have an enjoyable little playdate.`);
					} else {
						r.push(`${He} is hesitant at first, but loosens up once the game is underway.`);
						if (random(1, 2) === 1) {
							r.push(`${He} held nothing back and crushed you, but after a little pouting, you have to admit that it was still fun.`);
						} else {
							r.push(`You feel like ${he} let you win, but it was fun either way.`);
						}
					}
				}
			} else if (pcHorny) {
				r.push(`You fuck ${slave.slaveName}, of course, but you try to do it slowly and lovingly, despite your lustful urges. ${He}'s accustomed to the slave life, so the experience should be novel for ${him}, but you end up taking things too far and ruining the mood. Despite your efforts, ${he} is more`);
				r.push(App.UI.DOM.makeElement("span", `cowed by your advances`, ["devotion", "inc"]));
				r.push(`than touched by your affection.`);
				enjoyable = false;
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 4);
				} else if (V.PC.vagina >= 0) {
					seX(slave, "oral", V.PC, "vaginal", 4);
				}
				SimpleSexAct.Player(slave, 12);
			} else if (pcFrigid) {
				r.push(`Since you have little interest in sex, you spend some quality time with ${slave.slaveName} instead. ${He}'s accustomed to the slave life, so just sitting around and enjoying a movie with you is a novel experience for ${him} and ${he} is`);
				r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
				r.push(`${He} isn't used to being invited to activities that don't end in sex and ${he} finds it nice to be able to let ${his} guard down for once.`);
			} else if (slave.anus === 3 && slave.vagina === 3 && slave.geneMods.rapidCellGrowth !== 1 && random(1, 100) > 75) { // consider upping frequency?
				r.push(`${slave.slaveName} is a stretched-out, well-traveled slut. Some like their holes loose, but most prefer cunts and butts that don't make sloppy noises when fucked. So, you spend some quality care time with ${him}, carefully massaging ${his} abused holes with oils and lotions. ${He} comes, of course, but ${his} pussy and asshole do benefit from the treatment. You allow ${him} to service you with ${his} mouth to avoid spoiling your work right away. Afterward, ${he}`);
				if (hasAnyArms(slave)) {
					r.push(App.UI.DOM.makeElement("span", `hugs you and gives you a kiss.`, ["devotion", "inc"]));
				} else {
					r.push(App.UI.DOM.makeElement("span", `gives you a kiss and tries to hug you,`, ["devotion", "inc"]));
					r.push(`but without arms, all ${he} manages is a sort of nuzzle.`);
				}
				slave.vagina--;
				slave.anus--;
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 5);
				} else if (V.PC.vagina >= 0) {
					seX(slave, "oral", V.PC, "vaginal", 5);
				}
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.SUBMISSIVE) {
				r.push(`Since ${slave.slaveName} is a submissive, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by indulging ${his} need to be dominated. Already smiling to ${himself}, ${he} changes into bondage gear that`);
				if (canSee(slave)) {
					r.push(`blinds ${him},`);
				} else {
					r.push(`covers ${his} face,`);
				}
				if (hasAnyArms(slave)) {
					r.push(`forces ${his} ${(hasBothArms(slave)) ? `arms` : `arm`} behind ${his} back,`);
				}
				if (slave.vagina <= 0 && slave.anus <= 0) {
					r.push(`and`);
				}
				r.push(`forces ${him} to present ${his} breasts`);
				if (slave.vagina > 0 || slave.anus > 0) {
					r.push(`uncomfortably, and forces a painfully large dildo up ${his}`);
					if (slave.vagina > 0) {
						r.push(`vagina${(slave.anus > 0) ? ` and anus` : ``}.`);
					} else if (slave.anus > 0) {
						r.push(`anus.`);
					}
				} else {
					r.push(`uncomfortably.`);
				}
				r.push(`Thus attired, ${he} is forced to serve you in whatever petty ways occur to you. ${He} holds your tablet for you on ${his} upthrust ass as you work, holds a thin beverage glass for you in ${his} upturned mouth when you eat, and lies still so you can use ${his} ${slave.boobs >= 300 ? "tits" : "chest"} as a pillow whenever you recline. ${He} loves it.`);
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.DOM) {
				r.push(`Since ${slave.slaveName} is a dom trapped in a submissive's world, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by giving ${him} a chance to indulge ${himself}. For a short time, you permit ${him} to have ${his} way with you`);
				if (V.policies.sexualOpenness === 1 || slave.toyHole === ToyHole.DICK) {
					r.push(`in any way ${he} pleases,`);
					if (V.PC.vagina === 0 || V.PC.anus === 0) {
						r.push(`with the exceptions that ${he} leave no lasting marks nor robs you of your virginity.`);
					} else {
						r.push(`so long as ${he} leaves no lasting marks.`);
					}
				} else {
					r.push(`so long as it is within reason and leaves no visible signs; you have a reputation to uphold, after all.`);
				}
				r.push(`Already smiling, ${he}`);
				if (hasAnyArms(slave)) {
					r.push(`pushes you down`);
				} else {
					r.push(`pins you under ${his} body`);
				}
				r.push(`as ${he} decides what to do with you. You even struggle a little, just to excite ${him} more as ${he}'s forced to truly dominate you if ${he} hopes to get anything from this.`);
				SimpleSexAct.Player(slave, 5);
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.CUMSLUT && isVirile(V.PC)) {
				r.push(`Since ${slave.slaveName} has an unusual ${canTaste(slave) ? "taste" : "desire"} for oral sex and cum, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by indulging ${him}. You allow ${him} to spend ${his} free time following you around. ${He} is permitted to act as your private cum receptacle. If you use another slave, you usually`);
				if (canPenetrate(V.PC)) {
					r.push(`pull out`);
				} else if (V.PC.clit >= 3) {
					r.push(`position ${him} under your urethra`);
				} else if (V.PC.dick === 0) {
					r.push(`substitute ${him} in`);
				} else {
					r.push(`redirect`);
				}
				r.push(`and give ${his} smiling face a facial. When you come inside another slave instead, ${slave.slaveName} is allowed to get your cum anyway, regardless of whether that requires the other slave to spit it into ${his} mouth or ${slave.slaveName} to suck it out of the other slave's vagina or rectum. Either way, ${he}`);
				if (hasAnyArms(slave)) {
					r.push(`rubs ${his} stomach`);
				} else {
					r.push(`licks ${his} lips`);
				}
				r.push(`happily after ${he}'s swallowed it down.`);
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 20);
				} else { // nulls get counted as this for now
					seX(slave, "oral", V.PC, "vaginal", 20);
				}
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.BOOBS) {
				if (slave.boobs >= 300) {
					r.push(`Since ${slave.slaveName} has an unusual taste for having ${his} tits fondled, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}. You keep ${him} near you as a sort of living stress ball. Whenever you have a free hand, whether you're conducting business or fucking another slave, you reach over and play with ${him}. ${He} sometimes masturbates while you massage ${his} breasts and`);
					if (slave.nipples === NippleShape.FUCKABLE) {
						r.push(`finger`);
					} else {
						r.push(`pinch`);
					}
					r.push(`${his} nipples, but often ${he} doesn't even need to.`);
					seX(slave, "mammary", V.PC, "penetrative", 10);
				} else if (V.PC.boobs >= 300) {
					r.push(`Since ${slave.slaveName} has a taste for tits, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}.`);
					if (hasAnyArms(slave)) {
						r.push(`You bet ${him} ${he} can't keep ${his} ${hasBothArms(slave) ? "hands" : "hand"} on your breasts all day without ever removing ${hasBothArms(slave) ? "them" : "it"}, a challenge ${he} takes to with gusto. Whether you're conducting business, fucking another slave or just enjoying a meal, ${he}'s there playing with your chest, as if ${he} wins, ${he} gets the privilege of ${V.PC.lactation > 0 ? "drinking your milk" : "sucking on your nipples"}.`);
					} else if (V.PC.belly >= 1500 || onBedRest(V.PC)) {
						r.push(`Since your body limits what fun you can have with an armless slave, you opt to just lie on your side with your breasts exposed for ${him} to play with. ${He} sometimes masturbates while sucking on your nipples and rubbing ${his} face in your cleavage, but ${he} often doesn't even need to.`);
					} else if (slave.height <= V.PC.height || !hasAnyLegs(slave)) {
						r.push(`You situate ${him} on your lap with ${his} head between your breasts and dress yourself over top of ${him} before going about your day. You make sure to move in such a way that you're always rubbing your chest against ${him}. By the time you finish your business, ${he}'s practically squirming with arousal.`);
					}
				} else {
					r.push(`Since ${slave.slaveName} has a taste for huge tits, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}. You`);
					if (!onBedRest(V.PC)) {
						r.push(`grab the largest bra you can find in the wardrobe, take as many sheets and pillows that you'd need to fill its cups, and set it up on ${him} before stuffing it all into an oversized shirt.`);
					} else {
						r.push(`request the largest bra in the wardrobe, all the spare sheets and pillows from the linen closet, and an oversized shirt to contain it all. When you have everything you need, you go to work setting it all up on ${him}.`);
					}
					r.push(`Once ${he} manages to get over having such an enormous rack hanging off ${himself}, you keep ${him} near you as a sort of living stress ball. Whenever you have a free hand, whether you're conducting business or fucking another slave, you reach over and give ${his} fake chest a squeeze. Occasionally you pay more attention to ${him}, making sure to get ${him} bouncing as you feel ${him} up. ${He} sometimes masturbates when you aren't groping ${him}, enjoying ${his} buxom figure, but often ${he} doesn't even need to.`);
				}
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.BUTTSLUT) {
				r.push(`Since ${slave.slaveName} has a penchant for anal play, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by indulging ${him}. You keep ${him} near you as a sort of living stress ball. Whenever you have a free hand, whether you're conducting business or fucking another slave, you reach over and play with ${him}. ${He} sometimes can't control ${himself} and masturbates while you grope ${his} buttocks and tease ${his} anus, but when ${he} manages to wait for permission, you reward ${him} with a satisfying buttfuck.`);
				r.push(VCheck.Anal(slave, 10));
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.PREGNANCY) {
				r.push(`Since ${slave.slaveName} has an unusual taste for big pregnant bellies, you`);
				if (slave.belly >= 1500) {
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}. You keep ${him} near you as a sort of living stress ball. Whenever you have a free hand, whether you're conducting business or fucking another slave, you reach over and rub ${his} dome of a belly for luck. Occasionally you pay more attention to ${him}, making sure to fondle ${his} rounded middle as you feel up ${his} motherly body. ${He} sometimes masturbates when you aren't groping ${him}, enjoying ${his} gravid figure, but often ${he} doesn't even need to.`);
				} else if (V.PC.bellyPreg >= 1500) {
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}. You have ${him} lavish attention on your ${V.PC.preg > V.PC.pregData.normalBirth * .75 ? "turgid" : "growing"} belly and service any pregnancy cravings that strike you.`);
				// } else if (V.PC.belly < 1500) {
					// 5.0.0, female PC dons belly to tease male slave
				} else {
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${him}. You`);
					if (isItemAccessible.entry("a small empathy belly", "bellyAccessory") && slave.weight < 130) {
						r.push(`strap an enormous sympathy belly onto ${him} and`);
					} else {
						r.push(`strap a pillow around ${his} middle, give ${him} an oversized shirt and`);
					}
					r.push(`keep ${him} near you as a sort of living stress ball. Whenever you have a free hand, whether you're conducting business or fucking another slave, you reach over and rub ${his} dome of a belly for luck. Occasionally you pay more attention to ${him}, making sure to fondle ${his} rounded middle as you feel up ${his} motherly body. ${He} sometimes masturbates when you aren't groping ${him}, enjoying ${his} gravid figure, but often ${he} doesn't even need to.`);
				}
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.HUMILATION && !onBedRest(V.PC)) {
				if ((canDoVaginal(slave) && slave.vagina > 0) || (canDoAnal(slave) && slave.anus > 0)) {
					r.push(`Since ${slave.slaveName} has an unusual sexuality, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${his} perversions. Since ${he}'s an absolute slut for humiliation, you let ${him} whore around inside the special camera room whenever possible. When you're going out and feel like putting on a show, you bring ${him} on a leash and fuck ${him} in public. ${He} comes harder than ever when you push ${his} naked body up against the wall of a crowded public arcology elevator and molest ${him}.`);
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						seX(slave, "oral", V.PC, "penetrative", 4);
					} else if (V.PC.vagina >= 0) {
						seX(slave, "oral", V.PC, "vaginal", 4);
					}
					r.push(VCheck.Both(slave, 4, 2));
				} else {
					r.push(`Since ${slave.slaveName} has an unusual sexuality, you`);
					r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
					r.push(`by indulging ${his} perversions. Since ${he}'s an absolute slut for humiliation, you let ${him} whore around inside the special camera room whenever possible. When you're going out and feel like putting on a show, you`);
					if (hasBothLegs(slave)) {
						r.push(`bring ${him} on a leash and have ${him} service you in public. ${He} comes harder than ever when you push ${him} down on ${his} knees in a crowded public arcology elevator and facefuck ${him} while ${he}`);
					} else {
						r.push(`carry ${him} out and have ${him} service you in public. ${He} comes harder than ever when you push ${his} face to your`);
						if (V.PC.dick !== 0) {
							r.push(`dick`);
						} else if (V.PC.clit >= 3) {
							r.push(`phallic clit`);
						} else if (V.PC.vagina >= 0) {
							r.push(`pussy`);
						} else {
							r.push(`crotch`);
						}
						r.push(`in a crowded public arcology elevator and facefuck ${him} while ${he}`);
					}
					if (hasAnyArms(slave)) {
						r.push(`masturbates fervently.`);
					} else {
						r.push(`tries ${his} hardest to masturbate.`);
					}
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						seX(slave, "oral", V.PC, "penetrative", 8);
					} else if (V.PC.vagina >= 0) {
						seX(slave, "oral", V.PC, "vaginal", 8);
					}
				}
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.SADIST) {
				r.push(`Since ${slave.slaveName} has an unusual taste for causing anguish, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by indulging ${him}. You allow ${him} to pick out how disobedient slaves will be punished this week, within reason of course; ${he} isn't allowed to cause any lasting harm. ${He} sometimes masturbates while`);
				if (canSee(slave)) {
					r.push(`watching your other slaves suffer for ${his} amusement,`);
				} else if (canHear(slave)) {
					r.push(`enjoying the sounds of your others slaves suffering for ${his} amusement,`);
				} else {
					r.push(`picturing your other slaves undergoing ${his} torments,`);
				}
				r.push(`but often ${he} doesn't even need to.`);
			} else if (slave.fetishKnown === 1 && slave.fetishStrength > 60 && slave.fetish === Fetish.MASOCHIST) {
				r.push(`Since ${slave.slaveName} has an unusual taste for pain, you`);
				r.push(App.UI.DOM.makeElement("span", `build ${his} devotion to you`, ["devotion", "inc"]));
				r.push(`by indulging ${him}. You keep ${him} near you as a sort of living punching bag. Whenever you feel stressed, annoyed, or just bored, you grab your crop and give ${him} a few good slaps. ${He} sometimes masturbates while you beat ${him}, but often ${he} doesn't even need to.`);
			} else if (slave.vagina === 0) {
				r.push(`${slave.slaveName}'s accustomed to the slave life, so the experience is almost novel for ${him} and ${he} is`);
				r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
				r.push(`${He} isn't used to being kissed, teased and massaged. ${He}'s almost disappointed when it becomes clear that you don't mean to take ${his} virginity. You gently stimulate ${his}`);
				if (slave.dick) {
					r.push(`dick`);
				} else if (slave.clit) {
					r.push(`clit`);
				} else {
					r.push(`nipples`);
				}
				if (slave.rules.release.master && (V.PC.dick > 0 || V.PC.vagina >= 0)) {
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						r.push(`while ${he} sucks you off,`);
					} else {
						r.push(`while ${he} eats you out,`);
					}
					r.push(`bringing ${him} to a moaning climax as you`);
					if (V.PC.clit >= 3) {
						r.push(`buck against ${his} face.`);
					} else {
						r.push(`cum in ${his} mouth.`);
					}
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						seX(slave, "oral", V.PC, "penetrative", 5);
					} else if (V.PC.vagina >= 0) {
						seX(slave, "oral", V.PC, "vaginal", 5);
					}
				} else {
					r.push(`as you play with ${his} body, subconsciously causing ${him} to become more accustomed to your presence.`);
				}
			} else if (slave.anus === 0 && slave.vagina < 0) {
				r.push(`You haven't decided to take ${slave.slaveName}'s anus yet, so you have ${him}`);
				if (slave.rules.release.master) {
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						r.push(`suck you off`);
					} else if (V.PC.vagina >= 0) {
						r.push(`eat you out`);
					} else {
						r.push(`massage your crotch`);
					}
					r.push(`and allow ${him} to play with ${himself} while ${he} does. You stroke ${his} hair,`);
					if (slave.boobs >= 300) {
						r.push(`play with ${his} tits,`);
					} else {
						r.push(`rub ${his} chest,`);
					}
					r.push(`and generally pamper ${him} while ${he} orally services you. ${He}'s accustomed to the slave life, so the experience of affection is novel for ${him} and ${he} is`);
					r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
					r.push(`${He} isn't used to being kissed, teased and massaged. ${He}'s almost disappointed when it becomes clear that you don't mean to take ${his} virgin hole.`);
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						seX(slave, "oral", V.PC, "penetrative", 5);
					} else if (V.PC.vagina >= 0) {
						seX(slave, "oral", V.PC, "vaginal", 5);
					}
				} else {
					if (V.PC.dick > 0 || V.PC.clit >= 3) {
						r.push(`jerk you off`);
					} else if (V.PC.vagina >= 0) {
						r.push(`play with your pussy`);
					} else {
						r.push(`explore your crotch`);
					}
					r.push(`and allow ${him} to play with ${himself} while ${he} does. You stroke ${his} hair,`);
					if (slave.boobs >= 300) {
						r.push(`play with ${his} tits,`);
					} else {
						r.push(`rub ${his} chest,`);
					}
					r.push(`and generally pamper ${him} while ${he} services you. ${He}'s accustomed to the slave life, so the experience of affection is novel for ${him} and ${he} is`);
					r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
					r.push(`${He} isn't used to being kissed, teased and massaged. ${He}'s almost disappointed when it becomes clear that you don't mean to take ${his} virgin hole.`);
				}
			} else if (slave.anus === 0 && slave.vagina > 0 && canDoVaginal(slave)) {
				r.push(`You fuck ${slave.slaveName}, of course, but you do it slowly and lovingly, and keep well clear of ${his} still-virgin asshole in the process. ${He}'s accustomed to the slave life, so the experience is almost novel for ${him} and ${he} is affectingly`);
				r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
				r.push(`${He} isn't used to being kissed, teased and massaged before ${he} takes cock. Slaves are usually used without regard to their orgasm, so ${he}'s also surprised and gratified when you make meticulous efforts to delay your own orgasm so it can coincide with ${his} own. ${He}'s a puddle on the sheets under your hands.`);
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 4);
				} else if (V.PC.vagina >= 0) {
					seX(slave, "oral", V.PC, "vaginal", 4);
				}
				r.push(VCheck.Vaginal(slave, 4));
			} else if (slave.anus === 0) {
				r.push(`${slave.slaveName}'s accustomed to the slave life, so the experience is almost novel for ${him} and ${he} is`);
				r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
				r.push(`${He} isn't used to being kissed, teased and massaged. ${He}'s almost disappointed when it becomes clear that you don't mean to take ${his} anal virginity. You gently stimulate ${his}`);
				if (slave.dick) {
					r.push(`dick`);
				} else if (slave.clit) {
					r.push(`clit`);
				} else {
					r.push(`nipples`);
				}
				r.push(`while ${he}`);
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					r.push(`sucks you off,`);
				} else if (V.PC.vagina >= 0) {
					r.push(`eats you out,`);
				} else {
					r.push(`rubs your crotch,`);
				}
				r.push(`bringing ${him} to a moaning climax as you`);
				if (V.PC.clit >= 3) {
					r.push(`buck against ${his} face.`);
				} else if (V.PC.dick > 0 || V.PC.vagina >= 0) {
					r.push(`cum in ${his} mouth.`);
				} else {
					r.push(`grind against ${his} face.`);
				}
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 5);
				} else if (V.PC.vagina >= 0) {
					seX(slave, "oral", V.PC, "vaginal", 5);
				}
			} else {
				r.push(`You fuck ${slave.slaveName}, of course, but you do it slowly and lovingly. ${He}'s accustomed to the slave life, so the experience is almost novel for ${him} and ${he} is affectingly`);
				r.push(App.UI.DOM.makeElement("span", `touched by the affection.`, ["devotion", "inc"]));
				r.push(`${He} isn't used to being kissed, teased and massaged before ${he} takes cock. Slaves are usually used without regard to their orgasm, so ${he}'s also surprised and gratified when you make meticulous efforts to delay your own orgasm so it can coincide with ${his} own. ${He}'s a puddle on the sheets under your hands.`);
				if (V.PC.dick > 0 || V.PC.clit >= 3) {
					seX(slave, "oral", V.PC, "penetrative", 4);
				} else if (V.PC.vagina >= 0) {
					seX(slave, "oral", V.PC, "vaginal", 4);
				}
				if (slave.vagina === 0) {
					r.push(VCheck.Vaginal(slave, 4));
				} else {
					r.push(VCheck.Both(slave, 4, 2));
				}
			}
			if (V.PC.skill.slaving >= 100) {
				r.push(`Your`);
				r.push(App.UI.DOM.makeElement("span", `slave training experience`, ["skill", "player"]));
				r.push(`allows you to`);
				r.push(App.UI.DOM.makeElement("span", `bend ${him} to your will`, ["devotion", "inc"]));
				r.push(`more quickly without provoking resistance.`);
				slave.devotion += 1;
			}
			if (enjoyable) {
				slave.devotion += 6;
				r.push(`Spending time with you`);
				if (slave.trust > 10) {
					r.push(App.UI.DOM.makeElement("span", `builds ${his} trust in ${his} ${getWrittenTitle(slave)}.`, ["trust", "inc"]));
					slave.trust += 4;
				} else {
					r.push(App.UI.DOM.makeElement("span", `reduces ${his} fear towards you.`, ["trust", "inc"]));
					slave.trust += 6;
				}
			} else {
				slave.devotion += 3;
				r.push(`Spending such an unpleasant interlude with you`);
				if (slave.trust > 10) {
					r.push(App.UI.DOM.makeElement("span", `builds doubt in ${his} ${getWrittenTitle(slave)}.`, ["trust", "dec"]));
					slave.trust -= 4;
				} else {
					r.push(App.UI.DOM.makeElement("span", `reminds ${him} of why ${he} fears you.`, ["trust", "dec"]));
					slave.trust -= 8;
				}
			}
			currentSlaveValue = 0.2;
			slave.training = 0;
			break;
		}
		case "health": {
			if (slave.relationship === -3 && slave.fetish === Fetish.MINDBROKEN) {
				r.push(`Since ${slave.slaveName} is your ${wife} and not all there, you keep ${him} under a watchful eye to make sure no harm comes to the broken ${girl}. ${He} almost seems in better spirits under your care, not that it will matter in an hour or two.`);
				if (slave.kindness) {
					slave.kindness++;
				} else {
					slave.kindness = 1;
				}
			}
			if (pcHorny) {
				if (slave.health.condition < 100) {
					r.push(`Your close attention improves ${his} health in a way drug treatment or mere medical intervention cannot, though you would probably do a better job if you spent less time molesting ${him} during your "examinations".`);
					r.push(App.UI.DOM.makeElement("span", `${His} health has improved.`, ["health", "inc"]));
					improveCondition(slave, 5);
				}
				if (slave.health.tired > 10) {
					r.push(`You watch ${him} as ${he} sleeps, making sure ${he} gets`);
					r.push(App.UI.DOM.makeElement("span", `some undisturbed rest,`, ["health", "inc"]));
					r.push(`even as you masturbate to the sight of ${his} naked body.`);
					slave.health.tired = Math.clamp(slave.health.tired - 5, 0, 1000);
				}
			} else {
				if (slave.health.condition < 100) {
					const skillBonus = Math.trunc(V.PC.skill.medicine / 20);
					r.push(`Your close${V.PC.skill.medicine >= 40 ? " and expert" : ""} attention improves ${his} health in a way drug treatment or mere medical intervention cannot.`);
					r.push(App.UI.DOM.makeElement("span", `${His} health has improved.`, ["health", "inc"]));
					improveCondition(slave, 10 + skillBonus);
				}
				if (slave.health.tired > 10) {
					r.push(`You watch over ${him} as ${he} sleeps, assuring`);
					r.push(App.UI.DOM.makeElement("span", `a proper night's rest.`, ["health", "inc"]));
					slave.health.tired = Math.clamp(slave.health.tired - 10, 0, 1000);
				}
			}
			if ((slave.anus >= 3 || slave.vagina >= 3) && slave.geneMods.rapidCellGrowth !== 1) {
				r.push(`${slave.slaveName} is a veteran sex slave and has seen hard use. Tightening up a slave is difficult, but with close supervision and attention it can be done. You and your other slaves carefully apply injections, creams, and massage, and ${his} other work is carefully managed to reduce wear and tear.`);
				if (pcHorny) {
					r.push(`It takes all your willpower to not immediately ruin it with a hard fucking, but you manage to power through it. For now, at least.`);
				}
				if (slave.anus >= 3 && (random(1, 100)) > 50) {
					r.push(App.UI.DOM.makeElement("span", `${His} anus has recovered and is now merely loose.`, ["change", "positive"]));
					slave.anus--;
				} else if (slave.anus >= 3) {
					r.push(`${His} distended anus does not improve this week.`);
				}
				if (slave.vagina >= 3 && random(1, 100) > 50) {
					r.push(App.UI.DOM.makeElement("span", `${His} pussy has tightened.`, ["change", "positive"]));
					slave.vagina--;
				} else if (slave.vagina >= 3) {
					r.push(`${His} loose pussy does not recover this week.`);
				}
			}
			currentSlaveValue = 0.1;
			slave.training = 0;
			if (V.PC.skill.medicine < 10) {
				r.push(IncreasePCSkills('medicine', currentSlaveValue));
			}
			break;
		}
		case "soften behavioral flaw":
			if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
				r.push(`${slave.slaveName} got over ${his} behavioral flaw without you;`);
				coloredText = [];
				coloredText.push(`${his} training assignment has defaulted to`);
				if (App.Data.misc.paraphiliaList.includes(slave.sexualFlaw) && slave.sexualFlaw !== SexualFlaw.NONE) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						coloredText.push(`breaking ${his} will.`);
						pa.objective = "break will";
					} else {
						coloredText.push(`fostering devotion.`);
						pa.objective = "build devotion";
					}
				} else {
					coloredText.push(`softening ${his} sexual flaw.`);
					pa.objective = "soften sexual flaw";
				}
				r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["noteworthy"]));
			} else {
				if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
					r.push(`${slave.slaveName} thinks ${he}'s better than everyone else. ${He} has some basis for a high opinion of ${himself}; otherwise you wouldn't be`);
					if (pcHorny) {
						r.push(`masturbating to the sight of`);
					} else {
						r.push(`bothering with`);
					}
					r.push(`${him}.`);
					if (pcHorny) {
						r.push(`Your little shows mostly serve to <span class="stat drop">reinforce ${his} arrogance</span> instead of tempering it into something special.`);
						slave.training *= 0.5;
					} else {
						r.push(`You do your best to maintain ${his} belief that ${he} has something special to offer while training ${him} to offer it to you without objection.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
					r.push(`${slave.slaveName} always has a cutting remark ready. Some of them are actually pretty good, and you'd prefer to keep ${his} cutting wit intact. You strike a careful balance with ${him},`);
					if (pcHorny) {
						r.push(`forcing ${him} to service you for saying the wrong thing at the wrong time, but rewarding appropriately biting comments with sex. It mostly just makes ${him} <span class="stat drop">bitch about your teaching methods.</span>`);
						if (V.PC.dick > 0 || V.PC.clit >= 3) {
							seX(slave, "oral", V.PC, "penetrative", 7);
						} else if (V.PC.vagina >= 0) {
							seX(slave, "oral", V.PC, "vaginal", 7);
						}
						SimpleSexAct.Player(slave, 5);
						slave.training *= 0.25;
					} else {
						r.push(`punishing the wrong remark at the wrong time, but rewarding appropriately biting comments.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.ODD) {
					r.push(`${slave.slaveName} is odd. ${He}'s usually annoying, but on occasion ${his} oddities can produce great comic relief. You strike a careful balance with ${him},`);
					if (pcHorny) {
						r.push(`forcing ${him} to service you for being irritating, but rewarding ${his} harmless little idiosyncrasies with sex. ${He} seems to be getting some <span class="stat drop">mixed messages</span> from your teaching strategy.`);
						if (V.PC.dick > 0 || V.PC.clit >= 3) {
							seX(slave, "oral", V.PC, "penetrative", 7);
						} else if (V.PC.vagina >= 0) {
							seX(slave, "oral", V.PC, "vaginal", 7);
						}
						SimpleSexAct.Player(slave, 5);
						slave.training *= 0.25;
					} else {
						r.push(`punishing ${him} when ${he} irritates you, but allowing and even rewarding harmless little idiosyncrasies.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN) { // These two need all sorts of retooling in 5.0.0
					r.push(`${slave.slaveName} does not like`);
					if (pcHorny) {
						if (V.PC.dick > 0) { // 5.0.0 check
							r.push(`men, so clearly the best way to overcome this is to teach ${him} to love the touch of one; it <span class="stat drop">backfires spectacularly.</span>`);
							slave.training = 0;
						} else {
							r.push(`men, so clearly the best way to overcome this is the touch of a woman; it goes <span class="stat gain">better than expected.</span>`);
							slave.training += 5;
							SimpleSexAct.Player(slave, 5);
						}
					} else {
						r.push(`men. ${He} desperately needs social contact, though, so you encourage ${him} to rely on women to address ${his} emotional${pcHorny ? " and sexual" : ""} needs. This is easy, since`);
						if (V.PC.vagina !== -1) { // 5.0.0 check
							r.push(`you've got a pussy yourself.`);
						} else {
							r.push(`there are several readily available.`);
						}
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
					r.push(`${slave.slaveName} does not like`);
					if (pcHorny) { // 5.0.0 check
						if (V.PC.dick === 0) { // 5.0.0 check
							r.push(`girls, so clearly the best way to overcome this is to teach ${him} to love the touch of one; it <span class="stat drop">backfires spectacularly.</span>`);
							slave.training = 0;
						} else {
							r.push(`girls, so clearly the best way to overcome this is to give ${him} a thorough dicking; it works <span class="stat gain">better than expected.</span>`);
							slave.training += 5;
							seX(slave, "oral", V.PC, "penetrative", 7);
							if (slave.vagina > 0) {
								seX(slave, "vaginal", V.PC, "penetrative", 6);
							}
							if (slave.anus > 0) {
								seX(slave, "anal", V.PC, "penetrative", 3);
							}
						}
					} else {
						r.push(`girls. ${He} desperately needs social contact, though, so you encourage ${him} to rely on men to address ${his} emotional needs. This is easy, since`);
						if (V.PC.dick === 0) { // 5.0.0 check
							r.push(`there are several readily available.`);
						} else {
							r.push(`you've got a cock yourself.`);
						}
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
					r.push(`${slave.slaveName} suffers from anorexia. You work with ${him}`);
					if (pcHorny) {
						r.push(`diligently, <span class="stat gain">making use of your libido</span> for this troubling condition. It's usually a product of poor self esteem, so showering ${him} in sexual praise should build ${hers} up without weakening ${his} bond to you. At the very least, ${he} is more willing to eat after being thoroughly tired out.`);
						slave.training += 5;
						SimpleSexAct.Player(slave, 15);
					} else {
						r.push(`patiently, applying the very best in modern therapy for this troubling condition. It's usually a product of poor self esteem, and you do your best to build ${hers} up without diminishing ${his} submission to you.`);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
					r.push(`${slave.slaveName}'s diet is already closely controlled, but the impulse to overeat is strong in ${him} and like most gluttons ${he} manages to be quite cunning. You take a hard line with ${him}, and do your best to replace ${his} addiction to the endorphin release of eating with an addiction to the endorphin release of exercise.`);
					if (pcHorny) {
						r.push(`You work ${him} long and hard into the night, and while it is exhausting, this <span class="stat drop">might not be the type of exercise ${he} needs</span> to kick the habit.`);
						slave.training *= 0.75;
						SimpleSexAct.Player(slave, 20);
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.LIBERATED) {
					r.push(`${slave.slaveName} can express a decent argument for why it's wrong to use ${him} as a sex slave. With a combination of rote training, discussion, and reinforcement, you do your best to turn this into a sincere belief in the moral rightness of slavery.`);
					if (pcHorny) {
						r.push(`Unfortunately, your lust-addled mind <span class="stat drop">fails to leave much of a lasting impression</span> on ${him}.`);
						slave.training *= 0.25;
					}
				} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
					r.push(`${slave.slaveName} remains devoted to an old world faith that serves ${him} as a reservoir of mental resilience. Like all such beliefs, ${hers} has certain sexual elements;`);
					if (pcHorny) {
						r.push(`you eagerly break them in an effort to break ${him}, but only succeed in <span class="stat drop">forcing ${him} to hold them even dearer.</span>`);
						slave.training = 0;
						SimpleSexAct.Player(slave, 4);
					} else {
						r.push(`you amuse yourself by forcing ${him} to break them, and rewarding ${him} generously when ${he} does.`);
					}
				}
				if (slave.training <= 0) {
					r.push(`You make no progress into fixing ${his} flaw and, if anything, have made matters worse. You need to rethink your strategy.`);
				} else if (slave.training < 100) {
					r.push(`You make progress, but ${he}'s the same at the end of the week.`);
					if (hindranceMod <= .5) {
						r.push(`Your body makes you sluggish, allowing ${him} plenty of opportunity to avoid these unpleasant situations.`);
					}
				} else {
					slave.training = 0;
					r.push(`By the end of the week,`);
					r.push(App.UI.DOM.makeElement("span", `you resolve ${his} flaw into something special.`, ["flaw", "break"]));
					r.push(App.UI.DOM.makeElement("span", `${His} obedience has increased.`, ["devotion", "inc"]));
					SoftenBehavioralFlaw(slave);
					slave.devotion += 4;
				}
				if (slave.fetishKnown !== 1) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${He} really takes to your close attention;`);
						r.push(App.UI.DOM.makeElement("span", `${he}'s a natural submissive!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`While you're giving ${him} personal attention, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} has an oral fixation!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`While you're giving ${him} personal correction, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} likes pain!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`While you're giving ${him} personal attention in public, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} likes humiliation!`, ["pink"]));
						slave.fetishKnown = 1;
					}
				}
				if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
					r.push(`With ${his} behavioral flaw softened,`);
					coloredText = [];
					r.push(`${his} training assignment has defaulted to`);
					if (slave.sexualFlaw === SexualFlaw.NONE) {
						if (isHorny(V.PC) && (canPenetrate(V.PC) || V.PC.clit >= 3) && (canDoAnal(slave) || canDoVaginal(slave))) {
							coloredText.push(`relieving your sexual tension.`);
							pa.objective = "ravish";
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							coloredText.push(`breaking ${his} will.`);
							pa.objective = "break will";
						} else {
							coloredText.push(`fostering devotion.`);
							pa.objective = "build devotion";
						}
					} else {
						coloredText.push(`softening ${his} sexual flaw.`);
						pa.objective = "soften sexual flaw";
					}
					r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["noteworthy"]));
				}
			}
			break;
		case "soften sexual flaw":
			if (slave.sexualFlaw === SexualFlaw.NONE) {
				r.push(`${slave.slaveName} got over ${his} sexual flaw without you,`);
				coloredText = [];
				coloredText.push(`${his} training assignment has defaulted to`);
				if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
					if (isHorny(V.PC) && (canPenetrate(V.PC) || V.PC.clit >= 3) && (canDoAnal(slave) || canDoVaginal(slave))) {
						coloredText.push(`relieving your sexual tension.`);
						pa.objective = "ravish";
					} else if (slave.devotion <= 20 && slave.trust >= -20) {
						coloredText.push(`breaking ${his} will.`);
						pa.objective = "break will";
					} else {
						coloredText.push(`fostering devotion.`);
						pa.objective = "build devotion";
					}
				} else {
					coloredText.push(`softening ${his} behavioral flaw.`);
					pa.objective = "soften behavioral flaw";
				}
				r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["noteworthy"]));
			} else {
				r.push(`${slave.slaveName}`);
				switch (slave.sexualFlaw) {
					case SexualFlaw.HATESORAL:
						r.push(`has a powerful gag reflex. Though it would be simpler to train ${him} out of it, you do your best to train ${him} to safely take a rough facefuck without losing the fun aspects of forcing a slave to swallow a phallus, like the struggles, the gagging, and the tears.`);
						if (pcHorny) {
							r.push(`Your libido frequently <span class="stat drop">gets in the way,</span> forcing you to stop rutting against ${his} face and get yourself back under control.`);
							seX(slave, "oral", V.PC, "penetrative", 10);
							slave.training *= 0.75;
						}
						seX(slave, "oral", V.PC, "penetrative", 10);
						break;
					case SexualFlaw.HATESANAL:
						r.push(`does not like it up the butt. Though it would be simpler to train ${him} out of it, you do your best to train ${him} to safely take a rough buttfuck without losing the fun aspects of anal rape, like the struggles, the whining, and the tears.`);
						if (canDoAnal(slave) && pcHorny) {
							r.push(VCheck.Anal(slave, 10));
							r.push(`Your libido frequently <span class="stat drop">gets in the way,</span> forcing you to slow down and get a hold of yourself before you fuck all the progress you've made out of ${his} ass.`);
							seX(slave, "anal", V.PC, "penetrative", 10);
							slave.training *= 0.75;
						} else {
							r.push(`The inability to actually penetrate ${his} ass hinders your efforts, however.`);
							slave.training -= 20; // more difficult training
						}
						break;
					case SexualFlaw.HATESPEN:
						if (canDoVaginal(slave)) {
							r.push(`does not like sex. Though it would be simpler to train ${him} out of it, you do your best to train ${him} to safely take a hard pounding without losing the fun aspects of forced sex, like the struggles, the whining, and the tears.`);
							r.push(VCheck.Vaginal(slave, 10));
						} else if (canDoAnal(slave)) {
							r.push(`does not like it up the butt. Though it would be simpler to train ${him} out of it, you do your best to train ${him} to safely take a rough buttfuck without losing the fun aspects of anal rape, like the struggles, the whining, and the tears.`);
							r.push(VCheck.Anal(slave, 10));
						} else {
							r.push(`does not dicks in ${his} mouth. Though it would be simpler to train ${him} out of it, you do your best to train ${him} to safely take a rough facefuck without losing the fun aspects of forcing a slave to swallow a phallus, like the struggles, the gagging, and the tears.`);
							seX(slave, "oral", V.PC, "penetrative", 10);
						}
						if (pcHorny) {
							r.push(`Your libido frequently <span class="stat drop">gets in the way,</span> forcing you to stop and reconsider your actions before you reinforce ${his} hatred rather than resolve it.`);
							slave.training *= 0.50;
						}
						break;
					case SexualFlaw.APATHETIC:
						r.push(`doesn't put out much effort when having sex. You do your best to redirect this apathy into caring for ${his} partners; since ${he} obviously doesn't think much of ${himself}, ${he} can spare the effort.`);
						if (V.PC.dick > 0 || V.PC.clit >= 3) {
							seX(slave, "oral", V.PC, "penetrative", 5);
						} else if (V.PC.vagina >= 0) {
							seX(slave, "oral", V.PC, "vaginal", 5);
						}
						SimpleSexAct.Player(slave, 5);
						if (pcHorny) {
							r.push(`You frequently <span class="stat drop">get carried away</span> with fucking ${him}, completely forgetting that ${his} inertness is not cause for you to bang ${him} harder.`);
							slave.training *= 0.75;
							SimpleSexAct.Player(slave, 7);
						}
						break;
					case SexualFlaw.CRUDE:
						r.push(`does not pay enough attention to standards when having sex, leading to crude comments and unsexy noises.`);
						if (pcHorny) {
							r.push(`Unfortunately, you're often <span class="stat drop">so horny</span> that you fall into the same habits, creating a well of unsexy crudeness between the two of you.`);
							slave.training = 0;
							SimpleSexAct.Player(slave, 15);
						} else {
							r.push(`To remedy this, you have ${him} give you oral regularly: a sacrifice, but you make sacrifices for your slaves' improvement. Oral sex can be difficult to make elegant, but you work with ${him} to make it as pretty as possible, even when you require ${him} to apply ${his} mouth to some of the less common erogenous zones. You do your best to retain ${his} sexual openness while making ${him} more sexually presentable.`);
							if (V.PC.dick > 0 || V.PC.clit >= 3) {
								seX(slave, "oral", V.PC, "penetrative", 10);
								if (V.PC.vagina >= 0) {
									seX(slave, "oral", V.PC, "vaginal", 5);
								}
							} else if (V.PC.vagina >= 0) {
								seX(slave, "oral", V.PC, "vaginal", 10);
							}
						}
						break;
					case SexualFlaw.JUDGEMENT:
						r.push(`has a bad habit of being sexually judgemental, belittling anyone who doesn't live up to ${his} pretensions of standards. You`);
						if (pcHorny) {
							r.push(`ram`);
							if (V.PC.dick > 0) {
								r.push(`your cock`);
							} else if (V.PC.clit >= 3) {
								r.push(`your clit`);
							} else {
								r.push(`a dildo`);
							}
							r.push(`down ${his} throat and facefuck ${him} each and every time ${he} tries to make a snide comment about size.`);
							if (V.PC.dick > 3 || V.PC.clit >= 5) {
								r.push(`You're large enough to satisfy ${his} predilections, but the goal was to build a preference for big dicks while allowing ${him} to still enjoy all dicks, so you slightly <span class="stat drop">missed the mark</span> here.`);
								slave.training *= 0.75;
							} else {
								r.push(`If anything, you're only teaching ${him} to <span class="stat drop">avoid letting you catch wind</span> of ${him} doing it.`);
								slave.training = 0;
							}
							seX(slave, "oral", V.PC, "penetrative", 20);
						} else {
							r.push(`do your best to train ${him} to perform regardless of ${his} partners' endowments, aiming for a delicate balance that will allow ${him} to get off with anyone while permitting ${him} to retain and even build on ${his} appetite for big dicks. You permit ${him} to achieve release only when ${he}'s done well with`);
							if (V.PC.dick > 3) {
								r.push(`your thick cock`);
							} else if (V.PC.clit >= 5) {
								r.push(`your fat clit`);
							} else {
								r.push(`a fat dildo`);
							}
							if (slave.vagina > 0 && canDoVaginal(slave)) {
								r.push(`lodged up ${his} cunt.`);
								r.push(VCheck.Vaginal(slave, 10));
							} else if (slave.anus > 0 && canDoAnal(slave)) {
								r.push(`lodged up ${his} butt.`);
								r.push(VCheck.Anal(slave, 10));
							} else {
								r.push(`down ${his} throat.`);
								seX(slave, "oral", V.PC, "penetrative", 10);
							}
						}
						break;
					case SexualFlaw.SHAMEFAST:
						r.push(`is shamefast. You`);
						if (pcHorny) {
							r.push(`simply fuck ${him} with ${his} clothes on, waiting until ${he} lets ${his} guard down to sneak a peek at what ${he}'s hiding. The squeal of embarrassment this elicits, coupled with your overwhelming libido, only serves to encourage your natural urges. ${He} may not realize it yet, but ${he} is <span class="stat gain">steadily learning</span> how to use ${his} body to titillate and arouse a viewer, even if ${he} didn't intend to.`);
							SimpleSexAct.Player(slave, 15);
							slave.training += 10;
						} else {
							r.push(`do your best to train ${him} out of this, but carefully retain the essential core of embarrassment, aiming for a slave that can use ${his} body to titillate the viewer and then offer an authentic blush at ${himself}.`);
							SimpleSexAct.Player(slave, 10);
						}
						break;
					case SexualFlaw.IDEAL:
						r.push(`still sees sex in a naïve light, hoping to be romanced, teased to arousal, and asked permission.`);
						if (pcHorny) {
							r.push(`Pinning ${him} down and fucking ${him} like a wild animal would shatter the poor ${girl}'s world, so no matter how hard you want to plow ${him}, you need to keep sex special. <span class="stat drop">It's a struggle,</span> but you manage to keep yourself under control, even counting all the 'extra' training sessions ${he} underwent.`);
							slave.training *= 0.9;
							SimpleSexAct.Player(slave, 14);
						} else {
							r.push(`Training ${him} directly out of this would shatter the poor ${girl}'s world, so you work with ${him} carefully, doing your best to keep sex special for ${him}.`);
							SimpleSexAct.Player(slave, 7);
						}
						break;
					case SexualFlaw.REPRESSED:
						r.push(`is repressed.`);
						if (pcHorny) {
							r.push(`Fortunately, the best way to break this habit is by teaching ${him} the joy of sex through <span class="stat gain">fucking as much as possible.</span> ${He} naturally begins to view ${himself} as a twisted, perverted person, but you just take that as an opportunity to remind ${him} of just how kinky and fun things will be if ${he} just accepts that as who ${he} is.`);
							slave.training += 5;
							SimpleSexAct.Player(slave, 20);
						} else {
							r.push(`You strike a delicate balance with ${him}, doing your best to train ${him} to fuck as a sex slave should, but trying to retain the rush of doing the forbidden that makes ${him} flush, shiver, and moan.`);
							SimpleSexAct.Player(slave, 10);
						}
						break;
					case SexualFlaw.ABUSIVE:
					case SexualFlaw.ANALADDICT:
					case SexualFlaw.ATTENTION:
					case SexualFlaw.BREASTEXP:
					case SexualFlaw.BREEDER:
					case SexualFlaw.CUMADDICT:
					case SexualFlaw.MALICIOUS:
					case SexualFlaw.NEGLECT:
					case SexualFlaw.SELFHATING:
						r.push(`has a paraphilia. Typical methods will have no effect on this kind of flaw.`);
						slave.training = 0;
						coloredText = [];
						coloredText.push(`${His} training assignment has defaulted to`);
						if (isHorny(V.PC) && (canPenetrate(V.PC) || V.PC.clit >= 3) && (canDoAnal(slave) || canDoVaginal(slave))) {
							coloredText.push(`relieving your sexual tension.`);
							pa.objective = "ravish";
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							coloredText.push(`breaking ${his} will.`);
							pa.objective = "break will";
						} else {
							coloredText.push(`fostering devotion.`);
							pa.objective = "build devotion";
						}
						r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["noteworthy"]));
						break;
					default:
						r.push(`has something. You should probably report this as nobody knows what is currently happening. ${His} flaw was supposed to be ${slave.sexualFlaw}.`);
				}
				if (slave.training <= 0) {
					r.push(`You make no progress into fixing ${his} flaw and, if anything, have made matters worse. You need a new approach.`);
				} else if (slave.training < 100) {
					r.push(`You make progress, but ${he}'s the same at the end of the week.`);
					if (hindranceMod <= .5) {
						r.push(`Your body makes you sluggish, allowing ${him} plenty of opportunity to avoid these unpleasant situations.`);
					}
				} else {
					slave.training = 0;
					r.push(`By the end of the week,`);
					r.push(App.UI.DOM.makeElement("span", `you resolve ${his} flaw into something special.`, ["flaw", "break"]));
					r.push(App.UI.DOM.makeElement("span", `${His} obedience has increased.`, ["devotion", "inc"]));
					SoftenSexualFlaw(slave);
					slave.devotion += 4;
				}
				if (slave.fetishKnown !== 1) {
					if (slave.fetish === Fetish.SUBMISSIVE) {
						r.push(`${He} really takes to your close attention;`);
						r.push(App.UI.DOM.makeElement("span", `${he}'s a natural submissive!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.CUMSLUT) {
						r.push(`While you're giving ${him} personal attention, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} has an oral fixation!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.MASOCHIST) {
						r.push(`While you're giving ${him} personal correction, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} likes pain!`, ["pink"]));
						slave.fetishKnown = 1;
					} else if (slave.fetish === Fetish.HUMILIATION) {
						r.push(`While you're giving ${him} personal attention in public, you discover by chance that`);
						r.push(App.UI.DOM.makeElement("span", `${he} likes humiliation!`, ["pink"]));
						slave.fetishKnown = 1;
					}
				}
				if (slave.sexualFlaw === SexualFlaw.NONE) {
					r.push(`With ${his} sexual flaw softened,`);
					coloredText = [];
					r.push(`${his} training assignment has defaulted to`);
					if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
						if (isHorny(V.PC) && (canPenetrate(V.PC) || V.PC.clit >= 3) && (canDoAnal(slave) || canDoVaginal(slave))) {
							coloredText.push(`relieving your sexual tension.`);
							pa.objective = "ravish";
						} else if (slave.devotion <= 20 && slave.trust >= -20) {
							coloredText.push(`breaking ${his} will.`);
							pa.objective = "break will";
						} else {
							coloredText.push(`fostering devotion.`);
							pa.objective = "build devotion";
						}
					} else {
						coloredText.push(`softening ${his} behavioral flaw.`);
						pa.objective = "soften behavioral flaw";
					}
					r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["noteworthy"]));
				}
			}
			break;
		case "learn skills": {
			trainingEfficiency = 6 + Math.trunc(V.PC.intelligence / 32) + Math.trunc(slave.devotion / 30) + Math.floor(slave.intelligence / 32);
			const hindranceModSex = isHinderedDegree(V.PC, true);
			if (isPCCareerInCategory("escort")) {
				r.push(`You are well-versed in sexual techniques and how to employ them, giving you an edge in teaching ${him}.`);
				trainingEfficiency += 10;
			}
			if (pcHorny) {
				// wip
			} else if (pcFrigid) {
				r.push(`Needing to teach sex while having no desire to have any complicates matters. You do your best to put up an effort when it comes to practical lessons, but it is far too little to be effective.`);
				trainingEfficiency *= .25;
			}
			trainingEfficiency *= hindranceModSex;
			/*
			if (hindranceModSex <= .3) {
				r.push(`With how difficult it is for you to get around, you end up only taking a fraction of the jobs you would normally consider. That is also not taking into account just how easily identifiable someone with your physique is to the public.`);
			} else if (hindranceModSex <= .5) {
				r.push(`With how much your body is slowing you down, you end up only taking a fraction of the jobs you would normally consider. Even worse, your hindrances are an increasingly unique characteristic that can be used against you.`);
			} else if (hindranceModSex <= .7) {
				r.push(`You keep missing out on opportunities between the difficulties getting places with your reduced mobility and the increased risk of your physical hindrances making you identifiable.`);
			}
			*/
			Math.max(1, trainingEfficiency);

			if (slave.vagina >= 0) {
				if (!canDoVaginal(slave) && slave.vagina === 0) {
					vaginalTrainingEfficiency = Math.trunc(trainingEfficiency / 4);
				} else if (slave.vagina === 0 || !canDoVaginal(slave)) {
					vaginalTrainingEfficiency = Math.trunc(trainingEfficiency / 2);
				}
			}
			if (!canDoAnal(slave) && slave.anus === 0) {
				analTrainingEfficiency = Math.trunc(trainingEfficiency / 4);
			} else if (slave.anus === 0 || !canDoAnal(slave)) {
				analTrainingEfficiency = Math.trunc(trainingEfficiency / 2);
			}
			if (slave.dick === 0 || !canAchieveErection(slave)) {
				dickTrainingEfficiency = Math.trunc(trainingEfficiency / 4);
			} else {
				dickTrainingEfficiency = Math.trunc(trainingEfficiency / 2);
			}
			if (slave.devotion > 50) {
				r.push(`${He}'s devoted to you, making sexual training much easier.`);
			} else if (slave.devotion > 20) {
				r.push(`${He}'s accepted ${his} place as a sex slave, making sexual training easier.`);
			} else if (slave.devotion < -20) {
				r.push(`${He}'s unhappy being a sex slave, making sexual training harder.`);
			}
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r.push(`${His} intelligence allows ${him} to absorb ${his} lessons quickly.`);
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r.push(`${His} stupidity makes ${him} absorb ${his} lessons slowly.`);
			}
			if (V.PC.visualAge <= 12 && V.PC.visualAge < V.minimumSlaveAge && !acceptsUnderage(slave)) {
				r.push(`${He} is visibly`);
				r.push(App.UI.DOM.makeElement("span", `uncomfortable`, ["devotion", "dec"]));
				r.push(`being taught sexual techniques by an underage ${girlP}.`);
				slave.devotion -= 2;
			}
			if (slave.skill.oral <= 10) {
				r.push(`Since ${he}'s orally unskilled, you start with ${his} mouth. ${He}`);
				if (V.PC.dick !== 0) {
					r.push(`sucks your dick,`);
				} else {
					r.push(`eats you out,`);
				}
				r.push(`of course, but ${his} training is more creative than just that. You give ${him}`);
				if (canTaste(slave)) {
					r.push(`delicious`);
				} else {
					r.push(`sugary`);
				}
				r.push(`hard candies to suck and feed ${him} phallic fruits and vegetables that ${he} must deepthroat before ${he} can eat. As ${his} skill improves, ${he} wears a gag with an inward-facing dildo, which is swapped out for a bigger size every so often. You only let ${him} orgasm when ${he}'s sucking, and before long ${he}'s associating giving someone oral pleasure with experiencing pleasure ${himself}.`);
				r.push(App.UI.DOM.makeElement("span", `${His} oral skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('oral', slave, trainingEfficiency));
			} else if (slave.skill.vaginal <= 10 && slave.vagina > 0 && canDoVaginal(slave)) {
				r.push(`Since ${he}'s vaginally unskilled, and not a virgin, you start with ${his} pussy.`);
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('vaginal', slave, trainingEfficiency));
			} else if (slave.skill.anal <= 10 && slave.anus > 0 && canDoAnal(slave)) {
				r.push(`Since ${he}'s anally unskilled, and not an anal virgin, you start with ${his} ass.`);
				r.push(App.UI.DOM.makeElement("span", `${His} anal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('anal', slave, trainingEfficiency));
			} else if (slave.skill.penetrative <= 10 && slave.dick > 0 && canPenetrate(slave)) { // WIP
				r.push(`Since ${he} is unskilled at using ${his} cock, you start with ${his} dick.`);
				r.push(App.UI.DOM.makeElement("span", `${His} penetrative skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('penetrative', slave, trainingEfficiency));
			} else if (slave.skill.oral <= 30) {
				r.push(`Since ${he}'s sexually experienced, you work with ${him} on the finer points of oral sex.`);
				r.push(App.UI.DOM.makeElement("span", `${His} oral skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('oral', slave, trainingEfficiency));
			} else if (slave.skill.vaginal <= 30 && slave.vagina > 0 && canDoVaginal(slave)) {
				r.push(`Since ${he}'s sexually experienced, you work with ${him} on the finer points of penetrative sex. ${He} can already fuck pretty well, but ${his} muscular control could be improved. ${He} works ${his} Kegel muscles all week, using fingers, dildos, and your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on`);
				} else {
					r.push(`cock`);
				}
				r.push(`as training tools. ${He} becomes expert enough that ${he} is able to make you cum without any thrusting at all by you or any riding by ${him}; ${he} just flexes ${his} muscles enough to`);
				if (V.PC.dick === 0) {
					r.push(`grind the fake phallus back against your cunt.`);
				} else {
					r.push(`stimulate you.`);
				}
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('vaginal', slave, trainingEfficiency));
			} else if (slave.skill.anal <= 30 && slave.anus > 0 && canDoAnal(slave)) {
				r.push(`Since ${he}'s anally experienced, you work with ${him} on the finer points of penetrative sex. ${He} can already take it up ${his} ass, but ${his} muscular control could be improved. ${He} works ${his} Kegel muscles and anal sphincter all week, using fingers, dildos, and your`);
				if (V.PC.dick === 0) {
					r.push(`strap-on`);
				} else {
					r.push(`cock`);
				}
				r.push(`as training tools. ${He} becomes expert enough that ${he} is able to make you cum without any thrusting at all by you or any riding by ${him}; ${he} just flexes ${his} muscles enough to`);
				if (V.PC.dick === 0) {
					r.push(`squeeze the fake phallus.`);
				} else {
					r.push(`stimulate you.`);
				}
				r.push(App.UI.DOM.makeElement("span", `${His} anal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('anal', slave, trainingEfficiency));
			} else if (slave.skill.penetrative <= 30 && slave.dick > 0 && canPenetrate(slave)) { // wip
				r.push(`Since ${he}'s experienced in penetrating others, you work with ${him} on the finer points of pleasing with ${his} dick. ${He} can already enter any orifice smoothly, but ${his} control over the pace and the depth and strength of the penetration required at every moment could be improved. ${He} works ${his} Kegel muscles to improve ${his} sexual performance and practices with`);
				let orifices = [];
				if (V.policies.sexualOpenness === 1 || slave.toyHole === "dick") {
					if (V.PC.vagina > 0 && canDoVaginal(V.PC)) {
						orifices.push("vagina");
					}
					if (V.PC.anus > 0 && canDoAnal(V.PC)) {
						orifices.push("anus");
					}
					orifices.push("mouth");
					orifices[0] = "your " + orifices[0];
				}
				orifices.push("the holes of the other slaves you indicate.");
				r.push(toSentence(orifices));
				r.push(App.UI.DOM.makeElement("span", `${His} penetrative skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('penetrative', slave, trainingEfficiency));
			} else if (slave.skill.vaginal <= 10 && slave.vagina >= 0) {
				r.push(`Since ${he}'s vaginally unskilled,`);
				if (slave.vagina === 0 && !canDoVaginal(slave)) {
					r.push(`in chastity, and a virgin,`);
				} else if (slave.vagina === 0) {
					r.push(`and a virgin,`);
				} else {
					r.push(`and in chastity,`);
				}
				r.push(`you explain the basics of sex to ${him}.`);
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('vaginal', slave, vaginalTrainingEfficiency));
			} else if (slave.skill.anal <= 10) {
				r.push(`Since ${he}'s anally unskilled,`);
				if (slave.anus === 0 && !canDoAnal(slave)) {
					r.push(`an anal virgin, and in chastity,`);
				} else if (slave.anus === 0) {
					r.push(`and an anal virgin,`);
				} else {
					r.push(`and in anal chastity,`);
				}
				r.push(`you explain the basics of anal sex to ${him}.`);
				r.push(App.UI.DOM.makeElement("span", `${His} anal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('anal', slave, analTrainingEfficiency));
			} else if (slave.skill.penetrative <= 10) { // wip
				r.push(`Since ${he}'s unskilled penetrating others,`);
				if (slave.chastityPenis) {
					r.push(`and ${his} penis is caged,`);
				} else if (!canAchieveErection(slave)) {
					r.push(`and can't achieve an erection,`);
				} else {
					r.push(`and can't penetrate regular holes,`);
				}
				r.push(`you explain the basics of penetrative sex to ${him}.`);
				r.push(App.UI.DOM.makeElement("span", `${His} penetrative skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('penetrative', slave, dickTrainingEfficiency));
			} else if (slave.skill.oral < 100) {
				r.push(`${He} is already a skilled oral whore, but ${his} skills can be polished further. You train ${him} in the basics of`);
				if (V.seePee === 1) {
					r.push(`urine play,`);
				}
				r.push(`massage, pet play, needle play, and many other niche skills. You also expand ${his} oral endurance, enabling ${him} to deepthroat for extended periods.`);
				r.push(App.UI.DOM.makeElement("span", `${His} oral skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('oral', slave, trainingEfficiency));
			} else if (slave.skill.vaginal < 100 && slave.vagina > 0 && canDoVaginal(slave)) {
				r.push(`${He} is already a skilled pussy slut, but ${his} skills can be polished further. You train ${him} in the basics of`);
				if (V.seePee === 1) {
					r.push(`urine play,`);
				}
				r.push(`massage, pet play, needle play, and many other niche skills. You also work with ${him} to develop a personal regimen of vaginal muscle exercises. This will enable ${him} to squeeze and massage dicks with ${his} practiced vaginal walls.`);
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('vaginal', slave, trainingEfficiency));
			} else if (slave.skill.anal < 100 && slave.anus > 0 && canDoAnal(slave)) {
				r.push(`${He} is already a skilled anal bitch, but ${his} skills can be polished further. You train ${him} in the basics of`);
				if (V.seePee === 1) {
					r.push(`urine play,`);
				}
				r.push(`massage, pet play, needle play, and many other niche skills. You also expand ${his} knowledge of sexual positions. ${He} learns to balance ${himself} on tiptoe for the challenge of standing anal sex without support.`);
				r.push(App.UI.DOM.makeElement("span", `${His} sexual skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('anal', slave, trainingEfficiency));
			} else if (slave.skill.whoring <= 10) {
				r.push(`Since ${he}'s dangerously naïve about selling sex, you teach ${him} the basics of self protection and business.`);
				r.push(App.UI.DOM.makeElement("span", `${His} prostitution skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('whoring', slave, trainingEfficiency));
			} else if (slave.skill.entertainment <= 10) {
				r.push(`Since ${he}'s rough and unskilled at entertainment, you teach ${him} the basics of polite conversation, music, and dance.`);
				r.push(App.UI.DOM.makeElement("span", `${His} entertainment skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('entertainment', slave, trainingEfficiency));
			} else if (slave.skill.whoring <= 30) {
				r.push(`Since ${he} has only basic entertainment skills, you teach ${him} to steer clients to more lucrative sex acts.`);
				r.push(App.UI.DOM.makeElement("span", `${His} prostitution skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('whoring', slave, trainingEfficiency));
			} else if (slave.skill.entertainment <= 30) {
				r.push(`Since ${he} has only basic entertainment skills, you teach ${him} more about poise and Free Cities etiquette.`);
				r.push(App.UI.DOM.makeElement("span", `${His} entertainment skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('entertainment', slave, trainingEfficiency));
			} else if (slave.skill.whoring <= 60 && isPCCareerInCategory("escort")) {
				r.push(`${He} is already a skilled whore, so you teach ${him} some of your personal tricks to squeezing every last drop from a patron.`);
				r.push(App.UI.DOM.makeElement("span", `${His} prostitution skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('whoring', slave, trainingEfficiency));
			} else if (slave.skill.entertainment <= 60 && isPCCareerInCategory("escort")) {
				r.push(`${He} is already skilled at luring in partners, so you teach ${him} some of your sexual persuasion techniques.`);
				r.push(App.UI.DOM.makeElement("span", `${His} entertainment skills have improved.`, "lime"));
				r.push(slaveSkillIncrease('entertainment', slave, trainingEfficiency));
			} else if (slave.skill.vaginal <= 30 && slave.vagina >= 0) {
				r.push(`Since ${he} has only rudimentary vaginal skills,`);
				if (slave.vagina === 0 && !canDoVaginal(slave)) {
					r.push(`is in chastity, and a virgin on top of that,`);
				} else if (slave.vagina === 0) {
					r.push(`and still a virgin,`);
				} else {
					r.push(`and is in chastity,`);
				}
				r.push(`you spend time teaching ${him} sexual positions and how to someday use ${his} pussy to its potential. You have ${him} work ${his} Kegel muscles all week to prepare ${him} for the future.`);
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved,`, "lime"));
				r.push(`but it's a slow process without practical experience.`);
				r.push(slaveSkillIncrease('vaginal', slave, vaginalTrainingEfficiency));
			} else if (slave.skill.anal <= 30) {
				r.push(`Since ${he} has only rudimentary anal skills,`);
				if (slave.anus === 0 && !canDoAnal(slave)) {
					r.push(`is an anal virgin, and is in chastity to top it off,`);
				} else if (slave.anus === 0) {
					r.push(`and is an anal virgin,`);
				} else {
					r.push(`and is in anal chastity,`);
				}
				r.push(`you spend time teaching ${him} sexual positions and how to someday use ${his} asshole to its potential. You have ${him} work ${his} Kegel muscles and anal sphincter all week to prepare ${him} for the future.`);
				r.push(App.UI.DOM.makeElement("span", `${His} anal skills have improved,`, "lime"));
				r.push(`but it's a slow process without practical experience.`);
				r.push(slaveSkillIncrease('anal', slave, analTrainingEfficiency));
			} else if (slave.skill.penetrative <= 30 && canAchieveErection(slave)) { // wip
				r.push(`Since ${he} has only rudimentary penetrative skills,`);
				if (slave.chastityPenis) {
					r.push(`and ${his} penis is caged,`);
				} else {
					r.push(`and can't penetrate regular holes,`);
				}
				r.push(`you spend time teaching ${him} sexual positions and how to someday use ${his} cock to its potential. You have ${him} work ${his} Kegel muscles all week to prepare ${him} for the future.`);
				r.push(App.UI.DOM.makeElement("span", `${His} penetrative skills have improved,`, "lime"));
				r.push(`but it's a slow process without practical experience.`);
				r.push(slaveSkillIncrease('penetrative', slave, dickTrainingEfficiency));
			} else if (slave.skill.vaginal < 100 && slave.vagina >= 0) {
				r.push(`${He} already a skilled pussy slut,`);
				if (slave.vagina === 0 && !canDoVaginal(slave)) {
					r.push(`despite ${his} chastity and virginity,`);
				} else if (slave.vagina === 0) {
					r.push(`despite still being a virgin,`);
				} else {
					r.push(`despite ${his} chastity,`);
				}
				r.push(`but lacks practical experience. You train ${him} in the basics of`);
				if (V.seePee === 1) {
					r.push(`urine play,`);
				}
				r.push(`massage, pet play, needle play, and many other niche skills. You also work with ${him} to develop a personal regimen of vaginal muscle exercises. This will enable ${him} to squeeze and massage dicks with ${his} practiced vaginal walls. You spend time expanding ${his} knowledge of sexual positions.`);
				r.push(App.UI.DOM.makeElement("span", `${His} vaginal skills have improved,`, "lime"));
				r.push(`but it's a slow process without proper training.`);
				r.push(slaveSkillIncrease('vaginal', slave, vaginalTrainingEfficiency));
			} else if (slave.skill.anal < 100) {
				r.push(`${He} already a skilled anal bitch,`);
				if (slave.anus === 0 && !canDoAnal(slave)) {
					r.push(`despite ${his} anus chastity and virginity,`);
				} else if (slave.anus === 0) {
					r.push(`despite still being an anal virgin,`);
				} else {
					r.push(`despite ${his} anal chastity,`);
				}
				r.push(`but lacks practical experience. You train ${him} in the basics of`);
				if (V.seePee === 1) {
					r.push(`urine play,`);
				}
				r.push(`massage, pet play, needle play, and many other niche skills. You also expand ${his} knowledge of sexual positions. ${He} learns to balance ${himself} on tiptoe for the challenge of standing anal sex without support.`);
				r.push(App.UI.DOM.makeElement("span", `${His} anal skills have improved,`, "lime"));
				r.push(`but it's a slow process without proper training.`);
				r.push(slaveSkillIncrease('anal', slave, analTrainingEfficiency));
			} else {
				r.push(`${He}'s learned everything you can teach, and is now a masterful`);
				if (slave.skill.vaginal >= 100) {
					r.push(`slut;`);
				} else if (slave.vagina === 0) {
					r.push(`virgin slut;`);
				} else if (slave.dick === 0 && slave.scrotum === 0 && slave.vagina === -1) {
					r.push(`null slave;`);
				} else if (slave.dick > 0 && slave.balls === 0) {
					r.push(`gelded bitch;`);
				} else if (slave.dick > 0 && slave.boobs > 300 && slave.vagina === -1) {
					r.push(`shemale slut;`);
				} else if (slave.chastityVagina) {
					r.push(`slut, notwithstanding ${his} chastity belt;`);
				} else {
					r.push(`slave;`);
				}
				r.push(App.UI.DOM.makeElement("span", `${his} assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			}
			currentSlaveValue = 0.1;
			slave.training = 0;
			break;
		}
		case "combat training":
			trainingEfficiency = Math.max(1, Math.round((7 + (slave.devotion / 30) + (slave.intelligence / 32) - (isHindered(slave) ? 2 : 0) - Math.floor(slave.health.tired/ 10)) * hindranceMod * nymphoMod));
			r.push(`You focus on passing on your combat skills to ${him}.`);
			if (hindranceMod <= .3) {
				r.push(`It's physically impossible for you to properly train someone in your shape, so you're forced to rely on theory over example. Even the most rudimentary of techniques takes longer for ${him} to pick up due to the lack of proper demonstration.`);
			} else if (hindranceMod <= .5) {
				r.push(`You have to rely on theory more than example due to your body, cutting into the effectiveness of your training.`);
			} else if (hindranceMod <= .7) {
				r.push(`It's difficult to convey proper technique with your body constantly getting in the way.`);
			} else if (hindranceMod < 1) {
				r.push(`Your body gets in the way at times, forcing you to reconsider how exactly to demonstrate techniques with proper form.`);
			}
			if (slave.intelligence + slave.intelligenceImplant > 15) {
				r.push(`${His} intelligence allows ${him} to absorb ${his} lessons quickly.`);
			} else if (slave.intelligence + slave.intelligenceImplant < -15) {
				r.push(`${His} stupidity makes ${him} absorb ${his} lessons slowly.`);
			} else {
				r.push(`${He} takes to your lessons well enough.`);
			}
			if (isHindered(slave)) {
				r.push(`${He} isn't physically cut for combat, which hinders ${his} growth`);
			}
			if (slave.health.tired > 30) {
				r.push(`${His} fatigue cuts into the amount of time ${he} can spend training.`);
			}
			if (nymphoMod < 1) {
				r.push(`Activities like this definitely has to be done in the buff, and the sight of ${his}`);
				if (slave.weight > 160) {
					r.push(`rippling flesh`);
				} else if (slave.weight > 95) {
					r.push(`soft body`);
				} else if (slave.muscles > 95) {
					r.push(`ripped body`);
				} else if (slave.muscles > 30) {
					r.push(`muscular body`);
				} else if (slave.muscles > 5) {
					r.push(`toned body`);
				} else if (slave.weight > 30) {
					r.push(`soft body`);
				} else {
					r.push(`lithe body`);
				}
				if (slave.weight > 160) {
					r.push(`bouncing around`);
				} else {
					r.push(`in motion`);
				}
				r.push(`is just what your libido craves. It does detract from your teaching, but who cares when the lesson concludes with`);
				if (canDoVaginal(slave) && slave.vagina > 0 && (canPenetrate(V.PC) || V.PC.vagina >= 0)) {
					if (canPenetrate(V.PC)) {
						r.push(`some sweaty sex.`);
						seX(slave, "vaginal", V.PC, "penetrative");
						tryKnockMeUp(slave, 5, 0, V.PC);
					} else {
						r.push(`some sweaty tribbing.`);
						seX(slave, "vaginal", V.PC, "vaginal");
						tryKnockMeUp(slave, 3, 0, V.PC);
						tryKnockMeUp(V.PC, 3, 0, slave);
					}
				} else if (canDoAnal(slave) && slave.anus > 0 && canPenetrate(V.PC)) {
					r.push(`some sweaty anal.`);
					seX(slave, "anal", V.PC, "penetrative");
					tryKnockMeUp(slave, 5, 1, V.PC);
				} else if ((V.policies.sexualOpenness === 1 || slave.toyHole === ToyHole.DICK) && (V.PC.dick > 0 || V.PC.vagina >= 0) && ((slave.dick > 0 && slave.chastityPenis === 0) || canDoVaginal(slave)) && V.PC.belly + slave.belly < 5000) {
					r.push(`a sweaty 69.`);
					if (V.PC.dick > 0) {
						seX(V.PC, "penetrative", slave, "oral");
					} else {
						seX(V.PC, "vaginal", slave, "oral");
					}
					if (slave.dick > 0 && slave.chastityPenis === 0) {
						seX(slave, "penetrative", V.PC, "oral");
					} else {
						seX(slave, "vaginal", V.PC, "oral");
					}
				} else if ((V.policies.sexualOpenness === 1 || slave.toyHole === ToyHole.DICK) && (V.PC.vagina > 0 || V.PC.anus > 0) && canPenetrate(slave)) {
					r.push(`you getting filled by ${his} dick.`);
					if (V.PC.vagina > 0) {
						seX(slave, "penetrative", V.PC, "vaginal");
						tryKnockMeUp(V.PC, 5, 0, slave);
					} else {
						seX(slave, "penetrative", V.PC, "anal");
						tryKnockMeUp(V.PC, 5, 1, slave);
					}
				} else if (V.PC.dick > 0) {
					r.push(`you getting your dick sucked.`);
					seX(slave, "oral", V.PC, "penetrative");
				} else if (V.PC.vagina >= 0) {
					r.push(`you getting eaten out.`);
					seX(slave, "oral", V.PC, "vaginal");
				} else {
					r.push(`a thorough molestation of ${his} sweaty body.`);
				}
			}
			r.push(slaveSkillIncrease('combat', slave, trainingEfficiency));
			slave.health.tired = Math.clamp(slave.health.tired + 10, 0, 100);
			if (slave.skill.combat >= V.PC.skill.combat - (130 - V.PC.intelligence + V.PC.intelligenceImplant)) {
				Math.clamp(slave.skill.combat, 0, V.PC.skill.combat);
				if (slave.skill.combat >= 100) {
					r.push(`${He}'s learned everything you can possibly teach ${him}; if ${he} weren't so dedicated to you, it might be worrying that you didn't leave yourself an edge against ${him}.`);
				} else {
					r.push(`${He}'s learned everything you can teach ${him}, but you both could possibly discover further combat insights by sparring with each other.`);
				}
				r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			}
			currentSlaveValue = 0.1;
			slave.training = 0;
			break;
		case "spar":
			if (nymphoMod < 1) {
				r.push(`You spar in the buff so you may savor the sight of ${his}`);
				if (slave.weight > 160) {
					r.push(`rippling flesh`);
				} else if (slave.weight > 95) {
					r.push(`soft body`);
				} else if (slave.muscles > 95) {
					r.push(`ripped body`);
				} else if (slave.muscles > 30) {
					r.push(`muscular body`);
				} else if (slave.muscles > 5) {
					r.push(`toned body`);
				} else if (slave.weight > 30) {
					r.push(`soft body`);
				} else {
					r.push(`lithe body`);
				}
				if (slave.weight > 160) {
					r.push(`bouncing around as you fight,`);
				} else {
					r.push(`in motion,`);
				}
				r.push(`and soon your moves take a sexual`);
				if (isHorny(slave)) {
					r.push(`turn, only to be matched by the equally aroused slave${girl}. The session quickly devolves into what can only be described as "tantric wrestling" and only ends when the two of you are too exhausted to continue. Neither of you even considered improving your combat skills, but you both found the match to be`);
					r.push(App.UI.DOM.makeElement("span", `rather stimulating`, ["hotpink"]));
					r.push(`and something that should happen again. It isn't long until ${he} challenges you to another sparring match, to which you happily oblige.`);
					SimpleSexAct.Player(slave, 30);
					slave.devotion += 5;
					V.PC.need = 0;
				} else if (slave.skill.combat > 60) {
					r.push(`turn, forcing ${him} to swiftly send you to the floor. ${He} expected you to take this seriously; why invite ${him} to hone ${his} skills just to use the opportunity to ogle ${him}? ${He}`);
					r.push(App.UI.DOM.makeElement("span", `ends the session resentful`, ["mediumorchid"]));
					r.push(`of the wasted time, and obstinately refuses further challenges.`);
					r.push(App.UI.DOM.makeElement("span", `${His} assignment has defaulted to restoring ${his} devotion to you.`, ["yellow"]));
					pa.objective = "build devotion";
					slave.devotion -= 20;
				} else if (slave.energy > 20) {
					r.push(`turn. ${He} isn't quite sure what kind of sex game this is, but quickly gets into the swing of things and plays along. Neither of you learn anything new, but`);
					r.push(App.UI.DOM.makeElement("span", `${he} had fun`, ["hotpink"]));
					r.push(`doing it.`);
					SimpleSexAct.Player(slave, 3);
					slave.devotion += 2;
				} else {
					r.push(`turn. ${He} wasn't looking forward to being raped, and giving ${him} the chance to defend ${himself} against you`);
					r.push(App.UI.DOM.makeElement("span", `bolsters ${his} confidence.`, ["mediumorchid"]));
					r.push(`${He} glares at your panting form on the floor for a moment`);
					const judgement = overpowerCheck(slave, V.PC);
					const isVirile = (slave.balls > 0 && slave.pubertyXY === 1 && slave.vasectomy === 0 && slave.ballType !== "sterile");
					if (slave.devotion < -20 && slave.trust > 20 && judgement < 20) {
						r.push(`as dirty thoughts flick through ${his} mind. ${He} will be in serious trouble if ${he} takes advantage of you in this state and gets caught, but with you as horny as you are, ${he} might get away with it. ${He} moves towards you,`);
						if (canPenetrate(slave)) {
							if (slave.dick === 1) {
								r.push(`pathetic erection at the ready,`);
							} else if (slave.dick === 2) {
								r.push(`little erection at the ready,`);
							} else if (slave.dick === 3) {
								r.push(`erection in hand,`);
							} else if (slave.dick === 4) {
								r.push(`stroking ${his} sizeable erection,`);
							} else if (slave.dick === 5) {
								r.push(`stroking an impressive erection to the ready,`);
							} else if (slave.dick === 6) {
								r.push(`${his} enormous erection aching for your holes,`);
							} else if (slave.dick === 7) {
								r.push(`${his} massive, priapism stricken dick at the ready to stretch you to your limits,`);
							}
							r.push(`and assumes the position.`);
						} else if (canDoVaginal(slave)) {
							if (slave.vaginaLube > 1) {
								r.push(`a trail of pussy juice following ${him},`);
							} else if (slave.vaginaLube > 0) {
								r.push(`dripping pussy juice as ${he} goes,`);
							} else {
								r.push(`${his} dry pussy begging for attention,`);
							}
							r.push(`and positions ${himself} over your face.`);
						} else if (canDoAnal(slave)) {
							r.push(`butthole itching with anticipation, and lowers ${his} ass towards you.`);
						} else {
							r.push(`and lacking any means of release, sticks a finger in your mouth.`);
						}
						r.push(`Before ${he} can get any further, you come to your senses and grab ${him} forcing ${him} to struggle against you.`);
						if (overpowerCheck(slave, V.PC) > random(1, 100)) {
							r.push(`${He} manages to get the upper hand`);
							if (canPenetrate(slave)) {
								if (V.PC.vagina > 0) {
									r.push(`and quickly penetrates you. A few thrusts in and your libido is back in control and bucking against ${him} as ${he} fucks you raw. ${He} doesn't have much sexual stamina, nor time to take it slow, so ${he} blows ${his} load into you as soon as ${he} can and hurries off before anyone else notices what is going on.`);
									seX(slave, "penetrative", V.PC, "vaginal");
									tryKnockMeUp(V.PC, 5, 0, slave);
								} else if (V.PC.anus > 0) {
									if (V.PC.vagina === 0) {
										r.push(`and, after considering your virgin pussy for a moment, decides not to risk it and shoves it in your ass instead.`);
									} else {
										r.push(`and quickly shoves it in your ass.`);
									}
									r.push(`A few thrusts in and your libido is back in control and bucking against ${him} as ${he} fucks you raw. ${He} doesn't have much sexual stamina, nor time to take it slow, so ${he} blows ${his} load into you as soon as ${he} can and hurries off before anyone else notices what is going on.`);
									cumTotal = (cumAmount(slave) / 70);
									seX(slave, "penetrative", V.PC, "anal");
									tryKnockMeUp(V.PC, 5, 1, slave);
								} else {
									if (V.PC.vagina === 0 || V.PC.anus === 0) {
										r.push(`and, after considering your virginity for a moment, decides not to risk it and shoves it in your mouth instead.`);
									} else {
										r.push(`and quickly shoves it in your mouth.`);
									}
									if (canTaste(V.PC)) {
										r.push(`The taste of ${his} precum puts your libido in overdrive`);
									} else if (canSmell(V.PC)) {
										r.push(`The smell of ${his} precum and crotch puts your libido in overdrive`);
									} else {
										r.push(`With something phallic in your mouth, your libido takes the reigns`);
									}
									r.push(`and, after blowing ${his} load into your gullet, is stuck`);
									if (slave.dick > 5) {
										r.push(`desperately trying to pull ${his} giant dick out of your throat before you suffocate attempting to drain even more cum out of ${him}.`);
									} else if (slave.dick > 2) {
										r.push(`trying to pull ${his} dick out of your throat so ${he} can slip away before you drain even more cum out of ${him}.`);
									} else {
										r.push(`desperately trying to pull ${his} tiny dick out of your vice-like suction so ${he} can slip away.`);
									}
									cumTotal = (cumAmount(slave) / 70);
									seX(slave, "penetrative", V.PC, "oral");
								}
							} else if (canDoVaginal(slave)) {
								r.push(`smothers you with ${his} vagina, forcing you to eat ${him} out. ${canSmell(V.PC) ? `The scent of ${his} arousal` : `A little motivation`} gets your libido fired up again and your tongue sets to work. ${He} eventually tires of ${slave.scrotum > 0 ? "teabagging you" : "humiliating the willing"}, and sneaks off once ${he}'s climaxed`);
								if ((slave.prostate > 0 || cumTotal >= 1) && slave.dick === 0) {
									r.push(`and thoroughly soaked you with ${isVirile ? "semen and " : ""}sexual fluids.`);
								} else if (slave.balls > 0 && slave.dick === 0) {
									r.push(`and squirted a load across your face.`);
								} else if (slave.vaginaLube > 0) {
									r.push(`and thoroughly coated your face with femcum.`);
								} else {
									r.push(`on your face.`);
								}
								seX(slave, "vaginal", V.PC, "oral");
							} else if (canDoAnal(slave)) {
								r.push(`takes a seat on your face, forcing you to give ${him} a rimjob. A little motivation gets your libido fired up again and your tongue sets to work. ${He} eventually tires of humiliating the willing, and sneaks off once it becomes clear ${he} isn't going to orgasm from this.`);
								seX(slave, "anal", V.PC, "oral");
							} else {
								r.push(`forces you back to the ground`);
								if (slave.lactation > 0) {
									r.push(`before pushing a milky nipple into your mouth. Soon your libido has you sucking away, oblivious to ${him} playing with ${himself} while enjoying the release. ${He} sneaks off once ${he} feels you've drunk as much of ${his} milk as you can handle.`);
									slave.boobs -= slave.boobsMilk;
									slave.boobsMilk = 0;
									slave.lactationDuration = 2;
								} else {
									r.push(`before pushing a nipple against your lips. Soon your libido has you sucking away, oblivious to ${him} exploring your body while trying to get ${himself} off. Eventually ${he} just gets sore, so ${he} gives up and sneaks away.`);
								}
							}
							r.push(`You come around with hazy memories of having sex,`);
							if (cumTotal >= 10) {
								r.push(`and a drum-taut belly,`);
							} else if (cumTotal >= 5) {
								r.push(`and a bulging, liquid-filled belly,`);
							} else if (cumTotal >= 1.5) {
								r.push(`and a belly bloated with something sloshing about,`);
							} else if (cumTotal >= .1) {
								r.push(`and a full belly,`);
							}
							r.push(`while ${he}`);
							r.push(App.UI.DOM.makeElement("span", `essentially got away with raping you.`, ["mediumaquamarine"]));
							slave.trust += 10;
							V.PC.need -= 5;
						} else {
							r.push(`You manage to overpower ${him}, tossing ${him} to the floor beside you and pinning ${him} down until ${he} surrenders.`);
							r.push(App.UI.DOM.makeElement("span", `A look of terror crosses ${his} face`, ["gold"]));
							r.push(`as the realization of just how screwed ${he} is washes over ${him}. ${He} clearly needs to relearn ${his} place, so`);
							r.push(App.UI.DOM.makeElement("span", `${his} assignment has been corrected to harshly breaking ${his} will.`, ["yellow"]));
							pa.objective = "harshly break will";
							slave.trust -= 20;
						}
					} else if (slave.devotion <= 20 && slave.trust > 20 && judgement < 50) {
						r.push(`before deciding to give you what you want. Sure, ${he} could get in trouble for doing this, but if ${he} fucks you hard enough, your lust addled mind probably won't remember anything other than sex. ${He} moves towards you,`);
						if (canPenetrate(slave)) {
							if (slave.dick === 1) {
								r.push(`pathetic erection at the ready,`);
							} else if (slave.dick === 2) {
								r.push(`little erection at the ready,`);
							} else if (slave.dick === 3) {
								r.push(`erection in hand,`);
							} else if (slave.dick === 4) {
								r.push(`stroking ${his} sizeable erection,`);
							} else if (slave.dick === 5) {
								r.push(`stroking an impressive erection to the ready,`);
							} else if (slave.dick === 6) {
								r.push(`${his} enormous erection aching for your holes,`);
							} else if (slave.dick === 7) {
								r.push(`${his} massive, priapism stricken dick at the ready to stretch you to your limits,`);
							}
							r.push(`and assumes the position.`);
						} else if (canDoVaginal(slave)) {
							if (slave.vaginaLube > 1) {
								r.push(`a trail of pussy juice following ${him},`);
							} else if (slave.vaginaLube > 0) {
								r.push(`dripping pussy juice as ${he} goes,`);
							} else {
								r.push(`${his} dry pussy begging for attention,`);
							}
							r.push(`and positions ${himself} over your face.`);
						} else if (canDoAnal(slave)) {
							r.push(`butthole itching with anticipation, and lowers ${his} ass towards your face.`);
						} else {
							r.push(`and lacking any means of release, sticks a finger in your mouth.`);
						}
						r.push(`Before ${he} can get any further, you come to your senses and grab ${him} forcing ${him} to struggle against you.`);
						if (overpowerCheck(slave, V.PC) > random(1, 100)) {
							r.push(`${He} manages to get the upper hand and`);
							if (canPenetrate(slave)) {
								if (V.PC.vagina >= 0) {
									if (V.PC.vagina > 0) {
										r.push(`and quickly penetrates you.`);
									} else {
										r.push(`and slowly eases it in to hopefully`);
										r.push(App.UI.DOM.makeElement("span", `make your first time less memorable,`, ["red"]));
										r.push(`for ${his} sake.`);
										V.PC.vagina++;
									}
									r.push(`A few thrusts in and your libido is back in control and bucking against ${him} as ${he} fucks you raw. ${He} doesn't have much sexual stamina, but ${he} makes sure to take ${his} time to better the odds of fucking you senseless. ${He} thoroughly creampies you for good measure before heading on ${his} way.`);
									seX(slave, "penetrative", V.PC, "vaginal");
									tryKnockMeUp(V.PC, 15, 0, slave);
								} else if (V.PC.anus >= 0) {
									if (V.PC.anus > 0) {
										r.push(`and quickly shoves it in your ass.`);
									} else {
										r.push(`and slowly breaks in your asshole in the hopes that`);
										r.push(App.UI.DOM.makeElement("span", `making your first time less memorable,`, ["red"]));
										r.push(`will keep you from remembering it.`);
										V.PC.anus++;
									}
									r.push(`A few thrusts in and your libido is back in control and bucking against ${him} as ${he} fucks you raw. ${He} doesn't have much sexual stamina, but ${he} makes sure to take ${his} time to better the odds of fucking you senseless. ${He} thoroughly ${his} load inside you before heading on ${his} way.`);
									cumTotal = (cumAmount(slave) / 70);
									if (cumTotal >= 5) {
										r.push(`${He} briefly considers trying to drain the cumballoon ${he} has turned you into, but decides it's not worth the added risk.`);
									}
									seX(slave, "penetrative", V.PC, "anal");
									tryKnockMeUp(V.PC, 15, 1, slave);
								} else {
									r.push(`and quickly shoves it in your mouth.`);
									if (canTaste(V.PC)) {
										r.push(`The taste of ${his} precum puts your libido in overdrive`);
									} else if (canSmell(V.PC)) {
										r.push(`The smell of ${his} precum and crotch puts your libido in overdrive`);
									} else {
										r.push(`With something phallic in your mouth, your libido takes the reigns`);
									}
									r.push(`and, after blowing ${his} load into your gullet, is stuck`);
									if (slave.dick > 5) {
										r.push(`desperately trying to pull ${his} sore dick out of your throat before you suffocate attempting to drain even more cum out of ${him}.`);
									} else if (slave.dick > 2) {
										r.push(`trying to pull ${his} sore dick out of your throat so ${he} can get away before you drain even more cum out of ${him}.`);
									} else {
										r.push(`desperately trying to pull ${his} sore dick out of your vice-like suction so ${he} can get away.`);
									}
									cumTotal = (cumAmount(slave) / 70);
									if (cumTotal >= 5) {
										r.push(`${He} eyes how large your stomach has inflated from ${his} cum, hopefully this can't be traced back to ${him}.`);
									}
									seX(slave, "penetrative", V.PC, "oral");
								}
							} else if (canDoVaginal(slave)) {
								r.push(`smothers you with ${his} vagina, forcing you to eat ${him} out. ${canSmell(V.PC) ? `The scent of ${his} arousal` : `A little motivation`} gets your libido fired up again and your tongue sets to work. ${He} eventually tires of your untrained tongue and heads off once ${he}'s climaxed`);
								if ((slave.prostate > 0 || cumTotal >= 1) && slave.dick === 0) {
									r.push(`and thoroughly soaked you with ${isVirile ? "semen and " : ""}sexual fluids.`);
								} else if (slave.balls > 0 && slave.dick === 0) {
									r.push(`and squirted a load across your face.`);
								} else if (slave.vaginaLube > 0) {
									r.push(`and thoroughly coated your face with femcum.`);
								} else {
									r.push(`on your face.`);
								}
								seX(slave, "vaginal", V.PC, "oral");
							} else if (canDoAnal(slave)) {
								r.push(`takes a seat on your face, forcing you to give ${him} a rimjob. A little motivation gets your libido fired up again and your tongue sets to work. Once ${he}'s gotten off, a spent a little extra time making certain the taste of ${his} ass will linger on your tongue, ${he} heads on ${his} way.`);
								seX(slave, "anal", V.PC, "oral");
							} else {
								r.push(`forces you back to the ground`);
								if (slave.lactation > 0) {
									r.push(`before sticking a milky nipple into your mouth. Soon your libido has you sucking away, oblivious to ${him} playing with your body while enjoying the release. ${He} leaves you to drift off to sleep only after you've drained ${him} of all ${his} milk and left ${his} nipples painfully sore.`);
									milkTotal = (milkAmount(slave) / 14);
									if (milkTotal >= 5) {
										r.push(`${He} eyes how large your stomach has swollen with ${his} milk, hopefully you'll consider this a good time and not think too much into it.`);
									}
									slave.boobs -= slave.boobsMilk;
									slave.boobsMilk = 0;
									slave.lactationDuration = 2;
								} else {
									r.push(`before pushing a nipple against your lips. Soon your libido has you sucking away, oblivious to ${him} playing with your body while trying to get ${himself} off. Eventually ${he} just gets tired and sore, so ${he} gives up and heads on ${his} way.`);
								}
							}
							r.push(`You come out of your torpor feeling satisfied,`);
							if (cumTotal + milkTotal >= 10) {
								r.push(`even if your belly feels like it might burst,`);
							} else if (cumTotal + milkTotal >= 5) {
								r.push(`if your sloshing belly is anything to go by,`);
							} else if (cumTotal + milkTotal >= 1.5) {
								r.push(`if a little bloated,`);
							} else if (cumTotal + milkTotal >= .1) {
								r.push(`and pleasantly full,`);
							}
							r.push(`while ${he}`);
							r.push(App.UI.DOM.makeElement("span", `got away with raping you.`, ["mediumaquamarine"]));
							slave.trust += 15;
							V.PC.need -= 5;
						} else {
							r.push(`You manage to overpower ${him}, tossing ${him} to the floor beside you and pinning ${him} down until ${he} surrenders.`);
							r.push(App.UI.DOM.makeElement("span", `A look of uncertainty crosses ${his} face`, ["gold"]));
							r.push(`as the realization that ${he} isn't going to be able to talk ${his} way out of this dawns on ${him}. ${He} clearly needs to relearn ${his} place, so`);
							r.push(App.UI.DOM.makeElement("span", `${his} assignment has been corrected to breaking ${his} will.`, ["yellow"]));
							pa.objective = "break will";
							slave.trust -= 5;
						}
					} else {
						r.push(`before helping you to your feet so the session can be over.`);
					}
					slave.devotion -= 5;
				}
			} else if (Math.abs(V.PC.skill.combat - slave.skill.combat) > 30) {
				r.push(`The skill difference between you is just too great for your bouts to not end instantly;`);
				r.push(App.UI.DOM.makeElement("span", `${his} assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			} else {
				r.push(`You hone your combat skills against each other in an effort to perfect what you already know and discover new ways to improve yourselves.`);
				if (isHindered(V.PC) && isHindered(slave)) {
					r.push(`You are both extremely awkward in motion, and spend most of your time learning how to adequately fight with your bodies getting in the way. Your bouts would be comical if you both weren't making a serious effort.`);
					if (V.PC.skill.combat < 100 && random(1, 200) < Math.max(V.PC.intelligence, 20)) {
						skillgainP = true;
					}
					if (slave.skill.combat < 100 && random(1, 200) < Math.max(slave.intelligence, 20)) {
						skillgainS = true;
					}
				} else if (isHindered(V.PC)) {
					r.push(`You are extremely awkward in motion, and spend most of your time learning how to adequately fight with your body getting in the way, effectively holding ${him} back. ${He} does what ${he} can to help you adapt, but your bouts are still undeniably one-sided.`);
					if (V.PC.skill.combat < 100 && random(1, 200) < Math.max(V.PC.intelligence, 20)) {
						skillgainP = true;
					}
					if (slave.skill.combat < 100 && random(1, 100) < Math.max(slave.intelligence, 20)) {
						skillgainS = true;
					}
				} else if (isHindered(slave)) {
					r.push(`${He} is extremely awkward in motion, and spends most of ${his} time learning how to adequately fight with ${his} body getting in the way, effectively holding you back. You does what you can to help you adapt, but your bouts are still undeniably one-sided.`);
					if (V.PC.skill.combat < 100 && random(1, 100) < Math.max(V.PC.intelligence, 20)) {
						skillgainP = true;
					}
					if (slave.skill.combat < 100 && random(1, 200) < Math.max(slave.intelligence, 20)) {
						skillgainS = true;
					}
				} else {
					r.push(`Your bouts are intense and can easily go either way, but win or lose, ${he} is a good sport about it.`);
					if (V.PC.skill.combat < 100 && random(1, 100) < Math.max(V.PC.intelligence, 20)) {
						skillgainP = true;
					}
					if (slave.skill.combat < 100 && random(1, 100) < Math.max(slave.intelligence, 20)) {
						skillgainS = true;
					}
				}
				if (slave.skill.combat >= 100 && V.PC.skill.combat >= 100) {
					r.push(`There's little more either of you can learn from sparring, so you mostly fight for fun now.`);
				} else if (V.PC.skill.combat >= 100) {
					r.push(`There's little more you can learn from sparring, so you mostly focus on improving ${his} technique.`);
				} else if (slave.skill.combat >= 100) {
					r.push(`There's little more ${he} can learn from sparring, so ${he} mostly tries to help you improve your technique.`);
				}
				oldSkill = V.PC.skill.combat;
				if (skillgainP) {
					V.PC.skill.combat++;
					if (oldSkill <= 60 && V.PC.skill.combat > 60) {
						r.push(`You have become an <span class="green">expert at combat.</span>`);
					} else if (oldSkill < 100 && V.PC.skill.combat >= 100) {
						r.push(`You've <span class="green">mastered the art of combat.</span>`);
					}
				}
				if (skillgainS) {
					r.push(slaveSkillIncrease('combat', slave));
				}
				r.push(`Spending your free time with ${him} like this`);
				r.push(App.UI.DOM.makeElement("span", `helps strengthen ${his} bond to you,`, ["hotpink"]));
				r.push(`while also proving to ${him} that you are`);
				r.push(App.UI.DOM.makeElement("span", `someone ${he} can trust.`, ["mediumaquamarine"]));
				slave.devotion += 4;
				slave.trust += 4;
			}
			currentSlaveValue = 0.1;
			slave.training = 0;
			break;
		case "break will":
			slave.devotion -= 4;
			if (slave.trust > 20) {
				slave.trust -= 15;
			} else {
				slave.trust -= 10;
			}
			if (slave.devotion < -80) {
				r.push(`You bind ${him} securely to a special chair in your`);
				if (!canDoAnal(slave) || (slave.vagina > -1 && !canDoVaginal(slave))) {
					r.push(`office with ${his} holes exposed and vulnerable.`);
				} else {
					r.push(`office.`);
				}
				r.push(`Yours is a busy week, with a lot of business interviews, so whenever the interviewee has pleased you, you offer him or her the use of the poor slave's body on the way out. The chair is specially designed so that the seat, back and armrests can rotate vertically relative to the ground, so ${his} body can be spun to make any of ${his} available holes convenient. Fortunately, it also has a pan beneath it to stop the generous stream of ejaculate and lubricant that drips from ${him} from besmirching the floor. ${He} can't help but`);
				r.push(App.UI.DOM.makeElement("span", `become used to the abuse`, ["gold"]));
				r.push(`despite ${his}`);
				r.push(App.UI.DOM.makeElement("span", `resentment.`, ["mediumorchid"]));
				r.push(VCheck.Both(slave, 10, 5));
			} else if (slave.devotion < -60 && slave.anus !== 0) {
				r.push(`${slave.slaveName} is really wild and stern measures must be taken. So, ${he} is`);
				if (!canDoAnal(slave) || (slave.vagina > -1 && !canDoVaginal(slave))) {
					r.push(`stripped of ${his} protective chastity and`);
				}
				r.push(`forced, struggling and screaming, into a latex suit that completely blinds, deafens, and immobilizes ${him}. So attired, the only places where ${he} can feel any sensations at all other than endless latex darkness are ${his}`);
				if (slave.dick !== 0 && slave.vagina !== -1) {
					r.push(`pussy, and cock`);
				} else if (slave.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`pussy`);
				}
				r.push(`and backdoor. For ${him}, time becomes a featureless, torturous boredom broken only by occasional rape. Eventually, ${he} becomes so`);
				r.push(App.UI.DOM.makeElement("span", `desperate`, ["mediumorchid"]));
				r.push(`for something, anything, to break the monotony that ${he} begins to look forward to the next time a phallus will`);
				r.push(App.UI.DOM.makeElement("span", `force`, ["gold"]));
				r.push(`its way into ${him}.`);
				r.push(VCheck.Both(slave, 6, 3));
			} else if (slave.devotion < -50 && slave.hStyle !== "shaved" && random(1, 100) > 90) {
				r.push(`${slave.slaveName} needs to be taken down a peg. Fortunately, you know just the thing. You bring ${him} into a bathroom, place a chair in the tub, and tie ${him} securely to the chair. ${He} isn't too perturbed — ${he} probably expects a facefuck under running water or something like that — but ${he} begins to cry when ${he}`);
				if (canHear(slave)) {
					r.push(`hears you switch on`);
				} else if (canSee(slave)) {
					r.push(`sees you pull out`);
				} else {
					r.push(`feels the cool touch of`);
				}
				r.push(`an electric shaver. ${He} luxuriates in ${his} hair, flaunting it every chance ${he} gets; it's something of value in a bleak slave world and ${he} sobs as you shave it off ${him}. Afterward, ${he} sniffles and`);
				r.push(App.UI.DOM.makeElement("span", `looks at you in fear`, ["gold"]));
				r.push(`and`);
				r.push(App.UI.DOM.makeElement("span", `unhappiness`, ["mediumorchid"]));
				r.push(`when you rub ${his} newly bald scalp. Of course, there's always the body modification studio if you ever feel like ${he}'s earned ${his} hair back.`);
				slave.hStyle = "shaved";
				slave.hLength = 0;
			} else if (canDoAnal(slave) && (random(1, 100) < 10)) {
				r.push(`Sometimes, there's no need to be clever. The first indication ${he} gets that you've decided to train ${him} this week is when ${he} wakes suddenly in the middle of the night to the burning sensation of a`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`being shoved up ${his} ass. Not knowing what is happening, ${he} struggles, but since ${he} was already lying in ${his} bed you just lie on top of ${him} and press ${his} wriggling body into the sheets as you assrape ${him}. For the rest of the week, ${he} finds ${himself} grabbed and fucked. ${He} can't help but`);
				r.push(App.UI.DOM.makeElement("span", `become used to the abuse`, ["gold"]));
				r.push(`despite ${his}`);
				r.push(App.UI.DOM.makeElement("span", `resentment.`, ["mediumorchid"]));
				r.push(VCheck.Anal(slave, 6));
			} else if (canDoVaginal(slave) && (random(1, 100) < 10)) {
				r.push(`Sometimes, there's no need to be clever. The first indication ${he} gets that you've decided to train ${him} this week is when ${he} wakes suddenly in the middle of the night to the filling sensation of a`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`being shoved up into ${his} pussy. Not knowing what is happening, ${he} struggles, but since ${he} was already lying in ${his} bed you just lie on top of ${him} and press ${his} wriggling body into the sheets as you rape ${him}. For the rest of the week, ${he} finds ${himself} grabbed and fucked. ${He} can't help but`);
				r.push(App.UI.DOM.makeElement("span", `become used to the abuse`, ["gold"]));
				r.push(`despite ${his}`);
				r.push(App.UI.DOM.makeElement("span", `resentment.`, ["mediumorchid"]));
				r.push(VCheck.Vaginal(slave, 6));
			} else {
				r.push(`${slave.slaveName} violently resists you whenever ${he} can. This cannot be permitted, so after a particularly severe bout of physical resistance, you decide to employ an old method of breaking a mind without damaging a body. You secure ${him} to a board and gently wash ${his} face with a wet cloth. ${He} spits in defiance, only to be surprised when you lower the board so that ${his} feet are higher than ${his} head. You tie the cloth around ${his} face. A thin stream of water onto the cloth produces all the feeling and none of the reality of a slow death by drowning. Waterboarding isn't much use for extracting information, but it works well for`);
				r.push(App.UI.DOM.makeElement("span", `slavebreaking.`, ["gold"]));
			}
			if (V.PC.skill.slaving >= 100) {
				r.push(`Your`);
				r.push(App.UI.DOM.makeElement("span", `slavebreaking experience`, ["skill", "player"]));
				r.push(`allows you to apply`);
				r.push(App.UI.DOM.makeElement("span", `exquisitely calibrated`, ["gold"]));
				r.push(`mental pressure.`);
				slave.trust -= 2;
			}
			if (slave.trust < -20 && slave.fetishKnown === 0) {
				r.push(`${He} is now fully broken;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to exploring ${his} sexuality.`, ["yellow"]));
				pa.objective = "explore sexuality";
			} else if (slave.trust < -20) {
				r.push(`${He} is now fully broken;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			} else if (slave.devotion > 20 && slave.fetishKnown === 0) {
				r.push(`${He} is now obedient and attentive;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to exploring ${his} sexuality.`, ["yellow"]));
				pa.objective = "explore sexuality";
			} else if (slave.devotion > 20) {
				r.push(`${He} is now obedient and attentive;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			}
			currentSlaveValue = 0.7;
			slave.training = 0;
			break;
		case "harshly break will":
			slave.devotion -= 5;
			slave.trust -= 10;
			healthDamage(slave, 1);
			if (slave.fetish === Fetish.MINDBROKEN) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName}'s mind is broken. ${He} is a boring slave to torture, though ${his} body will still occasionally react to intense pain. No matter what you try, nothing really reaches ${his} destroyed soul. The agonies do`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
			} else if (slave.devotion < -90) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`Old traditions should not be forgotten. The scourge is the oldest slavebreaking tool known to man, and to slave${girl}s who do not properly obey ${womenP}. For the whole week, whenever ${slave.slaveName} disobeys you or whenever the whim strikes, you bind ${him} securely and flog ${him} without mercy. You use a soft leather appliance and apply medical care afterward, so there will be no permanent scarring, but`);
				r.push(App.UI.DOM.makeElement("span", `${his} health is affected and the beatings leave ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
				r.push(`${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience.`, ["gold"]));
			} else if (slave.devotion < -50 && canDoAnal(slave)) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName} is willing to physically defend ${himself} against sexual abuse. Training ${him} out of this rebelliousness is a nice sexual change of pace. For the entire week, whenever ${he} commits some minor sin, you fight ${him} into a state of physical submission and then sodomize ${him}. This usually requires an extended beating to render ${him} quiescent, followed by holding ${him} down so that ${his} struggles do not dislodge your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`from ${his} delightfully spasming butthole. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the extreme stress`);
				r.push(App.UI.DOM.makeElement("span", `affects ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
				r.push(VCheck.Anal(slave, 6));
			} else if (slave.scrotum > 0) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName} has indefensible, obvious targets for harsh breaking. Whenever ${he} falls short in the smallest way, you bind ${him} in such a way that ${his}`);
				if (slave.dick) {
					r.push(`cock and`);
				}
				r.push(`balls are dangling defenseless, and ${he} cannot move to avoid blows. You then indulge your inventiveness, applying clips, weights, and simple beatings to ${his}`);
				if (slave.dick) {
					r.push(`member and`);
				}
				r.push(`sack, while beating the rest of ${him} thoroughly. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the beatings`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
			} else if (slave.dick > 0) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName} has an indefensible, obvious target for harsh breaking. Whenever ${he} falls short in the smallest way, you bind ${him} in such a way that ${his} cock is dangling defenseless, and ${he} cannot move to avoid blows. You then indulge your inventiveness, applying clips, weights, and simple beatings to ${his} member, while beating the rest of ${him} thoroughly. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the beatings`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
			} else if (slave.clit > 0) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName} has an indefensible, obvious target for harsh breaking. Whenever ${he} falls short in the smallest way, you bind ${him} in such a way that ${his} unusually large clit is visible and defenseless, and ${he} cannot move to avoid blows. You then indulge your inventiveness, applying clips, weights, and simple slaps to ${his} womanhood, while beating the rest of ${him} thoroughly. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the beatings`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
			} else if (slave.nipples === NippleShape.HUGE) {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`${slave.slaveName}'s nipples beg for punishment. Whenever ${he} falls short in the smallest way, you bind ${him} in such a way that breasts dangle, ${his} nipples are free and at your mercy, and ${he} can only move enough to cause ${his} boobs to sway erotically when ${he} flinches with pain. You then indulge your inventiveness, applying clips, weights, and simple abuse to ${his} nipples, while beating the rest of ${him} thoroughly. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the beatings`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health, leaving ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
			} else if (slave.anus > 0 && canDoAnal(slave)) {
				r.push(`You bind ${slave.slaveName} with the head of an uncomfortably large dildo just inside ${his} anus. The setup offers ${him} a choice: ${he} can either stand and have only tip up ${his} butt, or ${he} can take ${his} weight off ${his} legs, and take a massive phallus up the ass. You keep ${him} like this for hours on end. At the start ${he} tries to stand all the time. Then, ${he} tries to rest on it for short periods, but realizes that this up and down motion really just leads to ${him} assraping ${himself}. Finally, ${he} becomes so`);
				r.push(App.UI.DOM.makeElement("span", `tired and apathetic`, ["red"]));
				r.push(`that ${he} accepts having a dildo up the ass, and sits down. ${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the extreme stress`);
				r.push(App.UI.DOM.makeElement("span", `affects ${his} health.`, ["health", "dec"]));
				slave.health.tired = Math.clamp(slave.health.tired + 20, 0, 1000);
			} else {
				slave.minorInjury = either("black eye", "bruise", "split lip");
				r.push(`The first time you force ${slave.slaveName} to please you this week, ${he} could be forgiven for thinking sexual abuse is to be ${his} sentence. By the end of the week ${he} remembers only fearing rape as a pleasant dream. This change is due to your program of roughly using ${him} whenever ${he} shows any sign of sleeping. You reward ${him} with a short doze now and then, but ${he} is slowly reduced to a nearly insensible state of`);
				r.push(App.UI.DOM.makeElement("span", `agonizing fatigue.`, ["red"]));
				r.push(`${He} is subjected to`);
				r.push(App.UI.DOM.makeElement("span", `immense mental pressure`, ["mediumorchid"]));
				r.push(App.UI.DOM.makeElement("span", `in favor of obedience,`, ["gold"]));
				r.push(`but the extreme stress and rough treatment`);
				r.push(App.UI.DOM.makeElement("span", `affect ${his} health and leave ${him} with a ${slave.minorInjury}.`, ["health", "dec"]));
				if (slave.health.tired < 120) {
					slave.health.tired = 120;
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN) {
				seed = random(1, 100);
				if (seed > 90) {
					r.push(`This abuse has shattered ${his} already-fragile self;`);
					r.push(App.UI.DOM.makeElement("span", `${his} mind has been broken.`, ["red"]));
					applyMindbroken(slave);
				} else if (seed > 80 && slave.behavioralFlaw !== BehavioralFlaw.HATESMEN && slave.behavioralFlaw !== BehavioralFlaw.HATESWOMEN) {
					r.push(`This abuse has associated`);
					if (V.PC.dick !== 0) {
						r.push(`cocks and masculinity with pain in ${his} mind;`);
						r.push(App.UI.DOM.makeElement("span", `${he} now instinctively hates men.`, ["red"]));
						slave.behavioralFlaw = BehavioralFlaw.HATESMEN;
					} else {
						r.push(`pussies and femininity with pain in ${his} mind;`);
						r.push(App.UI.DOM.makeElement("span", `${he} now instinctively hates women.`, ["red"]));
						slave.behavioralFlaw = BehavioralFlaw.HATESWOMEN;
					}
				} else if (seed > 70 && slave.behavioralFlaw !== BehavioralFlaw.ODD) {
					r.push(`This abuse has changed ${him} a bit;`);
					r.push(App.UI.DOM.makeElement("span", `${he} has begun to act strangely.`, ["red"]));
					slave.behavioralFlaw = BehavioralFlaw.ODD;
				}
			}
			r.push(`A week of agony`);
			if (slave.trust > 20) {
				r.push(App.UI.DOM.makeElement("span", `reduces ${his} trust`, ["gold"]));
				r.push(`in you.`);
				slave.trust -= 10;
			} else {
				r.push(App.UI.DOM.makeElement("span", `encourages ${his} fear`, ["gold"]));
				r.push(`of you.`);
				slave.trust -= 10;
			}
			if (V.PC.skill.slaving >= 100) {
				r.push(`Your`);
				r.push(App.UI.DOM.makeElement("span", `slave-breaking experience`, ["skill", "player"]));
				r.push(`allows you to apply`);
				r.push(App.UI.DOM.makeElement("span", `exquisite agony`, ["gold"]));
				r.push(`without any increase in damage.`);
				slave.trust -= 5;
			}
			if (slave.trust < -20) {
				r.push(`${He} is now fully broken;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			} else if (slave.devotion > 20) {
				r.push(`${He} is now obedient and attentive;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to fostering devotion.`, ["yellow"]));
				pa.objective = "build devotion";
			}
			currentSlaveValue = 1.4;
			slave.training = 0;
			break;
		case "torture": {
			let FSApproves = 0;
			// Effectively sacrifices a slave's health to terrify your penthouse slaves. Does not affect deaf slaves. Mute slaves give no benefit.
			r.push(`When you have pent up energy, you beat ${him}. When you're bored, you lash ${him}. If you even see ${him} passing out from exhaustion or pain, you shock ${him} back awake. If ${he} isn't moaning in despair, that's all the reason you need to make ${him} bleed.`);
			if (V.PC.energy > 20) {
				r.push(`As an added insult, you opt to violently rape ${him} throughout the day; some by surprise, others drawn out so the fear of what's to come can supplement ${his} anguish.`);
			}
			r.push(`You spare ${him} no amount of`);
			r.push(App.UI.DOM.makeElement("span", `suffering;`, ["mediumorchid"]));
			r.push(`every second spent in your presence is one spent`);
			r.push(App.UI.DOM.makeElement("span", `dreading`, ["gold"]));
			r.push(`your next assault.`);
			if (App.EndWeek.saVars.slaveTortured === "broken") {
				if (slave.fetish !== Fetish.MINDBROKEN) {
					r.push(`You can't wait to hear ${him} properly scream next week now that ${he}'s regained ${his} senses. You have to wonder how long ${he}'ll manage to keep them for.`);
				} else {
					r.push(`It's good stress release, but since ${he} shows no reaction to it, you quickly get bored.`);
					if (slave.kindness) {
						slave.kindness = 0;
					}
				}
			} else if (App.EndWeek.saVars.slaveTortured === "mute") {
				r.push(`It's good stress release, but since ${he} is mute and can't cry out in agony, it only really serves to lower ${his} resale value.`);
			} else if (App.EndWeek.saVars.slaveTortured === "self hating") {
				r.push(`The way ${he}`);
				r.push(App.UI.DOM.makeElement("span", `enjoys and encourages it`, ["hotpink"]));
				r.push(`is uncanny and takes some of the fun out of it`);
				slave.devotion += 5;
				slave.trust -= 1;
			} else if (App.EndWeek.saVars.slaveTortured === "fetish") {
				if (slave.fetish !== Fetish.MASOCHIST) {
					r.push(`It seems you've beaten the masochist out of ${him}. Perhaps next week ${his} screams will be more genuine.`);
				} else {
					r.push(`Unfortunately, ${he} gets off on it a bit too much, so the only thing echoing through the penthouse halls are`);
					r.push(App.UI.DOM.makeElement("span", `screams of pleasure,`, ["hotpink"]));
					r.push(`and that isn't exactly out of the ordinary.`);
					if (slave.fetishStrength > random(80, 180)) {
						r.push(`Beset by your constant torment, ${his} masochistic tendencies darken into sexual appreciation for ${his} life as a human punching bag. <span class="paraphilia gain">${He}'s descended into true self hatred.</span>`);
						FSApproves = 1;
						slave.sexualFlaw = SexualFlaw.SELFHATING;
						slave.fetishStrength = 100;
					}
					slave.devotion += 3;
					slave.trust -= 5;
				}
			} else if (App.EndWeek.saVars.slaveTortured === "love") {
				r.push(`The baleful cries of a ${girl} betrayed are especially poignant and should help keep your other slaves feeling uneasy.`);
			} else {
				r.push(`${His} anguished cries ringing through the penthouse halls at all hours of the day should remind your other slaves what you are capable of.`);
				if (slave.devotion + slave.trust < -195) {
					r.push(`${He} falls so deeply into hopelessness that ${he} becomes completely unresponsive. You can't seem to provoke anything more than a physical reflex from ${him} no matter what you try; it seems <span class="mindbreak">${his} mind gave out</span> before ${his} body did.`);
					applyMindbroken(slave);
				} else if (slave.fetish === Fetish.MASOCHIST) {
					r.push(`You can't help be feel ${he} is starting to enjoy this.`);
				}
			}
			if (slave.fetish !== Fetish.MINDBROKEN && slave.fetish !== Fetish.MASOCHIST) {
				slave.trust -= 30;
				slave.devotion -= 30;
			}
			healthDamage(slave, 50);
			if (V.PC.energy > 20) {
				SimpleSexAct.Player(slave, Math.max(Math.round(V.PC.need / 10), 1)); // review with .need
				V.PC.need = 0;
			}
			slave.minorInjury = either("black eye", "bruise", "split lip");
			// App.Medicine.Modification.addScourged(slave); Needs improvement first.
			r.push(`${He} ends ${his} week thoroughly`);
			r.push(App.UI.DOM.makeElement("span", `beaten`, ["health", "dec"]));
			r.push(`and`);
			r.push(App.UI.DOM.makeElement("span", `exhausted.`, ["red"]));
			if (slave.health.tired < 120) {
				slave.health.tired = 120;
			}
			if (slave.pregKnown === 1 && slave.fetish !== Fetish.MINDBROKEN) {
				r.push(`You took care to not harm ${his} pregnancy, but ${he} doesn't need to know that. If you really wanted to abort it in such a manner, you'd make more a show of it to ${him}.`);
			}
			if (FSApproves) {
				if (FutureSocieties.isActive('FSHedonisticDecadence')) {
					r.push(`Indulging in ${his} fetish until ${he} becomes obsessed with it advances hedonism and <span class="reputation inc">bolsters your reputation.</span>`);
					FutureSocieties.Change("Hedonistic", 2);
				}
			}
			break;
		}
		case "ravish": { // make sure these clear the slave's .need and make sure anaphrodisiacs can be used in place of this!
			const tinyDick = canAchieveErection(V.PC) && (V.PC.dick === 1 || (V.PC.dick < 3 && V.PC.physicalAge > 12) || (slave.sexualQuirk === SexualQuirk.SIZEQUEEN && V.PC.dick < 4));
			const holeCheck = canDoVaginal(slave) ? "vaginal" : "anal";
			let bigDick = canAchieveErection(V.PC) && (V.PC.dick > 5 || V.PC.dick - (holeCheck === "vaginal" ? slave.vagina : slave.anus) > 3 || (slave.physicalAge <= 12 && V.PC.dick > 2));
			if (canAchieveErection(V.PC) && !canPenetrate(V.PC)) {
				r.push(`You spend most of the week attempting to figure out a way to pair your dick with ${his} ${holeCheck === "vaginal" ? "genitals" : "rear"} while grinding as much pleasure out of ${him} as possible. Eventually the urges can no longer be ignored; your cock is going in ${him} one way or another. As you line your inhuman erection up with ${his} ${holeCheck === "vaginal" ? "vagina" : "anus"} to becomes overwhelmingly clear that you aren't going to easily fit, but that's not going to stop you; you need to fuck and you need it now! ${He} shivers in ${slave.fetish === Fetish.MASOCHIST && slave.devotion > 20 ? "anticipation" : "fear"} as you ram it as deep into ${him} as it will go and start vigorously humping away, the sheer tightness quickly sending you over the edge. In a moment of post-climax clarity, you realize you've`);
				if (V.seeExtreme) {
					r.push(App.UI.DOM.makeElement("span", `ripped ${his} ${holeCheck === "vaginal" ? "pussy" : "asshole"} completely apart`, ["health", "dec"]));
					r.push(`and the blood loss is quickly claiming ${him}.`);
				} else {
					r.push(App.UI.DOM.makeElement("span", `seriously injured`, ["health", "dec"]));
					r.push(`${him}.`);
				}
				r.push(`You resist the urge for another round and rush ${him} off to the autosurgery in an attempt to put everything back where it belongs.`);
				healthDamage(slave, 70);
				if (slave.fetish === Fetish.MASOCHIST && slave.devotion > 20) {
					slave.trust -= 10;
					slave.devotion += 2;
					r.push(`When ${he} wakes up, ${he}'s`);
					r.push(App.UI.DOM.makeElement("span", `clearly distraught`, ["trust", "dec"]));
					r.push(`from the ordeal, but overall seems to have`);
					r.push(App.UI.DOM.makeElement("span", `found the sex exquisite.`, ["devotion", "inc"]));
				} else if (slave.fetish !== Fetish.MINDBROKEN) {
					slave.trust -= 40;
					slave.devotion -= 20;
					r.push(`When ${he} wakes up, ${he}'s`);
					r.push(App.UI.DOM.makeElement("span", `completely terrified`, ["trust", "dec"]));
					r.push(`of you and your dick and`);
					r.push(App.UI.DOM.makeElement("span", `brutally reminded`, ["devotion", "dec"]));
					r.push(`that ${he} is ultimately just a sex toy to be used and thrown out when it breaks.`);
				}
				seX(slave, holeCheck, V.PC, "penetrative");
				r.push(`Needless to say, there isn't much left of ${his}`);
				if (holeCheck === "vaginal") {
					if (slave.vagina === 0) {
						r.push(App.UI.DOM.makeElement("span", `once virgin hole.`, ["virginity", "loss"]));
						slave.vagina = 6;
					} else if (slave.vagina < 6) {
						r.push(`cunt other than the`);
						r.push(App.UI.DOM.makeElement("span", `cavernous excavation`, ["change", "negative"]));
						r.push(`you've left.`);
						slave.vagina = 6;
					} else {
						r.push(`cunt, but you can't say there was to begin with. At least you're sure ${he} felt you inside ${him}, which is an accomplishment in and of itself.`);
					}
				} else if (holeCheck === "anal") {
					if (slave.anus === 0) {
						r.push(App.UI.DOM.makeElement("span", `once virgin hole.`, ["virginity", "loss"]));
						slave.anus = 4; // 6 -> 4, TODO: Expand "anus size" to account for values above 4
					} else {
						r.push(`rectum other than the`);
						r.push(App.UI.DOM.makeElement("span", `cavernous excavation`, ["change", "negative"]));
						r.push(`you've left.`);
						slave.anus = 4; // 6 -> 4, TODO: Expand "anus size" to account for values above 4
					}
				}
				// Attempt to scramble fetus
				if (V.dangerousPregnancy === 1 && !isInLabor(slave) && slave.pregAdaptation < 500 && slave.broodmother < 1 && slave.preg > slave.pregData.normalBirth / 2 && slave.geneMods.progenitor !== 1) {
					let aborted = false;
					if (slave.preg >= slave.pregData.normalBirth / 1.33) {
						startLabor(slave);
					} else if (slave.preg > slave.pregData.normalBirth / 1.81) {
						slave.prematureBirth = 1;
						startLabor(slave);
					} else if (slave.fetish === Fetish.MASOCHIST && slave.devotion > 20) {
						r.push(`The destruction you've wrought upon ${his} reproductive organs unsurprisingly`);
						r.push(App.UI.DOM.makeElement("span", `caused ${him} to miscarry,`, ["miscarriage"]));
						r.push(`but it seems ${he} accepted this inevitability the moment you entered ${him}.`);
						aborted = true;
					} else if (slave.fetish === Fetish.MINDBROKEN) {
						r.push(`The destruction you've wrought upon ${his} reproductive organs unsurprisingly`);
						r.push(App.UI.DOM.makeElement("span", `caused ${him} to miscarry,`, ["miscarriage"]));
						r.push(`but ${his} broken mind fails to notice it amongst the other damage.`);
						aborted = true;
					} else {
						r.push(`The destruction you've wrought upon ${his} reproductive organs unsurprisingly`);
						r.push(App.UI.DOM.makeElement("span", `caused ${him} to miscarry.`, ["miscarriage"]));
						if (slave.sexualFlaw === SexualFlaw.BREEDER) {
							r.push(`${He} is`);
							r.push(App.UI.DOM.makeElement("span", `filled with violent, all-consuming hatred`, ["devotion", "dec"]));
							r.push(`at you for doing this to ${him}.`);
							if (slave.pregType > 4) {
								r.push(`The loss of so many children at once`);
								r.push(App.UI.DOM.makeElement("span", `shatters the distraught breeder's mind.`, ["mindbreak"]));
								applyMindbroken(slave);
							} else {
								r.push(`${He} cares little for what punishment awaits ${his} actions.`);
								slave.devotion -= 25 * slave.pregType;
							}
						} else {
							r.push(`adding additional`);
							r.push(App.UI.DOM.makeElement("span", `insult`, ["devotion", "dec"]));
							r.push(`to ${his} injuries.`);
							slave.devotion -= 10;
						}
						aborted = true;
					}
					if (aborted) {
						slave.preg = rulesDemandContraceptives(slave, V.defaultRules) ? -1 : 0;
						TerminatePregnancy(slave);
						actX(slave, "abortions");
						if (slave.abortionTat > -1) {
							slave.abortionTat++;
							r.push(`The temporary tattoo of a child has been replaced with ${his} ${ordinalSuffix(slave.abortionTat)} crossed out infant.`);
							cashX(forceNeg(V.modCost), "slaveMod", slave);
						}
					}
				}
			} else {
				r.push(`You've had so much pent up sexual energy lately that you frequently need an outlet to keep the urges under control and your mind clear.`);
				if (canPenetrate(V.PC)) {
					r.push(`Your rock-hard erection is so eager for ${his} ${holeCheck === "vaginal" ? "pussy" : "ass"} that you waste no time on foreplay before in sticking it in.`);
				} else if (V.PC.clit >= 3) {
					r.push(`Your clit is so large and sensitive that it makes the perfect tool to piston in and out of ${his} ${holeCheck === "vaginal" ? "pussy" : "ass"} until the pleasure makes your body go numb.`);
				} else if (V.PC.vagina === 0) {
					r.push(`You don't care if it`);
					r.push(App.UI.DOM.makeElement("span", `breaks your hymen and ruins your virginity,`, ["virginity", "loss"]));
					r.push(`you need the stimulation of the double-ended dildo penetrating you while you fuck ${his} ${holeCheck === "vaginal" ? "pussy" : "ass"} with it.`);
					V.PC.vagina++;
				} else {
					r.push(`A simple strap-on isn't enough; you need the stimulation of a double-ended dildo penetrating you while you fuck ${his} ${holeCheck === "vaginal" ? "pussy" : "ass"} to sate your needs.`);
				}
				if (slave.fetish === Fetish.MINDBROKEN) {
					r.push(`At least you're seeking quantity over quality, since the mindbroken ${V.PC.balls > 0 ? "cumdump" : "slut"} brings little to the bedroom.`);
				} else if (slave.energy < 20) {
					r.push(`Since ${he} is sexually frigid, this existence is nothing but`);
					r.push(App.UI.DOM.makeElement("span", `torment`, ["devotion", "dec"]));
					r.push(`to ${him}.`);
					if (bigDick) {
						r.push(`As ${he} suffers your dick warping ${his} body to your desires, ${he} can't shake the`);
						r.push(App.UI.DOM.makeElement("span", `fear`, ["trust", "dec"]));
						r.push(`that ${he}'s nothing more than a disposable fucktoy to you.`);
						slave.devotion -= 10;
						slave.trust -= 10;
					} else {
						r.push(`${He} is`);
						r.push(App.UI.DOM.makeElement("span", `terrified`, ["trust", "dec"]));
						r.push(`that ${he}'ll ultimately be reduced to nothing but a disposable fucktoy.`);
						slave.devotion -= 8;
						slave.trust -= 8;
					}
				} else if (slave.devotion < -20 && slave.trust < -20) {
					if (bigDick) {
						r.push(`Being utterly dominated by such a large phallus demands ${his}`);
						r.push(App.UI.DOM.makeElement("span", `submission to you,`, ["devotion", "inc"]));
						r.push(`but also reinforces the`);
						r.push(App.UI.DOM.makeElement("span", `fear`, ["trust", "dec"]));
						r.push(`that this is all life is, and will be, for ${him}.`);
						slave.devotion += 1;
						slave.trust -= 8;
					} else {
						r.push(`Being chain raped is a`);
						r.push(App.UI.DOM.makeElement("span", `horrible experience`, ["devotion", "dec"]));
						r.push(`and serves to confirm ${his}`);
						r.push(App.UI.DOM.makeElement("span", `fears`, ["trust", "dec"]));
						r.push(`of what it means to be a slave.`);
						slave.devotion -= 8;
						slave.trust -= 8;
					}
				} else if (slave.energy > 95) {
					r.push(`${He}'s as horny as you and naturally`);
					r.push(App.UI.DOM.makeElement("span", `draws closer`, ["devotion", "inc"]));
					r.push(`to anyone able to keep up with ${his} sex drive; ${he} understands that ${he} can`);
					r.push(App.UI.DOM.makeElement("span", `trust in you`, ["trust", "inc"]));
					r.push(`to satisfy ${his} needs, even if it's only for your own sake.`);
					slave.energy = Math.clamp(slave.energy + 1, 0, 100);
					slave.devotion += 6;
					slave.trust += 6;
				} else if (slave.devotion > 20) {
					if (slave.energy > 60) {
						r.push(`While it may be a bit more often than ${he}'d like, ${he} is`);
						r.push(App.UI.DOM.makeElement("span", `happy`, ["devotion", "inc"]));
						r.push(`that you find ${him} useful, and`);
						r.push(App.UI.DOM.makeElement("span", `pleased`, ["trust", "inc"]));
						r.push(`to see that you're willing to keep going until ${he} is satisfied as well. Getting fucked all the time`);
						r.push(App.UI.DOM.makeElement("span", `builds ${his} already healthy libido`, ["libido", "inc"]));
						r.push(`as ${his} body grows accustomed to the non-stop sex.`);
						slave.energy = Math.clamp(slave.energy + 2, 0, 100);
						slave.devotion += 3;
						slave.trust += 5;
					} else if (tinyDick) {
						r.push(`While ${he} is`);
						r.push(App.UI.DOM.makeElement("span", `pleased`, ["devotion", "inc"]));
						r.push(`to be of use to you, ${he} can't help but`);
						r.push(App.UI.DOM.makeElement("span", `find you unthreatening`, ["trust", "inc"]));
						r.push(`when you have such a meager tool.`);
						slave.devotion += 1;
						slave.trust += 3;
					} else if (bigDick && slave.sexualQuirk !== SexualQuirk.SIZEQUEEN) {
						r.push(`Being constantly filled with your dick is overwhelming, ${he} can do nothing but`);
						r.push(App.UI.DOM.makeElement("span", `submit`, ["devotion", "inc"]));
						r.push(`${himself} to you.`);
						slave.devotion += 3;
					} else {
						r.push(`While it may be a bit much, ${he} is`);
						r.push(App.UI.DOM.makeElement("span", `happy`, ["devotion", "inc"]));
						r.push(`to help you stay in control of yourself.`);
						slave.devotion += 2;
					}
				} else if (slave.trust > 20) {
					if (slave.energy > 80) {
						r.push(`While it may be a bit more often than ${he} wants, ${he}`);
						r.push(App.UI.DOM.makeElement("span", `appreciates`, ["trust", "inc"]));
						r.push(`your efforts in keeping ${him} satisfied; ${he} finds ${himself} starting to`);
						r.push(App.UI.DOM.makeElement("span", `warm up`, ["devotion", "inc"]));
						r.push(`to you. Getting fucked all the time`);
						r.push(App.UI.DOM.makeElement("span", `builds ${his} already healthy libido`, ["libido", "inc"]));
						r.push(`as ${his} body grows accustomed to the non-stop sex.`);
						slave.energy = Math.clamp(slave.energy + 2, 0, 100);
						slave.devotion += 2;
						slave.trust += 2;
					} else if (tinyDick) {
						r.push(`${He} quickly realizes that you're so small ${he} can tolerate being fucked all the time by you. ${He}'s`);
						r.push(App.UI.DOM.makeElement("span", `appalled`, ["devotion", "dec"]));
						r.push(`by the thought, but feels like you'll`);
						r.push(App.UI.DOM.makeElement("span", `scrutinize ${him} less`, ["trust", "inc"]));
						r.push(`if ${he} gives you what you want.`);
						slave.devotion -= 2;
						slave.trust += 6;
					} else if (bigDick && slave.sexualQuirk !== SexualQuirk.SIZEQUEEN) {
						r.push(`Being constantly filled with your dick helps to wear down ${his} defiant streak. ${He} realizes that ${he} is`);
						r.push(App.UI.DOM.makeElement("span", `slowly losing ${himself} to you;`, ["devotion", "inc"]));
						r.push(`a`);
						r.push(App.UI.DOM.makeElement("span", `worrisome`, ["trust", "dec"]));
						r.push(`prospect.`);
						slave.devotion += 2;
						slave.trust -= 2;
					} else {
						r.push(`While it may be a bit more often than ${he} wants, ${he} can't deny that ${he}`);
						r.push(App.UI.DOM.makeElement("span", `enjoys`, ["trust", "inc"]));
						r.push(`you attending to ${his} needs. What ${he} doesn't realize is ${he} is starting to`);
						r.push(App.UI.DOM.makeElement("span", `tolerate`, ["devotion", "inc"]));
						r.push(`your company.`);
						slave.devotion += 1;
						slave.trust += 2;
					}
				} else {
					if (slave.energy > 80) {
						r.push(`While it may be a bit more often than ${he} wants, ${he}`);
						r.push(App.UI.DOM.makeElement("span", `enjoys`, ["devotion", "inc"]));
						r.push(`the time you spend fucking. Even though ${he} can sense`);
						r.push(App.UI.DOM.makeElement("span", `${his} urges intensifying,`, ["libido", "inc"]));
						r.push(`${he} feels like ${he} can`);
						r.push(App.UI.DOM.makeElement("span", `depend on you`, ["trust", "inc"]));
						r.push(`to keep them in check.`);
						slave.energy = Math.clamp(slave.energy + 2, 0, 100);
						slave.devotion += 2;
						slave.trust += 1;
					} else if (tinyDick) {
						r.push(`With the constant fuckings, ${he} can't help but be`);
						r.push(App.UI.DOM.makeElement("span", `disappointed`, ["devotion", "dec"]));
						r.push(`by the size of your dick. ${He} begins to`);
						r.push(App.UI.DOM.makeElement("span", `slip into routine,`, ["trust", "inc"]));
						r.push(`quickly getting you off so ${he} can get on with ${his} day.`);
						slave.devotion -= 1;
						slave.trust += 1;
					} else if (bigDick && slave.sexualQuirk !== SexualQuirk.SIZEQUEEN) {
						r.push(`Being constantly full of your dick really helps ${him} to`);
						r.push(App.UI.DOM.makeElement("span", `understand`, ["devotion", "inc"]));
						r.push(`that ${his} body is being warped for your pleasure, though ${he}'s`);
						r.push(App.UI.DOM.makeElement("span", `terrified`, ["trust", "dec"]));
						r.push(`that you may grow tired of ${him} and discard your stretched-out fucktoy.`);
						slave.devotion += 3;
						slave.trust -= 3;
					} else {
						r.push(`The chain raping forces ${him} to`);
						r.push(App.UI.DOM.makeElement("span", `submit`, ["devotion", "inc"]));
						r.push(`to your desires, but ${he} can't help but feel`);
						r.push(App.UI.DOM.makeElement("span", `disposable.`, ["trust", "dec"]));
						slave.devotion += 2;
						slave.trust -= 2;
					}
				}
				healthDamage(slave, 5);
				slave.health.tired = Math.clamp(slave.health.tired + 10, 0, 100);
				if (bigDick) {
					r.push(`${He}'s left`);
					r.push(App.UI.DOM.makeElement("span", `tired and sore`, ["health", "dec"]));
					r.push(`from all the ferocious pounding, but the worst of it has to be the`);
					if (canDoVaginal(slave)) {
						r.push(App.UI.DOM.makeElement("span", `dull ache`, ["health", "dec"]));
						r.push(`at the back of ${his} vagina where your dick kept pummeling ${him}.`);
					} else {
						r.push(App.UI.DOM.makeElement("span", `dull ache`, ["health", "dec"]));
						r.push(`in ${his} rectum where your dick kept pummeling ${him}.`);
					}
					healthDamage(slave, 5);
				} else {
					r.push(`By the end of the week, ${he}'s`);
					r.push(App.UI.DOM.makeElement("span", `tired and sore`, ["health", "dec"]));
					r.push(`from all the ferocious pounding.`);
				}
				if (!canLift(slave, V.PC)) {
					r.push(`${He} was unable to properly support your weight, effectively`);
					r.push(App.UI.DOM.makeElement("span", `crushing ${him}`, ["health", "dec"]));
					r.push(`beneath you during the frantic sex.`);
					healthDamage(slave, 5);
				}
				if (holeCheck === "vaginal") {
					if (slave.vagina === 0) {
						r.push(`If ${he} was a virgin,`);
						r.push(App.UI.DOM.makeElement("span", `${he} definitely isn't now;`, ["virginity", "loss"]));
						r.push(`it wasn't on your mind when you started, and it certainly isn't on ${his} after all the orgasms.`);
						slave.vagina += 1;
					} else if (bigDick) {
						if (slave.vagina === 1) {
							r.push(`With how much time you've spent hilted in ${him}, it's not very surprising that ${his} pussy has`);
							r.push(App.UI.DOM.makeElement("span", `adapted to your size.`, ["change", "positive"]));
							slave.vagina += 1;
						} else if (slave.vagina === 2) {
							if (V.PC.dick > 4 && random(1, 100) > 80) {
								r.push(`With how much ${he} stretches around you each time you thrust into ${him}, it comes of little surprise when ${his} pussy`);
								r.push(App.UI.DOM.makeElement("span", `stays opened`, ["change", "positive"]));
								r.push(`in anticipation for the next round.`);
								slave.vagina += 1;
							}
						} else if (slave.vagina === 3) {
							if (V.PC.dick > 5 && random(1, 100) > 80) {
								r.push(`With how much ${he} bulges outwards each time you thrust into ${him}, it comes of little surprise when ${his} pussy`);
								r.push(App.UI.DOM.makeElement("span", `stays gaped`, ["change", "positive"]));
								r.push(`in anticipation for the next round.`);
								slave.vagina += 1;
							}
						}
					}
					if (canPenetrate(V.PC)) {
						tryKnockMeUp(slave, 100, 0, V.PC);
					}
				} else {
					if (slave.anus === 0) {
						r.push(`If ${he} was a anal virgin,`);
						r.push(App.UI.DOM.makeElement("span", `you've definitely broken in ${his} backdoor;`, ["virginity", "loss"]));
						r.push(`it wasn't on your mind when you started pounding, and it certainly isn't on ${his} with the asspain.`);
						slave.anus += 1;
					} else if (bigDick) {
						if (slave.anus === 1) {
							r.push(`With how much time you've spent hilted in ${him}, it's not very surprising that ${his} anus has`);
							r.push(App.UI.DOM.makeElement("span", `stretched to better fit your girth.`, ["change", "positive"]));
							slave.anus += 1;
						} else if (slave.anus === 2) {
							if (V.PC.dick > 4 && random(1, 100) > 80) {
								r.push(`With how much ${his} anus stretches around you with each thrust, it comes of little surprise when it`);
								r.push(App.UI.DOM.makeElement("span", `stays gaped`, ["change", "positive"]));
								r.push(`with anticipation for the next round.`);
								slave.anus += 1;
							}
						} else if (slave.anus === 3) {
							if (V.PC.dick > 5 && random(1, 100) > 80) {
								r.push(`With how much ${his} lower belly bulges outwards with every thrust, it comes of little surprise that ${his} anus`);
								r.push(App.UI.DOM.makeElement("span", `stays gaped`, ["change", "positive"]));
								r.push(`from how much your girth has stretched ${him}.`);
								slave.anus += 1;
							}
						}
					}
					if (canPenetrate(V.PC)) {
						tryKnockMeUp(slave, 100, 1, V.PC);
					}
				}
				let fuckCount = random(35, 56);
				if (getSharedPersonalAttention()) {
					fuckCount = Math.trunc(fuckCount / 2);
				}
				seX(slave, holeCheck, V.PC, "penetrative", fuckCount);
				if (V.PC.visualAge <= 12 && V.PC.visualAge < V.minimumSlaveAge && slave.fetish !== Fetish.MINDBROKEN && slave.career !== "a slave since birth") {
					if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
						r.push(`${He} may try to deny it, but you can tell ${he}`);
						r.push(App.UI.DOM.makeElement("span", `enjoyed`, ["devotion", "inc"]));
						r.push(`having sex with an underaged ${girlP}.`);
						slave.devotion += 2;
					} else if (slave.devotion < 50 && slave.trust < 50) {
						r.push(`It's pretty obvious that ${he} was`);
						r.push(App.UI.DOM.makeElement("span", `uncomfortable`, ["devotion", "dec"]));
						r.push(`being pushed into a sexual situation with an underaged ${girlP}.`);
						slave.devotion -= 2;
					}
				}
				// Frantic pounding sets off labor
				if (slave.preg > slave.pregData.normalBirth / 1.1111 && slave.pregControl !== GestationDrug.LABOR && slave.broodmother < 1 && !isInLabor(slave)) {
					if (WombBirthReady(slave, slave.pregData.normalBirth) > 0) {
						startLabor(slave);
					} else if (WombBirthReady(slave, slave.pregData.normalBirth / 1.1111) > 0 && (random(1, 100) > 50) && slave.geneMods.progenitor !== 1) {
						startLabor(slave);
					}
				}
			}
			V.PC.need = 0;
			if (V.PC.energy < 100) {
				V.PC.energy += 11 - Math.max(Math.round(V.PC.energy / 10), 1);
			}
			if (canAchieveErection(V.PC) && !canPenetrate(V.PC)) {
				// send to clinic/rest
				if (V.clinic > App.Entity.facilities.clinic.employeesIDs().size) {
					r.push(`${He}'ll be`);
					r.push(App.UI.DOM.makeElement("span", `spending some time in ${V.clinicName} recovering,`, ["job", "change"]));
					r.push(`so you'll have to find something else to fuck for the time being.`);
					r.push(assignJob(slave, Job.CLINIC));
				} else {
					r.push(`${He}'ll need to`);
					r.push(App.UI.DOM.makeElement("span", `rest and recover`, ["job", "change"]));
					r.push(`after being split in half;`);
					r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to caring for ${his} health`, ["noteworthy"]));
					r.push(`so that you may keep an eye on ${him}. You're still pretty horny, though.`);
					pa.objective = "health";
					r.push(assignJob(slave, Job.REST));
				}
			} else if (!isHorny(V.PC)) {
				r.push(`With your libido back under control, you turn your attention to putting ${his} pieces back where they belong;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to caring for ${his} health.`, ["noteworthy"]));
				pa.objective = "health";
			} else {
				r.push(`While you are managing to keep your libido in check,`);
				r.push(App.UI.DOM.makeElement("span", `you still fall steadily deeper into prurience.`, ["libido", "inc"]));
			}
			break;
		}
		case "ravished": {
			const inControl = !(slave.trust > 20 && slave.devotion < 20 && overpowerCheck(slave, V.PC) > 120 - slave.trust); // may need fine tuning
			const playerOnTop = canMove(V.PC) && inControl;
			const bigDick = (slave.dick > 5 || (slave.dick - V.PC.vagina > 3) || (V.PC.physicalAge <= 12 && slave.dick > 2));
			let enjoyed = false;

			r.push(`You've had so much pent up sexual energy lately that you frequently need to avail yourself to ${his} dick in order to get some sense fucked back into you.`);
			if (V.PC.vagina === 0) {
				r.push(`Your desire to be filled is so overwhelming that you're willing to`);
				r.push(App.UI.DOM.makeElement("span", `throw away your virginity`, ["virginity", "loss"]));
				r.push(`just to temporarily sate your itch.`);
			}
			if (!inControl) {
				r.push(`A wanton slut like you clearly needs to be taught ${hisP} place and ${he} decides its ${his} job to do it. After a brief power struggle, you find yourself trapped under ${him} as ${he} teases your slit with what's to come, driving any thoughts of ${his} insubordination right out of your mind.`);
			} else if (!playerOnTop) {
				r.push(`You're forced to concede control to ${him} as you are physically incapable of taking the lead; you'll have to keep an eye on ${him} to make sure it doesn't go to ${his} head.`);
			}
			if (slave.fetish === Fetish.MINDBROKEN) {
				r.push(`While ${his} body is happy to oblige you, the mindbroken fucktoy brings nothing to the bedroom, forcing you to do all the work yourself.`);
			} else if (slave.devotion < -20 && slave.trust < -20) {
				if (slave.drugs === Drug.PRIAPISM) {
					r.push(`The priapism agents have ${him} ready to go, whether or not ${he} wants it, and, as a bonus, will keep ${him} from going soft on you.`);
				} else {
					r.push(`While you can force ${him} to get an involuntary erection with a little teasing, it's impossible to keep ${him} hard long enough to fully satisfy you. Luckily, there are vasodilators for when ${he} starts to run out of steam.`);
				}
				if (!playerOnTop) {
					r.push(`${He} may be allowed some autonomy so long as ${he} performs to your standards, ${he} still finds your manipulation over ${his} body`);
					r.push(App.UI.DOM.makeElement("span", `frightening`, ["trust", "dec"]));
					r.push(`and`);
					r.push(App.UI.DOM.makeElement("span", `hates`, ["devotion", "dec"]));
					r.push(`being forced to service you.`);
					slave.devotion -= 8;
					slave.trust -= 5;
				} else {
					r.push(`Being forcibly mounted and raped to climax is a`);
					r.push(App.UI.DOM.makeElement("span", `horrible experience`, ["devotion", "dec"]));
					r.push(`only made worse by the`);
					r.push(App.UI.DOM.makeElement("span", `terrifying`, ["trust", "dec"]));
					r.push(`level of control you exert over ${his} body.`);
					slave.devotion -= 10;
					slave.trust -= 10;
				}
			} else if (slave.energy < 20) {
				if (!inControl) {
					r.push(`${He} may be sexually frigid, but ${he} isn't about to pass up the chance to`);
					r.push(App.UI.DOM.makeElement("span", `take a little sexual revenge`, ["devotion", "dec"]));
					r.push(`on you. ${He} takes things slow, easing you to the brink of orgasm only to ruin it at the last second. ${He} manages to keep you edged enough to`);
					r.push(App.UI.DOM.makeElement("span", `avoid punishment,`, ["trust", "inc"]));
					r.push(`but ultimately finds ${himself} at the mercy of your starved libido when you begin bucking against ${him} in order to push yourself to climax.`);
					slave.devotion -= 6;
					slave.trust += 8;
				} else if (!playerOnTop) {
					r.push(`${He} may be sexually frigid and uninterested in fucking you, but`);
					r.push(App.UI.DOM.makeElement("span", `opportunities`, ["trust", "inc"]));
					r.push(`to take advantage of you like this don't come along too often. ${He} tries to enjoy ${himself} but quickly finds that ${he} will either perform to your standard, or will be injected with drugs to make ${him} do so; both options`);
					r.push(App.UI.DOM.makeElement("span", `sour`, ["devotion", "dec"]));
					r.push(`whatever pleasure there was in this for ${him}.`);
					slave.devotion -= 4;
					slave.trust += 4;
				} else {
					r.push(`Since ${he} is sexually frigid and physically unable to go for hours,`);
					if (slave.drugs === Drug.PRIAPISM) {
						r.push(`it's a good thing that ${he}'s on priapism agents and hard as a rock for you.`);
					} else {
						r.push(`a quick injection of vasodilators gets ${him} hard enough for you to mount.`);
					}
					r.push(`Being nothing but a meat dildo for your desires is`);
					r.push(App.UI.DOM.makeElement("span", `torment`, ["devotion", "dec"]));
					r.push(`for ${him}, and with how rough you're riding ${him}, leaves ${him}`);
					r.push(App.UI.DOM.makeElement("span", `terrified`, ["trust", "dec"]));
					r.push(`that ${he}'ll ultimately be disposed of if ${he} is incapable of satisfying you.`);
					slave.devotion -= 10;
					slave.trust -= 10;
				}
			} else if (slave.energy > 95) {
				if (!inControl) {
					r.push(`${He}'s got you right where ${he} wants you and waists no time with foreplay, instead skipping straight to plowing you. Of course, you quickly adjust to ${his} pace and bounce against ${him} at just the right angle to satisfy both of you.`);
				} else if (!playerOnTop) {
					r.push(`Presented with such a tantalizing opportunity, ${he} waists no time with foreplay, instead skipping straight to plowing you. You quickly adjust to ${his} pace and bounce against ${him} at just the right angle to satisfy both of you.`);
				} else {
					r.push(`You ride ${him} hard while ${he} thrusts against you even harder. You both know you'll be sore in the morning, but neither of you care with how good this feels.`);
				}
				r.push(`After multiple climaxes together, and no end to them in sight, ${he} can't help but`);
				r.push(App.UI.DOM.makeElement("span", `become attached`, ["devotion", "inc"]));
				r.push(`to the ${womanP} capable of keeping pace with ${his} sex drive. Just when ${he} thinks it's over, you signal "again" and ${he} knows ${he} can`);
				r.push(App.UI.DOM.makeElement("span", `trust in you`, ["trust", "inc"]));
				r.push(`to satisfy ${his} needs.`);
				slave.energy = Math.clamp(slave.energy + 1, 0, 100);
				slave.devotion += 6;
				slave.trust += 6;
				enjoyed = true;
			} else if (slave.devotion > 20) {
				if (slave.energy > 60) {
					r.push(`While it may be a bit more often than ${he}'d like, ${he} is`);
					r.push(App.UI.DOM.makeElement("span", `happy`, ["devotion", "inc"]));
					if (!playerOnTop) {
						r.push(`to be`);
						r.push(App.UI.DOM.makeElement("span", `trusted`, ["trust", "inc"]));
						r.push(`with dutifully fucking you. ${He} tries ${his} hardest to bring you to powerful orgasms, hoping that proper service will satisfy you more than raw quantity. You just end up milking ${him} for more anyway.`);
						slave.trust += 2;
					} else {
						r.push(`to be of service to you. ${He}'s`);
						r.push(App.UI.DOM.makeElement("span", `pleased`, ["trust", "inc"]));
						r.push(`that you'll never leave ${him} blueballed, since you're more than willing to keep riding ${him} well past ${his} limit.`);
					}
					r.push(`The constant demand for sex`);
					r.push(App.UI.DOM.makeElement("span", `builds ${his} already healthy libido`, ["libido", "inc"]));
					r.push(`as ${his} body grows accustomed to your demands.`);
					slave.energy = Math.clamp(slave.energy + 2, 0, 100);
					slave.devotion += 3;
					slave.trust += 5;
				} else {
					r.push(`While it may be a bit much, ${he} is`);
					r.push(App.UI.DOM.makeElement("span", `happy`, ["devotion", "inc"]));
					if (!playerOnTop) {
						r.push(`to be`);
						r.push(App.UI.DOM.makeElement("span", `trusted`, ["trust", "inc"]));
						r.push(`with the responsibility of keeping you in control of yourself.`);
						slave.trust += 2;
					} else {
						r.push(`to help you keep in control of yourself.`);
					}
					slave.devotion += 2;
				}
				enjoyed = true;
			} else if (slave.trust > 20) {
				if (slave.energy > 80) {
					if (!inControl) {
						r.push(`${He}'s pretty horny ${himself}, so it's a good thing ${he} has`);
						r.push(App.UI.DOM.makeElement("span", `a cumdump like you to relieve ${himself} in.`, ["trust", "inc"]));
						r.push(`Sure all the sex is`);
						r.push(App.UI.DOM.makeElement("span", `boosting ${his} libido even more,`, ["libido", "inc"]));
						r.push(`but as long as ${he} can keep you thoroughly sexed, ${he}'ll always have a hole to fill.`);
						slave.trust += 8;
					} else if (!playerOnTop) {
						r.push(`While it may be a bit more than ${he} would like, ${he} still services you dutifully. Though ${he} knows all the sex is only`);
						r.push(App.UI.DOM.makeElement("span", `building ${his} libido up more,`, ["libido", "inc"]));
						r.push(`${he} has no reason to worry, seeing as ${he} has a hole`);
						r.push(App.UI.DOM.makeElement("span", `just begging for`, ["trust", "inc"]));
						r.push(`${his} dick to fill it.`);
						slave.trust += 4;
					} else {
						r.push(`While it may be a bit more than ${he} wants, ${he}`);
						r.push(App.UI.DOM.makeElement("span", `appreciates`, ["trust", "inc"]));
						r.push(`getting to put ${his} dick to work; ${he} finds ${himself} starting to`);
						r.push(App.UI.DOM.makeElement("span", `get used to`, ["devotion", "inc"]));
						r.push(`being paired with you. All the sex begins to send ${his} `);
						r.push(App.UI.DOM.makeElement("span", `already healthy libido into overdrive`, ["libido", "inc"]));
						r.push(`as ${his} body begins yearning to penetrate you.`);
						slave.devotion += 2;
						slave.trust += 2;
					}
					enjoyed = true;
					slave.energy = Math.clamp(slave.energy + 2, 0, 100);
				} else {
					if (!inControl) {
						r.push(`${He} gets to fuck you to ${his} heart's content, however ${he} wants. And the best thing is, as long as ${he} keeps your pussy stuffed with cock, ${he} can get away with far more than ${he} could dream of.`);
						r.push(App.UI.DOM.makeElement("span", `What a boon!`, ["trust", "inc"]));
						slave.trust += 15;
						enjoyed = true;
					} else if (!playerOnTop) {
						r.push(`While you may be demanding more sex than ${he} wants to give, ${he}'s not about to pass up the chance to fuck your pussy. ${He} does the deed at ${his} pace, all the while making sure you know`);
						r.push(App.UI.DOM.makeElement("span", `exactly who is giving it to you.`, ["trust", "inc"]));
						slave.trust += 8;
						enjoyed = true;
					} else {
						r.push(`While it may be a bit more than ${he} wants, ${he} certainly`);
						r.push(App.UI.DOM.makeElement("span", `likes getting ${his} dick in you.`, ["trust", "inc"]));
						r.push(`If you weren't riding ${him} like ${he} was`);
						r.push(App.UI.DOM.makeElement("span", `nothing more`, ["devotion", "dec"]));
						r.push(`than a fleshy dildo, ${he} might have even been able to enjoy your company.`);
						slave.devotion -= 2;
						slave.trust += 2;
					}
				}
			} else {
				if (slave.energy > 80) {
					if (!playerOnTop) {
						r.push(`While it may be a bit more than ${he} wants, ${he}`);
						r.push(App.UI.DOM.makeElement("span", `enjoys`, ["devotion", "inc"]));
						r.push(`getting to fuck you. While ${he} can sense`);
						r.push(App.UI.DOM.makeElement("span", `${his} urges intensifying`, ["libido", "inc"]));
						r.push(`to match yours, ${he} feels like ${he} can`);
						r.push(App.UI.DOM.makeElement("span", `simply keep using you`, ["trust", "inc"]));
						r.push(`to keep them in check.`);
						slave.energy = Math.clamp(slave.energy + 2, 0, 100);
						slave.devotion += 1;
						slave.trust += 3;
					} else {
						r.push(`While it may be a bit more than ${he} wants, ${he}`);
						r.push(App.UI.DOM.makeElement("span", `enjoys`, ["devotion", "inc"]));
						r.push(`the time you spend fucking. Even though ${he} can sense`);
						r.push(App.UI.DOM.makeElement("span", `${his} urges intensifying`, ["libido", "inc"]));
						r.push(`to match yours, ${he} feels like ${he} can`);
						r.push(App.UI.DOM.makeElement("span", `depend on you`, ["trust", "inc"]));
						r.push(`to keep them in check.`);
						slave.energy = Math.clamp(slave.energy + 2, 0, 100);
						slave.devotion += 2;
						slave.trust += 1;
					}
				} else {
					if (!playerOnTop) {
						r.push(`${He} is allowed some autonomy as long as ${he} keeps satisfying your desires, but ${he} still feels like you're`);
						r.push(App.UI.DOM.makeElement("span", `only using ${him}`, ["trust", "dec"]));
						r.push(` for ${his} dick.`);
						slave.trust -= 2;
					} else {
						r.push(`Being forcibly mounted and raped to climax forces ${him}`);
						r.push(App.UI.DOM.makeElement("span", `submit`, ["devotion", "inc"]));
						r.push(`to your desires, but ${he} can't help but feel you`);
						r.push(App.UI.DOM.makeElement("span", `only care about ${his} dick.`, ["trust", "dec"]));
						slave.devotion += 2;
						slave.trust -= 2;
					}
				}
				enjoyed = true;
			}
			if (V.PC.visualAge <= 12 && V.PC.visualAge < V.minimumSlaveAge && slave.fetish !== Fetish.MINDBROKEN && slave.career !== "a slave since birth") {
				if (slave.behavioralQuirk === BehavioralQuirk.SINFUL) {
					r.push(`${He} may try to deny it, but you can tell ${he}`);
					r.push(App.UI.DOM.makeElement("span", `enjoyed`, ["devotion", "inc"]));
					r.push(`having sex with an underaged ${girlP}.`);
					slave.devotion += 2;
					enjoyed = false;
				} else if (slave.devotion < 50 && slave.trust < 50) {
					r.push(`It's pretty obvious that ${he} was`);
					r.push(App.UI.DOM.makeElement("span", `uncomfortable`, ["devotion", "dec"]));
					r.push(`being pushed into a sexual situation with an underaged ${girlP}.`);
					slave.devotion -= 2;
					enjoyed = false;
				}
			}
			if (enjoyed) {
				if (slave.trust > 20 && slave.devotion <= 20 && slave.energy <= 80) {
					let increaseDev = 0;
					if (slave.fetish === Fetish.BOOBS && V.PC.boobs > 1000 && (canSee(slave) || hasAnyArms(slave))) {
						if (hasAnyArms(slave)) {
							r.push(`With how much attention ${he} was lavishing on your tits while ${he} fucked you,`);
						} else {
							r.push(`With how hard ${he} was thrusting in order to make your tits flop about,`);
						}
						if (slave.fetishKnown === 0) {
							r.push(`it's impossible for ${him} to hide ${his}`);
							r.push(App.UI.DOM.makeElement("span", `lust for breasts.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						} else {
							r.push(`the boob maniac was clearly having a good time.`);
						}
						increaseDev++;
					}
					if (slave.fetish === Fetish.PREGNANCY && V.PC.bellyPreg >= 1500) {
						r.push(`${He} went to unbelievable lengths to keep in physical contact with your baby-laden middle;`);
						if (slave.fetishKnown === 0) {
							r.push(`a dead giveaway that ${he}'s got a`);
							r.push(App.UI.DOM.makeElement("span", `pregnancy kink.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						} else {
							r.push(`no wonder ${he} wanted to get you on your back so badly.`);
						}
						increaseDev++;
					}
					if (slave.fetish === Fetish.DOM && !playerOnTop) {
						r.push(`There was an undeniably hungry glee plastered across ${his} face;`);
						if (slave.fetishKnown === 0) {
							r.push(`it's become clear that ${he} has a`);
							r.push(App.UI.DOM.makeElement("span", `dominant streak.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						} else {
							r.push(`${he} managed to flip the tables and regain control, and to ${him} there is no greater glory.`);
						}
						increaseDev++;
					}
					if (increaseDev > 0) {
						r.push(`It would seem ${he} is`);
						r.push(App.UI.DOM.makeElement("span", `becoming attached`, ["devotion", "inc"]));
						r.push(`to ${his} plaything.`);
						slave.devotion += increaseDev;
					}
				} else {
					if (slave.fetish === Fetish.BOOBS && V.PC.boobs > 1000 && canSee(slave)) {
						r.push(`Once your tits got bouncing, ${he} was`);
						r.push(App.UI.DOM.makeElement("span", `transfixed`, ["devotion", "inc"]));
						r.push(`and couldn't take ${his} eyes off you.`);
						if (slave.fetishKnown === 0) {
							r.push(`It's pretty obvious that ${he}`);
							r.push(App.UI.DOM.makeElement("span", `really likes breasts.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						}
						slave.devotion++;
					}
					if (slave.fetish === Fetish.PREGNANCY && V.PC.bellyPreg >= 1500) {
						r.push(`You could feel ${him}`);
						r.push(App.UI.DOM.makeElement("span", `quivering with excitement`, ["devotion", "inc"]));
						r.push(`as your fecund swell ground against ${him}.`);
						if (slave.fetishKnown === 0) {
							r.push(`Somebody`);
							r.push(App.UI.DOM.makeElement("span", `likes preggo ${girlP}s`, ["fetish", "gain"]));
							r.push(`and can't hide it any longer.`);
							slave.fetishKnown = 1;
						}
					}
					if (slave.fetish === Fetish.DOM && !playerOnTop) {
						r.push(`${He}`);
						r.push(App.UI.DOM.makeElement("span", `thoroughly enjoyed`, ["devotion", "inc"]));
						r.push(`getting to take the lead in getting you off.`);
						if (slave.fetishKnown === 0) {
							r.push(`${He} clearly is a`);
							r.push(App.UI.DOM.makeElement("span", `natural dominant.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						}
						slave.devotion++;
					}
					if (slave.fetish === Fetish.SUB && playerOnTop) {
						r.push(`${He}`);
						r.push(App.UI.DOM.makeElement("span", `thoroughly enjoyed`, ["devotion", "inc"]));
						r.push(`being subject to your aggressive advances.`);
						if (slave.fetishKnown === 0) {
							r.push(`${He} would seem ${he} has`);
							r.push(App.UI.DOM.makeElement("span", `a submissive streak.`, ["fetish", "gain"]));
							slave.fetishKnown = 1;
						}
						slave.devotion++;
					}
				}
			}
			if (playerOnTop && !canLift(slave, V.PC)) {
				r.push(`${He} was unable to properly support your weight as you bounced on ${his} cock, effectively`);
				r.push(App.UI.DOM.makeElement("span", `crushing ${him}`, ["health", "dec"]));
				r.push(`beneath you during the frantic sex.`);
				healthDamage(slave, 10);
			}
			healthDamage(slave, 5);
			slave.health.tired = Math.clamp(slave.health.tired + 20, 0, 100);
			r.push(`By the end of the week, ${he}'s left`);
			if (playerOnTop) {
				r.push(App.UI.DOM.makeElement("span", `battered, bruised, and exhausted.`, ["health", "dec"]));
			} else {
				r.push(App.UI.DOM.makeElement("span", `exhausted and sore`, ["health", "dec"]));
				r.push(`from your constant demands for sex.`);
			}
			if (bigDick) {
				r.push(`While your urges appreciated ${his} large dick, the depths of your vagina are a`);
				r.push(App.UI.DOM.makeElement("span", `little sore`, ["health", "dec"]));
				r.push(`from the pummeling.`);
				healthDamage(V.PC, 5);
				if (V.PC.vagina === 0) {
					V.PC.vagina++;
				} else if (V.PC.vagina === 1 && !V.PC.newVag) {
					r.push(`You're definitely`);
					r.push(App.UI.DOM.makeElement("span", `looser`, ["change", "negative"]));
					r.push(`from it, though.`);
					V.PC.vagina += 1;
				} else if (V.PC.vagina === 2 && !V.PC.newVag) {
					if (slave.dick > 4 && random(1, 100) > 80) {
						r.push(`It's also left you`);
						r.push(App.UI.DOM.makeElement("span", `thoroughly loosened.`, ["change", "negative"]));
						V.PC.vagina += 1;
					}
				} else if (V.PC.vagina === 3 && !V.PC.newVag) {
					if (slave.dick > 5 && random(1, 100) > 80) {
						r.push(`You weren't tight to begin with, yet ${he} still managed to`);
						r.push(App.UI.DOM.makeElement("span", `stretch you out`, ["change", "negative"]));
						r.push(`even more.`);
						V.PC.vagina += 1;
					}
				}
			} else if (V.PC.vagina === 0) {
				V.PC.vagina++;
			}
			tryKnockMeUp(V.PC, 100, 0, slave);
			let fuckCount = random(35, 56);
			if (getSharedPersonalAttention()) {
				fuckCount = Math.trunc(fuckCount / 2);
			}
			seX(slave, "penetrative", V.PC, "vaginal", fuckCount);
			// Sex sets off labor
			if (V.PC.preg > V.PC.pregData.normalBirth / 1.1111 && V.PC.pregControl !== GestationDrug.LABOR && !isInLabor(V.PC)) {
				if (WombBirthReady(V.PC, V.PC.pregData.normalBirth) > 0) {
					startLabor(V.PC);
				} else if (WombBirthReady(V.PC, V.PC.pregData.normalBirth / 1.1111) > 0 && (random(1, 100) > 50) && V.PC.geneMods.progenitor !== 1) {
					startLabor(V.PC);
				}
			}
			V.PC.need = 0;
			if (V.PC.energy < 100) {
				V.PC.energy += 11 - Math.max(Math.round(V.PC.energy / 10), 1);
			}
			if (!isHorny(V.PC)) {
				r.push(`With your libido back under control, you turn your attention to making sure ${his} battered dick doesn't give on you;`);
				r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to caring for ${his} health.`, ["noteworthy"]));
				pa.objective = "health";
			} else {
				r.push(`While you are managing to keep your libido in check,`);
				r.push(App.UI.DOM.makeElement("span", `you still fall steadily deeper into prurience.`, ["libido", "inc"]));
			}
			break;
		}
		case "fix behavioral flaw":
			if (slave.behavioralFlaw === BehavioralFlaw.ARROGANT) {
				r.push(`${slave.slaveName} seems to think ${he}'s better than everyone else. Naturally, as ${his} owner you have the means to correct this sad misapprehension. As you train ${him} during the week, you ensure that ${he} submits to anyone and everyone. ${He} is rarely permitted to enjoy sex under your tutelage, but is instead required to use ${his} mouth and hands to get others off. ${He} cleans, washes, and serves.`);
				seX(slave, "oral", V.PC, "penetrative", 10);
			} else if (slave.behavioralFlaw === BehavioralFlaw.BITCHY) {
				r.push(`${slave.slaveName} always has a cutting remark ready. The more obedient ${he}'s feeling, the more ${he} directs them at people other than ${his} ${getWrittenTitle(slave)}, but it's still a serious problem. When you train ${him} this week, you keep a sharp ear on ${him}. Whenever ${he} bitches out, you require ${him} to promptly offer the target of ${his} pissiness the use of ${his} mouth. ${He}'ll either shut ${his} mouth or have it roughly filled.`);
				seX(slave, "oral", V.PC, "penetrative", 10);
			} else if (slave.behavioralFlaw === BehavioralFlaw.ODD) {
				r.push(`${slave.slaveName} is odd. ${He} behaves strangely, speaking randomly at times and doing things for no apparent reason. In earlier times this might have been considered 'adorable' or 'unique,' but in a slave it's just annoying. You punish ${him} severely whenever ${he} fails to do or say the right thing for the right reasons.`);
			} else if (slave.behavioralFlaw === BehavioralFlaw.HATESMEN) {
				r.push(`${slave.slaveName} does not like spending time around men. This is of course a huge obstacle to ${him} performing ${his} duties well. Breaking ${him} of this is an unusually difficult task,`);
				if (V.PC.dick !== 0) {
					r.push(`so you approach it subtly. You simply require ${him} to spend as much time as possible around you, eating, sleeping, and going about normal business. ${He} already understood what you were to your slaves, sexually; ${he} now is accustomed to who you are when your cock isn't pounding a nice hole.`);
				} else {
					r.push(`all the more so since you cannot use yourself as a teaching tool. Fortunately, there are any number of men coming and going as you do business, and it's trivial to force ${him} to rely on them for social contact.`);
				}
				seX(slave, "oral", V.PC, "penetrative", 10);
			} else if (slave.behavioralFlaw === BehavioralFlaw.HATESWOMEN) {
				r.push(`${slave.slaveName} does not like spending time around girls. This is of course a huge obstacle to ${him} performing ${his} duties well. Breaking ${him} of this is an unusually difficult task,`);
				if (V.PC.dick !== 0) {
					r.push(`all the more so since you cannot use your penis-equipped self as a teaching tool. Fortunately, there are any number of girls around, and it's trivial to force ${him} to rely on them for social contact.`);
				} else {
					r.push(`so you approach it subtly. You simply require ${him} to spend as much time as possible around you, eating, sleeping, and going about normal business. ${He} already understood what you were to your slaves, sexually; ${he} now is accustomed to who you are when you're not fucking.`);
				}
				seX(slave, "oral", V.PC, "penetrative", 10);
			} else if (slave.behavioralFlaw === BehavioralFlaw.ANOREXIC) {
				r.push(`${slave.slaveName} has an unreasonable, psychologically based belief that ${he} is too fat. This is a serious enough condition in the clinical sense that the usual routine of punishment will not affect it. Instead, you apply a regime of positive reinforcement: ${he} is given attention and approval for ${his} curves when they grow.`);
			} else if (slave.behavioralFlaw === BehavioralFlaw.GLUTTONOUS) {
				r.push(`${slave.slaveName}'s diet is already closely controlled, but the impulse to overeat is strong in ${him} and like most gluttons ${he} manages to be quite cunning. You watch ${him} closely and administer harsh punishment to associate overeating with pain in ${his} mind.`);
			} else if (slave.behavioralFlaw === BehavioralFlaw.LIBERATED) {
				r.push(`${slave.slaveName} has not yet accepted that ${his} world has changed. You could wait for the weight of circumstances to bear it home to ${him}, but you accelerated the process by giving ${him} as many trivial orders as possible. ${He} is required to receive orders to perform the most humiliatingly obvious of tasks.`);
			} else if (slave.behavioralFlaw === BehavioralFlaw.DEVOUT) {
				r.push(`${slave.slaveName} remains devoted to an old world faith that serves ${him} as a reservoir of mental resilience. You carefully select pressure points to break ${him} of this by forcing ${him} to violate ${his} faith's purity codes, constantly. ${He} is forced to eat, dress, and fuck in ways that convince ${him} that ${he} must either condemn ${himself} as an irredeemable sinner, or abandon ${his} beliefs.`);
			}
			slave.training += 40; // fixing is easier than softening
			if (slave.training < 100) {
				r.push(`You make progress, but ${he}'s the same at the end of the week.`);
			} else {
				slave.training = 0;
				r.push(`By the end of the week,`);
				r.push(App.UI.DOM.makeElement("span", `you break ${him} of ${his} bad habits.`, "green"));
				r.push(App.UI.DOM.makeElement("span", `${His} obedience has increased.`, ["hotpink"]));
				slave.behavioralFlaw = BehavioralFlaw.NONE;
				slave.devotion += 4;
			}
			if (slave.fetishKnown !== 1) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`${He} really takes to your close attention;`);
					r.push(App.UI.DOM.makeElement("span", `${he}'s a natural submissive!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.CUMSLUT) {
					r.push(`While you're giving ${his} personal attention, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} has an oral fixation!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.MASOCHIST) {
					r.push(`While you're giving ${his} personal correction, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} likes pain!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.HUMILIATION) {
					r.push(`While you're giving ${his} personal attention in public, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} likes humiliation!`, "pink"));
					(slave.fetishKnown = 1);
				}
			}
			if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
				r.push(`With ${his} behavioral flaw trained out,`);
				if (slave.sexualFlaw === SexualFlaw.NONE) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to breaking ${his} will.`, ["yellow"]));
						pa.objective = "break will";
					} else {
						r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to fostering devotion.`, ["yellow"]));
						pa.objective = "build devotion";
					}
				} else {
					r.push(App.UI.DOM.makeElement("span", `${his} training assignment has defaulted to addressing ${his} sexual flaw.`, ["yellow"]));
					pa.objective = "fix sexual flaw";
				}
			}
			break;
		case "fix sexual flaw":
			switch (slave.sexualFlaw) {
				case SexualFlaw.HATESORAL:
					r.push(`${slave.slaveName} has a powerful gag reflex. As a result, it's pretty unpleasant to receive oral sex from ${him}, no matter how hard ${he} tries. You apply various inventive techniques for addressing this, all of which involve requiring ${him} to repeatedly deepthroat some object or other.`);
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.HATESANAL:
					if (canDoAnal(slave)) {
						r.push(`${slave.slaveName} does not like it up the butt. ${He} views ${his} rectum as a dirty place that should not be involved in sex. Naturally, this is an unacceptable view for a Free Cities sex slave to hold. The best way to address this foolishness is by long practice, so you take every opportunity to stick things up ${his} behind, and when you bore of that, you require ${him} to assfuck ${himself} with a dildo instead.`);
						r.push(VCheck.Anal(slave, 10));
					} else {
						r.push(`${slave.slaveName} does not like it up the butt. ${He} views ${his} rectum as a dirty place that should not be involved in sex. Naturally, this is an unacceptable view for a Free Cities sex slave to hold. The best way to address this foolishness is by long practice, so you take every opportunity to toy with ${his} rear. The inability to actually penetrate ${his} ass hinders your efforts, however.`);
						slave.training -= 20; // more difficult training
					}
					break;
				case SexualFlaw.HATESPEN:
					if (slave.vagina > -1) {
						r.push(`${slave.slaveName} does not like sex. In earlier times, it was accepted and understood that some, particularly some women, had a low sex drive. No Free Cities sex slave is allowed to engage in such foolishness. It's a hard flaw to fix, and for now you substitute obedience for honest enjoyment, and just get ${him} used to strong stimulation without putting anything in ${him}.`);
					} else if (canDoAnal(slave)) {
						r.push(`${slave.slaveName} does not like it up the butt. ${He} views ${his} rectum as a dirty place that should not be involved in sex. Naturally, this is an unacceptable view for a Free Cities slut to hold. The best way to address this foolishness is by long practice, so you take every opportunity to stick things up ${his} behind, and when you bore of that, you require ${him} to assfuck ${himself} instead.`);
						r.push(VCheck.Anal(slave, 10));
					} else {
						r.push(`${slave.slaveName} does not like it up the butt. ${He} views ${his} rectum as a dirty place that should not be involved in sex. Naturally, this is an unacceptable view for a Free Cities slut to hold. It's a hard flaw to fix when you can't introduce ${his} anus to things, but for now you substitute obedience for honest enjoyment, and just get ${him} used to strong stimulation without putting anything in ${him}.`);
					}
					break;
				case SexualFlaw.APATHETIC:
					r.push(`You are well practiced at forcing slaves to get you off or suffer punishment. To address ${slave.slaveName}'s sexual apathy, you adapt the method by requiring ${him} to work ${his} mouth under your desk while you do business. ${He} does all the work, start to finish, and ${he} does it well if ${he} wants to avoid pain.`);
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.CRUDE:
					r.push(`${slave.slaveName} does not pay enough attention to standards when having sex, leading to crude comments and unsexy noises. To remedy this, you have ${him} give you oral regularly: a sacrifice, but you make sacrifices for your slaves' improvement. Oral sex can be difficult to make elegant, but you work with ${him} to make it as pretty as possible, and spank ${him} cruelly when ${he} fails.`);
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.JUDGEMENT:
					r.push(`${slave.slaveName} has a bad habit of being sexually judgemental, belittling anyone who doesn't live up to ${his} pretensions of standards. To ${his} regret, ${he} frequently implies that ${he} prefers partners with big dicks: regret, because whenever ${he}'s caught doing this, you have ${him} brought to you and`);
					if (V.PC.dick !== 0) {
						r.push(`apply your big dick`);
					} else {
						r.push(`apply a big dildo`);
					}
					if (slave.anus > 0 && canDoAnal(slave)) {
						r.push(`to ${his} anus without mercy.`);
						r.push(VCheck.Anal(slave, 10));
					} else {
						r.push(`to ${his} gagging throat.`);
						seX(slave, "oral", V.PC, "penetrative", 10);
					}
					break;
				case SexualFlaw.SHAMEFAST:
					r.push(`Fortunately, shamefastness is a simple problem to break. Whenever you feel the inclination, you strip ${slave.slaveName} naked, drag ${him} out into whatever public space catches your fancy, and force ${him} to`);
					if (V.PC.dick !== 0) {
						r.push(`suck your dick.`);
					} else {
						r.push(`eat you out.`);
					}
					r.push(`To make sure ${he}'s really working over ${his} shame despite having ${his} face buried against you, you force ${him} to spread ${his} buttocks to show off ${his} asshole while ${he}`);
					if (V.PC.dick !== 0) {
						r.push(`sucks.`);
					} else {
						r.push(`licks you.`);
					}
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.IDEAL:
					r.push(`${slave.slaveName} still sees sex in a naïve light, hoping to be romanced, teased to arousal, and asked permission. This might be an annoyingly ignorant outlook if it wasn't so amusing to break. By the tenth time you slap ${his} ${slave.skin} face at the slightest hesitation to`);
					if (V.PC.dick !== 0) {
						r.push(`suck your cock,`);
					} else {
						r.push(`eat your pussy,`);
					}
					r.push(`${his} illusions are guttering low.`);
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.REPRESSED:
					r.push(`${slave.slaveName}'s innocence and hesitations about sex are unlikely to survive much longer, but you decide to hurry the process along by making ${him}`);
					if (V.PC.dick !== 0) {
						r.push(`eat dick`);
					} else {
						r.push(`eat your pussy`);
					}
					r.push(`while masturbating. ${He}'s repressed enough that masturbation is still a partial punishment for ${him}, but ${he} usually gets ${himself} off anyway, shaking with release and sobbing with crushed illusions.`);
					seX(slave, "oral", V.PC, "penetrative", 10);
					break;
				case SexualFlaw.CUMADDICT:
					r.push(`${slave.slaveName} is utterly addicted to cum. You keep ${him} in your office whenever you can, and subject ${him} to a strict sexual diet of`);
					if (canDoVaginal(slave)) {
						r.push(`sex,`);
					} else if (canDoAnal(slave)) {
						r.push(`buttsex,`);
					} else {
						r.push(`breast play,`);
					}
					r.push(`no oral allowed, no matter how much ${he} begs to be permitted to`);
					if (V.PC.dick !== 0) {
						r.push(`suck you off.`);
					} else {
						r.push(`eat you out.`);
					}
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.ANALADDICT:
					r.push(`${slave.slaveName} is utterly addicted to buttsex. You keep ${him} in your office whenever you can, and subject ${him} to a strict sexual diet of`);
					if (canDoVaginal(slave)) {
						r.push(`vanilla sex,`);
					} else {
						r.push(`oral and manual intercourse,`);
					}
					r.push(`no anal allowed, no matter how much ${he} begs you to stick something, anything, up ${his} ass.`);
					if (slave.vagina > -1 && canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else {
						seX(slave, "oral", V.PC, "penetrative", 10);
					}
					break;
				case SexualFlaw.ATTENTION:
					r.push(`${slave.slaveName} is an obnoxious attention whore. You keep ${him} in your office and make love to ${him} whenever you can, but only whenever you're alone in the office. You even instruct ${V.assistant.name} not to bother you while the slave is receiving ${his} therapy.`);
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.BREASTEXP:
					r.push(`${slave.slaveName} is completely devoted to ${his} own tits. You keep ${him} in your office whenever you can,`);
					if (canDoVaginal(slave)) {
						r.push(`fucking ${him}`);
					} else if (canDoAnal(slave)) {
						r.push(`fucking ${his} ass`);
					} else {
						r.push(`fucking ${his} face`);
					}
					r.push(`in positions that offer ${his} boobs no stimulation at all. When you're not broadening ${his} sexual horizons, ${he}'s restrained to keep ${him} from touching ${his} own nipples, despite piteous begging.`);
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.ABUSIVE:
				case SexualFlaw.MALICIOUS:
					r.push(`${slave.slaveName} seems to have forgotten that ${he}'s your bitch, so you remind ${him}. You keep ${him} in your office whenever ${he}'s not otherwise occupied, and hold ${him} down and fuck ${him} whenever you feel like it. It's been a long time since ${he} was on the bottom this regularly.`);
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.SELFHATING:
					r.push(`${slave.slaveName} hates ${himself} much more than is normal for a well trained sex slave, to the point where ${he} actively seeks out unhealthy and destructive assignments. You build up ${his} sexual self esteem with a steady diet of`);
					if (canDoVaginal(slave)) {
						r.push(`missionary lovemaking,`);
					} else if (canDoAnal(slave)) {
						r.push(`gentle anal loving,`);
					} else {
						r.push(`gentle oral sex,`);
					}
					r.push(`and make sure to praise ${him} and keep ${his} spirits up as much as you can.`);
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.NEGLECT:
					r.push(`${slave.slaveName} has given up on ${his} own sexual pleasure to an extent, focusing only on getting others off. You keep ${him} in your office and play with ${him} regularly, making a game of getting ${him} off as often as possible. You're careful to use other slaves for your own pleasure.`);
					if (canDoVaginal(slave)) {
						VCheck.Vaginal(slave, 10);
					} else if (canDoAnal(slave)) {
						VCheck.Anal(slave, 10);
					}
					break;
				case SexualFlaw.BREEDER:
					r.push(`${slave.slaveName} has become so sexually obsessed with pregnancy that impregnation holds less interest for ${him} than being pregnant.`);
					if (slave.pregKnown === 1) {
						r.push(`Since ${he}'s pregnant, getting ${him} out of this perversion is more difficult than just fucking ${him}.`);
					} else if (!canDoAnal(slave)) {
						r.push(`Fortunately, all slaves have a convenient hole in which they can be fucked without even the slightest danger of pregnancy.`);
						r.push(`Since ${his} ass is off-limits, you address the situation by fucking ${his} throat, and making sure ${he} enjoys it, too.`);
						seX(slave, "oral", V.PC, "penetrative", 10);
					} else if (slave.mpreg === 1) {
						r.push(`Fortunately, all slaves have a convenient hole in which they can be fucked without even the slightest danger of pregnancy, which, in ${his} case, is not ${his} fertile ass.`);
						r.push(`So, you address the situation by fucking ${his} throat, and making sure ${he} enjoys it, too.`);
						seX(slave, "oral", V.PC, "penetrative", 10);
					} else {
						r.push(`Fortunately, all slaves have a convenient hole in which they can be fucked without even the slightest danger of pregnancy.`);
						r.push(`So, you address the situation by fucking ${him} up the ass, and making sure ${he} gets off to it, too.`);
						r.push(VCheck.Anal(slave, 10));
					}
			}
			slave.training += 40; // fixing is easier than softening
			if (slave.training < 100) {
				r.push(`You make progress, but ${he}'s the same at the end of the week.`);
			} else {
				slave.training = 0;
				r.push(`By the end of the week,`);
				r.push(App.UI.DOM.makeElement("span", `you break ${him} of ${his} bad habits.`, "green"));
				r.push(App.UI.DOM.makeElement("span", `${His} obedience has increased.`, ["hotpink"]));
				slave.sexualFlaw = SexualFlaw.NONE;
				slave.devotion += 4;
			}
			if (slave.fetishKnown !== 1) {
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`${He} really takes to your close attention;`);
					r.push(App.UI.DOM.makeElement("span", `${he}'s a natural submissive!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.CUMSLUT) {
					r.push(`While you're giving ${him} personal attention, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} has an oral fixation!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.MASOCHIST) {
					r.push(`While you're giving ${him} personal correction, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} likes pain!`, "pink"));
					(slave.fetishKnown = 1);
				} else if (slave.fetish === Fetish.HUMILIATION) {
					r.push(`While you're giving ${him} personal attention in public, you discover by chance that`);
					r.push(App.UI.DOM.makeElement("span", `${he} likes humiliation!`, "pink"));
					(slave.fetishKnown = 1);
				}
			}
			if (slave.sexualFlaw === SexualFlaw.NONE) {
				r.push(`With ${his} sexual flaw trained out,`);
				coloredText = [];
				coloredText.push(`${his} training assignment has defaulted to`);
				if (slave.behavioralFlaw === BehavioralFlaw.NONE) {
					if (slave.devotion <= 20 && slave.trust >= -20) {
						coloredText.push(`breaking ${his} will.`);
						pa.objective = "break will";
					} else {
						coloredText.push(`fostering devotion.`);
						pa.objective = "build devotion";
					}
				} else {
					coloredText.push(`addressing ${his} behavioral flaw.`);
					pa.objective = "fix behavioral flaw";
				}
				r.push(App.UI.DOM.makeElement("span", coloredText.join(" "), ["yellow"]));
			}
			break;
		case "explore sexuality":
			slave.attrKnown = 1;
			r.push(`You set about investigating ${his} sexuality.`);
			if (slave.devotion < -20 && slave.trust >= -20) {
				r.push(`${He}'s so resistant that you have to fill ${him} with psychoactive drugs and restrain ${him} painfully in order to learn anything. This abuse`);
				r.push(App.UI.DOM.makeElement("span", `increases ${his} hatred.`, ["mediumorchid"]));
				slave.devotion -= 5;
			} else if (slave.devotion <= 20) {
				r.push(`You anticipate that ${he} won't be sufficiently compliant with some of the extreme practices you mean to investigate, so you give ${him} a hearty dose of aphrodisiacs and place ${him} in bondage gear. ${He} isn't happy, but soon ${he}'s too horny to care.`);
			} else {
				r.push(`${He}'s obedient enough that there is no trouble with any of the sexual kinks you subject ${him} to. Some ${he} likes more than others, but when ${he}'s not enjoying ${himself}, ${he} grits ${his} teeth and concentrates on obeying you.`);
			}
			r.push(`You start off by making ${him} view a medley of pornography while ${V.assistant.name} monitors ${him} for arousal. It seems ${he} is`);
			if (slave.attrXY <= 5) {
				r.push(App.UI.DOM.makeElement("span", `disgusted by men`, ["red"]));
			} else if (slave.attrXY <= 15) {
				r.push(App.UI.DOM.makeElement("span", `turned off by men`, ["red"]));
			} else if (slave.attrXY <= 35) {
				r.push(App.UI.DOM.makeElement("span", `not attracted to men`, ["red"]));
			} else if (slave.attrXY <= 65) {
				r.push(`indifferent to men,`);
			} else if (slave.attrXY <= 85) {
				r.push(App.UI.DOM.makeElement("span", `attracted to men`, "green"));
			} else if (slave.attrXY <= 95) {
				r.push(App.UI.DOM.makeElement("span", `aroused by men`, "green"));
			} else {
				r.push(App.UI.DOM.makeElement("span", `passionate about men`, "green"));
			}
			r.push(`and`);
			if (slave.attrXX <= 5) {
				r.push(App.UI.DOM.makeElement("span", `disgusted by women.`, ["red"]));
			} else if (slave.attrXX <= 15) {
				r.push(App.UI.DOM.makeElement("span", `turned off by women.`, ["red"]));
			} else if (slave.attrXX <= 35) {
				r.push(App.UI.DOM.makeElement("span", `not attracted to women.`, ["red"]));
			} else if (slave.attrXX <= 65) {
				r.push(`indifferent to women.`);
			} else if (slave.attrXX <= 85) {
				r.push(App.UI.DOM.makeElement("span", `attracted to women.`, "green"));
			} else if (slave.attrXX <= 95) {
				r.push(App.UI.DOM.makeElement("span", `aroused by women.`, "green"));
			} else {
				r.push(App.UI.DOM.makeElement("span", `passionate about women.`, "green"));
			}
			if (slave.fetishKnown !== 1) {
				slave.fetishKnown = 1;
				r.push(`You then give ${him} a good exploratory fondle. You play with ${his} nipples and each of ${his} holes and gauge ${his} reaction.`);
				if (slave.fetish === Fetish.BOOBS) {
					r.push(`You've barely touched ${his} nipples before ${he} moans. After some experimentation, it becomes clear that ${his} nipples might as well be a pair of slightly less sensitive`);
					if (slave.nipples === NippleShape.FUCKABLE) {
						r.push(`pussies.`);
					} else {
						r.push(`clits.`);
					}
					r.push(`Finding ${his} mammary fixation with you has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.fetish === Fetish.BUTTSLUT) {
					if (slave.vagina >= 0) {
						r.push(`When you move from fingering ${his} pussy to ${his} asshole,`);
					} else {
						r.push(`When you move from fondling ${his} mouth to ${his} asshole,`);
					}
					r.push(`you've barely touched ${his} butt before ${he} comes explosively. After some experimentation, it becomes clear that ${his} g-spot might as well be located up ${his} ass. Finding ${his} anal fixation with you has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} shows no real reaction when you move your fingers from hole to hole, because ${he} seems to react with arousal to fingers in any of them.`);
				} else {
					r.push(`Nothing unusual happens.`);
				}
				r.push(`Next, you demand extreme submission from ${him}. You make ${him} change into bondage gear that blinds ${him}, restricts ${his} movement, forces ${him} to present ${his} breasts uncomfortably, and holds vibrators against ${him}. Thus attired, ${he} is forced to serve you in whatever petty ways occur to you.`);
				if (slave.fetish === Fetish.SUBMISSIVE) {
					r.push(`During the first hour of this treatment, ${he} cums hard against the vibrators. ${He}'s a natural submissive! Discovering this about ${himself} under your hands has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} complies, showing the same enthusiasm for this as for other sex.`);
				} else {
					r.push(`${He} complies, but ${he}'s not a natural submissive.`);
				}
				r.push(`Before you let ${him} out of the extreme bondage, you rain a series of light blows across ${his} nipples and buttocks.`);
				if (slave.fetish === Fetish.MASOCHIST) {
					r.push(`${He} almost orgasms at the stinging pain. ${He}'s a masochist! This discovery has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} enjoys the pain play, but ${he} seems to enjoy everything you try.`);
				} else {
					r.push(`${He} struggles and tries to avoid the blows.`);
				}
				App.Events.addNode(el, r, "div", "indent");
				r = [];
				r.push(`The next day, ${he} continues to accompany you. Whenever cum is involved in your day's affairs in any way, you require ${him} to clean it up with ${his} mouth.`);
				if (slave.fetish === Fetish.CUMSLUT) {
					r.push(`${He} enjoys this treatment. ${He}'s a cumslut! Discovering this about ${himself} under your hands has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} enjoys using ${his} mouth, but no more than other kinds of sexual activity.`);
				} else {
					r.push(`If ${he} had any special regard for cum, you'd know it, and ${he} doesn't.`);
				}
				const {himU, hisU, girlU} = getNonlocalPronouns(0).appendSuffix('U');
				r.push(`You carefully watch ${his} reaction as you let ${him} spend a short time relaxing with a pregnant slave.`);
				if (slave.fetish === Fetish.PREGNANCY) {
					r.push(`${He}'s fascinated. ${He} fetishizes fertility! Discovering this with you has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} spends most of the rest ogling the pregnant slave's boobs.`);
				} else {
					r.push(`${He} simply enjoys the rest.`);
				}
				r.push(`You restrain the pregnant slave and administer a brief beating across ${hisU} bare buttocks, ensuring that you cause enough pain to produce a few tears, a bit of begging, and some struggling.`);
				if (slave.fetish === Fetish.SADIST) {
					r.push(`${He}'s almost painfully aroused. ${He}'s titillated by the idea of causing pain! Discovering this about ${himself} under your direction has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} enjoys watching the poor pregnant slave wriggle, but ${he}'s watching ${hisU} butt rather than the beating.`);
				} else {
					r.push(`${He}'s a bit disturbed by the`);
					if (canSee(slave)) {
						r.push(`sight`);
					} else if (canHear(slave)) {
						r.push(`sound`);
					} else {
						r.push(`idea`);
					}
					r.push(`of you punishing the pregnant ${girlU}.`);
				}
				r.push(`Before letting the poor pregnant slave go, you require ${slave.slaveName} to add a blindfold to the restraints.`);
				if (slave.fetish === Fetish.DOM) {
					r.push(`${He} seems to really enjoy blindfolding the poor ${girlU}, reassuring ${himU} as ${he} does. ${He}'s a natural sexual top! Discovering this about ${himself} under your direction has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} enjoys getting closer to the slave, mostly so ${he} can give ${hisU} pregnant pussy a thorough grope.`);
				} else {
					r.push(`${He} just follows orders.`);
				}
				r.push(`Lastly, you place ${him} in a special room in your penthouse filled with live video equipment. They get to see ${him} groped, deepthroated, facialed, teased, and tortured.`);
				if (slave.fetish === Fetish.HUMILIATION) {
					r.push(`The more viewers ${he} gets, the harder ${he} comes. ${He}'s a slut for humiliation! Discovering this about ${himself} under your hands has`);
					r.push(App.UI.DOM.makeElement("span", `increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 4;
				} else if (slave.energy > 95) {
					r.push(`${He} enjoys showing off sexually, but focuses on the sex first. ${He} got off on everything, and is clearly a nympho. Discovering this about ${himself} under your hands has`);
					r.push(App.UI.DOM.makeElement("span", `greatly increased ${his} devotion to you.`, ["hotpink"]));
					slave.devotion += 9;
				} else {
					r.push(`${He} gets through it, but ${he} doesn't seem to enjoy`);
					if (canSee(slave)) {
						r.push(`seeing ${his} audience on the screen.`);
					} else if (canHear(slave)) {
						r.push(`hearing ${his} jeering audience on the screen.`);
					} else {
						r.push(`the feeling of being watched.`);
					}
				}
			} else {
				r.push(`You already know that ${he}`);
				switch (slave.fetish) {
					case Fetish.BUTTSLUT:
					case Fetish.CUMSLUT:
					case Fetish.DOM:
					case Fetish.MASOCHIST:
					case Fetish.SADIST:
					case Fetish.SUBMISSIVE:
						r.push(`is a`);
						r.push(App.UI.DOM.makeElement("span", `${slave.fetish},`, ["coral"]));
						break;
					case Fetish.MINDBROKEN:
						r.push(`is`);
						r.push(App.UI.DOM.makeElement("span", `mindbroken,`, ["red"]));
						break;
					case Fetish.BOOBS:
					case Fetish.HUMILIATION:
					case Fetish.PREGNANCY:
						r.push(`loves`);
						r.push(App.UI.DOM.makeElement("span", `${slave.fetish},`, ["coral"]));
						break;
					default:
						r.push(`lacks a fetish,`);
				}
				r.push(`so your investigation is complete.`);
			}
			r.push(basicTrainingDefaulter(slave));
			break;
		case "induce arrogance":
			r.push(`Since you've decided to incite ${him} to arrogance, you praise ${him} effusively, and give orders that others are to do so as well. Other slaves are punished for things ${he}'s allowed to get away with.`);
			r.push(induceFlawLenityEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} isn't seriously affected; you'll have to be more subtle next week.`);
			} else {
				slave.training = 0;
				r.push(`${He} begins to think ${himself} special, and is now`);
				r.push(App.UI.DOM.makeElement("span", `arrogant.`, ["red"]));
				slave.behavioralFlaw = BehavioralFlaw.ARROGANT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce bitchiness":
			r.push(`Since you've decided to induce ${him} to bitchiness, you keep ${him} in your office and induce ${him} to criticize other slaves, rewarding ${him} when ${he}'s especially catty.`);
			r.push(induceFlawLenityEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} goes along, but remains cautious and will need more practice.`);
			} else {
				r.push(`${He} starts making`);
				r.push(App.UI.DOM.makeElement("span", `bitchy`, ["red"]));
				r.push(`remarks without being prompted.`);
				slave.behavioralFlaw = BehavioralFlaw.BITCHY;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce odd behavior":
			r.push(`Since you've decided to abuse ${him} into odd behavior, you target ${him} for a campaign of surprise sex. You constantly ambush ${him}, shove ${him} onto the ground, and fuck ${him}. Sometimes ${he} wakes up from bad dreams to find you penetrating ${him}.`);
			r.push(induceFlawAbuseEffects(slave));
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to tolerate the abuse.`);
			} else {
				r.push(`${He} starts`);
				r.push(App.UI.DOM.makeElement("span", `behaving oddly,`, ["red"]));
				r.push(`jumping at noises and mumbling to ${himself}.`);
				slave.behavioralFlaw = BehavioralFlaw.ODD;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce hatred of men":
			r.push(`In order to make ${him} hate men, you sometimes simply`);
			if (V.PC.dick !== 0) {
				r.push(`stick your dick in ${him} without asking,`);
			} else {
				r.push(`stuff a strap-on inside ${him} without asking,`);
			}
			r.push(`and sometimes force shockingly juvenile pranks on ${him}. ${He} is regularly smacked in the face with floppy dildos.`);
			r.push(induceFlawAbuseEffects(slave));
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} focuses more on you than on the masculine aspects of this. You'll need to be more subtle next week.`);
			} else {
				r.push(`You notice ${him} starting to`);
				r.push(App.UI.DOM.makeElement("span", `shoot hateful glances`, ["red"]));
				r.push(`at any men ${he} sees.`);
				slave.behavioralFlaw = BehavioralFlaw.HATESMEN;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce hatred of women":
			r.push(`In order to make ${him} hate women, you keep ${him} in your office when ${he}'s not otherwise occupied, and`);
			if (V.PC.vagina === -1) {
				r.push(`make ${him} eat other slaves out`);
			} else {
				r.push(`sit on ${his} face`);
			}
			r.push(`until ${he}'s thoroughly sick of pussy.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} focuses more on you than on the feminine aspects of this. You'll need to be more subtle next week.`);
			} else {
				r.push(`You notice ${him} starting to`);
				r.push(App.UI.DOM.makeElement("span", `shoot hateful glances`, ["red"]));
				r.push(`at any vaginas ${he} sees.`);
				slave.behavioralFlaw = BehavioralFlaw.HATESWOMEN;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce gluttony":
			r.push(`Inducing gluttony is harder than inducing anorexia; you force ${him} to orgasm when ${he}'s eating, and praise ${him} effusively when ${he} gains weight. You also provide ${him} with ample rations for stress eating.`);
			slave.training -= 20; // more difficult training
			if (slave.training < 100) {
				r.push(`${He} eats when ordered, but isn't deeply affected. ${He}'ll need more practice being a pig.`);
			} else {
				r.push(`You notice ${him} starting to`);
				r.push(App.UI.DOM.makeElement("span", `enjoy eating`, ["red"]));
				r.push(`for its own sake, even when ${he}'s not hungry.`);
				slave.behavioralFlaw = BehavioralFlaw.GLUTTONOUS;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce anorexia":
			r.push(`You criticize ${him} cruelly whenever ${he} eats, and praise thinner slaves to ${his} face at every opportunity.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} continues consuming ${his} rations when ordered, and will need further training.`);
			} else {
				r.push(`${He} begins to`);
				r.push(App.UI.DOM.makeElement("span", `eat only when repeatedly ordered to.`, ["red"]));
				slave.behavioralFlaw = BehavioralFlaw.ANOREXIC;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce religious devotion":
			r.push(`You direct a campaign of abuse and threats at ${him}, and surreptitiously ensure that a little religious text from ${his} home country finds its way into a hiding place in ${his} living area.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} keeps ${his} head down and shows no sign of religious introspection, at least this week.`);
			} else {
				r.push(`${He} begins to read it when ${he} thinks ${he}'s alone, and`);
				r.push(App.UI.DOM.makeElement("span", `talks to God`, ["red"]));
				r.push(`when ${he} thinks only He is listening.`);
				slave.behavioralFlaw = BehavioralFlaw.DEVOUT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce liberation":
			r.push(`You direct a campaign of abuse and threats at ${him}, making sure to threaten ${him} with the absolute worst of slavery in your arcology. You also arrange for ${him} to witness other citizen's slaves in situations that aren't much fun.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to endure the abuse, unknowingly condemning ${himself} to more.`);
			} else {
				r.push(`A deep`);
				r.push(App.UI.DOM.makeElement("span", `anger about slavery`, ["red"]));
				r.push(`builds within ${him}.`);
				slave.behavioralFlaw = BehavioralFlaw.LIBERATED;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce hatred of oral":
			r.push(`Since you've decided to force ${him} to dislike oral sex, you're forced to use a complicated and refined slave breaking technique: constantly raping ${his} face.`);
			r.push(induceFlawAbuseEffects(slave));
			seX(slave, "oral", V.PC, "penetrative", 10);
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to comply with the oral abuse, unknowingly condemning ${himself} to more.`);
			} else {
				r.push(`After gagging enough, ${he} finally starts to`);
				r.push(App.UI.DOM.makeElement("span", `hate oral.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.HATESORAL;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce hatred of anal":
			r.push(`Since you've decided to force ${him} to dislike anal sex, you're forced to use a complicated and refined slave breaking technique: constantly raping ${his} ass.`);
			if (!canDoAnal(slave)) {
				r.push(`Every time you catch ${him} with ${his} chastity off, you're there to penetrate ${his} rectum.`);
			}
			r.push(induceFlawAbuseEffects(slave));
			r.push(VCheck.Anal(slave, 10));
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to comply with your abuse of ${his} butthole, unknowingly condemning ${himself} to more assrape.`);
			} else {
				r.push(`After feeling ${his} poor sphincter grow sorer and sorer, ${he} starts to`);
				r.push(App.UI.DOM.makeElement("span", `hate anal.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.HATESANAL;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce hatred of penetration":
			r.push(`Since you've decided to force ${him} to dislike penetration, you're forced to use a complicated and refined slave breaking technique: constantly raping ${him}.`);
			r.push(induceFlawAbuseEffects(slave));
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to comply with your abuse, unknowingly condemning ${himself} to more of it.`);
			} else {
				r.push(`After feeling ${his} poor holes grow sorer and sorer, ${he} starts to`);
				r.push(App.UI.DOM.makeElement("span", `hate getting fucked.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.HATESPEN;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce shame":
			r.push(`Since you've decided to force shame on ${him}, you keep ${him} in your office whenever ${he}'s not otherwise occupied, and heap derision on ${him} at every opportunity, even inviting visitors to join you in chats about how unattractive and worthless ${he} is.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to keep ${his} chin up, unknowingly condemning ${himself} to more of this abuse.`);
			} else {
				r.push(`${He} wants nothing more than to hide in corner and cry, and is now`);
				r.push(App.UI.DOM.makeElement("span", `shamefast.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.SHAMEFAST;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce sexual idealism":
			r.push(`Since you've decided to induce ${him} to sexual idealism, you keep ${him} in your office, and when the two of you are all alone, gossip with ${him} about other slaves and even citizens. You do your best to encourage ${him} to believe absurdities.`);
			r.push(induceFlawLenityEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} doesn't know what to make of this; you'll have to keep at it.`);
			} else {
				r.push(`${He} follows along, and is now`);
				r.push(App.UI.DOM.makeElement("span", `sexually idealistic.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.IDEAL;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce sexual repression":
			r.push(`Since you've decided to force sexual repression on ${him}, you keep ${him} in your office whenever ${he}'s not otherwise occupied. You use the monitoring systems to reveal ${his} sexual arousal whenever it appears, and castigate and punish ${him} for it.`);
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to keep ${his} chin up, unknowingly condemning ${himself} to more of this abuse.`);
			} else {
				r.push(`${He} desperately tries to avoid even thinking about subjects that get ${him} punished, and is now`);
				r.push(App.UI.DOM.makeElement("span", `sexually repressed.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.REPRESSED;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce sexual apathy":
			r.push(`Since you've decided to force sexual apathy on ${him}, you keep ${him} in your office whenever ${he}'s not otherwise occupied. You use ${him} regularly, and punish ${him} whenever ${he} shows any sign of enjoyment.`);
			r.push(induceFlawAbuseEffects(slave));
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} continues to experience arousal when fucked, and will need more of this treatment.`);
			} else {
				r.push(`${He} desperately tries to avoid arousal, and is now`);
				r.push(App.UI.DOM.makeElement("span", `sexually apathetic.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.APATHETIC;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce crudity":
			r.push(`Since you've decided to force sexual crudeness on ${him}, you keep ${him} in your office whenever ${he}'s not otherwise occupied, and degrade ${him} cruelly. You relax the normal cleanliness rules, and require ${him} to leave ${his} used holes as they are until ${he}'s too disgusting to fuck.`);
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			r.push(induceFlawAbuseEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} does ${his} best to tolerate the unclean feelings, condemning ${himself} to more of this.`);
			} else {
				r.push(`${He} slowly stops caring, and is now`);
				r.push(App.UI.DOM.makeElement("span", `sexually crude.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.CRUDE;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce judgement":
			r.push(`Since you've decided to make ${him} sexually judgemental, you keep ${him} in your office and fuck ${him},`);
			if (V.PC.dick !== 0) {
				r.push(`praising ${him} whenever ${he} takes your big dick well.`);
			} else {
				r.push(`using a huge strap-on on ${him} and praising ${him} when ${he} takes it like a good ${girl}.`);
			}
			r.push(induceFlawLenityEffects(slave));
			if (slave.training < 100) {
				r.push(`${He} writes this off as bravado, and will need more training.`);
			} else {
				r.push(`${He} starts to consider ${himself} reserved for special sexual treatment, and is now`);
				r.push(App.UI.DOM.makeElement("span", `sexually judgemental.`, ["red"]));
				slave.sexualFlaw = SexualFlaw.JUDGEMENT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce cum addiction":
			r.push(`The cumslut is quite pleased when you order ${him} to stay in your office whenever ${he} can for use as one of your personal oral toys. You carefully limit ${his} orgasms to when`);
			if (V.PC.dick !== 0) {
				r.push(`you're blowing your load down ${his} throat,`);
			} else {
				r.push(`${he}'s swallowing your pussyjuice,`);
			}
			r.push(`and make ${his} oral adventures predictably regular.`);
			seX(slave, "oral", V.PC, "penetrative", 10);
			if (slave.training < 100) {
				r.push(`${He} enjoys giving you lots of oral, but will need more training to develop psychological addiction to it.`);
			} else {
				r.push(`${He} begins to develop a psychological`);
				r.push(App.UI.DOM.makeElement("span", `addiction to cum.`, ["yellow"]));
				slave.sexualFlaw = SexualFlaw.CUMADDICT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce anal addiction":
			r.push(`The buttslut is quite pleased when you order ${him} to stay in your office`);
			if (!canDoAnal(slave)) {
				r.push(`and remove ${his} chastity`);
			}
			r.push(`whenever ${he} can for use as one of your personal anal toys. You make ${his} anal orgasms predictably regular, doing your best to inculcate reliance on them.`);
			r.push(VCheck.Anal(slave, 10));
			if (slave.training < 100) {
				r.push(`${He} enjoys all the anal attention, but will need more training to develop psychological addiction to buttsex.`);
			} else {
				r.push(`${He} begins to develop a psychological`);
				r.push(App.UI.DOM.makeElement("span", `addiction to anal sex.`, ["yellow"]));
				slave.sexualFlaw = SexualFlaw.ANALADDICT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce attention whoring":
			r.push(`The humiliation slut is quite pleased when you order ${him} to stay in your office whenever ${he} can, and fucking ${him} whenever other slaves are present. You do your best to focus ${his} attention on how the others react to the spectacle.`);
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} enjoys all the humiliation, but will need more training to become a true attention whore.`);
			} else {
				r.push(`${He} becomes a`);
				r.push(App.UI.DOM.makeElement("span", `true attention whore,`, ["yellow"]));
				r.push(`caring more about the spectators than the sex.`);
				slave.sexualFlaw = SexualFlaw.ATTENTION;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce breast growth obsession":
			r.push(`You inspect ${his} breasts multiple times a day, and praise ${him} effusively when they grow at all. You treat it as though it were something ${he} could control personally.`);
			if (slave.training < 100) {
				r.push(`${He} enjoys your attention to ${his} favorite part of ${himself}, but doesn't truly internalize your focus on their growth.`);
			} else {
				r.push(`${He} begins to believe you despite ${himself}, and becomes`);
				r.push(App.UI.DOM.makeElement("span", `obsessed with breast growth.`, ["yellow"]));
				slave.sexualFlaw = SexualFlaw.BREASTEXP;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce abusiveness":
			r.push(`The dom is gratified when you order ${him} to stay in your office whenever ${he} can to fuck any slave you feel like throwing ${his} way. You do your best to limit ${his} menu items to reluctant or even rebellious slaves, and praise ${him} when ${he} forces ${himself} on them.`);
			seX(slave, "penetrative", "slaves", "penetrative", 10);
			if (slave.training < 100) {
				r.push(`${He} has fun, but ${he} continues to enjoy getting off more than getting to use bitches. ${He}'ll need more practice.`);
			} else {
				r.push(`${He} becomes`);
				r.push(App.UI.DOM.makeElement("span", `sexually abusive,`, ["yellow"]));
				r.push(`looking over each slave that comes into your office in the hope they'll resist.`);
				slave.sexualFlaw = SexualFlaw.ABUSIVE;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce maliciousness":
			r.push(`The sadist is gratified when you order ${him} to stay in your office whenever ${he} can to have ${his} way with any slave you feel like throwing ${his} way. You do your best to limit ${his} menu items to rebellious slaves, and praise ${him} when ${his} sadism makes ${him} an effective punishment tool.`);
			seX(slave, "penetrative", "slaves", "penetrative", 10);
			if (slave.training < 100) {
				r.push(`${He} enjoys ${himself}, but still betrays occasional concern when slaves are really broken by what ${he} does to them. ${He}'ll need more practice.`);
			} else {
				r.push(`${He} becomes`);
				r.push(App.UI.DOM.makeElement("span", `sexually malicious,`, ["yellow"]));
				r.push(`going so far as to lick tears off ${his} victims' faces.`);
				slave.sexualFlaw = SexualFlaw.MALICIOUS;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce self hatred":
			r.push(`You order the masochist to stay in your office whenever ${he}'s not working or resting. You fuck ${him} cruelly, going beyond the pain ${he} enjoys into harsh degradation. And every time you use ${him}, you make sure to tell ${him} how useless ${he} is.`);
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} gets off on the pain, but ${his} sense of self isn't seriously affected this week.`);
			} else {
				r.push(`${He} becomes`);
				r.push(App.UI.DOM.makeElement("span", `sexually self hating,`, ["yellow"]));
				r.push(`and tearfully begs to you do worse to ${him}, no matter how bad it gets.`);
				slave.sexualFlaw = SexualFlaw.SELFHATING;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce sexual self neglect":
			r.push(`You order the sub to stay in your office whenever ${he}'s not working or resting, and use ${his} body for your pleasure. The instant you climax, you go back to your work or to another slave, treating ${him} like a piece of used tissue.`);
			if (canDoVaginal(slave)) {
				VCheck.Vaginal(slave, 10);
			} else if (canDoAnal(slave)) {
				VCheck.Anal(slave, 10);
			} else {
				seX(slave, "oral", V.PC, "penetrative", 10);
			}
			if (slave.training < 100) {
				r.push(`${He} accepts ${his} utterly submissive role, but ${his} sense of self isn't seriously affected this week.`);
			} else {
				r.push(`${He} becomes`);
				r.push(App.UI.DOM.makeElement("span", `sexually self neglectful,`, ["yellow"]));
				r.push(`and loses all expectation that those who use ${him} will address ${his} pleasure at all.`);
				slave.sexualFlaw = SexualFlaw.NEGLECT;
				r.push(basicTrainingDefaulter(slave));
			}
			break;
		case "induce breeding obsession":
			r.push(`You order the pregnant slut to stay in your office whenever ${he}'s not working or resting.`);
			if (slave.pregKnown === 0) {
				r.push(`Since ${he}'s not pregnant, you keep ${him} rigged up with an enormous sympathy belly when ${he}'s there.`);
			}
			r.push(`Rather than fucking ${him}, you praise ${his} pregnancy effusively, and only allow ${him} to get off when you're doing so.`);
			if (slave.training < 100) {
				r.push(`${He} enjoys ${himself}, but mostly because of the pleasure. ${He}'ll need more training.`);
			} else {
				r.push(`${He} develops an`);
				r.push(App.UI.DOM.makeElement("span", `obsession with breeding,`, ["yellow"]));
				r.push(`and begins to stroke ${his} belly in a disturbingly masturbatory way.`);
				slave.sexualFlaw = SexualFlaw.BREEDER;
				r.push(basicTrainingDefaulter(slave));
			}
	}
	r.push(IncreasePCSkills('slaving', currentSlaveValue));
	V.PC.skill.slaving = Math.clamp(V.PC.skill.slaving, -100, 100);
	App.Events.addNode(el, r, "div", "indent");
	return el;

	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function induceFlawAbuseEffects(slave) {
		const el = new DocumentFragment();
		const {He, His, him, his} = getPronouns(slave);
		slave.devotion -= 5;
		slave.trust -= 5;
		el.append(`${He}'s `);
		if (slave.devotion > 20) {
			App.UI.DOM.appendNewElement("span", el, `desperately confused`, ["mediumorchid"]);
			el.append(` by this treatment, since the effect would be ruined if you explained it to ${him}, and ${his} `);
			App.UI.DOM.appendNewElement("span", el, `trust in you is reduced. `, ["gold"]);
		} else if (slave.devotion >= -20) {
			App.UI.DOM.appendNewElement("span", el, `confused, depressed`, ["mediumorchid"]);
			el.append(` and `);
			App.UI.DOM.appendNewElement("span", el, `frightened`, ["gold"]);
			el.append(` by this treatment, since the effect would be ruined if you explained it to ${him}. `);
		} else {
			App.UI.DOM.appendNewElement("span", el, `angry`, ["mediumorchid"]);
			el.append(` and `);
			App.UI.DOM.appendNewElement("span", el, `afraid`, ["gold"]);
			el.append(` that you would treat ${him} like this. `);
		}
		if (slave.energy > 10) {
			slave.energy -= 2;
			el.append(`${His} `);
			App.UI.DOM.appendNewElement("span", el, `appetite for sex is also reduced. `, ["libido", "dec"]);
		}
		return el;
	}
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {DocumentFragment}
	 */
	function induceFlawLenityEffects(slave) {
		const el = new DocumentFragment();
		if (slave.devotion <= 20) {
			const {He, him} = getPronouns(slave);
			slave.trust += 5;
			el.append(`${He} doesn't understand what you intend by this strange treatment, but it does make ${him} `);
			App.UI.DOM.appendNewElement("span", el, `inappropriately trusting. `, ["mediumaquamarine"]);
		}
		return el;
	}
	/**
	 * @param {App.Entity.SlaveState} slave
	 * @returns {HTMLElement}
	 */
	function basicTrainingDefaulter(slave) {
		const el = App.UI.DOM.makeElement("div", "", ["indent"]);
		const {He, His, his, he} = getPronouns(slave);
		if (slave.devotion > 20 && slave.behavioralFlaw !== BehavioralFlaw.NONE && slave.behavioralQuirk === BehavioralQuirk.NONE) {
			el.append(`Since ${he}'s obedient, `);
			App.UI.DOM.appendNewElement("span", el, `${his} training assignment has defaulted to softening ${his} behavioral flaw. `, ["yellow"]);
			pa.objective = "soften behavioral flaw";
		} else if ((slave.devotion > 20) && (slave.sexualQuirk === SexualQuirk.NONE) && !App.Data.misc.paraphiliaList.includes(slave.sexualFlaw) && slave.sexualFlaw !== SexualFlaw.NONE) {
			el.append(`Since ${he}'s obedient, `);
			App.UI.DOM.appendNewElement("span", el, `${his} training assignment has defaulted to softening ${his} sexual flaw. `, ["yellow"]);
			pa.objective = "soften sexual flaw";
		} else if (slave.devotion > 20 && slave.behavioralFlaw !== BehavioralFlaw.NONE && slave.behavioralQuirk !== BehavioralQuirk.NONE) {
			el.append(`Since ${he}'s obedient and already has a behavioral quirk, `);
			App.UI.DOM.appendNewElement("span", el, `${his} training assignment has defaulted to removing ${his} behavioral flaw. `, ["yellow"]);
			pa.objective = "fix behavioral flaw";
		} else if ((slave.devotion > 20) && !App.Data.misc.paraphiliaList.includes(slave.sexualFlaw) && slave.sexualFlaw !== SexualFlaw.NONE) {
			el.append(`Since ${he}'s obedient and already has a sexual quirk, `);
			App.UI.DOM.appendNewElement("span", el, `${his} training assignment has defaulted to removing ${his} sexual flaw. `, ["yellow"]);
			pa.objective = "fix sexual flaw";
		} else if (slave.devotion <= 20 && slave.trust >= -20) {
			App.UI.DOM.appendNewElement("span", el, `${His} training assignment has defaulted to breaking ${his} will. `, ["yellow"]);
			pa.objective = "break will";
		} else {
			el.append(`${He} is now fully broken; `);
			App.UI.DOM.appendNewElement("span", el, `${his} training assignment has defaulted to fostering devotion. `, ["yellow"]);
			pa.objective = "build devotion";
		}
		slave.training = 0;
		return el;
	}
};
