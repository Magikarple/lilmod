App.Events.secExpSmilingMan1 = class secExpSmilingMan1 extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.secExpEnabled > 0,
		];
	}

	execute(node) {
		App.Events.queueEvent(5, new App.Events.secExpSmilingMan2());
		V.fcnn.push("...cybersecurity market is booming thanks to a series of recent high-profile attacks...");
		V.SecExp.smilingMan.progress++;
		let r = [];
		const {hisA, heA, himA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		r.push(
			`You have just reached your penthouse when your faithful assistant appears in front of you, evidently excited.`,
			`"${properTitle()}, I have just received news of a new attack by the Smiling Man. It appears a few hours ago he infiltrated another arcology and caused a catastrophic failure of its power plant.`,
			`Between old debts and the loss of value for his shares, the owner went bankrupt in minutes. It seems the Smiling Man managed to keep a small auxiliary generator functioning enough to project a giant holographic picture of his symbol on the arcology's walls.`,
			`Say what you will about his actions, but you can't deny he has style... Anyways, this opens up a great opportunity to gain control of the structure for ourselves."`,
			`It is indeed a great opportunity, one you cannot resist. You quickly organize the affair and in a few minutes a message reaches your assistant.`
		);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`"Should I open it?" your assistant asks. You silently nod.`]);
		App.Events.addParagraph(node, [`Suddenly the room flashes red, while your assistant fades for half a second. When ${heA} reappears, ${hisA} face has been replaced by a stylized smiling face.`]);
		r = [];
		r.push(
			`"Hello, my dear ${V.PC.birthName}. I can call you ${V.PC.birthName}, right? I've been keeping an eye on you for so long now, it feels like we're friends! I am terribly sorry for my unannounced visit, but I wanted to meet face to face... well, face to hologram."`,
			`it says, letting out a childlike giggle.`,
			`"I'm sure you're aware of my recent activities around this rock of ours, and, well, to put it simply, it's your turn to contribute to my great project! You'll love it when you see it, I'm sure! By the way, thanks for the offer — it's so nice to see people contribute to a worthy cause so generously! Well, I've taken enough of your time, see you soon!"`
		);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`The lights flicker once more and an instant later your assistant returns to ${hisA} usual self.`]);
		App.Events.addParagraph(node, [`"I... I — I couldn't stop him! I'm sorry, ${properTitle()}."`]);
		App.Events.addParagraph(node, [`You waste no time in rushing to the console and checking your finances. It's as you feared, <span class="cash dec">you have been robbed.</span>`]);
		r = [];
		let lostCash = Math.clamp(50000 * Math.trunc(V.week / 20), 50000, 1000000);
		if (V.assistant.power >= 1) {
			r.push(`Fortunately, the computing power available to ${V.assistant.name} allowed ${himA} to`);
			if (V.assistant.power === 1) {
				lostCash -= Math.min(20000, lostCash);
				r.push(`somewhat`);
			} else if (V.assistant.power === 2) {
				lostCash -= Math.min(30000, lostCash);
			} else if (V.assistant.power >= 3) {
				lostCash -= Math.min(40000, lostCash);
				r.push(`significantly`);
			}
			r.push(`limit the damage.`);
			App.Events.addParagraph(node, r);
			r = [];
		}
		if (V.SecExp.buildings.secHub && V.SecExp.buildings.secHub.upgrades.security.cyberBots === 1) {
			lostCash -= Math.min(30000, lostCash);
			r.push(`The additional cyber defenses acquired and running in the security HQ ${lostCash < 200000 ? 'further' : ''} limit the damage.`);
		}
		if (V.SecExp.smilingMan.investedFunds || this.params.investedFunds) {
			lostCash -= Math.min(20000, lostCash);
			r.push(`The funding you dedicated to the Smiling Man case saved some of the assets that would have been otherwise lost.`);
			delete V.SecExp.smilingMan.investedFunds;
		}
		cashX(forceNeg(lostCash), "event");
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`I want them dead. Now.`, kill),
			new App.Events.Result(`I want them, dead or alive!`, find),
			new App.Events.Result(`If we don't find him soon, we will regret it`, findFast),
			new App.Events.Result(`He got what he wanted. Hopefully, we will be left in peace.`, peace),
		]);

		function kill() {
			V.SecExp.smilingMan.relationship--;
			return `You command your loyal operatives to double down on the search and elimination of the threat.`;
		}
		function find() {
			V.SecExp.smilingMan.relationship++;
			return `You command your loyal operatives to double down on the search and capture of the threat.`;
		}
		function findFast() {
			V.SecExp.smilingMan.relationship += 2;
			return `You command your loyal operatives to double down on the search and neutralization of the threat.`;
		}
		function peace() {
			return `You take no further action. Hopefully this ordeal is over.`;
		}
	}
};
