/** @param {"victory"|"mercs"} condition */
globalThis.pRivalryCapture = function(condition) {
	const el = new DocumentFragment();
	let rivalType;
	const slave = createRival();
	const {his, he, him, He} = getPronouns(slave);
	let r = [];
	V.rival.state = 3; // trigger P Rival Initiation
	V.rival.prosperity = 0;
	V.rival.power = 0;
	delete V.rival.gender;

	App.Events.drawEventArt(el, slave);

	r.push(`Your`);
	if (condition === "mercs") {
		r.push(`target is quickly delivered. Politely dismissing the head of your ${V.mercenariesTitle}, you savor`);
	} else {
		r.push(`bounty is quickly claimed, and you are treated to`);
	}
	r.push(`the delicious moment of finding your rival on`);
	if (hasBothLegs(slave)) {
		r.push(`${his} knees`);
	} else {
		r.push(`the ground`);
	}
	r.push(`in front of you with a black bag over ${his} head and ${his} hands cuffed behind ${him}. ${He}'s one of your slaves now, fundamentally no different than any other. Looking ${him} over, the causes of ${his} downfall are`);
	switch (rivalType) {
		case "expansionist shemale":
			r.push(`immediately apparent: ${he}'s obviously been indulging in self-transformation to excess.`);
			break;
		case "cum addict":
			r.push(`immediately apparent: there's nothing wrong with having cumflation and ball expansion fetishes, but applying them to oneself can be addictive.`);
			break;
		case "hung shota":
			r.push(`not immediately apparent: ${he}'s young, in good shape, and not lacking down there at all.`);
			break;
		case "masculine":
			r.push(`not immediately apparent: ${he}'s in good shape, if quite masculine.`);
			break;
		case "micropenis":
			r.push(`immediately apparent: ${he}'s got a slavegirl's cock and balls, not an arcology owner's.`);
			break;
		case "bull dyke":
			r.push(`not immediately apparent: though female, ${he}'s obviously no stranger to taking a dominant sexual role, to put it politely.`);
			break;
		case "breeder":
			r.push(`immediately apparent: there's nothing wrong with having a pregnancy fetish, but applying it to oneself is ill-fitting for an arcology owner.`);
			break;
		case "oppai loli":
			r.push(`immediately apparent: ${he}'s young, inexperienced, and extremely top heavy.`);
			break;
		case "cow":
			r.push(`immediately apparent: there's nothing wrong with having lactation and breast expansion fetishes, but applying them to oneself can be addictive.`);
			break;
		case "bimbo":
			r.push(`immediately apparent: there's nothing wrong with having a bimbo fetish, but applying it to oneself can be addictive.`);
			break;
		default:
			r.push(`immediately apparent: ${he} seems to have recently fallen into serious aphrodisiac addiction.`);
	}
	el.append(r.join(" "));

	V.rival.ID = slave.ID;
	el.append(App.UI.newSlaveIntro(slave));

	return el;

	/**
	 * @returns {App.Entity.SlaveState}
	 */
	function createRival() {
		let slave;
		const rivalTypeArray = [];
		/** @type {FC.Race} */
		let race;
		let minAge;
		let maxAge;
		let pedo;
		if (V.rival.gender === 2) {
			rivalTypeArray.push("expansionist shemale");
			rivalTypeArray.push("masculine");
			rivalTypeArray.push("micropenis");
			rivalTypeArray.push("cum addict");
			if (V.pedo_mode === 1) {
				rivalTypeArray.push("hung shota");
			}
		} else {
			rivalTypeArray.push("bull dyke");
			rivalTypeArray.push("cow");
			rivalTypeArray.push("bimbo");
			rivalTypeArray.push("addict");
			if (V.seePreg === 1) {
				rivalTypeArray.push("breeder");
			}
			if (V.pedo_mode === 1) {
				rivalTypeArray.push("oppai loli");
			}
		}
		rivalType = rivalTypeArray.random();

		if (V.rival.race && App.Data.misc.filterRacesPublic.has(V.rival.race)) {
			race = V.rival.race;
		}
		switch (rivalType) {
			case "expansionist shemale":
				slave = GenerateNewSlave("XY", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 100;
				slave.faceImplant = 15;
				slave.faceShape = "androgynous";
				slave.muscles = 20;
				slave.height = random(185, 215);
				slave.lips = 35;
				slave.butt = either(4, 5, 6);
				slave.boobs = either(800, 1000, 1200);
				slave.dick = 6;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = 10;
				slave.anus = 3;
				slave.vagina = -1;
				slave.weight = 20;
				slave.skill.penetrative = 100;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 100;
				slave.skill.combat = 0;
				slave.piercing.genitals.weight = 2;
				slave.piercing.nipple.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.piercing.tongue.weight = 1;
				slave.piercing.eyebrow.weight = 1;
				slave.behavioralFlaw = "odd";
				slave.behavioralQuirk = "confident";
				slave.sexualFlaw = "judgemental";
				slave.sexualQuirk = "romantic";
				slave.hStyle = "luxurious";
				slave.hLength = 80;
				break;
			case "cum addict":
				slave = GenerateNewSlave("XY", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.chem = 3000;
				slave.face = 100;
				slave.faceShape = "masculine";
				slave.muscles = 100;
				slave.height = random(185, 215);
				slave.lips = 10;
				slave.butt = 10;
				slave.boobs = either(100, 200);
				slave.dick = 6;
				slave.foreskin = 0;
				slave.balls = 300;
				slave.scrotum = 280;
				slave.anus = 3;
				slave.vagina = -1;
				slave.weight = -35;
				slave.skill.oral = 0;
				slave.skill.penetrative = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 15;
				slave.skill.entertainment = 100;
				slave.skill.combat = 0;
				slave.piercing.dick.weight = 2;
				slave.fetish = "pregnancy";
				slave.fetishStrength = 100;
				slave.behavioralFlaw = "odd";
				slave.behavioralQuirk = "confident";
				slave.sexualFlaw = "cum addict";
				slave.sexualQuirk = "size queen";
				slave.hStyle = "neat";
				slave.hLength = 20;
				break;
			case "hung shota":
				slave = GenerateNewSlave("XY", {
					minAge: V.minimumSlaveAge, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 100;
				slave.faceShape = "androgynous";
				slave.muscles = 0;
				slave.lips = 10;
				slave.butt = 0;
				slave.boobs = either(100, 200);
				slave.dick = 6;
				slave.foreskin = slave.dick;
				slave.balls = 6;
				slave.scrotum = 6;
				slave.anus = 0;
				slave.vagina = -1;
				slave.weight = -35;
				slave.skill.oral = 0;
				slave.skill.penetrative = 100;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 100;
				slave.skill.combat = 0;
				slave.piercing.dick.weight = 2;
				slave.pubertyXY = 1;
				slave.fetish = "pregnancy";
				slave.fetishStrength = 100;
				slave.behavioralFlaw = "hates men";
				slave.behavioralQuirk = "adores women";
				slave.sexualFlaw = "shamefast";
				slave.sexualQuirk = "perverted";
				slave.hLength = 20;
				break;
			case "masculine":
				slave = GenerateNewSlave("XY", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 55;
				slave.faceImplant = 0;
				slave.faceShape = "masculine";
				slave.muscles = either(20, 50, 100);
				slave.height = random(185, 195);
				slave.butt = either(2, 3);
				slave.boobs = either(100, 200);
				slave.dick = 5;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = 5;
				slave.anus = 0;
				slave.vagina = -1;
				slave.weight = 0;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 100;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.skill.combat = 40;
				slave.behavioralFlaw = "hates men";
				slave.behavioralQuirk = "fitness";
				slave.sexualFlaw = "hates anal";
				slave.sexualQuirk = "perverted";
				slave.hStyle = "neat";
				slave.hLength = 5;
				break;
			case "micropenis":
				slave = GenerateNewSlave("XY", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 55;
				slave.faceImplant = 0;
				slave.faceShape = "masculine";
				slave.muscles = 0;
				slave.height = random(145, 160);
				slave.butt = either(2, 4);
				slave.boobs = either(100, 400);
				slave.dick = 1;
				if (slave.foreskin > 0) {
					slave.foreskin = slave.dick;
				}
				slave.balls = 2;
				slave.anus = 1;
				slave.vagina = -1;
				slave.weight = 100;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 10;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.skill.combat = 0;
				slave.behavioralFlaw = "hates men";
				slave.behavioralQuirk = "insecure";
				slave.sexualFlaw = "shamefast";
				slave.sexualQuirk = "perverted";
				slave.hStyle = "neat";
				slave.hLength = 5;
				break;
			case "bull dyke":
				slave = GenerateNewSlave("XX", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 55;
				slave.faceImplant = 0;
				slave.faceShape = "androgynous";
				slave.muscles = 100;
				slave.height = random(185, 195);
				slave.lipsImplant = 10;
				slave.lips = 35;
				slave.buttImplant = 1;
				slave.butt += slave.buttImplant;
				slave.buttImplantType = "normal";
				slave.boobs -= 100;
				slave.boobsImplant = either(400, 600, 800);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				slave.clit = 2;
				slave.anus = 1;
				slave.vagina = 1;
				slave.preg = -1;
				slave.skill.vaginal = 15;
				slave.skill.penetrative = 65;
				slave.skill.oral = 0;
				slave.skill.anal = 15;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 0;
				slave.skill.combat = 40;
				slave.piercing.genitals.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.behavioralFlaw = "hates men";
				slave.behavioralQuirk = "fitness";
				slave.sexualFlaw = "hates penetration";
				slave.sexualQuirk = "unflinching";
				slave.hStyle = "neat";
				slave.hLength = 5;
				break;
			case "breeder":
				if (V.pedo_mode === 1) {
					minAge = (V.fertilityAge + 6);
					pedo = 1;
					/* Old enough to have been pregnant many times. */
				} else {
					minAge = 18;
					maxAge = 42;
				}
				slave = GenerateNewSlave("XX", {
					minAge: minAge, maxAge: maxAge, ageOverridesPedoMode: pedo, race: race, disableDisability: 1
				});
				slave.pubertyXX = 1;
				slave.face = 100;
				slave.faceImplant = 0;
				slave.faceShape = "sensual";
				slave.muscles = 50;
				slave.lips = 35;
				slave.butt = either(6, 7, 8);
				slave.boobs = 5000;
				slave.nipples = "huge";
				slave.lactation = 1;
				slave.lactationDuration = 2;
				slave.anus = 1;
				slave.preg = 25;
				if (V.seeHyperPreg === 1) {
					slave.geneticQuirks.uterineHypersensitivity = 2;
					slave.vagina = 10;
					slave.pregType = random(20, 35);
					slave.counter.birthsTotal = random(120, 180);
					slave.bellySag = 30;
					slave.bellySagPreg = 30;
					slave.pregAdaptation = slave.counter.birthsTotal * 2;
				} else {
					const UHSchance = Math.random();
					if (UHSchance > 0.9) {
						slave.geneticQuirks.uterineHypersensitivity = 2;
					} else if (UHSchance > 0.6 && slave.geneticQuirks.uterineHypersensitivity !== 2) {
						slave.geneticQuirks.uterineHypersensitivity = 1;
					}
					slave.vagina = 5;
					slave.pregType = either(3, 3, 4, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 8);
					slave.counter.birthsTotal = random(18, 27);
					slave.bellySag = 2;
					slave.bellySagPreg = 2;
					slave.pregAdaptation = (random(60, 100) + (slave.counter.birthsTotal * slave.geneticQuirks.uterineHypersensitivity));
				}
				slave.pregKnown = 1;
				slave.pregWeek = slave.preg;
				SetBellySize(slave);
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 15;
				slave.skill.whoring = 35;
				slave.skill.entertainment = 15;
				slave.skill.combat = 0;
				slave.fetish = "pregnancy";
				slave.fetishStrength = 1000;
				slave.behavioralFlaw = "odd";
				slave.behavioralQuirk = "adores men";
				slave.sexualFlaw = "breeder";
				slave.sexualQuirk = "caring";
				slave.hStyle = "luxurious";
				slave.hLength = 80;
				break;
			case "oppai loli":
				slave = GenerateNewSlave("XX", {
					minAge: V.minimumSlaveAge, maxAge: 12, race: race, disableDisability: 1
				});
				slave.face = 100;
				slave.faceImplant = 0;
				slave.faceShape = "cute";
				slave.muscles = 20;
				slave.weight = 60;
				slave.lips = 10;
				slave.butt = 1;
				slave.hips = -1;
				slave.shoulders = -2;
				slave.boobs = 7000;
				slave.natural.boobs = 10000;
				slave.nipples = "huge";
				slave.anus = 0;
				slave.vagina = 0;
				slave.preg = 0;
				slave.skill.vaginal = 0;
				slave.skill.penetrative = 0;
				slave.skill.oral = 0;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.skill.combat = 0;
				slave.behavioralFlaw = "odd";
				slave.behavioralQuirk = "insecure";
				slave.sexualFlaw = "shamefast";
				slave.sexualQuirk = "tease";
				slave.hStyle = "tails";
				slave.hLength = 40;
				break;
			case "cow":
				slave = GenerateNewSlave("XX", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 55;
				slave.faceImplant = 0;
				slave.faceShape = "cute";
				slave.muscles = 50;
				slave.height = random(185, 195);
				slave.lips = 35;
				slave.butt = either(6, 7, 8);
				slave.boobs = 30000;
				slave.weight = random(100, 160);
				slave.nipples = "huge";
				slave.lactation = 2;
				slave.lactationDuration = 2;
				slave.anus = 1;
				slave.vagina = 2;
				slave.preg = 0;
				slave.skill.vaginal = 15;
				slave.skill.penetrative = 0;
				slave.skill.oral = 15;
				slave.skill.anal = 0;
				slave.skill.whoring = 0;
				slave.skill.entertainment = 15;
				slave.skill.combat = 0;
				slave.behavioralFlaw = "odd";
				slave.behavioralQuirk = "insecure";
				slave.sexualFlaw = "breast growth";
				slave.sexualQuirk = "perverted";
				slave.hStyle = "neat";
				slave.hLength = 5;
				break;
			case "bimbo":
				slave = GenerateNewSlave("XX", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 100;
				slave.faceImplant = 65;
				slave.faceShape = "sensual";
				slave.muscles = 0;
				slave.height = random(180, 190);
				slave.lipsImplant = 2;
				slave.lips = random(25, 55);
				slave.buttImplant = 2;
				slave.butt += slave.buttImplant;
				slave.buttImplantType = "normal";
				slave.boobsImplant = either(600, 800, 1000);
				slave.boobs += slave.boobsImplant;
				slave.boobsImplantType = "normal";
				slave.anus = 2;
				slave.vagina = 1;
				slave.preg = -1;
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 35;
				slave.skill.oral = 100;
				slave.skill.anal = 35;
				slave.skill.whoring = 35;
				slave.skill.entertainment = 35;
				slave.skill.combat = 0;
				slave.piercing.genitals.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.behavioralFlaw = "arrogant";
				slave.behavioralQuirk = "insecure";
				slave.sexualFlaw = "crude";
				slave.sexualQuirk = "caring";
				slave.hStyle = "tails";
				slave.hLength = 80;
				break;
			default:
				slave = GenerateNewSlave("XX", {
					minAge: 18, maxAge: 42, race: race, disableDisability: 1
				});
				slave.face = 100;
				slave.faceImplant = 15;
				slave.muscles = 0;
				slave.lips = 35;
				slave.butt += random(1, 3);
				slave.boobs += 200 * random(1, 3);
				slave.natural.boobs = slave.boobs;
				slave.anus = 4;
				slave.vagina = 4;
				if (V.seePreg === 1) {
					slave.preg = 2;
					slave.pregKnown = 1;
					slave.pregWeek = slave.preg;
					slave.pregType = setPregType(slave);
					SetBellySize(slave);
				}
				slave.skill.vaginal = 100;
				slave.skill.penetrative = 100;
				slave.skill.oral = 100;
				slave.skill.anal = 100;
				slave.skill.whoring = 100;
				slave.skill.entertainment = 0;
				slave.skill.combat = 0;
				slave.piercing.genitals.weight = 1;
				slave.piercing.ear.weight = 1;
				slave.behavioralFlaw = "bitchy";
				slave.behavioralQuirk = "funny";
				slave.sexualFlaw = "crude";
				slave.sexualQuirk = "size queen";
				slave.hStyle = "neat";
				slave.hLength = 80;
				slave.addict = 10;
		}
		slave.intelligence = 100;
		slave.intelligenceImplant = 30;
		slave.devotion = -20;
		slave.trust = -10;
		slave.origin = "$He was once an arcology owner like yourself.";
		slave.career = "an arcology owner";
		slave.prestige = 3;
		slave.prestigeDesc = "You bankrupted and enslaved $him in revenge for $his part in the attack on your arcology by the Daughters of Liberty.";
		setHealth(slave, 100, 0, 0, 0, jsRandom(10, 30));
		if (slave.physicalAge > 35) {
			applyAgeImplant(slave);
		}
		slave.pubicHStyle = "waxed";
		slave.underArmHStyle = "waxed";
		return slave;
	}
};
