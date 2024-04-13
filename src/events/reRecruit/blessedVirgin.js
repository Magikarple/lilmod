App.Events.recBlessedVirgin = class recBlessedVirgin extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0
		];
	}

	get eventName() {
		return "Blessed Virgin";
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
		r.push(`Wondering what sorts of strange paraphernalia or weird sex toys the grifter might have kept himself amused with, you casually select the feed of one of the surveillance cameras that overlooks the area. And indeed, the contents of many boxes being carried out of there do have a certain perverted look to them, prompting you to zoom in — which is when a pretty, young, naked and extremely pregnant`);
		if (slave.actualAge >= 18) {
			r.push(`${woman}`);
		} else if (slave.actualAge >= 13) {
			r.push(`${girl}`);
		} else {
			r.push(`little ${girl}`);
		}
		r.push(`slowly waddles through the image, escorted by two repo men. Immediately directing the camera to follow ${him}, you see that they scan and log ${him} like any of the other items in the household liquidation — ${he} must have been the cult leader's personal slave. ${He} caught your interest just enough to check the slave markets for a potential better look at that cult's tastes — and indeed, half an hour later ${he}'s being listed as for sale.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The`);
		if (slave.actualAge >= 18) {
			r.push(`young ${woman}`);
		} else if (slave.actualAge >= 13) {
			r.push(`${girl}`);
		} else {
			r.push(`child`);
		}
		r.push(`is likely a virgin, given ${his} obvious discomfort at being poked and prodded for display and is trying ${his} hardest to cover ${his} shame. Quickly reading through the details, your suspicions are confirmed; ${he} is indeed a heavily pregnant virgin. Odds are high that ${he} was treated as a "Virgin Mary" for the cult and is likely going to catch the eye of any collectors of religious objects.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `Someone already started bidding for ${him} and more bids are coming in fast. As such things usually go, you guess that the price will come out to about ${cashFormat(10000)} in the end.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 10000;
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
			r.push(`Winning out in the auction, you have the ${girl} brought to you straight away. ${He} is helped into your penthouse in semitransparent shimmering gown — some sort of cult garb that was thrown into the sale as a bonus. It certainly looks amazing on ${him}, but you want to see all of your new acquisition so you order ${him} to strip. With quivering hands, ${he} slides the fabric off and lets it fall to the floor, then submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Winning out in the auction, you have the young ${woman} brought to you straight away. ${He} is helped into your penthouse in semitransparent shimmering gown — some sort of cult garb that was thrown into the sale as a bonus. It certainly looks amazing on ${him}, but you want to see all of your new acquisition so you order ${him} to strip. With shaking hands, ${he} slides the fabric off and lets it fall to the floor, then submits to biometric scanning, registering ${him} as your property. When ${he}'s taken away to the office of the slave broker you sold ${him} on to, the young ${woman} lets out a little sob, as if fearful of ${his} future.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: V.fertilityAge,
				maxAge: (V.pedo_mode === 1 ? 18 : 22),
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.origin = "$He was the virgin figurehead of a new religion and 'blessed' by their Lord.";
			slave.devotion = random(-20, 20);
			slave.trust = random(25, 50);
			setHealth(slave, jsRandom(60, 100), 0, 0, 0, 0);
			slave.face = random(20, 90);
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.whoring = 0;
			slave.skill.entertainment = 20;
			slave.boobs = random(4, 7) * 100;
			slave.natural.boobs = slave.boobs - 100;
			slave.lactation = 1;
			slave.lactationDuration = 2;
			slave.vagina = 0;
			slave.trueVirgin = 1;
			slave.vaginaLube = 2;
			slave.ovaries = 1;
			slave.pubertyXX = 1;
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.anus = 0;
			slave.weight = 0;
			slave.waist = -20;
			slave.muscles = random(-20, 10);
			slave.intelligence = random(0, 90);
			slave.career = "a missionary";
			slave.fetish = "submissive";
			slave.fetishStrength = 100;
			slave.behavioralFlaw = "devout";
			slave.sexualFlaw = "repressed";
			slave.voice = random(2, 3);
			slave.preg = 40;
			slave.pregWeek = 40;
			slave.pregType = 1;
			slave.pregKnown = 1;
			SetBellySize(slave);
			return slave;
		}
	}
};
