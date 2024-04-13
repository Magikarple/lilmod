// cSpell:ignore Liel

App.Events.recCcsAngel = class recCcsAngel extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100
		];
	}

	get eventName() {
		return "CCS Angel";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, woman,
		} = getPronouns(slave);
		let r = [];

		r.push(`As a minor point of information on your daily news download, you see that yet another of the new religions (cults really) that tend to spring up like weeds in the Free Cities has met its almost inevitable fate. Even with the most charismatic leader, starry-eyed idealism or boundless greed in milking the followers usually put a sudden end to the various self-declared churches, temples, and holy places. In this case, the cult leader successfully made a hasty getaway, leaving his creditors and conned believers behind. Repo men are sent out in force, carting off the contents of the 'house of worship' and the luxurious apartment the man kept.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Wondering what sorts of strange paraphernalia or weird sex toys the grifter might have kept himself amused with, you casually select the feed of one of the surveillance cameras that overlooks the area. And indeed, the contents of many boxes being carried out of there do have a certain perverted look to them, prompting you to zoom in — which is when a pretty, young and almost naked`);
		if (slave.actualAge >= 18) {
			r.push(woman);
		} else if (slave.actualAge >= 13) {
			r.push(girl);
		} else {
			r.push(`little ${girl}`);
		}
		r.push(`walks through the image, escorted by two repo men. Immediately directing the camera to follow ${him}, you see that they scan and log ${him} like any of the other items in the household liquidation — ${he} must have been the cult leader's personal slave. ${He} certainly has a unique look, waking your interest enough to check the slave markets for ${him} — and indeed, half an hour later ${he}'s being listed as for sale.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The`);
		if (slave.actualAge >= 18) {
			r.push(`young ${woman}`);
		} else {
			r.push(girl);
		}
		r.push(`is best described as being 'angelic', in a stereotypical Western view of the mythical divine messengers. Blonde-haired, blue-eyed, and with milky-white skin, ${he} has had a pair of beautifully detailed wings tattooed on ${his} back. The small icon of two cherries next to one another also designates ${him} to be a complete virgin.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `Someone already started bidding for ${him} and more bids are coming in fast. As such things usually go, you guess that the price will come out to about ${cashFormat(5000)} in the end.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 5000;
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
			r.push(`Winning out in the auction, you have the young ${woman} brought to you straight away. ${He} is led into your penthouse in semitransparent shimmering gown — some sort of cult garb that was thrown into the sale as a bonus. It certainly looks amazing on ${him}, but you want to see all of your new acquisition so you order ${him} to strip. Obediently, ${he} slides the fabric off and lets it fall to the floor, then submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Winning out in the auction, you have the young ${woman} brought to you straight away. ${He} is led into your penthouse in semitransparent shimmering gown — some sort of cult garb that was thrown into the sale as a bonus. It certainly looks amazing on ${him}, but you want to see all of your new acquisition so you order ${him} to strip. Obediently, ${he} slides the fabric off and lets it fall to the floor, then submits to biometric scanning, registering ${him} as your property. When ${he}'s taken away to the office of the slave broker you sold ${him} on to, the young ${woman} sighs, sad that ${he}'s not staying as yours in the luxurious penthouse you call your own.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {maxAge: 24, disableDisability: 1, race: "white"});
			slave.origin = "$He was the private slave of a con artist cult leader before he had to abandon $him and flee.";
			slave.devotion = random(25, 50);
			slave.trust = random(25, 50);
			setHealth(slave, jsRandom(30, 60), undefined, undefined, 0, 0);
			slave.face = random(25, 100);
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = 35;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 35;
			slave.boobs = random(2, 7) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 0;
			slave.trueVirgin = 1;
			slave.vaginaLube = 1;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.shoulders = random(-1, 1);
			slave.hips = -1;
			slave.butt = 0;
			slave.anus = 0;
			slave.weight = 0;
			slave.waist = -20;
			slave.muscles = random(10, 50);
			slave.intelligence = random(-15, 50);
			slave.career = "a dancer";
			slave.fetish = "submissive";
			slave.behavioralFlaw = "devout";
			slave.sexualFlaw = "idealistic";
			slave.custom.tattoo = "$He has beautifully detailed set of angel wings tattooed on $his back.";
			slave.voice = 3;
			slave.eye.origColor = "blue";
			slave.origHColor = "blonde";
			slave.origSkin = "pale";
			applyGeneticColor(slave);
			slave.hLength = 40;
			slave.hStyle = "neat";
			slave.slaveName = either("Angel", "Angelica", "Gabriela", "Layla", "Liel", "Seraph");
			return slave;
		}
	}
};
