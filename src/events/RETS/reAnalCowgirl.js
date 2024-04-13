App.Events.RETSAnalCowgirl = class RETSAnalCowgirl extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 0,
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				hasAnyArms,
				canMove,
				canTalk,
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.devotion > 20,
				s => ["buttslut", "sadist", "dom"].includes(s.fetish),
				s => (s.chastityPenis !== 1 || s.dick === 0),
				s => s.rules.release.slaves === 1,
				s => s.belly < 30000,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fuckdoll === 0,
				canWalk,
				canTalk,
				s => (canSee(s) || canHear(s)),
				isSlaveAvailable,
				s => (s.devotion >= -20 && s.devotion <= 60),
				s => s.fetish !== "buttslut",
				s => (canDoAnal(s) && s.anus !== 0),
				s => s.belly < 30000,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";
		const {say, title: master} = getEnunciation(eventSlave);
		const {
			He2, he2, His2, his2, him2, girl2, himself2
		} = getPronouns(subSlave).appendSuffix("2");
		const {say: say2, title: master2} = getEnunciation(subSlave);

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");
		const canP = canPenetrate(eventSlave);
		const clitP = eventSlave.clit > 3;
		const cock = canP ? "cock" : "clit";
		let t = [];


		t.push(`As you approach your office returning from an unexpected but minor matter, you hear the unmistakable sounds of sexual congress. Reviewing your schedule as you cover the last few ${V.showInches === 2 ? "feet" : "meters"} you see that indeed,`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`is due to be inspected. It seems likely that while waiting for your return, ${he} called a fellow slave who was passing your office in to keep ${him} company. And as you enter, you see that this is true.`);
		App.Events.addParagraph(node, t);
		t= [];

		t.push(`${He}'s sitting on the end of the couch, though only ${his} legs, crotch, and ${hands} are immediately visible. This is because ${he} has`);
		t.push(contextualIntro(eventSlave, subSlave, true));
		t.push(`on top of ${him}, impaled on`);
		if (canP) {
			t.push(`${his} cock.`);
		} else if (clitP) {
			t.push(`${his} phallus-like clit.`);
		} else {
			t.push(`a strap-on ${he}'s wearing.`);
		}
		t.push(`${subSlave.slaveName} is bent`);
		if (eventSlave.belly >= 5000 && subSlave.belly >= 5000) {
			t.push(`at an awkward angle.`);
		} else {
			t.push(`almost double.`);
		}
		t.push(`${eventSlave.slaveName} has ${his} ${eventSlave.skin}`);
		if (hasBothArms(eventSlave)) {
			t.push(`hands up on the backs of ${subSlave.slaveName}'s ${subSlave.skin} knees, holding ${his2} legs`);
		} else {
			t.push(`hand up on ${subSlave.slaveName}'s ${subSlave.skin} back, forcing ${him2} to keep ${his2} legs`);
		}
		if (eventSlave.belly >= 5000) {
			t.push(`to either side of ${his}`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth/8) {
				t.push(`pregnancy,`);
			} else {
				t.push(`belly,`);
			}
			if (!hasBothArms(eventSlave)) {
				t.push(`and`);
			}
		}
		t.push(`up against ${his2}`);
		if (subSlave.boobs > 2000) {
			t.push(`inconveniently big boobs.`);
		} else {
			t.push(`shoulders.`);
		}
		t.push(`${subSlave.slaveName} is completely helpless, and ${he2}'s being fucked hard:`);
		if (canP || clitP) {
			let sizeRatio;
			if (canP) {
				sizeRatio = eventSlave.dick - subSlave.anus;
			} else {
				sizeRatio = eventSlave.clit - subSlave.anus - 2;
			}
			if (sizeRatio > 2) {
				t.push(`${eventSlave.slaveName}'s ${cock} is very big,`);
				if (subSlave.anus > 2) {
					t.push(`even for ${subSlave.slaveName}'s loose anus,`);
				} else if (subSlave.anus > 1) {
					t.push(`even for ${subSlave.slaveName}'s experienced anus,`);
				} else {
					t.push(`especially for ${subSlave.slaveName}'s tight anus,`);
				}
				t.push(`so ${eventSlave.slaveName} is bouncing ${his} anal bottom up and down only a little way, allowing ${him} to do so fast.`);
			} else if (sizeRatio > 0) {
				t.push(`${eventSlave.slaveName}'s ${cock} is a good fit for ${subSlave.slaveName}'s`);
				if (subSlave.anus > 2) {
					t.push(`loose`);
				} else if (subSlave.anus > 1) {
					t.push(`welcoming`);
				} else {
					t.push(`tight`);
				}
				t.push(`anus, so ${eventSlave.slaveName} is bouncing ${his} anal bottom up and down fast.`);
			} else {
				t.push(`${eventSlave.slaveName}'s ${cock} barely stretches ${subSlave.slaveName}'s`);
				if (subSlave.anus > 2) {
					t.push(`loose`);
				} else if (subSlave.anus > 1) {
					t.push(`welcoming`);
				} else {
					t.push(`tight`);
				}
				t.push(`anus, so ${eventSlave.slaveName} is bouncing ${his} anal bottom up and down as fast as ${he} possibly can.`);
			}
		} else {
			t.push(`${eventSlave.slaveName} is using the biggest dildo ${subSlave.slaveName}'s`);
			if (subSlave.anus > 2) {
				t.push(`loose`);
			} else if (subSlave.anus > 1) {
				t.push(`welcoming`);
			} else {
				t.push(`tight`);
			}
			t.push(`anus can handle, and ${he}'s bouncing ${his} anal bottom up and down fast.`);
		}
		t.push(`Surprisingly, the slave on top doesn't seem too unhappy with this. ${He2}'s no slavishly devoted buttslut, but`);
		if ((subSlave.chastityPenis === 1) && canAchieveErection(subSlave)) {
			t.push(`${he2}'s taking it well, and even looking a little uncomfortable as the beginnings of a hard-on press against ${his2} chastity cage.`);
		} else if (subSlave.belly >= 10000) {
			t.push(`${he2}'s taking it well,`);
			if (subSlave.bellyPreg >= 8000) {
				t.push(`though ${his2}`);
				if (subSlave.pregType > 1) {
					t.push(`children seem to be expressing their own thoughts`);
				} else {
					t.push(`child seems to be expressing its own thought`);
				}
				t.push(`as ${he2} rubs ${his2} pregnant belly.`);
			} else if (subSlave.bellyImplant >= 8000) {
				t.push(`${his2} implant rounded belly bobbing with each thrust into ${him2}.`);
			} else {
				t.push(`though looking a little uncomfortable as ${he2} soothes ${his2} ${subSlave.inflationType}-filled belly.`);
			}
		} else if (canAchieveErection(subSlave)) {
			t.push(`${his2} cock is proudly erect, sticking straight up as ${he2} reclines against ${eventSlave.slaveName} beneath ${him2}, wiggling a little with the rhythm of the pounding.`);
		} else if (subSlave.bellyFluid >= 2000) {
			t.push(`${his2} ${subSlave.inflationType}-filled belly wobbling lewdly with the motion of the pounding.`);
		} else if (subSlave.dick > 0) {
			t.push(`${he2} looks aroused, though ${his2} flopping dick can't show it.`);
		} else if (subSlave.vaginaLube > 0) {
			t.push(`${his2} cunt is gushing female lubricant as the pistoning phallus pushes against the back of ${his2} vaginal wall.`);
		} else if (subSlave.labia > 0) {
			t.push(`${his2} generous petals move gently with the motion of the pounding, and they're far from dry.`);
		} else if (subSlave.vagina === -1) {
			t.push(`${he2}'s taking it up ${his2} only hole just fine.`);
		} else {
			t.push(`${his2} cunt glistens as the pistoning phallus alternately pushes and pulls at ${his2} vaginal wall from behind.`);
		}
		t.push(`"H-h-hi-i`);
		if (subSlave.custom.title) {
			t.push(`${Spoken(subSlave, `${subSlave.custom.title},`)}"`);
		} else if (V.PC.customTitle) {
			t.push(`${Spoken(subSlave, `${V.PC.customTitle},`)}"`);
		} else if (V.PC.title !== 0) {
			t.push(`${Spoken(subSlave, `M-m-ma-a-st-t-ter,`)}"`);
		} else {
			t.push(`${Spoken(subSlave, `M-m-mi-i-is-st-r-r-e-es-s-s,`)}"`);
		}
		t.push(`${he2} ${say2}s breathlessly, doing ${his2} best to greet you properly despite the bouncing.`);
		App.Events.addParagraph(node, t);
		t= [];

		t.push(`${eventSlave.slaveName} stops thrusting, and ${his}`);
		if (eventSlave.face > 95) {
			t.push(`gorgeous`);
		} else if (eventSlave.face >= -10) {
			t.push(`pretty`);
		} else {
			t.push(`homely`);
		}
		t.push(`face instantly appears, craning out from behind ${subSlave.slaveName}'s back to see. ${Spoken(eventSlave, `"Oh, hi, ${master}!"`)} ${he} ${say}s with a cheerful smile,`);
		if (eventSlave.muscles > 30) {
			t.push(`not breathing hard at all despite bouncing a ${girl2} off ${his} crotch.`);
		} else if (eventSlave.muscles > 5) {
			t.push(`barely out of breath despite the effort.`);
		} else {
			t.push(`completely out of breath.`);
		}
		t.push(Spoken(eventSlave, `"I ${canSee(eventSlave) ? "saw" : "heard"} ${him2} going by, and I thought ${he2}'d look cute with ${canP ? "my dick" : (clitP ? "my clit" : "a strap-on")} up ${his2} butthole, so I ${V.universalRulesConsent === 0 ? `told ${him2} to get in here and take it.` : `asked ${him2} to get in here and ${he2} did!`}"`));
		t.push(`${He} shrugs.`);
		if (eventSlave.fetish === "sadist") {
			t.push(Spoken(eventSlave, `"I thought ${he2} was going to whine and struggle, but ${he2}'s kinda disappointing."`));
		} else if (eventSlave.fetish === "pregnancy" && subSlave.belly >= 10000) {
			if (subSlave.bellyPreg >= 8000) {
				t.push(Spoken(eventSlave, `"${He2} was so pregnant, I just had to fuck ${him2}. I'm surprised ${he2}'s enjoying it so much."`));
			} else {
				t.push(Spoken(eventSlave, `"${His2} belly's so round, I just had to fuck ${him2}. I just wish ${he2} was pregnant."`));
			}
		} else if (eventSlave.fetish === "buttslut") {
			t.push(Spoken(eventSlave, `"I like buttsex so much, it's good to give back."`));
		} else {
			t.push(Spoken(eventSlave, `"I thought ${he2} was going to be unhappy about it, but ${he2}'s actually taking it really well."`));
		}
		t.push(`${He} clearly held off on climaxing in case you wanted ${his} libido undiminished for the inspection, and is obediently waiting for your orders, with the bemused ${subSlave.slaveName} perched motionless atop ${him}.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Make sure ${he} looks after ${his} bottom`, bottom),
			new App.Events.Result("Dominate the slave on top", dominate),
		]);


		function bottom() {
			t = [];

			t.push(`You tell ${him} you'll inspect ${him} after ${he}'s done, but add that ${subSlave.slaveName} is clearly being a very good little anal slut, and ${he2} deserves to be rewarded.`);
			t.push(`${canHear(subSlave) ? "Hearing" : "Learning"} this, ${subSlave.slaveName} <span class="hotpink">looks at you very gratefully,</span> and mouths a quiet thanks.`);
			t.push(Spoken(subSlave, `"Yes, ${master2}!"`));
			t.push(`comes the response. ${eventSlave.slaveName} shifts ${his} bitch to one side, and cranes ${his} head upward to make out with the compliant slave. ${subSlave.slaveName} kisses ${him} back with gusto, surprising ${eventSlave.slaveName} again. ${He} recoils in shock at how much tongue ${subSlave.slaveName} gives ${him}, but moans aggressively and gets ${his} revenge by dropping one of ${subSlave.slaveName}'s knees and`);
			if (subSlave.chastityPenis) {
				t.push(`playing with one of ${his2} nipples.`);
			} else if (canAchieveErection(subSlave)) {
				t.push(`jacking ${him2} off.`);
			} else if (subSlave.dick > 0) {
				t.push(`playing with ${his2} soft cock.`);
			} else if (subSlave.clit > 2) {
				t.push(`rubbing ${his2} ridiculous clit.`);
			} else if (subSlave.labia > 0) {
				t.push(`fingering ${his2} glorious labia.`);
			} else if (subSlave.vagina === -1) {
				t.push(`fingering ${his2} anus.`);
			} else {
				t.push(`fingering ${his2} clit.`);
			}
			t.push(`Jerking at the stimulation, ${subSlave.slaveName} urges ${his2} butt down against ${eventSlave.slaveName}'s hips, physically begging for a resumption of the sodomy. ${eventSlave.slaveName} applies ${himself}, forcing a growing whine out of ${subSlave.slaveName} as ${his2} asspussy is mercilessly fucked.`);
			if (subSlave.chastityPenis) {
				t.push(`${His2} chastity cage prevents ${him2} from orgasming, but when ${eventSlave.slaveName} climaxes and lets ${him2} up,`);
			} else if (canAchieveErection(subSlave)) {
				t.push(`${He2} cums all over ${his2} own`);
				if (subSlave.belly >= 5000) {
					if (subSlave.bellyPreg >= 3000) {
						t.push(`pregnant`);
					} else {
						t.push(`rounded`);
					}
				} else {
					t.push(`chest and`);
				}
				t.push(`belly, the droplets of semen oozing down ${him2} as ${eventSlave.slaveName} reaches ${his} own climax. When ${eventSlave.slaveName} lets ${him2} up,`);
			} else if (subSlave.vagina === -1) {
				t.push(`${He2} cums weakly, the droplets of watery ejaculate running down ${him2} as ${eventSlave.slaveName} reaches ${his} own climax. When ${eventSlave.slaveName} lets ${him2} up,`);
			} else if (subSlave.vaginaLube > 0) {
				t.push(`${He2} orgasms powerfully, femcum squirting out of ${his2} pussy as ${eventSlave.slaveName} reaches ${his} own climax. When ${eventSlave.slaveName} lets ${him2} up,`);
			} else {
				t.push(`${He2} orgasms powerfully, ${his2} abs tightening. When ${eventSlave.slaveName} lets ${him2} up,`);
			}
			t.push(`${he2} looks pleased with ${himself2}, and <span class="mediumaquamarine">a little more confident,</span> too.`);
			subSlave.devotion += 2;
			subSlave.trust += 2;
			seX(subSlave, "anal", eventSlave, "penetrative");
			if (canImpreg(subSlave, eventSlave)) {
				knockMeUp(subSlave, 5, 1, eventSlave.ID);
			}
			return t;
		}
		function dominate() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You make no reply, but`);
			if (V.PC.dick !== 0) {
				t.push(`advance on the couch, stripping down to reveal a raging erection.`);
				if (V.PC.vagina !== -1) {
					t.push(`and ready cunt.`);
				}
			} else {
				t.push(`move to a side table, selecting a formidable strap-on.`);
			}
			if (canSee(eventSlave)) {
				t.push(`Seeing`);
			} else {
				t.push(`Hearing`);
			}
			t.push(`this, ${eventSlave.slaveName} <span class="hotpink">giggles with anticipation,</span> and pulls`);
			if (hasBothArms(eventSlave)) {
				t.push(`${subSlave.slaveName}'s knees back farther.`);
			} else {
				t.push(`${subSlave.slaveName} even closer.`);
			}
			t.push(`The slave whines at the stretch, and then gasps as the invading phallus pops free of ${his2} asshole. ${His2} anus`);
			if (subSlave.anus > 2) {
				t.push(`gapes lewdly, its sphincter so well stretched that it stays invitingly open,`);
			} else if (subSlave.anus > 1) {
				t.push(`gapes slightly, its sphincter remaining just barely open,`);
			} else {
				t.push(`closes up again immediately once it's no longer being penetrated. Its rosebud is`);
			}
			if (canP) {
				t.push(`glistening with lube and precum from ${eventSlave.slaveName}'s cock`);
			} else {
				t.push("glistening with lube.");
			}
			t.push(`But you decide to be more circumspect. Pressing your`);
			if (V.PC.dick !== 0) {
				t.push(`dickhead`);
			} else {
				t.push(`phallus`);
			}
			t.push(`into ${subSlave.slaveName}'s mouth, you tell ${him2} to be thorough with ${his2}`);
			if (V.PC.vagina !== -1) {
				t.push(`saliva and not to worry about your pussy.`);
			} else {
				t.push("saliva.");
			}
			t.push(`${His2} eyes widen at the implication, and ${he2} starts to suck lushly.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`Suddenly, ${he2} jerks and squeals into your`);
			if (V.PC.dick !== 0) {
				t.push(`dick.`);
			} else {
				t.push(`crotch.`);
			}
			t.push(`With you standing there, ${eventSlave.slaveName} can't really`);
			if (canSee(eventSlave)) {
				t.push(`see much,`);
			} else {
				t.push(`feel around down there,`);
			}
			t.push(`and ${he} can't`);
			if (hasBothArms(eventSlave)) {
				t.push(`drop ${subSlave.slaveName}'s legs`);
			} else {
				t.push(`relax ${his} grip on ${subSlave.slaveName}`);
			}
			t.push(`without throwing everything into confusion. So, ${he}'s reduced to blind jabs to get ${his}`);
			if (canP) {
				t.push(`cock`);
			} else if (clitP) {
				t.push(`clit`);
			} else {
				t.push(`strap-on`);
			}
			t.push(`back up the poor slave's butt. It takes ${him} quite a while to manage it, and when ${he}'s finally seated, ${subSlave.slaveName} gives as huge a sigh as ${he2} can manage with a phallus down ${his2} throat. ${His2} relief is short lived, however, because soon afterward, you withdraw, leaving a string of spit between ${his2} wet lips and the`);
			if (V.PC.dick !== 0) {
				t.push(`head of your turgid cock.`);
			} else {
				t.push(`massive head of your strap-on.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];
			if (canDoVaginal(subSlave) && subSlave.vagina > 0) {
				t.push(`With ${eventSlave.slaveName} occupying ${subSlave.slaveName}'s rear hole, your next step is obvious to everyone involved, and ${he2} groans with fullness as ${he2} feels ${his2} cunt accommodate you. ${eventSlave.slaveName} matches ${his} rhythm to yours, and`);
				if (canP || clitP) {
					t.push(`orgasms promptly, since ${he}'s less accustomed than you are to the delectable sensation of a ${girl2} tightened by a phallus in ${his2} other hole.`);
				} else {
					t.push(`climaxes quickly despite having no sensation in ${his} fake dick, since ${he} finds the situation so arousing.`);
				}
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 5, 0, -1);
				}
				if (canP && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
				seX(subSlave, "vaginal", V.PC, "penetrative");
			} else if (subSlave.anus > 2) {
				t.push(`${subSlave.slaveName}'s rear hole is such a loose slit that double anal shouldn't be too much trouble for ${him2}. It isn't, though ${his2} breath definitely quickens as ${he2} feels a second rod push its way past ${his2} stretched sphincter. ${eventSlave.slaveName}`);
				if (canP || clitP) {
					t.push(`orgasms promptly, unable to prolong sex when ${he}'s feeling ${his} ${cock} slide against you inside another slave's anus.`);
				} else {
					t.push(`climaxes quickly despite having no sensation in ${his} fake dick, since ${he} finds the situation so arousing.`);
				}
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 5, 1, -1);
				}
				if (canP && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
				seX(subSlave, "anal", V.PC, "penetrative");
			} else {
				t.push(`${subSlave.slaveName}'s rear hole is a bit tight for double anal, and ${he2}'s already quite dominated; you mean to use ${him2} thoroughly, not destroy ${him2}. So, you and ${eventSlave.slaveName} switch off: you use ${subSlave.slaveName}'s butt while ${eventSlave.slaveName} pins ${him2} for you, and then you go back to ${subSlave.slaveName}'s mouth for a while and let ${eventSlave.slaveName} take over sodomizing duties. ${He}`);
				if (canP || clitP) {
					t.push(`orgasms promptly, since ${he} finds a hole warm from your use very hot.`);
				} else {
					t.push(`climaxes quickly despite having no sensation in ${his} fake dick, since ${he} finds the situation so arousing.`);
				}
				if (canImpreg(subSlave, V.PC)) {
					knockMeUp(subSlave, 5, 1, -1);
				}
				if (canP && canImpreg(subSlave, eventSlave)) {
					knockMeUp(subSlave, 5, 1, eventSlave.ID);
				}
				seX(subSlave, "anal", V.PC, "penetrative");
			}
			t.push(`When ${subSlave.slaveName} has stumbled off to the shower, ${eventSlave.slaveName} presents ${himself} for inspection, smelling of sex and <span class="mediumaquamarine">smiling trustingly.</span>`);
			eventSlave.devotion += 2;
			eventSlave.trust += 2;
			seX(subSlave, "anal", eventSlave, "penetrative");
			App.Events.addParagraph(frag, t);
			return frag;
		}
	}
};
