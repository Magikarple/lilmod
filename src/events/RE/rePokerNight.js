
App.Events.REPokerNight = class REPokerNight extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries > 0
		];
	}

	execute(node) {
		let r = [];
		const buyIn = 5000;
		const {
			HeA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		r.push(`Despite their persistent presence in your arcology, interaction with your mercenaries is relatively scarce. Aside from mutually exchanged nods on the street and the occasional briefing, your ${V.mercenariesTitle} enjoy a degree of autonomy.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`On a particularly lackadaisical evening, you find yourself alerted to a message alert by ${V.assistant.name}.`);
		if (V.assistant.personality > 0) {
			r.push(`"${properMaster()}, a message from your ${V.mercenariesTitle}." ${HeA} pauses before continuing. "It seems they're asking if you'd like to join their poker night."`);
		} else {
			r.push(`${HeA} informs you that the ${V.mercenariesTitle} have sent a message asking you to join them at their poker night.`);
		}

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Politely decline`, decline));
		if (V.cash < buyIn) {
			choices.push(new App.Events.Result(null, null, "You lack the necessary funds to attend a high stakes poker game."));
		} else {
			choices.push(new App.Events.Result(`Attend the poker night`, attend, `It will cost ${cashFormat(buyIn)} to participate in the poker night.`));
		}
		App.Events.addResponses(node, choices);

		function decline() {
			return `You inform ${V.assistant.name} that you aren't planning to attend. A short while later, you receive a message from the ${V.mercenariesTitle} stating that the invitation is an open one and that you're welcome to join in another night.`;
		}

		function attend() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You instruct ${V.assistant.name} to inform your ${V.mercenariesTitle} that you will be attending their poker night, and after settling your affairs in the penthouse you head down to the barracks. Unsurprisingly the atmosphere in the barracks is casual, especially in comparison to the high stakes games commonplace in arcology high society, though your mercenaries still maintain some measure of decorum towards you as their employer. Eventually, you settle in at the table with a handful of ${V.mercenariesTitle} officers and cash in your ${cashFormat(buyIn)} into chips. All that remains is to decide your strategy for the night.`);
			App.Events.addParagraph(frag, r);

			App.Events.addResponses(frag, [
				new App.Events.Result(`Play it safe`, safe),
				new App.Events.Result(`Up the ante`, ante)
			]);
			return frag;

			function safe() {
				const frag = new DocumentFragment();
				let r = [];
				if (random(1, 100) > 50) {
					r.push(`Despite your attempts to mitigate risk and play the safest hands possible, it seems lady luck has conspired against you this evening. However, even when your last chip is spent, your mercenaries pitch you a few chips to keep you in the game for the rest of the night. You may have lost most of your ¤, but it seems you've <span class="reputation inc">made some friends.</span>`);
					repX(5000, "event");
					cashX(-2500, "event");
				} else {
					r.push(`While a careful eye for risk has buoyed you through the evening, ultimately lady luck is the decider in handing you the win in a number of close hands. Unfortunately your meticulous play limited your chance at a larger payout, and you only come away from the evening with ${cashFormat(1000)} more than you arrived with and <span class="reputation inc">the respect of your mercenaries.</span>`);
					repX(500, "event");
					cashX(1000, "event");
				}
				App.Events.addParagraph(frag, r);
				return frag;
			}

			function ante() {
				const frag = new DocumentFragment();
				let r = [];
				const genParam = {
					minAge: 38, maxAge: 43, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
				};
				const slave = GenerateNewSlave((V.seeDicks !== 100) ? "XX" : "XY", genParam);
				slave.origin = "$He put $himself up as collateral at a poker game, and lost.";
				slave.career = "a soldier";
				slave.indentureRestrictions = 2;
				slave.indenture = 52;
				slave.devotion = random(25, 40);
				slave.trust = random(35, 45);
				setHealth(slave, jsRandom(60, 80), 0, undefined, 0, 10);
				slave.muscles = 50;
				if (slave.weight > 130) {
					slave.weight -= 100;
					slave.waist = random(-10, 50);
				}
				slave.anus = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.combat = 70;
				slave.accent = random(0, 1);
				slave.behavioralFlaw = "arrogant";
				slave.hLength = 1;
				slave.hStyle = "strip";
				slave.hLength = 5;
				slave.custom.tattoo = "$He has a number of tattoos from a variety of mercenary companies.";
				slave.clothes = "a military uniform";
				App.Events.drawEventArt(frag, slave);

				const {
					He,
					he, his
				} = getPronouns(slave);

				r.push(`Some aggressive play and an eye for riling up your fellow players has resulted in an immense payout, and all but one of your adversaries have folded as the situation has escalated. The only player still in contention is a wily old mercenary, the veteran of ${his} fair share of battles on the battlefield and at the poker table. ${He}'s short on chips, however, and ${he}'ll have to buy in with something else as collateral.`);
				App.Events.addParagraph(frag, r);

				const choices = [];
				choices.push(new App.Events.Result(`A year of servitude`, serve));
				choices.push(new App.Events.Result(`Dock ${his} wages`, wages));
				App.Events.addResponses(frag, choices);
				return frag;

				function serve() {
					const frag = new DocumentFragment();
					let r = [];
					if (random(1, 100) > 50) {
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck was not on your side. As the victor sweeps up ${his} spoils, the other mercenaries clap you on the back and offer their condolences for your defeat. Though you may have lost your ¤, it seems you've <span class="reputation inc">made some friends.</span>`);
						repX(5000, "event");
						cashX(-5000, "event");
					} else {
						slave.clothes = "no clothing";
						App.Events.refreshEventArt(slave);
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck has rendered you the victor. A silence falls over the room as the result is declared, but after some time your opponent breaks the hush by joking that life as your slave is probably easier than fighting for ${V.arcologies[0].name}. After some awkward laughter the night continues, and at the end your former mercenary joins you on your trip back to the penthouse to submit to processing and to begin ${his} new life as your sexual servant. ${He}'s not young, but ${he}'s tough and not distrusting of you due to ${his} service in the ${V.mercenariesTitle}.`);
						r.push(App.UI.newSlaveIntro(slave));
					}
					App.Events.addParagraph(frag, r);
					return frag;
				}

				function wages() {
					const frag = new DocumentFragment();
					let r = [];
					if (random(1, 100) > 50) {
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck was not on your side. As the victor sweeps up ${his} spoils, the other mercenaries clap you on the back and offer their condolences for your defeat. Though you may have lost your ¤, it seems you've <span class="reputation inc">made some friends.</span>`);
						repX(5000, "event");
						cashX(-5000, "event");
					} else {
						r.push(`For all your skillful maneuvering to reach this position, ultimately the win comes down to chance. This time, however, luck has rendered you the victor. Your opponent accepts ${his} defeat with grace and jokes to ${his} comrades that ${he}'ll be fighting in ${his} underwear for the next few months, and their uproar of laughter fills the room. Though you take the lion's share of the ¤, your mercenaries also <span class="reputation inc">had a good time fraternizing with you.</span>`);
						repX(1000, "event");
						cashX(5000, "event");
					}
					App.Events.addParagraph(frag, r);
					return frag;
				}
			}
		}
	}
};
