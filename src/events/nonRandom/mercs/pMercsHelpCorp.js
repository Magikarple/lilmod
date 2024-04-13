App.Events.PMercsHelpCorp = class PMercsHelpCorp extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.corp.Incorporated > 0,
			() => V.rival.state > 2,
			() => V.mercenaries >= 3,
			() => V.mercenariesHelpCorp === 0,
			() => V.corp.DivExtra > 0,
			() => App.Events.effectiveWeek() > 70,
		];
	}

	execute(node) {
		let r = [];
		V.nextButton = "Decline"; /* hide button until user makes a selection */
		V.mercenariesHelpCorp = -1;

		r.push(`Your weekly meeting with your ${V.mercenariesTitle} commander finishes with unusual speed. With the arcology owner who set the Daughters on you enslaved, all other immediate threats defused or smashed,`);
		if (V.arcologies[0].FSRomanRevivalistLaw > 0) {
			r.push(`your citizens serving in the urban cohorts with enthusiasm,`);
		}
		if (V.arcologies[0].FSNeoImperialistLaw1 > 0) {
			r.push(`your Knights vigilantly watching the streets for any possible threat,`);
		}
		if (V.arcologies[0].FSAntebellumRevivalistLaw2 === 1) {
			r.push(`your citizens' militias still scouring every corner of the arcology for stragglers,`);
		}
		r.push(`and the ${V.mercenariesTitle} in excellent fighting condition, there just weren't enough concerns from either of your perspectives to fill the time. You sit across your desk from each other, discussing the global situation over ${V.PC.refreshment}.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"You know, ${properTitle()}," the scarred man says thoughtfully. "Threat board's pretty sparse these days. I mean, not for those poor bastards." He`);
		if (V.PC.refreshmentType === 0) {
			r.push(`waves his ${V.PC.refreshment}`);
		} else if (V.PC.refreshmentType === 1) {
			r.push(`uses his glass to point`);
		} else if (V.PC.refreshmentType === 2) {
			r.push(`points a piece of ${V.PC.refreshment}`);
		} else if (V.PC.refreshmentType === 3) {
			r.push(`finishes arranging a line before pointing`);
		} else if (V.PC.refreshmentType === 4) {
			r.push(`using his syringe to point`);
		} else if (V.PC.refreshmentType === 5) {
			r.push(`shaking the bottle of ${V.PC.refreshment}`);
		} else if (V.PC.refreshmentType === 6) {
			r.push(`using the sheet of ${V.PC.refreshment} to point`);
		}
		r.push(`at a screen showing a live news feed from a war on the other side of the world. A huge cloud in an unmistakable, malevolent shape, a broad rising head atop a dirty column of vapor, is towering above a large city.`);

		App.Events.addParagraph(node, r);
		App.Events.addParagraph(node, [`"But in our immediate area, there's just not much that can threaten us. Most trouble on the horizon's going to come from economics and supply and the climate, but that stuff doesn't shoot back. I think we can afford a little dispersal of military effort. Why don't I second squads to your corporation, when we've got the availability? Your corporate guys are already pulling meat out of the conflict zones. No offense to them, they're pretty good, but they're not quite at the level of my boys and girls. And don't worry, I'd keep 'em clear of shit like that." He indicates the on-screen mushroom cloud again.`]);
		r = [];

		r.push(
			App.UI.DOM.makeElement("span", "This is a unique opportunity", "bold"),
			`and will not reoccur.`
		);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [
			new App.Events.Result(`Decline`, decline),
			new App.Events.Result(`Make it so`, makeItSo)
		]);

		function decline() {
			return `Best to keep the ${V.mercenariesTitle} in reserve. You decline, and the commander chuckles. "Well ${properTitle()}, if you insist, I suppose we could find ways to keep busy around the arcology. I mean, we're a little starved for ${V.seeDicks !== 0 ? "female" : "intimate"} company here, but we can make do."`;
		}

		function makeItSo() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
			const {girlU, heU} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
			V.mercenariesHelpCorp = 1;
			return `It's a fine idea, and you agree. The commander looks so enthused that you feel obliged to ask that he not risk himself unduly. He laughs. "There are no old, bold mercs, ${properTitle()}, and I am sure as hell old. I'll be sure to grow even older under contract with you. Now, unless there's anything else, I've just bought a nice ${girlU} to add to the commander's suite, and ${heU} makes me feel a bit younger."`;
		}
	}
};
