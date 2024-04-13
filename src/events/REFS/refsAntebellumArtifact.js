App.Events.refsAntebellumArtifact = class refsAntebellumArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSAntebellumRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("antebellum") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`You are contacted by an arcology owner outside of Richmond whose culture is just taking shape. Ironically, despite his location he has no interest in Antebellum Revivalism, and is building a new Edo empire. As a consequence, many items of Confederate fame have been acquired and put up for sale by him. One of these items is particularly desirable: a Colt Model 1855 revolver, the personal sidearm of Robert E. Lee, with custom engravings that announce it as such.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. You have plenty of weapons already, and could buy a whole shipment for that price.`, ignore));
		choices.push(new App.Events.Result(`Buy the revolver. It belongs in a museum. Your museum.`, display, `Costs ${cashFormat(cost)}`));
		choices.push(new App.Events.Result(`Buy the revolver to try to resell it. There is no shortage of plantations that would be a good fit.`, resell, `Results may vary`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the arcology owner know that you're not interested in wasting money on overpriced pistols, even Antebellum ones, and move on with your day.`;
		}

		function display() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSAntebellumRevivalist = Math.clamp(V.arcologies[0].FSAntebellumRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["antebellum"];
			} else {
				V.eventResults.artifactsBought.push("antebellum");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the antique revolver and put it on prominent display as the centerpiece of your Museum of the Antebellum South. Visitors and citizens alike are <span class="reputation inc">wowed</span> in the presence of a genuine artifact, and you find growing support for your vision of a new Dixieland.`]);
			App.Events.addParagraph(frag, [`You also have an exact replica made, and place it in the display case behind your desk, as a constant reminder of your heritage.`]);
			addTrinket("a Colt Model 1855 revolver that once belonged to Robert E. Lee");
			return frag;
		}

		function resell() {
			const r = [`You buy the antique revolver and start calling around to your numerous contacts who are Sons and Daughters of the Confederacy, hoping for a quick and profitable resale.`];
			r.push(App.Events.auctionREFSArtifact(cost));
			return r;
		}
	}
};
