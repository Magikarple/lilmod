// cSpell:ignore Annnnnd

App.Events.SEfctvRemote = class SEfctvRemote extends App.Events.BaseEvent {
	constructor(actors, params) {
		super(actors, params);
	}

	eventPrerequisites() {
		return [
			() => V.FCTV.receiver > 0,
			() => V.FCTV.pcViewership.frequency !== -1,
			() => V.FCTV.pcViewership.count === 0,
			() => V.week > 50,
			() => V.FCTV.remote < 2,
		];
	}

	execute(node) {
		App.UI.StoryCaption.encyclopedia = "FCTV";
		let r = [];

		V.FCTV.remote = 2;

		const tech = GenerateNewSlave(null, {
			minAge: 25, maxAge: 35, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
		});

		tech.devotion = 0;
		tech.trust = 0;
		tech.muscles = 60;
		tech.lips = 35;
		tech.origin = "You enslaved $him for poor customer service as an FCTV tech.";
		tech.career = "an installation technician";
		tech.behavioralFlaw = "arrogant";
		tech.markings = "none";
		tech.hLength = 10;
		tech.eyewear = "glasses";
		tech.clothes = "conservative clothing";
		tech.shoes = "flats";
		setHealth(tech, jsRandom(60, 80));
		if (tech.weight > 130) {
			tech.weight -= 100;
			tech.waist = jsRandom(-10, 50);
		}
		if (tech.dick > 0) {
			tech.boobs = 100;
			tech.butt = 0;
			// slave.hStyle = "messy";
		} else {
			tech.hStyle = "ponytail";
		}

		App.Events.drawEventArt(node, tech);
		const {
			He, His,
			he, his, him, himself
		} = getPronouns(tech);
		const {
			heA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		r.push(`You have a gap in your schedule in the morning, and decide to watch some`);
		if (S.Concubine) {
			r.push(
				`FCTV with your concubine,`,
				App.UI.DOM.makeElement("span", `${S.Concubine.slaveName}.`, ["slave", "name", "simple"])
			);
		} else {
			r.push(`FCTV.`);
		}
		r.push(`No sooner do you begin to watch a random show, than you have a notification that someone is here to see you. It seems to be a tech of some sort, complete with a small utility drone. A camera reveals the back of ${his} shirt, on which is written in block letters "FCTV SERVICE." Incredible. How do these people always find the worst time to stop in?`);
		if (V.assistant.personality > 0) {
			r.push(`Your assistant shrugs. At a gesture from you, ${heA} lets ${him} in.`);
		} else {
			r.push(`You push a button to allow ${him} to come in.`);
		}
		r.push(`This had better be good.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Presently, the tech enters the room and asks how your FCTV product is working. You tersely reply that it is fine,`);
		if (V.FCTV.remote === 1) {
			r.push(`although you're annoyed you had to purchase your own remote,`);
		} else {
			r.push(`although you find the random nature of the shows a little annoying,`);
		}
		r.push(`then ask the tech to cut to the point. ${He} shifts from one foot to the other, and then sheepishly admits that the service comes with a free remote that allows you to change the channels. Incredible! Why didn't you receive one? "It's, uh, 8HGG Inc. policy to distribute remotes only after a trial period." ${capFirstChar(V.assistant.name)} quietly notifies you that "${He}'s lying. We've had no notification from 8HGG Inc. of a visit. It's definitely the same tech as last time; ${he}'s trying to cover up ${his} mistake on a big contract. <i>They don't know ${he}'s here.</i>"`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} unboxes the new remote and turns ${his} back to you, eagerly demonstrating how you can use it to watch any show you want. This could be your chance to turn the tables on FCTV and get some special "customer support" of your own.`);
		App.Events.addParagraph(node, r);

		App.Events.addResponses(node, [new App.Events.Result(`"Upgrade" the tech for a little humiliation`, upgrade)]);

		function upgrade() {
			const frag = new DocumentFragment();
			let r = [];
			/* set up customer */
			const genParam = {
				minAge: 25, maxAge: 35, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
			};
			const customer = GenerateNewSlave((V.seeDicks > random(1, 99)) ? "XY" : "XX", genParam);
			customer.devotion = 0;
			customer.trust = 0;
			setHealth(customer, jsRandom(60, 80));
			customer.muscles = 60;
			if (customer.weight > 130) {
				customer.weight -= 100;
				customer.waist = random(-10, 50);
			}
			if (customer.dick > 0) {
				customer.dick = 8;
				customer.boobs = 100;
				customer.butt = 0;
				customer.hLength = 10;
				customer.clothes = "spats and a tank top";
			} else {
				customer.boobs = 1000;
				customer.natural.boobs = 1000;
				customer.butt = 3;
				customer.hLength = 30;
				customer.clothes = "sport shorts and a sports bra";
			}

			customer.behavioralFlaw = "arrogant";
			customer.markings = "none";
			customer.shoes = "flats";
			const {
				He2,
				he2, him2, his2, woman2
			} = getPronouns(customer).appendSuffix("2");

			/* set up tech */
			tech.piercing.genitals.weight = 2;
			tech.piercing.genitals.smart = true;
			let backTat;
			if (V.seeDicks === 0) {
				backTat = "clits";
			} else if (V.seeDicks === 100) {
				backTat = "dicks";
			} else {
				backTat = "clits and dicks";
			}
			tech.backTat = `'FCTV SERVICE for ${backTat}' is tattooed across $his upper back.`;
			tech.stampTat = "'Shove that upgraded package here' is tattooed above $his rear.";
			cashX(forceNeg((V.modCost * 2) + V.SPcost), "slaveMod", tech); // two tats and a smart piercing

			App.Events.refreshEventArt([tech, customer]);

			r.push(`With a barely perceptible signal to ${V.assistant.name}, ${his} drone whirs to a stop and begins to fall to the floor. Before it lands, a dart hits ${him} in the neck. ${He} collapses into darkness.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`As the tech wakes up ${he} finds ${himself} resting on your couch, with you looking`);
			if (hasAnyEyes(tech)) {
				r.push(`into ${his} ${hasBothEyes(tech) ? "eyes" : "eye"}`);
			} else {
				r.push(`at ${him}`);
			}
			r.push(`with concern. ${He} winces in pain and asks what happened. You gravely inform ${him} that ${he} must been working very hard and may have been dehydrated: ${he} passed out. ${His} back was quite bruised but other than some nausea, your systems report ${he} should be fine. You encourage ${him} to keep up ${his} fluids, then hand ${him} back ${his} communicator and mention it looks like ${he} is going to be late for ${his} other appointment. With a panicked look on ${his} face the tech thanks you, seizes ${his} device and heads out the door followed by ${his} drone. "I haven't seen that much debt outside of a slave in quite some time," ${V.assistant.name} remarks. "${He}'s fortunate to have that job."`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`The tech, ${tech.slaveName}, shoves ${his} way through the crowd as quickly as ${he} can. In front of ${him} no one pays much attention, but the crowd behind begins to titter and even point and laugh. Oblivious, ${tech.slaveName} arrives at the desired address and pauses to catch a breath. Watching from the eyes of ${his} drone, you can tell ${his} back is stiff and ${his} running had been uncomfortable. You can't help but laugh at ${his} shirt. Unknown to ${tech.slaveName}, the entire back of ${his} shirt has been replaced with a clear panel of similar feeling material. It clearly shows ${his} ${tech.skin} skin, as well as ${his} new tattoo. Like the lettered shirt it replaced it also says "FCTV SERVICE" in block letters, but below that it reads "for ${backTat}." You finger your new TV remote, as well as a second remote designed for... <i>other</i> devices.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`The door opens, and one of your citizens appears. ${tech.slaveName} doesn't know it, but you've made a small change to ${his} calendar. ${His} new client has a`);
			if (customer.dick > 0) {
				r.push(`legendarily large dick,`);
			} else {
				r.push(`legendary love of anal,`);
			}
			r.push(`even for ${V.arcologies[0].name}. The tech loses ${his} professional façade for a moment, glancing at the customer's`);
			if (customer.dick > 0) {
				r.push(`enormous bulge`);
			} else {
				r.push(`hips`);
			}
			r.push(`before gulping and gluing ${his} eyes on the customer's face. "Hi, I'm ${tech.slaveName} from FCTV; I'm here to take a look at your receiver?"`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(
				Spoken(customer, `"Certainly, it's in the bedroom on the bottom shelf."`),
				`As the tech takes a step forward you touch the first button on your other remote. The tech freezes. You know from the work you did that ${he} would be experiencing a puzzling throbbing or buzzing sensation at the moment. ${His} smart piercing was installed with a few blockers to pain, but ${his} sense of touch should be very acute, even heightened with some local aphrodisiacs. There is also a vibe deep inside ${his} ass, with a glue that will take some time to wear off. `
			);
			if (tech.prostate) {
				r.push(`Its buzzing should be impacting ${his} prostrate directly, albeit subtly.`);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(
				Spoken(customer, `"Are you OK, ${(tech.dick > 0) ? "sir" : "ma'am"}?"`),
				`The customer looks concerned.`,
				Spoken(tech, `"It's... it's nothing."`),
				`The tech replies. What on earth was happening? ${He} enters the house and follows the customer inside. You can see everything from the drone, and the tech seems to struggle a bit going up the stairs. The customer gestures inside a door,`,
				Spoken(customer, `"It's just in here, like I said, bottom shelf."`),
				Spoken(tech, `"Thank you!"`),
				`the tech responds, and you notice ${him} checking out ${his2} `
			);
			if (customer.dick > 0) {
				r.push(`crotch`);
			} else {
				r.push(`hips`);
			}
			r.push(
				`a second time. This time ${he}'s a little slower to meet ${his} customer's eyes. It's difficult to tell from the low quality of the drone camera, but you think you can begin to see a question forming there. As the tech passes ${him2} and enters the room, even you can hear the sharp intake of breath from the customer.`,
				Spoken(customer, `"Everything OK?"`),
				`${tech.slaveName} asks, turning stiffly.`,
				Spoken(tech, `"Uh, sure. Yeah."`),
				`The customer responds. The tech turns back to the TV and the customer stares at ${his} back. You move the drone into the room and subtly find a good angle, then bump up the vibration a few levels with the remote.`
			);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`${tech.slaveName} stands perfectly still for a moment, clearly not sure what was going on. ${He}'d never been dehydrated before, and surely it always made you feel hot and dizzy. The head of the arcology had mentioned nausea; did that cover this odd feeling down below? ${He} felt... horny.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`The customer quietly places a hand on ${his} shoulder and the tech jumps several`);
			if (V.showInches === 2) {
				r.push(`inches.`);
			} else {
				r.push(`centimeters.`);
			}
			r.push(
				Spoken(customer, `"Like I said, bottom shelf,"`),
				`${he2} repeats softly in ${his} ear.`
			);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(
				`The tech slowly bends toward the floor, and as ${his} modified shirt rides up and ${his} pants ride down, they reveal your second modification: a tramp stamp that reads "Shove that upgraded package here." The customer whistles and in an instant grabs a handful of ass. Perfect! The tech tries to stand up and object:`,
				Spoken(tech, `"Excuse me ${(customer.dick > 0) ? "sir" : "ma'am"}, what...!"`),
				Spoken(customer, `"Hold on, baby,"`),
				`the confused customer replies and you pick that moment to hit the third button.`
			);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(
				`Channel 14 had fascinated you. Thanks to this bumbling tech you hadn't been able to see it very often, but the idea of an aphrodisiac that took effect instantly and then quickly vanished seemed incredibly useful to you. How fortunate that it had arrived in time for this moment. The tech would have felt a fairly large liquid 'splurt' from the vibe inside ${his} ass that would have been difficult to explain. Equally difficult to explain would be the now undeniably raging vibrations. But as ${he} turns ${his} head and you can see ${his} face on the camera, it's clear none of that matters.`,
				Spoken(tech, `"Please,"`),
				`the now flushed tech says.`,
				Spoken(tech, `"M...mm my ass."`)
			);
			App.Events.addParagraph(frag, r);

			r = [];
			if (customer.dick === 0) {
				r.push(
					Spoken(customer, `"Hmmm, I'm not sure I have the right`),
					App.UI.DOM.makeElement("span", Spoken(customer, "cable."), "note"),
					`The ${woman2} replies with a lewd smirk.`,
					Spoken(customer, `"Let me see what I can do."`),
					`The titanic plug ${he2} produces was clearly purchased from the FCTV shopping network, but from the fact it was still in the box ${he2} hadn't worked up the guts to try it ${himself} and hadn't had any other takers either.`
				);
				App.Events.addParagraph(frag, r);

				r = [];
				r.push(
					`Some part of the tech's mind is clearly alarmed by the size of the plug, but after a moment of shyness ${he} quickly drops ${his} pants and bends over.`,
					Spoken(customer, `"Now I want to make sure that the remote works correctly, so start testing it."`),
					`The bent over tech turns and begins cycling through porn, watching anal insertion after anal insertion.`,
					Spoken(customer, `"Annnnnd IN!"`),
					`the ${woman2} proclaims. ${He2} slowly grinds the plug home, ridges, bumps, warts and all. The tech winds up with ${his} nose pressed into the box, and ${his} lower back pressed into the TV, ${his} butt unable to go higher (or further from the intruder!) Then, with a slip you've seen many times, it slides home.`);
				App.Events.addParagraph(frag, r);

				r = [];
				r.push(
					Spoken(customer, `"Hmm, let me see. I think I have my OWN remote"`),
					`the ${woman2} says, as ${he2} leans back on ${his2} bed. Vibration sets in, strong enough that you can see ${tech.slaveName}'s ass quaking from your own suite. The ${woman2} leans further back and beings to masturbate, moving ${his2} eyes from the porn on the TV to the ass in front of ${his2}.`,
					Spoken(customer, `"Ahh,"`),
					`${he2} says with a bit of malice.`,
					Spoken(customer, `"I think..."`),
					`${he2} stretches,`,
					Spoken(customer, `"I think your box needs an`),
					App.UI.DOM.makeElement("span", Spoken(customer, "update."), "note"),
					`This time you have the drone in place to see the button ${he2} presses, so you know it's "Fluid: All." You aren't sure how much "all" is, but the dildo is enormous, and you can see the tech's stomach distend. They both come at the same time.`);
			} else {
				r.push(`The customer doesn't even blink. In an instant both pants are down and ${he2}'s inside. There's no lube at first, but as you watch the scene unfolding in front of you it seems likely that some aphrodisiac is leaking out and helping. You hope it's safe for your citizen. The tech, of course, can get fucked. And ${he} is.`);
				App.Events.addParagraph(frag, r);

				r = [];
				r.push(
					Spoken(customer, `"Uh, that`),
					App.UI.DOM.makeElement("span", Spoken(customer, `virgin ass!"`), ["virginity", "loss"]),
					`the customer exclaims.`,
					Spoken(customer, `"How's THIS for an upgraded package. Last time I had a billing problem you folks told me where to shove it. Well. Here! It! Goes!"`),
					`From the way they collapse over each other, it seems they orgasmed at about the same time.`
				);
			}
			App.Events.addParagraph(frag, r);

			r = [];
			tech.anus = 1;
			seX(tech, "anal", "public", "penetrative");
			r.push(`Time passes...`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`It seems the aphrodisiacs are wearing off, and the tech is stirring. Sitting up, ${he} looks confused. Time for a call.`);
			App.Events.addParagraph(frag, r);

			r = [];
			r.push(`Once ${he} is standing back in your office, you sternly show ${him} portions of video, explaining how unprofessional ${his} behavior is and how deeply upset you are at the way your citizen was treated. You tell ${him} you know ${he} was on the clock, and you know ${he} was not supposed to be here, CERTAINLY not while getting fucked with a mockery of ${his} employer marked on ${his} back. ${He} begins to quake, and begs you to help ${him}. Nice to have the TV company begging you to help <i>them</i>, for once.`);
			App.Events.addParagraph(frag, r);

			const contractCost = sexSlaveContractCost();
			const choices = [];
			if (V.cash >= contractCost) {
				choices.push(new App.Events.Result(`Enslave ${him}`, enslave));
				choices.push(new App.Events.Result(`Sentence ${him} to a day in a wall with a TV, then enslave ${him}`, stocks));
			} else {
				choices.push(new App.Events.Result(null, null, `Cannot afford the ${cashFormat(contractCost)} to enslave`));
			}
			choices.push(new App.Events.Result(`Let ${him} go`, release));
			choices.push(new App.Events.Result(`Let ${him} go but release the footage`, releaseFootage));

			App.Events.addResponses(frag, choices);

			return frag;

			function enslave() {
				const frag = new DocumentFragment();
				let r = [];
				cashX(forceNeg(contractCost), "slaveTransfer", tech);
				r.push(`${tech.slaveName} knows ${he} has nowhere to turn. Sobbing, ${he} complies with the process.`);
				r.push(App.UI.newSlaveIntro(tech));

				App.Events.addParagraph(frag, r);
				return frag;
			}

			function stocks() {
				const frag = new DocumentFragment();
				let r = [];
				cashX(forceNeg(contractCost), "slaveTransfer", tech);

				r.push(
					`You can't possibly be the only one annoyed at FCTV customer service. You soon have ${him} bent over with ${his} upper half encased in a wall, and ${his} lower half along with ${his} "shove that upgraded package here" tramp stamp exposed to the entire arcology. A large monitor above ${his} ass ensures every detail of ${his} expressions are available, and aphrodisiacs ensure they are interesting. Long waits for tech support are common in this broken world, but even so, the queue that forms as the word gets out is quite impressive. ${He} spends a torturous day in the wall before being hauled in for enslavement, somewhat`,
					App.UI.DOM.makeElement("span", "the worse for wear", ["health", "dec"]),
					`and`,
					App.UI.DOM.makeElement("span", "acting oddly", ["flaw", "gain"]),
					`due to ${his} ordeal, bruises all over ${his} body, cum leaking from ${his}`,
					App.UI.DOM.makeElement("span", "loosened", ["virginity", "loss"])
				);
				if (tech.vagina > -1) {
					r.push(
						`anus and`,
						App.UI.DOM.makeElement("span", "fucked-out", ["virginity", "loss"]),
						`pussy.`
					);
				} else {
					r.push(`anus.`);
				}

				healthDamage(tech, 10);
				tech.behavioralFlaw = "odd";
				tech.sexualFlaw = "hates penetration";
				tech.anus = 2;
				const fuckCount = random(20, 35);
				seX(tech, "anal", "public", "penetrative", fuckCount);
				if (tech.vagina > -1) {
					if (tech.vagina < 2) {
						tech.vagina = 2;
					}
					if (isFertile(tech) && tech.eggType === "human") {
						r.push(knockMeUp(tech, 40, 2, -2));
					}
					seX(tech, "vaginal", "public", "penetrative", fuckCount * 2);
				}

				r.push(
					`The public`,
					App.UI.DOM.makeElement("span", "enjoys the fun.", ["reputation", "inc"])
				);
				if (V.FCTV.receiver <= 3) {
					r.push(`Frustrations released, they also seem more likely to watch FCTV.`);
					V.FCTV.receiver++;
				}
				repX(500, "event", tech);
				V.arcologies[0].prosperity += 2;
				r.push(App.UI.newSlaveIntro(tech));
				App.Events.addParagraph(frag, r);
				return frag;
			}

			function release() {
				return `You consider yourself well repaid for the fun you have had today, and dismiss the tech. ${He} seems incredulous for a second, and then incredibly thankful. ${He} hobbles out of the room as quickly as ${he} can, leaking a little fluid with every step. Naturally, you remember the vibe as soon as ${he} leaves. Oh well, it will work itself loose eventually, and you have plenty more. A fair exchange, really — one small forgotten tech product for another.`;
			}

			function releaseFootage() {
				const frag = new DocumentFragment();
				let r = [];
				r.push(`You know well that in`);
				if (FutureSocieties.isActive('FSRomanRevivalist')) {
					r.push(`Roman days,`);
				} else if (FutureSocieties.isActive('FSNeoImperialist')) {
					r.push(`the Dark Ages,`);
				} else if (FutureSocieties.isActive('FSAztecRevivalist')) {
					r.push(`Aztec days,`);
				} else if (FutureSocieties.isActive('FSEgyptianRevivalist')) {
					r.push(`Ancient Egypt,`);
				} else if (FutureSocieties.isActive('FSEdoRevivalist')) {
					r.push(`the Edo period,`);
				} else if (FutureSocieties.isActive('FSArabianRevivalist')) {
					r.push(`the Caliphates,`);
				} else if (FutureSocieties.isActive('FSChineseRevivalist')) {
					r.push(`imperial China,`);
				} else if (FutureSocieties.isActive('FSAntebellumRevivalist')) {
					r.push(`the Antebellum days,`);
				} else {
					r.push(`ancient times,`);
				}
				r.push(`exile was the worst punishment. You let ${him} know you have no intention of helping ${him}. In fact, you plan to release video of ${his} scandalous behavior on the web. As ${his} knees quake you again show ${him} slightly doctored video of ${him} eagerly receiving ${his} tattoos, and then undoctored video of ${him} enjoying ${his} "customer service." You doubt 8HGG Inc. will be pleased with ${his} enthusiasm for the brand. But, it's not your problem. Begging for mercy, the tech trails a small stream of fluids across the floor as your drones carry ${him} out. A smaller drone follows along cleaning up the mess. As the doors shut, you set the slave remote on max and break it in half over the trash.`);

				App.Events.addParagraph(frag, r);
				return frag;
			}
		}
	}
};
