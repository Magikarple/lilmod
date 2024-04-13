App.Events.recRepoMilfHousekeeper = class recRepoMilfHousekeeper extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Repo MILF Housekeeper";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, woman} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting offer for you to check out in the newsletter of a local university. Life in the Free Cities being what it is, there are winners and losers of the ever-changing local and global realities. In a novel change of pace, it seems this offer comes from one of the Free Cities' rare winners.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The current sale offer comes from one of the arcology's oldest college frat-houses — apparently a wealthy alumnus of the fraternity has bestowed a significant donation on the current brothers of the frat house. A few visits to the slave market later, the frat house is practically flush with fresh, nubile, slavegirls. Yet, all these new slaves have left little room for one of the frat house's oldest fixtures — an older female slave who doubled as both a housekeeper and fuckhole for a few generations of horny students. ${He}'s pretty and has been well-trained over the years, if a bit exhausted from ${his} decades of serving as a sexual outlet to a house of frat brothers.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The brothers don't want to hold onto ${him} for long, having already been entranced by their multitude of new purchases — which makes this a nice opportunity, as the price for the middle-aged ${woman} is set pretty low. It'll just take ${cashFormat(2500)} to buy ${him} off their hands.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
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
			r.push(`With a few keystrokes, you wire the payment to the frat house, then wait for ${his} delivery. After being brought into your penthouse by security, the legalities and biometric scanning with ${him} are taken care off fairly quickly and without fuss. Stepping towards you after the chime announcing a successful registration as your property, ${slave.slaveName} lowers ${his} head obediently and asks,`);
			r.push(Spoken(slave, `"${Master}, what will my new tasks in your household be? Shall I just clean or will there be... other things for me to do?"`));
			r.push(`The eager tremble in ${his} voice tells you that ${he}'s more than a little aroused by the thought of being used, so you tell ${him} it'll all depend on if ${he}'s a good MILF.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: 35, maxAge: 43,
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.origin = "$He was the housekeeper and fucktoy of a frat house before being replaced in favor of fresher slaves and sold to you.";
			slave.devotion = random(25, 50);
			slave.trust = random(25, 50);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 20);
			slave.face = random(0, 60);
			slave.skill.vaginal = 15;
			slave.skill.anal = 25;
			slave.skill.oral = 25;
			slave.skill.entertainment = 25;
			slave.skill.whoring = 25;
			slave.boobs = random(3, 8) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = random(1, 2);
			slave.vaginaLube = 1;
			slave.labia = 1;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.hips = random(-1, 0);
			slave.butt = 0;
			slave.anus = random(1, 2);
			slave.weight = random(-50, 0);
			slave.muscles = random(0, 15);
			slave.shoulders = random(-1, 1);
			slave.intelligence = random(-50, 50);
			slave.career = "a slave";
			slave.fetish = "submissive";
			slave.behavioralQuirk = "insecure";
			slave.sexualQuirk = "caring";
			return slave;
		}
	}
};
