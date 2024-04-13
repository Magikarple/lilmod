App.Events.RECIMilf = class RECIMilf extends App.Events.BaseEvent {
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
				s => s.energy > 60,
				s => s.bodySwap === 0,
				s => (canDoAnal(s) || canDoVaginal(s)),
				canStand,
				canTalk,
				canHear,
				hasAnyArms,
				hasAnyLegs,
			]
		];
	}

	validSlave(slave) {
		return V.RECheckInIDs.some((a) => (a.ID === slave.ID && a.type === "MILF"));
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, hers, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say: say} = getEnunciation(eventSlave);
		const {womenP} = getSpokenPronouns(V.PC, eventSlave).appendSuffix('P');
		const belly = bellyAdjective(eventSlave);
		const desc = SlaveTitle(eventSlave);
		const hands = hasBothArms(eventSlave) ? "hands" : "hand";
		const legs = hasBothLegs(eventSlave) ? "legs" : "leg";
		const ankles = hasBothLegs(eventSlave) ? "ankles" : "ankle";

		V.RECheckInIDs.deleteWith((s) => s.ID === eventSlave.ID && s.type === "MILF");

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
		} else if (eventSlave.clit > 0) {
			t.push(`${his} clit is big enough to be visibly erect when ${he}'s willing and ready.`);
		} else if (canDoVaginal(eventSlave)) {
			t.push(`a sheen is visible on ${his} pussylips, and ${he}'s smiling hopefully at you.`);
		} else {
			t.push(`the scent of arousal fills the air, and ${he}'s smiling hopefully at you.`);
		}
		t.push(`Your inspections require the slave to offer each of ${his} body parts to your view, and when the routine reaches ${his} crotch,`);
		if (eventSlave.belly >= 600000) {
			t.push(`${he} obediently turns around, gingerly leans forward onto ${his} ${belly} middle, hikes`);
			if (hasBothLegs(eventSlave)) {
				t.push(`a`);
			} else {
				t.push(`${his}`);
			}
			t.push(`leg onto ${his} bulk, and displays ${his}`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`chastity caged dick.`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`erect cock pressing hard against ${his} underbelly.`);
			} else if (eventSlave.dick > 6) {
				t.push(`fat member against ${his} underbelly.`);
			} else if (eventSlave.dick > 0) {
				t.push(`poor flaccid member dangling pitifully against ${his} underbelly.`);
			} else if (eventSlave.labia > 0 && canDoVaginal(eventSlave)) {
				t.push(`pussy, whose lips are so generous that ${he}`);
				if (hasBothArms(eventSlave)) {
					t.push(`uses both hands`);
				} else {
					t.push(`uses ${his} hand`);
				}
				t.push(`to peel them apart.`);
			} else if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 1) {
					t.push(`nice big cunt, which ${he} spreads shamelessly for you.`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight pussy.`);
				} else {
					t.push(`virgin pussy.`);
				}
			} else {
				if (eventSlave.anus > 1) {
					t.push(`experienced anus, which ${he} winks shamelessly for you.`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight anus.`);
				} else {
					t.push(`virgin anus.`);
				}
			}
		} else if (eventSlave.belly >= 100000) {
			t.push(`${he} obediently turns around, steadies ${himself}, and leans forward to display ${his}`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`chastity caged dick`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`erect cock`);
			} else if (eventSlave.dick > 6) {
				t.push(`fat member`);
			} else if (eventSlave.dick > 0) {
				t.push(`poor flaccid member`);
			} else if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 1) {
					t.push(`nice big cunt, which ${he} spreads shamelessly for you,`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight pussy`);
				} else {
					t.push(`virgin pussy`);
				}
			} else {
				if (eventSlave.anus > 1) {
					t.push(`experienced anus, which ${he} winks shamelessly for you,`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight anus`);
				} else {
					t.push(`virgin anus`);
				}
			}
			t.push(`without ${his} ${belly} belly in the way.`);
		} else {
			t.push(`${he} obediently backs up to sit down on the couch, spread ${his} ${legs},`);
			if (eventSlave.belly >= 5000 || eventSlave.weight > 95) {
				t.push(`lift ${his} belly,`);
			}
			t.push(`and display ${his}`);
			if (eventSlave.chastityPenis === 1) {
				t.push(`chastity caged dick.`);
			} else if (canAchieveErection(eventSlave)) {
				t.push(`erect cock, which ${he} doesn't have to touch to keep upright.`);
			} else if (eventSlave.dick > 6) {
				t.push(`fat member, which takes ${his} entire hand to shove upright.`);
			} else if (eventSlave.dick > 0) {
				t.push(`poor flaccid member, which ${he} uses a thumb and forefinger to pull upright.`);
			} else if (eventSlave.labia > 0 && canDoVaginal(eventSlave)) {
				t.push(`pussy, whose lips are so generous that ${he}`);
				if (hasBothArms(eventSlave)) {
					t.push(`uses both hands`);
				} else {
					t.push(`uses ${his} hand`);
				}
				t.push(`to peel them apart.`);
			} else if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina > 1) {
					t.push(`nice big cunt, which ${he} spreads shamelessly for you.`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight pussy.`);
				} else {
					t.push(`virgin pussy.`);
				}
			} else {
				if (eventSlave.anus > 1) {
					t.push(`experienced anus, which ${he} winks shamelessly for you.`);
				} else if (eventSlave.vagina > 0) {
					t.push(`tight anus.`);
				} else {
					t.push(`virgin anus.`);
				}
			}
		}
		App.Events.addParagraph(node, t);

		t = [];
		t.push(`You often pepper slaves with questions during this inspection; it helps you gauge their mental state, and it's just as important to verbally inspect slaves' minds as it is to visually inspect their parts. You remember with sudden clarity what ${eventSlave.slaveName} was like when you acquired ${him}. ${He} seemed older then.`);
		if (eventSlave.faceImplant > 0) {
			t.push(`${His} face has been improved since then, of course, making ${him} a good deal prettier.`);
		}
		if (eventSlave.ageImplant > 0) {
			t.push(`The age lift ${he} received has certainly hidden some of the most evident signs of ${his} years.`);
		} else if (eventSlave.geneMods.NCS === 1) {
			t.push(`The artificially induced NCS is peeling back the years, as expected.`);
		} else if (eventSlave.visualAge < eventSlave.physicalAge) {
			t.push(`The age reducing creams ${he} uses have certainly hidden some of the most evident signs of ${his} years.`);
		}
		t.push(`Decent care, diet, and exercise have done wonders. But more than all of that trivial physical stuff, the sexual hunger visible in ${his} ${App.Desc.eyesColor(eventSlave)} makes ${him} look like a teenager. You ask ${him} if ${he} remembers what ${he} was like when you enslaved ${him}. ${He} hesitates, wondering how to answer, but decides that honesty is the best policy and ${say}s,`);
		t.push(Spoken(eventSlave, `"I remember it every day, ${Master}. I'm grateful. I didn't think of myself as too pretty, then."`));
		t.push(`${He} giggles.`);
		t.push(Spoken(eventSlave, `"Becoming a fuckslave really improved my self esteem.`));
		if (eventSlave.energy > 95) {
			t.push(Spoken(eventSlave, `I can't imagine going back to having as little sex as I used to have. It would be awful.`));
		} else if (eventSlave.fetish === "cumslut" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `I can't imagine going back to not sucking dicks all the time. It would be awful.`));
		} else if (eventSlave.fetish === "buttslut" && eventSlave.fetishStrength > 60) {
			t.push(Spoken(eventSlave, `I can't imagine going back to a life of so little assplay. It would be awful.`));
		} else {
			t.push(Spoken(eventSlave, `I didn't have much of a sex life back then either, not compared to now.`));
		}
		t.push(Spoken(eventSlave, `And, ${Master}."`));
		if (eventSlave.belly >= 600000) {
			t.push(`${He} shifts ${his} weight fully onto ${his} ${eventSlave.bellyPreg >= 2000 ? `pregnant` : `gravid`} swell, angling ${his} crotch upwards and showing off everything ${he} has.`);
		} else if (eventSlave.belly >= 100000) {
			t.push(`${He} arches ${his} back prettily and leans even further forward, ${his} ${eventSlave.bellyPreg >= 2000 ? `pregnant` : `gravid`} swell forcing ${his} ${legs} wide, showing off everything ${he} has.`);
		} else {
			t.push(`${He} arches ${his} back prettily and then scoots ${himself} down the couch cushions, taking ${his} ${hands} away from ${his} crotch to spread ${his} ${legs} even wider, showing off everything ${he} has.`);
		}
		t.push(Spoken(eventSlave, `"I didn't really appreciate being fucked by ${V.PC.title !== 0 ? `gorgeous` : `hot`} ${womenP} then, either. Not like I do now..."`));
		App.Events.addParagraph(node, t);


		App.Events.addResponses(node, [
			new App.Events.Result(`Then ${he} can appreciate a nice struggle fuck`, roughSex, virginityWarning()),
			new App.Events.Result(`Appreciate ${his} body`, gentleSex, virginityWarning()),
			new App.Events.Result(`Put the horny old ${girl} to work`, partyGirl, virginityWarningDouble()),
		]);

		function roughSex() {
			let virginityLoss = 0;
			let inHole = "";

			t = [];
			t.push(`When ${he}`);
			if (canSee(eventSlave)) {
				t.push(`sees`);
			} else {
				t.push(`hears`);
			}
			t.push(`you stand up from behind your desk`);
			if (V.PC.dick === 0) {
				t.push(`desk and pull on a strap-on,`);
			} else {
				t.push(`desk,`);
			}
			t.push(`${he} smiles invitingly at you and relaxes. But as you approach, ${he}`);
			if (canSee(eventSlave)) {
				t.push(`sees a dangerous glint in your eyes.`);
			} else {
				t.push(`hears a menacing cadence to your footstep.`);
			}
			t.push(`One corner of ${his} mouth flaws upward with anticipation, and ${he} plays along.`);
			if (eventSlave.belly < 600000) {
				if (eventSlave.belly >= 100000) {
					t.push(`${He} stumbles face first into the couch, managing to somehow end up with ${his}`);
				} else {
					t.push(`${He} immediately curls up into a ball on the couch, managing to end up with ${his}`);
				}
				if (eventSlave.weight > 30) {
					t.push(`fat ass squashed enticingly against the seat back.`);
				} else if (eventSlave.butt > 5) {
					t.push(`absurd ass squashed enticingly against the seat back.`);
				} else if (eventSlave.butt > 2) {
					t.push(`healthy ass pushed against the seat back.`);
				} else {
					t.push(`trim ass against the seat back.`);
				}
			}
			t.push(`${He} looks up at you with feigned terror and begs,`);
			t.push(Spoken(eventSlave, `"Please, ${Master}, I'm just an innocent little ${girl}. Please don't rape my poor little butt!"`));
			t.push(`You grab ${his} ${ankles} and`);
			if (eventSlave.belly >= 100000 || eventSlave.weight > 160) { // muscles check here!
				t.push(`pull yourself onto ${his}`);
			} else {
				t.push(`haul ${his}`);
			}
			if (eventSlave.weight > 160) {
				t.push(`rippling`);
			} else if (eventSlave.weight > 95) {
				t.push(`thick`);
			} else if (eventSlave.weight > 30) {
				t.push(`chubby`);
			} else if (eventSlave.muscles > 95) {
				t.push(`ripped`);
			} else if (eventSlave.muscles > 30) {
				t.push(`muscled`);
			} else if (eventSlave.weight > 10) {
				t.push(`plush`);
			} else if (eventSlave.muscles > 5) {
				t.push(`toned`);
			} else {
				t.push(`slender`);
			}
			if (eventSlave.belly >= 750000) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`grotesquely pregnant`);
				} else {
					t.push(`grotesquely inflated`);
				}
			} else if (eventSlave.belly >= 600000) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`dangerously pregnant`);
				} else {
					t.push(`dangerously distended`);
				}
			} else if (eventSlave.belly >= 450000) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`immensely pregnant`);
				} else {
					t.push(`immensely distended`);
				}
			} else if (eventSlave.belly >= 150000) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`massively pregnant`);
				} else {
					t.push(`massively distended`);
				}
			} else if (eventSlave.belly >= 120000) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`enormously pregnant`);
				} else {
					t.push(`greatly gravid`);
				}
			} else if (eventSlave.belly >= 10000) {
				if (eventSlave.bellyPreg > 3000) {
					t.push(`heavily pregnant`);
				} else if (eventSlave.bellyImplant > 3000) {
					t.push(`very gravid`);
				} else {
					t.push(`taut`);
				}
			} else if (eventSlave.belly >= 5000) {
				if (eventSlave.bellyPreg > 3000) {
					t.push(`very pregnant`);
				} else if (eventSlave.bellyImplant > 3000) {
					t.push(`gravid`);
				} else {
					t.push(`distended`);
				}
			} else if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg > 0) {
					t.push(`slightly pregnant`);
				} else if (eventSlave.bellyImplant > 0) {
					t.push(`slightly distended`);
				} else {
					t.push(`bloated`);
				}
			}
			t.push(`${eventSlave.skin}`);
			if (eventSlave.belly >= 100000 || eventSlave.weight > 160) {
				t.push(`body,`);
			} else {
				t.push(`body toward you, dragging ${him} across the couch,`);
				if (eventSlave.belly >= 5000) {
					t.push(`and then pin ${him},`);
				} else {
					t.push(`and then half-fall atop ${him},`);
				}
			}
			t.push(`pushing`);
			if (V.PC.dick === 0) {
				t.push(`the strap-on`);
			} else {
				t.push(`your hard cock`);
			}
			if (canDoVaginal(eventSlave) && (!canDoAnal(eventSlave) || eventSlave.anus === 0 || eventSlave.vagina > 0)) {
				t.push(`into the wriggling ${girl}'s`);
				if (eventSlave.vagina === 0) {
					t.push(`virgin`);
					virginityLoss = 1;
				}
				t.push(`pussy.`);
				inHole = "pussy";
			} else {
				t.push(`up the wriggling ${girl}'s`);
				if (eventSlave.anus === 0) {
					t.push(`virgin`);
					virginityLoss = 2;
				}
				t.push(`butt.`);
				inHole = "ass";
			}
			t.push(`${He} keeps begging and whining, but`);
			if (hasBothArms(eventSlave)) {
				t.push(`${he}'s managed to bring a hand under ${himself} and is`);
				if (eventSlave.belly >= 100000 || eventSlave.fetish === "boobs") {
					if (eventSlave.nipples === "fuckable") {
						t.push(`frantically fingering ${his} nipple.`);
					} else if (eventSlave.boobs >= 400) {
						t.push(`enthusiastically kneading ${his} breasts.`);
					} else {
						t.push(`frantically tweaking ${his} nipples.`);
					}
				} else if (canDoVaginal(eventSlave) && inHole === "ass" && eventSlave.dick === 0) {
					t.push(`schlicking away.`);
				} else if (eventSlave.chastityPenis && !canDoVaginal(eventSlave)) {
					t.push(`frantically rubbing ${his} taint.`);
				} else if (canAchieveErection(eventSlave)) {
					t.push(`jacking off to your rhythm.`);
				} else if (eventSlave.dick > 6) {
					t.push(`rubbing as much of ${his} engorged cock as ${he} can reach.`);
				} else if (eventSlave.dick > 0) {
					t.push(`rubbing ${his} submissive little bitch dick.`);
				} else {
					t.push(`massaging ${his} pubic mound, and what's beneath it, to your thrusts.`);
				}
			} else {
				t.push(`there's no stopping ${him} from grinding against you.`);
			}
			if ((inHole === "ass" && eventSlave.skill.anal > 30) || (inHole === "pussy" && eventSlave.skill.vaginal > 30)) {
				t.push(`${He} periodically manages to get`);
			} else {
				t.push(`${He} sometimes accidentally pulls`);
			}
			t.push(`${his}`);
			if (inHole === "ass") {
				if (eventSlave.anus > 2) {
					t.push(`loose`);
				} else if (eventSlave.anus > 1) {
					t.push(`practiced`);
				} else {
					t.push(`tight`);
				}
				t.push(`anus`);
			} else {
				if (eventSlave.vagina > 2) {
					t.push(`loose`);
				} else if (eventSlave.vagina > 1) {
					t.push(`practiced`);
				} else {
					t.push(`tight`);
				}
				t.push(`vagina`);
			}
			t.push(`off your thrusting`);
			if (V.PC.dick === 0) {
				t.push(`phallus,`);
			} else {
				t.push(`penis,`);
			}
			t.push(`but that just gives you the pleasure of forcing it`);
			if (inHole === "ass") {
				t.push(`up ${his} ass`);
			} else {
				t.push(`into ${his} cunt`);
			}
			t.push(`again to the accompaniment of pretended girlish protests. ${He} does ${his} best to maintain the pretense, but soon the best ${he} can come up with is a ridiculous`);
			if (inHole === "ass") {
				t.push(Spoken(eventSlave, `"${Master}, please don't make me come! Not from anal!"`));
			} else {
				t.push(Spoken(eventSlave, `"${Master}, don't cum in me! It's a dangerous day! I'll get pregnant!"`));
			}
			t.push(`${He}'s`);
			if (virginityLoss > 0) {
				t.push(`quite sore from`);
				if (virginityLoss === 2) {
					t.push(`<span class="virginity loss">losing ${his} anal cherry in such a rough way</span>`);
					eventSlave.anus = 1;
				} else {
					t.push(`<span class="virginity loss">${his} first time being so rough</span>`);
					eventSlave.vagina = 1;
				}
			} else {
				t.push(`a little sore,`);
			}
			t.push(`and winces stiffly when ${he}`);
			if (eventSlave.belly < 600000) {
				t.push(`gets up off the couch,`);
			} else {
				t.push(`shoves ${himself} back upright`);
			}
			t.push(`but shakes it off and <span class="devotion inc">gives you a kiss</span> with surprising shyness for a mature slave whose`);
			if (inHole === "ass") {
				t.push(`anus you just fucked.`);
				seX(eventSlave, "anal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 10, 1, -1);
				}
			} else {
				t.push(`pussy you just dominated.`);
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 10, 0, -1);
				}
			}
			eventSlave.devotion += 4;
			return t;
		}

		function gentleSex() {
			let inHole = "";

			t = [];
			t.push(`You stand up from behind your`);
			if (V.PC.dick === 0) {
				t.push(`desk, pull on a strap-on,`);
			} else {
				t.push(`desk`);
			}
			t.push(`and approach ${him}, appreciating ${his} gorgeous body,`);
			if (eventSlave.belly >= 600000) {
				t.push(`perfectly laid out across ${his} own bulk`);
			} else if (eventSlave.belly >= 100000) {
				t.push(`glowing with maternity and all stretched out`);
			} else {
				t.push(`all laid out across the couch`);
			}
			t.push(`for your perusal. When you reach ${him}, you hold out a hand for`);
			if (hasBothArms(eventSlave)) {
				t.push(`one of`);
			}
			t.push(`${hers}; ${he} takes it <span class="trust inc">trustingly,</span> ${his} grip`);
			if (eventSlave.muscles > 50) {
				t.push(`powerful and decisive.`);
			} else if (eventSlave.muscles > 30) {
				t.push(`strong and sure.`);
			} else if (eventSlave.weight > 160) {
				t.push(`excessively soft.`);
			} else if (eventSlave.muscles > 5) {
				t.push(`firm and warm.`);
			} else if (eventSlave.muscles < -95) {
				t.push(`almost nonexistent.`);
			} else if (eventSlave.muscles < -30) {
				t.push(`weak and submissive.`);
			} else {
				t.push(`soft and feminine.`);
			}
			t.push(`You pull ${him} up to kneel on the couch cushions, facing a mirrored wall of the room.`);
			if (canSee(eventSlave)) {
				t.push(`${He}'s treated to a view of ${his} own face`);
			} else {
				t.push(`Your treated to the sight of ${his} blind face`);
			}
			t.push(`as you`);
			if (V.PC.belly >= 100000) {
				t.push(`awkwardly`);
			} else {
				t.push(`gently`);
			}
			t.push(`penetrate ${him} from behind,`);
			if (V.PC.belly >= 100000) {
				t.push(`your massive baby bump rubbing erotically`);
			} else if (V.PC.belly >= 30000) {
				t.push(`your baby bump uncomfortably squished`);
			} else if (V.PC.belly >= 1500) {
				t.push(`holding the curve of your pregnancy`);
			} else if (V.PC.boobs >= 300) {
				t.push(`holding your`);
				if (V.PC.boobsImplant / V.PC.boobs >= .60) {
					t.push(`firm`);
				} else {
					t.push(`soft`);
				}
				t.push(`breasts hard`);
			} else if (V.PC.title === 1) {
				t.push(`holding your strong chest hard`);
			} else {
				t.push(`holding your flat chest hard`);
			}
			t.push(`against ${his}`);
			if (eventSlave.weight > 160) {
				t.push(`rippling backfat.`);
			} else if (eventSlave.weight > 130) {
				t.push(`soft backfat.`);
			} else if (eventSlave.weight > 95) {
				t.push(`soft back.`);
			} else if (eventSlave.muscles > 95) {
				t.push(`ripped back.`);
			} else if (eventSlave.muscles > 30) {
				t.push(`strong back.`);
			} else if (eventSlave.muscles > 5) {
				t.push(`toned back.`);
			} else {
				t.push(`warm back.`);
			}
			t.push(`Once you're seated in ${his}`);
			if (canDoVaginal(eventSlave) && (!canDoAnal(eventSlave) || eventSlave.anus === 0 || eventSlave.vagina > 0)) {
				if (eventSlave.vagina === 0) {
					t.push(`virgin`);
				}
				t.push(`womanhood,`);
				inHole = "pussy";
			} else {
				if (eventSlave.anus === 0) {
					t.push(`virgin`);
				}
				t.push(`anus,`);
				inHole = "ass";
			}
			t.push(`you let your hands rove across ${his}`);
			if (eventSlave.weight > 95) {
				t.push(`luscious`);
			}
			t.push(`body, resting your chin on one of ${his} shoulders to`);
			if (canSee(eventSlave)) { // height concerns!
				t.push(`watch the view with ${him}.`);
			} else {
				t.push(`get a better view of ${him}.`);
			}
			t.push(`You run your fingers`);
			if (eventSlave.hLength < 10) {
				t.push(`across ${his} scalp, eliciting a sigh.`);
			} else if (eventSlave.hLength < 50) {
				t.push(`through ${his} short hair and across ${his} scalp, eliciting a sigh.`);
			} else if (eventSlave.hLength < 100) {
				t.push(`all through ${his} long, luxurious hair.`);
			} else {
				t.push(`down the immense length of ${his} hair, bringing it around to cascade down`);
				if (eventSlave.boobs > 300) {
					t.push(`between ${his}`);
					if (eventSlave.belly >= 5000 || eventSlave.weight > 95) {
						t.push(`breasts and around ${his} stomach.`);
					} else {
						t.push(`breasts.`);
					}
				} else if (eventSlave.belly >= 5000 || eventSlave.weight > 95) {
					t.push(`${his} front and around ${his} stomach.`);
				} else {
					t.push(`${his} chest.`);
				}
			}
			t.push(`Your fingers`);
			if (eventSlave.faceShape === "cute" || eventSlave.weight > 97) {
				t.push(`caress ${his} soft cheeks,`);
			} else {
				t.push(`trace ${his} cheekbones,`);
			}
			if (eventSlave.weight > 130) {
				t.push(`the roll of ${his} extra chin,`);
			} else if (eventSlave.faceShape === "masculine") {
				t.push(`the chiseled cut of ${his} jaw,`);
			} else {
				t.push(`the line of ${his} jaw,`);
			}
			t.push(`and the`);
			if (eventSlave.lips > 95) {
				t.push(`dominant feature of ${his} face; ${his} immensely inflated lips.`);
			} else if (eventSlave.lips > 70) {
				t.push(`pouting prominence of ${his} huge lips.`);
			} else if (eventSlave.lips > 40) {
				t.push(`plush softness of ${his} plump lips.`);
			} else if (eventSlave.lips > 20) {
				t.push(`soft outline of ${his} pretty mouth.`);
			} else if (eventSlave.lips > 10) {
				t.push(`soft outline of ${his} cute lips.`);
			} else {
				t.push(`outline of ${his} mouth.`);
			}
			t.push(`Your hands`);
			if (eventSlave.boobs >= 25000) {
				t.push(`grope as much of ${his} unbelievable breasts as you can reach, before diving into the warm depths beneath ${his} immense udders.`);
			} else if (eventSlave.boobs >= 10000) {
				t.push(`struggle to heft ${his} bountiful breasts, and then allow themselves to be enveloped by the copious amount of flesh that makes up ${his} udders.`);
			} else if (eventSlave.boobs >= 2000) {
				t.push(`heft ${his} enormous breasts, and then bury themselves in the warm surroundings of the spaces between ${his} udders and ${his} ribcage.`);
			} else if (eventSlave.boobs >= 1000) {
				t.push(`heft ${his} big breasts measuringly.`);
			} else if (eventSlave.boobs >= 300) {
				t.push(`cup ${his} healthy breasts, feeling their weight.`);
			} else {
				t.push(`massage ${his} flat chest.`);
			}
			if (eventSlave.boobs >= 25000 || V.PC.belly >= 30000) {
				t.push(`It takes some effort but you manage to`);
			} else {
				t.push(`You`);
			}
			if (eventSlave.piercing.nipple.weight > 0) {
				t.push(`gently tug on ${his} nipple piercings, earning a gentle intake of breath.`);
			} else if (eventSlave.nipples === "huge") {
				t.push(`run a feather-light touch along ${his} long nipples, earning a gasp as they stiffen.`);
			} else {
				t.push(`run a feather-light touch over ${his} nipples, earning a gasp as they`);
				if (eventSlave.nipples !== "fuckable") {
					t.push(`stiffen.`);
				} else {
					t.push(`tighten.`);
				}
			}
			t.push(`You slide further down,`);
			if (eventSlave.bellyPreg >= 750000) {
				t.push(`running your hands across the countless infants that stretch ${his} uterus to its very limit.`);
			} else if (eventSlave.bellyPreg >= 600000) {
				t.push(`running your hands across the sides of ${his} belly, enjoying the bulging infants beneath your palms reacting to your touch.`);
			} else if (eventSlave.bellyPreg >= 450000) {
				t.push(`running your hands across the sides of ${his} belly, marveling at the feelings of life just beneath your palms.`);
			} else if (eventSlave.belly >= 60000) {
				t.push(`massaging the sides of ${his} sensitive midriff as you try to meet your hands around the imposing bump.`);
			} else if (eventSlave.belly >= 10000) {
				if (eventSlave.bellyPreg >= 2000) {
					t.push(`massaging the stretched skin of ${his} pregnancy before teasing ${his} popped navel.`);
				} else if (eventSlave.bellyImplant >= 2000) {
					t.push(`massaging the taut skin of ${his} belly before teasing ${his} popped navel.`);
				} else {
					t.push(`cupping the hugely bloated expanse of ${his} fluid-filled middle.`);
				}
			} else if (eventSlave.weight > 130) {
				t.push(`fondling and groping the soft mass of ${his} hugely fat belly.`);
			} else if (eventSlave.weight > 95) {
				t.push(`fondling ${his} fat belly and exploring its soft folds.`);
			} else if (eventSlave.belly >= 1500) {
				if (eventSlave.bellyPreg >= 2000) {
					t.push(`running your hands over the life growing inside ${him}.`);
				} else if (eventSlave.bellyImplant >= 2000) {
					t.push(`running your hands across the curve of ${his} stomach.`);
				} else {
					t.push(`enjoying the way ${his} fluid-filled belly jiggles in your hands.`);
				}
			} else if (eventSlave.muscles > 30) {
				t.push(`fondling ${his} tight abs and flanks.`);
			} else if (eventSlave.weight > 30) {
				t.push(`fondling ${his} plush belly and deep navel.`);
			} else if (eventSlave.bellySag > 0) {
				t.push(`rubbing and teasing ${his} loose stomach.`);
			} else {
				t.push(`rubbing ${his} flat stomach and trim sides.`);
			}
			t.push(`${He}'s so mesmerized by your manual tour of ${his} mature body that it's almost a surprise to ${him} when ${he} tips over into a strong orgasm that obliges you to grip ${him} and hold on while ${he} shakes.`);
			eventSlave.trust += 4;
			if (inHole === "ass") {
				if (eventSlave.anus === 0) {
					t.push(`${He}'ll remember <span class="virginity loss">losing ${his} anal virginity</span> in <span class="devotion inc">such an intimate way.</span>`);
					eventSlave.devotion += 4;
					eventSlave.anus++;
				}
				seX(eventSlave, "anal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 10, 1, -1);
				}
			} else {
				if (eventSlave.vagina === 0) {
					t.push(`${He}'ll remember <span class="virginity loss">losing ${his} virginity</span> in <span class="devotion inc">such an intimate way.</span>`);
					eventSlave.devotion += 4;
					eventSlave.vagina++;
				}
				seX(eventSlave, "vaginal", V.PC, "penetrative");
				if (canImpreg(eventSlave, V.PC)) {
					knockMeUp(eventSlave, 10, 0, -1);
				}
			}
			return t;
		}

		function partyGirl() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "a t-shirt");

			t = [];
			t.push(`You tell ${him} that you've hired ${him} out for a party hosted by a prominent citizen's son, home from college, and that ${he} should be saving it for that. ${He} promises that ${he} will,`);
			if (eventSlave.belly >= 600000) {
				t.push(`wiggling atop ${his} mass`);
			} else if (eventSlave.belly >= 100000) {
				t.push(`straightening up`);
			} else if (hasBothLegs(eventSlave)) {
				t.push(`relaxing ${his} leg`);
			} else {
				t.push(`bringing ${his} legs together again`);
			}
			t.push(`and clearly already imagining it. You check in on ${him} later, using the video feeds, and are treated to the sight of ${him} wearing a recently-acquired, too-tight t-shirt with an old world college's mascot on it as ${he}`);
			if ((canDoAnal(eventSlave) && eventSlave.anus === 0) || (canDoVaginal(eventSlave) && eventSlave.vagina === 0)) {
				t.push(`<span class="virginity loss">is deflowered</span> by`);
			} else {
				t.push(`rides`);
			}
			t.push(`a dick young enough to be ${his} son's. There's some drunken yelling, which ${he} responds to by blowing kisses and licking ${his}`);
			if (eventSlave.lips > 95) {
				t.push(`absurd`);
			} else if (eventSlave.lips > 70) {
				t.push(`huge`);
			} else if (eventSlave.lips > 40) {
				t.push(`plump`);
			} else if (eventSlave.lips > 20) {
				t.push(`pretty`);
			} else if (eventSlave.lips <= 10) {
				t.push(`thin`);
			}
			t.push(`lips until another cock finds its way into ${his} mouth. ${His} fee for the night is <span class="cash inc">substantial,</span> and the student's father attaches a note to the payment. Apparently ${he} got him too, and he's interested in hiring ${him} for a business meeting next month.`);
			cashX(500, "event", eventSlave);
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (eventSlave.vagina === 0) {
					eventSlave.vagina++;
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					knockMeUp(eventSlave, 10, 0, -2);
				}
			}
			if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", "public", "penetrative", 5);
				if (eventSlave.anus === 0) {
					eventSlave.anus++;
				}
				if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
					knockMeUp(eventSlave, 10, 1, -2);
				}
			}
			seX(eventSlave, "oral", "public", "penetrative", 5);
			return t;
		}

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				if (!canDoAnal(eventSlave) || eventSlave.anus === 0) {
					return `This option will take ${his} virginity`;
				}
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function virginityWarningDouble() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave) && eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take both ${his} virginities`;
			} else if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}
	}
};
