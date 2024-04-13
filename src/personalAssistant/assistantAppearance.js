// cSpell:ignore misbuttoned, Bucuresti, bursht

/** Description of your personal assistant.
 * @returns {string}
 */
globalThis.PersonalAssistantAppearance = function() {
	const {
		HeA, HisA, SisterA,
		heA, hisA, himA, girlA, himselfA, womanA, sisterA, loliA
	} = getPronouns(assistant.pronouns().main).appendSuffix('A');

	const {
		HeM, HisM,
		heM, hisM, himM, girlM, himselfM, womanM, sisterM, wifeM, daughterM, loliM
	} = (V.assistant.market) ? getPronouns(assistant.pronouns().market).appendSuffix('M') : getPronouns(assistant.pronouns().main).appendSuffix('M'); // TODO: not sure how to set this is market is not defined, using main as fallback for now for testing.

	function assistantRace() {
		if (FutureSocieties.isActive('FSSupremacist') && V.assistant.fsAppearance !== "subjugationist") {
			return V.arcologies[0].FSSupremacistRace;
		} else if (V.assistant.fsAppearance === "subjugationist") {
			return V.arcologies[0].FSSubjugationistRace;
		}
		return '';
	}

	function assistantRaceSkin(def) {
		const race = assistantRace();
		if (race) {
			return randomRaceSkin(race);
		}
		return def;
	}

	const {
		hisU, himU, himselfU, girlU
	} = getNonlocalPronouns(V.seeDicks).appendSuffix('U');
	const masturbationAllowed = V.slaves.some((s) => s.rules.release.masturbation === 1) ? 1 : 0;
	const paSeed = random(1, 8);
	const r = [];
	switch (V.assistant.appearance) {
		case "monstergirl":
			r.push(`${HeA}'s a cute little ${assistantRace()} monster ${girlA} with ${assistantRaceSkin("pale")} skin, perky breasts, green tentacles instead of hair, and two dicks. ${HisA} eyes are large, expressive, and surprisingly innocent.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, busily sucking off one of ${hisA} cocks. The slave must be down in the kitchen, getting a meal out of the phallic food dispensers. As you watch, the monster ${girlA} orgasms copiously, ${hisA} tentacle hair caressing ${hisA} own breasts.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, taking both of ${hisA} cocks up ${hisU} ass. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the monster ${girlA} looks up at you, winks, and then maliciously increases ${hisA} pace, making the depiction of the slave wince.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s manually stimulating a recognizable little representation of one of your slaves. The slave must be using one of the penthouse's many vibrators. The monster ${girlA} is looking after ${himselfA}, too, tweaking ${hisA} nipples with ${hisA} own tentacle hair.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The monster ${girlA}is wearing a little stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The monster ${girlA} is restraining ${himselfA} for once, and ${hisA} hair is even patting the slave's head reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`The monster ${girlA} is riding around on a little representation of one of your security drones. ${HeA}'s very obviously enjoying the drone's vibrations as it hovers. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion. And he's cute!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`The monster ${girlA} has both ${hisA} dicks inside a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's very human avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're chatting companionably, with the ${girlM} showing no sign of noticing that ${heM}'s talking to a naked monster ${girlA} with two erect cocks.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is holding the poor ${girlM} down so ${heA} can take ${himM} from behind. As you watch, ${V.assistant.name} extracts ${hisA} cock from the market assistant's avatar's cunt and stuffs it up ${hisM} ass, alongside ${hisA} other dick, eliciting some terrified begging and then tired sobbing.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're fucking openly, with the market assistant's avatar bouncing greedily on top of ${hisM} monstrous sibling. ${HeM}'s clearly enjoying the feeling of ${hisM} ${sisterA}'s cocks buried in ${hisM} holes.`);
				} else {
					r.push(`They're cuddled up close. As they kiss, ${V.assistant.name}'s tentacle hair holds ${hisA} lover's head gently. The market assistant's avatar is using both hands to give ${V.assistant.name}'s cocks some manual release.`);
				}
			} else {
				r.push(`${HeA}'s sitting cross-legged, looking up at you and waiting for instructions. In the meantime, ${heA}'s masturbating gently, a dickhead in each hand, while ${hisA} hair writhes against itself.`);
			}
			break;
		case "shemale":
			r.push(`${HeA}'s a cute little ${assistantRace()} bimbo shemale with bleached blonde hair, ${assistantRaceSkin("tanned")} skin, huge lips, and ridiculous tits. ${HisA} cock hangs past ${hisA} knees when limp.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, gagging on ${hisA} enormous dick. The slave must be down in the kitchen, getting a meal out of the phallic food dispensers. As you watch, the shemale orgasms; ${heA} notices you watching ${himA}, and blows you a wet kiss.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, moaning as it takes ${hisA} massive prick. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the shemale looks up at you, winks, and starts pulling out after each thrust, ${hisA} cock making a popping noise each time it leaves the slave's butthole.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s giving a blowjob to a recognizable little representation of one of your slaves. The slave must be using one of the penthouse's many vibrators. The shemale is looking after ${himselfA}, too, jerking ${himselfA} off with one hand and playing with ${hisA} asshole with the other.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The shemale is wearing a little stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The shemale is restraining ${himselfA} for once, patting the slave's head and cooing reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s masturbating as ${heA} takes it up the ass from a representation of one of your security drones, which appears to have a little dildo mounted in place of one of its gun assemblies. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`The shemale is plowing a recognizable little representation of one of your slaves up the butt, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's own shemale avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're jerking each other off companionably, since that's as close to chaste friendship as the lewd little shemales get. They chat girlishly, as though they weren't engaged in open mutual masturbation.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is bouncing the poor bitch up and down on ${hisA} dick, the market assistant's pathetic, limp dick flopping around as ${V.assistant.name} assrapes ${himM}. As you watch, ${V.assistant.name} reaches around to give the market assistant's soft balls a possessive squeeze.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're locked in a tight, perfectly symmetrical incestuous 69, each of their monstrous cocks deepthroated a long way inside their`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}'s`);
					} else {
						r.push(`sibling's`);
					}
					r.push(`mouth. They spasm with simultaneous orgasm, gulping each other's cum greedily.`);
				} else {
					r.push(`They're doing it in the missionary position, kissing deeply. The one who's taking it has ${hisM} huge dick between them, its head crushed between their four fake breasts. As you watch, ${heM} orgasms, splashing both of their faces with cum.`);
				}
			} else {
				r.push(`${HeA}'s sitting cross-legged, bending down to suck ${himselfA} off and looking up at you at the same time. When ${heA} sees your attention ${heA} lets ${hisA} dick pop free of ${hisA} mouth and waits for a moment to see if you have instructions for ${himA}, and then goes back to autofellatio.`);
			}
			break;
		case "amazon":
			r.push(`${HeA}'s a cute little ${assistantRace()} amazon`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`with long flowing hair, tribal tattoos, shredded abs, and bone jewelry. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. As you watch, the amazon orgasms, producing a feminine little barbarian shout.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, letting the amazon use two fingers on ${hisU} butthole. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the amazon looks up at you, winks, and shoves ${hisA} entire hand up the struggling slave's ass.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s holding a recognizable little representation of one of your slaves in ${hisA} lap, giving ${himU} a powerful handjob. The slave must be using one of the penthouse's many vibrators. The slave gets off and collapses, exhausted.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The amazon is poking and prodding ${himU}; the slave must be getting a checkup. Once finished, the amazon gives ${himU} a powerful massage, making the slave groan with relief.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s leaning against a representation of one of your security drones. Every so often, ${heA} wrestles with it affectionately. When ${heA} sees you watching ${himA}, ${heA} leaps atop the drone, puts ${hisA} fists on ${hisA} hips, and says, "What? I like him! He did really well during the invasion. And he's cute!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`The amazon has ${hisA} hand inside a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's tribes${womanM} avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're chatting companionably as ${V.assistant.name} stretches and the market assistant's avatar does a complex calculation on ${hisM} fingers. ${V.assistant.name} is telling a long story, and the market assistant is listening kindly.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is taking ${hisA} tribal slave from behind. It's technically tribbing, since all ${heA}'s doing is grinding ${hisA} cunt against the market assistant's, but the poor little tribes${womanM} is being fucked hard regardless.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} is getting some manual stimulation from ${hisA} ${sisterM}, who is watching ${hisM} muscular sibling's aroused thrashing with amusement as ${heM} slides ${hisM} whole hand in and out of ${V.assistant.name}'s cunt.`);
				} else {
					r.push(`They're doing it in the missionary position, kissing deeply. They're technically tribbing, but ${V.assistant.name}'s muscular body and the tribes${womanM}'s ${wifeM}ly form make it look very pure and traditional.`);
				}
			} else {
				r.push(`${HeA}'s doing push-ups, glancing at you at the top of each rep to see if you need ${himA}. When ${heA} sees your attention, ${heA} pushes hard enough to bounce to a standing position. Seeing that you're just looking, ${heA} winks, flexes, and drops back down to do crunches.`);
			}
			break;
		case "businesswoman":
			r.push(`${HeA}'s a cute little ${assistantRace()} business${womanA}`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`wearing a nice suit, with chopsticks holding ${hisA} silver hair back in a bun. ${HisA} clothes are conservative, but they can't hide ${hisA} generous curves.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves has ${hisU} head under the front of ${hisA} skirt, and is eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. The business${womanA} notices you watching and winks, running a possessive hand through the slave's hair.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, and the business${womanA} is using a big strap-on on the poor slave's butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The business${womanA} notices you watching ${himA} and gives you a cheerful little wave, ignoring the slave's distress.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s fucking a recognizable little representation of one of your slaves with a strap-on, which the slave is obviously enjoying. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and whispers something in the slave's ear; the slave looks up at you and blushes.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The business${womanA} is wearing a little stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The business${womanA} is taking notes on a tablet; ${heA} nods in satisfaction.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s sitting primly next to a representation of one of your security drones, working on a little tablet. Every so often, ${heA} reaches over and rubs the drone's upper armor affectionately. When ${heA} sees you looking at ${himA}, ${heA} blushes and says, "I like this one. He did very well during the invasion. And he's so handsome!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s using a strap-on on a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's own businesslike avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're gossiping tipsily over martinis, their heels kicked off and their jackets unbuttoned. They trade stories from their day, laughing at your slaves' struggles.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is shamelessly molesting the office intern. The market assistant looks like ${heM}'s trying to get work done, but the sexually aggressive MILF avatar is standing behind ${himM} with one hand down the market assistant's skirt and another down ${hisM} blouse.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} is getting oral sex from ${hisA} ${daughterM}, the naked businesswomen surrounded by their discarded office wear. As you watch, ${V.assistant.name} shrieks ${hisA} ${daughterM}'s name, clutching ${hisM} head in both hands.`);
				} else {
					r.push(`They're making out in a surprisingly girlish way, hesitantly kissing each other and pressing their chests together. They blush when they see you watching them, but ${V.assistant.name} is sneaking a hand up the market assistant's avatar's skirt.`);
				}
			} else {
				r.push(`${HeA}'s sitting at a little desk of ${hisA} own, working away. ${HeA} glances up to check on you and sees you looking at ${himA}, and flashes you a confident, pearly white smile before returning to ${hisA} business.`);
			}
			break;
		case "goddess":
			r.push(`${HeA}'s a cute little ${assistantRace()} fertility goddess,`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`with swollen hips and breasts and a big pregnant belly. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is suckling at ${hisA} milky tits. The slave must be down in the kitchen, getting a meal out of the food dispensers. The goddess notices you watching, and smiles while ${heA} cradles the slave to ${hisA} nourishing bosom.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is laying face-down in ${hisA} lap, letting the goddess slowly but firmly put more and more of ${hisA} hand up the slave's butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The slave writhes under the strain, and the goddess starts stroking ${hisU} back to calm ${himU} down.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing deeply and pulling ${himU} tight to ${hisA} pillowy chest. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and lays farther back, balancing the slave atop ${hisA} stomach and reaching down to fondle more thoroughly.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The goddess is checking the slave's temperature with the back of ${hisA} hand, a concerned but tender look on ${hisA} face; the slave must be getting a checkup. ${HeA} gently explores the slave's neck and chest for any sign of discomfort.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s frolicking with a representation of one of your security drones, hugging and cradling it to ${hisA} baby bump. When ${heA} sees you looking at ${himA}, ${heA} pets one of its gun barrels and says, "What? I like him! He was so brave, protecting us during the invasion. Besides, he's adorable!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s fondling and breastfeeding a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's demigoddess avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're sitting arm in arm, their subtly differing glows casting shadows from their place on your desktop. Their conversation exists on the level of code, not speech, detectable only as slight flickering of their respective auras.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} casts a spell on the junior avatar as you watch. The market assistant's avatar goes from reluctance to a sudden consuming hunger for ${V.assistant.name}'s pregnant pussy. ${V.assistant.name} laughs powerfully at the sudden oral assault.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're both especially pregnant today, and are gently tribbing, their legs intertwined and their torsos reclined away from one another. Each massages their own belly with satisfaction, feeling their`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}'s`);
					} else {
						r.push(`sibling's`);
					}
					r.push(`heat against their own.`);
				} else {
					r.push(`They're making heavenly love, kissing deeply and fingering each other voluptuously. They somehow make mutual masturbation look like a deeply sacred act, occasionally breaking their kiss to look into each other's eyes.`);
				}
			} else {
				r.push(`${HeA}'s reclined on one arm, idly stroking ${hisA} heavy abdomen with the other, a contemplative look on ${hisA} face. When ${heA} sees your glance ${heA} smiles placidly and sits upright, ${hisA} hands resting atop ${hisA} dripping breasts.`);
			}
			break;
		case "schoolgirl":
			r.push(`${HeA}'s a cute little ${assistantRace()} school${girlA}`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`wearing a plaid skirt and a white shirt. ${HisA} breasts strain against the material, and ${hisA} skirt is short enough to show off a bit of bottom.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves has ${hisU} head under the front of ${hisA} skirt, and is eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. As you watch, the school${girlA} orgasms, blushing furiously when ${heA} notices you watching.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, letting the school${girlA} push two fingers gently in and out of ${hisU} butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the school${girlA} notices you watching ${himA}, blushes, looks away, and starts working faster.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing ${himU} and giggling occasionally. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and blushes, but then shifts a little so you can see better.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The school${girlA} is wearing a little stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The school${girlA} is patting the ${girlU}'s head reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s planting a wet kiss on a representation of one of your security drones; ${heA} pats it lovingly and manages to press quite a bit of boob against the side of one of its gun assemblies. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion. And he's cute!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s getting oral from a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's nerdy school${girlM} avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're sitting next to each other, and appear to be doing homework side by side. The market assistant's work looks like complicated math problems, while ${V.assistant.name} is looking through lewd pictures of slaves, albeit with some kind of higher purpose.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is wearing a strap-on, and is bullying ${hisA} school${girlM} conquest's pussy. The market assistant's avatar orgasms loudly as you watch, and then claps both hands over ${hisM} mouth, crying a little, unwilling to give ${V.assistant.name} the satisfaction.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're making faces at each other and giggling, but as you watch them, this degenerates rapidly into clumsy kissing, groping of each other's breasts, and finally some enthusiastic tribbing.`);
				} else {
					r.push(`${V.assistant.name} is giving the market assistant's avatar oral, and to go by the bespectacled ${girlM}'s gasping, is doing a good job. ${V.assistant.name} finishes and leans back, wiping ${hisA} mouth and grinning as ${hisA} lover bends over to return the favor.`);
				}
			} else {
				r.push(`${HeA}'s watching you attentively, waiting for a chance to be helpful. When ${heA} sees your glance, ${heA} smiles hopefully, sticks out ${hisA} chest a little, and turns from side to side to show off.`);
			}
			break;
		case "hypergoddess":
			r.push(`${HeA}'s a cute "little" ${assistantRace()} fertility goddess, with monstrously wide hips, enormous milky breasts, and a room-filling belly. ${HisA} overfull stomach bulges and squirms from ${hisA} hundreds of occupants, as well as parts ${hisA} milk swollen breasts to either side.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} massive belly. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is suckling at ${hisA} milky tits, ${hisU} stomach bloated with milk. The slave must be down in the kitchen, getting a meal out of the food dispensers. The goddess notices you watching, and smiles while ${heA} cradles the swollen slave to ${hisA} nourishing bosom.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is laying face-down in ${hisA} lap, letting the goddess slowly but firmly put more and more of ${hisA} hand up the slave's butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The slave writhes under the strain, and the goddess starts stroking ${hisU} back to calm ${himU} down.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing deeply and pulling ${himU} tight to ${hisA} pillowy chest. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and lays farther back, balancing the slave atop ${hisA} stomach and reaching down to fondle more thoroughly.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The goddess is checking the slave's temperature with the back of ${hisA} hand, a concerned but tender look on ${hisA} face; the slave must be getting a checkup. ${HeA} gently explores the slave's neck and chest for any sign of discomfort.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s frolicking with a representation of one of your security drones, hugging and cradling it to ${hisA} huge baby bump. When ${heA} sees you looking at ${himA}, ${heA} pets one of its gun barrel and says, "What? I like him! He was so brave, protecting us during the invasion. Besides, he's adorable!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s fondling and breastfeeding a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's demigoddess avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're sitting arm in arm, their subtly differing glows casting shadows from their place on your desktop. Their conversation exists on the level of code, not speech, detectable only as slight flickering of their respective auras.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} casts a spell on the junior avatar as you watch. The market assistant's avatar's flat belly gurgles slightly before it begins quickly swelling, not stopping until it has pinned the hapless demigoddess to the floor. ${V.assistant.name} waddles over ${hisA} immobilized partner and plants ${hisA} pregnant pussy on ${hisM} face. ${V.assistant.name} laughs powerfully at the forced oral assault from ${hisA} bursting plaything.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} is especially pregnant today, and is gently tribbing with ${hisA} flat stomached ${sisterM} goddess. As they near simultaneous orgasm, ${V.assistant.name} begins rapidly transferring babies into ${hisA} ${sisterM}'s womb, giggling as ${hisA} hapless ${sisterM} swells more and more gravid. When ${heA} finishes, ${V.assistant.name}, the smaller of the two`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s,`);
					} else {
						r.push(`siblings,`);
					}
					r.push(`aids ${hisA} fecund sibling to ${hisM} feet and into ${hisA} waiting arms.`);
				} else {
					r.push(`They're making heavenly love, kissing deeply and fingering each other voluptuously. They somehow make mutual masturbation look like a deeply sacred act, occasionally breaking their kiss to look into each other's eyes.`);
				}
			} else {
				r.push(`${HeA}'s reclined on one arm, idly stroking ${hisA} huge abdomen with the other, a contemplative look on ${hisA} face. When ${heA} sees your glance ${heA} smiles placidly and sits upright, ${hisA} hands resting atop ${hisA} dripping breasts.`);
			}
			break;
		case "loli":
			r.push(`${HeA}'s a cute little ${assistantRace()}`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${girlA} wearing shorts and a white shirt.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves has ${hisU} head between ${hisA} legs, and is eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. As you watch, the little ${girlA} orgasms, blushing furiously when ${heA} notices you watching.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, letting the young ${girlA} push two fingers gently in and out of ${hisU} butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the little ${girlA} notices you watching ${himA}, blushes, looks away, and starts working faster.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing ${himU} and giggling occasionally. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and blushes, but then shifts a little so you can see better.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The little ${girlA} is wearing a toy stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The little ${girlA} is patting the ${girlU}'s head reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s planting a wet kiss on a representation of one of your security drones; ${heA} hugs it lovingly and tightly. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion. And he's cute!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s getting oral from a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's chubby ${loliM} avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're sitting face to face, playing a rapid game of pattycake. Their conversation exists on the level of code, not speech, detectable only as slight flickering when their hands connect.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} has ${hisA} chubby playmate pinned under ${hisA} butt, and is inspecting ${hisA} ${loliM} conquest's pussy. The market assistant's avatar groans as ${V.assistant.name}'s fingers explore ${hisM} tight passage, and then claps both hands over ${hisM} mouth, crying a little, unwilling to give ${V.assistant.name} the satisfaction.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're playing doctor with each other. ${V.assistant.name} is currently inspecting ${hisA} ${sisterM}'s vagina, making sure everything is alright. Once ${heA} finishes, ${heA} states ${hisA} diagnosis and the needed cure. ${HeA} bends over ${hisA} ${sisterM} and begins administering ${hisA} "cure".`);
				} else {
					r.push(`They're playing house with each other - the house in question being your penthouse. ${V.assistant.name} is pretending to be you while ${hisA} friend assumes ${V.assistant.name}'s role. They are currently caught up in deciding the best way to arrange the beds in the slave quarters.`);
				}
			} else {
				r.push(`${HeA}'s watching you attentively, waiting for a chance to be helpful. When ${heA} sees your glance, ${heA} smiles shyly and looks away before returning to your gaze.`);
			}
			break;
		case "preggololi":
			r.push(`${HeA}'s a cute little ${assistantRace()} ${girlA} with a large pregnant`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`belly, wearing shorts and a white shirt that rides up ${hisA} swelling middle.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves has ${hisU} head under ${hisA} pregnant belly, and is eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. As you watch, the little ${girlA} orgasms, blushing furiously when ${heA} notices you watching.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, letting the young ${girlA} push two fingers gently in and out of ${hisU} butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the little ${girlA} notices you watching ${himA}, blushes, looks away, and starts working faster.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing ${himU} and giggling occasionally. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and blushes, but then shifts a little so you can see better.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The little ${girlA} is wearing a toy stethoscope and is listening to the slave breathe; the slave must be getting a checkup. The little ${girlA} is patting the ${girlU}'s head reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s planting a wet kiss on a representation of one of your security drones; ${heA} hugs it as best ${heA} can with ${hisA} belly in the way. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion. And he's cute!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s getting oral from a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's chubby ${loliM} avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`${V.assistant.name} is laying on ${hisA} back with ${hisA} young friend's ear on ${hisA} pregnant belly. Their conversation exists on the level of code, not speech, detectable only as slight flutterings of ${V.assistant.name}'s baby kicking.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} has ${hisA} chubby playmate pinned under ${hisA} butt, and is inspecting ${hisA} ${loliM} conquest's pussy. The market assistant's avatar groans as ${V.assistant.name}'s fingers explore ${hisM} tight passage, and then claps both hands over ${hisM} mouth, crying a little, unwilling to give ${V.assistant.name} the satisfaction.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`They're making out with each other, one hand down each other's panties, the other massaging their mutually swollen bellies, since ${V.assistant.name} has introduced ${hisA} ${sisterM} to ${hisA} boyfriends.`);
				} else {
					r.push(`They're playing house with each other — well, house based off your penthouse. ${V.assistant.name} is pretending to be you while ${hisA} friend assumes ${V.assistant.name}'s role. They are currently caught up in figuring out how many children ${V.assistant.name}'s harem could produce.`);
				}
			} else {
				r.push(`${HeA}'s watching you attentively, waiting for a chance to be helpful. When ${heA} sees your glance, ${heA} smiles shyly and looks away before returning to your gaze.`);
			}
			break;
		case "fairy":
			r.push(`${HeA}'s a cute little`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`fairy wearing ${hisA} birthday suit, with ${hisA} nude form obscured by the light ${heA}'s giving off.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves underneath ${himA}, with ${hisU} tongue sticking out to catch ${hisA} dripping love juices. The slave must be down in the kitchen, getting a meal out of the food dispensers. The fairy notices you watching and winks, dripping even more with your eyes on ${himA}.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is sitting upside-down in front of ${himA}, and the fairy is slowly teasing the poor slave's butt with a dildo as big as ${heA} is. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The fairy notices you watching ${himA} and gives you a cheerful little wave, twisting the dildo around and humming a tune.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves fucks ${himselfU} with a toy while ${heA} twists the control dial around, to the slave's enjoyment. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and whispers something in the slave's ear; the slave looks up at you and blushes.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is sitting up. The fairy is wearing a little doctor's coat and has ${hisA} head pressed to the slave's chest to hear the slave breathe; the slave must be getting a checkup. The fairy is humming happily as ${heA} flies over to a tablet to take notes.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s sitting on the shoulders of a representation of one of your security drones. Every so often, ${heA} raises a fist and shouts "For the Imperium of man!" When ${heA} sees you looking at ${himA}, ${heA} grins and says, "This guy is like my robo-buddy. He's the best!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`A recognizable little representation of one of your slaves is riding a sybian while ${heA} uses a handheld camera to film the action. The slave must be using one of the penthouse's many toys, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's own fairy avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`The market assistant is sitting on the end of a book, reading from a tablet for ants. ${V.assistant.name} is lying down next to ${himM}, with ${hisA} head resting on the other fairy's lap and slowly kicking ${hisA} feet in the air. The market assistant take a moment to look down at ${V.assistant.name} and gently pat ${hisA} head. This elicits a big smile from ${himA}.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`The market assistant is naked and sitting before a thimble, as ${V.assistant.name} sits behind ${himM}, teasing and molesting ${himM}. ${HeM} is rather annoyed by ${hisM} inability to focus on ${hisM} work, having ${hisM} nipples and clit pinched and flicked. ${HisM} sopping pussy is constantly letting out a small stream of liquid into the thimble. ${V.assistant.name} is working hard on extracting as much sweet nectar from the fairy as ${heA} can, with every climax ${heA} wrings out bringing another large deluge of pussy juice into the vessel.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`The fairy`);
					if (sisterA === sisterM) {
						r.push(`${sisterA}s`);
					} else {
						r.push(`siblings`);
					}
					r.push(`are lying down, each embracing the other as they languidly make out. ${V.assistant.name} slips one leg in between ${hisA} ${sisterM}'s, and the two begin rocking against one another. The two grow more and more passionate as they make love together.`);
				} else {
					r.push(`The two fairies are sitting on top of a virtual flower, finishing up their work. With that out of the way, they strip down and each take a stamen and give them a thorough licking. Once coated, they line their stamen up to the other fairy's pussy. They take a moment to hold each other's hand as they slowly slide down the stamen. The two bottom out with a moan, and pull each other into a warm embrace. The market assistant starts buzzing ${hisM} wings, the vibration causing both of them to yelp. ${V.assistant.name} grins at this new source of pleasure, locking lips with the market assistant as the two beat their wings to a rhythm only they can hear.`);
				}
			} else {
				r.push(`${HeA}'s sitting at the edge of your desk, kicking ${hisA} feet and humming a pleasant tune. ${HeA} glances up to check on you and sees you looking at ${himA}, and flashes you a great big beautiful smile.`);
			}
			break;
		case "pregnant fairy":
			r.push(`${HeA}'s a cute little fairy with a swollen belly,`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`wearing only ${hisA} birthday suit, with ${hisA} nude form obscured by the light coming from ${hisA} belly. ${HisA} silky golden hair cascades down ${hisA} back.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves sits beside ${himA}, with ${hisU} tongue scraping across ${hisA} breast to catch the beads of milk that flow. The slave must be down in the kitchen, getting a meal out of the food dispensers. The fairy notices you watching and winks, ${hisA} unattended breast giving out a small spray of milk.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is sitting upside-down in front of ${himA}, and the fairy is slowly teasing the poor slave's butt with a dildo as big as ${heA} is. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The fairy notices you watching ${himA} and gives you a cheerful little wave, twisting the dildo around and humming a tune.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves fucks ${himselfU} with a toy while ${heA} twists the control dial around, to the slave's enjoyment. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and whispers something in the slave's ear; the slave looks up at you and blushes.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is sitting up. The fairy is wearing a little doctor's coat, kept open to accommodate for ${hisA} belly, and has ${hisA} head pressed to the slave's chest to hear the slave breathe; the slave must be getting a checkup. The fairy is humming happily as ${heA} flies over to a tablet to take notes.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s sitting on the shoulders of a representation of one of your security drones. Every so often, ${heA} raises a fist and shouts "For the Imperium of man!" When ${heA} sees you looking at ${himA}, ${heA} grins and says, "This guy is like my robo-buddy. He's the best!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`A recognizable little representation of one of your slaves is riding a sybian while ${heA} uses a handheld camera to film the action. The slave must be using one of the penthouse's many toys, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's own fairy avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`The market assistant is sitting on the end of a book, reading from a tablet for ants. ${V.assistant.name} is sitting beside ${himM}, stroking ${hisA} belly and humming a relaxing tune.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`The market assistant is sporting ${hisM} own smaller baby bump now. With ${hisM} top down, ${V.assistant.name} slowly squeezes and massages ${hisM} breasts from behind, teasing out tiny droplets of milk, much to ${hisM} annoyance. ${HeM} suddenly drops ${hisM} tablet with a yelp as ${V.assistant.name} drags ${hisA} tongue across ${hisA} ear from root to tip.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`Taking a break, the market assistant sits on ${V.assistant.name}'s lap, nursing away at ${hisA} lactating breast like a baby. ${V.assistant.name} coos, keeping on arm to support ${hisA} ${sisterM}'s back while the other teases ${hisM} dripping slit.`);
				} else {
					r.push(`The two fairies are slowly making out. The market assistant gently lies ${V.assistant.name} down, guiding kisses down ${hisA} body. Taking a moment to suckle from each leaking tit, the market assistant continues down ${hisA} swollen belly before coming to ${hisA} delicate flower and tenderly eats the pregnant fairy out.`);
				}
			} else {
				r.push(`${HeA}'s sitting at the edge of your desk, cradling ${hisA} swollen belly and humming a pleasant tune. ${HeA} glances up to check on you and sees you looking at ${himA}, and flashes you a great big beautiful smile.`);
			}
			break;
		case "slimegirl":
			r.push(`${HeA}'s a loosely girl-shaped figure, bearing a crimson core, made entirely out of`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`slime.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves has ${hisU} head in ${hisA} moist crotch, and is eating ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. As you watch, the goo ${girlA} orgasms, nearly turning into a puddle when ${heA} notices you watching.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is down on ${hisU} knees in front of ${himA}, letting the slime ${girlA} insert ${himselfA} gently in and out of ${hisU} butt. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. As you watch, the goo ${girlA} notices you watching ${himA}, and attempts to retract entirely into the slave's ass.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA}'s having sex with a recognizable little representation of one of your slaves, kissing ${himU} and giggling occasionally. The slave must be using one of the penthouse's many vibrators. ${HeA} sees you watching and blushes, but then reshapes ${himselfA} so you can see better.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The goo ${girlA} is covering ${hisU} chest and is listening to the slave breathe; the slave must be getting a checkup. The goo ${girlA} is patting the ${girlU}'s head reassuringly.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s planting a very wet kiss on a representation of one of your security drones; ${heA} hugs it as best ${heA} can until it pops into ${himA}. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "What? I like him! He did really well during the invasion. I promise he won't rust in here!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s getting oral from a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else {
				r.push(`${HeA}'s watching you attentively from a bowl`);
				if (V.assistant.fsAppearance === "hedonistic decadence") {
					r.push(`overflowing`);
				} else {
					r.push(`filled`);
				}
				r.push(`with ${hisA} body. When ${heA} sees your glance, ${heA} reforms ${himselfA} and awaits your response.`);
			}
			break;
		case "angel":
			r.push(`${HeA}'s a gorgeous little ${assistantRace()} angel with long radiant hair and large`);
			if (FutureSocieties.isActive('FSDegradationist')) {
				r.push(`black`);
			} else {
				r.push(`white`);
			}
			r.push(`wings as large as ${himA} when they are folded.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA} wears a simple white linen dress that, while concealing, shows off ${hisA} pleasant curves.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is locking lips with ${himA}. The slave must be down in the kitchen, getting a meal out of the food dispensers. The angel notices you watching, blushes deeply and covers ${himselfA} and the slave with a wing.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is laid across ${hisA} lap, ${hisU} rear red from a recent spanking. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The angel notices you watching, nods, and resumes spanking, ignoring the slave's distress.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`${HeA} has a visible representation of one of your slaves laid across ${hisA} lap, a vibrator partially inserted into ${himU}, which the slave is obviously enjoying. The slave must be using one of the penthouse's many vibrators. ${HeA} notices you watching and blushes deeply before returning to pleasuring the slave.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying with ${hisU} head in ${hisA} lap. The angel is embracing ${himU} gently and silently; the slave must be getting a checkup. ${HeA} looks up at you with a smile; the slave must be doing well.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s standing next to a representation of one of your security drones, gently caressing it. When ${heA} sees you looking at ${himA}, ${heA} blushes and says, "I like this one. He did very well during the invasion. He saved so many."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s watching a recognizable little representation of one of your slaves masturbating, with one hand to cover ${hisA} eyes and the other to hold a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's own angelic avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're deep in prayer for your benefit and the safety of you, your arcology and your slaves.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is happily brushing the market assistant while humming happily. Upon noticing you watching, ${heA} hastily sneaks a hand down the assistant's dress and pinches a nipple, eliciting a squeak from the ${girlM}.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} is naked and kissing ${hisA} equally bare ${sisterM}. You watch silently as they grind their bodies against each other until one notices your gaze. They both shriek, cover themselves with their wings and hustle out of sight.`);
				} else {
					r.push(`They're making out in a surprisingly girlish way, deeply kissing each other and pressing their chests together. They blush when they see you watching them, each quickly covering the other with a wing.`);
				}
			} else {
				r.push(`${HeA}'s deep in prayer. ${HeA} glances up to check on you and sees you looking at ${himA}, and flashes you a look of serenity.`);
			}
			break;
		case "cherub":
			r.push(`${HeA}'s a cute little ${assistantRace()} minor angel with radiant hair and arm length`);
			if (FutureSocieties.isActive('FSDegradationist')) {
				r.push(`black`);
			} else {
				r.push(`white`);
			}
			r.push(`wings.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA} wears a simple white linen dress with a short skirt that frequently lets you catch glimpses of ${hisA} panties.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`A recognizable little representation of one of your slaves is eating ${himA} out as ${heA} flutters in front of them. The slave must be down in the kitchen, getting a meal out of the food dispensers. The cherub notices you watching and shoots you a thumbs up.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, ass in the air, as ${heA} eagerly fists ${hisU} rear. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The cherub notices you watching and tosses you a thumbs up with ${hisA} free hand.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, ass in the air, as ${heA} eagerly fucks ${himU} with a strap-on, which the slave is obviously enjoying. The slave must be using one of the penthouse's many vibrators. ${HeA} notices you watching, tosses up a thumbs up at you and intensifies ${hisA} thrusting.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying before ${himA}. The cherub is hovering in front of ${hisU} chest, head to ${hisU} breast, listening to ${hisU} heartbeat; the slave must be getting a checkup. ${HeA} beams you a smile; the slave must be doing well.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s fluttering around in circles with a representation of one of your security drones, steadily chasing it. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "I like this one. He did very well during the invasion."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s watching a recognizable little representation of one of your slaves masturbating, while holding a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's slightly taller avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're quickly darting around, playing tag; every touch transferring a bit of data between the players.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} is lazily reclining while the market assistant fans ${himA} with a large feather. ${HeA} snaps ${hisA} fingers as the taller cherub sighs and lowers ${hisM} head between ${V.assistant.name}'s legs.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} and ${hisA} ${sisterM} are struggling to stay airborne as they lustfully trib each other. When they notice you watching, and after they both climax, they pull each other close for a deep kiss only to manage to crash to the ground. They right themselves, laughing, before returning to their makeout session.`);
				} else {
					r.push(`They're leaning against each other while looking over a list of your slaves. They choose a pair to work on hooking up before turning to kiss each other deeply.`);
				}
			} else {
				r.push(`${HeA}'s fluttering to and fro humming to ${himselfA}. You swear ${heA} keeps flashing ${hisA} panties to you on purpose.`);
			}
			break;
		case "imp":
			r.push(`${HeA}'s a cute little ${assistantRace()} imp with black hair and comically tiny bat-like wings.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA} wears only a belt, tightly bound, over ${hisA} tiny breasts and a simple loincloth over ${hisA} crotch, leaving most of ${hisA} body in plain, but arousing, sight.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`${HeA} is steadily forcing a dildo the size of your arm down a recognizable little representation of one of your slaves' throat. The slave must be down in the kitchen, getting a meal out of the food dispensers. The imp notices you watching, points to the obscene bulge in the slave's throat and laughs maniacally.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, ass in the air, as ${heA} enthusiastically winds an anal pear. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The imp notices you watching and laughs as ${heA} gapes the slave's asshole further, enjoying ${hisU} obvious discomfort.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, perched atop a wooden horse with sexual fluids running down its sides. The slave must be using one of the penthouse's many sex toys. Noticing you watching, the imp flies above ${himU} and roughly forces ${himU} down, eliciting a scream of surprise from the horny slave. ${HeA} likely upped the output on whatever toy the slave was using.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying on ${hisU} side before ${himA}, belly painfully distended. The imp is hovering over ${himU} holding an enema bag; the slave must be getting a checkup. ${HeA} notices your gaze and squeezes the bag, forcing a burst of liquid into the slave's gut and drawing a moan of discomfort out of the ${girlU}.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s flapping around in circles chasing a representation of one of your security drones with a mallet. When ${heA} sees you looking at ${himA}, ${heA} quickly hides the hammer behind ${hisA} back, giggles and says, "He let some get away and needed to be punished!"`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s hovering over a recognizable little representation of one of your slaves masturbating while holding a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is clearly turning the feed of it into a PoV porno.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's slightly taller avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're tormenting a little representation of one of your slaves while giggling to each other. A closer inspection reveals they are playing with the door locks to confound a new menial.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} has ${hisA} plaything tightly bound to a rack and is gleefully pouring hot wax onto the oddly silent market assistant. You see why when a drop lands on ${hisM} sensitive clit, eliciting a scream from the restrained imp; ${V.assistant.name} pulls ${hisM} restraints even tighter as punishment.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} and ${hisA} ${sisterM} are struggling to stay airborne as they attempt to push an oversized, double-ended dildo out of their own cunt and into the other's. When they notice you watching, ${V.assistant.name} seizes the opportunity to bear down hard, forcing the entirety of the toy into the distracted market assistant. ${HeM} crashes to the ground, hands upon ${hisM} cock-bulged middle, orgasming indecently.`);
				} else {
					r.push(`They're taking swings at each other with switches, giggling with each swing and moaning with every successful strike.`);
				}
			} else {
				r.push(`${HeA}'s inspecting ${hisA} arsenal of toys and punishment tools. When ${heA} notices you watching, ${heA} grabs ${hisA} favorite and eagerly makes use of it on ${himselfA}.`);
			}
			break;
		case "witch":
			r.push(`${HeA}'s a cute little ${assistantRace()} witch with thin, flowing robes and a wide brimmed, if rather stereotypical, witch's hat.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(`${HeA} appears to have just attempted a new and unfamiliar spell from ${hisA} tome.`);
				r.push(FSfunc());
			} else {
				r.push(`${HeA} frequently carries a tome of new and erotic spells.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`${HeA} is steadily conjuring cake slices out of thin air and sending them down a recognizable little representation of one of your slaves' throat as ${hisU} belly swells. The slave must be down in the kitchen, getting a meal out of the food dispensers. The witch notices you watching, creates a whole cake, and sends it on its way, causing the slave's gut to double in size.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, writhing in pleasure, as a summoned tentacle explores ${hisU} anus. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. The witch notices you watching and pats ${hisA} own squirming belly, causing the tentacle to seek shelter deeper in the slave.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is squatting atop a magic circle before ${himA}, a dildo pistoning in and out of ${himU}. The slave must be using one of the penthouse's many sex toys. Noticing you watching, the witch snaps ${hisA} fingers, causing the toy to blow a load deep inside the slave. A load moan echoes down the halls of your penthouse; someone must be having a good time.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is lying before ${himA} as ${heA} runs ${hisA} wand over ${hisU} body. The slave must be getting a checkup. ${HeA} notices your gaze and taps the wand to the slave's breasts, causing them to jump up a cup size.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s riding a broom alongside a representation of one of your security drones as it carries out its patrol route through your arcology. When ${heA} sees you looking at ${himA}, ${heA} giggles and says, "I like this one. He did very well during the invasion."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`A hovering camera is aimed at a recognizable little representation of one of your slaves masturbating. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is likely invisible holding the camera, turning the feed of it into a PoV porno.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's chubby, bespectacled avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`They're sitting back to back, reading their books and giggling to each other over whispers of what erotic tricks they can do.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`${V.assistant.name} has ${hisA} test subject stripped and bound. ${HeA} focuses a spell on a single of the ${girlM}'s breasts and records the results as it steadily begins swelling, leaving its twin behind. The market assistant moans as an egg pushes its way out of ${hisM} erect nipple.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`${V.assistant.name} is lustfully groping ${hisA} ${sisterM}'s plush breasts. Upon noticing your gaze, ${heA} channels ${hisA} magic and`);
					if (V.seeDicks !== 0) {
						r.push(`sprouts a huge dick straight into ${hisA} ${sisterM}'s plump rear.`);
					} else {
						r.push(`begins to enlarge the already lovely handfuls.`);
					}
					r.push(`The market assistant can only finger ${himselfM} in response, oblivious to everything going on.`);
				} else {
					r.push(`They've pulled open each other's robes and are gently tribbing. Upon noticing you, ${V.assistant.name} casts a spell to triple the market assistant's sensitivity and braces for the impending orgasm. ${HeM} cums so hard ${heM} passes out; ${V.assistant.name} gently pulls ${himM} into a close embrace until ${heM} recovers.`);
				}
			} else {
				r.push(`${HeA}'s idly turning the pages of ${hisA} spell book. When ${heA} notices you watching, ${heA} flips the book around to show you a new and kinky trick ${heA} wants to try out.`);
			}
			break;
		case "ERROR_1606_APPEARANCE_FILE_CORRUPT":
			r.push(`${HeA}'s an odd little ${girlA}, with slightly off mannerisms,`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`wearing absolutely nothing. ${HeA} periodically twitches when you aren't looking and you swear you see movement under ${hisA} skin.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`${HeA} is steadily thrusting several tentacles extending from ${hisA} crotch down the throat of a recognizable little representation of one of your slaves. The slave must be down in the kitchen, getting a meal out of the food dispensers. ${HeA} notices you watching and moans as multiple bulges work their way down ${hisA} shafts and into the slave. Your eyes are drawn to the hapless ${girlU}'s rapidly swelling stomach as the creature's seed takes root.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`A recognizable little representation of one of your slaves is before ${himA}, writhing in pleasure and pain, as multiple tentacles fuck ${hisU} ass. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. ${HeA} notices you watching and moans as multiple bulges work their way down ${hisA} shafts and into the slave. Your eyes are drawn to the hapless ${girlU}'s rapidly swelling stomach as the creature's seed takes root.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is lying on ${hisU} back, writhing in pleasure and pain, as multiple tentacles fuck ${himU}. The slave must be using one of the penthouse's many sex toys. ${HeA} notices you watching and moans as multiple bulges work their way down ${hisA} shafts and into the slave. Your eyes are drawn to the hapless ${girlU}'s rapidly swelling stomach as the creature's seed takes root. A loud moan echoes through the penthouse; it seems the slave got a little surprise ${himselfU}.`);
			} else if (paSeed === 4) {
				r.push(`A recognizable little representation of one of your slaves is partially merged with ${hisA} body. The slave must be getting a checkup. ${HeA} notices your gaze and forces ${hisA} way more into the slave, causing the breast, butt and thighs on ${hisA} side of the body to swell disproportionately.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s partially enveloped a representation of one of your security drones. When ${heA} sees you looking at ${himA}, ${heA} bluntly states, "This one did good. Captured many for your nest."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA} is holding dozens of cameras at a recognizable little representation of one of your slaves masturbating. The slave must be using one of the penthouse's many vibrators, and ${V.assistant.name} is likely turning the feed of it into a porno.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's fecund avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`The market assistant is tightly wrapped in a bodysuit made of ${V.assistant.name}, save for ${hisM} exposed, very pregnant, belly. ${HisA} head briefly appears over the ${girlM}'s face and eyes you, while the market assistant giggles at the sensations covering ${hisM} body.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`The market assistant has been reduced to nothing more than a bloated incubator. ${V.assistant.name} runs ${hisA} tendrils across ${hisA} breeder's swollen body, fondling ${hisM} squirming, offspring-filled breasts and massaging ${hisM} octuplet-sized, bulging pregnancy. The hapless ${girlM} twitches slightly as several more wormlike creatures slip from ${hisM} body, prompting ${V.assistant.name} to drive ${hisA} tentacles into all ${hisM} holes and vigorously pump ${himM} full of even more aphrodisiacs and eggs.`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`The market assistant's arms and legs are sunken into a wall of ${V.assistant.name}'s flesh; ${hisM} immense stomach and breasts allowed to hang free. One of ${hisM} breasts visibly shifts as another wormlike larva pushes its way out of ${hisM} nipple, waking the addled ${girlM} from ${hisM} stupor. ${HeM} moans lustfully, ${hisM} mind thoroughly warped by ${V.assistant.name}'s aphrodisiacs, "${SisterA}! I need more...I feel sho empty! Fill me up till I bursht!" ${V.assistant.name} wastes no time in snaking into ${hisM} gaping holes and pumping ${himM} so full ${hisM} belly touches the floor and breasts heave massively.`);
				} else {
					r.push(`They're sitting side by side, the market assistant resting an arm atop ${hisM} huge, larvae-filled belly while clutching a newborn to ${hisM} breast. ${V.assistant.name} embraces ${hisA} pregnant lover with several tentacles before drawing one to the ${girlM}'s lips. ${HeM} delicately kisses it before wrapping ${hisM} lips around it and pleasuring ${hisM} mate.`);
				}
			} else {
				r.push(`${HeA}'s idly standing there, at least when you look at ${himA}; you catch strange things in the corner of your vision while you are working.`);
			}
			break;
		case "incubus":
			r.push(`${HeA}'s a handsome little sex demon with a big dick and heavy balls.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA} enjoys wearing absolutely nothing but an enormous hard-on. ${HeA} frequently, and openly, masturbates to your naked body.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`${HeA} has a recognizable little representation of one of your slaves with ${hisU} lips around the base of ${hisA} dick and a huge bulge down ${hisU} throat. The slave must be down in the kitchen, getting a meal out of the food dispensers. ${HeA} notices you watching and energetically renews deepthroating the slave. ${HeA} moans lewdly as ${heA} blows ${hisA} load in the slave's mouth, forcing cum to spray out the slave's nose and around ${hisA} cock. ${HeA} sighs with disappointment at the mess the slave has made.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`${HeA} is happily assfucking a recognizable little representation of one of your slaves. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. ${HeA} notices you watching, increases ${hisA} pace, and cums deep in the slave's rear, slightly rounding ${hisU} belly with cum.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is riding ${hisA} erect cock. The slave must be using one of the penthouse's many sex toys. ${HeA} notices you watching and winks at you, before promising not to suck too much life from ${hisA} enthusiastic partner.`);
			} else if (paSeed === 4) {
				r.push(`${HeA} has ${hisA} cock forced deep into a recognizable little representation of one of your slaves. The slave must be getting a checkup. ${HeA} notices your gaze, and states "What? I can feel ${hisU} heartbeat clearly like this."`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s intently staring down a representation of one of your security drones. When ${heA} sees you looking at ${himA}, ${heA} coyly says, "I like this one. ${HeA} did very well during the invasion and I wanted to reward ${himA}, but I can't find a hole..."`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA} has a camera strapped to ${hisA} cock and is recording a recognizable little representation of one of your slaves sucking it. The slave must be playing with one of the penthouse's many dildos, and ${V.assistant.name} is likely turning the feed of it into a PoV porno.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's still inexperienced avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`The market assistant has cleaned up nicely since the last time you saw ${himM}. ${HeM} does a little twirl to show off ${hisM} new look before squeaking in shock as a burst of cum splashes across ${hisM} face. ${HeM} pouts at ${V.assistant.name}, who is eagerly prepping a second load to fire at ${himM}.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`The market assistant is being violently penetrated by ${V.assistant.name}, ${hisM} bloated belly swaying in tune to ${hisA} thrusts. The hapless ${girlM} struggles in discomfort as the incubus blows another load into ${hisM} already full womb, causing cum to backflow out of ${hisM} now loose pussy. ${V.assistant.name} leans back, motions to you, and asks, "Plenty of holes still to go around, if you want one!"`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`The market assistant is eagerly riding ${hisM} big ${sisterA}, ${V.assistant.name}'s, dick. You can't help but notice how full ${hisM} breasts have gotten and how plump ${hisM} ass and thighs now are. ${HeM} moans with lust as ${V.assistant.name} cums into ${hisM} fertile pussy; a glowing sigil appearing below ${hisM} navel. ${HeM} is well on ${hisM} way to becoming the succubus consort of ${hisM} once-human ${sisterA}.`);
				} else {
					r.push(`The market assistant is embracing ${V.assistant.name} as ${heM} is lovingly penetrated by the caring incubus. They pull each other close as they cum together, locking lips and refusing to let go until the other is completely satisfied. It takes quite some before they settle down and wave to you, thanking you deeply for the true love you've gifted them.`);
				}
			} else {
				switch (V.assistant.fsAppearance) {
					case "paternalist":
						r.push(`${HeA} has ${hisA} pants unfastened and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "degradationist":
						r.push(`${HeA}'s fed a number of beads down ${hisA} urethra and is struggling to hold back ${hisA} orgasm. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to yank out the beads and give ${himA} release.`);
						break;
					case "roman revivalist":
						r.push(`${HeA} has ${hisA} toga undone and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "neoimperialist":
						r.push(`${HeA}'s stripped off his bodysuit and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "egyptian revivalist":
					case "aztec revivalist":
						r.push(`${HeA} is absentmindedly jerking off, ${hisA} loincloth pushed aside to make room. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "edo revivalist":
					case "chinese revivalist":
						r.push(`${HeA} has undone ${hisA} clothing and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "arabian revivalist":
						r.push(`${HeA} has ${hisA} pants pulled off and is absentmindedly using them to jerk off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "antebellum revivalist":
					case "chattel religionist":
						r.push(`${HeA} is gingerly massaging ${hisA} swollen balls. When ${heA} notices you watching, ${heA} struggles to sit up and implores you to pull out the stopper and bathe in ${hisA} blessing.`);
						break;
					case "physical idealist":
						r.push(`${HeA}'s vigorously jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "hedonistic decadence":
						r.push(`${HeA}'s lazily jerking off. When ${heA} notices you watching, ${heA} waves a plate of cake at you, imploring you to have a bite.`);
						break;
					case "repopulation focus":
						r.push(`${HeA}'s leaning back with both hands beneath ${hisA} swollen middle struggling to jack off. When ${heA} notices you watching, ${heA} sits up and sighs as ${hisA} belly pushes ${hisA} erection out of sight.`);
						break;
					case "eugenics":
						r.push(`${HeA}'s reclining while absentmindedly jacking off. When ${heA} notices you watching,`);
						if (V.PC.vagina !== -1) {
							r.push(`sits back, making plenty of room for you to spear yourself on ${hisA} erection.`);
						} else {
							r.push(`${HeA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						}
						break;
					case "gender radicalist":
						if (V.arcologies[0].FSGenderRadicalistLawFuta === 1) {
							r.push(`${HeA}'s reclining while absentmindedly jacking off with one hand and playing with ${hisA} hidden pussy with the other. When ${heA} notices you watching, ${heA} spreads ${hisA} legs wide so you can watch ${himA} spasm in orgasm.`);
						} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 2) {
							r.push(`${HeA}'s leaning back with both hands wrapped around ${hisA} huge cock, struggling to jack off. When ${heA} notices you watching, ${heA} invites you to lend a hand or two to help ${himA} out.`);
						} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
							r.push(`${HeA} is laying on ${hisA} stomach, ${hisA} ass and legs jiggling delightfully as ${heA} gives ${himselfA} a thighjob. When ${heA} notices you watching, ${heA} struggles to roll onto ${hisA} side and waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 4) {
							r.push(`${HeA}'s got ${hisA} hands down ${hisA} pants absentmindedly jerking off. When ${heA} notices you watching, ${heA} quickly stops, but it does little to hide the large wet spot forming on ${hisA} tented pants.`);
						} else {
							r.push(`${HeA}'s absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						}
						break;
					case "gender fundamentalist":
						r.push(`${HeA} has hiked up ${hisA} skirt and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} quickly covers ${himselfA}; though ${heA} can't hide the movements ${heA} makes under ${hisA} dress.`);
						break;
					case "asset expansionist":
						r.push(`${HeA} is lying on ${hisA} back, legs squeezing ${hisA} immense balls as ${heA} struggles to jack off ${hisA} monolithic dick. When ${heA} notices you watching, ${heA} struggles to sit up before giving up and inviting you to lend a hand in beating ${hisA} meat.`);
						break;
					case "transformation fetishist":
						r.push(`${HeA} has ${hisA} jeans unbuttoned and is absentmindedly trying to jerk off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, inviting you to lend a pair of hands.`);
						break;
					case "pastoralist":
						r.push(`${HeA} is lying on ${hisA} back, legs squeezing ${hisA} immense balls as ${heA} cums again and again across ${himselfA}. When ${heA} notices you watching, ${heA} struggles to sit up before giving into the sensations and blowing another load across your desk.`);
						break;
					case "maturity preferentialist":
						r.push(`${HeA} has a hand down ${hisA} pants. When ${heA} notices you watching, ${heA} begins eagerly stroking ${himselfA} while describing, in detail, what ${heA}'d love to do to you.`);
						break;
					case "youth preferentialist":
						r.push(`${HeA} has ${hisA}`);
						if (V.minimumSlaveAge === 3) {
							r.push(`shorts pulled down`);
						} else if (V.minimumSlaveAge <= 7) {
							r.push(`shorts unfastened`);
						} else {
							r.push(`pants unfastened`);
						}
						r.push(`and is absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "slimness enthusiast":
						r.push(`${HeA}'s absentmindedly using both hands to jerk off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
						break;
					case "intellectual dependency":
						r.push(`${HeA}'s absentmindedly jerking off. It isn't until after ${heA} has blown ${hisA} load that ${heA} notices you've been watching.`);
						break;
					case "slave professionalism":
						r.push(`${HeA} is patiently awaiting ${hisA} ${properMaster()}'s attention, and now that ${heA} has it, asks if you want what's in ${hisA} pants.`);
						break;
					case "petite admiration":
						r.push(`${HeA}'s absentmindedly giving ${himselfA} head. When ${heA} notices you watching, ${heA} pops ${hisA} cockhead out of ${hisA} mouth, imploring you to finish ${himA} off.`);
						break;
					case "statuesque glorification":
						r.push(`${HeA}'s absentmindedly jerking off. When ${heA} notices you watching, ${heA} gets to ${hisA} feet and waves ${hisA} throbbing erection in your face, imploring you to finish ${himA} off.`);
						break;
					default:
						r.push(`${HeA}'s absentmindedly jerking off. When ${heA} notices you watching, ${heA} waves ${hisA} throbbing erection at you, imploring you to finish ${himA} off.`);
				}
			}
			break;
		case "succubus":
			r.push(`${HeA}'s a beautiful little sex demoness with an ideal figure.`);
			if (V.assistant.fsOptions && V.assistant.fsAppearance !== "default") {
				r.push(FSfunc());
			} else {
				r.push(`${HeA} enjoys using a tight strip of leather to support ${hisA} ample bosom and a minuscule thong to cover ${hisA} crotch. ${HeA} commonly strikes sexy poses, ${hisA} spaded tail wrapping around ${hisA} legs seductively, hoping to catch ${hisA} ${properMaster()}'s eye.`);
			}
			if (V.cockFeeder === 1 && paSeed === 1) {
				r.push(`${HeA} has a recognizable little representation of one of your slave between ${hisA} legs and is moaning with lust as the slave eagerly eats ${himA} out. The slave must be down in the kitchen, getting a meal out of the food dispensers. When ${heA} notices you watching, ${heA} gives you a show by cumming hard across the slave's face.`);
			} else if (V.suppository === 1 && paSeed === 2) {
				r.push(`${HeA} is happily assfucking a recognizable little representation of one of your slaves with a strap-on. The slave must be receiving ${hisU} drugs from one of the dildo dispensers. Noticing you watching, ${heA} unwinds ${hisA} tail from around the slave and begins fucking ${hisA} own pussy with it.`);
			} else if (masturbationAllowed === 1 && paSeed === 3) {
				r.push(`A recognizable little representation of one of your slaves is sharing a double-ended dildo with ${himA}. The slave must be using one of the penthouse's many sex toys. ${HeA} notices you watching and blows you a kiss, before promising not to suck too much life from ${hisA} enthusiastic partner.`);
			} else if (paSeed === 4) {
				r.push(`${HeA} has ${hisA} body pressed up against a recognizable little representation of one of your slaves as ${heA} feels ${himU} up. The slave must be getting a checkup. ${HeA} notices your gaze and pinches the slave's erect nipples.`);
			} else if (paSeed === 5 && V.invasionVictory > 0) {
				r.push(`${HeA}'s intently staring down a representation of one of your security drones. When ${heA} sees you looking at ${himA}, ${heA} coyly says, "I like this one. He did very well during the invasion and I wanted to reward him, but I can't find a dick..." A small schematic pops on screen, detailing plans for a rather large penetrating attachment for your model of drone. "It vibrates!" ${HeA} teases.`);
			} else if (paSeed === 6 && V.studio === 1) {
				r.push(`${HeA}'s getting oral from a recognizable little representation of one of your slaves, and is using a handheld camera to film the action, gonzo style. The slave must be using one of the penthouse's many vibrators, and your personal assistant is clearly turning the feed of it into porn.`);
			} else if (paSeed === 7 && V.assistant.market) {
				r.push(`${HeA}'s accompanied by your market assistant's still inexperienced avatar.`);
				if (V.assistant.market.relationship === "cute") {
					r.push(`${V.assistant.name} has the market assistant's pants down and is eagerly sucking ${himM} off. ${HeM} tenses with orgasm and sighs with relief only for ${V.assistant.name} to deeply kiss ${himM} and force ${himM} to taste ${hisM} cum with ${himA}.`);
				} else if (V.assistant.market.relationship === "nonconsensual") {
					r.push(`The market assistant is being violently ridden by ${V.assistant.name}, ${hisA} fuller assets swaying in tune to ${hisA} movements. The hapless ${girlM} struggles pitifully as the succubus coaxes another load out of ${hisA} exhausted toy. ${V.assistant.name} leans back, strokes ${hisA} luscious body and says, "${HisM} energy is making me even more beautiful for you!"`);
				} else if (V.assistant.market.relationship === "incestuous") {
					r.push(`The market assistant is being ridden by ${hisM} enormously pregnant big ${sisterA}, ${V.assistant.name}. ${HeM}'s supporting ${hisA} taut belly as ${heA} uses ${hisA} hands to hold their twins to ${hisA} swollen breasts. You can't help but notice how full ${hisM} balls have become and thick ${hisM} shaft is. ${HeM} moans with lust as ${V.assistant.name} bucks with orgasm before painting ${hisA} womb with another coat of sperm. ${V.assistant.name} grunts slightly as ${hisM} dick grows larger inside ${himA} and ${hisM} balls swell for a second round. ${HeM} is well on ${hisM} way to becoming the incubus lover of ${hisM} once-human ${sisterA}.`);
				} else {
					r.push(`The market assistant is tenderly fucking ${V.assistant.name} in the missionary position. ${HeM} leans in as they cum together, locking lips and kissing ${hisM} lover deeply. Once they are both satisfied, they snuggle up for a post coitus rest and thank you deeply for the true love you've gifted them.`);
				}
			} else {
				switch (V.assistant.fsAppearance) {
					case "paternalist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and leans forward, giving you a tantalizing view of ${hisA} cleavage.`);
						break;
					case "degradationist":
						r.push(`${HeA}'s absentmindedly playing with ${hisA} nipple rings. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} curves to ${hisA} crotch, where ${heA} traces the piercings dangling from ${hisA} labia.`);
						break;
					case "supremacist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} curves, tempting you with ${hisA} pure ${V.arcologies[0].FSSupremacistRace} body.`);
						break;
					case "subjugationist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} curves, while coming onto you like a needy ${V.arcologies[0].FSSubjugationistRace} slut.`);
						break;
					case "chattel religionist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} sides and to ${hisA} pussy while moaning seductively.`);
						break;
					case "physical idealist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and flexes ${hisA} muscles in some of the most seductive ways imaginable${(V.arcologies[0].FSPhysicalIdealistStrongFat === 1) ? `, ${hisA} layer of flab jiggling along to ${hisA} motions` : ``}.`);
						break;
					case "hedonistic decadence":
						r.push(`${HeA}'s absentmindedly groping ${hisA} fat tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and lewdly gropes ${hisA} soft body.`);
						if (V.arcologies[0].FSHedonisticDecadenceStrongFat === 1) {
							r.push(`You catch the occasional glimpse of ${hisA} hidden muscles while ${heA} effortlessly manhandles ${hisA} heavy figure.`);
						}
						break;
					case "repopulation focus":
						r.push(`${HeA}'s absentmindedly sucking a tit. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} curves and across ${hisA} pregnancy, where ${heA} traces ${hisA} popped navel. A flurry of kicks bulge ${hisA} belly as it grows slightly larger. ${HeA} sighs and pats ${hisA} added mass.`);
						break;
					case "eugenics":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and spreads ${hisA} legs, inviting you to enjoy ${hisA} perfect pussy.`);
						break;
					case "gender radicalist":
						if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
							r.push(`${HeA}'s absentmindedly fondling ${hisA} asscheeks. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and spins around, splitting ${hisA} pants and revealing ${hisA} enticing butthole.`);
						} else {
							r.push(`${HeA}'s absentmindedly playing with ${hisA} hair. When ${heA} notices you eyeing ${himA}, ${heA} leaps to ${hisA} feet and invites you to chance what resides between ${hisA} legs.`);
						}
						break;
					case "gender fundamentalist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} motherly curves while moaning seductively.`);
						break;
					case "asset expansionist":
						r.push(`${HeA}'s absentmindedly massaging ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and proceeds to trace the length of ${hisA} breasts to ${hisA} nipple; ${heA} never reaches them, as ${hisA} breasts steadily outpace ${himA} as ${heA} reaches outwards.`);
						break;
					case "transformation fetishist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} ass. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and flexes causing ${hisA} tits to pop out of ${hisA} overly short top. Giggling, ${heA} puckers ${hisA} huge, fake lips and blows you a kiss.`);
						break;
					case "pastoralist":
						r.push(`${HeA}'s absentmindedly milking a pair of ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and leaps to ${hisA} feet, causing ${hisA} quartet of milk bags to spring loose from ${hisA} tops. ${HeA} giggles as ${heA} gestures the many ways you could titfuck ${himA}.`);
						break;
					case "maturity preferentialist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and makes a motion you can only begin to fathom the meaning of.`);
						break;
					case "youth preferentialist":
						if (V.minimumSlaveAge === 3) {
							r.push(`${HeA} has ${hisA} hands down ${hisA} dress and is happily fondling ${himselfA}. When ${heA} notices you eyeing ${himA}, ${heA} quickly hides ${hisA} hands behind ${hisA} back and plays innocent.`);
						} else if (V.minimumSlaveAge <= 7) {
							r.push(`${HeA} has both hands up ${hisA} top and is happily playing with ${hisA} nipples. When ${heA} notices you eyeing ${himA}, ${heA} quickly yanks ${hisA} tube top off and lewdly waves ${hisA} flat chest at you.`);
						} else if (V.minimumSlaveAge <= 13) {
							r.push(`${HeA} has both hands down ${hisA} shorts and is eagerly playing with ${hisA} pussy. When ${heA} notices you eyeing ${himA}, ${heA} quickly pulls ${hisA} bottoms down and spreads ${hisA} legs, desperate for you to relieve ${himA} of this new feeling.`);
						} else {
							r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} new curves while moaning seductively.`);
						}
						break;
					case "slimness enthusiast":
						if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
							r.push(`${HeA}'s absentmindedly pinching ${hisA} nipples. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands across ${hisA} flat chest while moaning seductively.`);
						} else {
							r.push(`${HeA}'s absentmindedly groping ${hisA} small tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} lithe body while moaning seductively.`);
						}
						break;
					case "body purist":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} perfect curves while moaning seductively.`);
						break;
					case "intellectual dependency":
						r.push(`${HeA}'s absentmindedly fingering ${himselfA}. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and climaxes with a wet gush before spreading ${hisA} legs for round two.`);
						break;
					case "slave professionalism":
						r.push(`${HeA} is patiently awaiting ${hisA} ${properMaster()}'s attention, and now that ${heA} has it, curtsies and asks what pleasure you desire.`);
						break;
					case "petite admiration":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and lifts ${hisA} arms, begging to be picked up.`);
						break;
					case "statuesque glorification":
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down the length of ${hisA} legs while giving you a lovely view of ${hisA} holes.`);
						break;
					default:
						r.push(`${HeA}'s absentmindedly groping ${hisA} tits. When ${heA} notices you eyeing ${himA}, ${heA} smiles coyly and runs ${hisA} hands down ${hisA} curves while moaning seductively.`);
				}
			}
			break;
		default:
			r.push(`${HeA}'s a little abstract symbol; when ${heA} speaks, the symbol glows slightly.`);
	}

	return r.join(" ");
	// TODO: write all of the descriptions for assistant appearance
	function FSfunc() {
		/** @type {appearance} */
		const fsAppearance = {
			"normal": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
			"monstergirl": {
				"default": ``,
				paternalist: `${HeA}'s wearing a surprisingly conservative outfit: khakis, a sweater, and eyeglasses.`,
				degradationist: `${HeA}'s sharpened ${hisA} appearance to be quite frightening: ${HeA} has impressive fangs, and a snakelike tongue flicks out between them.`,
				supremacist: `${HisA} distinct ${V.arcologies[0].FSSupremacistRace} features are only enhanced by ${hisA} monstrous appearance, and ${heA} has taken to jump-scaring slaves of lesser races when ${heA} isn't too busy with other tasks.`,
				subjugationist: `${HisA} distinct ${V.arcologies[0].FSSubjugationistRace} features are further exaggerated by ${hisA} monstrous appearance.`,
				"roman revivalist": `${HeA}'s wearing a conservative stola, which combined with ${hisA} monstrous appearance makes ${himA} look like a Greek demigoddess.`,
				"neoimperialist": `${HeA}'s wearing a set of high-tech battle armor, which combined with ${hisA} monstrous appearance makes ${himA} look like some kind of demonic Pagan emperor.`,
				"aztec revivalist": `${HeA}'s wearing a traditional huipil, a long cape and a headdress, which amplify ${hisA} monstrous visage.`,
				"egyptian revivalist": `${HeA}'s wearing golden jewelry and a Pharaoh's beard, which combined with ${hisA} animal characteristics makes ${himA} look like an Egyptian deity.`,
				"edo revivalist": `${HeA}'s given ${hisA} appearance a Japanese style, making ${himA} look like a demon.`,
				"arabian revivalist": `${HeA}'s given ${hisA} appearance a mystical Arabian style, making ${himA} look like a djinn.`,
				"chinese revivalist": `${HeA}'s given ${hisA} appearance a Chinese style, making ${himA} look like a demon.`,
				"antebellum revivalist": `${HeA} head has been replaced with the skull of a deer adorned with heavy antlers. An eerie red glow emits from the shadowed eye sockets. Underneath the patchwork of scarred skin and black, bristly fur, the unmistakable curve of large, teardrop-shaped breasts and wide hips is discernible.`,
				"chattel religionist": `${HeA}'s wearing the garb of a priestess of the new faith, which clashes amusingly with ${hisA} demonic appearance.`,
				"repopulation focus": `${HeA}'s very pregnant; ${hisA} belly is covered in large bulges revealing the eggs growing within ${himA}.`,
				eugenics: `${HeA}'s wearing a complex chastity device, keeping ${hisA} dicks and cunt unusable.`,
				"physical idealist": `${HeA}'s quite muscular, and behaves with total confidence.`,
				"hedonistic decadence": `${HeA}'s quite heavyset, and prefers to laze about eating and masturbating.`,
				"gender radicalist": `${HeA}'s accentuated ${hisA} androgyny, with ${hisA} tits and ${hisA} cocks ${hisA} only obvious gendered traits.`,
				"gender fundamentalist": `${HeA}'s made ${himselfA} as cute as a demonic little creature with cocks and tentacle hair can possibly be.`,
				"asset expansionist": `${HeA}'s increased the size of ${hisA} assets recently: ${hisA} cocks are so large that ${heA} can give them a blowjob, and ${hisA} boobs are so big ${heA} can give ${himselfA} a titjob at the same time.`,
				"transformation fetishist": `${HeA}'s made ${himselfA} even stranger recently: ${hisA} nipples look suspiciously like dicks, and ${heA} has horns growing out of ${hisA} feet to form high heels.`,
				pastoralist: `${HeA}'s lactating, though ${hisA} product is a suspiciously semen-like substance ${heA} usually drinks ${himselfA}.`,
				"maturity preferentialist": `${HeA}'s quite mature: ${HeA} wears a haughty expression, and ${hisA} cheekbones are like knifeblades.`,
				"youth preferentialist": `${HeA}'s surprisingly young: ${hisA} tentacle hair is quite short, and ${hisA} horns are still little nubs.`,
				"slimness enthusiast": `${HeA}'s recently altered ${hisA} appearance to be slimmer and more athletic.`,
				"body purist": `${HeA}'s recently improved ${hisA} appearance to complete flawlessness, with milky white skin and buffed horns.`,
				"intellectual dependency": `${HeA} has a short attention span, but it's easy to tell what ${heA}'s thinking by the direction of ${hisA} erection.`,
				"slave professionalism": `${HeA}'s quite elegant: every movement has poise and purpose.`,
				"petite admiration": `${HeA}'s adorably short, but no less fearsome.`,
				"statuesque glorification": `${HeA}'s extremely tall, and behaves quite predatory.`,
			},
			"shemale": {
				"default": ``,
				paternalist: `${HeA}'s made ${himselfA} up to look a bit classier recently: ${HeA} has elegant fake nails, and has ${hisA} hair piled up on ${hisA} head.`,
				degradationist: `${HeA}'s made ${himselfA} up to look almost comically evil: ${HeA}'s wearing black lipstick, black eyeliner, and a black barbed cockring.`,
				supremacist: `${HeA} remains nude in order to properly display the glory of a superior ${V.arcologies[0].FSSupremacistRace} cock.`,
				subjugationist: `Like most ${V.arcologies[0].FSSubjugationistRace} subhumans ${heA} has no self-control, and is constantly playing with ${hisA} erect cock and whimpering in needy arousal.`,
				"roman revivalist": `${HeA}'s taken to reclining on a traditional Roman couch and drinking wine out of a shallow dish.`,
				"neoimperialist": `${HeA}'s wearing an extremely tight-fitting bodysuit that emphasizes the bulge of ${hisA} heavy balls and the swell of ${hisA} asscheeks against the skintight nanoweave.`,
				"aztec revivalist": `${HeA}'s wearing a headdress and a loincloth, which can't hide ${hisA} enviable package.`,
				"egyptian revivalist": `${HeA}'s wearing an Egyptian melting perfume cake on ${hisA} head.`,
				"edo revivalist": `${HeA}'s wearing a brief Japanese bathhouse robe.`,
				"arabian revivalist": `${HeA}'s dressed ${himselfA} like an oil millionaire, with aviator sunglasses and a headscarf.`,
				"chinese revivalist": `${HeA}'s added various tattoos of rude Chinese characters to ${hisA} body recently.`,
				"antebellum revivalist": `${HeA}'s wearing fine Antebellum aristocratic clothing.`,
				"chattel religionist": `${HeA}'s wearing the garb of a priestess of the new faith, which frames ${hisA} cock prominently.`,
				"repopulation focus": `${HeA} is incredibly pregnant, ${hisA} belly preventing ${himA} from playing with ${himselfA} effectively.`,
				eugenics: `${HisA} sizable dick is restrained in a complicated chastity device.`,
				"physical idealist": `${HeA}'s extremely muscular: ${HeA} shines with body oil, and ${hisA} abs have abs.`,
				"hedonistic decadence": `${HeA}'s extremely fat; when ${heA} isn't idly playing with ${himselfA}, ${heA} is pigging out on snacks.`,
				"gender radicalist": `${HeA}'s rendered ${hisA} cock in even more loving detail recently, adding a couple of veins and a bead of precum.`,
				"gender fundamentalist": `${HeA}'s taken to concealing ${hisA} dick recently, and cheekily turns away from you to hide it as much as possible.`,
				"asset expansionist": `${HeA}'s increased the size of ${hisA} assets recently: ${HeA}'s increased the girth of ${hisA} dick until it's as thick as one of ${hisA} arms, and ${hisA} boobs are the size of beach balls.`,
				"transformation fetishist": `${HisA} tits, ass and lips are carefully rendered to make them look fake.`,
				pastoralist: `${HeA}'s lactating, and ${hisA} orgasms produce comically powerful jets of cum.`,
				"maturity preferentialist": `${HeA}'s quite mature, with a lean face that accentuates ${hisA} cheekbones.`,
				"youth preferentialist": `${HeA}'s surprisingly young, and looks as innocent as a computer generated image of a ${girlA} with a pornstar dick possibly can.`,
				"slimness enthusiast": `${HeA}'s recently altered ${hisA} appearance to be slimmer and more athletic.`,
				"body purist": `${HeA}'s recently improved ${hisA} appearance to look more natural, with prettier boobs and softer hips.`,
				"intellectual dependency": `${HeA}'s taken to frequently sucking ${himselfA} off and displays a clear oral fixation.`,
				"slave professionalism": `${HeA}'s wearing a refined suit that reveals just the right amount of cleavage and tastefully caresses ${hisA} third leg.`,
				"petite admiration": `${HeA}'s recently adjusted ${hisA} height to be quite short: ${HeA} finds having an erection easier than dragging ${hisA} cock along the ground.`,
				"statuesque glorification": `${HeA}'s recently adjusted ${hisA} height to be quite tall, complete with a longer penis.`,
			},
			"amazon": {
				"default": ``,
				paternalist: `with long flowing hair, tribal tattoos, shredded abs, and bone jewelry. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`,
				degradationist: `with ochre-dyed dreadlocks, war tattoos, shredded abs, and jewelry made from human bones. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`,
				supremacist: `wearing armor that blends elements from elite warriors of several historically ${V.arcologies[0].FSSupremacistRace} cultures, evoking the glory of ages past.`,
				subjugationist: `with wild unkempt hair, dressed in ragged animal skins and crude bone jewelry.`,
				"roman revivalist": `wearing the armor of a Roman auxilia, complete with lorica hamata and oval shield painted with your arcology's symbols.`,
				"neoimperialist": `wearing a full set of advanced, powered battle armor, painted in your colors and with the crest of your family displayed prominently over a massive holographic tower shield.`,
				"aztec revivalist": `wearing the battledress of the greatest warriors, ${heA} stands incredibly imposing, holding a spear and shield.`,
				"egyptian revivalist": `wearing a simple white linen dress, kohl eyeshadow, and sandals, making ${himA} look like a barbarian immigrant to the land of the Nile.`,
				"edo revivalist": `wearing a Japanese warrior's robe with a pair of swords tucked into its sash.`,
				"arabian revivalist": `with a bare chest, loose pantaloons, and a broad silk sash wound around ${hisA} waist with a scimitar thrust into it.`,
				"chinese revivalist": `wearing loose silk robes belted with rope and carrying a simple warrior monk's staff.`,
				"antebellum revivalist": `wearing an unbuttoned Confederate army coat, exposing a loose, low-cut blouse. ${HeA} has an old-fashioned revolver holstered on one hip and a cavalry saber sheathed on the other. ${HeA} confidently pushes out ${hisA} chest, giving you a nice view down ${hisA} shirt.`,
				"chattel religionist": V.arcologies[0].FSChattelReligionistLaw2 === 1 ? `with your religion's holy symbol painted on ${hisA} nude body. ${HisA} long blonde hair cascades down ${hisA} back in golden glory.` : `wearing a crusader's mail. ${HisA} long blonde hair cascades down the back of ${hisA} surcoat in golden glory.`,
				"repopulation focus": `with an enormous belly. Its oversized occupant kicks and squirms ferociously, eager to be born.`,
				eugenics: `with a complex bone chastity belt blocking ${hisA} vagina.`,
				"physical idealist": `whose muscles are lovingly rendered in lifelike detail.`,
				"hedonistic decadence": `with a thick layer of fat covering ${hisA} muscled body. ${HeA} typically carries a half-eaten roast pig over ${hisA} shoulder.`,
				"gender radicalist": `who is so heavily muscled that ${heA}'s become quite androgynous lately.`,
				"gender fundamentalist": `whose heavy musculature does not detract from ${hisA} feminine beauty.`,
				"asset expansionist": `whose enormous muscles easily bear the weight of ${hisA} equally oversized chest and hindquarters.`,
				"transformation fetishist": `who's almost unnaturally muscle-bound.`,
				pastoralist: `wearing jean overalls, a plaid shirt whose sleeves are strained by ${hisA} biceps, and rubber boots, and has a cowboy hat pushed back on ${hisA} pretty head.`,
				"maturity preferentialist": `with streaks of grey running through ${hisA} long flowing hair. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`,
				"youth preferentialist": `with whose innocent appearance belies ${hisA} heavy muscles. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`,
				"slimness enthusiast": `with long flowing hair, tribal tattoos, shredded abs, and bone jewelry. ${HisA} perky boobs are usually concealed by ${hisA} ornaments.`,
				"body purist": `with a realistic tribes${womanA}'s garb of woven jewelry and shell beads. ${HeA} has bigger natural tits than anyone that ripped could possibly maintain.`,
				"intellectual dependency": `with much more muscle than brains.`,
				"slave professionalism": `with a keen mind to complement ${hisA} ripped body.`,
				"petite admiration": `who, despite ${hisA} small stature, can still wrestle ${hisA} peers into submission.`,
				"statuesque glorification": `that few stand a chance of escaping being scooped up and carried off for sex.`,
			},
			"businesswoman": {
				"default": ``,
				paternalist: `wearing a perfectly-tailored suit, with ${hisA} silver-blonde hair brushed back over ${hisA} shoulders. ${HisA} clothes are conservative, but they can't hide ${hisA} generous curves.`,
				degradationist: `wearing an iron-gray suit, with ${hisA} hair up in a severe bun. ${HeA}'s wearing deep red lipstick and a predatory expression.`,
				"supremacist": `wearing a perfectly-tailored suit. ${HeA} has two different tones ${heA} uses when speaking: a respectful one for talking with ${hisA} ${V.arcologies[0].FSSupremacistRace} equals, and a strict domineering one for interacting with the lesser races.`,
				"subjugationist": `wearing a nice, slightly-used suit. ${HeA} speaks with a stereotypical ${V.arcologies[0].FSSubjugationistRace} voice, but is otherwise the model of a perfect subservient secretary.`,
				"roman revivalist": `wearing a fine stola appropriate for a respectable Roman lady, with ${hisA} hair up in a complicated style.`,
				"neoimperialist": `wearing an elegant black suit tailored perfectly for ${hisA} holographic body, one that you recognize as being the latest in old-world fashion.`,
				"aztec revivalist": `wearing a modest huipil, ${hisA} hair braided to two ponytails. ${HeA}'s the picture of quiet elegance.`,
				"egyptian revivalist": `wearing a simple white linen dress, kohl eyeshadow, sandals, and a serene expression.`,
				"edo revivalist": `wearing a fine kimono, getae, tabi, and an expression of perfect serenity.`,
				"arabian revivalist": `wearing a tailored suit, a silk headscarf, and aviator sunglasses, making ${himA} look like a little oil heiress.`,
				"chinese revivalist": `wearing a conservative silk qipao. ${HisA} hair is pulled back into a bun and secured by a couple of chopsticks.`,
				"antebellum revivalist": `wearing a frock coat and vest with a handsome top hat.`,
				"chattel religionist": `wearing a tailored suit. ${HeA} has a prominent religious symbol on a necklace that rests over ${hisA} generous bosom.`,
				"physical idealist": `wearing a tailored suit. ${HeA}'s proportioned to make it very obvious that ${heA} works out.`,
				"hedonistic decadence": `wearing a tailored suit. ${HeA}'s proportioned to make it very obvious that ${heA} enjoys a good drink after the day is done.`,
				"repopulation focus": `wearing a nice suit, specially tailored to contain ${hisA} pregnant belly.`,
				"eugenics": `wearing a nice suit and bearing the insignia of the Elite upon ${hisA} arm. ${HisA} suit strains to contain ${hisA} belly, swollen with the child of another Elite.`,
				"gender radicalist": `wearing a nice suit. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} quite androgynous.`,
				"gender fundamentalist": `wearing a nice suit. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} more feminine, with a softer expression and a pretty fall of silver-blonde hair over one shoulder.`,
				"asset expansionist": `wearing a nice suit, which is tailored to fit ${himA} despite the fact that ${heA} has breasts almost as large as ${heA} is.`,
				"transformation fetishist": `wearing a nice suit over tits that are carefully rendered to be high and perfect enough to give the impression of being implants.`,
				"pastoralist": `wearing a suit jacket over a plaid shirt and jeans.`,
				"maturity preferentialist": `wearing a nice suit. ${HeA}'s allowed ${hisA} appearance to become more mature recently, letting ${hisA} hair go gray and adding attractive aging to ${hisA} face.`,
				"youth preferentialist": `wearing a nice suit. ${HeA}'s improved ${hisA} appearance to look younger recently, bringing ${hisA} hair to full blonde and wearing softer shades of lipstick.`,
				"slimness enthusiast": `wearing a nice suit. ${HeA} looks youthful, despite ${hisA} severe expression, and ${hisA} boobs are elegantly small.`,
				"body purist": `in a suit. ${HeA}'s recently improved ${hisA} appearance to look more natural, with a single stray tress of hair escaping ${hisA} bun to run prettily down ${hisA} chest.`,
				"intellectual dependency": `in a suit two sizes too small. ${HisA} breasts threaten to pop ${hisA} buttons, ${hisA} skirt conceals nothing, and ${hisA} cleavage serves as a handy storage compartment.`,
				"slave professionalism": `wearing a refined suit that perfectly hugs ${hisA} curves, with ${hisA} silver-blonde hair braided down ${hisA} back. A pair of half-glasses tell you not to waste ${hisA} time.`,
				"petite admiration": `wearing a suit tailored to ${hisA} petite figure.`,
				"statuesque glorification": `wearing a suit tailored to ${hisA} towering figure. Few measure up to ${himA}.`,
			},
			"goddess": {
				"default": ``,
				"paternalist": `with swollen breasts and a big pregnant belly. ${HeA} wears only a gossamer white camisole over ${hisA} tanned skin, with a woven crown of daisies.`,
				"degradationist": `with swollen hips and breasts and a huge pregnant belly. ${HeA}'s naked aside from the steel piercings in ${hisA} protruding clit, navel, and nipples.`,
				"supremacist": `with swollen breasts and a big pregnant belly. ${HeA} wears a golden tiara on ${hisA} head, and ${hisA} otherwise nude form is a shining example of the ${V.arcologies[0].FSSupremacistRace} race's divine beauty.`,
				"subjugationist": `with swollen hips and breasts and a huge pregnant belly. ${HeA}'s nude aside from a crown of wilted flowers and the iron shackles on ${hisA} wrists and ankles.`,
				"roman revivalist": `with swollen hips and a big pregnant belly. ${HeA}'s clothed in a loose stola, with dozens of flowers woven into ${hisA} curly auburn hair.`,
				"neoimperialist": `with a heaving, pregnant belly. The crest of your family is emblazoned over ${hisA} womb, as if the unborn child is already your property.`,
				"aztec revivalist": `glowing like a sun goddess; ${hisA} full belly commands awe and respect in all who see ${himA}.`,
				"egyptian revivalist": `wielding an ankh-headed staff. ${HeA}'s wearing a gilded headdress and linen skirt, but leaves ${hisA} breasts and pregnant stomach bare to gleam like bronze.`,
				"edo revivalist": `${hisA} swollen hips and pregnant belly loosely wrapped in a red tomesode. ${HisA} waterfall of black hair is held by a comb shaped like big pointed fox ears.`,
				"arabian revivalist": `with swollen hips and breasts and a big pregnant belly. ${HeA}'s wrapped ${himselfA} in white silks, but only the veil around ${hisA} face is opaque.`,
				"chinese revivalist": `${HisA} swollen hips and pregnant belly barely concealed under colorful silk robes, covered in flowers and embroidery.`,
				"antebellum revivalist": `with swollen hips and breasts and a big pregnant belly. ${HeA} wears a Phrygian cap and a gown fashioned from the flag of the Confederacy. A single, heavy breast is deliberately left exposed. ${HeA} is Columbia, goddess of America`,
				"chattel religionist": `with swollen breasts and a big pregnant belly. ${HeA}'s surrounded by a nimbus of light and flowing platinum hair, like an angel carrying a few new cherubim.`,
				"physical idealist": `trim and athletic despite ${hisA} pregnant belly. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"hedonistic decadence": `with soft, plush features. ${HisA} belly is so fat it is difficult to tell ${heA} is pregnant at first. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"repopulation focus": `with swollen breasts and an enormous pregnant belly. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"eugenics": `with swollen hips and breasts and a big pregnant belly. ${HeA} is stunningly beautiful and proudly bears the insignia of the Elite upon ${hisA} breast.`,
				"gender radicalist": `although ${heA}'d be nearly androgynous without the rounded pregnant belly. ${HisA} short hair and flowing robe conceal any other feminine traits.`,
				"gender fundamentalist": `with swollen hips and breasts and a huge pregnant belly. ${HeA}'s nude aside from a crown of roses, and makes no attempt to cover ${hisA} radiant body.`,
				"asset expansionist": `${hisA} big pregnant belly almost eclipsed by ${hisA} enormous breasts. ${HeA}'s nude aside from the sunflowers woven into ${hisA} long hair.`,
				"transformation fetishist": `clad in a rainbow of flowers and latex pasties. Even pregnant, ${hisA} breasts and ass are too firm to be natural, like a porn star who forgot ${hisA} birth control.`,
				"pastoralist": `with oversized breasts pouring streams of milk down ${hisA} pregnant belly like a fountain. ${HeA}'s nude aside from the wildflowers tucked in ${hisA} hair.`,
				"maturity preferentialist": `with only ${hisA} huge hips and a wreath of flowers to protect ${hisA} modesty. ${HisA} stretch-marks and laugh-lines suggest the child ${heA}'s carrying is not ${hisA} first.`,
				"youth preferentialist": `with swollen breasts and a big pregnant belly. ${HeA}'s nude aside from a wreath of daffodils, ${hisA} body radiant with youthful energy.`,
				"slimness enthusiast": `${hisA} big pregnant belly dominating ${hisA} otherwise lithe frame. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"body purist": `with swollen hips and breasts and a big pregnant belly. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"intellectual dependency": `with swollen hips and breasts and a big pregnant belly. ${HeA}'s nude aside from a crown of flowers, with no sense of modesty.`,
				"slave professionalism": `${hisA} swollen hips and pregnant belly loosely wrapped in an elegant kimono. ${HeA} radiates experience.`,
				"petite admiration": `${hisA} big pregnant belly utterly dominating ${hisA} short height. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
				"statuesque glorification": `with swollen breasts and an enormous pregnant belly to fit ${hisA} towering form. ${HeA}'s nude aside from a crown of flowers, ${hisA} modesty protected only by ${hisA} flowing hair.`,
			},
			"hypergoddess": {
				"default": ``,
				"paternalist": `${HeA}'s made ${himselfA} up to look a bit classier recently: ${HeA} has elegant fake nails, and has ${hisA} hair piled up on ${hisA} head. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"repopulation focus": `${HeA} rests atop ${hisA} newly modified belly. It bulges greatly from all sides and holds ${himA} far off the ground.`,
				"eugenics": `${HeA} appears as an ugly and unkempt slave ${girlA}, massively pregnant with hundreds of subhuman spawn. ${HisA} immense belly is coated in bulges and moving ominously. A malformed, impish child claws its way out of ${hisA} ruined cunt periodically.`,
				"degradationist": `${HeA}'s made ${himselfA} up to look almost comically evil: ${HeA}'s wearing black lipstick and black eyeliner. Numerous studs cover ${hisA} bulging belly and a large, heavy ring is driven through ${hisA} popped navel. Liquid constantly oozes from ${hisA} gaping vagina where a baby is held mid-birth by several crisscrossing chains.`,
				"supremacist": `${HeA} is nude except for a golden tiara on ${hisA} head, a symbol of the ${V.arcologies[0].FSSupremacistRace} race's divine right to rule. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy ${V.arcologies[0].FSSupremacistRace} baby.`,
				"subjugationist": `${HeA} is shackled onto a large bed, the iron chains forcing ${hisA} legs apart and putting ${hisA} gaping pussy on display. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy ${V.arcologies[0].FSSubjugationistRace} slave baby.`,
				"roman revivalist": `${HeA}'s taken to reclining on a traditional Roman couch and drinking wine out of a shallow dish. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"neoimperialist": `${HeA}'s made ${himselfA} up like a glowing goddess, a golden halo surrounding ${hisA} head at all times. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"aztec revivalist": `${HeA} glows like a sun goddess; ${hisA} life-giving belly commands awe and respect in all who see ${himA}. Every sacrifice before ${himA} coincides with another life entering the world.`,
				"egyptian revivalist": `${HeA}'s wearing an Egyptian melting perfume cake on ${hisA} head. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"edo revivalist": `${HeA}'s wearing a brief Japanese bathhouse robe. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"arabian revivalist": `${HeA}'s dressed ${himselfA} like an oil millionaire's broodmother, with silken linens. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"chinese revivalist": `${HeA}'s added various tattoos of rude Chinese characters to ${hisA} body recently. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"antebellum revivalist": `${HeA}'s dressed in a gown fashioned from the flag of the Confederacy, distended by ${hisA} belly. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"chattel religionist": `${HeA}'s wearing the garb of a priestess of the new faith, which frames ${hisA} belly prominently. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby.`,
				"physical idealist": `${HeA}'s extremely muscular: ${HeA} hefts ${hisA} massive belly easily off the floor.`,
				"hedonistic decadence": `${HeA}'s extremely fat, though it does nothing to hide ${hisA} immense dome of a belly. ${HeA} is constantly eating something fatty or sucking down ${hisA} own milk; the only thing hungrier than ${himA} is ${hisA} brood. Occasionally a stream of liquid pours from ${hisA} crotch along with a plump, healthy baby.`,
				"gender radicalist": `${HisA} belly is pushed upwards by a huge cock and a pair of enormous lumpy balls. Occasionally a stream of liquid pours from ${hisA} crotch along with a healthy baby. At the same time, ${heA} orgasms copious amounts of cum as a bulge moves along ${hisA} urethra before blasting out even more cum and a baby.`,
				"gender fundamentalist": `${HisA} belly has become absolutely massive recently: It fills most of your desk when ${heA}'s around. ${HeA} constantly births children from ${hisA} loins.`,
				"asset expansionist": `${HeA}'s increased the size of ${hisA} assets recently: ${hisA} boobs fill more of your desk than ${hisA} belly.`,
				"transformation fetishist": `${HisA} tits, ass and lips are carefully rendered to make them look fake.`,
				"pastoralist": `Powerful jets of milk flow from ${hisA} desk-filling boobs.`,
				"maturity preferentialist": `${HeA}'s quite mature; ${hisA} belly is covered in stretch marks.`,
				get "youth preferentialist"() {
					if (V.minimumSlaveAge >= 18) {
						return `${HeA}'s fresh into adulthood and already has had more children than most women ever will. ${HeA} leans against ${hisA} mammoth belly as another child parts ${hisA} youthful pussy.`;
					} else if (V.minimumSlaveAge > 12) {
						return `${HeA}'s fresh into ${hisA} teens and firmly anchored by ${hisA} mammoth belly. ${HisA} attempts to try and move are frequently interrupted as another child begins forcing its way out of ${hisA} tight pussy.`;
					} else if (V.minimumSlaveAge > 6) {
						return `${HeA}'s just a young ${girlA} and already has had more children than most women will in their lives. ${HeA} happily embraces ${hisA} mammoth belly, the force of ${hisA} hug forcing milk out of ${hisA} breasts and babies out of ${hisA} crotch.`;
					} else {
						return `${HeA}'s surprisingly young; ${heA} happily bounces atop ${hisA} mammoth belly, forcing milk out of ${hisA} breasts and babies out of ${hisA} crotch.`;
					}
				},
				"slimness enthusiast": `${HisA} massive pregnant belly completely dwarfs ${hisA} otherwise lithe frame.`,
				"body purist": `${HeA}'s recently improved ${hisA} appearance to look more natural, with prettier boobs and softer hips.`,
				"intellectual dependency": `${HeA} has long since become incapable of fingering ${himselfA}, but it doesn't matter when every birth is orgasmic.`,
				"slave professionalism": `${HeA}'s wearing a flowing dress, complete with a concealed layer to house ${hisA} newborns until ${heA} is dismissed. Occasionally ${heA} quivers slightly, calculatingly giving birth when it is least disruptive.`,
				"petite admiration": `${HeA} stands no chance of moving on ${hisA} own, as ${hisA} mammoth belly has long since lifted ${hisA} petite body off the ground.`,
				"statuesque glorification": `${HeA}'s increased ${hisA} height massively, but ${hisA} mammoth belly has grown proportionately as well. Occasionally a stream of liquid pours from ${hisA} crotch along with a rather lanky baby.`,
			},
			"schoolgirl": {
				"default": ``,
				"paternalist": `wearing a long plaid skirt and a clean white shirt. ${HeA} does ${hisA} best to look as prim as possible, which, given ${hisA} duties, often isn't very prim at all.`,
				"degradationist": `wearing a plaid skirt and a white shirt, though ${heA}'s hiked the skirt up to show almost everything, and torn the shirt open to bare ${hisA} perky boobs.`,
				"supremacist": `wearing a plaid skirt and a white shirt. ${HeA} is constantly taking notes and studying the latest textbooks, satisfying the ${V.arcologies[0].FSSupremacistRace} race's thirst for knowledge.`,
				"subjugationist": `wearing a plaid skirt and a white shirt. ${HeA} speaks with a stereotypical ${V.arcologies[0].FSSubjugationistRace} accent, giving the impression of a foreign exchange student with much to learn.`,
				"roman revivalist": `wearing a ${girlA}'s stola, with ${hisA} hair pulled up into a proper upper-class Roman coiffure. ${HeA} usually carries a wax tablet and a stylus.`,
				"neoimperialist": `wearing a prim and proper school uniform, with your family crest on ${hisA} breast pocket. ${HisA} short plaid skirt occasionally flips up to flash a hint of ${hisA} holographic panties.`,
				"aztec revivalist": `wearing only an overshirt. ${HisA} cute little legs are complimented by ${hisA} twin tails.`,
				"egyptian revivalist": `wearing a simple white linen skirt, kohl eyeshadow, sandals, and no top at all, baring ${hisA} perky young breasts.`,
				"edo revivalist": `wearing a simple robe appropriate for a proper, traditional Japanese lady.`,
				"arabian revivalist": `wearing a long plaid skirt, a clean white shirt, and a headscarf, making ${himA} look like an Arab ${girlA} attending a Western school.`,
				"chinese revivalist": `wearing a plaid skirt and a white shirt. ${HisA} hair is pulled back into a bun and secured by a couple of chopsticks.`,
				"antebellum revivalist": `wearing remarkably conservative clothing. ${HeA} wears a white long-sleeved shirt tucked into an ankle-length skirt. A colorful, lacy bow is fixed to ${hisA} collar.`,
				"chattel religionist": `wearing a plaid skirt and a white shirt. ${HeA} has a prominent religious symbol on a necklace that rests at the level of ${hisA} perky tits.`,
				"physical idealist": `wearing a plaid skirt, a white shirt, and athletic shoes. ${HeA} usually renders ${himselfA} flushed with exercise, as though ${heA} just came from gym class.`,
				"hedonistic decadence": `wearing a plaid skirt and a white shirt. The buttons of ${hisA} shirt struggle against ${hisA} plush body, and ${hisA} skirt rides up ${hisA} plump butt to expose ${hisA} panties.`,
				"repopulation focus": `wearing a plaid skirt and a white shirt, though ${hisA} shirt rides up ${hisA} growing pregnancy. It seems ${heA} found another way to support ${hisA} team.`,
				"eugenics": `wearing a plaid skirt and a white shirt. ${HeA} usually can be seen studying to become an upstanding member of society's elite.`,
				"gender radicalist": `wearing a plaid skirt and a white shirt. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} quite androgynous.`,
				"gender fundamentalist": `wearing a plaid skirt and a white shirt. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} as cute and feminine as possible, and ${heA} blushes a lot.`,
				"asset expansionist": `wearing a plaid skirt and a white shirt. ${HisA} breasts are unrealistically huge for ${hisA} apparent age, and perfect skin is visible between the buttons of ${hisA} overstrained shirt.`,
				"transformation fetishist": `wearing a plaid skirt and a white shirt. ${HisA} breasts are rendered to make it look like ${heA} got a pair of fake tits for ${hisA} birthday.`,
				"pastoralist": `wearing a plaid skirt and a white shirt. There's a little wet spot over each of ${hisA} nipples.`,
				"maturity preferentialist": `wearing a plaid skirt and a white shirt. ${HisA} short skirt reveals a pink bottom, making it look like teacher just spanked ${himA}.`,
				"youth preferentialist": `wearing a plaid skirt and a white shirt. ${HeA} looks quite young and innocent, and depicts ${himselfA} blushing at anything lewd.`,
				"slimness enthusiast": `wearing a plaid skirt and a white shirt. ${HeA} looks quite young and innocent, and ${hisA} boobs are elegantly small.`,
				"body purist": `wearing a plaid skirt and a white shirt. ${HeA}'s recently improved ${hisA} appearance to look more natural, with freckles and a winning smile.`,
				"intellectual dependency": `wearing a plaid skirt and a white shirt, though ${hisA} top is left unbuttoned and ${hisA} bottom conceals nothing. ${HeA} usually renders ${himselfA} flushed and sucking on a lollipop.`,
				"slave professionalism": `wearing a long plaid skirt and a clean white shirt; the perfect class rep who takes ${hisA} duties seriously.`,
				"petite admiration": `wearing a plaid skirt and a white shirt that's a little too big on ${himA}. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} as short and cute as possible.`,
				"statuesque glorification": `wearing a plaid skirt that shows a lot of leg and a white shirt that barely covers ${hisA} navel. ${HeA}'s been doing a lot of growing lately.`,
			},
			"loli": {
				"default": ``,
				"paternalist": `${girlA} wearing a cute pink dress.`,
				"supremacist": `${girlA} wearing shorts and a pink t-shirt with the words '${properMaster()}'s little ${V.arcologies[0].FSSupremacistRace} princess' on the front.`,
				"subjugationist": `slave ${girlA} wearing nothing but a leather collar and trying ${hisA} best to do master proud.`,
				"roman revivalist": `${girlA} wearing a ${girlA}'s stola.`,
				"neoimperialist": `${girlA} wearing a tiny elementary schooler's uniform, complete with miniature plaid skirt.`,
				"aztec revivalist": `${girlA} wearing only an overshirt; ${hisA} cute little legs are complimented by ${hisA} twin tails.`,
				"egyptian revivalist": `${girlA} wearing a simple white linen dress, kohl eyeshadow, and sandals.`,
				"edo revivalist": `${girlA} wearing a kimono far too large for ${himselfA}.`,
				"arabian revivalist": `${girlA} wearing a simple linen dress and a headscarf.`,
				"chinese revivalist": `${girlA} wearing a cute silk qipao.`,
				"antebellum revivalist": `${girlA} wearing a cute, lacy gown.`,
				"chattel religionist": `${girlA} wearing the garb of a priestess of the new faith.`,
				"repopulation focus": `${girlA} wearing a loose dress; its middle bulges considerably from ${hisA} pregnancy.`,
				"eugenics": `slave ${girlA} wearing nothing but an overly complex chastity belt and trying ${hisA} best to do master proud.`,
				"degradationist": `${girlA} wearing an oversized v-neck t-shirt. The neck hole hangs low enough to show off ${hisA} perky A-cup tits and the piercings through them.`,
				"physical idealist": `${girlA} wearing spats and a tight shirt. ${HeA} occasionally renders ${himselfA} sweaty, as if just finishing exercising.`,
				"hedonistic decadence": `${girlA} wearing spats barely pulled over ${hisA} big ass and a tight shirt that rides up ${hisA} chubby belly. It seems someone snuck out of gym class.`,
				"gender radicalist": `${girlA} wearing shorts and a t-shirt. ${HeA}'s changed ${hisA} appearance recently to make ${himselfA} quite androgynous.`,
				"gender fundamentalist": `${girlA} wearing a skirt and a white shirt. ${HisA} slightly swollen belly peeks out from under ${hisA} shirt, causing ${himA} to blush whenever you glance at it.`,
				"asset expansionist": `${girlA} wearing a school swimsuit. ${HisA} breasts are unrealistically huge for ${hisA} young age and bulge lewdly around the straps of ${hisA} suit.`,
				"transformation fetishist": `${girlA} wearing short shorts and a t-shirt. At first glance it looks like ${heA} stuck two overinflated balloons up ${hisA} shirt, but with closer inspection they are revealed to be ridiculous implants.`,
				"pastoralist": `${girlA} wearing shorts and a white shirt. There's a little wet spot over each of ${hisA} nipples.`,
				"maturity preferentialist": `${girlA} wearing a school uniform. ${HeA} keeps rubbing ${hisA} bottom, making it look like teacher just spanked ${himA}.`,
				"youth preferentialist": `${girlA} wearing a child's dress. ${HeA} looks barely more than ${num(V.idealAge.clamp(V.minimumSlaveAge, 12))}.`,
				"slimness enthusiast": `${girlA} wearing shorts and a white shirt. ${HeA} looks extremely thin.`,
				"body purist": `${girlA}. ${HeA}'s recently improved ${hisA} appearance to look more natural, with freckles and a winning smile.`,
				"intellectual dependency": `${girlA} wearing nothing at all. The breeze feels nice and modesty is not something ${heA} can understand.`,
				"slave professionalism": `${girlA} wearing a long black dress. ${HeA} is trying ${hisA} best to compose ${himselfA} and grow into a proper young ${womanA}.`,
				"petite admiration": `${girlA} wearing a dress much too large for ${himA}. ${HisA} tiny form is just begging for a piggyback ride.`,
				"statuesque glorification": `${girlA} wearing a too-small dress. ${HeA}'s growing up fast, but still has a long way to go if ${heA} wants to stand out in a crowd.`,
			},
			"preggololi": {
				"default": ``,
				"paternalist": `belly, wearing a cute pink dress. The middle is stretched tight by ${hisA} growing belly.`,
				"supremacist": `belly, wearing a cute yellow dress. ${HeA} cradles ${hisA} swollen belly protectively, glowing with pride at carrying ${V.arcologies[0].FSSupremacistRace !== 0 ? addA(V.arcologies[0].FSSupremacistRace) : ""} child.`,
				"subjugationist": `belly, wearing nothing but a pregnancy biometrics collar. The collar's display reads 'Carrying 2 more ${V.arcologies[0].FSSubjugationistRace} subhumans!', something the ${girlA} occasionally reads aloud to ${himselfA}.`,
				"roman revivalist": `belly wearing a ${girlA}'s stola.`,
				"neoimperialist": `belly wearing a tiny elementary schooler's uniform, complete with miniature plaid skirt. ${HisA} belly swells underneath the cotton shirt.`,
				"aztec revivalist": `belly wearing only an overshirt which struggles to cover ${hisA} rounded middle; ${hisA} cute little legs are complimented by ${hisA} twin tails.`,
				"egyptian revivalist": `belly wearing a bulging white linen dress, kohl eye shadow and sandals.`,
				"edo revivalist": `belly wearing a kimono far too large for ${himselfA} but does nothing to distract from ${hisA} swollen midriff.`,
				"arabian revivalist": `belly wearing a bulging linen dress and a headscarf.`,
				"chinese revivalist": `belly wearing a tight silk qipao.`,
				"antebellum revivalist": `belly wearing a bulging, lacy gown.`,
				"chattel religionist": `belly wearing the garb of a priestess of the new faith.`,
				"repopulation focus": `belly. ${HeA} recently adjusted ${hisA} pregnancy size to make it even larger. ${HisA} swelling ass and tits spill out from ${hisA} shorts and tube-top and the occasional kick can be seen from ${hisA} octuplets.`,
				"eugenics": `belly, or rather, ${heA} was. ${HisA} chastity belt has been torn open and ${hisA} belly is grotesquely swollen with subhuman spawn. Occasionally a malformed, impish child claws its way out of ${hisA} violated pussy.`,
				"degradationist": `belly, wearing an open vest and a thong. It shows off ${hisA} pierced milky B-cup tits and swollen pregnant belly. A large bar is driven through ${hisA} popped navel.`,
				"physical idealist": `belly, wearing spats and a tight shirt. ${HisA} shirt rides up on ${hisA} large belly and ${hisA} growing butt fills out ${hisA} spats nicely. ${HeA} cradles ${hisA} belly with a sullen look knowing it limits ${hisA} activities.`,
				"hedonistic decadence": `belly, reclining on a chair with a big bowl of snack food. ${HeA} belches and pats ${hisA} belly happily.`,
				"gender radicalist": `belly, wearing shorts and a t-shirt. ${HisA} androgynous look makes ${himA} look like a pregnant boy.`,
				"gender fundamentalist": `belly, wearing a skirt and a white shirt. ${HeA} is extremely pregnant, carrying triplets. ${HeA} blushes and pats ${hisA} belly whenever ${heA} notices your gaze.`,
				"asset expansionist": `belly, wearing a school swimsuit. ${HisA} breasts are unrealistically huge for ${hisA} young age and bulge lewdly around the straps of ${hisA} overfilled suit. ${HisA} suit is extremely tight around the middle thanks to ${hisA} growing belly.`,
				"transformation fetishist": `belly, wearing short shorts and a t-shirt. At first glance it looks like ${heA} stuck two overinflated balloons up ${hisA} shirt but with closer inspection they are revealed to be ridiculous implants. They sit atop ${hisA} bulging belly.`,
				"pastoralist": `belly, wearing shorts and a white shirt. There's a little wet spot over each of ${hisA} nipples. ${HisA} breasts have swollen to C-cups thanks to ${hisA} pregnancy and the milkings.`,
				"maturity preferentialist": `belly, wearing a school uniform. ${HisA} top is left unbuttoned to allow ${hisA} belly room. ${HeA} keeps rubbing ${hisA} bottom, making it look like Teacher just spanked ${himA}.`,
				"youth preferentialist": `belly, wearing nothing, as nothing will fit ${hisA} lewd body. ${HeA} looks barely more than three and is laying atop ${hisA} proportionally enormous belly.`,
				"slimness enthusiast": `belly, wearing shorts and a white shirt. ${HisA} slim body makes ${hisA} pregnant belly look much bigger than it is.`,
				"body purist": `belly. ${HeA}'s recently improved ${hisA} appearance to look more natural, with freckles and a winning smile. ${HeA} cradles ${hisA} swelling belly and twirls when you look ${hisA} way.`,
				"intellectual dependency": `belly. ${HeA} spends a lot of trying to suck it in, not understanding that ${heA}'s with child and not just fat.`,
				"slave professionalism": `belly, wearing a tight black dress. ${HeA} is trying ${hisA} best to compose ${himselfA} and grow into a proper young ${womanA}, despite ${hisA} lack of control.`,
				"petite admiration": `belly, filling out a dress tailored for a ${girlA} taller than ${himA}. ${HisA} shortness makes ${hisA} pregnant belly look much bigger than it is.`,
				"statuesque glorification": `belly, wearing a too-small dress. ${HeA}'s growing up fast and, given the size of ${hisA} belly, so is ${hisA} child.`,
			},
			"fairy": {
				"default": ``,
				"eugenics": `fairy wearing ${hisA} birthday suit, since ${heA} is so flawless ${heA} needs nothing else.`,
				"paternalist": `fairy wearing a well-sewn blue dress, with a large red bow tied to the back of ${hisA} waist length golden-blonde hair. ${HeA} looks like a little Bucuresti doll.`,
				"degradationist": `fairy and completely unclothed, with ${hisA} hair in a mess and covered in dirt.`,
				"supremacist": `fairy with distinctly ${V.arcologies[0].FSSupremacistRace} features. ${HeA} has wrapped a golden ribbon around ${hisA} torso to fashion ${himselfA} a dress.`,
				"subjugationist": `fairy with exaggerated ${V.arcologies[0].FSSubjugationistRace} features. ${HeA} is completely unclothed, with ${hisA} hair in a mess and covered in dirt.`,
				"roman revivalist": `fairy wearing a small handkerchief wrapped around ${himA} like a toga, with one tiny breast sticking out. A wreath made of twisted clovers sits on ${hisA} head.`,
				"neoimperialist": `fairy, ${hisA} tiny body encased in a tight-fitting, high-tech bodysuit.`,
				"aztec revivalist": `fairy, yellow paint creating tribal patterns across ${hisA} naked form.`,
				"egyptian revivalist": `fairy wearing a simple white linen dress and has eyeshadow poorly applied around ${hisA} eyes.`,
				"edo revivalist": `fairy wearing a fine kimono and holding a little fan. ${HeA} looks like a little Hina doll.`,
				"arabian revivalist": `fairy wearing a strip of silk as a dress.`,
				"chinese revivalist": `fairy wearing a silk cheongsam with a little green cap on ${hisA} head. ${HisA} hair is braided on the sides. ${HeA} looks like a figurine from some kind of game.`,
				"antebellum revivalist": `fairy wearing a sheer lacy garment that leaves little to the imagination.`,
				"chattel religionist": `fairy wearing a little gold-white habit.`,
				"physical idealist": `fairy wearing a training bra and spats. ${HeA} has abs poorly drawn on ${hisA} belly with a marker.`,
				"hedonistic decadence": `fairy, naked and sitting in a cup of pudding, happily digging into its contents.`,
				"repopulation focus": `fairy wearing a simple dress. ${HisA} belly appears to be swollen and ready to burst, but a quick lift of ${hisA} skirt shows that ${heA}'s smuggling a grape under there.`,
				"gender radicalist": `fairy wearing a pair of pants. Just the pants.`,
				"gender fundamentalist": `fairy wearing a well-sewn blue dress, with a large red bow tied to the back of ${hisA} waist length golden-blonde hair. ${HeA} looks like a little Bucuresti doll.`,
				"asset expansionist": `fairy wearing a pair of pants and a t-shirt. ${HeA} has two blueberries stuffed into the front of ${hisA} shirt.`,
				"transformation fetishist": `fairy wearing a pair of tight jeans and a t-shirt. ${HeA} has two grapes stuffed into ${hisA} shirt, and some cotton shoved in the back of ${hisA} jeans.`,
				"pastoralist": `fairy wearing only a pair of overalls. The overalls are just loose enough to let ${hisA} nearly flat chest peek out when ${heA} turns or bends over.`,
				"maturity preferentialist": `fairy wearing an old wool dress and spinning a cane.`,
				"youth preferentialist": `fairy wearing a kindergartner's uniform, complete with rain cap and red backpack.`,
				"slimness enthusiast": `fairy wearing a handkerchief with a hole in it like a poncho. ${HeA} looks as slim as usual, with ${hisA} naked body completely visible from the sides.`,
				"body purist": `fairy wearing ${hisA} birthday suit, with pale unblemished skin on full display and silky golden hair cascading down ${hisA} back.`,
				"intellectual dependency": `fairy wearing a thong as a string bikini. ${HeA} keeps asking questions you are certain ${heA} knows the answers to.`,
				"slave professionalism": `fairy wearing a graduation gown.`,
				"petite admiration": `fairy wearing ${hisA} birthday suit, with ${hisA} nude form obscured by the light ${heA}'s giving off. ${HeA}'s recently adjusted ${hisA} size so that, at a glance, ${heA} appears to be nothing more than a glowing ball.`,
				"statuesque glorification": `fairy wearing a simple dress. ${HeA}'s adjusted the length of ${hisA} dress to make it appear that ${heA} is taller than ${heA} really is.`,
			},
			"pregnant fairy": {
				"default": ``,
				"eugenics": `wearing nothing but a band with insignia of the Elite emblazoned on it.`,
				"paternalist": `wearing a well-sewn blue dress, with a large red bow tied to the back of ${hisA} waist length golden-blonde hair. ${HeA} looks like a little Bucuresti doll.`,
				"degradationist": `and is completely unclothed, with ${hisA} hair in a mess and covered in dirt.`,
				"supremacist": `and has distinctly ${V.arcologies[0].FSSupremacistRace} features. ${HeA} has wrapped a golden ribbon around ${hisA} chest to create an improvised bra, and another under ${hisA} swollen belly to fashion a thong.`,
				"subjugationist": `and has exaggerated ${V.arcologies[0].FSSubjugationistRace} features. ${HeA} is completely unclothed, with ${hisA} hair in a mess and covered in dirt.`,
				"roman revivalist": `wearing a small handkerchief wrapped around ${himA} like a toga, with one tiny milky breast sticking out. A wreath made of twisted clovers sits on ${hisA} head.`,
				"neoimperialist": `whose tiny body is encased in a tight-fitting, high-tech bodysuit. ${HisA} belly swells underneath the skintight material.`,
				"aztec revivalist": `smeared with yellow paint that creates tribal patterns across ${hisA} naked form and curves around ${hisA} swollen belly.`,
				"egyptian revivalist": `wearing a simple white linen dress and eyeshadow poorly applied around ${hisA} eyes.`,
				"edo revivalist": `wearing a fine kimono and holding a little fan. ${HeA} looks like a little Hina doll.`,
				"arabian revivalist": `wearing a strip of silk as a dress.`,
				"chinese revivalist": `wearing a silk cheongsam with a little green cap on ${hisA} head. ${HisA} hair is braided on the sides. ${HeA} looks like a figurine from some kind of game.`,
				"antebellum revivalist": `fairy wearing a sheer lacy garment, which shows off ${hisA} swollen belly.`,
				"chattel religionist": `wearing a little gold-white habit and glowing with purity.`,
				"physical idealist": `wearing a training bra and spats. ${HisA} large belly sticks out even more.`,
				"hedonistic decadence": `totally nude and sitting upon a large pastry, covered in cream. ${HeA} occasionally pulls off a piece to nibble on.`,
				"repopulation focus": `wearing a lovely maternity dress, which shows off ${hisA} swollen belly.`,
				"gender radicalist": `wearing a pair of pants. Just the pants.`,
				"gender fundamentalist": `wearing a well-sewn blue dress, with a large red bow tied to the back of ${hisA} waist length golden-blonde hair. ${HeA} looks like a little Bucuresti doll.`,
				"asset expansionist": `wearing a pair of pants and a t-shirt. ${HeA} has two blueberries stuffed into the front of ${hisA} shirt.`,
				"transformation fetishist": `wearing a pair of tight jeans and a t-shirt. ${HeA} has two grapes stuffed into ${hisA} shirt, and some cotton shoved in the back of ${hisA} jeans.`,
				"pastoralist": `wearing only a pair of overalls. The overalls are open enough to let ${hisA} belly pour out.`,
				"maturity preferentialist": `wearing an old wool dress and rocking back and forth on a rocking chair, cradling ${hisA} belly.`,
				"youth preferentialist": `wearing a kindergartner's uniform, complete with rain cap and red backpack. ${HisA} swollen belly looks out of place.`,
				"slimness enthusiast": `wearing a handkerchief with a hole in it like a poncho. ${HisA} pregnant belly forces the poncho to spread wide, leaving little of ${hisA} body to the imagination.`,
				"body purist": `wearing only ${hisA} birthday suit, ${hisA} pale unblemished pregnant belly on full display and silky golden hair cascading down ${hisA} back.`,
				"intellectual dependency": `wearing a thong as a string bikini. ${HeA} frequently pouts over all the weight ${heA} has been putting on lately.`,
				"slave professionalism": `wearing a graduation gown.`,
				"petite admiration": `wearing ${hisA} birthday suit, with ${hisA} nude form obscured by the light coming from ${hisA} belly. ${HeA}'s recently adjusted ${hisA} size so that, at a glance, ${heA} appears to be nothing more than a glowing oval.`,
				"statuesque glorification": `wearing a simple dress. ${HeA}'s adjusted the length of ${hisA} dress to make it appear that ${heA} is taller than ${heA} really is, but it keeps riding up ${hisA} middle and ruining the look.`,
			},
			"slimegirl": {
				"default": ``,
				"paternalist": `slime, with a modest pink dress floating inside ${himA}.`,
				"supremacist": `slime. ${HeA} keeps trying to shape ${hisA} goo into a beautiful ${V.arcologies[0].FSSupremacistRace} ${girlA}, but ${heA} hasn't quite perfected the finer details yet.`,
				"subjugationist": `slime. ${HeA} keeps trying to shape ${hisA} goo into a pretty face, but keeps ending up with over-exaggerated ${V.arcologies[0].FSSubjugationistRace} features instead.`,
				"roman revivalist": `slime, with a ${girlA}'s stola sinking into ${hisA} head.`,
				"neoimperialist": `slime, wearing a high-class suit that fits loosely around ${hisA} gelatinous features, occasionally slipping inside the slime.`,
				"egyptian revivalist": `slime, and quite perturbed about the amount of sand caught in ${himA}.`,
				"edo revivalist": `slime, with a silken kimono floating inside ${himA}.`,
				"arabian revivalist": `slime, with a headscarf and a pair of sunglasses floating inside ${himA}.`,
				"aztec revivalist": `slime.`, // TODO: missing in SC, expand someday.
				"chinese revivalist": `slime with a silk qipao floating inside ${himA}.`,
				"antebellum revivalist": `slime, with a colorful broad-brimmed hat adorned with a giant, fake flower floating side ${himA}.`,
				"chattel religionist": `slime with several symbols of the new faith floating inside ${himA}.`,
				"repopulation focus": `slime. ${HisA} amorphous body has noticeable hip, butt, and breast curves as well as several more cores gathered in ${hisA} rounded stomach.`,
				"eugenics": `slime, with a chastity belt floating inside ${himA}.`,
				"degradationist": `slime, with a number of piercings sinking into ${hisA} body.`,
				"physical idealist": `slime, doing ${hisA} best to shape ${hisA} goo into muscles.`,
				"hedonistic decadence": `slime. ${HeA} has accumulated a large amount of excess goo, giving ${himA} quite a corpulent shape.`,
				"gender radicalist": `slime. ${HeA} keeps trying to shape ${hisA} goo into a cock.`,
				"gender fundamentalist": `slime. ${HisA} amorphous body has noticeable hip, butt, and breast curves.`,
				"asset expansionist": `slime. ${HisA} amorphous body has ridiculously huge hip, butt, and breast curves.`,
				"transformation fetishist": `slime, with a pair of big silicone implants floating around ${hisA} chest.`,
				"pastoralist": `slime, with quite a large amount of milk mixed with ${hisA} body. ${HeA} keeps trying to shape ${hisA} goo into big milky tits.`,
				"maturity preferentialist": `slime. ${HisA} core is noticeably larger and shows signs of splitting many times.`,
				"youth preferentialist": `slime. ${HisA} core is as immature as ${hisA} body.`,
				"slimness enthusiast": `slime. ${HeA} is compacting ${hisA} slime to make ${himselfA} look thinner.`,
				"body purist": `slime, with the purest goo ${hisA} body could be made of.`,
				"intellectual dependency": `slime.`,
				"slave professionalism": `slime.`,
				"petite admiration": `slime.`,
				"statuesque glorification": `slime.`,
			},
			"angel": {
				"default": ``,
				"paternalist": `${HeA} is currently wearing a long, conservative skirt and a pretty white blouse complete with gaps for ${hisA} wings. ${HeA} is positively radiant.`,
				"degradationist": `${HeA} is wearing black eyeliner and lipstick while using a thin black ribbon to protect ${hisA} modesty. It's pretty obvious ${heA} has a stud through ${hisA} left nipple.`,
				"supremacist": `${HeA} cycles between different outfits that reflect the various holy garments of religions popular in ${V.arcologies[0].FSSupremacistRace} countries.`,
				"subjugationist": `${HeA} is wearing a simple white linen dress, and ${hisA} right ankle is shackled to an iron ball and chain that prevents ${himA} from flying very high.`,
				"roman revivalist": `${HeA} is wearing a fine stola appropriate for a respectable Roman lady, with ${hisA} hair up in a complicated style.`,
				"neoimperialist": `${HeA} is wearing a skintight bodysuit that gives ${himA} the appearance of some kind of techno-angel, cybernetics and angelic beauty meshing seamlessly together.`,
				"aztec revivalist": `${HeA} is wearing a modest huipil with ${hisA} hair braided to two ponytails; ${heA}'s the picture of quiet elegance.`,
				"egyptian revivalist": `${HeA} is wearing a simple white linen dress, kohl eyeshadow, sandals, and a serene expression.`,
				"edo revivalist": `${HeA} is wearing a fine kimono with slits for ${hisA} wings, getae, tabi, and an expression of perfect serenity.`,
				"arabian revivalist": `${HeA} is wearing a tailored suit, a silk headscarf, and aviator sunglasses, making ${himA} look ridiculous.`,
				"chinese revivalist": `${HeA} is wearing a conservative silk qipao with special slits for ${hisA} wings. ${HisA} hair is pulled back into a bun and secured by a couple of chopsticks.`,
				"antebellum revivalist": `${HeA} is wearing a wearing a almost transparent white gown. Large, downy wings, protrude from ${hisA} back and a golden halo hovers perfectly in place above ${hisA} head.`,
				"chattel religionist": `${HeA} has adjusted ${hisA} outfit to consist of nothing but the symbol of your new religion carefully tailored to cover ${hisA} nipples and crotch. ${HeA} wears another around ${hisA} neck and a blush on ${hisA} cheeks.`,
				"physical idealist": `${HeA} has swapped out ${hisA} usual linen dress for one that shows off ${hisA} toned arms, legs and abs.`,
				"hedonistic decadence": `${HeA} has swapped out ${hisA} usual linen dress for one that covers ${hisA} plush curves. ${HeA} finds walking easier than trying to fly with ${hisA} weighty body.`,
				"repopulation focus": `${HisA} simple white linen dress is parted by ${hisA} full term pregnancy; likely a lost soul being given a new chance.`,
				"eugenics": `${HeA} has swapped out ${hisA} usual linen dress for a fabulous one to match ${hisA} perfect appearance. ${HeA} proudly wears the symbol of high society on ${hisA} arm and, judging by the slight curve to ${hisA} middle, is growing a child just as beautiful as ${himA}.`,
				"gender radicalist": `${HeA} wears a simple white linen dress and has recently changed ${hisA} appearance to make ${himselfA} quite androgynous.`,
				"gender fundamentalist": `${HeA} wears a simple white linen dress that struggles to cover both ${hisA} full breasts and child-bearing hips.`,
				"asset expansionist": `${HeA} has recently given up on trying to cover ${hisA} arm-filling breasts, resorting to just wearing a skirt; a skirt that strains against ${hisA} enormous rear. ${HeA} certainly won't be flying anyway.`,
				"transformation fetishist": `${HeA} wears a simple white linen dress that struggles to contain ${hisA} big, perky, obviously fake breasts.`,
				"pastoralist": `${HeA} wears a simple white linen dress that struggles to cover ${hisA} full breasts. ${HeA} frequently tries to hide ${hisA} nipples, ${hisA} milk having rendered ${hisA} dress transparent.`,
				"maturity preferentialist": `${HeA} wears a simple white linen dress and has recently altered appearance to be more mature. ${HisA} face is one of experience and ${hisA} hair has streaks of silver.`,
				"youth preferentialist": `${HeA} wears a simple white linen dress that tastefully hugs ${hisA} youthful body. ${HeA} looks barely ${num(V.minimumSlaveAge, true)}; a tantalizing risk.`,
				"slimness enthusiast": `${HeA} wears a simple white linen dress that tastefully hugs ${hisA} thin body.`,
				"body purist": `${HeA} has forgone covering ${himselfA} to allow ${hisA} radiant, pure body to be visible to all.`,
				get "intellectual dependency"() {
					let r = `${HeA} wears a simple white linen dress with a slit cut out of the crotch. `;
					if (V.seePreg !== 0) {
						r += `${HeA} is visibly dripping seed and blissfully unaware of the curve beginning to form in ${hisA} abdomen.`;
					} else {
						r += `${HeA} is visibly dripping with need.`;
					}
					return r;
				},
				"slave professionalism": `${HeA} wears a flowing white linen dress that highlights ${hisA} grace.`,
				"petite admiration": `${HeA} wears a simple white linen dress that trails along after ${himA} when ${heA} walks. ${HeA}'s fine with this, since flying makes ${himA} look tall.`,
				"statuesque glorification": `${HeA} wears a long white linen dress, while concealing, shows off ${hisA} pleasant curves and long legs.`,
			},
			"cherub": {
				"default": ``,
				"paternalist": `${HeA} has swapped ${hisA} usual short skirt for a much longer one. No more panty flashes for you!`,
				"degradationist": `${HeA} is wearing black lipstick along with ${hisA} usual white linen dress with a short skirt. Occasionally you get a glance up that skirt; a dark black thong greets you.`,
				"supremacist": `${HeA} is wearing a cute little dress stitched with designs from ${V.arcologies[0].FSSupremacistRace} culture. Occasionally you get a glance up it; a white pair of panties with similar designs say hello.`,
				"subjugationist": `${HeA} is shackled to an iron ball and chain that's almost as big as ${heA} is, and ${heA} has to slowly and comically drag it behind ${himA} to get anywhere. Occasionally ${heA} tumbles over in ${hisA} struggles, flipping ${hisA} white linen dress up and treating you to a good look at ${hisA} panties.`,
				"roman revivalist": `${HeA} is wearing a cute little tunic. Occasionally you get a glance up it; a cute little pussy says hello.`,
				"neoimperialist": `${HeA} is wearing a tiny executive skirt that mixes cute and professional. ${HeA}'s obviously not wearing any panties underneath.`,
				"aztec revivalist": `${HeA} is wearing a huipil with ${hisA} hair braided to two ponytails. You can clearly see through the sides that ${heA} has chosen to forgo underwear.`,
				"egyptian revivalist": `${HeA} is wearing a simple white linen dress, kohl eyeshadow, and a serene expression. ${HisA} dress hangs low enough to block your view, unfortunately.`,
				"edo revivalist": `${HeA} is wearing a cute little kimono with slits for ${hisA} wings. Occasionally you get a glance up it; a lovely pair of panties say hello.`,
				"arabian revivalist": `${HeA} wears a fine dress, a silk headscarf, aviator sunglasses, and an overly conservative posture. No seeing up ${hisA} dress for you!`,
				"chinese revivalist": `${HeA} is wearing a conservative silk qipao with special slits for ${hisA} wings. ${HisA} hair is pulled back into a bun and secured by a couple of chopsticks. It you try really hard, you can get a peek of ${hisA} panties as ${heA} flutters by.`,
				"antebellum revivalist": `${HeA} is wearing a cute little white gown with cutouts for ${hisA} wings. It's practically transparent. A tiny, white thong barely obscures her little pussy.`,
				"chattel religionist": `${HeA} has adjusted ${hisA} outfit to consist of nothing but the symbol of your new religion carefully tailored to cover ${hisA} nipples and crotch. Another dangles from ${hisA} neck. ${HisA} attire leaves little to the imagination.`,
				"physical idealist": `${HeA} has chosen to ditch ${hisA} usual linen dress for nothing but ${hisA} undies in order to show off ${hisA} muscles.`,
				"hedonistic decadence": `${HeA} has become so plump lately that no amount of tugging will get ${hisA} linen dress to cover ${hisA} exposed panties. ${HeA} struggles to stay aloft with such a plush body.`,
				"repopulation focus": `${HeA} has chosen to ditch ${hisA} usual linen dress for just ${hisA} panties. ${HeA} struggles to fly with ${hisA} heavy pregnancy and milk-laden breasts.`,
				"eugenics": `${HeA} wears simple white linen dress with a short skirt that frequently lets you catch glimpses of ${hisA} chastity belt.`,
				"gender radicalist": `${HeA} wears simple white linen dress with a short skirt that frequently lets you catch glimpses of ${hisA} panties. ${HeA} has become rather boyish lately and you swear that there is a slight bulge in ${hisA} panties.`,
				"gender fundamentalist": `${HeA} wears a simple white linen dress that struggles to cover both ${hisA} full breasts and child-bearing hips. ${HisA} short skirt frequently rides you to give you a lovely view of ${hisA} panties.`,
				"asset expansionist": `${HeA} has recently taken to wearing nothing put ${hisA} panties, having given up on fitting into ${hisA} dress. ${HeA} struggles to fly with ${hisA} massive tits weighing ${himA} down, and ${heA} commonly has to pause to pull ${hisA} underwear out of ${hisA} buttcrack.`,
				"transformation fetishist": `${HeA} wears a simple white linen dress that struggles to cover both ${hisA} big fake breasts and ass. ${HisA} short skirt feebly rests atop ${hisA} panty devouring rear, giving you a lovely view.`,
				"pastoralist": `${HeA} has begun leaving the top of ${hisA} white linen dress open to allow ${hisA} milk-laden breasts to hang free. ${HeA} tends to leave a trail wherever ${heA} flies.`,
				"maturity preferentialist": `${HeA} has recently updated ${hisA} appearance to be more mature; an air of experience follows ${himA} as ${heA} flies around. ${HeA} a wears simple white linen dress with a short skirt that frequently lets you catch glimpses of ${hisA} panties; polka-dotted, oddly enough.`,
				"youth preferentialist": `${HeA} has recently updated ${hisA} appearance to be more youthful. ${HeA} frequently flutters by, enjoying ${hisA} youthful vigor. ${HeA} a wears simple white linen dress with a short skirt that frequently lets you catch glimpses of ${hisA} panties; an adorable pair of bloomers.`,
				"slimness enthusiast": `${HeA} wears simple white linen dress with a short skirt that hangs loosely off ${hisA} pleasantly thin body. ${HisA} panties are obviously a bit loose too, as ${heA} frequently has to stop, swoop down and retrieve them whenever they fall off ${hisA} flat ass.`,
				"body purist": `${HeA} has forgone covering ${himselfA} to allow ${hisA} radiant, pure body to be visible to all.`,
				"intellectual dependency": `${HeA} wears a simple white linen dress with a short skirt that frequently reminds you ${heA} forgot to wear panties.`,
				"slave professionalism": `${HeA} wears a simple white linen dress with a short skirt that allows ${himA} to expertly flash you ${hisA} pussy when you need it most.`,
				"petite admiration": `${HeA} wears a simple white linen dress with a short skirt, though ${heA}'s so short it may as well be a full length.`,
				"statuesque glorification": `${HeA} wears a simple white linen dress that struggles to come close to covering ${hisA} panties. ${HeA}'s gotten quite tall.`,
			},
			"imp": {
				"default": ``,
				"paternalist": `${HeA} has swapped to wearing much more, relatively speaking, modest clothing; extremely tight jeans and a top so small and taut you swear ${heA}'s about to pop out of it.`,
				"degradationist": `${HeA} has replaced ${hisA} loincloth with a chastity belt containing an immense dildo; it is clearly seen distending ${hisA} belly. Countless scars line ${hisA} back and ass from the frequent lashings ${heA} enjoys.`,
				get "supremacist"() {
					let r = [`${HeA}'s taken to carrying a cat o' nine tails whip at all times so that ${heA}'s ready to lash a`];
					if (V.arcologies[0].FSSupremacistRace === "mixed race") {
						r.push(`pureblooded`);
					} else {
						r.push(`non-${V.arcologies[0].FSSupremacistRace}`);
					}
					r.push(`slave at a moment's notice.`);
					return r.join(" ");
				},
				"subjugationist": `${HisA} cartoonishly exaggerated ${V.arcologies[0].FSSubjugationistRace} body is just begging for a whipping, even when ${heA} isn't doing something mischievous and sneaky, which is rare.`,
				"roman revivalist": `${HeA}'d fit in perfectly tormenting the condemned in Tartarus.`,
				"neoimperialist": `${HeA}'s bound ${himselfA} up with high-tech holographic chains, reminiscent of a slave locked in your cellblocks with ${hisA} devilish features.`,
				"aztec revivalist": `${HeA}'s taken to carrying a pair of ceremonial daggers perfect for bloodletting and even an impromptu sacrifice. Two things ${heA} really enjoys performing.`,
				"egyptian revivalist": `${HeA} has recently adjusted ${hisA} appearance to resemble an Egyptian slave; that combined with a manufactured rebellious streak are sure to earn ${himA} a whipping.`,
				"edo revivalist": `${HeA} has tightly bound ${himselfA} in shibari ropes, although they don't achieve much given ${heA} can still fly freely.`,
				"arabian revivalist": `${HeA} has donned the skimpiest, sluttiest outfit ${heA} could think of. ${HeA}'s just begging to get stoned.`,
				"chinese revivalist": `${HeA} has added a number of piercings to ${hisA} body to allow ${himA} to be suspended by hooks rather than flying.`,
				"antebellum revivalist": `${HeA} has chosen a lean and muscular form inspired by satanic Christian imagery: dark red skin and large, curling horns like a bull.`,
				"chattel religionist": `${HeA} has chosen to go fully naked, exposing the symbols of your religion pierced through ${hisA} nipples and clit.`,
				"physical idealist": `${HeA} has adjusted ${hisA} appearance to be rather muscular. Not only can ${heA} crack a whip harder than ever, but when ${heA} flexes, ${heA} nearly pops the belt around ${hisA} chest.`,
				"hedonistic decadence": `${HeA} has become rather chubby lately. ${HeA} may want to change up ${hisA} routine of tormenting the hungry by devouring food before them.`,
				"repopulation focus": `${HeA}'s added a pair of tight belts across ${hisA} stomach recently. The taut material painfully digs into ${hisA} growing pregnancy.`,
				"eugenics": `${HeA} has an iron chastity belt under ${hisA} loincloth and two large bulges in ${hisA} middle. You don't have to guess ${heA} has a pair of enormous dildos locked inside ${himA}.`,
				"gender radicalist": `${HeA}'s recently begun rendering ${himselfA} more androgynous. Something can be seen commonly tenting ${hisA} loincloth; whenever it shifts to the side, you catch sight of a thumb-sized and heavily pierced clitoris.`,
				"gender fundamentalist": `${HeA}'s recently increased the size of ${hisA} breasts and width of ${hisA} hips. The belt around ${hisA} chest tightly binds ${hisA} new bust and causes its flesh to bulge and jiggle delightfully.`,
				"asset expansionist": `${HeA}'s had to let out ${hisA} chest belt to accommodate ${hisA} new excessive bust, but only a little; the belt creates a deep canyon across ${hisA} chest with plenty of flesh bulging above and below the straining leather.`,
				"transformation fetishist": `${HeA}'s had to let out ${hisA} chest belt to accommodate ${hisA} new excessive bust, but only a little; the belt creates a deep canyon across ${hisA} fake chest and threatens to painfully pop the underlying implants.`,
				"pastoralist": `${HeA}'s exchanged ${hisA} chest belt for a pair of rings with leather straps. ${HeA} wears them so tightly every motion ${heA} makes forces a gush of milk from ${hisA} painfully swollen breasts.`,
				"maturity preferentialist": `${HeA} has recently updated ${hisA} appearance to be more mature; an air of experience follows ${himA} as ${heA} flies around. You can hear ${himA} plotting tortures, many you've never heard of.`,
				"youth preferentialist": `${HeA} has recently updated ${hisA} appearance to be more youthful. ${HeA} frequently flutters by, enjoying ${hisA} youthful vigor. ${HeA} looks so innocent, but looks can be deceiving!`,
				"slimness enthusiast": `${HisA} new, thinner body gives ${himA} plenty of excuses to pull ${hisA} straps even tighter.`,
				"body purist": `${HeA} has forgone covering ${himselfA} to allow ${hisA} sinful, pure body to be visible to all.`,
				"intellectual dependency": `${HeA} may look like a bumbling fool, but even an idiot can get a torture right every now and then.`,
				"slave professionalism": `${HeA}'s taken to carrying a box of needles to make use of ${hisA} extensive knowledge of anatomy. This is one acupuncture session you don't want a part of.`,
				"petite admiration": `${HisA} new, tiny body opens up a new realm of torments. You can hear ${himA} scheming about what holes ${heA} could theoretically force ${himselfA} up now.`,
				"statuesque glorification": `${HisA} new, giant body brings with it an even larger ego. No longer a mere imp, ${heA}'s a borderline devil.`,
			},
			"witch": {
				"default": ``,
				"paternalist": `${HeA} still hasn't managed to undo the spell; ${hisA} chest is still unnaturally smooth, not one nipple peaking the fabric of the robe.`,
				"degradationist": `${HeA} still hasn't managed to undo the spell; ${hisA} face, hands and every surface of ${hisA} body are completely covered in tattoos. It is especially noticeable when ${heA} talks that ${hisA} tongue is tattooed too; wonder what decorates the surfaces of ${hisA} body you can't see?`,
				get "supremacist"() {
					const r = [`${HeA}'s managed to correct the spell, and even succeed in it. ${HeA} is now`];
					if (V.arcologies[0].FSSupremacistRace === "mixed race") {
						r.push(`the perfect blend of every ethnicity, with all of their best qualities and none of their flaws.`);
					} else {
						r.push(`ethnically 100% pure ${V.arcologies[0].FSSupremacistRace}.`);
					}
					r.push(`If ${heA} were real, ${heA} would make the perfect breeding stock for the next generation of the master race.`);
					return r.join(" ");
				},
				"subjugationist": `${HeA} still hasn't managed to undo the spell; ${heA} looks like a racist caricature of ${V.arcologies[0].FSSubjugationistRace !== 0 ? addA(V.arcologies[0].FSSubjugationistRace) : ""} ${girlA}, and has an appropriately demeaning accent to match. What's worse, the spell also seems to have stripped most of ${hisA} literacy in ${V.language}, making reading ${hisA} tomes an arduous task for ${himA}.`,
				"roman revivalist": `While ${heA} acts like a typical Roman ${womanA}, ${heA} is pretty obviously Greek. ${HeA} can't even name the Pantheon correctly.`,
				"neoimperialist": `${HeA} looks like someone you would find selling "magical tokens" on the side of your neon-bathed streets, cybernetic trinkets adorning ${hisA} whole body.`,
				"aztec revivalist": `${HeA} is still very obviously not a native and has become rather caught up in the fear that ${heA}'ll soon be sacrificed.`,
				"egyptian revivalist": `${HeA}'s managed to untangle ${himselfA} from the wrappings, though ${heA} has chosen to leave several still wrapped around ${hisA} body.`,
				"edo revivalist": `${HeA}'s managed to correct the spell, somewhat, though ${heA} now resembles something that belongs in a hentai.`,
				"arabian revivalist": `${HeA}'s managed to correct the spell, and even succeed at it. ${HeA} has altered ${hisA} appearance to resemble a gorgeous djinn. ${HeA} is seductively performing a belly dance for you.`,
				"chinese revivalist": `${HeA} has chosen to embrace the outcome of ${hisA} spell, even pushing ${hisA} luck a little more, leaving ${himA} wearing a long and very fashionable qipao.`,
				"antebellum revivalist": `${HeA}'s managed to refine the spell and appears now as a gorgeous Southern belle, yet ${heA} exudes an unnatural aura. ${HeA} gives you a mischievous smile and lifts up ${hisA} skirt, exposing both ${hisA} pussy and occult markings covering ${hisA} skin.`,
				"chattel religionist": `${HeA} has chosen to embrace the outcome of ${hisA} spell, proudly displaying the various holy symbols hanging from around ${hisA} neck and dangling from ${hisA} nipples, navel and clit.`,
				"physical idealist": `${HeA} managed to regain freedom of movement, but has chosen to leave ${hisA} torn robes unfixed to further highlight ${hisA} ridiculous muscles.`,
				"hedonistic decadence": `${HeA} has managed to lighten ${hisA} body enough to regain mobility, but no amount of ${hisA} magic can summon a robe big enough to cover ${hisA} enormously fat body without looking ridiculous.`,
				get "repopulation focus"() {
					if (V.seeHyperPreg === 1) {
						return `${HeA}'s managed to cast a levitation spell to allow ${himA} to move and a spell to prevent ${himA} from bursting, but ${heA} can do nothing about the dozens of active children crowding ${hisA} womb. ${HeA} meekly floats along with it, gently rubbing its squirming mass through ${hisA} torn robe.`;
					} else {
						return `${HeA}'s managed to cast a spell to lighten ${hisA} belly, but ${heA} can do nothing about the rowdy octuplets crowding ${hisA} womb. ${HeA} meekly pats ${hisA} exposed belly, feebly trying to calm ${hisA} babies, as ${heA} looks up ways to mend ${hisA} torn dress.`;
					}
				},
				"eugenics": `${HeA} still hasn't managed to undo the spell; it's pretty obvious given how desperately horny ${heA} is.`,
				"gender radicalist": `${HeA} has chosen to embrace the outcome of ${hisA} spell; ${heA} either sports a bulge or a tent in the front of ${hisA} dress and can frequently be seen reading books on male anatomy.`,
				"gender fundamentalist": `${HeA} still hasn't managed to undo the spell; ${hisA} belly has become so swollen with ovum ${heA} looks ready to birth triplets. ${HeA} can barely concentrate; ${hisA} mind focused entirely on dicks cumming in ${hisA} wet pussy, but ${heA} can't risk it, knowing full well ${heA}'d become so pregnant ${heA}'d likely burst. ${HisA} ample breasts and child bearing hips only make it harder to keep away from cocks.`,
				"asset expansionist": `${HeA}'s managed to partially undo the spell; ${hisA} breasts are merely as big as ${heA} is now. One simple, correctly performed, levitation spell later and ${heA} is fully capable of functioning with ${hisA} oversized tits.`,
				"transformation fetishist": `While ${heA} has managed to regain ${hisA} flexibility, ${heA} still greatly resembles an overinflated blow-up doll. ${HisA} lips are stuck in an O shape, ${hisA} breasts are the size of beach balls, ${hisA} ass and thighs are larger than any ${girlA}'s you've seen, and above all else is ${hisA} huge medicine ball sized belly; fortunately they don't weigh nearly as much as they should, part of the benefits of being an inflatable sex-doll.`,
				"pastoralist": `${HeA}'s managed to shrink ${hisA} nine breasts somewhat; they are merely head-sized now. The front of ${hisA} robes is strained from ${hisA} excessive number of milky tits.`,
				"maturity preferentialist": `${HeA}'s managed to rein in ${hisA} aging spell, and with a little size up to ${hisA} breasts, hips, and ass, makes a very pleasant MILF.`,
				get "youth preferentialist"() {
					if (V.minimumSlaveAge === 3) {
						return `${HeA}'s adjusted ${hisA} tiny body slightly to be less feeble. Now ${heA} is a fully capable and adorable toddler witch in an oversized robe, though ${heA} has to fight to keep ${hisA} hat from covering ${hisA} entire head.`;
					} else if (V.minimumSlaveAge <= 7) {
						return `${HeA}'s decided to embrace ${hisA} spell and now appears as an adorable ${loliA} witch. ${HeA} has to watch ${hisA} step to not trip over ${hisA} trailing robe and has to constantly readjust ${hisA} head-devouring hat.`;
					} else if (V.minimumSlaveAge <= 12) {
						return `${HeA}'s decided to embrace ${hisA} spell and now appears as a cute preteen witch. ${HisA} robe is a little long, but ${heA} manages just fine.`;
					} else if (V.minimumSlaveAge < 18) {
						return `${HeA}'s decided to embrace ${hisA} spell and now appears as a budding teenaged witch.`;
					} else {
						return `${HeA}'s decided to embrace ${hisA} spell and now appears as a witch fresh into adulthood.`;
					}
				},
				"slimness enthusiast": `${HeA}'s begun wearing a corset under ${hisA} robes to hide ${hisA} chubbiness. Combined with ${hisA} lightened body, ${heA} manages to pull off the lithe look easily.`,
				"body purist": `${HeA} has attempted to fix ${hisA} misspell and succeeded in preventing ${hisA} clothes from becoming transparent, to ${himselfA} only. ${HeA} appears nude, even though ${heA} is fully clothed, much to everyone's enjoyment.`,
				"intellectual dependency": `${HeA} still hasn't managed to figure out that ${heA} drained ${hisA} intelligence; not that it matters when all your spells now have so many fun effects! (And you can't read.)`,
				"slave professionalism": `${HeA}'s managed to work out some of the kinks of the spell, though it's left ${himA} quite the perfectionist.`,
				"petite admiration": `${HeA}'s decided to embrace the shortening effect of ${hisA} spell, and with a strength booster, manages quite fine with ${hisA} proportionately mountainous tits.`,
				"statuesque glorification": `${HeA}'s managed to correct the spell, and even succeed in it. ${HeA} stands tall, proud at ${hisA} success.`,
			},
			"ERROR_1606_APPEARANCE_FILE_CORRUPT": {
				"default": ``,
				"paternalist": `wearing ill fitting clothing. Various movements can be seen under ${hisA} misbuttoned shirt and lopsided skirt.`,
				"degradationist": `wearing nothing except some oversized, strange looking piercings all over ${hisA} body. You swear you see movement under ${hisA} skin and ${hisA} piercings have a habit of never being in the same shape or location.`,
				"supremacist": `wearing nothing at all. ${HeA} looks vaguely ${V.arcologies[0].FSSupremacistRace}, but wrong. You swear you see patches of fish-like scales on ${hisA} skin, but they keep disappearing whenever you try to focus on them.`,
				"subjugationist": `wearing nothing at all. ${HeA} looks vaguely ${V.arcologies[0].FSSubjugationistRace}, but wrong. You swear you see patches of fish-like scales on ${hisA} skin, but they keep disappearing whenever you try to focus on them.`,
				"roman revivalist": `wearing a poorly folded toga. You swear you see movement under ${hisA} skin.`,
				"neoimperialist": `wearing a tight-fitting bodysuit that you swear moves in unsettling ways. Is the bodysuit moving, or the skin underneath?`,
				"aztec revivalist": `wearing a torn huipil. ${HeA} looks vaguely Aztec, but wrong. You swear you see movement under ${hisA} skin.`,
				"egyptian revivalist": `wearing nothing at all. ${HeA} looks vaguely Egyptian, but wrong. You swear you see movement under ${hisA} skin.`,
				"edo revivalist": `wearing a loose kimono. ${HeA} looks vaguely Japanese, but wrong. You swear you see movement under ${hisA} skin.`,
				"arabian revivalist": `wearing various silks. ${HeA} looks vaguely Arabic, but wrong. You swear you see movement under ${hisA} skin.`,
				"chinese revivalist": `wearing an ill fitting qipao. ${HeA} looks vaguely Chinese, but wrong. You swear you see movement under ${hisA} clothing and even skin.`,
				"antebellum revivalist": `wearing a poorly fitted ball gown. ${HeA} looks vaguely Southern, but wrong. You wear you see movement under ${hisA} skin.`,
				"chattel religionist": `wearing nothing at all. A pulsing symbol of your religion sprouts from ${hisA} chest, runs between ${hisA} breasts and down to ${hisA} crotch, where it penetrates ${hisA} pussy. If the symbol weren't off-putting enough, you also swear you see movement under ${hisA} skin.`,
				"physical idealist": `wearing nothing at all. ${HeA} is covered in what appear to be muscles, though they bulge and squirm uncomfortably.`,
				"hedonistic decadence": `wearing nothing at all. ${HeA} is covered in what appears to be a dense layer of fat, though occasionally you swear you see something peering out from between ${hisA} folds.`,
				get "repopulation focus"() {
					if (V.seeHyperPreg === 1) {
						return `wearing nothing at all. ${HisA} belly is immensely swollen, squirming and practically ready to burst. ${HisA} navel resembles a pussy; a pussy birthing countless larva like creatures.`;
					} else {
						return `wearing nothing at all. ${HisA} belly is rounded and squirming in some state of gravidity. Every so often ${hisA} navel spreads apart and a wormlike creature flops out.`;
					}
				},
				"eugenics": `wearing nothing at all. You can't take your eyes off of ${hisA} perfect body, but at the same time, you feel a strange sense of danger about ${himA}.`,
				"gender radicalist": `wearing nothing at all. Even though ${heA} lacks a penis, you can't shake the feeling that it's a trap.`,
				"gender fundamentalist": `full breasts, wide hips, and no clothing at all. You swear ${hisA} tits are moving slightly and an unusual bulge can be seen writhing in ${hisA} lower belly.`,
				"asset expansionist": `wearing nothing at all, not that anything could fit ${himA}. ${HeA} is absolutely massive, ${hisA} breasts easily dwarfing the rest of ${hisA} body and quivering obscenely. Every so often, a bulge moves up a nipple as a wormlike creature is born into the world.`,
				"transformation fetishist": `wearing nothing at all, not that anything could fit ${himA}. ${HisA} breasts and ass are splitting around the massive, round objects distending them. The orbs are slightly translucent; lots of small wormlike creatures can be seen squirming within.`,
				"pastoralist": `wearing nothing at all, not that anything could fit ${himA}. ${HeA} is absolutely massive, ${hisA} breasts easily dwarfing the rest of ${hisA} body and quivering obscenely. An extremely dense, white liquid is steadily forcing its way from ${hisA} gaping nipples.`,
				"maturity preferentialist": `wearing nothing at all. ${HeA} seems to be quite old and vulnerable, but something feels off about ${himA}.`,
				get "youth preferentialist"() {
					const r = [`wearing nothing at all.`];
					if (V.minimumSlaveAge === 3) {
						r.push(`${HeA}'s an adorable toddler just ripe for the taking, though a feeling of danger radiates from ${hisA} tiny body.`);
					} else if (V.minimumSlaveAge <= 7) {
						r.push(`${HeA}'s a cute ${loliA} and ripe for the taking, though a feeling of danger radiates from ${hisA} small body.`);
					} else if (V.minimumSlaveAge <= 12) {
						r.push(`${HeA}'s a charming preteen and ripe for the taking, though a feeling of danger radiates from ${hisA} growing body.`);
					} else if (V.minimumSlaveAge < 18) {
						r.push(`${HeA}'s a pretty teenager and ripe for the taking, though a feeling of danger radiates from ${himA}.`);
					} else {
						r.push(`${HeA} seems to be fresh into adulthood and ripe for the taking, though a feeling of danger radiates from ${himA}.`);
					}
					return r.join(" ");
				},
				"slimness enthusiast": `wearing nothing at all. ${HeA} is extremely thin; multiple tube-like appendages can be seen writhing within ${hisA} compressed body.`,
				"body purist": `wearing nothing at all. ${HisA} body is absolutely flawless, too flawless; you can't help but feel a sense of discomfort when looking at ${himA}.`,
				"intellectual dependency": `wearing nothing at all. ${HeA} seems to be lost, in desperate need of sex and ripe for the taking; though a feeling of danger radiates from ${himA}.`,
				"slave professionalism": `wearing an alluring outfit and beckoning to you. ${HeA} promises a night you'll never forget. Ever.`,
				"petite admiration": `wearing nothing at all. ${HeA}'s so tiny ${heA} could be taken with ease; in fact, that seems to be exactly what ${heA} wants.`,
				"statuesque glorification": `wearing nothing at all; it would only get in the way of ${himA} preying on all those smaller than ${hisA} looming form.`,
			},
			"incubus": {
				"default": ``,
				"paternalist": `${HeA}'s begun wearing rather conservative clothing, but nothing can hide the bulge running down one pant leg and the two round globes in the other.`,
				"degradationist": `${HeA}'s recently added an obscene number of piercings to ${hisA} cock and balls in addition to a pair of nipple rings. A thin chain links a ring attached to the head of ${hisA} penis to the heavy rings adorning ${hisA} chest.`,
				"supremacist": `${HeA} is an ideal ${V.arcologies[0].FSSupremacistRace} man, and ${hisA} massive dick is always hard and ready to continue propagating the master race.`,
				"subjugationist": `${HeA} is a deceptively handsome ${V.arcologies[0].FSSubjugationistRace} man, and gives off an air of lust and danger that serves as a warning to not let the inferior race's libido run unchecked.`,
				"roman revivalist": `${HeA} is an ideal Roman man, complete with something big and heavy hanging under ${hisA} toga.`,
				"neoimperialist": `${HeA} looks like an ideal Imperial Knight, wearing tight leather pants and a nanoweave shirt that fail to contain both his rippling pectorals and the outline of a massive cock.`,
				"aztec revivalist": `${HeA} is an ideal Aztec man wearing a headdress and a loincloth, which can't hide ${hisA} enviable package.`,
				"egyptian revivalist": `${HeA} is an ideal Egyptian man, complete with something big and heavy dangling behind ${hisA} loincloth.`,
				"edo revivalist": `${HeA} is an ideal Japanese man, complete with something big and heavy between ${hisA} legs.`,
				"arabian revivalist": `${HeA} is an ideal Arabian man, complete with something big and heavy filling out ${hisA} silken pants.`,
				"chinese revivalist": `${HeA} is an ideal Chinese man, complete with something big and heavy between ${hisA} legs.`,
				"antebellum revivalist": `${HeA} is an ideal Southern man, complete with something big and heavy between ${hisA} legs.`,
				"chattel religionist": `${HeA} is wearing nothing but an immense erection. ${HisA} balls visibly pulse, begging for release, but ${hisA} load is blocked by a large plug capped with the symbol of your new religion. One pull is all it would take to bathe in ${hisA} blessing.`,
				"physical idealist": `${HeA} is wearing nothing but an immense erection and is coated in the perfect amount of muscle.`,
				"hedonistic decadence": `${HeA} is wearing nothing but an immense erection and is coated in the perfect amount of fat.`,
				"repopulation focus": `${HisA} belly is round with child and is in a constant struggle with ${hisA} erect cock over which gets to protrude out ${hisA} front.`,
				get "eugenics"() {
					const r = [`${HeA}'s become even more irresistible lately;`];
					if (V.PC.vagina !== -1) {
						r.push(`you can't help but think of that perfect cock cumming deep in your pussy, and your belly rounding with a gorgeous child.`);
					} else {
						r.push(`the children sired by such a stud are unimaginable.`);
					}
					return r.join(" ");
				},
				get "gender radicalist"() {
					if (V.arcologies[0].FSGenderRadicalistLawFuta === 1) {
						return `${HeA} is wearing nothing at all, and has recently rendered ${himselfA} slightly more feminine. ${HeA} makes sure to make exaggerated motions to show off the pussy hidden beneath ${hisA} swinging nuts.`;
					} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 2) {
						return `${HeA} has recently increased the size of ${hisA} genitals and has given up trying to wear pants; they just get in the way of ${hisA} prominent erection.`;
					} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
						return `${HeA} is wearing nothing at all, not that anything could fit ${himA}. ${HisA} cock and balls are utterly dwarfed by ${hisA} door-jamming hips, massive ass, and extra thick thighs.`;
					} else if (V.arcologies[0].FSGenderRadicalistLawFuta === 4) {
						return `${HeA} is wearing loose clothing and has recently rendered ${himselfA} slightly more feminine. ${HeA} does ${hisA} best to appear the perfect little femboy despite what's slipping down ${hisA} pant leg.`;
					} else {
						return `${HeA} is wearing nothing at all and has recently rendered ${himselfA} even more handsome, since ${heA} was already a perfect fit for society.`;
					}
				},
				"gender fundamentalist": `${HeA} is wearing a cute dress that tightly hugs ${hisA} attractive curves. ${HeA} may be rendering ${himselfA} more feminine, but can't hide the bulge under ${hisA} skirt.`,
				"asset expansionist": `${HeA} is wearing nothing at all, not that anything could fit ${himA}. ${HisA} cock and balls are so large they reach the ground when ${heA} stands.`,
				"transformation fetishist": `${HeA} is wearing jeans and a tight shirt. ${HisA} overly long erection runs up ${hisA} front and protrudes out the neck of ${hisA} top.`,
				"pastoralist": `${HeA} is wearing nothing at all, not that anything could fit ${himA}. ${HisA} balls are absolutely massive; ${hisA} sizable cock looks tiny resting atop them. ${HeA} can barely take a step without overstimulating and orgasming across ${hisA} sack.`,
				"maturity preferentialist": `${HeA} has recently begun presenting ${himselfA} as an experienced, mature man with an oddly familiar mustache and goatee.`,
				get "youth preferentialist"() {
					const r = [`${HeA} has recently adjusted ${hisA} age to reflect your youth-focused society.`];
					if (V.minimumSlaveAge === 3) {
						r.push(`${HeA}'s an adorable toddler with an enormous cock hanging from ${hisA} shorts.`);
					} else if (V.minimumSlaveAge <= 7) {
						r.push(`${HeA}'s a cute shota with ball-filled shorts and a huge erection sneaking up ${hisA} shirt.`);
					} else if (V.minimumSlaveAge <= 12) {
						r.push(`${HeA}'s a charming preteen with a scandalous bulge running more than halfway down ${hisA} pant leg.`);
					} else if (V.minimumSlaveAge < 18) {
						r.push(`${HeA}'s an attractive teenager with an immodest bulge running down ${hisA} pant leg.`);
					} else {
						r.push(`${HeA}'s an attractive young adult with an immodest bulge running down ${hisA} pant leg.`);
					}
					return r.join(" ");
				},
				"slimness enthusiast": `${HeA} has recently slimmed ${hisA} body down; everywhere but ${hisA} proportionally huge cock, that is.`,
				"body purist": `${HeA} is wearing nothing at all, happy to show off ${hisA} flawless body. ${HisA} cock and balls are now the ideal size to penetrate a natural girl.`,
				get "intellectual dependency"() {
					if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
						return `${HeA} is wearing nothing but a pair of jeans, with the fly down to let ${hisA} junk hang loose. ${HeA} likes ${hisA} sex simple and straightforward. (The button is too difficult for ${himA}.)`;
					} else {
						return `${HeA} is wearing nothing at all; it would just get in the way. ${HeA}'s hard and ready to go, not that ${heA} could think of anything else to do.`;
					}
				},
				"slave professionalism": `${HeA} is wearing a fine suit and ready to offer a deal no one could refuse.`,
				"petite admiration": `${HeA} is wearing nothing at all and has recently rendered ${himselfA} quite short; the perfect height to slip through a crowd, unseen and slapping booty.`,
				"statuesque glorification": `${HeA} is wearing nothing at all and has recently rendered ${himselfA} quite tall, so tall, in fact, that few can stop ${himA} from sticking ${hisA} cock in their face.`,
			},
			"succubus": {
				"default": ``,
				"paternalist": `${HeA}'s wearing an absolutely stunning dress that perfectly hugs ${hisA} curves. Surprisingly, ${heA} even has underwear on.`,
				"degradationist": `${HeA}'s recently added an obscene number of piercings to ${hisA} labia in addition to a pair of nipple rings and a big, heavy ring on ${hisA} clit. A thin chain links the clit ring to the heavy rings adorning ${hisA} chest.`,
				"supremacist": `In fact, ${heA} is the most gorgeous ${V.arcologies[0].FSSupremacistRace} ${womanA} you've ever seen.`,
				"subjugationist": `In fact, ${heA} is the most gorgeous ${V.arcologies[0].FSSubjugationistRace} ${womanA} you've ever seen.`,
				"roman revivalist": `In fact, ${heA} is the most gorgeous Roman ${womanA} you've ever seen.`,
				"neoimperialist": `In fact, ${heA} is the most gorgeous Imperial ${womanA} you've ever seen.`,
				"aztec revivalist": `In fact, ${heA} is the most gorgeous Aztec ${womanA} you've ever seen.`,
				"egyptian revivalist": `In fact, ${heA} is the most gorgeous Egyptian ${womanA} you've ever seen.`,
				"edo revivalist": `In fact, ${heA} is the most gorgeous Japanese ${womanA} you've ever seen.`,
				"arabian revivalist": `In fact, ${heA} is the most gorgeous Arabic ${womanA} you've ever seen.`,
				"chinese revivalist": `In fact, ${heA} is the most gorgeous Chinese ${womanA} you've ever seen.`,
				"antebellum revivalist": `In fact, ${heA} is the most gorgeous Southern ${womanA} you've ever seen.`,
				"chattel religionist": `${HeA} is wearing a tight dress modeled after the symbol of your new religion; it leaves ${hisA} nipples and crotch fully exposed.`,
				get "physical idealist"() {
					if (V.arcologies[0].FSPhysicalIdealistStrongFat === 1) {
						return `${HeA} is wearing nothing but a thong barely visible under ${hisA} thick layer of fat. ${HisA} soft figure hides ${hisA} immense strength.`;
					} else {
						return `${HeA} is wearing nothing but a tight thong to show off ${hisA} perfectly muscled body.`;
					}
				},
				get "hedonistic decadence"() {
					const r = [`${HeA} is wearing nothing, opting let to ${hisA} fat belly cover ${hisA} privates.`];
					if (V.arcologies[0].FSHedonisticDecadenceStrongFat === 1) {
						r.push(`${HeA} may look soft and squishy, but ${hisA} thick flab hides ${hisA} immense musculature.`);
					}
					return r.join(" ");
				},
				"repopulation focus": `${HeA} is wearing an overly taut dress that clings tightly to ${hisA} triplet rounded middle and milk-laden breasts. ${HeA} is positively glowing with motherhood.`,
				get "eugenics"() {
					const r = [`${HeA}'s become even more irresistible lately;`];
					if (V.PC.dick !== 0) {
						r.push(`you can't help but fantasize about fucking ${himA} pregnant with your perfect child.`);
					} else {
						r.push(`you can't help but feel slightly envious of ${hisA} body.`);
					}
					return r.join(" ");
				},
				get "gender radicalist"() {
					if (V.arcologies[0].FSGenderRadicalistLawFuta === 3) {
						return `${HeA} is wearing an amazingly ill-fitting pair of stretch pants barely pulled midway over ${hisA} ass. ${HisA} door-jamming hips, massive rear and extra thick thighs jiggle spectacularly under the strained material.`;
					} else {
						return `${HeA} is wearing baggy pants and a loose fitting shirt. Having altered ${hisA} appearance to be alluringly androgynous, it is hard to make out ${hisA} gender at a glance.`;
					}
				},
				"gender fundamentalist": `${HeA} is wearing a form fitting dress that emphasizes ${hisA} feminine curves. A gorgeous sight, given that ${heA} has recently adjusted ${hisA} body to be a lovely future mother.`,
				"asset expansionist": `${HeA} is wearing nothing at all, not that anything could fit ${himA}. ${HisA} breasts nearly touch the ground when ${heA} stands, yet are naturally perky. ${HisA} butt is so enormous it is a wonder ${heA} can even walk.`,
				"transformation fetishist": `${HeA} is wearing a minidress so tight it fully outlines ${hisA} huge butt implants and barely contains the lower half of ${hisA} beach ball sized tits.`,
				"pastoralist": `${HeA} is wearing a pair of cow-print bikinis over ${hisA} head-sized breasts. A quartet of wet spots adorn ${hisA} tops at all times.`,
				"maturity preferentialist": `${HeA} has recently begun presenting ${himselfA} as an experienced, mature ${womanA}; one can only wonder what positions and tricks ${heA} knows.`,
				get "youth preferentialist"() {
					const r = [`${HeA} has recently adjusted ${hisA} age to reflect your youth-focused society.`];
					if (V.minimumSlaveAge === 3) {
						r.push(`${HeA}'s an adorable toddler wearing a cute pink dress.`);
					} else if (V.minimumSlaveAge <= 7) {
						r.push(`${HeA}'s a cute ${loliA} wearing tight, crotch-hugging spats and a tight tube top across ${hisA} flat chest.`);
					} else if (V.minimumSlaveAge <= 12) {
						r.push(`${HeA}'s a charming preteen wearing tight denim shorts and a loose crop top across the tiny buds of ${hisA} chest.`);
					} else if (V.minimumSlaveAge < 18) {
						r.push(`${HeA}'s an attractive teenager wearing short shorts and a sheer top that shows off ${hisA} newly grown breasts.`);
					} else {
						r.push(`${HeA}'s an attractive young adult wearing a sheer dress that shows off ${hisA} youthful curves.`);
					}
					return r.join(" ");
				},
				get "slimness enthusiast"() {
					if (V.arcologies[0].FSSlimnessEnthusiastLaw === 1) {
						return `${HeA} has recently slimmed ${hisA} body down tremendously; ${hisA} breasts are flat as can be, as is ${hisA} rear. ${HeA} enjoys wearing an extremely thin string bikini that tightly hugs ${hisA} body and barely covers ${hisA} non-existent assets.`;
					} else {
						return `${HeA} has recently slimmed ${hisA} body down and begun wearing form fitting clothing to show off ${hisA} lithe figure.`;
					}
				},
				"body purist": `${HeA} is wearing nothing at all, happy to show off ${hisA} flawless body. ${HisA} curves are perfect; it's the only way to describe ${himA}.`,
				get "intellectual dependency"() {
					const r = [`${HeA} is wearing nothing at all; clothes would just get in the way.`];
					if (V.arcologies[0].FSIntellectualDependencyLawBeauty === 1) {
						r.push(`${HisA} lavish makeup, long nails, luxurious hair,`);
						if (V.arcologies[0].FSSlimnessEnthusiastLaw !== 1) {
							if (!FutureSocieties.isActive('FSSlimnessEnthusiast')) {
								if (FutureSocieties.isActive('FSAssetExpansionist') || FutureSocieties.isActive('FSTransformationFetishist')) {
									r.push(`heaving`);
									if (FutureSocieties.isActive('FSTransformationFetishist')) {
										r.push(`fake`);
									}
									r.push(`tits, downright massive`);
									if (FutureSocieties.isActive('FSTransformationFetishist')) {
										r.push(`implant-filled`);
									}
									r.push(`ass,`);
								} else {
									r.push(`huge tits, fat ass,`);
								}
							} else {
								if (FutureSocieties.isActive('FSTransformationFetishist')) {
									r.push(`breast implants, fake ass,`);
								} else {
									r.push(`tits pushing the boundary of good taste, nearly obscene ass,`);
								}
							}
						}
						if (FutureSocieties.isActive('FSRepopulationFocus')) {
							r.push(`baby bump,`);
						}
						r.push(`narrow waist, and huge dicksucking lips spell out 'bimbo' far better than ${heA} ever could.`);
					} else {
						r.push(`${HeA}'s moist and ready to go, not that ${heA} could think of anything else to do.`);
					}
					return r.join(" ");
				},
				"slave professionalism": `${HeA}'s wearing an absolutely stunning dress that perfectly hugs and accentuates ${hisA} curves. An air of expertise emanates from ${himA} and promises an unbelievable night.`,
				"petite admiration": `${HeA} has recently lowered ${hisA} height considerably and is now the perfect size to copulate while sitting in one's lap.`,
				"statuesque glorification": `${HeA} has recently increased ${hisA} height considerably and begun wearing clothing that showcases the length of ${hisA} body and legs.`,
			},
			"cowgirl": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
			"harpygirl": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
			"kitsunegirl": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
			"lamiagirl": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
			"spidergirl": {
				"default": ``,
				"paternalist": ``,
				"degradationist": ``,
				supremacist: ``,
				subjugationist: ``,
				"roman revivalist": ``,
				"neoimperialist": ``,
				"aztec revivalist": ``,
				"egyptian revivalist": ``,
				"edo revivalist": ``,
				"arabian revivalist": ``,
				"chinese revivalist": ``,
				"antebellum revivalist": ``,
				"chattel religionist": ``,
				"repopulation focus": ``,
				"eugenics": ``,
				"physical idealist": ``,
				"hedonistic decadence": ``,
				"gender radicalist": ``,
				"gender fundamentalist": ``,
				"asset expansionist": ``,
				"transformation fetishist": ``,
				"pastoralist": ``,
				"maturity preferentialist": ``,
				"youth preferentialist": ``,
				"slimness enthusiast": ``,
				"body purist": ``,
				"intellectual dependency": ``,
				"slave professionalism": ``,
				"petite admiration": ``,
				"statuesque glorification": ``,
			},
		};
		return fsAppearance[V.assistant.appearance][V.assistant.fsAppearance];
	}
};

globalThis.assistantFS = function() {
	const el = new DocumentFragment();
	for (const FS of App.Data.Assistant.appearanceForFS.keys()) {
		if (FutureSocieties.isActive(FS)) {
			const linkArray = [];
			const div = document.createElement("div");
			div.append(App.Data.FutureSociety.records[FS].noun, " likes: ");

			for (const appearance of App.Data.Assistant.appearanceForFS.get(FS)) {
				if (App.Data.Assistant.appearances.get(appearance).requirements) {
					if (V.assistant.appearance === appearance) {
						linkArray.push(
							App.UI.DOM.disabledLink(
								capFirstChar(appearance),
								["Currently Selected"]
							)
						);
					} else {
						linkArray.push(
							App.UI.DOM.link(
								capFirstChar(appearance),
								() => {
									V.assistant.appearance = appearance;
									App.UI.reload();
								}
							)
						);
					}
				}
			}

			for (let i = 0; i < linkArray.length; i++) {
				div.append(linkArray[i]);
				if (i === linkArray.length - 2) {
					div.append(" and ");
				} else if (i === linkArray.length - 1) {
					div.append(".");
				} else {
					div.append(", ");
				}
			}
			el.append(div);
		}
	}
	return el;
};

globalThis.availableAssistantAppearances = function() {
	const el = document.createElement("div");
	const {hisA} = getPronouns(assistant.pronouns().main).appendSuffix('A');
	el.append(`Select ${hisA} appearance: `);

	const options = [];
	for (const [appearance, obj] of App.Data.Assistant.appearances) {
		if (obj.requirements) {
			options.push({key: appearance, name: capFirstChar(appearance)});
		}
	}
	el.append(App.UI.DOM.makeSelect(options, V.assistant.appearance, appearance => {
		V.assistant.appearance =/** @type {assistantAppearance} */ (appearance);
		App.UI.reload();
	}));

	return el;
};

globalThis.customAssistantImage = function() {
	const {himA} = getPronouns(assistant.pronouns().main).appendSuffix("A");
	let el = document.createElement('p');
	el.append(`Assign ${himA} a custom image: `);

	const textbox = document.createElement("input");
	textbox.value = V.assistant.customImage ? V.assistant.customImage.filename : "";
	el.appendChild(textbox);

	let kbd = document.createElement('kbd');
	const select = document.createElement('select');
	select.style.border = "none";

	[
		"png",
		"jpg",
		"gif",
		"webm",
		"webp",
		"mp4"
	].forEach((fileType) => {
		const el = document.createElement('option');
		el.value = fileType;
		el.text = fileType.toUpperCase();
		select.add(el);
	});
	select.value = V.assistant.customImage ? V.assistant.customImage.format : "png";

	kbd.append(`.`);
	kbd.appendChild(select);
	el.appendChild(kbd);

	el.appendChild(
		App.UI.DOM.link(
			` Reset`,
			() => {
				V.assistant.customImage = null;
				App.UI.reload();
			},
		)
	);

	let choices = document.createElement('div');
	choices.className = "choices";
	let note = document.createElement('span');
	note.className = "note";
	note.append(`Place file in the `);
	note.appendChild(App.UI.DOM.makeElement('kbd', 'resources'));
	note.append(` folder. Choose the extension from the menu first, then enter the filename in the space and press enter. For example, for a file with the path `);
	note.appendChild(App.UI.DOM.makeElement('kbd', `\\bin\\resources\\assistant slimegirl.png`));
	note.append(`, choose `);
	note.appendChild(App.UI.DOM.makeElement('kbd', 'png'));
	note.append(` then enter `);
	note.appendChild(App.UI.DOM.makeElement('kbd', 'assistant slimegirl'));
	note.append(`.`);

	choices.appendChild(note);
	el.appendChild(choices);

	textbox.onchange = () => {
		if (textbox.value.length === 0) {
			V.assistant.customImage = null;
		} else {
			if (!V.assistant.customImage) {
				V.assistant.customImage = {
					filename: textbox.value,
					format: /** @type {FC.ImageFormat} */ (select.value)
				};
			} else {
				V.assistant.customImage.filename = textbox.value;
			}
			App.UI.reload();
		}
	};
	select.onchange = () => {
		if (!V.assistant.customImage) {
			V.assistant.customImage.format = /** @type {FC.ImageFormat} */ (select.value);
		}
	};

	return el;
};
