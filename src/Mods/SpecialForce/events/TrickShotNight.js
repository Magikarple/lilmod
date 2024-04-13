
App.Events.TrickShotNight = class TrickShotNight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.SF.Toggle,
			() => V.SF.Active >= 1
		];
	}

	execute(node) {
		let r = [];
		const buyIn = 50000;
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const shootChance = Math.max(25 + V.PC.skill.warfare * 0.2, 25 + V.PC.skill.warfare * 0.65); // Odds increase slowly up to 0 skill, then greatly after. Always some odds to succeed or fail.

		App.Events.addParagraph(node, [`Despite your direct elevator, interaction with the majority of your Special Force is relatively scarce. Aside from mutually exchanged nods in the firebase and the occasional briefing, your ${V.SF.Lower} enjoy a degree of autonomy.`]);

		r.push(`On a particularly lackadaisical evening, you find yourself alerted to a message alert by ${V.assistant.name}.`);
		if (V.assistant.personality > 0) {
			r.push(`"${properMaster()}, a message from ${V.SF.Lower}." ${HeA} pauses before continuing. "It seems they're asking if you'd like to join their trick shot night."`);
		} else {
			r.push(`It informs you that ${V.SF.Lower} have sent a message asking you to join them at their trick shot night.`);
		}
		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Politely decline`, decline));
		if (V.cash < buyIn) {
			choices.push(new App.Events.Result(null, null, "You lack the necessary funds to attend."));
		} else {
			choices.push(new App.Events.Result(`Attend the trick shot night`, attend, `It will cost ${cashFormat(buyIn)} to participate in the trick shot night.`));
		}
		App.Events.addResponses(node, choices);

		function decline() {
			return `You inform ${V.SF.Lower} that you aren't planning to attend. A short while later, you receive a message from them stating that their invitation is an open one and that you're welcome to join in another night.`;
		}

		function attend() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You instruct ${V.assistant.name} to inform ${V.SF.Lower} that you will be attending their trick shot night, and after settling your affairs in the penthouse you head down to the firebase. The atmosphere in the firebase is casual, especially in comparison to the usual situations you meet them, though your Special Force still maintains some measure of decorum towards you as their employer. Eventually, you settle in at the table with a handful of ${V.SF.Lower} officers and turn your <span class="cash">${cashFormat(buyIn)}</span> into bullets. All that remains is to decide your strategy for the night.`]);

			const choices = [];
			choices.push(new App.Events.Result(`Play it safe`, safe));
			if (random(1, 100) < shootChance) {
				choices.push(new App.Events.Result(`Up the ante`, ante));
			}
			App.Events.addResponses(frag, choices);
			return frag;

			function safe() {
				if (random(1, 100) > shootChance) {
					repX(5000, "event");
					cashX(-25000, "event");
					return `Despite your attempts to mitigate risk and play the safest shots possible, it seems lady luck has conspired against you this evening. However, when your last bullet is shot, some members of your Special Force pitch you a few bullets to keep you in the game for the rest of the night. You may have lost most of your ¤, but it seems you've <span class="reputation inc">made some friends.</span>`;
				} else {
					const winnings = buyIn * 2;
					repX(5000, "event");
					cashX(winnings, "event");
					return `While a careful eye for accuracy has buoyed you through the evening, ultimately lady luck is the decider in handing you the win in a number of close shots. Unfortunately your meticulous play limited your chance at a larger payout, and you only come away from the evening with <span class="cash inc">${cashFormat(winnings)}</span> more than you arrived with and <span class="reputation inc">the respect of your Special Force.</span>`;
				}
			}

			function ante() {
				const frag = new DocumentFragment();
				let r = [];
				const genParam = {
					minAge: 25, maxAge: 35, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
				};
				const soldier = GenerateNewSlave(V.seeDicks !== 100 ? "XX" : "XY", genParam);
				soldier.origin = "$He put $himself up as collateral at a trick shot game, and lost.";
				soldier.career = "a soldier";
				soldier.indentureRestrictions = 2;
				soldier.indenture = 52;
				soldier.devotion = random(45, 60);
				soldier.trust = random(55, 65);
				setHealth(soldier, jsRandom(60, 80), 0, undefined, 0, jsRandom(10, 30));
				soldier.muscles = 60;
				if (soldier.weight > 130) {
					soldier.weight -= 100;
					soldier.waist = random(-10, 50);
				}
				soldier.anus = 0;
				soldier.skill.anal = 0;
				soldier.skill.whoring = 0;
				soldier.skill.combat = 70;
				soldier.accent = random(0, 1);
				soldier.behavioralFlaw = "arrogant";
				soldier.hLength = 1;
				soldier.hStyle = "buzzcut";
				soldier.clothes = "a military uniform";
				App.Events.drawEventArt(frag, soldier);

				const {
					He,
					he, his
				} = getPronouns(soldier);

				r.push(`Some aggressive play and an eye for riling up your fellow players has resulted in an immense payout, and all but one of your adversaries have folded as the situation has escalated. The only player still in contention is a wily old mercenary, the veteran of ${his} fair share of battles on the battlefield and at the firing range. ${He}'s short on bullets, however, and ${he}'ll have to buy in with something else as collateral.`);
				App.Events.addParagraph(frag, r);

				App.Events.addResponses(frag, [
					new App.Events.Result(`A year of servitude`, serve),
					new App.Events.Result(`Dock ${his} wages`, wages)
				]);
				return frag;

				function serve() {
					const frag = new DocumentFragment();
					let r = [];
					if (random(1, 100) > shootChance) {
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck was not on your side. As the victor sweeps up ${his} spoils, the other Special Force clap you on the back and offer their condolences for your defeat. Though you may have lost your ¤, it seems you've <span class="green">made some friends.</span>`);
						repX(5000, "event");
						cashX(-buyIn, "event");
					} else {
						soldier.clothes = "no clothing";
						App.Events.refreshEventArt(soldier);
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck has rendered you the victor. A silence falls over the room as the result is declared, but after some time your opponent breaks the hush by joking that life as your slave is probably easier than fighting for ${V.arcologies[0].name}. After some awkward laughter the night continues, and at the end your former mercenary joins you on your trip back to the penthouse to submit to processing and to begin ${his} new life as your sexual servant. ${He}'s not young, but ${he}'s tough and not distrusting of you due to ${his} service in ${V.SF.Lower}.`);
						r.push(App.UI.newSlaveIntro(soldier));
					}
					IncreasePCSkills('warfare', 1);
					App.Events.addParagraph(frag, r);
					return frag;
				}

				function wages() {
					IncreasePCSkills('warfare', 1);
					if (random(1, 100) > shootChance) {
						repX(5000, "event");
						cashX(-buyIn, "event");
						return `For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck was not on your side. As the victor sweeps up ${his} spoils, the other Special Force members clap you on the back and offer their condolences for your defeat. Though you may have lost your ¤, it seems you've <span class="reputation inc">made some friends.</span>`;
					} else {
						repX(10000, "event");
						cashX(buyIn, "event");
						return `For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck has rendered you the victor. Your opponent accepts ${his} defeat with grace and jokes to ${his} comrades that ${he}'ll be fighting in ${his} underwear for the next few months, and their uproar of laughter fills the room. Though you take the lion's share of the ¤, your Special Force also <span class="reputation inc">had a good time fraternizing with you.</span>`;
					}
				}
			}
		}
	}
};
