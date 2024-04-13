App.Events.RESSDiet = class RESSDiet extends App.Events.BaseEvent {
	eventPrerequisites() {
		return []; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				s => s.devotion <= 50,
				s => s.trust >= -50,
				s => (s.behavioralFlaw === "gluttonous" || s.geneMods.livestock === 1),
				s => s.diet === "restricted",
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, his, him
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			App.UI.DOM.slaveDescriptionDialog(eventSlave),
			`is on a diet, and ${he} needs it. That doesn't make it any easier for ${him}. Your slaves are not permitted time to waste over meals. They enter the simple kitchen, drink their allotted portion of slave food out of a cup, and get on with their duties.`
		);


		if (eventSlave.preg > eventSlave.pregData.normalBirth/1.33) {
			r.push(`Despite eating for`);
			if (eventSlave.pregType <= 1) {
				r.push(`two,`);
			} else if (eventSlave.pregType >= 10) {
				r.push(`far too many,`);
			} else {
				r.push(num(eventSlave.pregType + 1),);
			}
			r.push(`${his} diet is still in full effect.`);
		}
		r.push(`${capFirstChar(V.assistant.name)} catches ${eventSlave.slaveName}, whose cup is always filled less than halfway, skulking around in the hope that one of the others will take ${his} eyes off ${his} cup, or even leave leftovers.`);

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Catch ${him} at it and punish ${him}`, punish),
			(canDoAnal(eventSlave) || canDoVaginal(eventSlave))
				? new App.Events.Result(`Make ${him} eat in your office and keep ${him} busy while ${he} does`, busy, ((eventSlave.anus === 0 && canDoAnal(eventSlave)) || (eventSlave.vagina === 0 && canDoVaginal(eventSlave))) ? `This option will take ${his} virginity` : null)
				: new App.Events.Result(),
			new App.Events.Result(`Fill ${him} up with water as punishment`, water),
			new App.Events.Result(`Make ${him} eat until ${he} regrets it`, regret),
			((cumSlaves().length >= 5) && ((eventSlave.fetish !== "cumslut") || (eventSlave.fetishKnown === 0)))
				? new App.Events.Result(`Restrict ${him} to nothing but fresh cum from the Dairy`, restrict)
				: new App.Events.Result(),
		]);

		function punish() {
			r = [];
			r.push(`It's childishly easy to catch ${him} at it. You simply call a slave eating ${his} breakfast away over the arcology's audio system, and then enter the kitchen by a different door. ${eventSlave.slaveName} has the departed slave's cup in ${his} hand and halfway to ${his} mouth when ${he}'s caught in the act. You relieve ${him} of ${his} prize, and finding that ${he} has not started ${his} own proper portion, pour it out onto the floor. You tell ${him} to lap it up without using ${his} hands, and begin counting down from ten. ${He} obeys,`);
			if (eventSlave.belly >= 300000) {
				r.push(`only to find ${his} ${belly} stomach keeps ${him} from reaching the puddle. When you reach zero you shove ${him} over ${his} middle, face first into the pool of slave food, and administer a stinging slap across ${his} thieving`);
				if (V.seeRace === 1) {
					r.push(eventSlave.race);
				}
				r.push(`ass.`);
			} else {
				r.push(`but slowly and hesitantly. When you reach zero you order ${him} to get`);
				if (hasAllLimbs(eventSlave)) {
					r.push(`to all fours`);
				} else {
					r.push(`on the ground`);
				}
				r.push(`and administer a stinging slap across ${his} thieving`);
				if (V.seeRace === 1) {
					r.push(eventSlave.race);
				}
				r.push(`ass.`);
			}
			r.push(`${He} alternates ten seconds of desperate lapping with being beaten across the buttocks until ${he}'s done, by which time ${he} is <span class="trust dec">desperate to obey and avoid further punishment.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function busy() {
			r = [];
			r.push(`${He} knows what it means when ${he}'s informed that ${him} meals will now be available in your office only. You not only supervise ${him} intake strictly, but set up a bowl for ${him} on a little stand so the chubby bitch can lap up ${his} food`);
			if (hasBothArms(eventSlave)) {
				r.push(`hands-free`);
			}
			r.push(`on`);
			if (eventSlave.belly >= 300000) {
				r.push(`${his} ${belly} belly,`);
			} else if (hasAllLimbs(eventSlave)) {
				r.push(`all fours,`);
			} else {
				r.push(`the ground,`);
			}
			r.push(`leaving ${him} open for use from behind.`);
			if (canDoVaginal(eventSlave) && canDoAnal(eventSlave)) {
				r.push(VCheck.Both(eventSlave, 3, 3));
			} else if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 6));
			} else if (canDoAnal(eventSlave)) {
				r.push(VCheck.Anal(eventSlave, 6));
			}
			r.push(`You're careful to avoid associating pleasure with misbehavior by taking ${his} cruelly every time ${he} eats, pinching ${his} nipples, and slapping ${his}`);
			if (V.seeRace === 1) {
				r.push(eventSlave.race);
			}
			r.push(`ass as you ride ${him}. This is so effective that <span class="trust dec">${he} learns to obey</span> and <span class="orange">loses weight</span> both.`);
			eventSlave.trust -= 5;
			eventSlave.weight -= 10;
			eventSlave.diet = "healthy";
			return r;
		}

		function water() {
			r = [];
			r.push(`You meet ${him} in time for ${his} next meal and tell ${him} that you're aware of ${his} stealing. You indicate a table full of cups, and tell ${him} that ${he} can drink as much as ${he} wants from them if ${he}'ll tell you the truth. ${He} confesses, and is horrified to find they're full of water, not food. You add casually that ${he} can choose not to 'eat' the contents... but that ${he}'ll get no real food until ${he} finishes every one. Torn between hunger and reluctance, ${he} spends the next hour struggling with so much water that you have to check ${him} for water intoxication. ${He} finishes with`);
			if (eventSlave.belly >= 1500) {
				r.push(`an even more bulbous`);
			} else {
				r.push(`a bulging`);
			}
			r.push(`stomach and a <span class="trust dec">sincere desire to avoid further punishment.</span>`);
			eventSlave.trust -= 5;
			return r;
		}

		function regret() {
			r = [];
			r.push(`You meet ${him} in time for ${his} next meal and tell ${him} that you're aware of ${his} stealing. You indicate a table full of cups, and tell ${him} that ${he} is going to eat the contents of every last one; every day, until ${he} regrets being a glutton. ${He} gulps at the sight, but eagerly digs in. As ${his} stomach steadily distends and the cups rapidly empty, you realize you may have made a mistake. ${He} finishes with`);
			if (eventSlave.belly >= 1500) {
				r.push(`an even more bulbous`);
			} else {
				r.push(`a hugely bulging`);
			}
			r.push(`stomach and a <span class="devotion dec">smirk at your so-called punishment.</span>`);
			eventSlave.devotion -= 5;
			eventSlave.inflationType = "food";
			eventSlave.inflationMethod = 1;
			if (eventSlave.bellyPreg > 0 || eventSlave.bellyImplant > 0) {
				eventSlave.inflation = 1;
			} else {
				eventSlave.inflation = 3;
			}
			SetBellySize(eventSlave);
			return r;
		}

		function restrict() {
			r = [];
			r.push(`You meet ${him} in time for ${his} next meal and tell ${him} that you're aware of ${his} stealing. You tell ${him} that you understand ${his} need to eat, and that for the rest of the week you'll mercifully be allowing ${him} to try a new diet on which ${he} can eat as much as ${he} wants. ${He}'s overjoyed`);
			if (canHear(eventSlave)) {
				r.push(`to hear it,`);
			} else if (canSee(eventSlave)) {
				r.push(`when ${he} reads it on a nearby screen display,`);
			} else {
				r.push(`when ${he} figures it out,`);
			}
			r.push(`though this pleasure is replaced with extreme disgust when ${he} learns that ${his} only culinary options are limited to cum. It's just nutritionally augmented enough to prevent starvation. Disgust is defeated by hunger pangs, and ${he} spends most of the week going around with a <span class="devotion inc">preoccupied</span> look on ${his} face and`);
			if (eventSlave.belly >= 1500) {
				r.push(`an even more`);
			} else {
				r.push(`a slightly`);
			}
			r.push(`distended belly. By the end, ${he}'s starting to <span class="fetish gain">salivate</span> at the mere`);
			if (canSmell(eventSlave)) {
				r.push(`scent`);
			} else {
				r.push(`thought`);
			}
			r.push(`of ejaculate.`);
			eventSlave.devotion += 4;
			eventSlave.fetish = "cumslut";
			eventSlave.fetishKnown = 1;
			eventSlave.fetishStrength = 65;
			eventSlave.inflation = 1;
			eventSlave.inflationType = "cum";
			eventSlave.inflationMethod = 1;
			SetBellySize(eventSlave);
			return r;
		}
	}
};
