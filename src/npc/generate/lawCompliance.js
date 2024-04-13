// cSpell:ignore unsalvageable

/**
 * @param {App.Entity.SlaveState} slave
 * @param {FC.Zeroable<FC.SlaveMarketName | FC.SpecialMarketName>} [market=0]
 * @returns {string}
 */
App.Desc.lawCompliance = function(slave, market = 0) {
	let r = [];
	const fearList = [];
	const {
		he, him, his, himself, He, His, girl
	} = getPronouns(slave);

	if (V.arcologies[0].FSSlimnessEnthusiastSMR === 1) {
		r.push(FSSlimnessEnthusiastSMR());
	}
	if (V.arcologies[0].FSRepopulationFocusSMR === 1) {
		r.push(FSRepopulationFocusSMR());
	}
	if (V.arcologies[0].FSAssetExpansionistSMR === 1) {
		r.push(FSAssetExpansionistSMR());
	}
	if (V.arcologies[0].FSPhysicalIdealistSMR === 1) {
		r.push(FSPhysicalIdealistSMR());
	} else if (V.arcologies[0].FSHedonisticDecadenceSMR === 1) {
		r.push(FSHedonisticDecadenceSMR());
	}
	if (V.arcologies[0].FSGenderFundamentalistSMR === 1) {
		r.push(FSGenderFundamentalistSMR());
	} else if (V.arcologies[0].FSSupremacistSMR === 1) {
		r.push(FSSupremacistSMR());
	} else if (V.arcologies[0].FSSubjugationistSMR === 1) {
		r.push(FSSubjugationistSMR());
	}
	if (V.arcologies[0].FSRestartSMR === 1) {
		r.push(FSRestartSMR());
	}
	if (V.arcologies[0].FSPaternalistSMR === 1) {
		r.push(FSPaternalistSMR());
	}
	if (V.arcologies[0].FSDegradationistSMR === 1) {
		r.push(FSDegradationistSMR());
	}
	if (V.policies.gumjobFetishismSMR === 1) {
		r.push(gumjobFetishismSMR());
	}
	if (V.arcologies[0].FSPetiteAdmirationSMR === 1) {
		r.push(FSPetiteAdmirationSMR());
	} else if (V.arcologies[0].FSStatuesqueGlorificationSMR === 1) {
		r.push(FSStatuesqueGlorificationSMR());
	}
	if (V.arcologies[0].FSIntellectualDependencySMR === 1) {
		r.push(FSIntellectualDependencySMR());
	} else if (V.arcologies[0].FSSlaveProfessionalismSMR === 1) {
		r.push(FSSlaveProfessionalismSMR());
	}
	if (V.arcologies[0].FSBodyPuristSMR === 1) {
		r.push(FSBodyPuristSMR());
	}
	if (V.arcologies[0].FSTransformationFetishistSMR === 1) {
		r.push(FSTransformationFetishistSMR());
	}
	if (V.arcologies[0].FSYouthPreferentialistSMR === 1) {
		r.push(FSYouthPreferentialistSMR());
	}
	if (V.arcologies[0].FSMaturityPreferentialistSMR === 1) {
		r.push(FSMaturityPreferentialistSMR());
	}
	if (V.arcologies[0].FSPastoralistSMR === 1) {
		r.push(FSPastoralistSMR());
	}
	if (V.arcologies[0].FSChattelReligionistSMR === 1) {
		r.push(FSChattelReligionistSMR());
	}
	if (V.arcologies[0].FSRomanRevivalistSMR === 1) {
		r.push(FSRomanRevivalistSMR());
	}
	if (V.arcologies[0].FSNeoImperialistSMR === 1) {
		r.push(FSNeoImperialistSMR());
	}
	if (V.arcologies[0].FSAztecRevivalistSMR === 1) {
		r.push(FSAztecRevivalistSMR());
	}
	if (V.arcologies[0].FSEgyptianRevivalistSMR === 1) {
		r.push(FSEgyptianRevivalistSMR());
	}
	if (V.arcologies[0].FSEdoRevivalistSMR === 1) {
		r.push(FSEdoRevivalistSMR());
	}
	if (V.arcologies[0].FSArabianRevivalistSMR === 1) {
		r.push(FSArabianRevivalistSMR());
	}
	if (V.arcologies[0].FSChineseRevivalistSMR === 1) {
		r.push(FSChineseRevivalistSMR());
	}
	if (V.arcologies[0].FSAntebellumRevivalistSMR === 1) {
		r.push(FSAntebellumRevivalistSMR());
	}

	if (V.policies.SMR.basicSMR === 0) {
		r.push(basicSMR());
	}

	if (V.policies.SMR.healthInspectionSMR === 1) {
		r.push(healthInspectionSMR());
	}

	if (V.policies.SMR.educationSMR === 1) {
		r.push(educationSMR());
	}

	if (V.policies.SMR.frigiditySMR === 1) {
		r.push(frigiditySMR());
	}

	if (V.policies.SMR.beauty.basicSMR === 1) {
		fearList.push(beautyBasicSMR());
	}

	if (V.policies.SMR.beauty.qualitySMR === 1) {
		fearList.push(beautyQualitySMR());
	}

	if (V.policies.SMR.weightSMR === 1) {
		fearList.push(weightSMR());
	}

	if (V.policies.SMR.height.basicSMR === 1) {
		r.push(heightBasicSMRup());
	} else if (V.policies.SMR.height.basicSMR === -1) {
		r.push(heightBasicSMRdown());
	}

	if (V.policies.SMR.height.advancedSMR === 1) {
		r.push(heightAdvancedSMRup());
	} else if (V.policies.SMR.height.advancedSMR === -1) {
		r.push(heightAdvancedSMRdown());
	}

	if (V.policies.SMR.intelligence.basicSMR === 1) {
		fearList.push(intelligenceBasicSMR());
	}

	if (V.policies.SMR.intelligence.qualitySMR === 1) {
		fearList.push(intelligenceQualitySMR());
	}

	r.push(slaveFears(fearList));

	if (market !== "Elite Slave" && policies.countEugenicsSMRs() > 0) {
		r.push(eugenicsSMRsCount());
	}

	SlaveStatClamp(slave);

	return r.join(" ");

	function FSSlimnessEnthusiastSMR() {
		slave.weight = jsRandom(-80, 0);
		setHealth(slave, jsRandom(50, 90), 0, undefined, 0, 5);
		return `${He} has been kept on a rigorous diet for sale, has been required to exercise regularly, and has had excellent care taken of ${his} health.`;
	}

	function FSRepopulationFocusSMR() {
		if (slave.physicalAge < V.fertilityAge) {
			if (V.precociousPuberty === 0) {
				slave.physicalAge = V.fertilityAge;
				slave.visualAge = V.fertilityAge;
				slave.actualAge = V.fertilityAge;
				slave.ovaryAge = V.fertilityAge;
			}
		}
		slave.pubertyXX = 1;
		if (slave.ovaryAge >= 42) {
			// corrects menopausal mothers
			slave.ovaryAge = 40;
		}
		if (slave.preg < 1) {
			// "if" needed here to avoid conflicts with already pregnant slaves from repopulation FS arcologies markets
			slave.ovaries = 1;
			slave.vagina = either(0, 0, 1, 1, 1, 1, 1, 2, 2, 3);
			slave.pregType = either(1, 1, 1, 1, 2, 2, 2, 3, 3, 4, 5);
			slave.preg = jsRandom(5, 38);
			slave.pregWeek = slave.preg;
			slave.pregKnown = 1;
			SetBellySize(slave);
		}
		return `If ${he} was unable to become pregnant before, ${he} has been made to now. ${He} is fertilized surgically to ensure a healthy pregnancy.`;
	}

	function FSAssetExpansionistSMR() {
		slave.clit = either(0, 0, 0, 1, 1, 2);
		slave.labia = either(0, 1, 2, 3);
		slave.boobs += jsRandom(2, 5) * 100;
		slave.butt += jsRandom(1, 2);
		slave.lips = jsRandom(15, 55);
		if (slave.dick > 0) {
			slave.dick = jsRandom(4, 7);
			if (slave.foreskin > 0) {
				slave.foreskin = (slave.dick + either(-1, 0, 0));
			}
		}
		if (slave.balls > 0) {
			slave.balls = jsRandom(4, 7);
			if (slave.scrotum > 0) {
				slave.scrotum = (slave.balls + either(-1, 0, 0));
			}
		}
		return `${He} has been on powerful growth hormones for a long time, and has experienced growth in several areas as a result.`;
	}

	function FSPhysicalIdealistSMR() {
		const r = [];
		r.push(`Much of ${his} time before sale was spent`);
		if (V.arcologies[0].FSPhysicalIdealistLaw === 1) {
			slave.muscles = jsRandom(20, 50);
			r.push(`doing cardio,`);
		} else {
			slave.muscles = jsRandom(50, 100);
			r.push(`lifting weights,`);
		}
		r.push(`and ${his} health has been raised to an almost unnatural level.`);
		setHealth(slave, jsRandom(50, 90), 0, undefined, 0, 5);
		slave.weight = jsRandom(-20, 0);
		return r.join(" ");
	}

	function FSHedonisticDecadenceSMR() {
		const r = [];
		slave.weight = jsRandom(50, 200);
		if (V.arcologies[0].FSHedonisticDecadenceStrongFat === 1) {
			slave.muscles = jsRandom(10, 60);
			setHealth(slave, jsRandom(10, 40), 0, undefined, 0);
		} else {
			setHealth(slave, jsRandom(-30, 10), undefined, undefined, 0);
			slave.muscles = jsRandom(-80, 0);
		}
		r.push(`Much of ${his} time before sale was spent being fattened up and`);
		if (V.arcologies[0].FSHedonisticDecadenceStrongFat === 1) {
			r.push(`pumping iron.`);
		} else {
			r.push(`lying around.`);
		}
		if (slave.devotion <= 20) {
			r.push(`${He} had to be force-fed massive amounts of slave food while bound to meet requirements, filling ${him} with <span class="gold">fear</span> and <span class="mediumorchid">disgust.</span>`);
			slave.trust -= 5;
			slave.devotion -= 5;
		}
		return r.join(" ");
	}

	function FSGenderFundamentalistSMR() {
		if (slave.dick > 0) {
			slave.balls = 0;
			slave.scrotum = 0;
			slave.boobs += jsRandom(0, 2) * 100;
			slave.butt += jsRandom(0, 1);
			if (slave.face < 95) {
				slave.face = Math.clamp(slave.face + jsRandom(0, 20), -100, 100);
			}
			return `${His} balls were removed as soon as ${he} was enslaved, and ${he}'s been kept on powerful female hormones for long enough to have a general feminizing effect.`;
		}
	}

	function FSSupremacistSMR() {
		if (slave.dick > 0) {
			if (slave.race !== V.arcologies[0].FSSupremacistRace) {
				slave.balls = 0;
				slave.scrotum = 0;
				return `${His} balls were removed as soon as ${he} was enslaved to prevent ${him} from polluting fertile slaves with ${his} inferior semen.`;
			}
		}
	}

	function FSSubjugationistSMR() {
		if (slave.dick > 0) {
			if (slave.race === V.arcologies[0].FSSubjugationistRace) {
				slave.balls = 0;
				slave.scrotum = 0;
				return `${His} balls were removed as soon as ${he} was enslaved to prevent ${him} from polluting fertile slaves with ${his} subhuman semen.`;
			}
		}
	}

	function FSRestartSMR() {
		const r = [];
		if (slave.balls > 0 || slave.ovaries > 0) {
			TerminatePregnancy(slave);
			actX(slave, "abortions");
			slave.balls = 0;
			slave.ovaries = 0;
			r.push(`As a member of the lowest class,`);
			if (slave.preg > 0) {
				r.push(`${his} pregnancy is immediately terminated, and`);
			}
			r.push(`${he} is promptly sterilized to prevent ${him} from passing on ${his} useless genes.`);
		}
		return r.join(" ");
	}

	function FSPaternalistSMR() {
		slave.trust += 10;
		if (slave.devotion <= 20) {
			return `While ${he} came through the slave markets, ${he} was treated with decency. ${He} has begun to wonder whether ${he} can <span class="mediumaquamarine">get away with</span> being disobedient.`;
		} else {
			return `While ${he} came through the slave markets, ${he} was treated with decency. ${He} has begun to hope that ${he} can expect <span class="mediumaquamarine">basic respect</span> despite being a sex slave.`;
		}
	}

	function FSDegradationistSMR() {
		slave.trust -= 10;
		slave.health.tired = Math.clamp(slave.health.tired + 30, 0, 100);
		return `${His} current owners <span class="gold">brutalized ${him}</span> before putting ${him} on sale, using clever methods to produce agony without seriously damaging ${his} health.`;
	}

	function gumjobFetishismSMR() {
		slave.teeth = "removable";
		if (slave.devotion <= 50) {
			slave.trust -= 10;
		}
		healthDamage(slave, 10);
		return `In order to qualify for sale, ${he} has had his teeth removed and replaced with high-quality, removable dentures.`;
	}

	function FSPetiteAdmirationSMR() {
		if (!heightPass(slave)) {
			slave.natural.height = Height.randomAdult(slave, {skew: -1, limitMult: [-5, -2]});
			slave.height = Height.forAge(slave.natural.height, slave);
		}
		return `${His} height was meticulously taken before being allowed into the markets.`;
	}

	function FSStatuesqueGlorificationSMR() {
		if (!heightPass(slave)) {
			slave.natural.height = Height.randomAdult(slave, {skew: 1, limitMult: [2, 5]});
			slave.height = Height.forAge(slave.natural.height, slave);
		}
		return `${His} height, as well as ${his} potential for growth, were meticulously taken before being allowed into the markets.`;
	}

	function FSIntellectualDependencySMR() {
		slave.intelligence = Intelligence.random({limitIntelligence: [-100, -50]});
		slave.devotion += 5;
		return `${He} passed the intelligence exam needed to be qualify ${him} for sale. A truly <span class="hotpink">joyous achievement</span> for ${him}.`;
	}

	function FSSlaveProfessionalismSMR() {
		if (slave.vagina >= 0) {
			slave.skill.vaginal = Math.clamp(slave.skill.vaginal + 50, 50, 100);
		}
		if ((canAchieveErection(slave) || slave.clit >= 3) && penetrativeSocialUse(slave) >= 40) {
			slave.skill.penetrative = Math.clamp(slave.skill.penetrative + 50, 50, 100);
		}
		slave.skill.anal = Math.clamp(slave.skill.anal + 50, 50, 100);
		slave.skill.oral = Math.clamp(slave.skill.oral + 50, 50, 100);
		slave.skill.entertainment = Math.clamp(slave.skill.entertainment + 50, 50, 100);
		slave.skill.whoring = Math.clamp(slave.skill.whoring + 50, 50, 100);
		if (slave.accent > 1) {
			slave.accent = 1;
		}
		return `${He} underwent an intense lesson plan to hone ${his} skills to a level appropriate for sale.`;
	}

	function FSBodyPuristSMR() {
		slave.piercing.nipple.weight = 0;
		slave.piercing.areola.weight = 0;
		slave.piercing.lips.weight = 0;
		slave.piercing.vagina.weight = 0;
		slave.piercing.dick.weight = 0;
		slave.piercing.genitals.weight = 0;
		slave.piercing.genitals.smart = false;
		slave.piercing.anus.weight = 0;
		slave.piercing.corset.weight = 0;
		slave.piercing.ear.weight = 0;
		slave.piercing.eyebrow.weight = 0;
		slave.piercing.nose.weight = 0;
		slave.piercing.navel.weight = 0;
		slave.lipsTat = 0;
		slave.buttTat = 0;
		slave.anusTat = 0;
		slave.vaginaTat = 0;
		slave.dickTat = 0;
		slave.boobsTat = 0;
		slave.armsTat = 0;
		slave.legsTat = 0;
		slave.shouldersTat = 0;
		slave.backTat = 0;
		slave.stampTat = 0;
		if (slave.boobsImplant > 0) {
			slave.boobs -= slave.boobsImplant;
			slave.boobsImplant = 0;
			slave.boobsImplantType = "none";
			if (slave.boobShape === "spherical") {
				slave.boobShape = "normal";
			}
			if (slave.nipples === "flat") {
				slave.nipples = "cute";
			}
		}
		if (slave.buttImplant > 0) {
			slave.butt -= slave.buttImplant;
			slave.buttImplant = 0;
			slave.buttImplantType = "none";
		}
		if (slave.lipsImplant > 0) {
			slave.lips -= slave.lipsImplant;
			slave.lipsImplant = 0;
		}
		return `In order to qualify for sale, ${he} has been meticulously inspected for implants, tattoos, and piercings, and any present have been removed.`;
	}

	function FSTransformationFetishistSMR() {
		const r = [];
		r.push(`In order to qualify for sale, ${he} has been kitted out with a basic set of breast, buttock, and lip implants.`);
		if (slave.devotion <= 20) {
			r.push(`Being turned into an assembly line bimbo fills ${him} with <span class="gold">fear</span> and <span class="mediumorchid">disgust.</span>`);
			slave.trust -= 5;
			slave.devotion -= 5;
		}
		if (slave.boobsImplant === 0) {
			slave.boobsImplant = 400;
			slave.boobs += slave.boobsImplant;
			slave.boobsImplantType = "normal";
		}
		if (slave.buttImplant === 0) {
			slave.buttImplant = 1;
			slave.butt += slave.buttImplant;
			slave.buttImplantType = "normal";
		}
		if (slave.lipsImplant === 0) {
			slave.lipsImplant = 10;
			slave.lips += slave.lipsImplant;
		}
		return r.join(" ");
	}

	function FSYouthPreferentialistSMR() {
		if (slave.physicalAge > 35) {
			slave.trust -= 5;
			return `${He} was treated as a disposable old bitch in the slave pens, <span class="gold">worrying ${him}.</span>`;
		} else if (slave.physicalAge <= 25) {
			slave.trust += 5;
			return `${He} was treated reasonably well in the slave pens due to ${his} youth, <span class="mediumaquamarine">reassuring ${him}.</span>`;
		}
	}

	function FSMaturityPreferentialistSMR() {
		if (slave.physicalAge > 35) {
			slave.trust += 5;
			return `${He} was treated reasonably well in the slave pens due to ${his} maturity, <span class="mediumaquamarine">reassuring ${him}.</span>`;
		} else if (slave.physicalAge <= 25) {
			slave.trust -= 5;
			return `${He} was treated as a disposable little slut in the slave pens, <span class="gold">worrying ${him}.</span>`;
		}
	}

	function FSPastoralistSMR() {
		if (slave.lactation === 0) {
			slave.lactation = 2;
			slave.lactationDuration = 2;
			return `${He} was implanted with permanent lactation drugs in order to qualify for sale, and was kept in the slave pens until ${he} could be put up on the block with dripping nipples.`;
		}
	}

	function FSChattelReligionistSMR() {
		const r = [];
		r.push(`${He} has been consecrated for sale by being offered to the public for a full night, from sunset to sunrise.`);
		if (slave.devotion <= 20) {
			r.push(`Since ${he} was not willing to accept this treatment, ${his} consecration took the form of twelve hours of rape, <span class="gold">terrifying ${him}</span> and <span class="mediumorchid">filling ${him} with hatred.</span>`);
			slave.trust -= 15;
			slave.devotion -= 15;
		} else {
			r.push(`${He} accepted this treatment, <span class="hotpink">breaking ${him}</span> to sexual slavery.`);
			slave.devotion += 5;
		}

		seX(slave, "oral", "public", "penetrative", 10);
		if (slave.vagina > 0) {
			seX(slave, "vaginal", "public", "penetrative", 10);
			if (slave.vagina < 3) {
				slave.vagina += 1;
			}
		} else {
			seX(slave, "oral", "public", "penetrative", 10);
		}
		if (slave.anus > 0) {
			seX(slave, "anal", "public", "penetrative", 10);
			if (slave.anus < 3) {
				slave.anus += 1;
			}
		} else {
			seX(slave, "oral", "public", "penetrative", 10);
		}
		return r.join(" ");
	}

	function FSRomanRevivalistSMR() {
		slave.trust -= 10;
		return `As ${he} passed though the slave markets, ${he} saw many less valuable slaves selected to die in gladiatorial combats. ${He} is relieved ${he} wasn't one of them, but <span class="gold">terrified</span> that will be ${his} fate if ${he} makes mistakes.`;
	}

	function FSNeoImperialistSMR() {
		slave.trust -= 5;
		return `As ${he} passed though the slave markets, ${he} saw countless marvels of technological advancement, and the absolute obedience of tightly-disciplined slaves to their noble masters. The almost utter subservience of other slaves is deeply <span class="gold">concerning</span> to ${him}.`;
	}

	function FSAntebellumRevivalistSMR() {
		slave.trust -= 5;
		return `As ${he} passed though the slave markets, ${he} saw the dehumanizing horror of chattel slavery. The lack of sympathy from slave owners <span class="gold">scares</span> ${him}.`;
	}

	function FSAztecRevivalistSMR() {
		const r = [];
		r.push(`As ${he} passed though the golden city, ${he} saw a less valuable`);
		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`slave's virginity get sacrificed`);
		} else {
			r.push(`slave get sacrificed`);
		}
		r.push(`on one of the many altars spread throughout the city. ${He} was`);
		if (FutureSocieties.isActive('FSPaternalist')) {
			r.push(`<span class="gold">startled</span>`);
		} else {
			r.push(`<span class="gold">mortified</span>`);
		}
		r.push(`to learn what befalls lesser slaves here.`);
		if (FutureSocieties.isActive('FSPaternalist')) {
			slave.trust -= 5;
		} else {
			slave.trust -= 20;
		}
		return r.join(" ");
	}

	function FSEgyptianRevivalistSMR() {
		const r = [];
		r.push(`While ${he} was in the slave pens, ${he} was subjected to Egyptian cultural indoctrination.`);
		if (slave.skill.entertainment > 10) {
			r.push(`${He} is now <span class="mediumaquamarine">confident</span> that ${his} entertainment skills will be valued here.`);
			slave.trust += 10;
		} else if (slave.intelligenceImplant >= 15) {
			r.push(`${He} now <span class="mediumaquamarine">hopes</span> that ${his} education will be valued here.`);
			slave.trust += 5;
		} else {
			r.push(`${He} is <span class="gold">concerned</span> that ${he} doesn't have what it takes to fit in.`);
			slave.trust -= 5;
		}
		return r.join(" ");
	}

	function FSEdoRevivalistSMR() {
		const r = [];
		r.push(`While ${he} was in the slave pens, ${he} was subjected to Edo Revivalist cultural indoctrination.`);
		if (slave.nationality === "Japanese") {
			r.push(`${He} is now <span class="mediumaquamarine">confident</span> that, as a proper Japanese ${girl}, ${he} will receive preferential treatment.`);
			slave.trust += 10;
		} else if (slave.skill.entertainment > 30) {
			r.push(`${He} now <span class="mediumaquamarine">hopes</span> that ${his} refined entertainment skills will make ${him} culturally as well as sexually valuable.`);
			slave.trust += 5;
		} else {
			r.push(`${He} is <span class="gold">concerned</span> that ${he} doesn't have what it takes to fit in.`);
			slave.trust -= 5;
		}
		return r.join(" ");
	}

	function FSArabianRevivalistSMR() {
		const r = [];
		r.push(`While ${he} was in the slave pens, ${he} was subjected to classical Arabian cultural indoctrination.`);
		if (slave.face > 40) {
			r.push(`${He} is now <span class="mediumaquamarine">confident</span> that ${his} great beauty will be valued here.`);
			slave.trust += 10;
		} else if (slave.accent <= 1) {
			r.push(`${He} now <span class="mediumaquamarine">hopes</span> that ${his} linguistic skill will be valued here.`);
			slave.trust += 5;
		} else {
			r.push(`${He} is <span class="gold">concerned</span> that ${he} doesn't have what it takes to fit in.`);
			slave.trust -= 5;
		}
		return r.join(" ");
	}

	function FSChineseRevivalistSMR() {
		const r = [];
		r.push(`While ${he} was in the slave pens, ${he} was subjected to Imperial Chinese cultural indoctrination.`);
		if (slave.intelligence > 50) {
			r.push(`${He} is now <span class="mediumaquamarine">confident</span> that ${his} brilliance will be valued here.`);
			slave.trust += 10;
		} else if (slave.intelligenceImplant >= 15) {
			r.push(`${He} now <span class="mediumaquamarine">hopes</span> that ${his} education will be valued here.`);
			slave.trust += 5;
		} else {
			r.push(`${He} is <span class="gold">concerned</span> that ${he} doesn't have what it takes to fit in.`);
			slave.trust -= 5;
		}
		return r.join(" ");
	}

	function basicSMR() {
		slave.trust -= 5;
		return `While ${he} came through the slave markets, ${he} was treated with inhuman callousness. It was very obvious and <span class="gold">very terrifying</span> to ${him} that ${he} is now considered a piece of meat.`;
	}

	function healthInspectionSMR() {
		if (slave.health.condition < -10) {
			improveCondition(slave, 10);
			slave.health.tired = Math.clamp(slave.health.tired - 30, 0, 100);
			return `${His} current owners held ${him} for basic medical care before putting ${him} on sale, resolving some of ${his} health issues.`;
		}
	}

	function educationSMR() {
		if (slave.intelligenceImplant === 0) {
			slave.intelligenceImplant = 15;
			return `${He} arrived at ${V.arcologies[0].name} in a pitiably undereducated state, and has been held back until ${he} completed a basic course of slave education.`;
		}
	}

	function frigiditySMR() {
		if (slave.energy > 20) {
			slave.energy = 20;
			return `Before reaching the market, ${he} was trained to disregard sex until ${he} showed no interest in sex at all.`;
		}
	}

	function beautyBasicSMR() {
		if (slave.face < 0) {
			slave.face = jsRandom(0, 60);
		}
		slave.trust -= 5;
		return `beauty`;
	}

	function beautyQualitySMR() {
		if (slave.face < 20) {
			slave.face = jsRandom(20, 100);
		}
		slave.trust -= 5;
		return `beauty`;
	}

	function weightSMR() {
		if (slave.weight > 95) {
			slave.weight = jsRandom(-50, 50);
		}
		slave.trust -= 5;
		return `weight`;
	}

	function heightBasicSMRup() {
		if (slave.height < 170) {
			if (slave.height >= 160) {
				slave.trust -= 10;
				slave.height += 10;
				slave.heightImplant = 1;
				healthDamage(slave, 40);
				return `Before ${he} was put up for sale, ${he} underwent height increasing surgery to fulfill your arcology's height SMR. ${He} was <span class="gold">horrified</span> by how drastically ${his} body was altered just for a chance at sale.`;
			} else {
				slave.devotion += 10;
				slave.trust -= 10;
				return `While ${he} was in the slave pens, ${he} was treated as nothing more than an unsalvageable slab of meat suitable only for the lowliest of jobs. ${He}'s <span class="hotpink">desperate</span> enough to follow any order in <span class="gold">fear</span> that should ${he} fail, ${he}'ll be discarded like so many other shorties.`;
			}
		} else {
			slave.devotion -= 10;
			return `While ${he} was in the slave pens, ${he} saw that short and even average sized slaves were commonly designated as menials and Fuckdolls. ${His} tall stature gives ${him} a promising future compared to ${his} shorter peers, leaving ${him} <span class="mediumOrchid">inappropriately proud</span> of ${his} height.`;
		}
	}

	function heightBasicSMRdown() {
		if (slave.height >= 160) {
			if (slave.height <= 169) {
				slave.trust -= 10;
				slave.height -= 10;
				slave.heightImplant = -1;
				healthDamage(slave, 40);
				return `Before ${he} was put up for sale, ${he} underwent height reduction surgery to fulfill your arcology's height SMR. ${He} was <span class="gold">horrified</span> by how drastically ${his} body was altered just for a chance at sale.`;
			} else {
				slave.devotion += 10;
				slave.trust -= 10;
				return `While ${he} was in the slave pens, ${he} was treated as nothing more than an unsalvageable slab of meat suitable only for the lowliest of jobs. ${He}'s <span class="hotpink">desperate</span> enough to follow any order in <span class="gold">fear</span> that should ${he} fail, ${he}'ll be discarded like all the other tall ${girl}s.`;
			}
		} else {
			slave.devotion -= 10;
			return `While ${he} was in the slave pens, ${he} saw that tall and even average sized slaves were commonly designated as menials and Fuckdolls. ${His} short stature gives ${him} a promising future compared to ${his} towering peers, leaving ${him} <span class="mediumOrchid">inappropriately proud</span> of ${his} height.`;
		}
	}

	function heightAdvancedSMRup() {
		slave.natural.height = Height.randomAdult(slave, {
			skew: V.policies.SMR.height.advancedSMR,
			limitMult: [0, 5 * V.policies.SMR.height.advancedSMR]
		});
		slave.height = Height.forAge(slave.natural.height, slave);
		let t = [`While ${he} was in the slave pens, ${he} saw that slaves on the shorter end of the height curve were immediately designated as menials and Fuckdolls.`];
		if (slave.physicalAge < 16) {
			t.push(`${He} is <span class="gold">terrified</span> that if ${he} doesn't keep growing, ${he}'ll be reassigned on the spot without a second thought.`);
			slave.trust -= 5;
		} else {
			t.push(`${His} above average stature gives ${him} a promising future compared to ${his} shorter peers, leaving ${him} <span class="mediumOrchid">inappropriately proud</span> of ${his} height.`);
			slave.devotion -= 10;
		}
		return t.join(" ");
	}

	function heightAdvancedSMRdown() {
		slave.natural.height = Height.randomAdult(slave, {
			skew: V.policies.SMR.height.advancedSMR,
			limitMult: [0, 5 * V.policies.SMR.height.advancedSMR]
		});
		slave.height = Height.forAge(slave.natural.height, slave);
		let t = [`While ${he} was in the slave pens, ${he} saw that slaves on the taller end of the height curve were immediately designated as menials and Fuckdolls.`];
		if (slave.physicalAge < 16) {
			t.push(`${He} is <span class="gold">terrified</span> that if ${he} goes through a growth spurt, ${he}'ll be reassigned on the spot without a second thought.`);
			slave.trust -= 5;
		} else {
			t.push(`${His} below average stature gives ${him} a promising future compared to ${his} taller peers, leaving ${him} <span class="mediumOrchid">inappropriately proud</span> of ${his} height.`);
			slave.devotion -= 10;
		}
		return t.join(" ");
	}

	function intelligenceBasicSMR() {
		if (slave.intelligence <= -15) {
			slave.intelligence = Intelligence.random({limitIntelligence: [0, 40]});
		}
		slave.trust -= 5;
		return `intelligence`;
	}

	function intelligenceQualitySMR() {
		if (slave.intelligence <= 15) {
			slave.intelligence = Intelligence.random({limitIntelligence: [16, 100]});
		}
		slave.trust -= 5;
		return `intelligence`;
	}

	function slaveFears(fearList) {
		const r = [];
		let objectFeared = "";
		let destination = "";
		let destinationList = {menials: 1, Fuckdolls: 0, cows: 0}; // Always menials as a fear
		let lossFeared = "";
		if (fearList.length === 0) {
			return;
		}
		for (let fear = 0; fear < fearList.length; fear++) {
			if (fearList[fear] === "intelligence") {
				objectFeared += "less intelligent";
				destinationList.Fuckdolls = 1;
				lossFeared += `if ${he} makes a mistake, `;
			} else if (fearList[fear] === "beauty") {
				objectFeared += "less attractive";
				destinationList.Fuckdolls = 1;
				lossFeared += `should ${he} lose ${his} beauty, `;
			} else if (fearList[fear] === "weight") {
				objectFeared += "obese";
				destinationList.cows = 1;
				lossFeared += `should ${he} get fat, `;
			} else {
				console.log(`error: ${fearList[fear]} not found.`);
			}
			if (fearList.length - fear > 2) {
				objectFeared += ", ";
			} else if (fearList.length - fear > 1) {
				objectFeared += " and ";
				lossFeared += "or ";
			}
		}

		if (destinationList.Fuckdolls === 1 && destinationList.cows === 1) {
			destination = `menials, Fuckdolls, and cows`;
		} else if (destinationList.Fuckdolls === 1) {
			destination = `menials and Fuckdolls`;
		} else if (destinationList.cows === 1) {
			destination = `menials and cows`;
		}

		r.push(`While ${he} was in the slave pens, ${he} saw that ${objectFeared} slaves were immediately designated ${destination} and ${he} is <span class="gold">terrified</span> that ${lossFeared} ${he}'ll be considered worthless and be reassigned on the spot.`);

		return r.join(" ");
	}

	function eugenicsSMRsCount() {
		const r = [];
		const sterilizationReasons = [];
		r.push(`As soon as ${he} arrived in the slave market, ${he} was subjected to a battery of testing:`);
		if (V.policies.SMR.eugenics.intelligenceSMR === 1) {
			r.push(`an intelligence test,`);
			if (slave.intelligence + slave.intelligenceImplant <= 50) {
				sterilizationReasons.push(`too stupid`);
			}
		}
		if (V.policies.SMR.eugenics.heightSMR === 1) {
			r.push(`rigorous height and bone measurements,`);
			if (slave.height < (Height.mean(slave) + 15)) {
				sterilizationReasons.push(`too short`);
			}
		}
		if (V.policies.SMR.eugenics.faceSMR === 1) {
			r.push(`strict judgments of ${his} facial attractiveness,`);
			if (slave.face < 40) {
				sterilizationReasons.push(`too ugly`);
			}
		}
		r.push(`a physical exam, and more.`);
		if (sterilizationReasons.length > 0) {
			r.push(`${He} failed, being found <span class="red">${toSentence(sterilizationReasons)},</span> and only then learned that by failing ${he} placed ${himself} under the merciless dictates of eugenic theory.`);
			if (slave.balls > 0 && (isFertile(slave) || slave.preg > 0)) {
				r.push(`${His} balls were promptly`);
				if (V.seeExtreme === 1) {
					r.push(`removed`);
					slave.balls = 0;
					slave.scrotum = 0;
				} else {
					r.push(`flooded with chemicals`);
					slave.ballType = "sterile";
				}
				r.push(`to prevent ${him} from passing on ${his} inferior genes, <span class="mediumorchid">infuriating</span> and <span class="gold">terrifying</span> ${him}.`);
				r.push(`Furthermore, ${his}`);
				if (slave.preg > 0) {
					r.push(`pregnancy was terminated and afterwards ${his}`);
					TerminatePregnancy(slave);
					actX(slave, "abortions");
				}
				r.push(`tubes were promptly tied to prevent ${him} from passing on ${his} inferior genes, <span class="mediumorchid">saddening</span> and <span class="gold">frightening</span> ${him}.`);
				slave.preg = -3;
				slave.devotion -= 30;
				slave.trust -= 30;
			} else if (slave.balls > 0) {
				r.push(`${His} balls were promptly`);
				if (V.seeExtreme === 1) {
					r.push(`removed`);
					slave.balls = 0;
					slave.scrotum = 0;
				} else {
					r.push(`flooded with chemicals`);
					slave.ballType = "sterile";
				}
				r.push(`to prevent ${him} from passing on ${his} inferior genes, <span class="mediumorchid">infuriating</span> and <span class="gold">terrifying</span> ${him}.`);
				slave.devotion -= 20;
				slave.trust -= 20;
			} else if (isFertile(slave) || slave.preg > 0) {
				r.push(`${His}`);
				if (slave.preg > 0) {
					r.push(`pregnancy was terminated and afterwards ${his}`);
					TerminatePregnancy(slave);
					actX(slave, "abortions");
				}
				r.push(`tubes were promptly tied to prevent ${him} from passing on ${his} inferior genes, <span class="mediumorchid">saddening</span> and <span class="gold">frightening</span> ${him}.`);
				slave.preg = -3;
				slave.devotion -= 10;
				slave.trust -= 10;
			} else {
				r.push(`Fortunately for ${him}, ${he} was already incapable of passing on ${his} inferior genes.`);
			}
		} else {
			r.push(`${He} passed, and only then learned that passing marked ${him} as fit to pass on ${his} genes, should ${his} owners decide to breed ${him}.`);
			if (slave.balls > 0 && (isFertile(slave) || slave.preg > 0)) {
				r.push(`${His} relief that ${he} won't have ${his} balls cut off and ${his} tubes tied is mixed with fear at being introduced to your society in this way.`);
			} else if ((isFertile(slave) || slave.preg > 0)) {
				r.push(`${His} relief that ${he} won't have ${his} tubes tied is mixed with fear at being introduced to your society in this way.`);
			} else {
				r.push(`This is merely confusing to ${him}, since ${he} isn't able to reproduce as it is. Of course, ${he} doesn't know that you're quite capable of changing that.`);
			}
		}
		return r.join(" ");
	}
};
