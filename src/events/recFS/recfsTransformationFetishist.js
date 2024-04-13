App.Events.recFSTransformationFetishist = class recFSTransformationFetishist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
		];
	}

	actorPrerequisites() {
		return [];
	}

	get weight() {
		return V.arcologies[0].FSTransformationFetishist > random(1, 100) ? 1 : 0;
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1, race: "nonslave"});
		generateSalonModifications(slave);
		slave.origin = "You received $him from a surgeon who botched an implant operation on $him and needed to get $him out of sight.";
		slave.boobsImplant += random(10, 20)*200;
		slave.boobs += slave.boobsImplant;
		slave.boobsImplantType = "advanced fillable";
		if (slave.boobsImplant / slave.boobs >= 0.90) {
			slave.boobShape = "spherical";
			slave.nipples = "flat";
		} else {
			slave.boobShape = "normal";
			slave.nipples = "tiny";
		}
		slave.areolae = 2;
		slave.buttImplant += random(2, 4);
		slave.buttImplantType = "fillable";
		slave.butt += slave.buttImplant;
		slave.lipsImplant += random(15, 25);
		slave.lips += slave.lipsImplant;
		slave.face = Math.clamp(slave.face+20, -100, 100);
		slave.faceImplant += 40;
		slave.devotion = random(-100, -75);
		slave.trust = random(-45, -25);
		setHealth(slave, jsRandom(-50, -20), normalRandInt(20, 4), normalRandInt(10, 3), 0, 0);
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		slave.behavioralFlaw = either("anorexic", "arrogant", "bitchy", "odd");

		const {
			He,
			his, he, him, woman
		} = getPronouns(slave);
		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive a message coded urgent from a surgeon who you've hired in the past. You are on the point of opening the a call with a friendly businesslike salutation when you see his haggard, worried face, and change your greeting to one of commiseration and understanding. He pours out his troubles to you in a rush.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It seems he botched an implant operation on a free ${woman}. ${He}'s still out, and the implants are in successfully, but ${he}'s not too far from dead and will remain so for some time. He needs ${him} out of sight, now. With your pull, you could easily manipulate the financial situation to enslave ${him} and get ${him} out of the doctor's area at the same time. It would be a favor to him, and by the medical records, a favor to you too, once you nurse ${him} back to health. ${He}'s quite the implant queen.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const choices = [];

		if (V.cash >= contractCost) {
			choices.push(new App.Events.Result(`Enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)}`));
			choices.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));
		} else {
			choices.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
		}
		App.Events.addResponses(node, choices);

		function enslave() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`${He} arrives with various medical devices still attached to ${him}, wrapped up in supportive hospital clothing. Despite this, it's obvious that you've made a good decision. The new tits that got ${him} into this situation are so cartoonish that some of the medical tubing has been hastily routed between them. After a few weeks on curatives and a few more in training, ${he}'ll be ready to bounce those fake boobs up and down as ${he} takes dick.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `The only downside to ${his} condition is that reselling ${him} is utterly anticlimactic. A purchaser's agent arrives and takes charge of ${him}, transferring ${him} to a medical transport bed. He takes ${him} away, and it's done.`;
		}
	}
};
