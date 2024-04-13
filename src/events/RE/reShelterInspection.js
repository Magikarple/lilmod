App.Events.REShelterInspection = class REShelterInspection extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.shelterAbuse <= 5,
		];
	}

	actorPrerequisites() {
		return [[s => isShelterSlave(s)]];
	}

	get weight() {
		return Math.max(V.shelterAbuse, 1);
	}

	execute(node) {
		const r = [];
		V.nextButton = " ";

		const enslaveCost = 10000;

		// Inspectee
		const [inspectee] = this.actors.map(s => getSlave(s));
		const originSlave = V.genePool.find(function(s) { return s.ID === inspectee.ID; });
		const {
			He, His,
			he, his, him, girl
		} = getPronouns(inspectee);
		const {say} = getEnunciation(inspectee);

		// Inspector
		const inspector = generateInspector();
		const {
			He2, His2,
			he2, his2, him2, woman2
		} = getPronouns(inspector).appendSuffix("2");
		const {say: say2} = getEnunciation(inspector);

		const {
			HisA,
			heA, hisA, girlA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");
		const {himP} = getPronouns(V.PC).appendSuffix("P");

		App.Events.drawEventArt(node, [inspector, inspectee]);

		r.push(`Your assistant announces a visitor in the entryway of your penthouse, and adds`);
		if (V.assistant.personality > 0) {
			r.push(`with disapproval`);
		}
		r.push(`that it's an inspector from the Slave Shelter.`);
		if (V.assistant.personality > 0) {
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`${HisA} avatar's cocks and tentacle hair are all hanging limply; ${heA}'s a dejected little picture of a cockblocked monster ${girlA}.`);
					break;
				case "shemale":
					r.push(`${HisA} avatar's cock is (shockingly) flaccid; ${heA}'s a dejected little picture of a cockblocked shemale.`);
					break;
				case "hypergoddess":
					r.push(`${HisA} avatar places ${hisA} arms on ${hisA} wide hips and makes a face like ${heA} wants to scold someone.`);
					break;
				case "loli":
				case "preggololi":
					r.push(`${HisA} avatar glances away with a sullen look on ${hisA} face.`);
					break;
				case "amazon":
					r.push(`${HisA} avatar throws itself down into a sitting position and sulks, playing idly with ${hisA} bone necklace.`);
					break;
				case "businesswoman":
					r.push(`${HisA} avatar taps a toe and tsks, looking reprovingly over the tops of ${hisA} eyeglasses.`);
					break;
				case "fairy":
				case "pregnant fairy":
					r.push(`${HisA} avatar buzzes around angrily.`);
					break;
				case "angel":
					r.push(`${HisA} avatar slumps ${hisA} shoulders and sighs. "Good luck."`);
					break;
				case "cherub":
					r.push(`${HisA} avatar flutters around angrily.`);
					break;
				case "incubus":
					r.push(`${HisA} avatar is completely flaccid and grumbling angrily; ${heA}'s a dejected little picture of a cockblocked incubus.`);
					break;
				case "succubus":
					r.push(`${HisA} avatar is grumbling angrily; ${heA}'s a dejected little picture of a horny ${girlA} denied ${hisA} favorite toy.`);
					break;
				case "imp":
					r.push(`${HisA} avatar flaps around angrily while blowing a long raspberry.`);
					break;
				case "witch":
					r.push(`${HisA} avatar attempts to vanish, succeeding only in removing ${hisA} clothes and gluing ${hisA} feet to the floor.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`${HisA} avatar is visibly twitching in a very unnatural way.`);
					break;
				case "goddess":
					r.push(`${HisA} avatar crosses ${hisA} arms over ${hisA} chest (barely) and makes a face like ${heA} wants to scold someone.`);
					break;
				case "schoolgirl":
					r.push(`${HisA} avatar throws a little school ${girlA} fit, sticking out ${hisA} tongue and blowing a raspberry.`);
					break;
				default:
					r.push(`${HisA} avatar turns a reproving blue and shrinks a little.`);
			}
		}
		r.push(`Not waiting to be greeted, the inspector looks up at the nearest camera and demands to be let in. ${He2}'s an older ${woman2} with graying hair up in a bun, holding a tablet against ${his2} chest like a shield.`);
		r.push(Spoken(inspector, `"I'm here to inspect ${originSlave.slaveName},${(originSlave.slaveName !== inspectee.slaveName) ? ` or as you call ${him}, ${inspectee.slaveName},` : ``}"`));
		r.push(`${he2} bellows up at the camera.`);

		App.Events.addParagraph(node, r);

		const responses = [
			new App.Events.Result(`Amusing. Enslave ${him2}`, enslaveInspector, `This will cost ${cashFormat(enslaveCost)}`)
		];
		if (S.Bodyguard || V.mercenaries > 1 || (V.SF.Toggle && V.SF.Active >= 1)) {
			responses.push(new App.Events.Result(`Escort ${him2} off your property`, escortInspectorOut));
		}
		if ((V.dairy > 0) && (V.dairyRestraintsSetting > 1) && (inspectee.assignment === Job.DAIRY)) {
			responses.push(new App.Events.Result(
				`The slave is attached to a milking machine in ${V.dairyName}, and so will be the inspector`,
				dairyInspector,
				`This will cost ${cashFormat(enslaveCost / 2)}`
			));
		} else if ((V.arcade > 0) && (inspectee.assignment === Job.ARCADE)) {
			responses.push(new App.Events.Result(
				`The slave is little more than a hole in ${V.arcadeName}, and so will be the inspector`,
				arcadeInspector,
				`This will cost ${cashFormat(enslaveCost / 2)}`
			));
		} else if ((inspectee.assignment === Job.AGENT) || (inspectee.assignment === Job.AGENTPARTNER)) {
			responses.push(new App.Events.Result(`Your slave is in another arcology`, agent));
		} else if (inspectee.fuckdoll > 0) {
			responses.push(new App.Events.Result(`The slave is little more than a latex wrapped doll, and so will be the inspector`, fuckdollInspector, `This will cost ${cashFormat(enslaveCost / 2)}`));
		} else {
			responses.push(new App.Events.Result(`Allow the inspection`, allow));
		}

		App.Events.addResponses(node, responses);

		function enslaveInspector() {
			const el = new DocumentFragment();
			const r = [];
			cashX(forceNeg(enslaveCost), "slaveTransfer", inspector);
			r.push(`${V.assistant.name} ushers ${him2} into your penthouse and keeps ${him2} busy for the few minutes you need to circumvent the Shelter's various legal and contractual defenses to prevent slaveowners from doing exactly what you're doing. Fortunately, you're cleverer and richer than most, and you succeed. You have ${him2} brought into your office, and you are pleased to see ${him2}. ${He2}'s not young and ${he2}'s not pretty, but ${his2} suit cannot disguise ${his2} big bottom, and ${he2}'s using the tablet ${he2} has clasped protectively against ${his2} chest to conceal a huge pair of mature breasts. ${He2} knows exactly what's happened, and fixes you with a gimlet stare.`);
			r.push(Spoken(inspector, `"In a couple of months,"`));
			r.push(`${he2} ${say2}s with venom,`);
			r.push(Spoken(inspector, `"when you've filled me full of hormones and drugs and training, and I'm begging you to ${(V.PC.dick !== 0) ? `stick your tiny little dick up` : `fist`} my asshole, remember this. It'll be conditioning and self-preservation and Stockholm Syndrome talking, not me. I think you're a ${(V.PC.title === 1) ? `sad bastard` : `vile cunt`}, and I always will."`));

			V.shelterAbuse += 10;
			allowContinue();
			r.push(App.UI.newSlaveIntro(inspector));
			App.Events.addParagraph(el, r);
			return el;
		}

		function escortInspectorOut() {
			const r = [];
			const el = new DocumentFragment();
			r.push(`You along with`);
			if (S.Bodyguard) {
				r.push(`your bodyguard ${SlaveFullName(S.Bodyguard)}`);
				if (V.mercenaries > 1 || (V.SF.Toggle && V.SF.Active >= 1)) {
					r.push(`and`);
				}
			}
			if (V.mercenaries > 1 && (V.SF.Toggle && V.SF.Active >= 1)) {
				r.push(`a squad of both ${V.mercenariesTitle} and ${V.SF.Lower}`);
			} else if (V.SF.Toggle && V.SF.Active >= 1) {
				r.push(`a squad of ${V.SF.Lower}`);
			} else if (V.mercenaries > 1) {
				r.push(`a squad of ${V.mercenariesTitle}`);
			}
			r.push(`forcefully escort the inspector off your property. You barely make it back to the penthouse before the message deeming you permanently banned from the Slave Shelter arrives.`);
			V.shelterAbuse += 100;
			allowContinue();

			App.Events.addParagraph(el, r);
			return el;
		}

		function dairyInspector() {
			const r = [];
			const el = new DocumentFragment();
			assignJob(inspector, "work in the dairy");
			inspector.lactation = 1;
			inspector.lactationDuration = 2;
			inspector.clothes = "no clothing";
			cashX(forceNeg(enslaveCost / 2), "slaveTransfer", inspector);
			r.push(`${inspectee.slaveName} is attached to a milking machine, so it would be extremely unwise to let the inspector report on ${inspectee.slaveName}'s industrial fate in all its gorgeous productivity. So, you greet ${him2} politely, and bring ${him2} down to ${V.dairyName} to show ${him2} ${inspectee.slaveName}. The inspector has a single moment to stiffen in shock at the sight before ${he2} stiffens involuntarily due to the security drone tasing ${him2} unconscious. It takes a few credits here and there to circumvent the Shelter's various legal and contractual defenses to prevent slaveowners from doing exactly what you're doing, but you finish the day richer by one more big-boobed milk producer. You leave the inspector's drug dosage low to start, so ${he2} can appreciate ${his2} situation for a while. When the inspector awakes, ${his2} visor is set to show an overhead view of ${his2} bay in ${V.dairyName}. ${He2} sees ${his2} breasts, already larger than ${he2} remembers, gently swaying with the pumping of the milkers.`);
			if (V.dairyFeedersSetting > 1) {
				r.push(`${He2} sees the huge phallus occupying ${his2} mouth, and feels nutrition sliding down ${his2} throat.`);
			}
			if (V.dairyPregSetting > 1) {
				r.push(`${He2} sees ${his2} vagina drooling as it's fucked in preparation for pregnancy.`);
			}
			if (V.dairyStimulatorsSetting > 0) {
				r.push(`${He2} sees a massive piston moving slowly back and forth beneath ${his2} buttocks, and understands what the ache of impossible fullness in ${his2} bottom is.`);
			}
			r.push(`${His2} hands ball into fists.`);
			V.shelterAbuse += 10;
			allowContinue();
			newSlave(inspector); /* skip New Slave Intro */

			App.Events.addParagraph(el, r);
			return el;
		}

		function arcadeInspector() {
			const r = [];
			const el = new DocumentFragment();
			assignJob(inspector, "be confined in the arcade");
			inspector.clothes = "no clothing";
			cashX(forceNeg(enslaveCost / 2), "slaveTransfer", inspector);
			r.push(`${inspectee.slaveName} is sealed in a box and currently in use, so it would be extremely unwise to let the inspector report on ${inspectee.slaveName}'s permanent position in the service industry. So, you greet ${him2} politely, and bring ${him2} down to ${V.arcadeName} to show ${him2} ${inspectee.slaveName}. The inspector has a single moment to stiffen in shock at the sight before ${he2} stiffens involuntarily due to the security drone tasing ${him2} unconscious. It takes a few credits here and there to circumvent the Shelter's various legal and contractual defenses to prevent slaveowners from doing exactly what you're doing, but you finish the day richer by three more fuckable holes. When the inspector awakes to a dick intruding ${his2} body, the pitch blackness and sound proofing disorientates ${him2}.`);
			if (V.arcadeUpgradeInjectors === 2) {
				r.push(`${He2} gasps as a needle breaks ${his2} skin, filling ${his2} veins with a potent mixture of aphrodisiacs to help ${him2} better service the cock in ${his2} cunt. ${He2} attempts to defy, but a strong shock forces ${him2} to tighten and bring ${his2} partner to climax.`);
			} else if (V.arcadeUpgradeInjectors === 1) {
				r.push(`${He2} attempts to defy, but a strong shock forces ${him2} to tighten and bring ${his2} partner to climax.`);
			} else if (V.arcadeUpgradeCollectors === 1) {
				r.push(`${He2} groans at the feeling of something sucking away at ${his2} milkless tits, but it does nothing to distract from ${his2} rape. ${He2} struggles to resist in any way ${he2} can, but ${he2} is too firmly anchored to move.`);
			} else {
				r.push(`${He2} struggles to resist in any way ${he2} can, but ${he2} is too firmly anchored to move.`);
			}
			r.push(`Before ${he2} gets the chance to swear defiance against you, another patron rams his dick down ${his2} throat, putting a stop to that notion. ${His2} hands ball into fists as ${he2} endures ${his2} first spitroasting.`);
			seX(inspector, "vaginal", "public", "penetrative");
			seX(inspector, "oral", "public", "penetrative");
			V.shelterAbuse += 15;
			allowContinue();
			newSlave(inspector);
			App.Events.addParagraph(el, r);
			return el;
		}

		function agent() {
			const r = [];
			const el = new DocumentFragment();

			r.push(`${inspectee.slaveName} is now a guiding force in another of the Free City's arcologies, so it would be disruptive to ${his} work to be called away like this. You simply pass along ${his} new address and send the inspector on ${his2} way. ${He2} stands there dumbfounded before hastily writing notes on ${his2} tablet. ${He2} seems quite pleased by ${inspectee.slaveName}'s progress.`);
			V.shelterAbuse -= 15;
			allowContinue();

			App.Events.addParagraph(el, r);
			return el;
		}

		function fuckdollInspector() {
			const r = [];
			const el = new DocumentFragment();
			cashX(forceNeg(enslaveCost / 2), "slaveTransfer", inspector);
			r.push(`You have ${him2} ushered up to your office, and order ${inspectee.slaveName} brought in. The inspector has a single moment to stiffen in shock at the sight before ${he2} stiffens involuntarily due to the security drone tasing ${him2} unconscious. It takes a few credits here and there to circumvent the Shelter's various legal and contractual defenses to prevent slaveowners from doing exactly what you're doing, but you finish the day richer by one more Fuckdoll. Odds are ${he2} wants to be defiant, but the suit works perfectly and leaves ${him2} no outlet to make ${his2} thoughts known.`);
			beginFuckdoll(inspector);
			V.shelterAbuse += 10;
			allowContinue();
			newSlave(inspector);
			App.Events.addParagraph(el, r);
			return el;
		}

		function allow() {
			let r = [];
			const el = new DocumentFragment();
			r.push(`You have ${him2} ushered up to your office, and order ${inspectee.slaveName} brought in.`);

			/*
			let inspectionContinues = 1;
			if (isAmputee(inspectee) && !isAmputee(originSlave)) {
				r.push(`You may have lopped off the poor ${girl}'s arms and legs, a fact not lost on the inspector. ${He2} can barely conceal ${his2} terror as ${he2} makes lengthy notes on ${his2} tablet before practically running out of the penthouse.`);
				V.shelterAbuse += 10;
			} else if (inspectee.fetish === Fetish.MINDBROKEN) {
				if (inspectee.origin === "You got $him at the Slave Shelter. $He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.") {
					r.push(`Of course, the poor ${girl} is just as mindbroken as ever. The inspector asks some cursory questions and gives up.`);
					r.push(Spoken(inspector, `"Don't worry,"`));
					r.push(`${he2} says.`);
					r.push(Spoken(inspector, `"I know ${he} was like this when you got ${him}. Just - just keep trying, would you?"`));
				} else if (inspectee.origin === "You got $him at the Slave Shelter. $He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.") {
					r.push(`Of course, the poor ${girl} is just as mindbroken as ever. The inspector asks some cursory questions and gives up.`);
					r.push(Spoken(inspector, `"Don't worry,"`));
					r.push(`${he2} says.`);
					r.push(Spoken(inspector, `"I know ${he} was like this when you got ${him}. Just - just keep trying, would you?"`));
					r.push(`${He2} leaves, looking bitter.`);
					if (inspectee.vagina > 3 && inspectee.bellySag > 1) {
						r.push(`${He2} gropes the slave's sagging middle before inspecting ${his} ruined pussy.`);
						r.push(Spoken(inspector, `"Still ruined, I see."`));
					} else if (inspectee.vagina <= 3 && inspectee.bellySag > 1) {
						r.push(`${He2} gropes the slave's sagging middle before inspecting ${his} pussy.`);
						r.push(Spoken(inspector, `"Apart from the belly, ${his} pussy has recovered nicely."`));
					} else if (inspectee.vagina > 3 && inspectee.bellySag <= 1) {
						r.push(`${He2} gropes the slave's middle before inspecting ${his} ruined pussy. "`);
						r.push(Spoken(inspector, `"${His} stomach seems to have recovered; shame you did nothing for ${his} poor vagina."`));
					} else {
						r.push(`${He2} runs ${his2} hand across the slave's restored midriff, before inspecting ${his} pussy.`);
						r.push(Spoken(inspector, `"${He} is looking much better, physically, though. That's worth noting."`));
						V.shelterAbuse--;
					}
					r.push(`${He2} leaves, looking bitter.`);
				} else {
					r.push(`Of course, the poor ${girl} is mindbroken now. The inspector is horrified, though ${he2} tries to conceal it. ${He2} makes lengthy notes on ${his2} tablet, and almost runs out of the penthouse.`);
					V.shelterAbuse += 5;
				}
				inspectionContinues = 0;
			}

			if (inspectionContinues === 1) {
				switch (inspectee.origin) {
					case "You got $him at the Slave Shelter. $He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.":
						r.push(`The inspector asks some cursory questions and is shocked when ${he} responds. "`);
						r.push(Spoken(inspector, `"${He} came back?"`));
						r.push(`${he2} mutters,`);
						r.push(Spoken(inspector, `"You restored his mind; I can't believe it. This is incredible."`));
						r.push(`${He2} carries on while writing notes on ${his2} tablet,`);
						r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
						r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse.`);
						inspectionContinues = 0;
						V.shelterAbuse -= 5;
						break;
					case "You got $him at the Slave Shelter. It's not clear why $his previous owner cut $his arms and legs off.":
						if (!hasAnyLimbs(inspectee)) {
							r.push(`Unsurprisingly, the poor ${girl} still lacks arms and legs, so the inspector just carries on.`);
						} else {
							r.push(`The inspector stares, dumbfounded, at the pair of limbs now supporting ${inspectee.slaveName}. "Most owners wouldn't go through the trouble... I think I've seen enough to know you're welcome to come back and take in another slave any time." ${He2} leaves your penthouse in much better spirits than ${he2} arrived in.`);
							inspectionContinues = 0;
							V.shelterAbuse -= 3;
						}
						break;
					case "$His owner purposely deafened $him by piercing $his eardrums with knitting needles.":
						r.push(`The inspector gestures for ${inspectee.slaveName} to turn away from ${him2} and, once ${he} has done so, asks`);
						r.push(Spoken(inspector, `"Can you hear me, ${inspectee.slaveName}?"`));
						if (inspectee.hears > originSlave.hears) {
							if (canTalk(inspectee)) {
								if (inspectee.hears < 0) {
									r.push(`${He} nods and responds`);
									r.push(Spoken(inspectee, `"It's still hard, but I can."`));
								} else {
									r.push(`${He} nods and responds`);
									r.push(Spoken(inspectee, `"Loud and clear."`));
								}
							} else {
								if (inspectee.hears < 0) {
									r.push(`${He} cocks ${his} head to listen, and nods slowly.`);
								} else {
									r.push(`${He} nods confidently.`);
								}
							}
							r.push(`The inspector's expression softens, and ${he2} pauses a moment before jotting down more notes on ${his2} tablet.`);
							r.push(Spoken(inspector, `"Thank you, ${inspectee.slaveName}, that will be all."`));
							r.push(`${He2} turns to you and says`);
							r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
							r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse.`);
							inspectionContinues = 0;
							V.shelterAbuse--;
						} else {
							r.push(`Unable to hear ${him2}, ${he} does not respond.`);
							r.push(Spoken(inspector, `"Pity,"`));
							r.push(`the inspector says.`);
						}
						break;
					case "You got $him at the Slave Shelter. $His owner purposely blinded $him by dumping boiling water into $his eyes.":
						r.push(Spoken(inspector, `"I wish the scarring wasn't so bad, that way people wouldn't stare so much."`));
						if (canSee(inspectee)) {
							if (canTalk(inspectee)) {
								r.push(`${inspectee.slaveName} quickly retorts with`);
								r.push(Spoken(inspectee, `"But I like seeing their eyes..."`));
							} else {
								r.push(`${inspectee.slaveName} shakes ${his} head in response.`);
							}
							r.push(`The inspector gasps at the realization that ${he} can see again.`);
							r.push(Spoken(inspector, `"They look just like his old photos too..."`));
							r.push(`A tear comes to ${his2} weary eye as ${he2} writes out notes on ${his2} tablet.`);
							r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
							r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse.`);
							inspectionContinues = 0;
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.":
						r.push(`The inspector asks some cursory questions and is shocked when ${he} responds.`);
						r.push(Spoken(inspector, `"He came back?"`));
						r.push(`${he2} mutters,`);
						r.push(Spoken(inspector, `"You restored his mind; I can't believe it. This is incredible."`));
						r.push(`${He2} carries on while writing notes on ${his2} tablet,`);
						r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
						r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse, even though ${he2} forgot to check ${his} pussy.`);
						inspectionContinues = 0;
						V.shelterAbuse -= 5;
						break;
					case "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his dick and balls and cook them.":
						if (inspectee.dick > originSlave.dick) {
							r.push(`"I see that you've given ${him} a replacement tool," ${he2} says as ${he2} reaches down and gives it an exploratory fondle,`);
							if (canAchieveErection(inspectee)) {
								r.push(`"It even works, that's lovely." The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							} else {
								r.push(`"It seems to be non-functional, but it's a nice gesture at least." The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							}
							V.shelterAbuse--;
						}
						if (inspectee.balls > originSlave.balls && inspectee.scrotum) {
							if (inspectee.dick > originSlave.dick) {
								r.push(`"And these work too, right?" ${he2} asks as ${he2} points to ${his} dangling balls. "So he has been fully restored; that's something." The inspector adds another positive note to the inspection.`);
								V.shelterAbuse--;
							} else {
								r.push(`"I take it these testicles are more than just an implant? I'm sure he appreciates the gesture, though what good are they without a penis?" The inspector shakes ${his2} head and notes your attempt to undo the damages to ${inspectee.slaveName}.`);
							}
						}

						if (!["apathetic", "neglectful"].includes(inspectee.sexualFlaw) && !["anorexic", "odd"].includes(inspectee.behavioralFlaw) && !["none", "masochist"].includes(inspectee.fetish)) {
							r.push(`The inspector can see that ${his} personality is much better than before. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 3;
						}
						break;
					case "You got $him at the Slave Shelter. $His previous owner forced $him to cut off $his breasts and cook them.":
						if (inspectee.boobs > originSlave.boobs) {
							r.push(`The inspector can see that ${he} has a new set of breasts. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 2;
						}
						if (!["apathetic", "neglectful", "self hating"].includes(inspectee.sexualFlaw) && !["anorexic", "odd"].includes(inspectee.behavioralFlaw) && !["none", "masochist"].includes(inspectee.fetish)) {
							r.push(`The inspector can see that ${his} personality is much better than before. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 3;
						}
						break;
					case "You got $him at the Slave Shelter. $He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away.":
						if (inspectee.slaveName !== originSlave.slaveName) {
							r.push(`The inspector notices ${inspectee.birthName}'s new name. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $His previous owner gelded $him and used $him for anal abuse.":
						if (inspectee.anus < originSlave.anus) {
							r.push(`The inspector can see that ${his} anus is better. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						if (inspectee.dick > originSlave.dick) {
							r.push(`The inspector can see that ${he} has a new dick. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $His background is obscure, but seems to have involved terrible abuse of $his huge cock and balls.":
						if (inspectee.energy > originSlave.energy) {
							r.push(`The inspector notices that ${inspectee.birthName} has more energy. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $His holes were cruelly stretched by constant plug use.":
						if (inspectee.vagina < originSlave.vagina) {
							r.push(`The inspector notices that ${inspectee.birthName}'s holes are tighter. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $His previous owner discarded $him after many pregnancies.":
						if (inspectee.vagina < originSlave.vagina) {
							r.push(`The inspector notices that ${inspectee.birthName}'s vagina is tighter. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $He was worn out by twenty years of brothel service.":
						if (inspectee.vagina < originSlave.vagina) {
							r.push(`The inspector notices that ${inspectee.birthName}'s holes are tighter. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						}
						break;
					case "You got $him at the Slave Shelter. $He was discarded after suffering a terrible reaction to growth hormone treatment.":
						if (inspectee.chem < originSlave.chem) {
							r.push(`Upon scanning ${inspectee.birthName}, the inspector finds that ${his} chem damage has been reduced. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						} else {
							r.push(`The inspector scans ${inspectee.birthName} and finds that ${his} chem damage has been increased. The inspector is horrified, though ${he2} tries to conceal it.`);
							V.shelterAbuse++;
						}
						if (inspectee.dick < originSlave.dick) {
							r.push(`The inspector measures ${inspectee.birthName}'s dick and finds that it has been reduced. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						} else {
							r.push(`The inspector measures ${inspectee.birthName}'s dick and finds that it has increased. The inspector is horrified, though ${he2} tries to conceal it.`);
							V.shelterAbuse++;
						}
						if (inspectee.balls < originSlave.balls) {
							r.push(`The inspector measures ${inspectee.birthName}'s balls and finds they have been reduced. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						} else {
							r.push(`The inspector measures ${inspectee.birthName}'s balls and finds they have been increased. The inspector is horrified, though ${he2} tries to conceal it.`);
							V.shelterAbuse++;
						}
						if (inspectee.fetish !== originSlave.fetish) {
							r.push(`The inspector measures ${inspectee.birthName}'s balls and finds they have been reduced. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse--;
						} else {
							r.push(`The inspector is happy that ${inspectee.birthName}'s balls and finds they have been increased. The inspector is horrified, though ${he2} tries to conceal it.`);
							V.shelterAbuse++;
						}
						break;
				}
			}
			*/

			if (inspectee.origin === "You got $him at the Slave Shelter. $He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.") {
				if (inspectee.fetish === Fetish.MINDBROKEN) {
					r.push(`Of course, the poor ${girl} is just as mindbroken as ever. The inspector asks some cursory questions and gives up. "Don't worry," ${he2} ${say2}s.`);
					r.push(Spoken(inspector, `"I know ${he} was like this when you got ${him}. Just - just keep trying, would you?"`));
					r.push(`${He2} leaves, looking bitter.`);
				} else {
					r.push(`The inspector asks some cursory questions and is shocked when ${he} responds.`);
					r.push(Spoken(inspector, `"${He} came back?"`));
					r.push(`${he2} mutters,`);
					r.push(Spoken(inspector, `"You restored ${his} mind; I can't believe it. This is incredible."`));
					r.push(`${He2} carries on while writing notes on ${his2} tablet,`);
					r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
					r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse.`);
					V.shelterAbuse -= 5;
				}
			} else if (inspectee.origin === "You got $him at the Slave Shelter. $He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.") {
				if (inspectee.fetish === Fetish.MINDBROKEN) {
					r.push(`Of course, the poor ${girl} is just as mindbroken as ever. The inspector asks some cursory questions and gives up.`);
					r.push(Spoken(inspector, `"Don't worry,"`));
					r.push(`${he2} ${say2}s.`);
					r.push(Spoken(inspector, `"I know ${he} was like this when you got ${him}. Just - just keep trying, would you?"`));
					if (inspectee.vagina > 3 && inspectee.bellySag > 1) {
						r.push(`${He2} gropes the slave's sagging middle before inspecting ${his} ruined pussy.`);
						r.push(Spoken(inspector, `"Still ruined, I see."`));
					} else if (inspectee.vagina <= 3 && inspectee.bellySag > 1) {
						r.push(`${He2} gropes the slave's sagging middle before inspecting ${his} pussy.`);
						r.push(Spoken(inspector, `"Apart from the belly, ${his} pussy has recovered nicely."`));
					} else if (inspectee.vagina > 3 && inspectee.bellySag <= 1) {
						r.push(`${He2} gropes the slave's middle before inspecting ${his} ruined pussy.`);
						r.push(Spoken(inspector, `"${His} stomach seems to have recovered; shame you did nothing for ${his} poor vagina."`));
					} else {
						r.push(`${He2} runs ${his2} hand across the slave's restored midriff, before inspecting ${his} pussy.`);
						r.push(Spoken(inspector, `"${He} is looking much better, physically, though. That's worth noting."`));
						V.shelterAbuse--;
					}
					r.push(`${He2} leaves, looking bitter.`);
				} else {
					r.push(`The inspector asks some cursory questions and is shocked when ${he} responds.`);
					r.push(Spoken(inspector, `"${He} came back?"`));
					r.push(`${he2} mutters,`);
					r.push(Spoken(inspector, `"You restored ${his} mind; I can't believe it. This is incredible."`));
					r.push(`${He2} carries on while writing notes on ${his2} tablet,`);
					r.push(Spoken(inspector, `"You're more than welcome to adopt slaves from our shelter."`));
					r.push(`You swear ${he2} seems in much better spirits as ${he2} leaves your penthouse, even though ${he2} forgot to check ${his} pussy.`);
					V.shelterAbuse -= 5;
				}
			} else if (inspectee.fetish === Fetish.MINDBROKEN) {
				r.push(`Of course, the poor ${girl} is mindbroken now. The inspector is horrified, though ${he2} tries to conceal it. ${He2} makes lengthy notes on ${his2} tablet, and almost runs out of the penthouse.`);
				V.shelterAbuse += 5;
			} else if (inspectee.voice === 0) {
				r.push(`The inspector asks some cursory questions of ${him}, but fails to get any answers since you've taken the poor ${girl}'s voice away. The inspector is horrified, though ${he2} tries to conceal it. ${He2} makes lengthy notes on ${his2} tablet, and almost runs out of the penthouse.`);
				V.shelterAbuse += 3;
			} else if (inspectee.trust < -20) {
				r.push(`${He} is sufficiently afraid of you that ${he} tells the inspector whatever ${he} thinks you'd want ${him} to say. The inspector, experienced at this, is not amused. ${He2} offers you a few choice words, makes notes on ${his2} tablet, and storms out.`);
			} else if (inspectee.anus > 2) {
				r.push(`${He} cooperates with the inspector, who pulls on a pair of latex gloves and performs a complete examination. When ${he2} pulls the ${girl}'s buttocks apart and probes the slave's asshole, ${he2} pulls ${his2} hand away as if scalded.`);
				r.push(Spoken(inspector, `"Oh my God,"`));
				r.push(`${he2} ${say2}s.`);
				r.push(Spoken(inspector, `"${inspectee.birthName}, what happened to your anus?"`));
				App.Events.addParagraph(el, r);
				r = [];
				if (inspectee.devotion < 10) {
					if (plugWidth(inspectee) > 1) {
						r.push(Spoken(inspectee, `"W-well,"`));
						r.push(`${he} ${say}s,`);
						r.push(Spoken(inspectee, `"I wear a buttplug."`));
						r.push(`The inspector frowns.`);
						r.push(Spoken(inspector, `"A buttplug shouldn't do that!"`));
						r.push(`The slave looks worried and replies,`);
						r.push(Spoken(inspectee, `"It's kinda big? And I wear it all the time. B-but I like it! It d-doesn't hurt. Well, anymore."`));
						r.push(`The inspector is not amused. ${He2} offers you a few choice words, makes notes on ${his2} tablet, and storms out.`);
					} else if ([Job.WHORE, Job.BROTHEL, Job.PUBLIC, Job.CLUB].includes(inspectee.assignment)) {
						r.push(Spoken(inspectee, `"W-well,"`));
						r.push(`${he} ${say}s,`);
						r.push(Spoken(inspectee, `"I get fucked there at work."`));
						r.push(`The inspector frowns.`);
						r.push(Spoken(inspector, `"How often!?"`));
						r.push(`The slave looks worried and replies,`);
						r.push(Spoken(inspectee, `"L-let me think. Four times today? After the third time, it usually stops closing up again between cocks."`));
						r.push(`The inspector is not amused. ${He2} offers you a few choice words, makes notes on ${his2} tablet, and storms out.`);
					} else if (inspectee.fetish === "buttslut") {
						r.push(Spoken(inspectee, `"Hey,"`));
						r.push(`${he} protests,`);
						r.push(Spoken(inspectee, `"that's normal."`));
						r.push(`The inspector looks incredulous.`);
						r.push(Spoken(inspector, `"What!?"`));
						r.push(`The slave looks insulted and replies,`);
						r.push(Spoken(inspectee, `"I love anal sex! Don't judge me. I want cock up that hole right now, you bitch. I'm going to beg for butt sex the moment you leave."`));
						r.push(`${He} defiantly sticks ${his} rump out at you. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else if (inspectee.energy > 95) {
						r.push(Spoken(inspectee, `"Hey,"`));
						r.push(`${he} protests,`);
						r.push(Spoken(inspectee, `"that's normal."`));
						r.push(`The inspector looks incredulous.`);
						r.push(Spoken(inspectee, `"I love sex! Don't judge me. I take cock in all my holes, and I like it. I'm going to beg for butt sex the moment you leave."`));
						r.push(`${He} defiantly sticks ${his} rump out at you. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else {
						r.push(Spoken(inspectee, `"W-well,"`));
						r.push(`${he} ${say}s,`);
						r.push(Spoken(inspectee, `"I'm a slave."`));
						r.push(`The inspector frowns.`);
						r.push(Spoken(inspector, `What does that have to do with it?"`));
						r.push(`The slave looks worried and replies,`);
						r.push(Spoken(inspectee, `"I-it's a hole, right? I get fucked in all my holes."`));
						r.push(`The inspector is not amused. ${He2} offers you a few choice words, makes notes on ${his2} tablet, and storms out.`);
					}
				} else {
					if (plugWidth(inspectee) > 1) {
						r.push(Spoken(inspectee, `"I wear a buttplug!"`));
						r.push(`${he} ${say}s confidently. The inspector frowns.`);
						r.push(Spoken(inspector, `"A buttplug shouldn't do that!`));
						r.push(`The slave looks worried and replies, "`);
						r.push(Spoken(inspectee, `It's really big, and I wear it all the time. I like it! It keeps my hole ready for anything."`));
						r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else if ([Job.WHORE, Job.BROTHEL, Job.PUBLIC, Job.CLUB].includes(inspectee.assignment)) {
						r.push(Spoken(inspectee, `"I get fucked there at work!"`));
						r.push(`${he} ${say}s confidently. The inspector frowns.`);
						r.push(Spoken(inspector, `"How often!?"`));
						r.push(`The slave thinks for a moment and replies,`);
						r.push(Spoken(inspectee, `"Four times today. After the third time, it usually stops closing up again between cocks. I'm good at my job!"`));
						r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else if (inspectee.fetish === "buttslut") {
						r.push(Spoken(inspectee, `"Hey,"`));
						r.push(`${he} protests,`);
						r.push(Spoken(inspectee, `"that's normal."`));
						r.push(`The inspector looks incredulous.`);
						r.push(Spoken(inspector, `"What!?"`));
						r.push(`The slave looks insulted and replies,`);
						r.push(Spoken(inspectee, `"I love anal sex! Don't judge me. I want cock up that hole right now, you bitch. I'm going to beg for butt sex the moment you leave."`));
						r.push(`${He} defiantly sticks ${his} rump out at you. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else if (inspectee.energy > 95) {
						r.push(Spoken(inspectee, `"Hey,"`));
						r.push(`${he} protests,`);
						r.push(Spoken(inspectee, `"that's normal."`));
						r.push(`The inspector looks incredulous.`);
						r.push(Spoken(inspectee, `"I love sex! Don't judge me. I take cock in all my holes, and I like it. I'm going to beg for butt sex the moment you leave."`));
						r.push(`${He} defiantly sticks ${his} rump out at you. The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					} else {
						r.push(Spoken(inspectee, `"I'm a slave,"`));
						r.push(`${he} ${say}s confidently. The inspector frowns.`);
						r.push(Spoken(inspector, `"What does that have to do with it?"`));
						r.push(`The slave beams and replies,`);
						r.push(Spoken(inspectee, `"It's a hole. I'm a good ${girl}, so I get fucked in all my holes.`));
						r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
						V.shelterAbuse -= 1;
					}
				}
			} else if (inspectee.devotion <= 20) {
				r.push(`${He} does not like you and isn't particularly terrified of you, so ${he} is not flattering. ${He}'s not stupid enough to really criticize you, but ${he} is honest and makes no effort to conceal troubling particulars. The inspector takes copious notes. ${He2} offers you a few choice words, makes notes on ${his2} tablet, and storms out.`);
			} else {
				r.push(`The inspector asks,`);
				r.push(Spoken(inspector, `"What do you do for work, ${inspectee.birthName}?"`));
				App.Events.addParagraph(el, r);
				r = [];
				switch (inspectee.assignment) {
					case "whore":
					case "work in the brothel":
						if (inspectee.fetishStrength > 95 || inspectee.energy > 95) {
							r.push(`${inspectee.slaveName} ${say}s happily,`);
							r.push(Spoken(inspectee, `"I'm a whore!"`));
							r.push(`The inspector makes a 'go on' gesture, and the slave continues,`);
							r.push(Spoken(inspectee, `"It's awesome. Nothing but cock, every day."`));
							r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 1;
						} else {
							r.push(`${inspectee.slaveName} ${say}s confidently,`);
							r.push(Spoken(inspectee, `"I'm a whore!"`));
							r.push(`The inspector makes a 'go on' gesture, and the slave continues,`);
							r.push(Spoken(inspectee, `"It's hard work sometimes, but I'm okay. I'm much happier with my current owner, thank you."`));
							r.push(`The inspector looks pleased, and ${say2}s ${he2}'ll put out a <span class="reputation inc">good word</span> about you.`);
							repX(500, "event", inspectee);
							V.shelterAbuse -= 1;
						}
						break;
					case "serve the public":
					case "serve in the club":
						if (inspectee.fetishStrength > 95 || inspectee.energy > 95) {
							r.push(`${inspectee.slaveName} ${say}s happily,`);
							r.push(Spoken(inspectee, `"I'm a slut!`));
							r.push(`The inspector makes a 'go on' gesture, and the slave continues,`);
							r.push(Spoken(inspectee, `"It's awesome. Nothing but cute boys and girls, every day."`));
							r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 1;
						} else {
							r.push(`${inspectee.slaveName} ${say}s confidently,`);
							r.push(Spoken(inspectee, `"I'm a slut!"`));
							r.push(`The inspector makes a 'go on' gesture, and the slave continues,`);
							r.push(Spoken(inspectee, `"It's not bad. I'm much happier with my current owner, thank you."`));
							r.push(`The inspector looks pleased, and ${say2}s ${he2}'ll put out a <span class="reputation inc">good word</span> about you.`);
							repX(500, "event", inspectee);
							V.shelterAbuse -= 1;
						}
						break;
					case "get milked":
					case "work in the dairy":
						if (inspectee.lactation > 0) {
							r.push(`${inspectee.slaveName} ${say}s happily,`);
							r.push(Spoken(inspectee, `"I'm a milk cow!"`));
							r.push(`The inspector arches an eyebrow skeptically, and the slave continues,`);
							r.push(Spoken(inspectee, `"I give milk. See?"`));
							r.push(`${He} expresses a squirt of ${inspectee.milkFlavor === "none" ? `` : `${inspectee.milkFlavor}-flavored `}milk from one nipple.`);
							r.push(Spoken(inspectee, `"It's a nice life. I'm much happier with my current owner, thank you."`));
							r.push(`The inspector looks pleased, and ${say2}s ${he2}'ll put out a <span class="reputation inc">good word</span> about you.`);
							repX(500, "event", inspectee);
							V.shelterAbuse -= 1;
						} else {
							r.push(`${inspectee.slaveName} ${say}s happily,`);
							r.push(Spoken(inspectee, `"I get cockmilked!"`));
							r.push(`The inspector arches an eyebrow skeptically, and the slave continues,`);
							r.push(Spoken(inspectee, `"I give cum. It's actually lots of fun!"`));
							r.push(`${He} shakes ${his} penis for emphasis.`);
							r.push(Spoken(inspectee, `"The machine feels so good. And when I'm almost empty, I get buttfucked to get the last drop out of me!"`));
							r.push(`${He} shivers.`);
							r.push(Spoken(inspectee, `"It's really nice...`));
							r.push(`The inspector looks deflated, and reluctantly makes a positive note on ${his2} tablet.`);
							V.shelterAbuse -= 1;
						}
						break;
					default:
						r.push(`${inspectee.slaveName} ${say}s flatly,`);
						r.push(Spoken(inspectee, `"Whatever my beloved ${properMaster()} requires. I have a good life now, and I would appreciate it if you would support me by doing everything you can for ${himP}."`));
						r.push(`Taken aback, the inspector ${say2}s ${he2}'ll put out a <span class="reputation inc">good word</span> about you.`);
						repX(500, "event", inspectee);
						V.shelterAbuse -= 1;
				}
			}
			allowContinue();

			App.Events.addParagraph(el, r);
			return el;
		}

		function allowContinue() {
			V.nextButton = "Continue";
			App.Utils.updateUserButton();
		}

		function generateInspector() {
			const inspector = GenerateNewSlave("XX", {
				minAge: 36, maxAge: 42, ageOverridesPedoMode: 1, race: "nonslave", disableDisability: 1
			});
			inspector.origin = "$He was once an inspector for the Shelter, but you put a stop to that.";
			inspector.career = "a charity worker";
			inspector.devotion = random(-90, -75);
			inspector.trust = random(75, 90);
			inspector.oldDevotion = inspector.devotion;
			inspector.oldTrust = inspector.trust;
			setHealth(inspector, jsRandom(30, 50), 0, 0, 0, 40);
			inspector.skill.anal = 0;
			inspector.skill.oral = 0;
			inspector.skill.whoring = 0;
			inspector.skill.vaginal = 0;
			inspector.skill.entertainment = 0;
			inspector.butt = random(4, 6);
			if (inspector.vagina < 1) {
				inspector.vagina = 2;
			}
			inspector.boobs = 100 * random(12, 18);
			inspector.natural.boobs = inspector.boobs;
			inspector.weight = random(20, 80);
			inspector.face = -20;
			inspector.voice = 1;
			inspector.hColor = "graying";
			inspector.override_H_Color = 1;
			inspector.hLength = 40;
			inspector.hStyle = "bun";
			inspector.energy = random(5, 50);
			inspector.behavioralFlaw = either("gluttonous", "hates men", "hates women", "liberated");
			inspector.sexualFlaw = either("apathetic", "idealistic");
			inspector.clothes = either("conservative clothing", "nice business attire");
			inspector.shoes = either("flats", "heels");
			return inspector;
		}
	}
};
