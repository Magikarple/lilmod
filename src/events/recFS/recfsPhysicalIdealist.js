App.Events.recFSPhysicalIdealist = class recFSPhysicalIdealist extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.FSAnnounced === 1,
			() => V.arcologies[0].FSPhysicalIdealist > random(1, 100) || (V.debugMode > 0 && V.debugModeEventSelection > 0)
		];
	}

	execute(node) {
		let r = [];
		const slave = GenerateNewSlave(null, {maxAge: 42, disableDisability: 1});
		slave.origin = "$He was voluntarily enslaved after $he decided that your arcology was the best place for $him to get the steroids that $he'd allowed to define $his life.";
		slave.career = App.Data.Careers.General.uneducated.random();
		generateSalonModifications(slave);
		setHealth(slave, jsRandom(20, 40), undefined, undefined, 0, 20);
		slave.muscles = 100;
		slave.addict = 1;
		slave.devotion = random(0, 15);
		slave.trust = random(0, 15);
		slave.intelligence = random(-95, -56);
		slave.intelligenceImplant = 0;

		const {
			His, He,
			his, he, him
		} = getPronouns(slave);
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const contractCost = sexSlaveContractCost();
		const cost = slaveCost(slave) - contractCost;
		r.push(`You receive so many messages, as a noted titan of the new Free Cities world, that ${V.assistant.name} has to be quite draconian in culling them. ${HeA} lets only the most important through to you. One category of message that always gets through regardless of content, though, is requests for voluntary enslavement. As the new world takes shape, they've become less rare than they once were.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The subject line of the latest is badly misspelled, but the accompanying profile image is impressive, if trite, depicting the sender's massive bicep flexing, veins playing across the striated muscle. Getting ${his} situation out of ${him} proves to be something of a chore, since ${he} scarcely has two functional neurons to rub together. It seems that ${he}'s on a fair number of drugs, not limited to aphrodisiacs and steroids, that ${he} can't afford them, and that ${he} has a distorted image of ${V.arcologies[0].name} as a sort of muscle-worshipping Valhalla of sex and gains. Hearing ${him} describe ${his} idea of life as one of your slaves, you understand why this idiot wants to be enslaved. If ${his} idea of slave life were accurate, <i>you'd</i> want to be enslaved.`);

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
			r.push(`${He} gets through the enslavement process without breaking anything, mostly due to your increasingly exasperated supervision. You wondered whether the destruction of ${his} moronic ideas about life as one of your slaves was going to cause an explosion, but it seems that ${he}'s under fewer illusions than you thought. ${He}'s obviously familiar with getting fucked as a way of earning ${his} keep, and hangs around, flexing idly and clearly wondering when you'll get on with it.`);

			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function sell() {
			cashX(cost, "slaveTransfer");
			return `${He} gets through the enslavement process without breaking anything, mostly due to your increasingly exasperated supervision. ${His} buyer's agent arrives to take ${him} away, and it takes the poor man ten minutes to get the situation through ${his} thick skull. He sees the beginnings of rage building in ${him} as ${he} realizes how ${he}'s been tricked, but he's a quick draw, and before ${he} can do anything he's got his taser unholstered and deployed. The bitch gives off an antediluvian roar as ${he} goes stiff as a board and crashes to the floor.`;
		}
	}
};
