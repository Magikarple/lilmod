App.Events.JESlaveDisputeSlaveDeal = class JESlaveDisputeSlaveDeal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("slave deal"),
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("slave deal");
		V.justiceEvents.splice(index, 1);
		const contractCost = 5000;
		const slave = GenerateNewSlave("XX", {
			minAge: 24, maxAge: 42, ageOverridesPedoMode: 1, disableDisability: 1
		});
		slave.origin = "$He sold $himself into slavery to buy medical care for $his daughter.";
		slave.devotion = random(25, 30);
		slave.trust = slave.devotion - 20;
		slave.oldDevotion = slave.devotion;
		setHealth(slave, jsRandom(0, 20));
		slave.piercing.ear.weight = 1;
		slave.vagina = random(1, 2);
		slave.ovaries = 1;
		slave.counter.birthsTotal = 1;
		slave.shouldersTat = either("flowers", "tribal patterns");
		slave.stampTat = either("flowers", "tribal patterns");
		const {
			He,
			he, his, him, himself, woman
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());

		r.push(`An older ${woman} who has signed an enslavement contract with a slave trader is accusing her of not living up to the terms. The contract requires that the trader pay the medical costs of the ${woman}'s daughter in return for the ${woman}'s voluntary enslavement. The ${woman} claims that the payments have not been made and the trader is still insisting on enslavement.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The trader states that the daughter was thought to only have a minor condition, but has proven to be suffering from a serious cancer. She protests that she will lose a great deal of money, and that there's no way she would have made the deal if the ${woman} had been honest with her about how bad ${his} daughter's condition was. The ${woman} responds that ${he} didn't know.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the older ${woman}`, older,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the slave trader`, trader,));
		choices.push(new App.Events.Result(`Offer to buy out the contract`, buy, `This will cost ${cashFormat(contractCost)} and give you the slave`));
		App.Events.addResponses(node, choices);

		function bribe() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`You privately inform both parties you'll settle this in favor of the most generous. You instantly receive a single notice of escrow payment contingent on the case going the payer's way. You select the <span class="yellowgreen">bigger of the two</span> and decide the matter before returning to bed in a good mood. However, the next day it becomes apparent that although ${he} isn't stupid enough to make a public accusation of corruption, the older ${woman} made use of ${his} few remaining hours of freedom to <span class="red">slander</span> your administration of justice.`);
			repX(-100, "event");
			cashX(random(150, 200) * 10, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function older() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`You settle the dispute in favor of the slave-to-be. ${He} is resigned, knowing that ${he}'s now owned by a woman who almost certainly hates ${him}, but ${his} daughter's treatments are assured. The story gets around quickly, <span class="green">capturing the hearts</span> of more romantic citizens. The angry slave trader leaves the arcology, <span class="red">reducing prosperity.</span>`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function trader() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the slave trader. The story of the mother's enslavement, along with the prompt death of the daughter due to inadequate treatment, gets around the Free Cities, <span class="red">appalling</span> more romantic citizens. The trader lets it be known amongst her peers that you do not brook uppity behavior from poor bitches, and that slave traders can expect to do well in your arcology, <span class="green">increasing prosperity.</span>`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buy() {
			const frag = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			V.arcologies[0].prosperity += 5;
			repX(2500, "event");
			r.push(`You offer to simply buy out the contract, taking the slave for yourself, letting the slave trader out of her side of the deal, and providing for the daughter's medical care. The trader lets it be known amongst her peers that you will make things right no matter the cost to yourself, <span class="green">increasing prosperity.</span> The story of the mother willing to be enslaved gets around quickly, <span class="green">capturing the hearts</span> of more romantic citizens. The mother, meanwhile, presents ${himself} for enslavement, <span class="hotpink">very grateful</span> that you've saved ${his} daughter's life.`);
			frag.append(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
