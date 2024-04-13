App.Events.secExpSmilingMan0 = class secExpSmilingMan0 extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.rival.state <= 1 || V.rival.state > 2,
			() => V.secExpEnabled > 0,
			() => V.SecExp.smilingMan.progress === 0,
			() => App.Events.effectiveWeek() >= 74,
		];
	}

	execute(node) {
		V.fcnn.push("...encryption techniques: how to protect you and your loved ones from hackers ...");
		V.SecExp.smilingMan.progress++;
		V.SecExp.smilingMan.relationship = 0;
		let r = [];
		const {heA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const cost = 10000;
		const choices = [];

		r.push(
			`During your morning routine, a peculiar report appears: it's been several weeks since your arcology was the victim of a series of cyber-crimes conducted by a mysterious figure. The egocentric criminal apparently took great pride in their acts, to the point of signing them with a symbol: a stylized smiling face. Your arcology was not the only one under assault by the machinations of the one the media quickly nicknamed`,
			App.UI.DOM.makeElement("span", "the Smiling Man.", ["note"])
		);
		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`Despite the sheer damage this criminal did, you cannot help but admire the skill with which every misdeed was performed — the worst white collar crimes of the century, carried out with such elegance that they almost seemed the product of natural laws, rather than masterful manipulation of the digital market. While sifting through the report, ${V.assistant.name} remains strangely quiet. "I'm worried, ${properTitle()} — this individual seems to be able to penetrate whichever system garners his attention. I... feel vulnerable," ${heA} says. "It's not something I'm used to."`]);
		App.Events.addParagraph(node, [`Fortunately you have not been hit directly by this criminal — yet. Still, the repercussions of numerous bankruptcies take their toll on your arcology, whose <span class="red">prosperity suffers.</span>`]);
		V.arcologies[0].prosperity *= random(80, 90) * 0.01;

		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Devote funds to the search for this dangerous criminal`, search, `This will cost ${cashFormat(cost)}`));
			choices.push(new App.Events.Result(`Attempt to contact the mysterious figure`, contact, `This will cost ${cashFormat(cost)}`));
			choices.push(new App.Events.Result(`Invest funds to increase the cyber-security of the arcology`, invest, `This will cost ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `Not enough funds to take further action.`));
		}
		choices.push(new App.Events.Result(`Ignore the issue`, bliss));
		App.Events.addResponses(node, choices);

		function search() {
			cashX(-10000, "event");
			App.Events.queueEvent(3, new App.Events.secExpSmilingMan1(), {investedFunds: V.SecExp.smilingMan.investedFunds || 1});
			V.SecExp.smilingMan.relationship++;
			return `You devote funds to capture and neutralize the threat. You cannot help but wonder what the end game of this "smiling man" is. Money? Fame? Or is he on an ideological crusade?`;
		}
		function contact() {
			cashX(-10000, "event");
			App.Events.queueEvent(3, new App.Events.secExpSmilingMan1(), {investedFunds: V.SecExp.smilingMan.investedFunds || 1});
			V.SecExp.smilingMan.relationship += 2;
			return `You devote funds to an attempt at communicating with the smiling man. You cannot help but wonder what the end game of this "smiling man" is. Money? Fame? Or is he on an ideological crusade?`;
		}
		function invest() {
			cashX(-10000, "event");
			App.Events.queueEvent(3, new App.Events.secExpSmilingMan1(), {investedFunds: V.SecExp.smilingMan.investedFunds || 1});
			V.SecExp.smilingMan.relationship += random(5, 10);
			return `You devote funds to the improvement of the cyber-security of your arcology. You cannot help but wonder what the end game of this "smiling man" is. Money? Fame? Or is he on an ideological crusade?`;
		}
		function bliss() {
			App.Events.queueEvent(3, new App.Events.secExpSmilingMan1());
			return `You do not consider this individual a threat.`;
		}
	}
};
