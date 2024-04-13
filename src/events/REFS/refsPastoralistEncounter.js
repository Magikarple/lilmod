App.Events.refsPastoralistEncounter = class refsPastoralistEncounter extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.arcologies[0].FSPastoralist > random(25, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0),
		];
	}

	execute(node) {
		const cost = 1000;
		const slave = GenerateNewSlave("XX", {maxAge: 65, disableDisability: 1, race: "nonslave"});
		if (slave.weight < 50) {
			slave.weight += 50;
		}
		slave.devotion = 100;
		slave.trust = 100;
		setHealth(slave, 100, 0);
		slave.hColor = "grey";
		slave.hStyle = "bun";
		slave.clothes = "conservative clothing";

		const {
			he, his, him, himself, woman
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);

		App.Events.addParagraph(node, [`Pastoralism has taken ${V.arcologies[0].name} by storm and a number of enterprising citizens have been quick to respond by providing new services and businesses in response. One such innovation is a number of experimental new restaurants that incorporate human milk into their recipes, much to the delight of the citizenry. Such establishments have become a fashionable part of ${V.arcologies[0].name}'s taste palate and new takes on the simple premise are common.`]);

		App.Events.addParagraph(node, [`While navigating your arcology on an outing, you find yourself coming across one of the arcology's newest restaurants, a milkshake parlor that prides itself on deriving all of its dairy from human sources.`]);

		const choices = [];
		choices.push(new App.Events.Result(`Keep walking`, ignore));
		if (V.cash >= cost) {
			choices.push(new App.Events.Result(`Offer to sponsor ${him} for a promotional video`, sponsor, `This will cost ${cashFormat(cost)}.`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to promote ${him}.`));
		}
		choices.push(new App.Events.Result(`Have a shake`, workout));
		App.Events.addResponses(node, choices);

		function ignore() {
			return `The establishment is not the first of its kind in the arcology, but the idea seems to be popular enough with the citizenry to accommodate competition. When you've sated your curiosity perusing the courtesy menu by the door, you move on towards your next appointment.`;
		}

		function sponsor() {
			repX(5000, "event");
			cashX(-cost, "event");
			return `You soon discover that the owner of the establishment is a matronly ${woman} who sources ${his} dairy from other mothers in the arcology, having found that new or expectant mothers are often in need of a revenue stream. The two of you sit at the counter for some time, though the owner often excuses ${himself} for a milking in the back room, and together craft a simple promotional ad campaign featuring a simple slogan. Posters bearing the words "Got MILF?" soon grace the walls of ${V.arcologies[0].name}, and your citizens take to the idea of motherly milkshakes and admire your <span class="reputation inc">marketing acumen.</span>`;
		}

		function workout() {
			const frag = new DocumentFragment();
			App.Events.addParagraph(frag, [`The owner of the parlor is so flattered by your patronage of ${his} humble store that ${he} not only provides your drink free of charge but even milks ${himself} at the counter to personally provide the dairy for your shake. The shake's taste is rich, even creamy, with an overall sweet palate mixed with a slight nuttiness.`]);

			App.Events.addParagraph(frag, [`Though you depart without officially sponsoring the milkshake parlor, your presence is endorsement enough to many citizens while others simply <span class="reputation inc">appreciate you drinking amongst them.</span>`]);
			repX(1500, "event");
			return frag;
		}
	}
};
