App.Events.REFISubmissive = class REFISubmissive extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "submissive"),
				s => (canDoAnal(s) && s.anus > 0) || (canDoVaginal && s.vagina > 0),
				s => s.belly < 30000,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {He2, he2, his2, him2} = getPronouns(subSlave).appendSuffix("2");

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		if (canDoVaginal(subSlave) && (subSlave.vagina > 0)) {
			seX(subSlave, "vaginal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)) {
				knockMeUp(subSlave, 5, 0, -1);
			}
		} else {
			seX(subSlave, "anal", V.PC, "penetrative");
			if (canImpreg(subSlave, V.PC)){
				knockMeUp(subSlave, 5, 1, -1);
			}
		}

		let t = [];
		t.push(`You have`, contextualIntro(V.PC, subSlave, true), `lying on the edge of your desk with ${his2}`);
		if (subSlave.belly >= 1500) {
			t.push(`bloated`);
		}
		t.push(`body helpless beneath you, your `);
		if (V.PC.dick !== 0) {
			t.push(`dick`);
		} else {
			t.push(`strap-on`);
		}
		t.push(`inside ${him2}, and your hands around ${his2} neck. It's just breath play, and you're practiced enough that ${he2}'s in no danger. ${He2}'s such a sexual submissive that ${he2} sometimes acts out if not managed. This happens when ${he2} feels the urge to misbehave in order to access punishment, so you personally ensure that ${he2} can indulge ${his2} submissiveness when ${he2} needs it. ${He2} does not orgasm with you, ${his2} complete servitude to your pleasure fulfilling a deeper need than that. ${He2}`);
		if (canMove(subSlave)) {
			t.push(`leaves`);
		} else {
			t.push(`is taken from`);
		}
		t.push(`your office with a serene look on ${his2} face, passing`);
		t.push(App.UI.DOM.combineNodes(contextualIntro(subSlave, eventSlave, true), ", who is"));
		if (isAmputee(eventSlave)) {
			t.push(`propped limblessly nearby. ${He} has`);
		} else if (!hasAnyLegs(eventSlave)) {
			t.push(`propped helplessly nearby. ${He} has`);
		} else if (!canWalk(eventSlave)) {
			t.push(`kneeling in the doorway with`);
		} else if (canStand(eventSlave)) {
			t.push(`standing in the doorway with`);
		} else {
			t.push(`seated in the doorway with`);
		}
		t.push(`a troubled look on ${his} face.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} hesitates before explaining ${himself}, and the ${SlaveTitle(eventSlave)} is obviously aroused:`);
		if (eventSlave.dick > 0 && eventSlave.chastityPenis === 1) {
			t.push(`${he}'s got a string of precum leaking out of ${his} chastity cage.`);
		} else if (eventSlave.dick > 0 && eventSlave.hormoneBalance >= 100) {
			t.push(`though ${his} hormone-filled body can't get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls > 0 && eventSlave.ballType === "sterile") {
			t.push(`though ${his} useless balls can't muster the effort to get ${his} dick hard any more, ${he}'s got a string of precum coming off ${his} limp member.`);
		} else if (eventSlave.dick > 0 && eventSlave.balls === 0) {
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
		t.push(`It seems ${he}`);
		if (canMove(subSlave)) {
			t.push(`passed`);
		} else {
			t.push(`was carried`);
		}
		t.push(`by while you were dominating ${subSlave.slaveName}.`);
		if (hasAnyArms(eventSlave)) {
			t.push(`As though it has a mind of its own, ${his} hand reaches up toward ${his} throat.`);
		}
		t.push(`It should be possible to either encourage this fascination with submission or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into a submissive too`, turn),
			new App.Events.Result(`Steer ${him} away from total submission for the moment`, steer),
		]);

		function turn() {
			t = [];

			if (canWalk(eventSlave) && canSee(eventSlave)) {
				t.push(`You snap your fingers at ${eventSlave.slaveName} and point commandingly at the floor next to your desk. You tell ${him} that a proper sub does what ${his} dom wants, always, and leave ${him} kneeling obediently beside you for some time.`);
			} else if (isAmputee(eventSlave)) {
				t.push(`You place ${eventSlave.slaveName}'s helpless body on the floor next to your desk. You tell ${him} that a proper sub does what ${his} dom wants, always, and leave ${him} lying obediently beside you for some time.`);
			} else {
				t.push(`You guide ${eventSlave.slaveName} to the floor next to your desk and push ${him} to`);
				if (hasBothLegs(eventSlave)) {
					t.push(`${his} knees.`);
				} else {
					t.push(`the floor.`);
				}
				t.push(`You tell ${him} that a proper sub does what ${his} dom wants, always, and leave ${him} waiting obediently beside you for some time.`);
			}
			t.push(`Then, without preamble, you stand up again and`);
			if (V.PC.dick === 0) {
				t.push(`ride ${his} face,`);
			} else {
				t.push(`throatfuck ${him},`);
			}
			t.push(`intentionally ensuring that ${he} gags and struggles. ${eventSlave.slaveName} spends almost all ${his} sexual experiences in subspace for the rest of the week. Even other slaves who have sex with ${him} are required to use ${him}, not make love to ${him}. <span class="devotion inc">${He} has become more obedient,</span> and <span class="fetish gain">${his} sexuality now focuses on submission.</span>`);
			eventSlave.devotion += 4;
			seX(eventSlave, "oral", V.PC, "penetrative", 2);
			actX(eventSlave, "oral", 10);
			eventSlave.fetish = "submissive";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];

			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in submission, and make ${him}`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`ride`);
				if (V.PC.dick === 0) {
					t.push(`a strap-on you're wearing.`);
				} else {
					t.push(`your dick.`);
				}
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(`ride`);
				if (V.PC.dick === 0) {
					t.push(`a strap-on you're wearing.`);
				} else {
					t.push(`your dick.`);
				}
				t.push(VCheck.Anal(eventSlave, 1));
			} else {
				if (V.PC.dick !== 0) {
					t.push(`suck you off`);
					if (V.PC.vagina !== -1) {
						t.push(`and eat you out`);
					}
				} else {
					t.push(`eat you out`);
				}
				t.push(`at ${his} own pace.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			t.push(`You ensure that ${he} maintains the active role throughout. You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more obedient.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
