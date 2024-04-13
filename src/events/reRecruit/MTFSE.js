// cSpell:ignore recMTFSE

App.Events.recMTFSE = class recMTFSE extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "MtF Self Enslavement";
	}

	execute(node) {
		const slave = makeSlave();
		const {he, his, him, girl, woman} = getPronouns(slave);
		let r = [];

		r.push(`A (quite unrealistic) blockbuster movie took your arcology by storm recently, causing some curious side effects among the more idealistic type of young people here. The movie plot is about a young woman who sells herself into slavery to be close to a love interest... then wins his adoration and her freedom in the process. Of course, just because it works like that in a movie doesn't mean real life will be the same — which didn't seem to occur to several young women who actually try to put such a plan in action. Mostly, the sudden spike of self-enslavement does lead to a number of handsome college students getting their dicks wet as they enjoy their new status as slaveowners — and not a one freed his love-sick slavegirl either.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`It isn't just all natural females either, as a few men also jumped on the bandwagon, throwing in a little bit of transformative surgery in the mix, either going all the way to making themselves into female slaves or hoping to be accepted as dick-girls after making the target of their affection fall for a pretty face and breasts. One of former cases gets flagged by your assistant as a business opportunity, as the new slaveowner wasn't impressed by a former male — despite ${his} good looks and virgin pussy, he can't forget ${he} originally was a man. A video attached to the 'sale offer' online post does show a relatively pretty young ${woman}, sniffling quietly as ${he} gets ordered to show off ${his} body to prospective buyers.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `The ${girl} should go pretty cheap, just ${cashFormat(2000)}. Sounds like the owner mostly wants to not be bothered by ${him} anymore.`, "note"));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addParagraph(node, r);
		const contractCost = 2000;
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
			r.push(`Sending an offer to buy the slave ${girl}, you get a confirmation from the student very shortly afterward. It doesn't take much longer before he appears at the security office leading into your penthouse to drop off his slave, leaving ${him} behind without even saying goodbye. The sniffling and dejected ${girl} is brought into your office so you can check ${him} out in person afterward. On your orders, ${he} strips and submits to biometric scanning, registering ${him} as your property.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {maxAge: 21, disableDisability: 1, race: "nonslave"});
			slave.origin = "$He enslaved $himself to be with a man $he loved, only to be sold to you afterward.";
			slave.devotion = random(-30, -5);
			slave.trust = random(-25, -5);
			setHealth(slave, jsRandom(10, 30), undefined, undefined, 0, 0);
			slave.face = random(20, 60);
			slave.faceImplant = 15;
			slave.skill.vaginal = 0;
			slave.skill.penetrative = 15;
			slave.skill.anal = 0;
			slave.skill.oral = random(15, 40);
			slave.skill.whoring = 0;
			slave.boobsImplant = random(3, 6) * 100;
			slave.boobsImplantType = "normal";
			slave.boobs = slave.boobsImplant + 150;
			slave.vagina = 0;
			slave.ovaries = 0;
			slave.preg = 0;
			slave.anus = 0;
			slave.dick = 0;
			slave.balls = 0;
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
