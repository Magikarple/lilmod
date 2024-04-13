// cSpell:ignore againnn, nooo, fffuck

App.Events.RETSBoobCollision = class RETSBoobCollision extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 20,
				s => s.trust > 20,
				s => s.boobs > 3000,
				s => (s.attrXX >= 50 || (s.fetish === "boobs" && s.fetishStrength > 95))
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				canTalk,
				canHear,
				isSlaveAvailable,
				s => s.devotion > 20,
				s => s.boobs > 3000,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, woman, girl, loli
		} = getPronouns(eventSlave);
		const {say, title} = getEnunciation(eventSlave);
		const {
			him2, girl2, his2, he2, He2, woman2, hers2, loli2
		} = getPronouns(subSlave).appendSuffix("2");
		const {title: title2, say: say2} = getEnunciation(subSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		let t = [];

		t.push(`You pass by the slave quarters during a busy time. Slaves are hurrying back and forth, rushing to bathe, eat, and get dressed. In a particular hurry is`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), ","));
		t.push(`${his}`);
		if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyPreg >= 8000) {
				t.push(`heavy pregnancy`);
			} else {
				t.push(`heavy belly`);
			}
			t.push(`and`);
		}
		if (eventSlave.boobs > 8000) {
			t.push(`gargantuan tits hampering ${him} badly`);
		} else {
			t.push(`huge boobs getting in the way`);
		}
		t.push(`as ${he} rushes around. Returning from the shower to the sleeping area, ${he} turns a corner and runs hard into`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(eventSlave, subSlave, true), "."));
		t.push(`Both slaves are nude, and the collision of their massive breasts makes an audibly painful smack. ${eventSlave.slaveName} has enough momentum that ${he} overbears the top-heavy ${subSlave.slaveName} entirely. The poor`);
		if (subSlave.physicalAge > 30) {
			t.push(woman2);
		} else {
			t.push(girl2);
		}
		t.push(`crashes backwards, ${his2}`);
		if (subSlave.butt > 8) {
			t.push(`monstrous bottom`);
		} else if (subSlave.butt > 4) {
			t.push(`big behind`);
		} else {
			t.push(`hind end`);
		}
		t.push(`hitting the floor with a slap. ${eventSlave.slaveName} lands on top of ${him2}, the fall and the sudden weight of ${eventSlave.slaveName} on top of ${him2} driving the wind out of ${subSlave.slaveName} with a whoosh.`);
		App.Events.addParagraph(node, t);
		t = [];
		t.push(Spoken(eventSlave, `"Sorry! I'm so sorry,"`));
		t.push(`apologizes ${eventSlave.slaveName}. ${He} starts to try to disentangle ${himself} as ${subSlave.slaveName} struggles to get ${his2} breath back, but you see ${eventSlave.slaveName}'s back stiffen. ${He} stops trying to get up. As the discomfort of the collision fades, ${he} notices the warmth of ${subSlave.slaveName} underneath ${him}, and the way their nipples are pressed against one another. Impulsively, ${he} kisses ${subSlave.slaveName} full on the lips,`);
		if (eventSlave.boobs+subSlave.boobs > 20000) {
			t.push(`even though the mass of boob between them is so massive that ${he} has to struggle to bring ${his} mouth down to meet ${subSlave.slaveName}'s.`);
		} else if (eventSlave.belly >= 5000 && subSlave.belly >= 5000) {
			t.push(`even though their combined`);
			if (eventSlave.bellyPreg >= 5000) {
				t.push(`pregnancies`);
			} else {
				t.push(`bellies`);
			}
			t.push(`and breasts complicate things.`);
		} else if (eventSlave.belly >= 120000 || subSlave.belly >= 120000) {
			t.push(`even though`);
			if (eventSlave.belly >= 120000) {
				t.push(`${his} massive `);
				if (eventSlave.bellyPreg >= 5000) {
					t.push(`pregnancy`);
				} else {
					t.push(`belly`);
				}
				t.push(`complicates reaching ${subSlave.slaveName}'s.`);
			} else {
				t.push(`${subSlave.slaveName}'s massive`);
				if (eventSlave.bellyPreg >= 5000) {
					t.push(`pregnancy`);
				} else {
					t.push(`belly`);
				}
				t.push(`complicates reaching ${hers2}.`);
			}
		} else {
			t.push(`squashing their boobs together hard so ${he} can reach despite the mass of soft flesh between them.`);
		}
		App.Events.addParagraph(node, t);
		t = [];
		t.push(`"H-hey," ${subSlave.slaveName} gasps when ${eventSlave.slaveName} finally breaks the lip lock, but ${he2}'s clearly not that displeased. ${eventSlave.slaveName}, who has clearly forgotten running into the other slave entirely and now has other things on ${his} mind, begins to grind against ${him2}. When ${subSlave.slaveName} smiles back at the horny`);
		if (eventSlave.physicalAge > 30) {
			t.push(woman);
		} else if (eventSlave.physicalAge >= 18) {
			t.push(girl);
		} else if (eventSlave.physicalAge >= 13) {
			t.push(`teenager`);
		} else {
			t.push(loli);
		}
		t.push(`on top of ${him2}, ${eventSlave.slaveName}`);
		if (canPenetrate(eventSlave)) {
			if (!canDoVaginal(subSlave)) {
				if (subSlave.anus === 0 || !canDoAnal(subSlave)) {
					t.push(`reaches down to seat ${his} rapidly hardening dick between ${subSlave.slaveName}'s thighs for a bit of frottage.`);
					actX(eventSlave, "penetrative"); // frottage is not recorded
				} else if (eventSlave.dick > 4) {
					t.push(`pushes ${subSlave.slaveName}'s legs apart to rotate ${his2} hips, reaches down, and`);
					if (subSlave.anus > 2) {
						t.push(`rubs a little saliva on ${his} cock before shoving it up ${subSlave.slaveName}'s anus.`);
					} else {
						t.push(`carefully pushes ${his} cock up the whimpering ${subSlave.slaveName}'s tight butt.`);
					}
					seX(subSlave, "anal", eventSlave, "penetrative");
					if (canImpreg(subSlave, eventSlave)) {
						knockMeUp(subSlave, 5, 1, eventSlave.ID);
					}
				} else {
					t.push(`pushes ${subSlave.slaveName}'s legs apart to rotate ${his2} hips, reaches down, and`);
					if (subSlave.anus > 2) {
						t.push(`shoves ${his} cock up ${subSlave.slaveName}'s anus, which is loose enough that ${he} doesn't need much lubrication.`);
					} else {
						t.push(`pushes ${his} cock up the ${subSlave.slaveName}'s willing butt.`);
					}
					seX(subSlave, "anal", eventSlave, "penetrative");
					if (canImpreg(subSlave, eventSlave)) {
						knockMeUp(subSlave, 5, 1, eventSlave.ID);
					}
				}
			} else {
				if (subSlave.vagina === 0) {
					t.push(`reaches down to seat ${his} rapidly hardening dick between ${subSlave.slaveName}'s thighs for a bit of frottage.`);
				} else if (eventSlave.dick > 4) {
					t.push(`reaches down`);
					if (subSlave.vagina > 1) {
						t.push(`to insert ${his} huge cock into ${subSlave.slaveName}'s loose wet cunt.`);
					} else {
						t.push(`and carefully pushes ${his} cock into the whimpering ${subSlave.slaveName}'s tight pussy.`);
					}
					seX(subSlave, "vaginal", eventSlave, "penetrative");
					if (canImpreg(subSlave, eventSlave)) {
						knockMeUp(subSlave, 5, 0, eventSlave.ID);
					}
				} else {
					t.push(`reaches down`);
					if (subSlave.vagina > 1) {
						t.push(`and inserts ${his} dick into ${subSlave.slaveName}'s loose wet cunt.`);
					} else {
						t.push(`to put ${his} dick inside ${subSlave.slaveName}'s tight pussy.`);
					}
					seX(subSlave, "vaginal", eventSlave, "penetrative");
					if (canImpreg(subSlave, eventSlave)) {
						knockMeUp(subSlave, 5, 0, eventSlave.ID);
					}
				}
			}
		} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis) && eventSlave.dick >= 8) {
			t.push(`reaches down to seat ${his} rapidly hardening monster of a cock between ${subSlave.slaveName}'s thighs for a bit of frottage.`);
		} else if (eventSlave.dick > 0 && !(eventSlave.chastityPenis)) {
			t.push(`starts to rub ${his} soft bitchclit against ${subSlave.slaveName}'s ${genitalDesc(false, true)}.`);
		} else if (eventSlave.dick > 0 && (eventSlave.chastityPenis === 1)) {
			t.push(`starts to rub ${his} chastity cage against ${subSlave.slaveName}'s ${genitalDesc(true, true)}.`);
		} else if (eventSlave.chastityVagina) {
			t.push(`starts to rub ${his} chastity belt against ${subSlave.slaveName}'s ${genitalDesc(true, true)}.`);
		} else if (eventSlave.vagina === -1) {
			t.push(`starts to rub ${his} soft groin against ${subSlave.slaveName}'s ${genitalDesc(false, false)}.`);
		} else {
			t.push(`starts to rub ${his} wet pussy against ${subSlave.slaveName}'s ${genitalDesc(false, false)}.`);
		}

		function genitalDesc(doubleChastity, pussy) {
			if (subSlave.chastityVagina) {
				if (doubleChastity) {
					return "own belt, a rather pathetic display";
				}
				return "chastity belt";
			} else if (subSlave.dick > 0) {
				return "dick";
			} else if (subSlave.vagina === -1) {
				return "asspussy";
			} else {
				if (pussy) { // Why??
					return "pussy";
				} else {
					return "mons";
				}
			}
		}

		t.push(`Once ${he}'s gotten ${himself} positioned, ${subSlave.slaveName} reaches around ${eventSlave.slaveName}'s ${eventSlave.skin} body to grab ${his} ass. ${He2} holds ${eventSlave.slaveName} against ${him2} as ${eventSlave.slaveName} starts humping gently, and cranes ${his2} neck up to kiss ${him}.`);


		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("Fuck them", fuck),
			(eventSlave.anus > 0 && canDoAnal(eventSlave))
				? new App.Events.Result("Dominate the clumsy slave's ass", dominate)
				: new App.Events.Result(),
			((eventSlave.relationship === 0 || eventSlave.relationship === -1) && (subSlave.relationship === 0 || subSlave.relationship === -1))
				? new App.Events.Result("What a cute couple", couple)
				: new App.Events.Result(),
		]);


		function fuck() {
			t = [];

			t.push(`You approach the fucking slaves, kneeling next to them and running a possessive hand over ${eventSlave.slaveName}'s butt. The slave doesn't even have to look, recognizing you by your grip, and greets you cheerfully: "Hi ${title}!" ${subSlave.slaveName} giggles and cranes around to`);
			if (canSee(subSlave)) {
				t.push(`see.`);
			} else {
				t.push(`greet you.`);
			}
			t.push(`"Hi ${title2}," ${he2} choruses. ${eventSlave.slaveName} wiggles ${his} bottom under your hand, <span class="trust inc">trusting your judgment,</span> and ${subSlave.slaveName}`);
			if (canSee(subSlave)) {
				t.push(`watches`);
			} else {
				t.push(`waits`);
			}
			t.push(`to see what you'll do <span class="trust inc">with anticipation.</span>`);
			if (V.PC.dick === 0) {
				t.push(`You decide to make use of the position the slaves have gotten themselves into. Once naked, you get on all fours ahead of them, and then back yourself between them until you're effectively sitting on the massive cushion formed between them by their breasts. This puts your pussy against ${subSlave.slaveName}'s mouth, and your butt right in front of ${eventSlave.slaveName}'s face. ${subSlave.slaveName} starts to eat you out with dedication, and after planting a wet kiss on each of your thighs, ${eventSlave.slaveName} runs ${his} tongue from the base of your cunt and along your perineum, and then begins to kiss your asshole. The universe of warm wetness created by their mouths is so intense that your arms almost buckle.`);
				seX(eventSlave, "oral", V.PC, "vaginal");
				seX(subSlave, "oral", V.PC, "anal");
			} else {
				t.push(`They don't have long to wait. There's no need to be excessively creative. You get behind them and start from the top, laying your cock against ${eventSlave.slaveName}'s back, which produces an anticipatory shudder. Moving down, you`);
				if (!canDoAnal(eventSlave)) {
					if (V.PC.vagina !== -1) {
						t.push(`trail your hot cunt across the tops of ${his} buttocks and then`);
					}
					t.push(`trace your dickhead around ${eventSlave.slaveName}'s chastity belt before continuing. You move your cockhead, beaded with precum, down ${his} soft perineum`);
				} else if (eventSlave.anus === 0) {
					if (V.PC.vagina !== -1) {
						t.push(`trail your hot cunt across the tops of ${his} buttocks and then`);
					}
					t.push(`tease your dickhead against ${eventSlave.slaveName}'s virgin butt for a moment before continuing. You move your cockhead, beaded with precum, down ${his} soft perineum`);
				} else if (eventSlave.anus < 3) {
					t.push(`push your cock against ${eventSlave.slaveName}'s tight asshole, causing ${him} to stiffen and struggle momentarily before it pops inside ${him}. After giving ${his} butt a thorough fuck, you move your wet cockhead down ${his} soft perineum`);
					seX(subSlave, "anal", V.PC, "penetrative");
					if (canImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 5, 1, -1);
					}
				} else {
					t.push(`push your cock up ${eventSlave.slaveName}'s asspussy, which accepts it with ease. After giving it a good hard reaming, you move your wet cockhead down ${his} soft perineum`);
					seX(subSlave, "anal", V.PC, "penetrative");
					if (canImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 5, 1, -1);
					}
				}
				if (!canDoVaginal(eventSlave) || (eventSlave.vagina === 0)) {
					t.push(`and into the warm space between the two slaves for a little while.`);
				} else {
					t.push(`and into ${his} cunt, giving it a good hard fuck.`);
					seX(eventSlave, "vaginal", V.PC, "penetrative");
					if (canImpreg(eventSlave, V.PC)) {
						knockMeUp(eventSlave, 5, 0, -1);
					}
				}
				t.push(`Then you see to ${subSlave.slaveName} beneath ${him},`);
				if (canDoVaginal(subSlave) && subSlave.vagina > 0) {
					t.push(`giving ${him2} a turn with ${his2} owner's cock inside ${his2} womanhood before`);
					seX(eventSlave, "vaginal", V.PC, "penetrative");
					if (canImpreg(subSlave, V.PC)) {
						knockMeUp(subSlave, 5, 0, -1);
					}
				}
				if (subSlave.anus === 0 || !canDoAnal(subSlave)) {
					t.push(`using the slave's smashed-together buttocks to rub against.`);
				} else {
					t.push(`giving ${him2} as hard a buttfuck as you can manage with ${eventSlave.slaveName} between you.`);
					seX(subSlave, "anal", V.PC, "penetrative");
					if (canImpreg(subSlave, V.PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				}
			}
			t.push(`Then you move back up, using them until you're spent and they're lying limply in a pool of sweat and tits.`);
			subSlave.trust += 2;
			eventSlave.trust += 2;

			return t;
		}

		function dominate() {
			const frag = document.createDocumentFragment();
			t = [];
			const Yessir = Spoken(eventSlave, `Yes ${title}`);
			const cm = V.showInches === 2 ? "inch" : "centimeter";

			t.push(`You tell ${eventSlave.slaveName} that that was very clumsy of ${him}. The slaves start with surprise, since they didn't know you were watching, producing a delightful jiggle of smashed-together boob.`);
			t.push(`"${Yessir}," ${eventSlave.slaveName} ${say}s obediently, suspecting that you aren't done. ${He}'s right. In an idle, speculative tone, you muse that with ${his} huge boobs`);
			if (eventSlave.belly >= 10000) {
				t.push(`and big belly`);
			}
			t.push(`pinning ${him} to the ground and ${subSlave.slaveName} holding ${his} butt like that, ${he} can't get up. "${Yessir}," ${he} agrees. Quite helpless, you continue. "${Yessir}," ${he} parrots. Unable to escape, you conclude. "${Yessir}, ${he} moans.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`You tell ${subSlave.slaveName} to`);
			if (canPenetrate(subSlave)) {
				t.push(`sodomize ${him}. ${subSlave.slaveName} obeys hurriedly, shoving a hand between their hips to`);
				if (subSlave.dick > 4) {
					if (eventSlave.anus > 2) {
						t.push(`shove ${his2} cock up ${eventSlave.slaveName}'s loose anus.`);
					} else {
						t.push(`carefully push ${his2} cock inside ${eventSlave.slaveName}'s tight butthole.`);
					}
					t.push(`${eventSlave.slaveName} rides ${subSlave.slaveName} hard, knowing that the looser ${his} ass is, the easier whatever you're planning will be. ${subSlave.slaveName}'s big tool gapes ${his} hole quickly.`);
				} else {
					if (eventSlave.anus > 2) {
						t.push(`shove ${his2} dick inside ${eventSlave.slaveName}'s loose anus.`);
					} else {
						t.push(`push push ${his2} dick up ${eventSlave.slaveName}'s tight butthole.`);
					}
					t.push(`${eventSlave.slaveName} rides ${subSlave.slaveName} hard, knowing that the looser ${his} ass is, the easier whatever you're planning will be. ${subSlave.slaveName}'s penis isn't big enough to gape ${him} very much, so ${eventSlave.slaveName}, trying to be prepared, reaches around to shove an extra finger in alongside it.`);
				}
				t.push(`You`);
				if (V.PC.dick === 0) {
					t.push(`put on a strap-on,`);
				}
				t.push(`stop ${his} desperate humping, and shove ${his}`);
				if (eventSlave.bellyPreg >= 1500) {
					t.push(`gravid`);
				} else if (eventSlave.belly >= 1500) {
					t.push(`bloated`);
				}
				t.push(`torso back down against ${subSlave.slaveName}'s boobs. ${subSlave.slaveName} grabs hold of ${eventSlave.slaveName}'s buttocks and pulls them as far apart as ${he2} possibly can, removing all protection from ${eventSlave.slaveName}'s already-full asshole. ${eventSlave.slaveName} takes a deep breath and lets it out slowly as ${he} feels`);
				if (V.PC.dick === 0) {
					t.push(`the head of the strap-on`);
				} else {
					t.push(`your cockhead`);
				}
				t.push(`press insistently against the outside of ${his} anus and then, ${cm} by agonizing ${cm}, seat itself up ${his} butt alongside ${subSlave.slaveName}'s cock. ${He} shudders when you begin to thrust. ${subSlave.slaveName}, overstimulated, climaxes first; as the edge comes off ${his2} hard-on, ${his2} cock slides out of ${eventSlave.slaveName}'s ass, letting you be utterly merciless to the loosened, cum-soaked hole.`);
				seX(eventSlave, "anal", subSlave, "penetrative");
				seX(eventSlave, "anal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 1, -1);
				}
				if (canImpreg(eventSlave, subSlave)) {
					knockMeUp(eventSlave, 5, 1, subSlave.ID);
				}
			} else {
				t.push(`fingerfuck ${him}. ${subSlave.slaveName} obeys hurriedly, reaching inward and`);
				if (subSlave.anus > 2) {
					t.push(`pushing two fingers from each hand inside ${eventSlave.slaveName}'s loose anus.`);
				} else {
					t.push(`carefully pushing a finger from each hand up ${eventSlave.slaveName}'s tight butthole.`);
				}
				t.push(`${eventSlave.slaveName} begs ${subSlave.slaveName} to fuck ${his} butt, knowing that the looser ${his} ass is, the easier whatever you're planning will be. ${subSlave.slaveName} does ${his2} best, using ${his2} fingers to stretch ${eventSlave.slaveName}'s sphincter as much as ${he2} can without hurting ${him}.`);
				seX(eventSlave, "anal", subSlave, "penetrative");
				seX(eventSlave, "anal", V.PC, "penetrative");
				t.push(`Once you're satisfied that ${he} can take what's coming, you`);
				if (V.PC.dick === 0) {
					t.push(`put on a strap-on,`);
				}
				t.push(`steady ${his} hips, and shove ${his}`);
				if (eventSlave.bellyPreg >= 1500) {
					t.push(`gravid`);
				} else if (eventSlave.belly >= 1500) {
					t.push(`bloated`);
				}
				t.push(`torso back down against ${subSlave.slaveName}'s boobs. ${subSlave.slaveName} pulls to either side, gaping ${eventSlave.slaveName}'s hole for you. ${eventSlave.slaveName} takes a deep breath and lets it out slowly as ${he} feels`);
				if (V.PC.dick === 0) {
					t.push(`the head of the strap-on`);
				} else {
					t.push(`your cockhead`);
				}
				t.push(`slide between ${subSlave.slaveName}'s fingers, ${cm} by agonizing ${cm}, and seat itself up ${his} butt. ${He} shudders when you begin to thrust. ${subSlave.slaveName} keeps ${his2} fingers where they are, doing ${his2} best to use them to give you a handjob inside ${eventSlave.slaveName}'s ass.`);
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 5, 1, -1);
				}
			}
			t.push(`When you're done, you pull out, leaving ${eventSlave.slaveName} to collapse, whimpering and shaking, onto ${subSlave.slaveName}'s boobs. ${subSlave.slaveName}`);
			if (canSee(subSlave)) {
				t.push(`winks`);
			} else {
				t.push(`smiles`);
			}
			t.push(`at you over ${his2} shoulder. ${Spoken(subSlave, `"That was fun ${title2},"`)} ${he2} ${say2}s brightly. "<span class="devotion inc">${Spoken(subSlave, `Can we do that again`)}</span> ${Spoken(subSlave, `soon, please?"`)}`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`"Ohh fffuck," ${eventSlave.slaveName} moans into ${his} boobs, to no one in particular.`);
			subSlave.devotion += 4;
			if (eventSlave.anus < 3) {
				t.push(Spoken(eventSlave, `"Please nooo, <span class="lime">my poor hole will never be the same againnn.</span>"`));
				eventSlave.anus += 1;
			}

			App.Events.addParagraph(frag, t);
			t = [];
			return frag;
		}

		function couple() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You tell them they make a cute couple. The slaves start with surprise, since they didn't know you were watching, producing a delightful jiggle of smashed-together boob. "Thank you, ${properMaster()}," they chorus correctly, before turning back to look at each other. They take your comment quite seriously, both of them seemingly forgetting that they're in the middle of having sex to consider it. ${eventSlave.slaveName} speaks first.`);
			t.push(Spoken(eventSlave, `"I guess I never really thought about you that way,"`));
			t.push(`${he} says to the huge-boobed`);
			if (subSlave.physicalAge > 30) {
				t.push(woman2);
			} else if (subSlave.physicalAge > 18) {
				t.push(girl2);
			} else if (subSlave.physicalAge > 12) {
				t.push("teen");
			} else {
				t.push(loli2);
			}
			t.push(`trapped beneath ${him}.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${subSlave.slaveName}, who is still holding ${eventSlave.slaveName}'s buttocks, gives them a squeeze. ${Spoken(subSlave, `"Well, you silly ${girl}, what do you think about it now?"`)}`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${eventSlave.slaveName} stiffens with sudden embarrassment. "Uh, um," ${he} stammers, before saying in a rush, ${Spoken(eventSlave, `"${subSlave.slaveName}, will you go out with me?"`)}`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`${subSlave.slaveName} laughs, a pure, unclouded sound, and gives ${eventSlave.slaveName} a cute little peck on the tip of ${his} nose. ${Spoken(subSlave, `"<span class="relationship">Of course I will,</span>"`)} ${he2} purrs, and runs ${his2} hands up ${eventSlave.slaveName}'s back to hug ${him} tightly.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`The encounter becomes far more heartfelt than it was before you spoke up. ${eventSlave.slaveName}, who seems affected, says self-consciously,`);
			t.push(Spoken(eventSlave, `"Um, does this mean I get a ${girl2}friend every time I'm clumsy?"`));
			t.push(`${subSlave.slaveName} giggles and shushes ${him}. They begin to kiss earnestly while they fuck, and you leave them to it. Each of them comes to you later to <span class="devotion inc">thank you</span> for permitting them to be together.`);
			subSlave.devotion += 2;
			eventSlave.devotion += 2;
			subSlave.relationship = 3;
			subSlave.relationshipTarget = eventSlave.ID;
			eventSlave.relationship = 3;
			eventSlave.relationshipTarget = subSlave.ID;
			App.Events.addParagraph(frag, t);
			t = [];
			return frag;
		}
	}
};
