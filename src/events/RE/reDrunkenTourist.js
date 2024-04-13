App.Events.REDrunkenTourist = class REDrunkenTourist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].prosperity >= 100,
			() => V.rep > random(1, 30000) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		const tourist = GenerateNewSlave("XX", {
			minAge: 21, maxAge: 29, race: "nonslave", disableDisability: 1
		});
		tourist.origin = "$He came to your arcology as a tourist and found $himself enslaved.";
		tourist.devotion = random(-70, -55);
		tourist.trust = random(-45, -25);
		setHealth(tourist, jsRandom(10, 20), undefined, undefined, undefined, 5);
		tourist.vagina++;
		tourist.hips = 2;
		tourist.butt = random(4, 6);
		tourist.boobs = 100 * random(10, 18);
		tourist.natural.boobs = tourist.boobs;
		tourist.weight = random(60, 140);
		tourist.behavioralQuirk = "none";
		tourist.sexualQuirk = "none";
		tourist.canRecruit = 0;
		App.Events.drawEventArt(node, tourist, "nice business attire");
		App.Events.addParagraph(node, [
			"While on a midnight stroll through the arcology, you notice a young woman stumbling along one of the pathways, looking lost.",
			"From her clothing to her demeanor you can tell she is a tourist, and an extremely drunk one at that.",
			"Upon seeing you, she stumbles up to you as quickly as she can manage, almost falling over in the process.",
			"She clearly doesn't recognize you as the owner of the arcology, as she makes no attempt at showing deference. "
		]);
		App.Events.addParagraph(node, [`"Excuse *hic* me... I'm lost. I don't know how to get back to my hotel... can you help me? These streets are so confusing..."`]);
		App.Events.addParagraph(node, ["She's going to be in for quite the hangover."]);

		const choices = [];
		choices.push(new App.Events.Result(`Escort her to her hotel`, escort));
		if (V.cash > 20000) {
			choices.push(new App.Events.Result(`Enslave her`, enslave, `This will require an unprofitable ${cashFormat(20000)}, since she is wealthy and obfuscating her fate will require considerable spending`));
		} else {
			choices.push(new App.Events.Result(null, null, `You cannot afford the ${cashFormat(20000)} enslaving her would require, since she is wealthy and obfuscating her fate would necessitate considerable spending`));
		}
		choices.push(new App.Events.Result(`Ignore her`, ignore));
		App.Events.addResponses(node, choices);

		function escort() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [
				"You escort the drunken woman back to her hotel, and she asks you how long you've lived in the arcology.",
				"When you tell her you own the arcology, she thanks you profusely for taking the time to lead her back to her suite and presses herself up against you, trying her best to be sexy despite her impaired state.",
				`She promises to <span class="reputation inc">spread a good word about you,</span> and lets you know that you can come up to her room any time.`
			]);
			repX(500, "event");
			return frag;
		}

		function enslave() {
			const frag = new DocumentFragment();
			App.Events.refreshEventArt(tourist, "no clothing");
			App.Events.addParagraph(frag, [
				"Under the pretense of leading her back to her hotel, you bring her to the penthouse and have her scanned and tagged.",
				"She's so inebriated she thinks it's just a routine security scan, and ends up passing out before you can explain the situation to her fully.",
				"You have a slave carry her off in the meantime so you can initiate her when she wakes.",
				App.UI.newSlaveIntro(tourist)
			]);
			cashX(-20000, "event", tourist);
			return frag;
		}

		function ignore() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [
				"You ignore the woman and move on with your night.",
				"You don't have time to involve yourself in such trivial matters.",
				"Dumbfounded, she stumbles onward in search of her hotel room."
			]);
			return frag;
		}
	}
};
