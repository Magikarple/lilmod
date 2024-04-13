App.Events.recImmigrant = class recImmigrant extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => ((V.rep/250) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Immigrant";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him
		} = getPronouns(slave);
		let r = [];

		r.push(`Your desk flags a video message as having potential. It's a desperate refugee from outside the Free Cities, begging you to pay ${his} steep immigration fees. ${He} promises to pay you back with interest. ${He} clearly isn't too well informed; the fees are so high that if you lend ${him} the money so ${he} can immigrate, you'll be able to call ${his} debt in and enslave ${him} immediately.`);

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
			r.push(`${He} comes immediately from the immigration center to your arcology. You patiently explain the realities of the situation to ${him}. ${He} isn't too bright and it takes a while for things to sink in. The scanners finally do it, though. ${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is death, ${he} complies. The process is completed with a distinct anticlimax: ${he} is one of your slaves now.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`${He} comes immediately from the immigration center to your arcology. You patiently explain the realities of the situation to ${him}. ${He} isn't too bright and it takes a while for things to sink in. The scanners finally do it, though. ${He} sobs as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} tries to resist placing ${his} biometric signature in testament to the truth of ${his} debt, but when you observe that the alternative is death, ${he} complies. You add that ${he}'s already been purchased by a brothel, and would be well advised to keep obeying. ${He} breaks down entirely at this.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave(null, {race: "nonslave"});
			generateSalonModifications(slave);
			slave.origin = "$He sold $himself into slavery to pay $his immigration costs.";
			slave.devotion = random(-45, -25);
			slave.trust = random(-15, 0);
			return slave;
		}
	}
};
