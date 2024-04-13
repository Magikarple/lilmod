App.Events.REShippingContainer = class REShippingContainer extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => minimumSlaveCost(true) > minimumSlaveCost(false),
		];
	}

	get weight() {
		return (V.debugMode && V.debugModeEventSelection) ? 1 : random(0, 1);
	}

	execute(node) {
		let r = [];

		let bonusCash = Math.trunc((V.slaveCostFactor*1000)/100)*100;
		bonusCash = Math.clamp(bonusCash, 500, 1500);

		const newSlaves = [];
		for (let reShip = 0; reShip < 5; reShip++) {
			const slave = GenerateNewSlave((V.seeDicks !== 100) ? "XX" : "XY");
			slave.origin = "$He arrived at your arcology in an undocumented shipping container.";
			slave.devotion = random(-90, -75);
			slave.trust = -20;
			setHealth(slave, -10, undefined, undefined, undefined, random(50, 100));
			newSlaves.push(slave);
		}
		V.menials += 25;

		r.push(`You receive an alert from ${V.assistant.name} that there's a situation developing down in the shipping area at the base of the arcology. A shipping container arrived`);
		if (V.terrain === "urban") {
			r.push(`through the vehicular arteries that connect the arcology to the city that surrounds it,`);
		} else if (V.terrain === "rural") {
			r.push(`via one of the transportation links that traverses the wilderness around the Free City,`);
		} else if (V.terrain === "ravine") {
			r.push(`via one of few cliffside roads leading down into the Free City,`);
		} else {
			r.push(`at the docks this morning,`);
		}
		r.push(`without the proper documentation, or indeed any documentation at all. This is not uncommon in the rough and tumble world of Free Cities business; the automated handling systems scan such containers for dangerous material and then put them in a holding area until the matter can be untangled. They accumulate fees while there, and you're not infrequently able to confiscate the contents when those fees accumulate sufficiently. There are unusual reports about this container, though: citizens at the`);
		if (V.terrain === "urban") {
			r.push(`shipping area`);
		} else if (V.terrain === "rural") {
			r.push(`transport hub`);
		} else if (V.terrain === "ravine") {
			r.push(`loading port`);
		} else {
			r.push(`docks`);
		}
		r.push(`are reporting that this particular container is shouting. With nothing else pressing, you decide to handle the situation personally.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`On the way, ${V.assistant.name} updates you: a curious crowd is gathering, drawn by the commotion. As you step off the elevator, you see that it's true. The crowd parts for you amiably, partaking in the collective human eagerness to know what's inside a locked box, and knowing you'll probably sate their curiosity. You've got the scan records at your fingertips, and if it wasn't already obvious, the container is full of slaves. Shipping fresh chattel to the arcology in containers is perfectly normal. When you direct the container handling systems to open it by force, though, it's clear that this is a shoddy job. The random mix of slaves in the container are simply packed inside, with no provision for safety at all. There's about thirty of them, though most are, charitably, menial material. You confirm your suspicions with ${V.assistant.name}: this is an attempt at smuggling slaves past your slave market regulations, though a laughably bad one that stood no chance of success. Someone was probably hoping to pull them out of the holding area later.`);

		App.Events.addParagraph(node, r);
		r = [];

		r.push(`For now, the crowd around you is looking at the helpless human cargo with`);
		if (FutureSocieties.isActive('FSDegradationist')) {
			r.push(`undisguised lust.`);
		} else if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`concern, wondering if any of them need medical attention, and wanting to reassure them about the arcology they've entered.`);
		} else {
			r.push(`cupidity.`);
		}

		const choices = [];
		choices.push(new App.Events.Result(`Conduct an impromptu auction`, auction));
		choices.push(new App.Events.Result(`Keep them`, keep));
		if (FutureSocieties.isActive('FSDegradationist')) {
			choices.push(new App.Events.Result(`Indulge the crowd's Degradationism`, degradationism));
		} else if (FutureSocieties.isActive('FSPaternalist')) {
			choices.push(new App.Events.Result(`Indulge the crowd's Paternalism`, paternalism));
		}
		App.Events.addResponses(node, choices);

		function auction() {
			const frag = new DocumentFragment();
			let r = [];
			for (const slave of newSlaves) {
				cashX(slaveCost(slave), "slaveTransfer");
			}
			r.push(`Allowing humor into your voice, you announce an auction, to be held immediately. The crowd appreciates the wit, and <span class="reputation inc">appreciates it even more</span> when you conduct the auction yourself. It's always good to take an opportunity to show off your understanding of the slave market in public. You <span class="cash inc">sell them all,</span> sex slaves and menials alike. Welcome to the Free Cities.`);
			V.menials -= 25;
			cashX((25*bonusCash), "slaveTransfer");
			repX(500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function keep() {
			const frag = new DocumentFragment();
			let r = [];
			for (const slave of newSlaves) {
				newSlave(slave); /* skip New Slave Intro */
			}
			r.push(`You announce that the shipment is in violation of shipping and slave market regulations, and is being confiscated. There's a certain <span class="reputation dec">disappointment</span> in the crowd that nothing more interesting came of it, but it's minor when compared to the chattel you just seized.`);
			repX(forceNeg(50), "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function degradationism() {
			const frag = new DocumentFragment();
			let r = [];
			for (const slave of newSlaves) {
				seX(slave, "anal", "public", "penetrative", random(20, 25));
				slave.anus = 3;
				seX(slave, "oral", "public", "penetrative", random(25, 30));
				if (slave.vagina > -1) {
					seX(slave, "vaginal", "public", "penetrative", random(25, 30));
					slave.vagina = 3;
				}
				if (slave.boobs > 300) {
					seX(slave, "mammary", "public", "penetrative", random(10, 15));
				}
				setHealth(slave, -20, undefined, undefined, undefined, random(60, 100));
				newSlave(slave); /* skip New Slave Intro */
			}
			r.push(`You use the container handling systems to segregate the obvious menials from those with any potential as sex slaves. The menials go into a different container, which is whisked off, leaving a little shivering knot of frightened bodies, vulnerable and naked. The crowd watches all this with good humor, and there's silence enough that everyone hears your quiet announcement. You announce that the shipment is in violation of shipping and slave market regulations, and is being confiscated; however, you don't expect to see these particular slaves delivered to your penthouse for a couple of hours. Then you turn your back and walk away. The crowd gives a kind of <span class="reputation inc">appreciative howl</span> which, understandably, produces a wail of terror from the slaves. As you head off, the sobbing turns into screaming. It sounds like your new slaves might be a bit stretched out, here and there.`);
			repX(1000, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function paternalism() {
			const frag = new DocumentFragment();
			let r = [];
			for (const slave of newSlaves) {
				cashX(slaveCost(slave), "slaveTransfer");
			}
			r.push(`You hurry forward, beckoning the crowd to accompany you. The wretched slaves cringe with fear, but soon they're being comforted, offered water, and examined for injury. Once the most pressing needs are attended to, you call for everyone's attention. You pride yourself on knowing your citizens well, and you can pick good Paternalists out of the crowd at will. Calling them by name, you ask whether they'd be willing to take on one of these poor slaves. One by one, you pair slave and Master or Mistress, rewarding your best people with public approbation, not to mention a free slave. The initial gasps of surprise quickly grow into <span class="reputation inc">thunderous applause.</span> Your people love you. Several of the slaves begin to cry, mostly from confusion or sheer exhaustion; they don't yet know how lucky they are.`);
			V.menials -= 25;
			repX(12500, "event");
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
