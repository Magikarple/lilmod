App.Events.recRepoHousekeeper = class recRepoHousekeeper extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "Repo Housekeeper";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, girl, woman} = getPronouns(slave);
		const {title: Master} = getEnunciation(slave);
		let r = [];

		r.push(`Coming to your desk in the morning, you see that your assistant has flagged an interesting offer for you to check out in the newsletter of a professional repossession company. Life in the Free Cities being what it is, there are winners and losers of the ever-changing local and global realities... and when someone falls upon hard times, the repo-men and repo-women start their work. Grim-faced and unmoved by sympathy, they go in to seize the debtor's assets to pay off their debts — which does at times include some quite interesting pieces of merchandise, like a nice slave or two.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The current sale offer by the company was taken from a college frat-house — apparently being enrolled at a rather prestigious university in your arcology doesn't mean that the guys know their asses from their elbows in money-management. A few too many parties and frivolous purchases sent an asset reclamation officer to their door, soon leaving with one of those recent purchases — a pretty female slave who doubled as both a housekeeper and fuckhole for the whole bunch of horny students. ${He}'s cute and apparently well-trained, if a bit exhausted right now after the numerous gangbangs ${his} former owners put ${him} through.`);
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
			r.push(Spoken(slave, `"${Master}, what will my new tasks in your household be? Shall I just clean or will there be... other things for me to do?"`));
			r.push(`The eager tremble in ${his} voice tells you that ${he}'s more than a little aroused by the thought of being used, so you tell ${him} it'll all depend on if ${he}'s a good ${girl}...`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 23, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He was the housekeeper and fucktoy of a frat house before being collected by repo-men and sold to you.";
			slave.devotion = random(25, 50);
			slave.trust = random(25, 50);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 10);
			slave.face = random(0, 60);
			slave.skill.vaginal = 15;
			slave.skill.anal = 15;
			slave.skill.oral = 15;
			slave.skill.entertainment = 15;
			slave.skill.whoring = 15;
			slave.boobs = random(3, 8) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = random(1, 2);
			slave.vaginaLube = 1;
			slave.labia = 1;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
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
