App.Events.RESSNewlyDevotedSunrise = class RESSNewlyDevotedSunrise extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.devotion.isBetween(50, 75),
				s => s.rules.living === "luxurious",
			]
		];
	}

	execute(node) {
		const [slave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(slave);
		const {title: Master, say} = getEnunciation(slave);
		const belly = bellyAdjective(slave);

		App.Events.drawEventArt(node, slave);

		let r = [];
		r.push(`Early to bed and early to rise makes an arcology owner healthy, wealthy, and wise. It also allows you to enjoy the beautiful sunrises. The degradation of the planet does have its advantages: all the rubbish in the air often paints the morning light a striking color, and this is one such morning. Taken with the grandeur, you step out onto a balcony to take it in, only to find`);
		r.push(contextualIntro(V.PC, slave, true));
		r.push(`out there already, doing just the same thing. The luxurious rules ${he} enjoys offer ${him} small breaks here and there, and ${he}'s obviously come out to enjoy`);
		if (canSee(slave)) {
			r.push(`the sight`);
		} else {
			r.push(`the morning breeze and the warmth of the rising sun on ${his} face`);
		}
		r.push(`before starting ${his} day's work.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`${He} notices your approach with a start and`);
		if (!canTalk(slave)) {
			r.push(`asks with a gesture that carries just the right mixture of submission and respect if ${he} can serve you in any way.`);
		} else {
			r.push(
				`asks respectfully,`,
				Spoken(slave, `"May I serve you in any way, ${Master}?"`)
			);
		}
		r.push(`You shake your head no, for the moment, and just enjoy the view. After a few minutes of silent mutual enjoyment of the pretty sunrise, ${he} steals a sidelong glance at you, a hesitant, questioning look on ${his} face. You tell ${him} to ask ${his} question, whatever it is, and ${he}`);
		if (!canTalk(slave)) {
			r.push(`carefully uses ${his}`);
			if (hasBothArms(slave)) {
				r.push(`hands`);
			} else {
				r.push(`hand`);
			}
			r.push(`to ask if ${he} can hold your hand.`); // ???
		} else {
			r.push(
				`${say}s,`,
				Spoken(slave, `"${Master}, may I please hold your hand?"`)
			);
		}


		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Slaveowners do not hold their slaves' hands`, no),
			new App.Events.Result(`Hold ${his} hand`, hold),
			(canDoAnal(slave))
				? 	new App.Events.Result(`Buttfuck ${him} against the railing`, buttfuck, (slave.anus === 0) ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
			(canDoVaginal(slave))
				? 	new App.Events.Result(`Fuck ${him} against the railing`, fuck, (slave.vagina === 0) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
		]);


		function no() {
			r = [];
			if (canSee(slave)) {
				r.push(`You shake your head sternly.`);
			} else {
				r.push(`You say nothing but don't take ${his} hand.`);
			}
			r.push(`${He} looks neither afraid nor crushed, but simply gazes properly at you, clearly waiting for punishment. When none comes, ${he} accepts that it was not culpably wrong of ${him} to ask, but that the answer is no. ${He} leaves the balcony feeling reassured about ${his} place in ${V.arcologies[0].name} — a little more independent of ${his} ${getWrittenTitle(slave)} and yet a little more inured to the reality of his control. ${He} is a proper devoted slave and will remain so.`);
			return r;
		}

		function hold() {
			r = [];
			if (canSee(slave)) {
				r.push(`You nod without taking your eyes off the blazing horizon.`);
			} else {
				r.push(`You take ${his} hand without taking your eyes off the blazing horizon.`);
			}
			r.push(`${His}`);
			if (slave.height >= 185) {
				r.push(`hand is almost as large as yours,`);
			} else if (slave.height >= 170) {
				r.push(`hand fits into yours,`);
			} else if (slave.height >= 160) {
				r.push(`small hand fits comfortably into yours,`);
			} else if (slave.height >= 150) {
				r.push(`petite hand slides into yours,`);
			} else {
				r.push(`tiny hand nestles into yours,`);
			}
			r.push(`and`);
			if (slave.muscles > 30) {
				r.push(`${his} grip is extremely powerful.`);
			} else if (slave.muscles > 5) {
				r.push(`${his} grip surprisingly strong.`);
			} else {
				r.push(`${his} grip is soft and feminine.`);
			}
			r.push(`Through ${his} hand you feel ${him} give a little shiver and relax. It's not difficult to sense ${his} emotions as the two of you stand there gazing at the rising sun: ${he}'s reassessing who ${he} is in light of ${his} <span class="devotion inc">growing devotion</span> to you, drawing emotional strength from the strong grip that gently encircles ${his} hand.`);
			slave.devotion += 4;
			return r;
		}

		function fuckResponse() {
			r = [];
			r.push(`You move quietly over to ${him} and encircle ${him} with your arms, holding both ${his} hands over ${his} ${belly}`);
			if (slave.pregKnown === 1) {
				r.push(`pregnant`);
			}
			r.push(`belly with both of yours. ${He} relaxes into your`);
			if (V.PC.boobs >= 1400) {
				r.push(`enormous`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 1200) {
				r.push(`huge`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`fake`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 1000) {
				r.push(`big`);
				if (V.PC.boobsImplant !== 0) {
					r.push(`firm`);
				}
				r.push(`breasts`);
			} else if (V.PC.boobs >= 800) {
				r.push(`breasts`);
			} else if (V.PC.boobs >= 650) {
				r.push(`breasts`);
			} else if (V.PC.boobs >= 500) {
				r.push(`average breasts`);
			} else if (V.PC.boobs >= 300) {
				r.push(`small breasts`);
			} else if (V.PC.title === 0) {
				r.push(`flat chest`);
			} else {
				r.push(`chest`);
			}
			r.push(`for a few moments until ${he} feels your`);
			if (V.PC.dick === 0) {
				r.push(`building warmth`);
			} else {
				r.push(`hardening member`);
			}
			r.push(`against`);
			if (slave.height >= 160) {
				r.push(`${his} ass.`);
			} else {
				r.push(`${his} lower back.`);
			}
			r.push(`${He} automatically begins to rub ${himself} up and down to stimulate you; once ${he} feels you reach`);
			if (V.PC.dick === 0) {
				r.push(`full arousal`);
			} else {
				r.push(`rock hardness`);
				if (V.PC.vagina !== -1) {
					r.push(`and total wetness`);
				}
			}
			r.push(he);
			return r;
		}

		function buttfuck() {
			r = [...fuckResponse()];
			if (slave.height >= 170) {
				r.push(`leans into the rail, bending over it just slightly to offer ${his} asshole at just the right height.`);
			} else {
				r.push(`hikes ${himself} up on the rail, up on tiptoe, to bring ${his} asshole to the most comfortable height.`);
			}
			r.push(`${He} moans a little as you`);
			if (V.PC.dick === 0) {
				r.push(`pull on your trusty vibrating strap-on and`);
			}
			r.push(`enter ${his} butt, but ${he} keeps ${his} gaze on the fiery horizon. ${He} extricates ${his} hands from yours to stabilize ${himself} against the railing, leaving you free to gently massage ${his} breasts in time with your slow thrusts. ${He} does not climax, but after you do ${he} turns halfway within your arms and kisses you impulsively. ${He} leaves the balcony with a <span class="devotion inc">small smile</span> on ${his} face.`);
			r.push(VCheck.Anal(slave, 1));
			slave.devotion += 4;
			return r;
		}

		function fuck() {
			r = [...fuckResponse()];
			if (slave.height >= 170) {
				r.push(`leans into the rail, bending over it just slightly to offer ${his} pussy at just the right height`);
			} else {
				r.push(`hikes ${himself} up on the rail, up on tiptoe, to bring ${his} pussy to the most comfortable height.`);
			}
			r.push(`${He} moans a little as you`);
			if (V.PC.dick === 0) {
				r.push(`pull on your trusty vibrating strap-on and`);
			}
			r.push(`enter ${his} depths, but ${he} keeps ${his} gaze on the fiery horizon. ${He} extricates ${his} hands from yours to stabilize ${himself} against the railing, leaving you free to gently massage ${his} breasts in time with your slow thrusts. ${He} does not climax, but after you do ${he} turns halfway within your arms and kisses you impulsively. ${He} leaves the balcony with a <span class="devotion inc">small smile</span> on ${his} face.`);
			r.push(VCheck.Vaginal(slave, 1));
			slave.devotion += 4;
			return r;
		}
	}
};

