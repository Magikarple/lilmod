// cSpell:ignore tecpatl

App.Events.refsAztecArtifact = class refsAztecArtifact extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSAztecRevivalist > 25,
			() => V.cash > 2 * this.cost, // flush with cash
			() => !V.eventResults.artifactsBought?.includes("aztec") // haven't bought already
		];
	}

	get cost() { return 100000; }

	execute(node) {
		const cost = this.cost;

		App.Events.addParagraph(node, [`You are contacted by a very dour looking arcology owner who is set up near Mexico City. In a monotone voice, he explains that several months ago his construction crews found a large stone object with stairs carved into it, leading to an upper platform. It was determined to be a sacrificial stone, and a survey of the area was conducted, which led to the discovery of an ornate obsidian dagger believed to be intended for use on the platform. The arcology owner explains that he and his people have grown tired of sacrificing slaves on the platform, and have moved onto other things. He is willing to sell and transport both the platform and knife to you for a large fee.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Ignore the offer. For that price you could build your own platform, or several.`, ignore));
		choices.push(new App.Events.Result(`Buy the platform and dagger for your own use.`, buy, `Costs ${cashFormat(cost)}`));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `You let the arcology owner know that you're not interested in wasting money on transporting a huge block of stone, even if it is an Aztec altar, and move on with your day.`;
		}

		function buy() {
			repX(5000, "event");
			cashX(-cost, "event");
			V.arcologies[0].FSAztecRevivalist = Math.clamp(V.arcologies[0].FSAztecRevivalist + 10, 0, 100);
			if (!V.eventResults.artifactsBought) {
				V.eventResults.artifactsBought = ["aztec"];
			} else {
				V.eventResults.artifactsBought.push("aztec");
			}
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`You buy the ancient Aztec altar and have it hauled in and set up in the center of your sacrifice room. It's sure a pain to move, but you're sure you'll find some use for it.`]);
			const t = [`You find a place for the obsidian tecpatl safe in the display case behind your desk, where it can serve as a constant reminder of your heritage.`];
			if (FutureSocieties.isActive('FSPaternalist')) { // no blood sacrifice allowed for paternalists
				t.push(`Conveniently, it's also easy to access when you feel the need to sacrifice a slave.`);
			}
			App.Events.addParagraph(frag, t);
			addTrinket("an ancient obsidian tecpatl, stained with the blood of slave sacrifices");
			if (FutureSocieties.isActive('FSPaternalist')) {
				App.Events.addResponses(frag, [new App.Events.Result(`Choose a slave and let the tecpatl taste blood again.`, sacrifice, `The slave you choose will die.`)]);
			}
			return frag;
		}

		function sacrifice() {
			// always register the full impact from this sacrifice, even if we've already sacrificed slaves earlier this week
			V.slavesSacrificedThisWeek = 0;

			App.Events.addNode(node, [chooseSlave()]);

			return `You notify ${V.assistant.name} to prepare for a sacrifice.`;

			function chooseSlave() {
				const frag = App.UI.DOM.makeElement("div", null, ['margin-top']);

				frag.append(`Choose a slave to sacrifice. This slave will die.`);

				V.slaves
					.filter(s => (s.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')))
					.forEach(slave => {
						App.Events.addNode(frag, [
							App.UI.DOM.link(`Sacrifice ${SlaveFullName(slave)}`, () => {
								App.UI.DOM.replace(frag, App.UI.SlaveInteract.aztecSlaveSacrificeLife(slave));
							}),
							slave.custom.label ? App.UI.DOM.makeElement('span', `(${slave.custom.label})`, ["custom-label"]) : ``,
							isShelterSlave(slave) ? App.UI.DOM.makeElement("span", "(Shelter)", ["red"]) : ``,
							App.UI.DOM.slaveDescriptionDialog(slave, "(Inspect)"),
						], "div", ['indent']);
					});

				return frag;
			}
		}
	}
};
