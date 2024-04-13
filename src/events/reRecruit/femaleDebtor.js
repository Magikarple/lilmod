App.Events.recFemaleDebtor = class recFemaleDebtor extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Female Debtor";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him,
		} = getPronouns(slave);
		let r = [];
		r.push(`One of the tenants in your arcology has not paid rent in some time. In the Free Cities, debtors may be enslaved once their debt reaches a fair price for their enslavement. Your tenant has reached this point. ${He} comes to see you, sobbing in terror; you are pleased to see that ${he} is female and of appropriate age.`);
		App.Events.addParagraph(node, r);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is death, ${he} complies. The process is completed with a distinct anticlimax: ${he} is one of your slaves now.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is death, ${he} complies. A purchasing agent appears to take ${him} away.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: 15, disableDisability: 1, race: "nonslave"});
			slave.origin = "$He was enslaved after $he fell into debt to you.";
			slave.devotion = random(-45, -25);
			slave.trust = random(-15, 0);
			return slave;
		}
	}
};
