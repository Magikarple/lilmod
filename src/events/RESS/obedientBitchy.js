App.Events.RESSObedientBitchy = class RESSObedientBitchy extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				canSee,
				s => s.behavioralFlaw === "bitchy",
				s => s.devotion > 20,
				s => s.trust >= -20
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is a decent slave, pretty well broken to your will and generally obedient. However, ${he} retains a cutting tongue. Though ${he}'s learned to ${his} considerable cost not to direct ${his} cheek at you, ${he} still insults your other slaves, and worse, will be sarcastic to members of the public ${he} encounters. You've worked on it, but it remains unsolved. Today, however, ${he} crossed the line. You were doing business in your office with a respected female slave drug wholesaler. The woman is in her late forties, and though she's something of a plastic surgery addict she has permitted her hair to go a becoming steel grey. Passing your office, ${eventSlave.slaveName} audibly commented on how old she looked to`);
		if (canStand(eventSlave)) {
			t.push(`another slave.`);
		} else {
			t.push(`${his} aide.`);
		}
		t.push(`Anger flashes in the businesswoman's eyes.`);

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result("Beg her pardon and offer to loan the bitch to her", loan),
			new App.Events.Result("Offer to spitroast the bitch between the two of you", spitroast, analVirginWarning()),
			V.arcade > 0
				? new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: new App.Events.Result()
		]);

		function loan() {
			t = [];

			t.push(`The businesswoman's anger turns to malicious anticipation as you call ${eventSlave.slaveName} over and inform ${him} that you and the businesswoman have decided ${eventSlave.slaveName} will be spending the night with her. Now that you look at your business partner, she has certain signs of a sadist. ${eventSlave.slaveName} notices too, and begins to cry ${eventSlave.bellyPreg >= 1500 ? `and shield ${his} pregnancy` : ""} as the businesswoman promises that there will be "no permanent damage." ${eventSlave.slaveName} is unceremoniously returned in the early hours of the morning. ${His} back and buttocks have been meticulously flogged right up to the very edge of damage, leaving angry marks across ${his} ${eventSlave.skin} skin. ${His} mouth lolls open, as though ${he}'s been doing little but give cunnilingus.`);
			if (eventSlave.vagina !== -1) {
				t.push(`${His} pussy,`);
			} else if (eventSlave.dick === 0) {
				t.push(`${His} shamefully featureless groin with its tiny little hole,`);
			} else {
				t.push(`${His} dick,`);
			}
			t.push(`anus, ${eventSlave.belly >= 10000 ? "popped navel," : ""} and even ${his} nipples show signs of torture. Whenever ${he} thinks of a sharp remark in the future, <span class="hotpink">${he}'ll remember the pain and keep ${his} mouth shut.</span>`);

			eventSlave.behavioralFlaw = "none";
			seX(eventSlave, "oral", "public", "penetrative", 5);

			return t;
		}

		function spitroast() {
			t = [];

			t.push(`The businesswoman grins slowly and reaches into ${his} purse as you inform ${eventSlave.slaveName} that you and the businesswoman will punish ${him} together. ${eventSlave.slaveName}'s eyes widen as the businesswoman fishes a massive strap-on out of ${his} bag. The surprise turns to fear as the businesswoman begins to slap it against ${eventSlave.slaveName}'s buttocks as you`);
			if (!isAmputee(eventSlave)) {
				if (eventSlave.belly >= 300000) {
					t.push(`push ${him} onto ${his} ${belly} belly.`);
				} else {
					t.push(`pull ${him} down on ${hasAllLimbs(eventSlave) ? "all fours." : "the ground."}`);
				}
			} else {
				t.push("arrange your bitchy little sex toy between you and your guest.");
			}
			t.push(`The businesswoman clearly wants ${his} ass, so you ${!canDoAnal(eventSlave) ? `quickly unfasten ${his} anal chastity. You` : ""} ${PC.vagina !== -1 ? `ride ${eventSlave.slaveName}'s face` : `facefuck ${eventSlave.slaveName}`} roughly as ${eventSlave.slaveName} takes a painful anal raping from the huge dildo. The businesswoman winks at you companionably and extracts squeals from ${eventSlave.slaveName} that feel especially delicious ${PC.vagina !== -1 ? "against your cunt" : "along your dick"}.`);
			if (canMove(eventSlave)) {
				t.push(`${eventSlave.slaveName} collapses ${eventSlave.belly >= 5000 ? `and rolls onto ${his} side` : ""} after a long punishment fuck;`);
			} else {
				t.push(`${eventSlave.slaveName} ends the day a sore toy;`);
			}
			t.push(`${his} <span class="hotpink">submission</span> to you and <span class="gold">fear of you</span> have both increased.`);

			if (eventSlave.anus === 0) {
				t.push(`The businesswoman considered ${his} <span class="lime">anal cherry</span> a <span class="green">respectable offer.</span>`);
				eventSlave.anus++;
				repX(500, "event", eventSlave);
			}

			eventSlave.devotion += 3;
			eventSlave.trust -= 3;
			seX(eventSlave, "anal", "public", "penetrative");
			seX(eventSlave, "oral", PC, "penetrative");
			return t;
		}

		function arcade() {
			t = [];

			t.push(`${eventSlave.slaveName} screams and begs when ${he} realizes what ${his} punishment for being stupid is to be, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				t.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				t.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				t.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${belly} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				t.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				t.push(`${His} ${eventSlave.bellyPreg >= 3000 ? "pregnant" : `${belly}`} body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				t.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				t.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			t.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} ${eventSlave.skin} butt as ${he} wriggles desperately against ${his} restraints.`);

			assignJob(eventSlave, "be confined in the arcade");
			eventSlave.sentence = 4;
			return t;
		}

		function analVirginWarning() {
			if (eventSlave.anus === 0) {
				return "This option will take anal virginity and ignore anal chastity";
			}
		}
	}
};
