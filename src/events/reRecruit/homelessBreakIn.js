App.Events.recHomelessBreakIn = class recHomelessBreakIn extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.week > 46,
			() => ((V.rep/100) > random(1, 100)) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	get eventName() {
		return "Homeless Break-in";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He, His,
			he, his, him,
		} = getPronouns(slave);
		let r = [];

		r.push(`As you work at your desk over some of the economic reports regarding the state of housing in your arcology, you happen to spot an unusual notification during the early morning hours. As it turns out, the cooks at one of the more trendy restaurants woke up to find the backdoor left wide open. It wouldn't have been interesting to anyone save for the fact that a large amount of their stock had been thoroughly ravaged by a few opportunist homeless residents.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Most of the individuals who broke in had the intelligence to not only evade suspicion on their way in, but scamper away before dawn, with the sole exception of a single one of them, discovered amongst a pile of half-eaten luxury dishes with a huge belly contrasting ${his} thin frame.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Given the damage ${his} fine dining experience has cost the eatery, and the complete lack of any significant funds to ${his} name, this individual ended up, unsurprisingly, enslaved by the property's owner. Judging by the few low resolution images you glanced over along the horrible security footage, your keen eyes recognize the looks hidden beneath the grime of ${his} lifestyle. The price is rather cheap, as the restaurant staff seem more intent on punishing them rather than reimbursing their losses, while the owner wants nothing more than to be rid of the gluttonous thief, so surely they would be more than happy to have ${him} taken off of their hands.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `${His} price is a measly ${cashFormat(1000)} credits. Alternatively, you could buy ${him} and sell ${him} for a bit of profit.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost - 1000; // -1000 just for homeless peep :(
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You eclipse the few low offers bidding for ${him} with something far above the usual rate of menial slaves. Not that unusual in the Free Cities, thanks to the many strange interests of its denizens. A few hours pass until you have ${him} brought up to your penthouse to finish the process, letting ${him} enter with a slow waddle as ${his} belly remains firmly rounded by ${his} escapade. A look of resigned apprehension rests over ${his} face as ${he} slowly follows the scanners' instructions, perhaps thanks to the slight comfort of having experienced quite the night before. ${He}'ll be experiencing quite the discomfort over the following days, however, when ${he}'ll realize that ${he}'ll be staying stuffed full of food until you say otherwise.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You have ${him} released from custody and brought up to your penthouse, where ${he} wearily submits to biometric scanning to be registered as your slave. When the purchasing agent arrives, you clarify that you have sold ${him} to a proper slave trader who will handle the rest. ${His} reaction doesn't evoke much of any emotion, if maybe a little hint of wonder about what could have happened if ${he} stayed with you.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave(null, {race: "nonslave"});
			generateSalonModifications(slave);
			slave.origin = "$He was sold after eating $himself into debt.";
			slave.career = "homeless";
			setHealth(slave, jsRandom(-30, 10));
			slave.weight = -40;
			slave.muscles = random(-40, 20);
			slave.intelligence = random(0, 100);
			slave.behavioralFlaw = "gluttonous";
			slave.face = random(20, 100);
			slave.boobs = Math.min(slave.boobs, 300);
			slave.butt = Math.min(slave.butt, 2);
			slave.hStyle = "messy";
			slave.pubicHStyle = "bushy";
			slave.underArmHStyle = "bushy";
			slave.clothes = "an oversized t-shirt and boyshorts";
			slave.inflation = 3;
			slave.inflationType = "food";
			slave.inflationMethod = 1;
			SetBellySize(slave);
			return slave;
		}
	}
};
