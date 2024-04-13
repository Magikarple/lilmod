App.Events.RESSConfidentTanning = class RESSConfidentTanning extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.weatherToday.severity <= 1,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.trust > 50,
				s => s.devotion > 20,
				s => s.anus !== 0,
				canDoAnal,
				s => s.vagina !== 0,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl, woman
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const arms = hasBothArms(eventSlave) ? `arms` : `arm`;
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(
			`It's an unusually nice day, with mild sunshine, light breezes, and nothing offensive or dangerous in the atmosphere. In the middle of the afternoon, you take a break from your busy schedule of sex and business and stroll out onto one of your penthouse balconies. It seems`,
			contextualIntro(PC, eventSlave, true),
			`was struck by a similar impulse.`,
		);
		if (eventSlave.assignment === Job.REST) {
			r.push(`${He}'s assigned to do little but rest,`);
		} else {
			r.push(`This is one of ${his} rest periods,`);
		}
		r.push(`so ${he}'s come out here to lay naked on a towel and enjoy the sun.`);
		if (skinToneLevel(eventSlave.skin) > 20) {
			r.push(`${His} ${eventSlave.skin} skin doesn't tan much, so ${he}'s just out here to bask in its warmth. ${His} body shines with lotion from a bottle lying next to ${him}, but it's just general-purpose stuff.`);
		} else if (eventSlave.skin === "sun tanned") {
			r.push(`${His} tanned skin shines with lotion from a bottle lying next to ${him}.`);
		} else if (eventSlave.skin === "spray tanned") {
			r.push(`Since ${his} fake tan would otherwise be (rather ironically) ruined by the sun, ${his} skin shines with sunblock lotion from a bottle lying next to ${him}.`);
		} else {
			r.push(`${His} skin shines with sunblock lotion from a bottle lying next to ${him}. It would be foolish of ${him} to let the sun ruin ${his} ${eventSlave.skin} skin.`);
		}
		r.toParagraph();
		r.push(`${He}'s lying on ${his} back with ${his} ${arms} outstretched, ${his}`);
		if (eventSlave.boobs > 5000) {
			r.push(`titanic breasts resting to either side. They're so enormous they touch the ground on either side of ${him}.`);
		} else if (eventSlave.boobs > 800 && eventSlave.boobsImplant === 0) {
			r.push(`heavy, natural breasts resting to either side.`);
		} else if (eventSlave.boobsImplant / eventSlave.boobs >= 0.50) {
			r.push(`fake tits maintaining their proud shape regardless.`);
		} else {
			r.push(`modest breasts resting a little to either side as ${his} chest rises and falls with ${his} breath.`);
		}
		r.push(`${He}'s relaxed and breathing slowly, and it isn't immediately clear if ${he}'s asleep or not. ${He}'s not aroused, and ${his}`);
		switch (eventSlave.nipples) {
			case "tiny":
				r.push(`tiny little nipples soft against ${his} breasts.`);
				break;
			case "flat":
				r.push(`nipples blend seamlessly into ${his} sunlit areolae.`);
				break;
			case "puffy":
				r.push(`puffy nipples are soft under the sunlight.`);
				break;
			case "partially inverted":
				r.push(`partially inverted nipples are withdrawn against ${his} soft breastflesh.`);
				break;
			case "inverted":
				r.push(`fully inverted nipples are completely hidden from the sun's rays.`);
				break;
			case "huge":
				r.push(`huge nipples are as soft as you've seen them.`);
				break;
			case "fuckable":
				r.push(`fuckable nipples look warm and inviting in the sun.`);
				break;
			default:
				r.push(`nipples look pleasantly soft and warm in the sun.`);
		}
		r.push(`As you consider ${his} radiant body, ${he} senses your presence, either realizing you're there through ${his} closed eyes or coming out of a light sleep at your proximity. ${He} opens ${his} ${App.Desc.eyesColor(eventSlave)} a slit and stretches deliciously, arching ${his} back luxuriantly, and murmurs, "Hi ${Master}."`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Ask ${him} if ${he} needs help with ${his} tan`, ask),
			new App.Events.Result(`Just enjoy the sunshine with ${him}`, enjoy),
			new App.Events.Result(`Bring your good slaves out for a day at the beach`, bring)
		]);

		function ask() {
			let didVaginal = false;
			let didAnal = false;
			const r = new SpacedTextAccumulator();
			r.push(`You ask ${him} if ${he} needs help with ${his} tan. ${He} looks momentarily confused, but then ${he} catches`);
			if (canSee(eventSlave)) {
				r.push(`the gleam in your eye`);
				if (V.PC.dick !== 0) {
					r.push(`and notices your stiffening member.`);
				} else {
					r.push(`and the flush on your cheeks.`);
				}
			} else {
				r.push(`on to the swing of things.`);
			}
			r.push(`"Ooh," ${he} ${say}s cheekily,`);
			if (eventSlave.fetish === Fetish.SUBMISSIVE && eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				r.push(
					Spoken(eventSlave, `"my back is getting sunburnt! Please, ${Master}, help me!"`),
					`${He} rolls over and lies still, sighing with submissive relaxation as you`
				);
				if (eventSlave.belly >= 5000) {
					r.push(`climb atop`);
				} else {
					r.push(`settle against`);
				}
				r.push(`${his} warm back and take ${him}.`);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "cumslut" && eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				r.push(
					Spoken(eventSlave, `"my back is getting sunburnt! Please, ${Master}, help me! I need somewhere to hide it!"`),
					`${He} scrambles hungrily for your crotch, nuzzling you, licking you, and`);
				if (V.PC.dick !== 0) {
					r.push(`sucking your dick`);
					if (V.PC.vagina !== -1) {
						r.push(`and`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(`eating you out`);
				}
				r.addToLast(`.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (eventSlave.fetish === "humiliation" && eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				r.push(
					Spoken(eventSlave, `"I'm getting sunburnt! I had better go inside. But ${Master} everyone in there will see me naked!"`),
					`${He} looks at you in mock horror, and giggles with building lust as you pull ${his} sun-warmed body inside the arcology and into an open space for a good thorough public fucking.`
				);
				if (canDoVaginal(eventSlave)) {
					didVaginal = true;
				} else {
					didAnal = true;
				}
			} else if (eventSlave.fetish === "buttslut" && eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				r.push(
					Spoken(eventSlave, `"my butt is getting sunburnt! Please, ${Master}, help me!"`),
					`${He} spins to point ${his} rear end at the sun, hikes it up to present ${his} asshole to the light, and begins to wink it lewdly, begging you to save ${his} anus from a sunburn. ${He} giggles happily as ${he} feels`
				);
				if (V.PC.dick !== 0) {
					r.push(`your cockhead`);
				} else {
					r.push(`a strap-on`);
				}
				r.push(`penetrate ${his} asshole, and starts to shove ${himself} back against you as hard as you're shoving it into ${him}.`);
				didAnal = true;
			} else if (eventSlave.fetish === "boobs" && eventSlave.fetishKnown === 1 && eventSlave.fetishStrength > 60) {
				r.push(
					Spoken(eventSlave, `"my boobs are getting sunburnt! Please, ${Master}, help me!"`),
					`${He} wiggles ${his} torso around to make ${himself} bounce enticingly, and then giggles happily as you`
				);
				if (V.PC.dick !== 0) {
					r.push(`get on top of ${him} and slide yourself`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`between ${his} lotion-slick tits`);
						if (V.PC.vagina !== -1) {
							r.addToLast(`, occasionally riding up to slide ${his} hard nipples between your pussylips`);
						}
					} else {
						r.addToLast(`all the way into a fuckable tit and attending to the other with your fingers`);
					}
					r.addToLast(`.`);
				} else {
					r.push(`begin to`);
					if (eventSlave.nipples !== "fuckable") {
						r.push(`play with`);
					} else {
						r.push(`finger`);
					}
					r.push(`${his} nipples.`);
				}
				seX(eventSlave, "mammary", V.PC, "penetrative");
			} else if (eventSlave.trust >= 80 && (eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
				r.push(
					Spoken(eventSlave, `"my cock is getting sunburnt! Please, ${Master}, help me find someplace to hide it!"`),
					`${He} wiggles ${his} pelvis around to make ${himself} bounce enticingly, and then giggles happily as you get on top of ${him} and slip ${his} sun-warmed dick deep into your`
				);
				if (V.PC.vagina !== -1) {
					if (V.PC.vagina === 0) {
						r.push(`virgin pussy. You try to maintain composure and enjoy yourself as you feel it get <span class="virginity loss">stretched by a cock for the first time.</span>`);
						V.PC.vagina = 1;
					} else {
						r.push(`pussy.`);
					}
					seX(eventSlave, "penetrative", V.PC, "vaginal");
				} else {
					if (V.PC.anus === 0) {
						r.push(`tight, <span class="virginity loss">formerly virgin</span> asshole`);
						V.PC.anus = 1;
					} else {
						r.push(`asshole`);
					}
					seX(eventSlave, "penetrative", V.PC, "anal");
					if (V.PC.prostate > 0) {
						r.addToLast(`, shuddering with delight at the warmth tickling your prostate.`);
					} else {
						r.addToLast(`.`);
					}
				}
				if (canImpreg(V.PC, eventSlave)) {
					r.push(knockMeUp(V.PC, 20, 0, eventSlave.ID));
				}
			} else if (eventSlave.vagina <= 0) {
				r.push(
					Spoken(eventSlave, `"my butt is getting sunburnt! Please, ${Master}, help me!"`),
					`${He} rolls over and spreads ${his} buttocks, begging you to cover ${him} up. ${He} moans as ${he} feels`
				);
				if (V.PC.dick !== 0) {
					r.push(`your cockhead`);
				} else {
					r.push(`a strap-on`);
				}
				r.push(`penetrate ${his} asshole, ${his} sun-warmed buttocks clenching wonderfully against your crotch.`);
				didAnal = true;
			} else {
				r.push(
					Spoken(eventSlave, `"my pussy is getting sunburnt! Please, ${Master}, help me!"`),
					`${He} spreads ${his} legs invitingly, running a hand across ${his} clit and down to spread ${his} pussylips to the sunshine. ${He} moans as ${he} feels`
				);
				if (V.PC.dick !== 0) {
					r.push(`your cockhead`);
				} else {
					r.push(`a strap-on`);
				}
				r.push(`penetrate ${him}, ${his} sun-warmed chest warm against yours.`);
				didVaginal = true;
			}
			r.push(`${He} <span class="trust inc">trusts you more</span> for being witty with ${him}, for allowing ${him} the simple pleasure of a little sunbathing — and for sharing fun sex with ${him}, of course.`);
			eventSlave.trust += 4;
			if (didAnal) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (didVaginal) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			}
			r.toParagraph();
			return r.container();
		}

		function enjoy() {
			const r = new SpacedTextAccumulator();
			r.push(`Wordlessly, you fetch a towel of your own. ${He} raises ${his} head a little to see if ${he}'s needed, but as soon as ${he}`);
			if (canSee(eventSlave)) {
				r.push(`sees`);
			} else {
				r.push(`realizes`);
			}
			r.push(`what you're doing, ${he} smiles with simple satisfaction and closes ${his} eyes again. You strip and lie down next to ${him}. ${He} made a good decision`);
			if (eventSlave.assignment === Job.REST) {
				r.push(`about how to spend ${his} rest.`);
			} else {
				r.push(`about what to do with ${his} rest period.`);
			}
			r.push(`The sun is warm and gentle, and the interminable demands of leadership and your harem suddenly seem very far away. You drop off for a short while, only waking when your apologetic personal assistant breaks in with notice of an upcoming meeting. As you get your senses back, you notice that ${eventSlave.slaveName}'s hand is right next to yours, flattened out against the decking. ${His} eyes remain closed, and ${his} breath is steady; ${he}'s fast asleep. It seems ${he} did not want to wake you, but <span class="hotpink">wanted very much to be a little closer to you.</span> You consider canceling the meeting and waking the sun-warmed`);
			if (eventSlave.physicalAge > 30) {
				r.push(`${woman},`);
			} else if (eventSlave.physicalAge > 17) {
				r.push(`${girl},`);
			} else if (eventSlave.physicalAge > 12) {
				r.push(`teen,`);
			} else {
				r.push(`kid,`);
			}
			r.push(`but you remember that you're not exactly starved for chances to fuck ${him}. Who knows when the sun will be this nice again?`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function bring() {
			const r = new SpacedTextAccumulator();
			r.push(`You direct ${V.assistant.name} to bring your slaves who deserve it out for a day at the beach. There might be little sand out on the balcony, but there's plenty of warm sun. And beaches are overrated these days anyway, with the ocean becoming so unpredictable. ${capFirstChar(V.assistant.name)} advises them to get naked, and bring towels and sun lotion appropriate for their individual skin types, so they know they're going to get some sunshine, but they're surprised when they get outside. They're obviously expecting an orgy of some kind, but all they see is you and ${eventSlave.slaveName} luxuriating on the decking. As they arrive, they take the cue and line up with you one by one. After a long sunbathing session, you send a couple of them inside to bring out cool drinks, a beach ball, and other essentials. The hornier slaves are doubtful for a while, but eventually they all relax and <span class="trust inc">gain confidence</span> from the simple, nonsexual pleasure of a little time in the sun.`);
			if (eventSlave.ID !== V.HeadGirlID && V.HeadGirlID !== 0) {
				const {him2} = getPronouns(S.HeadGirl).appendSuffix('2');
				r.push(`Your Head Girl ${S.HeadGirl.slaveName} quietly compliments the idea, and asks you how it came to you. You let ${him2} know it was ${eventSlave.slaveName}'s idea,`);
			} else {
				r.push(`Another slave thanks you profusely, and politely asks you what gave you such a wonderful idea. You let them know it was ${eventSlave.slaveName},`);
			}
			r.push(`which ${eventSlave.slaveName}`);
			if (canHear(eventSlave)) {
				r.push(`overhears.`);
			} else if (canSee(eventSlave)) {
				r.push(`witnesses.`);
			} else {
				r.push(`soon discovers.`);
			}
			r.push(`${He} blushes prettily, and <span class="trust inc">is pleased</span> to`);
			if (canHear(eventSlave)) {
				r.push(`hear`);
			} else {
				r.push(`learn`);
			}
			r.push(`that a slave can receive credit for finding a good thing.`);
			eventSlave.trust++;
			V.slaves.forEach((s) => {
				if (s.devotion > 20) { s.trust++; }
			});
			r.toParagraph();
			return r.container();
		}
	}
};
