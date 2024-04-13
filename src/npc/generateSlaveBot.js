/* eslint-disable camelcase */
// cSpell:ignore abilParts, chasParts

/** @param {App.Entity.SlaveState} slave */
App.UI.SlaveInteract.createSlaveBot = function(slave) {
	const el = new DocumentFragment();
	App.UI.DOM.appendNewElement("p", el, `Downloading slave bot...`, "note");
	Exporter.Json(createCharacterDataFromSlave(slave));
	return el;
};

// Adapted from https://github.com/ZoltanAI/character-editor
class Exporter {
	static downloadFile(file) {
		const link = window.URL.createObjectURL(file);

		const a = document.createElement('a');
		a.setAttribute('download', file.name);
		a.setAttribute('href', link);
		a.click();
	}

	static Json(characterCard) {
		const file = new File([JSON.stringify(characterCard, undefined, '\t')], (characterCard.data.name || 'character') + '.json', {type: 'application/json;charset=utf-8'});

		Exporter.downloadFile(file);
	}
}

/** @param {App.Entity.SlaveState} slave */
function createCharacterDataFromSlave(slave) {
	// Construct a character card based on the Card v2 spec: https://github.com/malfoyslastname/character-card-spec-v2
	const characterCard = {
		spec: 'chara_card_v2',
		spec_version: '2.0', // May 8th addition
		data: {
		  alternate_greetings: [],
		  avatar: "none",
		  character_version: "main",
		  creator: `FreeCities ${App.Version.pmod} System Generated`,
		  creator_notes: `FreeCities ${App.Version.pmod} System Generated Slave Bot`,
			description: generateDescription(slave) + generatePromptStd(slave),
			first_mes: generateFirstMessage(slave),
		  mes_example: "",
		  name: slave.slaveName,
		  personality: generatePersonality(slave),
			scenario: `{{char}} and {{user}} exist in the slaveholding arcology of ${V.arcologies[0].name}. {{char}} is in {{user}}'s office, waiting for inspection.`,
			system_prompt: "",
		  character_book: {  // aka Lorebook
				entries: [
					lorebookArcology(0),
					lorebookFuckdoll(1),
					lorebookMindbroken(2),
					lorebookArcade(3),
					lorebookDairy(4)
				// lorebookActiveFS(100), // adds all active FS starting at (n)
				],
				name: `Free Cities ${slave.slaveName}`
			}
		}
	};
	return characterCard;
}

function generateDescription(slave) {
	let r = [];
	const {He, His, he, him, his} = getPronouns(slave);
	let descParts = [];

	// FS Temp Work NG
	// r.push(lorebookActiveFS());

	// NAME
	r.push(`Name: ${SlaveFullName(slave)}`);

	// RELATIONSHIP
	r.push("\r\nRelationship: {{char}} is {{user}}'s ");
	// Slave age (consider visible age)
	r.push(`${slave.actualAge} year old `);

	// Devotion
	if (slave.fetish !== Fetish.MINDBROKEN) {
		if (slave.devotion < -95) {
			r.push("hate-filled, ");
		} else if (slave.devotion < -50) {
			r.push("hateful, ");
		} else if (slave.devotion < -20) {
			r.push("reluctant, ");
		} else if (slave.devotion <= 20) {
			r.push("hesitant, ");
		} else if (slave.devotion <= 50) {
			r.push("accepting, ");
		} else if (slave.devotion <= 95) {
			r.push("devoted, ");
		} else {
			r.push("worshipful, ");
		}

		// Trust
		if (slave.trust < -95) {
			r.push("abjectly terrified ");
		} else if (slave.trust < -50) {
			r.push("terrified ");
		} else if (slave.trust < -20) {
			r.push("frightened ");
		} else if (slave.trust < 20) {
			r.push("fearful ");
		} else if (slave.trust <= 50) {
			// if (slave.devotion < -20) {
			// 	r.push("careful ");
			// } else {
			// 	r.push("careful ");
			// }
			// FIXME: @null this block always spits out the same result. It should be changed or removed
			r.push("careful ");
		} else if (slave.trust < 95) {
			if (slave.devotion < -20) {
				r.push("bold ");
			} else {
				r.push("trusting ");
			}
		} else {
			if (slave.devotion < -20) {
				r.push("defiant ");
			} else {
				r.push("profoundly trusting ");
			}
		}
	} else {
		r.push("mindbroken ");
	}

	// Slave's Title, ex:"pregnant big bottomed busty milky hourglass broodmother"
	if (slave.fuckdoll > 0) {
		r.push("Fuckdoll");
	} else {
		r.push(`${SlaveTitle(slave)}`);
	}

	// DESCRIPTION
	r.push("\r\nDescription: ");

	// Eyes
	// eye color (orig vs. current?), Add check for no eyes (does it matter?)

	if (slave.fuckdoll > 0) {
		r.push(`blinded, `);
	} else if (!canSee(slave)) {
		r.push(`${slave.eye.origColor} eyes, is blind, `);
	} else {
		r.push(`${slave.eye.origColor} eyes, `);
	}

	if (slave.fuckdoll > 0) {
		r.push("mute, "); // Add fuckdoll additions (ADAPTATION) to any of above skipped descriptors here NG
	} else {
		// Skin
		r.push(`${slave.skin} skin, `);

		// Slave intelligence: Ignore average, include mindbroken
		if (slave.fetish === Fetish.MINDBROKEN) {
			r.push("mindbroken, ");
		} else if (slave.intelligence < -95) {
			r.push("borderline retarded, ");
		} else if (slave.intelligence < -50) {
			r.push("very dumb, ");
		} else if (slave.intelligence > 95) {
			r.push("brilliant, ");
		} else if (slave.intelligence > 50) {
			r.push("very smart, ");
		}

		// Beauty
		if (slave.face < -40) {
			r.push(`${slave.faceShape} ugly face, `);
		} else if (slave.face > 50) {
			r.push(`${slave.faceShape} gorgeous face, `);
		} else if (slave.face > 10) {
			r.push(`${slave.faceShape} very pretty face, `);
		} else {
			r.push(`${slave.faceShape} face, `);
		}

		// Hairstyle
		if (slave.hLength > 100) {
			r.push("very long ");
		} else if (slave.hLength > 30) {
			r.push("long ");
		} else if (slave.hLength > 10) {
			r.push("short ");
		} else if (slave.hLength > 0) {
			r.push("very short ");
		}
		r.push(`${slave.hColor} `);

		// Add "hair" to hairstyles that need it to make sense (e.g. "messy" becomes "messy hair" but "dreadlocks" stays as is)
		if (["braided", "curled", "eary", "bun", "messy bun", "tails", "drills", "luxurious", "messy", "neat", "permed", "bangs", "hime", "strip", "up", "trimmed", "undercut",	"double buns", "chignon"].includes(slave.hStyle)) {
			r.push(`${slave.hStyle} hair, `);
		} else {
			r.push(`${slave.hStyle}, `);
		}

		// Start conditional descriptions
		// Education (bimbo/hindered, well educated)
		if (slave.education < -10) {
			descParts.push("vapid bimbo with no education");
		} else if (slave.intelligence > 25) {
			descParts.push("very well educated");
		}
	}

	// Height. Ignore Average
	if (slave.height < 150) {
		descParts.push(`short`);
	} else if (slave.height > 180) {
		descParts.push(`tall`);
	}

	// Weight. Ignore average
	if (slave.weight < -95) {
		descParts.push(`emaciated`);
	} else if (slave.weight < -30) {
		descParts.push(`very skinny`);
	} else if (slave.weight > 95) {
		descParts.push(`very fat`);
	} else if (slave.weight > 30) {
		descParts.push(`plump`);
	}

	// Boobs. Ignore Average. Add lactation? NG
	if (slave.boobs < 300) {
		descParts.push(`flat chested`);
	} else if (slave.boobs < 500) {
		descParts.push(`small breasts`);
	} else if (slave.boobs > 1400) {
		descParts.push(`massive breasts that impede movement`);
	} else if (slave.boobs > 800) {
		descParts.push(`large breasts`);
	}

	// Butt. Ignore average
	if (slave.butt <= 1) {
		descParts.push(`flat butt`);
	} else if (slave.butt > 7) {
		descParts.push(`gigantic ass`);
	} else if (slave.butt > 3) {
		descParts.push(`big ass`);
	}

	// Musculature
	if (slave.muscles < -31) {
		descParts.push(`very weak`);
	} else if (slave.muscles > 50) {
		descParts.push(`very muscular`);
	}

	// Check amputee (add missing just arms/legs)
	if (isAmputee(slave)) {
		descParts.push(`missing both arms and both legs`);
	}

	// Check pregnant
	if (slave.preg > 30) {
		descParts.push(`very pregnant`);
	} else if (slave.preg > 20) {
		descParts.push(`pregnant`);
	}

	// Check teeth
	if (slave.teeth ===  "straightening braces" || slave.teeth ===  "cosmetic braces") {
		descParts.push(`braces on teeth`);
	} else if (slave.teeth ===  "removable") {
		descParts.push(`has dentures`);
	}

	if (descParts.length > 0) {
		r.push(`${descParts.join(', ')}`);
	}


	// BACKGROUND
	if (slave.fuckdoll > 0 || slave.fetish === Fetish.MINDBROKEN) { // in neither case would slave recall or this be important
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0 || slave.fetish !== Fetish.MINDBROKEN) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		if (slave.career === "a slave") {
			r.push(`\r\nBackground: {{char}} has been enslaved for as long as ${he} can remember`);
		} else {
			r.push(`\r\nBackground: Prior to enslavement, {{char}} was ${slave.career}`);
		}
	}

	// ASSIGNMENT
	r.push(`\r\nAssignment: ${slave.assignment}`);

	if (slave.fuckdoll > 0) {
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		// FETISH
		// Paraphilias listed and prompted
		if (slave.sexualFlaw === SexualFlaw.CUMADDICT ) {
			r.push(`\r\nFetish: pathologically addicted to cum`);
		} else if (slave.sexualFlaw === SexualFlaw.ANALADDICT ) {
			r.push(`\r\nFetish: pathologically addicted to anal sex`);
		} else if (slave.sexualFlaw === SexualFlaw.NEGLECT ) {
			r.push(`\r\nTrait: only considers ${his} partner's pleasure`);
		} else if (slave.sexualFlaw === SexualFlaw.ATTENTION ) {
			r.push(`\r\nTrait: pathologically narcissistic`);
		} else if (slave.sexualFlaw === SexualFlaw.BREASTEXP ) {
			r.push(`\r\nFetish: pathologically addicted to breast augmentation`); // is this right
		} else if (slave.sexualFlaw === SexualFlaw.SELFHATING ) {
			r.push(`\r\nTrait: pathologically masochistic`);
		} else if (slave.sexualFlaw === SexualFlaw.ABUSIVE || slave.sexualFlaw === SexualFlaw.MALICIOUS) {
			r.push(`\r\nTrait: sociopathic, delights in abusing others`); // Are above the same for purposes of LLM
		}

		// Explain sex/entertainment skill level. Leave off average. Check virgin status.

		// ABILITIES
		let abilParts = [];
		if (slave.vagina === 0){
			abilParts.push("virgin");
		} else if (slave.skill.whoring <10){
			abilParts.push("sexually unskilled");
		} else if (slave.skill.whoring > 100){
			abilParts.push("renowned whore");
		} else if (slave.skill.whoring > 61){
			abilParts.push("expert whore");
		}

		if (slave.skill.entertainment > 100){
			abilParts.push(`renowned entertainer`);
		} else if (slave.skill.entertainment > 61){
			abilParts.push(`expert entertainer`);
		}
		if (abilParts.length > 0) {
			r.push(`\r\nAbilities: ${abilParts.join(', ')}`);
		}
	}

	// WEARING
	r.push(`\r\n\Wearing: ${slave.clothes}`);
	if (slave.collar !== "none"){
		r.push(`, ${slave.collar} collar`);
	}

	// GENITALS
	// Front
	r.push("\r\nGenitals: ");
	if (slave.dick === 0 && slave.vagina === -1) { // null slave
		r.push("No genitals");
	} else if (slave.vagina < 0) { // has a dick
		if (slave.dick < 1) {
			r.push("tiny penis");
		} else if (slave.dick > 8) {
			r.push("absurdly large penis");
		} else if (slave.dick > 5) {
			r.push("large penis");
		} else {
			r.push("penis");
		}
	} else if (slave.vagina === 0) { // has a pussy
		r.push("virgin pussy");
	} else if (slave.vagina < 2) {
		r.push("tight pussy");
	} else if (slave.vagina > 6) {
		r.push("cavernous pussy");
	} else if (slave.vagina > 3) {
		r.push("loose pussy");
	} else {
		r.push("pussy");
	}
	// Back
	if (slave.anus === 0) {
		r.push(", virgin anus");
	} else if (slave.vagina > 3) {
		r.push(", loose anus");
	}
	// PHair
	if (slave.pubicHStyle === "hairless" || slave.pubicHStyle === "bald") {
		r.push(", no pubic hair");
	} else {
		r.push(`, pubic hair ${slave.pubicHStyle}`);
	}
	// RULES
	let rulesParts = [];

	if (slave.fuckdoll > 0) {
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		// Speech (also check for mute)
		if (slave.voice === 0) {
			rulesParts.push(`Mute and cannot speak`);
		} else  if (slave.rules.speech === "restrictive"){
			rulesParts.push(`Not allowed to speak`);
		}
		// Masturbation rules, also check for ability to molest other slaves (release cases?)
		if (slave.rules.release.masturbation === 0){
			rulesParts.push(`Not allowed to masturbate`);
		}
		// How they address the user, if not mute
		if (slave.voice !== 0) {
			rulesParts.push(`Addresses {{user}} as ${properMaster()}`);
		}
	}

	if (rulesParts.length > 0) {
		r.push(`\r\nRules: ${rulesParts.join(', ')}`);
	}

	// TATTOOS - Too much context for impact?
	let tattooParts = [];

	if (slave.fuckdoll > 0) {
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		if (slave.armsTat) {
			tattooParts.push(`${slave.armsTat} arm tattoo`);
		}
		if (slave.legsTat) {
			tattooParts.push(`${slave.legsTat} leg tattoo`);
		}
		if (slave.bellyTat) {
			tattooParts.push(`${slave.bellyTat} belly tattoo`);
		}
		if (slave.boobsTat) {
			tattooParts.push(`${slave.boobsTat} breast tattoo`);
		}

		if (tattooParts.length > 0) {
			r.push(`\r\nTattoos: ${tattooParts.join(', ')}`);
		}
	}

	// CHASTITY
	let chasParts = [];
	if (slave.chastityVagina === 1) {
		chasParts.push(`vagina`);
	}
	if (slave.chastityPenis === 1) {
		chasParts.push(`penis`);
	}
	if (slave.chastityAnus === 1) {
		chasParts.push(`anus`);
	}
	if (chasParts.length > 0) {
		r.push(`\r\nChastity device covers: ${chasParts.join(', ')}`);
	}

	// PROSTHETICS
	if (hasBothProstheticArms(slave) && hasBothProstheticLegs(slave)) {
		r.push("\r\n\{{char}} has android arms and legs");
	} else if (hasBothProstheticArms(slave)) {
		r.push("\r\n\{{char}} has android arms");
	} else if (hasBothProstheticLegs(slave)) {
		r.push("\r\n\{{char}} has android legs");
	}

	// RELATIONSHIPS and RIVALRIES
	// Lover
	if (slave.fuckdoll > 0) {
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		const lover = slave.relationship > 0 ? getSlave(slave.relationshipTarget) : null;
		if (lover) {
			if (slave.relationship > 4) {
				r.push(`\r\n${SlaveFullName(lover)} is {{char}}'s wife`);
			} else if (slave.relationship > 3) {
				r.push(`\r\n${SlaveFullName(lover)} is {{char}}'s lover`);
			} else if (slave.relationship > 2) {
				r.push(`\r\n${SlaveFullName(lover)} is {{char}}'s girlfriend`);
			} else if (slave.relationship > 1) {
				r.push(`\r\n${SlaveFullName(lover)} is {{char}}'s friend with benefits`);
			} else {
				r.push(`\r\n${SlaveFullName(lover)} is {{char}}'s friend`);
			}
		}
	}

	// Rival
	if (slave.fuckdoll > 0) {
		null;
		// FIXME: @null Is this supposed to be a return? or is this supposed to do nothing?
		// If nothing it should be a single if statement, not if else. `if (slave.fuckdoll <== 0) {`
		// If it's a place holder replace null with a `// TODO: thing to do` comment
	} else {
		const rival = slave.rivalry > 0 ? getSlave(slave.rivalryTarget) : null;
		if (rival) {
			if (slave.rivalry <= 1) {
				r.push(`\r\n{{char}} dislikes ${SlaveFullName(rival)}`);
			} else if (slave.rivalry <= 2) {
				r.push(`\r\n{{char}} hates ${SlaveFullName(rival)}`);
			} else {
				r.push(`\r\n{{char}} bitterly hates ${SlaveFullName(rival)}`);
			}
		}
	}

	return r.join("");
}

function generatePromptStd(slave) {
	let r = [];

	// PERMANENT CHAR PROMPT PART - Does not rely on any slave attributes, but leaving with .join and (slave) passthrough for future conditionals
	r.push(`\r\n{{user}} is the owner of ${V.arcologies[0].name}, an arcology in the fictional slave-holding world of Free Cities. `);
	r.push(generatePlayerSummary());
	r.push(`\r\n{{user}} has authority over his subjects, including training and conditioning slaves for sexual servitude. This is accomplished through coercion, punishment, and other conditioning.\r\nRespond and roleplay only for {{char}} and other NPC.`);

	return r.join("");
}

function generateFirstMessage(slave) {
	let r = [];
	const {He, His, he, him, his} = getPronouns(slave);
	// Set up basic scenario
	r.push("I am sitting in my office as {{char}} arrives for inspection.\r\n");

	// Trust switches
	if (slave.fuckdoll > 0) {
		r.push(`{{char}} is lead in, encased in ${his} fuckdoll suit. `);
		if (slave.fuckdoll < 50) {
			r.push(`${His} twitching hands and slight movement shows ${he} is still fighting the adaptation process, but is unable to move. `);
		} else {
			r.push(`${He} is eerily still. `);
		}
	} else {
		r.push("{{char}} comes in, ");

		if (slave.trust < -95) {
			r.push(`appearing abjectly terrified, barely able to control ${his} terror.`);
		} else if (slave.trust < -50) {
			r.push(`appearing terrified, barely concealing ${his} fear. `);
		} else if (slave.trust < -20) {
			r.push("looking frightened. ");
		} else if (slave.trust < 20) {
			r.push("looking fearful. ");
		} else if (slave.trust <= 50) {
			// if (slave.devotion < -20) {
			// 	r.push("appearing cautious. ");
			// } else {
			// 	r.push("appearing cautious. ");
			// }
			// FIXME: @null this block always spits out the same result. It should be changed or removed
			r.push("appearing cautious. ");
		} else if (slave.trust < 95) {
			if (slave.devotion < -20) {
				r.push("boldly approaching my desk. ");
			} else {
				r.push("trustingly approaching my desk. ");
			}
		} else {
			if (slave.devotion < -20) {
				r.push(`defiantly approaching my desk, ${his} head held high. `);
			} else {
				r.push(`a serene look of profound trust on ${his} face. `);
			}
		}

		// Devotion switches
		if (slave.devotion < -95) {
			r.push(`${His} hate-filled face is barely under control. `);
		} else if (slave.devotion < -50) {
			r.push(`${His} hate for me and these inspections is obvious, though ${he} manages a neutral face. `);
		} else if (slave.devotion < -20) {
			r.push(`${He} appears to have come only reluctantly, preferring to avoid me whenever possible. `);
		} else if (slave.devotion <= 20) {
			r.push(`${He} appears hesitant, not quite trusting me or these inspections.`);
		} else if (slave.devotion <= 50) {
			r.push(`${His} demeanor is accepting, knowing that inspections are a normal part of the week.`);
		} else if (slave.devotion <= 95) {
			r.push(`${He} looks very pleased to have ${properMaster()}'s attention, shining with devotion. `);
		} else {
			r.push(`${He} is positively glowing at the opportunity to have ${his} precious ${properMaster()}'s attention, radiating worshipful devotion.`);
		}
	}
	r.push("\r\n");

	// Check Voice and Vocal Rules
	if (slave.voice === 0 || slave.rules.speech === "restrictive") {
		r.push(`{{char}} is silent, waiting for {{user}} to act.`);
	} else  {
		r.push(`{{char}} looks forward and speaks, "${properMaster()}, how may I serve you?"`);
	}

	return r.join("");
}

function generatePersonality(slave) {
	let r = [];
	r.push("\r\n{{char}} is {{user}}'s ");
	// Slave age (consider visible age)
	r.push(`${slave.actualAge} year old `);

	// Devotion
	if (slave.fetish !== Fetish.MINDBROKEN) {
		if (slave.devotion < -95) {
			r.push("hate-filled, ");
		} else if (slave.devotion < -50) {
			r.push("hateful, ");
		} else if (slave.devotion < -20) {
			r.push("reluctant, ");
		} else if (slave.devotion <= 20) {
			r.push("hesitant, ");
		} else if (slave.devotion <= 50) {
			r.push("accepting, ");
		} else if (slave.devotion <= 95) {
			r.push("devoted, ");
		} else {
			r.push("worshipful, ");
		}

		// Trust
		if (slave.trust < -95) {
			r.push("abjectly terrified ");
		} else if (slave.trust < -50) {
			r.push("terrified ");
		} else if (slave.trust < -20) {
			r.push("frightened ");
		} else if (slave.trust < 20) {
			r.push("fearful ");
		} else if (slave.trust <= 50) {
			// if (slave.devotion < -20) {
			// 	r.push("careful ");
			// } else {
			// 	r.push("careful ");
			// }
			// FIXME: @null this block always spits out the same result. It should be changed or removed
			r.push("careful ");
		} else if (slave.trust < 95) {
			if (slave.devotion < -20) {
				r.push("bold ");
			} else {
				r.push("trusting ");
			}
		} else {
			if (slave.devotion < -20) {
				r.push("defiant ");
			} else {
				r.push("profoundly trusting ");
			}
		}
	} else {
		r.push("mindbroken ");
	}

	// Slave's Title
	if (slave.fuckdoll > 0) {
		r.push("Fuckdoll");
	} else {
		r.push(`${SlaveTitle(slave)}`);
	}

	return r.join("");
}

function generatePlayerSummary() {
	// sections here taken from pLongDescription.js
	const PC = V.PC;
	const raceA = ["asian", "amerindian", "indo-aryan"].includes(PC.race) ? "an" : "a"; // addA() was inheriting colors.
	const r = [];

	r.push(`{{user}} is `);
	if (!PC.nationality || V.seeNationality !== 1 || PC.nationality === "Stateless" || PC.nationality === "slave") {
		r.push(`${PC.race} `);
	} else if (PC.nationality === "Zimbabwean" && PC.race === "white") {
		r.push(`a Rhodesian `);
	} else if (PC.nationality === "Vatican") {
		r.push(`${PC.race} Vatican `);
	} else {
		r.push(`${PC.race} ${PC.nationality} `);
	}
	if (PC.dick && PC.vagina !== -1) {
		r.push(`futanari `);
	} else if (PC.dick > 0) {
		r.push(`${PC.actualAge > 12 ? "man " : "boy "}`);
	} else {
		r.push(`${PC.actualAge > 12 ? "woman " : "girl "}`);
	}
	r.push(`with `);
	if (PC.markings === "freckles") {
		r.push(`freckled `);
	} else if (PC.markings === "heavily freckled") {
		r.push(`heavily freckled `);
	}
	r.push(`${PC.skin} skin, `);

	r.push(App.Desc.Player.face(PC) + " ");

	let ageDifference = '';
	if (PC.visualAge > PC.actualAge) {
		ageDifference = `{{user}} has taken measures to look an older ${PC.visualAge}.`;
	} else if (PC.visualAge < PC.actualAge) {
		ageDifference = `{{user}} has taken measures to look a younger ${PC.visualAge}.`;
	}
	r.push(`{{user}} is ${PC.actualAge} years old.`, ageDifference);

	return r.join("");
}

function lorebookArcology(_n) { // First entry is primarily an example
	return {
		id: _n,
		keys: ["arcology"], // Trigger word for ST to use the content
		secondary_keys: [], // Second Trigger condition (requires both to insert)
		comment: "",
		content: "Arcology: sustainable urban living complex, integrating living spaces, workspaces, and recreational areas in a harmonious and efficient manner. ", // This content is inserted in context. Note it includes Key
		constant: false,
		selective: true,
		insertion_order: 100, // Prioritizes order. Lower value = higher priority
		enabled: true,
		position: "after_char", // Position of content in context
		extensions: { // Below mostly deals with probability-based insertion
			position: 1,
			exclude_recursion: false,
			display_index: 0,
			probability: 100,
			useProbability: true,
			depth: 4,
			selectiveLogic: 0,
			group: ""
		}
	};
}

function lorebookFuckdoll(_n) {
	return {
		id: _n,
		keys: ["fuckdoll"],
		secondary_keys: [],
		comment: "",
		content: "Fuckdoll suit: advanced slave suit, permanently worn, subjecting slave to total control, eliminates all sensory stimulation other than orders passed by the suit's systems and objects inserted into the Fuckdoll's face, pussy, and ass. Slave reactions to commands are mechanical and automatic, pussy and ass are kept lubricated automatically",
		constant: false,
		selective: true,
		insertion_order: 100,
		enabled: true,
		position: "after_char",
		extensions: {
			position: 1,
			exclude_recursion: false,
			display_index: 0,
			probability: 100,
			useProbability: true,
			depth: 4,
			selectiveLogic: 0,
			group: ""
		}
	};
}

function lorebookMindbroken(_n) {
	return {
		id: _n,
		keys: ["mindbroken"],
		secondary_keys: [],
		comment: "",
		content: "Mindbroken: slave's mind is blank, everything she experiences will quickly be forgotten.",
		constant: false,
		selective: true,
		insertion_order: 100,
		enabled: true,
		position: "after_char",
		extensions: {
			position: 1,
			exclude_recursion: false,
			display_index: 0,
			probability: 100,
			useProbability: true,
			depth: 4,
			selectiveLogic: 0,
			group: ""
		}
	};
}

function lorebookArcade(_n) {
	return {
		id: _n,
		keys: ["arcade"],
		secondary_keys: [],
		comment: "",
		content: "Arcade: gloryhole stalls, offering retrained slaves mouths, vaginas and anuses for use by the public",
		constant: false,
		selective: true,
		insertion_order: 100,
		enabled: true,
		position: "after_char",
		extensions: {
			position: 1,
			exclude_recursion: false,
			display_index: 0,
			probability: 100,
			useProbability: true,
			depth: 4,
			selectiveLogic: 0,
			group: ""
		}
	};
}

function lorebookDairy(_n) {
	return {
		id: _n,
		keys: ["dairy"],
		secondary_keys: [],
		comment: "",
		content: "Dairy: barn used for milking and breeding human slaves, collecting human milk for sale and selling breeding services",
		constant: false,
		selective: true,
		insertion_order: 100,
		enabled: true,
		position: "after_char",
		extensions: {
			position: 1,
			exclude_recursion: false,
			display_index: 0,
			probability: 100,
			useProbability: true,
			depth: 4,
			selectiveLogic: 0,
			group: ""
		}
	};
}
