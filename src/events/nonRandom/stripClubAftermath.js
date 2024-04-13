App.Events.PStripClubAftermath = class PStripClubAftermath extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	get eventName() {
		return "Strip Club Aftermath";
	}

	execute(node) {
		let r = [];
		let contractCost = 1000;
		let cost;
		const slave = GenerateNewSlave(null, {
			minAge: V.minimumSlaveAge, maxAge: 42, disableDisability: 1, race: "nonslave"
		});

		if (V.eventResults.strip === 1) {
			slave.origin = "$He offered $himself to you as a slave to escape the hard life of a free whore.";
			slave.career = "a prostitute";
			slave.devotion = 20;
			slave.trust = 5;
			setHealth(slave, jsRandom(-90, 10), undefined, undefined, undefined, 40);
			slave.anus = 2;
			if (slave.dick === 0) {
				slave.vagina = 2;
				slave.skill.vaginal = 15;
			}
			slave.skill.oral = 15;
			slave.skill.penetrative = 15;
			slave.skill.anal = 15;
			slave.skill.whoring = 15;
			slave.addict = 2;
			cost = slaveCost(slave);
		} else if (V.eventResults.strip === 2) {
			slave.origin = "$He offered $himself to you, impressed by your handling of $his employment situation.";
			slave.career = "a prostitute";
			slave.devotion = 45;
			slave.trust = 25;
			setHealth(slave, 20, undefined, undefined, undefined, 20);
			slave.anus = 2;
			if (slave.dick === 0) {
				slave.vagina = 2;
				slave.skill.vaginal = 35;
				slave.skill.penetrative = 15;
			} else {
				slave.skill.penetrative = 35;
			}
			slave.skill.oral = 35;
			slave.skill.anal = 35;
			slave.skill.whoring = 35;
			slave.boobs += 600;
			slave.boobsImplant = 600;
			slave.boobsImplantType = "string";
			slave.piercing.lips.weight = 1;
			slave.piercing.ear.weight = 1;
			slave.piercing.nose.weight = 1;
			slave.piercing.eyebrow.weight = 1;
			slave.piercing.navel.weight = 1;
			slave.piercing.nipple.weight = 1;
			slave.piercing.genitals.weight = 1;
			slave.hStyle = "strip";
			cost = slaveCost(slave);
		}
		const {
			He,
			he, his, him, himself, girl
		} = getPronouns(slave);
		const {
			HeU,
			himU, hisU, heU, girlU, womanU
		} = getNonlocalPronouns(V.seeDicks).appendSuffix("U");
		const {say} = getEnunciation(slave);

		if (V.eventResults.strip === 1) {
			r.push(`One day, you walk by the commercial space where the strip club that closed was located. It's now advertised as a massage parlor, but the real merchandise on offer is obvious. You can see a bored-looking, half-dressed masseuse rubbing a client, but the sounds of someone having hard sex are filtering out from the back room, and the pricing sheet lists more orifices than massage options.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`As you pass, a tired-looking streetwalker walking by wearing ripped jeans and a torn top offers ${himself} to you. ${He}'s halfway through ${his} clumsy come-on before ${he} curses and rushes over to kneel at your feet. As ${he} does, ${he} shrieks,`);
			r.push(Spoken(slave, `"You own this arcology! You — you offered to enslave us strippers when the old place closed down! Please, please, can I accept? I'm sorry I didn't earlier. I'm sorry. I'll fucking do anything! Please!"`));
			App.Events.addParagraph(node, r);
			r = [];
			r.push(App.UI.DOM.makeElement("span", `Enslaving ${him} will cost ${cashFormat(contractCost)}. Alternatively, you could sell ${him}. Less costs, this will bring in ${cashFormat(cost)}.`, "note"));
			App.Events.addParagraph(node, r);
			r = [];
			r.push(App.Desc.longSlave(slave));
		} else if (V.eventResults.strip === 2) {
			r.push(`One day, you walk by the commercial space where the strip club that closed was located. It's now advertised as a massage parlor, and indeed, you can see a couple of competent-looking, modestly dressed masseuses seeing to clients. The only chink in the old world decorum is the pretty sign detailing pricing, which lists not only various massages but the masseuses' hands, breasts, mouths,`);
			if (V.seeDicks !== 100) {
				r.push(`pussies,`);
			}
			r.push(`and anuses.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`As you pass, a pretty streetwalker walking by wearing an attractive club ${girl} outfit sidles up to you. ${He}'s halfway through ${his} first flirty come-on before ${he} recognizes you. ${He} gasps and ${say}s,`);
			r.push(Spoken(slave, `"You own this arcology! ${(V.PC.title !== 0) ? `Sir` : `Ma'am`}, I was a stripper here! Thank you so much for helping us. That money set most of us up pretty well." ${He} hefts ${his} chest. "It bought me new boobs, that's for sure. So, um,"`));
			r.push(`${he} bites ${his} lip in indecision,`);
			r.push(Spoken(slave, `"I hear —"`));
			r.push(`${he} hesitates and then the words come out in a rush.`);
			r.push(Spoken(slave, `"I hear your ${girl}s do really well. I've seen them, they look good. Can I come?"`));
			r.push(`You arch an eyebrow and begin to ask whether ${he} knows what that means.`);
			r.push(Spoken(slave, `"Yep,"`));
			r.push(`${he} interrupts.`);
			r.push(Spoken(slave, `"I'll be your sex slave."`));
			App.Events.addParagraph(node, r);
			r = [];
			r.push(App.UI.DOM.makeElement("span", `Enslaving ${him} will cost ${cashFormat(contractCost)}. Alternatively, you could sell ${him}. Less costs, this will bring in ${cashFormat(cost)}.`, "note"));
			App.Events.addParagraph(node, r);
			r = [];
			r.push(App.Desc.longSlave(slave));
		} else {
			r.push(`One day, you walk by the commercial space where the strip club that closed was located. The ${girlU}s you set up in cheap housing tried to run the place as a worker-owned strip bar for a while, but as you suspected, they were obliged to start whoring in short order. With the price of sex driven so low by slave competition, there's hardly any profit in bodies patrons can't even touch. The ${girlU}s here might be prostitutes now, but they're still free and they're surviving.`);
			App.Events.addParagraph(node, r);
			r = [];
			r.push(`As you pass, a pretty bottle blonde comes running out. "Hey," ${heU} calls, "you're the owner! You set us up with this place!" You ask ${himU} how they're doing. "Well," ${heU} says, smiling ruefully, "turning tricks ain't easy, you know. But we get by. Those rooms you set up for us are nice and cheap, even if we're packed in there like`);
			if (heU === "he") {
				r.push(`fraternity boys."`);
			} else {
				r.push(`sorority girls."`);
			}
			r.push(`${HeU} winks. "Hey, I don't suppose you've fucked a free ${womanU} lately? I'll give you an Arcology Tour, on the house. Least I can do."`);
		}

		App.Events.addParagraph(node, r);

		const responses = [];
		if (V.eventResults.strip !== 3) {
			if (V.cash >= contractCost) {
				responses.push(new App.Events.Result(`Enslave ${him}`, enslave));
			} else {
				responses.push(new App.Events.Result(null, null, `You lack the necessary funds to enslave ${him}.`));
			}
		} else {
			responses.push(new App.Events.Result(`Take an Arcology Tour`, tour));
			responses.push(new App.Events.Result(`Politely decline`, decline));
		}

		App.Events.addResponses(node, responses);

		function enslave() {
			const el = new DocumentFragment();
			const r = [];
			cashX(forceNeg(contractCost), "slaveTransfer", slave);
			if (V.eventResults.strip === 1) {
				r.push(`${He} sobs with gratitude as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. The medical scan discloses that ${his} aphrodisiac addiction is very new: ${he} will probably be able to kick the habit in short order if you decide to withhold further doses.`);
			} else {
				r.push(`${He} smiles with gratitude as the biometric scanners scrupulously record ${his} every particular as belonging not to a person but to a piece of human property. ${He}'s seen what Free Cities life is, and ${he} seems to have come to the conclusion that being a slave in the penthouse is better than being a free whore on the lower levels.`);
			}
			App.Events.addParagraph(el, r);
			el.append(App.UI.newSlaveIntro(slave));
			return el;
		}

		function tour() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`The cubicle ${heU} takes you back into is small, but clean and well-kept. ${HeU} gives you a kiss on the cheek. "That's not part of the Arcology Tour. Sorry. Here's the start of the real tour."`);
			if (V.PC.dick !== 0) {
				r.push(`${HeU} sucks you to full mast while shucking off ${hisU} skimpy clothing${(V.PC.vagina !== -1) ? `, giggling appreciatively at your pussy and lavishing attention on it with ${hisU} hands` : ``}. Then ${heU} turns around and slides you into ${hisU}`);
				if (heU === "he") {
					r.push(`ass`);
				} else {
					r.push(`pussy`);
				}
				r.push(`with the ease of long practice. After a good long standing fuck, ${heU} begs you to "finish the tour" in ${hisU} ass and then "pay the tour guide" by coming in ${hisU} mouth.`);
			} else {
				r.push(`${HeU} giggles. "Tour's a little different for a lady like you, Ma'am. Here," ${heU} says, and starts to make out with you, pressing you back down onto a bench. ${HeU} lavishes expert oral attention on your pussy in a series of clever positions that offer every part of ${hisU} body to you in turn for you to grope, squeeze, and penetrate with your fingers.`);
			}
			r.push(`Afterward, as ${heU}'s hurrying back into ${hisU} clothes, ${heU} says, "We've got the money you paid to set those rooms up, <span class="yellowgreen">here it is.</span> And we're doing pretty good, so we could use a little more working space. We'd like the vacant space next door. We'll furnish it, if you'll let us have it?" <span class="green">${V.arcologies[0].name}'s prosperity has increased.</span>`);
			App.Events.addParagraph(el, r);
			V.arcologies[0].prosperity += 2;
			cashX(500, "event");
			return el;
		}

		function decline() {
			const el = new DocumentFragment();
			const r = [];
			r.push(`"Aw," ${heU} says, "you're no fun. Well anyway, we've got the money you paid to set those rooms up, <span class="yellowgreen">here it is.</span> And we're doing pretty good, so we could use a little more working space. We'd like the vacant space next door. We'll furnish it, if you'll let us have it?" <span class="green">${V.arcologies[0].name}'s prosperity has increased.</span>`);
			App.Events.addParagraph(el, r);
			V.arcologies[0].prosperity += 2;
			cashX(500, "event");
			return el;
		}
	}
};
