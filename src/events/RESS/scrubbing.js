App.Events.RESSScrubbing = class RESSScrubbing extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => (s.assignment === Job.QUARTER || s.assignment === Job.HOUSE),
				s => s.devotion <= 50,
				hasAnyArms,
				canWalk
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {His, He, he, his, him} = getPronouns(eventSlave);
		const {title: Master, say} = getEnunciation(eventSlave);
		const belly = bellyAdjective(eventSlave);

		let artDiv = document.createElement("div"); // named container so we can replace it later
		App.Events.drawEventArt(artDiv, eventSlave, "an apron"); // changed to an apron in conversion
		node.appendChild(artDiv);

		let r = [];
		r.push(`${V.arcologies[0].name} is well fitted with automated cleaning systems. However,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`is acting as a servant to your other slaves, so whenever ${he} has nothing else to do the cleaners are deactivated and ${he} is made to clean by hand. After all, there is no sense in leaving ${him} idle, when ${he} could be scrubbing floors.`);
		App.Events.addParagraph(node, r);

		r = [];
		r.push(`Which, incidentally, is what ${he}'s doing now. ${He} has standing orders to change into a sturdy apron when doing such work, which ${he} is not pleased to follow, since the apron has no back at`);
		if (eventSlave.belly >= 100000) {
			r.push(`all, and with ${his} ${belly}`);
			if (eventSlave.bellyPreg > 0) {
				r.push(`pregnancy,`);
			} else {
				r.push(`belly,`);
			}
			r.push(`absolutely no side coverage either.`);
		} else if (eventSlave.weight > 190) {
			r.push(`all, and with ${his} hanging gut, no side coverage either.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`all, and with ${his}`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`advanced pregnancy`);
			} else if (eventSlave.bellyImplant >= 8000) {
				r.push(`${belly} belly`);
			}
			r.push(r.pop() + ",");
			r.push(`no side coverage either.`);
		} else if (eventSlave.weight > 130) {
			r.push(`all, and with ${his} gut, no side coverage either.`);
		} else if (eventSlave.weight > 95) {
			r.push(`all, and with ${his} fat belly, no side coverage either.`);
		} else if (eventSlave.belly >= 5000) {
			r.push(`all, and with ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`growing pregnancy`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`bulging belly`);
			}
			r.push(r.pop() + ",");
			r.push(`no side coverage either.`);
		} else {
			r.push(`all.`);
		}
		r.push(`${He}'s working diligently on the floor, though, down on`);
		if (hasAllLimbs(eventSlave)) {
			r.push(`all fours,`);
		} else {
			r.push(`the ground,`);
		}
		if (eventSlave.belly >= 150000) {
			r.push(`struggling to work with ${his}`);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`pregnancy`);
			} else if (eventSlave.bellyImplant >= 8000) {
				r.push(`middle`);
			}
			r.push(`forcing ${him} off the ground, desperately trying to reach the floor with ${his} scrub brush.`);
		} else if (eventSlave.belly >= 100000) {
			r.push(his);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`pregnancy`);
			} else if (eventSlave.bellyImplant >= 8000) {
				r.push(`middle`);
			}
			r.push(`pushing uncomfortably into the floor, trying to use`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} whole arm`);
			}
			r.push(`to work a scrub-brush back and forth.`);
		} else if (eventSlave.weight > 190) {
			r.push(`${his} gut dragging along under ${him}, using`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} whole arm`);
			}
			r.push(`to work a scrub-brush back and forth.`);
		} else if (eventSlave.belly >= 10000) {
			r.push(his);
			if (eventSlave.bellyPreg >= 8000) {
				r.push(`pregnancy`);
			} else if (eventSlave.bellyImplant >= 8000) {
				r.push(`distended middle`);
			}
			r.push(`barely off the ground, using both hands to work a scrub-brush back and forth.`);
		} else if (eventSlave.weight > 130) {
			r.push(`fours, ${his} gut barely off the ground, using`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} whole arm`);
			}
			r.push(`to work a scrub-brush back and forth.`);
		} else if (eventSlave.weight > 95) {
			r.push(`${his} fat belly nearly sagging to the ground, using`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} whole arm`);
			}
			r.push(`to work a scrub-brush back and forth.`);
		} else {
			r.push(`using`);
			if (hasBothArms(eventSlave)) {
				r.push(`both hands`);
			} else {
				r.push(`${his} whole arm`);
			}
			r.push(`to work a scrub-brush back and forth.`);
		}
		r.push(`${His} bare ass bobs back and forth as though ${he} were doing it doggy style with an invisible man.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			canDoAnal(eventSlave)
				? new App.Events.Result(`Use ${his} butt to help ${him} scrub`, scrub, eventSlave.anus === 0 ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
			canDoVaginal(eventSlave)
				? new App.Events.Result(`Avail yourself to ${his} pussy`, pussy, eventSlave.vagina === 0 ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			canDoAnal(eventSlave) || canDoVaginal(eventSlave)
				? new App.Events.Result(`Give ${him} a bigger mess to deal with`, mess, virginityWarning())
				: new App.Events.Result(),
			new App.Events.Result(`Enjoy the view`, view),
		]);

		function responseIntro(){
			r = [];
			r.push(`In accordance with the rules, ${he}`);
			if (eventSlave.weight > 190 || eventSlave.belly >= 100000) {
				r.push(`struggles`);
			} else {
				r.push(`scrambles hurriedly`);
			}
			r.push(`to ${his} feet when you enter and asks`);
			if (!canTalk(eventSlave)) {
				r.push(`in gestures how ${he} can serve you.`);
			} else {
				if (eventSlave.lips > 70) {
					r.push(`meekly through ${his} massive dick-sucking lips,`);
				} else if (eventSlave.piercing.lips.weight+eventSlave.piercing.tongue.weight > 2) {
					r.push(`meekly through ${his} inconvenient oral piercings,`);
				} else {
					r.push(`meekly,`);
				}
				r.push(Spoken(eventSlave, `"${Master}, how may I serve you?"`));
			}
			return r;
		}

		function scrub() {
			r = [];
			r.push(...responseIntro());
			r.push(`You instruct ${him} to go back to what ${he} was doing.`);
			if (eventSlave.belly >= 150000) {
				r.push(`${He} leans back over ${his} ${belly} stomach,`);
			} else {
				r.push(`${He} gets back to ${his} ${eventSlave.skin} knees,`);
			}
			r.push(`puzzled, and then gasps when ${he} finds`);
			if (V.PC.dick === 0) {
				r.push(`your fingers`);
			} else {
				r.push(`your cockhead`);
			}
			r.push(`pressing against ${his} rosebud. You instruct ${his} imperiously to get on with it, and ${he} soon understands your intent. ${He} scrubs back and forth, panting and moaning, as you buttfuck ${him} in time with ${his}`);
			if (V.PC.dick === 0) {
				r.push(`labors, using your other hand to look after yourself`);
			} else if (V.PC.vagina !== -1) {
				r.push(`labors, using your other hand to schlick your pussy while you pound ${him}`);
			} else {
				r.push("labors.");
			}
			r.push(`You even carefully scoot along with ${him} when ${he} needs to reach new spots. By the time ${he}'s done ${his}`);
			if (hasBothArms(eventSlave)) {
				r.push(`arms`);
			} else {
				r.push(`arm`);
			}
			r.push(`and ${his} anus are very tired. ${His} submission to you <span class="devotion inc">has increased.</span>`);
			r.push(VCheck.Anal(eventSlave, 1));
			eventSlave.devotion += 4;
			return r;
		}

		function pussy() {
			r = [];
			r.push(...responseIntro());
			r.push(`You instruct ${him} to go back to what ${he} was doing.`);
			if (eventSlave.belly >= 150000) {
				r.push(`${He} leans back over ${his} ${belly} stomach,`);
			} else {
				r.push(`${He} gets back to ${his} ${eventSlave.skin} knees,`);
			}
			r.push(`puzzled, and then gasps when ${he} finds`);
			if (V.PC.dick === 0) {
				r.push(`your fingers`);
			} else {
				r.push(`your cockhead`);
			}
			r.push(`tracing ${his} pussy lips. You instruct ${him} imperiously to get on with it, and ${he} soon understands your intent. ${He} scrubs back and forth, panting and moaning, as you fuck ${him} in time with ${his}`);
			if (V.PC.dick === 0) {
				r.push(`labors, using your other hand to look after yourself`);
			} else if (V.PC.vagina !== -1) {
				r.push(`labors, using your other hand to schlick your pussy while you pound ${him}`);
			} else {
				r.push(`labors.`);
			}
			r.push(`You even carefully scoot along with ${him} when ${he} needs to reach new spots. By the time ${he}'s done ${his}`);
			if (hasBothArms(eventSlave)) {
				r.push(`arms are`);
			} else {
				r.push(`arm is`);
			}
			r.push(`very tired and ${his}`);
			if (hasBothLegs(eventSlave)) {
				r.push(`legs are`);
			} else {
				r.push(`leg is`);
			}
			r.push(`struggling to hold ${him}. ${His} submission to you <span class="devotion inc">has increased.</span>`);
			r.push(VCheck.Vaginal(eventSlave, 1));
			eventSlave.devotion += 4;
			return r;
		}

		function mess() {
			// replace slave art
			$(artDiv).empty();
			App.Events.drawEventArt(artDiv, eventSlave, "body oil");

			r = [];
			r.push(...responseIntro());
			r.push(`You instruct ${him} to strip off ${his} apron and lay ${his} ${eventSlave.skin} back against the ground. ${He} does, and you empty a bottle of lubricant across ${his} entire body. ${He} gasps from the cold fluid. You slide around on the floor with ${him}, playfully scrubbing ${his}`);
			if (V.seeRace === 1) {
				r.push(`${eventSlave.race}`);
			}
			r.push(`body around in the pool of lube, playing with ${his} wet breasts`);
			if (eventSlave.belly >= 5000) {
				r.push(r.pop() + ",");
				r.push(`${his} rounded`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnancy,`);
				} else {
					r.push(`stomach,`);
				}
			}
			r.push(`and ${his} lubricated thighs before`);
			if (V.PC.dick === 0) {
				r.push(`wrestling the slick slave onto ${his} back so you can ride ${his} face while reaching down to spread ${his}`);
				if (hasBothLegs(eventSlave)) {
					r.push(`legs`);
				} else {
					r.push(`cheeks`);
				}
				r.push(`and molest ${his}`);
				if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
					r.push(`pussy and ass.`);
				} else if (canDoVaginal(eventSlave)) {
					r.push(`pussy.`);
				} else {
					r.push(`ass.`);
				}
			} else {
				r.push(`sinking your cock into ${his}`);
				if (!canDoVaginal(eventSlave)) {
					r.push(`now-slick butthole`);
				} else {
					r.push(`now-slick pussy`);
					if (canDoAnal(eventSlave)) {
						r.push(`and then ${his} relaxing butthole`);
					}
				}
				if (V.PC.vagina !== -1) {
					r.push(r.pop() + ",");
					r.push(`followed by some grinding to coat ${his} face in your pussyjuice`);
				}
				r.push(r.pop() + ".");
			}
			r.push(`${He} had fun, though, and ${his} <span class="trust inc">trust in you has increased.</span>`);
			r.push(VCheck.Both(eventSlave, 1));
			eventSlave.trust += 4;
			return r;
		}

		function virginityWarning() {
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave) && eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take both ${his} virginities`;
			} else if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			} else if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function view() {
			r = [];
			r.push(...responseIntro());
			r.push(`You instruct ${him} to return to work as you pull up a seat to enjoy the view of ${his}`);
			if (eventSlave.butt > 6) {
				r.push(`ridiculous`);
			} else if (eventSlave.butt > 5) {
				r.push(`gigantic`);
			} else if (eventSlave.butt > 4) {
				r.push(`enormous`);
			} else if (eventSlave.butt > 3) {
				r.push(`huge`);
			} else if (eventSlave.butt > 2) {
				r.push(`big`);
			} else if (eventSlave.butt > 1) {
				r.push(`plump`);
			} else if (eventSlave.butt > 0) {
				r.push(`small`);
			} else {
				r.push(`flat`);
			}
			r.push(`ass wiggling as ${he} cleans. It doesn't take long for the sight to leave you eager for some sexual attention, so you call the uncomfortable slave over to service you.`);
			if (!canTalk(eventSlave)) {
				r.push(`${He} begins to sign but is cut short by you`);
			} else {
				r.push(Spoken(eventSlave, `"${Master}, what would you —"`), `${he} begins to ${say} but is cut short by you gesturing to`);
			}
			if (V.PC.belly >= 10000) {
				r.push(`your swollen belly and commenting on how its ever-growing surface could use a good polishing.`);
				if (eventSlave.fetish === "pregnancy") {
					if (eventSlave.fetishKnown === 1) {
						r.push(`${He} wastes no time in rushing over to your firm dome and bringing ${his} tongue to your navel. ${He} happily massages your middle with surprising gusto, becoming intensely aroused as your child`);
						if (V.PC.pregType > 1) {
							r.push(`ren begin`);
						} else {
							r.push(`begins`);
						}
						r.push(`to kick with excitement and even reaching orgasm just by being allowed to touch your belly. ${He} <span class="trust inc">feels closer</span> to ${his} lovely, gravid, owner after being permitted to shower attention on the thing ${he} loves most.`);
						eventSlave.trust += 5;
					} else {
						r.push(`${He} wastes no time in rushing over to your firm dome and bringing ${his} tongue to your navel. ${He} happily massages your middle with surprising gusto, becoming visibly aroused as your child`);
						if (V.PC.pregType > 1) {
							r.push(`ren begin`);
						} else {
							r.push(`begins`);
						}
						r.push(`to kick with excitement. Once ${he} finishes ${his} first lap and returns to your belly button, ${he} spasms with an intense orgasm. <span class="lightcoral">${He} clearly adores pregnant women.</span>`);
						eventSlave.fetishKnown = 1;
					}
				} else {
					r.push(`${He} does so diligently, making sure to not miss`);
					if (V.showInches === 2) {
						r.push(`an inch`);
					} else {
						r.push(`a centimeter`);
					}
					r.push(`while keeping your enjoyment above all else.`);
				}
			} else if (V.PC.dick !== 0) {
				r.push(`your erect dick and commenting on how it could use a good cleaning. ${He} carefully takes your cock into ${his} mouth, doing ${his} best to bring you to a quick orgasm so ${he} can escape your gaze. After downing your cum, ${he} attempts to pull back, but you hold ${him} down; clearly ${he} has more work to do here.`);
				seX(eventSlave, "oral", V.PC, "penetrative");
			} else if (V.PC.vagina !== -1) {
				r.push(`your soaked pussy and commenting on how someone needs to clean up after it, preferably with their tongue. ${He} carefully ${his} tongue to your clit, doing ${his} best to bring you to a quick orgasm so ${he} can escape your gaze. After bring you to a rather unsatisfying climax, ${he} attempts to pull back, but you grab ${him} and force ${him} to lick the depths of your pussy.`);
				seX(eventSlave, "oral", V.PC, "vaginal");
			}
			r.push(`By the time you are satisfied with ${his} efforts, ${he} <span class="devotion inc">has become more submissive to you.</span>`);
			eventSlave.devotion += 4;
			return r;
		}
	}
};
