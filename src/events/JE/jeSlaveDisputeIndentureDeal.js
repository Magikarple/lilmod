App.Events.JESlaveDisputeIndentureDeal = class JESlaveDisputeIndentureDeal extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.justiceEvents.includes("indenture deal"),
		];
	}

	get weight() {
		return V.justiceEvents.length > 2 ? 2 : 1;
	}

	execute(node) {
		let r = [];
		const index = V.justiceEvents.indexOf("indenture deal");
		V.justiceEvents.splice(index, 1);

		const contractCost = 7500;
		const slave = GenerateNewSlave(null, {minAge: 24, maxAge: 42, disableDisability: 1});
		setHealth(slave, jsRandom(-20, 20));
		slave.anus = 2;
		if (slave.vagina > -1) {
			slave.vagina = 2;
		}
		slave.skill.vaginal = 15;
		if (slave.dick > 0 || slave.clit >= 3) {
			slave.skill.penetrative = 15;
		}
		slave.skill.oral = 15;
		slave.skill.anal = 15;
		slave.skill.whoring = 0;
		slave.skill.entertainment = 15;
		slave.boobs += 600;
		slave.boobsImplant = 600;
		slave.boobsImplantType = "normal";
		slave.butt += 1;
		slave.buttImplant = 1;
		slave.buttImplantType = "normal";
		slave.lips += 10;
		slave.lipsImplant = 10;
		slave.piercing.lips.weight = 1;
		slave.piercing.tongue.weight = 1;
		slave.piercing.ear.weight = 1;
		slave.piercing.nose.weight = 1;
		slave.piercing.eyebrow.weight = 1;
		slave.piercing.navel.weight = 1;
		slave.piercing.nipple.weight = 1;
		slave.piercing.genitals.weight = 1;
		slave.stampTat = either("flowers", "tribal patterns");
		const {
			He,
			he, him, his, girl
		} = getPronouns(slave);

		App.Events.drawEventArt(node, slave);
		App.UI.DOM.appendNewElement("p", node, App.Events.jeCommon());
		r.push(`A slutty-looking ${girl} appears, bearing a split lip and a black eye, accusing a slave trader of tricking ${him}. ${He} sends you a lengthy contract of indentured servitude. Nothing seems out of order, though indentured servants are becoming less common, since slave labor is usually cheaper and less limited. The angry accuser claims that the trader told ${him} that ${he} wouldn't be required to have sex while indentured. The promise doesn't seem to be in writing, but the ${girl} bitterly insists that it was made. "And now," ${he} almost shrieks, "he's making me be a whore. I got assfucked five times yesterday. Five!"`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The trader indignantly denies ever making any such commitment, and points out, correctly, that ${he} has no proof. He protests that he only made the indentured servitude deal as a favor to ${him}, and is angry that ${he}'s repaying his courtesy in not insisting on enslavement by this ingratitude. "I see here in the record that ${he} was indeed used anally five times yesterday," he observes acidly. "But that's ${his} job."`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Privately inform both parties you'll settle this in favor of the most generous`, bribe,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the indentured whore`, whore,));
		choices.push(new App.Events.Result(`Settle the dispute in favor of the indenture holder`, holder,));
		choices.push(new App.Events.Result(`Buy out the contract and ${his} indenture`, buyAndIndent, `This will cost ${cashFormat(contractCost)} and give you the servant as such`));
		choices.push(new App.Events.Result(`Buy out the contract and enslave ${him}`, enslave, `This will cost ${cashFormat(contractCost)} and give you the servant as a slave`));
		App.Events.addResponses(node, choices);

		function bribe() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You privately inform both parties you'll settle this in favor of the most generous. You instantly receive a single notice of escrow payment contingent on the case going the payer's way. You select the <span class="yellowgreen">bigger of the two</span> and decide the matter before returning to bed in a good mood. However, the next day it becomes apparent that although ${he} isn't stupid enough to make a public accusation, the whore has been <span class="red">whispering</span> to ${his} peers that you helped the trader cheat ${him} into prostitution. Few citizens care, but there is a faint scent of corruption.`);
			repX(-50, "event");
			cashX(random(150, 200)*10, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function whore() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the indentured whore, adding a requirement to the indentured servitude that ${he} not be required to fuck against ${his} will. The story of the brave prostitute and the conniving trader is <span class="green">told and retold,</span> impressing the more credulous citizens. It also <span class="red">raises doubts</span> among the wealthier, more business-minded residents about whether you can be depended on to promote their interests.`);
			V.arcologies[0].prosperity -= 5;
			repX(2500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function holder() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You settle the dispute in favor of the owner of the indenture. No change in the contract is necessary, since it already says what it should: that he controls ${him} for the required period. That's all. The story of your strictness in business disputes <span class="green">impresses</span> some of the more commercially powerful citizens of the arcology, but is <span class="red">hissed</span> by the stupider, more romantic residents, who see only a brave whore being beaten down by a conniving slave trader.`);
			V.arcologies[0].prosperity += 5;
			repX(-500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function buyAndIndent() {
			const frag = new DocumentFragment();
			let r = [];
			slave.devotion = random(10, 15);
			slave.trust = slave.devotion+4;
			slave.oldDevotion = slave.devotion;
			slave.indenture = random(52, 78);
			slave.indentureRestrictions = 2;
			slave.origin = "You took over $his indenture after $he launched a legal complaint against an abusive master.";
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You offer to simply buy out the indenture contract, thereby acquiring ${him}, to which both parties readily agree. This decision is viewed as <span class="green">incredibly generous</span> by both your arcology's romantically-minded and financially-inclined citizens. For their part, your new servant is hopeful that you will be more considerate of ${his} health, while the former holder is just happy to have ${him} off his hands.`);
			V.arcologies[0].prosperity += 3;
			repX(1500, "event");
			frag.append(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function enslave() {
			const frag = new DocumentFragment();
			let r = [];
			slave.origin = "$He was enslaved after you manipulated $his deal for indentured servitude.";
			slave.devotion = random(-10, -15);
			slave.trust = slave.devotion+4;
			slave.oldDevotion = slave.devotion;
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You quietly contact the trader and suggest an alternative method of settling the dispute. He is surprised, but agrees readily, chuckling at how the "recalcitrant bitch" is going to be dealt with. To ${his} horror, ${he} finds that your near-total power over deals made in your arcology has been employed to saddle ${him} with additional debts that, under ${his} indentured servitude, ${he} cannot hope to repay. It is then the work of ten minutes to demand payment, and when ${he} cannot pay, demand ${his} body for enslavement. The story of your cunning <span class="prosperity inc">impresses</span> the slave traders, but is <span class="red">booed</span> by fairer-minded citizens.`);
			V.arcologies[0].prosperity += 5;
			repX(-100, "event");
			frag.append(App.UI.newSlaveIntro(slave));
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
