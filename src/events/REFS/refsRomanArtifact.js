App.Events.refsRomanArtifact = class refsRomanArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSRomanRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("roman") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`A group of Italian refugees ravaged by earthquakes recently made a historically significant find while attempting to seek shelter in a newly-created ravine. The desperate people came across the Crocea Mors, or "Yellow Death", Julius Caesar's legendary sword. Word of this discovery came to you from an aspiring Free Cities archaeologist after his mercenary escort gunned down the group. He is willing to sell the artifact to an arcology that he believes would revere such a find and keep it safe: an arcology like yours.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. Your city is Roman enough without pricey ancient artifacts.`, ignore));
		choices.push(new App.Events.Result(`Buy the weapon and put it on display.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the weapon to try to resell it at a profit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the archaeologist know that you're not interested in wasting money on trinkets, even Roman ones, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSRomanRevivalist = Math.clamp(V.arcologies[0].FSRomanRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["roman"];
			} else {
				V.eventResults.artifactsBought.push("roman");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the ancient sword and put it on prominent display as the centerpiece of a new Museum of Roman Warfare. Visitors and citizens alike are <span class="reputation inc">wowed</span> in the presence of genuine history, and you find growing support for your vision of a new Rome.`]);
			App.Events.addParagraph(frag, [`You also have a replica made from a plaster mold, and place it in the display case behind your desk, as a constant reminder of your heritage.`]);
			addTrinket("a replica of Julius Caesar's famous sword, the Crocea Mors");
			return frag;
		}

		function resell() {
			const r = [`You buy the ancient sword and start calling around to your Roman Revivalist contacts, hoping for a quick and profitable resale.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
