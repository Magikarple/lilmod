App.Events.refsEdoArtifact = class refsEdoArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSEdoRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("edo") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`Recently, looters in Japan raided the tomb of Miyamoto Musashi, and attempted to take his famed swords. The looters were struck down by a mysterious swordsman, who now seeks to find a place where Musashi's weapons will be safe and honored. He is offering them to you as a set for a steep fee, with the intention of using the proceeds to fortify the area around the tomb.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the strange man's offer. The swords may not even be genuine for all you know.`, ignore));
		choices.push(new App.Events.Result(`Buy the swords. Perhaps one day you'll be able to wield them in concert, but for now they will make a symbolic display piece.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the swords to try to resell them to a master samurai at a profit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the strange man know that you're not interested in wasting money on trinkets of questionable authenticity, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSEdoRevivalist = Math.clamp(V.arcologies[0].FSEdoRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["edo"];
			} else {
				V.eventResults.artifactsBought.push("edo");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the ancient katana and wakizashi, and put them on prominent display in your office, happy to support the strange man's honorable goal of protecting the Miyamoto tomb. Visitors are <span class="reputation inc">wowed</span> in the presence of genuine history, and you find growing support for your vision of a revived Edo Japan.`]);
			addTrinket("Miyamoto Musashi's legendary katana and wakizashi");
			return frag;
		}

		function resell() {
			const r = [`You buy the ancient katana and wakizashi and start calling around to your Edo Revivalist contacts, hoping to find a master samurai worthy of wielding them...and willing to pay.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
