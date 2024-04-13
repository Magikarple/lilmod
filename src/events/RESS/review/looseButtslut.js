App.Events.RESSLooseButtslut = class RESSLooseButtslut extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canHold,
				canDoAnal,
				s => s.fetish === "buttslut" || (s.energy > 95 && s.fetish !== Fetish.NONE),
				s => s.anus > 2,
				s => s.belly < 300000,
				s => s.rules.release.masturbation === 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const pinches = eventSlave.nipples !== "fuckable" ? "pinches" : "fingers";

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`Since ${he} has a little free time this evening,`,
			contextualIntro(V.PC, eventSlave, true),
			`finds a quiet corner and engages in ${his} anal proclivities. Since ${his} asshole is so stretched out, ${he} sticks the base of a huge dildo to the ground and`);
		if (eventSlave.belly >= 100000) {
			r.push(`struggles to lower ${his} heavy, very gravid body down onto it,`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`cautiously lowers ${his}`);
			if (eventSlave.bellyFluid >= 10000) {
				r.push(`${eventSlave.inflationType}-stuffed`);
			} else {
				r.push(`very gravid`);
			}
			r.push(`body on it,`);
		} else if (eventSlave.belly >= 5000) {
			r.push(`delicately lowers ${his}`);
			if (eventSlave.bellyFluid >= 5000) {
				r.push(`bloated`);
			} else {
				r.push(`gravid`);
			}
			r.push(`body on it,`);
		} else {
			r.push(`squats on it,`);
		}
		r.push(`moaning happily as the massive thing inches into ${him}. ${He} starts to slide up and down it`);
		if (hasBothArms(eventSlave)) {
			r.push(`hands-free,`);
		} else {
			r.push(`automatically,`);
		}
		r.push(`so ${he}`);
		if (canAchieveErection(eventSlave)) {
			if (eventSlave.dick > 5) {
				r.push(`jacks off ${his} huge cock with`);
				if (hasBothArms(eventSlave)) {
					r.push(`both hands.`);
				} else {
					r.push(`${his} hand.`);
				}
			} else if (eventSlave.dick > 2) {
				r.push(`jacks off with`);
				if (!hasBothArms(eventSlave)) {
					r.push(`${his} hand.`);
				} else {
					r.push(`one hand and ${pinches} a nipple with the other.`);
				}
			} else {
				r.push(`rubs ${his} little penis with`);
				if (!hasBothArms(eventSlave)) {
					r.push(`${his} hand.`);
				} else {
					r.push(`one hand and ${pinches} a nipple with the other.`);
				}
			}
		} else if (eventSlave.dick > 5) {
			r.push(`massages ${his} huge, limp cock with`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands.`);
			} else {
				r.push(`${his} hand.`);
			}
		} else if (eventSlave.dick > 2) {
			r.push(`attempts to jack off ${his} limp dick with`);
			if (!hasBothArms(eventSlave)) {
				r.push(`${his} hand.`);
			} else {
				r.push(`one hand while ${eventSlave.nipples !== "fuckable" ? "pinching" : "fingering"} a nipple with the other.`);
			}
		} else if (eventSlave.dick > 0) {
			r.push(`rubs ${his} little penis with`);
			if (!hasBothArms(eventSlave)) {
				r.push(`${his} hand.`);
			} else {
				r.push(`one hand and ${pinches} a nipple with the other.`);
			}
		} else if (eventSlave.vagina === -1) {
			r.push(`rubs the sensitive area around ${his} asspussy with`);
			if (!hasBothArms(eventSlave)) {
				r.push(`${his} hand.`);
			} else {
				r.push(`one hand and ${pinches} a nipple with the other.`);
			}
		} else {
			r.push(`rubs ${his} clit with`);
			if (!hasBothArms(eventSlave)) {
				r.push(`${his} hand.`);
			} else {
				r.push(`one hand and ${pinches} a nipple with the other.`);
			}
		}
		r.push(`As ${he} enjoys ${himself}, ${his} loose sphincter relaxes further until it's barely gripping the dildo.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Add something to fill ${him} completely`, completely),
			new App.Events.Result(`Let ${him} use a machine`, machine),
			(V.HeadGirlID !== 0 && V.HeadGirlID !== eventSlave.ID)
				? new App.Events.Result(`Call your Head Girl in for double anal`, double)
				: new App.Events.Result(),
		]);

		function completely() {
			r = [];
			r.push(`${He}'s so occupied that ${he} doesn't`);
			if (canHear(eventSlave)) {
				r.push(`hear you`);
			} else {
				r.push(`sense your presence`);
			}
			r.push(`until you`);
			if (V.PC.dick === 0) {
				r.push(`don a strap-on and`);
			}
			r.push(`tip ${him} over face forward. With ${him} on ${his} knees, ${his} dildo-stuffed ass is in the air; ${he}'s still masturbating between ${his} legs. After a moment's consideration, you slide two exploratory fingers in alongside the dildo. ${He} gasps and masturbates harder. Thus encouraged, you shove`);
			if (V.PC.dick === 0) {
				r.push(`the strap-on`);
			} else {
				r.push(`your member`);
			}
			r.push(`in alongside the dildo.`);
			if (eventSlave.voice !== 0) {
				r.push(`${He} screams at the surprise double anal, sobbing and begging,`);
			} else {
				r.push(`${He} screams noiselessly at the surprise double anal, waving ${his} hands in distress,`);
			}
			r.push(`but ${he} doesn't try to stop you and doggedly keeps rubbing. By the time you're finished ${his} asshole is a gaping hole much bigger than the average pussy. <span class="devotion inc">${He} has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			r.push(VCheck.Anal(eventSlave, 1));
			return r;
		}

		function machine() {
			r = [];
			r.push(`There's no reason for ${him} to do that in a quiet corner. You interrupt ${him} and bring ${him} into your office, setting ${him} up on a machine so ${he} can have that dildo rammed up ${his} ass for as long as ${he} likes. Your office is filled with the rhythmic sounds of a sloppy anus being pounded for a good long while.`);
			if (V.assistant.personality > 0) {
				r.push(`The`);
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`monstrous voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "take my cocks, slave."`);
						break;
					case "shemale":
						r.push(`sultry voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "take my dick, bitch."`);
						break;
					case "amazon":
						r.push(`aggressive voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "be a warrior."`);
						break;
					case "businesswoman":
						r.push(`dominant voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "stop struggling and be a good ${girl}."`);
						break;
					case "goddess":
					case "hypergoddess":
						r.push(`calming voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "relax and accept what you deserve, ${girl}."`);
						break;
					case "loli":
						r.push(`young, naïve voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "relax, it'll get better."`);
						break;
					case "preggololi":
						r.push(`young voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "relax, you know it'll be fun!"`);
						break;
					case "angel":
						r.push(`harmonious voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "relax, it'll be over soon."`);
						break;
					case "cherub":
						r.push(`cheerful voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "relax, it'll feel better if you do!"`);
						break;
					case "incubus":
						r.push(`forceful voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "take my dick, cocksleeve, take it till you split!"`);
						break;
					case "succubus":
						r.push(`sultry voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "enjoy the pounding while it lasts."`);
						break;
					case "imp":
						r.push(`mischievous voice of your assistant's avatar can also be heard, mocking ${eventSlave.slaveName}, "your butthole is going to be so loose after this! You'll be nothing more than a used up whore!"`);
						break;
					case "witch":
						r.push(`uncertain voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "just relax and get it over with."`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`unclear voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "scream louder and let it fill your body completely."`);
						break;
					case "schoolgirl":
						r.push(`girly voice of your assistant's avatar can also be heard, encouraging ${eventSlave.slaveName} to "be quiet, or Teacher will hear us."`);
						break;
					default:
						r.push(`poor slave is taken to the very limit by your assistant.`);
				}
				seX(eventSlave, "anal", "assistant", "penetrative");
			} else {
				actX(eventSlave, "anal");
			}
			r.push(`By the time ${he}'s climaxed out, ${he}'s so tired and apathetic that ${he} can't bring ${himself} to get off it or ask for help, so ${he} just relaxes and enjoys the internal massage`);
			if (eventSlave.dick !== 0) {
				r.push(`while ${his} flaccid dick twitches weakly`);
			}
			r.push(r.pop() + `. <span class="trust inc">${He} has become more trusting of you,</span> since you knew just what ${he} needed.`);
			eventSlave.trust += 4;
			return r;
		}

		function double() {
			App.Events.refreshEventArt([eventSlave, S.HeadGirl]);
			const {
				he2, his2, himself2, He2
			} = getPronouns(S.HeadGirl).appendSuffix("2");
			r = [];
			r.push(`When ${S.HeadGirl.slaveName} comes into your office in response to your summons, ${he2} finds ${eventSlave.slaveName} sitting in your lap with your`);
			if (V.PC.dick === 0) {
				r.push(`strap-on`);
			} else {
				r.push(`dick`);
			}
			r.push(`up ${his} gaping`);
			if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
				r.push(`butt, your bare pussy very visible at the base of your working cock`);
			} else {
				r.push(`butt.`);
			}
			r.push(`${S.HeadGirl.slaveName}'s expression softens when ${he2} realizes ${he2}'s here for pleasure, not business. ${eventSlave.slaveName} gasps a little when ${he}`);
			if (canHear(eventSlave)) {
				r.push(`hears you tell ${S.HeadGirl.slaveName} to join you up ${his} asshole,`);
			} else {
				r.push(`feels you pull apart ${his} asscheeks to make some room for ${S.HeadGirl.slaveName},`);
			}
			r.push(`but ${he} doesn't protest.`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`Since your poor Head Girl can't use ${his2} caged cock, ${he2} takes a dildo and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			} else if (canAchieveErection(S.HeadGirl) && S.HeadGirl.dick > 7) {
				r.push(`Even though your Head Girl is rock-hard and ready to fuck, ${his2} cock is far too large to fit into even the most stretched slave's holes. Sighing, ${he2} takes a dildo and shoves it up ${eventSlave.slaveName}'s already-filled butt instead.`);
			} else if (canAchieveErection(S.HeadGirl) && S.HeadGirl.dick > 6) {
				r.push(`Your lusty Head Girl is already hard and forces ${his2} oversized cock up ${eventSlave.slaveName}'s already-filled butt while`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`tweaking`);
				} else {
					r.push(`fingering`);
				}
				r.push(`the moaning slave's nipples.`);
			} else if (S.HeadGirl.dick > 0 && S.HeadGirl.hormoneBalance >= 100) {
				r.push(`Since your poor Head Girl can't get hard due to ${his2} hormone therapy, ${he2} dons a strap-on over ${his2} flaccid penis and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			} else if (S.HeadGirl.dick > 0 && S.HeadGirl.balls > 0 && S.HeadGirl.ballType === "sterile") {
				r.push(`Since your poor Head Girl can't get hard due to ${his2} chemical castration, ${he2} dons a strap-on over ${his2} flaccid penis and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado`);
			} else if (S.HeadGirl.dick > 0 && S.HeadGirl.balls === 0) {
				r.push(`Since your poor Head Girl can't get hard due to ${his2} orchiectomy, ${he2} dons a strap-on over ${his2} flaccid penis and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			} else if (!canAchieveErection(S.HeadGirl) && S.HeadGirl.dick > 6) {
				r.push(`Since your poor Head Girl is far too big to get hard, much to ${eventSlave.slaveName}'s disappointment, ${he2} dons a strap-on over ${his2} flaccid penis and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			} else if (!canAchieveErection(S.HeadGirl) && S.HeadGirl.dick > 0) {
				r.push(`Since your poor Head Girl can't get it up for one reason or another, ${he2} dons a strap-on over ${his2} flaccid penis and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			} else if (S.HeadGirl.dick > 0) {
				r.push(`Your lusty Head Girl is already hard and shoves ${himself2} up ${eventSlave.slaveName}'s already-filled butt while`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`tweaking`);
				} else {
					r.push(`fingering`);
				}
				r.push(`the writhing slave's nipples.`);
			} else {
				r.push(`${He2} dons a strap-on and shoves it up ${eventSlave.slaveName}'s already-filled butt without further ado.`);
			}
			r.push(`The two of you jackhammer in and out of ${eventSlave.slaveName}'s ass without mercy; the poor anal whore does ${his} best to relax, but two phalli at once is a lot, even for ${him}. ${He}'s only allowed an anal respite when ${his} sphincter is really fucked out and there's little butthole fun to be had from ${him} any longer. ${He} has become <span class="devotion inc">more submissive to you,</span> and ${S.HeadGirl.slaveName} <span class="devotion inc">enjoyed</span> taking a break to fuck ${him} with you.`);
			eventSlave.devotion += 4;
			S.HeadGirl.devotion += 4;
			seX(eventSlave, "anal", V.PC, "penetrative");
			seX(eventSlave, "anal", S.HeadGirl, "penetrative");
			if (canImpreg(eventSlave, V.PC)) {
				knockMeUp(eventSlave, 5, 0, -1);
			}
			if (canImpreg(eventSlave, S.HeadGirl)) {
				knockMeUp(eventSlave, 5, 0, V.HeadGirlID);
			}
			return r;
		}
	}
};
