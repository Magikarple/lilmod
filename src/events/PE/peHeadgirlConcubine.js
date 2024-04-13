App.Events.PEHeadgirlConcubine = class PEHeadgirlConcubine extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => !!S.HeadGirl,
			() => !!S.Concubine,
			() => fuckSlavesLength() > 1,
			() => canTalk(S.Concubine),
			() => canSee(S.Concubine),
			() => canHear(S.Concubine),
			() => S.Concubine.fetish !== Fetish.MINDBROKEN,
			() => canHold(S.Concubine),
			() => canWalk(S.Concubine),
		];
	}

	actorPrerequisites() {
		return [];
	}

	execute(node) {
		let r = [];
		const {
			He, His,
			he, him, his, girl
		} = getPronouns(S.HeadGirl);
		const belly = bellyAdjective(S.HeadGirl);

		const {
			His2, He2,
			his2, he2, him2, wife2, girl2
		} = getPronouns(S.Concubine).appendSuffix("2");
		const bellyCon = bellyAdjective(S.Concubine);

		const {
			HeA,
			heA, hisA, himA, himselfA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.drawEventArt(node, [S.HeadGirl, S.Concubine]);

		const buttReady = (slave) => canDoAnal(slave) && slave.anus > 0;
		const vagReady = (slave) => canDoVaginal(slave) && slave.vagina > 0;

		const canDo = {
			anal: {
				HG: buttReady(S.HeadGirl),
				conc: buttReady(S.Concubine),
			},
			vaginal: {
				HG: vagReady(S.HeadGirl),
				conc: vagReady(S.Concubine),
			}
		};


		r.push(`You wake up one morning to find`, contextualIntro(V.PC, S.HeadGirl, true), `and`, contextualIntro(S.HeadGirl, S.Concubine, true), `waiting next to your bed. It's immediately obvious that they both have a minor item of business for you, since nothing was urgent enough to wake you early, and they evidently both came in to catch you at your normal hour of rising. They're kneeling side by side next to the`);
		if (S.HeadGirl.boobs >= 10000 && S.Concubine.boobs >= 10000) {
			r.push(`bed (a position that smashes their massive breasts together on one side),`);
		} else if (S.HeadGirl.belly >= 45000 && S.Concubine.belly >= 45000) {
			r.push(`bed (a position that forces their swollen middles to compete for space),`);
		} else if (S.HeadGirl.butt > 5 && S.Concubine.butt > 5) {
			r.push(`bed (a position that smashes their massive asses together on one side),`);
		} else {
			r.push(`bed,`);
		}
		r.push(`and it's also obvious that they've been filling the few minutes they've been waiting for you to wake up by making out. Their lips are moist, ${S.Concubine.slaveName}'s ${S.Concubine.skin} cheeks are a little flushed, and there's even a little unnoticed strand of saliva running from ${his2} mouth to ${S.HeadGirl.slaveName}'s. They both look at you expectantly, wondering whether to speak up or save their questions for after you take a moment to get ready for your day.`);

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Get right to work`, work));
		choices.push(new App.Events.Result(`Tease them while they meet with you`, tease));
		if (
			(canDo.anal.HG || canDo.vaginal.HG) &&
			(canDo.anal.conc || canDo.vaginal.conc) &&
			V.PC.belly + S.Concubine.belly < 50000 &&
			V.PC.belly + S.HeadGirl.belly < 50000
		) {
			choices.push(new App.Events.Result(`Double penetrate them while they meet with you`, double));
		}
		App.Events.addResponses(node, choices);

		function work() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You didn't get to where you are by lying around on the job. You`);
			if (V.PC.belly < 5000) {
				r.push(`spring`);
			} else if (V.PC.belly < 10000) {
				r.push(`pull yourself`);
			} else {
				r.push(`slowly slip your gravid bulk`);
			}
			r.push(`out of bed and head straight towards your office and its desk to get some work done with your first rush of morning energy before your ablutions. Your Head Girl and Concubine follow along behind you; ${S.HeadGirl.slaveName} does ${his} best to keep up, because the sight of your`);

			if (S.HeadGirl.fetish === "pregnancy" && V.PC.belly >= 10000) {
				r.push(`increasingly large baby bump and motherly waddle`);
			} else if (S.HeadGirl.fetish === "cumslut" && V.PC.balls >= 20) {
				r.push(`over-burdened scrotum in motion as you walk`);
			} else if (S.HeadGirl.attrXX > 65 && S.HeadGirl.attrXY > 65 && V.PC.dick !== 0 && (V.PC.boobs >= 650 || V.PC.title === 0 || V.PC.vagina !== -1)) {
				r.push(`dangling penis`);
				if (V.PC.boobs >= 650) {
					r.push(`and bouncing boobs`);
				} else if (V.PC.vagina !== -1) {
					r.push(`and a hint of the pussy under it`);
				} else {
					r.push(`on such a feminine body`);
				}
				r.push(`in motion as you walk`);
			} else if (S.HeadGirl.attrXY > 65) {
				if (V.PC.dick !== 0) {
					r.push(`dangling penis`);
				} else if (V.PC.title === 1) {
					r.push(`masculine body nude`);
				} else {
					r.push(`beloved body nude`);
				}
				r.push(`in motion as you walk`);
			} else if (S.HeadGirl.attrXX > 65) {
				if (V.PC.boobs >= 300) {
					if (V.PC.boobs >= 1400) {
						r.push(`huge boobs from behind`);
					} else {
						r.push(`bare boobs`);
					}
				} else if (V.PC.vagina !== -1 && V.PC.dick === 0) {
					r.push(`bare pussy`);
				} else if (V.PC.vagina !== -1 && V.PC.dick !== 0) {
					r.push(`bare pussy under your maleness`);
				} else if (V.PC.title === 0) {
					r.push(`feminine body`);
				} else {
					r.push(`beloved body nude`);
				}
				r.push(`in motion as you walk`);
			} else {
				r.push(`beloved body nude in motion as you walk`);
			}
			r.push(`is something ${he} openly enjoys, while ${S.Concubine.slaveName} at least tries to be a little more modest. You sit down at your desk, taking in the situation in your domain at a glance as ${V.assistant.name}`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`springs into monstrous life on the glass desktop, eyes flashing and hair writhing.`);
					break;
				case "shemale":
					r.push(`pops up on the glass desktop, helicoptering ${hisA} dick while ${heA} waits for instructions.`);
					break;
				case "amazon":
					r.push(`appears to smash through the glass desktop, landing in a crouch to wait for orders.`);
					break;
				case "businesswoman":
					r.push(`appears on the glass desktop, sitting primly in ${hisA} own chair and waiting for instructions.`);
					break;
				case "fairy":
					r.push(`appears on the glass desktop, pressing ${hisA} face against the screen.`);
					break;
				case "pregnant fairy":
					r.push(`appears on the glass desktop, gingerly pressing ${hisA} face and belly against the screen.`);
					break;
				case "goddess":
					r.push(`gleams into existence on the glass desktop, reclining in a glow of maternal glory while ${heA} waits for direction.`);
					break;
				case "hypergoddess":
					r.push(`gleams into existence on the glass desktop, shifting ${hisA} gravid bulk so that it rests firmly on your desk.`);
					break;
				case "loli":
					r.push(`appears on the glass desktop, facing away from you. ${HeA} spins around with a start, a finger up ${hisA} nose, before quickly brushing ${himselfA} off and pretending ${heA} wasn't doing anything.`);
					break;
				case "preggololi":
					r.push(`appears on the glass desktop, idly stroking ${hisA} pregnancy as ${heA} awaits your command.`);
					break;
				case "schoolgirl":
					r.push(`appears on the glass desktop, sitting in ${hisA} own chair and waiting for instructions with ${hisA} legs spread a little wide for such a short skirt.`);
					break;
				case "angel":
					r.push(`appears on the glass desktop, spreads ${hisA} wings and stretches before taking a seat and waiting for instructions.`);
					break;
				case "cherub":
				case "imp":
					r.push(`flutters into view on the glass desktop, hovering above the ground while awaiting instructions.`);
					break;
				case "incubus":
					r.push(`appears on the glass desktop, idly stroking ${hisA} erection and trying to catch your attention.`);
					break;
				case "succubus":
					r.push(`appears on the glass desktop and presses ${hisA} tits against the screen.`);
					break;
				case "witch":
					r.push(`suddenly appears on the glass desktop; ${heA} gasps and covers ${himselfA} when ${heA} realizes ${hisA} clothes didn't teleport with ${himA}.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`slowly coalesces together to form ${hisA} usual feminine figure and standing their blankly waiting for instruction.`);
					break;
				default:
					r.push(`appears as a glowing icon on the glass desktop, awaiting instructions.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You look at ${S.HeadGirl.slaveName}, standing across the desk from you, and ${he} takes the cue and goes first. ${He} asks your permission to make a couple of last-minute changes to slaves' assignments for the day, and you ask about a couple of minor efficiency issues before giving ${him} the go ahead. Meanwhile, ${S.Concubine.slaveName} kneels beside your chair, resting ${his2}`);
			if (S.Concubine.bald === 0 && S.Concubine.hLength > 0) {
				r.push(S.Concubine.hColor);
			} else {
				r.push(`smooth`);
			}
			r.push(`head on your knee, ${his2}`);
			if (S.Concubine.dick > 8) {
				r.push(`limp, monstrous cock resting softly against one of your ankles.`);
			} else if (S.Concubine.boobs > 10000) {
				r.push(`titanic udders a nice cushion against your calves.`);
			} else if (S.Concubine.weight > 30) {
				r.push(`soft body cushioning nicely against your leg.`);
			} else if (S.Concubine.belly >= 100000) {
				r.push(`${bellyCon} belly resting warmly against your leg.`);
			} else if (S.Concubine.boobs > 1000) {
				r.push(`heavy breast resting against your calf on that side.`);
			} else {
				r.push(`chest warm against your calf on that side.`);
			}
			r.push(`${He2} places a`);
			if (S.Concubine.muscles > 50) {
				r.push(`strong`);
			} else {
				r.push(`soft`);
			}
			r.push(`hand on the inside of your shin and hugs your lower leg, sensual, but companionable rather than sexually insistent.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`Your Head Girl exits, performing the proper formalities and then hurrying off to make sure the reassigned slaves get going. As ${he} withdraws ${he}`);
			if (S.HeadGirl.relationship <= -2) {
				r.push(`has eyes only for you; ${he}`);
			} else if (S.HeadGirl.relationship === -1) {
				r.push(`gives ${S.Concubine.slaveName} a look up and down, which ${his} slutty nature obliges ${him} to give everyone; then ${he}`);
			} else if (S.HeadGirl.relationshipTarget === V.ConcubineID) {
				if (S.HeadGirl.relationship === 1) {
					r.push(`gives ${his} friend ${S.Concubine.slaveName} a smile; then ${he}`);
				} else if (S.HeadGirl.relationship === 2) {
					r.push(`gives ${his} best friend ${S.Concubine.slaveName} a smile and a little wave; then ${he}`);
				} else if (S.HeadGirl.relationship === 3) {
					r.push(`gives ${his} fuckbuddy ${S.Concubine.slaveName} a flirty wink; then ${he}`);
				} else if (S.HeadGirl.relationship === 4) {
					r.push(`blows ${his} lover ${S.Concubine.slaveName} a kiss; then ${he}`);
				} else {
					r.push(`mouths "I love you" at ${his} ${wife2} ${S.Concubine.slaveName}; then ${he}`);
				}
			}
			switch (S.HeadGirl.fetish) {
				case "submissive":
					r.push(`catches ${his} lower lip behind ${his} teeth and gives you a blushing, sexually submissive look`);
					break;
				case "cumslut":
					if (V.PC.dick !== 0) {
						r.push(`focuses on your cock`);
					} else {
						r.push(`looks you in the eye`);
					}
					r.push(`and licks ${his} lips lasciviously`);
					break;
				case "humiliation":
					r.push(`flashes you and blushes artfully`);
					break;
				case "buttslut":
					if (canDoAnal(S.HeadGirl)) { // TODO: do we care about virginity?
						r.push(`cocks ${his} hips, pulls one buttock aside, and winks ${his} asshole in your direction`);
					} else {
						r.push(`looks you in the eye and gives ${his} booty a slap`);
					}
					break;
				case "boobs":
					r.push(`looks you in the eye and gives ${his} boobs a little bounce`);
					break;
				case "pregnancy":
					r.push(`looks you in the eye and traces a hand across ${his} ${belly} belly`);
					break;
				case "dom":
					r.push(`gives you a cheerful, sexually challenging wink`);
					break;
				case "sadist":
					r.push(`gives you a significant glance, as between sadists,`);
					break;
				case "masochist":
					r.push(`looks at you and gives ${his} own butt a light slap`);
					break;
				default:
					r.push(`looks at you and adds a bit of extra sway to ${his} hips`);
			}
			r.push(`on ${his} way out the door. When ${he}'s gone, your Concubine speaks up from ${his2} adoring embrace of your leg. ${He2} asks a little aesthetic question about one of your other bedslaves, ${his2}`);
			if (S.Concubine.voice < 2) {
				r.push(`deep voice rumbling against your knee.`);
			} else if (S.Concubine.voice > 2) {
				r.push(`high voice humming against your knee.`);
			} else {
				r.push(`feminine voice purring against your knee.`);
			}
			r.push(`You chat with ${him2} about how you'd like the bedslave to look and act, ideally, and do other work while running your fingers`);
			if (S.Concubine.bald === 0 && S.Concubine.hLength > 0) {
				r.push(`through your Concubine's`);
				if (S.Concubine.hLength < 10) {
					r.push(`short`);
				}
				r.push(`hair.`);
			} else {
				r.push(`along your Concubine's`);
				if (S.Concubine.bald === 1) {
					r.push(`bald`);
				} else {
					r.push(`shaved`);
				}
				r.push(`head.`);
			}
			r.push(`Your Head Girl's confident assistance managing your chattel and your Concubine's devoted comfort as you work allows you to <span class="cash inc">be unusually productive</span> all morning.`);
			cashX(5000, "event", S.HeadGirl);

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function tease() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell them to go ahead, ${S.HeadGirl.slaveName} first, but you flip the sheet back and pat the soft mattress on either side of you while you do. They laugh and clamber on up, ${S.HeadGirl.slaveName} first, and ${he} manages to drag a ${S.HeadGirl.nipples} nipple across your`);
			if (V.PC.boobs >= 300) {
				r.push(`own bare breasts`);
			} else if (V.PC.title === 0) {
				r.push(`flat chest`);
			} else {
				r.push(`chest`);
			}
			r.push(`as ${he}`);
			if (V.PC.belly >= 10000 || S.HeadGirl.boobs > 10000 || S.HeadGirl.belly >= 5000 || S.HeadGirl.dick > 20 || S.HeadGirl.balls > 20) {
				r.push(`struggles to get`);
			} else {
				r.push(`climbs`);
			}
			r.push(`over you. Once ${he}'s situated under the crook of your arm,`);
			if (S.HeadGirl.boobs > 25000) {
				r.push(`the huge weight of ${his} boobs pressing against your ribcage,`);
			} else if (S.HeadGirl.belly >= 10000) {
				r.push(`the huge weight of ${his} ${belly} middle pressing against your body,`);
			} else if (S.HeadGirl.dick > 4 && canAchieveErection(S.HeadGirl)) {
				r.push(`which presses ${his} absurd erection against your hip,`);
			} else if (S.HeadGirl.dick > 5) {
				r.push(`which leaves ${his} absurd dick resting across your lap,`);
			} else if (S.HeadGirl.energy > 95) {
				r.push(`making the eager heat between the nympho's legs quite noticeable against your hip,`);
			} else {
				r.push(`${his} body warm against you,`);
			}
			r.push(`${he} clears ${his} throat and asks your permission to make a couple of last-minute changes to slaves' assignments for the day.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`As ${he} did so, you were encircling your`);
			if (girl === girl2) {
				r.push(`${girl}s`);
			} else {
				r.push(`lovers`);
			}
			r.push(`in your`);
			if (FutureSocieties.isActive('FSPhysicalIdealist')) {
				r.push(`powerful arms.`);
			} else if (V.PC.title === 1) {
				r.push(`dominant grip.`);
			} else {
				r.push(`loving grip.`);
			}
			r.push(`Cupping your Head Girl's butt in your left hand and your Concubine's in your right, you give them a good squeeze as ${S.HeadGirl.slaveName} finishes ${his} question. ${His} voice rises cutely as your marauding hand moves over the`);
			if (S.HeadGirl.butt > 10) {
				r.push(`endless expanse of ${his} backside. ${He} manages to finish, but trails off into a groan, the`);
				if (Math.floor(S.HeadGirl.buttImplant / S.HeadGirl.butt) > .60) {
					r.push(`firm`);
				} else {
					r.push(`soft`);
				}
				r.push(`flesh quivering against your palm.`);
			} else {
				r.push(`place between ${his}`);
				if (S.HeadGirl.butt > 6) {
					r.push(`huge`);
				} else if (S.HeadGirl.butt > 3) {
					r.push(`healthy`);
				} else {
					r.push(`cute`);
				}
				r.push(`buttocks and you slowly`);
				if (canDoAnal(S.HeadGirl)) {
					r.push(`press a single malicious finger in against ${his}`);
					if (S.HeadGirl.anus > 2) {
						r.push(`loose asspussy.`);
					} else if (S.HeadGirl.butt > 0) {
						r.push(`practiced asshole.`);
					} else {
						r.push(`virgin pucker.`);
					}
					r.push(`${He} manages to finish, but trails off into a groan, the warm, crinkled skin spasming against the teasing digit.`);
				} else {
					r.push(`trace the perimeter of ${his} chastity. ${He} manages to finish, but trails off into a groan, ${his} rump tightening around the invading hand.`);
				}
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`${S.Concubine.slaveName} laughs at ${him} and asks ${his2} own question, a little aesthetic question about one of your other bedslaves, but something you like to exercise artistic control over. ${His2} giggling is cut off as ${he2} has to concentrate on getting ${his2} words out as you use two fingers to massage and tease the sensitive skin between ${his2} ass and`);
			if (S.Concubine.vagina > -1) {
				r.push(`the start of ${his2} cunt.`);
			} else if (S.Concubine.scrotum > 0) {
				r.push(`${his2} ballsack.`);
			} else {
				r.push(`the base of ${his2} dick.`);
			}
			r.push(`It's ${S.HeadGirl.slaveName}'s turn to laugh, which ${he} does throatily, ${his} warm breath gusting deliciously across your`);
			if (V.PC.boobs >= 300 || V.PC.title === 0) {
				r.push(`hardening nipples.`);
			} else {
				r.push(`pecs.`);
			}
			r.push(Spoken(S.HeadGirl, `"See, it's not easy,"`));
			r.push(`${he} breathes across you at your Concubine.`);
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`They soon get their revenge as you give them their orders, though, moving their expert hands between your legs to give you a handjob. They do it cooperatively as you continue to play with them, letting you enjoy the delightful sensation of`);
			if (V.PC.dick !== 0) {
				r.push(`two hands working your shaft while`);
				if (V.PC.vagina !== -1) {
					r.push(`another massages your petals and a fourth delves two fingers inside you.`);
				} else {
					r.push(`another tickles your frenulum and a fourth massages your balls.`);
				}
			} else {
				r.push(`a hand massaging your petals on either side while another delves two fingers inside you and a fourth pleasures your clit.`);
			}
			r.push(`They crane their necks to rain kisses on your chin, neck,`);
			if (V.PC.boobs >= 300) {
				r.push(`breasts, and nipples,`);
			} else if (V.PC.title === 0) {
				r.push(`and nipples,`);
			} else {
				r.push(`and chest,`);
			}
			r.push(`and on each other's mouths. You`);
			if (V.PC.belly < 5000) {
				r.push(`spring`);
			} else if (V.PC.belly < 10000) {
				r.push(`pull yourself`);
			} else {
				r.push(`slowly tip your gravid bulk`);
			}
			r.push(`out of bed when you're satisfied, pulling your leadership with you towards the shower, and they <span class="trust inc">trustingly bounce up to follow.</span>`);
			S.HeadGirl.trust += 4;
			S.Concubine.trust += 4;
			seX(S.HeadGirl, "oral", S.Concubine, "oral");

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function double() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You sit up and order ${S.HeadGirl.slaveName} up onto the bed, on ${his} back, and while ${he}'s`);
			if (S.HeadGirl.energy > 95) {
				r.push(`eagerly obeying,`);
			} else {
				r.push(`obediently getting situated,`);
			}
			r.push(`you tell ${S.Concubine.slaveName} to ride ${him}, reverse cowgirl. ${He2} straddles your Head Girl,`);
			if (S.Concubine.butt > 6) {
				r.push(`using ${his2} hands to situate ${his2} huge buttocks.`);
			} else if (S.Concubine.belly >= 10000) {
				r.push(`making sure ${his2} ${bellyCon} belly is comfortably positioned.`);
			} else if (S.Concubine.boobs > 4000) {
				r.push(`making ${his2} heavy boobs sway deliciously.`);
			} else {
				r.push(`carefully situating ${his2} legs astride ${S.HeadGirl.slaveName}'s hips.`);
			}
			r.push(`You plant a hard kiss on ${S.Concubine.slaveName}'s mouth, pressing ${him2} backwards`);
			if (S.HeadGirl.belly >= 10000) {
				r.push(`into ${S.HeadGirl.slaveName}'s taut belly`);
			}
			r.push(`as you maneuver yourself into place${(V.PC.dick === 0) ? " and don a strap-on, since there isn't enough space for tribbing to work here" : ""}.`);
			if (canDo.vaginal.conc) {
				/* this is up here to give the PC priority on pregnancy */
				if (canImpreg(S.Concubine, V.PC)) {
					knockMeUp(S.Concubine, 10, 0, -1);
				}
				seX(S.Concubine, "vaginal", V.PC);
				r.push(`${He2} moans into you as ${he2} feels you run`);
				if (V.PC.dick === 0) {
					r.push(`the cool head of the phallus`);
				} else {
					r.push(`your cockhead`);
				}
				r.push(`along ${his2}`);
				if (S.Concubine.labia > 0) {
					r.push(`generous`);
				}
				r.push(`labia before plunging it inside ${him2}. Getting the idea, ${S.HeadGirl.slaveName}`);
				if (canPenetrate(S.HeadGirl)) {
					if (canDo.anal.conc) {
						if (S.HeadGirl.dick - S.Concubine.anus > 2) {
							r.push(`gently pushes ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine's anus will be a little tight around ${his} imposing dick.`);
						} else if (S.HeadGirl.dick - S.Concubine.anus > 0) {
							r.push(`pushes ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine can take ${his} dick without too much trouble.`);
						} else {
							r.push(`shoves ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine can take ${his} dick with ease.`);
						}
						if (V.PC.dick !== 0) {
							r.push(`You feel the penetration through ${S.Concubine.slaveName}'s vaginal walls, an incredible sensation.`);
						}
						if (canImpreg(S.Concubine, S.HeadGirl)) {
							knockMeUp(S.Concubine, 10, 1, S.HeadGirl.ID);
						}
						seX(S.Concubine, "anal", V.PC);
						seX(S.Concubine, "anal", S.HeadGirl);
					} else {
						r.push(`gently eases ${his} cock in beside you.`);
						if (V.PC.dick !== 0) {
							r.push(`The added friction against you in ${S.Concubine.slaveName}'s vagina feels incredible.`);
						}
						seX(S.Concubine, "vaginal", V.PC);
						seX(S.Concubine, "vaginal", S.HeadGirl);
						if (canImpreg(S.Concubine, S.HeadGirl)) {
							knockMeUp(S.Concubine, 10, 0, S.HeadGirl.ID);
						}
					}
				} else {
					r.push(`slides a hand down and`);
					if (canDo.anal.conc) {
						if (S.Concubine.anus > 3) {
							r.push(`fists ${S.Concubine.slaveName}'s loose ass, since that's what it takes to fill your Concubine's gaping asspussy.`);
						} else if (S.Concubine.anus === 3) {
							r.push(`starts to fuck ${S.Concubine.slaveName}'s soft anus with three fingers.`);
						} else if (S.Concubine.anus === 2) {
							r.push(`starts to fuck ${S.Concubine.slaveName}'s asspussy with two fingers.`);
						} else {
							r.push(`starts to fuck ${S.Concubine.slaveName}'s tight little backdoor with a finger.`);
						}
						if (V.PC.dick !== 0) {
							r.push(`You feel the penetration through ${S.Concubine.slaveName}'s vaginal walls, an incredible sensation.`);
						}
						seX(S.Concubine, "anal", V.PC);
					} else {
						r.push(`gently eases a few fingers in beside you.`);
						if (V.PC.dick !== 0) {
							r.push(`The added sensation in ${S.Concubine.slaveName}'s vagina feels incredible.`);
						}
						seX(S.Concubine, "vaginal", V.PC);
					}
				}
			} else {
				/* this is up here to give the PC priority on pregnancy */
				if (canImpreg(S.Concubine, V.PC)) {
					knockMeUp(S.Concubine, 10, 1, -1);
				}
				seX(S.Concubine, "anal", V.PC);
				seX(S.Concubine, "anal", S.HeadGirl);
				r.push(`Getting the idea, ${S.HeadGirl.slaveName}`);
				if (canPenetrate(S.HeadGirl)) {
					if (S.HeadGirl.dick - S.Concubine.anus > 2) {
						r.push(`gently pushes ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine's anus will be a little tight around ${his} imposing dick.`);
					} else if (S.HeadGirl.dick - S.Concubine.anus > 0) {
						r.push(`pushes ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine can take ${his} dick without too much trouble.`);
					} else {
						r.push(`shoves ${his} cock up ${S.Concubine.slaveName}'s ass, since ${he} knows your Concubine can take ${his} dick with ease.`);
					}
					r.push(`Then ${he} grabs ${S.Concubine.slaveName}`);
					if (!hasAnyLegs(S.Concubine)) {
						r.push(`by the stumps`);
					} else {
						r.push(`behind the ${hasBothLegs(S.Concubine) ? "knees" : "knee"}`);
					}
					r.push(`and spreads ${his2}`);
					if (hasBothLegs(S.Concubine)) {
						r.push(`legs`);
					} else {
						r.push(`cheeks`);
					}
					r.push(`as far as they'll go, rotating ${his2} hips to position ${him2} for another phallus up the butt.`);
					if (canImpreg(S.Concubine, S.HeadGirl)) {
						knockMeUp(S.Concubine, 10, 1, S.HeadGirl.ID);
					}
				} else {
					r.push(`slides a hand down and`);
					if (S.Concubine.anus > 3) {
						r.push(`fists ${S.Concubine.slaveName}'s loose ass, since that's what it takes to fill your Concubine's gaping asspussy.`);
					} else if (S.Concubine.anus === 3) {
						r.push(`starts to fuck ${S.Concubine.slaveName}'s soft anus with three fingers.`);
					} else if (S.Concubine.anus === 2) {
						r.push(`starts to fuck ${S.Concubine.slaveName}'s asspussy with two fingers.`);
					} else {
						r.push(`starts to fuck ${S.Concubine.slaveName}'s tight little backdoor with a finger.`);
					}
					r.push(`Then ${he} grabs ${S.Concubine.slaveName} behind a knee with ${his} other hand and rotates ${his2} hips to position ${him2} for additional anal penetration.`);
				}
				r.push(`Your Concubine shivers and moans as ${his2} sphincter accommodates`);
				if (V.PC.dick !== 0) {
					r.push(`your cock,`);
				} else {
					r.push(`the strap-on,`);
				}
				r.push(`too.`);
			}
			App.Events.addParagraph(frag, r);
			r = [];
			r.push(`You start to fuck ${him2}, and then ask ${him2} what ${he2} needed from you. The poor ${girl2} has to concentrate hard to remember why ${he2}'s here through the waterfall of sensations, but ${he2} manages it eventually, gasping out a little aesthetic question about one of your other bedslaves. You give ${him2} ${his2} answer and make ${him2} repeat it back. When you're satisfied, you grab ${his2}`);
			if (!hasAnyLegs(S.Concubine)) {
				r.push(`hips`);
			} else {
				r.push(hasBothLegs(S.Concubine) ? `ankles` : `ankle`);
			}
			r.push(`and pull them up, sliding ${him2} off your`);
			if (V.PC.dick !== 0) {
				r.push(`pole`);
			} else {
				r.push(`strap-on`);
			}
			r.push(`and ${S.HeadGirl.slaveName}'s`);
			if (canPenetrate(S.HeadGirl)) {
				r.push(`dick`);
			} else {
				r.push(`penetrating fingers`);
			}
			r.push(`with a lovely lewd noise. After appreciating the sight of ${his2} well-fucked`);
			if (canDo.anal.conc && canDo.vaginal.conc) {
				r.push(`holes,`);
			} else {
				r.push(`hole,`);
			}
			r.push(`you swing ${his2} ass over and deposit it on the bed, producing a grunt as the drop forces the wind out of ${him2}. Grabbing your Head Girl in turn, you yank ${him} towards you, give the giggling slave a kiss, seize ${his}`);
			if (S.HeadGirl.hips > 2) {
				r.push(`breeding`);
			} else if (S.HeadGirl.weight > 95) {
				r.push(`padded`);
			} else if (S.HeadGirl.weight > 10) {
				r.push(`plush`);
			} else if (S.HeadGirl.hips > 1) {
				r.push(`broad`);
			} else if (S.HeadGirl.hips >= 0) {
				r.push(`curvy`);
			} else {
				r.push(`trim`);
			}
			r.push(`hips and lift ${him} onto ${S.Concubine.slaveName}'s lap. ${He} takes`);
			if (canDo.vaginal.HG) {
				if (canDo.vaginal.conc) {
					if (canDo.anal.HG) {
						r.push(`${his} own double pounding, pussy and ass,`);
					} else {
						r.push(`${his} own double pounding,`);
					}
				} else {
					if (canDo.anal.HG) {
						r.push(`double penetration instead, since unlike your Concubine ${he} has two lower fuckholes,`);
					} else {
						r.push(`${his} own double pounding,`);
					}
				}
			} else {
				if (canDo.vaginal.HG) {
					r.push(`double anal instead, since unlike your Concubine`);
					if (S.HeadGirl.vagina === -1) {
						r.push(`${he} only has the one lower fuckhole,`);
					} else {
						r.push(`${his} pussy is off limits,`);
					}
				} else {
					r.push(`${his} own double anal pounding,`);
				}
			}
			r.push(`while taking ${his} turn getting instructions. ${He} manages to ask your permission to make a couple of last-minute changes to slaves' assignments for the day. Having thus given your leadership guidance, you jump up for a shower, crooking a finger to indicate that they should follow. They <span class="devotion inc">trail obediently after you,</span> a bit sore, their holes dripping`);
			if (S.HeadGirl.vagina > -1 || S.Concubine.vagina > -1) {
				if (V.PC.balls > 0 || S.HeadGirl.balls > 0 || S.Concubine.balls > 0) {
					r.push(`cum, pussyjuice, and lube.`);
				} else {
					r.push(`pussyjuice and lube.`);
				}
			} else {
				if (V.PC.balls > 0 || S.HeadGirl.balls > 0 || S.Concubine.balls > 0) {
					r.push(`cum and lube.`);
				} else {
					r.push(`lube.`);
				}
			}
			S.HeadGirl.devotion += 4;
			S.Concubine.devotion += 4;
			/* sex count cleanup for S.HeadGirl since the above block is not pretty */
			if (canDo.vaginal.HG) {
				if (canImpreg(S.HeadGirl, V.PC)) {
					knockMeUp(S.HeadGirl, 10, 0, -1);
				}
				seX(S.HeadGirl, "vaginal", V.PC);
				if (canPenetrate(S.Concubine)) {
					if (canDo.anal.HG) {
						if (canImpreg(S.HeadGirl, S.Concubine)) {
							knockMeUp(S.HeadGirl, 10, 1, V.ConcubineID);
						}
						seX(S.HeadGirl, "anal", S.Concubine);
					} else {
						if (canImpreg(S.HeadGirl, S.Concubine)) {
							knockMeUp(S.HeadGirl, 10, 0, V.ConcubineID);
						}
						seX(S.HeadGirl, "vaginal", S.Concubine);
					}
				} else {
					if (canDo.anal.HG) {
						seX(S.HeadGirl, "anal", V.PC);
					}
				}
			} else {
				if (canImpreg(S.HeadGirl, V.PC)) {
					knockMeUp(S.HeadGirl, 10, 1, -1);
				}
				seX(S.HeadGirl, "anal", V.PC);
				if (canPenetrate(S.Concubine)) {
					seX(S.HeadGirl, "anal", S.Concubine);
					if (canImpreg(S.HeadGirl, S.Concubine)) {
						knockMeUp(S.HeadGirl, 10, 1, V.ConcubineID);
					}
				}
			}

			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
