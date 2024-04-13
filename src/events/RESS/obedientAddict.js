// cSpell:ignore splurts

App.Events.RESSObedientAddict = class RESSObedientAddict extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.suppository === 0
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.aphrodisiacs > 0 || s.inflationType === "aphrodisiac",
				s => s.addict > 20,
				s => s.devotion > 20 || s.trust < -20
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, girl
		} = getPronouns(eventSlave);
		const {title: Master} = getEnunciation(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];

		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`takes ${his} aphrodisiacs in pill form, with ${his} food. They're dispensed alongside ${his} nutrition in the kitchen. You happen to be passing by when ${he}'s being issued ${his} drugs, and you see ${him} ${canSee(eventSlave) ? "staring" : "gazing"} thoughtfully at the insignificant-looking little pill, just holding it in ${his} hand and considering it for a long time. When ${he} realizes you're watching, ${he} turns to you and you realize ${his} eyes are moist.`);
		if (canTalk(eventSlave)) {
			t.push(`${He} ${SlaveStatsChecker.checkForLisp(eventSlave) ? "lisps through huge, quivering lips" : "mutters"}, "${Master}, ${Spoken(eventSlave, "I hate this shit. I come and come and come but it's just physical. I haven't felt close to anyone ever since I've been on these fucking aphrodisiacs.")}" ${He} shrugs bitterly. ${Spoken(eventSlave, `"Still crave them though."`)}`);
		} else {
			t.push(`${He} uses trembling gestures to pour out dissatisfaction with life as an aphrodisiac addict. ${He} is emotionally unsatisfied with the mechanical orgasms ${he} gets on the drugs, but craves them intensely.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Make an example by forcing ${him} to take a massive dose`, forceful),
			canDoVaginal(eventSlave) || canDoAnal(eventSlave)
				? new App.Events.Result(`Have caring sex with ${him} before ${he} takes the aphrodisiacs`, caring, virginityCheck())
				: new App.Events.Result()
		]);

		function forceful() {
			t = [];

			if (hasAnyEyes(eventSlave)) {
				t.push(`You take ${him} by the shoulders, look into ${his} ${hasBothEyes(eventSlave) ? "eyes" : "eye"},`);
			} else {
				t.push(`You take ${him} by the shoulders`);
			}
			t.push(`and tell ${him} you'll fix things so ${he} doesn't mind so much. ${He} looks hopeful, even when you tell ${him} to take ${his} pill. ${He} does, and you hand ${him} another. And another. ${He}'s crying with dread by the fourth pill, knowing that this is ${his} punishment for complaining. ${His} pupils dilate, ${he} begins to breathe hard, and ${his} ${eventSlave.skin} skin flushes badly. ${He} tries to beg you to fuck ${him} but can't seem to find the words. ${He} begins to masturbate compulsively, so hard that ${he} collapses to the kitchen floor with ${his} first spastic orgasm.`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`${His} cock is painfully compressed by ${his} chastity cage, but it does nothing to stop ${his} frantic efforts to come.`);
			} else if (canAchieveErection(eventSlave)) {
				if (eventSlave.dick > 9) {
					t.push(`${His} inhuman cock is as engorged as physically possible given its size, threatens to knock ${him} unconscious from the sheer amount of blood diverted into it, and doesn't shrink at all when cum weakly splurts from its tip.`);
				} else if (eventSlave.dick > maxErectionSize(eventSlave)) {
					t.push(`${His} monstrous cock is agonizingly erect, threatens to knock ${him} unconscious from the sheer amount of blood is takes ${him} to get hard, and doesn't soften at all when ${he} spatters ${his} own chest with cum.`);
				} else if (eventSlave.dick > 4) {
					t.push(`${His} huge cock is agonizingly erect and doesn't soften at all when ${he} spatters ${his} own chest with cum.`);
				} else if (eventSlave.dick > 3) {
					t.push(`${His} big cock is agonizingly erect and doesn't soften at all when ${he} spatters ${his} own chest with cum.`);
				} else if (eventSlave.dick > 1) {
					t.push(`${His} cock is agonizingly erect and doesn't soften at all when ${he} spatters ${his} own chest with cum.`);
				} else if (eventSlave.dick > 0) {
					t.push(`${His} pathetic dick is agonizingly erect and doesn't soften at all when ${he} weakly dribbles cum.`);
				}
			} else if (canDoVaginal(eventSlave)) {
				t.push(`${His} pussy is dripping with moisture and ${his} ragingly stiff clit doesn't soften at all when ${he} comes.`);
			} else if (canDoAnal(eventSlave)) {
				t.push(`${His} hungry asshole spasms with orgasm, but ${he} doesn't even pause ${his} anal masturbation.`);
			} else {
				t.push(`${His} whole body spasms with orgasm, but ${he} doesn't even pause ${his} efforts to draw out an orgasm by any means possible.`);
			}
			t.push(`For the hour or so it takes ${him} to pass out, slaves using the kitchen have to step over ${his} prostrate, orgasming body, lying in a pool of ${his} own drool, tears, sweat, and fluids. The next time you see ${him} in the kitchen, ${he} takes ${his} medicine like a <span class="gold">good ${girl}.</span> All your aphrodisiac addicts recognize the symptoms and the punishment, and <span class="gold">avoid even thinking</span> about resisting the system.`);

			V.slaves.forEach(function(s) { if (s.aphrodisiacs > 0 || s.inflationType === "aphrodisiac") { s.trust -= 5; } });
			return t;
		}

		function caring() {
			t = [];

			t.push(`You back ${him} up against the wall of the kitchen, kissing ${him}, touching ${his} body with care, and quietly shushing ${his} attempts to ask questions. You deftly extract the pill form ${his} hand and put it on the counter for later. With time and skill you bring ${him} to a fine state of arousal, not to mention <span class="hotpink">emotional need;</span> ${he} begins to kiss you back with almost frantic enthusiasm. When ${he}'s clearly ready, you lay ${him} across the kitchen table and ${PC.dick === 0 ? `work your groin up between ${his} legs` : `enter ${him}`}, drawing out a lusty moan. As the sex continues, however, ${he} begins to look doubtful, then distracted, and then to twitch occasionally. Finally ${he} bursts into tears.`);
			if (canTalk(eventSlave)) {
				t.push(`"I — I — fucking need my fix to come, ${Master}," ${he} sobs.`);
			} else {
				t.push(`${He} indicates through ${his} weeping that ${he} can't climax without the drugs.`);
			}
			t.push(`You pass ${him} the pill, and ${he} continues to weep inconsolably, apologizing all the while, until the drug takes away ${his} ability to care about anything but getting fucked. When you finish and extract ${PC.dick === 0 ? `yourself from between ${his} legs` : `your cock from ${his} well-used hole`}, though, you think you can detect a deep sadness in ${his} eyes that it cannot reach.`);
			if (canDoVaginal(eventSlave)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				t.push(VCheck.Anal(eventSlave, 1));
			}

			eventSlave.devotion += 4;
			return t;
		}

		function virginityCheck() {
			if (canDoVaginal(eventSlave) && eventSlave.vagina === 0) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			}
		}
	}
};
