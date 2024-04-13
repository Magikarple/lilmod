App.Events.RESSShiftSleep = class RESSShiftSleep extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.corp.Incorporated !== 0,
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				canTalk,
				s => [Job.CONCUBINE, Job.FUCKTOY, Job.MASTERSUITE].includes(s.assignment),
				s => s.devotion > 20,
				s => s.trust >= -20,
				s => canDoAnal(s) || canDoVaginal(s),
				s => (s.chastityPenis !== 1) || (s.dick === 0),
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`Your fucktoys have to eat, sleep, and look after themselves, just like anyone, so they can't spend every moment offering themselves to you.`);
		if (S.Concubine) {
			r.push(`Your concubine, ${S.Concubine.slaveName}`);
		} else if (V.HeadGirlID !== 0) {
			r.push(`Your Head Girl, ${S.HeadGirl.slaveName}`);
		} else if (V.assistant.name === "your personal assistant") {
			r.push(`Your personal assistant`);
		} else {
			r.push(`Your personal assistant, ${capFirstChar(V.assistant.name)},`);
		}
		r.push(`manages a schedule for them, constantly changing it up to keep the sluts from getting predictable.`);
		r.push(contextualIntro(V.PC, eventSlave, true, false, true));
		r.push(`has just come on shift.`);
		r.toParagraph();

		r.push(`Though it's late, ${he}'s surprised to find the lights in the master suite off. You had an unusually trying day, so you've retired for the night; you're on the point of sleep when ${he} comes in`);
		if (S.Concubine && S.Concubine.ID !== eventSlave.ID) {
			r.addToLast(`, ${S.Concubine.slaveName} nestled under your arm`);
		}
		r.addToLast(`. After a moment's hesitation, ${eventSlave.slaveName} strips quietly and`);
		if (eventSlave.belly >= 100000) {
			r.push(`gently lowers ${his} extremely gravid body onto`);
		} else if (eventSlave.belly >= 10000) {
			r.push(`gently lowers ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			} else {
				r.push(`heavily swollen`);
			}
			r.push(`body onto`);
		} else if (eventSlave.weight > 95) {
			r.push(`gently lowers ${his} heavy body onto`);
		} else {
			r.push(`sits on`);
		}
		r.push(`the edge of the bed, preparing to climb quietly in. ${He} clearly thinks you're asleep, and is doing ${his} best not to wake you. The dim, blue-toned light of your bedroom at night washes out ${his} ${eventSlave.skin} skin and robs ${his} ${App.Desc.eyesColor(eventSlave)} of their color, but it highlights`);
		if (eventSlave.belly >= 100000) {
			r.push(`${his} ${belly} dome of a stomach,`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`greatly swollen with life.`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`greatly distended by ${his} implant.`);
			}
		} else if (eventSlave.nipples === "huge") {
			r.push(`the wonderful nipples jutting from ${his} flesh, stiffening in the cool night air.`);
		} else if (eventSlave.weight > 130) {
			r.push(`${his} fat gut, with each fold making its own shadowed trench and ${his} navel forming a little dark hollow in ${his} soft stomach.`);
		} else if (eventSlave.belly >= 5000) {
			r.push(`${his} rounded belly,`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`swollen with life.`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`filled out by ${his} implant.`);
			} else {
				r.push(`bloated with ${eventSlave.inflationType}.`);
			}
		} else if (eventSlave.weight > 95) {
			r.push(`${his} fat belly, with ${his} navel forming a little dark hollow in ${his} soft stomach.`);
		} else if (eventSlave.weight > 10) {
			r.push(`${his} plush belly, with ${his} navel forming a little dark hollow in ${his} pretty stomach.`);
		} else if (eventSlave.muscles > 30) {
			r.push(`${his} washboard abs, with each muscle casting its own little shadow.`);
		} else if (eventSlave.boobs > 1000) {
			r.push(`the huge curve of ${his} breasts, a giant dark presence.`);
		} else if (eventSlave.dick > 2) {
			r.push(`the presence between ${his} legs.`);
		} else {
			r.push(`${his} pretty face.`);
		}
		if (canSee(eventSlave)) {
			r.push(`${He} perceives the glint of your open eyes,`);
		} else if (canHear(eventSlave)) {
			r.push(`${He} hears your breathing change,`);
		} else {
			r.push(`${He} correctly guesses you're wide awake,`);
		}
		r.push(`and stops, patiently waiting for some sign of what you'd like ${him} to do.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Relaxed sex`, relaxed),
			eventSlave.belly < 150000 && canDoVaginal(eventSlave)
				? new App.Events.Result(`Surprise sex`, surprise, (eventSlave.vagina === 0) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			eventSlave.belly < 150000 && canDoAnal(eventSlave)
				? new App.Events.Result(`Surprise buttsex`, surprise2, (eventSlave.anus === 0) ? `This option will take ${his} anal virginity` : null)
				: new App.Events.Result(),
		]);

		function relaxed() {
			const r = new SpacedTextAccumulator();
			r.push(`You flip the sheet off your naked body, revealing your already`);
			if (V.PC.dick === 0) {
				r.push(`wet pussy`);
			} else {
				r.push(`stiff prick`);
				if (V.PC.vagina !== -1) {
					r.push(`and the wet pussy below it`);
				}
			}
			r.addToLast(`. ${He} slides ${himself} down, pressing ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`ridiculous tits`);
			} else if (eventSlave.boobs > 800) {
				r.push(`big breasts`);
			} else if (eventSlave.boobs > 300) {
				r.push(`nice boobs`);
			} else {
				r.push(`trim chest`);
			}
			r.push(`against your legs, and nuzzles ${his} warm nose and wet tongue against`);
			if (V.PC.balls >= 9) {
				r.push(`your oversized nuts.`);
			} else if (V.PC.vagina !== -1) {
				r.push(`your moist folds.`);
			} else {
				r.push(`your ballsack.`);
			}
			r.push(`You run a languid hand through ${his} hair, but soon relax into a pleasant, tired fugue, letting yourself enjoy ${his} ministrations. You almost drift off under the slow oral loving, but a sudden coolness against you brings you partially awake again: ${he}'s taken ${his} mouth off you, leaving the night air against your saliva-wetted`);
			if (V.PC.vagina !== -1) {
				r.push(`pussylips.`);
			} else {
				r.push(`cock.`);
			}
			r.push(`${He} quickly realizes the error, and applies ${himself} diligently to you, never letting the warm feeling die down again. You orgasm twice, which ${he} absorbs without stopping, looking up at you with an expression that's unidentifiable in the gloom. But when you finally reach down and give ${his}`);
			if (eventSlave.belly >= 10000) {
				r.push(belly);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly a light pat`);
			} else {
				r.push(`shoulder a little tug`);
			}
			r.push(`to let ${him} know that's enough, ${he} <span class="mediumaquamarine">cuddles up close to you</span> without hesitation.`);
			eventSlave.trust += 4;
			seX(eventSlave, "oral", V.PC, "penetrative");
			r.toParagraph();
			return r.container();
		}

		function surprise() {
			const r = new SpacedTextAccumulator();
			r.push(`You uncoil from under the sheet like a striking serpent, tackling ${his} ${eventSlave.skin} body off the edge of the bed`);
			if (eventSlave.bellyPreg >= 1500) {
				r.addToLast(`, twisting in midair,`);
			}
			r.push(`and onto the floor with a crash. The wind is knocked out of ${him} with an audible grunt as`);
			if (eventSlave.bellyPreg >= 1500) {
				r.push(`${he} lands on top of you and rolls over.`);
			} else {
				r.push(`you land on top of ${him}.`);
			}
			if (eventSlave.bellyPreg < 1500) {
				if (eventSlave.belly >= 10000) {
					r.push(`${His} ${belly} belly squashes out to either side of ${his} torso,`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`${His} huge breasts squash out to either side of ${his} torso,`);
				} else if (eventSlave.dick > 0) {
					r.push(`${He} shifts desperately to get some weight off ${his} trapped dick,`);
				} else {
					r.push(`${He} squirms reflexively,`);
				}
			} else if (eventSlave.boobs > 2000) {
				r.push(`${His} huge breasts flop to either side of ${his} torso,`);
			} else {
				r.push(`${He} squirms reflexively,`);
			}
			r.push(`but your attention is directed farther down: you wrap an arm around ${his} hips, hoist ${him}, shove a cushion under ${his} middle, and spread ${his}`);
			if (eventSlave.butt > 5) {
				r.push(`inconveniently plush butt`);
			} else if (eventSlave.butt > 2) {
				r.push(`big buttocks`);
			} else {
				r.push(`trim buttocks`);
			}
			r.push(`with one hand to get at ${his} pussy. You feel ${him} take a deep breath under you, and ${he} lets it out as you press`);
			if (V.PC.dick === 0) {
				r.push(`the tip of your strap-on`);
			} else {
				r.push(`your dickhead`);
			}
			r.push(`against ${his} moist slit. The relaxation`);
			if (eventSlave.vagina > 2) {
				r.push(`gapes ${his} vagina wide, welcoming you in without any resistance at all.`);
			} else if (eventSlave.vagina > 1) {
				r.push(`welcomes you in, offering you only a delicious bit of resistance to push against.`);
			} else {
				r.push(`welcomes you in, though ${he} does buck a little at the first penetration.`);
			}
			r.push(`You surprised ${him} badly, but the adrenaline melts into arousal as you pump in and out of ${his} cunt. ${He} grinds shamelessly against the cushion; since ${he}'s being a good ${girl}, you reach up to your bedside without giving ${him} any respite to fetch`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`an egg vibe. You shove it between ${him} and the cushion to give ${his} limp dick some stimulation.`);
			} else if (eventSlave.dick > 4) {
				r.push(`a huge onahole. You push it between ${him} and the cushion so ${he} can fuck it.`);
			} else if (eventSlave.dick > 0) {
				r.push(`an onahole. You push it between ${him} and the cushion so ${he} can fuck it.`);
			} else if (eventSlave.clit > 1) {
				r.push(`a shallow vibrating onahole. You push it between ${him} and the cushion so ${he} can stuff ${his} pseudophallic clit into it.`);
			} else if (canDoAnal(eventSlave)) {
				r.push(`an egg vibe. You push it into ${his} ass to stimulate ${his}`);
				if (eventSlave.prostate > 0) {
					r.push(`prostate.`);
				} else {
					r.push(`insides.`);
				}
			} else {
				r.push(`an egg vibe. You place it under ${him} so it can stimulate the sensitive skin between ${his} legs, just beneath ${his} asspussy.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${His} hands jerk out a spastic thank you in the darkness,`);
			} else {
				r.push(`${He} coos a wordless thanks,`);
			}
			r.push(`and ${he} starts humping away. If ${he} thought you were too tired for sex, you certainly <span class="hotpink">impress ${him};</span> as you spend an hour exhausting yourself against ${his} vagina, ${he} wonders whether ${his} ${getWrittenTitle(eventSlave)} is ever too tired to fuck.`);
			eventSlave.devotion += 4;
			r.push(VCheck.Vaginal(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}

		function surprise2() {
			const r = new SpacedTextAccumulator();
			r.push(`You uncoil from under the sheet like a striking serpent, tackling ${his} ${eventSlave.skin} body off the edge of the bed`);
			if (eventSlave.bellyPreg >= 1500) {
				r.addToLast(`, twisting in midair,`);
			}
			r.push(`and onto the floor with a crash. The wind is knocked out of ${him} with an audible grunt as`);
			if (eventSlave.bellyPreg >= 1500) {
				r.push(`${he} lands on top of you and rolls over.`);
			} else {
				r.push(`you land on top of ${him}.`);
			}
			if (eventSlave.bellyPreg < 1500) {
				if (eventSlave.belly >= 10000) {
					r.push(`${His} ${belly} belly squashes out to either side of ${his} torso,`);
				} else if (eventSlave.boobs > 2000) {
					r.push(`${His} huge breasts squash out to either side of ${his} torso,`);
				} else if (eventSlave.dick > 0) {
					r.push(`${He} shifts desperately to get some weight off ${his} trapped dick,`);
				} else {
					r.push(`${He} squirms reflexively,`);
				}
			} else if (eventSlave.boobs > 2000) {
				r.push(`${His} huge breasts flop to either side of ${his} torso,`);
			} else {
				r.push(`${He} squirms reflexively,`);
			}
			r.push(`but your attention is directed farther down: you wrap an arm around ${his} hips, hoist ${him}, shove a cushion under ${his} middle, and spread ${his}`);
			if (eventSlave.butt > 5) {
				r.push(`inconveniently plush butt`);
			} else if (eventSlave.butt > 2) {
				r.push(`big buttocks`);
			} else {
				r.push(`trim buttocks`);
			}
			r.push(`with one hand to get at ${his} asshole. You feel ${him} take a deep breath under you, and ${he} lets it out as you press`);
			if (V.PC.dick === 0) {
				r.push(`the tip of your strap-on`);
			} else {
				r.push(`your dickhead`);
			}
			r.push(`against ${his} anus. The relaxation`);
			if (eventSlave.anus > 2) {
				r.push(`gapes ${his} asspussy wide, welcoming you in without any resistance at all.`);
			} else if (eventSlave.anus > 1) {
				r.push(`welcomes you in, offering you only a delicious bit of resistance to push against.`);
			} else {
				r.push(`saves ${him} from too much anal pain, though ${he} does buck a little at the first penetration.`);
			}
			r.push(`You surprised ${him} badly, but the adrenaline melts into arousal as you pump in and out of ${his} ass. ${He} grinds shamelessly against the cushion; since ${he}'s being a good ${girl}, you reach up to your bedside without giving ${him} any respite to fetch`);
			if (eventSlave.dick > 0 && !canAchieveErection(eventSlave)) {
				r.push(`an egg vibe. You shove it between ${him} and the cushion to give ${his} limp dick some stimulation.`);
			} else if (eventSlave.dick > 4) {
				r.push(`a huge onahole. You push it between ${him} and the cushion so ${he} can fuck it.`);
			} else if (eventSlave.dick > 0) {
				r.push(`an onahole. You push it between ${him} and the cushion so ${he} can fuck it.`);
			} else if (eventSlave.clit > 1) {
				r.push(`a shallow vibrating onahole. You push it between ${him} and the cushion so ${he} can stuff ${his} pseudophallic clit into it.`);
			} else if (eventSlave.vagina === -1) {
				r.push(`an egg vibe. You place it under ${him} so it can stimulate the sensitive skin between ${his} legs, just beneath ${his} asspussy.`);
			} else {
				r.push(`an egg vibe. You push it between ${him} and the cushion so ${he} can rub ${his}`);
				if (!canDoVaginal(eventSlave)) {
					r.push(`chaste`);
				}
				r.push(`pussy against it.`);
			}
			if (!canTalk(eventSlave)) {
				r.push(`${His} hands jerk out a spastic thank you in the darkness,`);
			} else {
				r.push(`${He} coos a wordless thanks,`);
			}
			r.push(`and ${he} starts humping away. If ${he} thought you were too tired for sex, you certainly <span class="hotpink">impress ${him};</span> as you spend an hour exhausting yourself against ${his} asshole, ${he} wonders whether ${his} ${getWrittenTitle(eventSlave)} is ever too tired to fuck a butt.`);
			eventSlave.devotion += 4;
			r.push(VCheck.Anal(eventSlave, 1));
			r.toParagraph();
			return r.container();
		}
	}
};
