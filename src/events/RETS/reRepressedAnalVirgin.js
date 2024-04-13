App.Events.RETSAnalRepressedVirgin = class RETSAnalRepressedVirgin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
		];
	}

	actorPrerequisites() {
		return [
			[ // event slave /domslave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				canTalk,
				s => s.assignment !== Job.QUARTER,
				canDoAnal,
				canHear,
				s => s.anus === 0,
				s => s.devotion >= -50,
				s => s.trust >= -50,
				s => s.sexualFlaw === "repressed",
				s => s.fetish !== "buttslut",
			],
			[ // and subslave
				s => s.fetish !== Fetish.MINDBROKEN,
				canWalk,
				canTalk,
				isSlaveAvailable,
				s => s.devotion > 50,
				s => (canDoAnal(s) && s.anus !== 0),
			]
		];
	}

	execute(node) {
		const [eventSlave, subSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself, girl, Girl
		} = getPronouns(eventSlave);
		const {
			he2, his2, him2, girl2, himself2
		} = getPronouns(subSlave).appendSuffix("2");
		const {say, title: master} = getEnunciation(eventSlave);
		const pDick = V.PC.dick !== 0;

		App.Events.drawEventArt(node, [eventSlave, subSlave]);

		let t = [];
		t.push(contextualIntro(V.PC, subSlave, true));
		t.push(`has been a very good ${girl2} this week, so when ${his2}`);
		if (subSlave.anus > 2) {
			t.push(`loose asshole`);
		} else if (subSlave.anus > 1) {
			t.push(`big butthole`);
		} else {
			t.push(`tight anus`);
		}
		t.push(`catches your eye near the start of a long inspection, you decide to be kind to ${him2} as you conduct the rest of your inspection with ${pDick ? "your cock" : "a strap-on"}.`);
		t.push(contextualIntro(V.PC, eventSlave, true));
		t.push(`is next on the inspection schedule, and when ${he} comes into your office, it's to the`);
		if (canSee(eventSlave)) {
			t.push(`sight of`);
			t.push(App.UI.DOM.combineNodes(contextualIntro(eventSlave, subSlave), "'s back and rear"));
		} else {
			t.push(`sound of ${subSlave.slaveName}`);
		}
		t.push(`as ${he2} lazily rides ${his2} ${getWrittenTitle(subSlave)}. You've been sitting on the couch, making out with the compliant ${girl2} as ${he2} rides you, for a good half hour. Poor ${subSlave.slaveName} was pent up when you started, and ${he2}'s climaxed already; ${he2}'s feeling very devoted and relaxed at the moment, and is doing ${his2} best to get you off, too. When you finally come, ${he2} moans ${his2} thanks into your mouth nonverbally, breaks your lip lock, gives you a peck on the nose, and climbs off you. As ${he2} does, ${he2} lifts ${his2} ass off your ${pDick ? "cock" : "strap-on"}, ${his2}`);
		if (subSlave.anus > 2) {
			t.push(`gaping anus dripping ${pDick ? "cum" : "lube"} all over ${his2} ${subSlave.skin} legs.`);
		} else if (subSlave.anus > 1) {
			t.push(`well-fucked backdoor taking a few seconds to recover from its gape, dripping a little ${pDick ? "cum" : "lube"} down ${his2} ${subSlave.skin} legs.`);
		} else {
			t.push(`still-tight backdoor sliding quickly off you, visibly slick with ${pDick ? `cum` : `lube`}.`);
		}
		t.push(`You didn't fuck ${him2} too hard, but`);
		if (pDick) {
			t.push(`you're`);
		} else {
			t.push(`your strap-ons are`);
		}
		t.push(`not small, and ${he2} walks a little gingerly as ${he2} heads for the bathroom. ${eventSlave.slaveName}, standing there nude for inspection, stares openmouthed at ${subSlave.slaveName} as ${he2} goes. ${He}'s obviously unfamiliar with anal sex.`);
		App.Events.addParagraph(node, t);
		t = [];

		t.push(`${eventSlave.slaveName} coughs and looks doubtful, like ${he}'s mulling over a question. You let the poor repressed ${girl} chew on it for a while, and eventually ${he} bursts out,`);
		t.push(Spoken(eventSlave, `"${capFirstChar(master)}, what were you doing with ${subSlave.slaveName}?"`));
		t.push(`The absurdity gives you a moment's pause, but you answer gamely that you were fucking ${his2} ass. ${eventSlave.slaveName} blushes furiously but plunges on,`);
		t.push(Spoken(eventSlave, `"I'm s-sorry, ${master}, but I still don't understand. I thought sex happened in a v-vagina. I d-didn't think b-butts were — were for, you know, that."`));
		seX(subSlave, "anal", V.PC, "penetrative");
		if (canImpreg(subSlave, V.PC)) {
			knockMeUp(subSlave, 5, 1, -1);
		}

		App.Events.addResponses(node, [
			new App.Events.Result(`${Girl}s' butts are for loving`, loving, "This option will take anal virginity"),
			new App.Events.Result(`${Girl}s' butts are for pounding`, pounding, "This option will take anal virginity"),
			new App.Events.Result(`${His} butt is being saved for later`, later),
			new App.Events.Result(`${His} butt is being sold today`, sold, "This option will take anal virginity"),
		]);


		function loving() {
			const frag = document.createDocumentFragment();
			t = [];

			t.push(`You tell ${him} that ${his} butt is for lovemaking, just like ${subSlave.slaveName}'s. ${He} looks horrified. You clear ${his} schedule and sit ${him} down on the couch (${he} carefully avoids the spot where you and ${subSlave.slaveName} embraced) before continuing with your day. ${subSlave.slaveName} was your first inspection of the day, so ${eventSlave.slaveName} has nothing to do for hours and hours other than sit there and`);
			if (canSee(eventSlave)) {
				t.push(`watch you.`);
			} else {
				t.push(`listen to your actions.`);
			}
			t.push(`${He}'s a healthy ${girl}, ${(eventSlave.preg > eventSlave.pregData.normalBirth / 2) ? `ripe with pregnancy,` : ""} and ${his} food is laced with mild aphrodisiacs. The boredom and ${his} building arousal begin to torture ${him}, until finally ${he} grinds out a hesitant`);
			t.push(Spoken(eventSlave, `"P-please fuck me, ${master}."`));
			t.push(`You glance at ${him} and ${he} quickly looks down, blushing. You go back to your work, and an hour later ${he} manages a more confident`);
			t.push(Spoken(eventSlave, `"Please fuck me, ${master}."`));
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`Judging ${him} ready, you tell ${him} to ${hasAnyLegs(eventSlave) ? "kneel" : "get"} on the couch. ${He} does, trembling with fear and arousal;`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`${his} caged cock does not show it, but ${he}'s flushed and willing.`);
			} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				t.push(`as ${he}`);
				if (eventSlave.belly >= 100000) {
					t.push(`struggles to pull ${his} gravid body`);
				} else if (eventSlave.belly >= 10000) {
					t.push(`hefts ${his} gravid body`);
				} else if (eventSlave.belly >= 5000) {
					t.push(`cradles ${his} belly and carefully climbs`);
				} else {
					t.push(`clambers`);
				}
				t.push(`up onto the couch, ${he} dribbles precum across the leather.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${he} has a painful hard-on.`);
			} else if (eventSlave.clit > 0) {
				t.push(`${his} big clit is visibly erect.`);
			} else if (eventSlave.chastityVagina === 1) {
				t.push(`${his} pussy may be locked in chastity, but it doesn't hide the moisture forming under it.`);
			} else if (eventSlave.vagina === -1) {
				t.push(`and is unconsciously presenting ${his} ass.`);
			} else {
				t.push(`${his} pussylips are flushed and moist.`);
			}
			t.push(`You tell ${him} to relax, and push a single lubed finger into ${his} anus. ${He} gasps, but does not resist, burrowing ${his} face down into the couch and doing ${his} best to calm ${himself}. After a few minutes, you withdraw your finger and press the slick tip of your ${pDick ? "cock" : "strap-on"}`);
			t.push(`against ${his} virgin rosebud. ${He} starts in spite of ${himself}, but breathes out obediently, relaxing ${his} butthole enough to let you in. ${He} squeals at the sudden invasion, but you hold ${him} and let ${him} get used to you gradually. After a few minutes you encourage ${him} to`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`stimulate ${his} own nipples,`);
			} else if ((eventSlave.dick > 0) && !canAchieveErection(eventSlave)) {
				t.push(`play with ${his} soft cock,`);
			} else if (eventSlave.dick > 0) {
				t.push(`jack off,`);
			} else if (eventSlave.clit > 0) {
				t.push(`rub ${his} clit,`);
			} else if (eventSlave.vagina === -1) {
				t.push(`frantically rub ${his} perineum,`);
			} else if (eventSlave.chastityVagina === 1) {
				t.push(`play with ${his} ${eventSlave.boobs > 300 ? "boobs" : "nipples"},`);
			} else {
				t.push(`play with ${his} pussy,`);
			}
			t.push(`and ${he} almost sobs with relief. After ${he}'s almost forgotten the phallus in ${his} ass, you begin to fuck ${him} gradually. ${He} climaxes before too long, ${his} tight sphincter`);
			if (pDick) {
				t.push(`hugging your shaft wonderfully. `);
			} else {
				t.push(`visibly compressing the strap-on. `);
			}
			t.push(`Confused, ${he} mumbles into the couch,`);
			t.push(Spoken(eventSlave, `"${capFirstChar(master)}, I c-came. I came to your thing in my butt. A-am I — does that make me a slut?"`));
			t.push(`You assure ${him} that it does. Surprisingly, ${he} does not break down, but exhales slowly and squares ${his} shoulders, visibly resolving to <span class="devotion inc">be a slut</span> if ${he} has to. ${He} even takes a bit longer than strictly necessary giving ${himself} ${his} <span class="virginity loss">first</span> post-sex enema.`);
			eventSlave.devotion += 5;
			eventSlave.anus += 1;
			seX(eventSlave, "anal", V.PC, "penetrative");
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 5, 1, -1);
			}
			App.Events.addParagraph(frag, t);
			return frag;
		}

		function pounding() {
			t = [];
			t.push(`You tell ${him} that ${his} butt is your property, just like ${subSlave.slaveName}'s. ${He} looks <span class="trust dec">terrified.</span> You continue, telling ${him} to bring your property over to you. ${He} stumbles over, begging,`);
			t.push(Spoken(eventSlave, `"P-please, fuck me ${master}, please don't do stuff to my butt. It's going t-to h-hurt.`));
			if (eventSlave.preg > eventSlave.pregData.normalBirth / 2) {
				t.push(`And I-I'm r-really pregnant.`);
			} else if (eventSlave.pregKnown === 1) {
				t.push(`And I-I'm p-pregnant.`);
			}
			t.push(t.pop() + `"`);
			t.push(`You push ${him} down across your desk, giving ${him} a swat across the rump to warn ${him} to shut up. ${He} does, though ${he} makes a little squealing noise when you begin to grope ${his} ass, working your way in towards ${his} virgin backdoor. When ${he} feels`);
			if (pDick) {
				t.push(`your lubed cockhead`);
			} else {
				t.push(`a lubed strap-on`);
			}
			t.push(`sliding between ${his} buttocks and then pressing against ${his} anus, ${he} bursts out,`);
			t.push(Spoken(eventSlave, `"Please no, ${master}! Please not my — AAAH! OW!"`));
			t.push(`and bursts into tears. You give ${him} a few seconds to get used to your girth and then begin to fuck ${his} delicious little virgin behind. Despite the pain, the`);
			if (eventSlave.vagina !== -1) {
				t.push(`stimulation gets ${him} wet,`);
			} else if (eventSlave.prostate !== 0) {
				t.push(`prostate stimulation gets ${him} hard,`);
			} else {
				t.push(`stimulation brings a little fluid out of ${him},`);
			}
			t.push(`and you tell ${him} that ${he} clearly wants it. ${He} doesn't know what to say in response, so ${he} just cries harder as`);
			if (canDoVaginal(eventSlave)) {
				t.push(`you reach around to cup ${his} soaking cunt possessively.`);
			} else if (eventSlave.prostate === 0 && eventSlave.vagina === -1 && eventSlave.dick === 0) {
				t.push(`${he} starts to quiver despite ${his} displeasure.`);
			} else {
				t.push(`${he} starts to leak despite ${his} displeasure.`);
			}
			t.push(`${His} butthole is so wonderfully tight that you orgasm quickly, throwing ${his} unresisting butt over onto the couch for another round. ${He}'s <span class="flaw break">no longer repressed,</span> but ${he} now <span class="flaw gain">hates</span> having ${his} <span class="virginity loss">newly loosened butt</span> fucked.`);
			eventSlave.behavioralFlaw = "none";
			eventSlave.sexualFlaw = "hates anal";
			eventSlave.trust -= 5;
			eventSlave.anus += 1;
			seX(eventSlave, "anal", V.PC, "penetrative");
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 5, 1, -1);
			}
			return t;
		}

		function later() {
			t = [];

			t.push(`You tell ${him} to sit down on the couch and listen. ${He} obeys, carefully avoiding the spot where you and ${subSlave.slaveName} embraced. You explain that ${subSlave.slaveName} is an experienced anal slave, and that you enjoy having sex with ${him2} there. You point out how much ${subSlave.slaveName} enjoyed ${himself2} (${eventSlave.slaveName} studiously avoids`);
			if (canSee(eventSlave)) {
				t.push(`looking at`);
			} else {
				t.push(`facing`);
			}
			t.push(`the moist spot on the couch that evidences this), and tell ${him} that anal sex can be very enjoyable. ${He}`);
			if (canSee(eventSlave)) {
				t.push(`looks at`);
			} else {
				t.push(`listens to`);
			}
			t.push(`you uncomprehendingly,`);
			if (eventSlave.belly >= 5000) {
				t.push(`${his} hand resting on ${his} rounded middle,`);
			}
			t.push(`so you try a different tack. You tell ${him} that ${his} anal virginity has a price: it makes ${him} a more valuable slave. ${He}'ll probably be fucked back there someday soon, but it's not something you plan to do lightly. And in any case, ${he}'ll be trained to enjoy the experience when it happens. Hesitantly, ${he} ${say}s`);
			t.push(Spoken(eventSlave, `"I understand, ${master}. <span class="trust inc">I trust you.</span>"`));
			t.push(`${He} seems more confident for the rest of the inspection, and when it's done, ${he} leaves with less worry on ${his} face.`);
			eventSlave.trust += 5;
			return t;
		}

		function sold() {
			t = [];
			t.push(`You tell ${him} that ${his} butt is your property, just like ${subSlave.slaveName}'s. ${He} looks <span class="trust dec">terrified,</span> but this is nothing to ${his} reaction when another slave arrives to bring ${him} out for an auction of ${his} virgin anus. ${He}'s dragged out, whining,`);
			t.push(Spoken(eventSlave, `"P-please, ${master}, please don't sell my butthole! I'll do anything! Please!"`));
			t.push(`${His} pleas are unavailing.`);
			t.push(`${V.assistant.name} conducts a brisk streetside auction of the weeping slave${girl}, using compliance systems to force ${him} to spread ${his} quivering buttocks for the crowd. The <span class="cash inc">winning bidder</span> uses a public stall to do the deed; its thin walls are nowhere near enough to disguise ${his} whining and sobbing as he <span class="virginity loss">takes ${his} anal virginity.</span> ${He} now <span class="flaw gain">hates anal.</span>`);
			cashX(500, "event", eventSlave);
			eventSlave.sexualFlaw = "hates anal";
			eventSlave.trust -= 5;
			eventSlave.anus += 1;
			seX(eventSlave, "anal", "public", "penetrative");
			if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
				knockMeUp(eventSlave, 5, 1, -2);
			}
			return t;
		}
	}
};
