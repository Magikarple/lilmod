App.Events.recPunkFemcat = class recPunkFemcat extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.seeDicks !== 100,
			() => V.seeCats !== 0,
			() => V.projectN.techReleased !== 0,
			() => ((V.rep/400) > random(1, 50) || V.cheatMode === 1)
		];
	}

	get eventName() {
		return "Punk Femcat";
	}

	execute(node) {
		const slave = makeSlave();
		const {He, he, his, him, himself, girl, woman} = getPronouns(slave);
		let r = [];

		r.push(`After having released the Project N technologies to the public, other wealthy elites across the globe have used them to build up their own harems of cat toys, or simply to sell the rare and treasured slavegirls to those with such specific tastes. Owing to the nature of their creation, nearly all catgirls in existence are slaves, and typically only owned by the wealthy and prestigious. However, in some rare cases, catgirls have been made free, released by curious or affectionate owners, or even been born to other free catgirls, and minuscule populations of free catfolk have made their homes in some Free Cities. Unfortunately, they tend to do quite poorly as free citizens.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(`For one thing, free cats are generally extremely poor, and any other cats in their small communities are just as impoverished. For another, their feline nature makes them bitchy, territorial, and sometimes outright aggressive in ways that don't tend to work out for poor citizens in Free Cities culture. But as the head bitch of an arcology yourself, it works out just fine for you. Today, your assistant's notified you of one of the free cat${girl} citizens of your own arcology who's managed to get ${himself} in trouble with the authorities, which puts ${his} punk ass on the table for cheap and legal enslavement. As you sit back at your desk, you browse casually over the video of the incident in question, some minor affair involving some vandalism and petty theft in the poorest quarter of the arcology that escalated when ${he} got uppity at your guards. By five minutes into the video, the arresting officers are making the handcuffed cat${girl} lift ${his} tail and point ${his} ass towards the camera, while one of them squeezes a buttcheek hard enough to make the cat${girl}'s assflesh bulge out between his fingers in the tight black skinny jeans ${he}'s wearing. While you decide whether ${he}'s worth enslaving, the punk cat makes some mouthy statement that earns ${him} a hard slap to ${his} other asscheek by the second officer.`);
		App.Events.addParagraph(node, r);
		r = [];
		r.push(App.UI.DOM.makeElement("span", `It'd be absolutely trivial to enslave ${him}, really just a matter of filling out some paperwork and bureaucracy costing ${cashFormat(1500)}. ${He}'s pretty enough, albeit feisty, loud, and completely unbroken.`, "note"));

		App.Events.addParagraph(node, r);
		const contractCost = 1500;
		const cost = slaveCost(slave) - contractCost;
		const responses = [];
		if (V.cash >= contractCost) {
			responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
		} else {
			responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}`));
		}
		responses.push(new App.Events.Result(`Sell ${him} immediately`, sell, `This will bring in ${cashFormat(cost)}`));

		node.append(App.Desc.longSlave(slave, {market: "generic"}));

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			let r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			r.push(`You quickly fill out the paperwork to transfer the low-status cat${girl}'s legal ownership to yourself, before anyone else can notice how easy it'd be to snatch the unfortunate cat${girl} up for themselves. Making your way to the local guard station where ${he} is being kept, you tell the young ${woman} you're taking ${him} out of jail. Obviously not buying it, ${he} glowers at you as you take ${his} readings and calls you a`);
			r.push(Spoken(slave, `"monkey fucker",`));
			r.push(`blabbering on something about systemic cat oppression and plutocracy before you have the mouthy cat gagged. Sinking ${his} fangs into the ball gag you've had one of the officers shove into ${his} mouth and tightly cuffed, you tell the guards to keep ${him} tightly bound up until the slave trader you've sold ${him} to arrives. One of them smiles and says it'll be a pleasure, glancing over at the bound-up catslave.`);
			r.push(App.UI.newSlaveIntro(slave));
			App.Events.addNode(el, r);
			return el;
		}

		function sell() {
			const el = new DocumentFragment();
			let r = [];
			cashX(cost, "slaveTransfer");
			r.push(`You quickly fill out the paperwork to transfer the low-status cat${girl}'s legal ownership to yourself, before anyone else can notice how easy it'd be to snatch the unfortunate cat${girl} up for themselves. Making your way to the local guard station where ${he} is being kept, you tell the young ${woman} you're taking ${him} out of jail. Obviously not buying it, ${he} glowers at you as you take ${his} readings and calls you a`);
			r.push(Spoken(slave, `"monkey fucker",`));
			r.push(`blabbering on something about systemic cat oppression and plutocracy before you have the mouthy cat gagged. Sinking ${his} fangs into the ball gag you've had one of the officers shove into ${his} mouth and tightly cuffed, you tell the guards to keep ${him} tightly bound up until the slave trader you've sold ${him} to arrives. One of them smiles and says it'll be a pleasure, glancing over at the bound-up catslave.`);
			App.Events.addNode(el, r);
			return el;
		}

		function makeSlave() {
			const slave = GenerateNewSlave("XX", {minAge: 18, maxAge: 28, race: "catgirl"});
			slave.origin = `$He was a rare free cat$girl whose feline nature drove $him towards petty vandalism and thuggery that eventually cost $his freedom.`;
			slave.career = "a street thug";
			slave.teeth = "fangs";
			slave.faceShape = "feline";
			slave.devotion = random(-55, -40);
			slave.trust = random(-20, 10);
			slave.earShape = "none";
			slave.earT = "cat";
			slave.earTColor = slave.hColor;
			slave.earImplant = 1;
			slave.tailShape = "cat";
			slave.tailColor = slave.hColor;
			slave.eye.left.pupil = "catlike";
			slave.eye.right.pupil = "catlike";
			slave.behavioralFlaw = either("bitchy", "arrogant");
			slave.hStyle = "undercut";
			slave.accent = 2;
			return slave;
		}
	}
};
