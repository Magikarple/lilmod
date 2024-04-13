App.Events.refsEgyptianArtifact = class refsEgyptianArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSEgyptianRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("egyptian") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`An arcology owner attempting to recreate ancient Egyptian culture (with his arcology fittingly located in the desert outside of Cairo) has explored and raided a series of tombs and gathered a mass of artifacts. With his surplus of rare artifacts, he is willing to let go of other globally-acquired pieces for a fee. He is offering the Bust of Cleopatra, originally purchased overseas from a crumbling museum near Ontario and painstakingly restored. He is no doubt overcharging, but this could be a boon for your blooming Egyptian society.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. Let the new Pharaoh drown in his mass of artifacts.`, ignore));
		choices.push(new App.Events.Result(`Buy the bust and put it on display.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the bust to try to resell it at a profit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the self-styled Pharaoh know that you're not interested in subsidizing his tomb raiding by buying his rejects, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSEgyptianRevivalist = Math.clamp(V.arcologies[0].FSEgyptianRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["egyptian"];
			} else {
				V.eventResults.artifactsBought.push("egyptian");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the ancient bust and put it on display in your arcology promenade. Visitors and citizens alike are <span class="reputation inc">inspired</span> as they walk under the sultry gaze of Cleopatra, and you find growing support for your vision of a new Egypt.`]);
			App.Events.addParagraph(frag, [`You also have a smaller replica made, and place it in the display case behind your desk, as a constant reminder of your heritage.`]);
			addTrinket("a bust of Cleopatra");
			return frag;
		}

		function resell() {
			const r = [`You buy the ancient bust and start calling around to your Egyptian Revivalist contacts, hoping for a quick and profitable resale.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
