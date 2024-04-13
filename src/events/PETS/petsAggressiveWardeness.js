App.Events.petsAggressiveWardeness = class petsAggressiveWardeness extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.Wardeness,
			() => canTalk(S.Wardeness)
		];
	}

	actorPrerequisites() {
		return [[
			s => s.assignment === Job.CELLBLOCK
		]];
	}

	execute(node) {
		const subSlave = getSlave(this.actors[0]);
		const {
			He,
			he, his, him, himself
		} = getPronouns(S.Wardeness);
		const {
			He2,
			he2, his2, him2
		} = getPronouns(subSlave).appendSuffix("2");
		App.Events.drawEventArt(node, [S.Wardeness, subSlave]);

		App.Events.addParagraph(node, [
			`As you pass the entrance to the hall of cells where`,
			App.UI.DOM.slaveDescriptionDialog(S.Wardeness),
			`breaks bitches late one night, you hear some muffled cursing, followed by moans. Curious, you lean into the one cell with an open door and are treated to the sight of ${S.Wardeness.slaveName} holding`,
			App.UI.DOM.combineNodes(contextualIntro(S.Wardeness, subSlave, true), `'s head`),
			`${hasBothLegs(S.Wardeness) ? `between ${his} legs` : `at ${his} groin`}, receiving what is very obviously non-consensual oral sex. ${S.Wardeness.slaveName} is clearly enjoying ${himself}, but gathers ${himself} together and greets you properly, without stopping.`
		]);

		App.Events.addParagraph(node, [
			Spoken(S.Wardeness, `"Told this whore I wasn't turning the lights off in ${his2} cell until ${he2} got me off. ${He2} can't sleep with 'em on, and bitches do anything for a little sleep,"`),
			`${he} explains.`
		]);

		const choices = [];
		choices.push(new App.Events.Result(`Encourage the use of sleep deprivation as a breaking tool`, encourage));
		choices.push(new App.Events.Result(`Have a quiet word with the Wardeness about prisoners' health`, quiet));
		if (subSlave.anus > 0 && canDoAnal(subSlave)) {
			choices.push(new App.Events.Result(`The prisoner will take it up the butt, too, if ${he2} wants sleep`, upButt));
		}
		if (subSlave.vagina > 0 && canDoVaginal(subSlave)) {
			choices.push(new App.Events.Result(`The prisoner will take it up the pussy, too, if ${he2} wants sleep`, upVag));
		}
		App.Events.addResponses(node, choices);

		function encourage() {
			V.slaves.forEach(function(s) {
				if (s.assignment === Job.CELLBLOCK) {
					s.devotion += 10;
					healthDamage(s, 10);
				}
			});
			return `You let ${S.Wardeness.slaveName} know that as far as you're concerned, sleep is a privilege, not a right. ${He} grins evilly and grinds ${himself} into ${subSlave.slaveName}'s mouth harder. The poor prisoner ${canHear(subSlave) ? `heard you, of course` : `realizes why ${S.Wardeness.slaveName} has increased ${his} brutality`}, and begins to produce muffled sobs as ${he2} realizes what this means for ${him2}. ${S.Wardeness.slaveName} reaches down and caresses ${his2} cheek. "There, there," ${he} croons. "It's not rape if you do it in return for something." All the prisoners are all that much more <span class="devotion inc">broken</span> this week, though sleep deprivation <span class="health dec">isn't healthy.</span>`;
		}

		function quiet() {
			V.slaves.forEach(function(s) {
				if (s.assignment === Job.CELLBLOCK) {
					improveCondition(s, 10);
				}
			});
			return `You let ${S.Wardeness.slaveName} finish using ${subSlave.slaveName}'s mouth, turn off the lights in ${his2} cell, and then meet ${him} outside. It won't do to undermine ${him} in front of the prisoners. You offer a few choice remarks on the value of ${his} charges to you and the potential effects of sleep deprivation, and point out that ${he} is a poor Wardeness if ${he} cannot break slaves without taking measures that may damage their health. ${He}'s clearly filled with remorse, begs your forgiveness, and manages to break slaves just as effectively this week while taking <span class="health inc">better care</span> of their health.`;
		}

		function upButt() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You silently interrupt ${S.Wardeness.slaveName} and indicate that ${he} should sit down on the cell's bed without letting ${subSlave.slaveName}'s head out from between ${his} legs. ${He} sits down with a thump, dragging the struggling ${subSlave.slaveName} with ${him}. You`);
			if (V.PC.dick === 0) {
				r.push(`pull on a strap-on, and then`);
			}
			r.push(`seize ${subSlave.slaveName}'s hips and hoist them into the air, giving ${him2} a horrible second of anticipation as you manhandle`);
			if (V.PC.dick === 0) {
				r.push(`the cruelly large phallus`);
			} else {
				r.push(`your cock`);
			}
			r.push(`into place. ${He2} gives a strangled squeal of protest at the feeling of you pushing your way inexorably up ${his2} poor anus, making ${S.Wardeness.slaveName} jerk with surprise at the sensation of ${subSlave.slaveName} howling into ${his} crotch. Twenty minutes later, you and ${S.Wardeness.slaveName} leave ${him2} <span class="devotion inc">quiescent</span> on the floor of the cell. After ${he} locks the door after ${himself}, ${S.Wardeness.slaveName} can't resist the urge to <span class="devotion inc">offer you a cheerful high-five.</span>`);
			S.Wardeness.devotion += 10;
			subSlave.devotion += 4;
			seX(subSlave, "oral", S.Wardeness, "penetrative", 2);
			seX(subSlave, "anal", V.PC, "penetrative", 1);
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function upVag() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You silently interrupt ${S.Wardeness.slaveName} and indicate that ${he} should sit down on the cell's bed without letting ${subSlave.slaveName}'s head out from between ${his} legs. ${He} sits down with a thump, dragging the struggling ${subSlave.slaveName} with ${him}. You`);
			if (V.PC.dick === 0) {
				r.push(`pull on a strap-on, and then`);
			}
			r.push(`seize ${subSlave.slaveName}'s hips and hoist them into the air, giving ${him2} a horrible second of anticipation as you manhandle`);
			if (V.PC.dick === 0) {
				r.push(`the cruelly large phallus`);
			} else {
				r.push(`your cock`);
			}
			r.push(`into place. ${He2} gives a strangled squeal of protest at the feeling of you pushing your way inexorably up ${his2} poor pussy, making ${S.Wardeness.slaveName} jerk with surprise at the sensation of ${subSlave.slaveName} howling into ${his} crotch. Twenty minutes later, you and ${S.Wardeness.slaveName} leave ${him2} <span class="devotion inc">quiescent</span> on the floor of the cell. After ${he} locks the door after ${himself}, ${S.Wardeness.slaveName} can't resist the urge to <span class="devotion inc">offer you a cheerful high-five.</span>`);
			S.Wardeness.devotion += 10;
			subSlave.devotion += 4;
			seX(subSlave, "oral", S.Wardeness, "penetrative", 2);
			seX(subSlave, "vaginal", V.PC, "penetrative", 1);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
