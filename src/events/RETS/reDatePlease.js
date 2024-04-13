App.Events.RETSDatePlease = class RETSDatePlease extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave/domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				canWalk,
				canHear,
				s => s.assignment !== Job.QUARTER,
				s => s.relationship > 3,
				s => s.devotion > 50,
				s => s.trust > 50,
				s => s.rules.speech !== "restrictive",
			],
			[ // and subslave
				s => s.ID === getSlave(this.actors[0]).relationshipTarget, // relationshipTarget of event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				isSlaveAvailable,
				canMove,
				canTalk,
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, girl
		} = getPronouns(eventSlave);
		const {say, title: master} = getEnunciation(eventSlave);
		const {him2, girl2, wife2} = getPronouns(subSlave).appendSuffix("2");

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);

		const partner = (eventSlave.relationship >= 5) ? `${wife2}` : `${girl2}friend`;
		const pitch = (eventSlave.voice > 2) ? "high" : (eventSlave.voice > 1 ? "feminine" : "deep"); // When true male slaves are implemented, split "deep" into husky and masculine?

		let t = [];

		t.push(`After you complete your weekly inspection of`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), `, the ${SlaveTitle(eventSlave)} asks if ${he} can beg a favor. Absurd though it sounds, ${he} does exactly that, saying in ${his} ${pitch} voice, "${master}, may I ask a favor?"`));
		t.push(`You take a moment to look at ${him}, standing there in front of your desk. ${He}'s devoted to you, willing to please you for the sake of pleasing you, rather than to avoid punishment or to make ${his} own life easier. And ${he}'s very trusting, confident that ${he} can say such an odd thing without fear. So, you hear ${him} out.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`"Thank you, ${master}" ${he} ${say}s. ${Spoken(eventSlave, `"I would like to do something for`)}`);
		t.push(App.UI.DOM.combineNodes(App.UI.DOM.slaveDescriptionDialog(subSlave, Spoken(eventSlave, subSlave.slaveName)), `."`));
		t.push(`You ask if ${he}'s worried about ${his} ${partner} for some reason. "Oh no, ${master}", ${he} answers hurriedly.`);
		t.push(Spoken(eventSlave, `"No, no, that came out wrong. It's just that I love ${him2} and I want to, you know, get ${him2} something or do something special for ${him2}. We don't really have stuff of our own, so I can't give ${him2} a present, and we already do everything either one of us wants in bed, so I can't really think of anything."`));
		t.push(`${He} ${canSee(eventSlave) ? `looks` : `gazes`} at you hopefully.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result("Give them a night off together", nightOff, `This will cost ${cashFormat(500)}`),
			(V.AttendantID !== 0 && ![eventSlave.ID, subSlave.ID].includes(V.AttendantID))
				? new App.Events.Result("Give them a night at the Spa together", spa, `This will cost ${cashFormat(500)}`)
				: new App.Events.Result(),
			new App.Events.Result("Trust them with a night out", nightOut, `This will cost ${cashFormat(1000)}`),
		]);


		function nightOff() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, subSlave]);
			t = [];

			t.push(`Rather than answering ${him} directly, you tell ${V.assistant.name} to clear ${eventSlave.slaveName}'s and ${subSlave.slaveName}'s schedules for the evening. ${He} ${canSee(eventSlave) ? `looks` : `smiles`} at you with happy anticipation, but is puzzled when you don't give ${him} any further orders. "Um, thank you, ${master}" ${he} asks hesitantly.`);
			t.push(Spoken(eventSlave, `"But, I don't understand. What are we going to do?"`));
			t.push(`Whatever you want, you tell ${him}. ${He} furrows ${his} brow, looking troubled, as though the concept is somehow alien to ${him}. After some thought, ${he} brightens and asks if ${he} can go tell ${his} ${partner}. ${He} can, you respond, and the slave bounces over to give you a kiss before running out. It costs you a small sum in upkeep and other trifles to cover an unexpected unavailability of both slaves, but they deserve it. Their busy lives mean that their shifts rarely align exactly, and this is more time than they've had together in a long time. It isn't particularly exciting, but they enjoy themselves. They eat a meal in the kitchen together, watch the sunset from one of the penthouse balconies, make love out there, share a long shower, and then go to bed, spending the rest of the night cuddling and chatting quietly. The next morning, they come to see you hand in hand, and <span class="devotion inc">thank you in unison.</span> As they leave, ${eventSlave.slaveName} looks back over ${his} shoulder at you, and mouths 'That was perfect, ${getWrittenTitle(eventSlave)}!'`);
			cashX(-500, "event", eventSlave);
			if (canPenetrate(eventSlave)) {
				SimpleSexAct.Slaves(subSlave, eventSlave);
			} else if (canPenetrate(subSlave)) {
				SimpleSexAct.Slaves(eventSlave, subSlave);
			} else {
				SimpleSexAct.Slaves(subSlave, eventSlave);
			}
			subSlave.devotion += 2;
			eventSlave.devotion += 2;
			return t;
		}

		function spa() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, subSlave], "no clothing");
			const {He3, he3, his3, him3} = getPronouns(S.Attendant).appendSuffix("3");
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`Rather than answering ${him} directly, you tell ${V.assistant.name} to clear ${eventSlave.slaveName}'s and ${subSlave.slaveName}'s schedules for the evening, and then contact ${S.Attendant.slaveName}, the Attendant of your Spa, to instruct ${him3} to expect the two slaves for some quality time together. ${S.Attendant.slaveName}, of course, is all for it (${Spoken(S.Attendant, `"Leave it to me, ${getWrittenTitle(S.Attendant)}!"`)}). ${He3} greets the couple at the steamy entrance to the Spa an hour later, and takes charge of them with a matronly air, telling them to undress and relax.`);
			App.Events.addParagraph(frag, t);
			t = [];
			t.push(`It costs you a small sum in upkeep and other trifles to cover an unexpected unavailability of both slaves, but they deserve it, and your Attendant does not disappoint. After the slaves have soaked in the main pool for a while, ${he3} gives them a series of mud packs, hot rock massages, and skin treatments, always setting them up right next to each other. They chat a bit at first, but soon relax into companionable silence, ${hasAnyArms(eventSlave) && hasAnyArms(subSlave) ? "holding hands and enjoying" : "side by side to enjoy"} the pampering.`);
			if (S.Attendant.lactation > 0) {
				t.push(`${S.Attendant.slaveName} has their evening meal sent down, and supplements it with ${S.Attendant.milkFlavor === "none" ? `` : `${S.Attendant.milkFlavor}-flavored `}milk drunk fresh from ${his3} own nipples.`);
			}
			t.push(`This being your penthouse, ${his3} services become quite sexual later in the night, as the Attendant applies all ${his3} talents in choosing positions that emphasize ${eventSlave.slaveName} and ${subSlave.slaveName} being close to each other, a difficult task given`);
			if (S.Attendant.bellyPreg >= 10000 && eventSlave.bellyPreg >= 10000 && subSlave.bellyPreg >= 10000) {
				t.push(`that they are all heavily pregnant,`);
			} else if (S.Attendant.belly >= 10000 && eventSlave.belly >= 10000 && subSlave.belly >= 10000) {
				t.push(`how big everyone's bellies are,`);
			}
			t.push(`as they share ${S.Attendant.slaveName}'s body. Much later, the Attendant sends you a brief message relaying their <span class="devotion inc">heartfelt thanks,</span> which ${he3}'s passing to you because they're asleep together.`);
			SimpleSexAct.Slaves(S.Attendant, eventSlave);
			SimpleSexAct.Slaves(S.Attendant, subSlave);
			SimpleSexAct.Slaves(subSlave, eventSlave);
			SimpleSexAct.Slaves(eventSlave, subSlave);
			cashX(-500, "event", eventSlave);
			subSlave.devotion += 3;
			eventSlave.devotion += 3;
			App.Events.addParagraph(frag, t);
			return frag;
		}

		function nightOut() {
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, [eventSlave, subSlave], "conservative clothing");
			const frag = document.createDocumentFragment();
			t = [];
			t.push(`Rather than answering ${him} directly, you tell ${V.assistant.name} to clear ${eventSlave.slaveName}'s and ${subSlave.slaveName}'s schedules for the evening. ${He} looks at you with happy anticipation, but this is nothing compared to ${his} gratitude when you tell ${him} that you'll arrange a date night for them. Trusted slaves are often seen unchaperoned in your arcology, and there are several establishments that cater to slaveowners who wish to bring their chattel out or even send them out alone. You tell ${him} you've made a reservation for ${him} and ${his} ${partner} at one of the less formal places, an ethnic restaurant that manages to add spice to liquid slave nutrition without ruining its good qualities. They're to spend the night out, and can wear what they like. ${He} hurries off to collect ${his} ${girl2} and get dressed, but also tries to keep thanking you on ${his} way out, and almost runs into the door frame as ${he} goes.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`Since ${he} trusts you, they dress very daringly for slaves. That is, they dress about as conservatively as slaves can dress, in comfortable pants and soft sweaters whose high collars they roll down to keep their collars visible. Any hesitations citizens who see them might have are banished by their obvious love for each other, and their total lack of shame about having it seen. Indeed, as the night wears on they attract more than a few <span class="reputation inc">admiring glances</span> from citizens who envy you the favors of the pair of ${girl === girl2 ? `${girl}s` : `slaves`} occupying one side of the corner booth. After all, they'd rather lean against each other than look at each other from across a table. The next day, they both come to you individually and <span class="trust inc">thank you almost gravely,</span> quite aware of the trust you've placed in them.`);
			cashX(-1000, "event", eventSlave);
			repX(500, "event", eventSlave);
			subSlave.trust += 2;
			eventSlave.trust += 2;
			App.Events.addParagraph(frag, t);
			return frag;
		}
	}
};
