globalThis.generateLeadershipSlave = function(input, location) {
	const applyMaleGenitalia = function({dick, balls, prostate}) {
		if (V.seeDicks > 0) {
			slave.dick = dick;
			slave.scrotum = slave.balls = balls;
			slave.prostate = prostate;
			slave.skill.penetrative = 100;
		}
	};

	const agePenaltyCheck = V.AgePenalty === 1 ? 36 : 20;
	const isMotherly = V.JFC.role === 'Motherly Attendant';
	let ageMin;
	let ageMax;
	switch (input) {
		case "Teacher":
		case "Attendant":
		case "Motherly Attendant":
		case "Matron":
			if (input === 'Teacher') {
				ageMin = 36;
			} else if (input === 'Matron') {
				ageMin = 24;
			} else if (input.contains('Attendant')) {
				ageMin = isMotherly ? 36 : 26;
			}
			ageMax = V.retirementAge-3;
			break;
		case "Headgirl":
		case "Stewardess":
		case "Farmer":
		case "Madam":
			ageMin = agePenaltyCheck;
			ageMax = V.retirementAge-5;
			break;
		default:
			ageMin = 20;
			ageMax = 36;
	}

	let slave = GenerateNewSlave("XX", {
		minAge: ageMin, maxAge: ageMax, ageOverridesPedoMode: 1, disableDisability: 1
	});
	slave.devotion = jsRandom(21, 85);
	slave.trust = jsRandom(21, 85);
	slave.weight = jsRandom(-30, 20);
	slave.waist = jsRandom(-30, 10);
	slave.intelligenceImplant = 30;
	slave.intelligence = jsRandom(20, 85);
	slave.hears = 0;
	slave.voice = 2;
	slave.face = jsRandom(40, 60);
	if (location === 'Job Fulfillment Center') {
		slave.origin = `The ${location} offered $his contract to fill your request for ${addA(input)}.`;
	}
	if (slave.faceShape === "masculine") {
		slave.faceShape = "sensual";
	}
	if (slave.boobShape === "saggy" || slave.boobShape === "downward-facing") {
		slave.boobShape = "perky";
	}
	eyeSurgery(slave, "both", "normal");
	setHealth(slave, jsRandom(80, 95), 0, 0, 0, 0);
	switch (input) {
	// Security
		case "Bodyguard":
			slave.devotion = jsRandom(51, 85);
			slave.trust = jsRandom(51, 85);
			slave.muscles = jsRandom(30, 70);
			slave.natural.height = Height.randomAdult(slave, {skew: 3, spread: .2, limitMult: [1, 4]});
			slave.height = Height.forAge(slave.natural.height, slave);
			slave.weight = jsRandom(-10, 10);
			slave.teeth = either("normal", "pointy");
			slave.skill.combat = 70;
			if (jsRandom(0, 2) === 0) {
				configureLimbs(slave, "all", 5);
			}
			slave.career = either(App.Data.Careers.Leader.bodyguard);
			break;
		case "Wardeness":
			slave.energy = jsRandom(80, 100);
			slave.sexualFlaw = either("malicious", "none", "none", "none", "none");
			slave.fetish = "sadist";
			slave.fetishStrength = 100;
			slave.muscles = jsRandom(50, 80);
			slave.skill.combat = 70;
			applyMaleGenitalia({dick: jsRandom(3, 6), balls: jsRandom(3, 6), prostate: either(1, 1, 1, 2, 2, 3)});
			slave.career = either(App.Data.Careers.Leader.wardeness);
			break;
			// Management
		case "Headgirl":
			slave.intelligence = jsRandom(60, 100);
			slave.devotion = jsRandom(51, 85);
			slave.trust = jsRandom(51, 85);
			slave.fetish = "dom";
			slave.fetishStrength = 100;
			slave.energy = jsRandom(70, 90);
			Object.assign(slave.skill, {
				entertainment: 100, whoring: 100, anal: 100, oral: 100, vaginal: 100
			});
			slave.vagina = jsRandom(3, 4);
			applyMaleGenitalia({dick: jsRandom(3, 5), balls: jsRandom(3, 6), prostate: either(1, 1, 2)});
			slave.career = either(App.Data.Careers.Leader.HG);
			break;
		case "Teacher":
			slave.fetish = "dom";
			slave.fetishStrength = 100;
			slave.energy = jsRandom(70, 90);
			slave.intelligence = 100;
			Object.assign(slave.skill, {
				entertainment: 100, whoring: 100, anal: 100, oral: 100, vaginal: 100
			});
			slave.face = jsRandom(41, 90);
			slave.vagina = jsRandom(3, 4);
			applyMaleGenitalia({dick: jsRandom(3, 5), balls: jsRandom(3, 6), prostate: either(1, 1, 1, 2, 2, 3)});
			slave.career = either(App.Data.Careers.Leader.schoolteacher);
			break;
		case "Nurse":
			slave.fetish = "dom";
			slave.fetishStrength = 100;
			slave.muscles = jsRandom(6, 50);
			slave.face = jsRandom(41, 90);
			slave.sexualQuirk = "caring";
			slave.career = either(App.Data.Careers.Leader.nurse);
			break;
		case "Attendant":
		case "Motherly Attendant":
			slave.fetish = "submissive";
			slave.fetishStrength = 100;
			slave.face = jsRandom(60, 90);
			if (isMotherly) {
				slave.counter.birthsTotal = jsRandom(1, 3);
				slave.pregKnown = 1;
				slave.pregWeek = slave.preg = jsRandom(20, 35);
				slave.pregType = 1;
				SetBellySize(slave);
				slave.vagina = jsRandom(3, 4);
			} else {
				slave.preg = 0;
			}
			eyeSurgery(slave, "both", either(0, 2, 2) === 2 ? "normal" : "blind");
			slave.career = either(App.Data.Careers.Leader.attendant);
			break;
		case "Matron":
			slave.sexualQuirk = "caring";
			slave.counter.birthsTotal = jsRandom(2, 4);
			slave.vagina = 3;
			slave.face = jsRandom(60, 90);
			slave.career = either(App.Data.Careers.Leader.matron);
			break;
		case "Stewardess":
			slave.energy = jsRandom(70, 90);
			slave.fetish = "dom";
			slave.fetishStrength = 100;
			slave.career = either(App.Data.Careers.Leader.stewardess);
			break;
		case "Milkmaid":
			slave.muscles = jsRandom(31, 60);
			slave.skill.oral = jsRandom(31, 60);
			slave.sexualQuirk = "caring";
			slave.behavioralQuirk = "funny";
			applyMaleGenitalia({dick: jsRandom(3, 5), balls: jsRandom(4, 9), prostate: either(1, 1, 1, 2)});
			slave.career = either(App.Data.Careers.Leader.milkmaid);
			break;
		case "Farmer":
			slave.muscles = jsRandom(41, 70);
			slave.sexualQuirk = "caring";
			slave.weight = jsRandom(0, 30);
			slave.natural.height = Height.randomAdult(slave, {skew: 3, spread: .2, limitMult: [1, 4]});
			slave.height = Height.forAge(slave.natural.height, slave);
			applyMaleGenitalia({dick: jsRandom(3, 5), balls: jsRandom(4, 9), prostate: either(1, 1, 1, 2)});
			slave.career = either(App.Data.Careers.Leader.farmer);
			break;
			// Entertain
		case "DJ":
			slave.skill.entertainment = 100;
			slave.muscles = jsRandom(6, 30);
			slave.face = 100;
			slave.career = either(App.Data.Careers.Leader.DJ);
			break;
		case "Madam":
			slave.skill.whoring = 100;
			applyMaleGenitalia({dick: jsRandom(3, 5), balls: jsRandom(3, 5), prostate: either(1, 1, 1, 2)});
			slave.career = either(App.Data.Careers.Leader.madam);
			break;
		case "Concubine":
			slave.prestige = 3;
			slave.energy = jsRandom(80, 100);
			Object.assign(slave.skill, {
				entertainment: 100, whoring: 100, anal: 100, oral: 100, vaginal: 100
			});
			slave.face = 100;
			break;
	}
	return slave;
};
