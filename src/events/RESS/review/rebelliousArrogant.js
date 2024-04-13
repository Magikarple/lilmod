App.Events.RESSRebelliousArrogant = class RESSRebelliousArrogant extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				s => s.assignment !== Job.QUARTER,
				s => s.behavioralFlaw === "arrogant",
				s => s.devotion < -50,
				s => s.trust >= -50,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		App.Events.addParagraph(node, [
			`You have a lot of work to do with`,
			App.UI.DOM.combineNodes(contextualIntro(V.PC, eventSlave, true), "."),
			`${He} compounds the usual rebellious anger at being a slave with an apparently unshakeable conviction that ${he} is better than you. Oddly, ${he} seems to maintain the idea that enslaving other people is somehow inappropriate, and that having done so has lowered you morally. This morning, ${he} did not appear to start ${his} morning chores as previously ordered. ${He} sleeps on a bedroll: a brief investigation discloses that ${he} is still in it, and has pulled the blanket up over ${his} head. ${He} refuses to acknowledge your peremptory command to get up.`
		]);

		App.Events.addResponses(node, [
			new App.Events.Result(`Force ${him} out of bed and humiliate ${him} publicly`, humiliate, virginityWarning()),
			new App.Events.Result(`Let ${him} stay in bed`, stay),
			V.seePee === 1
				? new App.Events.Result(`Let ${him} stay in bed, but move it to a public restroom`, restroom)
				: new App.Events.Result(),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Let ${him} stay in bed, but move it to a whorehouse`, whorehouse, virginityWarning())
				: new App.Events.Result(),
			V.arcade > 0
				? new App.Events.Result(`Sentence ${him} to a month in the arcade`, arcade)
				: new App.Events.Result(),

		]);

		function virginityWarning() {
			if ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) {
				return `This option will take ${his} virginity`;
			}
		}

		function humiliate() {
			let r = [];
			r.push(`You drag ${him} unceremoniously out of bed and straight down into the public areas of ${V.arcologies[0].name}. ${His} struggles and protests grow more frantic as ${he}`);
			let textArray = [];
			if (canSee(eventSlave)) {
				textArray.push(`sees the first passersby beginning to stare at the little spectacle`);
			}
			if (canHear(eventSlave)) {
				textArray.push(`begins to hear the various catcalls and other comments directed at ${him}`);
			} else {
				textArray.push(`feels the outdoor air on ${his} body`);
			}
			if (textArray.length === 1) {
				r.push(`${textArray[0]}.`);
			} else if (textArray.length === 2) {
				r.push(`${textArray[0]} and ${textArray[1]}.`);
			} else if (textArray.length === 3) {
				r.push(`${textArray[0]}, ${textArray[2]} and ${textArray[3]}.`);
			}
			r.push(`You force ${him} right there, thoroughly raping the struggling ${girl} in public. <span class="trust dec">${He} learns the consequences of refusal,</span>`);
			if (FutureSocieties.isActive('FSDegradationist')) {
				r.push(`and <span class="reputation inc">your citizens certainly enjoy the public spectacle.</span>`);
				repX(100, "event", eventSlave);
			} else {
				r.push(`but <span class="reputation dec">your reputation has been decreased by the unseemly commotion.</span>`);
				repX(-100, "event", eventSlave);
			}
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(VCheck.Both(eventSlave, 1));
			} else if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else if (canDoAnal(eventSlave)) {
				r.push(VCheck.Anal(eventSlave, 1));
			} else {
				seX(eventSlave, "oral", V.PC, "penetrative");
			}
			eventSlave.trust -= 5;
			return r;
		}

		function stay() {
			eventSlave.trust += 10;
			eventSlave.devotion -= 10;
			return `You shrug and walk out of the room and back to your office; you've got more important things to worry about than some drowsy brat. ${eventSlave.slaveName}, for ${his} part, gets out of bed not long after you leave, but is surprised at <span class="devotion dec">how easily ${he} got away with this,</span> and is wondering <span class="trust inc">what else ${he} could get away with.</span>`;
		}

		function restroom() {
			eventSlave.trust -= 5;
			return `You quickly pin the blanket to the mattress, securing ${him} in place. You direct that a urinal in one of ${V.arcologies[0].name}'s public restrooms be unbolted and replaced by the mattress, slave and all. ${He}'s been swearing and threatening all this time, but the calumny reaches a shrieking crescendo (though muffled by the blanket) when ${he} feels urine beginning to soak through the blanket. After an hour or so ${he}'s begging to be let out, <span class="trust dec">swearing ${he}'ll improve ${his} conduct.</span>`;
		}

		function whorehouse() {
			let r = [];
			r.push(`You quickly pin the blanket to the mattress, securing ${him} in place. You direct that ${he} be brought to an arcology salon that serves as a slave brothel. Once ${he}'s there, you take a pair of scissors and cut a slit through the sheets. ${He}'s been swearing and threatening all this time, but the calumny reaches a shrieking crescendo when ${he} feels a cock being shoved through the slit and between ${his} buttocks. Being muffled and held immobile for rape for hire <span class="trust dec">terrifies ${him}</span> but <span class="cash inc">earns some cash.</span>`);
			eventSlave.trust -= 5;
			if (canDoVaginal(eventSlave)) {
				seX(eventSlave, "vaginal", "public", "penetrative", 5);
				if (canDoAnal(eventSlave)) {
					seX(eventSlave, "anal", "public", "penetrative", 5);
					if (eventSlave.vagina === 0 && eventSlave.anus === 0) {
						r.push(`After the patrons have their way with ${him}, <span class="virginity loss">both ${his} pussy and asshole have been broken in.</span> ${He} <span class="devotion dec">hates</span> losing ${his} virginities in such an undignified manner and <span class="trust dec">fears</span> what will be taken from ${him} next.`);
						eventSlave.trust -= 5;
						eventSlave.devotion -= 5;
						eventSlave.vagina++;
						eventSlave.anus++;
					} else if (eventSlave.vagina === 0) {
						r.push(`After the patrons have their way with ${him}, <span class="virginity loss">${he}'s certainly no longer a virgin.</span> ${He} <span class="devotion dec">hates</span> losing ${his} virginity in such an undignified manner and <span class="trust dec">fears</span> what will be taken from ${him} next.`);
						eventSlave.trust -= 5;
						eventSlave.devotion -= 5;
						eventSlave.vagina++;
					} else if (eventSlave.anus === 0) {
						r.push(`After the patrons have their way with ${him}, <span class="virginity loss">${he}'s certainly no longer an anal virgin.</span> ${He} <span class="devotion dec">hates</span> losing ${his} anal virginity in such an undignified manner and <span class="trust dec">fears</span> what will be taken from ${him} next.`);
						eventSlave.trust -= 5;
						eventSlave.devotion -= 5;
						eventSlave.anus++;
					}
					if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
						knockMeUp(eventSlave, 25, 2, -2);
					}
				} else {
					if (eventSlave.vagina === 0) {
						r.push(`After the patrons have their way with ${him}, <span class="virginity loss">${he}'s certainly no longer a virgin.</span> ${He} <span class="devotion dec">hates</span> losing ${his} virginity in such an undignified manner and <span class="trust dec">fears</span> what will be taken from ${him} next.`);
						eventSlave.trust -= 5;
						eventSlave.devotion -= 5;
						eventSlave.vagina++;
					}
					if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
						knockMeUp(eventSlave, 25, 0, -2);
					}
				}
			} else if (canDoAnal(eventSlave)) {
				seX(eventSlave, "anal", "public", "penetrative", 10);
				if (eventSlave.anus === 0) {
					r.push(`After the patrons have their way with ${him}, <span class="virginity loss">${he}'s certainly no longer an anal virgin.</span> ${He} <span class="devotion dec">hates</span> losing ${his} anal virginity in such an undignified manner and <span class="trust dec">fears</span> what will be taken from ${him} next.`);
					eventSlave.trust -= 5;
					eventSlave.devotion -= 5;
					eventSlave.anus++;
					if (canGetPregnant(eventSlave) && eventSlave.eggType === "human") {
						knockMeUp(eventSlave, 50, 1, -2);
					}
				}
			}
			cashX(100, "event", eventSlave);
			return r;
		}

		function arcade() {
			let r = [];
			r.push(`${eventSlave.slaveName} screams and begs when ${he} realizes what ${his} punishment is, but you are obdurate.`);
			if (eventSlave.muscles > 30) {
				r.push(`${His} powerful form has to be sedated for immurement in the arcade.`);
			} else if (eventSlave.weight >= 190) {
				r.push(`${He} is so massively fat that immuring ${him} in the arcade is a struggle, even when ${he} isn't trying to.`);
			} else if (eventSlave.belly >= 120000) {
				r.push(`${He} is so enormously gravid that immuring ${him} in the arcade is a hassle, even though ${his} ${belly} middle limits ${his} ability to struggle.`);
			} else if (eventSlave.weight >= -10) {
				r.push(`${His} desperate struggles make immuring ${him} in the arcade difficult.`);
			} else if (eventSlave.belly >= 1500) {
				r.push(`${His} `);
				if (eventSlave.bellyPreg >= 3000) {
					r.push(`pregnant`);
				} else {
					r.push(belly);
				}
				r.push(` body makes it slightly difficult to fit ${him} properly into the restraints for immurement in the arcade.`);
			} else if (eventSlave.muscles < -15) {
				r.push(`${His} weak body makes immuring ${him} in the arcade pathetically easy.`);
			} else {
				r.push(`${His} thin form makes immuring ${him} in the arcade pathetically easy.`);
			}
			r.push(`After ${he}'s properly confined, the only sign of ${his} discomfiture is a slight movement of ${his} ${eventSlave.skin} butt as ${he} wriggles desperately against ${his} restraints.`);
			r.push(assignJob(eventSlave, "be confined in the arcade"));
			eventSlave.sentence = 4;
			return r;
		}
	}
};
