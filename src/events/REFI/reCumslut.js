App.Events.REFICumslut = class REFICumslut extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /InterestTargetID
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "cumslut"),
				s => ["none", "ring gag"].includes(s.mouthAccessory),
				s => canMove(s) || hasAnyArms(s),
				canTaste
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {he2, his2, He2} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);

		let t = [];

		if (V.PC.dick > 0) {
			t.push(`You wake up to the sensation of`);
			t.push(contextualIntro(V.PC, subSlave, true));
			t.push(`eagerly sucking your dick. ${He2}'s industriously pumping ${his2} mouth up and down on your member. In truth, ${subSlave.slaveName} doesn't give the perfect blowjob: ${he2} loves cum so much that ${he2} mostly enjoys oral sex in an anticipatory way, and usually works to make the recipient cum as soon as possible so as to get ${his2} favorite treat into ${his2} mouth quicker. Still, ${his2} enthusiasm is nice and ${he2} does have permission to wake you at your usual time in this way. As you get up after finishing, you notice`);
			t.push(contextualIntro(subSlave, eventSlave, true));
			t.push(`at the door to your bedroom. You call ${him} in.`);
			seX(subSlave, "oral", V.PC, "penetrative");
		} else {
			t.push(`You come across ${subSlave.slaveName} in the middle of what appears to be an impromptu blowbang, one that seems to be drawing to a close. One by one, the citizens pull out of ${his2} wide-open mouth and splash cum into it. The bliss on ${his2} face is obvious even from where you are standing, and as you watch the scene unfolding before you, you notice`);
			t.push(contextualIntro(subSlave, eventSlave, true));
			t.push(`at the door of the room. You call ${him} in.`);
			actX(subSlave, "oral", 4);
		}

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.hormoneBalance >= 100)) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if ((eventSlave.dick > 0) && (eventSlave.balls === 0)) {
			t.push(`though ${his} gelded body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 4) {
				t.push(`${his} gigantic cock is standing out like a mast.`);
			} else if (eventSlave.dick > 2) {
				t.push(`${he}'s sporting an impressive erection.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${his} little penis is rock hard.`);
			}
		} else if (eventSlave.dick > 7) {
			t.push(`${he}'s got a string of precum coming off ${his} engorged member.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.clit > 0) {
			t.push(`${his} large clit is visibly engorged.`);
		} else if (eventSlave.vagina > -1) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there's a sheen on ${his} pussylips.`);
		} else if (eventSlave.balls > 0) {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a distinct dribble of precum running from ${his} featureless crotch.`);
		} else {
			if (eventSlave.nipples !== "fuckable") {
				t.push(`${his} nipples are hard and`);
			}
			t.push(`there is a clear scent of lust around ${him}.`);
		}
		t.push(`It seems ${he} passed by while`, contextualIntro(eventSlave, subSlave), `was`);
		if (V.PC.dick === 0) {
			t.push(`in the midst of ${his2} little oral party.`);
		} else {
			t.push(`blowing you.`);
		}

		t.push(`${He} swallows painfully at the`);
		if (canSee(eventSlave)) {
			t.push(`sight of the satisfied cumslut swirling the ejaculate around ${his2} mouth.`);
		} else {
			t.push(`sound of the satisfied cumslut savoring the fresh load.`);
		}
		t.push(`It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into a cumslut too`, turn),
			new App.Events.Result(`Steer ${him} away from cum obsession for the moment`, steer),
		]);

		function turn() {
			t = [];

			t.push(`Focusing a slave's sexuality on cum isn't as easy as some other manipulations, for the simple reason that even you have a limited supply of the stuff and it would be a shame to waste it all on ${him}. So, you take another approach; you instruct ${eventSlave.slaveName} to accompany ${subSlave.slaveName}, and vice versa, whenever their duties permit. They're to act as sexual partners, and share cum whenever there's any forthcoming. They spend the week giving blowjobs whenever they can, and making out to swap the cum back and forth afterward. If someone insists on penetrating them instead, that just means that the other has to suck it out of them before they can share it. Most importantly, ${eventSlave.slaveName} is punished if ${he} ever orgasms without cum in ${his} mouth. Soon, ${he} gets aroused by the mere`);
			if (canSmell(eventSlave)) {
				t.push(`scent`);
			} else {
				t.push(`thought`);
			}
			t.push(`of the stuff. <span class="devotion inc">${He} has become more submissive to you,</span> and <span class="fetish gain">${his} sexuality now focuses on cum.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", "public", "penetrative", 50);
			seX(subSlave, "oral", "public", "penetrative", 50);
			eventSlave.fetish = "cumslut";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];

			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in cum, and`);
			if ((canDoVaginal(eventSlave) && eventSlave.vagina > 0) || (canDoAnal(eventSlave) && eventSlave.anus > 0)) {
				t.push(`fuck ${him} until ${he} orgasms, but you are careful to keep your cum well away from ${him}.`);
			} else {
				t.push(`enjoy ${him} until ${he} orgasms, making sure to not involve cum at all.`);
			}
			t.push(`You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more submissive to you.</span>`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.devotion += 4;
			return t;
		}
	}
};
