App.Events.REFIBestiality = class REFIBestiality extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!V.seeBestiality,
			() =>
				V.animals.canine.map(c => getAnimal(c)).some(c => c.dick.size > 3) ||
				V.animals.hooved.map(h => getAnimal(h)).some(h => h.dick.size > 3) ||
				V.animals.feline.map(f => getAnimal(f)).some(f => f.dick.size > 3),
		];
	}

	/** @returns {Array<Array<actorPredicate>>} */
	actorPrerequisites() {
		return [
			[ // event slave
				s => App.Events.qualifiesForREFIeventSlave(s),
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, Fetish.BESTIALITY),
				s => s.partners.has(-8),
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {His, he, his, him, himself} = getPronouns(eventSlave);
		const {he: he2, his: his2, himself: himself2} = getPronouns(subSlave);
		const {canine, hooved, feline} = V.animals;
		const animals = [
			...canine.filter(c => getAnimal(c).dick.size > 3),
			...hooved.filter(h => getAnimal(h).dick.size > 3),
			...feline.filter(f => getAnimal(f).dick.size > 3),
		];
		const animal = getAnimal(animals.random());
		const subOral = !canDoVaginal(subSlave) && !canDoAnal(subSlave);
		/** @type {FC.SlaveActs} */
		const act = canDoVaginal(eventSlave) ? "vaginal" : canDoAnal(eventSlave) ? "anal" : "oral";

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);

		let t = [];
		let hole = () => '';

		if (canDoVaginal(subSlave)) {
			hole = () => either('pussy', 'cunt', 'sex', 'slit');
		} else if (canDoAnal(subSlave)) {
			hole = () => either('asshole', 'rectum');
		} else {
			hole = () => either('throat', 'face');
		}

		t.push(`It's time for`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`to receive ${his2} scheduled daily rutting, and ${he2}'s enjoying ${himself2} to an almost indecent degree as`);
		if (subOral) {
			t.push(`${he} takes the ${animal.name} as deep in ${his2} throat as ${he} can.`);
		} else {
			t.push(`the ${animal.name} pounds away at ${his2} ${hole()}.`);
		}

		t.push(`A small noise at the door alerts you to the fact that`);
		t.push(contextualIntro(subSlave, eventSlave, true));
		t.push(`is watching the proceedings with a raptorial focus. You call ${him} in.`);

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if ((eventSlave.dick > 0) && (eventSlave.chastityPenis === 1)) {
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
		t.push(`It seems ${he} passed by while the animal was enjoying ${subSlave.slaveName} and found the`);
		if (canSee(eventSlave)) {
			t.push(`sight`);
		} else if (canHear(eventSlave)) {
			t.push(`sounds`);
		} else {
			t.push(`sensations`);
		}
		t.push(`rather compelling. It should be possible to either encourage this fascination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into another animal fucktoy`, turn, virginityWarning()),
			new App.Events.Result(`Steer ${him} away from bestiality obsession for the moment`, steer),
		]);

		function virginityWarning() {
			if (canBeDeflowered(eventSlave)) {
				if (canDoAnal(eventSlave)) {
					return `This option will take ${his} anal virginity`;
				}
				return `This option will take ${his} virginity`;
			}
			return null;
		}

		function turn() {
			t = [];

			t.push(`Focusing a slave's sexuality on intercourse with animals is almost laughably easy; you simply add a rutting session to ${eventSlave.slaveName}'s daily schedule, at around the time when ${he}'s normally least sexually active. ${His} carnal desires, you tell ${him}, are to be met only via sex with one of your animals, and the consequences for failing to obey these simple instructions will be dire. With the correct amount of training, praise, and punishment, <span class="devotion inc">${he} has become more submissive to your will,</span> and <span class="fetish gain">now has a bestiality fetish.</span>`);

			eventSlave.devotion += 4;
			seX(eventSlave, act, "animal", "penetrative", random(10, 15));
			fetishChange(eventSlave, Fetish.BESTIALITY);
			return t;
		}

		function steer() {
			t = [];

			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in bestiality, and`);
			if ((canDoVaginal(eventSlave) && eventSlave.vagina > 0) || (canDoAnal(eventSlave) && eventSlave.anus > 0)) {
				t.push(`fuck ${him} until ${he} orgasms, reminding ${him} of how much better of a partner another human is.`);
			} else {
				t.push(`enjoy ${him} until ${he} orgasms, reminding ${him} of how much better of a partner another human is.`);
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
