App.Events.JESlaveVirginityDeal = class JESlaveVirginityDeal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("virginity deal"),
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("virginity deal");
		V.justiceEvents.splice(index, 1);

		const contractCost = 10000;
		const slave = GenerateNewSlave(null, {maxAge: 22, disableDisability: 1});
		slave.origin = "You bought out a deal for $his sale after the seller took $his virginity and the buyer no longer wanted $him.";
		slave.counter.publicUse += 10;
		slave.devotion = random(25, 30);
		slave.trust = slave.devotion - 20;
		slave.oldDevotion = slave.devotion;
		setHealth(slave, jsRandom(0, 20));
		slave.anus = 2;
		if (slave.dick === 0) {
			slave.vagina = 2;
			slave.ovaries = 1;
			if (isFertile(slave) && V.seePreg === 1) {
				knockMeUp(slave, 100, 2, -2);
			}
		}
		const {he, him} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());
		r.push(`A wealthy slaveowner, clearly nursing a ferocious hangover, is accusing a less prominent citizen of refusing to honor the terms of a sale they signed in the early hours of the morning. Already shaking your head, you pull up the security logs with his permission. You verify that yes, indeed, they're visible at a loud party hosted by the wealthy slaveowner, talking over a tablet for a long time before shaking hands and signing.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The putative buyer protests that though the terms of sale don't show it, their conversation before the sale focused on the slave's virginity. The logs show that this, too, is true. And then, he rages, the slaveowner got even drunker, and brought the slave up to join the party, encouraging other guests to gangbang ${him}. The logs show this too; the slave is definitely not a virgin any longer. The would-be buyer says he understands that he should have gotten the part about the virginity in writing and guaranteed up until he got his hands on ${him}, but requests that you honor the spirit of the deal by letting him out of a contract to buy a now-ruined slave.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the prospective buyer`, buyer,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the prominent slaveowner`, owner,));
		choices.push(new App.Events.Result(`Offer to buy out the contract`, buy, `This will cost ${cashFormat(contractCost)} and give you the slave`));
		App.Events.addResponses(node, choices);

		function bribe() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You privately inform both parties you'll settle this in favor of the most generous. You instantly receive two notices of escrow payment contingent on the case going the payer's way. You select the <span class="yellowgreen">bigger of the two</span> and decide the matter before returning to bed in a good mood. However, the next day it becomes apparent that although he isn't stupid enough to make a public accusation of corruption, the buyer is furious at paying virgin prices for a defiled slave, and is privately <span class="red">slandering</span> your administration of justice.`);
			repX(-100, "event");
			cashX(random(150, 200) * 10, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buyer() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`What's most important is the justice of the outcome. You settle the dispute in favor of the buyer, who would otherwise be forced to buy something he did not mean to pay for. He lets it be known far and wide that you are willing to stand up for what's right, no matter what and no matter who, <span class="green">improving</span> your reputation. The angry seller, now afflicted with a devalued slave in addition to a bad headache, lets his group of friends know that social superiors have no advantage at justice here. They become more reticent about deal-making in your arcology, <span class="red">damaging</span> its prosperity.`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function owner() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`A deal is a deal; buyer beware. You settle the dispute in favor of the slaveowner. He lets it be known amongst his peers that you do not let social inferiors insist on justice against their betters. Citizens of quality become more willing to consider deal-making in your arcology, <span class="green">increasing prosperity.</span> On the other hand, the angry buyer shows himself to be not a person to treat lightly, either; he maintains a <span class="red">malicious</span> whispering campaign to the effect that your administration of justice is fatally biased.`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buy() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You offer to simply buy out the contract, taking the slave for yourself. This lets the buyer out of buying ${him}, and the slaveowner gets his money; but it soon becomes apparent that what both of them were really looking for is an opportunity to put one over on the other. Neither is pleased to be denied a petty victory, but they both have the sense to keep their mouths shut. The poor slave, meanwhile, appears in the penthouse entryway, <span class="hotpink">hopeful</span> that ${he}'s been lucky enough to end up in a less abusive situation.`);
			App.Events.addParagraph(frag, r);
			cashX(-contractCost, "slaveTransfer", slave);
			frag.append(App.UI.newSlaveIntro(slave));
			return frag;
		}
	}
};
