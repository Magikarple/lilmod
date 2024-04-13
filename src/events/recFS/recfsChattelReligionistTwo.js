App.Events.recFSChattelReligionistTwo = class recFSChattelReligionistTwo extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSChattelReligionist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {minAge: 18, maxAge: 42, disableDisability: 1});
		slave.origin = "$He was offered to you by a group of Chattel Religionists eager to be rid of $his blasphemous old world beliefs.";
		setHealth(slave, jsRandom(-10, 10), undefined, undefined, 0, 50);
		slave.devotion = -100;
		slave.trust = -100;
		if (slave.anus > 0) {
			slave.anus = 0;
		}
		if (slave.vagina > 0) {
			slave.vagina = 0;
			slave.trueVirgin = 1;
			slave.career = "a nun";
		} else {
			slave.career = "a priest";
			slave.boobs = 100;
		}
		slave.behavioralFlaw = "devout";
		slave.sexualFlaw = "repressed";

		const {he, him, his} = getPronouns(slave);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`Ever since you have been steering ${V.arcologies[0].name} towards a belief in chattel religionism, you've been receiving increasingly useful communications from groups that share your ideals. With much of the old world in freefall, many groups with particularly vehement religious beliefs are expanding unchecked by the mores of big government, and by taking the chattel religionist side, you've automatically inserted yourself into a worldwide network of like-minded organizations. You receive a message from one such group.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It seems that the Chattel Religionists have all but taken over their town and driven out or converted the local worshippers of old world religions, save for a single religious building and its clergy who continue in defiance. This group has stepped in to put an end to this impiety. However, though they may be ruthless vigilantes, they don't consider themselves murderers. They're interested in fencing a member of the clergy to you, no questions asked, on a flat fee basis. Included in the message is a slave dossier detailing the piece of human chattel they're offering:`);
		if (slave.genes === "XX") {
			r.push(`a lovely virgin nun.`);
		} else {
			r.push(`a rather stuck up priest.`);
		}
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
			r.push(`You complete the legalities and a clearly improvised VTOL craft arrives at ${V.arcologies[0].name}, broadcasting an erratic array of IFF codes. It seems this group hasn't quite mastered the intricacies of air travel. The aircraft doesn't seem capable of the delicate feat of landing on the pad it had been directed to: it simply hovers`);
			if (V.showInches === 2) {
				r.push(`six feet`);
			} else {
				r.push(`two meters`);
			}
			r.push(`off the pad for the five seconds it takes to shove a canvas bag that obviously contains a struggling human form out of the side door. The condemned prays tirelessly throughout the biometric scanning process, utterly shocked and disgusted by what ${he}'s witnessed in just the few minutes ${he}'s been in your arcology. Then it's off to the penthouse for basic slave induction.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			const frag = new DocumentFragment();
			r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You complete the legalities and a clearly improvised VTOL craft arrives at ${V.arcologies[0].name}, broadcasting an erratic array of IFF codes. It seems this group hasn't quite mastered the intricacies of air travel. The aircraft doesn't seem capable of the delicate feat of landing on the pad it had been directed to: it simply hovers`);
			if (V.showInches === 2) {
				r.push(`six feet`);
			} else {
				r.push(`two meters`);
			}
			r.push(`off the pad for the five seconds it takes to shove a canvas bag that obviously contains a struggling human form out of the side door. The condemned prays tirelessly while ${he}'s unpacked, utterly shocked and disgusted by what ${he}'s witnessed in just the few minutes ${he}'s been in your arcology. You tell ${him} to cheer up — ${he}'s off to a nice little brothel where ${he}'ll learn the joys of ${his} new religion. You make out a single word as they are hauled away: "blasphemer". Seems someone wants you to patron them in their new career.`);
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
