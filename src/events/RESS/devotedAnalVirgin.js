App.Events.RESSDevotedAnalVirgin = class RESSDevotedAnalVirgin extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canWalk,
				s => s.anus === 0,
				s => s.trust > 20,
				s => s.devotion > 50,
				s => s.rules.speech !== "restrictive"
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, His, he, his, him, himself
		} = getPronouns(eventSlave);
		const {say, title: Master} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let t = [];


		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`comes into your office and politely waits until you indicate ${he} can have your attention.`);
		if (canTalk(eventSlave)) {
			t.push(`${He} ${say}s, "${capFirstChar(Master)}, I`);
			if (canSee(eventSlave)) {
				t.push(Spoken(eventSlave, "see so many of the other slaves getting buttfucked. I think it's hot seeing"));
			} else if (canHear(eventSlave)) {
				t.push(Spoken(eventSlave, "hear so many of the other slaves getting buttfucked. I think it's hot hearing"));
			} else {
				t.push(Spoken(eventSlave, "am surrounded by so many of the other slaves getting buttfucked. I think it's hot that you have"));
			}
			t.push(Spoken(eventSlave, `them take it up the ass, and I feel almost incomplete since I don't take cock in every hole. Please take my butt virginity, ${Master}."`));
		} else {
			t.push(`${He} points to ${his} butt and comically pantomimes having anal sex, and then uses gestures to ask if ${he} can serve you anally.`);
		}
		if (eventSlave.belly >= 10000) {
			t.push(`${He} carefully turns and spreads ${his} legs, allowing ${his} ${belly} ${eventSlave.bellyPreg >= 3000 ? "pregnant" : ""} belly space as ${he} bends over, to wiggle ${his} posterior indicatively.`);
		} else {
			t.push(`${He} turns around and wiggles ${his} posterior indicatively.`);
		}
		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`No, reassure ${him} that ${he} doesn't need to be an anal slut`, reassure),
			new App.Events.Result(`Make sure ${his} first anal sex is enjoyable`, enjoy),
			new App.Events.Result(`Make sure ${his} first buttfuck puts ${him} in ${his} place`, rape)
		]);

		function reassure() {
			t = [];

			t.push(`You kindly explain that you've decided to save ${his} ass — for now. ${He} starts to express understanding and apologize for bothering you, but finds ${himself} swept off ${his}`);
			if (!hasAnyLegs(eventSlave)) {
				t.push("stumps");
			} else if (!hasBothLegs(eventSlave)) {
				t.push("foot");
			} else {
				t.push("feet");
			}
			t.push(`and ${eventSlave.bellyPreg >= 5000 ? "gently" : ""} deposited on the couch. ${He} gasps with surprise when ${he} finds ${himself} being teased, fondled, and massaged rather than outright used. In no time at all ${he}'s pressing ${his} whole`);
			if (eventSlave.belly >= 5000) {
				t.push(`${eventSlave.bellyPreg >= 3000 ? "gravid" : "rounded"}`);
			}
			t.push(`body against you and shivering with delight.`);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				t.push(`${His} shivers reach a crescendo when you ${PC.dick === 0 ? "scissor yourself against" : "enter"} ${his} warm, wet pussy, which convulsively flexes against your ${PC.dick === 0 ? "clit" : "rock hard dick"}.`);
			} else {
				if (PC.dick === 0) {
					t.push(`You ride ${his} face,`);
				} else {
					t.push(`You push your dick ${PC.vagina !== -1 ? "and as much of the upper part of your pussy as you can manage" : ""} between ${his} thighs for some frottage,`);
				}
				t.push(`lavishing attention on ${his} nipples to ensure that ${he} has fun, too.`);
			}
			t.push(`${He} leaves your office feeling <span class="hotpink">very close to ${his} ${getWrittenTitle(eventSlave)} indeed,</span> and seems to have forgotten ${his} unfucked butthole, for now.`);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				t.push(VCheck.Vaginal(eventSlave, 1));
			}

			eventSlave.devotion += 4;
			return t;
		}


		function enjoy() {
			t = [];

			t.push(`You bring ${him} over to the couch, ${!canDoAnal(eventSlave) ? `unfasten ${his} chastity,` : ""} set ${him} on your lap, and teasingly play with ${his}`);
			if (eventSlave.belly >= 5000) {
				t.push(`${eventSlave.bellyPreg >= 3000 ? "gravid" : "rounded"}`);
			}
			t.push(`body for a long time. Every so often you move your hands over ${his} unfucked butthole, making ${him} shiver and press ${himself} against you, but you only make it the center of attention once the poor over-aroused slave`);
			if (canTalk(eventSlave)) {
				t.push(`begs,`);
				t.push(Spoken(eventSlave, `"I can't take it any more, ${Master}! Please fuck my ass!"`));
			} else {
				t.push("begins to use piteous gestures to beg you abjectly for anal.");
			}

			t.push(`In reward, you sink a lightly lubricated finger up to the first knuckle in ${his} delightfully tight asshole. ${He}'s already on the edge of orgasm, and it takes a long, long time for you to work first a finger, then two, and then your ${PC.dick === 0 ? "strap-on" : "cock"} up ${his} ass without sending ${him} over. When you finally let ${him} orgasm, ${PC.dick === 0 ? `${his} unabashed enjoyment` : `the strength of ${his} spasming sphincter`} sends you over as well. ${He}'s left in a haze of <span class="hotpink">sexual satisfaction</span> that radiates outward from ${his} <span class="lime">newly stretched asshole,</span> and ${he} <span class="mediumaquamarine">trusts you</span> a lot more, now.`);
			if ((eventSlave.fetishKnown !== 1 || eventSlave.fetish !== "buttslut") && fetishChangeChance(eventSlave) > jsRandom(1, 100)) {
				t.push(`Before the end of the week ${he}'s back, begging for <span class="lightcoral">another dick up the ass.</span>`);

				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "buttslut";
			}

			eventSlave.devotion += 3;
			eventSlave.trust += 3;
			eventSlave.anus = 1;
			seX(eventSlave, "anal", PC, "penetrative");
			if (canImpreg(eventSlave, PC)) {
				knockMeUp(eventSlave, 15, 1, -1);
			}
			return t;
		}

		function rape() {
			t = [];

			t.push(`You throw ${him} onto the couch face-down, ${eventSlave.belly >= 5000 ? `${his} rear pushed into the air by ${his} rounded belly` : ""} catching a glimpse of ${his} doubtful face as ${he} goes; ${he}'s already started to wonder whether this was a mistake. In a few moments ${he} knows it for sure as ${he} feels ${!canDoAnal(eventSlave) ? `${his} anal chastity ripped off and` : ""} the burning sensation of a lubricated ${PC.dick === 0 ? "strap-on" : "dickhead"} forcing ${his} virgin sphincter wide. Whatever noises ${he} might be making are pretty inaudible, since you have ${his} sobbing face shoved deep between the leather cushions. ${He} tries not to struggle and relax for ${his} beloved master, but ${his} body rebels against the pain and ${he} starts to wriggle spastically, trying to burrow into the couch to get away from the pounding. When you finish, the poor slave is left lying on the couch with a ${PC.dick !== 0 ? `thin dribble of ejaculate escaping from ${his}` : ""} <span class="lime">newly fucked butthole,</span> a stream of drying tears running down each side of ${his} face, ${eventSlave.dick > 0 ? `a single drop of precum at the tip of ${his} totally flaccid dick,` : ""} and a new understanding of <span class="gold">${his} place in life.</span>`);
			if ((eventSlave.fetishKnown !== 1 || eventSlave.fetish !== "submissive") && fetishChangeChance(eventSlave) > jsRandom(1, 100)) {
				t.push(`Before the end of the week it's clear that ${he}'s taken the anal rape to heart, and now sees ${his} body as something <span class="lightcoral">for others to use and abuse.</span>`);

				eventSlave.fetishKnown = 1;
				eventSlave.fetishStrength = 65;
				eventSlave.fetish = "submissive";
			}

			eventSlave.trust -= 5;
			eventSlave.anus = 1;
			seX(eventSlave, "anal", PC, "penetrative");
			if (canImpreg(eventSlave, PC)) {
				knockMeUp(eventSlave, 15, 1, -1);
			}
			return t;
		}
	}
};
