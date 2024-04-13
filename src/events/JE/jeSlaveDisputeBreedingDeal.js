App.Events.JESlaveDisputeBreedingDeal = class JESlaveDisputeBreedingDeal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("breeding deal"),
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("breeding deal");
		V.justiceEvents.splice(index, 1);
		const contractCost = 40000;
		const slave = GenerateNewSlave("XX", {
			minAge: V.fertilityAge + 3, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He was raised to be a mother.";
		slave.career = "a breeder";
		slave.devotion = random(10, 25);
		slave.trust = slave.devotion;
		setHealth(slave, jsRandom(80, 90), 0, 0, 0, jsRandom(10, 30));
		slave.anus = 0;
		slave.vagina = 3;
		slave.skill.anal = 0;
		slave.skill.oral = 0;
		slave.skill.whoring = 0;
		slave.skill.vaginal = 0;
		slave.skill.penetrative = 0;
		slave.skill.entertainment = 0;
		slave.bellySag = 10;
		slave.bellySagPreg = 10;
		slave.counter.birthsTotal = 3;
		slave.pregWeek = -3;
		slave.hips = 2;
		slave.boobs = random(4, 6) * 100;
		slave.natural.boobs = slave.boobs - 100;
		if (V.seePreg === 1) {
			slave.belly = 18000;
		}
		const {he, his, girl} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		slave.belly = 0; // remove the dummy belly after art is drawn
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());
		r.push(`A small-time slave breeder is accusing a customer of reneging on their agreement. For the last nine months, one of his best breeders has been busy growing his client's future slave and now`);
		if (V.seePreg === 1) {
			r.push(`that ${he}'s ready to give birth,`);
		} else {
			r.push(`that it's born,`);
		}
		r.push(`he's refusing to transfer the funds, placing the entire operation in jeopardy.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The father${(V.seePreg === 1) ? "-to-be" : ""} claims that the child is not his and as such, the contract has not been fulfilled. Despite offers from the breeder to perform a paternity test, he adamantly insists on using his private, and rather expensive, physician to run the test; a cost high enough to put them out of business anyway.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the accuser`, accuser,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the breeder`, breeder,));
		choices.push(new App.Events.Result(`Compromise on the compensation and offer to buy out the deal`, buy, `This will cost ${cashFormat(contractCost)} and give you the slave`));
		App.Events.addResponses(node, choices);

		function bribe() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You privately inform both parties you'll settle this in favor of the most generous. You instantly receive two notices of escrow payments contingent on the case going the payer's way. You select the <span class="yellowgreen">bigger of the two,</span> a clear choice, and decide the matter before returning to bed in a good mood. However, the next day it becomes apparent that although he isn't stupid enough to make a public accusation of corruption, the loser is proclaiming that he is <span class="red">not pleased</span> with your administration of justice.`);
			repX(-100, "event");
			cashX(random(150, 200) * 10, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function accuser() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the wealthy accuser. While he is a little disappointed that he didn't get the slave he wanted, he speaks <span class="green">positively</span> in public about how you helped protect his investments from potential mismanagement. Slave trading to and from your arcology is <span class="red">somewhat lessened</span> however, since the breeder lets it be known that trading in your arcology is a risk.`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
		function breeder() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the slave breeder, and against the prominent accuser, by declaring that the standard paternity test will suffice.`);
			if (V.seePreg === 1) {
				r.push(`As if on cue, the ${girl}'s water breaks and soaks ${his} pants. The call ends to the sight of ${his} crotch bulging as ${his} child is born into ${his} clothing.`);
			}
			r.push(`While he is satisfied with his future slave, he speaks <span class="red">openly</span> in public about how you were so quick to use cheap services to settle the claim instead of listening to his requests. The breeder, however, passes a <span class="green">good word</span> around the industry that slavers trading with your arcology can expect to be protected from abusive claims.`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
		function buy() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You offer to buy out the deal, paying the breeder and taking the slave yourself, and passing the child off to the buyer. The citizen gets what he wants and speaks <span class="green">kindly</span> in public about how you helped smooth over a rather rough dispute. The breeder sends a <span class="green">positive note</span> around the industry to the effect that slavers trading with your arcology can expect to be aided in times of need, though the loss of a star mother always stings.`);
			V.arcologies[0].prosperity += 3;
			repX(300, "event");
			App.Events.addParagraph(frag, r);
			frag.append(App.UI.newSlaveIntro(slave));
			return frag;
		}
	}
};
