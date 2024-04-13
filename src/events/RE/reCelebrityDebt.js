App.Events.RECelebrityAddictionDebt = class RECelebrityAddictionDebt extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always return valid
	}

	execute(node) {
		const slave = newCelebrityAddict();
		const {him, his, he} = getPronouns(slave);

		slave.prestigeDesc = `$He used to be ${slave.actualAge < 16 ? "a child actress" : "an actress"}, starring in several recent blockbuster films that many millions loved to watch on whatever screens they could get their hands on.`;
		slave.origin = `$He was a famous ${slave.actualAge < 16 ? "child " : ""}actress until $his drug habits pushed $him so far into debt that $his agent sold $him to you at auction.`;

		App.Events.drawEventArt(node, slave, "no clothing");

		node.append(eventText());

		function eventText() {
			let t = new SpacedTextAccumulator();

			t.push(`A life of excess is dangerous, especially if there's no one around who can really tell you no. With all the money and power at your fingertips, not a day goes by where you're not tempted into excess.`);
			t.push(`You're reminded of this fact when your personal assistant informs you of a high profile slave auction.`);
			t.push(slave.slaveName);
			t.push(`used to be a famous movie`);
			if (V.diversePronouns && slave.pronoun === App.Data.Pronouns.Kind.male) {
				t.push(`actor.`);
			} else {
				t.push(`actress.`);
			}
			t.push(`That was, until ${his} aphrodisiac habit got the better of ${him}. Hopelessly addicted and drowning in debt, ${his} life is being offered up at auction to anyone who wants it. Your personal assistant estimates the auction to end somewhere between ¤30,000 and ¤50,000. Needless to say, it would be very prestigious to own ${him}.`);

			t.toParagraph();

			const choices = [];
			if (V.cash < 15000) {
				choices.push(new App.Events.Result(null, null, `Unfortunately you don't have the funds to remain competitive in this particular auction.`));
			} else {
				choices.push(new App.Events.Result(`Attend the Auction`, attendAuction));
			}
			App.Events.addResponses(t.container(), choices);

			return t.container();
		}

		function newCelebrityAddict() {
			const slave = GenerateNewSlave(undefined, {
				minAge: 10,
				maxAge: 30,
				ageOverridesPedoMode: true,
				disableDisability: 1
			});

			slave.career = slave.actualAge < 16 ? "a child actress" : "an actress";
			slave.prestige = 2;

			slave.devotion = random(-80, -60);
			slave.trust = random(-60, -50);

			// famous non-porn actor/actress should have a conventional build, and would be able to get breast reductions, even with macro/gigantomastia
			if (slave.genes === "XY") {
				slave.boobs = Math.clamp(slave.boobs, 100, 200);
			} else if (slave.actualAge < 13) {
				slave.boobs = Math.clamp(slave.boobs, 100, 300);
			} else if (slave.actualAge < 16) {
				slave.boobs = Math.clamp(slave.boobs, 100, 500);
			} else {
				slave.boobs = Math.clamp(slave.boobs, 100, 2000);
			}

			slave.health.condition = random(-75, -30);
			slave.health.longDamage = 20;
			slave.weight = random(-40, 20);

			// slave has unusually high odds of pFace, with a very high .face score and possibility of plastic surgery otherwise
			slave.geneticQuirks.pFace = either(0, 0, 0, 1, 1, 2);
			if (slave.geneticQuirks.pFace > 0) {
				slave.face = 100;
			} else {
				slave.face = random(25, 100);
			}
			// only apply plastic surgery when it would have an effect, and never to child actors
			if (slave.actualAge >= 16 && slave.face <= 80) {
				const plasticSurgeries = random(0, Math.floor((100 - slave.face) / 20));
				if (plasticSurgeries > 0) {
					slave.face = Math.min(slave.face + (20 * plasticSurgeries), 100);
					slave.faceImplant = either(5, 10, 15, 20) * plasticSurgeries;
				}
			}

			if (slave.visualAge < 16) {
				slave.faceShape = "cute";
			}

			slave.lips = random(0, 70);

			if (slave.teeth === "crooked" || slave.teeth === "gapped") {
				slave.teeth = "normal";
			}

			if (slave.vagina > -1) {
				if (slave.actualAge > 14) {
					slave.vagina = random(3);
				} else {
					slave.vagina = 0;
				}
			}
			slave.anus = slave.actualAge > 14 ? 3 : 0;

			if (slave.vagina > 0) {
				slave.skill.vaginal = random(31, 70);
			}
			slave.skill.oral = random(31, 70);
			if (slave.dick > 0) {
				slave.skill.penetrative = jsRandom(31, 70);
			}
			if (slave.anus !== 0) {
				slave.skill.anal = random(31, 70);
			}
			slave.skill.entertainment = 75;
			slave.skill.combat = 0;
			slave.skill.entertainer = 175;
			slave.addict = 20;
			slave.intelligence = random(-50, 80);
			slave.intelligenceImplant = Math.clamp(((slave.actualAge > 16) + (slave.actualAge > 24) + (slave.intelligence > 0) + (slave.intelligence > 50) + random(-2, 1)), 0, 2) * 15;
			slave.energy = 100;
			slave.behavioralFlaw = either("arrogant", "bitchy");

			if (slave.pubertyXX > 0 && slave.vagina > 0 && random(0, 100) >= 20) {
				slave.preg = random(1, 35);
				slave.pregWeek = slave.preg;
				slave.pregType = either(1, 1, 1, 1, 1, 2, 2, 3);
				slave.pregSource = either(-4, -2, 0);
				SetBellySize(slave);
			}

			slave.slaveCost = random(30000, 50000);

			// Lowers actual cost of slave depending on how good the PC is at trading
			slave.slaveCost -= V.PC.skill.trading * 100;

			return slave;
		}

		function attendAuction() {
			const t = new SpacedTextAccumulator();
			if (V.cash < slave.slaveCost) {
				t.push(`You work your cash as far as it will go, but despite your best efforts, you are outbid. The slave goes home with one of ${his} many fans, and you go home empty-handed.`);
			} else {
				cashX(-slave.slaveCost, "slaveTransfer", slave);

				t.push(`It's a rough auction; a number of rabid fans stretch their wallets as thin as they will go, but in the end, yours stretches further. You return to your penthouse and eagerly await the delivery of your prize.`);
				t.push(`When ${he} arrives at your penthouse, ${he}'s shoved stark naked into your office by a manager who's clearly got better things to do. It's obvious that ${his} health is failing rapidly; up this close, you can clearly see the effects of addiction eating away at ${him}. Medical attention should be more than enough to keep ${him} alive with a little effort, though. Unsurprisingly, instead of asking you for help, ${he} demands the strongest aphrodisiac you have, not quite aware of how different ${his} new situation is from ${his} old one. It's going to take a lot of work to turn the addiction-riddled mess in front of you into even a halfway decent sex slave.`);

				t.toParagraph();

				t.push(App.UI.newSlaveIntro(slave));
			}
			t.toParagraph();
			return t.container();
		}
	}
};
