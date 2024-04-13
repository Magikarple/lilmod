App.Events.RESSSuppositoryResistance = class RESSSuppositoryResistance extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.suppository !== 0
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canStand,
				hasAnyArms,
				s => s.drugs !== "none",
				s => s.devotion <= 20 && s.devotion >= -50,
				s => s.trust >= -20,
				s => s.fetish !== "buttslut"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		const {title: Master} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];

		t.push(`As you're starting your day, ${V.assistant.name} pauses ${hisA} review of business matters to report that`);
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is not accepting ${his} drugs from the phallic feeders in the kitchen. With nothing else urgent, you head down to address the situation. ${eventSlave.slaveName} is standing in front of the place where ${he}'s supposed to take ${his} drugs. It's a little pad on the ground on which ${he}'s supposed to kneel, with a fuckmachine positioned to penetrate ${his} anus once ${he} does so. ${He}'s not completely awake yet, and is just standing there, ${canSee(eventSlave) ? "viewing" : "feeling"} the setup with a vague look of distaste. ${He}'s facing it, and has ${his}`);
		if (eventSlave.butt > 6) {
			t.push("massive behind");
		} else if (eventSlave.butt > 3) {
			t.push("beautiful bottom");
		} else {
			t.push("cute butt");
		}
		t.push("pointed very much away from the machine that's supposed to be fucking it.");

		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${He} turns to you as you enter, and ${canSee(eventSlave) ? "seeing" : "realizing"} that it's you, ${he}`);
		if (canTalk(eventSlave)) {
			t.push(
				`mumbles unhappily,`,
				Spoken(eventSlave, `"Please, ${Master}, can I just take a shot? Assrape from, you know, people, is, um, bad enough."`)
			);
		} else {
			t.push(`uses hesitant gestures to beg you to let ${him} take ${his} drugs normally. ${He} tries to use gestures to explain that ${he} thinks ${he} gets enough anal from humans, without being buttfucked by a machine every morning.`);
		}

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Talk ${him} through it`, talk),
			new App.Events.Result(`Punish ${him} with a bigger phallus`, bigPhallus),
			new App.Events.Result(`Double penetrate ${his} ass for insolence`, penetrate)
		]);

		function talk() {
			t = [];

			t.push(`You put as much quiet authority into your ${canHear(eventSlave) ? "voice" : "words"} as you can, and explain to ${him} that ${he} is required to take ${his} drugs up ${his} ass. You do not explain any of the actual reasons why you require slaves to submit to daily machine anal, but couch your quiet explanation in terms of ${his} life as a slave. You tell ${him} that taking a solid buttfuck from a machine first thing in the morning is something you've ordered ${him} to do. ${He} needs to do it. If ${he} does, ${he}'ll be treated well; if ${he} does not, that will oblige you to punish ${him}. You tell ${him} that you would like ${him} to be a good slave, and that it would be disappointing if you had to punish ${him}. You put just a hint of steel into the last sentence, and ${he} stiffens a little at it. Hesitantly, ${he}`);
			if (eventSlave.belly >= 300000) {
				t.push(`shifts onto ${his} ${belly} belly, uses ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} to brace ${himself} against the impending pounding, and scoots towards the phallus.`);
			} else {
				t.push(`gets to ${his} ${hasBothLegs(eventSlave) ? "knees" : "knee"}, using ${his} ${hasBothArms(eventSlave) ? "hands" : "hand"} to spread ${his} cheeks for the phallus.`);
			}
			t.push(`Sensing that it's being offered an anus, it gently pushes inside ${his} rectum. Its strokes get longer and faster,`);
			if (eventSlave.anus > 2) {
				t.push(`until ${he}'s groaning under the sodomy despite ${his} loose ass.`);
			} else if (eventSlave.anus > 1) {
				t.push(`quickly gaping ${his} big butthole and making ${him} groan.`);
			} else {
				t.push(`making ${him} gasp as it stretches ${his} poor little asshole.`);
			}

			if (V.cockFeeder !== 0) {
				t.push(`${He} doesn't manage to groan for long, though, since the kitchen extends another phallus to feed ${him} ${his} breakfast. Before long, ${he}'s being spitroasted by machines.`);
			}
			t.push(`Once ${he}'s fully awake, ${he}'s mostly <span class="mediumaquamarine">relieved</span> that you let ${him} get away with hesitation about obedience and took the time to talk ${him} through it.`);

			eventSlave.trust += 4;
			return t;
		}

		function bigPhallus() {
			t = [];

			t.push(`You give the kitchen an order by voice command. ${canHear(eventSlave) ? "It's technical" : `${He} can't hear it`}, so ${he} doesn't understand it, but the meaning becomes clear soon enough. The phallus aiming meaningfully at the place where ${he}'s supposed to kneel and offer up ${his} butthole is withdrawn, and ${he}'s halfway through a shocked thank you when it's replaced by another, noticeably larger. You tell ${him} in deceptively mild tones that you'll keep increasing the size of ${his} phallus until ${he} decides to get down and take it like a good little ${desc}, or you run out of size options and are forced to strap ${him} down and apply two at once. At that point, ${his} ass might be able to take it; then again, it might not. ${He} begins to cry, but is so <span class="gold">frightened</span> by the threat that ${he} doesn't let ${his} tears distract ${him} from a delectable scramble to`);
			if (eventSlave.belly >= 300000) {
				t.push(`throw ${himself} onto ${his} ${belly} belly and`);
			} else {
				t.push(`get down on ${his} ${hasBothLegs(eventSlave) ? "knees" : "knee"} and`);
			}
			if (eventSlave.butt > 6) {
				t.push(`heave ${his} huge buttocks apart.`);
			} else if (eventSlave.butt > 3) {
				t.push(`spread ${his} broad buttocks.`);
			} else {
				t.push(`spread ${his} cute ass wide.`);
			}

			if (V.cockFeeder !== 0) {
				t.push(`Once it's got its phallus sliding in and out of ${his} asshole, the kitchen gives ${him} another, to suck off for ${his} breakfast. Fortunately for ${him}, ${he} doesn't object, and only gets facefucked by the normal dildo.`);
			}
			t.push(`${He} keeps the threat in mind, and has a slightly sore ass to <span class="hotpink">help ${him} remember to obey without question.</span>`);

			eventSlave.trust -= 2;
			eventSlave.devotion += 2;
			return t;
		}

		function penetrate() {
			t = [];

			t.push(`You step forward and take gentle hold of the slave's throat, telling ${him} to get down on ${his} knees like a good little ${desc}. You make no threat, but give ${him} the order in a voice of brass. ${He} knows what you can do to ${him}, and hurries to obey, <span class="gold">terribly frightened.</span> ${His} fear is justified. You announce that ${he}'s avoided serious punishment, but ${he} still needs correction for ${his} hesitation and insolence. ${He}'s concerned when ${he}`);
			if (canSee(eventSlave)) {
				t.push("sees you");
			} else if (canHear(eventSlave)) {
				t.push("hears you");
			} else {
				t.push("feels you");
			}

			if (PC.dick !== 0) {
				t.push(`get your dick ${PC.vagina !== -1 ? "and pussy" : ""} out,`);
			} else {
				t.push("don a strap-on,");
			}
			t.push(`though ${he}'s distracted by the rapidly accelerating buttfuck ${he}'s getting from the machine. ${He} tries to offer you ${his} throat, but ${his} hopes are dashed when you walk around behind ${him}, swing a leg over the machine pistoning in and out of ${his} asshole, and command it to stop for a moment. Then you work ${PC.dick !== 0 ? "yourself" : "your own dildo"} up ${his} ass alongside the phallus that already fills it. The drugs are delivered with lubricant, and you do fit, but only after a nice long session of sobbing, spasming, and finally crying resignation. Then you order the machine to go back to what it was doing, and the resignation vanishes, replaced with anal pain as ${eventSlave.slaveName} takes double penetration up ${his}`);
			if (eventSlave.anus > 2) {
				t.push("gaping anus.");
			} else if (eventSlave.anus === 2) {
				t.push("big butthole.");
			} else {
				t.push("poor, abused little butt.");
			}

			if (V.cockFeeder !== 0) {
				t.push(`When you grow tired of the whining, you order the kitchen to give the bitch breakfast. It extends a feeding phallus and fills ${his} throat, muffling the noise somewhat.`);
			}

			t.push(VCheck.Anal(eventSlave, 1));

			eventSlave.trust -= 4;
			return t;
		}
	}
};
