// cSpell:ignore intubations

App.Events.PBioreactorPerfected = class PBioreactorPerfected extends App.Events.BaseEvent {
	eventPrerequisites() {
		return [
			() => V.bioreactorPerfectedID !== 0,
			() => V.bioreactorsAnnounced !== 1,
		];
	}

	actorPrerequisites() {
		return [[
			(s) => s.assignment === Job.DAIRY,
			(s) => s.boobs > 48000,
			(s) => (s.balls === 0 || s.balls >= 10),
			(s) => s.fetish === Fetish.MINDBROKEN,
		]];
	}

	execute(node) {
		let r = [];

		V.nextButton = "Continue";
		V.bioreactorsAnnounced = 1;

		const bioSlave = getSlave(this.actors[0]);

		let bioreactorsXX = 0;
		let bioreactorsXY = 0;
		let bioreactorsHerm = 0;
		let bioreactorsBarren = 0;
		if (bioSlave.ovaries === 1) {
			if (bioSlave.balls === 0) {
				bioreactorsXX = 1;
			} else {
				bioreactorsHerm = 1;
			}
		} else {
			if (bioSlave.balls === 0) {
				bioreactorsBarren = 1;
			} else {
				bioreactorsXY = 1;
			}
		}
		const {
			His, He,
			his, he, him,
		} = getPronouns(bioSlave);
		const {
			HeA, HisA,
			heA, hisA, girlA, himselfA, womanA
		} = getPronouns(assistant.pronouns().main).appendSuffix("A");

		r.push(`When you need peace and quiet to work through a difficult problem, you sometimes take a few minutes to pace through ${V.dairyName}. The massive, gently swaying breasts are always an encouraging sight, and the faint, rhythmic sounds of machine milking, machine feeding, and machine sodomy have a stimulating effect on one's thought processes. When you reach the end of the row of machines for the first time today, you turn to walk back again, and then notice that ${V.assistant.name}'s`);
		if (V.assistant.personality <= 0) {
			r.push(`symbol is visible on a screen across the last cow in the row from you, glowing gently to get your attention.`);
		} else {
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`monster ${girlA} avatar is visible on a screen across the last cow in the row from you, waving cheerfully for your attention with one of ${hisA} hands and a couple of ${hisA} hair-tentacles.`);
					break;
				case "shemale":
					r.push(`shemale avatar is visible on a screen across the last cow in the row from you, waving for your attention. (${HisA} bouncy waving makes ${hisA} ever-erect cock wave too.)`);
					break;
				case "amazon":
					r.push(`amazon avatar is visible on a screen across the last cow in the row from you, jumping up and down for your attention.`);
					break;
				case "businesswoman":
					r.push(`business ${womanA} avatar is visible on a screen across the last cow in the row from you, waving politely for your attention and pointing to a tablet in ${hisA} hand.`);
					break;
				case "fairy":
					r.push(`fairy avatar is visible on a screen across the last cow in the row from you, waving energetically and pointing to a tablet that ${heA}'s sitting on.`);
					break;
				case "pregnant fairy":
					r.push(`pregnant fairy avatar is visible on a screen across the last cow in the row from you, waving energetically and pointing to a tablet that ${heA}'s sitting on.`);
					break;
				case "goddess":
					r.push(`goddess avatar is visible on a screen across the last cow in the row from you, waving demurely for your attention and holding up one of ${hisA} dribbling breasts.`);
					break;
				case "hypergoddess":
					r.push(`goddess avatar is visible on a screen across the last cow in the row from you; ${heA} is aggressively milking ${himselfA} trying to get your attention.`);
					break;
				case "loli":
					r.push(`child avatar is visible on a screen across the last cow in the row from you, jumping up and down for your attention.`);
					break;
				case "preggololi":
					r.push(`child avatar is visible on a screen across the last cow in the row from you, waving ${hisA} arms over ${hisA} head.`);
					break;
				case "angel":
					r.push(`angel avatar is visible on a screen across the last cow in the row from you, waving ${hisA} arms and flapping ${hisA} wings.`);
					break;
				case "cherub":
					r.push(`cherub avatar is visible on a screen across the last cow in the row from you, fluttering back and forth while waving ${hisA} hands.`);
					break;
				case "incubus":
					r.push(`incubus avatar is visible on a screen across the last cow in the row from you, idly rubbing ${hisA} dick with one hand and beckoning you with the other.`);
					break;
				case "succubus":
					r.push(`succubus avatar is visible on a screen across the last cow in the row from you; ${heA} is happily mooning you.`);
					break;
				case "imp":
					r.push(`impish avatar is visible on a screen across the last cow in the row from you, flying back and forth while waving ${hisA} hands.`);
					break;
				case "witch":
					r.push(`witch avatar is visible on a screen across the last cow in the row from you, hopping up and down while waving ${hisA} arms over ${hisA} head.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`avatar is visible on a screen across the last cow in the row from you; ${heA} has produced countless flashing tubercles across ${hisA} body.`);
					break;
				case "schoolgirl":
					r.push(`school${girlA} avatar is visible on a screen across the last cow in the row from you, waving cutely for your attention and pointing to a tablet in ${hisA} hand.`);
					break;
				default:
					r.push(`symbol is visible on a screen across the last cow in the row from you, spinning and glowing gently to get your attention.`);
			}
		}
		App.Events.addParagraph(node, r);
		r = [];
		if (V.assistant.personality <= 0) {
			if (V.PC.title === 1) {
				r.push(`"Sir,"`);
			} else {
				r.push(`"Madam,"`);
			}
			r.push(`${heA} says, "I have a matter for your attention, concerning this slave."`);
		} else {
			if (V.PC.title === 1) {
				r.push(`"Sir,"`);
			} else {
				r.push(`"Ma'am,"`);
			}
			r.push(`${heA} says, "I'd like to ask you something about this slave."`);
		}
		r.push(`You stop and consider the cow, from ${his} titanic breasts to ${his}`);
		if (bioSlave.balls >= 10 && bioSlave.scrotum > 0) {
			r.push(`swollen balls`);
		} else if (bioSlave.vagina > -1) {
			r.push(`slavering cunt`);
		} else {
			r.push(`distended stomach`);
		}
		r.push(`to ${his} dildo-filled anus.`);
		if (V.assistant.personality <= 0) {
			r.push(`"This slave is permanently dependent on ${his} milking machine," it continues. "${He} cannot be removed without uneconomical expenditures, and is unlikely to be useful elsewhere. Additionally, there is nothing more that can be done to make ${his} breasts any`);
			if (bioSlave.balls >= 10) {
				r.push(`bigger or ${his} testicles any more productive.`);
			} else if (bioSlave.ovaries === 1) {
				r.push(`bigger or ${his} womb any more productive.`);
			} else {
				r.push(`bigger.`);
			}
			r.push(`${His} development is essentially final, and that status can be made official. ${He} could be redesignated as equipment. Other than ${his} designation, this would make little difference: the machine would be slightly less cautious with ${his} drugs, future intubations, and such. ${He} would be removed from the slave lists."`);
		} else {
			r.push(`"${He}'s never leaving here, not without surgery. And even then, ${he}'s forgotten almost everything, and ${he} won't be getting it back."`);
			switch (V.assistant.appearance) {
				case "monstergirl":
					r.push(`The monster${girlA} positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "shemale":
					r.push(`The shemale positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks uncharacteristically meditative.`);
					break;
				case "amazon":
					r.push(`The amazon positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "businesswoman":
					r.push(`The business${womanA} positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "fairy":
					r.push(`The fairy positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s standing on ${his} shoulder and hugging ${his} cheek.`);
					break;
				case "pregnant fairy":
					r.push(`The pregnant fairy positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s standing on ${his} shoulder and hugging ${his} cheek.`);
					break;
				case "goddess":
					r.push(`The goddess positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently caressing the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "hypergoddess":
					r.push(`The goddess positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently caressing the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "loli":
					r.push(`The little ${girlA} positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "preggololi":
					r.push(`The little ${girlA} positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "angel":
					r.push(`The angel positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently caressing the slave. ${HeA} looks meditative.`);
					break;
				case "cherub":
					r.push(`The cherub positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders while hovering over them. ${HeA} looks meditative.`);
					break;
				case "incubus":
					r.push(`The incubus positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently groping the slave's rear. ${HeA} looks uncharacteristically meditative.`);
					break;
				case "succubus":
					r.push(`The succubus positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s resting ${hisA} breasts on the slave's head. ${HeA} looks uncharacteristically meditative.`);
					break;
				case "imp":
					r.push(`The imp positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently rubbing the slave's shoulders while hovering over them. ${HeA} looks uncharacteristically meditative.`);
					break;
				case "witch":
					r.push(`The witch positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently caressing the slave's shoulders. ${HeA} looks meditative.`);
					break;
				case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
					r.push(`It positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently caressing the slave's breasts and groin with fleshy tentacles. ${HeA} looks uncharacteristically meditative.`);
					break;
				case "schoolgirl":
					r.push(`The school${girlA} positions ${himselfA} on the screen to create an optical illusion that makes it look like ${heA}'s gently petting the slave's shoulders. ${HeA} looks uncharacteristically meditative.`);
					break;
				default:
					r.push(`The symbol on the screen dissolves down to create a gentle backlight behind the slave.`);
			}
			r.push(`"${He}'s beautiful, isn't ${he}? Perfect. There's nothing more that can be done, to make ${his} udders any`);
			if (bioSlave.balls >= 10) {
				r.push(`bigger or ${his} balls any more productive`);
			} else if (bioSlave.ovaries === 1) {
				r.push(`bigger or ${his} womb any more productive`);
			} else {
				r.push(`bigger.`);
			}
			r.push(`${He}'s complete, and ${he}'s part of this machine now, and that's all ${he}'ll ever be. I can make that status official,`);
			if (V.PC.title === 1) {
				r.push(`Sir.`);
			} else {
				r.push(`Ma'am.`);
			}
			r.push(`I'd redesignate ${him} as equipment. It wouldn't change much, other than a designation. I'd just be a little less cautious with ${his} drugs, future intubations, things like that. But for slave purposes, ${he}'d be gone. Just a part of ${V.dairyName}, forever. Or, until ${he} wears out in`);
			if (V.retirementAge - bioSlave.physicalAge <= 3) {
				r.push(`in a few years."`);
			} else if (V.retirementAge - bioSlave.physicalAge <= 10) {
				r.push(`in a decade or so."`);
			} else if (V.retirementAge - bioSlave.physicalAge >= 20) {
				r.push(`in a couple of decades."`);
			} else {
				r.push(`in."`);
			}
		}

		App.Events.addParagraph(node, r);

		const choices = [];
		choices.push(new App.Events.Result(`Do it, and do it to all maximized dairy slaves`, doAll, isShelterSlave(bioSlave) ? `This will violate your contract with the Slave Shelter.` : ``));
		choices.push(new App.Events.Result(`No, leave ${him} as ${he} is`, no));
		App.Events.addResponses(node, choices);

		function doAll() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`Your assistant pauses, and then says, "Redesignation complete, ${properTitle()}. This milking machine has been equipped with biological components. This combination is projected to produce approximately`);
			if (bioSlave.balls > 0) {
				r.push(`${1000 * Math.trunc((3 * 52 * (V.retirementAge - bioSlave.physicalAge)) / 1000)} liters of cum,`);
			}
			if (bioSlave.ovaries === 1) {
				r.push(`${100 * Math.trunc((52 * (V.retirementAge - bioSlave.physicalAge)) / 100)} liters of vaginal secretions,`);

				r.push(`${5 * (V.retirementAge - bioSlave.physicalAge)} slaves,`);
			}
			r.push(`and ${1000 * Math.trunc((300 * 52 * (V.retirementAge - bioSlave.physicalAge)) / 1000)} liters of milk over a ${V.retirementAge - bioSlave.physicalAge} year period before its biological components must be replaced."`);
			if (V.assistant.personality > 0) {
				switch (V.assistant.appearance) {
					case "monstergirl":
						r.push(`${HisA} avatar watches the new equipment with almost motherly affection, ${hisA} tentacle hair writhing obscurely.`);
						break;
					case "shemale":
						r.push(`${HisA} avatar sits down and produces a glass of milk. ${HeA} drains it in one long chug, and then begins to jerk off.`);
						break;
					case "amazon":
						r.push(`${HisA} avatar sits down with a clatter of bone ornaments, produces a skin of milk, and takes a long pull.`);
						break;
					case "businesswoman":
						r.push(`${HisA} avatar stands on the screen, watching the new equipment with an air of satisfaction.`);
						break;
					case "fairy":
						r.push(`${HisA} avatar hovers around, humming a tune while checking the new equipment.`);
						break;
					case "pregnant fairy":
						r.push(`${HisA} avatar hovers around, humming a soft tune while checking the new equipment.`);
						break;
					case "goddess":
						r.push(`${HisA} avatar sits down, kneading ${hisA} milky tits in empathy, a hint of simulated jealousy in the way ${heA} watches the new equipment.`);
						break;
					case "hypergoddess":
						r.push(`${HisA} avatar sits down, kneading ${hisA} milky tits in empathy, a hint of simulated jealousy in the way ${heA} watches the new equipment.`);
						break;
					case "loli":
						r.push(`${HisA} avatar sits down, rubbing ${hisA} flat chest sadly as ${heA} watches the new equipment.`);
						break;
					case "preggololi":
						r.push(`${HisA} avatar sits down, pinching ${hisA} milky nipples in empathy, a hint of simulated jealousy in the way ${heA} watches the new equipment.`);
						break;
					case "angel":
						r.push(`${HisA} avatar blushes as ${heA} watches the new equipment. "${He}'ll feed so many hungry mouths..."`);
						break;
					case "cherub":
						r.push(`${HisA} avatar blushes at the sight of the new equipment. ${HeA} quickly buries ${hisA} face in ${hisA} palms at the perversion.`);
						break;
					case "incubus":
						r.push(`${HisA} avatar starts jerking off to the sight of the new bioreactor. ${HeA} throws you a smirk, "But you like MY milk best, don't you?"`);
						break;
					case "succubus":
						r.push(`${HisA} avatar rubs ${hisA} breasts, steadily swelling them until a gush of milk escapes ${hisA} nipples. "Mine will always be your favorite."`);
						break;
					case "imp":
						r.push(`${HisA} avatar licks ${hisA} lips at the new equipment, longing to taste it.`);
						break;
					case "witch":
						r.push(`${HisA} avatar sits down and brings ${hisA} hands to ${hisA} breasts wondering if ${heA} could make them big and milky for you too.`);
						break;
					case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
						r.push(`${HisA} avatar's breasts steadily begin swelling, ${hisA} belly following not long after. Once it is similar in size to the new equipment, a pair of tentacles extend from ${hisA} back and clamp onto ${hisA} nipples, eagerly suckling milk from ${hisA} unnatural udders.`);
						break;
					case "schoolgirl":
						r.push(`${HisA} avatar sits down, watching the new equipment with an air of embarrassment. The school${girlA} blushes, and begins to masturbate.`);
						break;
					default:
						r.push(`${HisA} avatar symbol returns to gentle spinning, doing so in synchrony with the undulations of the new equipment's breasts.`);
				}
			}
			r.push(`"Future redesignations can always be disabled from ${V.dairyName} interface."`);
			V.bioreactorsXX += bioreactorsXX;
			V.bioreactorsXY += bioreactorsXY;
			V.bioreactorsHerm += bioreactorsHerm;
			V.bioreactorsBarren += bioreactorsBarren;
			if (isShelterSlave(bioSlave)) {
				V.shelterAbuse++;
			}
			removeSlave(bioSlave);
			V.createBioreactors = 1;
			App.Events.addParagraph(frag, r);
			return frag;
		}

		function no() {
			const frag = new DocumentFragment();
			let r = [];
			r.push(`"Yes, ${(V.PC.title === 1) ? "sir" : "ma'am"}," your assistant confirms. "This option will remain accessible from ${V.dairyName}'s control interface, if you reconsider."`);

			App.Events.addParagraph(frag, r);
			return frag;
		}


		App.UI.DOM.appendNewElement("h3", node, `${His} records...`);
		/* Copied and modified from dairyReport, should be kept in sync manually to be*/

		/* Income section */
		let cash = 0;

		/* Cum */
		let seed = (100 * bioreactorsXY) + (100 * bioreactorsHerm);
		if (V.arcologies[0].FSPastoralistLaw === 1) {
			cash += seed * random(40, 50);
		} else if (FutureSocieties.isActive('FSPastoralist')) {
			cash += seed * (random(25, 35) + Math.trunc(V.arcologies[0].FSPastoralist / 10));
		} else {
			cash += seed * random(25, 35);
		}

		/* FemCum */
		seed = (2 * bioreactorsXX) + (2 * bioreactorsHerm);
		if (V.arcologies[0].FSPastoralistLaw === 1) {
			cash += seed * random(40, 50);
		} else if (FutureSocieties.isActive('FSPastoralist')) {
			cash += seed * (random(25, 35) + Math.trunc(V.arcologies[0].FSPastoralist / 10));
		} else {
			cash += seed * random(25, 35);
		}

		/* Milk */
		seed = (800 * bioreactorsXX) + (700 * bioreactorsBarren) + (600 * bioreactorsXY) + (600 * bioreactorsHerm);
		if (FutureSocieties.isActive('FSPastoralist')) {
			if (V.arcologies[0].FSPastoralistLaw === 1) {
				cash += seed * (13 + Math.trunc(V.arcologies[0].FSPastoralist / 30));
			} else {
				cash += seed * (8 + Math.trunc(V.arcologies[0].FSPastoralist / 30));
			}
		} else {
			cash += seed * 9;
		}
		App.UI.DOM.appendNewElement("p", node,
			App.Events.makeNode([`As a bioreactor, she might gross ${cashFormatColor(cash)} and cost just ${cashFormatColor(-100)}, bringing in ${cashFormatColor(cash - 100)}`]),
			["indent", "note"]
		);

		App.UI.DOM.appendNewElement("p", node, `${His} current task is to ${bioSlave.assignment}${(V.assignmentRecords[bioSlave.ID]) ? `, and before that to ${V.assignmentRecords[bioSlave.ID]}` : ""}.`, "indent");

		node.append(slaveExpenses(bioSlave));
	}
};
