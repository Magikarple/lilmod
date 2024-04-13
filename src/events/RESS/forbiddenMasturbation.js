App.Events.RESSForbiddenMasturbation = class RESSForbiddenMasturbation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.masturbation === 0,
				s => !App.Utils.hasNonassignmentSex(s),
				s => s.need > 0,
				s => s.devotion <= 95,
				s => s.trust >= -20,
				s => (s.chastityPenis !== 1 || s.dick === 0),
				hasAnyArms,
				hasAnyLegs,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const {hisA, himselfA, HisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		const bellyAdj = bellyAdjective(eventSlave);
		const knees = hasBothLegs(eventSlave) ? "knees" : "knee";

		let offHand = "nothing";

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		if (V.assistant.personality > 0) {
			r.push(`There is an alert from ${V.assistant.name}, in ${hisA} deliciously feminine voice: "${properMaster()},`, contextualIntro(V.PC, eventSlave, true), `is masturbating. Ooh, ${he}'s breaking the rules, ${properMaster()}!" ${HisA} avatar`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`strokes ${hisA} dicks suggestively.`);
					break;
				case "shemale":
					r.push(`shifts uncomfortably, ${hisA} cock rock hard.`);
					break;
				case "amazon":
					r.push(`struts back and forth indignantly, ${hisA} bone bangles rattling.`);
					break;
				case "businesswoman":
					r.push(`licks ${hisA} cherry-red lips suggestively.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`giggles uncontrollably.`);
					break;
				case "hypergoddess":
				case "goddess":
					r.push(`tutting disapprovingly, despite ${hisA} blushing.`);
					break;
				case "loli":
					r.push(`stares innocently at the scene.`);
					break;
				case "preggololi":
					r.push(`stares at the scene, blushing, while a hand caresses ${hisA} large belly.`);
					break;
				case "angel":
					r.push(`is covering ${hisA} face, occasionally peeping through ${hisA} fingers.`);
					break;
				case "cherub":
					r.push(`is trying ${hisA} hardest to look away, but keeps glancing back at the scene.`);
					break;
				case "incubus":
					r.push(`is openly jacking off to the sight.`);
					break;
				case "succubus":
					r.push(`is groping ${himselfA} to the sight.`);
					break;
				case "imp":
					r.push(`is hovering while viciously fingering ${hisA} cunt.`);
					break;
				case "witch":
					r.push(`is pretending to read from ${hisA} spell book, but is obviously watching over the top of it.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`is mimicking ${hisA} actions nearly perfectly.`);
					break;
				case "schoolgirl":
					r.push(`giggles nervously.`);
					break;
				default:
					r.push(`spins accusingly.`);
			}
		} else {
			r.push(`There is a gentle alert from ${V.assistant.name}: "${properMaster()},`, contextualIntro(V.PC, eventSlave, true), `is masturbating in violation of the rules."`);
		}
		r.push(`A video feed appears.`);
		if (eventSlave.chastityVagina && eventSlave.chastityPenis === 1) {
			r.push(`In ${his} combination chastity, all ${he} can manage is furious nipple-${eventSlave.nipples !== "fuckable" ? "rubbing" : "fisting"}`);
			if (hasBothArms(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`and some furtive fingering of ${his} asshole`);
				offHand = "anal";
			}
			r.push(r.pop() + `.`);
		} else if (eventSlave.chastityVagina && eventSlave.dick === 0) {
			r.push(`In ${his} chastity belt, all ${he} can manage is furious nipple-${eventSlave.nipples !== "fuckable" ? "rubbing" : "fisting"}`);
			if (hasBothArms(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`and some furtive fingering of ${his} asshole`);
				offHand = "anal";
			}
			r.push(r.pop() + `.`);
		} else if (eventSlave.chastityPenis === 1 && eventSlave.vagina === -1) {
			r.push(`In ${his} chastity cage, all ${he} can manage is furious nipple-${eventSlave.nipples !== "fuckable" ? "rubbing" : "fisting"}`);
			if (hasBothArms(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`and some furtive fingering of ${his} asshole`);
				offHand = "anal";
			}
			r.push(r.pop() + `.`);
		} else if (eventSlave.dick > 0 && ((eventSlave.hormoneBalance >= 100) || (eventSlave.balls > 0 && eventSlave.ballType === "sterile") || (eventSlave.balls === 0))) {
			r.push(`Since ${he}'s impotent`);
			if (eventSlave.balls === 0) {
				r.push(`due to ${his} lack of balls,`);
			} else if (eventSlave.ballType === "sterile") {
				r.push(`due to ${his} useless balls,`);
			} else {
				r.push(`from hormone treatment,`);
			}
			r.push(`all ${he} can manage is rubbing ${his} soft dick`);
			if (hasBothArms(eventSlave)) {
				if (canDoVaginal(eventSlave)) {
					r.push(`and some furtive fingering of ${his} pussy.`);
					offHand = "pussy";
				} else if (canDoAnal(eventSlave)) {
					r.push(`and some furtive fingering of ${his} asshole.`);
					offHand = "anal";
				} else {
					r.push(`and some ${eventSlave.nipples !== "fuckable" ? `furious tweaking of ${his} nipples` : `furtive fingering of ${his} nipplecunts`}`);
					offHand = "nipples";
				}
			}
			r.push(r.pop() + `.`);
		} else if (!canAchieveErection(eventSlave) && eventSlave.dick > maxErectionSize(eventSlave)) {
			r.push(`Since ${his} dick requires far too much blood to get erect, ${he}'s furiously massaging the semi-engorged monster.`);
		} else if (!canAchieveErection(eventSlave) && eventSlave.dick > 0) {
			r.push(`Since ${he}'s can't get it up, all ${he} can manage is rubbing ${his} soft dick`);
			if (hasBothArms(eventSlave)) {
				if (canDoVaginal(eventSlave)) {
					r.push(`and some furtive fingering of ${his} pussy.`);
					offHand = "pussy";
				} else if (canDoAnal(eventSlave)) {
					r.push(`and some furtive fingering of ${his} asshole.`);
					offHand = "anal";
				} else {
					r.push(`and some ${eventSlave.nipples !== "fuckable" ? `furious tweaking of ${his} nipples` : `furtive fingering of ${his} nipplecunts`}`);
					offHand = "nipples";
				}
			}
			r.push(r.pop() + `.`);
		} else if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
			r.push(`${He}'s rubbing ${his} perineum desperately`);
			if (hasBothArms(eventSlave)) {
				if (canDoAnal(eventSlave)) {
					r.push(`with one hand, and ${his} anus with the other,`);
					offHand = "anal";
				} else {
					r.push(`with one hand, and a nipple with the other,`);
					offHand = "nipples";
				}
			}
			r.push(`since ${he} lacks external genitalia.`);
		} else if (eventSlave.vagina === -1) {
			r.push(`${He}'s furiously jacking off.`);
		} else if (eventSlave.clit >= 3) {
			r.push(`${He}'s furiously jacking off ${his} clitdick.`);
		} else {
			r.push(`${He}'s furiously polishing ${his} pearl.`);
		}
		r.push(`${He}'s chosen to do it in a dark corner and looks like ${he}'s hurrying; ${he} clearly knows this is forbidden.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`${eventSlave.slaveName} does not hear your`);
		if (canHear(eventSlave)) {
			r.push(`approach until you're very close.`);
		} else {
			r.push(`approach, but soon realizes your presence.`);
		}
		r.push(`${He} starts and tries to look normal.`);
		if (!canTalk(eventSlave)) {
			r.push(`${He} nervously gestures that ${he} wasn't doing anything.`);
		} else {
			r.push(Spoken(eventSlave, `"I wasn't doing anything, ${(eventSlave.rudeTitle === 1) ? PoliteRudeTitle(eventSlave) : Master}!"`), `${he} lies.`);
		}

		App.Events.addParagraph(node, r);
		const unknownOradvanceableFetish = eventSlave.fetishKnown !== 1 || eventSlave.fetishStrength <= 95;
		const responses = [new App.Events.Result(`Let ${him} earn relief`, relief)];
		if (eventSlave.fetish !== "cumslut" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`when ${he} sucks`, sucks));
		}
		if (eventSlave.fetish !== "boobs" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`during nipple play`, nipple));
		}
		if ((eventSlave.fetish !== "pregnancy" || unknownOradvanceableFetish) && eventSlave.belly >= 5000) {
			responses.push(new App.Events.Result(`while fondling ${his} belly`, belly));
		}
		if (canDoAnal(eventSlave) && eventSlave.fetish !== "buttslut" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`when ${he} takes it up the ass`, ass, (eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)));
		}
		if (eventSlave.fetish !== "humiliation" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`in public`, inPublic));
		}
		if (eventSlave.fetish !== "submissive" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`while submitting to a spanking`, spanking));
		}
		if (eventSlave.fetish !== "masochist" || unknownOradvanceableFetish) {
			responses.push(new App.Events.Result(`while in pain`, pain));
		}

		if (responses.length > 1) {
			responses.splice(1, 0, new App.Events.Result(null, null, `Punish ${him}, but then let ${him} get off:`)); // Hack for providing a headline to certain responses
		}
		App.Events.addResponses(node, responses);

		function relief() {
			r = [];

			r.push(`${He}'s extremely relieved that you're not going to punish ${him} for the rulebreaking when you tell ${him} that ${he} can touch ${himself} if ${he}`);
			if (eventSlave.belly >= 300000) {
				r.push(`leans over ${his} ${bellyAdj} belly`);
			} else {
				r.push(`gets on ${his} ${knees}`);
			}
			r.push(`and sucks you off. ${He} does a decent job, playing with ${himself} all the while. ${He}'s learned that ${he} can get away with infractions if ${he}'s willing to suck dick afterward. ${His} resistance to your will <span class="devotion dec">has increased.</span>`);
			eventSlave.devotion -= 5;
			seX(eventSlave, "oral", V.PC, "penetrative");
			return r;
		}

		function sucks() {
			r = [];
			if (V.PC.belly >= 10000) {
				if (eventSlave.belly >= 300000) {
					r.push(`You tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy,`);
					} else {
						r.push(`middle,`);
					}
					r.push(`do your best to get close beside ${him},`);
				} else if (eventSlave.belly >= 5000) {
					r.push(`You order ${him} to bend over beside you so your pregnancy doesn't obstruct you as badly`);
				} else {
					r.push(`You lean back, pull ${him} over your knee and under your gravid dome of a middle`);
				}
			} else {
				if (eventSlave.belly >= 300000) {
					r.push(`You tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`middle`);
					}
				} else if (eventSlave.belly >= 5000) {
					r.push(`You spread your legs to give ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`bloated middle`);
					}
					r.push(`room as you pull ${him} onto your lap`);
				} else {
					r.push(`You pull ${him} down over your knee`);
				}
			}
			r.push(`and spank ${his} ${eventSlave.skin} buttocks until they're warm to the touch. It's not a sexual punishment, it's too painful for that; by the end, ${eventSlave.slaveName} has cried ${himself} out and is limp in your hands. You pull ${him} up to face you and give ${him} your instructions: from now on, ${he} can come to you and ask to`);
			if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
				r.push(`blow you and perform cunnilingus on you,`);
			} else if (V.PC.dick !== 0) {
				r.push(`blow you,`);
			} else if (V.PC.vagina !== -1) {
				r.push(`and perform cunnilingus on you,`);
			}
			r.push(`and masturbate while ${he} does. ${He} nods through ${his} tears and flees. In an hour or so, though, ${he} finds you and asks to`);
			if (V.PC.vagina !== -1) {
				r.push(`give you oral.`);
			} else {
				r.push(`suck your cock.`);
			}
			r.push(`When you pretend indifference, ${he} abjectly begs. Soon, ${he}'s down on ${his} ${knees}, crying a little with shame as ${he} masturbates furiously.`);
			seX(eventSlave, "oral", V.PC, "penetrative", 5);
			if (eventSlave.fetish === "cumslut" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of`);
				if (V.PC.dick === 0) {
					r.push(`giving head`);
				} else {
					r.push(`sucking cock`);
				}
				r.push(`has increased.</span>`);
			} else if (eventSlave.fetish === "cumslut") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of`);
				if (V.PC.dick === 0) {
					r.push(`giving head`);
				} else {
					r.push(`sucking cock`);
				}
				r.push(`is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "cumslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of`);
				if (V.PC.dick === 0) {
					r.push(`giving head.</span>`);
				} else {
					r.push(`sucking cock.</span>`);
				}
			}
			return r;
		}

		function nipple() {
			r = [];
			if (V.PC.belly >= 10000) {
				if (eventSlave.belly >= 300000) {
					r.push(`You tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy,`);
					} else {
						r.push(`middle,`);
					}
					r.push(`do your best to get close beside ${him}, and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you flip ${him} onto ${his} back, lower your gravid body down to ${his} level and start playing with ${his} nipples.`);
				} else if (eventSlave.belly >= 5000) {
					r.push(`You order ${him} to bend over beside you so your pregnancy doesn't obstruct you as badly and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you haul ${him} upright and start playing with ${his} nipples.`);
				} else {
					r.push(`You lean back, pull ${him} over your knee and under your gravid dome of a middle and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you haul ${him} upright and start playing with ${his} nipples.`);
				}
			} else {
				if (eventSlave.belly >= 300000) {
					r.push(`You tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`middle`);
					}
					r.push(`and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you haul ${him} up into your lap, ${his} stomach spreading your legs, and start playing with ${his} nipples.`);
				} else if (eventSlave.belly >= 5000) {
					r.push(`You spread your legs to give ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`bloated middle`);
					}
					r.push(`room as you pull ${him} onto your lap and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you haul ${him} up into your lap and start playing with ${his} nipples.`);
				} else {
					r.push(`You pull ${him} down over your knee and grope ${him} thoroughly, bringing ${him} to the painful edge of orgasm. Just when ${he}'s about to tip over the edge, the stimulation stops and you haul ${him} up into your lap and start playing with ${his} nipples.`);
				}
			}
			r.push(`${He} writhes and sobs at the orgasm denial, since the nipple play is just barely enough to keep ${him} at a high level of arousal without giving relief. You switch back and forth until ${he} finally goes over into muscle-spasming climax during nipple stimulation alone.`);
			seX(eventSlave, "mammary", V.PC, "penetrative");
			if (eventSlave.fetish === "boobs" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of breast play has increased.</span>`);
			} else if (eventSlave.fetish === "boobs") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of breast play is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "boobs";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at every brush against ${his} breasts.</span>`);
			}
			return r;
		}

		function belly() {
			r= [];
			r.push(`You`);
			if (eventSlave.belly >= 300000) {
				r.push(`roll ${him} onto ${his} back`);
			} else {
				r.push(`pull ${him} into a sitting position on your lap`);
			}
			r.push(`and grope ${his} ${bellyAdj}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnancy`);
			} else {
				r.push(`stomach`);
			}
			r.push(`thoroughly, allowing ${him} to reach the painful edge of orgasm. You feel ${his} belly shudder as ${he} reaches climax under your ministrations. You tease ${his}`);
			if (eventSlave.belly >= 10001) {
				r.push(`popped`);
			}
			r.push(`navel as ${he} comes down from ${his} masturbation session.`);
			if (eventSlave.fetish === "pregnancy" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of pregnancy has increased.</span>`);
			} else if (eventSlave.fetish === "pregnancy") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of pregnancy is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "pregnancy";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at`);
				if (eventSlave.pregKnown === 1) {
					r.push(`every thought about ${his} pregnancy`);
				} else {
					r.push(`the very thought of being pregnant`);
				}
				r.push(r.pop() + `.</span>`);
			}
			return r;
		}

		function ass() {
			r= [];
			r.push(`You`);
			if (V.PC.belly >= 10000) {
				if (eventSlave.belly >= 300000) {
					r.push(`tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy,`);
					} else {
						r.push(`middle,`);
					}
					r.push(`do your best to get close beside ${him},`);
				} else if (eventSlave.belly >= 5000) {
					r.push(`order ${him} to bend over beside you so your pregnancy doesn't obstruct you as badly`);
				} else {
					r.push(`lean back, pull ${him} over your knee and under your gravid dome of a middle`);
				}
			} else {
				if (eventSlave.belly >= 300000) {
					r.push(`tip ${him} over ${his} ${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`middle`);
					}
				} else if (eventSlave.belly >= 5000) {
					r.push(`spread your legs to give ${his}`);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnancy`);
					} else {
						r.push(`bloated middle`);
					}
					r.push(`room as you pull ${him} onto your lap`);
				} else {
					r.push(`pull ${him} down over your knee`);
				}
			}
			r.push(`and spank ${his} ${eventSlave.skin} buttocks until they're warm to the touch. It's not a sexual punishment, it's too painful for that; by the end, ${eventSlave.slaveName} has cried ${himself} out and is limp in your hands. You pull ${him} up to face you and give ${him} your instructions: from now on, ${he} can come to you and ask you to assrape ${him}, and masturbate while ${he} takes`);
			if (V.PC.dick === 0) {
				r.push(`anal penetration.`);
			} else {
				r.push(`cock.`);
			}
			r.push(`${He} nods through ${his} tears and flees. In an hour or so, though, ${he} finds you and haltingly asks you to buttfuck ${him}. When you pretend indifference, ${he} offers you ${his} anus and abjectly begs you to stick`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on`);
			} else {
				r.push(`your cock`);
			}
			r.push(`up ${his} butt. Soon, ${he}'s down on all fours, crying a little with mixed shame and anal pain as ${he} masturbates furiously.`);
			r.push(VCheck.Anal(eventSlave, 5));
			if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of anal has increased.</span>`);
			} else if (eventSlave.fetish === "buttslut") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of anal is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "buttslut";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of anal sex.</span>`);
			}
			return r;
		}

		function inPublic() {
			r= [];
			r.push(`You bring ${him} out`);
			if (App.Entity.facilities.club.established) {
				r.push(`to ${App.Entity.facilities.club.nameCaps}`);
			} else {
				r.push(`onto the street`);
			}
			r.push(`and secure ${him} upright with a set of vibrators attached to all of ${his} erogenous zones. There's a lot of them, and they're extremely powerful; when you test the setup, ${he} wriggles with the intensity of the stimulation, and is about to climax when you shut it down. Without telling ${him}, you slave the vibrators to a program originally designed for VIP security details. It uses the cameras scattered through the area to detect when passersby are looking at ${him}. The more eyes on ${him}, the stronger the vibrations.`);
			if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of humiliation has increased.</span>`);
			} else if (eventSlave.fetish === "humiliation") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of humiliation is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "humiliation";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s starting to long for humiliation.</span>`);
			}
			return r;
		}

		function spanking() {
			r= [];
			r.push(`You tell ${him} that ${he} can get ${himself} off while ${he}'s being spanked, and that's it: you don't tell ${him} to offer ${his} bottom, much less start spanking ${him}. ${He} doesn't understand for a long moment, but before long ${he}'s begging abjectly for a spanking, and has ${his} buttocks presented, quivering with simultaneous arousal and fear of pain. The pain comes soon enough, with a delicious crack of palm on flesh`);
			if (eventSlave.voice === 0) {
				r.push(`and a hoarse grunt, the most noise ${he} can make.`);
			} else {
				r.push(`and a shriek of agony.`);
			}
			r.push(`${He} masturbates furiously, but you're an accomplished spanker, and you repeatedly cause ${him} just enough pain to prevent climax. Eventually ${he} gets off in part because of, rather than in spite of, the lengthy beating.`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of submission has increased.</span>`);
			} else if (eventSlave.fetish === Fetish.SUBMISSIVE) {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of submission is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "submissive";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he} starts to associate submitting to you with getting off.</span>`);
			}
			return r;
		}

		function pain() {
			r = [];
			r.push(`You order ${him} to`);
			if ((eventSlave.heels === 1 && shoeHeelCategory(eventSlave) === 0) || !canStand(eventSlave)) {
				r.push(`kneel`);
			} else if (shoeHeelCategory(eventSlave) > 1 || canMove(eventSlave)) {
				r.push(`teeter`);
			} else {
				r.push(`stand`);
			}
			if (hasBothArms(eventSlave)) {
				r.push(`with ${his} arms`);
			} else {
				r.push(`with ${his} arm`);
			}
			if (hasBothLegs(eventSlave)) {
				r.push(`over ${his} head and ${his} legs splayed,`);
			} else {
				r.push(`over ${his} head and ${his} leg bent,`);
			}
			r.push(`and tell ${him} that if ${he} moves or resists, ${his} punishment will begin again from the start.`);
			if (eventSlave.chastityVagina || eventSlave.chastityPenis === 1) {
				if (offHand === "anal") {
					r.push(`${He} was touching ${his} nipples and ass, so you flick and torture ${his} nipples and give ${him} a severe spanking.`);
				} else {
					r.push(`${He} was playing with ${his} nipples, so you flick and torture them, enjoying ${his} agony.`);
				}
			} else if (!canAchieveErection(eventSlave) && eventSlave.dick > 6) {
				r.push(`${He} was playing with ${his} oversized cock, so you kick and swat at the swollen monster, enjoying the way it spasms.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				if (offHand === "anal") {
					r.push(`${He} was touching ${his} limp dick and ass, so you slap and torture ${his} offending dick and give ${him} a severe spanking.`);
				} else if (offHand === "pussy") {
					r.push(`${He} was touching ${his} limp dick and pussy, so you slap and torture ${his} offending dick and labia.`);
				} else if (offHand === "nipples") {
					r.push(`${He} was playing with ${his} limp dick and nipples, so you slap and torture ${his} offending dick while pinching and twisting nipples.`);
				} else {
					r.push(`${He} was playing with ${his} limp dick, so you slap and torture ${his} worthless cock, enjoying ${his} agony.`);
				}
			} else if (eventSlave.vagina === -1 && eventSlave.dick === 0) {
				if (offHand === "anal") {
					r.push(`${He} was desperately rubbing ${his} perineum and anus, the most sensitive parts ${he} has left, so you slap that part of ${him} repeatedly, enjoying the way it spasms.`);
				} else if (offHand === "nipples") {
					r.push(`${He} was desperately rubbing ${his} perineum and nipples, the most sensitive parts ${he} has left, so you slap those parts of ${him} repeatedly, enjoying the way they spasm.`);
				}
			} else if (eventSlave.vagina === -1 || eventSlave.clit >= 3) {
				r.push(`${He} was jacking it, so you force ${him} to get ${himself} hard for punishment and then deliver a series of agonizing slaps and flicks to ${his} offending member.`);
			} else if (eventSlave.labia > 1) {
				r.push(`${His} generous pussylips bear a sheen of incriminating moisture, so you slap and flick them, causing ${him} intense agony.`);
			} else {
				r.push(`You deliver a series of agonizing slaps to ${his} mons.`);
			}
			r.push(`You have to start over twice. By the end, ${he}'s managed to orgasm to all the stimulation, but ${he}'s crying and desperately promising never to touch ${himself} again without your permission. ${His} submission to you <span class="devotion inc">has increased.</span>`);
			eventSlave.devotion += 4;
			if (eventSlave.fetish === "masochist" && eventSlave.fetishKnown === 1) {
				eventSlave.fetishStrength += 4;
				r.push(`<span class="fetish inc">${His} enjoyment of pain has increased.</span>`);
			} else if (eventSlave.fetish === "masochist") {
				eventSlave.fetishKnown = 1;
				r.push(`<span class="fetish gain">${His} enjoyment of pain is now clear to you.</span>`);
			} else if (random(1, 100) > 50) {
				eventSlave.fetish = "masochist";
				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				r.push(`Before ${he} realizes what's happening, <span class="fetish gain">${he}'s getting aroused at the thought of ${his} ${getWrittenTitle(eventSlave)} beating ${him}.</span>`);
			}
			return r;
		}
	}
};

