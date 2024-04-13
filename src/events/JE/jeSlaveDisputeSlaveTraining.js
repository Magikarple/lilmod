App.Events.JESlaveDisputeSlaveTraining = class JESlaveDisputeSlaveTraining extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("slave training"),
			() => V.seeExtreme !== 0,
			() => V.seeDicks !== 0
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("slave training");
		V.justiceEvents.splice(index, 1);

		const contractCost = 10000;
		const slave = GenerateNewSlave("XY", {disableDisability: 1});
		slave.origin = "You bought out a deal involving $him training to be an expert gelded sex slave.";
		slave.devotion = random(30, 40);
		slave.trust = slave.devotion;
		slave.oldDevotion = slave.devotion;
		setHealth(slave, jsRandom(60, 80), 0, 0, 0, jsRandom(10, 30));
		slave.balls = 0;
		slave.anus = 2;
		slave.skill.penetrative = 35;
		slave.skill.anal = 35;
		slave.skill.oral = 35;
		slave.skill.whoring = 35;
		slave.skill.entertainment = 35;
		slave.piercing.nipple.weight = 1;
		slave.piercing.genitals.weight = 1;
		slave.piercing.dick.weight = 1;
		slave.piercing.anus.weight = 1;
		slave.piercing.lips.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.piercing.nose.weight = 1;
		slave.piercing.eyebrow.weight = 1;
		slave.piercing.navel.weight = 1;
		slave.boobsTat = either("advertisements", "degradation", "rude words");
		slave.buttTat = either("advertisements", "degradation", "rude words");
		slave.vaginaTat = either("advertisements", "degradation", "rude words");
		slave.dickTat = either("advertisements", "degradation", "rude words");
		slave.lipsTat = either("advertisements", "degradation", "rude words");
		slave.anusTat = either("advertisements", "degradation", "rude words");
		slave.shouldersTat = either("advertisements", "degradation", "rude words");
		slave.armsTat = either("advertisements", "degradation", "rude words");
		slave.legsTat = either("advertisements", "degradation", "rude words");
		slave.stampTat = either("advertisements", "degradation", "rude words");
		const {he, him} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());
		r.push(`One of your prominent tenants is accusing another of failing to train a slave for him according to the terms of a slave training contract. He highlights a part of the contract that requires that the slave be expert in "all common sexual skills." He self-righteously declares that the delivered slave has no vaginal skills to speak of, that he doesn't want ${him} as a result, and requests that you release him from the contract.`);
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`The trainer replies with some aspersion that the accuser is technically correct: the slave has no vaginal skills at all. This is, however, due to the fact that the slave has no vagina. He claims that the accuser verbally requested a gelded slave, though there's nothing about that either way in the contract. He protests that he did his best to train an expert gelding, and offers many lengthy videos to prove that he did.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the accuser`, accuser,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the breeder`, trainer,));
		choices.push(new App.Events.Result(`Offer to buy out the deal`, buy, `This will cost ${cashFormat(contractCost)} and give you the slave`));
		App.Events.addResponses(node, choices);

		function bribe() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You privately inform both parties you'll settle this in favor of the most generous. You instantly receive two notices of escrow payments contingent on the case going the payer's way. You select the <span class="yellowgreen">bigger of the two</span> and decide the matter before returning to bed in a good mood. However, the next day it becomes apparent that although he isn't stupid enough to make a public accusation of corruption, the loser is proclaiming that he is <span class="red">not pleased</span> with your administration of justice.`);
			repX(-100, "event");
			cashX(random(150, 200)*10, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function accuser() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the wealthy accuser. He lets you know privately that he recently had a business deal go bad, so he's in a tough cash situation right now; he's so grateful for your assistance in this embarrassing situation that he talks <span class="green">effusively</span> for days to anyone who will listen about your good administration of the arcology. Unfortunately, the furious trainer has packed up his equipment and his gelding and left for another arcology, somewhat <span class="red">reducing prosperity.</span>`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trainer() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the slave trainer. It transpires that the wealthy accuser was no longer wealthy at all, and was looking to get out of the deal; he's furious, and spends a long day <span class="red">spewing invectives</span> against you to anyone who will listen before decamping back to the old world. The trainer, on the other hand, lets it be known that you support businessmen, who can trust you to look after their interests, <span class="green">increasing prosperity.</span>`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buy() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You offer to simply buy out the deal, paying the trainer and taking the slave yourself, and letting the buyer out of the payment. The trainer lets it be known that you support businessmen, who can trust you to ensure they don't come out second best, <span class="green">increasing prosperity.</span> The buyer lets you know privately that he recently had a business deal go bad, so he's in a tough cash situation right now; he's so grateful for your assistance in this embarrassing situation that he talks <span class="green">effusively</span> for days to anyone who will listen about your discreet administration of the arcology. The slave, meanwhile, arrives at your penthouse, <span class="hotpink">rather hopeful</span> that ${he}'s going to a good master.`);
			V.arcologies[0].prosperity += 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			frag.append(App.UI.newSlaveIntro(slave));
			return frag;
		}
	}
};
