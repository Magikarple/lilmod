/**
 *
 * @param {App.Entity.SlaveState} soul
 * @param {App.Entity.SlaveState} body
 * @param {boolean} fromGenepool is slave from the genepool?
 */
globalThis.bodySwap = function(soul, body, fromGenepool) {
	WombInit(body); // Just to be sure.
	soul.genes = body.genes;
	soul.natural = body.natural;
	soul.physicalAge = body.physicalAge;
	soul.visualAge = body.visualAge;
	soul.ageImplant = body.ageImplant;
	soul.health = body.health;
	soul.weight = body.weight;
	soul.muscles = body.muscles;
	soul.height = body.height;
	soul.heightImplant = body.heightImplant;
	soul.race = body.race;
	soul.origRace = body.origRace;
	soul.pubicHColor = body.pubicHColor;
	soul.skin = body.skin;
	soul.origSkin = body.origSkin;
	soul.markings = body.markings;
	soul.eye = body.eye;
	soul.hears = body.hears;
	soul.earImplant = body.earImplant;
	soul.earShape = body.earShape;
	soul.earT = body.earT;
	soul.earTColor = body.earTColor;
	soul.smells = body.smells;
	soul.tastes = body.tastes;
	soul.horn = body.horn;
	soul.hornColor = body.hornColor;
	soul.PTail = body.PTail;
	soul.tail = body.tail;
	soul.tailShape = body.tailShape;
	soul.tailColor = body.tailColor;
	soul.PBack = body.PBack;
	soul.wingsShape = body.wingsShape;
	soul.appendages = body.appendages;
	soul.appendagesColor = body.appendagesColor;
	soul.appendagesEffectColor = body.appendagesEffectColor;
	soul.appendagesEffect = body.appendagesEffect;
	soul.origHColor = body.origHColor;
	soul.hColor = body.hColor;
	soul.hLength = body.hLength;
	soul.hStyle = body.hStyle;
	soul.pubicHStyle = body.pubicHStyle;
	soul.waist = body.waist;
	soul.arm = body.arm;
	soul.leg = body.leg;
	soul.PLimb = body.PLimb;
	soul.readyProsthetics = body.readyProsthetics;
	soul.heels = body.heels;
	soul.voice = body.voice;
	soul.voiceImplant = body.voiceImplant;
	soul.shoulders = body.shoulders;
	soul.shouldersImplant = body.shouldersImplant;
	soul.boobs = body.boobs;
	soul.boobsImplant = body.boobsImplant;
	soul.boobsImplantType = body.boobsImplantType;
	soul.boobShape = body.boobShape;
	soul.nipples = body.nipples;
	soul.nipplesAccessory = body.nipplesAccessory;
	soul.areolae = body.areolae;
	soul.areolaeShape = body.areolaeShape;
	soul.boobsTat = body.boobsTat;
	soul.lactation = body.lactation;
	soul.lactationDuration = body.lactationDuration;
	soul.induceLactation = body.induceLactation;
	soul.boobsMilk = body.boobsMilk;
	soul.lactationAdaptation = body.lactationAdaptation;
	soul.hips = body.hips;
	soul.hipsImplant = body.hipsImplant;
	soul.butt = body.butt;
	soul.buttImplant = body.buttImplant;
	soul.buttImplantType = body.buttImplantType;
	soul.buttTat = body.buttTat;
	soul.face = body.face;
	soul.faceImplant = body.faceImplant;
	soul.faceShape = body.faceShape;
	soul.lips = body.lips;
	soul.lipsImplant = body.lipsImplant;
	soul.lipsTat = body.lipsTat;
	soul.teeth = body.teeth;
	soul.vagina = body.vagina;
	soul.vaginaLube = body.vaginaLube;
	soul.vaginaTat = body.vaginaTat;
	soul.fertKnown = body.fertKnown;
	soul.fertPeak = body.fertPeak;
	soul.broodmother = body.broodmother;
	soul.broodmotherFetuses = body.broodmotherFetuses;
	soul.broodmotherOnHold = body.broodmotherOnHold;
	soul.broodmotherCountDown = body.broodmotherCountDown;
	soul.labia = body.labia;
	soul.clit = body.clit;
	soul.dick = body.dick;
	soul.foreskin = body.foreskin;
	soul.anus = body.anus;
	soul.analArea = body.analArea;
	soul.dickTat = body.dickTat;
	soul.prostate = body.prostate;
	soul.balls = body.balls;
	soul.scrotum = body.scrotum;
	soul.ovaries = body.ovaries;
	soul.anusTat = body.anusTat;
	soul.brand = body.brand;
	soul.shouldersTat = body.shouldersTat;
	soul.armsTat = body.armsTat;
	soul.legsTat = body.legsTat;
	soul.backTat = body.backTat;
	soul.stampTat = body.stampTat;
	soul.hormones = body.hormones;
	soul.chem = body.chem;
	soul.vaginalAttachment = body.vaginalAttachment;
	soul.chastityVagina = body.chastityVagina;
	soul.chastityPenis = body.chastityPenis;
	soul.chastityAnus = body.chastityAnus;
	if (soul.custom && body.custom) {
		soul.custom.tattoo = body.custom.tattoo;
	}
	soul.bellyTat = body.bellyTat;
	soul.abortionTat = body.abortionTat;
	soul.birthsTat = body.birthsTat;
	soul.pubertyAgeXX = body.pubertyAgeXX;
	soul.pubertyXX = body.pubertyXX;
	soul.pubertyAgeXY = body.pubertyAgeXY;
	soul.pubertyXY = body.pubertyXY;
	soul.breedingMark = body.breedingMark;
	soul.underArmHColor = body.underArmHColor;
	soul.underArmHStyle = body.underArmHStyle;
	soul.ballType = body.ballType;
	soul.eggType = body.eggType;
	soul.bald = body.bald;
	soul.hormoneBalance = body.hormoneBalance;
	soul.breastMesh = body.breastMesh;
	soul.vasectomy = body.vasectomy;
	soul.haircuts = body.haircuts;
	soul.ovaryAge = body.ovaryAge;
	soul.readyOva = body.readyOva;
	soul.womb = body.womb; // this is array assigned by reference, if the slave body that is ${body} will be still used anywhere in code (not discarded) — it's WRONG (they now technically share one womb object). Please tell me about it then. But if the previous slave body is just discarded — it's no problem then.
	soul.pregAdaptation = body.pregAdaptation;
	soul.geneMods = body.geneMods;
	soul.NCSyouthening = body.NCSyouthening;
	soul.eyebrowHColor = body.eyebrowHColor;
	soul.eyebrowHStyle = body.eyebrowHStyle;
	soul.eyebrowFullness = body.eyebrowFullness;
	soul.wombImplant = body.wombImplant;
	soul.ovaImplant = body.ovaImplant;
	soul.geneticQuirks = body.geneticQuirks;
	soul.albinismOverride = body.albinismOverride;
	soul.clone = body.clone;
	soul.cloneID = body.cloneID;
	soul.inbreedingCoeff = body.inbreedingCoeff;

	soul.canRecruit = 0;

	if (!fromGenepool) { // swapping NOT gene pool records
		soul.counter.publicUse = body.counter.publicUse;
		soul.counter.laborCount = body.counter.laborCount;
		soul.porn = body.porn;
		soul.aphrodisiacs = body.aphrodisiacs;
		soul.curatives = body.curatives;
		soul.drugs = body.drugs;
		soul.prestige = body.prestige;
		soul.prestigeDesc = body.prestigeDesc;
		soul.minorInjury = body.minorInjury;
		soul.eyewear = body.eyewear;
		soul.earwear = body.earwear;
		soul.piercing = body.piercing;
		soul.armAccessory = body.armAccessory;
		soul.legAccessory = body.legAccessory;
		soul.bellyAccessory = body.bellyAccessory;
		soul.preg = body.preg;
		soul.pregSource = body.pregSource;
		soul.pregType = body.pregType;
		soul.labor = body.labor;
		soul.clitSetting = body.clitSetting;
		soul.diet = body.diet;
		soul.dietCum = body.dietCum;
		soul.dietMilk = body.dietMilk;
		soul.clothes = body.clothes;
		soul.collar = body.collar;
		soul.faceAccessory = body.faceAccessory;
		soul.mouthAccessory = body.mouthAccessory;
		soul.shoes = body.shoes;
		soul.makeup = body.makeup;
		soul.nails = body.nails;
		soul.vaginalAccessory = body.vaginalAccessory;
		soul.dickAccessory = body.dickAccessory;
		soul.buttplug = body.buttplug;
		soul.buttplugAttachment = body.buttplugAttachment;
		soul.induce = body.induce;
		soul.mpreg = body.mpreg;
		soul.pregKnown = body.pregKnown;
		soul.pregWeek = body.pregWeek;
		soul.belly = body.belly;
		soul.bellyPreg = body.bellyPreg;
		soul.bellyFluid = body.bellyFluid;
		soul.bellyImplant = body.bellyImplant;
		soul.bellySag = body.bellySag;
		soul.bellySagPreg = body.bellySagPreg;
		soul.bellyPain = body.bellyPain;
		soul.cervixImplant = body.cervixImplant;
		soul.scar = body.scar;
		soul.pregControl = body.pregControl;
		deflate(soul);
	}
};
/**
 *
 * @param {App.Entity.SlaveState} soul
 * @param {App.Entity.SlaveState} body
 */
globalThis.bodySwapName = function(soul, body) {
	if (body.bodySwap === 0) {
		if (body.birthSurname) {
			if (body.birthName !== "") {
				soul.origBodyOwner = SlaveFullBirthName(body);
			} else {
				soul.origBodyOwner = body.slaveName + " " + body.birthSurname;
			}
		} else if (body.birthName) {
			if (body.slaveSurname) {
				if (
					(V.surnameOrder !== 1 && ["Cambodian", "Chinese", "Ancient Chinese Revivalist", "Hungarian", "Japanese", "Edo Revivalist", "Korean", "Mongolian", "Taiwanese", "Vietnamese"].includes(body.nationality)) ||
					V.surnameOrder === 2
				) {
					soul.origBodyOwner = body.slaveSurname + " " + body.birthName;
				} else {
					soul.origBodyOwner = body.birthName + " " + body.slaveSurname;
				}
			} else {
				soul.origBodyOwner = body.birthName;
			}
		} else if (body.slaveSurname) {
			soul.origBodyOwner = SlaveFullName(body);
		} else {
			soul.origBodyOwner = body.slaveName;
		}
	} else {
		soul.origBodyOwner = body.origBodyOwner;
	}
};

/**
 *
 * @param {App.Entity.SlaveState} soul
 * @returns {DocumentFragment}
 */
globalThis.bodySwapSelection = function(soul) {
	const {him} = getPronouns(soul);
	const el = new DocumentFragment();
	const cost = 10000;
	App.UI.DOM.appendNewElement("div", el, `The surgeon awaits the pair of slaves to be strapped into the surgery. So far only ${soul.slaveName} is prepped:`, "scene-intro");
	App.UI.DOM.appendNewElement("div", el, `Select ${(V.seeExtreme) ? `an eligible slave (any slave who is not a fuckdoll)` : `a slave`} who will be trading bodies with ${him}. This operation will cost ${cashFormat(cost)}.`);

	for (const body of V.slaves) {
		if (body.ID === soul.ID) { // Do not allow slave to be swapped with themselves
			continue;
		}
		if (body.indenture !== -1) {
			continue;
		}
		const slaveDiv = document.createElement("div");
		slaveDiv.append(
			App.UI.DOM.link(
				body.slaveName,
				() => {
					V.swappingSlave = body.ID;
					cashX(forceNeg(cost), "slaveSurgery", body);
				},
				[],
				"Slave Slave Swap"
			)
		);
		const relTerm = relativeTerm(soul, body);
		if (relTerm) {
			slaveDiv.append(` ${relTerm}`);
		}
		if (body.relationshipTarget === soul.ID) {
			const {wife} = getPronouns(body);
			switch (body.relationship) {
				case 1:
					slaveDiv.append(` friends`);
					break;
				case 2:
					slaveDiv.append(` best friends`);
					break;
				case 3:
					slaveDiv.append(` friends with benefits`);
					break;
				case 4:
					slaveDiv.append(` lover`);
					break;
				case 5:
					slaveDiv.append(` slave${wife}`);
					break;
			}
		}
		if (body.rivalryTarget === soul.ID) {
			switch (body.relationship) {
				case 1:
					slaveDiv.append(`dislikes`);
					break;
				case 2:
					slaveDiv.append(`rival`);
					break;
				case 3:
					slaveDiv.append(`bitterly hates`);
					break;
			}
		}
		el.append(slaveDiv);
	}

	return el;
};

/**
 *
 * @param {App.Entity.SlaveState} body
 * @returns {DocumentFragment}
 */
globalThis.huskSwapSelection = function(body) {
	const el = new DocumentFragment();
	const cost = 10000;
	App.UI.DOM.appendNewElement("div", el, `"This operation is neither simple nor is it perfected. There are extreme health risks involved and no guarantee of success. Strap a slave into your remote surgery to consent to the operation. Indentured servants${(V.incubator.capacity > 0 || V.nurseryChildren) ? ` and slaves with reserved children` : ``} are not eligible."
	`, "scene-intro");
	App.UI.DOM.appendNewElement("div", el, `Select the slave whose mind will be transferred into the waiting husk. Amputated slaves must not be wearing prosthetics. This operation will cost ${cashFormat(cost)}.`);

	for (const soul of V.slaves) {
		if (isSlaveAvailable(soul)) {
			if (soul.fuckdoll === 0) {
				if (!hasAnyProstheticLimbs(soul)) {
					if (soul.indenture === -1) {
						if (soul.breedingMark === 0 || V.propOutcome === 0 || V.eugenicsFullControl === 1 || !FutureSocieties.isActive('FSRestart')) {
							if (WombReserveCount(soul) === 0) {
								if (soul.ID !== body.ID) {
									App.UI.DOM.appendNewElement("div", el,
										App.UI.DOM.link(
											soul.slaveName,
											() => {
												V.swappingSlave = soul.ID;
												cashX(forceNeg(cost), "slaveSurgery", soul);
											},
											[],
											"Husk Slave Swap"
										)
									);
								}
							}
						}
					}
				}
			}
		}
	}

	return el;
};
