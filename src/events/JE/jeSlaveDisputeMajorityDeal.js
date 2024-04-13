App.Events.JESlaveDisputeMajorityDeal = class JESlaveDisputeMajorityDeal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("majority deal"),
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("majority deal");
		V.justiceEvents.splice(index, 1);
		const contractCost = 20000;
		const slave = GenerateNewSlave(null, {minAge: V.minimumSlaveAge, maxAge: 18, disableDisability: 1});
		slave.origin = "$He was raised to be a slave, since $he was mistakenly thought to be from good slave stock.";
		slave.career = "a slave";
		slave.devotion = random(10, 15);
		slave.trust = slave.devotion;
		slave.oldDevotion = slave.devotion;
		setHealth(slave, jsRandom(80, 90), 0, 0, 0, jsRandom(10, 30));
		if (slave.dick === 0) {
			slave.vagina = 0;
			slave.ovaries = 1;
		} else if (slave.balls === 0) {
			slave.balls = 1;
		}
		slave.anus = 0;
		slave.skill.anal = 0;
		slave.skill.oral = 0;
		slave.skill.whoring = 0;
		slave.skill.vaginal = 0;
		slave.skill.penetrative = 0;
		slave.skill.entertainment = 0;

		const {
			He,
			he, him, his, girl
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());
		r.push(`A prominent citizen is accusing a slave school of lying to him about the pedigree of a ${girl} about to reach ${his} majority. ${He}'ll be enslaved once ${he}'s of age, and he owns the rights to ${him}. He produces many messages from the school about ${his} progress; they all reference ${his} excellent bloodline. The slave's genes were sequenced recently for an unrelated treatment, and it appears ${he}'s not the child of the slaves the school stated ${he} was. He angrily demands compensation for the effort he's put into planning for ${him}.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The school's representative is apologetic, but firm. The school readily admits an error, but he protests that they weren't aware of the confusion, either. They've offered to buy ${him} back, with interest, but reject what they call an exorbitant demand for compensation. They produce the original pedigree, protesting that it shows that they were lied to, too. The slave does resemble the supposed parents closely; only an unusually invasive check would have disclosed the fraud.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the accuser`, accuser,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the trainer`, trainer,));
		choices.push(new App.Events.Result(`Compromise on the compensation and offer to buy out the deal`, buy, `This will cost ${cashFormat(contractCost)} and give you the slave`));
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
			r.push(`You settle the dispute in favor of the prominent accuser. He dabbles in slave breeding himself, and was looking forward to using the slave in question for breeding stock; like many breeders he cares deeply about his stable, and speaks <span class="green">positively</span> in public about how you helped an innocent breeder protect his prize bloodlines. Slave trading to and from your arcology is <span class="red">somewhat lessened</span> however, since the school lets it be known that trading in your arcology is a risk.`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trainer() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the school, and against the prominent accuser. He dabbles in slave breeding himself, and was looking forward to using the slave in question for breeding stock; like many breeders he cares deeply about his stable, and speaks <span class="red">furiously</span> in public about how you denied an innocent breeder justice against those swindling slave schools. The school, however, passes a <span class="green">good word</span> around the industry that schools trading with your arcology can expect to be protected from frivolous claims.`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buy() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You offer to buy out the deal, paying the school and taking the slave yourself, and compromising on the demanded compensation. The citizen was looking forward to using the slave in question for breeding stock; like many breeders he cares deeply about his stable and is mollified by the moderate payment, and speaks <span class="green">kindly</span> in public about how you helped an innocent breeder protect his prize bloodlines. The school sends a <span class="green">positive note</span> around the industry to the effect that schools trading with your arcology can expect to have excessive claims sensibly reduced.`);
			V.arcologies[0].prosperity += 3;
			repX(1500, "event");
			frag.append(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
