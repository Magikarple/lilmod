App.Events.RESSSubjugationBlues = class RESSSubjugationBlues extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => FutureSocieties.isActive('FSSubjugationist')
		]; // always valid if sufficient actors can be cast successfully
	}

	actorPrerequisites() {
		return [
			[ // single event slave
				s => s.fetish !== Fetish.MINDBROKEN,
				hasAnyArms,
				hasAnyLegs,
				canTalk,
				s => s.race !== V.arcologies[0].FSSubjugationistRace,
				s => V.week - s.weekAcquired > 1,
				s => V.week - s.weekAcquired < 10,
				s => s.devotion < -20,
				s => s.trust >= -20,
				s => s.health.condition > -20,
				s => s.race === s.origRace,
				s => s.indentureRestrictions < 1,
			]
		];
	}

	execute(node) {
		const [eventSlave] = this.actors.map(a => getSlave(a));
		const {
			His, He, he, his, him, girl
		} = getPronouns(eventSlave);
		const belly = bellyAdjective(eventSlave);
		const timeEnslaved = V.week-eventSlave.weekAcquired;
		const PC = V.PC;
		const FSSubjugationistRace = V.arcologies[0].FSSubjugationistRace;

		App.Events.drawEventArt(node, eventSlave, "no clothing");

		const r = new SpacedTextAccumulator(node);
		r.push(`It's been ${timeEnslaved}`);
		if (timeEnslaved > 1) {
			r.push(`weeks`);
		} else {
			r.push(`week`);
		}
		r.push(
			`since you acquired`,
			contextualIntro(PC, eventSlave, true),
			`as your slave. Since then ${he} has been nothing but trouble. ${He} has been ungrateful, rebellious and particularly hateful toward you since you acquired ${him}. ${He} often needs to be confined or forced to perform ${his} assignments, and has little regard for your power or authority. You bring ${him} in for inspection and ${he} whines and squirms in resistance as you feel up ${his} ${eventSlave.nipples} nipples,`
		);
		if (eventSlave.belly >= 5000) {
			r.push(`rub ${his} ${belly}`);
			if (eventSlave.bellyPreg >= 3000) {
				r.push(`pregnant`);
			}
			r.push(`belly,`);
		} else if (eventSlave.bellyPreg >= 150) {
			r.push(`feel the curve of ${his} new pregnancy,`);
		}
		r.push(`and grope ${his}`);
		if (eventSlave.butt < 2) {
			r.push(`narrow`);
		} else if (eventSlave.butt < 5) {
			r.push(`average`);
		} else if (eventSlave.butt < 8) {
			r.push(`plump`);
		} else {
			r.push(`impressive`);
		}
		r.push(`butt, coldly appraising ${his} potential worth as a sexual service provider.`);
		if (eventSlave.actualAge < 21) {
			r.push(`${He} is very young, only ${eventSlave.actualAge} years old, and is still very naïve. ${His} smooth, ${eventSlave.skin} skin has yet to experience the hard years of relentless sexual abuse that lie ahead of ${him}.`);
		} else {
			r.push(`At ${eventSlave.actualAge} years old, ${he} should know by now how the world works, but some slaves are just too stubborn for their own good.`);
		}
		r.push(`Eventually, of course, even the most headstrong ${girl}s will bend to your will, but the unique social mores of your arcology and the wonders of modern surgical technology offer a prime opportunity to make a potent example of this`);
		if (eventSlave.actualAge < 21) {
			r.push(`young`);
		} else {
			r.push(`obstinate`);
		}
		r.push(`slut. ${He} is ${eventSlave.race}, and therefore not considered racially inferior or subject to extreme inequities or neglect, but like most slave characteristics, that can change.`);

		r.toParagraph();
		App.Events.addResponses(node, [
			new App.Events.Result(`Surgically alter ${him} to be of the inferior ${FSSubjugationistRace} race, and give ${him} a public debut`, surgically, (eventSlave.anus === 0 || eventSlave.vagina === 0) ? `This option will take ${his} virginity and ignore ${his} chastity` : null),
			new App.Events.Result(`No surgery today, but give ${him} something to think about`, think),
			new App.Events.Result(`Discipline ${him} normally. Artificial racial subjugation is going too far`, discipline),
		]);

		function surgically() {
			if (FSSubjugationistRace === 0) { // do not remove-- check is for typing assistance
				return;
			}
			const r = new SpacedTextAccumulator();
			r.push(`Some slaves have a bigger potential price to pay for disobedience than they realize. ${eventSlave.slaveName} is ${eventSlave.race}, which is`);
			if (eventSlave.race !== V.arcologies[0].FSSupremacistRace) {
				r.push(`not particularly noteworthy.`);
			} else {
				r.push(`advantageous to ${him}, as it is generally unpopular to enslave a ${girl} of the superior race.`);
			}
			r.push(`However, ${he}'s about to learn that ${his} racial appearance isn't immutable, and in your arcology, it can make a big difference in how ${he} is treated. You escort the struggling`);
			if (eventSlave.pregKnown === 1 && eventSlave.bellyPreg >= 1500) {
				r.push(`mother-to-be`);
			} else {
				r.push(`${girl}`);
			}
			r.push(`to the surgery center and instruct ${V.assistant.name} to alter ${his} appearance so that ${he} appears to be ${FSSubjugationistRace}. The full meaning of your instructions`);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant < -15) {
				r.push(`slowly start to dawn on ${eventSlave.slaveName}'s stupid face`);
			} else {
				r.push(`spark a quick reaction`);
				if (canSee(eventSlave)) {
					r.push(`from ${eventSlave.slaveName}'s intelligent eyes`);
				} else {
					r.push(`on ${eventSlave.slaveName}'s intelligent face`);
				}
			}
			r.push(`and ${he} whimpers and begs for you to reconsider even as ${he}'s strapped onto the operating table.`);
			r.toParagraph();
			r.push(`By the time ${he} wakes up from the anesthesia, you've already made the necessary alterations to ${his} permanent records, which now clearly indicate that ${he} was born ${FSSubjugationistRace} and as such, can be rightfully regarded as the racially inferior fuck-animal ${he} now is. Of course, your fellow slaveowners and the slave market will be savvy enough to see through the alterations you've forced upon ${him}, but when you make ${him} available for a day of use in the public square, all your average citizen knows is that the ${girl} they are fucking is simply a worthless ${FSSubjugationistRace} slut who doesn't deserve much more than a stomach full of cum. The surgery <span class="health dec">negatively effects ${his} health,</span> but by the end of a long day ${he}'ll likely never forget, ${he} has gotten a crash course in what it means to be a ${FSSubjugationistRace} slave in your arcology, and any evidence that ${he} was born ${eventSlave.race} has been efficiently expunged from ${his} records.`);
			if (eventSlave.vagina === 0 || eventSlave.anus === 0) {
				r.push(`<span class="virginity loss">All vestiges of ${his} virginity have been unceremoniously stripped away.</span>`);
			}
			r.push(`The experience has <span class="devotion inc">broken down ${his} resistance,</span> and your willingness to go to such extremes to subjugate ${him} <span class="trust dec">greatly increases ${his} fear of you.</span>`);
			eventSlave.devotion += 5;
			eventSlave.trust -= 10;
			eventSlave.anus++;
			seX(eventSlave, "anal", "public", "penetrative", 25);
			seX(eventSlave, "oral", "public", "penetrative", 35);
			if (eventSlave.vagina > -1) {
				eventSlave.vagina++;
				seX(eventSlave, "vaginal", "public", "penetrative", 20);
			}
			knockMeUp(eventSlave, 100, 2, -2);
			cashX(forceNeg(V.surgeryCost), "slaveSurgery", eventSlave);
			surgeryDamage(eventSlave, 20);
			eventSlave.race = FSSubjugationistRace;
			eventSlave.skin = randomRaceSkin(FSSubjugationistRace);
			setEyeColor(eventSlave, randomRaceEye(FSSubjugationistRace));
			eventSlave.hColor = randomRaceHair(FSSubjugationistRace);
			eventSlave.override_Skin = 1;
			eventSlave.override_Eye_Color = 1;
			eventSlave.override_H_Color = 1;
			r.toParagraph();
			return r.container();
		}

		function think() {
			const r = new SpacedTextAccumulator();
			const {HeU, girlU} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
			r.push(`You stroke ${eventSlave.slaveName}'s ${eventSlave.skin} cheek and tell ${him} that ${he} has much more to lose than ${he} realizes. You decide to give ${him} a tour of the arcology to show ${him} what you mean. You make sure to`);
			if (canSee(eventSlave)) {
				r.push(`point out`);
			} else {
				r.push(`explain`);
			}
			r.push(`everything that makes living in your arcology as a ${FSSubjugationistRace} slut special.`);
			if (V.dairy > 0) {
				r.push(`There are the specially calibrated "${FSSubjugationistRace} only" industrial human milking machines in ${V.dairyName} which have been set for maximum milking efficiency, disregarding any need for slave comfort.`);
			} else {
				r.push(`There are the segregated milking stalls, where only the dirtiest and most dilapidated machines are reserved for filthy ${FSSubjugationistRace} sluts.`);
			}
			if (V.club > 0) {
				r.push(`There are the "refresher" sinks in ${V.clubName} where normal slaves can go to periodically clean the cum out of their holes before returning to service more citizens — but such a luxury is off limits to ${FSSubjugationistRace} animals, who simply have to work through their long shifts with ever-increasing amount of ejaculate covering their worthless bodies.`);
			} else {
				r.push(`There are the "animal fuckers" in the public square — groups of racial purists who specifically seek out slaves of the inferior ${FSSubjugationistRace} race to mistreat through extreme public use.`);
			}
			if (V.clinic > 0) {
				r.push(`While ${V.clinicName} is available to normal slaves to recover from injuries and general ill health, such things aren't afforded to ${FSSubjugationistRace} whores. They have to work through it, no matter the outcome.`);
				if (eventSlave.ovaries === 1 || eventSlave.mpreg === 1) {
					r.push(`A slave in the throes of labor catches ${his} attention. Assisted birth is a luxury; gravid ${FSSubjugationistRace} whores receive no aid with childbirth, nor are contraceptives wasted on them.`);
				}
			} else {
				r.push(`As you tour, you pass an exhausted ${FSSubjugationistRace} ${girlU} struggling to give birth. ${HeU}'ll be left to handle the act alone as medical care is seldom given to ${FSSubjugationistRace} mongrels.`);
				if (eventSlave.ovaries === 1 || eventSlave.mpreg === 1) {
					r.push(`It's a common occurrence for pregnant subhumans, since they aren't worth the cost of contraception.`);
				}
			}
			r.push(`Finally`);
			if (V.arcade > 0) {
				r.push(`you take ${him} over to ${V.arcadeName}, and`);
				if (canSee(eventSlave)) {
					r.push(`give ${him} an up close view of`);
				} else {
					r.push(`let ${him} feel`);
				}
				r.push(`the brutal ring gag used to pry open the ${FSSubjugationistRace} sluts' mouths for relentless cock-milking purposes.`);
			} else {
				r.push(`you take ${him} over to the glory hole area, where distinct labels adorn the holes reserved for members of the slave race, and ${FSSubjugationistRace} fuck-holes are afforded "special attention" by "sympathetic" citizens of the arcology.`);
			}
			r.toParagraph();
			r.push(`At first ${eventSlave.slaveName} is confused as to why you are showing ${him} these things, but you soon make your point clear. You explain that if ${he} doesn't start accepting ${his} role, you can easily alter ${his} appearance and force ${him} to accept a much different role instead. You see ${his}`);
			if (eventSlave.intelligence+eventSlave.intelligenceImplant < -15) {
				r.push(`stupid`);
				if (canSee(eventSlave)) {
					r.push(`eyes`);
				} else {
					r.push(`face`);
				}
				r.push(`finally start to show signs of understanding`);
			} else {
				r.push(`intelligent`);
				if (canSee(eventSlave)) {
					r.push(`eyes`);
				} else {
					r.push(`face`);
				}
				r.push(`quickly realize what you are talking about`);
			}
			r.push(`and ${he} starts to whimper helplessly, begging you not to turn ${him} into a ${FSSubjugationistRace} subhuman. By the end of the tour ${he} better realizes exactly what it means to be a slave. ${He} is starting to understand the <span class="devotion inc">power you have over ${him},</span> and <span class="trust dec">${he} fears you even more because of it.</span>`);
			eventSlave.devotion += 5;
			eventSlave.trust -= 10;
			r.toParagraph();
			return r.container();
		}

		function discipline() {
			const r = new SpacedTextAccumulator();
			r.push(`You look ${eventSlave.slaveName} over, and something about ${him} makes you reconsider playing games with ${his} racial appearance.`);
			if (eventSlave.race === V.arcologies[0].FSSupremacistRace) {
				r.push(`Perhaps ${his} natural ${eventSlave.race} supremacy is too sacrosanct for you to go to such lengths.`);
			}
			r.push(`You'll not make such an extreme example of ${him}. Still, ${he} is a disobedient slave, and ${he} cannot be allowed to openly defy your orders and inspections. You`);
			if (eventSlave.belly >= 300000) {
				r.push(`shove ${him} onto ${his} ${belly} belly, expose ${his} bare ass`);
			} else {
				r.push(`take ${him} over your knee, expose ${his} bare ass`);
			}
			r.push(`and spank ${him} hard and relentlessly. ${He} screams and whines and struggles, and you call in an obedient slave to help keep control of ${him} as you punish ${his} reddened bottom. You also make sure to tell ${him} how lucky ${he} is that ${he} isn't one of those worthless subhuman ${FSSubjugationistRace} sluts, and that ${he} is getting off easy. But you also remind ${him} that there are worse owners to belong to, and if ${he} continues to resist your will, you will be very selective about who you sell ${him} to.`);
			r.toParagraph();
			r.push(`By the time you've finished with ${his} sensitive ass, it shines red, and ${he} is crying and whimpering in pain. You send ${him} away, having <span class="devotion inc">dampened ${his} resistance a bit,</span> and <span class="trust dec">scared ${him} with your tales of how much worse life could be</span> for ${him}`);
			if (eventSlave.race === V.arcologies[0].FSSupremacistRace) {
				r.push(`if ${he} weren't born of the supreme race.`);
			} else {
				r.push(`under a less forgiving owner.`);
			}
			eventSlave.devotion += 5;
			eventSlave.trust -= 5;
			r.toParagraph();
			return r.container();
		}
	}
};
