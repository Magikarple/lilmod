App.Markets["Slave Shelter"] = function() {
	const el = new DocumentFragment();
	let r = [];

	if (V.shelterSlaveBought === 1) {
		App.UI.DOM.appendNewElement("span", el, ` You already bought a shelter slave this week.`);
	} else {
		r.push(`You contact the Slave Shelter to review the profile of the slave the Shelter is offering to a good`);
		if (V.PC.title === 1) {
			r.push(`Master`);
		} else {
			r.push(`Mistress`);
		}
		r.push(`willing to pay the Shelter's nominal placement fee. The severe, tired-looking woman who answers your call hurries through the disclaimers. "All Shelter Slaves are provided as-is... the Shelter provides a single slave for placement each week... resale of Shelter slaves is contractually forbidden... we reserve the right to unannounced inspection of placed slaves... the Shelter follows up on reports of abuse or resale of its slaves..."`);

		App.UI.DOM.appendNewElement("span", el, r.join(" "));

		if (V.shelterSlave === 0) {
			const possibleOrigins = [];
			possibleOrigins.push("broken");
			if (V.seeExtreme === 1) {
				possibleOrigins.push("amputee", "blind", "deaf");
				if (jsRandom(1, 100) <= V.seeDicks) {
					possibleOrigins.push("cannibal victim male");
				} else {
					possibleOrigins.push("cannibal victim female");
				}
			}
			if (jsRandom(1, 100) <= V.seeDicks) {
				possibleOrigins.push("dickpain", "gelding");
			}
			if (jsRandom(0, 99) >= V.seeDicks) {
				possibleOrigins.push("plugs", "reaction", "used whore");
				if (V.seePreg !== 0) {
					possibleOrigins.push("breeder", "broken womb");
				}
			}
			if (V.week > 80) {
				possibleOrigins.push("degraded DoL");
			}

			const origin = possibleOrigins.random();
			let pedo;
			let minAge;
			let maxAge;
			switch (origin) {
				case "broken":
					V.shelterSlave = GenerateNewSlave(null, {disableDisability: 1});
					V.shelterSlave.origin = "$He has never communicated anything about $his background, since $he arrived at the shelter with a broken mind.";
					V.shelterSlave.career = "a slave";
					setHealth(V.shelterSlave, jsRandom(-30, -10));
					V.shelterSlave.anus = 3;
					applyMindbroken(V.shelterSlave, V.shelterSlave.intelligence);
					break;
				case "amputee":
					V.shelterSlave = GenerateNewSlave(null, {disableDisability: 1});
					V.shelterSlave.origin = "It's not clear why $his previous owner cut $his arms and legs off.";
					V.shelterSlave.career = "a slave";
					removeLimbs(V.shelterSlave, "all");
					V.shelterSlave.devotion = jsRandom(-100, -90);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.behavioralFlaw = either("hates men", "hates women", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "hates anal", "hates oral", "hates penetration");
					break;
				case "blind":
					V.shelterSlave = GenerateNewSlave(null, {minAge: V.minimumSlaveAge, maxAge: 22, disableDisability: 1});
					V.shelterSlave.origin = "$His owner purposely blinded $him by dumping boiling water into $his eyes.";
					V.shelterSlave.career = "a slave";
					eyeSurgery(V.shelterSlave, "both", "blind");
					setEyeColor(V.shelterSlave, "milky white");
					App.Medicine.Modification.addScar(V.shelterSlave, "face", "burn", 2);
					V.shelterSlave.devotion = jsRandom(-100, -90);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.behavioralFlaw = "hates men";
					V.shelterSlave.sexualFlaw = "hates oral";
					V.shelterSlave.canRecruit = 0;
					V.shelterSlave.override_Eye_Color = 1; // TODO: Identifier 'override_Eye_Color' is not in camel case
					break;
				case "deaf":
					V.shelterSlave = GenerateNewSlave(null, {minAge: V.minimumSlaveAge, maxAge: 22, disableDisability: 1});
					V.shelterSlave.origin = "$His owner purposely deafened $him by piercing $his eardrums with knitting needles.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.hears = -2;
					V.shelterSlave.devotion = jsRandom(-100, -90);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.behavioralFlaw = "hates men";
					V.shelterSlave.sexualFlaw = "hates oral";
					V.shelterSlave.canRecruit = 0;
					break;
				case "broken womb":
					V.shelterSlave = GenerateNewSlave("XX", {minAge: 6, maxAge: 22, disableDisability: 1});
					V.shelterSlave.origin = "$He was found unresponsive in the lower arcology with a gaping pussy and deflated belly. It is unclear what happened to $him.";
					V.shelterSlave.career = "homeless";
					setHealth(V.shelterSlave, jsRandom(-50, -30), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.weight = -50;
					V.shelterSlave.vagina = 9;
					V.shelterSlave.bellySag = 20;
					applyMindbroken(V.shelterSlave, V.shelterSlave.intelligence);
					break;
				case "cannibal victim male":
					if (V.pedo_mode === 1) {
						pedo = 1;
					} else {
						maxAge = 42;
					}
					V.shelterSlave = GenerateNewSlave("XY", {
						minAge: 16, maxAge: maxAge, disableDisability: 1, ageOverridesPedoMode: pedo
					});
					V.shelterSlave.origin = "$His previous owner forced $him to cut off $his dick and balls and cook them.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-100, -80);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.dick = 0;
					V.shelterSlave.foreskin = 0;
					V.shelterSlave.balls = 0;
					V.shelterSlave.scrotum = 0;
					V.shelterSlave.skill.penetrative = 0;
					V.shelterSlave.behavioralFlaw = either("anorexic", "anorexic", "anorexic", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "neglectful", "self hating");
					V.shelterSlave.fetish = either("masochist", "none", "none");
					App.Medicine.Modification.addScar(V.shelterSlave, "pubic mound", "scars from $his crudely performed self-castration");
					break;
				case "cannibal victim female":
					if (V.pedo_mode === 1) {
						pedo = 1;
					} else {
						maxAge = 42;
					}
					V.shelterSlave = GenerateNewSlave("XX", {
						minAge: 16, maxAge: maxAge, disableDisability: 1, ageOverridesPedoMode: pedo
					});
					V.shelterSlave.origin = "$His previous owner forced $him to cut off $his breasts and cook them.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-100, -80);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.boobs = 10;
					V.shelterSlave.boobsImplant = 0;
					V.shelterSlave.boobsImplantType = "none";
					V.shelterSlave.nipples = "tiny";
					V.shelterSlave.behavioralFlaw = either("anorexic", "anorexic", "anorexic", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "neglectful", "self hating");
					V.shelterSlave.fetish = either("masochist", "none", "none");
					App.Medicine.Modification.addScar(V.shelterSlave, "left breast", "an ugly mess of scar tissue");
					App.Medicine.Modification.addScar(V.shelterSlave, "right breast", "an ugly mess of scar tissue");
					break;
				case "degraded DoL":
					V.shelterSlave = GenerateNewSlave(null, {minAge: 14, disableDisability: 1, ageOverridesPedoMode: 1});
					V.shelterSlave.origin = "$He is an enslaved Daughter of Liberty, caught some weeks after the failed coup. $His previous owner used $him as a punching bag and dart board, then when he was bored of $him tattooed obscenities all over $his body and threw $him away.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-100, -90);
					V.shelterSlave.trust = jsRandom(-100, -90);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.slaveName = either("Cumbitch", "Cumbucket", "Cumdoll", "Cumgulper", "Fuckhole", "Fuckmeat", "Fuckpuppet", "Fuckslut", "Fucktoy", "Rapemeat", "Sluttypig", "Spunkbucket", "Spunkswallow", "Whorelips");
					V.shelterSlave.slaveSurname = 0;
					V.shelterSlave.minorInjury = either("black eye", "bruise", "split lip", 0);
					V.shelterSlave.weight = jsRandom(-90, -30);
					V.shelterSlave.muscles = jsRandom(-75, 0);
					V.shelterSlave.energy = jsRandom(0, 30);
					V.shelterSlave.fetish = either("humiliation", "humiliation", "masochist", "none", "none", "submissive");
					V.shelterSlave.boobsTat = either("degradation", "rude words", "none");
					V.shelterSlave.buttTat = either("degradation", "rude words", 0);
					V.shelterSlave.lipsTat = either("degradation", "rude words", 0);
					V.shelterSlave.anusTat = either("degradation", "rude words", 0);
					V.shelterSlave.shouldersTat = either("degradation", "rude words", 0);
					V.shelterSlave.armsTat = either("degradation", "rude words", 0);
					V.shelterSlave.legsTat = either("degradation", "rude words", 0);
					V.shelterSlave.backTat = either("degradation", "rude words", 0);
					V.shelterSlave.stampTat = either("degradation", "rude words", 0);
					V.shelterSlave.skill.anal = jsRandom(10, 25);
					V.shelterSlave.anus = jsRandom(1, 4);
					if (isFertile(V.shelterSlave) && V.seePreg !== 0) {
						V.shelterSlave.preg = either(-3, -2, -2, -2, 0, 0, 2, 3, 4, 5);
						if (V.shelterSlave.preg > 0) {
							V.shelterSlave.pregSource = -2;
							V.shelterSlave.pregKnown = 1;
							V.shelterSlave.pregType = setPregType(V.shelterSlave);
							WombImpregnate(V.shelterSlave, V.shelterSlave.pregType, V.shelterSlave.pregSource, V.shelterSlave.preg);
						}
					}
					if (V.shelterSlave.vagina > -1) {
						V.shelterSlave.vagina = jsRandom(1, 4);
						V.shelterSlave.skill.vaginal = jsRandom(10, 25);
						V.shelterSlave.vaginaTat = either("degradation", "rude words", 0);
					}
					if (V.shelterSlave.dick > 1) {
						V.shelterSlave.dickTat = either("degradation", "rude words", 0);
					}
					break;
				case "gelding":
					V.shelterSlave = GenerateNewSlave("XY", {minAge: 20, maxAge: 42, disableDisability: 1});
					V.shelterSlave.origin = "$His previous owner gelded $him and used $him for anal abuse.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-50, -30));
					V.shelterSlave.face = jsRandom(-60, -20);
					V.shelterSlave.dick = jsRandom(1, 2);
					V.shelterSlave.balls = 0;
					V.shelterSlave.anus = 4;
					V.shelterSlave.skill.oral = 0;
					V.shelterSlave.skill.penetrative = 0;
					V.shelterSlave.skill.anal = 15;
					V.shelterSlave.skill.whoring = 0;
					V.shelterSlave.skill.entertainment = 0;
					V.shelterSlave.skill.combat = 0;
					V.shelterSlave.attrXY = jsRandom(40, 60);
					V.shelterSlave.behavioralFlaw = either("anorexic", "gluttonous", "hates men", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "hates anal");
					break;
				case "dickpain":
					V.shelterSlave = GenerateNewSlave("XY", {minAge: 20, maxAge: 42, disableDisability: 1});
					V.shelterSlave.origin = "$His background is obscure, but seems to have involved terrible abuse of $his huge cock and balls.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-50, -30));
					V.shelterSlave.face = jsRandom(-60, -20);
					V.shelterSlave.dick = jsRandom(4, 5);
					V.shelterSlave.balls = jsRandom(4, 5);
					V.shelterSlave.anus = 0;
					V.shelterSlave.skill.oral = 0;
					V.shelterSlave.skill.penetrative = 0;
					V.shelterSlave.skill.anal = 0;
					V.shelterSlave.skill.whoring = 0;
					V.shelterSlave.skill.entertainment = 0;
					V.shelterSlave.skill.combat = 0;
					V.shelterSlave.energy = jsRandom(5, 10);
					V.shelterSlave.attrXX = 0;
					V.shelterSlave.behavioralFlaw = either("hates women", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic");
					break;
				case "plugs":
					V.shelterSlave = GenerateNewSlave("XX", {minAge: 20, maxAge: 42, disableDisability: 1});
					V.shelterSlave.origin = "$His holes were cruelly stretched by constant plug use.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-50, -30));
					V.shelterSlave.vagina = 4;
					V.shelterSlave.anus = 4;
					V.shelterSlave.skill.oral = 15;
					V.shelterSlave.skill.anal = 15;
					V.shelterSlave.skill.vaginal = 15;
					V.shelterSlave.skill.whoring = 0;
					V.shelterSlave.skill.entertainment = 0;
					V.shelterSlave.skill.combat = 0;
					V.shelterSlave.behavioralFlaw = either("anorexic", "gluttonous", "odd");
					V.shelterSlave.sexualFlaw = either("hates anal", "hates oral", "hates penetration");
					break;
				case "breeder":
					if (V.pedo_mode === 1) {
						minAge = (V.fertilityAge + 6);
						pedo = 1; // Old enough to have been pregnant many times.
					} else {
						minAge = 30;
						maxAge = 42;
					}
					V.shelterSlave = GenerateNewSlave("XX", {
						minAge: minAge, maxAge: maxAge, disableDisability: 1, ageOverridesPedoMode: pedo
					});
					V.shelterSlave.origin = "$His previous owner discarded $him after many pregnancies.";
					V.shelterSlave.career = "a breeder";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-50, -30));
					V.shelterSlave.preg = -2;
					V.shelterSlave.counter.birthsTotal = 13;
					V.shelterSlave.pregAdaptation = 60;
					V.shelterSlave.bellySag = 10;
					V.shelterSlave.bellySagPreg = 10;
					V.shelterSlave.vagina = 3;
					V.shelterSlave.skill.oral = 0;
					V.shelterSlave.skill.anal = 0;
					V.shelterSlave.skill.vaginal = 0;
					V.shelterSlave.skill.whoring = 0;
					V.shelterSlave.skill.entertainment = 0;
					V.shelterSlave.skill.combat = 0;
					V.shelterSlave.behavioralFlaw = either("gluttonous", "hates men", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "hates penetration", "repressed");
					break;
				case "used whore":
					V.shelterSlave = GenerateNewSlave("XX", {
						minAge: 32, maxAge: 42, disableDisability: 1, ageOverridesPedoMode: 1
					});// 20 years of brothel service.
					V.shelterSlave.origin = "$He was worn out by twenty years of brothel service.";
					V.shelterSlave.career = "a prostitute";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3));
					V.shelterSlave.face = jsRandom(-60, -20);
					V.shelterSlave.preg = -2;
					V.shelterSlave.vagina = 4;
					V.shelterSlave.anus = 4;
					V.shelterSlave.skill.oral = 35;
					V.shelterSlave.skill.anal = 35;
					V.shelterSlave.skill.vaginal = 35;
					V.shelterSlave.skill.penetrative = 15;
					V.shelterSlave.skill.whoring = 35;
					V.shelterSlave.skill.entertainment = 15;
					V.shelterSlave.skill.combat = 0;
					V.shelterSlave.behavioralFlaw = either("anorexic", "gluttonous", "hates men", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "hates anal", "hates oral", "hates penetration");
					break;
				case "reaction":
					V.shelterSlave = GenerateNewSlave(null, {disableDisability: 1});
					V.shelterSlave.origin = "$He was discarded after suffering a terrible reaction to growth hormone treatment.";
					V.shelterSlave.career = "a slave";
					V.shelterSlave.devotion = jsRandom(-75, -60);
					V.shelterSlave.trust = jsRandom(-100, -75);
					setHealth(V.shelterSlave, jsRandom(-60, -40), normalRandInt(10, 3), normalRandInt(20, 3));
					V.shelterSlave.chem = 1000;
					if ((V.shelterSlave.dick > 0) && (jsRandom(1, 2) === 1)) {
						V.shelterSlave.dick = jsRandom(5, 6);
					}
					if ((V.shelterSlave.balls > 0) && (jsRandom(1, 2) === 1)) {
						V.shelterSlave.balls = jsRandom(5, 10);
					}
					if (jsRandom(1, 3) === 1) {
						V.shelterSlave.boobs += 100 * jsRandom(10, 30);
					}
					if (jsRandom(1, 3) === 1) {
						V.shelterSlave.butt += jsRandom(3, 5);
					}
					V.shelterSlave.behavioralFlaw = either("anorexic", "gluttonous", "odd");
					V.shelterSlave.sexualFlaw = either("apathetic", "hates anal", "hates oral", "hates penetration");
					break;
				default:
					V.shelterSlave = GenerateNewSlave(null, {disableDisability: 1});
					throw Error(`"${origin}" not found`);
			}
		}
		const cost = sexSlaveContractCost();
		const {his} = getPronouns(V.shelterSlave);

		App.UI.DOM.appendNewElement("p", el, `The placement fee is ${cashFormat(cost)}.`);

		if (V.cash >= cost) {
			App.UI.DOM.appendNewElement(
				"p",
				el,
				App.UI.DOM.link(
					`Buy ${his} slave contract`,
					() => {
						cashX(forceNeg(cost), "slaveTransfer", V.shelterSlave);
						V.shelterSlaveBought = 1;
						V.shelterSlave.origin = "You got $him at the Slave Shelter. " + V.shelterSlave.origin;
						jQuery("#slave-markets").empty().append(App.UI.newSlaveIntro(V.shelterSlave));
					}
				)
			);
		} else {
			App.UI.DOM.appendNewElement("p", el, `You lack the necessary funds to buy this slave.`, "note");
		}

		el.append(App.Desc.longSlave(V.shelterSlave, {market: "generic"}));
		App.UI.DOM.appendNewElement("p", el, pronounsForSlaveProp(V.shelterSlave, V.shelterSlave.origin));
	}
	return el;
};
