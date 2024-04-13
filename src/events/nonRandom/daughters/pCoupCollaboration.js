App.Events.PCoupCollaboration = class PCoupCollaboration extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.collaboration === 1,
			() => V.traitorType !== "trapper"
		];
	}

	execute(node) {
		let r = [];
		const {
			His, He,
			his, he, him
		} = getPronouns(V.traitor ? V.traitor : {pronoun: App.Data.Pronouns.Kind.neutral});

		if (V.traitor !== 0) {
			const pregWeeks = V.traitorWeeks;
			V.traitorWeeks = 0;

			WombProgress(V.traitor, pregWeeks, pregWeeks); /* In all cases should be done */
			WombUpdatePregVars(V.traitor);
			if (WombBirthReady(V.traitor, V.traitor.pregData.normalBirth) > 0) { /* normal birth case, partial birthers not supported*/
				V.traitor.preg = -1;
				V.traitor.counter.birthsTotal += WombBirthReady(V.traitor, V.traitor.pregData.normalBirth);
				WombFlush(V.traitor);
			} else { /* still pregnant slave */
				V.traitor.preg = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
				V.traitor.pregWeek = WombMaxPreg(V.traitor); /* most ready fetus is a base*/
			}
			SetBellySize(V.traitor); /* In any case it's useful to do.*/
		}

		r.push(`You are awakened in the middle of the night by an odd darkness. All the normal lights of your healthy arcology are out. Main power has gone out, and you claw your way in the darkness to the video feeds, running on emergency backup.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`Armed rebels are running unchecked down the corridors.`);
		if (V.mercenaries > 0) {
			r.push(`Your mercenaries' quarters is locked down, but from the interior feeds you can see a few of them lying in their beds or slumped in chairs as gas is pumped through the ventilation systems.`);
		}
		r.push(`The security drones are actively assisting the rebels.`);
		if (V.traitor !== 0) {
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
			if (V.traitorType === "agent") {
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
				r.push(`encouraging ${his} fellow fighter${(canTalk(V.traitor)) ? " with yells" : ""}, and when that fails, leading them by example${(V.traitor.bellyPreg >= 15000) ? ` as best ${he} can` : ""}.`);
			}
		}
		r.push(`In areas already controlled by the Daughters, slaveowners are being summarily shot in the streets. "${properTitle()}," ${V.assistant.name} says, "the Daughters of Liberty are in complete control of all arcology systems. Remain here."`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`After half an hour of watching the executions,`);
		if (V.traitor !== 0) {
			const {
				say: say
			} = getEnunciation(V.traitor);
			if (V.traitorType === "agent") {
				r.push(V.traitor.slaveName);
				if (V.traitor.bellyPreg >= 10000) {
					r.push(`waddles`);
				} else {
					r.push(`steps`);
				}
				r.push(`slowly into your office, dreading what is to come. You greet ${him} by name and ${he} breaks down in tears. As ${he} takes a shot at the nearest Daughter, they open fire on the both of you. Your cause of death is that of many an oppressor — an aneurysm of the cerebellum, in 9mm Parabellum.`);
			} else if (V.traitorType === "horror") {
				r.push(V.traitor.slaveName);
				if (V.traitor.bellyPreg >= 10000) {
					r.push(`waddles`);
				} else {
					r.push(`steps`);
				}
				r.push(`gingerly into your office, not happy to be here once more. You greet ${him} by name, in response to which ${he} cowers in fear${(hasAnyArms(V.traitor)) ? ` and drops ${his} weapon` : ""}. Not interested in giving you an opportunity, ${his} comrade takes the shot. Your cause of death is that of many an oppressor — an aneurysm of the cerebellum, in 9mm Parabellum.`);
			} else if (V.traitorType === "defiant") {
				r.push(V.traitor.slaveName);
				if (V.traitor.bellyPreg >= 10000) {
					r.push(`waddles`);
				} else {
					r.push(`strides`);
				}
				r.push(`confidently into your office. You greet ${him} by name, in response to which ${he}`);
				if (hasAnyArms(V.traitor)) {
					r.push(`deals`);
				} else {
					r.push(`orders one of ${his} comrades to give`);
				}
				r.push(`you a vicious open-handed slap that knocks you out of your chair.`);
				if (!canTalk(V.traitor)) {
					r.push(`${His} last words to you are nothing more than a rude gesture.`);
				} else if (V.traitor.slaveName !== V.traitor.birthName) {
					r.push(
						Spoken(V.traitor, `"My name,"`),
						`${he} ${say}s,`,
						Spoken(V.traitor, `"is ${V.traitor.birthName}. I'm going to enjoy this after what you did to me."`)
					);
				} else {
					r.push(
						Spoken(V.traitor, `"You stupid fuck,"`),
						`${he} ${say}s.`,
						Spoken(V.traitor, `"I'm going to enjoy this after what you did to me."`)
					);
				}
				r.push(`Your cause of death is that of many an oppressor — an aneurysm of the cerebellum, in 9mm Parabellum.`);
			} else {
				r.push(V.traitor.slaveName);
				if (V.traitor.bellyPreg >= 10000) {
					r.push(`waddles`);
				} else {
					r.push(`strides`);
				}
				r.push(`confidently into your office. You greet ${him} by name, in response to which ${he}`);
				if (hasAnyArms(V.traitor)) {
					r.push(`deals`);
				} else {
					r.push(`orders one of ${his} comrades to give`);
				}
				r.push(`you a vicious open-handed slap that knocks you out of your chair.`);
				if (!canTalk(V.traitor)) {
					r.push(`${He} wastes no time trying to speak to the likes of you.`);
				} else if (V.traitor.slaveName !== V.traitor.birthName) {
					r.push(
						Spoken(V.traitor, `"My name,"`),
						`${he} ${say}s,`,
						Spoken(V.traitor, `"is ${V.traitor.birthName}."`)
					);
				} else {
					r.push(
						Spoken(V.traitor, `"You stupid fuck,"`),
						`${he} ${say}s.`
					);
				}
				r.push(`Your cause of death is that of many an oppressor — an aneurysm of the cerebellum, in 9mm Parabellum.`);
			}
		} else {
			r.push(`the leader of the assault strides confidently into your office, deals you a vicious open-handed slap that knocks you out of your chair, and holds a pistol to your forehead. Your cause of death is that of many an oppressor — an aneurysm of the cerebellum, in 9mm Parabellum.`);
		}

		App.Events.addParagraph(node, r);
		App.UI.DOM.appendNewElement("p", node, "GAME OVER", "bold");
		V.ui = "start";
	}
};
