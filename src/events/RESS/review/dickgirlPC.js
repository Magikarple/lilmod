App.Events.RESSDickgirlPC = class RESSDickgirlPC extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.PC.dick > 0,
			() => V.PC.boobs >= 300,
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canSee,
				s => s.devotion > -20,
				s => s.devotion <= 50,
				s => (s.attrXY <= 35 && s.attrXX > 65) || (s.attrXY > 65 && s.attrXX <= 35),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const PC = V.PC;
		const belly = bellyAdjective(eventSlave);
		const arms = hasBothArms(eventSlave) ? "arms" : "arm";

		App.Events.drawEventArt(node, eventSlave);

		App.Events.addParagraph(node, [
			`Having just enjoyed one of your slaves, you take a quick post-coital rinse in one of the showers scattered around the arcology for the purpose. Thus refreshed, you step out and come face to face with`,
			App.UI.DOM.combineNodes(contextualIntro(PC, eventSlave, true), ","),
			`who is going about ${his} assigned business. ${His} ${App.Desc.eyesColor(eventSlave)} lock with yours for a surprised moment, and then flick down submissively.`
		]);

		let r = [];
		r.push(`As ${his} gaze travels down your body towards the floor,`);
		if (eventSlave.attrXY <= 35) {
			r.push(`it lingers for a moment on your`);
			if (PC.boobs >= 1400) {
				r.push(`enormous`);
				if (PC.boobsImplant > 0) {
					r.push(`chest balloons`);
				} else {
					r.push(`cow tits`);
				}
			} else if (PC.boobs >= 1200) {
				r.push(`huge,`);
				if (PC.boobsImplant > 0) {
					r.push(`clearly fake`);
				} else {
					r.push(`heavy`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 1000) {
				r.push(`big`);
				if (PC.boobsImplant > 0) {
					r.push(r.pop() + `, perky`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 800) {
				r.push(`generous breasts`);
			} else if (PC.boobs >= 650) {
				r.push(`handfilling breasts`);
			} else if (PC.boobs >= 500) {
				r.push(`average breasts`);
			} else if (PC.boobs >= 300) {
				r.push(`small breasts`);
			}
			r.push(`before continuing to track downward. When it reaches your cock, still half-hard from the sex and the warm shower, ${he} stiffens with discomfort.`);
		} else {
			r.push(`${he} averts ${his} eyes from your`);
			if (PC.boobs >= 1400) {
				r.push(`enormous, bare`);
				if (PC.boobsImplant > 0) {
					r.push(`chest balloons`);
				} else {
					r.push(`cow tits`);
				}
			} else if (PC.boobs >= 1200) {
				r.push(`huge, bare,`);
				if (PC.boobsImplant > 0) {
					r.push(`clearly fake`);
				} else {
					r.push(`heavy`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 1000) {
				r.push(`big, bare`);
				if (PC.boobsImplant > 0) {
					r.push(r.pop() + `, perky`);
				}
				r.push(`breasts`);
			} else if (PC.boobs >= 800) {
				r.push(`generous, bare breasts`);
			} else if (PC.boobs >= 650) {
				r.push(`handfilling, bare breasts`);
			} else if (PC.boobs >= 500) {
				r.push(`average, bare breasts`);
			} else if (PC.boobs >= 300) {
				r.push(`small, bare breasts`);
			}
			r.push(`as best ${he} can, quickly looking farther down. ${His} gaze lingers for a moment on your cock, still half-hard from the sex and the warm shower, but ${he}'s stiff with discomfort.`);
		}
		r.push(`${He} swallows uncomfortably, frozen in place and staring at the floor. ${His} eyes flick up again, stealing a glance at`);
		if (eventSlave.attrXY <= 35) {
			r.push(`your boobs and studiously avoiding your dick.`);
		} else {
			r.push(`your dick`);
			if (PC.balls >= 8) {
				r.push(`and enormous testicles, while`);
			} else {
				r.push(`and`);
			}
			r.push(`studiously avoiding your boobs.`);
		}
		if (!canTalk(eventSlave)) {
			r.push(`${He} gestures a proper greeting, hands shaking with nervousness.`);
		} else {
			r.push(
				Spoken(eventSlave, `"Um, hi, ${Master},"`),
				`${he} ${say}s nervously.`
			);
		}
		App.Events.addParagraph(node, r);
		if (eventSlave.attrKnown !== 1) {
			App.Events.addParagraph(node, [`Just like that, the existing mystery about ${his} feelings about girls and guys is <span class="lightcoral">cleared up.</span>`]);
			eventSlave.attrKnown = 1;
		}

		App.Events.addResponses(node, [
			new App.Events.Result(`Permit ${him} to serve you in a way ${he}'ll be comfortable with`, permit),
			new App.Events.Result(`Force ${him} to get off to all of you`, force, virginityWarning()),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0) && eventSlave.attrXY <= 35) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0) && eventSlave.attrXY <= 35) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function permit() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`The poor ${girl} is having trouble with`);
			if (eventSlave.attrXY <= 35) {
				r.push(`guys, so you decide to be kind to ${him} and play up your feminine side. You lift ${his} ${eventSlave.skin} chin with a soft touch, and kiss ${him} gently on the lips, pressing your breasts full against ${his}`);
				if (eventSlave.boobs > 5000) {
					r.push(`titanic udders, which are squashed between you.`);
				} else if (eventSlave.boobs > 1000) {
					r.push(`own lovely boobs.`);
				} else {
					r.push(`chest.`);
				}
				r.push(`You keep your hips cocked back and to the side, so that your rapidly stiffening dick stays clear of ${him}. Taking ${his} hands in your own, you guide them to your`);
				if (PC.boobs >= 1400) {
					r.push(`enormous`);
					if (PC.boobsImplant !== 0) {
						r.push(`chest balloons.`);
					} else {
						r.push(`cow tits.`);
					}
				} else if (PC.boobs >= 1200) {
					r.push(`huge,`);
					if (PC.boobsImplant !== 0) {
						r.push(`clearly fake`);
					} else {
						r.push(`heavy`);
					}
					r.push(`breasts.`);
				} else if (PC.boobs >= 1000) {
					r.push(`big`);
					if (PC.boobsImplant !== 0) {
						r.push(r.pop() + `, perky`);
					}
					r.push(`breasts.`);
				} else if (PC.boobs >= 800) {
					r.push(`generous breasts.`);
				} else if (PC.boobs >= 650) {
					r.push(`handfilling breasts`);
				} else if (PC.boobs >= 500) {
					r.push(`average breasts`);
				} else if (PC.boobs >= 300) {
					r.push(`small breasts`);
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`${He} hesitates, clearly surprised that you're allowing ${him} to fondle you, but building arousal is making ${him} forget ${his} awkwardness and ${he} begins to play with your boobs in earnest. You direct ${his} fingers to your nipples, and ${he} obeys the nonverbal cue, devoting more attention to the`);
				if (PC.lactation > 0) {
					r.push(`milky,`);
				} else {
					r.push(`hard,`);
				}
				r.push(`sensitive nubs. Satisfied that ${he}'s got the idea, you run your hands lightly down ${his}`);
				if (eventSlave.weight > 190) {
					r.push(`voluminous`);
				} else if (eventSlave.belly >= 5000) {
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`gravid`);
					} else if (eventSlave.bellyImplant >= 3000) {
						r.push(`rounded`);
					} else {
						r.push(`swollen`);
					}
				} else if (eventSlave.weight > 30) {
					r.push(`soft`);
				} else if (eventSlave.muscles > 30) {
					r.push(`rock hard`);
				} else if (eventSlave.weight > 10) {
					r.push(`plush`);
				} else if (eventSlave.muscles > 5) {
					r.push(`toned`);
				} else {
					r.push(`soft`);
				}
				r.push(`body and give ${his}`);
				if (eventSlave.butt > 15) {
					r.push(`obscene`);
				} else if (eventSlave.butt > 10) {
					r.push(`absurd`);
				} else if (eventSlave.butt > 6) {
					r.push(`monstrous`);
				} else if (eventSlave.butt > 3) {
					r.push(`healthy`);
				} else {
					r.push(`cute`);
				}
				r.push(`buttocks a gentle massage.`);
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`${He} has ${his} eyes closed, and is spared any indication that ${he}'s petting and being petted by a person with a cock. ${His} arousal builds quickly, and so does yours. You resolve the situation by using a hand on each of you: you finish yourself off with practiced ease while giving ${his}`);
				if (canDoVaginal(eventSlave)) {
					r.push(`clit`);
				} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`own erection`);
				} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`fat member`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`soft member`);
				} else if (eventSlave.chastityPenis === 1) {
					r.push(`nipples`);
				} else if (eventSlave.chastityVagina) {
					r.push(`nipples`);
				} else {
					r.push(`soft perineum`);
				}
				r.push(`some manual stimulation that tips ${him} over the edge. ${He} opens ${his} eyes slowly, <span class="devotion inc">grateful</span> that you were so merciful.`);
			} else if (eventSlave.attrXX <= 35) {
				r.push(`girls, so you decide to be kind to ${him} and play up your masculine side. You grab the side of ${his} neck with a rough grip, and pull ${him} downward, forcing ${him} to ${his} knees. ${He} goes willingly, ${his} field of vision filling with your rapidly hardening member.`);
				if (eventSlave.teeth === "removable") {
					r.push(`${He} quickly pulls ${his} removable teeth out, getting ready to offer you ${his} soft facepussy.`);
				} else if (eventSlave.teeth === "pointy") {
					r.push(`${He} runs ${his} tongue over ${his} frightening teeth carefully, and then opens ${his} jaws wide, getting ready to keep ${his} fangs well clear of your shaft.`);
				} else if (eventSlave.teeth === "fangs") {
					r.push(`${He} runs ${his} tongue over ${his} fangs carefully, and then opens ${his} jaws wide, getting ready to keep ${his} teeth well clear of your shaft.`);
				} else if (eventSlave.teeth === "fang") {
					r.push(`${He} gets ready to take you from an angle to avoid ${his} fang meeting your member.`);
				} else if (eventSlave.teeth === "straightening braces" || eventSlave.teeth === "cosmetic braces") {
					r.push(`${He} runs ${his} tongue over ${his} braces, and then opens wide, mindful of keeping ${his} orthodontia clear of your shaft.`);
				} else if (eventSlave.teeth === "gapped") {
					r.push(`${He} runs ${his} tongue across the gap in ${his} front teeth and opens wide.`);
				}
				r.push(`${He} takes you into ${his} mouth without hesitation, and keeps ${his} eyes closed. ${He} visibly concentrates all ${his} attention on your dick, ignoring the breasts that are starting to bounce right over ${his} head as you begin rocking your hips with enjoyment.`);
				App.Events.addParagraph(frag, r);
				App.Events.addParagraph(frag, [`You run a possessive hand through ${his} ${eventSlave.hColor} hair, and let ${him} know what a good little cocksucker ${he} is. ${He} moans submissively in response, and the humming feels so wonderful that you order ${him} to do it again. Knowing that you're being nice to ${him} by letting ${his} ignore your more feminine characteristics for the moment, ${he} does ${his} best to please you, humming as best ${he} can and using both hands to pleasure your base and balls. You blow your load down ${his} throat, and ${he} swallows it all. ${He} opens ${his} eyes slowly, <span class="trust inc">relieved</span> that you were so merciful.`]);
			}
			eventSlave.trust += 4;
			seX(eventSlave, "oral", PC, "penetrative");
			return frag;
		}

		function force() {
			const frag = new DocumentFragment();
			r = [];
			r.push(`The close-minded ${girl} is having trouble with`);
			if (eventSlave.attrXY <= 35) {
				r.push(`guys, so ${he} gets to spend some quality time with your dick. You walk into ${him}, running into the surprised slave, driving ${him} backward into the far wall. You kiss ${him}, pinch ${him}, and grope ${him} roughly the whole time, pressing your breasts maliciously against ${his}`);
				if (eventSlave.boobs > 5000) {
					r.push(`titanic udders, which are squashed between you.`);
				} else if (eventSlave.boobs > 1000) {
					r.push(`own lovely boobs.`);
				} else {
					r.push(`chest.`);
				}
				r.push(`When ${his}`);
				if (eventSlave.butt > 15) {
					r.push(`obscene`);
				} else if (eventSlave.butt > 10) {
					r.push(`absurd`);
				} else if (eventSlave.butt > 6) {
					r.push(`monstrous`);
				} else if (eventSlave.butt > 3) {
					r.push(`healthy`);
				} else {
					r.push(`cute`);
				}
				r.push(`buttocks crash against the wall, you smash yourself against ${him}. ${He} shudders involuntarily as ${he} feels your stiffening dick between you`);
				if (eventSlave.belly >= 5000) {
					r.push(`and ${his} rounded stomach`);
				}
				r.push(r.pop() + `, and then again as it rapidly achieves full hardness, crushed between your warm bodies.`);
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`Making out with ${him} so insistently that ${he}'s short of breath, you begin to hump yourself against ${him}, sliding your prick against ${his}`);
				if (eventSlave.belly >= 5000) {
					r.push(belly);
					if (eventSlave.bellyPreg >= 3000) {
						r.push(`pregnant`);
					}
				}
				r.push(`belly, thighs, and`);
				if (canDoVaginal(eventSlave)) {
					r.push(`labia.`);
				} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`own dick.`);
				} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`fat cock.`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`limp member.`);
				} else if (eventSlave.chastityPenis === 1) {
					r.push(`caged dick.`);
				} else if (eventSlave.chastityVagina) {
					r.push(`chastity belt.`);
				} else {
					r.push(`soft perineum.`);
				}
				r.push(`${He} shudders uncomfortably as ${he} realizes that ${he}'s getting aroused, ${his}`);
				if (eventSlave.vagina > -1) {
					r.push(`pussy moistening`);
				} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`dick hardening`);
				} else if (eventSlave.dick > maxErectionSize(eventSlave) && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`dick struggling to engorge`);
				} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
					r.push(`girldick starting to ooze precum`);
				} else if (eventSlave.chastityPenis === 1) {
					r.push(`chastity cage growing ever tighter`);
				} else {
					r.push(`tiny front hole starting to ooze precum`);
				}
				r.push(`from the stimulation, despite ${his} lack of appetite for cock.`);
				if (!canDoAnal(eventSlave) && !canDoVaginal(eventSlave)) {
					r.push(`${He} knows what's coming when you push ${him}`);
					if (eventSlave.belly >= 300000) {
						r.push(`over ${his} ${belly} stomach,`);
					} else {
						r.push(`to ${his} knees,`);
					}
					r.push(`and does ${his} best to relax.`);
					App.Events.addParagraph(frag, r);
					App.Events.addParagraph(frag, [`${He} screws ${his} eyes shut tight and ${his} mouth tighter as you prod at ${his} face with your member. Tiring of ${his} reluctance, you give ${him} a brusque order to open ${his} eyes and gaze upon the dick ${he} will soon be deepthroating. ${He} obeys, but unwillingly, and steadies ${himself} to take its length. You tell ${him} to do ${his} best to watch, and begin thrusting. ${He} groans from the internal fullness and sexual confusion. ${He} stares as best ${he} can at your penis, transfixed by the sight of it thrusting into ${his} mouth and the feeling of ${his} lips around its girth.`]);
					r = [];
					r.push(`${He} slips a hand to ${his} crotch, ${his} arousal overwhelming ${his} preferences. ${He} whimpers pathetically, seeing and feeling ${himself} build towards an inevitable orgasm. You manage ${him} skillfully, holding back to ${his} point of climax before shooting your cum deep inside ${him}. The internal sensation of heat, the tightening and twitching of your member inside ${his} mouth, and your obvious pleasure force ${him} over the edge, and ${he} comes so hard that ${he} chokes on your cock. You pull out of ${him}, and ${he} struggles to catch ${his} breath, the action sending a blob of ${his} owner's semen running down ${his} chin.`);
					seX(eventSlave, "oral", PC, "penetrative", 7);
				} else if (eventSlave.belly >= 10000) {
					r.push(`${He} knows what's coming when you push ${him}`);
					if (eventSlave.belly >= 300000) {
						r.push(`over ${his} ${belly} stomach,`);
					} else {
						r.push(`to ${his} knees,`);
					}
					r.push(`and does ${his} best to relax.`);
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`${He} screws ${his} eyes shut tight as you maneuver yourself inside ${his}`);
					if (canDoVaginal(eventSlave)) {
						if (eventSlave.vagina > 2) {
							r.push(`cavernous cunt.`);
						} else if (eventSlave.vagina > 1) {
							r.push(`welcoming pussy.`);
						} else {
							r.push(`tight flower.`);
						}
					} else {
						if (eventSlave.anus > 2) {
							r.push(`unresisting asspussy.`);
						} else if (eventSlave.anus > 1) {
							r.push(`welcoming butthole.`);
						} else {
							r.push(`tight anus.`);
						}
					}
					r.push(`Once you're situated, you give ${him} a brusque order to open ${his} eyes and look behind ${him}. ${He} obeys, but unwillingly, bending as best ${he} can to see how physically close you are. ${He} can't see where it enters ${his}`);
					if (canDoVaginal(eventSlave)) {
						r.push(`womanhood,`);
					} else {
						r.push(`bowels,`);
					}
					r.push(`but ${he}'s very aware of it. You tell ${him} to do ${his} best to watch, and begin thrusting. ${He} groans from the awkward position, internal fullness, and sexual confusion. Turned as much as ${he} can, ${he} stares, transfixed by the sight of you thrusting into ${his} body.`);
					if (canDoVaginal(eventSlave)) {
						r.push(VCheck.Vaginal(eventSlave, 7));
					} else {
						r.push(VCheck.Anal(eventSlave, 7));
					}
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`You snake a hand under ${him} and begin to stimulate ${him} manually. ${He} whimpers pathetically, seeing and feeling ${himself} build towards an inevitable orgasm. You manage ${him} skillfully, bringing ${him} to the point of climax before shooting your cum deep inside ${him}. The internal sensation of heat, the tightening and twitching of your member inside ${him}, and your obvious pleasure force ${him} over the edge, and ${he} comes so hard that ${he} wriggles involuntarily against you. You release ${him}, and ${he} barely manages to catch ${himself} from collapsing, the motion sending a blob of ${his} owner's semen running down ${his} thigh.`);
				} else {
					r.push(`${He} knows what's coming when you pin ${his} torso even harder and reach down to pull ${his} knees up to clasp you around your waist, and does ${his} best to relax.`);
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`${He} screws ${his} eyes shut tight as you maneuver yourself inside ${his}`);
					if (canDoVaginal(eventSlave)) {
						if (eventSlave.vagina > 2) {
							r.push(`cavernous cunt.`);
						} else if (eventSlave.vagina > 1) {
							r.push(`welcoming pussy.`);
						} else {
							r.push(`tight flower.`);
						}
					} else {
						if (eventSlave.anus > 2) {
							r.push(`unresisting asspussy.`);
						} else if (eventSlave.anus > 1) {
							r.push(`welcoming butthole.`);
						} else {
							r.push(`tight anus.`);
						}
					}
					r.push(`Once you're confident your member is properly seated inside ${him}, and you won't drop ${him}, you give ${him} a brusque order to open ${his} eyes and look down. ${He} obeys, but unwillingly, bending as best ${he} can to look at the base of your dick where it`);
					if (canDoVaginal(eventSlave)) {
						r.push(`enters ${his} womanhood.`);
					} else {
						r.push(`disappears beneath`);
						if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
							r.push(`${his} own erect cock.`);
						} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
							r.push(`${his} own dangling cock.`);
						} else if (eventSlave.chastityPenis === 1) {
							r.push(`${his} chastity.`);
						} else {
							r.push(`${him}. ${He} can't see where it enters ${his} bowels, but ${he}'s very aware of it.`);
						}
					}
					r.push(`You tell ${him} to do ${his} best to watch, and begin thrusting. ${He} groans from the awkward position, internal fullness, and sexual confusion. Bent almost in half, ${he} stares, transfixed by the sight of your penis delving inside ${his} body.`);
					if (canDoVaginal(eventSlave)) {
						r.push(VCheck.Vaginal(eventSlave, 7));
					} else {
						r.push(VCheck.Anal(eventSlave, 7));
					}
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`You push a hand between the two of you and begin to stimulate ${him} manually. ${He} whimpers pathetically, seeing and feeling ${himself} build towards an inevitable orgasm. You manage ${him} skillfully, bringing ${him} to the point of climax before shooting your cum deep inside ${him}. The internal sensation of heat, the tightening and twitching of your member inside ${him}, and your obvious pleasure force ${him} over the edge, and ${he} comes so hard that ${he} wriggles involuntarily within your grasp. You drop ${him}, and ${he} barely manages to catch ${himself} on shaking legs, the motion sending a blob of ${his} owner's semen running down ${his} thigh.`);
				}
				App.Events.addParagraph(frag, r);
				r = [];
				r.push(`Over the week, you force ${him} to achieve daily orgasm as your cock pounds in and out of ${him}. It's difficult, blowing your load inside a compliant slave ${girl} every day, but you make the necessary sacrifice.`);
				if (random(1, 2) === 1) {
					r.push(`After a few days, ${he}'s <span class="green">obviously reconsidering ${his} previous hesitations about dick.</span>`);
					eventSlave.attrXY += 5;
				} else {
					r.push(`${He} takes it like a good slave. ${His} dislike for dick doesn't change, but ${he} gets better at <span class="devotion inc">suppressing ${his} own inclinations</span> and serving as your cum receptacle.`);
					eventSlave.devotion += 4;
				}
			} else if (eventSlave.attrXX <= 35) {
				r.push(`girls, so ${he} gets to spend some quality time with your feminine side. You kiss ${him}, teasing your tongue against ${him}, and press your breasts maliciously against ${his}`);
				if (eventSlave.boobs > 5000) {
					r.push(`titanic udders, which are squashed between you.`);
				} else if (eventSlave.boobs > 1000) {
					r.push(`own lovely boobs.`);
				} else {
					r.push(`chest.`);
				}
				r.push(`${He} shrinks away from you involuntarily, but you stroke loving hands down ${his} temples, the sides of ${his} neck, and ${his} upper arms. ${He} shudders involuntarily, and you can almost feel ${him} hate ${himself} through your lip lock. You cock your hips back and to the side, keeping your prick well clear of ${him}. As far as ${he} can feel, you're all boobs and feminine lips.`);
				App.Events.addParagraph(frag, r);
				r = [];
				if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
					r.push(`You walk forward, pressing ${him} against the far wall, and then turn yourself around, pinning ${him} against the wall with your`);
					if (eventSlave.belly >= 5000) {
						r.push(`butt, working your way under ${his} ${belly} belly`);
					} else {
						r.push("butt.");
					}
					r.push(`As ${he} hesitates, wondering what to do about this, you grab ${his} hands and place them on your`);
					if (PC.butt >= 5) {
						r.push(`enormous,`);
						if (PC.buttImplant !== 0) {
							r.push(`beachball cheeks,`);
						} else {
							r.push(`wobbling ass,`);
						}
					} else if (PC.butt >= 4) {
						r.push(`huge,`);
						if (PC.buttImplant !== 0) {
							r.push(`balloon of an`);
						} else {
							r.push(`soft`);
						}
						r.push(`ass,`);
					} else if (PC.butt >= 3) {
						r.push(`big`);
						if (PC.buttImplant !== 0) {
							r.push(`fake`);
						}
						r.push(`ass,`);
					} else {
						r.push(`ass,`);
					}
					r.push(`leading ${him} like a music teacher guiding a student's hands. When ${he}'s groping your buttocks properly, you grind against ${him} for a while, grinning to yourself as you feel an unwilling erection building between your cheeks. Pleased, you lean forward and line up your`);
					if (PC.vagina !== -1) {
						r.push(`pussy`);
					} else {
						r.push(`asshole`);
					}
					r.push(`with ${his} dick head and push back into ${him}. You repeat until ${his} hips start moving on their own. You bite on your finger at the sensation of ${his} cock inside you and, using your other hand, begin to jerk yourself off. Except for your vigorous stroking with one hand, there's little to indicate to ${him} that you have a dick; it must feel as though ${he} is banging a beautiful woman. ${He} whimpers pathetically, seeing and feeling ${himself} build towards an inevitable orgasm. You manage ${him} skillfully, taking ${him} to the point of climax before enjoying your own orgasm. The heat of your insides, the tightening and twitching of your`);
					if (PC.vagina !== -1) {
						r.push(`vagina`);
					} else {
						r.push(`rectum`);
					}
					r.push(`around ${his} cock, and your obvious pleasure force ${him} over the edge, and ${he} comes so hard that ${he} nearly knocks your to the floor. You scoot forward, letting ${him} slip from you. ${He} gets a splendid sight of your still gaped`);
					if (PC.vagina !== -1) {
						r.push(`cunt`);
					} else {
						r.push(`anus`);
					}
					r.push(`begging for more`);
					if (eventSlave.balls > 0) {
						r.push(`as a blob of ${his} semen drips from your body`);
					}
					r.push(r.pop() + `.`);
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`Over the week, you require ${him} to repeat this sexually confusing performance daily. It's difficult, having to savor a compliant slave's penis every day, but you make the necessary sacrifice.`);
					if (canImpreg(PC, eventSlave)) {
						r.push(knockMeUp(PC, 40, 0, eventSlave.ID));
					}
				} else if (eventSlave.belly >= 150000) {
					r.push(`You walk forward, pressing ${him} against the far wall, and then turn yourself around, pinning ${him} against the wall with your butt, working your way under ${his} ${belly} belly. As ${he} hesitates, wondering what to do about this, you grab ${his} hands and place them on your`);
					if (PC.butt >= 5) {
						r.push(`enormous,`);
						if (PC.buttImplant !== 0) {
							r.push(`beachball cheeks,`);
						} else {
							r.push(`wobbling ass,`);
						}
					} else if (PC.butt >= 4) {
						r.push(`huge,`);
						if (PC.buttImplant !== 0) {
							r.push(`balloon of an`);
						} else {
							r.push(`soft`);
						}
						r.push(`ass,`);
					} else if (PC.butt >= 3) {
						r.push(`big`);
						if (PC.buttImplant !== 0) {
							r.push(`fake`);
						}
						r.push(`ass,`);
					} else {
						r.push(`ass,`);
					}
					r.push(`leading ${him} like a music teacher guiding a student's hands. When ${he}'s groping your buttocks properly, you grind against ${him} for a while, grinning to yourself as you feel`);
					if (canDoVaginal(eventSlave)) {
						r.push(`an unwilling heat building low behind you. Pleased, you lean back and start to play with ${his} clit, using your other hand to jerk off.`);
					} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`an unwilling erection building between your cheeks. Pleased, you lean back and start to play with ${his} dick, using your other hand to jerk yourself off.`);
					} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`the huge cock behind you start to leak onto your back. Pleased, you lean back and start to play with ${his} dick, using your other hand to jerk yourself off.`);
					} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`the pretty girldick behind you start to leak. Pleased, you lean back and start to play with ${his} soft bitchclit, using your other hand to jerk yourself off.`);
					} else if (eventSlave.chastityPenis === 1) {
						r.push(`an unwilling heat building low behind you. Pleased, you lean back and start to tease ${his} chastity cage, using your other hand to jerk off.`);
					} else if (eventSlave.chastityVagina) {
						r.push(`an unwilling heat building low behind you. Pleased, you lean back and start to tease ${his} chastity, using your other hand to jerk off.`);
					} else if (eventSlave.race === "catgirl") {
						r.push(`a demure heat building behind you. Pleased, you lean back and start to play with the soft silky fur between ${his} legs.`);
					} else {
						r.push(`a demure heat building behind you. Pleased, you lean back and start to play with the soft smooth skin between ${his} legs.`);
					}
					r.push(`Except for your vigorous stroking with one hand, there's little to indicate to ${him} that you have a dick. It must feel as though ${he} has a beautiful woman under ${his} middle, and is playing with ${his} ass while ${he} gets ${him} off manually. You complete the feeling by bucking against ${him} with extra enthusiasm when you climax.`);
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`Over the week, you require ${him} to repeat this sexually confusing performance daily. It's difficult, having to grind against a compliant slave every day, but you make the necessary sacrifice.`);
				} else {
					r.push(`You walk forward, pressing ${him} against the far wall, and then turn yourself around, pinning ${him} against the wall with your butt`);
					if (eventSlave.belly >= 10000) {
						r.push(`as well as you can with ${his} ${belly}`);
						if (eventSlave.bellyPreg >= 3000) {
							r.push(`pregnancy`);
						} else {
							r.push(`belly`);
						}
						r.push(`pushing into you`);
					}
					r.push(r.pop() + `. As ${he} hesitates, wondering what to do about this, you grab ${his} hands and place them on your tits, leading ${him} like a music teacher guiding a student's hands. When ${he}'s stroking your nipples properly, you grind against ${him} for a while, grinning to yourself as you feel`);
					if (canDoVaginal(eventSlave)) {
						r.push(`an unwilling heat building low behind you. Pleased, you snake a hand around behind yourself and start to play with ${his} clit, using your other hand to jerk off.`);
					} else if (canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`an unwilling erection building behind you. Pleased, you snake a hand around behind yourself and start to play with ${his} dick, using your other hand to jerk yourself off.`);
					} else if (eventSlave.dick > 6 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`the huge cock behind you start to leak. Pleased, you snake a hand around behind yourself and start to play with ${his} dick, using your other hand to jerk yourself off.`);
					} else if (eventSlave.dick > 0 && !canAchieveErection(eventSlave) && !(eventSlave.chastityPenis)) {
						r.push(`the pretty girldick behind you start to leak. Pleased, you snake a hand around behind yourself and start to play with ${his} soft bitchclit, using your other hand to jerk yourself off.`);
					} else if (eventSlave.chastityPenis === 1) {
						r.push(`an unwilling heat building low behind you. Pleased, you snake a hand around behind yourself and start to tease ${his} chastity cage, using your other hand to jerk off.`);
					} else if (eventSlave.chastityVagina) {
						r.push(`an unwilling heat building low behind you. Pleased, you snake a hand around behind yourself and start to tease ${his} chastity, using your other hand to jerk off.`);
					} else if (eventSlave.race === "catgirl") {
						r.push(`a demure heat building behind you. Pleased, you snake a hand around behind yourself and start to play with the soft silky fur between ${his} legs.`);
					} else {
						r.push(`a demure heat building behind you. Pleased, you snake a hand around behind yourself and start to play with the soft smooth skin between ${his} legs.`);
					}
					r.push(`Except for your vigorous stroking with one hand, there's little to indicate to ${him} that you have a dick. It must feel as though ${he} has a beautiful woman in ${his} ${arms}, and is playing with ${his} boobs while ${he} gets ${him} off manually. You complete the feeling by craning around to rain nibbles and kisses on ${his} ${eventSlave.faceShape} face.`);
					App.Events.addParagraph(frag, r);
					r = [];
					r.push(`Over the week, you require ${him} to repeat this sexually confusing performance daily. It's difficult, having one of your slaves detailed to stimulate your nipples every day, but you make the necessary sacrifice.`);
				}
				if (random(1, 2) === 1) {
					r.push(`After a few days, ${he}'s <span class="green">obviously reconsidering ${his} previous hesitations about tits and ass.</span>`);
					eventSlave.attrXX += 5;
				} else {
					r.push(`${He} serves your feminine body like a good slave. ${His} dislike for sex with girls doesn't change, but ${he} gets better at <span class="devotion inc">suppressing ${his} own inclinations</span> and serving as your plaything.`);
					eventSlave.devotion += 4;
				}
			}
			App.Events.addParagraph(frag, r);
			return frag;
		}
	}
};
