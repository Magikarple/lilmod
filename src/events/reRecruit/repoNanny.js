App.Events.recRepoNanny = class recRepoNanny extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Repo Nanny";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, woman} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting offer for you to check out in the newsletter of a professional repossession company. Life in the Free Cities being what it is, there are winners and losers of the ever-changing local and global realities... and when someone falls upon hard times, the repo-men and repo-women start their work. Grim-faced and unmoved by sympathy, they go in to seize the debtor's assets to pay off their debts — which does at times include some quite interesting pieces of merchandise, like a nice slave or two.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The current sale offer by the company was taken from a businesswoman's apartment — one of the higher income strata of the arcology, she's recently had fortune turn from her due to some unfortunate occurrences outside your demesne of the Free Cities. The file doesn't say exactly which — some natural catastrophe, raiders, competing business or whatnot — one thing is for sure though, she's in a financial pinch right now. All of which meant that her slave nanny was fair game to be taken and is now awaiting re-sale. As ${his} mistress never had any sexual interest in the slave, the young ${woman} is actually a virgin and used to the relatively cushy life of just watching children. The fact that all of that ended from one day to the next has made ${him} quite afraid for ${his} future...`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The repo-company doesn't hold on to assets long, they just want to get new cash pretty quickly — which makes this a nice opportunity, as the price for the young ${woman} is set pretty low. It'll just take ${cashFormat(2500)} to buy ${him} off their hands.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 2500;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`With a few keystrokes, you wire the payment to the repo company, then wait for ${his} delivery. After being brought into your penthouse by security, the legalities and biometric scanning with ${him} are taken care off fairly quickly and without fuss. Stepping towards you after the chime announcing a successful registration as your property, ${slave.slaveName} lowers ${his} head obediently and asks,`);
			r.push(Spoken(slave, `"${Master}, I — umm... what will be required of me? I'm really good with children and... and I can sing. Also, I've —"`));
			r.push(`The fearful tremble in ${his} voice tells you that ${he}'s more than a little afraid of what you might have planned for ${him}. Waving off the slave's frightened babbling, you tell ${him} that you'll decide what to do with ${him} when you feel like it.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: 20, maxAge: 25, disableDisability: 1});
			slave.origin = "$He was a nanny before being sold to you.";
			slave.devotion = random(25, 50);
			slave.trust = random(-50, -25);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 20);
			slave.face = random(0, 60);
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.entertainment = random(15, 40);
			slave.skill.whoring = 0;
			slave.boobs = random(3, 8) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 0;
			slave.vaginaLube = 1;
			slave.labia = 1;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.hips = random(-1, 0);
			slave.butt = 0;
			slave.anus = 0;
			slave.weight = random(-80, 20);
			slave.muscles = random(0, 15);
			slave.shoulders = random(-1, 1);
			slave.intelligence = random(-50, 50);
			slave.career = "a nanny";
			slave.fetish = "submissive";
			slave.behavioralQuirk = "adores women";
			slave.sexualQuirk = "caring";
			return slave;
		}
	}
};
