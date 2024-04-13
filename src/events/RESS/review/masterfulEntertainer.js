App.Events.RESSMasterfulEntertainer = class RESSMasterfulEntertainer extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.assignment === Job.PUBLIC,
				s => s.skill.entertainment >= 100,
				s => s.trust > 50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, himself
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const PC = V.PC;

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`It's Friday evening, the most socially important part of the week in ${V.arcologies[0].name}.`,
			contextualIntro(PC, eventSlave, true, false, true),
			`happens to be free this evening, and your schedule is open, too. Lately, ${he}'s been putting on a tour de force of seduction, erotic dance, and lewd entertainment whenever ${he} gets the chance to catch someone's eye`
		);
		if (eventSlave.belly >= 5000) {
			r.push(r.pop() + `, even with ${his}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`advanced pregnancy`);
			} else if (eventSlave.bellyImplant >= 3000) {
				r.push(`${belly} rounded belly`);
			} else {
				r.push(`sloshing ${eventSlave.inflationType}-filled stomach`);
			}
		}
		r.push(r.pop() + `. There are a number of events tonight you could attend with ${him} on your arm.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Go clubbing`, clubbing),
			(eventSlave.belly < 15000)
				? new App.Events.Result(`Attend a milonga`, milonga)
				: new App.Events.Result(),
			new App.Events.Result(`Never mind Friday night; the moon's out and it's romantic on the balcony`, romantic, (eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave) ? PCPenetrationWarning() : virginityWarning()),
		]);

		function virginityWarning() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
		}

		function clubbing() {
			r = [];
			r.push(`You inform ${eventSlave.slaveName} of your plans and tell ${him} to get dressed appropriately. ${He} meets you at the door wearing glitzy heels, an extremely short skirt`);
			if (eventSlave.belly >= 5000) {
				r.push(`barely noticeable under ${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly`);
			}
			r.push(r.pop() + `, and a string bikini top so brief that ${his} areolae are clearly visible. As you descend through ${V.arcologies[0].name} the beats get faster and the drops get heavier. By the time you reach the club where the Free Cities' hottest DJ has a show tonight, ${eventSlave.slaveName} is a whirlwind of sexual energy in motion, moving`);
			if (canHear(eventSlave)) {
				r.push(`with every beat`);
			} else {
				r.push(`wildly`);
			}
			r.push(`and catching every eye`);
			if (eventSlave.preg > eventSlave.pregData.normalBirth/1.33) {
				r.push(r.pop() + `, despite how far along ${he} is`);
			} else if (eventSlave.belly >= 5000 || eventSlave.weight > 130) {
				r.push(r.pop() + `, despite how big ${he} is`);
			}
			r.push(r.pop() + `. ${His} skills could have half the club lining up to fuck ${him} for money, but tonight ${he}'s all yours. The entire floor is envious of you as the night wears on and ${his} dancing turns into sexually servicing you`);
			if (canHear(eventSlave)) {
				r.push(`in time with the music`);
			}
			r.push(r.pop() + `.`);
			if (eventSlave.chastityPenis === 1) {
				r.push(`The smell of ${his} pre-cum is noticeable even over the stink of sweat.`);
			} else if (eventSlave.dick > 0 && canAchieveErection(eventSlave)) {
				r.push(`${His} tiny skirt does nothing to hide ${his} erection.`);
			} else if (eventSlave.clit > 0) {
				r.push(`${His} tiny skirt displays ${his} big, engorged clit.`);
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(`${His} arched back and cocked hips make it very clear that ${he} wants ${his} asspussy fucked.`);
			} else {
				r.push(`The smell of ${his} arousal is noticeable even over the stink of sweat.`);
			}
			if (eventSlave.boobs > 1000) {
				r.push(`${His} breasts get groped and mauled all night.`);
			} else if (eventSlave.butt > 5) {
				r.push(`${He} grinds ${his} ass against your crotch all night.`);
			} else {
				r.push(`Cum joins the sweat running off ${him}.`);
			}
			r.push(`The crowd is duly impressed; <span class="green">your reputation has increased.</span>`);
			repX(500, "event", eventSlave);
			return r;
		}

		function milonga() {
			r = [];
			r.push(`You inform ${eventSlave.slaveName} of your plans and tell ${him} to get dressed appropriately. ${He} meets you at the door wearing classy heels and a gorgeous long dress cunningly designed to adhere to ${him} while ${he} dances despite the fact that it displays all of one leg, ${his} entire back,`);
			if (eventSlave.belly >= 5000) {
				r.push(`${his} ${belly}`);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				}
				r.push(`belly,`);
			}
			r.push(`cleavage, and the sides of both breasts. ${He} has ${his} hair up in a perfect bun accented with a spray of the latest jewelry, and is wearing severe makeup that makes ${him} look aristocratic and elegant by turns. The host of the milonga, an old-world tango enthusiast, knows well the social graces and invites you, as the most prominent attendee, to perform the traditional demonstration tango that begins the dance. It goes wonderfully, and the entire party sighs in appreciation as you perform the classic tango. You lower ${eventSlave.slaveName}`);
			if (eventSlave.belly >= 10000 || eventSlave.weight > 130) {
				r.push(`'s heavy body`);
			}
			r.push(`gracefully and pull ${him} back up into a close embrace, and breath catches in more than one throat. As tradition dictates ${he} dances with many partners throughout the night. One concession to Free Cities sensibilities is that the male and female roles in the tango may be filled by anyone, and ${eventSlave.slaveName} switches flawlessly between playing the female role to the elderly host one dance and the male role to his teenage granddaughter the next. The poor girl spends the rest of the evening staring at ${eventSlave.slaveName} with her tongue tied. Whoever ${eventSlave.slaveName} dances with, ${he} always subtly shows by glance and gesture that it's you ${he} truly wants. Everyone is quite envious of you; <span class="green">your reputation has increased.</span>`);
			repX(500, "event", eventSlave);
			return r;
		}

		function romantic() {
			r = [];
			r.push(`You inform ${eventSlave.slaveName} of your plans and tell ${him} to get dressed appropriately. ${He} meets you at the door absolutely naked`);
			if (eventSlave.bellyPreg >= 1500) {
				r.push(r.pop() + `, ${his} motherly body on full display`);
			}
			r.push(r.pop() + `. ${He} has half a question on ${his} face, wondering whether this is going too far, but it vanishes when you`);
			if (canSee(eventSlave)) {
				r.push(`smile reassuringly at`);
			} else {
				r.push(`compliment`);
			}
			r.push(`${him}. You take ${him} by the hand and lead ${him} out onto the private balcony outside your office. It's a cloudless night, and the moon is full. You order the arcology to play a classic dance medley, and ${eventSlave.slaveName} becomes all innocence and grace, the perfect dance partner`);
			if (eventSlave.bellyPreg >= 10000) {
				r.push(r.pop() + `, despite ${his} heavy pregnancy`);
			} else if (eventSlave.belly >= 10000 || eventSlave.weight > 130) {
				r.push(r.pop() + `, despite ${his} weight`);
			}
			r.push(r.pop() + `. The only real consequence of ${his} nudity is`);
			if (eventSlave.boobs >= 300) {
				r.push(`the extra sway of ${his} breasts,`);
			}
			if (canPenetrate(eventSlave)) {
				r.push(`${his} visible erection, and`);
			} else if (eventSlave.clit > 0) {
				r.push(`${his} visibly engorged clit and`);
			} else if (eventSlave.boobs >= 300) {
				r.push(`and`);
			}
			if (eventSlave.nipples !== "fuckable") {
				r.push(`the hardness of ${his} nipples`);
			} else {
				r.push(`how swollen ${his} nipples are`);
			}
			r.push(`in the cool night when the dance brings you close. ${He} enjoys ${himself} immensely and in no time at all, ${he}'s meekly asking you to take ${him} inside and dance with ${him} on the bed. Naturally, you oblige.`);
			eventSlave.devotion += 3;
			eventSlave.trust += 3;
			if ((eventSlave.toyHole === "dick" || V.policies.sexualOpenness === 1) && canPenetrate(eventSlave)) {
				if (PC.vagina >= 0) {
					seX(eventSlave, "penetrative", PC, "vaginal");
					if (canImpreg(PC, eventSlave)) {
						r.push(knockMeUp(PC, 20, 0, eventSlave.ID));
					}
					if (PC.vagina === 0) {
						r.push(r.pop().replace(/.$/, ` <span class="virginity loss">giving ${him} your cherry.</span>`));
						PC.vagina++;
					}
				} else {
					seX(eventSlave, "penetrative", PC, "anal");
					if (canImpreg(PC, eventSlave)) {
						r.push(knockMeUp(PC, 20, 1, eventSlave.ID));
					}
					if (PC.anus === 0) {
						r.push(r.pop().replace(/.$/, ` <span class="virginity loss">giving ${him} your anal cherry.</span>`));
						PC.anus++;
					}
				}
			} else if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else if (eventSlave.boobs >= 1000) {
				seX(eventSlave, "mammary", PC, "penetrative");
			} else {
				seX(eventSlave, "oral", PC, "penetrative");
			}
			r.push(`${His} <span class="devotion inc">devotion to you</span> and <span class="mediumaquamarine">trust in you</span> have increased.`);
			return r;
		}
	}
};
