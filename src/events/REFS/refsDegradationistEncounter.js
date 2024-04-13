App.Events.refsDegradationistEncounter = class refsDegradationistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSDegradationist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 2000;
		const slave = GenerateNewSlave(null, {maxAge: 22, disableDisability: 1});
		slave.origin = "$He was taken into your custody from an owner who treated $him as an equal.";
		slave.devotion = random(0, 50);
		slave.trust = random(25, 70);
		slave.boobs = random(6, 9) * 50;
		slave.natural.boobs = slave.boobs;
		slave.hips = random(-2, -1);
		slave.butt = random(0, 2);
		setHealth(slave, jsRandom(70, 80), 0, undefined, 0, 0);
		slave.clothes = "conservative clothing";
		const {
			he, his, him, girl, wife
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`As a result of ${V.arcologies[0].name}'s adoption of degradationism there has been a remarkable effect on the social status of slaves, with the continued reduction of slave rights taking center stage. However, not all citizens are so keen as to internalize the tenets of degradationism, whether out of misplaced compassion, old habits or adherence to the old world style of relationships.`]);

		App.Events.addParagraph(node, [`On one particular outing, you come across an elderly male citizen holding the hand of his young slave, seemingly on a date at one of the arcology's prominent promenades. From the ring on the ${girl}'s finger and the modest neckline on ${his} clothing, it is clear that ${his} owner is treating ${him} as if ${he} is his ${wife}. His obscene treatment of his slave has already drawn a large crowd of shocked onlookers.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Alert your drones and keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Take the pampered slave ${girl} into your custody`, enslave, `Will cost ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		choices.push(new App.Events.Result(`Publicly confront the citizen`, confront));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You inform ${V.assistant.name} that you have a slave lover in need of harassment by your security drones, then continue on your way. You did not instruct your drones to attack the obscene pair, as the scrutiny and public shame of a drone escort around the arcology are a more fitting punishment for a citizen and will perhaps encourage him to think twice before treating his slave as an equal.`;
		}

		function enslave() {
			slave.clothes = "no clothing";
			App.Events.refreshEventArt(slave);
			cashX(-cost, "slaveTransfer", slave);
			return [
				`Confronting the citizen is simplicity in itself; he would not dare defy you directly under threat of arrest by your security drones and is unlikely to garner any sympathy from the public for his disturbing actions. As such, you are able to take civil ownership over the slave ${girl} and claim ${him} for yourself with only token compensation to the citizen. As you stride away from ${his} former owner with the ${girl} in your arms, ${he} clings to you with obvious naïveté for how you will treat ${him}. It's time ${he} learnt how slaves are treated in ${V.arcologies[0].name}.`,
				App.UI.newSlaveIntro(slave)
			];
		}

		function confront() {
			repX(2500, "event");
			return `Your walk up to the citizen is not accompanied by shaking ground or tumultuous fanfare, yet the citizen looks as if death itself has come before him. You don't hurt him physically, instead chastising him publicly in front of his fellow peers who begin to cheer their agreement. You end your tirade of verbal abuse with a reminder that although the man is a citizen of your arcology, that does not give him the impunity to parade a slave around the arcology as if ${he} were his ${wife}. To make it clear that you will not be so forgiving of his next transgression, a brace of your security drones hover behind you threateningly. The crowd that gathered <span class="reputation inc">approve of your rebuke of the citizen.</span>`;
		}
	}
};
