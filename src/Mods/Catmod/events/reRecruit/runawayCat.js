App.Events.recRunawayCat = class recRunawayCat extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeCats !== 0,
			() => V.projectN.techReleased !== 0,
			() => ((V.rep/400) > random(1, 100) || V.cheatMode === 1)
		];
	}

	get eventName() {
		return "Runaway Cat";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl} = getPronouns(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has noted that you have a 'pressing' piece of business to attend to. With a wave of your hand, you bring up the notification to see that a runaway slave has apparently been waiting outside your penthouse for the entire night. What's more, ${he}'s owned by a prominent rival arcology owner within the cluster - and ${he}'s a cat${girl}, to boot. Apparently, according to the short, hand-scrawled letter that ${V.assistant.name} has digitized into the notification, ${his} former master regularly beat ${him} both out of frustration and for pleasure, and ${he}'s approached you hoping for a better life in the slavery that's defined ${his} existence.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The exclusive and novel nature of cat${girl}s makes ${him} an exceptionally valuable slave, and the genetic modification that created ${him} has ensured that the feline face you look over in the automated overview is particularly attractive, but taking ${him} under your wing away from another wealthy plutocrat would cause a whole score of problems. Deciding it'd be best not to make more enemies than you have to, you call up the rival on your personal phone, who answers after only a few seconds. After you explain the situation, the abusive oligarch chuckles, admits that he hadn't even noticed the cat${girl} leaving, and says he'll formally sell ${him} over to you for "just" twenty thousand credits. Otherwise, he'll give you a little cash to show his appreciation for sending the runaway back home.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The other oligarch's offer is a pretty heavy ${cashFormat(20000)}, although his cat${girl} slave is pretty, young, and seems fairly well-trained. ${He}'s still got a few scars from regular abuse, though, both mental and physical, and despite ${his} offer of self-enslavement seems exceptionally skittish and scared around you.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 20000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Return ${him} to ${his} owner`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You agree to the other plutocrat's offer and after a quick transfer of credits between your private lines, he casually congratulates you on your new slave, makes a joke about sloppy seconds, and hangs up. You call down for a guard outside to bring the skittish new cat${girl} up to your office so you can get your fresh new slave better introduced into your harem.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You shrug to yourself and tell the other oligarch you'll send ${him} back over. The rival plutocrat tells you that he'll send you offer a little 'gift' to show his appreciation as you hang up and order some of the arcology guards to take the nervous cat${girl} outside away. A few days later, the abusive oligarch makes good on his promise and you find a generous sum of money, about the estimate worth of the cat${girl}, deposited into your account. Easiest money you've ever made.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave(null, {minAge: 16, maxAge: 22, race: "catgirl"});
			slave.face = random(25, 75);
			slave.origin = "$He was bioengineered by a rival arcology owner. After being mistreated, $he escaped and came to you for protection.";
			slave.slaveName = App.Data.misc.catSlaveNames.random();
			slave.birthName = slave.slaveName;
			slave.weight = 10;
			slave.muscles = 0;
			slave.waist = 10;
			slave.slaveSurname = "";
			slave.birthSurname = "";
			slave.career = "an orphan";
			slave.intelligenceImplant = 0;
			slave.teeth = "fangs";
			slave.devotion = random(-25, -10);
			slave.trust = random(-25, -10);
			slave.earShape = "none";
			slave.earT = "cat";
			slave.earTColor = slave.hColor;
			slave.earImplant = 1;
			slave.tailShape = "cat";
			slave.tailColor = slave.hColor;
			slave.eye.left.pupil = "catlike";
			slave.eye.right.pupil = "catlike";
			slave.accent = 2;
			slave.canRecruit = 0;
			App.Medicine.Modification.addScar(slave, "back", "whip");
			slave.behavioralFlaw = "odd";
			return slave;
		}
	}
};
