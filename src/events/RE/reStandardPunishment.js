App.Events.REStandardPunishment = class REStandardPunishment extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [[
			(s) => s.devotion >= -50,
			(s) => s.devotion <= 50,
			hasAnyArms,
			canMove
		]];
	}

	execute(node) {
		const slave = getSlave(this.actors[0]);
		const {
			He, His,
			he, his, him, himself
		} = getPronouns(slave);
		const {He2} = getPronouns(S.HeadGirl || {pronoun: 0}).appendSuffix("2");
		const {HeA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		/** @type {EventArtObject[]} */
		const artArray = [slave];
		if (V.HeadGirlID !== 0) {
			artArray.push(S.HeadGirl);
		} else {
			artArray.push("assistant");
		}
		App.Events.drawEventArt(node, artArray);

		const desc = SlaveTitle(slave);
		let r = [];

		const sinsArray = [];
		sinsArray.push("dawdling");
		if (canDoAnal(slave)) {
			if (slave.fetish !== "buttslut") {
				if (slave.anus !== 0) {
					sinsArray.push("anal reluctance");
				}
			}
		}
		if (canDoVaginal(slave)) {
			if (slave.vagina !== 0) {
				if (slave.fetish !== "pregnancy") {
					sinsArray.push("vaginal reluctance");
				}
			}
		}
		if (canTalk(slave)) {
			sinsArray.push("chatting");
		}
		if (V.universalRulesConsent === 0) {
			if (slave.energy <= 60) {
				sinsArray.push("slave refusal");
			}
		} else {
			if (slave.energy > 40) {
				if (slave.rules.release.slaves === 1 || App.Utils.hasFamilySex(slave)) {
					sinsArray.push("slave molestation");
				}
			}
		}

		r.push(App.UI.DOM.slaveDescriptionDialog(slave));

		const sin = sinsArray.random();
		switch (sin) {
			case "anal reluctance":
				r.push(`is sometimes punished for reluctance to take it up the ass. You run across the aftermath of one such incident as`);
				break;
			case "vaginal reluctance":
				r.push(`is sometimes punished for reluctance to give up ${his} pussy. You run across the aftermath of one such incident as`);
				break;
			case "chatting":
				r.push(`can be overly chatty with other slaves, and often makes ${himself} late for ${his} next task by losing ${himself} in gossip. You happen to appear after ${he}'s been late as`);
				break;
			case "dawdling":
				r.push(`is sometimes late to ${his} next task. This is probably the most common minor infraction among slaves, especially when they're assigned to do things they don't like. You happen to appear after ${he}'s been late as`);
				break;
			case "slave refusal":
				r.push(`lacks the sexual energy to be at home among your slaves, since ${his} peers can demand sex from ${him} whenever they want it. ${He} sometimes tries to evade them or even outright refuse. You come upon the aftermath of such a scene as`);
				break;
			case "slave molestation":
				r.push(`struggles with the consent you require before sex between slaves. ${His} need for release pushes ${him} to overstep ${his} bounds. You come upon the aftermath of an example of ${his} sexual aggressiveness as`);
				break;
			default:
				r.push(`ERROR: bad sin`);
		}

		if (V.HeadGirlID !== 0) {
			r.push(`${S.HeadGirl.slaveName} is`);
			if (slave.rules.punishment === "situational") {
				r.push(`assessing an appropriate punishment.`);
			} else {
				r.push(`sentencing ${him} to ${his} standard punishment,`);
				switch (slave.rules.punishment) {
					case "confinement":
						r.push(`several hours in confinement.`);
						break;
					case "whipping":
						r.push(`a whipping.`);
						break;
					case "chastity":
						r.push(`several hours in chastity.`);
				}
			}
			r.push(`${He2} immediately defers to you, should you wish to take over.`);
		} else {
			r.push(`${V.assistant.name} is`);
			if (slave.rules.punishment === "situational") {
				r.push(`assessing an appropriate punishment.`);
			} else {
				r.push(`sentencing ${him} to ${his} standard punishment,`);
				switch (slave.rules.punishment) {
					case "confinement":
						r.push(`several hours in confinement.`);
						break;
					case "whipping":
						r.push(`a whipping.`);
						break;
					case "chastity":
						r.push(`several hours in chastity.`);
				}
			}
			r.push(`${HeA} immediately defers to you, should you wish to take over.`);
		}


		App.Events.addParagraph(node, r);

		const choices = [];

		/* STANDARD PUNISHMENTS */
		switch (slave.rules.punishment) {
			case "confinement":
				choices.push(new App.Events.Result(`Confine ${him} firmly but fairly`, confine));
				choices.push(new App.Events.Result(`Confine ${him} cruelly`, confineCruelly));
				break;
			case "whipping":
				choices.push(new App.Events.Result(`Give ${him} a solid whipping`, whip));
				choices.push(new App.Events.Result(`Whip ${him} cruelly`, whipCruelly));
				break;
			case "chastity":
				choices.push(new App.Events.Result(`Restrain ${him} in your office`, chastity));
				choices.push(new App.Events.Result(`Torment ${him} with vibration`, chastityCruelly));
				break;
		}

		/* SITUATIONAL PUNISHMENTS */
		switch (sin) {
			case "anal reluctance":
				choices.push(new App.Events.Result(`Punish ${his} ass`, ass));
				break;
			case "vaginal reluctance":
				choices.push(new App.Events.Result(`Punish ${his} pussy`, pussy));
				break;
			case "chatting":
				choices.push(new App.Events.Result(`Put ${his} mouth to better use`, mouth));
				break;
			case "dawdling":
				choices.push(new App.Events.Result(`Make ${him} run`, run));
				break;
			case "slave refusal":
				choices.push(new App.Events.Result(`Make sure ${he} knows ${he}'s for use`, use));
				break;
			case "slave molestation":
				choices.push(new App.Events.Result(`Make ${him} apologize and then dominate ${him}`, dominate));
				break;
			default:
				r.push(`ERROR: bad sin`);
		}

		App.Events.addResponses(node, choices);

		function confine() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use confinement as a standard slave punishment,`);
			if (V.cellblock !== 0) {
				r.push(`in addition to ${V.cellblockName},`);
			}
			r.push(`you have little cubicles designed for the purpose scattered around the penthouse. You order ${slave.slaveName} into one of these. ${He} obeys,`);
			if (slave.devotion > 20) {
				r.push(`knowing ${he} deserves punishment and eager to get it over with.`);
			} else if (slave.trust < -20) {
				r.push(`if only out of terror, knowing ${he}'ll make ${his} situation far worse if ${he} doesn't.`);
			} else {
				r.push(`warily, willing to go along until something worth real resistance happens.`);
			}
			r.push(`The cell is padded and has leather restraints; you use these to secure ${him} to the wall, preventing ${him} from doing anything to relieve boredom in the tiny space. You restate the rule ${he} broke, state the length of ${his} punishment, and remonstrate firmly with ${him} before closing the door. As it shuts on ${him}, plunging ${him} into darkness, you hear`);
			if (canTalk(slave)) {
				r.push(`${him} try at an apology in a tiny voice`);
			} else if (slave.voice !== 0) {
				r.push(`a tiny apologetic moan.`);
			} else {
				r.push(`a sad little intake of breath.`);
			}
			r.push(`You're there to let ${him} out after a reasonable time, and ${he} exits the soft little cell <span class="trust inc">with relief.</span>`);
			slave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function confineCruelly() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use confinement as a standard slave punishment,`);
			if (V.cellblock !== 0) {
				r.push(`in addition to ${V.cellblockName},`);
			}
			r.push(`you have several boxes designed for the purpose in convenient areas. You order ${slave.slaveName} to your office, and direct a box to be brought there. ${He} begins to cry when ${he} sees it,`);
			if (slave.devotion > 20) {
				r.push(`but obediently gets inside, not wanting ${his} punishment to be extended. ${His} obedience notwithstanding,`);
			} else if (slave.trust < -20) {
				r.push(`but desperately hurries to get inside, terrified that you might extend ${his} sentence. ${His} obedience notwithstanding,`);
			} else {
				r.push(`making no move towards it. ${He} knows that active resistance will merely extend ${his} sentence, and lets you stuff ${his} sobbing body inside. Once ${he}'s in,`);
			}
			if (canTalk(slave)) {
				r.push(`${he} begs tearfully`);
			} else if (slave.voice !== 0) {
				r.push(`${he} tries frantically to beg`);
			} else if (hasAnyArms(slave)) {
				r.push(`${he} uses ${his} ${hasBothArms(slave) ? "hands" : "hand"} to supplicate you`);
			} else {
				r.push(`${he} attempts to beg in any pitiful way ${he} can muster`);
			}
			r.push(`as you close the lid with exquisite slowness. The harshest thing you do is keep silent, not giving ${him} any indication of when ${he}'s getting out. When you finally let ${him} out, ${he}'s <span class="trust dec">almost crazy with fear</span> of ever going back in the box and, for now, <span class="devotion inc">willing to do almost anything</span> to avoid it.`);
			slave.devotion += 4;
			slave.trust -= 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function whip() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use whipping as a standard slave punishment, there are many sets of restraints set high up on the walls for the purpose. You order ${him} to place ${his} ${hasBothArms(slave) ? "hands" : "hand"} in one of them, and ${he}`);
			if (slave.devotion > 20) {
				r.push(`sobs with fear but obeys, obviously hoping you'll be reasonable.`);
			} else if (slave.trust < -20) {
				r.push(`starts to cry but doesn't let that stop ${him} from hurriedly obeying. ${He} knows that resistance will earn ${him} more strokes.`);
			} else {
				r.push(`breaks down and makes no move to obey, but does not resist as you take ${his} ${hasBothArms(slave) ? "wrists" : "wrist"} in your hands and lift them into the restraints.`);
			}
			r.push(`The shackles can be moved up or down, and you move them up, raising the shivering, frightened ${desc} to the tips of ${his} toes. ${He} struggles a little to find ${his} balance, and is distracted when the first stroke lands on ${his} ${slave.skin} buttocks. Your leather instrument is exquisitely designed and balanced to produce pain without breaking the skin or leaving a permanent mark. You tell ${him} to count, and ${he}`);
			if (canTalk(slave)) {
				r.push(`gasps "one" through ${his} agony.`);
			} else if (slave.voice !== 0) {
				r.push(`grunts once, doing ${his} best.`);
			} else {
				r.push(`sticks up one finger despite ${his} restrained ${hasBothArms(slave) ? "hands" : "hand"}.`);
			}
			r.push(`You flog ${his} bottom until it's pleasantly warm to the touch, and then let ${him} down. ${He}'s <span class="trust inc">relieved</span> at your moderation.`);
			slave.trust += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function whipCruelly() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use whipping as a standard slave punishment, there are many sets of restraints set high up on the walls for the purpose. You order ${him} to place ${his} ${hasBothArms(slave) ? "hands" : "hand"} in one of them, and ${he}`);
			if (slave.devotion > 20) {
				r.push(`sobs with fear but obeys, despite something in your tone that makes ${his} knees go weak with terror.`);
			} else if (slave.trust < -20) {
				r.push(`starts to cry but doesn't let that stop ${him} from hurriedly obeying. ${He} stumbles once, something in your tone that making ${his} knees go weak with terror.`);
			} else {
				r.push(`breaks down and makes no move to obey, but does not resist as you take ${his} ${hasBothArms(slave) ? "wrists" : "wrist"} in your hands and hoist ${him} into the restraints.`);
			}
			r.push(`The shackles can be moved up or down, and you move them down, forcing the weeping slave to spread ${his} legs. You let ${him} anticipate the pain for a long time before you start whipping ${his} buttocks. Your leather instrument is exquisitely designed and balanced to produce pain without breaking the skin or leaving a permanent mark, and you make cruel use of it. After a short preliminary asswhipping, you vary your strokes, letting ${him} feel the whip on ${his} ${hasBothLegs(slave) ? "thighs" : "thigh"}, ${hasBothLegs(slave) ? "calves" : "calf"} and ${hasBothLegs(slave) ? "flanks" : "flank"} before placing strokes against ${his}`);
			if (slave.scrotum > 0) {
				r.push(`poor ballsack.`);
			} else if (slave.dick > 0) {
				r.push(`poor penis.`);
			} else {
				r.push(`poor pussy.`);
			}
			r.push(`${He} loses all control,`);
			if (canTalk(slave)) {
				r.push(`shamelessly begging for mercy.`);
			} else if (slave.voice !== 0) {
				r.push(`sobbing and moaning incoherently.`);
			} else {
				r.push(`rasping pathetic little sobs past ${his} mute throat.`);
			}
			r.push(`When you're done, ${he}'s <span class="trust dec">almost crazy with fear</span> of future whippings.`);
			slave.trust -= 6;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function chastity() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use chastity as a punishment, you're accustomed to using your office for supervising sexual denial. You bring ${him} up and restrain ${him} standing, ${hasBothArms(slave) ? "hands" : "hand"} over ${his} head in one of the sets of shackles set high on the walls, facing out so ${he} can`);
			if (canSee(slave)) {
				r.push(`see`);
			} else {
				r.push(`face`);
			}
			r.push(`everything that goes on in your office. You gag ${him} securely,`);
			if (slave.voice === 0) {
				r.push(`despite ${his} muteness, a sad mockery.`);
			} else {
				r.push(`not wanting your work disturbed by unseemly noises.`);
			}
			r.push(`Then you ignore ${him}. Business as usual in your office is profoundly sexual.`);
			if (slave.energy > 60) {
				r.push(`${His} healthy sex drive makes this torture for ${him}; ${he}`);
				if (canSee(slave)) {
					r.push(`watches`);
				} else if (canHear(slave)) {
					r.push(`listens to`);
				} else {
					r.push(`is aware of`);
				}
				r.push(`everything that happens in the office with desperate longing. Before long,`);
			} else if (slave.devotion > 20) {
				r.push(`${He}'s used to the idea of sexual slavery, and inevitably`);
				if (canSee(slave)) {
					r.push(`sees`);
				} else if (canHear(slave)) {
					r.push(`hears`);
				} else {
					r.push(`is surrounded by`);
				}
				r.push(`people ${he} finds attractive doing things ${he} considers sexy in the office. Before long,`);
			} else if (slave.devotion >= -50) {
				r.push(`${He}'s not comfortable with sexual slavery, but the heavily sexual atmosphere of the office affects even ${him}. After a few hours,`);
			} else {
				r.push(`The office being what it is, ${he}`);
				if (canSee(slave)) {
					r.push(`sees`);
				} else if (canHear(slave)) {
					r.push(`hears`);
				} else {
					r.push(`is surrounded by`);
				}
				r.push(`many naked, attractive people doing sexy things over the course of the day. Despite ${his} resistance, after a few hours,`);
			}
			r.push(`${he}'s quite horny. Restrained as ${he} is, ${he}`);
			if (slave.devotion > 20) {
				r.push(`couldn't`);
			} else {
				r.push(`can't`);
			}
			r.push(`hide`);
			if (slave.dick > 0) {
				if (canAchieveErection(slave)) {
					r.push(`${his}`);
					if (slave.dick > 2) {
						r.push(`prominent`);
					} else {
						r.push(`pathetic`);
					}
					r.push(`erection,`);
				} else {
					r.push(`the string of precum hanging off ${his} limp dick,`);
				}
			} else {
				if (slave.vaginaLube > 0) {
					r.push(`the lovely pussyjuice slicking ${his} thighs,`);
				} else {
					r.push(`how flushed and eager ${his} cunt is,`);
				}
			}
			if (slave.devotion > 20) {
				r.push(`even if ${he} wanted to.`);
			} else {
				r.push(`though ${he} seems to want to.`);
			}
			r.push(`Satisfied that ${he}'s been tormented enough for today, you let ${him} down and send ${him} on ${his} way. ${He}'s obviously <span class="devotion inc">more willing</span> than usual to apply ${himself} to ${his} next sexual task, whatever it is.`);
			slave.devotion += 4;

			App.Events.addParagraph(frag, r);
			return frag;
		}

		function chastityCruelly() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Since you use chastity as a punishment, you're accustomed to using your office for supervising sexual denial. You order ${him} to place ${his} ${hasBothArms(slave) ? "hands" : "hand"} in one of the many sets of restraints set high up on the office walls for the purpose.`);
			if (!slave.piercing.genitals.smart) {
				r.push(`You equip ${him} with a set of smart vibrators. The first is attached`);
				if (slave.dick > 0) {
					r.push(`to ${his} dickhead,`);
				} else {
					r.push(`against ${his} clit,`);
				}
			} else {
				r.push(`${His} smart piercing makes the next step easy. ${He} gets three vibrators in total:`);
			}
			r.push(`the second`);
			if (slave.vagina > 0) {
				r.push(`comfortably fills ${his} pussy,`);
			} else if (slave.vagina === 0) {
				r.push(`rests against ${his} virgin pussy without breaking ${his} virtue,`);
			} else {
				r.push(`is a nice little bullet vibe for ${his} soft perineum,`);
			}
			r.push(`and the third`);
			if (slave.anus > 0) {
				r.push(`is, of course, a vibrating plug for ${his} asspussy.`);
			} else {
				r.push(`rests against ${his} unfucked rosebud without penetrating it.`);
			}
			r.push(`Then you walk away, setting the vibrators to bring ${him} to the edge of orgasm and keep ${him} there. The effect is almost instant, and as you go ${he} begins to writhe,`);
			if (canTalk(slave)) {
				r.push(`desperately calling after you to beg for mercy`);
			} else if (slave.voice !== 0) {
				r.push(`moaning desperately.`);
			} else {
				r.push(`panting mutely.`);
			}
			r.push(`When you finally come back and let ${him} down, ${he}'s`);
			if (canStand(slave)) {
				r.push(`unsteady on ${his} feet`);
			} else {
				r.push(`unable to right ${himself}`);
			}
			r.push(`and <span class="devotion inc">very submissive,</span> though a bit <span class="libido dec">burned out</span> on stimulation.`);
			slave.devotion += 6;
			slave.energy -= 1;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function ass() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Deciding that the most appropriate punishment is some corrective assrape, you shove the slave to`);
			if (hasBothLegs(slave)) {
				r.push(`${his} knees`);
			} else {
				r.push(`the floor`);
			}
			r.push(`and stuff`);
			if (V.PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a formidable dildo`);
			}
			r.push(`up ${his}`);
			if (slave.anus > 2) {
				r.push(`big butthole. It slides right in, the slave's relaxed sphincter offering no resistance. Announcing that you'll find ${his} limits, wherever they are, you insert fingers until ${he}'s cruelly stretched and you're almost jerking`);
				if (V.PC.dick !== 0) {
					r.push(`yourself`);
				} else {
					r.push(`the phallus`);
				}
				r.push(`off inside ${him}.`);
			} else if (slave.anus > 1) {
				r.push(`defenseless asshole. You meet some delicious resistance and push past it, enjoying the feeling of the slave's sphincter spasming as you do. You pound ${him} hard, much harder than ${he} can comfortably take it up the ass.`);
			} else {
				r.push(`tight hole. ${His} poor little anus doesn't want to let you in, but you force yourself in anyway, making the slave wriggle desperately beneath you as ${he} feels the invading phallus force ${his} anal ring to accommodate its girth.`);
			}
			r.push(`You tell ${him} that many slaves enjoy anal, and that if ${he}'s a good ${desc}, ${he} can too, but that it's against the rules for ${him} to show reluctance to be assfucked. The slave below you is too discomfited by anal pain to respond coherently, but ${he} gets the message. ${He}'ll be <span class="devotion inc">better about submitting</span> in the future, but due to the connection between sex and punishment ${he}'ll be <span class="libido dec">a little less eager for sex,</span> especially anal.`);
			r.push(VCheck.Anal(slave, 1));
			slave.devotion += 4;
			slave.energy -= 2;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function pussy() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Deciding that the most appropriate punishment is some corrective rape, you push the slave down on ${his} back and shove`);
			if (V.PC.dick !== 0) {
				r.push(`your cock`);
			} else {
				r.push(`a formidable dildo`);
			}
			r.push(`inside ${his}`);
			if (slave.anus > 2) {
				r.push(`roomy cunt, which can take it easily. Announcing that you'll find ${his} limits, wherever they are, you insert fingers until ${he}'s cruelly stretched and you're almost jerking`);
				if (V.PC.dick !== 0) {
					r.push(`yourself`);
				} else {
					r.push(`the phallus`);
				}
				r.push(`off inside ${him}.`);
			} else if (slave.anus > 1) {
				r.push(`poor womanhood. You fuck ${him} mercilessly, intentionally pulling out far enough that you have to spear ${him} again. You use ${his} poor boobs as leverage, pulling against them to batter ${him} harder.`);
			} else {
				r.push(`poor tight pussy. ${He}'s tight, and the initial penetration was uncomfortable for ${him}, but you make it worse by treating ${his} cunt like a veteran whore's. ${He} begins to struggle a little as you hammer ${him}.`);
			}
			r.push(`You tell ${him} that many slaves enjoy getting fucked, and that if ${he}'s a good ${desc}, ${he} can too, but that it's against the rules for ${him} to show reluctance to be penetrated. The slave below you is too discomfited to respond coherently, but ${he} gets the message. ${He}'ll be <span class="devotion inc">better about submitting</span> in the future, but due to the connection between sex and punishment ${he}'ll be <span class="libido dec">a little less eager for sex,</span> especially vaginal.`);
			r.push(VCheck.Vaginal(slave, 1));
			slave.devotion += 4;
			slave.energy -= 2;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function mouth() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You announce that ${he}'ll have less trouble gossiping instead of being prompt if ${his} mouth is nice and tired. Comprehension and apprehension dawn on ${his} face in the moment before you`);
			if (slave.collar !== "none") {
				r.push(`grab ${him} by the collar and pull`);
			} else {
				r.push(`put a hand on ${his} shoulder and shove`);
			}
			r.push(`${him} to the ground. ${He} goes down without resistance,`);
			if (V.PC.dick !== 0) {
				r.push(`already opening wide for your stiff prick.`);
			} else {
				r.push(`${his} look of unconcern vanishing when ${he} sees you pulling out a strap-on. ${He} doesn't get to eat pussy today; today ${he} gets fucked in the face.`);
			}
			r.push(`You shove it down ${his}`);
			if (slave.sexualQuirk === "gagfuck queen") {
				r.push(`spectacularly unresisting throat. The gagfuck queen has no gag reflex to speak of, but even ${he} has ${his} limit. You rape ${his} face without mercy, deliberately ruining ${his} practiced ability to breathe while giving a cock deep oral.`);
			} else if (slave.fetish === "cumslut") {
				r.push(`eager throat. The ${slave.fetishKnown === 1 ? "cumslut" : "bitch"} loves giving oral, but soon realizes that you have no intention of letting ${him} love this. You rape ${his} face without mercy, hilting ${his} lips against`);
				if (V.PC.dick !== 0) {
					r.push(`your base.`);
				} else {
					r.push(`the harness.`);
				}
			} else {
				r.push(`gagging throat, enjoying the sensations of ${his} lips and tongue writhing against you as ${he} desperately tries to accommodate the intruder.`);
			}
			r.push(`${He} begins to struggle a little, so you snake a hand down behind ${his} head to hold ${him} in place. When you're done, ${he}'s an inelegant mess, coughing and gasping for air.`);
			if (canTalk(slave)) {
				r.push(`Once ${he}'s got ${his} breath back, ${he} tearfully`);
			} else {
				r.push(`Even as ${he} pants, ${he} uses shaky gestures to beg forgiveness, and ${he} even`);
			}
			r.push(`promises to be less chatty. ${He}'ll be <span class="devotion inc">more punctual</span> in the future, but due to the connection between sex and punishment ${he}'ll be <span class="libido dec">a little less eager for sex,</span> especially oral.`);
			seX(slave, "oral", V.PC, "penetrative", 1);
			slave.devotion += 4;
			slave.energy -= 2;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function run() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You tell ${him} that ${he} clearly needs practice being prompt.`);
			if (canHear(slave)) {
				r.push(`Your tone is conversational, but ${he} doesn't mistake it for kindness. It's the tone you use with`);
			} else {
				r.push(`Your gestures are soft, but ${he} doesn't mistake that for kindness. It's what you use with deaf`);
			}
			r.push(`slaves when imparting guidance which is to be accepted and followed on pain of terrible punishment. You make ${him} explain where ${he} was and what ${he} was doing previously, and require ${him} to walk you there. ${He} does,`);
			if (slave.trust > 20) {
				r.push(`trustingly`);
			} else if (slave.trust >= -20) {
				r.push(`rather fearfully,`);
			} else {
				r.push(`shaking with fear,`);
			}
			r.push(`and when you get there you tell ${him} to run to ${his} next task. ${He} hesitates for an instant, until you`);
			if (V.PC.title === 1) {
				r.push(`bellow`);
			} else {
				r.push(`shriek`);
			}
			r.push(`at ${him} to <b><i>RUN!</i></b> ${He} takes off,`);
			if (!canWalk(slave)) {
				r.push(`crawling as fast as ${his} body will let ${him}. Sure ${he} isn't running, since ${he} can't, but ${he} is struggling along at an impressive pace.`);
			} else if (shoeHeelCategory(slave) === 3) {
				r.push(`tottering agonizingly along in ${his} extreme heels. ${He} isn't running, not really, but ${his} slutty shoes are so ridiculous that ${he} can't. ${He}'s going as fast as ${he} possibly can.`);
			} else if (shoeHeelCategory(slave) > 1) {
				r.push(`running awkwardly in ${his} ${slave.shoes}.`);
			} else {
				r.push(`running as fast as ${his} legs can carry ${him}.`);
			}
			r.push(`As ${he} goes,`);
			if (slave.dick > 3) {
				r.push(`${his}`);
				if (slave.dick > 5) {
					r.push(`ridiculous penis`);
				} else {
					r.push(`big dick`);
				}
				r.push(`flops around painfully, hitting ${his} thighs, but ${he} tries to ignore it.`);
			} else if (slave.scrotum > 3) {
				r.push(`${his}`);
				if (slave.scrotum > 5) {
					r.push(`huge ballsack`);
				} else {
					r.push(`generous scrotum`);
				}
				r.push(`gets painfully pinched between ${his} thighs, but ${he} tries to ignore it.`);
			} else if (slave.belly >= 10000) {
				r.push(`${his} huge`);
				if (slave.pregKnown === 1) {
					r.push(`pregnancy`);
				} else {
					r.push(`belly`);
				}
				r.push(`impedes ${him} terribly, but ${he} tries to ${canWalk(slave) ? "waddle" : "push"} along as best ${he} can.`);
			} else if (slave.boobsImplant > 600) {
				r.push(`${his} implants bounce around painfully, so ${he} cradles ${his} fake tits in ${his} arm${hasBothArms(slave) ? "s" : ""}, trying to support them as much as possible.`);
			} else if (slave.boobs > 2000) {
				r.push(`${his} huge tits bounce around painfully, so ${he} cradles ${his} udders in ${his} arm${hasBothArms(slave) ? "s" : ""}, trying to support them as much as possible.`);
			} else if (slave.butt > 2) {
				r.push(`${his} big buttocks impede ${him} a bit, but ${he} does ${his} best, making them work around delightfully.`);
			} else {
				r.push(`${his} cute rear makes a pretty picture.`);
			}
			r.push(`You make ${him} repeat the exercise until ${he}'s quite tired, hounding ${him} mercilessly, and then send ${him} off to rinse away the sweat ${he} worked up before getting back to work. ${He}'ll be <span class="devotion inc">more punctual</span> in the future.`);
			slave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function use() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Deciding to ensure the ${desc} really understands that ${he}'s a sex slave and can be used by anyone, even other slaves, you order ${him} to put ${his} mouth to work on the slave who demanded sex from ${him}.`);
			actX(slave, "oral");
			if (slave.devotion > 20) {
				r.push(`${He} hurries to comply, knowing ${he}'s in trouble and not wanting to make it any worse.`);
			} else if (slave.trust < -20) {
				r.push(`${He} hurries to obey, terrified that resistance will make it worse.`);
			} else {
				r.push(`${He} looks momentarily mutinous, but decides not to resist and gets down to it.`);
			}
			r.push(`Once ${he}'s working away, you pull ${his} hips up and`);
			if (canDoVaginal(slave) && (slave.vagina !== 0)) {
				r.push(`push ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`legs`);
				} else {
					r.push(`cheeks`);
				}
				r.push(`apart, leaving ${his}`);
				if (slave.vagina > 2) {
					r.push(`loose`);
				} else if (slave.vagina > 1) {
					r.push(`poor`);
				} else {
					r.push(`tight little`);
				}
				r.push(`pussy vulnerable. You fuck ${him} hard, making it a punishment.`);
				r.push(VCheck.Vaginal(slave, 1));
			} else if (canDoAnal(slave) && (slave.anus !== 0)) {
				r.push(`paw ${his} butt, using a couple of fingers to tease ${his}`);
				if (slave.anus > 2) {
					r.push(`relaxed`);
				} else if (slave.anus > 1) {
					r.push(`slutty`);
				} else {
					r.push(`tight little`);
				}
				r.push(`asshole before penetration. You fuck ${him} hard, making it a punishment.`);
				r.push(VCheck.Anal(slave, 1));
			} else {
				r.push(`push ${his}`);
				if (hasBothLegs(slave)) {
					r.push(`legs`);
				} else {
					r.push(`cheeks`);
				}
				r.push(`together, settling for some`);
				if (V.PC.dick !== 0) {
					r.push(`frottage`);
					seX(slave, "anal", V.PC, "penetrative", 1);
				} else {
					r.push(`tribbing`);
					seX(slave, "anal", V.PC, "vaginal", 1);
				}
				r.push(`to preserve ${his}`);
				if (slave.vagina === -1) {
					r.push(`virginity.`);
				} else {
					r.push(`virginities.`);
				}
				r.push(`Since you're not fucking ${him}, you spank ${his} ass mercilessly to make it an effective punishment.`);
			}
			r.push(`The horny slave getting oral enjoys the oral attention, especially once ${slave.slaveName} starts to groan with discomfort. You discard ${him} once everyone except ${him} has gotten off. ${He}'ll be <span class="devotion inc">more submissive</span> to sexual demands from now on, though ${he}'ll be <span class="libido dec">slightly less interested in sex</span> for ${his} own pleasure.`);
			slave.devotion += 4;
			slave.energy -= 2;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function dominate() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`You order the horny ${desc} to apologize to the slave ${he} grabbed, which ${he} does,`);
			if (canTalk(slave)) {
				r.push(`managing to sound authentically sorry.`);
			} else {
				r.push(`gesturing ${his} regret with apparent sincerity.`);
			}
			r.push(`It seems ${he} might feel some actual guilt at molesting a fellow slave, but ${he}'s about to feel much sorrier. Once the other slave has been dismissed, you grab ${him} by the neck and`);
			if (canDoVaginal(slave) && (slave.vagina !== 0)) {
				r.push(`shove ${him} up against the nearest wall, using a bit of warning pressure of your fingers against ${his} throat to warn ${him} to take ${his} punishment. Then you`);
				if (V.PC.dick !== 0) {
					r.push(`jam your cock inside ${him}, making ${him} wriggle from the uncomfortable angle.`);
				} else {
					r.push(`grind your pussy against ${him}, fucking ${him} hard despite the lack of penetration.`);
				}
				r.push(VCheck.Vaginal(slave, 1));
			} else if (canDoAnal(slave) && (slave.anus !== 0)) {
				r.push(`shove ${his} face against the nearest wall, using a bit of warning pressure of your fingers against ${his} throat to warn ${him} to take ${his} punishment. Then you`);
				if (V.PC.dick !== 0) {
					r.push(`jam your cock up ${his} butt, making ${his} sphincter spasm from the rough penetration.`);
				} else {
					r.push(`use one hand to fuck ${his} ass and the other to look after yourself.`);
				}
				r.push(VCheck.Anal(slave, 1));
			} else {
				r.push(`pull ${him} to ${his} ${hasBothLegs(slave) ? "knees" : "knee"},`);
				if (V.PC.dick !== 0) {
					r.push(`shoving your dick down ${his} throat.`);
					seX(slave, "oral", V.PC, "penetrative", 1);
				} else {
					r.push(`straddling ${his} face and grinding yourself against ${his} mouth.`);
					seX(slave, "oral", V.PC, "vaginal", 1);
				}
			}
			r.push(`The slut needs it so badly that ${he} almost climaxes, but you ruin ${his} building orgasms whenever you detect them. When you've gotten yours, you drop ${him} and walk off, leaving ${him} feeling comprehensively fucked, but no less horny. ${He}'ll be <span class="devotion inc">very willing</span> to do anything that will earn ${his} release.`);
			slave.devotion += 4;
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
