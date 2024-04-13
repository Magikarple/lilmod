App.Events.recFSSupremacist = class recFSSupremacist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSSupremacist > random(1, 100) ? 1 : 0;
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
		generateSalonModifications(slave);
		slave.origin = "$He was captured and enslaved in a conflict zone and fenced to you by a mercenary group.";
		slave.devotion -= 40;
		slave.trust = random(-45, -25);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const {him} = getPronouns(slave);
		r.push(`Ever since you have been steering ${V.arcologies[0].name} towards a belief in ${V.arcologies[0].FSSupremacistRace} supremacy, you've been receiving increasingly useful communications from groups that share your ideals. Many rebel, mercenary, and paramilitary groups active in conflict zones have racial beliefs of one stripe or other, and by taking the ${V.arcologies[0].FSSupremacistRace} side, you've automatically inserted yourself into a worldwide network of like-minded organizations. You receive an urgent communication from one such private military company.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It seems that they've run into a serious cash flow problem. They may not have liquid assets, but they do have human assets. What they lack is the slaveholding and selling infrastructure to translate the latter into the former. They're interested in fencing some merchandise to you, no questions asked, on a flat fee basis. Included in the message is a slave dossier detailing the piece of human chattel they're offering.`);
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
			r.push(`A battered VTOL craft arrives at ${V.arcologies[0].name}, broadcasting obviously bogus IFF codes. It seems this mercenary group is playing fast and loose in an attempt to get back on their feet. The aircraft doesn't even touch down on the pad they're directed to: it simply hovers`);
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
			r.push(`A battered VTOL craft arrives at ${V.arcologies[0].name}, broadcasting obviously bogus IFF codes. It seems this mercenary group is playing fast and loose in an attempt to get back on their feet. The aircraft doesn't even touch down on the pad they're directed to: it simply hovers`);
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
