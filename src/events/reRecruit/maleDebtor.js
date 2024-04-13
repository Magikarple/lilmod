App.Events.recMaleDebtor = class recMaleDebtor extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Male Debtor";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, him, himself} = getPronouns(slave);
		let r = [];

		r.push(`One of the tenants in your arcology has not paid rent in some time. In the Free Cities, debtors may be enslaved once their debt reaches a fair price for their enslavement. Your tenant has reached this point. ${He} comes to see you, despondent. ${He} is male for the moment, but enslavement will change that status, if only by a technicality. More concrete feminization will be up to you.`);

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
			r.push(`Once you begin the enslavement process, you, your personal assistant, and the forms you're filling out all begin to refer to the slave using female pronouns. ${He} is clearly tormented, and only barely manages to hold ${himself} together for the moment, but is on the verge of breaking down.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Once you begin the enslavement process, you, your personal assistant, and the forms you're filling out all begin to refer to the slave using female pronouns. ${He} is clearly tormented, and only barely manages to hold ${himself} together for the moment, but is on the verge of breaking down. When a purchasing agent appears, ${he} loses it entirely, and the agent is obliged to drag ${him} away.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {
				minAge: 15, maxAge: 30, disableDisability: 1, race: "nonslave"
			});
			slave.origin = "You turned $him into a slave $girl after $he fell into debt to you.";
			slave.devotion = random(-45, -25);
			slave.trust = random(-15, 0);
			slave.anus = 0;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.whoring = 0;
			slave.hStyle = "neat";
			slave.hLength = random(1, 9);
			return slave;
		}
	}
};
