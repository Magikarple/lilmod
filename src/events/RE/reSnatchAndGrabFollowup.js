App.Events.RESnatchAndGrabFollowup = class RESnatchAndGrabFollowup extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.eventResults.snatch === 2,
			() => V.geneticMappingUpgrade === 3,
			() => V.cash > V.surgeryCost * 4
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.origin === "$He is your share of a raid on an illegal laboratory by your mercenaries.",
			(s) => s.newGamePlus === 0,
			(s) => s.health.condition > 25,
			(s) => s.devotion > 50,
			(s) => s.fetish !== Fetish.MINDBROKEN
		]];
	}

	get weight() { /* only one slave ever qualifies, so give it a bit more weight */
		return 3;
	}

	execute(node) {
		let r = [];

		V.eventResults.snatch = 3;

		const snatched = getSlave(this.actors[0]);
		const {
			He,
			he, his, him
		} = getPronouns(snatched);
		App.Events.drawEventArt(node, snatched, "no clothing");

		r.push(
			App.UI.DOM.slaveDescriptionDialog(snatched),
			`is next on your inspection schedule this morning, and you've finished with the previous slave more quickly than expected, so you find yourself thinking about the circumstances of ${his} acquisition.`
		);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The laboratory ${he} was recovered from was performing illegal genetic experiments... something with which you now also have some personal experience. It occurs to you that there might be something interesting left unexplored in ${his} genome, so when ${he} arrives, you inform ${him} that you're going to the surgery together.`);
		if (snatched.trust < 50) {
			r.push(`Worried, ${he}`);
			if (!canTalk(snatched)) {
				r.push(`wordlessly`);
			}
			r.push(`asks whether something is wrong, and you fill ${him} in on your thoughts.`);
		} else {
			r.push(`Although ${he} immediately and unquestioningly complies, you occupy a few free moments to fill ${him} in on your thoughts.`);
		}
		if (snatched.behavioralFlaw === "odd") {
			r.push(`${He} has always acted a bit odd, and today ${he} is pretending to play an air harmonica as you`);
			if (canWalk(snatched)) {
				r.push(`walk`);
			} else {
				r.push(`travel`);
			}
			r.push(`together.`);
		} else if (snatched.behavioralQuirk === "funny") {
			r.push(`${He} acted quite odd when you first acquired ${him}, but`);
			if (canWalk(snatched)) {
				r.push(`walking`);
			} else {
				r.push(`traveling`);
			}
			r.push(`with ${him} now, you find that ${he}'s actually very funny.`);
		} else {
			r.push(`${He} acted quite odd when you first acquired ${him}, but you note with some pride that ${he} has learned to behave more normally during ${his} time with you.`);
		}
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`After spending some time prowling around ${his} genome in your genetic sequencer, you find one particularly interesting sequence. ${He} has a unique sequence of genes in a chromosomal region which significantly increases ${his} cognitive ability, but it's only partially activated. You could, with a little bit of time, either completely activate it, or deactivate it entirely, with corresponding dramatic effects on ${his} intelligence. However, such therapy is not free, and the remote surgery software warns that rapid changes to cognition may cause significant changes in behavior.`);
		App.Events.addParagraph(node, r);

		const surgeryCost = V.surgeryCost * 4;
		const choices = [];
		choices.push(new App.Events.Result(`Finish activating the sequence`, finish, `This will cost ${cashFormat(surgeryCost)}`));
		choices.push(new App.Events.Result(`Completely deactivate the sequence`, deactivate, `This will cost ${cashFormat(surgeryCost)}`));
		choices.push(new App.Events.Result(`Let it be`, ignore));
		App.Events.addResponses(node, choices);

		function flawBreak() {
			if (snatched.behavioralQuirk === "none") {
				if (snatched.behavioralFlaw === "odd") {
					snatched.behavioralFlaw = "none";
				}
				snatched.behavioralQuirk = "funny";
				return `Over the next few weeks, you also begin to notice some significant changes in behavior. ${snatched.slaveName} is now <span class="flaw break">funny.</span>`;
			} else if (snatched.sexualQuirk === "none") {
				if (snatched.sexualFlaw === "repressed") {
					snatched.sexualFlaw = "none";
				}
				snatched.sexualQuirk = "perverted";
				return `Over the next few weeks, you also begin to notice some significant changes in behavior. Although ${snatched.slaveName} has always been remarkably horny, ${he} has become much more <span class="flaw break">perverted.</span>`;
			}
		}

		function finish() {
			const r = new SpacedTextAccumulator();
			cashX(forceNeg(surgeryCost), "slaveSurgery", snatched);
			surgeryDamage(snatched, 40);
			snatched.chem += 100;
			snatched.intelligence += Math.min(25, 100 - snatched.intelligence);
			r.push(`The procedure spans the week, with ${him} spending every other day in the surgery room for a series of four sets of injections. A few hours after each session, ${he} feels terribly ill. The process involves`);
			if (V.PC.skill.medicine >= 100) {
				r.push(`you`);
			} else {
				r.push(`the remote surgeon`);
			}
			r.push(`injecting the serum across ${his} entire body, every few`);
			if (V.showInches === 2) {
				r.push(`inches,`);
			} else {
				r.push(`centimeters,`);
			}
			r.push(`leaving small needle marks that fade out within minutes. Despite not leaving lasting evidence, the process is very invasive work, and leaves ${him} <span class="health dec">feeling weak and tired.</span> Gradually, though, you begin to notice a marked increase in ${his} cognitive function.`);
			r.toParagraph();

			const broken = flawBreak();
			if (broken) {
				r.push(broken);
				r.toParagraph();
			}

			return r.container();
		}

		function deactivate() {
			const r = new SpacedTextAccumulator();
			cashX(forceNeg(V.surgeryCost * 4), "slaveSurgery", snatched);
			surgeryDamage(snatched, 40);
			snatched.chem += 100;
			snatched.intelligence -= Math.min(25, 100 + snatched.intelligence);
			r.push(`The procedure spans the week, with ${him} spending every other day in the surgery room for a series of four sets of injections. A few hours after each session, ${he} feels terribly ill. The process involves`);
			if (V.PC.skill.medicine >= 100) {
				r.push(`you`);
			} else {
				r.push(`the remote surgeon`);
			}
			r.push(`injecting the serum across ${his} entire body, every few`);
			if (V.showInches === 2) {
				r.push(`inches,`);
			} else {
				r.push(`centimeters,`);
			}
			r.push(`leaving small needle marks that fade out within minutes. Despite not leaving lasting evidence, the process is very invasive work, and leaves ${him} <span class="health dec">feeling weak and tired.</span> Gradually, though, you begin to notice a marked decline in ${his} cognitive function.`);
			r.toParagraph();

			const broken = flawBreak();
			if (broken) {
				r.push(broken);
				r.toParagraph();
			}

			return r.container();
		}

		function ignore() {
			return `You file your findings, and within a few days, both you and ${snatched.slaveName} have forgotten all about them.`;
		}
	}
};
