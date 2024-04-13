App.Events.RESSGorging = class RESSGorging extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
		];
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				canMove,
				canTalk,
				canHear,
				canTaste,
				s => s.trust >= -95,
				s => s.devotion < 70,
				s => s.behavioralFlaw === "gluttonous",
				s => s.belly <= 1000
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			He, he, His, his, him, himself
		} = getPronouns(eventSlave);
		const {
			heA, hisA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {title: Master} = getEnunciation(eventSlave);
		const home = V.arcologies[0];

		eventSlave.inflation = 1;
		eventSlave.inflationMethod = 1;
		eventSlave.inflationType = "food";
		SetBellySize(eventSlave);

		App.Events.drawEventArt(node, eventSlave);

		let r = [];
		r.push(
			`As night falls on ${home.name}, you find yourself unable to fall asleep and instead decide to stroll around the Penthouse to collect your thoughts. The arcology is always buzzing with life, especially at night, but as you close in on the kitchens, an unusual gulping sound punctuated with occasional moans drowns it out. Unsurprisingly, you see the gluttonous`,
			contextualIntro(V.PC, eventSlave, true), `guzzling down as much of the liquid slave food as ${he} possibly can. You ask ${V.assistant.name} just how ${he} has managed to get the dispenser to keep pumping out food despite the limits on serving sizes that the system is supposed to track.`
		);

		if (V.assistant.personality === 1) {
			r.push(`"There have been issues with that feeder for the past week, but the proper technicians have been unavailable," ${heA} explains. "It still works, so disabling it entirely seemed unnecessary."`);
		} else {
			r.push(`"That feeder has been malfunctioning for the last few days, but the proper technicians have been unavailable," ${heA} states. "As it still serves its purpose at meal time, disabling it was deemed inefficient."`);
		}
		r.push(`As ${V.assistant.name} continues about ${hisA} oversight, you direct your attention back towards the source of the loud noises filling the cafeteria and echoing out into the halls.`);

		App.Events.addParagraph(node, r);
		r = [];

		if (V.cockFeeder === 1) {
			r.push(`${eventSlave.slaveName} is kneeling on the floor, passionately working the phallic dispenser. ${His} ${eventSlave.lips > 50 ? "plush" : ""} lips are wrapped around the rod, producing loud slurping sounds as ${he} aggressively sucks it while rubbing ${his} growing belly.`);
		} else {
			r.push(`${eventSlave.slaveName} is kneeling on a chair, ${his} ${eventSlave.lips > 50 ? "plush" : ""} lips wrapped tightly around the nozzle of the food dispenser. ${He} sucks at it aggressively while rubbing ${his} growing belly.`);
		}

		r.push(`A loud moan escapes ${him}, and you take that as your cue to approach ${him}. ${He} is so engrossed in stuffing ${himself} that ${he} doesn't ${canSee(eventSlave) ? `notice your presence` : `hear you approaching`} until you are forced to catch yourself after slipping on the puddle of overflowed food and sweat forming around ${him}, whereupon ${he} suddenly turns to face you, cheeks bulging with food${eventSlave.trust < 20 ? ` and fear flashing across ${his} face.` : `.`}`);

		App.Events.addParagraph(node, r);
		r = [];

		if (eventSlave.devotion < -20 && eventSlave.trust > 20) {
			if (eventSlave.trust > 95) {
				r.push(`${He} pauses to throw you a grin, doubting your willingness to stop ${him}, and returns to sucking down as much of the slave food as ${his} stomach can hold.`);
			} else if (eventSlave.trust > 50) {
				r.push(`${His} eyes meet yours, but ${he} doesn't cease ${his} feasting; ${he}'s comfortable, still has room for more, and quite certain you won't stop ${him}.`);
			} else {
				r.push(`${His} eyes meet yours, but ${he} doesn't cease ${his} feasting; ${he} is determined to test your limits by gorging ${himself} as much as possible before ${he} is inevitably removed from the feeder.`);
			}
		} else if (eventSlave.trust < -50) {
			r.push(`${He} attempts to get up quickly, terror clouding ${his} face. However, ${his} cumbersome belly hinders ${his} movements and in ${his} haste, ${he} slips in the puddle of slave food. ${He} quickly prostrates ${himself} in front of you, begging for your forgiveness.`);
		} else if (eventSlave.devotion > 50) {
			r.push(Spoken(eventSlave, `"${Master}! I was just so ${eventSlave.energy > 80 ? "horny" : "hungry"}, I don't know what came over me. I just needed to feel my belly growing..."`), ` ${he} ${eventSlave.trust > 50 ? "" : "nervously"} explains while continuing to tease ${his} bloated form. ${He} must have been in the cafeteria for a while already, as ${his} swollen belly sloshes slightly as ${he} speaks.`);
		} else if (eventSlave.devotion > 20) {
			r.push(Spoken(eventSlave, `"${Master}! I don't know what came over me!"`), ` ${he} ${eventSlave.trust > 50 ? "" : "nervously"} exclaims while continuing to massage ${his} bloated form, waiting to see how you will react. ${He} must have been in the cafeteria for a while already, as ${his} swollen belly sloshes slightly as ${he} speaks.`);
		} else {
			r.push(`${He} attempts to get up quickly, fear clouding ${his} face, but stumbles under ${his} weight. With ${his} cumbersome belly hindering ${his} movement, ${he} is forced to awkwardly prop ${himself} against the feeder to keep ${himself} upright.`);
		}

		App.Events.addParagraph(node, r);
		App.Events.addResponses(node, [
			new App.Events.Result(`Force-feed ${him} to orgasm`, orgasm),
			((canDoAnal(eventSlave) || canDoVaginal(eventSlave)) && eventSlave.devotion < -20 && eventSlave.trust > 20)
				? new App.Events.Result(`Spitroast ${him} with the machine`, fuck, fuckNote())
				: new App.Events.Result(),
			new App.Events.Result(`Punish ${him} for ${his} gluttony`, punish),
			new App.Events.Result(`Ignore ${him} and go back to sleep`, ignore)
		]);

		function fuckNote() {
			if (canDoVaginal(eventSlave) && (eventSlave.vagina === 0)) {
				return `This option will take ${his} virginity`;
			} else if (!canDoVaginal(eventSlave) && canDoAnal(eventSlave) && (eventSlave.anus === 0)) {
				return `This option will take ${his} anal virginity`;
			}
			return null;
		}

		function orgasm() {
			r = [];
			r.push(`You grab a length of bondage rope from the supply closet; if ${he} wants to see ${his} belly grow, then ${he} needs to do it properly.`);
			if (eventSlave.devotion < -20 && eventSlave.trust > 20) {
				r.push(`${eventSlave.slaveName}, sensing no danger, goes back to eating, only stopping to glare at you as you immobilize ${him}, but calms down again as the liquid food starts flowing `);
			} else {
				r.push(`${eventSlave.slaveName} looks at you, eyes wide open, as you immobilize ${him} and resume the flow of liquid food back`);
			}
			r.push(`into ${his} gut. You caress the distending bulge as ${he} moans into the feeder ${V.cockFeeder === 1 ? `planted deep inside ${his} throat.` : `pinned firmly to ${his} face.`}`);
			if (eventSlave.boobs > 15000) {
				r.push(`${His} tits jiggle in ${his} lap`);
			} else if (eventSlave.boobs >= 3000) {
				r.push(`${His} tits wobble up and down`);
			} else if (eventSlave.boobs >= 300) {
				r.push(`${His} breasts bob up and down`);
			} else {
				r.push(`${His} chest heaves`);
			}

			r.push(`as ${he} struggles to breathe through ${his} nose as the food continues to pour down ${his} throat. The slight swell to ${his} belly that greeted you when you walked into the cafeteria balloons forwards, churning and gurgling as serving after serving of food is pumped into the stretched organ. As the feeding system alerts you that nearly two gallons of food has been forced into ${eventSlave.slaveName}, ${his} ${canSee(eventSlave) ? "eyes roll back" : "head whips back"} towards the ceiling`);
			if (eventSlave.vagina >= 0) {
				r.push(`and vaginal fluids`);
				if (eventSlave.dick > 0) {
					r.push(`and cum`);
				}
				r.push(`spill into the mixture beneath ${him}.`);
			} else if (eventSlave.dick > 0) {
				r.push(`and ${his} cum mixes with the spilt food on the ground.`);
			} else {
				r.push(`as ${he} shudders in climax.`);
			}

			if (eventSlave.devotion < -20 && eventSlave.trust > 20) {
				r.push(`${He} gestures for you to keep going; ${his} belly may be drum-taut, but ${he} is still hungry for more.`);
			} else if (eventSlave.trust < -50) {
				r.push(`${He} starts to thrash against the restraints binding ${him} to the chair as ${his} stomach reaches capacity; the surface of ${his} food-stuffed belly having grown painfully taut.`);
			} else if (eventSlave.devotion > 50) {
				if (eventSlave.trust > 50) {
					r.push(`${He} moans out for even more food to fill ${himself} with and playfully bounces in ${his} chair, eliciting angry noises from ${his} strained stomach. ${He} trusts in ${his} ${Master} enough to let you do as you please, even as ${his} belly ripens and becomes taut with food.`);
				} else {
					r.push(`${He} starts to moan as ${his} stomach reaches capacity; the surface of ${his} food-stuffed belly having grown pleasurably taut.`);
				}
			} else if (eventSlave.devotion > 20) {
				r.push(`${He} sits patiently as ${his} stomach reaches capacity; the surface of ${his} food-stuffed belly growing taut.`);
			} else if (eventSlave.trust < 20 && eventSlave.devotion > -20) {
				r.push(`${He} whimpers as ${his} stomach reaches capacity; the surface of ${his} food-stuffed belly growing painfully taut.`);
			} else {
				r.push(`${He} groans in discomfort as ${his} stomach reaches capacity; the surface of ${his} food-stuffed belly growing painfully taut.`);
			}

			r.push(`Your acceptance of ${his} gluttony reflects in ${his} <span class="trust inc">willingness to trust you.</span>`);
			if ((eventSlave.devotion >= -20 && eventSlave.trust <= 20) || (eventSlave.trust >= -50)) {
				r.push(`Being forced to experience such a mindblowing orgasm by your ministrations <span class="devotion inc">draws ${him} closer to you,</span> even if ${he}'ll be a little sore in the morning.`);
				eventSlave.devotion += 2;
			}
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`${He} ${canSee(eventSlave) ? "glances down at" : "runs a hand over"} his glutted belly, imagining how people will <span class="devotion inc">admire</span> the constantly expanding figure you're giving ${him}.`);
				eventSlave.devotion += 2;
			} else if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`However, ${he} quickly realizes what ${he} has done to ${his} body, and the bliss on ${his} face is quickly replaced by <span class="devotion dec">disdain</span> as ${he} rationalizes that it's your fault that society will now judge ${him} over ${his} bloated figure.`);
				eventSlave.devotion -= 5;
			}
			eventSlave.trust += 5;

			eventSlave.inflation = 3;
			SetBellySize(eventSlave);
			App.Events.refreshEventArt(eventSlave);
			return r;
		}

		function fuck() {
			r = [];
			r.push(`If ${eventSlave.slaveName} wishes to ignore you and focus on the shaft filling ${his} throat, then you'll just take ${his} wiggling rump up on the offer and fill ${his} rear end too. ${His} squeals of protest quickly dissolve into moans of pleasure as`);
			if (canDoVaginal(eventSlave)) {
				if (eventSlave.vagina === 0) {
					r.push(`${his} <span class="virginity loss">virgin pussy becomes accustomed to ${his} ${getWrittenTitle(eventSlave)}'s rod,</span> all while being kept`);
					eventSlave.vagina++;
				} else {
					r.push(`you pound ${him} with enough force to keep ${him}`);
				}
			} else {
				if (eventSlave.anus === 0) {
					r.push(`${his} <span class="virginity loss">virgin asshole becomes accustomed to ${his} ${getWrittenTitle(eventSlave)}'s rod,</span> all while being kept`);
					eventSlave.anus++;
				} else {
					r.push(`you pound ${his} ass with enough force to keep ${him}`);
				}
			}
			r.push(`pinned against the feeder. You reach down and steady the distending bulge in an effort to keep ${him} from toppling under the increasing wobbling of ${his} body under your thrusts. The slight swell to ${his} belly that greeted you when you walked into the cafeteria balloons forwards, churning and gurgling as serving after serving of food is pumped into the stretched organ. As the feeding system alerts you that nearly two gallons of food has been forced into ${eventSlave.slaveName}, you feel`);
			if (canDoVaginal(eventSlave)) {
				r.push(`${him} clench down`);
			} else {
				r.push(`${his} anus clench`);
			}
			r.push(`in orgasm before passing out onto ${his} drum-taut stomach in the mixture of food and sexual fluids amassed beneath you.`);

			r.push(`${eventSlave.slaveName} awakes and struggles to push ${himself} upright, weighed down by so much food, only to knock a mop to the floor. ${He} groans at the mess ${he} has to clean up, but ${his} defiance has been tempered slightly by you showing ${him} ${his} proper place in the penthouse hierarchy.`);

			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`${He} ${canSee(eventSlave) ? "glances down at" : "runs a hand over"} his glutted belly, understanding that you only let ${him} keep eating because <span class="devotion inc">this is how you want ${him} to look.</span>`);
				eventSlave.devotion += 2;
			} else if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`However, ${he} quickly realizes what ${he} has done to ${his} body, and whatever submission to you ${he} developed is quickly replaced by <span class="devotion dec">newfound hate</span> as ${he} rationalizes that it's your fault that society will now judge ${him} over ${his} bloated figure.`);
				eventSlave.devotion -= 7;
			}

			eventSlave.devotion += 5;
			if (canDoVaginal(eventSlave)) {
				r.push(VCheck.Vaginal(eventSlave, 1));
			} else {
				r.push(VCheck.Anal(eventSlave, 1));
			}
			eventSlave.inflation = 3;
			SetBellySize(eventSlave);
			App.Events.refreshEventArt(eventSlave);
			return r;
		}

		function punish() {
			r = [];
			r.push(`You can't have your slaves being disobedient, gluttonous`);
			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`hogs, even if your society has adopted a decadent lifestyle that encourages it.`);
			} else if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`hogs, especially when your slaves are ruining their bodies in the process.`);
			} else {
				r.push(`hogs and this is the perfect time to fix it.`);
			}
			r.push(`You force ${him} to orally service you until lockjaw sets in and tears are streaming down ${his} face from the <span class="health dec">exhaustion and discomfort.</span>`);
			if (V.PC.dick > 0 || V.PC.vagina >= 0) {
				r.push(`Each time you cum into ${his} mouth, you force ${him} to spit it out;`);
				if (V.PC.vagina >= 0) {
					seX(eventSlave, "oral", V.PC, "vaginal", 5);
				} else {
					seX(eventSlave, "oral", V.PC, "penetrative", 5);
				}
				seX(eventSlave, "oral", V.PC, "penetrative", 5);
			} else {
				r.push(`You fuck ${his} mouth hard, going as far as forcing ${him} to deepthroat your large strap-on with no breaks;`);
				seX(eventSlave, "oral", V.PC, "penetrative", 10);
			}
			r.push(`${he} will be <span class="devotion dec">deriving no pleasure from this experience.</span>`);
			if (eventSlave.diet === "fattening" || eventSlave.weight > 30) {
				r.push(`As further punishment, you instruct ${V.assistant.name} to <span class="noteworthy">immediately place ${him} on a diet</span> to put an end to ${his} habit.`);
				eventSlave.diet = "restricted";
			}
			r.push(`During mealtimes, you notice ${eventSlave.slaveName} making sure to closely follow the rules, so it would seem your <span class="trust dec">lesson has stuck</span> with ${him}.`);
			eventSlave.trust -= 5;
			eventSlave.devotion -= 2;
			healthDamage(eventSlave, 3);
			deflate(eventSlave);
			return r;
		}

		function ignore() {
			r = [];
			r.push(`You have seen enough and don't have the time, nor the energy to deal with this, so you return to bed. You manage to wake up early the next day and make some extra profits with your heightened productivity, but your good spirits are soured that evening when you see ${eventSlave.slaveName} ${canWalk(eventSlave) ? `waddle past your office door with ${his} taut, food-bloated belly leading the way` : `scrape past your office door with ${his} taut, food-bloated belly dragging along beneath ${him}`}.`);

			if (FutureSocieties.isActive('FSHedonisticDecadence')) {
				r.push(`A <span class="devotion inc">smile</span> lights up ${his} face as ${he} delights in the <span class="trust inc">knowledge that ${he} has been given free rein to gorge ${himself},</span> and that ${his} gluttony will only make ${him} more popular in your indulgent society. ${eventSlave.slaveName} delights in how ${his} hugely distended gut is admired as ${he} goes about ${his} duties. ${He} had quite the good day today and is headed off to the kitchen to make tomorrow a good one as well.`);
				if (eventSlave.devotion > 50 && canSee(eventSlave) && canWalk(eventSlave)) {
					r.push(`As ${eventSlave.slaveName} walks past the open door, ${he} catches you admiring ${his} turgid form. Striking a pose, ${he} ${hasBothArms(eventSlave) ? `locks ${his} hands under his belly and shakes it,` : `bounces on ${his} heels,`} winking at you as a cacophony of sloshing radiates out from ${his} food-filled gut.`);
				}
				eventSlave.devotion += 2;
				eventSlave.trust += 7;
				cashX(5000, "event");
			} else if (FutureSocieties.isActive('FSSlimnessEnthusiast')) {
				r.push(`A <span class="devotion dec">worried</span> look crosses ${his} features as ${he} senses the disdain and disgust levied towards ${his} direction, both from yourself and the slaves currently servicing you. ${He} scampers away quickly, eager to escape your presence; ${he}'s had <span class="trust dec">plenty of torment thrown ${his} way</span> today already, and so ${he} will spend the night eating away ${his} sorrows.`);
				eventSlave.devotion -= 5;
				eventSlave.trust -= 5;
			} else {
				if (eventSlave.devotion < -20) {
					r.push(`A sly grin lights up ${his} face as ${he} delights in the knowledge that ${he} has gotten away with gorging ${himself}, and that ${his} gluttony will go <span class="trust inc">unpunished</span> for now. ${He} hums to ${himself} as ${he} heads to the kitchen to top ${himself} off.`);
				} else {
					r.push(`A smile adorns ${his} face as ${he} makes ${his} way to the kitchen to <span class="trust inc">enjoy another night</span> of stuffing ${himself} silly.`);
				}
				eventSlave.trust += 15;
			}

			eventSlave.inflation = 3;
			SetBellySize(eventSlave);
			App.Events.refreshEventArt(eventSlave);
			return r;
		}
	}
};
