App.Events.RESSObjectifyingVisit = class RESSObjectifyingVisit extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.trust > 20,
				s => s.devotion > 50
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(`At appropriate intervals during the day ${V.assistant.name} directs an unoccupied slave to visit your office to ensure all your needs are currently being met. With such a vague task set before them, the slaves who enter your domain in such a way often find themselves used in a multitude of refreshingly novel ways. At this particular moment,`);
		r.push(contextualIntro(V.PC, eventSlave, true));
		r.push(`comes through the door of your office and obediently`);
		if (eventSlave.belly >= 300000) {
			r.push(`settles ${himself}`);
		} else {
			r.push(`kneels`);
		}
		r.push(`beside your desk to await further orders. It occurs to you, gazing down at your obedient slave, that ${he} exists as little more than an object to meet your various needs. Perhaps you should treat ${him} as such.`);


		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Use ${him} as a footrest`, footrest),
			eventSlave.boobs > 300
				? new App.Events.Result(`Use ${his} breasts as stress balls`, stressballs)
				: new App.Events.Result(),
			(eventSlave.balls.isBetween(2, 20) && eventSlave.scrotum > 0)
				? new App.Events.Result(`Relieve your stress with ${his} balls`, balls)
				: new App.Events.Result(),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave) || eventSlave.belly >= 300000)
				? new App.Events.Result(`Use ${him} as an exercise ball`, exerciseball, virginityWarning())
				: new App.Events.Result(),
		]);

		function footrest() {
			r = [];
			if (eventSlave.belly >= 300000) {
				r.push(`You order ${him} to get on ${his} ${belly} belly and steady ${himself}, a task that ${he} carries out quickly and obediently. Once as comfortable as ${he} can possibly get perched awkwardly atop ${his} straining stomach,`);
			} else {
				r.push(`You order ${him} to get beneath your desk`);
				if (hasAllLimbs(eventSlave)) {
					r.push(`on all fours,`);
				} else {
					r.push(`and bend over,`);
				}
				r.push(`a task that ${he} carries out quickly and obediently. Once as comfortable as ${he} can be perched awkwardly underneath your desk,`);
			}
			r.push(`${he} braces`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					r.push(`${himself} for the loss of ${his} virginity`);
				} else {
					r.push(`${himself} for the inevitable rough fucking`);
				}
			} else if (!canDoAnal(eventSlave)) {
				r.push(`${himself} for the inevitable molestation`);
			} else {
				if (eventSlave.anus === 0) {
					r.push(`${himself} for the anal breaking`);
				} else {
					r.push(`${his} ass for the inevitable rough anal`);
				}
			}
			r.push(`${he} assumes must be coming. Fortunately for ${him}, it never does. Instead, you kick your feet up and rest them on the small of ${his} back. After a few hours of objectifying degradation in this way, you rise from your chair to attend business elsewhere in your penthouse and dismiss ${eventSlave.slaveName}. Although you didn't fuck ${him}, ${his} experience as a piece of furniture for your comfort <span class="devotion inc">has increased ${his} submissiveness.</span>`);
			eventSlave.devotion += 5;
			return r;
		}

		function stressballs() {
			r = [];
			r.push(`${He} came to your office clearly expecting to get fucked, but takes it in stride when you order ${him} to kneel beside you and stick out ${his} breasts. ${He} is similarly unruffled when you first reach over to take one of ${his}`);
			if (eventSlave.boobs > 2000) {
				r.push(`massive breasts`);
			} else if (eventSlave.boobs > 1000) {
				r.push(`large breasts`);
			} else if (eventSlave.boobs > 400) {
				r.push(`breasts`);
			} else {
				r.push(`tiny breasts`);
			}
			r.push(`in your hand and slowly squeeze it. As a result, when a particularly irritating piece of news is relayed through your monitor and you suddenly crush the breast held in your hand in response, ${eventSlave.slaveName} can't help but let out a sharp yelp before silencing ${himself}. ${He} soon realizes ${his} time with you in the near future will be as an outlet for your frustrations, and ${his} tits will be taking the brunt of the punishment. When you dismiss ${him} hours later, ${he} scurries out of your office cradling ${his} bruised bosom and <span class="trust dec">trembling from ${his} recent objectifying experience.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function balls() {
			r = [];
			r.push(`${He} came to your office clearly expecting to get fucked, but takes it in stride when you order ${him} to get up on your desk with ${his} crotch to you. ${He} is shudders slightly when you first reach over to take one of ${his}`);
			if (eventSlave.balls > 10) {
				r.push(`hypertrophied`);
			} else if (eventSlave.balls > 9) {
				r.push(`inhuman`);
			} else if (eventSlave.balls > 8) {
				r.push(`titanic`);
			} else if (eventSlave.balls > 7) {
				r.push(`gigantic`);
			} else if (eventSlave.balls > 6) {
				r.push(`monstrous`);
			} else if (eventSlave.balls > 5) {
				r.push(`huge`);
			} else if (eventSlave.balls > 4) {
				r.push(`pendulous`);
			} else if (eventSlave.balls > 3) {
				r.push(`swinging`);
			} else if (eventSlave.balls > 2) {
				r.push(`big`);
			} else if (eventSlave.balls > 1) {
				r.push(`average`);
			} else {
				r.push(`pathetic`);
			}
			r.push(`balls in your hand and slowly squeeze it. As a result, when a particularly irritating piece of news is relayed through your monitor and you suddenly crush the testicle held in your hand in response, ${eventSlave.slaveName} can't help but let out a sharp yelp before struggling to silence ${himself}. ${He} soon realizes ${his} time with you in the near future will be as an outlet for your frustrations, and you fully intend to use ${his} balls as literal stress balls. When you dismiss ${him} hours later, ${he} staggers out of your office trying ${his} best to not touch ${his} swollen testicles and <span class="trust dec">trembling from ${his} recent objectifying experience.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function exerciseball() {
			r = [];
			if (eventSlave.belly >= 3000000) {
				r.push(`You pull your chair back from your desk and order ${him} to lie on ${his} back with ${his} ${belly} belly to the ceiling. ${He} isn't sure what you are up to, but it quickly dawns on ${him} as you straddle ${his} stomach and take a seat. ${He} groans under the massive pressure increase inside ${him}, but does ${his} best to hold your weight.`);
				if (eventSlave.preg > (eventSlave.pregData.normalBirth / 4)) {
					r.push(`You manage to get very little work done. The sheer amount of motion`);
					if (V.PC.dick !== 0) {
						r.push(`beneath your balls`);
						if (V.PC.vagina !== -1) {
							r.push(`and across your pussy quickly have your cock at full attention and pussy leaking femcum.`);
						} else {
							r.push(`and between your legs quickly have your cock at full attention and dribbling precum.`);
						}
					} else {
						r.push(`on your pussy and asshole quickly have you hot and bothered.`);
					}
					r.push(`You can't stop yourself from rubbing against the squirming mass, enjoying the unique undulations across your junk. It doesn't take long to coat ${his} stomach in a layer of fluids. After a few hours of objectifying degradation in this way, you rise from your enjoyable seat to attend business elsewhere in your penthouse and dismiss ${eventSlave.slaveName}. Although you didn't penetrate ${him}, ${his} experience as a sex toy for your amusement <span class="devotion inc">has increased ${his} submissiveness.</span>`);
				} else {
					r.push(`After a few hours of objectifying degradation in this way, you rise from your novel seat to attend business elsewhere in your penthouse and dismiss ${eventSlave.slaveName}. Although you didn't fuck ${him}, ${his} experience as a piece of furniture for your comfort <span class="hotpink">has increased ${his} submissiveness.</span>`);
				}
				eventSlave.devotion += 2;
			} else {
				r.push(`You order ${him} to get down on`);
				if (hasAllLimbs(eventSlave)) {
					r.push(`all fours`);
				} else {
					r.push(`the ground`);
				}
				r.push(`and stick ${his} butt up in the air, a position ${he} assumes with the practiced efficiency of a veteran sex slave. ${He}'s expecting doggystyle and only lets out a perfunctory moan when you`);
				if (V.PC.dick === 0) {
					r.push(`don a strap-on and`);
				}
				r.push(`mount ${his} ass from behind.`);
				if (canDoVaginal(eventSlave)) {
					r.push(VCheck.Vaginal(eventSlave, 1));
				} else {
					r.push(VCheck.Anal(eventSlave, 1));
				}
				r.push(`However, ${he} is caught off guard when you half sit on ${his} ass while fucking it, using it like an exercise ball as you bounce up and down. ${His}`);
				if (eventSlave.butt > 12) {
					r.push(`immense ass fully absorbs your impacts as you pummel ${him} into the ground,`);
				} else if (eventSlave.butt > 5) {
					r.push(`huge ass cushions your thighs as you pummel ${him} into the ground,`);
				} else if (eventSlave.butt > 2) {
					r.push(`ass provides some cushioning as you pound ${him} into the ground,`);
				} else {
					r.push(`ass does little to cushion you as you fuck ${him} into the ground,`);
				}
				r.push(`but ${eventSlave.slaveName} fares much worse in ${him} role as living exercise equipment. By the end of your power workout you manage to work up quite a sweat, while your slave lays limp in the middle of your office with ${his} gaped`);
				if (canDoVaginal(eventSlave)) {
					r.push(`cunt comically held up in the air. Using ${his} pussy`);
				} else {
					r.push(`butt comically held up in the air. Using ${his} ass`);
				}
				r.push(`in such a way <span class="devotion inc">nearly fucked ${him} senseless,</span> but ${he}'ll remember <span class="trust dec">your objectifying treatment of ${him}.</span>`);
				eventSlave.devotion += 2;
				eventSlave.trust -= 2;
			}
			return r;
		}

		function virginityWarning(){
			if (eventSlave.belly < 300000) {
				if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
					return `This option will take ${his} virginity`;
				} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
					return `This option will take ${his} anal virginity`;
				}
			}
		}
	}
};
