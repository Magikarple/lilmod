App.Events.SEFcnnStation = class SEFcnnStation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.rival.state <= 1 || V.rival.state > 2,
			() => V.seeFCNN === 1,
			() => V.FCNNstation === 0,
			() => V.week > 95,
			() => V.cash > 200000,
			() => V.rep > 7500
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "FCTV";
		V.FCNNstation = -1;

		const cost = 100000;
		const {girlP} = getPronouns(V.PC).appendSuffix("P");
		App.Events.addParagraph(node, [`One of the first groups to take advantage of the Free Cities' nearly nonexistent regulations for media and communications was the Free Cities News Network. As one of the few stations covering news within the Free Cities, and the only one doing so without any form of censorship, FCNN quickly became one of the most popular news networks in the world. Presently, however, the network's future looks grim. Its reluctance on portraying explicitly pornographic content has led to plummeting audience figures, especially in comparison to the upstart 8HGG Inc. media empire. In addition, governments within and outside the Free Cities have become increasingly restrictive towards the press, to the point that many FCNN branches have been effectively silenced.`]);

		App.Events.addParagraph(node, [`This is the situation when you receive a personal video call from the network's beleaguered president. The former FCNN headquarters has been outright destroyed for reporting on its host nation's human rights abuses, and they're hoping to relocate to ${V.arcologies[0].name}. "We are, of course, in dire financial straits," the president nervously explains, "So we'll need a small subsidy to establish our new headquarters. Probably, oh, let's say... <span class="yellowgreen">${cashFormat(cost)}</span> or so?" He flinches while forcing a grin.`]);

		App.Events.addParagraph(node, [`You ponder their proposal to yourself. ${(V.seeFCNN === 1) ? `While you're not exactly a FCNN fan${girlP},` : `Though you may not listen to FCNN regularly,`} and the price certainly seems outrageous, accepting the offer would likely be a boost to your public reputation, as well as the local economy. The network is clearly at the end of their rope; the fact they would even ask for money beforehand is proof enough of that. If you don't accept their offer now, they'll probably go bankrupt or worse before you can get another chance to.`]);

		const choices = [];
		if (V.cash > cost) {
			choices.push(new App.Events.Result(`Accept`, accept));
		} else {
			choices.push(new App.Events.Result(null, null, `You cannot afford the asking price`));
		}

		choices.push(new App.Events.Result(`Decline`, decline));
		App.Events.addResponses(node, choices);

		function accept() {
			cashX(forceNeg(cost), "capEx");
			V.arcologies[0].prosperity += 2;
			V.FCNNstation = 1;
			return `You accept the FCNN president's offer. He looks like he's about to burst into tears after hearing this, especially since you offer no caveats as well, but struggles to maintain a professional composure regardless. Before the week is over, FCNN has established their new headquarters in ${V.arcologies[0].name}.`;
		}

		function decline() {
			V.FCNNstation = -1;
			return `You decline the FCNN president's offer. There's very little change in his expression; he was probably expecting this response. He accepts your decision, thanks you for your time, and unenthusiastically claims the network will soldier on regardless.`;
		}
	}
};
