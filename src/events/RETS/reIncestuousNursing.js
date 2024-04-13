App.Events.RETSIncestuousNursing = class RETSIncestuousNursing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.seeIncest === 1,
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.daughters > 0,
				hasBothArms,
				canMove,
				canTalk,
				canHear,
				s => s.devotion > 20,
				s => s.sexualQuirk === "perverted" || s.energy > 80,
				s => s.belly < 100000,
				s => s.lactation > 0,
				s => s.boobsImplant / s.boobs < .60,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				isSlaveAvailable,
				hasAnyArms,
				canTalk,
				canHear,
				s => s.mother === this.actors[0] || s.father === this.actors[0],
				s => App.Utils.sexAllowedByID(s, this.actors[0])
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: master, say} = getEnunciation(eventSlave);
		const {
			him2, his2, he2, He2, daughter2, himself2
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		let meal = jsEither(["breakfast", "lunch", "dinner"]);
		const {mother, mommy} = subSlave.mother === eventSlave.ID ? {mother: "mother", mommy: "Mommy"} : {mother: "father", mommy: "Daddy"};
		let t = [];

		if (meal === "breakfast") {
			t.push(`At the beginning of`);
		} else if (meal === "lunch") {
			t.push(`At the midpoint of`);
		} else {
			t.push(`Near the end of`);
		}
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, subSlave, true), `'s scheduled day, you come across ${him2} curled up in ${his2} ${mother}`));
		t.push(App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(eventSlave), `'s lap, face buried in ${his} bosom. ${eventSlave.slaveName} is running a gentle hand`));
		if (eventSlave.hLength > 5) {
			t.push(`through ${subSlave.slaveName}'s hair,`);
		} else {
			t.push(`across ${subSlave.slaveName}'s scalp,`);
		}
		t.push(`and is softly ${say}ing something to ${him2}. As you approach, you catch the end of it.`);
		if (eventSlave.genes === "XX" && subSlave.tankBaby < 1) {
			t.push(Spoken(eventSlave, `"I missed doing this for you so much,"`), `${he} murmurs.`, Spoken(eventSlave, `"It's so nice to do it again."`));
		} else if (eventSlave.genes === "XY") {
			t.push(Spoken(eventSlave, `"This feels so good,"`), `${he} murmurs.`, Spoken(eventSlave, `"I could get used to this."`));
		} else {
			t.push(Spoken(eventSlave, `"I never got to do this for you when you were a baby,"`), `${he} murmurs.`, Spoken(eventSlave, `"It's so nice to do it now."`));
		}
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${subSlave.slaveName} is nursing, lustily sucking at one of ${eventSlave.slaveName}'s breasts, ${his2} ${subSlave.skin} throat bobbing as ${he2} swallows gulp after gulp of ${his2} ${mother}'s ${milkFlavor(eventSlave)}milk.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} shifts a little, and giggles.`);
		if (eventSlave.genes === "XX" && subSlave.tankBaby < 1) {
			t.push(Spoken(eventSlave, `"Of course it's a little bit different now. Ooh,`));
		} else if (eventSlave.genes === "XY") {
			t.push(Spoken(eventSlave, `"And it's even more fun when you do that too. Ooh,`));
		} else {
			t.push(Spoken(eventSlave, `"And it's even more fun since we're doing it now. Ooh,`));
		}
		let hands = "anus";
		if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0) {
			t.push(Spoken(eventSlave, `harder, sweetie."`), `${subSlave.slaveName}'s ${hasBothArms(subSlave) ? "hands aren't" : "hand isn't"} visible, but ${his} lewd movements make it obvious that ${he2}'s`);
			if (canAchieveErection(eventSlave)) {
				t.push(`giving ${his2} ${mother} a handjob`);
			} else {
				t.push(`playing with ${his2} ${mother}'s limp dick`);
			}
			actX(eventSlave, "penetrative");
			hands = "dick";
		} else if (canDoVaginal(eventSlave)) {
			t.push(Spoken(eventSlave, `deeper, sweetie."`), `${subSlave.slaveName}'s ${hasBothArms(subSlave) ? "hands aren't" : "hand isn't"} visible, but ${he}'s obviously using`);
			if (eventSlave.vagina > 2) {
				t.push(`a fist to fuck ${his} ${mother}'s loose pussy`);
			} else if (eventSlave.vagina > 1) {
				t.push(`a couple of fingers to pleasure ${his} ${mother}'s pussy`);
			} else {
				t.push(`a finger to pleasure ${his} ${mother}'s tight pussy`);
			}
			seX(subSlave, "penetrative", eventSlave, "vaginal");
			hands = "vagina";
		} else if (canDoAnal(eventSlave)) {
			t.push(Spoken(eventSlave, `deeper, sweetie."`), `${subSlave.slaveName}'s ${hasBothArms(subSlave) ? "hands aren't" : "hand isn't"} visible, but ${he} obviously has`);
			if (eventSlave.anus > 2) {
				t.push(`a fist up ${his} ${mother}'s huge asspussy`);
			} else if (eventSlave.anus > 1) {
				t.push(`a couple of fingers up ${his} ${mother}'s butt`);
			} else {
				t.push(`a finger up ${his} ${mother}'s tight ass`);
			}
			seX(subSlave, "penetrative", eventSlave, "anal");
		} else {
			t.push(Spoken(eventSlave, `just like that, sweetie."`), `${subSlave.slaveName}'s ${hasBothArms(subSlave) ? "hands aren't" : "hand isn't"} visible, but it's obvious ${he}'s using`);
			if (hasBothArms(subSlave)) {
				t.push(`them`);
			} else {
				t.push(`it`);
			}
			t.push(`to manually pleasure ${his} ${mother}`);
		}
		t.push(`while ${he2} nurses. ${eventSlave.slaveName} notices you first, of course, and`);
		if (canSee(eventSlave)) {
			t.push(`looks up at`);
		} else {
			t.push(`turns to`);
		}
		t.push(`you complacently.`, Spoken(eventSlave, `"Hi, ${master},"`), `${he} ${say}s quietly, ${his}`);
		if (eventSlave.voice > 2) {
			t.push(`bimbo's`);
		} else if (eventSlave.voice > 1) {
			t.push(`pretty`);
		} else {
			t.push(`deep`);
		}
		t.push(`voice thick with arousal.`);
		if (subSlave.dietMilk) {
			t.push(Spoken(eventSlave, `"I'm feeding my ${daughter2} ${his2} ${meal},"`));
		} else if (subSlave.sexualQuirk === "perverted") {
			t.push(Spoken(eventSlave, `"${He2}'s such a fun little pervert,"`));
		} else if (eventSlave.sexualQuirk === "perverted") {
			t.push(Spoken(eventSlave, `"It's perverted of me to enjoy this, but I can't help it,"`));
		} else if (eventSlave.relationship > 2 && eventSlave.relationshipTarget === subSlave.ID) {
			t.push(Spoken(eventSlave, `"Since we're already together, this feels natural,"`));
		} else {
			t.push(Spoken(eventSlave, `"I know milk isn't a big part of my ${daughter2}'s diet, but this is mostly for fun,"`));
		}
		t.push(`${he} adds impishly.`);
		if (canHear(subSlave)) {
			t.push(`Hearing this,`);
		} else {
			t.push(`Realizing your presence,`);
		}
		t.push(`${subSlave.slaveName} lets the breast pop free of ${his2}`);
		if (subSlave.lips > 95) {
			t.push(`facepussy`);
		} else if (subSlave.lipsImplant > 0) {
			t.push(`fake lips`);
		} else if (subSlave.lips > 20) {
			t.push(`big lips`);
		} else {
			t.push(`mouth`);
		}
		t.push(`so ${he2} can turn around and greet you too, but ${he2} hurries back to the nipple afterward, and doesn't stop stimulating ${his2} ${mother} for a moment.`);
		if (eventSlave.lactation > 0) {
			eventSlave.lactationDuration = 2;
			eventSlave.boobs -= eventSlave.boobsMilk;
			eventSlave.boobsMilk = 0;
		}

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("That looks delicious", delicious),
			((eventSlave.relationship <= 3 && eventSlave.relationship >= 0) && (subSlave.relationship <= 4 && subSlave.relationship >= 0) && (canTalk(subSlave)))
				? new App.Events.Result("This is clearly a basis for a relationship", relationship)
				: new App.Events.Result(),
			new App.Events.Result("Shame them", shame),
		]);

		function delicious() {
			const frag = document.createDocumentFragment();
			t = [];
			t.push(`The motherly ${SlaveTitle(eventSlave)}'s breast milk looks delicious. ${He}'s lactating`);
			if (eventSlave.lactation > 1) {
				t.push(`so unnaturally that each jiggle transmitted to ${his} unoccupied breast by ${subSlave.slaveName}'s nursing produces a spurt from the free nipple.`);
			} else {
				t.push(`naturally, but in such healthy profusion that a milky stream is running down ${his} unoccupied breast.`);
			}
			t.push(`You get down beside ${subSlave.slaveName} and start nursing too.`);
			t.push(Spoken(eventSlave, `"Oh, ${master},"`), `gasps ${eventSlave.slaveName}, as much from surprise as from the additional stimulation. Then ${he} sighs contentedly, and goes back to petting ${subSlave.slaveName}'s head. ${He} picks up ${his} other hand and hesitates, not sure whether ${he} should stroke ${his} owner's hair, but you take ${his} hand in yours and place it on the back of your head. There's a <span class="trust inc">sharp intake of breath</span> in the chest behind the breast you're nursing from, and ${he} strokes your head with a motherly caress, gently holding you against ${his} milky tit as you drain it of its cream.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${subSlave.slaveName} <span class="trust inc">reaches out to touch you, too,</span> and before long you and ${subSlave.slaveName} are sharing ${eventSlave.slaveName}'s loving lap. By the time you and ${subSlave.slaveName} have drunk your fill, all three of you have climaxed at least once.`);
			if (subSlave.balls) {
				if (V.PC.balls) {
					t.push(`Both you and ${subSlave.slaveName} blew your loads all over ${eventSlave.slaveName}'s`);
					if (eventSlave.belly >= 5000) {
						t.push(`lap and underbelly,`);
					} else {
						t.push("lap,");
					}
					t.push(`making quite a mess. ${subSlave.slaveName}`);
					if (subSlave.fetish === "cumslut") {
						t.push(`greedily`);
					} else {
						t.push(`dutifully`);
					}
					t.push(`licks it all up, sparing so much oral attention for ${his2} ${mother}'s`);
					if (canAchieveErection(eventSlave)) {
						t.push(`softening`);
						seX(subSlave, "oral", eventSlave, "penetrative");
					} else if (eventSlave.dick > 0) {
						t.push(`soft cock`);
						seX(subSlave, "oral", eventSlave, "penetrative");
					} else {
						t.push(`pussy`);
						seX(subSlave, "oral", eventSlave, "vaginal");
					}
					t.push(`that ${he} orgasms yet again, moaning ${his} ${daughter2}'s name.`);
				} else {
					t.push(subSlave.slaveName);
					if (canAchieveErection(subSlave)) {
						t.push(`blew ${his2} load all over`);
					} else {
						t.push(`leaked ${his2} cum out onto`);
					}
					t.push(`${his2} ${mother}'s lap`);
					if (eventSlave.belly >= 5000) {
						t.push(`and underbelly`);
					}
					t.push(t.pop() + ";");
					t.push(`as ${he} heads off to shower, ${eventSlave.slaveName} scoops it off ${himself}`);
					if (eventSlave.fetish === "cumslut") {
						t.push(`and greedily sucks it down.`);
					} else {
						t.push(`and licks it off ${his} fingers.`);
					}
				}
			} else if (subSlave.lactation) {
				const bellyAdj = bellyAdjective(eventSlave);
				t.push(`${subSlave.slaveName}'s own breasts responded to all the stimulation by leaking all over ${eventSlave.slaveName}'s `);
				if (eventSlave.belly >= 5000) {
					t.push(`${bellyAdj}`);
					if (eventSlave.bellyPreg >= 3000) {
						t.push(`pregnant`);
					}
				}
				t.push(`belly; as ${he} heads off to shower, ${eventSlave.slaveName} laughingly chides ${subSlave.slaveName} for making such a milky mess of ${his2} own ${mother}.`);
			}
			eventSlave.trust += 3;
			subSlave.trust += 3;
			seX(subSlave, "oral", eventSlave, "mammary");
			App.Events.addParagraph(frag, t);
			frag.append(App.Events.eventFetish(eventSlave, "boobs"));
			frag.append(App.Events.eventFetish(subSlave, "boobs"));
			return frag;
		}


		function relationship() {
			const frag = document.createDocumentFragment();
			t = [];
			t.push(`Deciding that this should be encouraged, you praise ${eventSlave.slaveName} for ${his} close relationship to ${his} ${daughter2}.`, Spoken(eventSlave, `"Thank you, ${master},"`), `${he} ${say}s.`);
			t.push(Spoken(eventSlave, `"I try to be the best`));
			if (subSlave.mother === eventSlave.ID) {
				t.push(`mom`);
			} else {
				t.push(`dad`);
			}
			t.push(`I can." ${He} bends and kisses the top of ${subSlave.slaveName}'s head.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(subSlave.slaveName);
			if (eventSlave.nipples !== "fuckable") {
				t.push(`lets the nipple pop free of`);
			} else {
				t.push(`releases the nipple from`);
			}
			t.push(`${his2} mouth and looks up at ${eventSlave.slaveName}.`, Spoken(subSlave, `"That's silly, ${mommy}," ${he2} scolds, using an exaggeratedly whiny tone.`));
			if (eventSlave.dick > 0 && eventSlave.chastityPenis === 0) {
				t.push(Spoken(subSlave, `"I'm jerking you off,`));
			} else if (canDoVaginal(eventSlave)) {
				t.push(Spoken(subSlave, `"I'm fingerbanging you,`));
			} else if (canDoAnal(eventSlave)) {
				t.push(Spoken(subSlave, `"I'm fingerfucking your butthole,`));
			} else {
				t.push(Spoken(subSlave, `"I'm giving you a handjob,`));
			}
			t.push(`and you're totally enjoying it!" ${He2} sticks out ${his2} tongue, and does something with ${his2} hand that makes ${eventSlave.slaveName} shudder helplessly.`);
			t.push(Spoken(subSlave, `"Admit it, you're basically my fuckbuddy, or even my ${girl}friend!"`));
			App.Events.addParagraph(frag, t);
			t = [];

			if (subSlave.sexualQuirk === "perverted") {
				t.push(Spoken(eventSlave, `"You're one t-to t-talk, you little perv,"`), `${he} gasps.`);
			} else if (eventSlave.sexualQuirk === "perverted") {
				t.push(Spoken(eventSlave, `"I c-can't h-help it,"`), `${he} gasps.`, Spoken(eventSlave, `"You're so h-hot, sweetie. I d-dream about you."`));
			} else {
				t.push(Spoken(eventSlave, `"W-we're f-fuckslaves, sweetie,"`), `${he} gasps.`, Spoken(eventSlave, `"I h-have to."`));
			}
			t.push(`${He} pulls ${himself} together and continues.`, Spoken(eventSlave, `"And I think we're going t-to be b-both. Both ${mother} and ${daughter2}, and lovers."`));
			t.push(`${He} pulls ${subSlave.slaveName} up into an embrace and kisses ${him2} hungrily. "My pretty little ${mother} lover." ${subSlave.slaveName} <span class="devotion inc">giggles and kisses</span> ${eventSlave.slaveName} back. The older slave is suffused with lust, any lingering shriek of revulsion inside ${his} head <span class="devotion inc">drowned out</span> by`);
			if (eventSlave.sexualQuirk === "perverted") {
				t.push(`sexual perversion.`);
			} else {
				t.push(`the urge to satisfy ${his} needs.`);
			}
			t.push(`"Come here," ${he} moans,`);
			if (eventSlave.fetishKnown) {
				switch (eventSlave.fetish) {
					case "submissive":
						t.push(Spoken(eventSlave, `"and do whatever you want with me. Use me, sweetie."`));
						SimpleSexAct.Slaves(eventSlave, subSlave, 1);
						break;
					case "cumslut":
						t.push(Spoken(eventSlave, `"let ${mommy}`));
						if (canDoVaginal(subSlave)) {
							t.push(`eat you out."`);
							seX(subSlave, "vaginal", eventSlave, "oral");
						} else if (subSlave.dick > 0 && subSlave.chastityPenis === 0) {
							t.push(Spoken(eventSlave, `suck your dick."`));
							seX(subSlave, "penetrative", eventSlave, "oral");
						} else {
							t.push(Spoken(eventSlave, `kiss you."`));
						}
						break;
					case "humiliation":
						t.push(Spoken(eventSlave, `"let's do it right here. I want all the other slaves to know what an incestuous old slut I am."`));
						SimpleSexAct.Slaves(eventSlave, subSlave, 1);
						break;
					case "buttslut":
						if (canPenetrate(subSlave)) {
							t.push(Spoken(eventSlave, `"and stick that beautiful cock up ${mommy}'s butt."`));
						} else {
							t.push(Spoken(eventSlave, `"fuck ${mommy}'s butt."`));
						}
						seX(eventSlave, "anal", subSlave, "penetrative");
						if (canPenetrate(subSlave) && canImpreg(eventSlave, subSlave)) {
							knockMeUp(eventSlave, 5, 1, subSlave.ID);
						}
						break;
					case "boobs":
						t.push(Spoken(eventSlave, `suck ${mommy}'s tits dry. Massage my boobs with your hands while you nurse, that's all I need."`));
						seX(subSlave, "oral", eventSlave, "mammary");
						break;
					case "sadist":
						t.push(Spoken(eventSlave, `"let ${mommy} rape you. Come on, struggle for me."`));
						SimpleSexAct.Slaves(subSlave, eventSlave, 1);
						break;
					case "masochist":
						t.push(Spoken(eventSlave, `"and do whatever you want with me. Just, just, you have to hurt me. Rape me, sweetie."`));
						SimpleSexAct.Slaves(eventSlave, subSlave, 1);
						break;
					case "dom":
						t.push(Spoken(eventSlave, `"be ${mommy}'s little bitch. Come on, sweetie, relax. It'll be easier."`));
						SimpleSexAct.Slaves(subSlave, eventSlave, 1);
						break;
					case "pregnancy":
						if (canDoVaginal(eventSlave) && canPenetrate(subSlave) && eventSlave.mpreg === 0) {
							t.push(Spoken(eventSlave, `"fill my pussy with your cum. Make a sister for yourself."`));
							seX(subSlave, "penetrative", eventSlave, "vaginal");
							if (canImpreg(eventSlave, subSlave)) {
								knockMeUp(eventSlave, 5, 0, subSlave.ID);
							}
						} else if (canDoAnal(eventSlave) && canPenetrate(subSlave) && eventSlave.mpreg === 1) {
							t.push(Spoken(eventSlave, `"fill my ass with your cum. I know it seems wrong, but that's where my babies come from. So please, make a sister for yourself."`));
							seX(eventSlave, "anal", subSlave, "penetrative");
							if (canImpreg(eventSlave, subSlave)) {
								knockMeUp(eventSlave, 5, 1, subSlave.ID);
							}
						} else if (eventSlave.pregKnown === 1) {
							t.push(Spoken(eventSlave, `"and keep doing that. Just, just touch my belly, too.`));
							if (eventSlave.preg > eventSlave.pregData.minLiveBirth) {
								t.push(Spoken(eventSlave, `You're going to have a sister soon."`));
							} else if (eventSlave.belly >= 10000) {
								t.push(Spoken(eventSlave, `Your ${eventSlave.pregType > 1 ? "sisters are" : "sister is"} kicking away, say hello to your family."`));
							} else if (eventSlave.belly >= 5000) {
								t.push(Spoken(eventSlave, `I'm getting pretty big with your new ${eventSlave.pregType > 1 ? "sisters" : "sister"}, aren't I"`));
							} else if (eventSlave.belly >= 1500) {
								t.push(Spoken(eventSlave, `Can you feel that swell? It's your new ${eventSlave.pregType > 1 ? "sisters" : "sister"}."`));
							} else if (eventSlave.belly >= 100) {
								t.push(Spoken(eventSlave, `Can you feel that swelling? It's your new ${eventSlave.pregType > 1 ? "sisters" : "sister"}.`));
							} else {
								t.push(Spoken(eventSlave, `I know you can't tell, but your ${eventSlave.pregType > 1 ? "sisters" : "sister"} are growing in there."`));
							}
						} else {
							t.push(Spoken(eventSlave, `"make love to me. Maybe someday I'll be able to give you a sister."`));
							SimpleSexAct.Slaves(eventSlave, subSlave, 1);
						}
						break;
					default:
						t.push(Spoken(eventSlave, `"${mother}fucker."`));
						SimpleSexAct.Slaves(eventSlave, subSlave, 1);
				}
			} else {
				t.push(Spoken(eventSlave, `"${mother}fucker."`));
				SimpleSexAct.Slaves(eventSlave, subSlave, 1);
			}
			eventSlave.devotion += 5;
			subSlave.devotion += 5;
			eventSlave.relationship = 4;
			subSlave.relationship = 4;
			eventSlave.relationshipTarget = subSlave.ID;
			subSlave.relationshipTarget = eventSlave.ID;

			App.Events.addParagraph(frag, t);
			return frag;
		}

		function shame() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`${eventSlave.slaveName} and ${subSlave.slaveName} are properly trained sex slaves, and you wonder whether they still understand exactly how perverted it is to, respectively, nurse one's adult child while getting masturbated by ${him2}, and drink one's ${mother}'s ${milkFlavor(eventSlave)}milk while playing with ${his} private parts. So, you decide to explain it to them. You start with ${eventSlave.slaveName}, cuttingly asking whether ${he} understands that ${his} relationship with ${his} ${daughter2} is irrevocably polluted by incest.`);
			if (eventSlave.fetish === "humiliation") {
				if (eventSlave.fetishKnown) {
					t.push(`Getting ${his} nipples sucked on and ${his} ${hands} played with by ${his} own ${daughter2} out in the open already had the humiliation slut's cheeks flaming with shame and arousal, and your words are so deliciously crushing that ${he} gasps once, twice, and then, on ${his} ${daughter2}'s next stroke with ${his2} hand, climaxes, crying with <span class="devotion inc">abject overstimulation.</span>`);
					eventSlave.devotion += 3;
					if (eventSlave.fetishStrength <= 95) {
						t.push(`This is some of the strongest sexual humiliation ${he}'s ever experienced, and ${he} <span class="fetish inc">only wants more.</span>`);
						eventSlave.fetishStrength += 5;
					}
				} else {
					t.push(`${He} begins to cry, strangely, choking and gagging on ${his} tears. Something is troubling ${him} even more than you expected, and it soon becomes obvious what it is: ${he}'s getting off on being taunted this way. ${subSlave.slaveName} hesitates, but ${his2} ${mother} begs ${him2} to keep playing with ${his} hands, sobbing all the while, until ${he} finally climaxes. ${He}'s a <span class="fetish gain">humiliation fetishist,</span> and <span class="devotion inc">all the more devoted</span> to you now that ${he} knows what a slut for degradation ${he} really is.`);
					eventSlave.fetishKnown = 1;
					eventSlave.devotion += 5;
				}
			} else {
				t.push(`${He} starts, thinks for a moment, and then begins to cry, tears running down ${his} ${eventSlave.skin} cheeks and pattering onto ${subSlave.slaveName}'s head. Doubtful, ${subSlave.slaveName} slows ${his2} heavy petting, but you order ${him2} to keep doing it, making ${eventSlave.slaveName} sob harder. ${He}'s <span class="trust dec">terrified</span> at what ${he}'s become, and <span class="devotion inc ">convinced</span> ${he}'s lost to sexual slavery forever. ${He} wails as ${he} climaxes, very much against ${his} will.`);
				eventSlave.trust -= 3;
				eventSlave.devotion += 3;
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${subSlave.slaveName} is left in the crying ${eventSlave.slaveName}'s lap, with ${his2} ${mother}'s`);
			if (hands === "dick") {
				t.push(`cum all over ${his2} hands.`);
			} else if (hands === "vagina") {
				t.push(`pussyjuice all over ${his2} hands.`);
			} else {
				t.push(`anal sphincter squeezing ${his2} fingers as ${his} orgasm fades.`);
			}
			if (subSlave.fetish === "humiliation") {
				t.push(`You don't even have to explicitly shame ${him2}.`);
				if (eventSlave.fetishKnown) {
					t.push(`${He2} keeps drinking from ${his2} weeping ${mother}'s tits, ${his2} cheeks flaming red with lust and arousal. The humiliation slut shivers, <span class="devotion inc">extremely aware</span> of your eyes on ${his2} naked back.`);
					subSlave.devotion += 3;
					if (subSlave.fetishStrength <= 95) {
						t.push(`${He2}'s crying too, some remaining sense of self control screaming at ${him2} on the inside, but ${he2} visibly stamps on it, <span class="fetish inc">giving ${himself2} up to the shame.</span>`);
						subSlave.fetishStrength += 5;
					}
				} else {
					t.push(`${He2}'s more affected by all this than even you expected. It seems ${he2}'s a <span class="fetish gain">humiliation fetishist,</span> and ${he2} buries ${his2} face in ${his2} ${mother}'s boobs, shaking with arousal and shame, goosebumps springing up across ${his2} skin as ${he2} focuses on ${his2} <span class="devotion inc">new feelings.</span>`);
					subSlave.fetishKnown = 1;
					subSlave.devotion += 5;
				}
			} else {
				t.push(`You ask ${him2} if ${he2} knows what ${he2}'s just done, rhetorically, and then helpfully explain that it's a little weird to nurse at age ${subSlave.actualAge}, and bit perverted to play with ${his2} ${mother}'s hands. ${subSlave.slaveName} hangs ${his2} head, and then makes to bury it in ${his2} weeping ${mother}'s heaving breasts to hide ${his2} face in shame, but stops when ${he2} realizes what ${he2}'s doing. ${He2}'s <span class="trust dec">scared,</span> unable to find anything ${he2} can do to make this better, and <span class="devotion inc">takes refuge</span> in your merciful orders to go clean ${himself2} up.`);
				subSlave.trust -= 3;
				subSlave.devotion += 3;
			}
			App.Events.addParagraph(frag, t);
			return frag;
		}
	}
};
