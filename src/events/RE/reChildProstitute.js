App.Events.REDrunkenTourist = class REDrunkenTourist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.minimumSlaveAge < 13
		];
	}

	execute(node) {
		const kid = GenerateNewSlave("XX", {
			minAge: 10, maxAge: 13, race: "nonslave", disableDisability: 1
		});
		kid.genes
		kid.origin = "You found $him on the streets.";
		kid.devotion = random(21, 50);
		kid.trust = random(0, 50);
		setHealth(kid, jsRandom(10, 20), undefined, undefined, undefined, 5);
		kid.vagina = random(0, 1);
		kid.hips = 0;
		kid.butt = random(0, 2);
		kid.boobs = 100 * random(0, 3);
		kid.natural.boobs = kid.boobs;
		kid.weight = random(-10, 20);
		kid.behavioralQuirk = "none";
		kid.sexualQuirk = "tease";
		kid.canRecruit = 0;
		kid.counter.oral = random(0,20)
		kid.skill.oral = random(31, 50) // Natural-born cocksucker

		App.Events.drawEventArt(node, kid, "a mini dress");
		App.Events.addParagraph(node, [
			"While on a midnight stroll through the arcology's red-light district taking in the gratuitous sights of the experienced and mature prostitutes, you hear a young voice call out to you,",
		]);
		App.Events.addParagraph(node, [`"Hey there, ${V.PC.title === 1 ? 'Mister' : 'Miss'}. Wanna fuck?" She looks up at you with lustful, no, aroused eyes.`]);

		const choices = [];

		choices.push(new App.Events.Result(`Denial`, denial));
		if (V.cash > 30) {
			choices.push(new App.Events.Result(`Enslave her`, accept, `It normally costs about ${cashFormat(30)} for most sex acts, with pay-as-you-go for more time or special requests.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You cannot afford the ${cashFormat(30)} to have sex with her.`));
		}
		if (V.cash > 1000) {
			choices.push(new App.Events.Result(`Enslave her`, enslave, `This will require ${cashFormat(1000)} to handle the paperwork of transferring her from her current job as prostitute to a slave, along with being a minor.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You cannot afford the ${cashFormat(1000)} enslaving her would require, since there is extra paperwork regarding her current age and occupation.`));
		}
		choices.push(new App.Events.Result(`Ignore her`, ignore));
		App.Events.addResponses(node, choices);

		function denial() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You turn to acknowledge her, "Sorry, not interested." You say as you attempt to politely decline.`])
			App.Events.addParagraph(frag, [`"What, a ${V.PC.title === 1 ? 'handsome man' : 'lady'} like you can't handle a ${kid.actualAge}-year-old girl?"`])
			App.Events.addParagraph(frag, [`You hesitate a bit at the teasing, and she takes the opportunity to continue,`])
			App.Events.addParagraph(frag, [`"I'll ${V.PC.title === 1 ? 'suck your cock' : 'lick your cunt'} for free, "`])
			App.Events.addParagraph(frag, [``])
			return frag;
		}
		
		function enslave() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [
			"How old are you?",
			`"${kid.actualAge}, I bet you like that though, huh?"`,
			`You seem pretty eager to get laid, if you sign your rights to me then I'll make sure that you get plenty of action.`,
		])
			App.Events.refreshEventArt(kid, "no clothing");
			App.Events.addParagraph(frag, [
				"How old are you?",
				`"${kid.actualAge}, are you into that you perv?"`,
				App.UI.newSlaveIntro(kid)
			]);
			cashX(-1000, "event", kid);
			return frag;
		}

		function ignore() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [
				"You ignore the girl and move on with your night.",
				"You don't have time to involve yourself in such trivial matters, and besides, she's only a kid."
			]);
			return frag;
		}
	}
};
