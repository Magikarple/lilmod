App.Events.recTgAddict = class recTgAddict extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Transgender Addict";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him} = getPronouns(slave);
		let r = [];
		r.push(`One of your tenants asks for an interview. He's an effeminate young man; it seems he's a surgical addict. He has heard that you have a remote surgical unit, and offers to pay well over a fair price to rent its use. Intrigued, you investigate, and find that he has been banned from the regular hospitals for unpaid bills. You could easily reprogram the surgery to ignore his input and instead gender reassign him into a saleable young woman, driving him into enslavable debt at the same time. 'She'll' be slim, inexperienced, and very unhappy.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `You could agree and then reprogram the remote surgery for transformation into a female once he's unconscious. Alternatively, you could transform him and then sell ${him}.`, "note"));
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
			r.push(`When ${he} awakes from surgery, ${he} slowly realizes that whatever ${he} programmed the remote surgery to do wasn't done; instead, ${he}'s a young woman with a flat chest and a new virgin pussy. It takes a while for you to get ${him} to understand, through ${his} tears, that ${he} is now obliged to accept enslavement due to ${his} extreme debts. Eventually ${he} figures it out and glares daggers at you as ${he} signs ${his} life away.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`When ${he} awakes from surgery, ${he} slowly realizes that whatever ${he} programmed the remote surgery to do wasn't done; instead, ${he}'s a young woman with a flat chest and a new virgin pussy. It takes a while for you to get ${him} to understand, through ${his} tears, that ${he} is now obliged to accept enslavement due to ${his} extreme debts. Eventually ${he} figures it out, assisted by a purchasing agent, who restrains ${him} for transportation despite ${his} grief.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {maxAge: 25, disableDisability: 1, race: "nonslave"});
			slave.origin = "You tricked $him into enslavement, manipulating $him based on $his surgical addiction.";
			slave.devotion = random(-75, -60);
			slave.trust = random(-15, 0);
			slave.hStyle = either("neat");
			slave.hLength = random(10, 30);
			generateSalonModifications(slave);
			slave.weight = random(-40, 5);
			slave.vagina = 0;
			slave.skill.vaginal = 0;
			slave.skill.penetrative = 0;
			slave.dick = 0;
			slave.foreskin = 0;
			slave.balls = 0;
			slave.face = 0;
			slave.preg = -2;
			return slave;
		}
	}
};
