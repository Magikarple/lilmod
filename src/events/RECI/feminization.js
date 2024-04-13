App.Events.RECIFeminization = class RECIFeminization extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => this.validSlave(s),
				s => s.assignment !== Job.QUARTER,
				s => s.devotion >= 10,
				s => s.dick > 0,
				s => s.vagina < 0,
				s => s.attrXY > 65,
				s => s.energy > 60,
				s => s.faceShape !== "masculine",
				s => s.belly <= 0,
				s => s.bodySwap === 0,
				s => s.anus > 0,
				s => s.sexualFlaw !== "hates anal",
				s => s.butt > 0,
				canStand,
				canDoAnal,
				canTalk,
				canHear,
				hasAnyArms,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "feminization"));
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {He, he, His, his, him, himself, girl} = getPronouns(eventSlave);
		const {title: Master, say: say} = getEnunciation(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const legs = hasBothLegs(eventSlave) ? "legs" : "leg";

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "feminization");

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "no clothing");
		node.appendChild(artDiv);

		let t = [];
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`is standing before your desk for an inspection. The ${desc} is naked, of course, and is devoted enough to find the situation arousing: ${he}'s being inspected by ${his} ${getWrittenTitle(eventSlave)} in the nude, which is sexual enough, and past inspections have often led to a quick fuck. The horny bitch obviously wants it;`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`${his} chastity cage is dribbling precum, and ${he}'s clearly uncomfortable with simultaneous arousal and unwillingness to suffer a hard-on inside it.`);
		} else if (canAchieveErection(eventSlave)) {
			t.push(`${his} cock is painfully erect.`);
		} else if (eventSlave.dick > 6) {
			t.push(`${his} inhuman cock is swollen and leaking precum.`);
		} else if (eventSlave.dick > 0) {
			t.push(`${his} pathetically limp dick is practically dripping precum.`);
		}
		t.push(`Your inspections require the slave to offer each of ${his} body parts to your view, and when the routine reaches ${his} anus, the slut obediently turns ${his} back to you, bends at the waist, and`);
		if (eventSlave.butt > 10) {
			t.push(`struggles to spread ${his} immense asscheeks far enough apart to even give you a view of`);
		} else if (eventSlave.butt > 5) {
			t.push(`prises ${his} massive buttocks apart to reveal`);
		} else if (eventSlave.butt > 2) {
			t.push(`pulls ${his} buttocks apart to show off`);
		} else {
			t.push(`spreads ${his} cute buttocks to show off`);
		}
		t.push(`${his}`);
		if (eventSlave.anus > 2) {
			t.push(`asshole, which is so relaxed it's begging for cock.`);
		} else if (eventSlave.anus > 1) {
			t.push(`butthole, which ${he} winks invitingly at you.`);
		} else {
			t.push(`tight anus, which ${he} winks invitingly at you.`);
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You often pepper slaves with questions during this inspection; it helps you gauge their mental state, and it's just as important to verbally inspect slaves' minds as it is to visually inspect their backdoors. You remember with sudden clarity what ${eventSlave.slaveName} was like when you acquired ${him}. ${He} wasn't as enthusiastic then. The first time you inspected ${him}, ${he} certainly wasn't so excited about getting buttfucked. You ask ${him} if ${he} remembers that too. ${He} hesitates, wondering how to answer, but decides that honesty is the best policy and ${say}s,`);
		t.push(Spoken(eventSlave, `"I remember, ${Master}. It was hard for me, becoming a girl.`));
		if (eventSlave.fetish === "buttslut" || eventSlave.energy > 95) {
			t.push(Spoken(eventSlave, `But, ${Master}, girls get fucked. And I love getting fucked in the butt so much. If that makes me a girl then I'm happy being a girl.`));
		} else if (eventSlave.fetish === "cumslut" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `But, ${Master}, girls suck cock. And I love sucking cock so much. If that makes me a girl then I'm happy being a girl.`));
		} else if (eventSlave.fetish === "pregnancy" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `But, ${Master}, girls get bred. And I love being held down and bred. If that makes me a girl then I'm happy being a girl.`));
		} else if ((eventSlave.fetish === Fetish.SUBMISSIVE || eventSlave.fetish === "masochist") && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `But, ${Master}, girls get held down and fucked. And I love being used so much. If that makes me a girl then I'm happy being a girl.`));
		} else if (eventSlave.boobs > 400) {
			t.push(Spoken(eventSlave, `Getting a girl's body made it easier for me, though. When I`));
			if (canSee(eventSlave)) {
				t.push(Spoken(eventSlave, `see myself in the mirror, I see`));
			} else {
				t.push(Spoken(eventSlave, `feel myself up, I feel`));
			}
			t.push(Spoken(eventSlave, `a girl with a body made for getting fucked.`));
		} else if (eventSlave.balls === 0) {
			t.push(Spoken(eventSlave, `Not having balls makes it easier for me, though. The only way my soft girldick will come is when I take cock.`));
		} else {
			t.push(Spoken(eventSlave, `But the training and the rules pushed me through it.`));
		}
		t.push(Spoken(eventSlave, `I try to be a good slave girl for you, ${Master}. Can I — can I be a good slave girl for you? Right now? Please?"`));
		t.push(`${He} twists ${his} ${eventSlave.skin} body suggestively,`);
		if (eventSlave.chastityPenis === 1) {
			t.push(`offering you ${his} rear hole, the only hope the chastity caged ${girl} has of release.`);
		} else if (canAchieveErection(eventSlave)) {
			t.push(`hard dick wagging with the motion, offering you ${his} rear.`);
		} else if (eventSlave.dick > 6) {
			t.push(`engorged dick wobbling with the motion, offering you ${his} rear.`);
		} else if (eventSlave.dick > 0) {
			t.push(`soft dick flopping with the motion, offering you ${his} rear.`);
		}
		App.Events.addParagraph(node, t);

		App.Events.addResponses(node, [
			new App.Events.Result(`Yes ${he} can`, gentleSex),
			new App.Events.Result(`${He}'s a good slave girl all the time, not just right now`, poundingSex),
			(canImpreg(eventSlave, V.PC))
				? new App.Events.Result(`Girls should be naked, barefoot and pregnant`, breedingSex)
				: new App.Events.Result(),
			new App.Events.Result(`Good slave girls earn money`, partyGirl),
		]);

		function gentleSex() {
			t = [];
			t.push(`When ${he}`);
			if (canSee(eventSlave)) {
				t.push(`sees`);
			} else {
				t.push(`hears`);
			}
			t.push(`you stand up from behind your`);
			if (V.PC.dick === 0) {
				t.push(`desk and pull on a strap-on,`);
			} else {
				t.push(`desk,`);
			}
			t.push(`${he} turns fully away from you, cocking ${his}`);
			if (eventSlave.hips > 0) {
				t.push(`womanly`);
			}
			t.push(`hips at just the right angle to offer you ${his} anus, without any preamble or foreplay. But you come up behind ${him} and encircle ${his}`);
			if (eventSlave.weight > 95) {
				t.push(`bountiful belly`);
			} else if (eventSlave.weight > 30) {
				t.push(`soft stomach`);
			} else if (eventSlave.muscles > 95) {
				t.push(`ripped abs`);
			} else if (eventSlave.weight > 10) {
				t.push(`plush belly`);
			} else if (eventSlave.muscles > 30) {
				t.push(`muscular waist`);
			} else if (eventSlave.muscles > 5) {
				t.push(`firm stomach`);
			} else {
				t.push(`trim waist`);
			}
			t.push(`with your capable hands, your lips nibbling along the line of ${his}`);
			if (eventSlave.weight > 95) {
				t.push(`soft`);
			} else if (eventSlave.muscles > 30) {
				t.push(`strong`);
			} else if (eventSlave.muscles > 5) {
				t.push(`toned`);
			} else {
				t.push(`soft`);
			}
			t.push(`shoulders and neck. ${He} shudders as the embrace brings your`);
			if (V.PC.dick === 0) {
				t.push(`strap-on`);
			} else {
				t.push(`dick`);
			}
			if (eventSlave.height >= V.PC.height + 15) {
				if (hasBothLegs(eventSlave)) {
					t.push(`slipping between ${his} thighs,`);
				} else {
					t.push(`slapping against ${his} thigh,`);
				}
				t.push(`since ${he}'s taller than you.`);
			} else if (eventSlave.height >= V.PC.height) {
				t.push(`up between ${his} buttocks, since ${he}'s as tall as you.`);
			} else if (eventSlave.height >= V.PC.height - 15) {
				t.push(`pressing into ${his} asscrack, since ${he}'s shorter than you.`);
			} else if (eventSlave.height >= V.PC.height - 30) {
				t.push(`nestling down into ${his} asscrack, since ${he}'s so much shorter than you.`);
			} else {
				t.push(`sliding down ${his} back, since there is a considerable size difference between you.`);
			}
			t.push(`You whisper that a good slave girl doesn't have to touch ${himself} to come when ${his} ${getWrittenTitle(eventSlave)} fucks ${his} butt, and ask whether ${he}'s a good slave girl. ${He} shivers and promises that ${he} is, rubbing ${his} asshole against your`);
			if (V.PC.dick === 0) {
				t.push(`phallus.`);
			} else {
				t.push(`cockhead.`);
			}
			t.push(`${He} gives a`);
			if (eventSlave.voice > 1) {
				t.push(`feminine`);
			} else {
				t.push(`unbecomingly deep`);
			}
			t.push(`sigh as it slides into ${him}, and moves softly within your embrace, doing ${his} best to pleasure you with ${his} girly ass. ${He} was already very close, and your loving touch so aroused ${him} that ${he} gasps and stiffens after only a few thrusts,`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`shuddering`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`${his} dick twitching`);
			} else if (eventSlave.dick > 6) {
				t.push(`${his} fat dick twitching slightly.`);
			} else if (eventSlave.dick > 0) {
				t.push(`${his} soft dick twitching softly`);
			}
			t.push(`with a weak orgasm. ${He} giggles self-consciously and keeps humping back into you. ${He} is a <span class="devotion inc">good slave girl</span> once more before going to rinse ${himself} off in the shower, so much so that you follow ${him} so ${he} can be a good slave girl in the shower, too.`);
			eventSlave.devotion += 4;
			seX(eventSlave, "anal", V.PC, "penetrative", 3);
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 15, 1, -1);
			}
			return t;
		}

		function poundingSex() {
			t = [];
			t.push(`You tell ${him} that ${he} doesn't have to prove anything to you right now; ${he}'s shown that ${he}'s a good slave girl already. ${He} looks shocked for a moment before <span class="trust inc">blushing and turning ${his} gaze down at ${his} feet.</span>`);
			t.push(Spoken(eventSlave, `"T-thanks ${Master},"`));
			t.push(`${he} stammers. Since ${he} asked so nicely, though, you continue; you will fuck ${his} butt. ${He} giggles and`);
			if (canWalk(eventSlave)) {
				t.push(`hurries`);
			} else {
				t.push(`crawls`);
			}
			t.push(`over to you in response to a crooked finger, curling up in your lap for a nice makeout session. When the next slave scheduled for an examination comes through the door, it's to the sight of ${eventSlave.slaveName} holding ${his} body sideways in the air over the`);
			if (hasBothLegs(eventSlave)) {
				t.push(`couch: ${he} has one knee down on the cushions, and is doing the splits with the other leg running up`);
				if (V.PC.boobs >= 300) {
					t.push(`between your breasts.`);
				} else if (V.PC.title === 0) {
					t.push(`your flat chest.`);
				} else {
					t.push(`your muscular chest.`);
				}
			} else {
				t.push(`couch.`);
			}
			t.push(`Your`);
			if (V.PC.dick === 0) {
				t.push(`strap-on`);
			} else {
				t.push(`dick`);
			}
			t.push(`is up ${his} ass, and you're giving it to ${him} hard.`);
			if (eventSlave.boobs > 25000) {
				t.push(`${His} immense breasts wobble beside ${him}, absorbing the impact of each thrust.`);
			} else if (eventSlave.boobs > 1000) {
				t.push(`${His} huge breasts are bouncing back and forth with the motion, almost hitting ${himself} in the face.`);
			} else if (eventSlave.weight > 10) {
				t.push(`${His} generous curves lend the motion weight, and each thrust reams ${his} ass hard.`);
			} else if (eventSlave.hLength >= 60) {
				t.push(`${His} long hair flies around ${his} face in a maelstrom of sexual energy.`);
			} else {
				t.push(`The leather couch creaks with an obscurely sexual rhythm.`);
			}
			t.push(`${He}'s being fucked so hard that ${his}`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`cock is being forced to half-hardness inside its chastity cage, making ${him} writhe with mixed anal pleasure and dick pain.`);
			} else if (canAchieveErection(eventSlave)) {
				if (eventSlave.dick > 3) {
					t.push(`massive erection is slapping wetly against ${his} stomach, spattering ejaculate from a previous orgasm everywhere,`);
				} else if (eventSlave.dick > 1) {
					t.push(`hard-on is helicoptering around wildly, spattering ejaculate from a previous orgasm everywhere`);
				} else {
					t.push(`tiny erection is scattering ejaculate from a previous orgasm everywhere.`);
				}
			} else if (eventSlave.dick > 6) {
				t.push(`${his} swollen cock is swaying along to the pounding, slapping heavily against anything it hits.`);
			} else if (eventSlave.dick > 3) {
				t.push(`huge soft cock is flopping at random, slapping against ${his} stomach and ${his} ${legs}.`);
			} else if (eventSlave.dick > 1) {
				t.push(`${his} impotent dick has been forced to a state of half-hardness.`);
			} else {
				t.push(`${his} pathetic little dick has been forced into a state of half-hardness.`);
			}
			t.push(`${He}'s so far gone into a state of`);
			if (eventSlave.prostate > 0) {
				t.push(`prostate stimulation induced bliss`);
			} else {
				t.push(`bliss from having ${his} insides stirred up`);
			}
			t.push(`that ${he}'s drooling a little.`);
			eventSlave.trust += 4;
			seX(eventSlave, "anal", V.PC, "penetrative");
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 10, 1, -1);
			}
			return t;
		}

		function breedingSex() {
			t = [];
			t.push(`You tell ${him} that a proper girl should be naked, barefoot, and pregnant. ${He} thinks for a moment and ${say}s,`);
			t.push(Spoken(eventSlave, `"Well I'm already naked... And I'm not wearing any shoes... So that just leaves getting knocked up..."`));
			t.push(`${He} giggles, lowers ${himself} to the ground and`);
			if (eventSlave.butt > 10) {
				t.push(`bounces ${his} ridiculous ass at you,`);
			} else if (eventSlave.butt > 3) {
				t.push(`jiggles ${his} huge butt at you,`);
			} else {
				t.push(`wiggles ${his} butt at you,`);
			}
			t.push(`inviting you to mount ${him}.`);
			t.push(Spoken(eventSlave, `"Which won't be a problem at a—!"`));
			t.push(`${He} is cut short as you hilt your dick in ${his} ass, push ${his} face to the floor, and being pounding ${his}`);
			if (eventSlave.anus > 2) {
				t.push(`slutty asspussy.`);
			} else if (eventSlave.anus > 1) {
				t.push(`loose hole.`);
			} else {
				t.push(`tight hole.`);
			}
			t.push(`${He} bucks against you like a bitch in heat,`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`despite the pain caused by ${his} chastity bound hardness,`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`${his} throbbing erection smearing precum across ${his} belly,`);
			} else if (eventSlave.dick > 6) {
				t.push(`${his} swollen cock wobbling with your thrusts,`);
			} else if (eventSlave.dick > 1) {
				t.push(`${his} soft cock flopping against ${his} belly to your thrusts,`);
			} else {
				t.push(`${his} pathetic little dick flopping around forgotten beneath ${him},`);
			}
			t.push(`until ${he} feels the warmth of your fresh load deposited in the depths of ${his} rear. You help ${him} onto the couch, where ${he} gently massages ${his} lower belly, <span class="devotion inc">marveling at what it means to be your girl.</span>`);
			t.push(Spoken(eventSlave, `"I'm going to have ${Master}'s babies... It's like a dream,"`));
			t.push(`${he} babbles incoherently. This is just the first of many breedings ${he}'ll undergo this week as you finish ${his} transformation into the perfect slave girl; it will be a surprise if ${he} doesn't come out of this pregnant.`);
			eventSlave.devotion += 2;
			seX(eventSlave, "anal", V.PC, "penetrative", 10);
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 95, 1, -1);
			}
			return t;
		}

		function partyGirl() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "a mini dress");

			t = [];
			t.push(`You tell ${him} that you've hired ${him} out for a party a prominent citizen is throwing, and that ${he} should be a good slave girl by saving ${himself} for that. ${He} trips all over ${himself} promising that ${he} will. You check in on ${him} later, using the video feeds, and are treated to the sight of ${him} wearing a slinky cocktail dress, although wearing is perhaps the wrong term. ${He}'s bent over a barstool with the top of the dress pulled down`);
			if (eventSlave.boobs > 10000) {
				t.push(`to let ${his} massive chest wobble freely`);
			} else if (eventSlave.boobs > 1000) {
				t.push(`over ${his} huge tits`);
			} else if (eventSlave.boobs > 300) {
				t.push(`to bare ${his} boobs`);
			} else {
				t.push(`to reveal ${his} sissy chest`);
			}
			t.push(`and the bottom of ${his} dress hiked up so a guest can fuck ${his} ass. ${He}'s obviously enjoying ${himself}, happy to be getting some at last. ${His} fee for the night is <span class="cash inc">substantial,</span> and the host attaches a note to the payment, complimenting ${his} eagerness to get assfucked and ${his} willingness to suck cock, and asking when ${he}'ll be available next.`);
			cashX(500, "event", eventSlave);
			seX(eventSlave, "anal", "public", "penetrative", 5);
			seX(eventSlave, "oral", "public", "penetrative", 5);
			if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
				knockMeUp(eventSlave, 10, 1, -2);
			}
			return t;
		}
	}
};
