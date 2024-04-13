App.Events.recStarvingArtist = class recStarvingArtist extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.rep > 500
		];
	}

	get eventName() {
		return "Starving Artist";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, woman} = getPronouns(slave);
		const {himselfA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		let r = [];

		r.push(`${capFirstChar(V.assistant.name)} alerts you that a supplicant has arrived at the door to the penthouse. A constant stream of hopefuls appear at your door, and ${V.assistant.name} makes ${himselfA} invaluable by filtering them. One of the few categories of applicant that is always admitted is people willing to be enslaved for some reason; the odd individual standing before you is just such a ${woman}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(Spoken(slave, `"What we're going to do together will be recorded in the annals of history,"`));
		r.push(`${he} says expansively, sweeping about your office in a series of twirls and pirouettes. Though when you enquire as to what exactly you'll be doing together, all ${he} can give you is a torrent of vague artistic prattle. In the end, all you can get out of ${him} is an understanding that ${he} sees enslavement as the ultimate form of creative self-expression.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`${He} seems more than a little odd, but not unattractive. At the very least, ${he}'s not likely to be a boring slave to have around the penthouse.`);

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
			r.push(`${He} twirls and poses artistically as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He} seems a little disappointed that ${he} won't have the opportunity to practice ${his} penmanship but nonetheless places ${his} biometric signature in testament to the truth of ${his} voluntary enslavement.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave(null, {
				minAge: 18, maxAge: 42, disableDisability: 1, race: "nonslave"
			});
			generateSalonModifications(slave);
			slave.origin = "$He offered $himself to you for enslavement out of devotion to $his artistic 'craft'.";
			slave.boobs = random(4, 6) * 50;
			slave.natural.boobs = slave.boobs;
			slave.weight = -20;
			slave.natural.height = random(160, 200);
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.face = random(15, 100);
			slave.butt = random(1, 2);
			slave.lips = 0;
			slave.devotion = random(25, 45);
			slave.trust = random(25, 45);
			slave.career = "an artist";
			setHealth(slave, jsRandom(-60, -50), undefined, undefined, undefined, 0);
			slave.intelligence = random(16, 50);
			slave.skill.entertainment = 40;
			slave.intelligenceImplant = 0;
			slave.behavioralFlaw = "odd";
			slave.fetish = "humiliation";
			return slave;
		}
	}
};
