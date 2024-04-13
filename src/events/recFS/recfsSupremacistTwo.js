App.Events.recFSSupremacistTwo = class recFSSupremacistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSSupremacist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const pram = {disableDisability: 1};
		if (V.arcologies[0].FSSubjugationistRace !== 0) {
			pram.race = V.arcologies[0].FSSubjugationistRace;
		} else {
			const races = App.Utils.getRaceArrayWithoutParamRace(V.arcologies[0].FSSupremacistRace);
			pram.race = races.random();
		}
		const slave = GenerateNewSlave(null, pram);
		slave.origin = `$He made the mistake of marrying into a ${V.arcologies[0].FSSupremacistRace} neighborhood and was kidnapped then sold to you.`;
		slave.devotion -= 40;
		slave.trust = random(-45, -25);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const {
			him, woman, wife
		} = getPronouns(slave);
		r.push(`Ever since you have been steering ${V.arcologies[0].name} towards a belief in ${V.arcologies[0].FSSupremacistRace} supremacy, you've been receiving increasingly useful communications from groups that share your ideals. With much of the old world in freefall many groups with particularly vehement racial beliefs are expanding unchecked by the mores of big government, and by taking the ${V.arcologies[0].FSSupremacistRace} side, you've automatically inserted yourself into a worldwide network of like-minded organizations. You receive a communication from one such group.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It seems that in a man in their town made the mistake of marrying a ${woman} of an undesirable racial background, and this group has stepped in to put an end to such a distasteful union. However, though they may be ruthless vigilantes, they don't consider themselves murderers. They're interested in fencing this former ${wife} to you, no questions asked, on a flat fee basis. Included in the message is a slave dossier detailing the piece of human chattel they're offering.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`A clearly improvised VTOL craft arrives at ${V.arcologies[0].name}, broadcasting an erratic array of IFF codes. It seems this group hasn't quite mastered the intricacies of air travel. The aircraft doesn't seem capable of the delicate feat of landing on the pad it had been directed to: it simply hovers`);
			if (V.showInches === 2) {
				r.push(`six feet`);
			} else {
				r.push(`two meters`);
			}
			r.push(`off the pad for the five seconds it takes to shove a canvas bag that obviously contains a struggling human form out of the side door.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`A clearly improvised VTOL craft arrives at ${V.arcologies[0].name}, broadcasting an erratic array of IFF codes. It seems this group hasn't quite mastered the intricacies of air travel. The aircraft doesn't seem capable of the delicate feat of landing on the pad it had been directed to: it simply hovers`);
			if (V.showInches === 2) {
				r.push(`six feet`);
			} else {
				r.push(`two meters`);
			}
			r.push(`off the pad for the five seconds it takes to shove a canvas bag that obviously contains a struggling human form out of the side door. You decide to do the simple thing, and leave the bag where it is. The purchaser's agent can deal with it.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
