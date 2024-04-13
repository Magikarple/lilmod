App.Events.RETSTopExhaustion = class RETSTopExhaustion extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.belly < 5000
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.rules.release.partner !== 0,
				s => (canDoAnal(s) && s.anus !== 0) || (canDoVaginal(s) && s.vagina !== 0 && s.fetish !== "buttslut"),
				hasAnyArms,
				canWalk,
				canTalk,
				s => (s.assignment !== Job.MASTERSUITE && s.assignment !== Job.CONCUBINE && s.assignment !== Job.QUARTER),
				s => s.rules.living === "luxurious",
				s => s.relationship > 3,
				s => s.devotion > 50,
				s => s.trust > 50
			],
			[ // and her dom
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.relationshipTarget === this.actors[0],
				isSlaveAvailable,
				s => (s.assignment !== Job.MASTERSUITE && s.assignment !== Job.CONCUBINE && s.assignment !== Job.QUARTER),
				s => s.rules.release.partner !== 0,
				canTalk,
				hasAnyArms,
				canMove,
				s => s.devotion > 20,
				s => s.energy > 80,
				s => (s.dick === 0 || canPenetrate(s)),
				s => (s.fetish === "dom" || s.fetish === "sadist")
			]
		];
	}

	execute(node) {
		const [subSlave, domSlave] = this.actors.map(a => getSlave(a)); // Pay attention! The main slave is the sub here!
		const {
			He, he, his, His, him, himself, wife, girl
		} = getPronouns(subSlave);
		const {
			He2, he2, His2, his2, him2, himself2, wife2, girl2
		} = getPronouns(domSlave).appendSuffix("2");
		const arms = hasBothArms(subSlave) ? "arms" : "arm";
		const belly = bellyAdjective(subSlave);
		const desc = SlaveTitle(subSlave);
		const PC = V.PC;

		const usingAss = (subSlave.fetish === "buttslut" || subSlave.vagina <= 0 || !canDoVaginal(subSlave));

		App.Events.drawEventArt(node, [domSlave, subSlave], ["no clothing", subSlave.clothes]);

		let t = [];

		t.push(`As you stroll past the best part of the slave living area one evening, you hear a lewd slap, slap, slap coming from the room`);
		t.push(App.UI.DOM.slaveDescriptionDialog(subSlave));
		t.push(`and`);
		t.push(contextualIntro(subSlave, domSlave, true));
		t.push(`share. It's quite obvious what they're up to, but you look in anyway. ${subSlave.slaveName} has clearly had a long day, and is tired, but ${he}'s being a good ${subSlave.relationship > 4 ? `${wife}` : `lover`} and letting ${domSlave.slaveName} use ${his} body. ${subSlave.slaveName} is lying`);
		if (subSlave.belly < 5000) {
			t.push(`face-down on their bed, ${arms} crossed under ${his} head, looking quite relaxed. ${He} has a couple of pillows tucked under ${his} hips to raise them so that ${his} ${subSlave.relationship > 4 ? `${wife2}` : `sweetheart`} can fuck ${him}`);
			if (subSlave.belly >= 1500) {
				t.push(`comfortably and to give ${his} ${belly} ${subSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"} room beneath ${him}.`);
			} else {
				t.push(`comfortably.`);
			}
		} else {
			t.push(`on ${his} side on their bed,`);
			if (hasBothArms(subSlave)) {
				t.push(`one arm supporting ${his} head and the other stroking ${his} ${belly} ${subSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"},`);
			} else {
				t.push(`${his} arm supporting ${his} head,`);
			}
			t.push(`looking quite relaxed. ${He} has a couple of pillows tucked under ${his} hips to angle them so that ${his} ${subSlave.relationship > 4 ? `${wife2}` : `sweetheart`} can fuck ${him} comfortably.`);
		}
		t.push(`They've obviously been at this for a while. ${domSlave.slaveName} likes to top and is not gentle at it, and ${he2}'s pounding ${subSlave.slaveName} as hard as ${he2} can. ${He2}'s`);
		if (domSlave.muscles > 50) {
			t.push(`a very strong ${girl2}, and ${his2} muscles work noticeably`);
		} else if (domSlave.muscles > 5) {
			t.push(`physically fit, but even so, ${he2}'s showing signs of fatigue`);
		} else {
			t.push(`not very fit, and ${he2}'s gasping tiredly`);
		}
		t.push(`as ${he2} pistons`);
		if (canPenetrate(domSlave)) {
			t.push(`${his2} penis`);
		} else {
			t.push(`the strap-on ${he2}'s wearing`);
		}
		t.push(`in and out of the ${usingAss ? "asshole" : "pussy"} ${subSlave.belly < 5000 ? "beneath" : "before"} ${him2}.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`For ${his} part, ${subSlave.slaveName} is playing an utterly passive role. ${He} even has ${his} eyes closed, though ${he}'s obviously conscious; ${he}'s`);
		if (subSlave.fetish === "buttslut") {
			t.push(`smiling, and the shameless ${desc} buttslut loves being treated like this.`);
		} else {
			t.push(`smiling.`);
		}
		if (usingAss) {
			if (subSlave.anus > 2) {
				t.push(`${His} welcoming asspussy can take this all night.`);
			} else if (subSlave.anus > 1) {
				if (canPenetrate(domSlave)) {
					if (domSlave.dick > 4) {
						t.push(`${His} lover's cock is big enough that it sometimes bothers even ${his} experienced anus, but ${he} was clearly fucked into a nice relaxed gape a while ago.`);
					} else if (domSlave.dick > 1) {
						t.push(`${He} can take ${his} lover's modest cock easily.`);
					} else {
						t.push(`${He} can barely feel ${his} lover's tiny cock inside ${his} relaxed hole.`);
					}
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 10, 1, domSlave.ID);
					}
				} else {
					t.push(`${His} lover is using a formidable phallus, but ${he} was clearly fucked into a nice relaxed gape a while ago.`);
				}
			} else {
				if (canPenetrate(domSlave)) {
					if (domSlave.dick > 4) {
						t.push(`${His} lover's cock stretches ${him} to ${his} limit, often leaving ${him} with a sore ass, but ${his} tight rear has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
					} else if (domSlave.dick > 2) {
						t.push(`${His} lover's cock is big enough that it often causes ${him} some anal pain, but ${his} tight ass has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
					} else if (domSlave.dick > 1) {
						t.push(`${His} lover's little dick is well suited to ${his} tight butt, and ${he}'s taking ${his} anal pounding just fine.`);
					} else {
						t.push(`${He} lover's dick is a little on the small side, but ${he}'s enjoying it all the same.`);
					}
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 10, 1, domSlave.ID);
					}
				} else {
					t.push(`${His} lover is using a formidable phallus, but ${his} tight ass has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
				}
			}
			seX(subSlave, "anal", domSlave, "penetrative", 6);
		} else {
			if (subSlave.vagina > 2) {
				t.push(`${His} gaping cunt can take this all night.`);
			} else if (subSlave.vagina > 1) {
				if (canPenetrate(domSlave)) {
					if (domSlave.dick > 4) {
						t.push(`${His} lover's cock is big enough that it sometimes bothers even ${his} veteran pussy, but ${he}'s relaxed and taking it easily.`);
					} else if (domSlave.dick > 1) {
						t.push(`${He} can take ${his} lover's modest cock easily.`);
					} else {
						t.push(`${He} can barely feel ${his} lover's tiny cock inside ${his} relaxed hole.`);
					}
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 10, 0, domSlave.ID);
					}
				} else {
					t.push(`${His} lover is using a formidable phallus, but ${he}'s relaxed and taking it easily.`);
				}
			} else {
				if (canPenetrate(domSlave)) {
					if (domSlave.dick > 4) {
						t.push(`${His} lover's cock fills ${him} to ${his} limit, often leaving ${him} rather sore, but ${his} tight pussy has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
					} else if (domSlave.dick > 2) {
						t.push(`${His} lover's cock is big enough that it often causes ${him} some pain, but ${his} tight little pussy has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
					} else if (domSlave.dick > 1) {
						t.push(`${His} lover's little dick is well suited to ${his} tight little pussy, and ${he}'s taking ${his} pounding just fine.`);
					} else {
						t.push(`${He} lover's dick is a little on the small side, but ${he}'s enjoying it all the same.`);
					}
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 10, 0, domSlave.ID);
					}
				} else {
					t.push(`${His} lover is using a formidable phallus, but ${his} tight little pussy has clearly been worked in gradually tonight, and ${he}'s taking it just fine.`);
				}
			}
			seX(subSlave, "vaginal", domSlave, "penetrative", 6);
		}
		t.push(`Being the ${subSlave.relationship > 4 ? `${wife}` : `lover`} of a lusty fucker like ${domSlave.slaveName} can be tiring, especially in addition to ${his} other duties. But despite the vigor, the sex looks quite loving. ${subSlave.slaveName} goes on smiling comfortably as ${his}`);
		if (subSlave.buttImplant / subSlave.butt > .60) {
			t.push(`implant-filled butt wobbles slightly`);
		} else {
			if (subSlave.butt > 11) {
				t.push(`inhuman ass wobbles obscenely`);
			} else if (subSlave.butt > 7) {
				t.push(`enormous ass ripples`);
			} else if (subSlave.butt > 4) {
				t.push(`heavy ass jiggles`);
			} else {
				t.push(`cute butt jiggles a bit`);
			}
		}
		t.push(`under each hard slap as ${domSlave.slaveName} brings ${his2} hips down to penetrate ${him} fully, yet again.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`Mere moments after you absorb this arresting scene, ${domSlave.slaveName} thrusts`);
		if (canPenetrate(domSlave)) {
			t.push(`${his2} cock`);
		} else {
			t.push(`the strap-on`);
		}
		t.push(`all the way inside ${subSlave.slaveName}'s ${usingAss ? "ass" : "womanhood"} and shudders,`);
		if (canPenetrate(domSlave)) {
			t.push(`filling it with ${his2} cum.`);
		} else {
			t.push(`orgasming.`);
		}
		t.push(`Then ${he2} collapses, utterly spent. ${subSlave.slaveName}`);
		if (canPenetrate(domSlave)) {
			t.push(`gasps at the sensation of the ejaculate shooting into ${his} body,`);
		} else {
			t.push(`smiles a little wider as ${he} feels ${domSlave.slaveName}'s muscles tense with climax,`);
		}
		t.push(`and then grunts a little as ${domSlave.slaveName}`);
		if (subSlave.belly < 5000) {
			t.push(`lies down on top of ${him}.`);
			if (domSlave.boobs > 5000) {
				t.push(`The enormous weight of ${his} lover's boobs squashes ${him}.`);
			}
			if (domSlave.belly >= 5000) {
				t.push(`${His2} ${bellyAdjective(domSlave)} ${domSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"} pushing into the small of ${his} back.`);
			}
		} else {
			t.push(`slumps against`);
			if (domSlave.belly >= 5000) {
				t.push(`${him}, ${his2} ${bellyAdjective(domSlave)} ${domSlave.bellyPreg >= 3000 ? "pregnancy" : "belly"} keeping ${him2} upright.`);
			} else {
				t.push(`${him}.`);
			}
		}
		t.push(`After a few seconds, ${he} wiggles ${his} hips a little as a wordless question. The sensation`);
		if (canPenetrate(domSlave)) {
			t.push(`against ${domSlave.slaveName}'s softening, overstimulated member`);
		} else {
			t.push(`is transmitted through the phallus and its harness to ${domSlave.slaveName}'s overstimulated clit, and this`);
		}
		t.push(`makes the exhausted slave on top quiver, eliciting a giggle from the slave underneath ${him2}.`);
		t.push(Spoken(subSlave, `"I love you, ${domSlave.slaveName},"`));
		t.push(`${he} whispers, and receives a mumbled "I love you too" in breathy`);
		if (subSlave.belly < 5000) {
			t.push(`response, right next to ${his} ear.`);
		} else {
			t.push(`response.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result("They're not done yet", alongside),
			new App.Events.Result("Rinse off with them", showertime)
		]);

		function alongside() {
			t = [];

			t.push(`${domSlave.slaveName} is out of it, and doesn't realize you're there. The first indication ${he2} gets of your presence is the`);
			if (PC.dick !== 0) {
				t.push(`head of your penis`);
			} else {
				t.push(`tip of your strap-on`);
			}
			if (canDoVaginal(domSlave) && domSlave.vagina > 0) {
				if (domSlave.vagina > 2) {
					t.push(`slipping easily into ${his2} loose pussy.`);
				} else if (domSlave.vagina > 1) {
					t.push(`slipping into ${his2} experienced pussy.`);
				} else {
					t.push(`penetrating ${his2} tight slit.`);
				}
				seX(domSlave, "vaginal", PC, "penetrative");
			} else if (canDoAnal(domSlave) && domSlave.anus > 0) {
				if (domSlave.anus > 2) {
					t.push(`sliding easily inside ${his2} soft butthole.`);
				} else if (domSlave.anus > 1) {
					t.push(`pushing firmly up ${his2} relaxed anus.`);
				} else {
					t.push(`penetrating ${his2} tight little asshole.`);
				}
				seX(domSlave, "anal", PC, "penetrative");
			} else {
				if (PC.dick > 5) {
					t.push(`pressing against, and then sliding up, ${his2} back.`);
				} else {
					t.push(`pressing against the small of ${his2} back.`);
				}
			}
			t.push(`${He2} groans, but greets you properly, slurring a little from sheer fatigue and overstimulation.`);
			if ((canDoVaginal(domSlave) && domSlave.vagina > 0) || (canDoAnal(domSlave) && domSlave.anus > 0)) {
				t.push(`Nevertheless, ${he2} reaches clumsily around to spread ${his2} cheeks for you. As you begin to fuck ${his2} butt, your invading ${PC.dick !== 0 ? "cock" : "phallus"}`);
				if (canPenetrate(domSlave)) {
					if (domSlave.prostate) {
						t.push(`presses against ${his2} prostate,`);
					} else {
						t.push(`stirs up ${his2} insides,`);
					}
					t.push(`forcing ${him2} hard again.`);
				} else {
					t.push(`and thrusting hips get ${him2} moving again, too.`);
				}
			} else {
				t.push(`Nevertheless, ${he2} clumsily wiggles ${his2} hips for you. As you begin to grind against ${him2},`);
				if (canPenetrate(domSlave)) {
					t.push(`the lewdness of the act manages to get ${his2} member hard again.`);
				} else {
					t.push(`${he2} starts to move along with you.`);
				}
			}
			t.push(`Beneath ${him2}, ${subSlave.slaveName} shifts uncomfortably at the resumed sex and the extra weight. To relieve ${him}, you haul ${his} ${subSlave.relationship > 4 ? `${wife2}` : "lover"} into a more upright position so ${he2} can fuck and be fucked`);
			if (subSlave.belly < 5000) {
				t.push(`while straddling ${subSlave.slaveName}'s pressed-together thighs.`);
			} else {
				t.push(`without putting so much pressure on ${subSlave.slaveName}.`);
			}
			t.push(`You fuck ${domSlave.slaveName} just as hard as ${he2} was fucking ${subSlave.slaveName}, taking your pleasure from ${him2} without mercy. Despite this, the sexed-out slave orgasms again.`);
			if (PC.dick !== 0 && canPenetrate(domSlave)) {
				t.push(`Deciding to really fill ${subSlave.slaveName}, you shove ${domSlave.slaveName}'s quivering body off to one side without ceremony, shove yourself inside the ${desc} on the bottom, and add your cum to the two loads already inside ${him}.`);
			} else {
				t.push(`You climax yourself, and then stand.`);
			}
			t.push(`Pleased, you head off to find more amusement, leaving the sex-stained slaves dozing in each other's arms, <span class="devotion inc">not thinking for a moment</span> about how profoundly sexual pleasure dominates their lives.`);
			subSlave.devotion += 4;
			domSlave.devotion += 4;
			if (usingAss) {
				seX(subSlave, "anal", domSlave, "penetrative");
				seX(subSlave, "anal", PC, "penetrative");
				if (canPenetrate(domSlave)) {
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 5, 1, domSlave.ID);
					}
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				} else {
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				}
			} else {
				seX(subSlave, "vaginal", domSlave, "penetrative");
				seX(subSlave, "vaginal", PC, "penetrative");
				if (canPenetrate(domSlave)) {
					if (canImpreg(subSlave, domSlave)) {
						knockMeUp(subSlave, 5, 0, domSlave.ID);
					}
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 0, -1);
					}
				} else {
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 0, -1);
					}
				}
			}
			return t;
		}

		function showertime() {
			t = [];

			t.push(`You announce that they definitely need to rinse off before bed. They both start with surprise and then greet you as best they can, though ${domSlave.slaveName} groans a little at having to get up so soon after exhausting ${himself2} and then climaxing. Giggling, ${subSlave.slaveName} heaves ${him2} to ${his2} feet, and between the two of you, you get ${him2} to the showers. ${He2}'s really spent; ${his2} legs are wobbly, and ${he2} slithers down to crouch under the warm water as soon as ${he2} can. Uncoordinated, ${he2} fumbles for the soap and washes ${his2} sore body, only vaguely noticing the sex going on mere ${V.showInches === 2 ? "inches" : "centimeters"} over ${his2} head. Since ${subSlave.slaveName} was being such a good ${girl} and looking after ${his} ${subSlave.relationship > 4 ? `${wife2}` : "lover"}'s needs, you take ${him} in the way ${he} likes it best,`);
			switch (subSlave.fetish) {
				case "submissive":
					t.push(`holding the submissive ${desc} up against the shower wall and giving ${him} a second reaming.`);
					break;
				case "cumslut":
					t.push(`giving the cumslut a soapy massage as ${he}`);
					if (PC.dick !== 0) {
						t.push(`sucks your`);
						if (PC.vagina !== -1) {
							t.push(`cock and`);
						} else {
							t.push(`cock.`);
						}
						seX(subSlave, "oral", PC, "penetrative");
					}
					if (PC.vagina !== -1) {
						t.push(`eats you out.`);
						seX(subSlave, "oral", PC, "vaginal");
					}
					break;
				case "humiliation":
					t.push(`holding the humiliation slut up against the shower wall so passing slaves can see ${him} get fucked.`);
					break;
				case "buttslut":
					t.push(`holding the submissive buttslut up against the shower wall and giving ${him} a second anal reaming.`);
					break;
				case "boobs":
					t.push(`fucking the boob fetishist from behind so you can play with ${his} nipples,`);
					break;
				case "pregnancy":
					if (subSlave.bellyPreg >= 1500) {
						t.push(`massaging the pregnant slut's belly as you fuck ${him}.`);
					} else if (subSlave.belly >= 1500) {
						t.push(`massaging the slut's belly as you fuck ${him}.`);
					} else {
						t.push(`pushing the impregnation slut into a corner and pretending you're knocking ${him} up.`);
					}
					break;
				case "dom":
				case "sadist":
					t.push(`holding the sexually aggressive ${desc} against the wall so ${he} can push ${himself} back against you.`);
					break;
				case "masochist":
					t.push(`pushing the pain slut into a corner and spanking ${him} while you fuck ${him}.`);
					break;
				default:
					t.push(`pushing the vanilla ${girl}'s back against the wall and kissing ${him} lovingly.`);
			}
			t.push(`As ${subSlave.slaveName} orgasms in your arms, you feel ${domSlave.slaveName} hug your thighs lightly before starting to`);
			if (PC.dick !== 0) {
				t.push(`blow you`);
				seX(subSlave, "oral", PC, "penetrative");
			} else {
				t.push(`lick your pussy`);
				seX(subSlave, "oral", PC, "vaginal");
			}
			t.push(`${himself2}. Afterward, you bring the tired pair back to their bed and get them tucked in. They <span class="trust inc">find the gesture comforting,</span> and are asleep in an instant.`);
			subSlave.trust += 4;
			domSlave.trust += 4;
			if (subSlave.fetish !== "cumslut") {
				if (usingAss) {
					seX(subSlave, "anal", PC, "penetrative");
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				} else {
					seX(subSlave, "vaginal", PC, "penetrative");
					if (canImpreg(subSlave, PC)) {
						knockMeUp(subSlave, 5, 1, -1);
					}
				}
			}
			return t;
		}
	}
};
