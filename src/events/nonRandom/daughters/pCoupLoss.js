// cSpell:ignore zzzt

App.Events.PCoupLoss = class PCoupLoss extends App.Events.BaseEvent {
	execute(node) {
		let r = [];

		if (V.traitor !== 0) {
			const pregWeeks = V.traitorWeeks;
			V.traitorWeeks = 0;

			WombProgress(V.traitor, pregWeeks, pregWeeks); /* In all cases should be done */
			WombUpdatePregVars(V.traitor);
			if (WombBirthReady(V.traitor, V.traitor.pregData.normalBirth) > 0 ) { /* normal birth case, partial birthers not supported*/
				V.traitor.preg = -1;
				V.traitor.counter.birthsTotal += WombBirthReady(V.traitor, V.traitor.pregData.normalBirth);
				WombFlush(V.traitor);
			} else { /* still pregnant slave */
				V.traitor.preg = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
				V.traitor.pregWeek = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
			}
			SetBellySize(V.traitor); /* In any case it's useful to do.*/
		}

		r.push(`You are awakened in the middle of the night by a jolt that shakes the entire arcology, accompanied by a distant boom. It is followed by another, and another, and then the wail of the arcology's alarm systems, and then finally by a faint crackle that grows to a constant chatter of gunfire. Main power goes out, and you claw your way in the darkness to the video feeds, running on emergency backup.`);

		App.Events.addParagraph(node, r);
		r = [];

		if (V.mercenaries > 0) {
			r.push(`Sheets of flame are pouring from your mercenaries' quarters; it seems they were among the first targets for bombs.`);
		}
		r.push(`Heavy gunfire is bringing down security drones by the scores. The attackers seem to have figured out where the drone hangars are, and are laying down fire on the exits the drones must use to get into action.`);
		if (V.traitor !== 0 && V.traitorType !== "hostage") {
			const {
				his, he,
			} = getPronouns(V.traitor ? V.traitor : {pronoun: App.Data.Pronouns.Kind.neutral});
			r.push(`You can see`);
			if (V.traitor.bellyPreg >= 100000) {
				r.push(`the staggeringly pregnant`);
			} else if (V.traitor.bellyPreg >= 15000) {
				r.push(`the heavily pregnant`);
			} else if (V.traitor.bellyPreg >= 10000) {
				r.push(`the very pregnant`);
			} else if (V.traitor.bellyPreg >= 5000) {
				r.push(`the pregnant`);
			}
			r.push(`${V.traitor.slaveName} on one of the feeds,`);
			if (V.traitorType === "agent" || V.traitorType === "trapper") {
				r.push(`trying to sabotage a stockpile of explosives.`);
			} else if (V.traitorType === "horror") {
				r.push(`encouraging ${his} fellow fighters`);
				if (canTalk(V.traitor)) {
					r.push(`with yells`);
				}
				r.push(`from the back lines.`);
			} else if (V.traitorType === "defiant") {
				r.push(`encouraging ${his} fellow fighters`);
				if (canTalk(V.traitor)) {
					r.push(`with yells`);
				}
				r.push(`and spearheading the charge${(V.traitor.bellyPreg >= 15000) ? ` as best ${he} can` : ""}.`);
			} else {
				r.push(`encouraging ${his} fellow fighters${(canTalk(V.traitor)) ? " with yells" : ""}, and when that fails, leading them by example${(V.traitor.bellyPreg >= 15000) ? ` as best ${he} can` : ""}.`);
			}
		}
		r.push(`In areas already controlled by your enemies, slaveowners are being summarily shot in the streets.`);
		if (V.hackerSupport === 1) {
			r.push(`"${properTitle()}," ${V.assistant.name} says, "the Daughters of Liberty are attempting a coup. They appear to have smuggled a significant quantity of arms and explosives into the arcology.`);
		} else {
			r.push(`"${properTitle()}," ${V.assistant.name} says, "the Daughters of Liberty are attempting a coup. They appear to have smuggled a significant qua — zzzt —" There is nothing more from the computer systems.`);
		}

		App.Events.addParagraph(node, r);
		r = [];

		if (V.traitor !== 0) {
			r.push(`If this were a movie,`);
			if (V.traitorType === "agent" || V.traitorType === "hostage" || V.traitorType === "trapper") {
				r.push(`you'd bleed out in the arms of the sobbing ${V.traitor.slaveName}`);
			} else {
				r.push(`${V.traitor.slaveName} would be the one to kill you`);
			}
			r.push(`after a desperate struggle in your office. Reality does not have such a refined sense of drama.`);
		}
		r.push(`If the Daughters had any plans to take you alive, they are lost to the exigencies of combat. Your penthouse remains locked down, forcing them to use breaching charges to make an entrance. These prove entirely too effective, and your last impression is of the floor heaving bodily up toward the ceiling.`);

		App.Events.addParagraph(node, r);
		App.UI.DOM.appendNewElement("p", node, "GAME OVER", "bold");
		V.ui = "start";
	}
};
