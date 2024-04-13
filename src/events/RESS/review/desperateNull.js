App.Events.RESSDesperateNull = class RESSDesperateNull extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				s => s.dick === 0,
				s => s.vagina === -1,
				canDoAnal,
				s => s.energy > 20,
				s => s.devotion >= -50,
				s => s.fetish !== "buttslut" || s.fetishStrength <= 20,
				s => s.nipples !== "fuckable",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You're inspecting`,
			contextualIntro(PC, eventSlave, true)
		);
		r.addToLast(`, and ${he}'s an unhappy little null today.`);
		if (eventSlave.devotion > 50) {
			r.push(`${He}'s devoted to you, so that's not the problem;`);
		} else if (eventSlave.devotion > 20) {
			r.push(`${He} accepts ${his} place, so that's not the problem;`);
		} else if (eventSlave.devotion >= -50) {
			r.push(`${He}'s not being especially defiant right now;`);
		} else {
			r.push(`It's not ${his} hatred of you;`);
		}
		r.push(`it's that ${he}'s experiencing extreme sexual frustration. It's not obvious, despite ${his} nakedness. ${He} has no`);
		if (V.seeDicks !== 0) {
			r.push(`cock to get hard`);
		}
		if (V.seeDicks !== 100) {
			if (V.seeDicks !== 0) {
				r.push(`or`);
			}
			r.push(`pussy to get wet`);
		}
		r.push(`to advertise ${his} uncomfortable state. Most slaves have obvious visual cues like that to do their sexual begging for them, but not ${him}. All ${he}'s got to show how pent up ${he} is is the stiffness of ${his} ${eventSlave.nipples} nipples, goosebumps all over ${his} areolae despite the warmth of your office, and a tiny bead of clear fluid at the little hole`);
		if (eventSlave.scrotum > 0) {
			r.push(`above ${his} lonely, abandoned ballsack.`);
		} else if (eventSlave.genes === "XX") {
			r.push(`where ${his} pussy used to be.`);
		} else {
			r.push(`where the base of ${his} penis used to be.`);
		}
		if (["whore", "serve the public", "work in the brothel", "serve in the club"].includes(eventSlave.assignment)) {
			r.push(`It's not like ${his} ass isn't sold to hundreds of different customers, but ${he} apparently isn't enough of a buttslut to get much sexual satisfaction from it.`);
		}
		r.toParagraph();
		r.push(
			`${He} does ${his} very best to get through the inspection without disgrace, hugging ${himself} uncomfortably and shivering. You let ${him} suffer through it, deferring the delicious choice about how to take advantage of ${his} situation until the inspection is done. ${He} breaks before then, though, suddenly falling to ${his} knees and starting to cry.`,
			Spoken(eventSlave, `"Please, ${Master},"`),
			`${he} begs piteously.`,
			Spoken(eventSlave, `Please help me! I can't t-take it! It's s-so f-fucking f-frustrating,"`),
			`${he} moans, trailing off, clasping ${his} hands in supplication as ${he}`);
		if (canSee(eventSlave)) {
			r.push(`looks up at`);
		} else {
			r.push(`faces`);
		}
		r.push(`you desperately.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Take pity`, pity, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null),
			new App.Events.Result(`Assrape ${him}`, assrape, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null),
			new App.Events.Result(`Ignore ${his} pleas`, ignore, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
		]);

		function pity() {
			const r = new SpacedTextAccumulator();
			r.push(`Deciding to take pity, you stand up`);
			if (V.PC.dick === 0) {
				r.addToLast(`, pull on a strap-on,`);
			}
			r.push(`and approach ${his} crumpled, weeping form. You reach down and take ${his} clasped hands in yours, pulling ${him} gently`);
			if (hasBothLegs(eventSlave)) {
				r.push(`to ${his} feet`);
			} else {
				r.push(`upright`);
			}
			r.push(`and giving ${him} a quick cuddle. You make it just long enough to reassure ${him} that you care for ${him}, but not long enough to frustrate ${him} even further; ${his} extreme horniness is only sharpened by the hug and the way it traps ${his} ${arms} between ${his}`);
			if (eventSlave.boobsImplant/eventSlave.boobs >= .60) {
				r.push(`fake boobs`);
			} else if (eventSlave.boobs > 4000) {
				r.push(`monstrous udders`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big soft breasts`);
			} else if (eventSlave.boobs > 300) {
				r.push(`tits`);
			} else {
				r.push(`flat chest`);
			}
			r.push(`and your`);
			if (V.PC.boobs >= 300) {
				r.push(`bosom.`);
			} else if (V.PC.title === 0) {
				r.push(`chest.`);
			} else {
				r.push(`hard pectorals.`);
			}
			r.push(`${He} sniffles, trying to restrain ${his} hopes. You push ${him} backwards toward the couch, giving ${him} a kiss to really bring ${him} to the height of anticipation before laying ${him} down and sliding your`);
			if (V.PC.dick !== 0) {
				r.push(`cock`);
			} else {
				r.push(`strap-on`);
			}
			if (eventSlave.anus > 1) {
				r.push(`inside ${his} soft asshole.`);
			} else {
				r.push(`up ${his} tight little butt.`);
			}
			if (eventSlave.prostate !== 0) {
				r.push(`The instant`);
				if (V.PC.dick !== 0) {
					r.push(`your hard dickhead`);
				} else {
					r.push(`the hard tip of your phallus`);
				}
				r.push(`presses against ${his} prostate, ${he} orgasms, squirting`);
				if (eventSlave.balls === 0) {
					r.push(`translucent fluid.`);
				} else {
					r.push(`cum.`);
				}
				r.push(`${He} looks like ${he} wants to say something, or maybe even apologize, so you shush ${him} with a gentle hand and pull out, letting the fluid run down`);
				if (eventSlave.scrotum > 0) {
					r.push(`${his} soft scrotum`);
				} else {
					r.push(`the pretty skin between ${his} cumhole and ${his} anus`);
				}
				r.push(`until it glazes ${his} asspussy. You use`);
				if (V.PC.dick !== 0) {
					r.push(`the tip of your cock`);
				} else {
					r.push(`the head of the strap-on`);
				}
				r.push(`to massage the fluid into the hole before penetrating it again with the extra lubrication.`);
			} else {
				r.push(`Without a prostate or a strong anal fetish, ${he}'ll have trouble climaxing to nothing but buttsex, so you make sure to tend to every erogenous zone ${he} has left. You guide one of ${his} hands down so ${he} can rub`);
				if (eventSlave.scrotum > 0) {
					r.push(`${his} scrotum,`);
				} else {
					r.push(`the skin between ${his} legs,`);
				}
				r.push(`and make ${his} stimulate one of ${his} nipples with the other. You`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`pinch and rub`);
				} else {
					r.push(`finger`);
				}
				r.push(`${his} other nipple, and push two fingers of your other hand into ${his} mouth, making ${him} suck them. So completely stimulated, ${he} finally manages to orgasm.`);
			}
			r.push(`You make love to ${him} until ${he}'s satisfied, and then carry ${him} to the shower to wash ${him} off. Under the warm water, ${he} <span class="trust inc">stays trustingly close to your naked body,</span> without even thinking about it.`);
			eventSlave.trust += 5;
			r.push(VCheck.Anal(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function assrape() {
			const r = new SpacedTextAccumulator();
			r.push(`${He}'s an anal sex toy, and you decide to use ${him} like one. You walk over, reach down, and jerk ${him}`);
			if (hasBothLegs(eventSlave)) {
				r.push(`to ${his} feet.`);
			} else {
				r.push(`off the ground.`);
			}
			r.push(`You don't hurt ${him}, not yet, but the violence of the motion forces a sob out of ${him}. ${He}`);
			if (canSee(eventSlave)) {
				r.push(`sees the open lust in your eyes`);
			} else {
				r.push(`feels the lust lingering about you`);
			}
			r.push(`and is afraid. ${He}'s not wrong to be so; you spin ${him} roughly around and use one arm to pin ${his} upper body mercilessly in place while you use your other hand to`);
			if (eventSlave.anus > 2) {
				r.push(`manhandle your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`up ${his} roomy ass. It's disappointingly easy, and ${he} takes it without a struggle, so you reach around ${his} front, down between ${his} legs, and jam a couple of fingers up there, too.`);
			} else if (eventSlave.anus > 1) {
				r.push(`shove your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`up ${his} anus. ${He}'s taken hard anal before, but the angle isn't particularly comfortable, you didn't bother with lube, and you begin to rape ${him} vigorously without any warning.`);
			} else {
				r.push(`force your`);
				if (V.PC.dick !== 0) {
					r.push(`cock`);
				} else {
					r.push(`strap-on`);
				}
				r.push(`up ${his} spasming anus. ${He}'d struggle to take it in a position far more comfortable for anal than standing straight up, and you don't even bother to take it slow.`);
			}
			r.push(
				Spoken(eventSlave, `"${Master}, that hurts!"`),
				`${he} screams, crying even harder.`,
				Spoken(eventSlave, `"Ow, it h-hurts! Please take it out, ow, ow,"`),
				`${he} shrieks, and then degenerates into nonverbal caterwauling.`
			);
			if (eventSlave.prostate !== 0) {
				r.push(
					`Then, without any warning, ${he} orgasms. ${He}'s so pent up that the prostate stimulation overpowers the pain. ${He} shudders, gasps, and then moans,`,
					Spoken(eventSlave, `"I'm s-such a whore, ${Master},"`),
					`in such a tone of utter <span class="devotion inc">submission</span> and dejection that you climax too. Then you drop ${him}, letting ${his} slide off you, and go back to your work, leaving ${him} to clean ${himself} and the floor.`
				);
				eventSlave.devotion += 5;
			} else {
				r.push(`${He} knows ${he} shouldn't wriggle, that fighting will make it even worse for ${him}, but you assrape ${him} so mercilessly that ${his} body revolts, trying to escape the invading phallus. You have ${his} ${arms} pinioned securely, so all this struggling does is add to the fun. When you're done, you`);
				if (V.PC.dick !== 0) {
					r.push(`fill ${his} insides with your cum and`);
				}
				r.push(
					`drop ${him}, ordering ${him} to clean ${himself} up.`,
					Spoken(eventSlave, `"Y-yes ${Master},"`),
					`${he} sniffles <span class="trust dec">fearfully,</span> and hurries to obey, a little bent from ${his} burning backdoor. Only later does ${he} remember that ${he} still hasn't gotten off.`
				);
				eventSlave.trust -= 5;
			}
			r.push(VCheck.Anal(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function ignore() {
			const r = new SpacedTextAccumulator();
			r.push(`You order ${him} to take the next pose in the inspection series, as though ${he} hadn't broken down at all. There's such understated menace in your`);
			if (canHear(eventSlave)) {
				r.push(`voice`);
			} else {
				r.push(`words`);
			}
			r.push(`that ${he}`);
			if (hasBothLegs(eventSlave)) {
				r.push(`gets right back to ${his} feet`);
			} else {
				r.push(`stands right back up`);
			}
			if (hasAnyArms(eventSlave)) {
				r.addToLast(`, using the back of ${his} ${eventSlave.skin} hand to cuff away ${his} tears`);
			}
			r.addToLast(".");
			r.push(
				Spoken(eventSlave, `"Y-yes, ${Master}," ${he} sniffles, trying to get ${himself} under control, and then shudders.`));
			if (V.dairy > 0 && V.dairyStimulatorsSetting === 2) {
				r.push(`It's never hard to see the exact moment when your slaves remind themselves that you run an industrial Dairy, and that if they displease you, they may find themselves hydrated for milk production from fifty kilogram udders by constant machine rape down their throats and up their asses`);
				if (isFertile(eventSlave) && V.dairyPregSetting > 0) {
					r.push(`as their wombs steadily fill with life`);
				}
				r.addToLast(`.`);
			} else if (V.arcade > 0) {
				r.push(`It's never hard to see the exact moment when your slaves remind themselves that you own an Arcade, and that if they displease you, they may find themselves immured there and condemned to a universe in which the only sensory stimulation is penetration.`);
			} else if (eventSlave.trust < -20) {
				r.push(`${He}'s no stranger to being punished, and obviously wants to avoid another round.`);
			} else {
				r.push(`${He} knows that there are slaves who are treated much more harshly than ${he} is, and doesn't want to become one of them.`);
			}
			r.push(`${He} staggers out of your office after ${his} inspection, doing ${his} best to ignore ${his} condition. Over the coming week, ${he}'s continually tortured by ${his} libido, cruelly entombed as it is in a body which can no longer give it meaningful relief. ${He} manages to keep it together, mostly, and ${his} <span class="libido dec">sex drive diminishes noticeably.</span>`);
			eventSlave.energy -= 5;
			r.toParagraph();
			return r.container();
		}
	}
};
