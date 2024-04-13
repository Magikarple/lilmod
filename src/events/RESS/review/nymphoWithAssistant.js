App.Events.RESSNymphoWithAssistant = class RESSNymphoWithAssistant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.assistant.personality === 1
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.fetishKnown === 1,
				s => s.energy > 95,
				s => s.devotion > 20,
				s => s.rules.release.masturbation === 1
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;
		const {himA} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		App.Events.drawEventArt(node, eventSlave);

		const r = new SpacedTextAccumulator(node);
		r.push(
			`You pass one of the penthouse's several supply closets by chance, and are surprised to hear ${V.assistant.name}'s voice inside. Oddly, there seems to be more than one of ${himA}. You open the door on a whim, to find that almost every one of the dildo machines in the closet is currently fucking`,
			contextualIntro(PC, eventSlave, true)
		);
		if (eventSlave.belly >= 500000) {
			r.addToLast(`, atop ${his}`);
			if (eventSlave.bellyPreg >= 5000) {
				r.push(`excited and wriggling mass of children`);
			} else {
				r.push(`over-inflated sphere of a stomach`);
			}
		} else {
			r.addToLast(`, on`);
			if (hasAllLimbs(eventSlave)) {
				r.push(`all fours`);
			} else {
				r.push(`the ground`);
			}
		}
		r.push(`in the middle of the room with the machines all around ${him}. ${He} has`);
		if (canDoVaginal(eventSlave)) {
			if (eventSlave.vagina > 2) {
				r.push(`two large dildos working ${his} gaping cunt,`);
			} else if (eventSlave.vagina > 1) {
				r.push(`a large dildo working ${his} cunt,`);
			} else if (eventSlave.vagina > 0) {
				r.push(`a dildo working ${his} tight pussy,`);
			}
		}
		if (canDoAnal(eventSlave)) {
			if (eventSlave.anus > 2) {
				r.push(`two large dildos fucking ${his} enormous butthole,`);
			} else if (eventSlave.anus > 1) {
				r.push(`a large dildo fucking ${his} butthole,`);
			} else if (eventSlave.anus > 0) {
				r.push(`a dildo fucking ${his} tight butt,`);
			}
		}
		if (eventSlave.boobs > 1200) {
			r.push(`has lubricated ${his} cavernous cleavage to titfuck another,`);
		} else if (eventSlave.boobs > 400) {
			r.push(`has lubricated ${his} cleavage to titfuck another,`);
		}
		if (eventSlave.nipples === "fuckable") {
			r.push(`has a pair pistoning in and out of ${his} nipples,`);
		}
		if (hasAnyArms(eventSlave)) {
			r.push(`is performing`);
			if (!hasBothArms(eventSlave)) {
				r.push(`a frantic handjob,`);
			} else {
				r.push(`two handjobs at once, to either side,`);
			}
		}
		if (eventSlave.belly >= 5000) {
			r.push(`has lubricated the sides of ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnancy`);
			}
			r.addToLast(`, along with ${his} inner thighs, to create a sort of belly job,`);
		}
		if (eventSlave.skill.oral >= 60) {
			r.push(`and is making use of ${his} outstanding oral skills to suck off two more.`);
		} else if (eventSlave.skill.oral > 30) {
			r.push(`and is taking a throatfuck from one more.`);
		} else {
			r.push(`and is giving the final one a blowjob.`);
		}
		r.push(`When ${he}`);
		if (canSee(eventSlave)) {
			r.push(`sees that you've entered — which takes a while, since ${he}'s distracted`);
		} else if (canHear(eventSlave)) {
			r.push(`hears that you've entered — which takes a while, given the amount of noise`);
		} else {
			r.push(`realizes that you've entered — which takes a while, considering ${his} state`);
		}
		r.push(`— ${he} tries to smile`);
		if (hasAnyArms(eventSlave)) {
			r.push(`and wave`);
		}
		r.addToLast(`.`);
		r.toParagraph();
		r.push(`The source of the many-voiced personal assistant becomes clear: probably on the incorrigible ${eventSlave.slaveName}'s request, your sultry personal assistant is voicing each and every one of the machines. When the nymphomaniac masturbator tries to smile`);
		if (hasAnyArms(eventSlave)) {
			r.push(`and wave`);
		}
		r.addToLast(`, there's an absolute chorus of "Back to work, slut", "Smile less, suck more", "Take it, bitch", et cetera. Yet another instance of ${V.assistant.name} chuckles in your ear. "Care to join in, ${properTitle()}? I'm sure we can find room somewhere."`);

		r.toParagraph();

		const _cumSlaves = cumSlaves().filter(s => isSlaveAvailable(s) && canPenetrate(s)); // add additional filters
		App.Events.addResponses(node, [
			new App.Events.Result(`No, spectate and relax with ${him} afterward`, spectate),
			new App.Events.Result(`Tour ${his} holes`, tour, virginityWarning()),
			_cumSlaves.length >= 5
				? new App.Events.Result(`Replace the machines with cockmilkers from the Dairy`, replace, virginityWarning())
				: new App.Events.Result(),
		]);

		function virginityWarning() {
			if (eventSlave.anus === 0 && canDoAnal(eventSlave) || eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				return `This option will take ${his} virginity`;
			}
		}

		function spectate() {
			const r = new SpacedTextAccumulator();
			r.push(`You leave for a moment, but return quickly with a chair and a refreshing beverage so you can sit and enjoy the spectacle. It's hard to tell, but you're reasonably sure ${eventSlave.slaveName} is flattered by your interest. ${capFirstChar(V.assistant.name)} does not let ${him} go for a long time, however, and when ${he} finally retracts all the phalli, ${eventSlave.slaveName} collapses weakly to the sweat-stained floor.`);
			if (eventSlave.belly >= 300000) {
				r.push(`You try to gather the limp nympho in your arms, but ${his} ${belly} is far too heavy to carry, so you settle for assisting ${him} to your private bath, which is all ready and filled with steaming water. ${eventSlave.slaveName} groans with pleasure as you help ${him} into the water and slip in beside ${him}.`);
			} else {
				r.push(`You gather the limp nympho in your arms and carry ${him} to your private bath, which is all ready and filled with steaming water. ${eventSlave.slaveName} groans with pleasure as you lower ${him}, still cradled in your arms, into the water.`);
			}
			r.push(`${He} nuzzles ${his} ${eventSlave.skin} cheek against your`);
			if (V.PC.boobs >= 300) {
				r.push(`breasts,`);
			} else {
				r.push(`chest,`);
			}
			r.push(`<span class="devotion inc">eyes closed in bliss.</span>`);
			eventSlave.devotion += 4;
			r.toParagraph();
			return r.container();
		}

		function tour() {
			const r = new SpacedTextAccumulator();
			r.push(`The polite thing to do would be to instruct ${V.assistant.name} to retract a dildo before replacing it with`);
			if (V.PC.dick === 0) {
				r.push(`a strap-on.`);
			} else {
				r.push(`your dick.`);
			}
			r.push(`You are not, however, feeling particularly polite. ${eventSlave.slaveName} writhes in anguish when ${he} feels an additional phallus forcing its way past ${his} lips. ${He} tries to relax but loses control and spasms; the throat fucking continues unmercifully and in short order ${he} is gagging desperately. Each of ${his} holes receives the same treatment in turn; all ${he} manages to do in response is writhe here and there, and squeal incoherently whenever ${his} mouth isn't totally full. ${He} has become <span class="devotion inc">more submissive to you.</span>`);
			r.push(VCheck.Both(eventSlave, 1));
			eventSlave.devotion += 4;
			if (V.seeStretching === 1 && eventSlave.vagina === 1 && canDoVaginal(eventSlave)) {
				r.push(`${His} tight pussy <span class="lime">isn't so tight any more.</span>`);
				eventSlave.vagina += 1;
			}
			if (V.seeStretching === 1 && eventSlave.anus === 1 && canDoAnal(eventSlave)) {
				r.push(`${His} tight butt <span class="lime">has been loosened by the double anal.</span>`);
				eventSlave.anus += 1;
			}
			if (eventSlave.nipples === "fuckable") {
				seX(eventSlave, "mammary", V.PC, "penetrative");
				seX(eventSlave, "mammary", "assistant", "penetrative");
			}
			const skillIncrease = 10;
			if (eventSlave.skill.anal <= 10 && canDoAnal(eventSlave)) {
				r.push(`${He} can't help but learn how to take a rough buttfuck.`);
				r.push(slaveSkillIncrease(`anal`, eventSlave, skillIncrease));
			}
			if (eventSlave.skill.oral <= 10) {
				r.push(`${He} can't help but learn how to deepthroat.`);
				r.push(slaveSkillIncrease('oral', eventSlave, skillIncrease));
			}
			r.toParagraph();
			return r.container();
		}

		function replace() {
			const r = new SpacedTextAccumulator();
			r.push(`Some minutes later ${eventSlave.slaveName} feels one of the dildos retract and wriggles in protest. ${He}'s not long disappointed, though, as ${he} immediately feels it replaced by a turgid dick. You and ${V.assistant.name} stage-manage, and it isn't easy. Getting all the cocks into ${him} requires some creative choreography; quite apart from the limits of even ${his} well-used holes, it's hard just figuring out where everyone ought to stand. The cockmilked slaves are used to coming fast, and they do here, too, so there's also the necessity of switching them out periodically. Eventually you tire of the amusement and direct the Dairy bitches to clean up, which is no mean job, since ${eventSlave.slaveName} is by now lying in a pool of sweat and cum. But mostly cum. Despite the mess, everyone <span class="devotion inc">enjoys</span> themselves immensely.`);
			if (eventSlave.vagina === 0 && canDoVaginal(eventSlave)) {
				r.push(`${He} certainly <span class="virginity loss">isn't a virgin any more.</span>`);
				eventSlave.vagina += 1;
			}
			if (eventSlave.anus === 0 && canDoAnal(eventSlave)) {
				r.push(`${His} virgin butt <span class="virginity loss">has been broken in.</span>`);
				eventSlave.anus += 1;
			}
			eventSlave.devotion += 4;
			_cumSlaves.forEach(cumSlave => {
				cumSlave.devotion += 4;
				actX(cumSlave, "penetrative");
				if (canImpreg(eventSlave, cumSlave)) {
					if (canDoAnal(eventSlave) && canDoVaginal(eventSlave)) {
						r.push(knockMeUp(eventSlave, 5, 2, cumSlave.ID));
					} else if (canDoVaginal(eventSlave)) {
						r.push(knockMeUp(eventSlave, 5, 0, cumSlave.ID));
					} else if (canDoAnal(eventSlave)) {
						r.push(knockMeUp(eventSlave, 5, 1, cumSlave.ID));
					}
				}
			});
			if (eventSlave.nipples === "fuckable") {
				seX(eventSlave, "mammary", V.PC, "penetrative", _cumSlaves.length);
			}
			if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", V.PC, "penetrative", _cumSlaves.length);
			}
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", V.PC, "penetrative", _cumSlaves.length);
			}
			seX(eventSlave, "oral", V.PC, "penetrative", _cumSlaves.length);
			r.toParagraph();
			return r.container();
		}
	}
};
