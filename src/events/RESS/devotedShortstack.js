App.Events.RESSDevotedShortstack = class RESSDevotedShortstack extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.assignment !== Job.QUARTER,
				s => s.height < (Height.mean(s) * 0.95),
				s => s.physicalAge > 12,
				canDoAnal,
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canStand,
				s => s.trust <= 95,
				s => s.devotion > 20,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, hers, He, he, his, him, himself, woman, girl, loli
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		const PC = V.PC;
		const phallus = PC.dick === 0 ? "phallus" : "cock";

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		let t = [];
		t.push(App.UI.DOM.slaveDescriptionDialog(eventSlave));
		t.push(`comes before you for a routine inspection. The`);

		if ((eventSlave.height > 130) && (eventSlave.boobs > 800)) {
			t.push(`shortstack`);
		} else if ((eventSlave.height > 130) && (eventSlave.boobs < 600)) {
			t.push(`petite`);
		} else {
			t.push(`short`);
		}
		if (eventSlave.belly >= 10000) {
			if (eventSlave.bellyPreg >= 3000) {
				t.push(`and heavily pregnant`);
			} else {
				t.push(`and ${belly} bellied`);
			}
		} else if (eventSlave.bellyPreg >= 1500) {
			t.push(`pregnant`);
		}
		if (eventSlave.physicalAge > 30) {
			t.push(`${woman}`);
		} else if (eventSlave.physicalAge > 17) {
			t.push(`${girl}`);
		} else if (eventSlave.physicalAge > 12) {
			t.push(`teen`);
		} else {
			t.push(`${loli}`);
		}
		t.push(`is looking good despite ${his} diminutive height. When ${he} raises ${his}`);
		if (hasBothArms(eventSlave)) {
			t.push(`arms`);
		} else {
			t.push("arm");
		}
		t.push(`above ${his} head to submit to an inspection under your gaze, the top of ${his} ${eventSlave.hColor}-haired head doesn't even reach your chest. Despite the discrepancy between your height and ${hers}, you notice an unmistakable flush of embarrassment tinging ${his} cheeks.`);
		if (canSee(eventSlave)) {
			t.push(`${His} ${App.Desc.eyesColor(eventSlave)} flick up to gaze at you, but ${he} must crane ${his} head upwards as well to meet your gaze.`);
		} else if (canHear(eventSlave)) {
			t.push(`${His} ears perk up to hear at the sound of some minute noise you made, before ${he} cranes ${his} head upwards so that ${his} sightless eyes may meet your gaze.`);
		} else {
			t.push(`${He} knows from training and experience how tall you are, and uses this knowledge to crane ${his} head exactly so that your gaze meets ${his} face directly.`);
		}
		if (!canTalk(eventSlave)) {
			t.push(`${He} uses gestures to beg your pardon, even as ${he} continues to blush rosily, and explains that ${he} doesn't understand why you keep ${him} in your penthouse, when there are such tall, beautiful slaves in abundance in your arcology. ${He} pauses, shuffling about a little shamefacedly before signing that ${he} thinks their bodies could be more fit to pleasure you.`);
		} else {
			t.push(`"${Master}," ${he} ${say}s.`);
			t.push(Spoken(eventSlave, `"Why do you keep a short, plain slave like me in your penthouse, when there are such beautiful, tall slaves out there in the arcology?"`));
			t.push(`${He} shuffles about under your gaze a little shamefacedly before saying in a quiet voice,`);
			t.push(Spoken(eventSlave, `"Surely, their bodies are more fit for pleasuring you."`));
		}

		App.Events.addParagraph(node, t);
		t = [];

		App.Events.addResponses(node, [
			new App.Events.Result(`Show ${him} why you like having short ${girl}s around`, like, virginityWarning()),
			new App.Events.Result(`Show ${him} that short ${girl}s can still serve`, can),
			new App.Events.Result(`Show ${him} that short ${girl}s are easier to abuse`, abuse, virginityWarning(true)),
			(V.arcade > 0)
				? new App.Events.Result(`Show ${him} that short ${girl}s are amusing in the arcade`, arcade)
				: new App.Events.Result(),
		]);

		function virginityWarning(analOnly = false) {
			if (!analOnly && canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0) {
				return `This option will take ${his} anal virginity`;
			} else {
				return null;
			}
		}

		function like() {
			let frag = document.createDocumentFragment();
			t = [];

			t.push(`You hook your arms underneath ${his} own, pulling ${him} off of the ground in one swift yank upwards. Taken off guard by ${his} sudden vertical ascension, ${he} clings to your chest instinctively,`);
			if (PC.boobs >= 300 || PC.title === 0) {
				if (eventSlave.boobs > 25000) {
					t.push(`${his} immense udders doing their best to keep you apart.`);
				} else if (eventSlave.boobs > 2000) {
					t.push(`${his} huge breasts squashing against yours.`);
				} else if (eventSlave.boobs > 800) {
					t.push(`${his} breasts pressing heavily against yours.`);
				} else {
					t.push(`${his} chest pressing against your breasts.`);
				}
			} else {
				if (eventSlave.boobs > 25000) {
					t.push(`${his} immense udders doing their best to keep you apart.`);
				} else if (eventSlave.boobs > 2000) {
					t.push(`${his} huge breasts forming a soft cushion between your two bodies.`);
				} else if (eventSlave.boobs > 800) {
					t.push(`${his} breasts pressing up against your hard chest pleasantly.`);
				} else {
					t.push(`${his} chest pressing against yours.`);
				}
			}
			t.push(`${His} body is held aloft entirely by your crushing embrace and ${his}`);
			if (hasBothArms(eventSlave)) {
				t.push(`arms`);
			} else {
				t.push("arm");
			}
			t.push(`wrapped daintily about your shoulders, for as short as ${he} is, ${his} attempts to wrap ${his} legs around your waist leave them dangling awkwardly in the air. This unique position soon has ${his}`);
			if (eventSlave.belly >= 10000) {
				t.push(`${belly} belly`);
				if (PC.dick !== 0) {
					t.push(`trapping your dick against your own`);
					if (PC.pregKnown === 1) {
						t.push(`pregnancy.`);
					} else {
						t.push(`stomach.`);
					}
					t.push(`You take advantage of the situation and thrust between your middles, grunting and panting as ${his} tiny body rubs up against your cock. You quickly coat your rounded stomachs in your cum.`);
				} else {
					t.push(`rubbing against your own`);
					if (PC.pregKnown === 1) {
						t.push(`pregnancy.`);
					} else {
						t.push(`stomach.`);
					}
					t.push(`While it feels interesting, it isn't very satisfying.`);
				}
			} else {
				if (PC.dick === 0) {
					t.push(`crotch rubbing up against your own, so you don a strap-on.`);
				} else {
					t.push(`crotch rubbing up against you.`);
				}
				t.push(`Lightly maneuvering ${him} in the air, you position ${him}`);
				if (canDoVaginal(eventSlave)) {
					t.push(`such that you press up against ${his} pussy.`);
				} else {
					t.push(`such that you press up against ${his} ass.`);
				}
				t.push(`${He} moans softly in anticipation as you lift ${him} up by ${his}`);
				if (hasBothArms(eventSlave)) {
					t.push(`arms,`);
				} else {
					t.push("arm,");
				}
				t.push(`before lowering ${him} slowly onto your ${phallus},`);
				t.push(`${his} knees desperately pressing against your hips in an attempt to steady ${himself}. Held aloft in your arms, ${he} arches ${his} back and cocks ${his} hips wildly to ride you in midair,`);
				if (eventSlave.belly >= 1500) {
					t.push(`even as ${he} carefully keeps ${his} bulge from slamming into your hard body,`);
				}
				t.push(`grunting and panting as ${his} tiny body rubs up against your own.`);
			}
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`When you grow bored of the position, you turn ${him} around to impale ${his}`);
			if (eventSlave.butt > 12) {
				t.push(`bountiful`);
			} else if (eventSlave.butt > 7) {
				t.push(`giant`);
			} else if (eventSlave.butt > 5) {
				t.push(`huge`);
			} else if (eventSlave.butt > 3) {
				t.push(`rounded`);
			} else {
				t.push(`tight`);
			}
			t.push(`butt as you pound ${him} standing from behind, ${his}`);
			if (eventSlave.boobs > 2000) {
				t.push(`titanic`);
			} else if (eventSlave.boobs > 800) {
				t.push(`big`);
			} else {
				t.push(`small`);
			}
			t.push(`breasts`);
			if (eventSlave.belly >= 1500) {
				t.push(`and ${belly} belly`);
			}
			t.push(`bouncing with every deep thrust upwards. ${His} small body spasms with the force of ${his} immense pleasure, and when ${he} orgasms, you have to wrap your arms beneath ${his} breasts and pull ${him} up against you to stop ${his} limp body from crashing to the ground. Eventually, you lower ${him} back down onto the ground level, watching with bemusement as ${he} curls up, breathing heavily from ${his} exertions. Eventually ${he} recovers ${his} composure somewhat, rising from ${his} stupor to <span class="hotpink">blow you a kiss.</span>`);
			eventSlave.devotion += 4;
			if (eventSlave.belly >= 10000) {
				VCheck.Anal(eventSlave, 1);
			} else {
				VCheck.Both(eventSlave, 1, 1);
			}
			App.Events.addParagraph(frag, t);

			return frag;
		}

		function can() {
			let frag = document.createDocumentFragment();
			t = [];

			t.push(`You lightly place your palms on ${his} shoulders and apply a little `);
			if (PC.dick === 0) {
				t.push(`pressure as you don a strap-on.`);
			} else {
				t.push("pressure.");
			}
			t.push(`From your towering position above ${him}, you easily push ${him} down to ${his} knees with little more than a gradual increase in force. From your standing position,`);
			if (eventSlave.belly >= 300000) {
				t.push(`after straddling ${his} ${belly} belly,`);
			}
			t.push(`your ${phallus} hovers above ${his} head, tantalizingly out of the immediate reach of ${his} lips.`);
			if (eventSlave.teeth === "removable") {
				t.push(`${He} quickly pulls ${his} removable teeth out, setting them aside as ${he} looks up at your ${phallus}.`);
			} else if (eventSlave.teeth === "pointy" || eventSlave.teeth === "fangs") {
				t.push(`${He} opens ${his} mouth wide, revealing ${his} sharp fangs even as ${he} reminds ${himself} diligently to not ${him} sharp teeth scrape against your shaft.`);
			} else if (eventSlave.teeth === "fang") {
				t.push(`${He} opens ${his} mouth wide, revealing a mischievous fang that will make this all the more exciting.`);
			} else if (eventSlave.teeth === "gapped") {
				t.push(`${He} opens ${his} mouth wide, revealing the gap between ${his} front teeth.`);
			} else if ((eventSlave.teeth === "straightening braces") || (eventSlave.teeth === "cosmetic braces")) {
				t.push(`${He} opens ${his} mouth wide, revealing a mouthful of braces even as ${he} reminds ${himself} diligently to not ${him} orthodontia scrape against your shaft.`);
			}
			t.push(`You inform ${him} that short slaves like ${him} might have to try harder, but they can still serve just as well as any of their taller peers. Understanding your meaning, ${he} pushes ${himself} up as far as ${he} can with your hands still lightly pressing down on ${his} shoulders, straining ${his} neck until ${he} can take you fully into ${his} waiting mouth, keeping ${his} eyes closed as ${he} concentrates intently on ${his} task. ${He} lightly rocks back and forth on ${his} knees in an attempt to gain a little height to better pleasure you with ${his} mouth, an amusing sight to behold as you stand above ${him}.`);
			App.Events.addParagraph(frag, t);
			t = [];

			t.push(`Eventually, you lift a hand off of ${his} shoulder to run it possessively through ${his} ${eventSlave.hColor} hair, letting ${him} know that ${he}'s an excellent little cocksucker. In ${his} eagerness to thank you, ${he} ends up talking into your ${phallus}, though these muffled attempts at speech soon devolve back into submissive moaning. In time, you silence even these moans as you`);
			if (PC.balls >= 30) {
				t.push(`pump your endless load down ${his} throat and steadily fill ${his} stomach. ${He} opens ${his} eyes slowly, endowed with a belly stuffed to capacity with cum`);
			} else if (PC.balls >= 14) {
				t.push(`pump load after load down ${his} throat and into ${his} stomach. ${He} opens ${his} eyes slowly, endowed with a belly stuffed with cum`);
			} else if (PC.balls >= 9) {
				t.push(`blow your huge load down ${his} throat, and diligently ${he} swallows it all. ${He} opens ${his} eyes slowly, endowed with a belly full of cum`);
			} else {
				t.push(`blow your load down ${his} throat, and ${he} swallows it all. ${He} opens ${his} eyes slowly, endowed with a belly full of cum`);
			}
			t.push(`and a new understanding of <span class="mediumaquamarine">${his} place as a short slave.`);
			App.Events.addParagraph(frag, t);

			eventSlave.trust += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return frag;
		}

		function abuse() {
			t = [];

			t.push(`You inform ${him} that you find shorter slaves easier to abuse, smiling widely as an expression of horror spreads across ${his} face. This expression soon changes to one of shock and pain as you slap ${him} open-handed across the face, the sheer force of the strike sending ${him} reeling. A few slaps later and you have ${eventSlave.slaveName} on`);
			if (hasAllLimbs(eventSlave)) {
				t.push(`all fours`);
			} else {
				t.push(`the floor`);
			}
			t.push(`begging for mercy as you punish the cheeks of ${his} ass with spank after spank. When you suddenly shove`);
			if (PC.dick === 0) {
				t.push(`a dildo`);
			} else {
				t.push(`your cock`);
			}
			t.push(`up ${his} ass ${he} spasms so harshly from the pain that ${he} reflexively tries to get away, only to be subdued by the weight and strength of your larger, more powerful form. For the next ten minutes, ${he} gets beaten and choked if ${he} offers even token resistance to the brutal anal rape. Soon, tears run down the short length of ${his} body as ${he} shakes from the force of each excessive thrust into ${his} anus. The next time you decide to buttfuck ${him}, ${he}'s <span class="gold">terrified into compliance</span> by the knowledge of how little physical resistance ${he} can muster against you.`);
			eventSlave.trust -= 5;

			VCheck.Anal(eventSlave, 1);

			return t;
		}

		function arcade() {
			eventSlave.devotion += 5;
			eventSlave.trust -= 5;
			seX(eventSlave, "oral", "public", "penetrative", 55);
			healthDamage(eventSlave, 5);
			return `You inform ${eventSlave.slaveName} that short ${girl}s like ${him} are delightfully amusing when immured in the arcade. Magnanimous as you are, you have two other slaves drag ${him} off to be installed in the arcade for a day, so that ${he} too may see the humor in having short ${girl}s serve in the arcade. Though ${V.arcadeName} has arcade pens to match any height of slave, you have ${eventSlave.slaveName} confined in a pen built for a much taller slave. Although ${his} head and neck protrude from one side of the pen without issue, ${he} is too short for ${his} ass to fill the other opening. As a result, ${he} must use the tips of ${his} toes maintain an unsteady grip on the rear opening, forcing ${him} to maintain an extremely taxing stretch just to keep ${his} body held aloft within the pen. Customers are unable to fuck ${his} holes but readily delight in watching ${him} squirm to keep ${his} body extended and horizontal, even with hard cocks brutally fucking ${his} face. Somewhere in the grueling, 18-hour marathon of relentless throat fucking, ${his} precarious position slips and ${his} lower half tumbles into the interior of the pen proper. Until an attendant rescues ${him}, ${his} neck is held crooked at an unnatural angle by ${his} restraints, as the rest of ${his} body dangles beneath it. ${His} ordeal forces ${him} to accept that a short ${girl}'s place is as an <span class="hotpink">amusing arcade hole,</span> though ${he} can't find the humor <span class="gold">in such a terrible plight.</span> Furthermore, ${his} intense exertions during ${his} stay <span class="health dec">negatively effects ${his} health.</span> Your other slaves take note of what you do to short ${girl}s who ask questions about their place in your penthouse.`;
		}
	}
};
