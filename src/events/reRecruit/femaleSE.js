App.Events.recFemaleSE = class recFemaleSE extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
		];
	}

	get eventName() {
		return "Female Self Enslave";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, girl, woman} = getPronouns(slave);
		let r = [];

		r.push(`A (quite unrealistic) blockbuster movie took your arcology by storm recently, causing some curious side effects among the more idealistic type of young people here. The movie plot is about a young woman who sells herself into slavery to be close to a love interest... then wins his adoration and her freedom in the process. Of course, just because it works like that in a movie doesn't mean real life will be the same — which didn't seem to occur to several young women who actually try to put such a plan in action. Mostly, the sudden spike of self-enslavement does lead to a number of handsome college students getting their dicks wet as they enjoy their new status as slaveowners — and not a one freed his love-sick slavegirl either.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The situation does yield a few business opportunities too, as not all of the guys think just with their dicks. One of them is currently offering his free ${girl} for sale, which your assistant instantly flags for your attention. A video attached to the offer does look quite nice, as the slave${girl} happily poses in the nude for ${his} 'beloved', not knowing that he's planning to sell ${him}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The young ${woman} will be auctioned off, but you think you should be able to get ${him} for about ${cashFormat(4000)} or so... ${he}'s pretty and a virgin, but the nonexistent sex skills will keep the price relatively low in the end.`, "note"));

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 4000;
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
			r.push(`Bidding for the ${girl} and winning ${him} in the auction, you await ${him} and the student selling ${him} in your penthouse. As the young man guides ${him} in, ${he} gives you a properly deferential greeting, then looks wide-eyed at the décor and wealth presented all around. Yet as ${his} 'lover' informs the ${woman} that ${he}'ll belong to you now, tears start flowing down ${his} cheeks as ${his} heart almost audibly breaks. Smiling at the man over the sobbing shape of your newly acquired virgin slave${girl}, you casually push a button to approve the money transfer and he strides out of the room after checking his smartphone for the transfer. On your orders, ${he} strips and submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {maxAge: 21, disableDisability: 1, race: "nonslave"});
			slave.origin = "$He enslaved $himself to be with a man $he loved, only to be sold to you afterward.";
			slave.devotion = random(-30, -5);
			slave.trust = random(-25, -5);
			setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
			slave.face = random(20, 60);
			slave.faceImplant = 0;
			slave.skill.vaginal = 0;
			slave.skill.anal = 0;
			slave.skill.oral = random(15, 40);
			slave.skill.whoring = 0;
			slave.boobs = random(2, 6) * 100;
			slave.natural.boobs = slave.boobs;
			slave.vagina = 0;
			slave.labia = random(0, 1);
			slave.clit = 0;
			slave.ovaries = 1;
			slave.preg = -1;
			slave.anus = 0;
			slave.weight = 0;
			slave.muscles = 20;
			slave.intelligence = random(-50, 50);
			slave.intelligenceImplant = 15;
			if (slave.physicalAge >= 12) {
				slave.teeth = "normal";
			}
			slave.career = "a student";
			slave.behavioralFlaw = "devout";
			slave.sexualFlaw = "idealistic";
			return slave;
		}
	}
};
