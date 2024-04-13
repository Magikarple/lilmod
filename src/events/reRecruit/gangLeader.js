App.Events.recGangLeader = class recGangLeader extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 0
		];
	}

	get eventName() {
		return "Gang Leader";
	}

	execute(node) {
		const slave = makeSlave();
		const {
			He,
			he, his, him,
		} = getPronouns(slave);
		const {womanP} = getPronouns(V.PC).appendSuffix("P");
		let r = [];

		r.push(`Your desk flags a video message as coming from an... interesting source. It is from one of the minor gangs on the lower levels of your arcology — or not so minor any more, as a pop-up tells you of the power-grab they made barely an hour ago. Curious what they might want, you take the call.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`A tough-looking man with multiple tattoos and a wife-beater shirt on appears on the screen, nodding in recognition. "Hey there, boss-${(V.PC.customTitle) ? V.PC.customTitle : womanP}! Just calling to pay my respects. Those weak-ass punks that were squatting in this section won't bother you any more... we took care of 'em. Now it's just all law-abiding citizens and shit down here — so you don't have to send your security goons to check us out, you know." Your assistant throws up a list of the gang's numerous criminal activities, as well as the estimates what other enterprises they've just taken over. Nothing much out of the ordinary and with the shape the world is in, you've got bigger problems. The recommendation is to observe but mostly ignore them, which you casually confirm with a flick of your finger.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`Clearing his throat, the new gang leader on level twenty-five continues, "But that's not all; we got a bit of tribute for ya." Waving his hand, he makes room for two muscular bruisers carrying the unconscious form of another man — easily recognizable from ${his} muscled build and numerous tattoos as a hardened criminal. The face-recognition software tells you ${he} is the now overthrown gangster boss in that area of the arcology. "Everyone knows what fun things you do with your slaves, so we thought it'd fit for this guy. Gonna throw ${him} in an elevator in a minute and send it up, 'kay? If you make ${him} into a proper brainless slut, you'll have quite a few guys standing in line to have a go. And well, ${he}'d make a capable gladiator in a pit fight too. Have fun with the bastard."`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`The signal is cut suddenly, and just a few moments later, your assistant flags an elevator going up containing a person needing medical attention. Anticipating your wishes, the planning interface of the remote surgery opens up right away, indicating available options for the criminal's feminized face, should you desire.`);

		App.Events.addParagraph(node, r);

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		const contractCost = 1000;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
			responses.push(new App.Events.Result(`Enslave ${him} and arrange immediate feminization surgery`, feminize));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`Opening a voice-link, you call in two security guards to await the elevator and have your new property brought to`);
			if (V.clinic > 0) {
				r.push(`${V.clinicName}`);
			} else {
				r.push(`the remote surgery`);
			}
			r.push(`for treatment; ${his} usurpers banged ${him} up pretty effectively. By the time ${he} comes to after the operation and quick-heal treatment, the legalities of enslavement are completed, leaving you with another slave registered as your property. ${He} is, of course, horrified and furious at ${his} enslavement; when you show ${him} the feminine face ${he} could have woken up with, ${he} redoubles ${his} blustering rage, but you can sense a cowed fear in the set of ${his} broad shoulders and square jaw as ${he} realizes how much control you have over ${him} now.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function feminize() {
			const node = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`Opening a voice-link, you call in two security guards to await the elevator and have your new property brought to the remote surgery. After some fun playing with various sliders and buttons in its settings, you have the machine start on modding the man into a new dickgirl with a pleasing set of features. By the time ${he} comes to after the operation and quick-heal treatment, the legalities of enslavement are completed too, leaving you with another slave registered as your property. Of course, ${he} is naturally horrified and furious with you; where there was once a tough young man's square jaw, there is now a definitively feminine face which looks rather cute when angry. The rest of ${him} is still broad-shouldered and muscular, with all the tattoos and a well-sized dick — but you can always mod that later if you want to.`);
			slave.origin = "$He was formerly the (male) leader of a gang on the lower levels of your arcology, until $he was overthrown and given to you as 'tribute' by a rival gang who wished to see $him stripped of $his manhood.";
			slave.faceImplant = 15;
			slave.face = Math.clamp(slave.face + slave.faceImplant, -100, 100);
			slave.faceShape = "normal";
			surgeryDamage(slave, 10);
			slave.devotion = Math.clamp(slave.devotion - 5, -100, 100);
			slave.trust = Math.clamp(slave.trust - 10, -100, 100);
			App.Events.addNode(node, r);
			node.append(App.UI.newSlaveIntro(slave));
			return node;
		}


		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`Opening a voice-link, you call in two security guards to await the elevator and have your new property brought to the remote surgery. After some fun playing with various sliders and buttons in its settings, you have the machine start on modding the man into a new dickgirl with a pleasing set of features. By the time ${he} comes to after the operation and quick-heal treatment, the legalities of enslavement are completed too, leaving you with another slave registered as your property. Of course, ${he} is naturally horrified and furious with you, but this is nothing to the terror that dawns when a purchasing agent appears to take ${him} away.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XY", {minAge: 17, maxAge: 25, disableDisability: 1});
			generateSalonModifications(slave);
			slave.origin = "$He was the leader of a gang in the lower levels of your arcology, until $he was overthrown and given to you as 'tribute' by a rival gang.";
			slave.devotion = random(-70, -40);
			slave.trust = random(-20, -5);
			setHealth(slave, jsRandom(0, 20));
			slave.faceShape = "masculine";
			slave.skill.anal = 0;
			slave.skill.oral = 0;
			slave.skill.whoring = 0;
			slave.skill.combat = 40;
			slave.hLength = random(10, 30);
			slave.boobs = 150;
			slave.vagina = -1;
			slave.clit = 0;
			slave.ovaries = 0;
			slave.preg = 0;
			slave.dick = random(3, 5);
			slave.balls = random(2, 4);
			slave.scrotum = slave.balls;
			slave.anus = 0;
			slave.weight = 0;
			slave.muscles = 50;
			slave.shoulders = Math.max(slave.shoulders, 1);
			slave.career = "a criminal";
			slave.sexualFlaw = "hates oral";
			slave.behavioralFlaw = "arrogant";
			slave.piercing.tongue.weight = 1;
			slave.piercing.eyebrow.weight = 1;
			slave.custom.tattoo = "$He has a tear tattooed under $his left eye.";
			return slave;
		}
	}
};
