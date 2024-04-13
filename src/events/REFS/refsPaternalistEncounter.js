App.Events.refsPaternalistEncounter = class refsPaternalistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSPaternalist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 2000;
		const slave = GenerateNewSlave(null, {maxAge: 22, disableDisability: 1});
		slave.origin = "$He was taken into your custody from an abusive owner.";
		slave.devotion = random(0, 25);
		slave.trust = random(0, 25);
		slave.boobs = random(6, 9) * 50;
		slave.hips = random(-2, -1);
		slave.butt = random(0, 2);
		setHealth(slave, jsRandom(-30, -10), normalRandInt(10, 3), normalRandInt(10, 3));
		slave.clothes = "uncomfortable straps";
		slave.collar = "uncomfortable leather";
		const {
			he, his, him, girl
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`As a result of ${V.arcologies[0].name}'s adoption of paternalism there has been a remarkable effect on relationships between slaves and owners, with the flourishing of mutual respect between the two forming the basis for social life in the arcology. However, not all citizens are so keen as to internalize the tenets of paternalism, whether out of prejudice, old habits or adherence to a more brutal style of slaveholding.`]);

		App.Events.addParagraph(node, [`On one particular outing, you come across an elderly male citizen giving his young slave quite a thrashing in the street outside of a prominent apartment complex. From the skinned state of the poor ${girl}'s knees and the cruel spiked collar about ${his} neck, it is clear that ${his} owner has been dragging ${him} about the arcology as if ${he} were a dog. To say nothing of this degrading treatment, beating of a slave in public is a fineable offense.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Alert your drones and keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Take the poor slave ${girl} into your custody`, enslave, `Will cost ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		choices.push(new App.Events.Result(`Publicly confront the citizen`, confront));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You inform ${V.assistant.name} that you have a slave beater in need of detainment by your security drones, then continue on your way confident in your knowledge that the citizen will soon be in custody.`;
		}

		function enslave() {
			slave.clothes = "no clothing";
			App.Events.refreshEventArt(slave);
			cashX(-cost, "slaveTransfer", slave);
			return [
				`Confronting the citizen is simplicity in itself; he would not dare defy you under threat of arrest by your security drones and is unlikely to garner any sympathy from the public for his degradationist behaviors. As such, you are able to take civil ownership over the poor slave ${girl} and take ${him} into your care with only minimal compensation to the citizen. As you stride away from ${his} former owner with the ${girl} in your arms, ${he} leans over to plant a chaste kiss of thanks on your cheek.`,
				App.UI.newSlaveIntro(slave)
			];
		}

		function confront() {
			repX(2500, "event");
			return `Your walk up to the citizen is not accompanied by shaking ground or tumultuous fanfare, yet the citizen looks as if death itself has come before him. You don't hurt him physically, instead chastising him publicly in front of his fellow peers who begin to cheer their agreement. You end your tirade of verbal abuse with a reminder that although the man is a citizen of your arcology, that does not give him the impunity to shirk the law. To make it clear his next offense will be his last, a brace of your security drones hover behind you threateningly. The crowd that gathered <span class="reputation inc">approve of your rebuke of the citizen.</span>`;
		}
	}
};
