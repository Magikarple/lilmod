App.Events.REDevotedTwins = class REDevotedTwins extends App.Events.BaseEvent {
	eventPrerequisites() {
		// Conditional example
		return [
			() => V.seeIncest === 1
		];
	}

	actorPrerequisites() {
		return [
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.sisters > 0,
				s => s.devotion > 50,
				canWalk,
				hasAnyArms
			],
			[
				s => s.fetish !== Fetish.MINDBROKEN,
				s => areSisters(s, getSlave(this.actors[0])) === 1,
				s => s.rivalTarget !== this.actors[0],
				s => s.devotion > 50,
				canWalk,
				hasAnyArms,
				isSlaveAvailable
			]
		];
	}

	execute(node) {
		const [alphaTwin, betaTwin] = this.actors.map(a => getSlave(a));

		App.Events.drawEventArt(node, [alphaTwin, betaTwin]);

		let t = [];

		t.push(
			App.UI.DOM.slaveDescriptionDialog(alphaTwin),
			`and`,
			App.UI.DOM.slaveDescriptionDialog(betaTwin),
			`are such good and devoted slaves that they happily do everything together. They sleep ${hasBothArms(alphaTwin) && hasBothArms(betaTwin) ? "in each other's arms" : 'together'}, bathe together, work together whenever they can, and fuck together. For a while they masturbated together until they became so habituated to sexual slavery that they stopped seeing much distinction between masturbation and sex with one another. At the moment, they're getting ready for their day, chatting quietly and helping each other.`,
		);

		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Take them out for the morning`, morningWalk),
			new App.Events.Result(`Use them side by side`, threesome)
		]);

		function morningWalk() {
			t = [];
			t.push(`You head out of your penthouse with a pretty sex slave under each arm. They're attentive companions, doing everything they can to mirror each other as they show off their bodies to onlookers.`);
			if (V.weatherToday.severity <= 2) {
				t.push(`It's a bright, sunny day, so you walk them up and down a busy glassed-in galleria.`);
			} else {
				t.push(`It's a particularly nasty day, so you stick to walking them up and down the crowded interior malls.`);
			}
			t.push(`They clearly expect you to fuck them in public, but for once you just enjoy a couple of hours with them. They start disappointed that you aren't going to use them, but they quickly get over it and enjoy preening under your arms. <span class="trust inc">They have both become more trusting of you,</span> and <span class="reputation inc">your reputation has increased considerably.</span>`);

			for (const slave of [alphaTwin, betaTwin]) {
				slave.trust += 4;
				repX(2500, "event", slave);
			}
			return t;
		}

		function threesome() {
			const alphaVaginal = canDoVaginal(alphaTwin) && alphaTwin.vagina > 0;
			const alphaAnal = canDoAnal(alphaTwin) && alphaTwin.anus > 0;
			const betaVaginal = canDoVaginal(betaTwin) && betaTwin.vagina > 0;
			const betaAnal = canDoAnal(betaTwin) && betaTwin.anus > 0;
			t = [];
			t.push(`Slave twins inevitably get used to threesomes with their sibling, and ${alphaTwin.slaveName} and ${betaTwin.slaveName} are no exception. They greet you with every appearance of arousal and begin a carefully balanced routine — foreplay with you, of course, but whatever parts of them aren't working on you work on the other slave. They stroke you while making out, stroke each other while`);
			if (V.PC.dick > 0) {
				t.push(`sucking you to rock hardness,`);
			} else {
				t.push(`building your arousal,`);
			}
			if (canDoVaginal(alphaTwin) && canDoVaginal(betaTwin)) {
				t.push(`and finger each other's holes`);
			} else if (alphaTwin.dick > 0 && alphaTwin.chastityPenis === 0 && betaTwin.dick > 0 && betaTwin.chastityPenis === 0) {
				t.push(`and fondle each other's dicks`);
			} else {
				t.push(`and fondle each other`);
			}
			t.push(`while`);
			if (V.PC.dick > 0) {
				if (alphaTwin.boobs > 300 && betaTwin.boobs > 300 && (alphaTwin.boobs <= betaTwin.boobs + 800 && alphaTwin.boobs >= betaTwin.boobs - 800) || (alphaTwin.boobs > 10000 && betaTwin.boobs > 10000)) {
					t.push(`rubbing four breasts up and down your dick.`);
				} else if (alphaTwin.belly > 5000 && betaTwin.belly > 5000) {
					t.push(`rubbing two bulging bellies up and down your dick.`);
				} else if (alphaTwin.weight > 95 && betaTwin.weight > 95) {
					t.push(`rubbing your dick between two soft bellies.`);
				} else {
					t.push(`running two tongues up and down your dick.`);
				}
				t.push(`Since you only have one cock, the symmetry ends when you start fucking them.`);
				if ((alphaVaginal || alphaAnal) && (betaVaginal || betaAnal)) {
					t.push(`As you switch from hole to hole, whichever twin isn't getting fucked at the moment uses their mouth and hands to stimulate your balls and their twin's fuckhole as you pound it. When you finally cum in ${betaTwin.slaveName}, ${alphaTwin.slaveName} sucks it out and they kiss deeply to share your ejaculate.`);
					if (alphaVaginal) {
						actX(alphaTwin, "vaginal");
					}
					if (alphaAnal) {
						actX(alphaTwin, "anal");
					}
					if (betaVaginal) {
						actX(betaTwin, "vaginal");
					}
					if (betaAnal) {
						actX(betaTwin, "anal");
					}
					actX(V.PC, "penetrative");
				} else {
					t.push(`As you switch from throat to throat, whichever twin isn't getting facefucked at the moment uses their hands to stimulate your balls and their twin's body. When you finally cum in ${betaTwin.slaveName}'s mouth, they turn and deeply kiss to share your ejaculate.`);
					actX(alphaTwin, "oral");
					actX(betaTwin, "oral");
					actX(V.PC, "penetrative");
				}
			} else {
				t.push(`crowding their faces against your pussy. You reach down and seize a nipple in each hand, pulling them upward so they can suck your nipples instead; they use manual stimulation to keep you going while they do. With one straddling each of your thighs, grinding shamelessly, you can reach around and molest their butts with your own hands.`);
				seX(alphaTwin, "oral", V.PC, "vaginal");
				seX(betaTwin, "oral", V.PC, "vaginal");
			}
			t.push(`<span class="devotion inc">They have both become more devoted to you.</span>`);

			alphaTwin.devotion += 4;
			betaTwin.devotion += 4;

			return t;
		}
	}
};
