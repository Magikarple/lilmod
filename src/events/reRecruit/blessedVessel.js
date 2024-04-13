App.Events.recBlessedVessel = class recBlessedVessel extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seePreg !== 0,
			() => V.seeHyperPreg === 1
		];
	}

	get eventName() {
		return "Blessed Vessel";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him, girl, woman
		} = getPronouns(slave);
		let r = [];

		r.push(`As a minor point of information on your daily news download, you see that yet another of the new religions (cults really) that tend to spring up like weeds in the Free Cities has met its almost inevitable fate. Even with the most charismatic leader, starry-eyed idealism or boundless greed in milking the followers usually put a sudden end to the various self-declared churches, temples, and holy places. In this case, the cult leader successfully made a hasty getaway, leaving his creditors and conned believers behind. Repo men are sent out in force, carting off the contents of the 'house of worship' and the luxurious apartment the man kept.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Wondering what sorts of strange paraphernalia or weird sex toys the grifter might have kept himself amused with, you casually select the feed of one of the surveillance cameras that overlooks the area. And indeed, the contents of many boxes being carried out of there do have a certain perverted look to them, prompting you to zoom in — which is when the obscenely child-filled body of a`);
		if (slave.actualAge >= 18) {
			r.push(`${woman}`);
		} else if (slave.actualAge >= 13) {
			r.push(`${girl}`);
		} else {
			r.push(`little ${girl}`);
		}
		r.push(`is slowly carted through the image, pushed along by several repo men. Immediately directing the camera to follow ${him}, you see that they scan and log ${him} like any of the other items in the household liquidation — ${he} must have been a slave used by the cult leader for religious rituals. ${He} caught your interest just enough to check the slave markets for a potential better look at that cult's tastes — and indeed, half an hour later ${he}'s being listed as for sale.`);
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
		r.push(`isn't in the greatest of shape, which is understandable when one is ready to burst at the seams with child, and completely devoid of any semblance of awareness of the current situation. ${He} was likely nothing more than a sacrifice to act as a conduit for their Lord to enter the world; in other words, an excuse to load a ${girl} up with fertility drugs and fuck ${him} ridiculously pregnant before your followers while they shout praise to the heavens to every load of cum. Going by how distinctly you can see the life inside ${him} pushing against the thinning walls of ${his} abdomen, ${he}'s likely going to either give birth or explode into crying babies at any time, something not lost on those looking to pick up a cheap bundle of future prospects.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `Someone already started bidding for ${him} and more bids are coming in fast. As such things usually go, you guess that the price will come out to about ${cashFormat(5000)} in the end.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 5000;
		const cost = slaveCost(slave) - contractCost;
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
			r.push(`Winning out in the auction, you have the ${girl} brought to you straight away. ${He} is rolled into your penthouse completely nude giving you a full view of ${his} cavernous pussy and how it is barely holding back a flood of life from being released upon your floor. Pondering whether or not this was worth it, you submit ${him} to biometric scanning, registering ${him}, and ${his} coming brood, as your property.`);
			newSlave(slave); // silent
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Winning out in the auction, you have the ${girl} brought to you straight away. ${He} is rolled into your penthouse completely nude giving you a full view of ${his} cavernous pussy and how it is barely holding back a flood of life from being released upon your floor. Pondering whether or not this was worth it, you submit ${him} to biometric scanning, registering ${him}, and ${his} coming brood, as your property. The purchasing agent groans at the sight of ${him}, not eager at the amount of effort it will take him to roll ${him} to the volume breeder that purchased ${him}.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {
				minAge: V.fertilityAge,
				maxAge: (V.pedo_mode === 1 ? 18 : 22),
				ageOverridesPedoMode: 1, disableDisability: 1
			});
			slave.origin = "$He was the holy vessel of a new religion and 'blessed' by their Lord to bring forth His servants.";
			setHealth(slave, 100, 0, 0, 0, 0);
			slave.face = random(20, 90);
			slave.boobs = random(4, 7) * 300;
			slave.lactation = 1;
			slave.lactationDuration = 2;
			slave.vagina = 10;
			slave.vaginaLube = 2;
			slave.ovaries = 1;
			slave.pubertyXX = 1;
			slave.preg = 43;
			slave.pregWeek = 40;
			slave.pregType = 50;
			slave.pregKnown = 1;
			slave.bellySag = 100;
			slave.bellySagPreg = 100;
			SetBellySize(slave);
			slave.pubicHStyle = "waxed";
			slave.underArmHStyle = "waxed";
			slave.weight = 90;
			slave.muscles = random(-100, -50);
			slave.career = "a breeder";
			applyMindbroken(slave, slave.intelligence);
			return slave;
		}
	}
};
