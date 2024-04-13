App.Events.refsChineseArtifact = class refsChineseArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSChineseRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("chinese") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`An arcology owner in China has contacted you with an offer to buy a large wooden statue of the Guan Yin Bodhisattva. He says it has no place in the society he is forming, but he cannot bring himself to destroy the Jin Dynasty relic, as it is said to provide calming and peace to those who view it. Whether the statue is magical or not, he is willing to sell it to fund further expansion of his arcology.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. You're not going to pay that for a hunk of wood.`, ignore));
		choices.push(new App.Events.Result(`Buy the statue. Maybe it will calm down new slaves during inspection.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the statue to try to resell it at a profit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the arcology owner know that you're not interested in subsidizing his social experiments by buying his rejected artifacts, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSChineseRevivalist = Math.clamp(V.arcologies[0].FSChineseRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["chinese"];
			} else {
				V.eventResults.artifactsBought.push("chinese");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the ancient statue and put it on prominent display in the room where you conduct new slave intakes, making sure that it's clearly visible through the glass windows when the room is not in use. Visitors and citizens alike are <span class="reputation inc">reassured</span> by the relic, and you find growing support for your claim on the Mandate of Heaven.`]);
			App.Events.addParagraph(frag, [`You also have a small replica made, and place it in the display case behind your desk, as a constant reminder of your blessing.`]);
			addTrinket("a small wooden statue of the Guan Yin Bodhisattva");
			return frag;
		}

		function resell() {
			const r = [`You buy the ancient statue and start calling around to your Chinese contacts, hoping for a quick and profitable resale.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
