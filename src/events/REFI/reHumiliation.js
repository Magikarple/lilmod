App.Events.REFIHumiliation = class REFIHumiliation extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave /InterestTargetID
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "humiliation"),
				s => ((s.anus > 0 && canDoAnal(s)) || (s.vagina > 0 && canDoVaginal(s))),
				s => s.belly < 30000
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {he2, his2, him2, He2} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [eventSlave, subSlave], [eventSlave.clothes, "no clothing"]);


		if (canDoVaginal(subSlave) && subSlave.vagina > 0) {
			seX(subSlave, "vaginal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)){
				knockMeUp(subSlave, 5, 0, -1);
			}
		} else {
			seX(subSlave, "anal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)){
				knockMeUp(subSlave, 5, 1, -1);
			}
		}

		let t = [];
		t.push(`You have`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`pinned up against a railing on a balcony that overlooks a public atrium. Passersby below cannot see you, but they can certainly see ${subSlave.slaveName}'s upper body as ${he2} takes your dick. ${He2}'s blushing furiously with the sex and with ${his2} trademark mixed arousal and embarrassment at having an audience. ${He2} makes a show of trying to disguise the fact that ${he2}'s getting railed, but it's obvious. When you finish, you pull ${him2} off the railing so ${he2} can clean up.`);
		t.push(contextualIntro(subSlave, eventSlave, true));
		if (canSee(eventSlave)) {
			t.push(`saw`);
		} else {
			t.push(`heard`);
		}
		t.push(`the denouement of this exhibitionist fun, and seems intrigued.`);
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
		t.push(`There was a glint of envy`);
		if (canSee(eventSlave)) {
			t.push(`in ${his} eyes when ${he} saw`);
		} else {
			t.push(`across ${his} face as ${he} listened to`);
		}
		t.push(`${subSlave.slaveName}'s satisfaction at being publicly used. It should be possible to either encourage this fascination with humiliation or steer ${him} away from it for now.`);


		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into a humiliation fetishist too`, turn, virginityWarning()),
			new App.Events.Result(`Steer ${him} away from humiliation fetishism for the moment`, steer),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0 && (eventSlave.anus === 0 || !canDoAnal(eventSlave))) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function turn() {
			t = [];

			t.push(`You bring ${eventSlave.slaveName} to the railing ${subSlave.slaveName} just left. For a long while, you just play with ${his} naked breasts,`);
			if (canSee(eventSlave)) {
				t.push(`requiring ${him} to look any member of the public below that stares at ${him} right in the eyes.`);
			} else {
				t.push(`making sure to keep ${him} well informed of how many passersby are ogling ${him}.`);
			}
			t.push(`${He} sobs and shakes with abject embarrassment`);
			if (canSee(eventSlave)) {
				t.push(`as ${he} locks eyes with person after person.`);
			} else {
				t.push(`as ${he} hears each whistle and catcall from onlookers.`);
			}
			t.push(`After enough of this, ${he}'s so sexually primed that ${he} orgasms convulsively almost immediately`);
			if ((canDoVaginal(eventSlave) && eventSlave.vagina > 0) || (canDoAnal(eventSlave) && eventSlave.anus > 0)) {
				t.push(`after you enter ${him} from behind.`);
			} else {
				t.push(`once run your hand across ${his} crotch.`);
			}
			t.push(`<span class="devotion inc">${He} has become more obedient,</span> and <span class="fetish gain">${his} sexuality now focuses on public humiliation.</span>`);
			if (canDoVaginal(eventSlave) && (eventSlave.vagina > 0 || eventSlave.anus === 0)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				t.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.devotion += 4;
			eventSlave.fetish = "humiliation";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];
			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in humiliation and fuck ${him} privately in your office. You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more obedient.</span>`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(VCheck.Anal(eventSlave, 1));
			} else {
				t.push(SimpleSexAct.Player(eventSlave));
			}
			eventSlave.devotion += 4;
			return t;
		}
	}
};
