App.Events.REFIDominant = class REFIDominant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domInterestTargetID
				s => App.Events.qualifiesForREFIeventSlave(s)
			],
			[ // and subslave /subID
				s => App.Events.qualifiesForREFIsubSlave(s, "dom"),
				canMove,
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {He, he, his, him, himself} = getPronouns(eventSlave);
		const {He2, he2, his2, him2} = getPronouns(subSlave).appendSuffix("2");
		const {hisU, himU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');

		App.Events.drawEventArt(node, [eventSlave, subSlave], "no clothing");

		let t = [];
		if (subSlave.vagina > 0 || subSlave.anus > 0) {
			t.push(`${subSlave.slaveName} is riding another slave,`);
			if (hasAnyArms(subSlave)) {
				t.push(`${his2} hand${hasBothArms(subSlave) ? "s" : ""} pinning ${himU} down.`);
			} else {
				t.push(`shifting ${his2} weight to keep ${himU} pinned down.`);
			}
			if (subSlave.vagina > 0 && canDoVaginal(subSlave)) {
				actX(subSlave, "vaginal");
			} else {
				actX(subSlave, "anal");
			}
		} else {
			t.push(`${subSlave.slaveName} is straddling another slave, ${his2}`);
			if (subSlave.dick > 0) {
				t.push(`cock in ${hisU} mouth.`);
				actX(subSlave, "penetrative");
			} else {
				if (subSlave.vagina > 0) {
					t.push(`pussy`);
					actX(subSlave, "vaginal");
				} else {
					t.push(`ass`);
					actX(subSlave, "anal");
				}
				t.push(`pressed to ${hisU} face.`);
			}
		}
		t.push(`The slave${girlU} had been disobedient, and ${hisU} punishment was to let`);
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`dominate ${himU}. The truth is this is also ${his2} reward; ${he2} is such a dominant that ${he2}'s prone to lashing out at your other slaves if ${he2} isn't given a proper outlet. Sure enough, ${his2} moans begin to increase in pitch and frequency, reaching a crescendo as ${he2} comes to an orgasm. Once you feel the poor ${girlU} beneath ${him2} has had enough, you give ${subSlave.slaveName} the order to dismount. ${He2}`);
		if (canMove(subSlave)) {
			t.push(`leaves`);
		} else {
			t.push(`is taken from`);
		}
		t.push(`your office with a smile on ${his2} face, passing`);
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
		t.push(`It seems ${he}`);
		if (canMove(subSlave)) {
			t.push(`passed`);
		} else {
			t.push(`was carried`);
		}
		t.push(`by while ${subSlave.slaveName} was dominating the other slave${girlU} and found the ${canSee(eventSlave) ? "sight" : "sounds"} rather compelling. It should be possible to either encourage this fascination with domination or steer ${him} away from it for now.`);

		App.Events.addParagraph(node, t);
		App.Events.addResponses(node, [
			new App.Events.Result(`Turn ${him} into a dominant too`, turn),
			new App.Events.Result(`Steer ${him} away from total domination for the moment`, steer),
		]);

		function turn() {
			t = [];

			if (canWalk(eventSlave) && canSee(eventSlave)) {
				t.push(`You order a passing slave to come in and kneel besides you, then snap your fingers at ${eventSlave.slaveName} and point commandingly at ${himU}. You tell ${him} that a proper dom does what ${he} wants — with your permission, of course — and order ${him} to get started on the other slave.`);
			} else if (isAmputee(eventSlave)) {
				t.push(`You place ${eventSlave.slaveName}'s helpless body on the floor next to your desk, then order a passing slave to come in and service ${him}. You tell ${him} that a proper dom does what he wants — with your permission, of course — and order ${him} to tell the other slave what to do.`);
			} else {
				t.push(`You order a passing slave to come in and kneel besides you, then guide ${eventSlave.slaveName} to the waiting slave. You tell ${him} that a proper dom does what ${he} wants — with your permission, of course — and order ${him} to get started on the other slave.`);
			}
			t.push(`Then, you watch as ${he} begins to use the other slave as ${his} plaything. ${eventSlave.slaveName} spends almost all ${his} sexual experiences dominating other slaves for the rest of the week. The other slaves who have sex with ${him} are ${his} to use, not for ${him} to make love to. <span class="devotion inc">${He} has become more obedient,</span> and <span class="fetish gain">${his} sexuality now focuses on domination.</span>`);
			eventSlave.devotion += 4;
			actX(eventSlave, "penetrative", 10);
			eventSlave.fetish = "dom";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			return t;
		}

		function steer() {
			t = [];

			t.push(`Good slaves get aroused according to their masters' whim, not their own silly tendencies. You call ${eventSlave.slaveName} over before ${he} can give voice to ${his} interest in domination, and`);
			if (canDoVaginal(eventSlave) && eventSlave.vagina > 0) {
				t.push(`make ${him} take`);
				if (V.PC.dick === 0) {
					t.push(`a strap-on you've put on, hard.`);
				} else {
					t.push(`your dick, hard.`);
				}
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave) && eventSlave.anus > 0) {
				t.push(`make ${him} take`);
				if (V.PC.dick === 0) {
					t.push(`a strap-on you've put on, hard.`);
				} else {
					t.push(`your dick, hard.`);
				}
				t.push(VCheck.Anal(eventSlave, 1));
			} else {
				if (V.PC.dick !== 0) {
					t.push(`ram your dick down ${his} throat`);
					if (V.PC.vagina !== -1) {
						t.push(`and make ${him} eat you out`);
						seX(eventSlave, "oral", V.PC, "vaginal");
					}
					t.push(t.pop() + '.');
				} else {
					t.push(`mash your clit in ${his} face, making ${him} eat you out.`);
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			t.push(`You ensure that ${he} maintains the submissive role throughout. You'll keep an eye on ${him}, and with this correction <span class="devotion inc">${he}'ll become more obedient.</span>`);
			eventSlave.devotion += 4;
			return t;
		}
	}
};
