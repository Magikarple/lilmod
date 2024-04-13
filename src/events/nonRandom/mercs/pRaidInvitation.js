App.Events.PRaidInvitation = class PRaidInvitation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.mercenaries > 0
		];
	}

	execute(node) {
		V.nextButton = "Continue";

		App.Events.addParagraph(node, [
			`The former country whose citizens launched the ultimately futile attack on the arcology has continued to degenerate. After a series of civil disturbances and minor natural disasters, the nearest major city is being abandoned by its few remaining residents. A regional warlord is threatening the area, so they are streaming in small parties towards another city that is not yet under his shadow.`
		]);

		App.Events.addParagraph(node, [
			`The citizens of ${V.arcologies[0].name} view their discomfiture without much pity. These people almost certainly would have abused them just as much as they are now in danger of being abused themselves, had the attack on the Free City been a success. There would be little to no criticism if you and your mercenary contingent were to take this unique opportunity to corral one of the refugee groups. They are refugees, after all; no one will miss them.`
		]);

		const raidCost = 5000;
		App.Events.addParagraph(node, [`Fund a quick raid on the refugees with ${cashFormat(raidCost)}, targeting:`]);

		const choices = [];
		if (V.cash > raidCost) {
			choices.push(new App.Events.Result(`Ex-soldiers`, exSoldiers));
			choices.push(new App.Events.Result(`Healthy civilians`, healthyCiv));
			choices.push(new App.Events.Result(`The largest possible group of slaves`, slaveDotMax));
		} else {
			choices.push(new App.Events.Result(null, null, `You can't even afford ${cashFormat(raidCost)}`));
		}
		choices.push(new App.Events.Result(`Or, just let them go`, free));
		App.Events.addResponses(node, choices);

		function exSoldiers() {
			cashX(-raidCost, "war");
			App.Events.queueEvent(1, new App.Events.PRaidResult(), {raidTarget: 1});
			return `Your mercenaries probably would have been enthusiastic even before the recent combat, but now they're positively eager. The split agreed upon is that they keep the proceeds from the sale of anything that isn't sex slave material, while you keep anything that is.`;
		}

		function healthyCiv() {
			cashX(-raidCost, "war");
			App.Events.queueEvent(1, new App.Events.PRaidResult(), {raidTarget: 2});
			return `Your mercenaries probably would have been enthusiastic even before the recent combat, but now they're positively eager. The split agreed upon is that they keep the proceeds from the sale of anything that isn't sex slave material, while you keep anything that is.`;
		}

		function slaveDotMax() {
			cashX(-raidCost, "war");
			App.Events.queueEvent(1, new App.Events.PRaidResult(), {raidTarget: 3});
			return `Your mercenaries probably would have been enthusiastic even before the recent combat, but now they're positively eager. The split agreed upon is that they keep the proceeds from the sale of anything that isn't sex slave material, while you keep anything that is.`;
		}

		function free() {
			return `Some of the refugees make it to safety. Some do not.`;
		}
	}
};

