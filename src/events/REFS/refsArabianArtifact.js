App.Events.refsArabianArtifact = class refsArabianArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSArabianRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("arabian") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`An arcology in France has raided the Louvre, killing and enslaving several squatters in the process. While they intend to keep most of what they have found, a few items have gone up for sale. ${capFirstChar(V.assistant.name)} has flagged one that could be useful to you: the black stone stele that bears the Code of Hammurabi.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. You have your own rules, and they are law.`, ignore));
		choices.push(new App.Events.Result(`Buy the stele and put it on display.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the stele to try to resell it at a profit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let ${V.assistant.name} know that you're not interested in wasting money on dead Old World laws when your very word is law, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSArabianRevivalist = Math.clamp(V.arcologies[0].FSArabianRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["arabian"];
			} else {
				V.eventResults.artifactsBought.push("arabian");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the stele and put it on prominent display in your promenade. Visitors and citizens alike are <span class="reputation inc">wowed</span> in the presence of the ancient Code, and you find growing support for your vision of a new Arabian Sultanate.`]);
			App.Events.addParagraph(frag, [`You also have a small replica made, and place it in the display case behind your desk, to remind your visitors of your heritage as a lawgiver.`]);
			addTrinket("a small replica of the black stone stele engraved with the Code of Hammurabi which stands in your promenade");
			return frag;
		}

		function resell() {
			const r = [`You buy the ancient stele and start calling around to anyone who might be interested, hoping for a quick and profitable resale.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
