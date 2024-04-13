App.Events.REFullBed = class REFullBed extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => fuckSlavesLength() >= 2,
		];
	}

	actorPrerequisites() {
		const req = [
			s => s.devotion > 50,
			s => s.fuckdoll === 0,
			s => ["please you", "serve in the master suite", "be your Concubine"].includes(s.assignment),
			s => s.rules.release.master === 1,
			canMove,
		];

		return [
			req,
			req,
		];
	}

	execute(node) {
		let bedSlaves = this.actors.map(getSlave);

		const {
			He, he, his, him, girl
		} = getPronouns(bedSlaves[0]);

		const {
			He2, he2, his2, him2
		} = getPronouns(bedSlaves[1]).appendSuffix('2');

		let virgin0 = (bedSlaves[0].mpreg === 1 && bedSlaves[0].anus === 0) || (bedSlaves[0].mpreg === 0 && bedSlaves[0].vagina === 0);
		let virgin1 = (bedSlaves[1].mpreg === 1 && bedSlaves[1].anus === 0) || (bedSlaves[1].mpreg === 0 && bedSlaves[1].vagina === 0);

		App.Events.drawEventArt(node, bedSlaves.slice(0, 2), "no clothing");

		let t = [
			`You have the luxury of being attended to by a coterie of devoted sex slaves. Tonight, ${bedSlaves[0].slaveName} and ${contextualIntro(bedSlaves[0], bedSlaves[1])} are with you when it's time for bed, so they strip naked and climb under the sheets with you, one on either side. They snuggle in under both of your arms so that each can rest their head on your shoulder,`
		];
		if (hasAnyArms(bedSlaves[0]) && hasAnyArms(bedSlaves[1])) {
			if (V.PC.boobs > 1000) {
				t.push(`a hand under your breast,`);
			} else if (V.PC.boobs > 500) {
				t.push(`a hand beneath your breast,`);
			} else {
				t.push(`a hand on your chest,`);
			}
		}
		if (bedSlaves[1].boobs > 300 && bedSlaves[0].boobs > 300) {
			t.push(`their breasts against your flank,`);
		}
		if (bedSlaves[1].belly > 5000 && bedSlaves[0].belly > 5000) {
			t.push(`their swollen bellies against yours,`);
		} else if (bedSlaves[1].weight > 95 && bedSlaves[0].weight > 95) {
			t.push(`their soft bellies against yours,`);
		}
		t.push(`and the warmth between their legs against your hip.`);
		App.Events.addParagraph(node, t);

		t = [
			`Today was an unusually relaxing day, and you aren't particularly tired.`,
		];
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result("Take a slave in each hand", eachhand),
			(bedSlaves[0].bellyPreg >= 5000 && bedSlaves[1].bellyPreg >= 5000 && V.PC.dick !== 0) ? new App.Events.Result("Fondle their pregnancies", fondlePreg) : new App.Events.Result(),
			(canImpreg(bedSlaves[0], V.PC) && canImpreg(bedSlaves[1], V.PC)) ? new App.Events.Result("Tire yourself out with some babymaking", babymaking, fuckNote()) : new App.Events.Result(),
			new App.Events.Result("Pull up the sheets and wrestle", pullsheets),
		]);

		function eachhand() {
			const frag = document.createDocumentFragment();

			let t = [
				`With each of your arms around a slave, you begin to run your hands across their bodies. They snuggle closer to you, their nipples growing hard and their hips grinding against you. As your grasp runs lower and lower, cupping and massaging their buttocks, they begin to kiss the`
			];
			if (V.PC.boobs > 300) {
				t.push(`breasts`);
			} else {
				t.push(`chest`);
			}
			t.push(`against which their adoring faces are pressed, and reach down`);
			if (V.PC.dick !== 0 && V.PC.vagina !== -1) {
				t.push(`towards your cock and cunt.`);
			} else if (V.PC.vagina !== -1) {
				t.push(`to your pussy.`);
			} else if (V.PC.dick !== 0) {
				t.push(`for your member.`);
			} else if (V.PC.scrotum !== 0) {
				t.push(`for your balls.`);
			} else {
				t.push(`towards your smooth crotch.`);
			}
			t.push(`The more manually skilled begins to give you a gentle stroke, while the other softly massages your`);
			if (V.PC.scrotum > 0) {
				t.push(`testicles.`);
			} else {
				t.push(`mons.`);
			}
			if (canDoVaginal(bedSlaves[1]) && canDoVaginal(bedSlaves[0]) && ((bedSlaves[0].vagina > 0 && bedSlaves[1].vagina > 0) || (bedSlaves[0].clit > 0 && bedSlaves[1].clit > 0))) {
				if (bedSlaves[0].vagina > 0 && bedSlaves[1].vagina > 0) {
					t.push(`They stiffen in unison when you slip two fingers into each pussy, but immediately relax and begin to work you harder. They orgasm one after the other, their passages clenching against your intruding fingers, and then eagerly clean`);
				} else {
					t.push(`They stiffen in unison when you pinch each clit, but immediately relax and begin to work you harder. They orgasm one after the other from your manipulations, before eagerly cleaning`);
				}
				actX(bedSlaves[0], "vaginal");
				actX(bedSlaves[1], "vaginal");
			} else if (canDoAnal(bedSlaves[1]) && canDoAnal(bedSlaves[0])) {
				t.push(`They stiffen in unison when you hook two fingers up each asshole, but immediately relax and begin to work you harder. They orgasm one after the other, their butts clenching against your intruding fingers, and then eagerly clean`);
				actX(bedSlaves[0], "anal");
				actX(bedSlaves[1], "anal");
			} else if (bedSlaves[1].dick > 0 && bedSlaves[1].chastityPenis === 0 && bedSlaves[0].dick > 0 && bedSlaves[0].chastityPenis === 0) {
				t.push(`They stiffen in unison when you take hold of each prick, but immediately relax and begin to work you harder. They cum one after the other from your manipulations, before eagerly cleaning`);
				actX(bedSlaves[0], "penetrative");
				actX(bedSlaves[1], "penetrative");
			} else {
				t.push(`They stiffen as your hands get more adventurous, but immediately relax and begin to work you harder. They orgasm one after the other from your manipulations, before eagerly cleaning`);
				/** @type {FC.SlaveActs} */
				let hole;
				bedSlaves.forEach(s => {
					if (canDoVaginal(s)) {
						hole = "vaginal";
					} else if (canDoAnal(s)) {
						hole = "anal";
					} else if (s.dick > 0 && s.chastityPenis === 0) {
						hole = "penetrative";
					} else {
						hole = "mammary";
					}
					actX(s, hole);
				});
			}
			t.push(`you with their mouths when you climax yourself. They have become <span class="devotion inc">still more devoted to you.</span>`);
			bedSlaves[0].devotion += 4;
			bedSlaves[1].devotion += 4;
			App.Events.addParagraph(frag, t);

			return frag;
		}

		function fondlePreg() {
			const frag = document.createDocumentFragment();

			let t = [
				`With your arms each around a slave, you begin to run your hands across their bodies, focusing your attention on their full pregnancies. They snuggle closer to you, their nipples growing hard and their hips grinding against you. As they move, your rising cock catches between their gravid middles, giving you an idea. Shifting your arms under and around their backs, you pull them together over your erect member and begin using their taut stomachs to pleasure yourself. They quickly catch on and push closer to each other, trapping your dick between them. Once they begin rubbing, and you humping, the skin surrounding you is quickly coated in precum. They smile at you as they feel your penis tense, and with one final thrust you coat their bellies in a layer of cum. They love your discovery of a new way to enjoy their bodies and become <span class="devotion inc">even more devoted to you.</span>`
			];

			App.Events.addParagraph(frag, t);
			bedSlaves.forEach(s => (s.devotion += 5));

			return frag;
		}

		function babymaking() {
			const frag = document.createDocumentFragment();

			let t = [
				`Without warning, you roll on top of ${bedSlaves[0].slaveName} and slip your dick right into ${his}`,
			];
			if (bedSlaves[0].mpreg === 1) {
				t.push(`${bedSlaves[0].anus === 0 ? "virgin " : ""}anus.`);
			} else {
				t.push(`${bedSlaves[0].vagina === 0 ? "virgin " : ""}pussy.`);
			}
			t.push(`Once the surprise wears off and the pleasure sets in, ${he} wraps ${his}`);
			if (hasAnyArms(bedSlaves[0])) {
				t.push(`arm${hasBothArms(bedSlaves[0]) ? `s` : ""}`);
			} else {
				t.push(`leg${hasBothLegs(bedSlaves[0]) ? `s` : ""}`);
			}
			t.push(`around you and basks in your attention. Feeling left out, ${bedSlaves[1].slaveName} slides over to tease ${his2} bucking bedmate. Drawing close to the moaning ${girl},`);
			if (hasAnyArms(bedSlaves[1])) {
				t.push(`${he2} reaches for ${his} bouncing tits, only to cop a feel of your cock thrusting deep inside ${him}.`);
			} else {
				t.push(`${he2} pushes towards ${his} bouncing tits, only to feel your cock thrusting deep inside ${him}.`);
			}
			if (canSee(bedSlaves[1])) {
				t.push(`${He2} watches, eyes wide with lust,`);
			} else {
				t.push(`${He2} pauses, mouth agape with lust,`);
			}
			t.push(`as the bulge of your penis pistons beneath ${his} lower belly. You make sure to give ${him2} a show before you cum, thrusting as hard and deep as you can. ${He2} gasps at the`);
			if (canSee(bedSlaves[1])) {
				t.push(`sight`);
			} else {
				t.push(`sensation`);
			}
			if (hasAnyArms(bedSlaves[1])) {
				t.push(`and brings ${his2} hand`);
			} else {
				t.push(`and brings ${his2} cheek`);
			}
			t.push(`to the lump just in time to feel you ejaculate deep inside ${bedSlaves[0].slaveName}.`);
			if (V.PC.balls >= 30) {
				t.push(`${He2} ${bedSlaves[1].voice !== 0 ? "squeaks" : "gasps"} in shock as ${he2} feels ${bedSlaves[0].slaveName}'s belly swell under ${his2} ${hasAnyArms(bedSlaves[1]) ? "hand" : "face"} with your massive load.`);
				if (hasBothArms(bedSlaves[1])) {
					t.push(`${He2} quickly brings ${his2} other hand to massage it as the orgasming cumballoon squirms in pleasure.`);
				} else {
					t.push(`${He2} nuzzles it as the orgasming cumballoon squirms in pleasure.`);
				}
			} else if (V.PC.balls >= 14) {
				t.push(`${He2} ${bedSlaves[1].voice !== 0 ? "squeaks" : "gasps"} in surprise as ${he2} feels ${bedSlaves[0].slaveName}'s belly swell slightly under ${his2} ${hasAnyArms(bedSlaves[1]) ? "hand" : "face"} with your huge load.`);
			} else if (V.PC.balls >= 9) {
				t.push(`${He2}'s amazed by how big the load felt under ${his2} ${hasAnyArms(bedSlaves[1]) ? "hand" : "face"}.`);
			}
			t.push(`You`);
			if (canSee(bedSlaves[1])) {
				t.push(`beckon ${him2} to lie`);
			} else if (canHear(bedSlaves[1])) {
				t.push(`order ${him2} to lie`);
			} else {
				t.push(`push ${him2}`);
			}
			t.push(`down next to exhausted ${girl} and spread ${his2} leg${hasBothLegs(bedSlaves[1]) ? `s` : ""} for ${his2} seeding. As you take ${him2}, ${bedSlaves[0].slaveName} leans over and pulls ${him2} into a deep kiss. You make sure to not blow your next load too quickly, instead savoring the sight of your soon-to-be-mothers making out, but you can only hold out so long before you paint the depths of ${bedSlaves[1].slaveName}'s`);
			if (bedSlaves[1].mpreg === 1) {
				t.push(`${bedSlaves[1].anus === 0 ? "once virgin " : ""}anus`);
			} else {
				t.push(`${bedSlaves[1].vagina === 0 ? "once virgin " : ""}pussy`);
			}
			t.push(`with your potent baby`);
			if (V.PC.balls >= 30) {
				t.push(`batter until ${his2} stomach is distended and wobbling with cum.`);
			} else if (V.PC.balls >= 14) {
				t.push(`batter until ${his2} womb is stuffed with seed.`);
			} else {
				t.push(`batter.`);
			}
			t.push(`You switch off with the two of them, fucking them in turn, until both pass out`);
			if (hasAnyArms(bedSlaves[0]) && hasAnyArms(bedSlaves[1])) {
				t.push(`with a hand on`);
			} else {
				t.push(`pressed against`);
			}
			t.push(`the other's`);
			if (V.PC.balls >= 30) {
				t.push(`massively bloated`);
			} else if (V.PC.balls >= 14) {
				t.push(`bloated`);
			} else if (V.PC.balls >= 9) {
				t.push(`swollen`);
			}
			t.push(`belly and cum pooling from their thoroughly seeded holes. You slide back in between them for a well earned`);
			if (V.PC.balls >= 30) {
				t.push(`sleep, their middles resting on your own, their cum-stuffed wombs a testament to your virility.`);
			} else if (V.PC.balls >= 14) {
				t.push(`sleep, their middles resting on your own, their cum-filled wombs a testament to your virility.`);
			} else {
				t.push(`sleep.`);
			}

			bedSlaves.forEach(s => {
				s.devotion += 3;
				s.trust += 3;
			});

			t.push(`${bedSlaves[0].slaveName} is <span class="devotion inc">honored to bear your children</span> and <span class="trust inc">snuggles even closer.</span>`);
			if (virgin0) {
				t.push(`Your endeavors have <span class="lime">taken ${his} ${bedSlaves[0].mpreg === 1 ? "anal " : ""}virginity.</span> <span class="devotion inc">${He} couldn't be happier.</span>`);
				bedSlaves[0].devotion += 10;
			}
			if (bedSlaves[0].mpreg === 1) {
				VCheck.Anal(bedSlaves[0], 3);
			} else {
				VCheck.Vaginal(bedSlaves[0], 3);
			}
			knockMeUp(bedSlaves[0], 100, bedSlaves[0].mpreg, -1);

			t.push(`${bedSlaves[1].slaveName} is <span class="devotion inc">thrilled to carry your child</span> and <span class="trust inc">happily embraces the gift inside ${him2}.</span>`);
			if (virgin1) {
				t.push(`Your endeavors have <span class="lime">taken ${his} ${bedSlaves[1].mpreg === 1 ? "anal " : ""}virginity.</span> <span class="devotion inc">${He} couldn't be happier.</span>`);
				bedSlaves[1].devotion += 10;
			}
			if (bedSlaves[1].mpreg === 1) {
				VCheck.Anal(bedSlaves[1], 3);
			} else {
				VCheck.Vaginal(bedSlaves[1], 3);
			}
			knockMeUp(bedSlaves[1], 100, bedSlaves[1].mpreg, -1);

			App.Events.addParagraph(frag, t);

			return frag;
		}

		function fuckNote() {
			if (virgin0 || virgin1) {
				return `This option will break in any fertile holes`;
			}
			return null;
		}

		function pullsheets() {
			const frag = document.createDocumentFragment();

			let t = [
				`Without warning, you jerk the sheets all the way up and pin them at the head of the bed. They giggle as you seize first the one and then the other, groping and tickling. ${bedSlaves[1].slaveName} and ${bedSlaves[0].slaveName} catch the spirit of fun, and rove around in the soft darkness under the sheets. You're`
			];
			if (V.PC.dick !== 0) {
				t.push(`rock hard`);
				if (V.PC.vagina !== 0) {
					t.push(`and`);
				}
			}
			if (V.PC.vagina !== -1) {
				t.push(`soaking wet`);
			}
			t.push(`in no time, wrestling with two naked slaves, and begin to fuck the first one you can grab and hold. When you`);
			if (V.PC.dick === 0) {
				t.push(`finish with ${him},`);
			} else {
				t.push(`come inside ${him},`);
			}
			t.push(`you`);
			if (canWalk(bedSlaves[0])) {
				t.push(`release ${him} and ${he} slides out of bed to wash; by the time ${he} gets back under the sheets, clean and fresh, you're on the point of fucking`);
			} else {
				t.push(`shoulder ${his} helpless body out of bed to the washroom; by the time ${he} crawls back under the sheets, clean and fresh, you're on the point of fucking`);
			}
			t.push(`the other. You switch off with the two of them, fucking them in turn, until everyone falls asleep in an exhausted pile. They have become <span class="trust inc">still more trusting of you.</span>`);

			bedSlaves.forEach(s => {
				s.trust += 4;
				SimpleSexAct.Player(s, 3);
			});

			App.Events.addParagraph(frag, t);

			return frag;
		}
	}
};
