// cSpell:ignore frot

App.Events.RESSBedSnuggle = class RESSBedSnuggle extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment),
				s => s.devotion > 50,
				s => s.trust > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, woman, girl, himself
		} = getPronouns(eventSlave);
		const {say} = getEnunciation(eventSlave);
		const {hisA, girlA, womanA, loliA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
		const belly = bellyAdjective(eventSlave);

		let womanTerm = "kid";
		if (eventSlave.physicalAge > 30) {
			womanTerm = woman;
		} else if (eventSlave.physicalAge > 18) {
			womanTerm = girl;
		} else if (eventSlave.physicalAge > 12) {
			womanTerm = "teen";
		}

		App.Events.drawEventArt(node, eventSlave, "no clothing");


		let r = [];
		r.push(`${capFirstChar(V.assistant.name)} wakes you in the morning,`);
		if (V.assistant.personality <= 0) {
			r.push(`${hisA} voice`);
		} else {
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${hisA} monster${girlA} avatar's sultry voice`);
					break;
				case "shemale":
					r.push(`${hisA} shemale avatar's syrupy voice`);
					break;
				case "amazon":
					r.push(`${hisA} amazon avatar's powerful voice`);
					break;
				case "businesswoman":
					r.push(`${hisA} business${womanA} avatar's confident voice`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`${hisA} fairy avatar's adorable voice`);
					break;
				case "schoolgirl":
					r.push(`${hisA} school${girlA} avatar's bubbly voice`);
					break;
				case "loli":
				case "preggololi":
					r.push(`${hisA} ${loliA} avatar's childish voice`);
					break;
				case "angel":
					r.push(`${hisA} angel avatar's heavenly voice`);
					break;
				case "cherub":
					r.push(`${hisA} cherub avatar's cheerful voice`);
					break;
				case "incubus":
					r.push(`${hisA} incubus avatar's forceful voice`);
					break;
				case "succubus":
					r.push(`${hisA} succubus avatar's sultry voice`);
					break;
				case "imp":
					r.push(`${hisA} imp avatar's mischievous voice`);
					break;
				case "witch":
					r.push(`${hisA} witch avatar's cocky voice`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${hisA} avatar's piecemeal voice`);
					break;
				default:
					r.push(`${hisA} voice`);
			}
		}
		r.push(`gently calling your name. As you regain consciousness, you become aware of a weight on your`);
		if (V.PC.boobs >= 1400) {
			r.push(`chest other than your heavy tits.`);
		} else {
			r.push("chest.");
		}
		r.push(contextualIntro(V.PC, eventSlave, true, false, true));
		r.push(`has snuggled up against you in ${his} sleep. ${He}'s nude, and so are you; everyone sleeps naked in your penthouse. The sheet is down at your hips, leaving your upper bodies bare.`);
		if (!hasAnyArms(eventSlave)) {
			r.push(`${He}'s wormed ${his}`);
			if (isAmputee(eventSlave)) {
				r.push(`limbless`);
			} else {
				r.push(`armless`);
			}
			r.push(`torso under your arm,`);
		} else {
			r.push(`${He} has one arm across your`);
			if (V.PC.boobs >= 300) {
				r.push(`chest, just below your breasts,`);
			} else if (V.PC.title === 1) {
				r.push(`manly chest`);
			} else {
				r.push(`flat chest,`);
			}
		}
		r.push(`and is using your shoulder as a pillow. You can feel ${his} warm breath across`);
		if (V.PC.boobs >= 300 || V.PC.title === 0) {
			r.push(`your nipple on that side, and it hardens slowly under your gaze.`);
		} else {
			r.push(`your well-developed pectorals.`);
		}
		if (eventSlave.boobs > 4000) {
			r.push(`${His} incredible tits are resting to either side of your ribcage, with one of them a heavy mass on your chest and the other trapped under ${his}`);
		} else if (eventSlave.boobs > 1200) {
			r.push(`${His} big boobs form a warm, soft mass between you`);
		} else {
			r.push(`${His} soft chest rests warmly against your ribcage`);
		}
		if (eventSlave.belly >= 10000) {
			r.push(r.pop() + `, beneath them, ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`pregnant`);
			}
			r.push(`belly rests`);
			if (V.PC.belly >= 1500) {
				r.push(`against your own baby bump,`);
			} else {
				r.push(`upon your flat stomach,`);
			}
		}
		r.push(`and farther down, there's another source of warmth where ${he}'s`);
		if (!hasAnyLegs(eventSlave)) {
			r.push(`got ${his} legless pelvis resting against your ${eventSlave.height <= V.PC.height ? "hip" : "thigh"}.`);
		} else {
			r.push(`straddling your thigh.`);
		}
		App.Events.addParagraph(node, r);
		r = [];

		r.push(`"${properTitle()}," ${V.assistant.name} calls again, "you`);
		if (V.assistant.personality <= 0) {
			r.push(`set a wake-up for this time.`);
		} else {
			r.push(`asked me to wake you at this time.`);
		}
		r.push(`You have a business meeting that starts shortly." You begin to slide out from under ${eventSlave.slaveName}, but the ${womanTerm} clings to you in ${his} sleep as the warmth of your body begins to move away from ${him}.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result("Make the meeting", meeting),
			new App.Events.Result("Call in from where you are", call),
			new App.Events.Result("Go back to sleep", sleep),
			new App.Events.Result("Spend the day in bed", bed),
		]);

		function meeting() {
			r = [];

			let meetingBonus = Math.trunc(V.cash / 10000 * 1000);
			if (meetingBonus > 5000) {
				meetingBonus = 5000;
			} else if (meetingBonus < 1000) {
				meetingBonus = 1000;
			}
			r.push(`You finish the motion and get on with your day. ${He} burrows into the warm place on the bed where your body lay, which is actually an excellent sign of ${his} mental state. It suggests that ${his} dreaming mind is quite comfortable with your`);
			if (canSmell(eventSlave)) {
				r.push(`presence, and even smell.`);
			} else {
				r.push(`presence.`);
			}
			r.push(`You make the meeting, consoling yourself with the thought that you're hardly lacking for opportunities to`);
			if (V.PC.dick !== 0) {
				r.push(`stick your dick in`);
			} else {
				r.push(`have sex with`);
			}
			r.push(`${eventSlave.slaveName}. The business opportunity turns out to be <span class="cash inc">quite profitable;</span> you're glad you didn't pass it up.`);
			cashX(meetingBonus, "event", eventSlave);
			return r;
		}

		function call() {
			r = [];

			let meetingBonus = Math.trunc(V.cash / 10000) * 1000;
			if (meetingBonus > 5000) {
				meetingBonus = 5000;
			} else if (meetingBonus < 1000) {
				meetingBonus = 1000;
			}
			r.push(`You tell ${V.assistant.name} to inform your business contacts that you'll be attending the meeting by telepresence. A camera mounted above you focuses tightly on your face, making it look like you're relaxing, but concealing the fact that you have a naked ${womanTerm} draped across you. The meeting is long enough that your interlocutors eventually realize that something unusual is going on, especially once ${he} wakes up and starts sleepily`);
			if (V.PC.dick !== 0) {
				r.push(`sucking your dick`);
				if (V.PC.vagina !== -1) {
					r.push(`and`);
				}
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			if (V.PC.vagina !== -1) {
				r.push(`eating you out`);
				seX(eventSlave, "oral", V.PC, "vaginal");
			}
			r.push(r.pop() + `, out of frame. They're <span class="reputation dec">slightly annoyed,</span> since having sex during meetings is still considered a minor faux pas, but you <span class="cash inc">close the deal,</span> and ${eventSlave.slaveName} is <span class="devotion inc">very pleased</span> that you would rearrange your affairs to make time for`);
			if (V.PC.dick !== 0) {
				r.push(`one of ${his} blowjobs.`);
			} else {
				r.push(`oral sex with ${him}.`);
			}

			cashX(meetingBonus, "event", eventSlave);
			repX(forceNeg(50), "event", eventSlave);
			eventSlave.devotion += 4;
			return r;
		}

		function sleep() {
			r = [];
			const frag = document.createDocumentFragment();
			let didAnal = false;
			let didVaginal = false;

			r.push(`You tell ${V.assistant.name} to cancel the appointment, plant a kiss atop your bedmate's sleeping head, and go back to sleep yourself, with the peerless comfort of a warm, naked ${womanTerm} cuddled up beside you. ${capFirstChar(V.assistant.name)} lowers the temperature in the room and directs another slave to quietly put a couple of warm blankets over you and ${eventSlave.slaveName}. When you finally wake, several hours later, the effect is magical. You're ensconced in a little island of warmth and comfort, a tiny universe of relaxation populated only by yourself and your slave. ${He} woke before you did, but remained still to avoid disturbing you.`);
			if (canSee(eventSlave)) {
				r.push(`From the lazy, contented look in ${his} ${App.Desc.eyesColor(eventSlave)} as ${he} meets your waking gaze, ${he} did not mind waiting. <span class="devotion inc">${He} was already looking at your face when you opened your eyes.</span>`);
			} else {
				r.push(`From the serene expression on ${his} face as ${he} meets your waking gaze, ${he} did not mind waiting. <span class="devotion inc">${He} was already looking at your face, lost in the soothing ${canHear(eventSlave) ? "sounds" : "motions"} of your breathing, when you opened your eyes.</span>`);
			}
			App.Events.addParagraph(frag, r);
			r = [];

			r.push(`Since you're awake, ${he} rolls onto ${his} face and then further, to place ${his} back and`);
			if (eventSlave.butt > 5) {
				r.push(`massive ass`);
			} else if (eventSlave.butt > 2) {
				r.push(`healthy rear`);
			} else {
				r.push(`butt`);
			}
			r.push(`against you, making sure to drag ${his} ${eventSlave.nipples} nipples against you the whole way. You accept the invitation and spoon ${him},`);
			// PC height stuff here!
			if (eventSlave.height >= 185) {
				r.push(`your bodies lining up well, since ${he}'s as tall as you are.`);
			} else if (eventSlave.height >= 160) {
				r.push(`${his} body fitting neatly within the embrace of your larger frame.`);
			} else {
				r.push(`${his} small body fitting entirely within your embrace.`);
			}
			if (eventSlave.muscles > 30) {
				r.push(`${His} muscles`);
			} else {
				r.push(`${His} softness`);
			}
			r.push(`and warmth awaken your desire, and ${he} feels`);
			if (V.PC.dick !== 0) {
				r.push(`your stiffening cock beginning to press against`);
				if (!hasBothLegs(eventSlave)) {
					r.push(`${his} perineum. ${He} shifts to slide ${himself} along its`);
					if (V.PC.vagina !== -1) {
						r.push(`shaft and down to where your pussy begins.`);
					} else {
						r.push("shaft.");
					}
				} else {
					r.push(`the place between ${his} thighs. ${He} shifts to let your dick slide between them, and reaches down to massage its head.`);
				}
			} else {
				r.push(`heat building against ${his} butt.`);
				if (!hasAnyArms(eventSlave)) {
					r.push(`${He} does ${his} best to grind against you, since ${he} can't caress you without hands.`);
				} else {
					r.push(`${He} snakes a hand behind ${himself} to caress your womanhood, and begins to gently`);
					if (hasBothArms(eventSlave)) {
						r.push(`masturbate with the other.`);
					} else {
						r.push(`grind against you.`);
					}
				}
			}
			if (V.PC.dick !== 0) {
				if (eventSlave.vagina > 0 && eventSlave.anus > 0 && canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
					r.push(`${He} begins to shift farther forward and back along your dick, causing its head to press against ${his} anus and then slide forward to nestle between ${his} pussylips. In response to ${his} wordless question, you nibble ${his} ear and tell ${him} that it's ${his} choice. ${He} turns ${his} upper torso to`);
					if (canSee(eventSlave)) {
						r.push(`stare at you in surprise`);
					} else {
						r.push(`so that you may see ${his} surprise`);
					}
					r.push(`for a moment, and then smiles and gives you a peck on the cheek.`);
					if ((eventSlave.fetish === "buttslut") && (eventSlave.fetishKnown === 1)) {
						r.push(`${He} hikes ${himself} up a bit, and then slides ${his} anal sphincter slowly around and down your cock until you're resting all the way up ${his} ass. You share loving anal`);
						didAnal = true;
					} else {
						r.push(`${He} hikes ${himself} up to give your dickhead a last teasing press against ${his} butt before cocking ${his} hips and sliding your cock into ${his} soaking cunt. You make love`);
						didVaginal = true;
					}
				} else if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
					r.push(`${He} cocks ${his} hips and so that your cock is pressing against ${his} soaked cunt. In response to ${his} wordless question, you nibble ${his} ear and tell ${him} that it's ${his} choice. ${He} turns ${his} upper torso to`);
					if (canSee(eventSlave)) {
						r.push(`stare at you in surprise`);
					} else {
						r.push(`so that you may see ${his} surprise`);
					}
					r.push(`for a moment, and then smiles and gives you a peck on the cheek.`);
					if (eventSlave.fetish === "pregnancy" && eventSlave.fetishKnown === 1 && isFertile(eventSlave)) {
						r.push(`${He} pushes against you until you are fully inserted into ${his} pussy. ${He}'s ripe for impregnation and needs your baby in ${him}. You make love`);
					} else if (eventSlave.vagina > 2) {
						r.push(`${He} easily slides your cock into ${his} loose pussy. You make love`);
					} else {
						r.push(`${He} hikes ${himself} up a bit, and then gently slides your cock into ${his} tight pussy. You make love`);
					}
					didVaginal = true;
				} else if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
					r.push(`${He} begins to shift farther forward along your dick, causing its head to press against ${his} anus. In response to ${his} wordless question, you nibble ${his} ear and tell ${him} that it's ${his} choice. ${He} turns ${his} upper torso to`);
					if (canSee(eventSlave)) {
						r.push(`stare at you in surprise`);
					} else {
						r.push(`so that you may see ${his} surprise`);
					}
					r.push(`for a moment, and then smiles and gives you a peck on the cheek.`);
					if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1) {
						r.push(`${He} hikes ${himself} up a bit, and then slides ${his} anal sphincter slowly around and down your cock until you're resting all the way up ${his} ass. You share loving anal`);
						didAnal = true;
					} else if (eventSlave.anus > 2) {
						r.push(`${He} hikes ${himself} up a bit, and then easily slides your cock into ${his} loose rectum. You share loving anal`);
						didAnal = true;
					} else {
						r.push(`${He} decides against buttsex, and`);
						if (!hasBothLegs(eventSlave)) {
							r.push(`contents ${himself} with grinding`);
						} else {
							r.push(`presses ${his} thighs together so you can frot ${him}.`);
						}
						r.push(`After making love`);
					}
				} else {
					r.push(`You`);
					if (!hasBothLegs(eventSlave)) {
						r.push(`grind against ${him}`);
					} else {
						r.push(`frot ${him}`);
					}
				}
			} else {
				r.push(`You reach around ${him} and attend to a nipple with each hand, spreading your attention to the whole breast once`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`they're perfectly stiff.`);
				} else {
					r.push(`they've tightened around your fingers.`);
				}
				r.push(`After sharing gentle lovemaking`);
			}
			r.push(`for a while, until you sense that ${he}'s on the edge of climax. Without warning, you lift the edge of the blankets and send a gust of cool air down ${his} front and`);
			if (eventSlave.dick > 0) {
				r.push(`right onto ${his} cock.`);
			} else {
				r.push(`across ${him}`);
				if (eventSlave.nipples !== "fuckable") {
					r.push(`hard`);
				} else {
					r.push(`engorged`);
				}
				r.push(`nipples.`);
			}
			r.push(`${He} gasps at the sudden overstimulation and then orgasms very strongly, jerking against you`);
			if (!canTalk(eventSlave)) {
				r.push(`and panting in lieu of an exclamation.`);
			} else {
				r.push(`and ${say}ing "oh" over and over again.`);
			}
			if (V.PC.dick !== 0) {
				r.push(`${He} clenches against your dick,`);
				if (V.PC.vagina !== -1) {
					r.push(`so hard that you can feel the rush of blood into your cunt,`);
				}
			} else {
				r.push(`${He} works your pussy harder,`);
			}
			r.push(`getting you off in turn, and then rolls over to plant a whole-hearted kiss on your lips.`);
			eventSlave.devotion += 4;
			if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function bed() {
			r = [];
			let didAnal = false;
			let didVaginal = false;

			r.push(`What's the point of becoming a wealthy tycoon in an anarcho-libertarian paradise if you have to obey the rules all the time? You tell ${V.assistant.name} to cancel the appointment. Then, you wake your bedmate, and`);
			if (V.PC.dick !== 0) {
				r.push(`get a blowjob`);
				seX(eventSlave, "oral", V.PC, "penetrative");
				if (V.PC.vagina !== -1) {
					r.push(`and some attention for your pussy`);
					seX(eventSlave, "oral", V.PC, "vaginal");
				}
			} else {
				r.push(`have ${him} eat you out`);
				seX(eventSlave, "oral", V.PC, "vaginal");
			}
			r.push(`under the sheet while you enjoy the lurid sunrise through the glass wall of your bedroom. When the sun is up and you've`);
			if (V.PC.dick !== 0) {
				r.push(`shot your load down ${his} throat,`);
			} else {
				r.push(`climaxed twice,`);
			}
			r.push(`you pull the bemused ${girl} up alongside you again, bring the sheets up over you both, switch on a wallscreen, and ask ${him} if there's anything ${he}'d like to`);
			if (canSee(eventSlave)) {
				r.push(`watch.`);
			} else if (canHear(eventSlave)) {
				r.push(`listen to.`);
			} else {
				r.push(`put on.`);
			}
			r.push(`${He} smiles incredulously, but after you encourage ${him} ${he} <span class="trust inc">finds ${his} confidence</span> and admits that there's a Free Cities serial drama about slave life that ${he} enjoys. You put it on and watch three episodes with ${him}. It's terribly insipid, but there's a lot of explicit sex to liven things up, and all the actresses are nice enough to look at. ${eventSlave.slaveName} cuddles comfortably with you the entire time,`);
			if (canSee(eventSlave)) {
				r.push(`watching raptly`);
			} else if (canHear(eventSlave)) {
				r.push(`listening intently`);
			} else {
				r.push(`enjoying your company`);
			}
			r.push(`and doing ${his} best to explain the wretchedly trite plot you've missed. You have a meal delivered,`);
			if (eventSlave.vagina > 0 && canDoVaginal(eventSlave)) {
				r.push(`fuck ${him},`);
				didVaginal = true;
			} else if (eventSlave.anus > 0 && canDoAnal(eventSlave)) {
				r.push(`fuck ${his} butt,`);
				didAnal = true;
			} else {
				r.push(`fuck ${him},`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			r.push(`and then share a shower and a nap. Thus invigorated, you decide to tour the arcology's nightlife, and tell ${him} ${he}'ll accompany you. ${He} hurries to get ready, filled with excitement. A lovely day.`);
			eventSlave.trust += 4;
			if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			return r;
		}
	}
};
