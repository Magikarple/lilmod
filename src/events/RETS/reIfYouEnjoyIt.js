App.Events.RETSIfYouEnjoyIt = class RETSIfYouEnjoyIt extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.universalRulesConsent === 0,
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				hasBothArms,
				hasAnyLegs,
				canTalk,
				s => s.devotion > 50,
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				isSlaveAvailable,
				s => s.devotion <= 20,
				s => s.fetish !== "buttslut",
				s => s.anus !== 0
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself,
		} = getPronouns(eventSlave);
		const {say} = getEnunciation(eventSlave);
		const {
			His2, him2, girl2, his2, he2, He2
		} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		let t = [];

		t.push(`The distinctive sounds of a sexual encounter in which exactly one of the participants is enjoying ${himself} are coming from the dormitory. This is by no means uncommon, but this particular nonconsensual assignation sounds interesting, so you stick your head in on your way by. You're treated to the sight of`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), `'s ${eventSlave.skin} back and`));
		if (eventSlave.butt > 4) {
			t.push(`massive ass`);
		} else if (eventSlave.butt > 2) {
			t.push(`plush rear`);
		} else {
			t.push(`cute butt`);
		}
		t.push(`as ${he}`);
		if (!canStand(eventSlave)) {
			t.push(`kneels`);
		} else {
			t.push(`leans over`);
		}
		t.push(`on one of the bedrolls. It isn't immediately clear what's going on, but ${he}'s doing something with ${his}`);
		if (canPenetrate(eventSlave)) {
			t.push(`dick,`);
		} else {
			t.push(`hands,`);
		}
		t.push(`and there are a pair of ${subSlave.skin} feet visible on either side of ${him}. ${He}'s clearly got someone shoved down into the bedroll in front of ${him}, doggy style. That's the source of the whining.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`Advancing to get a better view, you identify the bottom as`);
		if (subSlave.bellyPreg >= 5000) {
			t.push(`the pregnant`);
		}
		t.push(App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(subSlave), "."));
		t.push(`${eventSlave.slaveName} has`);
		if (canPenetrate(eventSlave)) {
			if (eventSlave.dick > 4) {
				t.push(`${his} gigantic dick up ${subSlave.slaveName}'s`);
				if (subSlave.anus > 2) {
					t.push(`loose anus, but ${subSlave.slaveName}'s butthole is so accommodating that it probably isn't anal pain that's troubling ${him2}.`);
				} else {
					t.push(`asshole, which must be so stretched to accommodate it that ${his2} anguish is probably due in part to anal pain.`);
				}
			} else if (eventSlave.dick > 2) {
				t.push(`${his} dick up ${subSlave.slaveName}'s`);
				if (subSlave.anus > 1) {
					t.push(`experienced anus, but ${subSlave.slaveName}'s butthole sufficiently used to buttsex that it probably isn't anal pain that's troubling ${him2}.`);
				} else {
					t.push(`tight little asshole, which must be so stretched to accommodate it that ${his2} anguish is probably due in part to anal pain.`);
				}
			} else {
				t.push(`${his} little cock up ${subSlave.slaveName}'s anus. It's so small that it probably isn't anal pain that's troubling ${subSlave.slaveName}.`);
			}
		} else {
			if (subSlave.anus > 2) {
				t.push(`three fingers up ${subSlave.slaveName}'s loose butthole, which is so accommodating that it probably isn't anal pain that's troubling ${him2}.`);
			} else if (subSlave.anus > 1) {
				t.push(`two fingers up ${subSlave.slaveName}'s butthole, which is experienced enough that it probably isn't anal pain that's troubling ${him2}.`);
			} else {
				t.push(`two fingers up ${subSlave.slaveName}'s tight ass, which must be so stretched to accommodate them that ${his2} anguish is probably due in part to anal pain.`);
			}
		}
		t.push(`${eventSlave.slaveName} isn't fucking ${subSlave.slaveName} at all: ${he}'s just`);
		if (canPenetrate(eventSlave)) {
			t.push(`holding ${his} penis stationary`);
		} else {
			t.push(`holding ${his} fingers`);
		}
		t.push(`up ${subSlave.slaveName}'s rear hole. ${His2} buttocks has been severely spanked, so some of ${his2} unhappiness probably comes from being forced to eat sheets and let ${eventSlave.slaveName} play with ${his2} ass. But then you notice that ${eventSlave.slaveName} is`);
		if (canPenetrate(eventSlave)) {
			t.push(`reaching around`);
		} else {
			t.push(`using ${his} other hand to reach around`);
		}
		t.push(`${subSlave.slaveName}, and is`);
		if (subSlave.dick > 0 && !(subSlave.chastityPenis)) {
			t.push(`jerking ${subSlave.slaveName} off`);
		} else {
			t.push(`manually stimulating ${subSlave.slaveName}`);
		}
		if (eventSlave.skill.oral >= 60) {
			t.push(`with all ${his} considerable expertise.`);
		} else if (eventSlave.skill.oral > 30) {
			t.push(`with considerable skill.`);
		} else {
			t.push(`with every appearance of effort.`);
		}
		t.push(`You're not sure what's going on here.`);

		seX(subSlave, "anal", eventSlave, "penetrative");

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("Just watch", watch),
			new App.Events.Result(`${He}'s being too gentle`, join)
		]);


		function watch() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You settle down to watch what happens. ${eventSlave.slaveName}, who has a devoted slave's sixth sense about ${his} ${getWrittenTitle(eventSlave)}'s presence, realizes you're there and turns toward you.`);
			if (canSee(eventSlave)) {
				t.push(`You've already got a reassuring, silent hand raised, and you gesture that ${he} should continue.`);
			} else if (canHear(eventSlave)) {
				t.push(`Not hearing any comments, ${he} takes it as a gesture to continue.`);
			} else {
				t.push(`Not sensing your touch, ${he} eventually decides to continue.`);
			}
			t.push(`${He} smiles naughtily at you, <span class="trust inc">pleased with your trust in ${him},</span> before going back to ${subSlave.slaveName}. ${He}`);
			if (canPenetrate(eventSlave)) {
				t.push(`hauls ${subSlave.slaveName}'s`);
				if (subSlave.belly >= 5000) {
					t.push(`gravid`);
				}
				t.push(`torso partway up`);
			} else {
				t.push(`bends over the poor ${girl2}`);
			}
			t.push(`so ${he} can speak directly into ${his2} ear, and ${say}s quietly,`);
			t.push(Spoken(eventSlave, `"You're starting to enjoy this, aren't you, bitch?"`));
			t.push(`${subSlave.slaveName}, still unaware you're there, shakes ${his2} head unhappily, tears starting to leak out the corners of ${his2} eyes.`);

			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`"N-no," ${he2} gasps.`);
			t.push(Spoken(subSlave, `"I'm not! Please t-take ${canPenetrate(eventSlave) ? `it` : `them`} out!"`));
			t.push(`${eventSlave.slaveName} makes no verbal reply, but continues ${his} manual stimulation, and`);
			if (subSlave.earShape !== "none" && subSlave.earT !== "none") {
				t.push(`sticks ${his} tongue into ${subSlave.slaveName}'s ear.`);
			} else {
				t.push(`runs ${his} tongue along ${subSlave.slaveName}'s ear hole.`);
			}
			t.push(`The poor ${girl2} lets out a startled yelp that trails off into a moan as ${eventSlave.slaveName}'s`);
			if (eventSlave.skill.oral >= 60) {
				t.push(`excellent`);
			} else if (eventSlave.skill.oral > 1) {
				t.push(`skillful`);
			} else {
				t.push(`enthusiastic`);
			}
			t.push(`ministrations really begin to have an effect on ${him2}.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`${eventSlave.slaveName} laughs unpleasantly at the desperately uncomfortable ${subSlave.slaveName}, and ${say}s,`);
			t.push(Spoken(eventSlave, `"Tell you what, slut. I'll leave you alone if this doesn't get you off."`));
			t.push(`Already realizing ${his2} predicament, ${subSlave.slaveName} begins to protest, but ${eventSlave.slaveName} cuts ${him2} off.`);
			t.push(Spoken(eventSlave, `"Shut your fucking cockholster, bitch, I'm talking. I'll leave you alone if this doesn't get you off, but if you come, you've obviously been lying to me, and you obviously want me to buttfuck you all night long."`));
			t.push(`${subSlave.slaveName} tries very hard, taking a huge breath of air and holding it in, biting ${his2} lip, shutting ${his2} eyes tight, and more, but it's all for naught. Before long, ${he2} stiffens`);
			if (subSlave.balls > 0 || subSlave.prostate > 0) {
				t.push(`and makes a mess on the bedroll,`);
			} else {
				t.push(`with orgasm,`);
			}
			t.push(`moaning as ${his2} anal sphincter tightens against the invading`);
			if (canPenetrate(eventSlave)) {
				t.push(`cock.`);
			} else {
				t.push(`fingers.`);
			}
			t.push(`Once the climax leaves ${him2}, ${he2} begins to sob, knowing what this means. ${eventSlave.slaveName} takes ${his2} hand away from the crying ${girl2}'s crotch and begins to massage ${his2} back with surprising tenderness.`);
			t.push(Spoken(eventSlave, `"Shh, sweetie, it's all right. I promise you'll enjoy this, if you let yourself."`));
			t.push(`You leave quietly, letting ${eventSlave.slaveName} have ${his} fun. As the week goes on, ${subSlave.slaveName}'s <span class="fetish gain">attitude towards anal sex</span> improves quickly, though ${he2} feels rather conflicted about ${eventSlave.slaveName} for forcing this on ${him2}.`);
			eventSlave.trust += 4;
			seX(subSlave, "anal", eventSlave, "penetrative", 4);
			subSlave.fetish = "buttslut";
			subSlave.fetishKnown = 1;
			subSlave.fetishStrength = 65;
			if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
				knockMeUp(subSlave, 20, 1, eventSlave.ID);
			}
			App.Events.addParagraph(frag, t);
			return frag;
		}

		function join() {
			t= [];

			t.push(`You advance on the slaves. ${eventSlave.slaveName}, who has a devoted slave's sixth sense about ${his} ${getWrittenTitle(eventSlave)}'s presence, realizes you're there and turns toward you.`);
			if (canSee(eventSlave)) {
				t.push(`Silently but forcefully, you use a simple hand gesture to instruct ${him} unequivocally`);
			} else {
				t.push(`${He} can feel`);
			}
			t.push(`that ${he}'s to stop fucking around and pound the bitch's butt. ${He} looks a little taken aback, but obeys instantly,`);
			if (canPenetrate(eventSlave)) {
				t.push(`pumping ${his} dick in and out of ${subSlave.slaveName}`);
			} else {
				t.push(`fingerfucking ${subSlave.slaveName}'s ass`);
			}
			t.push(`without mercy. The slave screams at the sudden change of pace, thrashing a little. ${His2} struggles bring`);
			if (canSee(subSlave)) {
				t.push(`${his2} head around, and ${he2}'s surprised to come face to face with your ankles. With dawning comprehension, ${his2} eyes track rapidly up your`);
				if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					t.push(`muscular`);
				} else if (V.PC.title !== 0) {
					t.push(`trim`);
				} else {
					t.push(`feminine`);
				}
				t.push(`thighs, past your`);
				if (V.PC.dick !== 0) {
					if (V.PC.vagina !== -1) {
						t.push(`turgid dick and flushed pussy,`);
					} else {
						t.push(`turgid dick,`);
					}
				} else {
					t.push(`flushed pussy,`);
				}
				t.push(`across your`);
				if (V.PC.belly >= 100000) {
					t.push(`massively pregnant middle`);
				} else if (V.PC.belly >= 10000) {
					t.push(`hugely pregnant middle`);
				} else if (V.PC.belly >= 5000) {
					t.push(`pregnant middle`);
				} else if (V.PC.belly >= 1500) {
					t.push(`swollen middle`);
				} else if (V.PC.belly >= 100) {
					t.push(`suspiciously swollen midriff`);
				} else if (FutureSocieties.isActive('FSPhysicalIdealist')) {
					t.push(`shredded abs`);
				} else {
					t.push(`muscular abs`);
				}
				t.push(`and over your`);
				if (V.PC.boobs < 300) {
					if (FutureSocieties.isActive('FSPhysicalIdealist')) {
						t.push(`strong chest`);
					} else if (V.PC.title !== 0) {
						t.push(`firm chest`);
					} else {
						t.push(`flat chest`);
					}
				} else if (V.PC.boobs >= 1400) {
					t.push(`giant`);
					if (V.PC.boobsImplant > 0) {
						t.push(`fake breasts`);
					} else {
						t.push(`cow tits`);
					}
				} else if (V.PC.boobs >= 1200) {
					t.push(`huge`);
					if (V.PC.boobsImplant > 0) {
						t.push(`round`);
					}
					t.push(`breasts`);
				} else if (V.PC.boobs >= 1000) {
					t.push(`big`);
					if (V.PC.boobsImplant > 0) {
						t.push(`perky`);
					}
					t.push(`breasts`);
				} else if (V.PC.boobs >= 800) {
					t.push(`pretty breasts`);
				} else {
					t.push(`cute breasts`);
				}
				t.push(`to rest on your unforgiving face.`);
			} else {
				t.push(`a pleased chuckle out of you. With dawning comprehension, ${his2} face rapidly moves to face yours.`);
			}
			t.push(`${He2} wilts. ${eventSlave.slaveName} thinks this is hilarious, and laughs so hard at the slave's reaction to your appearance that ${he} almost loses hold of ${subSlave.slaveName}'s `);
			if (subSlave.dick > 0) {
				t.push(`cock.`);
			} else if (subSlave.clit > 0) {
				t.push(`clit.`);
			} else {
				t.push(`ass.`);
			}
			t.push(`There's nothing quite like oral from a ${girl2} who's moaning with anal pain, so you sit on the head of the bedroll and`);
			if (V.PC.dick !== 0) {
				t.push(`stick your dick in ${subSlave.slaveName}'s mouth.`);
			} else {
				t.push(`pull ${subSlave.slaveName}'s mouth against your cunt.`);
			}
			t.push(`${eventSlave.slaveName} is still giggling, but leans over the unhappy slave speared between the two of you to <span class="devotion inc">plant a kiss</span> on you. ${He} misses, smearing ${his} kiss along your cheek and past your ear, but you take ${his} face in your hands and kiss ${him} properly as ${subSlave.slaveName} begins to do ${his2} best to relax and get you off, <span class="trust dec">fearful</span> that worse is in store if ${he2} doesn't <span class="devotion inc">submit.</span>`);
			eventSlave.devotion += 4;
			seX(subSlave, "anal", eventSlave, "penetrative");
			seX(subSlave, "oral", V.PC, "penetrative");
			subSlave.trust -= 4;
			subSlave.devotion += 4;
			if (canPenetrate(eventSlave) && canImpreg(subSlave, eventSlave)) {
				knockMeUp(subSlave, 20, 1, eventSlave.ID);
			}

			return t;
		}
	}
};
